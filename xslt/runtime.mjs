import { helpIndex } from './sql-help.generated.mjs';

const quote_all_identifiers = 0;

const NULL = null;
const FUNC_MAX_ARGS = 100;
const ESCAPE_STRING_SYNTAX = 'E';
const InvalidOid = 0;
const PG_UTF8 = 6;

/* CONSTANTS TRANSLATED FROM C */


export function describeDataToString(item) {
  return typeof item === 'string' ? item : tableToString(item);
}

export function describeDataToHtml(item) {
  return typeof item === 'string' ? `<p>${htmlEscape(item, true)}</p>` : tableToHtml(item);
}

export function describe(
  cmd,
  dbName,
  runQuery,
  outputFn,
  echoHidden = false,
  sversion = null,
  std_strings = 1,
  docsURLTemplate = (id) => `https://www.postgresql.org/docs/${strstr(PG_VERSION, "devel") ? "devel" : PG_MAJORVERSION}/${id}.html`,
) {
  let cancel_pressed = false;

  function cancel() {
    cancel_pressed = true;
    outputFn = () => void 0;
  }
  function throwIfCancelled() {
    if (cancel_pressed) throw new Error('cancelled');
  }

  async function main() {
    // parse and run command
    const match = cmd.match(/^\\([?hdzsl]\S*)(.*)/);
    if (!match) {
      outputFn(`unsupported command: ${cmd}`);
      return false;
    }
    let [, matchedCommand, remaining] = match;

    // psql's SQL help (\h), from the docs (see sql-help.generated.mjs)
    function helpSQL(topic, pager) {
      const helpSearch = (topic ?? '').trim().toUpperCase().replace(/\s+/g, ' ');
      if (helpSearch === '') {
        outputFn("Available help:\n" + helpIndex.map(arr => arr[0]).join('\n'));
        return;
      }

      // first try exact match, or show all with *
      let matches = helpSearch === '*' ? helpIndex : helpIndex.filter(arr => arr[0] === helpSearch);
      // next try startsWith
      if (matches.length === 0) matches = helpIndex.filter(arr => arr[0].startsWith(helpSearch));
      // lastly, try cutting words off the end
      if (matches.length === 0) {
        const searchWords = helpSearch.split(' ');
        for (let i = searchWords.length; i > 0; i--) {
          const indexTerm = searchWords.slice(0, i).join(' ');
          matches = helpIndex.filter(arr => arr[0].startsWith(indexTerm));
          if (matches.length > 0) break;
        }
      }

      if (matches.length === 0) {
        outputFn(`No help available for "${topic.trim()}".\nTry \\h with no arguments to see available help.`);
        return;
      }
      for (const index of matches) {
        outputFn(
          `Command:     ${index[0]}\n` +
          `Description: ${index[1]}\n` +
          `Syntax:\n${index[3]}\n\n` +
          `URL: ${docsURLTemplate(index[2])}`
        );
      }
    }

    // The \? text (generated from help.c's slashUsage, with only the commands we have: see c-to-js.xsl)
    const slashUsage = pager => fputs(helpText, stdout);

    // What psql has, but we don't: each reports an error, and its line is left out of the \? text (again, see
    // c-to-js.xsl). (\? options and \? variables, which are \? with an argument, still have lines.)
    const unsupported = command => () => { pg_log_error('\\%s is not supported', command); return false; };
    const usage = unsupported('? options'), helpVariables = unsupported('? variables');
    const do_lo_export = unsupported('lo_export'), do_lo_import = unsupported('lo_import'),
      do_lo_unlink = unsupported('lo_unlink');
    const expand_tilde = noop;

    const PSQLexec = async (sql, suppressEcho = false) => {
      throwIfCancelled();
      if (echoHidden && !suppressEcho) outputFn(`/**** INTERNAL QUERY ****/\n${sql}\n/************************/`);
      const result = await runQuery(sql);
      throwIfCancelled();
      return result;
    };

    // Just enough of libpq's PQexec: a result has a status, and a failed query's result has error fields
    async function PQexec(conn, query) {
      throwIfCancelled();
      try {
        return { ...await runQuery(query), status: PGRES_TUPLES_OK };
      } catch (err) {
        return { status: PGRES_FATAL_ERROR, errorFields: { [PG_DIAG_SEVERITY]: 'ERROR', [PG_DIAG_MESSAGE_PRIMARY]: err.message } };
      } finally {
        throwIfCancelled();
      }
    }
    const PQresultStatus = res => res.status;
    const PQresultErrorField = (res, field) => res.errorFields?.[field] ?? NULL;
    const standard_strings = () => std_strings;

    // Just enough of C's stdio: a stream is an object with write(), and stdout writes to outputFn (each write being
    // one item of output). There's no pager.
    const stdout = { write: text => outputFn(text.replace(/\n+$/, '')) };
    const fputs = (str, stream) => stream.write(str);
    const fprintf = (stream, template, ...args) => stream.write(sprintf(template, ...args));
    const printf = (template, ...args) => fprintf(stdout, template, ...args);
    const fflush = noop, ClosePager = noop;
    const PageOutput = (lines, topt) => stdout;

    let pset;
    try {
      // get server version, if not supplied (and needed: not for help)
      const isHelp = ['?', 'h', 'help'].includes(matchedCommand);
      if (!sversion && !isHelp) {  // covers null, undefined and (importantly) 0
        const vres = await PSQLexec('SHOW server_version_num', true);
        sversion = parseInt(vres.rows[0][0], 10);
      }

      const expandedSearchString = matchedCommand.startsWith('dx') ? matchedCommand.slice(2) : matchedCommand;
      const expanded = expandedSearchString.indexOf('x') !== -1 ? 1 : 0;

      pset = {
        sversion,
        queryFout: stdout,
        logfile: NULL,
        echo_hidden: echoHidden ? PSQL_ECHO_HIDDEN_ON : PSQL_ECHO_HIDDEN_OFF,
        db: {  // PGconn struct
          dbName,
          sversion,
          std_strings,
          status: CONNECTION_OK,
          encoding: PG_UTF8
        },
        popt: {  // print options
          topt: {  // table options
            default_footer: true,
            expanded,
          },
          nullPrint: '',
        }
      };

      // as in exec_command, for the commands we have
      const
        cmd = matchedCommand,
        scan_state = [remaining, 0],
        result = await (
          cmd[0] === 'd' ? exec_command_d(scan_state, true, cmd)
            : cmd === 'h' || cmd === 'help' ? exec_command_help(scan_state, true)
            : /^l(ist)?(x|\+|x\+|\+x)?$/.test(cmd) ? exec_command_list(scan_state, true, cmd)
            : cmd.startsWith('lo_') ? exec_command_lo(scan_state, true, cmd)
            : cmd === 'sf' || cmd === 'sf+' ? exec_command_sf_sv(scan_state, true, cmd, true)
            : cmd === 'sv' || cmd === 'sv+' ? exec_command_sf_sv(scan_state, true, cmd, false)
            : /^z(S|x|Sx|xS)?$/.test(cmd) ? exec_command_z(scan_state, true, cmd)
            : cmd === '?' ? exec_command_slash_command_help(scan_state, true)
            : PSQL_CMD_UNKNOWN
        );

      if (result === PSQL_CMD_UNKNOWN) outputFn(`invalid command \\${matchedCommand}`);
      // if result === PSQL_CMD_ERROR, the error message was printed already
      else {
        let arg, warnings = [];
        while (arg = psql_scan_slash_option(scan_state, OT_NORMAL, NULL, true)) warnings.push(sprintf("\\%s: extra argument \"%s\" ignored", matchedCommand, arg));
        if (warnings.length > 0) outputFn(warnings.join('\n'));
      }
      if (isHelp) return false;  // as before: help is informational

    } catch (err) {
      // throw err;
      outputFn('ERROR:  ' + err.message);
      return cancel_pressed ? null : false;
    }

    function pg_log_error(template, ...args) {
      outputFn(sprintf(template, ...args));
    }
    const pg_log_error_internal = pg_log_error;


    /* TRANSLATED FROM C */

    /*
     * Transform a possibly qualified shell-style object name pattern into up to
     * three SQL-style regular expressions, converting quotes, lower-casing
     * unquoted letters, and adjusting shell-style wildcard characters into regexp
     * notation.
     *
     * If the dbnamebuf and schemabuf arguments are non-NULL, and the pattern
     * contains two or more dbname/schema/name separators, we parse the portions of
     * the pattern prior to the first and second separators into dbnamebuf and
     * schemabuf, and the rest into namebuf.
     *
     * If dbnamebuf is NULL and schemabuf is non-NULL, and the pattern contains at
     * least one separator, we parse the first portion into schemabuf and the rest
     * into namebuf.
     *
     * Otherwise, we parse all the pattern into namebuf.
     *
     * If the pattern contains more dotted parts than buffers to parse into, the
     * extra dots will be treated as literal characters and written into the
     * namebuf, though they will be counted.  Callers should always check the value
     * returned by reference in dotcnt and handle this error case appropriately.
     *
     * We surround the regexps with "^(...)$" to force them to match whole strings,
     * as per SQL practice.  We have to have parens in case strings contain "|",
     * else the "^" and "$" will be bound into the first and last alternatives
     * which is not what we want.  Whether this is done for dbnamebuf is controlled
     * by the want_literal_dbname parameter.
     *
     * The regexps we parse into the buffers are appended to the data (if any)
     * already present.  If we parse fewer fields than the number of buffers we
     * were given, the extra buffers are unaltered.
     *
     * encoding: the character encoding for the given pattern
     * dbnamebuf: output parameter receiving the database name portion of the
     * pattern, if any.  Can be NULL.
     * schemabuf: output parameter receiving the schema name portion of the
     * pattern, if any.  Can be NULL.
     * namebuf: output parameter receiving the database name portion of the
     * pattern, if any.  Can be NULL.
     * pattern: user-specified pattern option, or NULL if none ("*" is implied).
     * force_escape: always quote regexp special characters, even outside
     * double quotes (else they are quoted only between double quotes).
     * want_literal_dbname: if true, regexp special characters within the database
     * name portion of the pattern will not be escaped, nor will the dbname be
     * converted into a regular expression.
     * dotcnt: output parameter receiving the number of separators parsed from the
     * pattern.
     */
    function patternToSQLRegex(encoding, dbnamebuf /* PQExpBuffer output param */, schemabuf /* PQExpBuffer output param */,
      namebuf /* PQExpBuffer output param */, pattern, force_escape,
      want_literal_dbname, dotcnt /* int output param */) {
      let buf = [{}, {}, {}];
      let bufIndex = 0;
      let left_literal = {};
      let curbuf = {};
      let maxbuf = {};
      let inquotes;
      let left;
      let cp;

      Assert(pattern);
      Assert(namebuf);

      /* callers should never expect "dbname.relname" format */
      Assert(!dbnamebuf || schemabuf);
      Assert(dotcnt);

      dotcnt.value = 0;
      inquotes = false;
      cp = pattern;

      if (dbnamebuf)
        maxbuf = 2;
      else if (schemabuf)
        maxbuf = 1;
      else
        maxbuf = 0;

      curbuf = buf[bufIndex];
      if (want_literal_dbname) {
        left = true;
        initPQExpBuffer(left_literal);
      }
      else
        left = false;

      initPQExpBuffer(curbuf);
      appendPQExpBufferStr(curbuf, "^(");

      let cpIndex = 0;
      let ch;
      while ((ch = cp[cpIndex]) != NULL) {
        if (ch == '"') {
          if (inquotes && cp[cpIndex + 1] == '"') {
            /* emit one quote, stay in inquotes mode */
            appendPQExpBufferChar(curbuf, '"');
            if (left)
              appendPQExpBufferChar(left_literal, '"');
            cpIndex++;
          }
          else
            inquotes = !inquotes;
          cpIndex++;
        }
        else if (!inquotes && isupper(ch)) {
          appendPQExpBufferChar(curbuf,
            pg_tolower(ch));
          if (left)
            appendPQExpBufferChar(left_literal,
              pg_tolower(ch));
          cpIndex++;
        }
        else if (!inquotes && ch == '*') {
          appendPQExpBufferStr(curbuf, ".*");
          if (left)
            appendPQExpBufferChar(left_literal, '*');
          cpIndex++;
        }
        else if (!inquotes && ch == '?') {
          appendPQExpBufferChar(curbuf, '.');
          if (left)
            appendPQExpBufferChar(left_literal, '?');
          cpIndex++;
        }
        else if (!inquotes && ch == '.') {
          left = false;
          dotcnt.value++;
          if (bufIndex < maxbuf) {
            appendPQExpBufferStr(curbuf, ")$");
            curbuf = buf[++bufIndex];
            initPQExpBuffer(curbuf);
            appendPQExpBufferStr(curbuf, "^(");
            cpIndex++;
          }
          else {
            appendPQExpBufferChar(curbuf, ch);
            cpIndex++;
          }
        }
        else if (ch == '$') {
          /*
           * Dollar is always quoted, whether inside quotes or not. The
           * reason is that it's allowed in SQL identifiers, so there's a
           * significant use-case for treating it literally, while because
           * we anchor the pattern automatically there is no use-case for
           * having it possess its regexp meaning.
           */
          appendPQExpBufferStr(curbuf, "\\$");
          if (left)
            appendPQExpBufferChar(left_literal, '$');
          cpIndex++;
        }
        else {
          /*
           * Ordinary data character, transfer to pattern
           *
           * Inside double quotes, or at all times if force_escape is true,
           * quote regexp special characters with a backslash to avoid
           * regexp errors.  Outside quotes, however, let them pass through
           * as-is; this lets knowledgeable users build regexp expressions
           * that are more powerful than shell-style patterns.
           *
           * As an exception to that, though, always quote "[]", as that's
           * much more likely to be an attempt to write an array type name
           * than it is to be the start of a regexp bracket expression.
           */
          if ((inquotes || force_escape) &&
            strchr("|*+?()[]{}.^$\\", ch) != NULL)
            appendPQExpBufferChar(curbuf, '\\');
          else if (ch == '[' && cp[cpIndex + 1] == ']')
            appendPQExpBufferChar(curbuf, '\\');

          if (left)
            appendPQExpBufferChar(left_literal, ch);
          appendPQExpBufferChar(curbuf, ch);
          cpIndex++;
        }
      }
      appendPQExpBufferStr(curbuf, ")$");

      if (namebuf) {
        appendPQExpBufferStr(namebuf, curbuf.data);
        curbuf = buf[--bufIndex];
      }

      if (schemabuf && bufIndex >= 0) {
        appendPQExpBufferStr(schemabuf, curbuf.data);
        curbuf = buf[--bufIndex];
      }

      if (dbnamebuf && bufIndex >= 0) {
        if (want_literal_dbname)
          appendPQExpBufferStr(dbnamebuf, left_literal.data);
        else
          appendPQExpBufferStr(dbnamebuf, curbuf.data);
      }
    }

    function column_type_alignment(ftype) {
      let align;
      switch (ftype) {
        case INT2OID:
        case INT4OID:
        case INT8OID:
        case FLOAT4OID:
        case FLOAT8OID:
        case NUMERICOID:
        case OIDOID:
        case XIDOID:
        case XID8OID:
        case CIDOID:
        case MONEYOID:
          align = 'r';
          break;
        default:
          align = 'l';
          break;
      }
      return align;
    }

    /*
     * Use this to print query results
     *
     * result: result of a successful query
     * opt: formatting options
     * fout: where to print to
     * is_pager: true if caller has already redirected fout to be a pager pipe
     * flog: if not null, also print the data there (for --log-file option)
     */
    function printQuery(result, opt, fout, is_pager, flog) {
      let cont = {};
      let i, r, c;

      printTableInit(cont, opt.topt, opt.title,
        PQnfields(result), PQntuples(result));

      /* Assert caller supplied enough translate_columns[] entries */
      Assert(opt.translate_columns == NULL || opt.translate_columns == null ||
        opt.n_translate_columns >= cont.ncolumns);

      for (i = 0; i < cont.ncolumns; i++) {
        printTableAddHeader(cont, PQfname(result, i),
          opt.translate_header,
          column_type_alignment(PQftype(result, i)));
      }

      /* set cells */
      for (r = 0; r < cont.nrows; r++) {
        for (c = 0; c < cont.ncolumns; c++) {
          let cell;
          let mustfree = false;
          let translate;

          if (PQgetisnull(result, r, c))
            cell = opt.nullPrint ? opt.nullPrint : "";
          else {
            cell = PQgetvalue(result, r, c);
            if (cont.aligns[c] == 'r' && opt.topt.numericLocale) {
              cell = format_numeric_locale(cell);
              mustfree = true;
            }
          }

          translate = (opt.translate_columns && opt.translate_columns[c]);
          printTableAddCell(cont, cell, translate, mustfree);
        }
      }

      /* set footers */
      if (opt.footers) {
        for (let footer of opt.footers) printTableAddFooter(cont, footer);
      }

      printTable(cont, fout, is_pager, flog);
    }

    /*
     * Initialise a table contents struct.
     *		Must be called before any other printTable method is used.
     *
     * The title is not duplicated; the caller must ensure that the buffer
     * is available for the lifetime of the printTableContent struct.
     *
     * If you call this, you must call printTableCleanup once you're done with the
     * table.
     */
    function printTableInit(content, opt, title, ncolumns, nrows) {
      content.opt = opt;
      content.title = title;
      content.ncolumns = ncolumns;
      content.nrows = nrows;
      content.headers = [];
      content.cells = [];
      content.footers = NULL;
      content.aligns = [];
    }

    function printTableAddHeader(content, header, translate, align) {
      if (translate) header = _(header);
      content.headers.push(header);
      content.header = header;
      content.aligns.push(align);
      content.align = align;
    }

    function printTableAddCell(content, cell, translate, mustfree) {
      if (translate) cell = _(cell);
      content.cells.push(cell);
      content.cell = cell;
    }

    function printTableAddFooter(content, footer) {
      if (content.footers == NULL) content.footers = [];
      content.footers.push(footer);
      content.footer = { data: footer };  // as in C, the last footer (a printTableFooter)
    }

    function printTableSetFooter(content, footer) {
      if (content.footers) content.footers.pop();
      printTableAddFooter(content, footer);
    }

    function printTable(cont, fout, is_pager, flog) {
      outputFn({ ...cont });  // must clone in case same content object is reused (and thus mutated) later
    }



    /*
     * Write text at *lines to output with line numbers.
     *
     * For functions, lineno "1" should correspond to the first line of the
     * function body; lines before that are unnumbered.  We expect that
     * pg_get_functiondef() will emit that on a line beginning with "AS ",
     * "BEGIN ", or "RETURN ", and that there can be no such line before
     * the real start of the function body.
     *
     * Caution: this scribbles on *lines.
     */
    function print_with_linenumbers(output, lines, is_func) {
      let in_header = is_func;
      let lineno = 0;
      let result = '';

      lines = lines.trimEnd().split('\n');
      for (let line of lines) {
        if (in_header &&
          (strncmp(line, "AS ", 3) == 0 ||
            strncmp(line, "BEGIN ", 6) == 0 ||
            strncmp(line, "RETURN ", 7) == 0))
          in_header = false;

        /* increment lineno only for body's lines */
        if (!in_header)
          lineno++;

        /* show current line as appropriate */
        if (in_header)
          result += sprintf("        %s\n", line);
        else
          result += sprintf("%-7d %s\n", lineno, line);
      }

      fputs(result, output);
    }



    /*
     * Format a reloptions array and append it to the given buffer.
     *
     * "prefix" is prepended to the option names; typically it's "" or "toast.".
     *
     * Returns false if the reloptions array could not be parsed (in which case
     * nothing will have been appended to the buffer), or true on success.
     *
     * Note: this logic should generally match the backend's flatten_reloptions()
     * (in adt/ruleutils.c).
     */
    function appendReloptionsArray(buffer, reloptions, prefix, encoding, std_strings) {
      let options = [];
      let noptions = {};
      let i;

      if (!parsePGArray(reloptions, options, noptions)) {
        return false;
      }

      noptions = noptions.value;
      for (i = 0; i < noptions; i++) {
        let option = options[i];

        /*
         * Each array element should have the form name=value.  If the "=" is
         * missing for some reason, treat it like an empty value.
         */
        let [name, value] = option.split('=');
        value ??= "";

        if (i > 0)
          appendPQExpBufferStr(buffer, ", ");
        appendPQExpBuffer(buffer, "%s%s=", prefix, fmtId(name));

        /*
         * In general we need to quote the value; but to avoid unnecessary
         * clutter, do not quote if it is an identifier that would not need
         * quoting.  (We could also allow numbers, but that is a bit trickier
         * than it looks --- for example, are leading zeroes significant?  We
         * don't want to assume very much here about what custom reloptions
         * might mean.)
         */
        if (strcmp(fmtId(value), value) == 0)
          appendPQExpBufferStr(buffer, value);
        else
          appendStringLiteral(buffer, value, encoding, std_strings);
      }

      return true;
    }

    /*
     * Deconstruct the text representation of a 1-dimensional Postgres array
     * into individual items.
     *
     * On success, returns true and sets *itemarray and *nitems to describe
     * an array of individual strings.  On parse failure, returns false;
     * *itemarray may exist or be NULL.
     *
     * NOTE: free'ing itemarray is sufficient to deallocate the working storage.
     */
    function parsePGArray(atext, items, nitems) {
      let inputlen;
      let strings;
      let curitem;

      /*
       * We expect input in the form of "{item,item,item}" where any item is
       * either raw data, or surrounded by double quotes (in which case embedded
       * characters including backslashes and quotes are backslashed).
       *
       * We build the result as an array of pointers followed by the actual
       * string data, all in one malloc block for convenience of deallocation.
       * The worst-case storage need is not more than one pointer and one
       * character for each input character (consider "{,,,,,,,,,,}").
       */
      inputlen = strlen(atext);
      nitems.value = 0;

      if (inputlen < 2 || atext[0] != '{' || atext[inputlen - 1] != '}')
        return false;			/* bad input */

      let at = 0;
      at++;					/* advance over initial '{' */

      curitem = 0;
      while (atext[at] != '}') {
        if (atext[at] == NULL)
          return false;		/* premature end of string */

        // *** items[curitem] = strings;
        strings = "";
        while (atext[at] != '}' && atext[at] != ',') {
          if (atext[at] == NULL)
            return false;	/* premature end of string */
          if (atext[at] != '"')
            strings += atext[at++];  /* copy unquoted data */
          else {
            /* process quoted substring */
            at++;
            while (atext[at] != '"') {
              if (atext[at] == NULL)
                return false;	/* premature end of string */
              if (atext[at] == '\\') {
                at++;
                if (atext[at] == NULL)
                  return false;	/* premature end of string */
              }
              strings += atext[at++];	/* copy quoted data */
            }
            at++;
          }
        }
        items[curitem] = strings;

        if (atext[at] == ',')
          at++;
        curitem++;
      }
      if (atext[at + 1] && atext[at + 1] != NULL)
        return false;			/* bogus syntax (embedded '}') */
      nitems.value = curitem;
      return true;
    }

    /*
     *	Quotes input string if it's not a legitimate SQL identifier as-is.
     *
     *	Note that the returned string must be used before calling fmtId again,
     *	since we re-use the same return buffer each time.
     */
    function fmtId(rawid) {
      let id_return = { /* struct */ };
      initPQExpBuffer(id_return);
      let need_quotes = false;

      /*
       * These checks need to match the identifier production in scan.l. Don't
       * use islower() etc.
       */
      if (quote_all_identifiers)
        need_quotes = true;
      /* slightly different rules for first character */
      else if (!((rawid[0] >= 'a' && rawid[0] <= 'z') || rawid[0] == '_'))
        need_quotes = true;
      else {
        /* otherwise check the entire string */
        if (/[^a-z0-9_]/.test(rawid)) need_quotes = true;
      }

      if (!need_quotes) {
        /*
         * Check for keyword.  We quote keywords except for unreserved ones.
         * (In some cases we could avoid quoting a col_name or type_func_name
         * keyword, but it seems much harder than it's worth to tell that.)
         *
         * Note: ScanKeywordLookup() does case-insensitive comparison, but
         * that's fine, since we already know we have all-lower-case.
         */
        let kw = new Set(["all", "analyse", "analyze", "and", "any", "array", "as", "asc", "asymmetric", "authorization", "between", "bigint", "binary", "bit", "boolean", "both", "case", "cast", "char", "character", "check", "coalesce", "collate", "collation", "column", "concurrently", "constraint", "create", "cross", "current_catalog", "current_date", "current_role", "current_schema", "current_time", "current_timestamp", "current_user", "dec", "decimal", "default", "deferrable", "desc", "distinct", "do", "else", "end", "except", "exists", "extract", "false", "fetch", "float", "for", "foreign", "freeze", "from", "full", "grant", "greatest", "group", "grouping", "having", "ilike", "in", "initially", "inner", "inout", "int", "integer", "intersect", "interval", "into", "is", "isnull", "join", "json", "json_array", "json_arrayagg", "json_object", "json_objectagg", "json_scalar", "json_serialize", "lateral", "leading", "least", "left", "like", "limit", "localtime", "localtimestamp", "national", "natural", "nchar", "none", "normalize", "not", "notnull", "null", "nullif", "numeric", "offset", "on", "only", "or", "order", "out", "outer", "overlaps", "overlay", "placing", "position", "precision", "primary", "real", "references", "returning", "right", "row", "select", "session_user", "setof", "similar", "smallint", "some", "substring", "symmetric", "system_user", "table", "tablesample", "then", "time", "timestamp", "to", "trailing", "treat", "trim", "true", "union", "unique", "user", "using", "values", "varchar", "variadic", "verbose", "when", "where", "window", "with", "xmlattributes", "xmlconcat", "xmlelement", "xmlexists", "xmlforest", "xmlnamespaces", "xmlparse", "xmlpi", "xmlroot", "xmlserialize", "xmltable"]).has(rawid);

        if (kw) need_quotes = true;
      }

      if (!need_quotes) {
        /* no quoting needed */
        appendPQExpBufferStr(id_return, rawid);
      }
      else {
        appendPQExpBufferChar(id_return, '"');
        appendPQExpBufferChar(id_return, rawid.replace(/"/g, '""'));
        appendPQExpBufferChar(id_return, '"');
      }

      return id_return.data;
    }



























































    return true;
  }

  const promise = main();
  return { promise, cancel };
}

function pad(str, len, align, pre = '', post = '') {
  const spaces = Math.max(0, len - strlen(str));
  if (align === 'r') return pre + ' '.repeat(spaces) + str + post;
  if (align === 'c') return pre + ' '.repeat(Math.floor(spaces / 2)) + str + ' '.repeat(Math.ceil(spaces / 2)) + post;
  return pre + str + ' '.repeat(spaces) + post;  // default is left align
}

function byN(arr, n) {
  let i = 0;
  const len = arr.length;
  const result = [];
  while (i < len) result.push(arr.slice(i, (i += n)));
  return result;
}

function linesInfo(str) {
  let pos = -1, prevPos = 0, count = 1, longest = 0;
  while ((pos = str.indexOf('\n', pos + 1)) !== -1) {
    if (pos - prevPos > longest) longest = pos - prevPos;
    prevPos = pos + 1;
    count++;
  }
  if (str.length - prevPos > longest) longest = str.length - prevPos;
  return { count, longest };
}

export function htmlEscape(str, convertWhitespace) {
  str = str.replace(/[<>&'"]/g, m => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[m]));
  if (convertWhitespace) str = str.replace(/ /g, '&nbsp;').replace(/\n/g, '<br />');
  return str;
}

function tableToStringVertical(td) {
  const { ncolumns, nrows, headers, cells } = td;
  if (cells.length === 0) return `(${nrows} row${nrows === 1 ? '' : 's'})`;

  const
    // max header dimensions
    hinfo = headers.map(linesInfo),
    hwidth = hinfo.reduce((longest, li) => longest > li.longest ? longest : li.longest, 0),
    // max data dimensions
    dinfo = cells.map(linesInfo),
    dwidth = dinfo.reduce((longest, li) => longest > li.longest ? longest : li.longest, 0),
    // other widths
    swidth = 3, // separator " | " or "+| "
    rwidth = nrows === 0 ? 0 : 13 + (Math.log10(td.nrows) | 0), // record header "-[ RECORD n ]",
    // total width required to not wrap data or record headers
    width = Math.max(hwidth + swidth + dwidth, rwidth),
    effectivedwidth = width - hwidth - swidth;

  let table = '';
  for (let i = 0, len = cells.length, rownum = 0; i < len; i ++) {
    const colnum = i % ncolumns;
    if (colnum === 0) {
      rownum++;
      let rheader = `-[ RECORD ${rownum} ]`;
      if (rheader.length < hwidth + 1) rheader += '-'.repeat(hwidth - rheader.length + 1);
      if (rheader.length < hwidth + 2) rheader += '+';
      if (rheader.length < width) rheader += '-'.repeat(width - rheader.length);
      table += `\n${rheader}`;
    }

    const header = headers[colnum];
    const headerlines = header.split('\n');
    const headernlines = headerlines.length;

    const cell = cells[i];
    const celllines = cell.split('\n');
    const cellnlines = celllines.length;

    const maxnlines = Math.max(headernlines, cellnlines);

    for (let j = 0; j < maxnlines; j++) {
      table +=
        '\n' +
        pad(headerlines[j] ?? '', hwidth) +
        (headernlines > j + 1 ? '+' : ' ') +
        '| ' +
        pad(celllines[j] ?? '', effectivedwidth) +
        (cellnlines > j + 1 ? '+' : '');
    }
  }

  const
    nonEmptyFooters = td.footers ? td.footers.filter(noop) : [],
    footers = nonEmptyFooters.length > 0 ? '\n\n' + nonEmptyFooters.join('\n') : '';

  const result = `${td.title}${table}${footers}`;
  return result;
}

function tableToString(td) {
  if (td.opt.expanded) return tableToStringVertical(td);
  const
    { ncolumns, nrows, aligns } = td,
    allCellsLinesInfo = [...td.headers, ...td.cells].map(linesInfo),
    { colWidths, rowHeights } = allCellsLinesInfo.reduce((memo, cellInfo, i) => {
      const row = Math.floor(i / td.ncolumns);
      const col = i % td.ncolumns;
      if (cellInfo.longest > memo.colWidths[col]) memo.colWidths[col] = cellInfo.longest;
      if (cellInfo.count > memo.rowHeights[row]) memo.rowHeights[row] = cellInfo.count;
      return memo;
    }, {
      colWidths: new Array(ncolumns).fill(0),
      rowHeights: new Array(nrows + 1 /* -> header row */).fill(1)
    }),
    totalWidth = colWidths.reduce((memo, width) => memo + width, 0) + ncolumns * 2 + (ncolumns - 1),
    title = pad(td.title, totalWidth, 'c'),
    rows = [td.headers, null /* line under headers */, ...byN(td.cells, ncolumns)],
    table = rows.map((row, rowIndex) => {  // here be dragons
      if (rowIndex === 1) {  // line under headers
        return td.headers.map((header, i) => '-'.repeat(colWidths[i % ncolumns] + 2)).join('+');
      }
      if (rowIndex > 1) rowIndex--;  // ignore line under headers when indexing
      const rowLines = row.map(cell => cell.split('\n'));
      return new Array(rowHeights[rowIndex]).fill('').map((empty, rowLineIndex) =>
        rowLines.map((cellLine, colIndex) => pad(
          cellLine[rowLineIndex] ?? '',
          colWidths[colIndex],
          rowIndex === 0 ? 'c' : aligns[colIndex],
          ' ',
          cellLine[rowLineIndex + 1] === undefined ? ' ' : '+'
        )).join('|')).join('\n')
    }).join('\n'),
    nonEmptyFooters = td.footers ? td.footers.filter(noop) : [],
    footers = nonEmptyFooters.length > 0 ? '\n' + nonEmptyFooters.join('\n') :
      td.opt.default_footer ? `\n(${nrows} row${nrows === 1 ? '' : 's'})` :
        '';

  const result = `${title}\n${table}${footers}`;
  return result;
}

function tableToHtmlVertical(td) {
  const { ncolumns, cells, headers } = td;
  let result = `<table><tr><th align="left" colspan="2">${htmlEscape(td.title)}</th></tr>`;
  const escapedHeaders = headers.map(h => htmlEscape(h, true));
  for (let i = 0, len = cells.length, rownum = 0; i < len; i ++) {
    const colnum = i % ncolumns;
    if (colnum === 0) {
      rownum++;
      result += `<tr><th align="left" colspan="2">RECORD ${rownum}</th></tr>`;
    }
    const escapedHeader = escapedHeaders[colnum];
    const escapedCell = htmlEscape(cells[i], true);
    result += `<tr><td valign="top">${escapedHeader}</td><td valign="top">${escapedCell}</td></tr>`;
  }
  result += '</table>';
  const nonEmptyFooters = td.footers ? td.footers.filter(noop) : [];
  if (nonEmptyFooters.length > 0) {
    if (nonEmptyFooters.length > 1 && nonEmptyFooters.some(footer => /^\s/.test(footer))) {
      result += `<dl>` + nonEmptyFooters.map(footer => /^\s/.test(footer) ? `<dd>${htmlEscape(footer.trim(), true)}</dd>` : `<dt>${htmlEscape(footer, true)}</dt>`).join('') + '</dl>';
    } else {
      result += nonEmptyFooters.map(footer => `<p>${htmlEscape(footer, true)}</p>`).join('');
    }
  }
  return result;
}

function tableToHtml(td) {
  if (td.opt.expanded) return tableToHtmlVertical(td);
  let result = `<table><tr><th valign="top" style="text-align: center;" colspan="${td.ncolumns}">${htmlEscape(td.title)}</th></tr><tr>`;
  for (let h of td.headers) result += `<th valign="top" style="text-align: center;">${htmlEscape(h)}</th>`;
  result += '</tr>'
  for (let row of byN(td.cells, td.ncolumns)) {
    result +=
      `<tr>` +
      row.map((cell, i) => `<td valign="top" style="text-align: ${td.aligns[i] === 'c' ? 'center' : td.aligns[i] === 'r' ? 'right' : 'left'}">${htmlEscape(cell).replace(/\n/g, '<br>')}</td>`).join('\n') +
      '</tr>';
  }
  result += '</table>';
  const nonEmptyFooters = td.footers ? td.footers.filter(noop) : [];
  if (nonEmptyFooters.length > 0) {
    if (nonEmptyFooters.length > 1 && nonEmptyFooters.some(footer => /^\s/.test(footer))) {
      result += `<dl>` + nonEmptyFooters.map(footer => /^\s/.test(footer) ? `<dd>${htmlEscape(footer.trim(), true)}</dd>` : `<dt>${htmlEscape(footer, true)}</dt>`).join('') + '</dl>';
    } else {
      result += nonEmptyFooters.map(footer => `<p>${htmlEscape(footer, true)}</p>`).join('');
    }
  } else if (td.opt.default_footer) {
    result += `<p>(${td.nrows} row${td.nrows === 1 ? '' : 's'})</p>`;
  }
  return result;
}

function Assert(cond) {
  if (!cond) throw new Error(`Assertion failed (value: ${cond})`);
}

const
  gettext_noop = noop,
  ngettext = (singular, plural, n) => n === 1 ? singular : plural,
  pg_strdup = noop,
  _ = noop;

function strstr(str1, str2) {  // as in C: the rest of str1, from the first str2 in it, or NULL if there isn't one
  const index = str1.indexOf(str2);
  return index === -1 ? NULL : str1.slice(index);
}

const strchr = strstr;

function strlen(str) {
  return str.length;
}

function strncmp(s1, s2, n) {
  if (typeof s1 !== 'string' || typeof s2 !== 'string') throw new Error('Not a string');
  if (s1.length > n) s1 = s1.slice(0, n);
  if (s2.length > n) s2 = s2.slice(0, n);
  return s1 < s2 ? -1 : s1 > s2 ? 1 : 0;
}

function strcmp(s1, s2) {
  return strncmp(s1, s2, Infinity);
}

function strspn(str, chrs) {
  const len = strlen(str);
  for (let i = 0; i < len; i++) if (chrs.indexOf(str[i]) === -1) return i;
  return len;
}

function atoi(str) {
  return parseInt(str, 10);
}

function atooid(str) {
  return parseInt(str, 10);
}

function isWhitespace(chr) {
  return chr === ' ' || chr === '\t' || chr === '\n' || chr === '\r';
}

function isQuote(chr) {
  return chr === '"' || chr === "'";
}

function isupper(chr) {
  const ch = chr.charCodeAt(0);
  return ch >= 65 && ch <= 90;
}

function lengthof(x) {
  return x.length;
}

function pg_tolower(ch) {
  return ch.toLowerCase();
}

function pg_strcasecmp(s1, s2) {
  return strcmp(s1.toLowerCase(), s2.toLowerCase());
}

function pg_wcswidth(pwcs, len, encoding) {
  return len;
}

function sizeof(x) {
  return 0;
}

function initPQExpBuffer(buf) {
  buf.data = '';
  buf.len = 0;
}

function createPQExpBuffer() {
  const buf = {};
  initPQExpBuffer(buf);
  return buf;
}

const resetPQExpBuffer = initPQExpBuffer;

function appendPQExpBufferStr(buf, str) {
  buf.data += str;
  buf.len = buf.data.length;
}

const appendPQExpBufferChar = appendPQExpBufferStr;

function appendPQExpBuffer(buf, template, ...values) {
  const str = sprintf(template, ...values);
  appendPQExpBufferStr(buf, str);
}

function printfPQExpBuffer(buf, template, ...values) {
  initPQExpBuffer(buf);
  appendPQExpBuffer(buf, template, ...values);
}

function appendStringLiteral(buf, str, encoding, std_strings) {
  const escaped = str.replace((std_strings ? /[']/g : /['\\]/g), '\\$&');
  const quoted = "'" + escaped + "'";
  appendPQExpBufferStr(buf, quoted);
}

function appendStringLiteralConn(buf, str, conn) {
  /*
   * XXX This is a kluge to silence escape_string_warning in our utility
   * programs.  It can go away once pre-v19 servers are out of support.
   */
  if (strchr(str, '\\') != NULL && PQserverVersion(conn) < 190000) {
    /* ensure we are not adjacent to an identifier */
    if (buf.len > 0 && buf.data[buf.len - 1] != ' ')
      appendPQExpBufferChar(buf, ' ');
    appendPQExpBufferChar(buf, ESCAPE_STRING_SYNTAX);
    appendStringLiteral(buf, str, PQclientEncoding(conn), false);
    return;
  }
  /* XXX end kluge */

  appendStringLiteral(buf, str, conn.encoding, conn.std_strings);
}

function sprintf(template, ...values) {  // just enough sprintf
  let result = '';
  let valuesIndex = 0;
  let chrIndex = 0;
  let nextChrIndex;
  while ((nextChrIndex = template.indexOf('%', chrIndex)) !== -1) {
    let padTo = 0;
    let padLeft = false;
    result += template.slice(chrIndex, nextChrIndex);
    chrIndex = nextChrIndex + 1;
    let pcChr = template[chrIndex++];
    if (pcChr === '%') result += '%';
    if (pcChr === '*') {
      padTo = parseInt(values[valuesIndex++], 10);
      pcChr = template[chrIndex++];
    }
    if (pcChr === '-') {
      padLeft = true;
      pcChr = template[chrIndex++];
    }
    if (pcChr >= '0' && pcChr <= '9') {  // don't support multidigit widths!
      padTo = parseInt(pcChr, 10);
      pcChr = template[chrIndex++];
    }
    if (pcChr === 's' || pcChr === 'c' || pcChr === 'd' || pcChr === 'u') {
      const ins = String(values[valuesIndex++]);
      const padBy = padTo - ins.length;
      if (padLeft === false && padBy > 0) result += ' '.repeat(padBy);
      result += ins;
      if (padLeft === true && padBy > 0) result += ' '.repeat(padBy);
    }
  }
  result += template.slice(chrIndex);
  return result;
}

const psprintf = sprintf;

function PQdb(conn) {
  if (!conn) return NULL;
  return conn.dbName;
}

function PQserverVersion(conn) {
  if (!conn) return 0;
  if (conn.status === CONNECTION_BAD) return 0;
  return conn.sversion;
}

function PQclientEncoding(conn) {
  if (!conn || conn.status != CONNECTION_OK) return -1;
  return conn.client_encoding;
}

function PQntuples(res) {
  return res.rowCount;
}

function PQnfields(res) {
  return res.fields.length;
}

function PQfname(res, field_num) {
  return res.fields[field_num].name;
}

function PQftype(res, field_num) {
  return res.fields[field_num].dataTypeID;
}

function PQgetisnull(res, tup_num, field_num) {
  return res.rows[tup_num][field_num] === null ? 1 : 0;
}

function PQgetvalue(res, tup_num, field_num) {
  const val = res.rows[tup_num][field_num];
  return String(val === null ? '' : val);
}

/*
 * PQfnumber: find column number given column name
 *
 * The column name is parsed as if it were in a SQL statement, including
 * case-folding and double-quote processing.  But note a possible gotcha:
 * downcasing in the frontend might follow different locale rules than
 * downcasing in the backend...
 *
 * Returns -1 if no match.  In the present backend it is also possible
 * to have multiple matches, in which case the first one is found.
 */
function PQfnumber(res, field_name) {
  let in_quotes;
  let iptr;
  let optr;
  let i;
  let len;

  if (!res) return -1;

  /*
   * Note: it is correct to reject a zero-length input string; the proper
   * input to match a zero-length field name would be "".
   */
  if (field_name == NULL || field_name[0] == NULL) return -1;

  /*
   * Note: this code will not reject partially quoted strings, eg
   * foo"BAR"foo will become fooBARfoo when it probably ought to be an error
   * condition.
   */

  in_quotes = false;
  optr = '';
  for (iptr = 0, len = strlen(field_name); iptr < len; iptr++) {
    let c = field_name[iptr];

    if (in_quotes) {
      if (c == '"') {
        if (field_name[iptr + 1] == '"') {
          /* doubled quotes become a single quote */
          optr += '"';
          iptr++;
        }
        else
          in_quotes = false;
      }
      else
        optr += c;
    }
    else if (c == '"')
      in_quotes = true;
    else {
      c = pg_tolower(c);
      optr += c;
    }
  }

  for (i = 0, len = PQnfields(res); i < len; i++) {
    if (strcmp(optr, PQfname(res, i)) == 0) {
      return i;
    }
  }

  return -1;
}


/*
 * Parse off the next argument for a backslash command, and return it as a
 * malloc'd string.  If there are no more arguments, returns NULL.
 *
 * type tells what processing, if any, to perform on the option string;
 * for example, if it's a SQL identifier, we want to downcase any unquoted
 * letters.
 *
 * if quote is not NULL, *quote is set to 0 if no quoting was found, else
 * the last quote symbol used in the argument.
 *
 * if semicolon is true, unquoted trailing semicolon(s) that would otherwise
 * be taken as part of the option string will be stripped.
 *
 * NOTE: the only possible syntax errors for backslash options are unmatched
 * quotes, which are detected when we run out of input.  Therefore, on a
 * syntax error we just throw away the string and return NULL; there is no
 * need to worry about flushing remaining input.
 */
function psql_scan_slash_option(scan_state, type, quote, semicolon) {
  if (type !== OT_NORMAL && type !== OT_WHOLE_LINE) throw new Error(`scan type ${type} not implemented`);
  if (quote !== NULL) throw new Error('cannot return quote type');

  const quoteStack = [];
  const resultRe = semicolon ? /^(.*);*$/ : /^(.*)$/;
  let chr;

  // trim leading whitespace
  for (; ;) {
    chr = scan_state[0][scan_state[1]];  // => str[index]
    if (chr == NULL) return NULL;
    if (!isWhitespace(chr)) break;
    scan_state[1]++;
  }

  if (type === OT_WHOLE_LINE) {
    return scan_state[0].slice(scan_state[1], scan_state[1] = scan_state[0].length);
  }

  // parse for next unquoted whitespace or end of string
  let result = '';
  for (; ;) {
    chr = scan_state[0][scan_state[1]++];  // => str[index++]

    if (chr == NULL) {
      if (quoteStack.length > 0) return NULL;
      return result.match(resultRe)[1];
    }

    if (isQuote(chr)) {
      if (chr === quoteStack[quoteStack.length - 1]) quoteStack.pop();
      else quoteStack.push(chr);
      if (chr === '"') result += chr;  // ' is not passed through

    } else {
      if (quoteStack.length === 0 && isWhitespace(chr)) {
        return result.match(resultRe)[1];
      }
      result += chr;
    }
  }
}

function noop(x) {
  return x;
}
