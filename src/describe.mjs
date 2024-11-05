const quote_all_identifiers = 0;

const NULL = null;
const FUNC_MAX_ARGS = 100;
const ESCAPE_STRING_SYNTAX = 'E';
const InvalidOid = 0;

const
  EditableFunction = 0,
  EditableView = 1;

const
  PSQL_CMD_UNKNOWN = 0,		/* not done parsing yet (internal only) */
  PSQL_CMD_SKIP_LINE = 2,			/* keep building query */
  PSQL_CMD_ERROR = 5;				/* the execution of the backslash command */

const
  OT_NORMAL = 0,
  OT_WHOLE_LINE = 4;				/* just snarf the rest of the line */

const PG_UTF8 = 6;

const
  CONNECTION_OK = 0,
  CONNECTION_BAD = 1;

const
  COERCION_METHOD_BINARY = 'b',	/* types are binary-compatible */
  COERCION_METHOD_INOUT = 'i'; /* use input/output functions */

const
  COERCION_CODE_ASSIGNMENT = 'a', /* coercion in context of assignment */
  COERCION_CODE_EXPLICIT = 'e';	/* explicit cast operation */

const
  DEFACLOBJ_RELATION = 'r', /* table, view */
  DEFACLOBJ_SEQUENCE = 'S', /* sequence */
  DEFACLOBJ_FUNCTION = 'f', /* function */
  DEFACLOBJ_TYPE = 'T', /* type */
  DEFACLOBJ_NAMESPACE = 'n'; /* namespace */

const
  ATTRIBUTE_IDENTITY_ALWAYS = 'a',
  ATTRIBUTE_IDENTITY_BY_DEFAULT = 'd',
  ATTRIBUTE_GENERATED_STORED = 's';

const
  RELKIND_RELATION = 'r',
  RELKIND_INDEX = 'i',
  RELKIND_SEQUENCE = 'S',
  RELKIND_TOASTVALUE = 't',
  RELKIND_VIEW = 'v',
  RELKIND_MATVIEW = 'm',
  RELKIND_COMPOSITE_TYPE = 'c',
  RELKIND_FOREIGN_TABLE = 'f',
  RELKIND_PARTITIONED_TABLE = 'p',
  RELKIND_PARTITIONED_INDEX = 'I';

const
  INT8OID = 20,
  INT2OID = 21,
  INT4OID = 23,
  OIDOID = 26,
  XIDOID = 28,
  CIDOID = 29,
  XID8OID = 5069,
  FLOAT4OID = 700,
  FLOAT8OID = 701,
  MONEYOID = 790,
  NUMERICOID = 1700;

export function describeDataToString(item) {
  return typeof item === 'string' ? item : tableToString(item);
}

export function describeDataToHtml(item) {
  return typeof item === 'string' ? `<p>${htmlEscape(item, true)}</p>` : tableToHtml(item);
}

export function describe(cmd, dbName, runQuery, outputFn, echoHidden = false, sversion = null, std_strings = 1, docsURLTemplate = (id) => `https://www.postgresql.org/docs/current/${id}.html`) {
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

    // synonyms
    matchedCommand = matchedCommand.replace(/^lo_list/, 'dl');
    matchedCommand = matchedCommand.replace(/^z/, 'dp');

    if (matchedCommand === '?') {  // command help
      outputFn(helpText);
      return false;
    }

    if (matchedCommand === 'h') {  // SQL help
      const helpSearch = (remaining ?? '').trim().toUpperCase().replace(/\s+/g, ' ');

      if (helpSearch === '') {
        outputFn("Available help:\n" + helpIndex.map(arr => arr[0]).join('\n'));
        return false;

      } else {
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
          outputFn(`No help available for "${remaining.trim()}".\nTry \\h with no arguments to see available help.`);
          return false;

        } else {
          for (const index of matches) {
            const helpBuf = {};
            initPQExpBuffer(helpBuf);
            index[3](helpBuf);
            outputFn(
              `Command:     ${index[0]}\n` +
              `Description: ${index[1]}\n` +
              `Syntax:\n${helpBuf.data}\n\n` +
              `URL: ${docsURLTemplate(index[2])}\n\n`
            );
          }
          return false;
        }
      }
    }

    const PSQLexec = async (sql, suppressEcho = false) => {
      throwIfCancelled();
      if (echoHidden && !suppressEcho) outputFn(`/******** QUERY *********/\n${sql}\n/************************/`);
      const result = await runQuery(sql);
      throwIfCancelled();
      return result;
    };

    let pset;
    try {
      // get server version, if not supplied
      if (!sversion) {  // covers null, undefined and (importantly) 0
        const vres = await PSQLexec('SHOW server_version_num', true);
        sversion = parseInt(vres.rows[0][0], 10);
      }

      pset = {
        sversion,
        db: {  // PGconn struct
          dbName,
          sversion,
          std_strings,
          status: CONNECTION_OK,
          encoding: PG_UTF8
        },
        popt: {  // print options
          topt: {
            default_footer: true,
          },
          nullPrint: '',
        }
      };

      const
        scan_state = [remaining, 0],
        result = await (
          matchedCommand[0] === 'd' ? exec_command_d(scan_state, true, matchedCommand) :
            matchedCommand[0] === 's' ?
              (matchedCommand[1] === 'f' || matchedCommand[1] === 'v' ?
                exec_command_sf_sv(scan_state, true, matchedCommand, matchedCommand[1] === 'f') :
                PSQL_CMD_UNKNOWN) :
              matchedCommand[0] === 'l' ? exec_command_list(scan_state, true, matchedCommand) :
                PSQL_CMD_UNKNOWN
        );

      if (result === PSQL_CMD_UNKNOWN) outputFn(`invalid command \\${matchedCommand}`);
      // if (result === PSQL_CMD_ERROR) outputFn('...');  // what goes here?

      let arg, warnings = [];
      while (arg = psql_scan_slash_option(scan_state, OT_NORMAL, NULL, true)) warnings.push(sprintf("\\%s: extra argument \"%s\" ignored", matchedCommand, arg));
      if (warnings.length > 0) outputFn(warnings.join('\n'));

    } catch (err) {
      // throw err;
      outputFn('ERROR:  ' + err.message);
      return cancel_pressed ? null : false;
    }

    function pg_log_error(template, ...args) {
      outputFn(sprintf(template, ...args));
    }

    /*
     * validateSQLNamePattern
     *
     * Wrapper around string_utils's processSQLNamePattern which also checks the
     * pattern's validity.  In addition to that function's parameters, takes a
     * 'maxparts' parameter specifying the maximum number of dotted names the
     * pattern is allowed to have, and a 'added_clause' parameter that returns by
     * reference whether a clause was added to 'buf'.  Returns whether the pattern
     * passed validation, after logging any errors.
     */
    function validateSQLNamePattern(buf, pattern, have_where,
      force_escape, schemavar,
      namevar, altnamevar,
      visibilityrule, added_clause /* bool return param */,
      maxparts) {
      let dbbuf = { /* struct */ };
      let dotcnt = {};
      let added;

      initPQExpBuffer(dbbuf);
      added = processSQLNamePattern(pset.db, buf, pattern, have_where, force_escape,
        schemavar, namevar, altnamevar,
        visibilityrule, dbbuf, dotcnt);
      dotcnt = dotcnt.value;
      if (added_clause) added_clause.value = added;

      if (dotcnt >= maxparts) {
        pg_log_error("improper qualified name (too many dotted names): %s",
          pattern);
        return false;
      }

      if (maxparts > 1 && dotcnt == maxparts - 1) {
        if (PQdb(pset.db) == NULL) {
          pg_log_error("You are currently not connected to a database.");
          return false;
        }
        if (strcmp(PQdb(pset.db), dbbuf.data) != 0) {
          pg_log_error("cross-database references are not implemented: %s",
            pattern);
          return false;
        }
      }

      return true;
    }

    /*
     * processSQLNamePattern
     *
     * Scan a wildcard-pattern string and generate appropriate WHERE clauses
     * to limit the set of objects returned.  The WHERE clauses are appended
     * to the already-partially-constructed query in buf.  Returns whether
     * any clause was added.
     *
     * conn: connection query will be sent to (consulted for escaping rules).
     * buf: output parameter.
     * pattern: user-specified pattern option, or NULL if none ("*" is implied).
     * have_where: true if caller already emitted "WHERE" (clauses will be ANDed
     * onto the existing WHERE clause).
     * force_escape: always quote regexp special characters, even outside
     * double quotes (else they are quoted only between double quotes).
     * schemavar: name of query variable to match against a schema-name pattern.
     * Can be NULL if no schema.
     * namevar: name of query variable to match against an object-name pattern.
     * altnamevar: NULL, or name of an alternative variable to match against name.
     * visibilityrule: clause to use if we want to restrict to visible objects
     * (for example, "pg_catalog.pg_table_is_visible(p.oid)").  Can be NULL.
     * dbnamebuf: output parameter receiving the database name portion of the
     * pattern, if any.  Can be NULL.
     * dotcnt: how many separators were parsed from the pattern, by reference.
     *
     * Formatting note: the text already present in buf should end with a newline.
     * The appended text, if any, will end with one too.
     */
    function processSQLNamePattern(conn, buf, pattern,
      have_where, force_escape,
      schemavar, namevar,
      altnamevar, visibilityrule,
      dbnamebuf, dotcnt /* integer output param */) {

      let schemabuf = { /* struct */ };
      let namebuf = { /* struct */ };
      let added_clause = false;

      if (!dotcnt) dotcnt = {};
      dotcnt.value = 0;

      if (pattern == NULL) {
        /* Default: select all visible objects */
        if (visibilityrule) {
          appendPQExpBufferStr(buf, have_where ? "  AND " : "WHERE "); have_where = true; added_clause = true;
          appendPQExpBuffer(buf, "%s\n", visibilityrule);
        }
        return added_clause;
      }

      initPQExpBuffer(schemabuf);
      initPQExpBuffer(namebuf);

      /*
       * Convert shell-style 'pattern' into the regular expression(s) we want to
       * execute.  Quoting/escaping into SQL literal format will be done below
       * using appendStringLiteralConn().
       *
       * If the caller provided a schemavar, we want to split the pattern on
       * ".", otherwise not.
       */
      patternToSQLRegex(PQclientEncoding(conn),
        (schemavar ? dbnamebuf : NULL),
        (schemavar ? schemabuf : NULL),
        namebuf,
        pattern, force_escape, true, dotcnt);

      /*
       * Now decide what we need to emit.  We may run under a hostile
       * search_path, so qualify EVERY name.  Note there will be a leading "^("
       * in the patterns in any case.
       *
       * We want the regex matches to use the database's default collation where
       * collation-sensitive behavior is required (for example, which characters
       * match '\w').  That happened by default before PG v12, but if the server
       * is >= v12 then we need to force it through explicit COLLATE clauses,
       * otherwise the "C" collation attached to "name" catalog columns wins.
       */
      if (namevar && namebuf.len > 2) {
        /* We have a name pattern, so constrain the namevar(s) */

        /* Optimize away a "*" pattern */
        if (strcmp(namebuf.data, "^(.*)$") != 0) {
          appendPQExpBufferStr(buf, have_where ? "  AND " : "WHERE "); have_where = true; added_clause = true;
          if (altnamevar) {
            appendPQExpBuffer(buf,
              "(%s OPERATOR(pg_catalog.~) ", namevar);
            appendStringLiteralConn(buf, namebuf.data, conn);
            if (PQserverVersion(conn) >= 120000)
              appendPQExpBufferStr(buf, " COLLATE pg_catalog.default");
            appendPQExpBuffer(buf,
              "\n        OR %s OPERATOR(pg_catalog.~) ",
              altnamevar);
            appendStringLiteralConn(buf, namebuf.data, conn);
            if (PQserverVersion(conn) >= 120000)
              appendPQExpBufferStr(buf, " COLLATE pg_catalog.default");
            appendPQExpBufferStr(buf, ")\n");
          }
          else {
            appendPQExpBuffer(buf, "%s OPERATOR(pg_catalog.~) ", namevar);
            appendStringLiteralConn(buf, namebuf.data, conn);
            if (PQserverVersion(conn) >= 120000)
              appendPQExpBufferStr(buf, " COLLATE pg_catalog.default");
            appendPQExpBufferChar(buf, '\n');
          }
        }
      }

      if (schemavar && schemabuf.len > 2) {
        /* We have a schema pattern, so constrain the schemavar */

        /* Optimize away a "*" pattern */
        if (strcmp(schemabuf.data, "^(.*)$") != 0 && schemavar) {
          appendPQExpBufferStr(buf, have_where ? "  AND " : "WHERE "); have_where = true; added_clause = true;
          appendPQExpBuffer(buf, "%s OPERATOR(pg_catalog.~) ", schemavar);
          appendStringLiteralConn(buf, schemabuf.data, conn);
          if (PQserverVersion(conn) >= 120000)
            appendPQExpBufferStr(buf, " COLLATE pg_catalog.default");
          appendPQExpBufferChar(buf, '\n');
        }
      }
      else {
        /* No schema pattern given, so select only visible objects */
        if (visibilityrule) {
          appendPQExpBufferStr(buf, have_where ? "  AND " : "WHERE "); have_where = true; added_clause = true;
          appendPQExpBuffer(buf, "%s\n", visibilityrule);
        }
      }

      return added_clause;
    }

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
      content.footer = footer;
    }

    function printTableSetFooter(content, footer) {
      if (content.footers) content.footers.pop();
      printTableAddFooter(content, footer);
    }

    function printTable(cont, fout, is_pager, flog) {
      outputFn({ ...cont });  // must clone in case same content object is reused (and thus mutated) later
    }


    /* from command.c */

    /*
     * \sf/\sv -- show a function/view's source code
     */
    async function exec_command_sf_sv(scan_state, active_branch, cmd, is_func) {
      let status = PSQL_CMD_SKIP_LINE;
      let show_linenumbers = (strchr(cmd, '+') != NULL);
      let buf = { /* struct */ };
      let obj_desc;
      let obj_oid = { value: InvalidOid };
      let eot = is_func ? EditableFunction : EditableView;

      initPQExpBuffer(buf);
      obj_desc = psql_scan_slash_option(scan_state,
        OT_WHOLE_LINE, NULL, true);

      if (!obj_desc) {
        if (is_func)
          pg_log_error("function name is required");
        else
          pg_log_error("view name is required");
        status = PSQL_CMD_ERROR;
      }
      else if (!await lookup_object_oid(eot, obj_desc, obj_oid)) {
        /* error already reported */
        status = PSQL_CMD_ERROR;
      }
      else if (!await get_create_object_cmd(eot, obj_oid.value, buf)) {
        /* error already reported */
        status = PSQL_CMD_ERROR;
      }
      else {
        if (show_linenumbers) {
          /* add line numbers */
          print_with_linenumbers(buf.data, is_func);
        }
        else {
          /* just send the definition to output */
          outputFn(buf.data);
        }
      }

      return status;
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
    function print_with_linenumbers(lines, is_func) {
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

      outputFn(result);
    }

    /*
     * Look up the object identified by obj_type and desc.  If successful,
     * store its OID in *obj_oid and return true, else return false.
     *
     * Note that we'll fail if the object doesn't exist OR if there are multiple
     * matching candidates OR if there's something syntactically wrong with the
     * object description; unfortunately it can be hard to tell the difference.
     */
    async function lookup_object_oid(obj_type, desc, obj_oid) {
      let result = true;
      let query = { /* struct */ };
      initPQExpBuffer(query);
      let res;

      switch (obj_type) {
        case EditableFunction:
          /*
           * We have a function description, e.g. "x" or "x(int)".  Issue a
           * query to retrieve the function's OID using a cast to regproc or
           * regprocedure (as appropriate).
           */
          appendPQExpBufferStr(query, "SELECT ");
          appendStringLiteralConn(query, desc, pset.db);
          appendPQExpBuffer(query, "::pg_catalog.%s::pg_catalog.oid",
            strchr(desc, '(') !== NULL ? "regprocedure" : "regproc");
          break;

        case EditableView:
          /*
           * Convert view name (possibly schema-qualified) to OID.  Note:
           * this code doesn't check if the relation is actually a view.
           * We'll detect that in get_create_object_cmd().
           */
          appendPQExpBufferStr(query, "SELECT ");
          appendStringLiteralConn(query, desc, pset.db);
          appendPQExpBufferStr(query, "::pg_catalog.regclass::pg_catalog.oid");
          break;
      }

      try {
        res = await PSQLexec(query.data);
        if (res && PQntuples(res) == 1)
          obj_oid.value = atooid(PQgetvalue(res, 0, 0));
        else {
          pg_log_error("Error when querying");
          result = false;
        }
      } catch (err) {
        pg_log_error('ERROR:  ' + err.message);
        result = false;
      }

      return result;
    }

    /*
     * Construct a "CREATE OR REPLACE ..." command that describes the specified
     * database object.  If successful, the result is stored in buf.
     */
    async function get_create_object_cmd(obj_type, oid, buf) {
      let result = true;
      let query = { /* struct */ };
      initPQExpBuffer(query);
      let res;

      switch (obj_type) {
        case EditableFunction:
          printfPQExpBuffer(query,
            "SELECT pg_catalog.pg_get_functiondef(%u)",
            oid);
          break;

        case EditableView:
          /*
           * pg_get_viewdef() just prints the query, so we must prepend
           * CREATE for ourselves.  We must fully qualify the view name to
           * ensure the right view gets replaced.  Also, check relation kind
           * to be sure it's a view.
           *
           * Starting with PG 9.4, views may have WITH [LOCAL|CASCADED]
           * CHECK OPTION.  These are not part of the view definition
           * returned by pg_get_viewdef() and so need to be retrieved
           * separately.  Materialized views (introduced in 9.3) may have
           * arbitrary storage parameter reloptions.
           */
          if (pset.sversion >= 90400) {
            printfPQExpBuffer(query,
              "SELECT nspname, relname, relkind, " +
              "pg_catalog.pg_get_viewdef(c.oid, true), " +
              "pg_catalog.array_remove(pg_catalog.array_remove(c.reloptions,'check_option=local'),'check_option=cascaded') AS reloptions, " +
              "CASE WHEN 'check_option=local' = ANY (c.reloptions) THEN 'LOCAL'::text " +
              "WHEN 'check_option=cascaded' = ANY (c.reloptions) THEN 'CASCADED'::text ELSE NULL END AS checkoption " +
              "FROM pg_catalog.pg_class c " +
              "LEFT JOIN pg_catalog.pg_namespace n " +
              "ON c.relnamespace = n.oid WHERE c.oid = %u",
              oid);
          }
          else {
            printfPQExpBuffer(query,
              "SELECT nspname, relname, relkind, " +
              "pg_catalog.pg_get_viewdef(c.oid, true), " +
              "c.reloptions AS reloptions, " +
              "NULL AS checkoption " +
              "FROM pg_catalog.pg_class c " +
              "LEFT JOIN pg_catalog.pg_namespace n " +
              "ON c.relnamespace = n.oid WHERE c.oid = %u",
              oid);
          }
          break;
      }

      res = await PSQLexec(query.data);
      if (res && PQntuples(res) == 1) {
        resetPQExpBuffer(buf);
        switch (obj_type) {
          case EditableFunction:
            appendPQExpBufferStr(buf, PQgetvalue(res, 0, 0));
            break;

          case EditableView:
            let nspname = PQgetvalue(res, 0, 0);
            let relname = PQgetvalue(res, 0, 1);
            let relkind = PQgetvalue(res, 0, 2);
            let viewdef = PQgetvalue(res, 0, 3);
            let reloptions = PQgetvalue(res, 0, 4);
            let checkoption = PQgetvalue(res, 0, 5);

            /*
             * If the backend ever supports CREATE OR REPLACE
             * MATERIALIZED VIEW, allow that here; but as of today it
             * does not, so editing a matview definition in this way
             * is impossible.
             */
            switch (relkind[0]) {
              /*
                    case RELKIND_MATVIEW:
                      appendPQExpBufferStr(buf, "CREATE OR REPLACE MATERIALIZED VIEW ");
                      break;
              */
              case RELKIND_VIEW:
                appendPQExpBufferStr(buf, "CREATE OR REPLACE VIEW ");
                break;
              default:
                pg_log_error("\"%s.%s\" is not a view",
                  nspname, relname);
                result = false;
                break;
            }
            appendPQExpBuffer(buf, "%s.", fmtId(nspname));
            appendPQExpBufferStr(buf, fmtId(relname));

            /* reloptions, if not an empty array "{}" */
            if (reloptions != NULL && strlen(reloptions) > 2) {
              appendPQExpBufferStr(buf, "\n WITH (");
              if (!appendReloptionsArray(buf, reloptions, "",
                pset.encoding,
                pset.db.standard_strings)) {
                pg_log_error("could not parse reloptions array");
                result = false;
              }
              appendPQExpBufferChar(buf, ')');
            }

            /* View definition from pg_get_viewdef (a SELECT query) */
            appendPQExpBuffer(buf, " AS\n%s", viewdef);

            /* Get rid of the semicolon that pg_get_viewdef appends */
            if (buf.len > 0 && buf.data[buf.len - 1] == ';')
              buf.data = buf.data.slice(0, buf.len - 1);

            /* WITH [LOCAL|CASCADED] CHECK OPTION */
            if (checkoption && checkoption[0] != NULL)
              appendPQExpBuffer(buf, "\n WITH %s CHECK OPTION",
                checkoption);

            break;
        }
        /* Make sure result ends with a newline */
        if (buf.len > 0 && buf.data[buf.len - 1] != '\n')
          appendPQExpBufferChar(buf, '\n');
      }
      else {
        pg_log_error("Error when querying");
        result = false;
      }

      return result;
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

    async function exec_command_list(scan_state, active_branch, cmd) {
      let success;
      let pattern;
      let show_verbose;

      pattern = psql_scan_slash_option(scan_state,
        OT_NORMAL, NULL, true);

      show_verbose = strchr(cmd, '+') != NULL;
      success = await listAllDbs(pattern, show_verbose);

      return success ? PSQL_CMD_SKIP_LINE : PSQL_CMD_ERROR;
    }

    async function exec_command_d(scan_state, active_branch, cmd) {
      let status = PSQL_CMD_SKIP_LINE;
      let success = true;
      let pattern;
      let show_verbose,
        show_system;

      /* We don't do SQLID reduction on the pattern yet */
      pattern = psql_scan_slash_option(scan_state,
        OT_NORMAL, NULL, true);

      show_verbose = strchr(cmd, '+') != NULL;
      show_system = strchr(cmd, 'S') != NULL;

      switch (cmd[1]) {
        case undefined:
        case '+':
        case 'S':

          if (pattern)
            success = await describeTableDetails(pattern, show_verbose, show_system);
          else
            /* standard listing of interesting things */
            success = await listTables("tvmsE", NULL, show_verbose, show_system);
          break;
        case 'A':
          {
            let pattern2 = NULL;

            if (pattern && cmd[2] != NULL && cmd[2] != '+')
              pattern2 = psql_scan_slash_option(scan_state, OT_NORMAL, NULL, true);

            switch (cmd[2]) {
              case undefined:
              case '+':
                success = await describeAccessMethods(pattern, show_verbose);
                break;
              case 'c':
                success = await listOperatorClasses(pattern, pattern2, show_verbose);
                break;
              case 'f':
                success = await listOperatorFamilies(pattern, pattern2, show_verbose);
                break;
              case 'o':
                success = await listOpFamilyOperators(pattern, pattern2, show_verbose);
                break;
              case 'p':
                success = await listOpFamilyFunctions(pattern, pattern2, show_verbose);
                break;
              default:
                status = PSQL_CMD_UNKNOWN;
                break;
            }

          }
          break;
        case 'a':
          success = await describeAggregates(pattern, show_verbose, show_system);
          break;
        case 'b':
          success = await describeTablespaces(pattern, show_verbose);
          break;
        case 'c':
          if (strncmp(cmd, "dconfig", 7) == 0)
            success = await describeConfigurationParameters(pattern,
              show_verbose,
              show_system);
          else
            success = await listConversions(pattern,
              show_verbose,
              show_system);
          break;
        case 'C':
          success = await listCasts(pattern, show_verbose);
          break;
        case 'd':
          if (strncmp(cmd, "ddp", 3) == 0)
            success = await listDefaultACLs(pattern);
          else
            success = await objectDescription(pattern, show_system);
          break;
        case 'D':
          success = await listDomains(pattern, show_verbose, show_system);
          break;
        case 'f':			/* function subsystem */
          switch (cmd[2]) {
            case undefined:
            case '+':
            case 'S':
            case 'a':
            case 'n':
            case 'p':
            case 't':
            case 'w':
              success = await exec_command_dfo(scan_state, cmd, pattern,
                show_verbose, show_system);
              break;
            default:
              status = PSQL_CMD_UNKNOWN;
              break;
          }
          break;
        case 'g':
          /* no longer distinct from \du */
          success = await describeRoles(pattern, show_verbose, show_system);
          break;
        case 'l':
          success = await listLargeObjects(show_verbose);
          break;
        case 'L':
          success = await listLanguages(pattern, show_verbose, show_system);
          break;
        case 'n':
          success = await listSchemas(pattern, show_verbose, show_system);
          break;
        case 'o':
          success = await exec_command_dfo(scan_state, cmd, pattern,
            show_verbose, show_system);
          break;
        case 'O':
          success = await listCollations(pattern, show_verbose, show_system);
          break;
        case 'p':
          success = await permissionsList(pattern, show_system);
          break;
        case 'P':
          {
            switch (cmd[2]) {
              case undefined:
              case '+':
              case 't':
              case 'i':
              case 'n':
                success = await listPartitionedTables(cmd.slice(2), pattern, show_verbose);
                break;
              default:
                status = PSQL_CMD_UNKNOWN;
                break;
            }
          }
          break;
        case 'T':
          success = await describeTypes(pattern, show_verbose, show_system);
          break;
        case 't':
        case 'v':
        case 'm':
        case 'i':
        case 's':
        case 'E':
          success = await listTables(cmd[1], pattern, show_verbose, show_system);
          break;
        case 'r':
          if (cmd[2] == 'd' && cmd[3] == 's') {
            let pattern2 = NULL;

            if (pattern)
              pattern2 = psql_scan_slash_option(scan_state,
                OT_NORMAL, NULL, true);
            success = await listDbRoleSettings(pattern, pattern2);
          }
          else if (cmd[2] == 'g')
            success = await describeRoleGrants(pattern, show_system);
          else
            status = PSQL_CMD_UNKNOWN;
          break;
        case 'R':
          switch (cmd[2]) {
            case 'p':
              if (show_verbose)
                success = await describePublications(pattern);
              else
                success = await listPublications(pattern);
              break;
            case 's':
              success = await describeSubscriptions(pattern, show_verbose);
              break;
            default:
              status = PSQL_CMD_UNKNOWN;
          }
          break;
        case 'u':
          success = await describeRoles(pattern, show_verbose, show_system);
          break;
        case 'F':			/* text search subsystem */
          switch (cmd[2]) {
            case undefined:
            case '+':
              success = await listTSConfigs(pattern, show_verbose);
              break;
            case 'p':
              success = await listTSParsers(pattern, show_verbose);
              break;
            case 'd':
              success = await listTSDictionaries(pattern, show_verbose);
              break;
            case 't':
              success = await listTSTemplates(pattern, show_verbose);
              break;
            default:
              status = PSQL_CMD_UNKNOWN;
              break;
          }
          break;
        case 'e':			/* SQL/MED subsystem */
          switch (cmd[2]) {
            case 's':
              success = await listForeignServers(pattern, show_verbose);
              break;
            case 'u':
              success = await listUserMappings(pattern, show_verbose);
              break;
            case 'w':
              success = await listForeignDataWrappers(pattern, show_verbose);
              break;
            case 't':
              success = await listForeignTables(pattern, show_verbose);
              break;
            default:
              status = PSQL_CMD_UNKNOWN;
              break;
          }
          break;
        case 'x':			/* Extensions */
          if (show_verbose)
            success = await listExtensionContents(pattern);
          else
            success = await listExtensions(pattern);
          break;
        case 'X':			/* Extended Statistics */
          success = await listExtendedStats(pattern);
          break;
        case 'y':			/* Event Triggers */
          success = await listEventTriggers(pattern, show_verbose);
          break;
        default:
          status = PSQL_CMD_UNKNOWN;
      }

      if (!success)
        status = PSQL_CMD_ERROR;

      return status;
    }

    /* \df and \do; messy enough to split out of exec_command_d */
    async function exec_command_dfo(scan_state, cmd, pattern, show_verbose, show_system) {
      let success;
      let arg_patterns = [];
      let num_arg_patterns = 0;

      /* Collect argument-type patterns too */
      if (pattern)				/* otherwise it was just \df or \do */ {
        let ap;

        while ((ap = psql_scan_slash_option(scan_state,
          OT_NORMAL, NULL, true)) != NULL) {
          arg_patterns[num_arg_patterns++] = ap;
          if (num_arg_patterns >= FUNC_MAX_ARGS)
            break;			/* protect limited-size array */
        }
      }

      if (cmd[1] == 'f')
        success = await describeFunctions(cmd.slice(2), pattern,
          arg_patterns, num_arg_patterns,
          show_verbose, show_system);
      else
        success = await describeOperators(pattern,
          arg_patterns, num_arg_patterns,
          show_verbose, show_system);

      return success;
    }

    /* from describe.c */

    async function listAllDbs(pattern, verbose) {
      let res;
      let buf = { /* struct */ };
      let myopt = pset.popt;

      initPQExpBuffer(buf);

      printfPQExpBuffer(buf,
        "SELECT\n" +
        "  d.datname as \"%s\",\n" +
        "  pg_catalog.pg_get_userbyid(d.datdba) as \"%s\",\n" +
        "  pg_catalog.pg_encoding_to_char(d.encoding) as \"%s\",\n",
        gettext_noop("Name"),
        gettext_noop("Owner"),
        gettext_noop("Encoding"));
      if (pset.sversion >= 150000)
        appendPQExpBuffer(buf,
          "  CASE d.datlocprovider WHEN 'b' THEN 'builtin' WHEN 'c' THEN 'libc' WHEN 'i' THEN 'icu' END AS \"%s\",\n",
          gettext_noop("Locale Provider"));
      else
        appendPQExpBuffer(buf,
          "  'libc' AS \"%s\",\n",
          gettext_noop("Locale Provider"));
      appendPQExpBuffer(buf,
        "  d.datcollate as \"%s\",\n" +
        "  d.datctype as \"%s\",\n",
        gettext_noop("Collate"),
        gettext_noop("Ctype"));
      if (pset.sversion >= 170000)
        appendPQExpBuffer(buf,
          "  d.datlocale as \"%s\",\n",
          gettext_noop("Locale"));
      else if (pset.sversion >= 150000)
        appendPQExpBuffer(buf,
          "  d.daticulocale as \"%s\",\n",
          gettext_noop("Locale"));
      else
        appendPQExpBuffer(buf,
          "  NULL as \"%s\",\n",
          gettext_noop("Locale"));
      if (pset.sversion >= 160000)
        appendPQExpBuffer(buf,
          "  d.daticurules as \"%s\",\n",
          gettext_noop("ICU Rules"));
      else
        appendPQExpBuffer(buf,
          "  NULL as \"%s\",\n",
          gettext_noop("ICU Rules"));
      appendPQExpBufferStr(buf, "  ");
      printACLColumn(buf, "d.datacl");
      if (verbose)
        appendPQExpBuffer(buf,
          ",\n  CASE WHEN pg_catalog.has_database_privilege(d.datname, 'CONNECT')\n" +
          "       THEN pg_catalog.pg_size_pretty(pg_catalog.pg_database_size(d.datname))\n" +
          "       ELSE 'No Access'\n" +
          "  END as \"%s\"" +
          ",\n  t.spcname as \"%s\"" +
          ",\n  pg_catalog.shobj_description(d.oid, 'pg_database') as \"%s\"",
          gettext_noop("Size"),
          gettext_noop("Tablespace"),
          gettext_noop("Description"));
      appendPQExpBufferStr(buf,
        "\nFROM pg_catalog.pg_database d\n");
      if (verbose)
        appendPQExpBufferStr(buf,
          "  JOIN pg_catalog.pg_tablespace t on d.dattablespace = t.oid\n");

      if (pattern) {
        if (!validateSQLNamePattern(buf, pattern, false, false,
          NULL, "d.datname", NULL, NULL,
          NULL, 1)) {
          return false;
        }
      }

      appendPQExpBufferStr(buf, "ORDER BY 1;");
      res = await PSQLexec(buf.data);

      if (!res)
        return false;

      myopt.nullPrint = NULL;
      myopt.title = _("List of databases");
      myopt.translate_header = true;

      printQuery(res, myopt, pset.queryFout, false, pset.logfile);
      return true;
    }

    /*
     * \da
     * Takes an optional regexp to select particular aggregates
     */
    async function describeAggregates(pattern, verbose, showSystem) {
      let buf = { /* struct */ };
      let res;
      let myopt = pset.popt;

      initPQExpBuffer(buf);

      printfPQExpBuffer(buf,
        "SELECT n.nspname as \"%s\",\n" +
        "  p.proname AS \"%s\",\n" +
        "  pg_catalog.format_type(p.prorettype, NULL) AS \"%s\",\n" +
        "  CASE WHEN p.pronargs = 0\n" +
        "    THEN CAST('*' AS pg_catalog.text)\n" +
        "    ELSE pg_catalog.pg_get_function_arguments(p.oid)\n" +
        "  END AS \"%s\",\n",
        gettext_noop("Schema"),
        gettext_noop("Name"),
        gettext_noop("Result data type"),
        gettext_noop("Argument data types"));

      if (pset.sversion >= 110000)
        appendPQExpBuffer(buf,
          "  pg_catalog.obj_description(p.oid, 'pg_proc') as \"%s\"\n" +
          "FROM pg_catalog.pg_proc p\n" +
          "     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = p.pronamespace\n" +
          "WHERE p.prokind = 'a'\n",
          gettext_noop("Description"));
      else
        appendPQExpBuffer(buf,
          "  pg_catalog.obj_description(p.oid, 'pg_proc') as \"%s\"\n" +
          "FROM pg_catalog.pg_proc p\n" +
          "     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = p.pronamespace\n" +
          "WHERE p.proisagg\n",
          gettext_noop("Description"));

      if (!showSystem && !pattern)
        appendPQExpBufferStr(buf, "      AND n.nspname <> 'pg_catalog'\n" +
          "      AND n.nspname <> 'information_schema'\n");

      if (!validateSQLNamePattern(buf, pattern, true, false,
        "n.nspname", "p.proname", NULL,
        "pg_catalog.pg_function_is_visible(p.oid)",
        NULL, 3)) {

        return false;
      }

      appendPQExpBufferStr(buf, "ORDER BY 1, 2, 4;");

      res = await PSQLexec(buf.data);

      if (!res)
        return false;

      myopt.nullPrint = NULL;
      myopt.title = _("List of aggregate functions");
      myopt.translate_header = true;

      printQuery(res, myopt, pset.queryFout, false, pset.logfile);

      return true;
    }

    /*
     * \dA
     * Takes an optional regexp to select particular access methods
     */
    async function describeAccessMethods(pattern, verbose) {
      let buf = { /* struct */ };
      let res;
      let myopt = pset.popt;
      let translate_columns = [false, true, false, false];

      if (pset.sversion < 90600) {
        let sverbuf;

        pg_log_error("The server (version %s) does not support access methods.",
          formatPGVersionNumber(pset.sversion, false,
            sverbuf, sizeof(sverbuf)));
        return true;
      }

      initPQExpBuffer(buf);

      printfPQExpBuffer(buf,
        "SELECT amname AS \"%s\",\n" +
        "  CASE amtype" +
        " WHEN 'i' THEN '%s'" +
        " WHEN 't' THEN '%s'" +
        " END AS \"%s\"",
        gettext_noop("Name"),
        gettext_noop("Index"),
        gettext_noop("Table"),
        gettext_noop("Type"));

      if (verbose) {
        appendPQExpBuffer(buf,
          ",\n  amhandler AS \"%s\",\n" +
          "  pg_catalog.obj_description(oid, 'pg_am') AS \"%s\"",
          gettext_noop("Handler"),
          gettext_noop("Description"));
      }

      appendPQExpBufferStr(buf,
        "\nFROM pg_catalog.pg_am\n");

      if (!validateSQLNamePattern(buf, pattern, false, false,
        NULL, "amname", NULL,
        NULL,
        NULL, 1)) {

        return false;
      }

      appendPQExpBufferStr(buf, "ORDER BY 1;");

      res = await PSQLexec(buf.data);

      if (!res)
        return false;

      myopt.nullPrint = NULL;
      myopt.title = _("List of access methods");
      myopt.translate_header = true;
      myopt.translate_columns = translate_columns;
      myopt.n_translate_columns = lengthof(translate_columns);

      printQuery(res, myopt, pset.queryFout, false, pset.logfile);

      return true;
    }

    /*
     * \db
     * Takes an optional regexp to select particular tablespaces
     */
    async function describeTablespaces(pattern, verbose) {
      let buf = { /* struct */ };
      let res;
      let myopt = pset.popt;

      initPQExpBuffer(buf);

      printfPQExpBuffer(buf,
        "SELECT spcname AS \"%s\",\n" +
        "  pg_catalog.pg_get_userbyid(spcowner) AS \"%s\",\n" +
        "  pg_catalog.pg_tablespace_location(oid) AS \"%s\"",
        gettext_noop("Name"),
        gettext_noop("Owner"),
        gettext_noop("Location"));

      if (verbose) {
        appendPQExpBufferStr(buf, ",\n  ");
        printACLColumn(buf, "spcacl");
        appendPQExpBuffer(buf,
          ",\n  spcoptions AS \"%s\"" +
          ",\n  pg_catalog.pg_size_pretty(pg_catalog.pg_tablespace_size(oid)) AS \"%s\"" +
          ",\n  pg_catalog.shobj_description(oid, 'pg_tablespace') AS \"%s\"",
          gettext_noop("Options"),
          gettext_noop("Size"),
          gettext_noop("Description"));
      }

      appendPQExpBufferStr(buf,
        "\nFROM pg_catalog.pg_tablespace\n");

      if (!validateSQLNamePattern(buf, pattern, false, false,
        NULL, "spcname", NULL,
        NULL,
        NULL, 1)) {

        return false;
      }

      appendPQExpBufferStr(buf, "ORDER BY 1;");

      res = await PSQLexec(buf.data);

      if (!res)
        return false;

      myopt.nullPrint = NULL;
      myopt.title = _("List of tablespaces");
      myopt.translate_header = true;

      printQuery(res, myopt, pset.queryFout, false, pset.logfile);

      return true;
    }

    /*
     * \df
     * Takes an optional regexp to select particular functions.
     *
     * As with \d, you can specify the kinds of functions you want:
     *
     * a for aggregates
     * n for normal
     * p for procedure
     * t for trigger
     * w for window
     *
     * and you can mix and match these in any order.
     */
    async function describeFunctions(functypes, func_pattern, arg_patterns, num_arg_patterns, verbose, showSystem) {
      let showAggregate = strchr(functypes, 'a') != NULL;
      let showNormal = strchr(functypes, 'n') != NULL;
      let showProcedure = strchr(functypes, 'p') != NULL;
      let showTrigger = strchr(functypes, 't') != NULL;
      let showWindow = strchr(functypes, 'w') != NULL;
      let have_where;
      let buf = { /* struct */ };
      let res;
      let myopt = pset.popt;
      let translate_columns = [false, false, false, false, true, true, true, false, true, false, false, false, false];

      /* No "Parallel" column before 9.6 */
      let translate_columns_pre_96 = [false, false, false, false, true, true, false, true, false, false, false, false];

      if (strlen(functypes) != strspn(functypes, "anptwS+")) {
        pg_log_error("\\df only takes [anptwS+] as options");
        return true;
      }

      if (showProcedure && pset.sversion < 110000) {
        let sverbuf;

        pg_log_error("\\df does not take a \"%c\" option with server version %s",
          'p',
          formatPGVersionNumber(pset.sversion, false,
            sverbuf, sizeof(sverbuf)));
        return true;
      }

      if (!showAggregate && !showNormal && !showProcedure && !showTrigger && !showWindow) {
        showAggregate = showNormal = showTrigger = showWindow = true;
        if (pset.sversion >= 110000)
          showProcedure = true;
      }

      initPQExpBuffer(buf);

      printfPQExpBuffer(buf,
        "SELECT n.nspname as \"%s\",\n" +
        "  p.proname as \"%s\",\n",
        gettext_noop("Schema"),
        gettext_noop("Name"));

      if (pset.sversion >= 110000)
        appendPQExpBuffer(buf,
          "  pg_catalog.pg_get_function_result(p.oid) as \"%s\",\n" +
          "  pg_catalog.pg_get_function_arguments(p.oid) as \"%s\",\n" +
          " CASE p.prokind\n" +
          "  WHEN 'a' THEN '%s'\n" +
          "  WHEN 'w' THEN '%s'\n" +
          "  WHEN 'p' THEN '%s'\n" +
          "  ELSE '%s'\n" +
          " END as \"%s\"",
          gettext_noop("Result data type"),
          gettext_noop("Argument data types"),
          /* translator: "agg" is short for "aggregate" */
          gettext_noop("agg"),
          gettext_noop("window"),
          gettext_noop("proc"),
          gettext_noop("func"),
          gettext_noop("Type"));
      else
        appendPQExpBuffer(buf,
          "  pg_catalog.pg_get_function_result(p.oid) as \"%s\",\n" +
          "  pg_catalog.pg_get_function_arguments(p.oid) as \"%s\",\n" +
          " CASE\n" +
          "  WHEN p.proisagg THEN '%s'\n" +
          "  WHEN p.proiswindow THEN '%s'\n" +
          "  WHEN p.prorettype = 'pg_catalog.trigger'::pg_catalog.regtype THEN '%s'\n" +
          "  ELSE '%s'\n" +
          " END as \"%s\"",
          gettext_noop("Result data type"),
          gettext_noop("Argument data types"),
          /* translator: "agg" is short for "aggregate" */
          gettext_noop("agg"),
          gettext_noop("window"),
          gettext_noop("trigger"),
          gettext_noop("func"),
          gettext_noop("Type"));

      if (verbose) {
        appendPQExpBuffer(buf,
          ",\n CASE\n" +
          "  WHEN p.provolatile = 'i' THEN '%s'\n" +
          "  WHEN p.provolatile = 's' THEN '%s'\n" +
          "  WHEN p.provolatile = 'v' THEN '%s'\n" +
          " END as \"%s\"",
          gettext_noop("immutable"),
          gettext_noop("stable"),
          gettext_noop("volatile"),
          gettext_noop("Volatility"));
        if (pset.sversion >= 90600)
          appendPQExpBuffer(buf,
            ",\n CASE\n" +
            "  WHEN p.proparallel = 'r' THEN '%s'\n" +
            "  WHEN p.proparallel = 's' THEN '%s'\n" +
            "  WHEN p.proparallel = 'u' THEN '%s'\n" +
            " END as \"%s\"",
            gettext_noop("restricted"),
            gettext_noop("safe"),
            gettext_noop("unsafe"),
            gettext_noop("Parallel"));
        appendPQExpBuffer(buf,
          ",\n pg_catalog.pg_get_userbyid(p.proowner) as \"%s\"" +
          ",\n CASE WHEN prosecdef THEN '%s' ELSE '%s' END AS \"%s\"",
          gettext_noop("Owner"),
          gettext_noop("definer"),
          gettext_noop("invoker"),
          gettext_noop("Security"));
        appendPQExpBufferStr(buf, ",\n ");
        printACLColumn(buf, "p.proacl");
        appendPQExpBuffer(buf,
          ",\n l.lanname as \"%s\"",
          gettext_noop("Language"));
        appendPQExpBuffer(buf,
          ",\n CASE WHEN l.lanname IN ('internal', 'c') THEN p.prosrc END as \"%s\"",
          gettext_noop("Internal name"));
        appendPQExpBuffer(buf,
          ",\n pg_catalog.obj_description(p.oid, 'pg_proc') as \"%s\"",
          gettext_noop("Description"));
      }

      appendPQExpBufferStr(buf,
        "\nFROM pg_catalog.pg_proc p" +
        "\n     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = p.pronamespace\n");

      for (let i = 0; i < num_arg_patterns; i++) {
        appendPQExpBuffer(buf,
          "     LEFT JOIN pg_catalog.pg_type t%d ON t%d.oid = p.proargtypes[%d]\n" +
          "     LEFT JOIN pg_catalog.pg_namespace nt%d ON nt%d.oid = t%d.typnamespace\n",
          i, i, i, i, i, i);
      }

      if (verbose)
        appendPQExpBufferStr(buf,
          "     LEFT JOIN pg_catalog.pg_language l ON l.oid = p.prolang\n");

      have_where = false;

      /* filter by function type, if requested */
      if (showNormal && showAggregate && showProcedure && showTrigger && showWindow)
		 /* Do nothing */;
      else if (showNormal) {
        if (!showAggregate) {
          if (have_where)
            appendPQExpBufferStr(buf, "      AND ");
          else {
            appendPQExpBufferStr(buf, "WHERE ");
            have_where = true;
          }
          if (pset.sversion >= 110000)
            appendPQExpBufferStr(buf, "p.prokind <> 'a'\n");
          else
            appendPQExpBufferStr(buf, "NOT p.proisagg\n");
        }
        if (!showProcedure && pset.sversion >= 110000) {
          if (have_where)
            appendPQExpBufferStr(buf, "      AND ");
          else {
            appendPQExpBufferStr(buf, "WHERE ");
            have_where = true;
          }
          appendPQExpBufferStr(buf, "p.prokind <> 'p'\n");
        }
        if (!showTrigger) {
          if (have_where)
            appendPQExpBufferStr(buf, "      AND ");
          else {
            appendPQExpBufferStr(buf, "WHERE ");
            have_where = true;
          }
          appendPQExpBufferStr(buf, "p.prorettype <> 'pg_catalog.trigger'::pg_catalog.regtype\n");
        }
        if (!showWindow) {
          if (have_where)
            appendPQExpBufferStr(buf, "      AND ");
          else {
            appendPQExpBufferStr(buf, "WHERE ");
            have_where = true;
          }
          if (pset.sversion >= 110000)
            appendPQExpBufferStr(buf, "p.prokind <> 'w'\n");
          else
            appendPQExpBufferStr(buf, "NOT p.proiswindow\n");
        }
      }
      else {
        let needs_or = false;

        appendPQExpBufferStr(buf, "WHERE (\n       ");
        have_where = true;
        /* Note: at least one of these must be true ... */
        if (showAggregate) {
          if (pset.sversion >= 110000)
            appendPQExpBufferStr(buf, "p.prokind = 'a'\n");
          else
            appendPQExpBufferStr(buf, "p.proisagg\n");
          needs_or = true;
        }
        if (showTrigger) {
          if (needs_or)
            appendPQExpBufferStr(buf, "       OR ");
          appendPQExpBufferStr(buf,
            "p.prorettype = 'pg_catalog.trigger'::pg_catalog.regtype\n");
          needs_or = true;
        }
        if (showProcedure) {
          if (needs_or)
            appendPQExpBufferStr(buf, "       OR ");
          appendPQExpBufferStr(buf, "p.prokind = 'p'\n");
          needs_or = true;
        }
        if (showWindow) {
          if (needs_or)
            appendPQExpBufferStr(buf, "       OR ");
          if (pset.sversion >= 110000)
            appendPQExpBufferStr(buf, "p.prokind = 'w'\n");
          else
            appendPQExpBufferStr(buf, "p.proiswindow\n");
        }
        appendPQExpBufferStr(buf, "      )\n");
      }

      if (!validateSQLNamePattern(buf, func_pattern, have_where, false,
        "n.nspname", "p.proname", NULL,
        "pg_catalog.pg_function_is_visible(p.oid)",
        NULL, 3))
        return false;

      for (let i = 0; i < num_arg_patterns; i++) {
        if (strcmp(arg_patterns[i], "-") != 0) {
          /*
           * Match type-name patterns against either internal or external
           * name, like \dT.  Unlike \dT, there seems no reason to
           * discriminate against arrays or composite types.
           */
          let nspname;
          let typname;
          let ft;
          let tiv;

          nspname = sprintf("nt%d.nspname", i);
          typname = sprintf("t%d.typname", i);
          ft = sprintf("pg_catalog.format_type(t%d.oid, NULL)", i);
          tiv = sprintf("pg_catalog.pg_type_is_visible(t%d.oid)", i);
          if (!validateSQLNamePattern(buf,
            map_typename_pattern(arg_patterns[i]),
            true, false,
            nspname, typname, ft, tiv,
            NULL, 3))
            return false;
        }
        else {
          /* "-" pattern specifies no such parameter */
          appendPQExpBuffer(buf, "  AND t%d.typname IS NULL\n", i);
        }
      }

      if (!showSystem && !func_pattern)
        appendPQExpBufferStr(buf, "      AND n.nspname <> 'pg_catalog'\n" +
          "      AND n.nspname <> 'information_schema'\n");

      appendPQExpBufferStr(buf, "ORDER BY 1, 2, 4;");

      res = await PSQLexec(buf.data);

      if (!res)
        return false;

      myopt.nullPrint = NULL;
      myopt.title = _("List of functions");
      myopt.translate_header = true;
      if (pset.sversion >= 90600) {
        myopt.translate_columns = translate_columns;
        myopt.n_translate_columns = lengthof(translate_columns);
      }
      else {
        myopt.translate_columns = translate_columns_pre_96;
        myopt.n_translate_columns = lengthof(translate_columns_pre_96);
      }

      printQuery(res, myopt, pset.queryFout, false, pset.logfile);

      return true;
    }


    /*
     * \dT
     * describe types
     */
    async function describeTypes(pattern, verbose, showSystem) {
      let buf = { /* struct */ };
      let res;
      let myopt = pset.popt;

      initPQExpBuffer(buf);

      printfPQExpBuffer(buf,
        "SELECT n.nspname as \"%s\",\n" +
        "  pg_catalog.format_type(t.oid, NULL) AS \"%s\",\n",
        gettext_noop("Schema"),
        gettext_noop("Name"));
      if (verbose) {
        appendPQExpBuffer(buf,
          "  t.typname AS \"%s\",\n" +
          "  CASE WHEN t.typrelid != 0\n" +
          "      THEN CAST('tuple' AS pg_catalog.text)\n" +
          "    WHEN t.typlen < 0\n" +
          "      THEN CAST('var' AS pg_catalog.text)\n" +
          "    ELSE CAST(t.typlen AS pg_catalog.text)\n" +
          "  END AS \"%s\",\n" +
          "  pg_catalog.array_to_string(\n" +
          "      ARRAY(\n" +
          "          SELECT e.enumlabel\n" +
          "          FROM pg_catalog.pg_enum e\n" +
          "          WHERE e.enumtypid = t.oid\n" +
          "          ORDER BY e.enumsortorder\n" +
          "      ),\n" +
          "      E'\\n'\n" +
          "  ) AS \"%s\",\n" +
          "  pg_catalog.pg_get_userbyid(t.typowner) AS \"%s\",\n",
          gettext_noop("Internal name"),
          gettext_noop("Size"),
          gettext_noop("Elements"),
          gettext_noop("Owner"));
        printACLColumn(buf, "t.typacl");
        appendPQExpBufferStr(buf, ",\n  ");
      }

      appendPQExpBuffer(buf,
        "  pg_catalog.obj_description(t.oid, 'pg_type') as \"%s\"\n",
        gettext_noop("Description"));

      appendPQExpBufferStr(buf, "FROM pg_catalog.pg_type t\n" +
        "     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = t.typnamespace\n");

      /*
       * do not include complex types (typrelid!=0) unless they are standalone
       * composite types
       */
      appendPQExpBufferStr(buf, "WHERE (t.typrelid = 0 ");
      appendPQExpBufferStr(buf, "OR (SELECT c.relkind = " +
        "'c'" +
        " FROM pg_catalog.pg_class c " +
        "WHERE c.oid = t.typrelid))\n");

      /*
       * do not include array types unless the pattern contains []
       */
      if (pattern == NULL || strstr(pattern, "[]") == NULL)
        appendPQExpBufferStr(buf, "  AND NOT EXISTS(SELECT 1 FROM pg_catalog.pg_type el WHERE el.oid = t.typelem AND el.typarray = t.oid)\n");

      if (!showSystem && !pattern)
        appendPQExpBufferStr(buf, "      AND n.nspname <> 'pg_catalog'\n" +
          "      AND n.nspname <> 'information_schema'\n");

      /* Match name pattern against either internal or external name */
      if (!validateSQLNamePattern(buf, map_typename_pattern(pattern),
        true, false,
        "n.nspname", "t.typname",
        "pg_catalog.format_type(t.oid, NULL)",
        "pg_catalog.pg_type_is_visible(t.oid)",
        NULL, 3)) {

        return false;
      }

      appendPQExpBufferStr(buf, "ORDER BY 1, 2;");

      res = await PSQLexec(buf.data);

      if (!res)
        return false;

      myopt.nullPrint = NULL;
      myopt.title = _("List of data types");
      myopt.translate_header = true;

      printQuery(res, myopt, pset.queryFout, false, pset.logfile);

      return true;
    }

    /*
     * Map some variant type names accepted by the backend grammar into
     * canonical type names.
     *
     * Helper for \dT and other functions that take typename patterns.
     * This doesn't completely mask the fact that these names are special;
     * for example, a pattern of "dec*" won't magically match "numeric".
     * But it goes a long way to reduce the surprise factor.
     */
    function map_typename_pattern(pattern) {
      let typename_map = [
        /*
         * These names are accepted by gram.y, although they are neither the
         * "real" name seen in pg_type nor the canonical name printed by
         * format_type().
         */
        "decimal", "numeric",
        "float", "double precision",
        "int", "integer",

        /*
         * We also have to map the array names for cases where the canonical
         * name is different from what pg_type says.
         */
        "bool[]", "boolean[]",
        "decimal[]", "numeric[]",
        "float[]", "double precision[]",
        "float4[]", "real[]",
        "float8[]", "double precision[]",
        "int[]", "integer[]",
        "int2[]", "smallint[]",
        "int4[]", "integer[]",
        "int8[]", "bigint[]",
        "time[]", "time without time zone[]",
        "timetz[]", "time with time zone[]",
        "timestamp[]", "timestamp without time zone[]",
        "timestamptz[]", "timestamp with time zone[]",
        "varbit[]", "bit varying[]",
        "varchar[]", "character varying[]",
        NULL
      ];

      if (pattern == NULL)
        return NULL;
      for (let i = 0; typename_map[i] != NULL; i += 2) {
        if (pg_strcasecmp(pattern, typename_map[i]) == 0)
          return typename_map[i + 1];
      }
      return pattern;
    }

    /*
     * \do
     * Describe operators
     */
    async function describeOperators(oper_pattern, arg_patterns, num_arg_patterns, verbose, showSystem) {
      let buf = { /* struct */ };
      let res;
      let myopt = pset.popt;

      initPQExpBuffer(buf);

      /*
       * Note: before Postgres 9.1, we did not assign comments to any built-in
       * operators, preferring to let the comment on the underlying function
       * suffice.  The coalesce() on the obj_description() calls below supports
       * this convention by providing a fallback lookup of a comment on the
       * operator's function.  Since 9.1 there is a policy that every built-in
       * operator should have a comment; so the coalesce() is no longer
       * necessary so far as built-in operators are concerned.  We keep it
       * anyway, for now, because third-party modules may still be following the
       * old convention.
       *
       * The support for postfix operators in this query is dead code as of
       * Postgres 14, but we need to keep it for as long as we support talking
       * to pre-v14 servers.
       */

      printfPQExpBuffer(buf,
        "SELECT n.nspname as \"%s\",\n" +
        "  o.oprname AS \"%s\",\n" +
        "  CASE WHEN o.oprkind='l' THEN NULL ELSE pg_catalog.format_type(o.oprleft, NULL) END AS \"%s\",\n" +
        "  CASE WHEN o.oprkind='r' THEN NULL ELSE pg_catalog.format_type(o.oprright, NULL) END AS \"%s\",\n" +
        "  pg_catalog.format_type(o.oprresult, NULL) AS \"%s\",\n",
        gettext_noop("Schema"),
        gettext_noop("Name"),
        gettext_noop("Left arg type"),
        gettext_noop("Right arg type"),
        gettext_noop("Result type"));

      if (verbose)
        appendPQExpBuffer(buf,
          "  o.oprcode AS \"%s\",\n",
          gettext_noop("Function"));

      appendPQExpBuffer(buf,
        "  coalesce(pg_catalog.obj_description(o.oid, 'pg_operator'),\n" +
        "           pg_catalog.obj_description(o.oprcode, 'pg_proc')) AS \"%s\"\n" +
        "FROM pg_catalog.pg_operator o\n" +
        "     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = o.oprnamespace\n",
        gettext_noop("Description"));

      if (num_arg_patterns >= 2) {
        num_arg_patterns = 2;	/* ignore any additional arguments */
        appendPQExpBufferStr(buf,
          "     LEFT JOIN pg_catalog.pg_type t0 ON t0.oid = o.oprleft\n" +
          "     LEFT JOIN pg_catalog.pg_namespace nt0 ON nt0.oid = t0.typnamespace\n" +
          "     LEFT JOIN pg_catalog.pg_type t1 ON t1.oid = o.oprright\n" +
          "     LEFT JOIN pg_catalog.pg_namespace nt1 ON nt1.oid = t1.typnamespace\n");
      }
      else if (num_arg_patterns == 1) {
        appendPQExpBufferStr(buf,
          "     LEFT JOIN pg_catalog.pg_type t0 ON t0.oid = o.oprright\n" +
          "     LEFT JOIN pg_catalog.pg_namespace nt0 ON nt0.oid = t0.typnamespace\n");
      }

      if (!showSystem && !oper_pattern)
        appendPQExpBufferStr(buf, "WHERE n.nspname <> 'pg_catalog'\n" +
          "      AND n.nspname <> 'information_schema'\n");

      if (!validateSQLNamePattern(buf, oper_pattern,
        !showSystem && !oper_pattern, true,
        "n.nspname", "o.oprname", NULL,
        "pg_catalog.pg_operator_is_visible(o.oid)",
        NULL, 3))
        return false;

      if (num_arg_patterns == 1)
        appendPQExpBufferStr(buf, "  AND o.oprleft = 0\n");

      for (let i = 0; i < num_arg_patterns; i++) {
        if (strcmp(arg_patterns[i], "-") != 0) {
          /*
           * Match type-name patterns against either internal or external
           * name, like \dT.  Unlike \dT, there seems no reason to
           * discriminate against arrays or composite types.
           */
          let nspname;
          let typname;
          let ft;
          let tiv;

          nspname = sprintf("nt%d.nspname", i);
          typname = sprintf("t%d.typname", i);
          ft = sprintf("pg_catalog.format_type(t%d.oid, NULL)", i);
          tiv = sprintf("pg_catalog.pg_type_is_visible(t%d.oid)", i);
          if (!validateSQLNamePattern(buf,
            map_typename_pattern(arg_patterns[i]),
            true, false,
            nspname, typname, ft, tiv,
            NULL, 3))
            return false;
        }
        else {
          /* "-" pattern specifies no such parameter */
          appendPQExpBuffer(buf, "  AND t%d.typname IS NULL\n", i);
        }
      }

      appendPQExpBufferStr(buf, "ORDER BY 1, 2, 3, 4;");

      res = await PSQLexec(buf.data);

      if (!res)
        return false;

      myopt.nullPrint = NULL;
      myopt.title = _("List of operators");
      myopt.translate_header = true;

      printQuery(res, myopt, pset.queryFout, false, pset.logfile);

      return true;
    }

    /*
     * List Tables' Grant/Revoke Permissions
     * \z (now also \dp -- perhaps more mnemonic)
     */
    async function permissionsList(pattern, showSystem) {
      let buf = { /* struct */ };
      let res;
      let myopt = pset.popt;
      let translate_columns = [false, false, true, false, false, false];

      initPQExpBuffer(buf);

      /*
       * we ignore indexes and toast tables since they have no meaningful rights
       */
      printfPQExpBuffer(buf,
        "SELECT n.nspname as \"%s\",\n" +
        "  c.relname as \"%s\",\n" +
        "  CASE c.relkind" +
        " WHEN " +
        "'r'" +
        " THEN '%s'" +
        " WHEN " +
        "'v'" +
        " THEN '%s'" +
        " WHEN " +
        "'m'" +
        " THEN '%s'" +
        " WHEN " +
        "'S'" +
        " THEN '%s'" +
        " WHEN " +
        "'f'" +
        " THEN '%s'" +
        " WHEN " +
        "'p'" +
        " THEN '%s'" +
        " END as \"%s\",\n" +
        "  ",
        gettext_noop("Schema"),
        gettext_noop("Name"),
        gettext_noop("table"),
        gettext_noop("view"),
        gettext_noop("materialized view"),
        gettext_noop("sequence"),
        gettext_noop("foreign table"),
        gettext_noop("partitioned table"),
        gettext_noop("Type"));

      printACLColumn(buf, "c.relacl");

      appendPQExpBuffer(buf,
        ",\n  pg_catalog.array_to_string(ARRAY(\n" +
        "    SELECT attname || E':\\n  ' || pg_catalog.array_to_string(attacl, E'\\n  ')\n" +
        "    FROM pg_catalog.pg_attribute a\n" +
        "    WHERE attrelid = c.oid AND NOT attisdropped AND attacl IS NOT NULL\n" +
        "  ), E'\\n') AS \"%s\"",
        gettext_noop("Column privileges"));

      if (pset.sversion >= 90500 && pset.sversion < 100000)
        appendPQExpBuffer(buf,
          ",\n  pg_catalog.array_to_string(ARRAY(\n" +
          "    SELECT polname\n" +
          "    || CASE WHEN polcmd != '*' THEN\n" +
          "           E' (' || polcmd::pg_catalog.text || E'):'\n" +
          "       ELSE E':'\n" +
          "       END\n" +
          "    || CASE WHEN polqual IS NOT NULL THEN\n" +
          "           E'\\n  (u): ' || pg_catalog.pg_get_expr(polqual, polrelid)\n" +
          "       ELSE E''\n" +
          "       END\n" +
          "    || CASE WHEN polwithcheck IS NOT NULL THEN\n" +
          "           E'\\n  (c): ' || pg_catalog.pg_get_expr(polwithcheck, polrelid)\n" +
          "       ELSE E''\n" +
          "       END" +
          "    || CASE WHEN polroles <> '{0}' THEN\n" +
          "           E'\\n  to: ' || pg_catalog.array_to_string(\n" +
          "               ARRAY(\n" +
          "                   SELECT rolname\n" +
          "                   FROM pg_catalog.pg_roles\n" +
          "                   WHERE oid = ANY (polroles)\n" +
          "                   ORDER BY 1\n" +
          "               ), E', ')\n" +
          "       ELSE E''\n" +
          "       END\n" +
          "    FROM pg_catalog.pg_policy pol\n" +
          "    WHERE polrelid = c.oid), E'\\n')\n" +
          "    AS \"%s\"",
          gettext_noop("Policies"));

      if (pset.sversion >= 100000)
        appendPQExpBuffer(buf,
          ",\n  pg_catalog.array_to_string(ARRAY(\n" +
          "    SELECT polname\n" +
          "    || CASE WHEN NOT polpermissive THEN\n" +
          "       E' (RESTRICTIVE)'\n" +
          "       ELSE '' END\n" +
          "    || CASE WHEN polcmd != '*' THEN\n" +
          "           E' (' || polcmd::pg_catalog.text || E'):'\n" +
          "       ELSE E':'\n" +
          "       END\n" +
          "    || CASE WHEN polqual IS NOT NULL THEN\n" +
          "           E'\\n  (u): ' || pg_catalog.pg_get_expr(polqual, polrelid)\n" +
          "       ELSE E''\n" +
          "       END\n" +
          "    || CASE WHEN polwithcheck IS NOT NULL THEN\n" +
          "           E'\\n  (c): ' || pg_catalog.pg_get_expr(polwithcheck, polrelid)\n" +
          "       ELSE E''\n" +
          "       END" +
          "    || CASE WHEN polroles <> '{0}' THEN\n" +
          "           E'\\n  to: ' || pg_catalog.array_to_string(\n" +
          "               ARRAY(\n" +
          "                   SELECT rolname\n" +
          "                   FROM pg_catalog.pg_roles\n" +
          "                   WHERE oid = ANY (polroles)\n" +
          "                   ORDER BY 1\n" +
          "               ), E', ')\n" +
          "       ELSE E''\n" +
          "       END\n" +
          "    FROM pg_catalog.pg_policy pol\n" +
          "    WHERE polrelid = c.oid), E'\\n')\n" +
          "    AS \"%s\"",
          gettext_noop("Policies"));

      appendPQExpBufferStr(buf, "\nFROM pg_catalog.pg_class c\n" +
        "     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace\n" +
        "WHERE c.relkind IN (" +
        "'r'" +
        "," +
        "'v'" +
        "," +
        "'m'" +
        "," +
        "'S'" +
        "," +
        "'f'" +
        "," +
        "'p'" +
        ")\n");

      if (!showSystem && !pattern)
        appendPQExpBufferStr(buf, "      AND n.nspname <> 'pg_catalog'\n" +
          "      AND n.nspname <> 'information_schema'\n");

      if (!validateSQLNamePattern(buf, pattern, true, false,
        "n.nspname", "c.relname", NULL,
        "pg_catalog.pg_table_is_visible(c.oid)",
        NULL, 3))
        return false;

      appendPQExpBufferStr(buf, "ORDER BY 1, 2;");

      res = await PSQLexec(buf.data);
      if (!res)
        return false;

      myopt.nullPrint = NULL;
      printfPQExpBuffer(buf, _("Access privileges"));
      myopt.title = buf.data;
      myopt.translate_header = true;
      myopt.translate_columns = translate_columns;
      myopt.n_translate_columns = lengthof(translate_columns);

      printQuery(res, myopt, pset.queryFout, false, pset.logfile);

      return true;
    }

    /*
     * \ddp
     *
     * List Default ACLs.  The pattern can match either schema or role name.
     */
    async function listDefaultACLs(pattern) {
      let buf = { /* struct */ };
      let res;
      let myopt = pset.popt;
      let translate_columns = [false, false, true, false];

      initPQExpBuffer(buf);

      printfPQExpBuffer(buf,
        "SELECT pg_catalog.pg_get_userbyid(d.defaclrole) AS \"%s\",\n" +
        "  n.nspname AS \"%s\",\n" +
        "  CASE d.defaclobjtype WHEN '%c' THEN '%s' WHEN '%c' THEN '%s' WHEN '%c' THEN '%s' WHEN '%c' THEN '%s' WHEN '%c' THEN '%s' END AS \"%s\",\n" +
        "  ",
        gettext_noop("Owner"),
        gettext_noop("Schema"),
        DEFACLOBJ_RELATION,
        gettext_noop("table"),
        DEFACLOBJ_SEQUENCE,
        gettext_noop("sequence"),
        DEFACLOBJ_FUNCTION,
        gettext_noop("function"),
        DEFACLOBJ_TYPE,
        gettext_noop("type"),
        DEFACLOBJ_NAMESPACE,
        gettext_noop("schema"),
        gettext_noop("Type"));

      printACLColumn(buf, "d.defaclacl");

      appendPQExpBufferStr(buf, "\nFROM pg_catalog.pg_default_acl d\n" +
        "     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = d.defaclnamespace\n");

      if (!validateSQLNamePattern(buf, pattern, false, false,
        NULL,
        "n.nspname",
        "pg_catalog.pg_get_userbyid(d.defaclrole)",
        NULL,
        NULL, 3))
        return false;

      appendPQExpBufferStr(buf, "ORDER BY 1, 2, 3;");

      res = await PSQLexec(buf.data);
      if (!res)
        return false;

      myopt.nullPrint = NULL;
      printfPQExpBuffer(buf, _("Default access privileges"));
      myopt.title = buf.data;
      myopt.translate_header = true;
      myopt.translate_columns = translate_columns;
      myopt.n_translate_columns = lengthof(translate_columns);

      printQuery(res, myopt, pset.queryFout, false, pset.logfile);

      return true;
    }

    /*
     * Get object comments
     *
     * \dd [foo]
     *
     * Note: This command only lists comments for object types which do not have
     * their comments displayed by their own backslash commands. The following
     * types of objects will be displayed: constraint, operator class,
     * operator family, rule, and trigger.
     *
     */
    async function objectDescription(pattern, showSystem) {
      let buf = { /* struct */ };
      let res;
      let myopt = pset.popt;
      let translate_columns = [false, false, true, false];

      initPQExpBuffer(buf);

      appendPQExpBuffer(buf,
        "SELECT DISTINCT tt.nspname AS \"%s\", tt.name AS \"%s\", tt.object AS \"%s\", d.description AS \"%s\"\n" +
        "FROM (\n",
        gettext_noop("Schema"),
        gettext_noop("Name"),
        gettext_noop("Object"),
        gettext_noop("Description"));

      /* Table constraint descriptions */
      appendPQExpBuffer(buf,
        "  SELECT pgc.oid as oid, pgc.tableoid AS tableoid,\n" +
        "  n.nspname as nspname,\n" +
        "  CAST(pgc.conname AS pg_catalog.text) as name," +
        "  CAST('%s' AS pg_catalog.text) as object\n" +
        "  FROM pg_catalog.pg_constraint pgc\n" +
        "    JOIN pg_catalog.pg_class c " +
        "ON c.oid = pgc.conrelid\n" +
        "    LEFT JOIN pg_catalog.pg_namespace n " +
        "    ON n.oid = c.relnamespace\n",
        gettext_noop("table constraint"));

      if (!showSystem && !pattern)
        appendPQExpBufferStr(buf, "WHERE n.nspname <> 'pg_catalog'\n" +
          "      AND n.nspname <> 'information_schema'\n");

      if (!validateSQLNamePattern(buf, pattern, !showSystem && !pattern,
        false, "n.nspname", "pgc.conname", NULL,
        "pg_catalog.pg_table_is_visible(c.oid)",
        NULL, 3))
        return false;

      /* Domain constraint descriptions */
      appendPQExpBuffer(buf,
        "UNION ALL\n" +
        "  SELECT pgc.oid as oid, pgc.tableoid AS tableoid,\n" +
        "  n.nspname as nspname,\n" +
        "  CAST(pgc.conname AS pg_catalog.text) as name," +
        "  CAST('%s' AS pg_catalog.text) as object\n" +
        "  FROM pg_catalog.pg_constraint pgc\n" +
        "    JOIN pg_catalog.pg_type t " +
        "ON t.oid = pgc.contypid\n" +
        "    LEFT JOIN pg_catalog.pg_namespace n " +
        "    ON n.oid = t.typnamespace\n",
        gettext_noop("domain constraint"));

      if (!showSystem && !pattern)
        appendPQExpBufferStr(buf, "WHERE n.nspname <> 'pg_catalog'\n" +
          "      AND n.nspname <> 'information_schema'\n");

      if (!validateSQLNamePattern(buf, pattern, !showSystem && !pattern,
        false, "n.nspname", "pgc.conname", NULL,
        "pg_catalog.pg_type_is_visible(t.oid)",
        NULL, 3))
        return false;

      /* Operator class descriptions */
      appendPQExpBuffer(buf,
        "UNION ALL\n" +
        "  SELECT o.oid as oid, o.tableoid as tableoid,\n" +
        "  n.nspname as nspname,\n" +
        "  CAST(o.opcname AS pg_catalog.text) as name,\n" +
        "  CAST('%s' AS pg_catalog.text) as object\n" +
        "  FROM pg_catalog.pg_opclass o\n" +
        "    JOIN pg_catalog.pg_am am ON " +
        "o.opcmethod = am.oid\n" +
        "    JOIN pg_catalog.pg_namespace n ON " +
        "n.oid = o.opcnamespace\n",
        gettext_noop("operator class"));

      if (!showSystem && !pattern)
        appendPQExpBufferStr(buf, "      AND n.nspname <> 'pg_catalog'\n" +
          "      AND n.nspname <> 'information_schema'\n");

      if (!validateSQLNamePattern(buf, pattern, true, false,
        "n.nspname", "o.opcname", NULL,
        "pg_catalog.pg_opclass_is_visible(o.oid)",
        NULL, 3))
        return false;

      /* Operator family descriptions */
      appendPQExpBuffer(buf,
        "UNION ALL\n" +
        "  SELECT opf.oid as oid, opf.tableoid as tableoid,\n" +
        "  n.nspname as nspname,\n" +
        "  CAST(opf.opfname AS pg_catalog.text) AS name,\n" +
        "  CAST('%s' AS pg_catalog.text) as object\n" +
        "  FROM pg_catalog.pg_opfamily opf\n" +
        "    JOIN pg_catalog.pg_am am " +
        "ON opf.opfmethod = am.oid\n" +
        "    JOIN pg_catalog.pg_namespace n " +
        "ON opf.opfnamespace = n.oid\n",
        gettext_noop("operator family"));

      if (!showSystem && !pattern)
        appendPQExpBufferStr(buf, "      AND n.nspname <> 'pg_catalog'\n" +
          "      AND n.nspname <> 'information_schema'\n");

      if (!validateSQLNamePattern(buf, pattern, true, false,
        "n.nspname", "opf.opfname", NULL,
        "pg_catalog.pg_opfamily_is_visible(opf.oid)",
        NULL, 3))
        return false;

      /* Rule descriptions (ignore rules for views) */
      appendPQExpBuffer(buf,
        "UNION ALL\n" +
        "  SELECT r.oid as oid, r.tableoid as tableoid,\n" +
        "  n.nspname as nspname,\n" +
        "  CAST(r.rulename AS pg_catalog.text) as name," +
        "  CAST('%s' AS pg_catalog.text) as object\n" +
        "  FROM pg_catalog.pg_rewrite r\n" +
        "       JOIN pg_catalog.pg_class c ON c.oid = r.ev_class\n" +
        "       LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace\n" +
        "  WHERE r.rulename != '_RETURN'\n",
        gettext_noop("rule"));

      if (!showSystem && !pattern)
        appendPQExpBufferStr(buf, "      AND n.nspname <> 'pg_catalog'\n" +
          "      AND n.nspname <> 'information_schema'\n");

      if (!validateSQLNamePattern(buf, pattern, true, false,
        "n.nspname", "r.rulename", NULL,
        "pg_catalog.pg_table_is_visible(c.oid)",
        NULL, 3))
        return false;

      /* Trigger descriptions */
      appendPQExpBuffer(buf,
        "UNION ALL\n" +
        "  SELECT t.oid as oid, t.tableoid as tableoid,\n" +
        "  n.nspname as nspname,\n" +
        "  CAST(t.tgname AS pg_catalog.text) as name," +
        "  CAST('%s' AS pg_catalog.text) as object\n" +
        "  FROM pg_catalog.pg_trigger t\n" +
        "       JOIN pg_catalog.pg_class c ON c.oid = t.tgrelid\n" +
        "       LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace\n",
        gettext_noop("trigger"));

      if (!showSystem && !pattern)
        appendPQExpBufferStr(buf, "WHERE n.nspname <> 'pg_catalog'\n" +
          "      AND n.nspname <> 'information_schema'\n");

      if (!validateSQLNamePattern(buf, pattern, !showSystem && !pattern, false,
        "n.nspname", "t.tgname", NULL,
        "pg_catalog.pg_table_is_visible(c.oid)",
        NULL, 3))
        return false;

      appendPQExpBufferStr(buf,
        ") AS tt\n" +
        "  JOIN pg_catalog.pg_description d ON (tt.oid = d.objoid AND tt.tableoid = d.classoid AND d.objsubid = 0)\n");

      appendPQExpBufferStr(buf, "ORDER BY 1, 2, 3;");

      res = await PSQLexec(buf.data);

      if (!res)
        return false;

      myopt.nullPrint = NULL;
      myopt.title = _("Object descriptions");
      myopt.translate_header = true;
      myopt.translate_columns = translate_columns;
      myopt.n_translate_columns = lengthof(translate_columns);

      printQuery(res, myopt, pset.queryFout, false, pset.logfile);

      return true;
    }

    /*
     * await describeTableDetails (for \d)
     *
     * This routine finds the tables to be displayed, and calls
     * describeOneTableDetails for each one.
     *
     * verbose: if true, this is \d+
     */
    async function describeTableDetails(pattern, verbose, showSystem) {
      let buf = { /* struct */ };
      let res;
      let i;

      initPQExpBuffer(buf);

      printfPQExpBuffer(buf,
        "SELECT c.oid,\n" +
        "  n.nspname,\n" +
        "  c.relname\n" +
        "FROM pg_catalog.pg_class c\n" +
        "     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace\n");

      if (!showSystem && !pattern)
        appendPQExpBufferStr(buf, "WHERE n.nspname <> 'pg_catalog'\n" +
          "      AND n.nspname <> 'information_schema'\n");

      if (!validateSQLNamePattern(buf, pattern, !showSystem && !pattern, false,
        "n.nspname", "c.relname", NULL,
        "pg_catalog.pg_table_is_visible(c.oid)",
        NULL, 3)) {

        return false;
      }

      appendPQExpBufferStr(buf, "ORDER BY 2, 3;");

      res = await PSQLexec(buf.data);

      if (!res)
        return false;

      if (PQntuples(res) == 0) {
        if (!pset.quiet) {
          if (pattern)
            pg_log_error("Did not find any relation named \"%s\".",
              pattern);
          else
            pg_log_error("Did not find any relations.");
        }
        return false;
      }

      for (i = 0; i < PQntuples(res); i++) {
        let oid;
        let nspname;
        let relname;

        oid = PQgetvalue(res, i, 0);
        nspname = PQgetvalue(res, i, 1);
        relname = PQgetvalue(res, i, 2);

        if (!await describeOneTableDetails(nspname, relname, oid, verbose)) {
          return false;
        }
        if (cancel_pressed) {
          return false;
        }

      }

      return true;
    }

    /*
     * await describeOneTableDetails (for \d)
     *
     * Unfortunately, the information presented here is so complicated that it
     * cannot be done in a single query. So we have to assemble the printed table
     * by hand and pass it to the underlying printTable() function.
     */
    async function describeOneTableDetails(schemaname, relationname, oid, verbose) {
      let retval = false;
      let buf = { /* struct */ };
      let res = NULL;
      let myopt = pset.popt.topt;
      let cont = { /* struct */ };
      let i;
      let view_def = NULL;
      let headers = [];
      let title = { /* struct */ };
      let tmpbuf = { /* struct */ };
      let cols;
      let attname_col = -1,	/* column indexes in "res" */
        atttype_col = -1,
        attrdef_col = -1,
        attnotnull_col = -1,
        attcoll_col = -1,
        attidentity_col = -1,
        attgenerated_col = -1,
        isindexkey_col = -1,
        indexdef_col = -1,
        fdwopts_col = -1,
        attstorage_col = -1,
        attcompression_col = -1,
        attstattarget_col = -1,
        attdescr_col = -1;
      let numrows;
      let tableinfo = {};
      let show_column_details = false;

      myopt.default_footer = false;
      /* This output looks confusing in expanded mode. */
      myopt.expanded = false;

      initPQExpBuffer(buf);
      initPQExpBuffer(title);
      initPQExpBuffer(tmpbuf);

      /* Get general table info */
      if (pset.sversion >= 120000) {
        printfPQExpBuffer(buf,
          "SELECT c.relchecks, c.relkind, c.relhasindex, c.relhasrules, " +
          "c.relhastriggers, c.relrowsecurity, c.relforcerowsecurity, " +
          "false AS relhasoids, c.relispartition, %s, c.reltablespace, " +
          "CASE WHEN c.reloftype = 0 THEN '' ELSE c.reloftype::pg_catalog.regtype::pg_catalog.text END, " +
          "c.relpersistence, c.relreplident, am.amname\n" +
          "FROM pg_catalog.pg_class c\n " +
          "LEFT JOIN pg_catalog.pg_class tc ON (c.reltoastrelid = tc.oid)\n" +
          "LEFT JOIN pg_catalog.pg_am am ON (c.relam = am.oid)\n" +
          "WHERE c.oid = '%s';",
          (verbose ?
            "pg_catalog.array_to_string(c.reloptions || " +
            "array(select 'toast.' || x from pg_catalog.unnest(tc.reloptions) x), ', ')\n"
            : "''"),
          oid);
      }
      else if (pset.sversion >= 100000) {
        printfPQExpBuffer(buf,
          "SELECT c.relchecks, c.relkind, c.relhasindex, c.relhasrules, " +
          "c.relhastriggers, c.relrowsecurity, c.relforcerowsecurity, " +
          "c.relhasoids, c.relispartition, %s, c.reltablespace, " +
          "CASE WHEN c.reloftype = 0 THEN '' ELSE c.reloftype::pg_catalog.regtype::pg_catalog.text END, " +
          "c.relpersistence, c.relreplident\n" +
          "FROM pg_catalog.pg_class c\n " +
          "LEFT JOIN pg_catalog.pg_class tc ON (c.reltoastrelid = tc.oid)\n" +
          "WHERE c.oid = '%s';",
          (verbose ?
            "pg_catalog.array_to_string(c.reloptions || " +
            "array(select 'toast.' || x from pg_catalog.unnest(tc.reloptions) x), ', ')\n"
            : "''"),
          oid);
      }
      else if (pset.sversion >= 90500) {
        printfPQExpBuffer(buf,
          "SELECT c.relchecks, c.relkind, c.relhasindex, c.relhasrules, " +
          "c.relhastriggers, c.relrowsecurity, c.relforcerowsecurity, " +
          "c.relhasoids, false as relispartition, %s, c.reltablespace, " +
          "CASE WHEN c.reloftype = 0 THEN '' ELSE c.reloftype::pg_catalog.regtype::pg_catalog.text END, " +
          "c.relpersistence, c.relreplident\n" +
          "FROM pg_catalog.pg_class c\n " +
          "LEFT JOIN pg_catalog.pg_class tc ON (c.reltoastrelid = tc.oid)\n" +
          "WHERE c.oid = '%s';",
          (verbose ?
            "pg_catalog.array_to_string(c.reloptions || " +
            "array(select 'toast.' || x from pg_catalog.unnest(tc.reloptions) x), ', ')\n"
            : "''"),
          oid);
      }
      else if (pset.sversion >= 90400) {
        printfPQExpBuffer(buf,
          "SELECT c.relchecks, c.relkind, c.relhasindex, c.relhasrules, " +
          "c.relhastriggers, false, false, c.relhasoids, " +
          "false as relispartition, %s, c.reltablespace, " +
          "CASE WHEN c.reloftype = 0 THEN '' ELSE c.reloftype::pg_catalog.regtype::pg_catalog.text END, " +
          "c.relpersistence, c.relreplident\n" +
          "FROM pg_catalog.pg_class c\n " +
          "LEFT JOIN pg_catalog.pg_class tc ON (c.reltoastrelid = tc.oid)\n" +
          "WHERE c.oid = '%s';",
          (verbose ?
            "pg_catalog.array_to_string(c.reloptions || " +
            "array(select 'toast.' || x from pg_catalog.unnest(tc.reloptions) x), ', ')\n"
            : "''"),
          oid);
      }
      else {
        printfPQExpBuffer(buf,
          "SELECT c.relchecks, c.relkind, c.relhasindex, c.relhasrules, " +
          "c.relhastriggers, false, false, c.relhasoids, " +
          "false as relispartition, %s, c.reltablespace, " +
          "CASE WHEN c.reloftype = 0 THEN '' ELSE c.reloftype::pg_catalog.regtype::pg_catalog.text END, " +
          "c.relpersistence\n" +
          "FROM pg_catalog.pg_class c\n " +
          "LEFT JOIN pg_catalog.pg_class tc ON (c.reltoastrelid = tc.oid)\n" +
          "WHERE c.oid = '%s';",
          (verbose ?
            "pg_catalog.array_to_string(c.reloptions || " +
            "array(select 'toast.' || x from pg_catalog.unnest(tc.reloptions) x), ', ')\n"
            : "''"),
          oid);
      }

      res = await PSQLexec(buf.data);
      if (!res)
        return retval;

      /* Did we get anything? */
      if (PQntuples(res) == 0) {
        if (!pset.quiet)
          pg_log_error("Did not find any relation with OID %s.", oid);
        return retval;
      }

      tableinfo.checks = atoi(PQgetvalue(res, 0, 0));
      tableinfo.relkind = (PQgetvalue(res, 0, 1));
      tableinfo.hasindex = strcmp(PQgetvalue(res, 0, 2), "t") == 0;
      tableinfo.hasrules = strcmp(PQgetvalue(res, 0, 3), "t") == 0;
      tableinfo.hastriggers = strcmp(PQgetvalue(res, 0, 4), "t") == 0;
      tableinfo.rowsecurity = strcmp(PQgetvalue(res, 0, 5), "t") == 0;
      tableinfo.forcerowsecurity = strcmp(PQgetvalue(res, 0, 6), "t") == 0;
      tableinfo.hasoids = strcmp(PQgetvalue(res, 0, 7), "t") == 0;
      tableinfo.ispartition = strcmp(PQgetvalue(res, 0, 8), "t") == 0;
      tableinfo.reloptions = pg_strdup(PQgetvalue(res, 0, 9));
      tableinfo.tablespace = atooid(PQgetvalue(res, 0, 10));
      tableinfo.reloftype = (strcmp(PQgetvalue(res, 0, 11), "") != 0) ?
        pg_strdup(PQgetvalue(res, 0, 11)) : NULL;
      tableinfo.relpersistence = (PQgetvalue(res, 0, 12));
      tableinfo.relreplident = (pset.sversion >= 90400) ?
        (PQgetvalue(res, 0, 13)) : 'd';
      if (pset.sversion >= 120000)
        tableinfo.relam = PQgetisnull(res, 0, 14) ?
          NULL : pg_strdup(PQgetvalue(res, 0, 14));
      else
        tableinfo.relam = NULL;
      res = NULL;

      /*
       * If it's a sequence, deal with it here separately.
       */
      if (tableinfo.relkind == RELKIND_SEQUENCE) {
        let result = NULL;
        let myopt = pset.popt;
        let footers = [NULL, NULL];

        if (pset.sversion >= 100000) {
          printfPQExpBuffer(buf,
            "SELECT pg_catalog.format_type(seqtypid, NULL) AS \"%s\",\n" +
            "       seqstart AS \"%s\",\n" +
            "       seqmin AS \"%s\",\n" +
            "       seqmax AS \"%s\",\n" +
            "       seqincrement AS \"%s\",\n" +
            "       CASE WHEN seqcycle THEN '%s' ELSE '%s' END AS \"%s\",\n" +
            "       seqcache AS \"%s\"\n",
            gettext_noop("Type"),
            gettext_noop("Start"),
            gettext_noop("Minimum"),
            gettext_noop("Maximum"),
            gettext_noop("Increment"),
            gettext_noop("yes"),
            gettext_noop("no"),
            gettext_noop("Cycles?"),
            gettext_noop("Cache"));
          appendPQExpBuffer(buf,
            "FROM pg_catalog.pg_sequence\n" +
            "WHERE seqrelid = '%s';",
            oid);
        }
        else {
          printfPQExpBuffer(buf,
            "SELECT 'bigint' AS \"%s\",\n" +
            "       start_value AS \"%s\",\n" +
            "       min_value AS \"%s\",\n" +
            "       max_value AS \"%s\",\n" +
            "       increment_by AS \"%s\",\n" +
            "       CASE WHEN is_cycled THEN '%s' ELSE '%s' END AS \"%s\",\n" +
            "       cache_value AS \"%s\"\n",
            gettext_noop("Type"),
            gettext_noop("Start"),
            gettext_noop("Minimum"),
            gettext_noop("Maximum"),
            gettext_noop("Increment"),
            gettext_noop("yes"),
            gettext_noop("no"),
            gettext_noop("Cycles?"),
            gettext_noop("Cache"));
          appendPQExpBuffer(buf, "FROM %s", fmtId(schemaname));
          /* must be separate because fmtId isn't reentrant */
          appendPQExpBuffer(buf, ".%s;", fmtId(relationname));
        }

        res = await PSQLexec(buf.data);
        if (!res)
          return retval;

        /* Get the column that owns this sequence */
        printfPQExpBuffer(buf, "SELECT pg_catalog.quote_ident(nspname) || '.' ||" +
          "\n   pg_catalog.quote_ident(relname) || '.' ||" +
          "\n   pg_catalog.quote_ident(attname)," +
          "\n   d.deptype" +
          "\nFROM pg_catalog.pg_class c" +
          "\nINNER JOIN pg_catalog.pg_depend d ON c.oid=d.refobjid" +
          "\nINNER JOIN pg_catalog.pg_namespace n ON n.oid=c.relnamespace" +
          "\nINNER JOIN pg_catalog.pg_attribute a ON (" +
          "\n a.attrelid=c.oid AND" +
          "\n a.attnum=d.refobjsubid)" +
          "\nWHERE d.classid='pg_catalog.pg_class'::pg_catalog.regclass" +
          "\n AND d.refclassid='pg_catalog.pg_class'::pg_catalog.regclass" +
          "\n AND d.objid='%s'" +
          "\n AND d.deptype IN ('a', 'i')",
          oid);

        result = await PSQLexec(buf.data);

        /*
         * If we get no rows back, don't show anything (obviously). We should
         * never get more than one row back, but if we do, just ignore it and
         * don't print anything.
         */
        if (!result)
          return retval;
        else if (PQntuples(result) == 1) {
          switch (PQgetvalue(result, 0, 1)[0]) {
            case 'a':
              footers[0] = psprintf(_("Owned by: %s"),
                PQgetvalue(result, 0, 0));
              break;
            case 'i':
              footers[0] = psprintf(_("Sequence for identity column: %s"),
                PQgetvalue(result, 0, 0));
              break;
          }
        }

        if (tableinfo.relpersistence == 'u')
          printfPQExpBuffer(title, _("Unlogged sequence \"%s.%s\""),
            schemaname, relationname);
        else
          printfPQExpBuffer(title, _("Sequence \"%s.%s\""),
            schemaname, relationname);

        myopt.footers = footers;
        myopt.topt.default_footer = false;
        myopt.title = title.data;
        myopt.translate_header = true;

        printQuery(res, myopt, pset.queryFout, false, pset.logfile);

        retval = true;
        return retval;		/* not an error, just return early */
      }

      /* Identify whether we should print collation, nullable, default vals */
      if (tableinfo.relkind == RELKIND_RELATION ||
        tableinfo.relkind == RELKIND_VIEW ||
        tableinfo.relkind == RELKIND_MATVIEW ||
        tableinfo.relkind == RELKIND_FOREIGN_TABLE ||
        tableinfo.relkind == RELKIND_COMPOSITE_TYPE ||
        tableinfo.relkind == RELKIND_PARTITIONED_TABLE)
        show_column_details = true;

      /*
       * Get per-column info
       *
       * Since the set of query columns we need varies depending on relkind and
       * server version, we compute all the column numbers on-the-fly.  Column
       * number variables for columns not fetched are left as -1; this avoids
       * duplicative test logic below.
       */
      cols = 0;
      printfPQExpBuffer(buf, "SELECT a.attname");
      attname_col = cols++;
      appendPQExpBufferStr(buf, ",\n  pg_catalog.format_type(a.atttypid, a.atttypmod)");
      atttype_col = cols++;

      if (show_column_details) {
        /* use "pretty" mode for expression to avoid excessive parentheses */
        appendPQExpBufferStr(buf,
          ",\n  (SELECT pg_catalog.pg_get_expr(d.adbin, d.adrelid, true)" +
          "\n   FROM pg_catalog.pg_attrdef d" +
          "\n   WHERE d.adrelid = a.attrelid AND d.adnum = a.attnum AND a.atthasdef)" +
          ",\n  a.attnotnull");
        attrdef_col = cols++;
        attnotnull_col = cols++;
        appendPQExpBufferStr(buf, ",\n  (SELECT c.collname FROM pg_catalog.pg_collation c, pg_catalog.pg_type t\n" +
          "   WHERE c.oid = a.attcollation AND t.oid = a.atttypid AND a.attcollation <> t.typcollation) AS attcollation");
        attcoll_col = cols++;
        if (pset.sversion >= 100000)
          appendPQExpBufferStr(buf, ",\n  a.attidentity");
        else
          appendPQExpBufferStr(buf, ",\n  ''::pg_catalog.char AS attidentity");
        attidentity_col = cols++;
        if (pset.sversion >= 120000)
          appendPQExpBufferStr(buf, ",\n  a.attgenerated");
        else
          appendPQExpBufferStr(buf, ",\n  ''::pg_catalog.char AS attgenerated");
        attgenerated_col = cols++;
      }
      if (tableinfo.relkind == RELKIND_INDEX ||
        tableinfo.relkind == RELKIND_PARTITIONED_INDEX) {
        if (pset.sversion >= 110000) {
          appendPQExpBuffer(buf, ",\n  CASE WHEN a.attnum <= (SELECT i.indnkeyatts FROM pg_catalog.pg_index i WHERE i.indexrelid = '%s') THEN '%s' ELSE '%s' END AS is_key",
            oid,
            gettext_noop("yes"),
            gettext_noop("no"));
          isindexkey_col = cols++;
        }
        appendPQExpBufferStr(buf, ",\n  pg_catalog.pg_get_indexdef(a.attrelid, a.attnum, TRUE) AS indexdef");
        indexdef_col = cols++;
      }
      /* FDW options for foreign table column */
      if (tableinfo.relkind == RELKIND_FOREIGN_TABLE) {
        appendPQExpBufferStr(buf, ",\n  CASE WHEN attfdwoptions IS NULL THEN '' ELSE " +
          "  '(' || pg_catalog.array_to_string(ARRAY(SELECT pg_catalog.quote_ident(option_name) || ' ' || pg_catalog.quote_literal(option_value)  FROM " +
          "  pg_catalog.pg_options_to_table(attfdwoptions)), ', ') || ')' END AS attfdwoptions");
        fdwopts_col = cols++;
      }
      if (verbose) {
        appendPQExpBufferStr(buf, ",\n  a.attstorage");
        attstorage_col = cols++;

        /* compression info, if relevant to relkind */
        if (pset.sversion >= 140000 &&
          !pset.hide_compression &&
          (tableinfo.relkind == RELKIND_RELATION ||
            tableinfo.relkind == RELKIND_PARTITIONED_TABLE ||
            tableinfo.relkind == RELKIND_MATVIEW)) {
          appendPQExpBufferStr(buf, ",\n  a.attcompression AS attcompression");
          attcompression_col = cols++;
        }

        /* stats target, if relevant to relkind */
        if (tableinfo.relkind == RELKIND_RELATION ||
          tableinfo.relkind == RELKIND_INDEX ||
          tableinfo.relkind == RELKIND_PARTITIONED_INDEX ||
          tableinfo.relkind == RELKIND_MATVIEW ||
          tableinfo.relkind == RELKIND_FOREIGN_TABLE ||
          tableinfo.relkind == RELKIND_PARTITIONED_TABLE) {
          appendPQExpBufferStr(buf, ",\n  CASE WHEN a.attstattarget=-1 THEN NULL ELSE a.attstattarget END AS attstattarget");
          attstattarget_col = cols++;
        }

        /*
         * In 9.0+, we have column comments for: relations, views, composite
         * types, and foreign tables (cf. CommentObject() in comment.c).
         */
        if (tableinfo.relkind == RELKIND_RELATION ||
          tableinfo.relkind == RELKIND_VIEW ||
          tableinfo.relkind == RELKIND_MATVIEW ||
          tableinfo.relkind == RELKIND_FOREIGN_TABLE ||
          tableinfo.relkind == RELKIND_COMPOSITE_TYPE ||
          tableinfo.relkind == RELKIND_PARTITIONED_TABLE) {
          appendPQExpBufferStr(buf, ",\n  pg_catalog.col_description(a.attrelid, a.attnum)");
          attdescr_col = cols++;
        }
      }

      appendPQExpBufferStr(buf, "\nFROM pg_catalog.pg_attribute a");
      appendPQExpBuffer(buf, "\nWHERE a.attrelid = '%s' AND a.attnum > 0 AND NOT a.attisdropped", oid);
      appendPQExpBufferStr(buf, "\nORDER BY a.attnum;");

      res = await PSQLexec(buf.data);
      if (!res)
        return retval;
      numrows = PQntuples(res);

      /* Make title */
      switch (tableinfo.relkind) {
        case RELKIND_RELATION:
          if (tableinfo.relpersistence == 'u')
            printfPQExpBuffer(title, _("Unlogged table \"%s.%s\""),
              schemaname, relationname);
          else
            printfPQExpBuffer(title, _("Table \"%s.%s\""),
              schemaname, relationname);
          break;
        case RELKIND_VIEW:
          printfPQExpBuffer(title, _("View \"%s.%s\""),
            schemaname, relationname);
          break;
        case RELKIND_MATVIEW:
          if (tableinfo.relpersistence == 'u')
            printfPQExpBuffer(title, _("Unlogged materialized view \"%s.%s\""),
              schemaname, relationname);
          else
            printfPQExpBuffer(title, _("Materialized view \"%s.%s\""),
              schemaname, relationname);
          break;
        case RELKIND_INDEX:
          if (tableinfo.relpersistence == 'u')
            printfPQExpBuffer(title, _("Unlogged index \"%s.%s\""),
              schemaname, relationname);
          else
            printfPQExpBuffer(title, _("Index \"%s.%s\""),
              schemaname, relationname);
          break;
        case RELKIND_PARTITIONED_INDEX:
          if (tableinfo.relpersistence == 'u')
            printfPQExpBuffer(title, _("Unlogged partitioned index \"%s.%s\""),
              schemaname, relationname);
          else
            printfPQExpBuffer(title, _("Partitioned index \"%s.%s\""),
              schemaname, relationname);
          break;
        case RELKIND_TOASTVALUE:
          printfPQExpBuffer(title, _("TOAST table \"%s.%s\""),
            schemaname, relationname);
          break;
        case RELKIND_COMPOSITE_TYPE:
          printfPQExpBuffer(title, _("Composite type \"%s.%s\""),
            schemaname, relationname);
          break;
        case RELKIND_FOREIGN_TABLE:
          printfPQExpBuffer(title, _("Foreign table \"%s.%s\""),
            schemaname, relationname);
          break;
        case RELKIND_PARTITIONED_TABLE:
          if (tableinfo.relpersistence == 'u')
            printfPQExpBuffer(title, _("Unlogged partitioned table \"%s.%s\""),
              schemaname, relationname);
          else
            printfPQExpBuffer(title, _("Partitioned table \"%s.%s\""),
              schemaname, relationname);
          break;
        default:
          /* untranslated unknown relkind */
          printfPQExpBuffer(title, "?%c? \"%s.%s\"",
            tableinfo.relkind, schemaname, relationname);
          break;
      }

      /* Fill headers[] with the names of the columns we will output */
      cols = 0;
      headers[cols++] = gettext_noop("Column");
      headers[cols++] = gettext_noop("Type");
      if (show_column_details) {
        headers[cols++] = gettext_noop("Collation");
        headers[cols++] = gettext_noop("Nullable");
        headers[cols++] = gettext_noop("Default");
      }
      if (isindexkey_col >= 0)
        headers[cols++] = gettext_noop("Key?");
      if (indexdef_col >= 0)
        headers[cols++] = gettext_noop("Definition");
      if (fdwopts_col >= 0)
        headers[cols++] = gettext_noop("FDW options");
      if (attstorage_col >= 0)
        headers[cols++] = gettext_noop("Storage");
      if (attcompression_col >= 0)
        headers[cols++] = gettext_noop("Compression");
      if (attstattarget_col >= 0)
        headers[cols++] = gettext_noop("Stats target");
      if (attdescr_col >= 0)
        headers[cols++] = gettext_noop("Description");

      Assert(cols <= lengthof(headers));

      printTableInit(cont, myopt, title.data, cols, numrows);

      for (i = 0; i < cols; i++)
        printTableAddHeader(cont, headers[i], true, 'l');

      /* Generate table cells to be printed */
      for (i = 0; i < numrows; i++) {
        /* Column */
        printTableAddCell(cont, PQgetvalue(res, i, attname_col), false, false);

        /* Type */
        printTableAddCell(cont, PQgetvalue(res, i, atttype_col), false, false);

        /* Collation, Nullable, Default */
        if (show_column_details) {
          let identity;
          let generated;
          let default_str;
          let mustfree = false;

          printTableAddCell(cont, PQgetvalue(res, i, attcoll_col), false, false);

          printTableAddCell(cont,
            strcmp(PQgetvalue(res, i, attnotnull_col), "t") == 0 ? "not null" : "",
            false, false);

          identity = PQgetvalue(res, i, attidentity_col);
          generated = PQgetvalue(res, i, attgenerated_col);

          if (identity[0] == ATTRIBUTE_IDENTITY_ALWAYS)
            default_str = "generated always as identity";
          else if (identity[0] == ATTRIBUTE_IDENTITY_BY_DEFAULT)
            default_str = "generated by default as identity";
          else if (generated[0] == ATTRIBUTE_GENERATED_STORED) {
            default_str = psprintf("generated always as (%s) stored",
              PQgetvalue(res, i, attrdef_col));
            mustfree = true;
          }
          else
            default_str = PQgetvalue(res, i, attrdef_col);

          printTableAddCell(cont, default_str, false, mustfree);
        }

        /* Info for index columns */
        if (isindexkey_col >= 0)
          printTableAddCell(cont, PQgetvalue(res, i, isindexkey_col), true, false);
        if (indexdef_col >= 0)
          printTableAddCell(cont, PQgetvalue(res, i, indexdef_col), false, false);

        /* FDW options for foreign table columns */
        if (fdwopts_col >= 0)
          printTableAddCell(cont, PQgetvalue(res, i, fdwopts_col), false, false);

        /* Storage mode, if relevant */
        if (attstorage_col >= 0) {
          let storage = PQgetvalue(res, i, attstorage_col);

          /* these strings are literal in our syntax, so not translated. */
          printTableAddCell(cont, (storage[0] == 'p' ? "plain" :
            (storage[0] == 'm' ? "main" :
              (storage[0] == 'x' ? "extended" :
                (storage[0] == 'e' ? "external" :
                  "???")))),
            false, false);
        }

        /* Column compression, if relevant */
        if (attcompression_col >= 0) {
          let compression = PQgetvalue(res, i, attcompression_col);

          /* these strings are literal in our syntax, so not translated. */
          printTableAddCell(cont, (compression[0] == 'p' ? "pglz" :
            (compression[0] == 'l' ? "lz4" :
              ((compression[0] == NULL) ? "" :
                "???"))),
            false, false);
        }

        /* Statistics target, if the relkind supports this feature */
        if (attstattarget_col >= 0)
          printTableAddCell(cont, PQgetvalue(res, i, attstattarget_col),
            false, false);

        /* Column comments, if the relkind supports this feature */
        if (attdescr_col >= 0)
          printTableAddCell(cont, PQgetvalue(res, i, attdescr_col),
            false, false);
      }

      /* Make footers */

      if (tableinfo.ispartition) {
        /* Footer information for a partition child table */
        let result;

        printfPQExpBuffer(buf,
          "SELECT inhparent::pg_catalog.regclass,\n" +
          "  pg_catalog.pg_get_expr(c.relpartbound, c.oid),\n  ");

        appendPQExpBufferStr(buf,
          pset.sversion >= 140000 ? "inhdetachpending" :
            "false as inhdetachpending");

        /* If verbose, also request the partition constraint definition */
        if (verbose)
          appendPQExpBufferStr(buf,
            ",\n  pg_catalog.pg_get_partition_constraintdef(c.oid)");
        appendPQExpBuffer(buf,
          "\nFROM pg_catalog.pg_class c" +
          " JOIN pg_catalog.pg_inherits i" +
          " ON c.oid = inhrelid" +
          "\nWHERE c.oid = '%s';", oid);
        result = await PSQLexec(buf.data);
        if (!result)
          return retval;

        if (PQntuples(result) > 0) {
          let parent_name = PQgetvalue(result, 0, 0);
          let partdef = PQgetvalue(result, 0, 1);
          let detached = PQgetvalue(result, 0, 2);

          printfPQExpBuffer(tmpbuf, _("Partition of: %s %s%s"), parent_name,
            partdef,
            strcmp(detached, "t") == 0 ? " DETACH PENDING" : "");
          printTableAddFooter(cont, tmpbuf.data);

          if (verbose) {
            let partconstraintdef = NULL;

            if (!PQgetisnull(result, 0, 3))
              partconstraintdef = PQgetvalue(result, 0, 3);
            /* If there isn't any constraint, show that explicitly */
            if (partconstraintdef == NULL || partconstraintdef[0] == NULL)
              printfPQExpBuffer(tmpbuf, _("No partition constraint"));
            else
              printfPQExpBuffer(tmpbuf, _("Partition constraint: %s"),
                partconstraintdef);
            printTableAddFooter(cont, tmpbuf.data);
          }
        }
      }

      if (tableinfo.relkind == RELKIND_PARTITIONED_TABLE) {
        /* Footer information for a partitioned table (partitioning parent) */
        let result;

        printfPQExpBuffer(buf,
          "SELECT pg_catalog.pg_get_partkeydef('%s'::pg_catalog.oid);",
          oid);
        result = await PSQLexec(buf.data);
        if (!result)
          return retval;

        if (PQntuples(result) == 1) {
          let partkeydef = PQgetvalue(result, 0, 0);

          printfPQExpBuffer(tmpbuf, _("Partition key: %s"), partkeydef);
          printTableAddFooter(cont, tmpbuf.data);
        }
      }

      if (tableinfo.relkind == RELKIND_TOASTVALUE) {
        /* For a TOAST table, print name of owning table */
        let result;

        printfPQExpBuffer(buf,
          "SELECT n.nspname, c.relname\n" +
          "FROM pg_catalog.pg_class c" +
          " JOIN pg_catalog.pg_namespace n" +
          " ON n.oid = c.relnamespace\n" +
          "WHERE reltoastrelid = '%s';", oid);
        result = await PSQLexec(buf.data);
        if (!result)
          return retval;

        if (PQntuples(result) == 1) {
          let schemaname = PQgetvalue(result, 0, 0);
          let relname = PQgetvalue(result, 0, 1);

          printfPQExpBuffer(tmpbuf, _("Owning table: \"%s.%s\""),
            schemaname, relname);
          printTableAddFooter(cont, tmpbuf.data);
        }
      }

      if (tableinfo.relkind == RELKIND_INDEX ||
        tableinfo.relkind == RELKIND_PARTITIONED_INDEX) {
        /* Footer information about an index */
        let result;

        printfPQExpBuffer(buf,
          "SELECT i.indisunique, i.indisprimary, i.indisclustered, " +
          "i.indisvalid,\n" +
          "  (NOT i.indimmediate) AND " +
          "EXISTS (SELECT 1 FROM pg_catalog.pg_constraint " +
          "WHERE conrelid = i.indrelid AND " +
          "conindid = i.indexrelid AND " +
          "contype IN ('p','u','x') AND " +
          "condeferrable) AS condeferrable,\n" +
          "  (NOT i.indimmediate) AND " +
          "EXISTS (SELECT 1 FROM pg_catalog.pg_constraint " +
          "WHERE conrelid = i.indrelid AND " +
          "conindid = i.indexrelid AND " +
          "contype IN ('p','u','x') AND " +
          "condeferred) AS condeferred,\n");

        if (pset.sversion >= 90400)
          appendPQExpBufferStr(buf, "i.indisreplident,\n");
        else
          appendPQExpBufferStr(buf, "false AS indisreplident,\n");

        if (pset.sversion >= 150000)
          appendPQExpBufferStr(buf, "i.indnullsnotdistinct,\n");
        else
          appendPQExpBufferStr(buf, "false AS indnullsnotdistinct,\n");

        appendPQExpBuffer(buf, "  a.amname, c2.relname, " +
          "pg_catalog.pg_get_expr(i.indpred, i.indrelid, true)\n" +
          "FROM pg_catalog.pg_index i, pg_catalog.pg_class c, pg_catalog.pg_class c2, pg_catalog.pg_am a\n" +
          "WHERE i.indexrelid = c.oid AND c.oid = '%s' AND c.relam = a.oid\n" +
          "AND i.indrelid = c2.oid;",
          oid);

        result = await PSQLexec(buf.data);
        if (!result)
          return retval;
        else if (PQntuples(result) != 1) {
          return retval;
        }
        else {
          let indisunique = PQgetvalue(result, 0, 0);
          let indisprimary = PQgetvalue(result, 0, 1);
          let indisclustered = PQgetvalue(result, 0, 2);
          let indisvalid = PQgetvalue(result, 0, 3);
          let deferrable = PQgetvalue(result, 0, 4);
          let deferred = PQgetvalue(result, 0, 5);
          let indisreplident = PQgetvalue(result, 0, 6);
          let indnullsnotdistinct = PQgetvalue(result, 0, 7);
          let indamname = PQgetvalue(result, 0, 8);
          let indtable = PQgetvalue(result, 0, 9);
          let indpred = PQgetvalue(result, 0, 10);

          if (strcmp(indisprimary, "t") == 0)
            printfPQExpBuffer(tmpbuf, _("primary key, "));
          else if (strcmp(indisunique, "t") == 0) {
            printfPQExpBuffer(tmpbuf, _("unique"));
            if (strcmp(indnullsnotdistinct, "t") == 0)
              appendPQExpBufferStr(tmpbuf, _(" nulls not distinct"));
            appendPQExpBufferStr(tmpbuf, _(", "));
          }
          else
            resetPQExpBuffer(tmpbuf);
          appendPQExpBuffer(tmpbuf, "%s, ", indamname);

          /* we assume here that index and table are in same schema */
          appendPQExpBuffer(tmpbuf, _("for table \"%s.%s\""),
            schemaname, indtable);

          if (strlen(indpred))
            appendPQExpBuffer(tmpbuf, _(", predicate (%s)"), indpred);

          if (strcmp(indisclustered, "t") == 0)
            appendPQExpBufferStr(tmpbuf, _(", clustered"));

          if (strcmp(indisvalid, "t") != 0)
            appendPQExpBufferStr(tmpbuf, _(", invalid"));

          if (strcmp(deferrable, "t") == 0)
            appendPQExpBufferStr(tmpbuf, _(", deferrable"));

          if (strcmp(deferred, "t") == 0)
            appendPQExpBufferStr(tmpbuf, _(", initially deferred"));

          if (strcmp(indisreplident, "t") == 0)
            appendPQExpBufferStr(tmpbuf, _(", replica identity"));

          printTableAddFooter(cont, tmpbuf.data);

          /*
           * If it's a partitioned index, we'll print the tablespace below
           */
          if (tableinfo.relkind == RELKIND_INDEX)
            await add_tablespace_footer(cont, tableinfo.relkind,
              tableinfo.tablespace, true);
        }

      }
      /* If you add relkinds here, see also "Finish printing..." stanza below */
      else if (tableinfo.relkind == RELKIND_RELATION ||
        tableinfo.relkind == RELKIND_MATVIEW ||
        tableinfo.relkind == RELKIND_FOREIGN_TABLE ||
        tableinfo.relkind == RELKIND_PARTITIONED_TABLE ||
        tableinfo.relkind == RELKIND_PARTITIONED_INDEX ||
        tableinfo.relkind == RELKIND_TOASTVALUE) {
        /* Footer information about a table */
        let result = NULL;
        let tuples = 0;

        /* print indexes */
        if (tableinfo.hasindex) {
          printfPQExpBuffer(buf,
            "SELECT c2.relname, i.indisprimary, i.indisunique, " +
            "i.indisclustered, i.indisvalid, " +
            "pg_catalog.pg_get_indexdef(i.indexrelid, 0, true),\n  " +
            "pg_catalog.pg_get_constraintdef(con.oid, true), " +
            "contype, condeferrable, condeferred");
          if (pset.sversion >= 90400)
            appendPQExpBufferStr(buf, ", i.indisreplident");
          else
            appendPQExpBufferStr(buf, ", false AS indisreplident");
          appendPQExpBufferStr(buf, ", c2.reltablespace");
          appendPQExpBuffer(buf,
            "\nFROM pg_catalog.pg_class c, pg_catalog.pg_class c2, pg_catalog.pg_index i\n" +
            "  LEFT JOIN pg_catalog.pg_constraint con ON (conrelid = i.indrelid AND conindid = i.indexrelid AND contype IN ('p','u','x'))\n" +
            "WHERE c.oid = '%s' AND c.oid = i.indrelid AND i.indexrelid = c2.oid\n" +
            "ORDER BY i.indisprimary DESC, c2.relname;",
            oid);
          result = await PSQLexec(buf.data);
          if (!result)
            return retval;
          else
            tuples = PQntuples(result);

          if (tuples > 0) {
            printTableAddFooter(cont, _("Indexes:"));
            for (i = 0; i < tuples; i++) {
              /* untranslated index name */
              printfPQExpBuffer(buf, "    \"%s\"",
                PQgetvalue(result, i, 0));

              /* If exclusion constraint, print the constraintdef */
              if (strcmp(PQgetvalue(result, i, 7), "x") == 0) {
                appendPQExpBuffer(buf, " %s",
                  PQgetvalue(result, i, 6));
              }
              else {
                let indexdef;
                let usingpos;

                /* Label as primary key or unique (but not both) */
                if (strcmp(PQgetvalue(result, i, 1), "t") == 0)
                  appendPQExpBufferStr(buf, " PRIMARY KEY,");
                else if (strcmp(PQgetvalue(result, i, 2), "t") == 0) {
                  if (strcmp(PQgetvalue(result, i, 7), "u") == 0)
                    appendPQExpBufferStr(buf, " UNIQUE CONSTRAINT,");
                  else
                    appendPQExpBufferStr(buf, " UNIQUE,");
                }

                /* Everything after "USING" is echoed verbatim */
                indexdef = PQgetvalue(result, i, 5);
                usingpos = strstr(indexdef, " USING ");
                if (usingpos != NULL)
                  indexdef = indexdef.slice(usingpos + 7);
                appendPQExpBuffer(buf, " %s", indexdef);

                /* Need these for deferrable PK/UNIQUE indexes */
                if (strcmp(PQgetvalue(result, i, 8), "t") == 0)
                  appendPQExpBufferStr(buf, " DEFERRABLE");

                if (strcmp(PQgetvalue(result, i, 9), "t") == 0)
                  appendPQExpBufferStr(buf, " INITIALLY DEFERRED");
              }

              /* Add these for all cases */
              if (strcmp(PQgetvalue(result, i, 3), "t") == 0)
                appendPQExpBufferStr(buf, " CLUSTER");

              if (strcmp(PQgetvalue(result, i, 4), "t") != 0)
                appendPQExpBufferStr(buf, " INVALID");

              if (strcmp(PQgetvalue(result, i, 10), "t") == 0)
                appendPQExpBufferStr(buf, " REPLICA IDENTITY");

              printTableAddFooter(cont, buf.data);

              /* Print tablespace of the index on the same line */
              await add_tablespace_footer(cont, RELKIND_INDEX,
                atooid(PQgetvalue(result, i, 11)),
                false);
            }
          }
        }

        /* print table (and column) check constraints */
        if (tableinfo.checks) {
          printfPQExpBuffer(buf,
            "SELECT r.conname, " +
            "pg_catalog.pg_get_constraintdef(r.oid, true)\n" +
            "FROM pg_catalog.pg_constraint r\n" +
            "WHERE r.conrelid = '%s' AND r.contype = 'c'\n" +
            "ORDER BY 1;",
            oid);
          result = await PSQLexec(buf.data);
          if (!result)
            return retval;
          else
            tuples = PQntuples(result);

          if (tuples > 0) {
            printTableAddFooter(cont, _("Check constraints:"));
            for (i = 0; i < tuples; i++) {
              /* untranslated constraint name and def */
              printfPQExpBuffer(buf, "    \"%s\" %s",
                PQgetvalue(result, i, 0),
                PQgetvalue(result, i, 1));

              printTableAddFooter(cont, buf.data);
            }
          }
        }

        /*
         * Print foreign-key constraints (there are none if no triggers,
         * except if the table is partitioned, in which case the triggers
         * appear in the partitions)
         */
        if (tableinfo.hastriggers ||
          tableinfo.relkind == RELKIND_PARTITIONED_TABLE) {
          if (pset.sversion >= 120000 &&
            (tableinfo.ispartition || tableinfo.relkind == RELKIND_PARTITIONED_TABLE)) {
            /*
             * Put the constraints defined in this table first, followed
             * by the constraints defined in ancestor partitioned tables.
             */
            printfPQExpBuffer(buf,
              "SELECT conrelid = '%s'::pg_catalog.regclass AS sametable,\n" +
              "       conname,\n" +
              "       pg_catalog.pg_get_constraintdef(oid, true) AS condef,\n" +
              "       conrelid::pg_catalog.regclass AS ontable\n" +
              "  FROM pg_catalog.pg_constraint,\n" +
              "       pg_catalog.pg_partition_ancestors('%s')\n" +
              " WHERE conrelid = relid AND contype = 'f' AND conparentid = 0\n" +
              "ORDER BY sametable DESC, conname;",
              oid, oid);
          }
          else {
            printfPQExpBuffer(buf,
              "SELECT true as sametable, conname,\n" +
              "  pg_catalog.pg_get_constraintdef(r.oid, true) as condef,\n" +
              "  conrelid::pg_catalog.regclass AS ontable\n" +
              "FROM pg_catalog.pg_constraint r\n" +
              "WHERE r.conrelid = '%s' AND r.contype = 'f'\n",
              oid);

            if (pset.sversion >= 120000)
              appendPQExpBufferStr(buf, "     AND conparentid = 0\n");
            appendPQExpBufferStr(buf, "ORDER BY conname");
          }

          result = await PSQLexec(buf.data);
          if (!result)
            return retval;
          else
            tuples = PQntuples(result);

          if (tuples > 0) {
            let i_sametable = PQfnumber(result, "sametable"),
              i_conname = PQfnumber(result, "conname"),
              i_condef = PQfnumber(result, "condef"),
              i_ontable = PQfnumber(result, "ontable");

            printTableAddFooter(cont, _("Foreign-key constraints:"));
            for (i = 0; i < tuples; i++) {
              /*
               * Print untranslated constraint name and definition. Use
               * a "TABLE tab" prefix when the constraint is defined in
               * a parent partitioned table.
               */
              if (strcmp(PQgetvalue(result, i, i_sametable), "f") == 0)
                printfPQExpBuffer(buf, "    TABLE \"%s\" CONSTRAINT \"%s\" %s",
                  PQgetvalue(result, i, i_ontable),
                  PQgetvalue(result, i, i_conname),
                  PQgetvalue(result, i, i_condef));
              else
                printfPQExpBuffer(buf, "    \"%s\" %s",
                  PQgetvalue(result, i, i_conname),
                  PQgetvalue(result, i, i_condef));

              printTableAddFooter(cont, buf.data);
            }
          }
        }

        /* print incoming foreign-key references */
        if (tableinfo.hastriggers ||
          tableinfo.relkind == RELKIND_PARTITIONED_TABLE) {
          if (pset.sversion >= 120000) {
            printfPQExpBuffer(buf,
              "SELECT conname, conrelid::pg_catalog.regclass AS ontable,\n" +
              "       pg_catalog.pg_get_constraintdef(oid, true) AS condef\n" +
              "  FROM pg_catalog.pg_constraint c\n" +
              " WHERE confrelid IN (SELECT pg_catalog.pg_partition_ancestors('%s')\n" +
              "                     UNION ALL VALUES ('%s'::pg_catalog.regclass))\n" +
              "       AND contype = 'f' AND conparentid = 0\n" +
              "ORDER BY conname;",
              oid, oid);
          }
          else {
            printfPQExpBuffer(buf,
              "SELECT conname, conrelid::pg_catalog.regclass AS ontable,\n" +
              "       pg_catalog.pg_get_constraintdef(oid, true) AS condef\n" +
              "  FROM pg_catalog.pg_constraint\n" +
              " WHERE confrelid = %s AND contype = 'f'\n" +
              "ORDER BY conname;",
              oid);
          }

          result = await PSQLexec(buf.data);
          if (!result)
            return retval;
          else
            tuples = PQntuples(result);

          if (tuples > 0) {
            let i_conname = PQfnumber(result, "conname"),
              i_ontable = PQfnumber(result, "ontable"),
              i_condef = PQfnumber(result, "condef");

            printTableAddFooter(cont, _("Referenced by:"));
            for (i = 0; i < tuples; i++) {
              printfPQExpBuffer(buf, "    TABLE \"%s\" CONSTRAINT \"%s\" %s",
                PQgetvalue(result, i, i_ontable),
                PQgetvalue(result, i, i_conname),
                PQgetvalue(result, i, i_condef));

              printTableAddFooter(cont, buf.data);
            }
          }
        }

        /* print any row-level policies */
        if (pset.sversion >= 90500) {
          printfPQExpBuffer(buf, "SELECT pol.polname,");
          if (pset.sversion >= 100000)
            appendPQExpBufferStr(buf,
              " pol.polpermissive,\n");
          else
            appendPQExpBufferStr(buf,
              " 't' as polpermissive,\n");
          appendPQExpBuffer(buf,
            "  CASE WHEN pol.polroles = '{0}' THEN NULL ELSE pg_catalog.array_to_string(array(select rolname from pg_catalog.pg_roles where oid = any (pol.polroles) order by 1),',') END,\n" +
            "  pg_catalog.pg_get_expr(pol.polqual, pol.polrelid),\n" +
            "  pg_catalog.pg_get_expr(pol.polwithcheck, pol.polrelid),\n" +
            "  CASE pol.polcmd\n" +
            "    WHEN 'r' THEN 'SELECT'\n" +
            "    WHEN 'a' THEN 'INSERT'\n" +
            "    WHEN 'w' THEN 'UPDATE'\n" +
            "    WHEN 'd' THEN 'DELETE'\n" +
            "    END AS cmd\n" +
            "FROM pg_catalog.pg_policy pol\n" +
            "WHERE pol.polrelid = '%s' ORDER BY 1;",
            oid);

          result = await PSQLexec(buf.data);
          if (!result)
            return retval;
          else
            tuples = PQntuples(result);

          /*
           * Handle cases where RLS is enabled and there are policies, or
           * there aren't policies, or RLS isn't enabled but there are
           * policies
           */
          if (tableinfo.rowsecurity && !tableinfo.forcerowsecurity && tuples > 0)
            printTableAddFooter(cont, _("Policies:"));

          if (tableinfo.rowsecurity && tableinfo.forcerowsecurity && tuples > 0)
            printTableAddFooter(cont, _("Policies (forced row security enabled):"));

          if (tableinfo.rowsecurity && !tableinfo.forcerowsecurity && tuples == 0)
            printTableAddFooter(cont, _("Policies (row security enabled): (none)"));

          if (tableinfo.rowsecurity && tableinfo.forcerowsecurity && tuples == 0)
            printTableAddFooter(cont, _("Policies (forced row security enabled): (none)"));

          if (!tableinfo.rowsecurity && tuples > 0)
            printTableAddFooter(cont, _("Policies (row security disabled):"));

          /* Might be an empty set - that's ok */
          for (i = 0; i < tuples; i++) {
            printfPQExpBuffer(buf, "    POLICY \"%s\"",
              PQgetvalue(result, i, 0));

            if ((PQgetvalue(result, i, 1)) == 'f')
              appendPQExpBufferStr(buf, " AS RESTRICTIVE");

            if (!PQgetisnull(result, i, 5))
              appendPQExpBuffer(buf, " FOR %s",
                PQgetvalue(result, i, 5));

            if (!PQgetisnull(result, i, 2)) {
              appendPQExpBuffer(buf, "\n      TO %s",
                PQgetvalue(result, i, 2));
            }

            if (!PQgetisnull(result, i, 3))
              appendPQExpBuffer(buf, "\n      USING (%s)",
                PQgetvalue(result, i, 3));

            if (!PQgetisnull(result, i, 4))
              appendPQExpBuffer(buf, "\n      WITH CHECK (%s)",
                PQgetvalue(result, i, 4));

            printTableAddFooter(cont, buf.data);
          }
        }

        /* print any extended statistics */
        if (pset.sversion >= 140000) {
          printfPQExpBuffer(buf,
            "SELECT oid, " +
            "stxrelid::pg_catalog.regclass, " +
            "stxnamespace::pg_catalog.regnamespace::pg_catalog.text AS nsp, " +
            "stxname,\n" +
            "pg_catalog.pg_get_statisticsobjdef_columns(oid) AS columns,\n" +
            "  'd' = any(stxkind) AS ndist_enabled,\n" +
            "  'f' = any(stxkind) AS deps_enabled,\n" +
            "  'm' = any(stxkind) AS mcv_enabled,\n" +
            "stxstattarget\n" +
            "FROM pg_catalog.pg_statistic_ext\n" +
            "WHERE stxrelid = '%s'\n" +
            "ORDER BY nsp, stxname;",
            oid);

          result = await PSQLexec(buf.data);
          if (!result)
            return retval;
          else
            tuples = PQntuples(result);

          if (tuples > 0) {
            printTableAddFooter(cont, _("Statistics objects:"));

            for (i = 0; i < tuples; i++) {
              let gotone = false;
              let has_ndistinct;
              let has_dependencies;
              let has_mcv;
              let has_all;
              let has_some;

              has_ndistinct = (strcmp(PQgetvalue(result, i, 5), "t") == 0);
              has_dependencies = (strcmp(PQgetvalue(result, i, 6), "t") == 0);
              has_mcv = (strcmp(PQgetvalue(result, i, 7), "t") == 0);

              printfPQExpBuffer(buf, "    ");

              /* statistics object name (qualified with namespace) */
              appendPQExpBuffer(buf, "\"%s.%s\"",
                PQgetvalue(result, i, 2),
                PQgetvalue(result, i, 3));

              /*
               * When printing kinds we ignore expression statistics,
               * which are used only internally and can't be specified
               * by user. We don't print the kinds when none are
               * specified (in which case it has to be statistics on a
               * single expr) or when all are specified (in which case
               * we assume it's expanded by CREATE STATISTICS).
               */
              has_all = (has_ndistinct && has_dependencies && has_mcv);
              has_some = (has_ndistinct || has_dependencies || has_mcv);

              if (has_some && !has_all) {
                appendPQExpBufferStr(buf, " (");

                /* options */
                if (has_ndistinct) {
                  appendPQExpBufferStr(buf, "ndistinct");
                  gotone = true;
                }

                if (has_dependencies) {
                  appendPQExpBuffer(buf, "%sdependencies", gotone ? ", " : "");
                  gotone = true;
                }

                if (has_mcv) {
                  appendPQExpBuffer(buf, "%smcv", gotone ? ", " : "");
                }

                appendPQExpBufferChar(buf, ')');
              }

              appendPQExpBuffer(buf, " ON %s FROM %s",
                PQgetvalue(result, i, 4),
                PQgetvalue(result, i, 1));

              /* Show the stats target if it's not default */
              if (!PQgetisnull(result, i, 8) &&
                strcmp(PQgetvalue(result, i, 8), "-1") != 0)
                appendPQExpBuffer(buf, "; STATISTICS %s",
                  PQgetvalue(result, i, 8));

              printTableAddFooter(cont, buf.data);
            }
          }
        }
        else if (pset.sversion >= 100000) {
          printfPQExpBuffer(buf,
            "SELECT oid, " +
            "stxrelid::pg_catalog.regclass, " +
            "stxnamespace::pg_catalog.regnamespace AS nsp, " +
            "stxname,\n" +
            "  (SELECT pg_catalog.string_agg(pg_catalog.quote_ident(attname),', ')\n" +
            "   FROM pg_catalog.unnest(stxkeys) s(attnum)\n" +
            "   JOIN pg_catalog.pg_attribute a ON (stxrelid = a.attrelid AND\n" +
            "        a.attnum = s.attnum AND NOT attisdropped)) AS columns,\n" +
            "  'd' = any(stxkind) AS ndist_enabled,\n" +
            "  'f' = any(stxkind) AS deps_enabled,\n" +
            "  'm' = any(stxkind) AS mcv_enabled,\n");

          if (pset.sversion >= 130000)
            appendPQExpBufferStr(buf, "  stxstattarget\n");
          else
            appendPQExpBufferStr(buf, "  -1 AS stxstattarget\n");
          appendPQExpBuffer(buf, "FROM pg_catalog.pg_statistic_ext\n" +
            "WHERE stxrelid = '%s'\n" +
            "ORDER BY 1;",
            oid);

          result = await PSQLexec(buf.data);
          if (!result)
            return retval;
          else
            tuples = PQntuples(result);

          if (tuples > 0) {
            printTableAddFooter(cont, _("Statistics objects:"));

            for (i = 0; i < tuples; i++) {
              let gotone = false;

              printfPQExpBuffer(buf, "    ");

              /* statistics object name (qualified with namespace) */
              appendPQExpBuffer(buf, "\"%s.%s\" (",
                PQgetvalue(result, i, 2),
                PQgetvalue(result, i, 3));

              /* options */
              if (strcmp(PQgetvalue(result, i, 5), "t") == 0) {
                appendPQExpBufferStr(buf, "ndistinct");
                gotone = true;
              }

              if (strcmp(PQgetvalue(result, i, 6), "t") == 0) {
                appendPQExpBuffer(buf, "%sdependencies", gotone ? ", " : "");
                gotone = true;
              }

              if (strcmp(PQgetvalue(result, i, 7), "t") == 0) {
                appendPQExpBuffer(buf, "%smcv", gotone ? ", " : "");
              }

              appendPQExpBuffer(buf, ") ON %s FROM %s",
                PQgetvalue(result, i, 4),
                PQgetvalue(result, i, 1));

              /* Show the stats target if it's not default */
              if (strcmp(PQgetvalue(result, i, 8), "-1") != 0)
                appendPQExpBuffer(buf, "; STATISTICS %s",
                  PQgetvalue(result, i, 8));

              printTableAddFooter(cont, buf.data);
            }
          }
        }

        /* print rules */
        if (tableinfo.hasrules && tableinfo.relkind != RELKIND_MATVIEW) {
          printfPQExpBuffer(buf,
            "SELECT r.rulename, trim(trailing ';' from pg_catalog.pg_get_ruledef(r.oid, true)), " +
            "ev_enabled\n" +
            "FROM pg_catalog.pg_rewrite r\n" +
            "WHERE r.ev_class = '%s' ORDER BY 1;",
            oid);
          result = await PSQLexec(buf.data);
          if (!result)
            return retval;
          else
            tuples = PQntuples(result);

          if (tuples > 0) {
            let have_heading;
            let category;

            for (category = 0; category < 4; category++) {
              have_heading = false;

              for (i = 0; i < tuples; i++) {
                let ruledef;
                let list_rule = false;

                switch (category) {
                  case 0:
                    if (PQgetvalue(result, i, 2) == 'O')
                      list_rule = true;
                    break;
                  case 1:
                    if (PQgetvalue(result, i, 2) == 'D')
                      list_rule = true;
                    break;
                  case 2:
                    if (PQgetvalue(result, i, 2) == 'A')
                      list_rule = true;
                    break;
                  case 3:
                    if (PQgetvalue(result, i, 2) == 'R')
                      list_rule = true;
                    break;
                }
                if (!list_rule)
                  continue;

                if (!have_heading) {
                  switch (category) {
                    case 0:
                      printfPQExpBuffer(buf, _("Rules:"));
                      break;
                    case 1:
                      printfPQExpBuffer(buf, _("Disabled rules:"));
                      break;
                    case 2:
                      printfPQExpBuffer(buf, _("Rules firing always:"));
                      break;
                    case 3:
                      printfPQExpBuffer(buf, _("Rules firing on replica only:"));
                      break;
                  }
                  printTableAddFooter(cont, buf.data);
                  have_heading = true;
                }

                /* Everything after "CREATE RULE" is echoed verbatim */
                ruledef = PQgetvalue(result, i, 1);
                ruledef = ruledef.slice(12);
                printfPQExpBuffer(buf, "    %s", ruledef);
                printTableAddFooter(cont, buf.data);
              }
            }
          }
        }

        /* print any publications */
        if (pset.sversion >= 100000) {
          if (pset.sversion >= 150000) {
            printfPQExpBuffer(buf,
              "SELECT pubname\n" +
              "     , NULL\n" +
              "     , NULL\n" +
              "FROM pg_catalog.pg_publication p\n" +
              "     JOIN pg_catalog.pg_publication_namespace pn ON p.oid = pn.pnpubid\n" +
              "     JOIN pg_catalog.pg_class pc ON pc.relnamespace = pn.pnnspid\n" +
              "WHERE pc.oid ='%s' and pg_catalog.pg_relation_is_publishable('%s')\n" +
              "UNION\n" +
              "SELECT pubname\n" +
              "     , pg_get_expr(pr.prqual, c.oid)\n" +
              "     , (CASE WHEN pr.prattrs IS NOT NULL THEN\n" +
              "         (SELECT string_agg(attname, ', ')\n" +
              "           FROM pg_catalog.generate_series(0, pg_catalog.array_upper(pr.prattrs::pg_catalog.int2[], 1)) s,\n" +
              "                pg_catalog.pg_attribute\n" +
              "          WHERE attrelid = pr.prrelid AND attnum = prattrs[s])\n" +
              "        ELSE NULL END) " +
              "FROM pg_catalog.pg_publication p\n" +
              "     JOIN pg_catalog.pg_publication_rel pr ON p.oid = pr.prpubid\n" +
              "     JOIN pg_catalog.pg_class c ON c.oid = pr.prrelid\n" +
              "WHERE pr.prrelid = '%s'\n" +
              "UNION\n" +
              "SELECT pubname\n" +
              "     , NULL\n" +
              "     , NULL\n" +
              "FROM pg_catalog.pg_publication p\n" +
              "WHERE p.puballtables AND pg_catalog.pg_relation_is_publishable('%s')\n" +
              "ORDER BY 1;",
              oid, oid, oid, oid);
          }
          else {
            printfPQExpBuffer(buf,
              "SELECT pubname\n" +
              "     , NULL\n" +
              "     , NULL\n" +
              "FROM pg_catalog.pg_publication p\n" +
              "JOIN pg_catalog.pg_publication_rel pr ON p.oid = pr.prpubid\n" +
              "WHERE pr.prrelid = '%s'\n" +
              "UNION ALL\n" +
              "SELECT pubname\n" +
              "     , NULL\n" +
              "     , NULL\n" +
              "FROM pg_catalog.pg_publication p\n" +
              "WHERE p.puballtables AND pg_catalog.pg_relation_is_publishable('%s')\n" +
              "ORDER BY 1;",
              oid, oid);
          }

          result = await PSQLexec(buf.data);
          if (!result)
            return retval;
          else
            tuples = PQntuples(result);

          if (tuples > 0)
            printTableAddFooter(cont, _("Publications:"));

          /* Might be an empty set - that's ok */
          for (i = 0; i < tuples; i++) {
            printfPQExpBuffer(buf, "    \"%s\"",
              PQgetvalue(result, i, 0));

            /* column list (if any) */
            if (!PQgetisnull(result, i, 2))
              appendPQExpBuffer(buf, " (%s)",
                PQgetvalue(result, i, 2));

            /* row filter (if any) */
            if (!PQgetisnull(result, i, 1))
              appendPQExpBuffer(buf, " WHERE %s",
                PQgetvalue(result, i, 1));

            printTableAddFooter(cont, buf.data);
          }
        }
      }

      /* Get view_def if table is a view or materialized view */
      if ((tableinfo.relkind == RELKIND_VIEW ||
        tableinfo.relkind == RELKIND_MATVIEW) && verbose) {
        let result;

        printfPQExpBuffer(buf,
          "SELECT pg_catalog.pg_get_viewdef('%s'::pg_catalog.oid, true);",
          oid);
        result = await PSQLexec(buf.data);
        if (!result)
          return retval;

        if (PQntuples(result) > 0)
          view_def = pg_strdup(PQgetvalue(result, 0, 0));

      }

      if (view_def) {
        let result = NULL;

        /* Footer information about a view */
        printTableAddFooter(cont, _("View definition:"));
        printTableAddFooter(cont, view_def);

        /* print rules */
        if (tableinfo.hasrules) {
          printfPQExpBuffer(buf,
            "SELECT r.rulename, trim(trailing ';' from pg_catalog.pg_get_ruledef(r.oid, true))\n" +
            "FROM pg_catalog.pg_rewrite r\n" +
            "WHERE r.ev_class = '%s' AND r.rulename != '_RETURN' ORDER BY 1;",
            oid);
          result = await PSQLexec(buf.data);
          if (!result)
            return retval;

          if (PQntuples(result) > 0) {
            printTableAddFooter(cont, _("Rules:"));
            for (i = 0; i < PQntuples(result); i++) {
              let ruledef;

              /* Everything after "CREATE RULE" is echoed verbatim */
              ruledef = PQgetvalue(result, i, 1);
              ruledef = ruledef.slice(12);

              printfPQExpBuffer(buf, " %s", ruledef);
              printTableAddFooter(cont, buf.data);
            }
          }
        }
      }

      /*
       * Print triggers next, if any (but only user-defined triggers).  This
       * could apply to either a table or a view.
       */
      if (tableinfo.hastriggers) {
        let result;
        let tuples;

        printfPQExpBuffer(buf,
          "SELECT t.tgname, " +
          "pg_catalog.pg_get_triggerdef(t.oid, true), " +
          "t.tgenabled, t.tgisinternal,\n");

        /*
         * Detect whether each trigger is inherited, and if so, get the name
         * of the topmost table it's inherited from.  We have no easy way to
         * do that pre-v13, for lack of the tgparentid column.  Even with
         * tgparentid, a straightforward search for the topmost parent would
         * require a recursive CTE, which seems unduly expensive.  We cheat a
         * bit by assuming parent triggers will match by tgname; then, joining
         * with pg_partition_ancestors() allows the planner to make use of
         * pg_trigger_tgrelid_tgname_index if it wishes.  We ensure we find
         * the correct topmost parent by stopping at the first-in-partition-
         * ancestry-order trigger that has tgparentid = 0.  (There might be
         * unrelated, non-inherited triggers with the same name further up the
         * stack, so this is important.)
         */
        if (pset.sversion >= 130000)
          appendPQExpBufferStr(buf,
            "  CASE WHEN t.tgparentid != 0 THEN\n" +
            "    (SELECT u.tgrelid::pg_catalog.regclass\n" +
            "     FROM pg_catalog.pg_trigger AS u,\n" +
            "          pg_catalog.pg_partition_ancestors(t.tgrelid) WITH ORDINALITY AS a(relid, depth)\n" +
            "     WHERE u.tgname = t.tgname AND u.tgrelid = a.relid\n" +
            "           AND u.tgparentid = 0\n" +
            "     ORDER BY a.depth LIMIT 1)\n" +
            "  END AS parent\n");
        else
          appendPQExpBufferStr(buf, "  NULL AS parent\n");

        appendPQExpBuffer(buf,
          "FROM pg_catalog.pg_trigger t\n" +
          "WHERE t.tgrelid = '%s' AND ",
          oid);

        /*
         * tgisinternal is set true for inherited triggers of partitions in
         * servers between v11 and v14, though these must still be shown to
         * the user.  So we use another property that is true for such
         * inherited triggers to avoid them being hidden, which is their
         * dependence on another trigger.
         */
        if (pset.sversion >= 110000 && pset.sversion < 150000)
          appendPQExpBufferStr(buf, "(NOT t.tgisinternal OR (t.tgisinternal AND t.tgenabled = 'D') \n" +
            "    OR EXISTS (SELECT 1 FROM pg_catalog.pg_depend WHERE objid = t.oid \n" +
            "        AND refclassid = 'pg_catalog.pg_trigger'::pg_catalog.regclass))");
        else
          /* display/warn about disabled internal triggers */
          appendPQExpBufferStr(buf, "(NOT t.tgisinternal OR (t.tgisinternal AND t.tgenabled = 'D'))");
        appendPQExpBufferStr(buf, "\nORDER BY 1;");

        result = await PSQLexec(buf.data);
        if (!result)
          return retval;
        else
          tuples = PQntuples(result);

        if (tuples > 0) {
          let have_heading;
          let category;

          /*
           * split the output into 4 different categories. Enabled triggers,
           * disabled triggers and the two special ALWAYS and REPLICA
           * configurations.
           */
          for (category = 0; category <= 4; category++) {
            have_heading = false;
            for (i = 0; i < tuples; i++) {
              let list_trigger;
              let tgdef;
              let usingpos;
              let tgenabled;
              let tgisinternal;

              /*
               * Check if this trigger falls into the current category
               */
              tgenabled = PQgetvalue(result, i, 2);
              tgisinternal = PQgetvalue(result, i, 3);
              list_trigger = false;
              switch (category) {
                case 0:
                  if (tgenabled == 'O' || tgenabled == 't')
                    list_trigger = true;
                  break;
                case 1:
                  if ((tgenabled == 'D' || tgenabled == 'f') &&
                    tgisinternal == 'f')
                    list_trigger = true;
                  break;
                case 2:
                  if ((tgenabled == 'D' || tgenabled == 'f') &&
                    tgisinternal == 't')
                    list_trigger = true;
                  break;
                case 3:
                  if (tgenabled == 'A')
                    list_trigger = true;
                  break;
                case 4:
                  if (tgenabled == 'R')
                    list_trigger = true;
                  break;
              }
              if (list_trigger == false)
                continue;

              /* Print the category heading once */
              if (have_heading == false) {
                switch (category) {
                  case 0:
                    printfPQExpBuffer(buf, _("Triggers:"));
                    break;
                  case 1:
                    printfPQExpBuffer(buf, _("Disabled user triggers:"));
                    break;
                  case 2:
                    printfPQExpBuffer(buf, _("Disabled internal triggers:"));
                    break;
                  case 3:
                    printfPQExpBuffer(buf, _("Triggers firing always:"));
                    break;
                  case 4:
                    printfPQExpBuffer(buf, _("Triggers firing on replica only:"));
                    break;
                }
                printTableAddFooter(cont, buf.data);
                have_heading = true;
              }

              /* Everything after "TRIGGER" is echoed verbatim */
              tgdef = PQgetvalue(result, i, 1);
              usingpos = strstr(tgdef, " TRIGGER ");
              if (usingpos != NULL)
                tgdef = tgdef.slice(usingpos + 9);

              printfPQExpBuffer(buf, "    %s", tgdef);

              /* Visually distinguish inherited triggers */
              if (!PQgetisnull(result, i, 4))
                appendPQExpBuffer(buf, ", ON TABLE %s",
                  PQgetvalue(result, i, 4));

              printTableAddFooter(cont, buf.data);
            }
          }
        }
      }

      /*
       * Finish printing the footer information about a table.
       */
      if (tableinfo.relkind == RELKIND_RELATION ||
        tableinfo.relkind == RELKIND_MATVIEW ||
        tableinfo.relkind == RELKIND_FOREIGN_TABLE ||
        tableinfo.relkind == RELKIND_PARTITIONED_TABLE ||
        tableinfo.relkind == RELKIND_PARTITIONED_INDEX ||
        tableinfo.relkind == RELKIND_TOASTVALUE) {
        let is_partitioned;
        let result;
        let tuples;

        /* simplify some repeated tests below */
        is_partitioned = (tableinfo.relkind == RELKIND_PARTITIONED_TABLE ||
          tableinfo.relkind == RELKIND_PARTITIONED_INDEX);

        /* print foreign server name */
        if (tableinfo.relkind == RELKIND_FOREIGN_TABLE) {
          let ftoptions;

          /* Footer information about foreign table */
          printfPQExpBuffer(buf,
            "SELECT s.srvname,\n" +
            "  pg_catalog.array_to_string(ARRAY(\n" +
            "    SELECT pg_catalog.quote_ident(option_name)" +
            " || ' ' || pg_catalog.quote_literal(option_value)\n" +
            "    FROM pg_catalog.pg_options_to_table(ftoptions)),  ', ')\n" +
            "FROM pg_catalog.pg_foreign_table f,\n" +
            "     pg_catalog.pg_foreign_server s\n" +
            "WHERE f.ftrelid = '%s' AND s.oid = f.ftserver;",
            oid);
          result = await PSQLexec(buf.data);
          if (!result)
            return retval;
          else if (PQntuples(result) != 1) {
            return retval;
          }

          /* Print server name */
          printfPQExpBuffer(buf, _("Server: %s"),
            PQgetvalue(result, 0, 0));
          printTableAddFooter(cont, buf.data);

          /* Print per-table FDW options, if any */
          ftoptions = PQgetvalue(result, 0, 1);
          if (ftoptions && ftoptions[0] != NULL) {
            printfPQExpBuffer(buf, _("FDW options: (%s)"), ftoptions);
            printTableAddFooter(cont, buf.data);
          }
        }

        /* print tables inherited from (exclude partitioned parents) */
        printfPQExpBuffer(buf,
          "SELECT c.oid::pg_catalog.regclass\n" +
          "FROM pg_catalog.pg_class c, pg_catalog.pg_inherits i\n" +
          "WHERE c.oid = i.inhparent AND i.inhrelid = '%s'\n" +
          "  AND c.relkind != " +
          "'p'" +
          " AND c.relkind != " +
          "'I'" +
          "\nORDER BY inhseqno;",
          oid);

        result = await PSQLexec(buf.data);
        if (!result)
          return retval;
        else {
          let s = _("Inherits");
          let sw = pg_wcswidth(s, strlen(s), pset.encoding);

          tuples = PQntuples(result);

          for (i = 0; i < tuples; i++) {
            if (i == 0)
              printfPQExpBuffer(buf, "%s: %s",
                s, PQgetvalue(result, i, 0));
            else
              printfPQExpBuffer(buf, "%*s  %s",
                sw, "", PQgetvalue(result, i, 0));
            if (i < tuples - 1)
              appendPQExpBufferChar(buf, ',');

            printTableAddFooter(cont, buf.data);
          }

        }

        /* print child tables (with additional info if partitions) */
        if (pset.sversion >= 140000)
          printfPQExpBuffer(buf,
            "SELECT c.oid::pg_catalog.regclass, c.relkind," +
            " inhdetachpending," +
            " pg_catalog.pg_get_expr(c.relpartbound, c.oid)\n" +
            "FROM pg_catalog.pg_class c, pg_catalog.pg_inherits i\n" +
            "WHERE c.oid = i.inhrelid AND i.inhparent = '%s'\n" +
            "ORDER BY pg_catalog.pg_get_expr(c.relpartbound, c.oid) = 'DEFAULT'," +
            " c.oid::pg_catalog.regclass::pg_catalog.text;",
            oid);
        else if (pset.sversion >= 100000)
          printfPQExpBuffer(buf,
            "SELECT c.oid::pg_catalog.regclass, c.relkind," +
            " false AS inhdetachpending," +
            " pg_catalog.pg_get_expr(c.relpartbound, c.oid)\n" +
            "FROM pg_catalog.pg_class c, pg_catalog.pg_inherits i\n" +
            "WHERE c.oid = i.inhrelid AND i.inhparent = '%s'\n" +
            "ORDER BY pg_catalog.pg_get_expr(c.relpartbound, c.oid) = 'DEFAULT'," +
            " c.oid::pg_catalog.regclass::pg_catalog.text;",
            oid);
        else
          printfPQExpBuffer(buf,
            "SELECT c.oid::pg_catalog.regclass, c.relkind," +
            " false AS inhdetachpending, NULL\n" +
            "FROM pg_catalog.pg_class c, pg_catalog.pg_inherits i\n" +
            "WHERE c.oid = i.inhrelid AND i.inhparent = '%s'\n" +
            "ORDER BY c.oid::pg_catalog.regclass::pg_catalog.text;",
            oid);

        result = await PSQLexec(buf.data);
        if (!result)
          return retval;
        tuples = PQntuples(result);

        /*
         * For a partitioned table with no partitions, always print the number
         * of partitions as zero, even when verbose output is expected.
         * Otherwise, we will not print "Partitions" section for a partitioned
         * table without any partitions.
         */
        if (is_partitioned && tuples == 0) {
          printfPQExpBuffer(buf, _("Number of partitions: %d"), tuples);
          printTableAddFooter(cont, buf.data);
        }
        else if (!verbose) {
          /* print the number of child tables, if any */
          if (tuples > 0) {
            if (is_partitioned)
              printfPQExpBuffer(buf, _("Number of partitions: %d (Use \\d+ to list them.)"), tuples);
            else
              printfPQExpBuffer(buf, _("Number of child tables: %d (Use \\d+ to list them.)"), tuples);
            printTableAddFooter(cont, buf.data);
          }
        }
        else {
          /* display the list of child tables */
          let ct = is_partitioned ? _("Partitions") : _("Child tables");
          let ctw = pg_wcswidth(ct, strlen(ct), pset.encoding);

          for (i = 0; i < tuples; i++) {
            let child_relkind = PQgetvalue(result, i, 1);

            if (i == 0)
              printfPQExpBuffer(buf, "%s: %s",
                ct, PQgetvalue(result, i, 0));
            else
              printfPQExpBuffer(buf, "%*s  %s",
                ctw, "", PQgetvalue(result, i, 0));
            if (!PQgetisnull(result, i, 3))
              appendPQExpBuffer(buf, " %s", PQgetvalue(result, i, 3));
            if (child_relkind == RELKIND_PARTITIONED_TABLE ||
              child_relkind == RELKIND_PARTITIONED_INDEX)
              appendPQExpBufferStr(buf, ", PARTITIONED");
            else if (child_relkind == RELKIND_FOREIGN_TABLE)
              appendPQExpBufferStr(buf, ", FOREIGN");
            if (strcmp(PQgetvalue(result, i, 2), "t") == 0)
              appendPQExpBufferStr(buf, " (DETACH PENDING)");
            if (i < tuples - 1)
              appendPQExpBufferChar(buf, ',');

            printTableAddFooter(cont, buf.data);
          }
        }

        /* Table type */
        if (tableinfo.reloftype) {
          printfPQExpBuffer(buf, _("Typed table of type: %s"), tableinfo.reloftype);
          printTableAddFooter(cont, buf.data);
        }

        if (verbose &&
          (tableinfo.relkind == RELKIND_RELATION ||
            tableinfo.relkind == RELKIND_MATVIEW) &&

          /*
           * No need to display default values; we already display a REPLICA
           * IDENTITY marker on indexes.
           */
          tableinfo.relreplident != 'i' &&
          ((strcmp(schemaname, "pg_catalog") != 0 && tableinfo.relreplident != 'd') ||
            (strcmp(schemaname, "pg_catalog") == 0 && tableinfo.relreplident != 'n'))) {
          let s = _("Replica Identity");

          printfPQExpBuffer(buf, "%s: %s",
            s,
            tableinfo.relreplident == 'f' ? "FULL" :
              tableinfo.relreplident == 'n' ? "NOTHING" :
                "???");

          printTableAddFooter(cont, buf.data);
        }

        /* OIDs, if verbose and not a materialized view */
        if (verbose && tableinfo.relkind != RELKIND_MATVIEW && tableinfo.hasoids)
          printTableAddFooter(cont, _("Has OIDs: yes"));

        /* Tablespace info */
        await add_tablespace_footer(cont, tableinfo.relkind, tableinfo.tablespace,
          true);

        /* Access method info */
        if (verbose && tableinfo.relam != NULL && !pset.hide_tableam) {
          printfPQExpBuffer(buf, _("Access method: %s"), tableinfo.relam);
          printTableAddFooter(cont, buf.data);
        }
      }

      /* reloptions, if verbose */
      if (verbose &&
        tableinfo.reloptions && tableinfo.reloptions[0] != NULL) {
        let t = _("Options");

        printfPQExpBuffer(buf, "%s: %s", t, tableinfo.reloptions);
        printTableAddFooter(cont, buf.data);
      }

      printTable(cont, pset.queryFout, false, pset.logfile);

      retval = true;
      return retval;
    }

    /*
     * Add a tablespace description to a footer.  If 'newline' is true, it is added
     * in a new line; otherwise it's appended to the current value of the last
     * footer.
     */
    async function add_tablespace_footer(cont, relkind, tablespace, newline) {
      /* relkinds for which we support tablespaces */
      if (relkind == RELKIND_RELATION ||
        relkind == RELKIND_MATVIEW ||
        relkind == RELKIND_INDEX ||
        relkind == RELKIND_PARTITIONED_TABLE ||
        relkind == RELKIND_PARTITIONED_INDEX ||
        relkind == RELKIND_TOASTVALUE) {
        /*
         * We ignore the database default tablespace so that users not using
         * tablespaces don't need to know about them.
         */
        if (tablespace != 0) {
          let result = NULL;
          let buf = { /* struct */ };
          initPQExpBuffer(buf);
          printfPQExpBuffer(buf,
            "SELECT spcname FROM pg_catalog.pg_tablespace\n" +
            "WHERE oid = '%u';", tablespace);
          result = await PSQLexec(buf.data);
          if (!result) {
            return;
          }
          /* Should always be the case, but.... */
          if (PQntuples(result) > 0) {
            if (newline) {
              /* Add the tablespace as a new footer */
              printfPQExpBuffer(buf, _("Tablespace: \"%s\""),
                PQgetvalue(result, 0, 0));
              printTableAddFooter(cont, buf.data);
            }
            else {
              /* Append the tablespace to the latest footer */
              printfPQExpBuffer(buf, "%s", cont.footer);

              /*-------
                 translator: before this string there's an index description like
                 '"foo_pkey" PRIMARY KEY, btree (a)' */
              appendPQExpBuffer(buf, _(", tablespace \"%s\""),
                PQgetvalue(result, 0, 0));
              printTableSetFooter(cont, buf.data);
            }
          }

        }
      }
    }

    /*
     * \du or \dg
     *
     * Describes roles.  Any schema portion of the pattern is ignored.
     */
    async function describeRoles(pattern, verbose, showSystem) {
      let buf = { /* struct */ };
      let res;
      let cont = { /* struct */ };
      let myopt = pset.popt.topt;
      let ncols = 2;
      let nrows = 0;
      let i;
      let conns;
      let align = 'l';
      let attr;

      myopt.default_footer = false;

      initPQExpBuffer(buf);

      printfPQExpBuffer(buf,
        "SELECT r.rolname, r.rolsuper, r.rolinherit,\n" +
        "  r.rolcreaterole, r.rolcreatedb, r.rolcanlogin,\n" +
        "  r.rolconnlimit, r.rolvaliduntil");

      if (verbose) {
        appendPQExpBufferStr(buf, "\n, pg_catalog.shobj_description(r.oid, 'pg_authid') AS description");
        ncols++;
      }
      appendPQExpBufferStr(buf, "\n, r.rolreplication");

      if (pset.sversion >= 90500) {
        appendPQExpBufferStr(buf, "\n, r.rolbypassrls");
      }

      appendPQExpBufferStr(buf, "\nFROM pg_catalog.pg_roles r\n");

      if (!showSystem && !pattern)
        appendPQExpBufferStr(buf, "WHERE r.rolname !~ '^pg_'\n");

      if (!validateSQLNamePattern(buf, pattern, false, false,
        NULL, "r.rolname", NULL, NULL,
        NULL, 1)) {

        return false;
      }

      appendPQExpBufferStr(buf, "ORDER BY 1;");

      res = await PSQLexec(buf.data);
      if (!res)
        return false;

      nrows = PQntuples(res);
      attr = [];

      printTableInit(cont, myopt, _("List of roles"), ncols, nrows);

      printTableAddHeader(cont, gettext_noop("Role name"), true, align);
      printTableAddHeader(cont, gettext_noop("Attributes"), true, align);

      if (verbose)
        printTableAddHeader(cont, gettext_noop("Description"), true, align);

      for (i = 0; i < nrows; i++) {
        printTableAddCell(cont, PQgetvalue(res, i, 0), false, false);

        resetPQExpBuffer(buf);
        if (strcmp(PQgetvalue(res, i, 1), "t") == 0)
          add_role_attribute(buf, _("Superuser"));

        if (strcmp(PQgetvalue(res, i, 2), "t") != 0)
          add_role_attribute(buf, _("No inheritance"));

        if (strcmp(PQgetvalue(res, i, 3), "t") == 0)
          add_role_attribute(buf, _("Create role"));

        if (strcmp(PQgetvalue(res, i, 4), "t") == 0)
          add_role_attribute(buf, _("Create DB"));

        if (strcmp(PQgetvalue(res, i, 5), "t") != 0)
          add_role_attribute(buf, _("Cannot login"));

        if (strcmp(PQgetvalue(res, i, (verbose ? 9 : 8)), "t") == 0)
          add_role_attribute(buf, _("Replication"));

        if (pset.sversion >= 90500)
          if (strcmp(PQgetvalue(res, i, (verbose ? 10 : 9)), "t") == 0)
            add_role_attribute(buf, _("Bypass RLS"));

        conns = atoi(PQgetvalue(res, i, 6));
        if (conns >= 0) {
          if (buf.len > 0)
            appendPQExpBufferChar(buf, '\n');

          if (conns == 0)
            appendPQExpBufferStr(buf, _("No connections"));
          else
            appendPQExpBuffer(buf, ngettext("%d connection",
              "%d connections",
              conns),
              conns);
        }

        if (strcmp(PQgetvalue(res, i, 7), "") != 0) {
          if (buf.len > 0)
            appendPQExpBufferChar(buf, '\n');
          appendPQExpBufferStr(buf, _("Password valid until "));
          appendPQExpBufferStr(buf, PQgetvalue(res, i, 7));
        }

        attr[i] = pg_strdup(buf.data);

        printTableAddCell(cont, attr[i], false, false);

        if (verbose)
          printTableAddCell(cont, PQgetvalue(res, i, 8), false, false);
      }

      printTable(cont, pset.queryFout, false, pset.logfile);
      return true;
    }

    function add_role_attribute(buf, str) {
      if (buf.len > 0)
        appendPQExpBufferStr(buf, ", ");

      appendPQExpBufferStr(buf, str);
    }

    /*
     * \drds
     */
    async function listDbRoleSettings(pattern, pattern2) {
      let buf = { /* struct */ };
      let res;
      let myopt = pset.popt;
      let havewhere = {};

      initPQExpBuffer(buf);

      printfPQExpBuffer(buf, "SELECT rolname AS \"%s\", datname AS \"%s\",\n" +
        "pg_catalog.array_to_string(setconfig, E'\\n') AS \"%s\"\n" +
        "FROM pg_catalog.pg_db_role_setting s\n" +
        "LEFT JOIN pg_catalog.pg_database d ON d.oid = setdatabase\n" +
        "LEFT JOIN pg_catalog.pg_roles r ON r.oid = setrole\n",
        gettext_noop("Role"),
        gettext_noop("Database"),
        gettext_noop("Settings"));
      if (!validateSQLNamePattern(buf, pattern, false, false,
        NULL, "r.rolname", NULL, NULL, havewhere, 1))
        return false;
      if (!validateSQLNamePattern(buf, pattern2, havewhere.value, false,
        NULL, "d.datname", NULL, NULL,
        NULL, 1))
        return false;
      appendPQExpBufferStr(buf, "ORDER BY 1, 2;");

      res = await PSQLexec(buf.data);

      if (!res)
        return false;

      /*
       * Most functions in this file are content to print an empty table when
       * there are no matching objects.  We intentionally deviate from that
       * here, but only in !quiet mode, because of the possibility that the user
       * is confused about what the two pattern arguments mean.
       */
      if (PQntuples(res) == 0 && !pset.quiet) {
        if (pattern && pattern2)
          pg_log_error("Did not find any settings for role \"%s\" and database \"%s\".",
            pattern, pattern2);
        else if (pattern)
          pg_log_error("Did not find any settings for role \"%s\".",
            pattern);
        else
          pg_log_error("Did not find any settings.");
      }
      else {
        myopt.nullPrint = NULL;
        myopt.title = _("List of settings");
        myopt.translate_header = true;

        printQuery(res, myopt, pset.queryFout, false, pset.logfile);
      }

      return true;
    }

    /*
     * \drg
     * Describes role grants.
     */
    async function describeRoleGrants(pattern, showSystem) {
      let buf = { /* struct */ };
      let res;
      let myopt = pset.popt;

      initPQExpBuffer(buf);
      printfPQExpBuffer(buf,
        "SELECT m.rolname AS \"%s\", r.rolname AS \"%s\",\n" +
        "  pg_catalog.concat_ws(', ',\n",
        gettext_noop("Role name"),
        gettext_noop("Member of"));

      if (pset.sversion >= 160000)
        appendPQExpBufferStr(buf,
          "    CASE WHEN pam.admin_option THEN 'ADMIN' END,\n" +
          "    CASE WHEN pam.inherit_option THEN 'INHERIT' END,\n" +
          "    CASE WHEN pam.set_option THEN 'SET' END\n");
      else
        appendPQExpBufferStr(buf,
          "    CASE WHEN pam.admin_option THEN 'ADMIN' END,\n" +
          "    CASE WHEN m.rolinherit THEN 'INHERIT' END,\n" +
          "    'SET'\n");

      appendPQExpBuffer(buf,
        "  ) AS \"%s\",\n" +
        "  g.rolname AS \"%s\"\n",
        gettext_noop("Options"),
        gettext_noop("Grantor"));

      appendPQExpBufferStr(buf,
        "FROM pg_catalog.pg_roles m\n" +
        "     JOIN pg_catalog.pg_auth_members pam ON (pam.member = m.oid)\n" +
        "     LEFT JOIN pg_catalog.pg_roles r ON (pam.roleid = r.oid)\n" +
        "     LEFT JOIN pg_catalog.pg_roles g ON (pam.grantor = g.oid)\n");

      if (!showSystem && !pattern)
        appendPQExpBufferStr(buf, "WHERE m.rolname !~ '^pg_'\n");

      if (!validateSQLNamePattern(buf, pattern, false, false,
        NULL, "m.rolname", NULL, NULL,
        NULL, 1)) {

        return false;
      }

      appendPQExpBufferStr(buf, "ORDER BY 1, 2, 4;\n");

      res = await PSQLexec(buf.data);

      if (!res)
        return false;

      myopt.nullPrint = NULL;
      myopt.title = _("List of role grants");
      myopt.translate_header = true;

      printQuery(res, myopt, pset.queryFout, false, pset.logfile);

      return true;
    }

    /*
     * await listTables()
     *
     * handler for \dt, \di, etc.
     *
     * tabtypes is an array of characters, specifying what info is desired:
     * t - tables
     * i - indexes
     * v - views
     * m - materialized views
     * s - sequences
     * E - foreign table (Note: different from 'f', the relkind value)
     * (any order of the above is fine)
     */
    async function listTables(tabtypes, pattern, verbose, showSystem) {
      let showTables = strchr(tabtypes, 't') != NULL;
      let showIndexes = strchr(tabtypes, 'i') != NULL;
      let showViews = strchr(tabtypes, 'v') != NULL;
      let showMatViews = strchr(tabtypes, 'm') != NULL;
      let showSeq = strchr(tabtypes, 's') != NULL;
      let showForeign = strchr(tabtypes, 'E') != NULL;

      let buf = { /* struct */ };
      let res;
      let myopt = pset.popt;
      let cols_so_far;
      let translate_columns = [false, false, true, false, false, false, false, false, false];

      /* If tabtypes is empty, we default to \dtvmsE (but see also command.c) */
      if (!(showTables || showIndexes || showViews || showMatViews || showSeq || showForeign))
        showTables = showViews = showMatViews = showSeq = showForeign = true;

      initPQExpBuffer(buf);

      printfPQExpBuffer(buf,
        "SELECT n.nspname as \"%s\",\n" +
        "  c.relname as \"%s\",\n" +
        "  CASE c.relkind" +
        " WHEN " +
        "'r'" +
        " THEN '%s'" +
        " WHEN " +
        "'v'" +
        " THEN '%s'" +
        " WHEN " +
        "'m'" +
        " THEN '%s'" +
        " WHEN " +
        "'i'" +
        " THEN '%s'" +
        " WHEN " +
        "'S'" +
        " THEN '%s'" +
        " WHEN " +
        "'t'" +
        " THEN '%s'" +
        " WHEN " +
        "'f'" +
        " THEN '%s'" +
        " WHEN " +
        "'p'" +
        " THEN '%s'" +
        " WHEN " +
        "'I'" +
        " THEN '%s'" +
        " END as \"%s\",\n" +
        "  pg_catalog.pg_get_userbyid(c.relowner) as \"%s\"",
        gettext_noop("Schema"),
        gettext_noop("Name"),
        gettext_noop("table"),
        gettext_noop("view"),
        gettext_noop("materialized view"),
        gettext_noop("index"),
        gettext_noop("sequence"),
        gettext_noop("TOAST table"),
        gettext_noop("foreign table"),
        gettext_noop("partitioned table"),
        gettext_noop("partitioned index"),
        gettext_noop("Type"),
        gettext_noop("Owner"));
      cols_so_far = 4;

      if (showIndexes) {
        appendPQExpBuffer(buf,
          ",\n  c2.relname as \"%s\"",
          gettext_noop("Table"));
        cols_so_far++;
      }

      if (verbose) {
        /*
         * Show whether a relation is permanent, temporary, or unlogged.
         */
        appendPQExpBuffer(buf,
          ",\n  CASE c.relpersistence WHEN 'p' THEN '%s' WHEN 't' THEN '%s' WHEN 'u' THEN '%s' END as \"%s\"",
          gettext_noop("permanent"),
          gettext_noop("temporary"),
          gettext_noop("unlogged"),
          gettext_noop("Persistence"));
        translate_columns[cols_so_far] = true;

        /*
         * We don't bother to count cols_so_far below here, as there's no need
         * to; this might change with future additions to the output columns.
         */

        /*
         * Access methods exist for tables, materialized views and indexes.
         * This has been introduced in PostgreSQL 12 for tables.
         */
        if (pset.sversion >= 120000 && !pset.hide_tableam &&
          (showTables || showMatViews || showIndexes))
          appendPQExpBuffer(buf,
            ",\n  am.amname as \"%s\"",
            gettext_noop("Access method"));

        appendPQExpBuffer(buf,
          ",\n  pg_catalog.pg_size_pretty(pg_catalog.pg_table_size(c.oid)) as \"%s\"" +
          ",\n  pg_catalog.obj_description(c.oid, 'pg_class') as \"%s\"",
          gettext_noop("Size"),
          gettext_noop("Description"));
      }

      appendPQExpBufferStr(buf,
        "\nFROM pg_catalog.pg_class c" +
        "\n     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace");

      if (pset.sversion >= 120000 && !pset.hide_tableam &&
        (showTables || showMatViews || showIndexes))
        appendPQExpBufferStr(buf,
          "\n     LEFT JOIN pg_catalog.pg_am am ON am.oid = c.relam");

      if (showIndexes)
        appendPQExpBufferStr(buf,
          "\n     LEFT JOIN pg_catalog.pg_index i ON i.indexrelid = c.oid" +
          "\n     LEFT JOIN pg_catalog.pg_class c2 ON i.indrelid = c2.oid");

      appendPQExpBufferStr(buf, "\nWHERE c.relkind IN (");
      if (showTables) {
        appendPQExpBufferStr(buf,
          "'r'" +
          "," +
          "'p'" +
          ",");
        /* with 'S' or a pattern, allow 't' to match TOAST tables too */
        if (showSystem || pattern)
          appendPQExpBufferStr(buf,
            "'t'" +
            ",");
      }
      if (showViews)
        appendPQExpBufferStr(buf,
          "'v'" +
          ",");
      if (showMatViews)
        appendPQExpBufferStr(buf,
          "'m'" +
          ",");
      if (showIndexes)
        appendPQExpBufferStr(buf,
          "'i'" +
          "," +
          "'I'" +
          ",");
      if (showSeq)
        appendPQExpBufferStr(buf,
          "'S'" +
          ",");
      if (showSystem || pattern)
        appendPQExpBufferStr(buf, "'s',"); /* was RELKIND_SPECIAL */
      if (showForeign)
        appendPQExpBufferStr(buf,
          "'f'" +
          ",");

      appendPQExpBufferStr(buf, "''");	/* dummy */
      appendPQExpBufferStr(buf, ")\n");

      if (!showSystem && !pattern)
        appendPQExpBufferStr(buf, "      AND n.nspname <> 'pg_catalog'\n" +
          "      AND n.nspname !~ '^pg_toast'\n" +
          "      AND n.nspname <> 'information_schema'\n");

      if (!validateSQLNamePattern(buf, pattern, true, false,
        "n.nspname", "c.relname", NULL,
        "pg_catalog.pg_table_is_visible(c.oid)",
        NULL, 3)) {

        return false;
      }

      appendPQExpBufferStr(buf, "ORDER BY 1,2;");

      res = await PSQLexec(buf.data);

      if (!res)
        return false;

      /*
       * Most functions in this file are content to print an empty table when
       * there are no matching objects.  We intentionally deviate from that
       * here, but only in !quiet mode, for historical reasons.
       */
      if (PQntuples(res) == 0 && !pset.quiet) {
        if (pattern)
          pg_log_error("Did not find any relation named \"%s\".",
            pattern);
        else
          pg_log_error("Did not find any relations.");
      }
      else {
        myopt.nullPrint = NULL;
        myopt.title = _("List of relations");
        myopt.translate_header = true;
        myopt.translate_columns = translate_columns;
        myopt.n_translate_columns = lengthof(translate_columns);

        printQuery(res, myopt, pset.queryFout, false, pset.logfile);
      }

      return true;
    }

    /*
     * \dP
     * Takes an optional regexp to select particular relations
     *
     * As with \d, you can specify the kinds of relations you want:
     *
     * t for tables
     * i for indexes
     *
     * And there's additional flags:
     *
     * n to list non-leaf partitioned tables
     *
     * and you can mix and match these in any order.
     */
    async function listPartitionedTables(reltypes, pattern, verbose) {
      let showTables = strchr(reltypes, 't') != NULL;
      let showIndexes = strchr(reltypes, 'i') != NULL;
      let showNested = strchr(reltypes, 'n') != NULL;
      let buf = { /* struct */ };
      let title = { /* struct */ };
      let res;
      let myopt = pset.popt;
      let translate_columns = [false, false, false, false, false, false, false, false, false];
      let tabletitle;
      let mixed_output = false;

      /*
       * Note: Declarative table partitioning is only supported as of Pg 10.0.
       */
      if (pset.sversion < 100000) {
        let sverbuf;

        pg_log_error("The server (version %s) does not support declarative table partitioning.",
          formatPGVersionNumber(pset.sversion, false,
            sverbuf, sizeof(sverbuf)));
        return true;
      }

      /* If no relation kind was selected, show them all */
      if (!showTables && !showIndexes)
        showTables = showIndexes = true;

      if (showIndexes && !showTables)
        tabletitle = _("List of partitioned indexes");	/* \dPi */
      else if (showTables && !showIndexes)
        tabletitle = _("List of partitioned tables");	/* \dPt */
      else {
        /* show all kinds */
        tabletitle = _("List of partitioned relations");
        mixed_output = true;
      }

      initPQExpBuffer(buf);

      printfPQExpBuffer(buf,
        "SELECT n.nspname as \"%s\",\n" +
        "  c.relname as \"%s\",\n" +
        "  pg_catalog.pg_get_userbyid(c.relowner) as \"%s\"",
        gettext_noop("Schema"),
        gettext_noop("Name"),
        gettext_noop("Owner"));

      if (mixed_output) {
        appendPQExpBuffer(buf,
          ",\n  CASE c.relkind" +
          " WHEN " +
          "'p'" +
          " THEN '%s'" +
          " WHEN " +
          "'I'" +
          " THEN '%s'" +
          " END as \"%s\"",
          gettext_noop("partitioned table"),
          gettext_noop("partitioned index"),
          gettext_noop("Type"));

        translate_columns[3] = true;
      }

      if (showNested || pattern)
        appendPQExpBuffer(buf,
          ",\n  inh.inhparent::pg_catalog.regclass as \"%s\"",
          gettext_noop("Parent name"));

      if (showIndexes)
        appendPQExpBuffer(buf,
          ",\n c2.oid::pg_catalog.regclass as \"%s\"",
          gettext_noop("Table"));

      if (verbose) {
        if (showNested) {
          appendPQExpBuffer(buf,
            ",\n  s.dps as \"%s\"",
            gettext_noop("Leaf partition size"));
          appendPQExpBuffer(buf,
            ",\n  s.tps as \"%s\"",
            gettext_noop("Total size"));
        }
        else
          /* Sizes of all partitions are considered in this case. */
          appendPQExpBuffer(buf,
            ",\n  s.tps as \"%s\"",
            gettext_noop("Total size"));

        appendPQExpBuffer(buf,
          ",\n  pg_catalog.obj_description(c.oid, 'pg_class') as \"%s\"",
          gettext_noop("Description"));
      }

      appendPQExpBufferStr(buf,
        "\nFROM pg_catalog.pg_class c" +
        "\n     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace");

      if (showIndexes)
        appendPQExpBufferStr(buf,
          "\n     LEFT JOIN pg_catalog.pg_index i ON i.indexrelid = c.oid" +
          "\n     LEFT JOIN pg_catalog.pg_class c2 ON i.indrelid = c2.oid");

      if (showNested || pattern)
        appendPQExpBufferStr(buf,
          "\n     LEFT JOIN pg_catalog.pg_inherits inh ON c.oid = inh.inhrelid");

      if (verbose) {
        if (pset.sversion < 120000) {
          appendPQExpBufferStr(buf,
            ",\n     LATERAL (WITH RECURSIVE d\n" +
            "                AS (SELECT inhrelid AS oid, 1 AS level\n" +
            "                      FROM pg_catalog.pg_inherits\n" +
            "                     WHERE inhparent = c.oid\n" +
            "                    UNION ALL\n" +
            "                    SELECT inhrelid, level + 1\n" +
            "                      FROM pg_catalog.pg_inherits i\n" +
            "                           JOIN d ON i.inhparent = d.oid)\n" +
            "                SELECT pg_catalog.pg_size_pretty(sum(pg_catalog.pg_table_size(" +
            "d.oid))) AS tps,\n" +
            "                       pg_catalog.pg_size_pretty(sum(" +
            "\n             CASE WHEN d.level = 1" +
            " THEN pg_catalog.pg_table_size(d.oid) ELSE 0 END)) AS dps\n" +
            "               FROM d) s");
        }
        else {
          /* PostgreSQL 12 has pg_partition_tree function */
          appendPQExpBufferStr(buf,
            ",\n     LATERAL (SELECT pg_catalog.pg_size_pretty(sum(" +
            "\n                 CASE WHEN ppt.isleaf AND ppt.level = 1" +
            "\n                      THEN pg_catalog.pg_table_size(ppt.relid)" +
            " ELSE 0 END)) AS dps" +
            ",\n                     pg_catalog.pg_size_pretty(sum(" +
            "pg_catalog.pg_table_size(ppt.relid))) AS tps" +
            "\n              FROM pg_catalog.pg_partition_tree(c.oid) ppt) s");
        }
      }

      appendPQExpBufferStr(buf, "\nWHERE c.relkind IN (");
      if (showTables)
        appendPQExpBufferStr(buf,
          "'p'" +
          ",");
      if (showIndexes)
        appendPQExpBufferStr(buf,
          "'I'" +
          ",");
      appendPQExpBufferStr(buf, "''");	/* dummy */
      appendPQExpBufferStr(buf, ")\n");

      appendPQExpBufferStr(buf, !showNested && !pattern ?
        " AND NOT c.relispartition\n" : "");

      if (!pattern)
        appendPQExpBufferStr(buf, "      AND n.nspname <> 'pg_catalog'\n" +
          "      AND n.nspname !~ '^pg_toast'\n" +
          "      AND n.nspname <> 'information_schema'\n");

      if (!validateSQLNamePattern(buf, pattern, true, false,
        "n.nspname", "c.relname", NULL,
        "pg_catalog.pg_table_is_visible(c.oid)",
        NULL, 3)) {

        return false;
      }

      appendPQExpBuffer(buf, "ORDER BY \"Schema\", %s%s\"Name\";",
        mixed_output ? "\"Type\" DESC, " : "",
        showNested || pattern ? "\"Parent name\" NULLS FIRST, " : "");

      res = await PSQLexec(buf.data);

      if (!res)
        return false;

      initPQExpBuffer(title);
      appendPQExpBufferStr(title, tabletitle);

      myopt.nullPrint = NULL;
      myopt.title = title.data;
      myopt.translate_header = true;
      myopt.translate_columns = translate_columns;
      myopt.n_translate_columns = lengthof(translate_columns);

      printQuery(res, myopt, pset.queryFout, false, pset.logfile);


      return true;
    }

    /*
     * \dL
     *
     * Describes languages.
     */
    async function listLanguages(pattern, verbose, showSystem) {
      let buf = { /* struct */ };
      let res;
      let myopt = pset.popt;

      initPQExpBuffer(buf);

      printfPQExpBuffer(buf,
        "SELECT l.lanname AS \"%s\",\n" +
        "       pg_catalog.pg_get_userbyid(l.lanowner) as \"%s\",\n" +
        "       l.lanpltrusted AS \"%s\"",
        gettext_noop("Name"),
        gettext_noop("Owner"),
        gettext_noop("Trusted"));

      if (verbose) {
        appendPQExpBuffer(buf,
          ",\n       NOT l.lanispl AS \"%s\",\n" +
          "       l.lanplcallfoid::pg_catalog.regprocedure AS \"%s\",\n" +
          "       l.lanvalidator::pg_catalog.regprocedure AS \"%s\",\n       " +
          "l.laninline::pg_catalog.regprocedure AS \"%s\",\n       ",
          gettext_noop("Internal language"),
          gettext_noop("Call handler"),
          gettext_noop("Validator"),
          gettext_noop("Inline handler"));
        printACLColumn(buf, "l.lanacl");
      }

      appendPQExpBuffer(buf,
        ",\n       d.description AS \"%s\"" +
        "\nFROM pg_catalog.pg_language l\n" +
        "LEFT JOIN pg_catalog.pg_description d\n" +
        "  ON d.classoid = l.tableoid AND d.objoid = l.oid\n" +
        "  AND d.objsubid = 0\n",
        gettext_noop("Description"));

      if (pattern) {
        if (!validateSQLNamePattern(buf, pattern, false, false,
          NULL, "l.lanname", NULL, NULL,
          NULL, 2)) {

          return false;
        }
      }

      if (!showSystem && !pattern)
        appendPQExpBufferStr(buf, "WHERE l.lanplcallfoid != 0\n");

      appendPQExpBufferStr(buf, "ORDER BY 1;");

      res = await PSQLexec(buf.data);

      if (!res)
        return false;

      myopt.nullPrint = NULL;
      myopt.title = _("List of languages");
      myopt.translate_header = true;

      printQuery(res, myopt, pset.queryFout, false, pset.logfile);

      return true;
    }

    /*
     * \dD
     *
     * Describes domains.
     */
    async function listDomains(pattern, verbose, showSystem) {
      let buf = { /* struct */ };
      let res;
      let myopt = pset.popt;

      initPQExpBuffer(buf);

      printfPQExpBuffer(buf,
        "SELECT n.nspname as \"%s\",\n" +
        "       t.typname as \"%s\",\n" +
        "       pg_catalog.format_type(t.typbasetype, t.typtypmod) as \"%s\",\n" +
        "       (SELECT c.collname FROM pg_catalog.pg_collation c, pg_catalog.pg_type bt\n" +
        "        WHERE c.oid = t.typcollation AND bt.oid = t.typbasetype AND t.typcollation <> bt.typcollation) as \"%s\",\n" +
        "       CASE WHEN t.typnotnull THEN 'not null' END as \"%s\",\n" +
        "       t.typdefault as \"%s\",\n" +
        "       pg_catalog.array_to_string(ARRAY(\n" +
        "         SELECT pg_catalog.pg_get_constraintdef(r.oid, true) FROM pg_catalog.pg_constraint r WHERE t.oid = r.contypid AND r.contype = 'c' ORDER BY r.conname\n" +
        "       ), ' ') as \"%s\"",
        gettext_noop("Schema"),
        gettext_noop("Name"),
        gettext_noop("Type"),
        gettext_noop("Collation"),
        gettext_noop("Nullable"),
        gettext_noop("Default"),
        gettext_noop("Check"));

      if (verbose) {
        appendPQExpBufferStr(buf, ",\n  ");
        printACLColumn(buf, "t.typacl");
        appendPQExpBuffer(buf,
          ",\n       d.description as \"%s\"",
          gettext_noop("Description"));
      }

      appendPQExpBufferStr(buf,
        "\nFROM pg_catalog.pg_type t\n" +
        "     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = t.typnamespace\n");

      if (verbose)
        appendPQExpBufferStr(buf,
          "     LEFT JOIN pg_catalog.pg_description d " +
          "ON d.classoid = t.tableoid AND d.objoid = t.oid " +
          "AND d.objsubid = 0\n");

      appendPQExpBufferStr(buf, "WHERE t.typtype = 'd'\n");

      if (!showSystem && !pattern)
        appendPQExpBufferStr(buf, "      AND n.nspname <> 'pg_catalog'\n" +
          "      AND n.nspname <> 'information_schema'\n");

      if (!validateSQLNamePattern(buf, pattern, true, false,
        "n.nspname", "t.typname", NULL,
        "pg_catalog.pg_type_is_visible(t.oid)",
        NULL, 3)) {

        return false;
      }

      appendPQExpBufferStr(buf, "ORDER BY 1, 2;");

      res = await PSQLexec(buf.data);

      if (!res)
        return false;

      myopt.nullPrint = NULL;
      myopt.title = _("List of domains");
      myopt.translate_header = true;

      printQuery(res, myopt, pset.queryFout, false, pset.logfile);

      return true;
    }

    /*
     * \dc
     *
     * Describes conversions.
     */
    async function listConversions(pattern, verbose, showSystem) {
      let buf = { /* struct */ };
      let res;
      let myopt = pset.popt;
      let translate_columns =
        [false, false, false, false, true, false];

      initPQExpBuffer(buf);

      printfPQExpBuffer(buf,
        "SELECT n.nspname AS \"%s\",\n" +
        "       c.conname AS \"%s\",\n" +
        "       pg_catalog.pg_encoding_to_char(c.conforencoding) AS \"%s\",\n" +
        "       pg_catalog.pg_encoding_to_char(c.contoencoding) AS \"%s\",\n" +
        "       CASE WHEN c.condefault THEN '%s'\n" +
        "       ELSE '%s' END AS \"%s\"",
        gettext_noop("Schema"),
        gettext_noop("Name"),
        gettext_noop("Source"),
        gettext_noop("Destination"),
        gettext_noop("yes"), gettext_noop("no"),
        gettext_noop("Default?"));

      if (verbose)
        appendPQExpBuffer(buf,
          ",\n       d.description AS \"%s\"",
          gettext_noop("Description"));

      appendPQExpBufferStr(buf,
        "\nFROM pg_catalog.pg_conversion c\n" +
        "     JOIN pg_catalog.pg_namespace n " +
        "ON n.oid = c.connamespace\n");

      if (verbose)
        appendPQExpBufferStr(buf,
          "LEFT JOIN pg_catalog.pg_description d " +
          "ON d.classoid = c.tableoid\n" +
          "          AND d.objoid = c.oid " +
          "AND d.objsubid = 0\n");

      appendPQExpBufferStr(buf, "WHERE true\n");

      if (!showSystem && !pattern)
        appendPQExpBufferStr(buf, "  AND n.nspname <> 'pg_catalog'\n" +
          "  AND n.nspname <> 'information_schema'\n");

      if (!validateSQLNamePattern(buf, pattern, true, false,
        "n.nspname", "c.conname", NULL,
        "pg_catalog.pg_conversion_is_visible(c.oid)",
        NULL, 3)) {

        return false;
      }

      appendPQExpBufferStr(buf, "ORDER BY 1, 2;");

      res = await PSQLexec(buf.data);

      if (!res)
        return false;

      myopt.nullPrint = NULL;
      myopt.title = _("List of conversions");
      myopt.translate_header = true;
      myopt.translate_columns = translate_columns;
      myopt.n_translate_columns = lengthof(translate_columns);

      printQuery(res, myopt, pset.queryFout, false, pset.logfile);

      return true;
    }

    /*
     * \dconfig
     *
     * Describes configuration parameters.
     */
    async function describeConfigurationParameters(pattern, verbose, showSystem) {
      let buf = { /* struct */ };
      let res;
      let myopt = pset.popt;

      initPQExpBuffer(buf);
      printfPQExpBuffer(buf,
        "SELECT s.name AS \"%s\", " +
        "pg_catalog.current_setting(s.name) AS \"%s\"",
        gettext_noop("Parameter"),
        gettext_noop("Value"));

      if (verbose) {
        appendPQExpBuffer(buf,
          ", s.vartype AS \"%s\", s.context AS \"%s\", ",
          gettext_noop("Type"),
          gettext_noop("Context"));
        if (pset.sversion >= 150000)
          printACLColumn(buf, "p.paracl");
        else
          appendPQExpBuffer(buf, "NULL AS \"%s\"",
            gettext_noop("Access privileges"));
      }

      appendPQExpBufferStr(buf, "\nFROM pg_catalog.pg_settings s\n");

      if (verbose && pset.sversion >= 150000)
        appendPQExpBufferStr(buf,
          "  LEFT JOIN pg_catalog.pg_parameter_acl p\n" +
          "  ON pg_catalog.lower(s.name) = p.parname\n");

      if (pattern)
        processSQLNamePattern(pset.db, buf, pattern,
          false, false,
          NULL, "pg_catalog.lower(s.name)", NULL,
          NULL, NULL, NULL);
      else
        appendPQExpBufferStr(buf, "WHERE s.source <> 'default' AND\n" +
          "      s.setting IS DISTINCT FROM s.boot_val\n");

      appendPQExpBufferStr(buf, "ORDER BY 1;");

      res = await PSQLexec(buf.data);

      if (!res)
        return false;

      myopt.nullPrint = NULL;
      if (pattern)
        myopt.title = _("List of configuration parameters");
      else
        myopt.title = _("List of non-default configuration parameters");
      myopt.translate_header = true;

      printQuery(res, myopt, pset.queryFout, false, pset.logfile);

      return true;
    }

    /*
     * \dy
     *
     * Describes Event Triggers.
     */
    async function listEventTriggers(pattern, verbose) {
      let buf = { /* struct */ };
      let res;
      let myopt = pset.popt;
      let translate_columns =
        [false, false, false, true, false, false, false];

      if (pset.sversion < 90300) {
        let sverbuf;

        pg_log_error("The server (version %s) does not support event triggers.",
          formatPGVersionNumber(pset.sversion, false,
            sverbuf, sizeof(sverbuf)));
        return true;
      }

      initPQExpBuffer(buf);

      printfPQExpBuffer(buf,
        "SELECT evtname as \"%s\", " +
        "evtevent as \"%s\", " +
        "pg_catalog.pg_get_userbyid(e.evtowner) as \"%s\",\n" +
        " case evtenabled when 'O' then '%s'" +
        "  when 'R' then '%s'" +
        "  when 'A' then '%s'" +
        "  when 'D' then '%s' end as \"%s\",\n" +
        " e.evtfoid::pg_catalog.regproc as \"%s\", " +
        "pg_catalog.array_to_string(array(select x" +
        " from pg_catalog.unnest(evttags) as t(x)), ', ') as \"%s\"",
        gettext_noop("Name"),
        gettext_noop("Event"),
        gettext_noop("Owner"),
        gettext_noop("enabled"),
        gettext_noop("replica"),
        gettext_noop("always"),
        gettext_noop("disabled"),
        gettext_noop("Enabled"),
        gettext_noop("Function"),
        gettext_noop("Tags"));
      if (verbose)
        appendPQExpBuffer(buf,
          ",\npg_catalog.obj_description(e.oid, 'pg_event_trigger') as \"%s\"",
          gettext_noop("Description"));
      appendPQExpBufferStr(buf,
        "\nFROM pg_catalog.pg_event_trigger e ");

      if (!validateSQLNamePattern(buf, pattern, false, false,
        NULL, "evtname", NULL, NULL,
        NULL, 1)) {

        return false;
      }

      appendPQExpBufferStr(buf, "ORDER BY 1");

      res = await PSQLexec(buf.data);

      if (!res)
        return false;

      myopt.nullPrint = NULL;
      myopt.title = _("List of event triggers");
      myopt.translate_header = true;
      myopt.translate_columns = translate_columns;
      myopt.n_translate_columns = lengthof(translate_columns);

      printQuery(res, myopt, pset.queryFout, false, pset.logfile);

      return true;
    }

    /*
     * \dX
     *
     * Describes extended statistics.
     */
    async function listExtendedStats(pattern) {
      let buf = { /* struct */ };
      let res;
      let myopt = pset.popt;

      if (pset.sversion < 100000) {
        let sverbuf;

        pg_log_error("The server (version %s) does not support extended statistics.",
          formatPGVersionNumber(pset.sversion, false,
            sverbuf, sizeof(sverbuf)));
        return true;
      }

      initPQExpBuffer(buf);
      printfPQExpBuffer(buf,
        "SELECT \n" +
        "es.stxnamespace::pg_catalog.regnamespace::pg_catalog.text AS \"%s\", \n" +
        "es.stxname AS \"%s\", \n",
        gettext_noop("Schema"),
        gettext_noop("Name"));

      if (pset.sversion >= 140000)
        appendPQExpBuffer(buf,
          "pg_catalog.format('%%s FROM %%s', \n" +
          "  pg_catalog.pg_get_statisticsobjdef_columns(es.oid), \n" +
          "  es.stxrelid::pg_catalog.regclass) AS \"%s\"",
          gettext_noop("Definition"));
      else
        appendPQExpBuffer(buf,
          "pg_catalog.format('%%s FROM %%s', \n" +
          "  (SELECT pg_catalog.string_agg(pg_catalog.quote_ident(a.attname),', ') \n" +
          "   FROM pg_catalog.unnest(es.stxkeys) s(attnum) \n" +
          "   JOIN pg_catalog.pg_attribute a \n" +
          "   ON (es.stxrelid = a.attrelid \n" +
          "   AND a.attnum = s.attnum \n" +
          "   AND NOT a.attisdropped)), \n" +
          "es.stxrelid::pg_catalog.regclass) AS \"%s\"",
          gettext_noop("Definition"));

      appendPQExpBuffer(buf,
        ",\nCASE WHEN 'd' = any(es.stxkind) THEN 'defined' \n" +
        "END AS \"%s\", \n" +
        "CASE WHEN 'f' = any(es.stxkind) THEN 'defined' \n" +
        "END AS \"%s\"",
        gettext_noop("Ndistinct"),
        gettext_noop("Dependencies"));

      /*
       * Include the MCV statistics kind.
       */
      if (pset.sversion >= 120000) {
        appendPQExpBuffer(buf,
          ",\nCASE WHEN 'm' = any(es.stxkind) THEN 'defined' \n" +
          "END AS \"%s\" ",
          gettext_noop("MCV"));
      }

      appendPQExpBufferStr(buf,
        " \nFROM pg_catalog.pg_statistic_ext es \n");

      if (!validateSQLNamePattern(buf, pattern,
        false, false,
        "es.stxnamespace::pg_catalog.regnamespace::pg_catalog.text", "es.stxname",
        NULL, "pg_catalog.pg_statistics_obj_is_visible(es.oid)",
        NULL, 3)) {

        return false;
      }

      appendPQExpBufferStr(buf, "ORDER BY 1, 2;");

      res = await PSQLexec(buf.data);

      if (!res)
        return false;

      myopt.nullPrint = NULL;
      myopt.title = _("List of extended statistics");
      myopt.translate_header = true;

      printQuery(res, myopt, pset.queryFout, false, pset.logfile);

      return true;
    }

    /*
     * \dC
     *
     * Describes casts.
     */
    async function listCasts(pattern, verbose) {
      let buf = { /* struct */ };
      let res;
      let myopt = pset.popt;
      let translate_columns = [false, false, false, true, false];

      initPQExpBuffer(buf);

      printfPQExpBuffer(buf,
        "SELECT pg_catalog.format_type(castsource, NULL) AS \"%s\",\n" +
        "       pg_catalog.format_type(casttarget, NULL) AS \"%s\",\n",
        gettext_noop("Source type"),
        gettext_noop("Target type"));

      /*
       * We don't attempt to localize '(binary coercible)' or '(with inout)',
       * because there's too much risk of gettext translating a function name
       * that happens to match some string in the PO database.
       */
      appendPQExpBuffer(buf,
        "       CASE WHEN c.castmethod = '%c' THEN '(binary coercible)'\n" +
        "            WHEN c.castmethod = '%c' THEN '(with inout)'\n" +
        "            ELSE p.proname\n" +
        "       END AS \"%s\",\n",
        COERCION_METHOD_BINARY,
        COERCION_METHOD_INOUT,
        gettext_noop("Function"));

      appendPQExpBuffer(buf,
        "       CASE WHEN c.castcontext = '%c' THEN '%s'\n" +
        "            WHEN c.castcontext = '%c' THEN '%s'\n" +
        "            ELSE '%s'\n" +
        "       END AS \"%s\"",
        COERCION_CODE_EXPLICIT,
        gettext_noop("no"),
        COERCION_CODE_ASSIGNMENT,
        gettext_noop("in assignment"),
        gettext_noop("yes"),
        gettext_noop("Implicit?"));

      if (verbose)
        appendPQExpBuffer(buf,
          ",\n       d.description AS \"%s\"",
          gettext_noop("Description"));

      /*
       * We need a left join to pg_proc for binary casts; the others are just
       * paranoia.
       */
      appendPQExpBufferStr(buf,
        "\nFROM pg_catalog.pg_cast c LEFT JOIN pg_catalog.pg_proc p\n" +
        "     ON c.castfunc = p.oid\n" +
        "     LEFT JOIN pg_catalog.pg_type ts\n" +
        "     ON c.castsource = ts.oid\n" +
        "     LEFT JOIN pg_catalog.pg_namespace ns\n" +
        "     ON ns.oid = ts.typnamespace\n" +
        "     LEFT JOIN pg_catalog.pg_type tt\n" +
        "     ON c.casttarget = tt.oid\n" +
        "     LEFT JOIN pg_catalog.pg_namespace nt\n" +
        "     ON nt.oid = tt.typnamespace\n");

      if (verbose)
        appendPQExpBufferStr(buf,
          "     LEFT JOIN pg_catalog.pg_description d\n" +
          "     ON d.classoid = c.tableoid AND d.objoid = " +
          "c.oid AND d.objsubid = 0\n");

      appendPQExpBufferStr(buf, "WHERE ( (true");

      /*
       * Match name pattern against either internal or external name of either
       * castsource or casttarget
       */
      if (!validateSQLNamePattern(buf, pattern, true, false,
        "ns.nspname", "ts.typname",
        "pg_catalog.format_type(ts.oid, NULL)",
        "pg_catalog.pg_type_is_visible(ts.oid)",
        NULL, 3))
        return false;

      appendPQExpBufferStr(buf, ") OR (true");

      if (!validateSQLNamePattern(buf, pattern, true, false,
        "nt.nspname", "tt.typname",
        "pg_catalog.format_type(tt.oid, NULL)",
        "pg_catalog.pg_type_is_visible(tt.oid)",
        NULL, 3))
        return false;

      appendPQExpBufferStr(buf, ") )\nORDER BY 1, 2;");

      res = await PSQLexec(buf.data);

      if (!res)
        return false;

      myopt.nullPrint = NULL;
      myopt.title = _("List of casts");
      myopt.translate_header = true;
      myopt.translate_columns = translate_columns;
      myopt.n_translate_columns = lengthof(translate_columns);

      printQuery(res, myopt, pset.queryFout, false, pset.logfile);

      return true;
    }

    /*
     * \dO
     *
     * Describes collations.
     */
    async function listCollations(pattern, verbose, showSystem) {
      let buf = { /* struct */ };
      let res;
      let myopt = pset.popt;
      let translate_columns = [false, false, false, false, false, false, false, true, false];

      initPQExpBuffer(buf);

      printfPQExpBuffer(buf,
        "SELECT\n" +
        "  n.nspname AS \"%s\",\n" +
        "  c.collname AS \"%s\",\n",
        gettext_noop("Schema"),
        gettext_noop("Name"));

      if (pset.sversion >= 100000)
        appendPQExpBuffer(buf,
          "  CASE c.collprovider WHEN 'd' THEN 'default' WHEN 'b' THEN 'builtin' WHEN 'c' THEN 'libc' WHEN 'i' THEN 'icu' END AS \"%s\",\n",
          gettext_noop("Provider"));
      else
        appendPQExpBuffer(buf,
          "  'libc' AS \"%s\",\n",
          gettext_noop("Provider"));

      appendPQExpBuffer(buf,
        "  c.collcollate AS \"%s\",\n" +
        "  c.collctype AS \"%s\",\n",
        gettext_noop("Collate"),
        gettext_noop("Ctype"));

      if (pset.sversion >= 170000)
        appendPQExpBuffer(buf,
          "  c.colllocale AS \"%s\",\n",
          gettext_noop("Locale"));
      else if (pset.sversion >= 150000)
        appendPQExpBuffer(buf,
          "  c.colliculocale AS \"%s\",\n",
          gettext_noop("Locale"));
      else
        appendPQExpBuffer(buf,
          "  c.collcollate AS \"%s\",\n",
          gettext_noop("Locale"));

      if (pset.sversion >= 160000)
        appendPQExpBuffer(buf,
          "  c.collicurules AS \"%s\",\n",
          gettext_noop("ICU Rules"));
      else
        appendPQExpBuffer(buf,
          "  NULL AS \"%s\",\n",
          gettext_noop("ICU Rules"));

      if (pset.sversion >= 120000)
        appendPQExpBuffer(buf,
          "  CASE WHEN c.collisdeterministic THEN '%s' ELSE '%s' END AS \"%s\"",
          gettext_noop("yes"), gettext_noop("no"),
          gettext_noop("Deterministic?"));
      else
        appendPQExpBuffer(buf,
          "  '%s' AS \"%s\"",
          gettext_noop("yes"),
          gettext_noop("Deterministic?"));

      if (verbose)
        appendPQExpBuffer(buf,
          ",\n  pg_catalog.obj_description(c.oid, 'pg_collation') AS \"%s\"",
          gettext_noop("Description"));

      appendPQExpBufferStr(buf,
        "\nFROM pg_catalog.pg_collation c, pg_catalog.pg_namespace n\n" +
        "WHERE n.oid = c.collnamespace\n");

      if (!showSystem && !pattern)
        appendPQExpBufferStr(buf, "      AND n.nspname <> 'pg_catalog'\n" +
          "      AND n.nspname <> 'information_schema'\n");

      /*
       * Hide collations that aren't usable in the current database's encoding.
       * If you think to change this, note that pg_collation_is_visible rejects
       * unusable collations, so you will need to hack name pattern processing
       * somehow to avoid inconsistent behavior.
       */
      appendPQExpBufferStr(buf, "      AND c.collencoding IN (-1, pg_catalog.pg_char_to_encoding(pg_catalog.getdatabaseencoding()))\n");

      if (!validateSQLNamePattern(buf, pattern, true, false,
        "n.nspname", "c.collname", NULL,
        "pg_catalog.pg_collation_is_visible(c.oid)",
        NULL, 3)) {

        return false;
      }

      appendPQExpBufferStr(buf, "ORDER BY 1, 2;");

      res = await PSQLexec(buf.data);

      if (!res)
        return false;

      myopt.nullPrint = NULL;
      myopt.title = _("List of collations");
      myopt.translate_header = true;
      myopt.translate_columns = translate_columns;
      myopt.n_translate_columns = lengthof(translate_columns);

      printQuery(res, myopt, pset.queryFout, false, pset.logfile);

      return true;
    }

    /*
     * \dn
     *
     * Describes schemas (namespaces)
     */
    async function listSchemas(pattern, verbose, showSystem) {
      let buf = { /* struct */ };
      let res;
      let myopt = pset.popt;
      let pub_schema_tuples = 0;
      let footers = NULL;

      initPQExpBuffer(buf);
      printfPQExpBuffer(buf,
        "SELECT n.nspname AS \"%s\",\n" +
        "  pg_catalog.pg_get_userbyid(n.nspowner) AS \"%s\"",
        gettext_noop("Name"),
        gettext_noop("Owner"));

      if (verbose) {
        appendPQExpBufferStr(buf, ",\n  ");
        printACLColumn(buf, "n.nspacl");
        appendPQExpBuffer(buf,
          ",\n  pg_catalog.obj_description(n.oid, 'pg_namespace') AS \"%s\"",
          gettext_noop("Description"));
      }

      appendPQExpBufferStr(buf,
        "\nFROM pg_catalog.pg_namespace n\n");

      if (!showSystem && !pattern)
        appendPQExpBufferStr(buf,
          "WHERE n.nspname !~ '^pg_' AND n.nspname <> 'information_schema'\n");

      if (!validateSQLNamePattern(buf, pattern,
        !showSystem && !pattern, false,
        NULL, "n.nspname", NULL,
        NULL,
        NULL, 2))
        return false;

      appendPQExpBufferStr(buf, "ORDER BY 1;");

      res = await PSQLexec(buf.data);
      if (!res)
        return false;

      myopt.nullPrint = NULL;
      myopt.title = _("List of schemas");
      myopt.translate_header = true;

      if (pattern && pset.sversion >= 150000) {
        let result;
        let i;

        printfPQExpBuffer(buf,
          "SELECT pubname \n" +
          "FROM pg_catalog.pg_publication p\n" +
          "     JOIN pg_catalog.pg_publication_namespace pn ON p.oid = pn.pnpubid\n" +
          "     JOIN pg_catalog.pg_namespace n ON n.oid = pn.pnnspid \n" +
          "WHERE n.nspname = '%s'\n" +
          "ORDER BY 1",
          pattern);
        result = await PSQLexec(buf.data);
        if (!result)
          return false;
        else
          pub_schema_tuples = PQntuples(result);

        if (pub_schema_tuples > 0) {
          /*
           * Allocate memory for footers. Size of footers will be 1 (for
           * storing "Publications:" string) + publication schema mapping
           * count +  1 (for storing NULL).
           */
          footers = [];
          footers[0] = pg_strdup(_("Publications:"));

          /* Might be an empty set - that's ok */
          for (i = 0; i < pub_schema_tuples; i++) {
            printfPQExpBuffer(buf, "    \"%s\"",
              PQgetvalue(result, i, 0));

            footers[i + 1] = pg_strdup(buf.data);
          }

          footers[i + 1] = NULL;
          myopt.footers = footers;
        }

      }

      printQuery(res, myopt, pset.queryFout, false, pset.logfile);

      return true;
    }

    /*
     * \dFp
     * list text search parsers
     */
    async function listTSParsers(pattern, verbose) {
      let buf = { /* struct */ };
      let res;
      let myopt = pset.popt;

      if (verbose)
        return await listTSParsersVerbose(pattern);

      initPQExpBuffer(buf);

      printfPQExpBuffer(buf,
        "SELECT\n" +
        "  n.nspname as \"%s\",\n" +
        "  p.prsname as \"%s\",\n" +
        "  pg_catalog.obj_description(p.oid, 'pg_ts_parser') as \"%s\"\n" +
        "FROM pg_catalog.pg_ts_parser p\n" +
        "LEFT JOIN pg_catalog.pg_namespace n ON n.oid = p.prsnamespace\n",
        gettext_noop("Schema"),
        gettext_noop("Name"),
        gettext_noop("Description")
      );

      if (!validateSQLNamePattern(buf, pattern, false, false,
        "n.nspname", "p.prsname", NULL,
        "pg_catalog.pg_ts_parser_is_visible(p.oid)",
        NULL, 3)) {

        return false;
      }

      appendPQExpBufferStr(buf, "ORDER BY 1, 2;");

      res = await PSQLexec(buf.data);

      if (!res)
        return false;

      myopt.nullPrint = NULL;
      myopt.title = _("List of text search parsers");
      myopt.translate_header = true;

      printQuery(res, myopt, pset.queryFout, false, pset.logfile);

      return true;
    }

    /*
     * full description of parsers
     */
    async function listTSParsersVerbose(pattern) {
      let buf = { /* struct */ };
      let res;
      let i;

      initPQExpBuffer(buf);

      printfPQExpBuffer(buf,
        "SELECT p.oid,\n" +
        "  n.nspname,\n" +
        "  p.prsname\n" +
        "FROM pg_catalog.pg_ts_parser p\n" +
        "LEFT JOIN pg_catalog.pg_namespace n ON n.oid = p.prsnamespace\n"
      );

      if (!validateSQLNamePattern(buf, pattern, false, false,
        "n.nspname", "p.prsname", NULL,
        "pg_catalog.pg_ts_parser_is_visible(p.oid)",
        NULL, 3)) {

        return false;
      }

      appendPQExpBufferStr(buf, "ORDER BY 1, 2;");

      res = await PSQLexec(buf.data);

      if (!res)
        return false;

      if (PQntuples(res) == 0) {
        if (!pset.quiet) {
          if (pattern)
            pg_log_error("Did not find any text search parser named \"%s\".",
              pattern);
          else
            pg_log_error("Did not find any text search parsers.");
        }
        return false;
      }

      for (i = 0; i < PQntuples(res); i++) {
        let oid;
        let nspname = NULL;
        let prsname;

        oid = PQgetvalue(res, i, 0);
        if (!PQgetisnull(res, i, 1))
          nspname = PQgetvalue(res, i, 1);
        prsname = PQgetvalue(res, i, 2);

        if (!await describeOneTSParser(oid, nspname, prsname)) {
          return false;
        }

        if (cancel_pressed) {
          return false;
        }
      }

      return true;
    }

    async function describeOneTSParser(oid, nspname, prsname) {
      let buf = { /* struct */ };
      let res;
      let title = { /* struct */ };
      let myopt = pset.popt;
      let translate_columns = [true, false, false];

      initPQExpBuffer(buf);

      printfPQExpBuffer(buf,
        "SELECT '%s' AS \"%s\",\n" +
        "   p.prsstart::pg_catalog.regproc AS \"%s\",\n" +
        "   pg_catalog.obj_description(p.prsstart, 'pg_proc') as \"%s\"\n" +
        " FROM pg_catalog.pg_ts_parser p\n" +
        " WHERE p.oid = '%s'\n" +
        "UNION ALL\n" +
        "SELECT '%s',\n" +
        "   p.prstoken::pg_catalog.regproc,\n" +
        "   pg_catalog.obj_description(p.prstoken, 'pg_proc')\n" +
        " FROM pg_catalog.pg_ts_parser p\n" +
        " WHERE p.oid = '%s'\n" +
        "UNION ALL\n" +
        "SELECT '%s',\n" +
        "   p.prsend::pg_catalog.regproc,\n" +
        "   pg_catalog.obj_description(p.prsend, 'pg_proc')\n" +
        " FROM pg_catalog.pg_ts_parser p\n" +
        " WHERE p.oid = '%s'\n" +
        "UNION ALL\n" +
        "SELECT '%s',\n" +
        "   p.prsheadline::pg_catalog.regproc,\n" +
        "   pg_catalog.obj_description(p.prsheadline, 'pg_proc')\n" +
        " FROM pg_catalog.pg_ts_parser p\n" +
        " WHERE p.oid = '%s'\n" +
        "UNION ALL\n" +
        "SELECT '%s',\n" +
        "   p.prslextype::pg_catalog.regproc,\n" +
        "   pg_catalog.obj_description(p.prslextype, 'pg_proc')\n" +
        " FROM pg_catalog.pg_ts_parser p\n" +
        " WHERE p.oid = '%s';",
        gettext_noop("Start parse"),
        gettext_noop("Method"),
        gettext_noop("Function"),
        gettext_noop("Description"),
        oid,
        gettext_noop("Get next token"),
        oid,
        gettext_noop("End parse"),
        oid,
        gettext_noop("Get headline"),
        oid,
        gettext_noop("Get token types"),
        oid);

      res = await PSQLexec(buf.data);

      if (!res)
        return false;

      myopt.nullPrint = NULL;
      initPQExpBuffer(title);
      if (nspname)
        printfPQExpBuffer(title, _("Text search parser \"%s.%s\""),
          nspname, prsname);
      else
        printfPQExpBuffer(title, _("Text search parser \"%s\""), prsname);
      myopt.title = title.data;
      myopt.footers = NULL;
      myopt.topt.default_footer = false;
      myopt.translate_header = true;
      myopt.translate_columns = translate_columns;
      myopt.n_translate_columns = lengthof(translate_columns);

      printQuery(res, myopt, pset.queryFout, false, pset.logfile);

      initPQExpBuffer(buf);

      printfPQExpBuffer(buf,
        "SELECT t.alias as \"%s\",\n" +
        "  t.description as \"%s\"\n" +
        "FROM pg_catalog.ts_token_type( '%s'::pg_catalog.oid ) as t\n" +
        "ORDER BY 1;",
        gettext_noop("Token name"),
        gettext_noop("Description"),
        oid);

      res = await PSQLexec(buf.data);

      if (!res) {

        return false;
      }

      myopt.nullPrint = NULL;
      if (nspname)
        printfPQExpBuffer(title, _("Token types for parser \"%s.%s\""),
          nspname, prsname);
      else
        printfPQExpBuffer(title, _("Token types for parser \"%s\""), prsname);
      myopt.title = title.data;
      myopt.footers = NULL;
      myopt.topt.default_footer = true;
      myopt.translate_header = true;
      myopt.translate_columns = NULL;
      myopt.n_translate_columns = 0;

      printQuery(res, myopt, pset.queryFout, false, pset.logfile);

      return true;
    }

    /*
     * \dFd
     * list text search dictionaries
     */
    async function listTSDictionaries(pattern, verbose) {
      let buf = { /* struct */ };
      let res;
      let myopt = pset.popt;

      initPQExpBuffer(buf);

      printfPQExpBuffer(buf,
        "SELECT\n" +
        "  n.nspname as \"%s\",\n" +
        "  d.dictname as \"%s\",\n",
        gettext_noop("Schema"),
        gettext_noop("Name"));

      if (verbose) {
        appendPQExpBuffer(buf,
          "  ( SELECT COALESCE(nt.nspname, '(null)')::pg_catalog.text || '.' || t.tmplname FROM\n" +
          "    pg_catalog.pg_ts_template t\n" +
          "    LEFT JOIN pg_catalog.pg_namespace nt ON nt.oid = t.tmplnamespace\n" +
          "    WHERE d.dicttemplate = t.oid ) AS  \"%s\",\n" +
          "  d.dictinitoption as \"%s\",\n",
          gettext_noop("Template"),
          gettext_noop("Init options"));
      }

      appendPQExpBuffer(buf,
        "  pg_catalog.obj_description(d.oid, 'pg_ts_dict') as \"%s\"\n",
        gettext_noop("Description"));

      appendPQExpBufferStr(buf, "FROM pg_catalog.pg_ts_dict d\n" +
        "LEFT JOIN pg_catalog.pg_namespace n ON n.oid = d.dictnamespace\n");

      if (!validateSQLNamePattern(buf, pattern, false, false,
        "n.nspname", "d.dictname", NULL,
        "pg_catalog.pg_ts_dict_is_visible(d.oid)",
        NULL, 3)) {

        return false;
      }

      appendPQExpBufferStr(buf, "ORDER BY 1, 2;");

      res = await PSQLexec(buf.data);

      if (!res)
        return false;

      myopt.nullPrint = NULL;
      myopt.title = _("List of text search dictionaries");
      myopt.translate_header = true;

      printQuery(res, myopt, pset.queryFout, false, pset.logfile);

      return true;
    }

    /*
     * \dFt
     * list text search templates
     */
    async function listTSTemplates(pattern, verbose) {
      let buf = { /* struct */ };
      let res;
      let myopt = pset.popt;

      initPQExpBuffer(buf);

      if (verbose)
        printfPQExpBuffer(buf,
          "SELECT\n" +
          "  n.nspname AS \"%s\",\n" +
          "  t.tmplname AS \"%s\",\n" +
          "  t.tmplinit::pg_catalog.regproc AS \"%s\",\n" +
          "  t.tmpllexize::pg_catalog.regproc AS \"%s\",\n" +
          "  pg_catalog.obj_description(t.oid, 'pg_ts_template') AS \"%s\"\n",
          gettext_noop("Schema"),
          gettext_noop("Name"),
          gettext_noop("Init"),
          gettext_noop("Lexize"),
          gettext_noop("Description"));
      else
        printfPQExpBuffer(buf,
          "SELECT\n" +
          "  n.nspname AS \"%s\",\n" +
          "  t.tmplname AS \"%s\",\n" +
          "  pg_catalog.obj_description(t.oid, 'pg_ts_template') AS \"%s\"\n",
          gettext_noop("Schema"),
          gettext_noop("Name"),
          gettext_noop("Description"));

      appendPQExpBufferStr(buf, "FROM pg_catalog.pg_ts_template t\n" +
        "LEFT JOIN pg_catalog.pg_namespace n ON n.oid = t.tmplnamespace\n");

      if (!validateSQLNamePattern(buf, pattern, false, false,
        "n.nspname", "t.tmplname", NULL,
        "pg_catalog.pg_ts_template_is_visible(t.oid)",
        NULL, 3)) {

        return false;
      }

      appendPQExpBufferStr(buf, "ORDER BY 1, 2;");

      res = await PSQLexec(buf.data);

      if (!res)
        return false;

      myopt.nullPrint = NULL;
      myopt.title = _("List of text search templates");
      myopt.translate_header = true;

      printQuery(res, myopt, pset.queryFout, false, pset.logfile);

      return true;
    }

    /*
     * \dF
     * list text search configurations
     */
    async function listTSConfigs(pattern, verbose) {
      let buf = { /* struct */ };
      let res;
      let myopt = pset.popt;

      if (verbose)
        return await listTSConfigsVerbose(pattern);

      initPQExpBuffer(buf);

      printfPQExpBuffer(buf,
        "SELECT\n" +
        "   n.nspname as \"%s\",\n" +
        "   c.cfgname as \"%s\",\n" +
        "   pg_catalog.obj_description(c.oid, 'pg_ts_config') as \"%s\"\n" +
        "FROM pg_catalog.pg_ts_config c\n" +
        "LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.cfgnamespace\n",
        gettext_noop("Schema"),
        gettext_noop("Name"),
        gettext_noop("Description")
      );

      if (!validateSQLNamePattern(buf, pattern, false, false,
        "n.nspname", "c.cfgname", NULL,
        "pg_catalog.pg_ts_config_is_visible(c.oid)",
        NULL, 3)) {

        return false;
      }

      appendPQExpBufferStr(buf, "ORDER BY 1, 2;");

      res = await PSQLexec(buf.data);

      if (!res)
        return false;

      myopt.nullPrint = NULL;
      myopt.title = _("List of text search configurations");
      myopt.translate_header = true;

      printQuery(res, myopt, pset.queryFout, false, pset.logfile);

      return true;
    }

    async function listTSConfigsVerbose(pattern) {
      let buf = { /* struct */ };
      let res;
      let i;

      initPQExpBuffer(buf);

      printfPQExpBuffer(buf,
        "SELECT c.oid, c.cfgname,\n" +
        "   n.nspname,\n" +
        "   p.prsname,\n" +
        "   np.nspname as pnspname\n" +
        "FROM pg_catalog.pg_ts_config c\n" +
        "   LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.cfgnamespace,\n" +
        " pg_catalog.pg_ts_parser p\n" +
        "   LEFT JOIN pg_catalog.pg_namespace np ON np.oid = p.prsnamespace\n" +
        "WHERE  p.oid = c.cfgparser\n"
      );

      if (!validateSQLNamePattern(buf, pattern, true, false,
        "n.nspname", "c.cfgname", NULL,
        "pg_catalog.pg_ts_config_is_visible(c.oid)",
        NULL, 3)) {

        return false;
      }

      appendPQExpBufferStr(buf, "ORDER BY 3, 2;");

      res = await PSQLexec(buf.data);

      if (!res)
        return false;

      if (PQntuples(res) == 0) {
        if (!pset.quiet) {
          if (pattern)
            pg_log_error("Did not find any text search configuration named \"%s\".",
              pattern);
          else
            pg_log_error("Did not find any text search configurations.");
        }
        return false;
      }

      for (i = 0; i < PQntuples(res); i++) {
        let oid;
        let cfgname;
        let nspname = NULL;
        let prsname;
        let pnspname = NULL;

        oid = PQgetvalue(res, i, 0);
        cfgname = PQgetvalue(res, i, 1);
        if (!PQgetisnull(res, i, 2))
          nspname = PQgetvalue(res, i, 2);
        prsname = PQgetvalue(res, i, 3);
        if (!PQgetisnull(res, i, 4))
          pnspname = PQgetvalue(res, i, 4);

        if (!await describeOneTSConfig(oid, nspname, cfgname, pnspname, prsname)) {
          return false;
        }

        if (cancel_pressed) {
          return false;
        }
      }

      return true;
    }

    async function describeOneTSConfig(oid, nspname, cfgname, pnspname, prsname) {
      let buf = { /* struct */ }, title = { /* struct */ };
      let res;
      let myopt = pset.popt;

      initPQExpBuffer(buf);

      printfPQExpBuffer(buf,
        "SELECT\n" +
        "  ( SELECT t.alias FROM\n" +
        "    pg_catalog.ts_token_type(c.cfgparser) AS t\n" +
        "    WHERE t.tokid = m.maptokentype ) AS \"%s\",\n" +
        "  pg_catalog.btrim(\n" +
        "    ARRAY( SELECT mm.mapdict::pg_catalog.regdictionary\n" +
        "           FROM pg_catalog.pg_ts_config_map AS mm\n" +
        "           WHERE mm.mapcfg = m.mapcfg AND mm.maptokentype = m.maptokentype\n" +
        "           ORDER BY mapcfg, maptokentype, mapseqno\n" +
        "    ) :: pg_catalog.text,\n" +
        "  '{}') AS \"%s\"\n" +
        "FROM pg_catalog.pg_ts_config AS c, pg_catalog.pg_ts_config_map AS m\n" +
        "WHERE c.oid = '%s' AND m.mapcfg = c.oid\n" +
        "GROUP BY m.mapcfg, m.maptokentype, c.cfgparser\n" +
        "ORDER BY 1;",
        gettext_noop("Token"),
        gettext_noop("Dictionaries"),
        oid);

      res = await PSQLexec(buf.data);

      if (!res)
        return false;

      initPQExpBuffer(title);

      if (nspname)
        appendPQExpBuffer(title, _("Text search configuration \"%s.%s\""),
          nspname, cfgname);
      else
        appendPQExpBuffer(title, _("Text search configuration \"%s\""),
          cfgname);

      if (pnspname)
        appendPQExpBuffer(title, _("\nParser: \"%s.%s\""),
          pnspname, prsname);
      else
        appendPQExpBuffer(title, _("\nParser: \"%s\""),
          prsname);

      myopt.nullPrint = NULL;
      myopt.title = title.data;
      myopt.footers = NULL;
      myopt.topt.default_footer = false;
      myopt.translate_header = true;

      printQuery(res, myopt, pset.queryFout, false, pset.logfile);


      return true;
    }

    /*
     * \dew
     *
     * Describes foreign-data wrappers
     */
    async function listForeignDataWrappers(pattern, verbose) {
      let buf = { /* struct */ };
      let res;
      let myopt = pset.popt;

      initPQExpBuffer(buf);
      printfPQExpBuffer(buf,
        "SELECT fdw.fdwname AS \"%s\",\n" +
        "  pg_catalog.pg_get_userbyid(fdw.fdwowner) AS \"%s\",\n" +
        "  fdw.fdwhandler::pg_catalog.regproc AS \"%s\",\n" +
        "  fdw.fdwvalidator::pg_catalog.regproc AS \"%s\"",
        gettext_noop("Name"),
        gettext_noop("Owner"),
        gettext_noop("Handler"),
        gettext_noop("Validator"));

      if (verbose) {
        appendPQExpBufferStr(buf, ",\n  ");
        printACLColumn(buf, "fdwacl");
        appendPQExpBuffer(buf,
          ",\n CASE WHEN fdwoptions IS NULL THEN '' ELSE " +
          "  '(' || pg_catalog.array_to_string(ARRAY(SELECT " +
          "  pg_catalog.quote_ident(option_name) ||  ' ' || " +
          "  pg_catalog.quote_literal(option_value)  FROM " +
          "  pg_catalog.pg_options_to_table(fdwoptions)),  ', ') || ')' " +
          "  END AS \"%s\"" +
          ",\n  d.description AS \"%s\" ",
          gettext_noop("FDW options"),
          gettext_noop("Description"));
      }

      appendPQExpBufferStr(buf, "\nFROM pg_catalog.pg_foreign_data_wrapper fdw\n");

      if (verbose)
        appendPQExpBufferStr(buf,
          "LEFT JOIN pg_catalog.pg_description d\n" +
          "       ON d.classoid = fdw.tableoid " +
          "AND d.objoid = fdw.oid AND d.objsubid = 0\n");

      if (!validateSQLNamePattern(buf, pattern, false, false,
        NULL, "fdwname", NULL, NULL,
        NULL, 1)) {

        return false;
      }

      appendPQExpBufferStr(buf, "ORDER BY 1;");

      res = await PSQLexec(buf.data);

      if (!res)
        return false;

      myopt.nullPrint = NULL;
      myopt.title = _("List of foreign-data wrappers");
      myopt.translate_header = true;

      printQuery(res, myopt, pset.queryFout, false, pset.logfile);

      return true;
    }

    /*
     * \des
     *
     * Describes foreign servers.
     */
    async function listForeignServers(pattern, verbose) {
      let buf = { /* struct */ };
      let res;
      let myopt = pset.popt;

      initPQExpBuffer(buf);
      printfPQExpBuffer(buf,
        "SELECT s.srvname AS \"%s\",\n" +
        "  pg_catalog.pg_get_userbyid(s.srvowner) AS \"%s\",\n" +
        "  f.fdwname AS \"%s\"",
        gettext_noop("Name"),
        gettext_noop("Owner"),
        gettext_noop("Foreign-data wrapper"));

      if (verbose) {
        appendPQExpBufferStr(buf, ",\n  ");
        printACLColumn(buf, "s.srvacl");
        appendPQExpBuffer(buf,
          ",\n" +
          "  s.srvtype AS \"%s\",\n" +
          "  s.srvversion AS \"%s\",\n" +
          "  CASE WHEN srvoptions IS NULL THEN '' ELSE " +
          "  '(' || pg_catalog.array_to_string(ARRAY(SELECT " +
          "  pg_catalog.quote_ident(option_name) ||  ' ' || " +
          "  pg_catalog.quote_literal(option_value)  FROM " +
          "  pg_catalog.pg_options_to_table(srvoptions)),  ', ') || ')' " +
          "  END AS \"%s\",\n" +
          "  d.description AS \"%s\"",
          gettext_noop("Type"),
          gettext_noop("Version"),
          gettext_noop("FDW options"),
          gettext_noop("Description"));
      }

      appendPQExpBufferStr(buf,
        "\nFROM pg_catalog.pg_foreign_server s\n" +
        "     JOIN pg_catalog.pg_foreign_data_wrapper f ON f.oid=s.srvfdw\n");

      if (verbose)
        appendPQExpBufferStr(buf,
          "LEFT JOIN pg_catalog.pg_description d\n       " +
          "ON d.classoid = s.tableoid AND d.objoid = s.oid " +
          "AND d.objsubid = 0\n");

      if (!validateSQLNamePattern(buf, pattern, false, false,
        NULL, "s.srvname", NULL, NULL,
        NULL, 1)) {

        return false;
      }

      appendPQExpBufferStr(buf, "ORDER BY 1;");

      res = await PSQLexec(buf.data);

      if (!res)
        return false;

      myopt.nullPrint = NULL;
      myopt.title = _("List of foreign servers");
      myopt.translate_header = true;

      printQuery(res, myopt, pset.queryFout, false, pset.logfile);

      return true;
    }

    /*
     * \deu
     *
     * Describes user mappings.
     */
    async function listUserMappings(pattern, verbose) {
      let buf = { /* struct */ };
      let res;
      let myopt = pset.popt;

      initPQExpBuffer(buf);
      printfPQExpBuffer(buf,
        "SELECT um.srvname AS \"%s\",\n" +
        "  um.usename AS \"%s\"",
        gettext_noop("Server"),
        gettext_noop("User name"));

      if (verbose)
        appendPQExpBuffer(buf,
          ",\n CASE WHEN umoptions IS NULL THEN '' ELSE " +
          "  '(' || pg_catalog.array_to_string(ARRAY(SELECT " +
          "  pg_catalog.quote_ident(option_name) ||  ' ' || " +
          "  pg_catalog.quote_literal(option_value)  FROM " +
          "  pg_catalog.pg_options_to_table(umoptions)),  ', ') || ')' " +
          "  END AS \"%s\"",
          gettext_noop("FDW options"));

      appendPQExpBufferStr(buf, "\nFROM pg_catalog.pg_user_mappings um\n");

      if (!validateSQLNamePattern(buf, pattern, false, false,
        NULL, "um.srvname", "um.usename", NULL,
        NULL, 1)) {

        return false;
      }

      appendPQExpBufferStr(buf, "ORDER BY 1, 2;");

      res = await PSQLexec(buf.data);

      if (!res)
        return false;

      myopt.nullPrint = NULL;
      myopt.title = _("List of user mappings");
      myopt.translate_header = true;

      printQuery(res, myopt, pset.queryFout, false, pset.logfile);

      return true;
    }

    /*
     * \det
     *
     * Describes foreign tables.
     */
    async function listForeignTables(pattern, verbose) {
      let buf = { /* struct */ };
      let res;
      let myopt = pset.popt;

      initPQExpBuffer(buf);
      printfPQExpBuffer(buf,
        "SELECT n.nspname AS \"%s\",\n" +
        "  c.relname AS \"%s\",\n" +
        "  s.srvname AS \"%s\"",
        gettext_noop("Schema"),
        gettext_noop("Table"),
        gettext_noop("Server"));

      if (verbose)
        appendPQExpBuffer(buf,
          ",\n CASE WHEN ftoptions IS NULL THEN '' ELSE " +
          "  '(' || pg_catalog.array_to_string(ARRAY(SELECT " +
          "  pg_catalog.quote_ident(option_name) ||  ' ' || " +
          "  pg_catalog.quote_literal(option_value)  FROM " +
          "  pg_catalog.pg_options_to_table(ftoptions)),  ', ') || ')' " +
          "  END AS \"%s\",\n" +
          "  d.description AS \"%s\"",
          gettext_noop("FDW options"),
          gettext_noop("Description"));

      appendPQExpBufferStr(buf,
        "\nFROM pg_catalog.pg_foreign_table ft\n" +
        "  INNER JOIN pg_catalog.pg_class c" +
        " ON c.oid = ft.ftrelid\n" +
        "  INNER JOIN pg_catalog.pg_namespace n" +
        " ON n.oid = c.relnamespace\n" +
        "  INNER JOIN pg_catalog.pg_foreign_server s" +
        " ON s.oid = ft.ftserver\n");
      if (verbose)
        appendPQExpBufferStr(buf,
          "   LEFT JOIN pg_catalog.pg_description d\n" +
          "          ON d.classoid = c.tableoid AND " +
          "d.objoid = c.oid AND d.objsubid = 0\n");

      if (!validateSQLNamePattern(buf, pattern, false, false,
        "n.nspname", "c.relname", NULL,
        "pg_catalog.pg_table_is_visible(c.oid)",
        NULL, 3)) {

        return false;
      }

      appendPQExpBufferStr(buf, "ORDER BY 1, 2;");

      res = await PSQLexec(buf.data);

      if (!res)
        return false;

      myopt.nullPrint = NULL;
      myopt.title = _("List of foreign tables");
      myopt.translate_header = true;

      printQuery(res, myopt, pset.queryFout, false, pset.logfile);

      return true;
    }

    /*
     * \dx
     *
     * Briefly describes installed extensions.
     */
    async function listExtensions(pattern) {
      let buf = { /* struct */ };
      let res;
      let myopt = pset.popt;

      initPQExpBuffer(buf);
      printfPQExpBuffer(buf,
        "SELECT e.extname AS \"%s\", " +
        "e.extversion AS \"%s\", n.nspname AS \"%s\", c.description AS \"%s\"\n" +
        "FROM pg_catalog.pg_extension e " +
        "LEFT JOIN pg_catalog.pg_namespace n ON n.oid = e.extnamespace " +
        "LEFT JOIN pg_catalog.pg_description c ON c.objoid = e.oid " +
        "AND c.classoid = 'pg_catalog.pg_extension'::pg_catalog.regclass\n",
        gettext_noop("Name"),
        gettext_noop("Version"),
        gettext_noop("Schema"),
        gettext_noop("Description"));

      if (!validateSQLNamePattern(buf, pattern,
        false, false,
        NULL, "e.extname", NULL,
        NULL,
        NULL, 1)) {

        return false;
      }

      appendPQExpBufferStr(buf, "ORDER BY 1;");

      res = await PSQLexec(buf.data);

      if (!res)
        return false;

      myopt.nullPrint = NULL;
      myopt.title = _("List of installed extensions");
      myopt.translate_header = true;

      printQuery(res, myopt, pset.queryFout, false, pset.logfile);

      return true;
    }

    /*
     * \dx+
     *
     * List contents of installed extensions.
     */
    async function listExtensionContents(pattern) {
      let buf = { /* struct */ };
      let res;
      let i;

      initPQExpBuffer(buf);
      printfPQExpBuffer(buf,
        "SELECT e.extname, e.oid\n" +
        "FROM pg_catalog.pg_extension e\n");

      if (!validateSQLNamePattern(buf, pattern,
        false, false,
        NULL, "e.extname", NULL,
        NULL,
        NULL, 1)) {

        return false;
      }

      appendPQExpBufferStr(buf, "ORDER BY 1;");

      res = await PSQLexec(buf.data);

      if (!res)
        return false;

      if (PQntuples(res) == 0) {
        if (!pset.quiet) {
          if (pattern)
            pg_log_error("Did not find any extension named \"%s\".",
              pattern);
          else
            pg_log_error("Did not find any extensions.");
        }
        return false;
      }

      for (i = 0; i < PQntuples(res); i++) {
        let extname;
        let oid;

        extname = PQgetvalue(res, i, 0);
        oid = PQgetvalue(res, i, 1);

        if (!await listOneExtensionContents(extname, oid)) {
          return false;
        }
        if (cancel_pressed) {
          return false;
        }
      }

      return true;
    }

    async function listOneExtensionContents(extname, oid) {
      let buf = { /* struct */ };
      let res;
      let title = { /* struct */ };
      let myopt = pset.popt;

      initPQExpBuffer(buf);
      printfPQExpBuffer(buf,
        "SELECT pg_catalog.pg_describe_object(classid, objid, 0) AS \"%s\"\n" +
        "FROM pg_catalog.pg_depend\n" +
        "WHERE refclassid = 'pg_catalog.pg_extension'::pg_catalog.regclass AND refobjid = '%s' AND deptype = 'e'\n" +
        "ORDER BY 1;",
        gettext_noop("Object description"),
        oid);

      res = await PSQLexec(buf.data);

      if (!res)
        return false;

      myopt.nullPrint = NULL;
      initPQExpBuffer(title);
      printfPQExpBuffer(title, _("Objects in extension \"%s\""), extname);
      myopt.title = title.data;
      myopt.translate_header = true;

      printQuery(res, myopt, pset.queryFout, false, pset.logfile);

      return true;
    }

    /*
     * validateSQLNamePattern
     *
     * Wrapper around string_utils's processSQLNamePattern which also checks the
     * pattern's validity.  In addition to that function's parameters, takes a
     * 'maxparts' parameter specifying the maximum number of dotted names the
     * pattern is allowed to have, and a 'added_clause' parameter that returns by
     * reference whether a clause was added to 'buf'.  Returns whether the pattern
     * passed validation, after logging any errors.
     */
    // re-implemented manually elsewhere

    /*
     * \dRp
     * Lists publications.
     *
     * Takes an optional regexp to select particular publications
     */
    async function listPublications(pattern) {
      let buf = { /* struct */ };
      let res;
      let myopt = pset.popt;
      let translate_columns = [false, false, false, false, false, false, false, false];

      if (pset.sversion < 100000) {
        let sverbuf;

        pg_log_error("The server (version %s) does not support publications.",
          formatPGVersionNumber(pset.sversion, false,
            sverbuf, sizeof(sverbuf)));
        return true;
      }

      initPQExpBuffer(buf);

      printfPQExpBuffer(buf,
        "SELECT pubname AS \"%s\",\n" +
        "  pg_catalog.pg_get_userbyid(pubowner) AS \"%s\",\n" +
        "  puballtables AS \"%s\",\n" +
        "  pubinsert AS \"%s\",\n" +
        "  pubupdate AS \"%s\",\n" +
        "  pubdelete AS \"%s\"",
        gettext_noop("Name"),
        gettext_noop("Owner"),
        gettext_noop("All tables"),
        gettext_noop("Inserts"),
        gettext_noop("Updates"),
        gettext_noop("Deletes"));
      if (pset.sversion >= 110000)
        appendPQExpBuffer(buf,
          ",\n  pubtruncate AS \"%s\"",
          gettext_noop("Truncates"));
      if (pset.sversion >= 130000)
        appendPQExpBuffer(buf,
          ",\n  pubviaroot AS \"%s\"",
          gettext_noop("Via root"));

      appendPQExpBufferStr(buf,
        "\nFROM pg_catalog.pg_publication\n");

      if (!validateSQLNamePattern(buf, pattern, false, false,
        NULL, "pubname", NULL,
        NULL,
        NULL, 1)) {

        return false;
      }

      appendPQExpBufferStr(buf, "ORDER BY 1;");

      res = await PSQLexec(buf.data);

      if (!res)
        return false;

      myopt.nullPrint = NULL;
      myopt.title = _("List of publications");
      myopt.translate_header = true;
      myopt.translate_columns = translate_columns;
      myopt.n_translate_columns = lengthof(translate_columns);

      printQuery(res, myopt, pset.queryFout, false, pset.logfile);

      return true;
    }

    /*
     * Add footer to publication description.
     */
    async function addFooterToPublicationDesc(buf, footermsg, as_schema, cont) {
      let res;
      let count = 0;
      let i = 0;

      res = await PSQLexec(buf.data);
      if (!res)
        return false;
      else
        count = PQntuples(res);

      if (count > 0)
        printTableAddFooter(cont, footermsg);

      for (i = 0; i < count; i++) {
        if (as_schema)
          printfPQExpBuffer(buf, "    \"%s\"", PQgetvalue(res, i, 0));
        else {
          printfPQExpBuffer(buf, "    \"%s.%s\"", PQgetvalue(res, i, 0),
            PQgetvalue(res, i, 1));

          if (!PQgetisnull(res, i, 3))
            appendPQExpBuffer(buf, " (%s)", PQgetvalue(res, i, 3));

          if (!PQgetisnull(res, i, 2))
            appendPQExpBuffer(buf, " WHERE %s", PQgetvalue(res, i, 2));
        }

        printTableAddFooter(cont, buf.data);
      }

      return true;
    }

    /*
     * \dRp+
     * Describes publications including the contents.
     *
     * Takes an optional regexp to select particular publications
     */
    async function describePublications(pattern) {
      let buf = { /* struct */ };
      let i;
      let res;
      let has_pubtruncate;
      let has_pubviaroot;

      let title = { /* struct */ };
      let cont = { /* struct */ };
      if (pset.sversion < 100000) {
        let sverbuf;

        pg_log_error("The server (version %s) does not support publications.",
          formatPGVersionNumber(pset.sversion, false,
            sverbuf, sizeof(sverbuf)));
        return true;
      }

      has_pubtruncate = (pset.sversion >= 110000);
      has_pubviaroot = (pset.sversion >= 130000);

      initPQExpBuffer(buf);

      printfPQExpBuffer(buf,
        "SELECT oid, pubname,\n" +
        "  pg_catalog.pg_get_userbyid(pubowner) AS owner,\n" +
        "  puballtables, pubinsert, pubupdate, pubdelete");
      if (has_pubtruncate)
        appendPQExpBufferStr(buf,
          ", pubtruncate");
      if (has_pubviaroot)
        appendPQExpBufferStr(buf,
          ", pubviaroot");
      appendPQExpBufferStr(buf,
        "\nFROM pg_catalog.pg_publication\n");

      if (!validateSQLNamePattern(buf, pattern, false, false,
        NULL, "pubname", NULL,
        NULL,
        NULL, 1)) {

        return false;
      }

      appendPQExpBufferStr(buf, "ORDER BY 2;");

      res = await PSQLexec(buf.data);
      if (!res) {
        return false;
      }

      if (PQntuples(res) == 0) {
        if (!pset.quiet) {
          if (pattern)
            pg_log_error("Did not find any publication named \"%s\".",
              pattern);
          else
            pg_log_error("Did not find any publications.");
        }
        return false;
      }

      for (i = 0; i < PQntuples(res); i++) {
        let align = 'l';
        let ncols = 5;
        let nrows = 1;
        let pubid = PQgetvalue(res, i, 0);
        let pubname = PQgetvalue(res, i, 1);
        let puballtables = strcmp(PQgetvalue(res, i, 3), "t") == 0;
        let myopt = pset.popt.topt;

        if (has_pubtruncate)
          ncols++;
        if (has_pubviaroot)
          ncols++;

        initPQExpBuffer(title);
        printfPQExpBuffer(title, _("Publication %s"), pubname);
        printTableInit(cont, myopt, title.data, ncols, nrows);

        printTableAddHeader(cont, gettext_noop("Owner"), true, align);
        printTableAddHeader(cont, gettext_noop("All tables"), true, align);
        printTableAddHeader(cont, gettext_noop("Inserts"), true, align);
        printTableAddHeader(cont, gettext_noop("Updates"), true, align);
        printTableAddHeader(cont, gettext_noop("Deletes"), true, align);
        if (has_pubtruncate)
          printTableAddHeader(cont, gettext_noop("Truncates"), true, align);
        if (has_pubviaroot)
          printTableAddHeader(cont, gettext_noop("Via root"), true, align);

        printTableAddCell(cont, PQgetvalue(res, i, 2), false, false);
        printTableAddCell(cont, PQgetvalue(res, i, 3), false, false);
        printTableAddCell(cont, PQgetvalue(res, i, 4), false, false);
        printTableAddCell(cont, PQgetvalue(res, i, 5), false, false);
        printTableAddCell(cont, PQgetvalue(res, i, 6), false, false);
        if (has_pubtruncate)
          printTableAddCell(cont, PQgetvalue(res, i, 7), false, false);
        if (has_pubviaroot)
          printTableAddCell(cont, PQgetvalue(res, i, 8), false, false);

        if (!puballtables) {
          /* Get the tables for the specified publication */
          printfPQExpBuffer(buf,
            "SELECT n.nspname, c.relname");
          if (pset.sversion >= 150000) {
            appendPQExpBufferStr(buf,
              ", pg_get_expr(pr.prqual, c.oid)");
            appendPQExpBufferStr(buf,
              ", (CASE WHEN pr.prattrs IS NOT NULL THEN\n" +
              "     pg_catalog.array_to_string(" +
              "      ARRAY(SELECT attname\n" +
              "              FROM\n" +
              "                pg_catalog.generate_series(0, pg_catalog.array_upper(pr.prattrs::pg_catalog.int2[], 1)) s,\n" +
              "                pg_catalog.pg_attribute\n" +
              "        WHERE attrelid = c.oid AND attnum = prattrs[s]), ', ')\n" +
              "       ELSE NULL END)");
          }
          else
            appendPQExpBufferStr(buf,
              ", NULL, NULL");
          appendPQExpBuffer(buf,
            "\nFROM pg_catalog.pg_class c,\n" +
            "     pg_catalog.pg_namespace n,\n" +
            "     pg_catalog.pg_publication_rel pr\n" +
            "WHERE c.relnamespace = n.oid\n" +
            "  AND c.oid = pr.prrelid\n" +
            "  AND pr.prpubid = '%s'\n" +
            "ORDER BY 1,2", pubid);
          if (!await addFooterToPublicationDesc(buf, _("Tables:"), false, cont))
            return false;

          if (pset.sversion >= 150000) {
            /* Get the schemas for the specified publication */
            printfPQExpBuffer(buf,
              "SELECT n.nspname\n" +
              "FROM pg_catalog.pg_namespace n\n" +
              "     JOIN pg_catalog.pg_publication_namespace pn ON n.oid = pn.pnnspid\n" +
              "WHERE pn.pnpubid = '%s'\n" +
              "ORDER BY 1", pubid);
            if (!await addFooterToPublicationDesc(buf, _("Tables from schemas:"),
              true, cont))
              return false;
          }
        }

        printTable(cont, pset.queryFout, false, pset.logfile);
      }

      return true;
    }

    /*
     * \dRs
     * Describes subscriptions.
     *
     * Takes an optional regexp to select particular subscriptions
     */
    async function describeSubscriptions(pattern, verbose) {
      let buf = { /* struct */ };
      let res;
      let myopt = pset.popt;
      let translate_columns = [false, false, false, false,
        false, false, false, false, false, false, false, false, false, false, false];

      if (pset.sversion < 100000) {
        let sverbuf;

        pg_log_error("The server (version %s) does not support subscriptions.",
          formatPGVersionNumber(pset.sversion, false,
            sverbuf, sizeof(sverbuf)));
        return true;
      }

      initPQExpBuffer(buf);

      printfPQExpBuffer(buf,
        "SELECT subname AS \"%s\"\n" +
        ",  pg_catalog.pg_get_userbyid(subowner) AS \"%s\"\n" +
        ",  subenabled AS \"%s\"\n" +
        ",  subpublications AS \"%s\"\n",
        gettext_noop("Name"),
        gettext_noop("Owner"),
        gettext_noop("Enabled"),
        gettext_noop("Publication"));

      if (verbose) {
        /* Binary mode and streaming are only supported in v14 and higher */
        if (pset.sversion >= 140000) {
          appendPQExpBuffer(buf,
            ", subbinary AS \"%s\"\n",
            gettext_noop("Binary"));

          if (pset.sversion >= 160000)
            appendPQExpBuffer(buf,
              ", (CASE substream\n" +
              "    WHEN 'f' THEN 'off'\n" +
              "    WHEN 't' THEN 'on'\n" +
              "    WHEN 'p' THEN 'parallel'\n" +
              "   END) AS \"%s\"\n",
              gettext_noop("Streaming"));
          else
            appendPQExpBuffer(buf,
              ", substream AS \"%s\"\n",
              gettext_noop("Streaming"));
        }

        /* Two_phase and disable_on_error are only supported in v15 and higher */
        if (pset.sversion >= 150000)
          appendPQExpBuffer(buf,
            ", subtwophasestate AS \"%s\"\n" +
            ", subdisableonerr AS \"%s\"\n",
            gettext_noop("Two-phase commit"),
            gettext_noop("Disable on error"));

        if (pset.sversion >= 160000)
          appendPQExpBuffer(buf,
            ", suborigin AS \"%s\"\n" +
            ", subpasswordrequired AS \"%s\"\n" +
            ", subrunasowner AS \"%s\"\n",
            gettext_noop("Origin"),
            gettext_noop("Password required"),
            gettext_noop("Run as owner?"));

        if (pset.sversion >= 170000)
          appendPQExpBuffer(buf,
            ", subfailover AS \"%s\"\n",
            gettext_noop("Failover"));

        appendPQExpBuffer(buf,
          ",  subsynccommit AS \"%s\"\n" +
          ",  subconninfo AS \"%s\"\n",
          gettext_noop("Synchronous commit"),
          gettext_noop("Conninfo"));

        /* Skip LSN is only supported in v15 and higher */
        if (pset.sversion >= 150000)
          appendPQExpBuffer(buf,
            ", subskiplsn AS \"%s\"\n",
            gettext_noop("Skip LSN"));
      }

      /* Only display subscriptions in current database. */
      appendPQExpBufferStr(buf,
        "FROM pg_catalog.pg_subscription\n" +
        "WHERE subdbid = (SELECT oid\n" +
        "                 FROM pg_catalog.pg_database\n" +
        "                 WHERE datname = pg_catalog.current_database())");

      if (!validateSQLNamePattern(buf, pattern, true, false,
        NULL, "subname", NULL,
        NULL,
        NULL, 1)) {

        return false;
      }

      appendPQExpBufferStr(buf, "ORDER BY 1;");

      res = await PSQLexec(buf.data);

      if (!res)
        return false;

      myopt.nullPrint = NULL;
      myopt.title = _("List of subscriptions");
      myopt.translate_header = true;
      myopt.translate_columns = translate_columns;
      myopt.n_translate_columns = lengthof(translate_columns);

      printQuery(res, myopt, pset.queryFout, false, pset.logfile);

      return true;
    }

    /*
     * printACLColumn
     *
     * Helper function for consistently formatting ACL (privilege) columns.
     * The proper targetlist entry is appended to buf.  Note lack of any
     * whitespace or comma decoration.
     *
     * If you change this, see also the handling of attacl in permissionsList(),
     * which can't conveniently use this code.
     */
    function printACLColumn(buf, colname) {
      appendPQExpBuffer(buf,
        "CASE" +
        " WHEN pg_catalog.array_length(%s, 1) = 0 THEN '%s'" +
        " ELSE pg_catalog.array_to_string(%s, E'\\n')" +
        " END AS \"%s\"",
        colname, gettext_noop("(none)"),
        colname, gettext_noop("Access privileges"));
    }

    /*
     * \dAc
     * Lists operator classes
     *
     * Takes optional regexps to filter by index access method and input data type.
     */
    async function listOperatorClasses(access_method_pattern, type_pattern, verbose) {
      let buf = { /* struct */ };
      let res;
      let myopt = pset.popt;
      let have_where = false;
      let translate_columns = [false, false, false, false, false, false, false];

      initPQExpBuffer(buf);

      printfPQExpBuffer(buf,
        "SELECT\n" +
        "  am.amname AS \"%s\",\n" +
        "  pg_catalog.format_type(c.opcintype, NULL) AS \"%s\",\n" +
        "  CASE\n" +
        "    WHEN c.opckeytype <> 0 AND c.opckeytype <> c.opcintype\n" +
        "    THEN pg_catalog.format_type(c.opckeytype, NULL)\n" +
        "    ELSE NULL\n" +
        "  END AS \"%s\",\n" +
        "  CASE\n" +
        "    WHEN pg_catalog.pg_opclass_is_visible(c.oid)\n" +
        "    THEN pg_catalog.format('%%I', c.opcname)\n" +
        "    ELSE pg_catalog.format('%%I.%%I', n.nspname, c.opcname)\n" +
        "  END AS \"%s\",\n" +
        "  (CASE WHEN c.opcdefault\n" +
        "    THEN '%s'\n" +
        "    ELSE '%s'\n" +
        "  END) AS \"%s\"",
        gettext_noop("AM"),
        gettext_noop("Input type"),
        gettext_noop("Storage type"),
        gettext_noop("Operator class"),
        gettext_noop("yes"),
        gettext_noop("no"),
        gettext_noop("Default?"));
      if (verbose)
        appendPQExpBuffer(buf,
          ",\n  CASE\n" +
          "    WHEN pg_catalog.pg_opfamily_is_visible(of.oid)\n" +
          "    THEN pg_catalog.format('%%I', of.opfname)\n" +
          "    ELSE pg_catalog.format('%%I.%%I', ofn.nspname, of.opfname)\n" +
          "  END AS \"%s\",\n" +
          " pg_catalog.pg_get_userbyid(c.opcowner) AS \"%s\"\n",
          gettext_noop("Operator family"),
          gettext_noop("Owner"));
      appendPQExpBufferStr(buf,
        "\nFROM pg_catalog.pg_opclass c\n" +
        "  LEFT JOIN pg_catalog.pg_am am on am.oid = c.opcmethod\n" +
        "  LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.opcnamespace\n" +
        "  LEFT JOIN pg_catalog.pg_type t ON t.oid = c.opcintype\n" +
        "  LEFT JOIN pg_catalog.pg_namespace tn ON tn.oid = t.typnamespace\n");
      if (verbose)
        appendPQExpBufferStr(buf,
          "  LEFT JOIN pg_catalog.pg_opfamily of ON of.oid = c.opcfamily\n" +
          "  LEFT JOIN pg_catalog.pg_namespace ofn ON ofn.oid = of.opfnamespace\n");

      if (access_method_pattern) {
        have_where = { value: have_where };
        if (!validateSQLNamePattern(buf, access_method_pattern,
          false, false, NULL, "am.amname", NULL, NULL,
          have_where, 1))
          return false;
        have_where = have_where.value;
      }
      if (type_pattern) {
        /* Match type name pattern against either internal or external name */
        if (!validateSQLNamePattern(buf, type_pattern, have_where, false,
          "tn.nspname", "t.typname",
          "pg_catalog.format_type(t.oid, NULL)",
          "pg_catalog.pg_type_is_visible(t.oid)",
          NULL, 3))
          return false;
      }

      appendPQExpBufferStr(buf, "ORDER BY 1, 2, 4;");
      res = await PSQLexec(buf.data);

      if (!res)
        return false;

      myopt.nullPrint = NULL;
      myopt.title = _("List of operator classes");
      myopt.translate_header = true;
      myopt.translate_columns = translate_columns;
      myopt.n_translate_columns = lengthof(translate_columns);

      printQuery(res, myopt, pset.queryFout, false, pset.logfile);

      return true;
    }

    /*
     * \dAf
     * Lists operator families
     *
     * Takes optional regexps to filter by index access method and input data type.
     */
    async function listOperatorFamilies(access_method_pattern, type_pattern, verbose) {
      let buf = { /* struct */ };
      let res;
      let myopt = pset.popt;
      let have_where = false;
      let translate_columns = [false, false, false, false];

      initPQExpBuffer(buf);

      printfPQExpBuffer(buf,
        "SELECT\n" +
        "  am.amname AS \"%s\",\n" +
        "  CASE\n" +
        "    WHEN pg_catalog.pg_opfamily_is_visible(f.oid)\n" +
        "    THEN pg_catalog.format('%%I', f.opfname)\n" +
        "    ELSE pg_catalog.format('%%I.%%I', n.nspname, f.opfname)\n" +
        "  END AS \"%s\",\n" +
        "  (SELECT\n" +
        "     pg_catalog.string_agg(pg_catalog.format_type(oc.opcintype, NULL), ', ')\n" +
        "   FROM pg_catalog.pg_opclass oc\n" +
        "   WHERE oc.opcfamily = f.oid) \"%s\"",
        gettext_noop("AM"),
        gettext_noop("Operator family"),
        gettext_noop("Applicable types"));
      if (verbose)
        appendPQExpBuffer(buf,
          ",\n  pg_catalog.pg_get_userbyid(f.opfowner) AS \"%s\"\n",
          gettext_noop("Owner"));
      appendPQExpBufferStr(buf,
        "\nFROM pg_catalog.pg_opfamily f\n" +
        "  LEFT JOIN pg_catalog.pg_am am on am.oid = f.opfmethod\n" +
        "  LEFT JOIN pg_catalog.pg_namespace n ON n.oid = f.opfnamespace\n");

      if (access_method_pattern) {
        have_where = { value: have_where };
        if (!validateSQLNamePattern(buf, access_method_pattern,
          false, false, NULL, "am.amname", NULL, NULL,
          have_where, 1))
          return false;
        have_where = have_where.value;
      }
      if (type_pattern) {
        appendPQExpBuffer(buf,
          "  %s EXISTS (\n" +
          "    SELECT 1\n" +
          "    FROM pg_catalog.pg_type t\n" +
          "    JOIN pg_catalog.pg_opclass oc ON oc.opcintype = t.oid\n" +
          "    LEFT JOIN pg_catalog.pg_namespace tn ON tn.oid = t.typnamespace\n" +
          "    WHERE oc.opcfamily = f.oid\n",
          have_where ? "AND" : "WHERE");
        /* Match type name pattern against either internal or external name */
        if (!validateSQLNamePattern(buf, type_pattern, true, false,
          "tn.nspname", "t.typname",
          "pg_catalog.format_type(t.oid, NULL)",
          "pg_catalog.pg_type_is_visible(t.oid)",
          NULL, 3))
          return false;
        appendPQExpBufferStr(buf, "  )\n");
      }

      appendPQExpBufferStr(buf, "ORDER BY 1, 2;");
      res = await PSQLexec(buf.data);

      if (!res)
        return false;

      myopt.nullPrint = NULL;
      myopt.title = _("List of operator families");
      myopt.translate_header = true;
      myopt.translate_columns = translate_columns;
      myopt.n_translate_columns = lengthof(translate_columns);

      printQuery(res, myopt, pset.queryFout, false, pset.logfile);

      return true;
    }

    /*
     * \dAo
     * Lists operators of operator families
     *
     * Takes optional regexps to filter by index access method and operator
     * family.
     */
    async function listOpFamilyOperators(access_method_pattern, family_pattern, verbose) {
      let buf = { /* struct */ };
      let res;
      let myopt = pset.popt;
      let have_where = false;

      let translate_columns = [false, false, false, false, false, false];

      initPQExpBuffer(buf);

      printfPQExpBuffer(buf,
        "SELECT\n" +
        "  am.amname AS \"%s\",\n" +
        "  CASE\n" +
        "    WHEN pg_catalog.pg_opfamily_is_visible(of.oid)\n" +
        "    THEN pg_catalog.format('%%I', of.opfname)\n" +
        "    ELSE pg_catalog.format('%%I.%%I', nsf.nspname, of.opfname)\n" +
        "  END AS \"%s\",\n" +
        "  o.amopopr::pg_catalog.regoperator AS \"%s\"\n," +
        "  o.amopstrategy AS \"%s\",\n" +
        "  CASE o.amoppurpose\n" +
        "    WHEN 'o' THEN '%s'\n" +
        "    WHEN 's' THEN '%s'\n" +
        "  END AS \"%s\"\n",
        gettext_noop("AM"),
        gettext_noop("Operator family"),
        gettext_noop("Operator"),
        gettext_noop("Strategy"),
        gettext_noop("ordering"),
        gettext_noop("search"),
        gettext_noop("Purpose"));

      if (verbose)
        appendPQExpBuffer(buf,
          ", ofs.opfname AS \"%s\"\n",
          gettext_noop("Sort opfamily"));
      appendPQExpBufferStr(buf,
        "FROM pg_catalog.pg_amop o\n" +
        "  LEFT JOIN pg_catalog.pg_opfamily of ON of.oid = o.amopfamily\n" +
        "  LEFT JOIN pg_catalog.pg_am am ON am.oid = of.opfmethod AND am.oid = o.amopmethod\n" +
        "  LEFT JOIN pg_catalog.pg_namespace nsf ON of.opfnamespace = nsf.oid\n");
      if (verbose)
        appendPQExpBufferStr(buf,
          "  LEFT JOIN pg_catalog.pg_opfamily ofs ON ofs.oid = o.amopsortfamily\n");

      if (access_method_pattern) {
        have_where = { value: have_where };
        if (!validateSQLNamePattern(buf, access_method_pattern,
          false, false, NULL, "am.amname",
          NULL, NULL,
          have_where, 1))
          return false;
        have_where = have_where.value;
      }

      if (family_pattern) {
        if (!validateSQLNamePattern(buf, family_pattern, have_where, false,
          "nsf.nspname", "of.opfname", NULL, NULL,
          NULL, 3))
          return false;
      }

      appendPQExpBufferStr(buf, "ORDER BY 1, 2,\n" +
        "  o.amoplefttype = o.amoprighttype DESC,\n" +
        "  pg_catalog.format_type(o.amoplefttype, NULL),\n" +
        "  pg_catalog.format_type(o.amoprighttype, NULL),\n" +
        "  o.amopstrategy;");

      res = await PSQLexec(buf.data);

      if (!res)
        return false;

      myopt.nullPrint = NULL;
      myopt.title = _("List of operators of operator families");
      myopt.translate_header = true;
      myopt.translate_columns = translate_columns;
      myopt.n_translate_columns = lengthof(translate_columns);

      printQuery(res, myopt, pset.queryFout, false, pset.logfile);

      return true;
    }

    /*
     * \dAp
     * Lists support functions of operator families
     *
     * Takes optional regexps to filter by index access method and operator
     * family.
     */
    async function listOpFamilyFunctions(access_method_pattern, family_pattern, verbose) {
      let buf = { /* struct */ };
      let res;
      let myopt = pset.popt;
      let have_where = false;
      let translate_columns = [false, false, false, false, false, false];

      initPQExpBuffer(buf);

      printfPQExpBuffer(buf,
        "SELECT\n" +
        "  am.amname AS \"%s\",\n" +
        "  CASE\n" +
        "    WHEN pg_catalog.pg_opfamily_is_visible(of.oid)\n" +
        "    THEN pg_catalog.format('%%I', of.opfname)\n" +
        "    ELSE pg_catalog.format('%%I.%%I', ns.nspname, of.opfname)\n" +
        "  END AS \"%s\",\n" +
        "  pg_catalog.format_type(ap.amproclefttype, NULL) AS \"%s\",\n" +
        "  pg_catalog.format_type(ap.amprocrighttype, NULL) AS \"%s\",\n" +
        "  ap.amprocnum AS \"%s\"\n",
        gettext_noop("AM"),
        gettext_noop("Operator family"),
        gettext_noop("Registered left type"),
        gettext_noop("Registered right type"),
        gettext_noop("Number"));

      if (!verbose)
        appendPQExpBuffer(buf,
          ", p.proname AS \"%s\"\n",
          gettext_noop("Function"));
      else
        appendPQExpBuffer(buf,
          ", ap.amproc::pg_catalog.regprocedure AS \"%s\"\n",
          gettext_noop("Function"));

      appendPQExpBufferStr(buf,
        "FROM pg_catalog.pg_amproc ap\n" +
        "  LEFT JOIN pg_catalog.pg_opfamily of ON of.oid = ap.amprocfamily\n" +
        "  LEFT JOIN pg_catalog.pg_am am ON am.oid = of.opfmethod\n" +
        "  LEFT JOIN pg_catalog.pg_namespace ns ON of.opfnamespace = ns.oid\n" +
        "  LEFT JOIN pg_catalog.pg_proc p ON ap.amproc = p.oid\n");

      if (access_method_pattern) {
        have_where = { value: have_where };
        if (!validateSQLNamePattern(buf, access_method_pattern,
          false, false, NULL, "am.amname",
          NULL, NULL,
          have_where, 1))
          return false;
        have_where = have_where.value;
      }
      if (family_pattern) {
        if (!validateSQLNamePattern(buf, family_pattern, have_where, false,
          "ns.nspname", "of.opfname", NULL, NULL,
          NULL, 3))
          return false;
      }

      appendPQExpBufferStr(buf, "ORDER BY 1, 2,\n" +
        "  ap.amproclefttype = ap.amprocrighttype DESC,\n" +
        "  3, 4, 5;");

      res = await PSQLexec(buf.data);

      if (!res)
        return false;

      myopt.nullPrint = NULL;
      myopt.title = _("List of support functions of operator families");
      myopt.translate_header = true;
      myopt.translate_columns = translate_columns;
      myopt.n_translate_columns = lengthof(translate_columns);

      printQuery(res, myopt, pset.queryFout, false, pset.logfile);

      return true;
    }

    /*
     * \dl or \lo_list
     * Lists large objects
     */
    async function listLargeObjects(verbose) {
      let buf = { /* struct */ };
      let res;
      let myopt = pset.popt;

      initPQExpBuffer(buf);

      printfPQExpBuffer(buf,
        "SELECT oid as \"%s\",\n" +
        "  pg_catalog.pg_get_userbyid(lomowner) as \"%s\",\n  ",
        gettext_noop("ID"),
        gettext_noop("Owner"));

      if (verbose) {
        printACLColumn(buf, "lomacl");
        appendPQExpBufferStr(buf, ",\n  ");
      }

      appendPQExpBuffer(buf,
        "pg_catalog.obj_description(oid, 'pg_largeobject') as \"%s\"\n" +
        "FROM pg_catalog.pg_largeobject_metadata\n" +
        "ORDER BY oid",
        gettext_noop("Description"));

      res = await PSQLexec(buf.data);

      if (!res)
        return false;

      myopt.nullPrint = NULL;
      myopt.title = _("Large objects");
      myopt.translate_header = true;

      printQuery(res, myopt, pset.queryFout, false, pset.logfile);

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

function htmlEscape(str, convertWhitespace) {
  str = str.replace(/[<>&'"]/g, m => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[m]));
  if (convertWhitespace) str = str.replace(/ /g, '&nbsp;').replace(/\n/g, '<br />');
  return str;
}

function tableToString(td, escape) {
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

  let result = `${title}\n${table}${footers}`;
  if (escape) result = htmlEscape(result);
  return result;
}

function tableToHtml(td) {
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
  pg_strdup = noop,
  _ = noop;

function strstr(str1, str2) {  // unlike the C version, this returns JS null on not found, and 0+ if found
  const index = str1.indexOf(str2);
  return index === -1 ? NULL : index;
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
   * programs.  It should go away someday.
   */
  if (strchr(str, '\\') != NULL && PQserverVersion(conn) >= 80100) {
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

function formatPGVersionNumber(version_number, include_minor, buf, buflen) {
  if (version_number >= 100000) {
    /* New two-part style */
    if (include_minor)
      buf = sprintf("%d.%d", Math.floor(version_number / 10000),
        version_number % 10000);
    else
      buf = sprintf("%d", version_number / 10000);
  }
  else {
    /* Old three-part style */
    if (include_minor)
      buf = sprintf("%d.%d.%d", Math.floor(version_number / 10000),
        Math.floor(version_number / 100) % 100,
        version_number % 100);
    else
      buf = sprintf("%d.%d", Math.floor(version_number / 10000),
        Math.floor(version_number / 100) % 100);
  }
  return buf;
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

const helpText = `Help
  \\? [commands]          show help on backslash commands
  \\h [NAME]              help on syntax of SQL commands, * for all commands

Informational
  (options: S = show system objects, + = additional detail)
  \\d[S+]                 list tables, views, and sequences
  \\d[S+]  NAME           describe table, view, sequence, or index
  \\da[S]  [PATTERN]      list aggregates
  \\dA[+]  [PATTERN]      list access methods
  \\dAc[+] [AMPTRN [TYPEPTRN]]  list operator classes
  \\dAf[+] [AMPTRN [TYPEPTRN]]  list operator families
  \\dAo[+] [AMPTRN [OPFPTRN]]   list operators of operator families
  \\dAp[+] [AMPTRN [OPFPTRN]]   list support functions of operator families
  \\db[+]  [PATTERN]      list tablespaces
  \\dc[S+] [PATTERN]      list conversions
  \\dconfig[+] [PATTERN]  list configuration parameters
  \\dC[+]  [PATTERN]      list casts
  \\dd[S]  [PATTERN]      show object descriptions not displayed elsewhere
  \\dD[S+] [PATTERN]      list domains
  \\ddp    [PATTERN]      list default privileges
  \\dE[S+] [PATTERN]      list foreign tables
  \\des[+] [PATTERN]      list foreign servers
  \\det[+] [PATTERN]      list foreign tables
  \\deu[+] [PATTERN]      list user mappings
  \\dew[+] [PATTERN]      list foreign-data wrappers
  \\df[anptw][S+] [FUNCPTRN [TYPEPTRN ...]]
                         list [only agg/normal/procedure/trigger/window] functions
  \\dF[+]  [PATTERN]      list text search configurations
  \\dFd[+] [PATTERN]      list text search dictionaries
  \\dFp[+] [PATTERN]      list text search parsers
  \\dFt[+] [PATTERN]      list text search templates
  \\dg[S+] [PATTERN]      list roles
  \\di[S+] [PATTERN]      list indexes
  \\dl[+]                 list large objects, same as \\lo_list
  \\dL[S+] [PATTERN]      list procedural languages
  \\dm[S+] [PATTERN]      list materialized views
  \\dn[S+] [PATTERN]      list schemas
  \\do[S+] [OPPTRN [TYPEPTRN [TYPEPTRN]]]
                         list operators
  \\dO[S+] [PATTERN]      list collations
  \\dp[S]  [PATTERN]      list table, view, and sequence access privileges
  \\dP[itn+] [PATTERN]    list [only index/table] partitioned relations [n=nested]
  \\drds [ROLEPTRN [DBPTRN]] list per-database role settings
  \\drg[S] [PATTERN]      list role grants
  \\dRp[+] [PATTERN]      list replication publications
  \\dRs[+] [PATTERN]      list replication subscriptions
  \\ds[S+] [PATTERN]      list sequences
  \\dt[S+] [PATTERN]      list tables
  \\dT[S+] [PATTERN]      list data types
  \\du[S+] [PATTERN]      list roles
  \\dv[S+] [PATTERN]      list views
  \\dx[+]  [PATTERN]      list extensions
  \\dX     [PATTERN]      list extended statistics
  \\dy[+]  [PATTERN]      list event triggers
  \\l[+]   [PATTERN]      list databases
  \\lo_list[+]            list large objects
  \\sf[+]  FUNCNAME       show a function's definition
  \\sv[+]  VIEWNAME       show a view's definition
  \\z[S]   [PATTERN]      same as \\dp
`;

const helpIndex = [
  // 	const char *cmd;			/* the command name */
  // 	const char *help;			/* the help associated with it */
  // 	const char *docbook_id;		/* DocBook XML id (for generating URL) */
  ["ABORT", "abort the current transaction", "sql-abort", sql_help_ABORT],
  ["ALTER AGGREGATE", "change the definition of an aggregate function", "sql-alteraggregate", sql_help_ALTER_AGGREGATE],
  ["ALTER COLLATION", "change the definition of a collation", "sql-altercollation", sql_help_ALTER_COLLATION],
  ["ALTER CONVERSION", "change the definition of a conversion", "sql-alterconversion", sql_help_ALTER_CONVERSION],
  ["ALTER DATABASE", "change a database", "sql-alterdatabase", sql_help_ALTER_DATABASE],
  ["ALTER DEFAULT PRIVILEGES", "define default access privileges", "sql-alterdefaultprivileges", sql_help_ALTER_DEFAULT_PRIVILEGES],
  ["ALTER DOMAIN", "change the definition of a domain", "sql-alterdomain", sql_help_ALTER_DOMAIN],
  ["ALTER EVENT TRIGGER", "change the definition of an event trigger", "sql-altereventtrigger", sql_help_ALTER_EVENT_TRIGGER],
  ["ALTER EXTENSION", "change the definition of an extension", "sql-alterextension", sql_help_ALTER_EXTENSION],
  ["ALTER FOREIGN DATA WRAPPER", "change the definition of a foreign-data wrapper", "sql-alterforeigndatawrapper", sql_help_ALTER_FOREIGN_DATA_WRAPPER],
  ["ALTER FOREIGN TABLE", "change the definition of a foreign table", "sql-alterforeigntable", sql_help_ALTER_FOREIGN_TABLE],
  ["ALTER FUNCTION", "change the definition of a function", "sql-alterfunction", sql_help_ALTER_FUNCTION],
  ["ALTER GROUP", "change role name or membership", "sql-altergroup", sql_help_ALTER_GROUP],
  ["ALTER INDEX", "change the definition of an index", "sql-alterindex", sql_help_ALTER_INDEX],
  ["ALTER LANGUAGE", "change the definition of a procedural language", "sql-alterlanguage", sql_help_ALTER_LANGUAGE],
  ["ALTER LARGE OBJECT", "change the definition of a large object", "sql-alterlargeobject", sql_help_ALTER_LARGE_OBJECT],
  ["ALTER MATERIALIZED VIEW", "change the definition of a materialized view", "sql-altermaterializedview", sql_help_ALTER_MATERIALIZED_VIEW],
  ["ALTER OPERATOR", "change the definition of an operator", "sql-alteroperator", sql_help_ALTER_OPERATOR],
  ["ALTER OPERATOR CLASS", "change the definition of an operator class", "sql-alteropclass", sql_help_ALTER_OPERATOR_CLASS],
  ["ALTER OPERATOR FAMILY", "change the definition of an operator family", "sql-alteropfamily", sql_help_ALTER_OPERATOR_FAMILY],
  ["ALTER POLICY", "change the definition of a row-level security policy", "sql-alterpolicy", sql_help_ALTER_POLICY],
  ["ALTER PROCEDURE", "change the definition of a procedure", "sql-alterprocedure", sql_help_ALTER_PROCEDURE],
  ["ALTER PUBLICATION", "change the definition of a publication", "sql-alterpublication", sql_help_ALTER_PUBLICATION],
  ["ALTER ROLE", "change a database role", "sql-alterrole", sql_help_ALTER_ROLE],
  ["ALTER ROUTINE", "change the definition of a routine", "sql-alterroutine", sql_help_ALTER_ROUTINE],
  ["ALTER RULE", "change the definition of a rule", "sql-alterrule", sql_help_ALTER_RULE],
  ["ALTER SCHEMA", "change the definition of a schema", "sql-alterschema", sql_help_ALTER_SCHEMA],
  ["ALTER SEQUENCE", "change the definition of a sequence generator", "sql-altersequence", sql_help_ALTER_SEQUENCE],
  ["ALTER SERVER", "change the definition of a foreign server", "sql-alterserver", sql_help_ALTER_SERVER],
  ["ALTER STATISTICS", "change the definition of an extended statistics object", "sql-alterstatistics", sql_help_ALTER_STATISTICS],
  ["ALTER SUBSCRIPTION", "change the definition of a subscription", "sql-altersubscription", sql_help_ALTER_SUBSCRIPTION],
  ["ALTER SYSTEM", "change a server configuration parameter", "sql-altersystem", sql_help_ALTER_SYSTEM],
  ["ALTER TABLE", "change the definition of a table", "sql-altertable", sql_help_ALTER_TABLE],
  ["ALTER TABLESPACE", "change the definition of a tablespace", "sql-altertablespace", sql_help_ALTER_TABLESPACE],
  ["ALTER TEXT SEARCH CONFIGURATION", "change the definition of a text search configuration", "sql-altertsconfig", sql_help_ALTER_TEXT_SEARCH_CONFIGURATION],
  ["ALTER TEXT SEARCH DICTIONARY", "change the definition of a text search dictionary", "sql-altertsdictionary", sql_help_ALTER_TEXT_SEARCH_DICTIONARY],
  ["ALTER TEXT SEARCH PARSER", "change the definition of a text search parser", "sql-altertsparser", sql_help_ALTER_TEXT_SEARCH_PARSER],
  ["ALTER TEXT SEARCH TEMPLATE", "change the definition of a text search template", "sql-altertstemplate", sql_help_ALTER_TEXT_SEARCH_TEMPLATE],
  ["ALTER TRIGGER", "change the definition of a trigger", "sql-altertrigger", sql_help_ALTER_TRIGGER],
  ["ALTER TYPE", "change the definition of a type", "sql-altertype", sql_help_ALTER_TYPE],
  ["ALTER USER", "change a database role", "sql-alteruser", sql_help_ALTER_USER],
  ["ALTER USER MAPPING", "change the definition of a user mapping", "sql-alterusermapping", sql_help_ALTER_USER_MAPPING],
  ["ALTER VIEW", "change the definition of a view", "sql-alterview", sql_help_ALTER_VIEW],
  ["ANALYZE", "collect statistics about a database", "sql-analyze", sql_help_ANALYZE],
  ["BEGIN", "start a transaction block", "sql-begin", sql_help_BEGIN],
  ["CALL", "invoke a procedure", "sql-call", sql_help_CALL],
  ["CHECKPOINT", "force a write-ahead log checkpoint", "sql-checkpoint", sql_help_CHECKPOINT],
  ["CLOSE", "close a cursor", "sql-close", sql_help_CLOSE],
  ["CLUSTER", "cluster a table according to an index", "sql-cluster", sql_help_CLUSTER],
  ["COMMENT", "define or change the comment of an object", "sql-comment", sql_help_COMMENT],
  ["COMMIT", "commit the current transaction", "sql-commit", sql_help_COMMIT],
  ["COMMIT PREPARED", "commit a transaction that was earlier prepared for two-phase commit", "sql-commit-prepared", sql_help_COMMIT_PREPARED],
  ["COPY", "copy data between a file and a table", "sql-copy", sql_help_COPY],
  ["CREATE ACCESS METHOD", "define a new access method", "sql-create-access-method", sql_help_CREATE_ACCESS_METHOD],
  ["CREATE AGGREGATE", "define a new aggregate function", "sql-createaggregate", sql_help_CREATE_AGGREGATE],
  ["CREATE CAST", "define a new cast", "sql-createcast", sql_help_CREATE_CAST],
  ["CREATE COLLATION", "define a new collation", "sql-createcollation", sql_help_CREATE_COLLATION],
  ["CREATE CONVERSION", "define a new encoding conversion", "sql-createconversion", sql_help_CREATE_CONVERSION],
  ["CREATE DATABASE", "create a new database", "sql-createdatabase", sql_help_CREATE_DATABASE],
  ["CREATE DOMAIN", "define a new domain", "sql-createdomain", sql_help_CREATE_DOMAIN],
  ["CREATE EVENT TRIGGER", "define a new event trigger", "sql-createeventtrigger", sql_help_CREATE_EVENT_TRIGGER],
  ["CREATE EXTENSION", "install an extension", "sql-createextension", sql_help_CREATE_EXTENSION],
  ["CREATE FOREIGN DATA WRAPPER", "define a new foreign-data wrapper", "sql-createforeigndatawrapper", sql_help_CREATE_FOREIGN_DATA_WRAPPER],
  ["CREATE FOREIGN TABLE", "define a new foreign table", "sql-createforeigntable", sql_help_CREATE_FOREIGN_TABLE],
  ["CREATE FUNCTION", "define a new function", "sql-createfunction", sql_help_CREATE_FUNCTION],
  ["CREATE GROUP", "define a new database role", "sql-creategroup", sql_help_CREATE_GROUP],
  ["CREATE INDEX", "define a new index", "sql-createindex", sql_help_CREATE_INDEX],
  ["CREATE LANGUAGE", "define a new procedural language", "sql-createlanguage", sql_help_CREATE_LANGUAGE],
  ["CREATE MATERIALIZED VIEW", "define a new materialized view", "sql-creatematerializedview", sql_help_CREATE_MATERIALIZED_VIEW],
  ["CREATE OPERATOR", "define a new operator", "sql-createoperator", sql_help_CREATE_OPERATOR],
  ["CREATE OPERATOR CLASS", "define a new operator class", "sql-createopclass", sql_help_CREATE_OPERATOR_CLASS],
  ["CREATE OPERATOR FAMILY", "define a new operator family", "sql-createopfamily", sql_help_CREATE_OPERATOR_FAMILY],
  ["CREATE POLICY", "define a new row-level security policy for a table", "sql-createpolicy", sql_help_CREATE_POLICY],
  ["CREATE PROCEDURE", "define a new procedure", "sql-createprocedure", sql_help_CREATE_PROCEDURE],
  ["CREATE PUBLICATION", "define a new publication", "sql-createpublication", sql_help_CREATE_PUBLICATION],
  ["CREATE ROLE", "define a new database role", "sql-createrole", sql_help_CREATE_ROLE],
  ["CREATE RULE", "define a new rewrite rule", "sql-createrule", sql_help_CREATE_RULE],
  ["CREATE SCHEMA", "define a new schema", "sql-createschema", sql_help_CREATE_SCHEMA],
  ["CREATE SEQUENCE", "define a new sequence generator", "sql-createsequence", sql_help_CREATE_SEQUENCE],
  ["CREATE SERVER", "define a new foreign server", "sql-createserver", sql_help_CREATE_SERVER],
  ["CREATE STATISTICS", "define extended statistics", "sql-createstatistics", sql_help_CREATE_STATISTICS],
  ["CREATE SUBSCRIPTION", "define a new subscription", "sql-createsubscription", sql_help_CREATE_SUBSCRIPTION],
  ["CREATE TABLE", "define a new table", "sql-createtable", sql_help_CREATE_TABLE],
  ["CREATE TABLE AS", "define a new table from the results of a query", "sql-createtableas", sql_help_CREATE_TABLE_AS],
  ["CREATE TABLESPACE", "define a new tablespace", "sql-createtablespace", sql_help_CREATE_TABLESPACE],
  ["CREATE TEXT SEARCH CONFIGURATION", "define a new text search configuration", "sql-createtsconfig", sql_help_CREATE_TEXT_SEARCH_CONFIGURATION],
  ["CREATE TEXT SEARCH DICTIONARY", "define a new text search dictionary", "sql-createtsdictionary", sql_help_CREATE_TEXT_SEARCH_DICTIONARY],
  ["CREATE TEXT SEARCH PARSER", "define a new text search parser", "sql-createtsparser", sql_help_CREATE_TEXT_SEARCH_PARSER],
  ["CREATE TEXT SEARCH TEMPLATE", "define a new text search template", "sql-createtstemplate", sql_help_CREATE_TEXT_SEARCH_TEMPLATE],
  ["CREATE TRANSFORM", "define a new transform", "sql-createtransform", sql_help_CREATE_TRANSFORM],
  ["CREATE TRIGGER", "define a new trigger", "sql-createtrigger", sql_help_CREATE_TRIGGER],
  ["CREATE TYPE", "define a new data type", "sql-createtype", sql_help_CREATE_TYPE],
  ["CREATE USER", "define a new database role", "sql-createuser", sql_help_CREATE_USER],
  ["CREATE USER MAPPING", "define a new mapping of a user to a foreign server", "sql-createusermapping", sql_help_CREATE_USER_MAPPING],
  ["CREATE VIEW", "define a new view", "sql-createview", sql_help_CREATE_VIEW],
  ["DEALLOCATE", "deallocate a prepared statement", "sql-deallocate", sql_help_DEALLOCATE],
  ["DECLARE", "define a cursor", "sql-declare", sql_help_DECLARE],
  ["DELETE", "delete rows of a table", "sql-delete", sql_help_DELETE],
  ["DISCARD", "discard session state", "sql-discard", sql_help_DISCARD],
  ["DO", "execute an anonymous code block", "sql-do", sql_help_DO],
  ["DROP ACCESS METHOD", "remove an access method", "sql-drop-access-method", sql_help_DROP_ACCESS_METHOD],
  ["DROP AGGREGATE", "remove an aggregate function", "sql-dropaggregate", sql_help_DROP_AGGREGATE],
  ["DROP CAST", "remove a cast", "sql-dropcast", sql_help_DROP_CAST],
  ["DROP COLLATION", "remove a collation", "sql-dropcollation", sql_help_DROP_COLLATION],
  ["DROP CONVERSION", "remove a conversion", "sql-dropconversion", sql_help_DROP_CONVERSION],
  ["DROP DATABASE", "remove a database", "sql-dropdatabase", sql_help_DROP_DATABASE],
  ["DROP DOMAIN", "remove a domain", "sql-dropdomain", sql_help_DROP_DOMAIN],
  ["DROP EVENT TRIGGER", "remove an event trigger", "sql-dropeventtrigger", sql_help_DROP_EVENT_TRIGGER],
  ["DROP EXTENSION", "remove an extension", "sql-dropextension", sql_help_DROP_EXTENSION],
  ["DROP FOREIGN DATA WRAPPER", "remove a foreign-data wrapper", "sql-dropforeigndatawrapper", sql_help_DROP_FOREIGN_DATA_WRAPPER],
  ["DROP FOREIGN TABLE", "remove a foreign table", "sql-dropforeigntable", sql_help_DROP_FOREIGN_TABLE],
  ["DROP FUNCTION", "remove a function", "sql-dropfunction", sql_help_DROP_FUNCTION],
  ["DROP GROUP", "remove a database role", "sql-dropgroup", sql_help_DROP_GROUP],
  ["DROP INDEX", "remove an index", "sql-dropindex", sql_help_DROP_INDEX],
  ["DROP LANGUAGE", "remove a procedural language", "sql-droplanguage", sql_help_DROP_LANGUAGE],
  ["DROP MATERIALIZED VIEW", "remove a materialized view", "sql-dropmaterializedview", sql_help_DROP_MATERIALIZED_VIEW],
  ["DROP OPERATOR", "remove an operator", "sql-dropoperator", sql_help_DROP_OPERATOR],
  ["DROP OPERATOR CLASS", "remove an operator class", "sql-dropopclass", sql_help_DROP_OPERATOR_CLASS],
  ["DROP OPERATOR FAMILY", "remove an operator family", "sql-dropopfamily", sql_help_DROP_OPERATOR_FAMILY],
  ["DROP OWNED", "remove database objects owned by a database role", "sql-drop-owned", sql_help_DROP_OWNED],
  ["DROP POLICY", "remove a row-level security policy from a table", "sql-droppolicy", sql_help_DROP_POLICY],
  ["DROP PROCEDURE", "remove a procedure", "sql-dropprocedure", sql_help_DROP_PROCEDURE],
  ["DROP PUBLICATION", "remove a publication", "sql-droppublication", sql_help_DROP_PUBLICATION],
  ["DROP ROLE", "remove a database role", "sql-droprole", sql_help_DROP_ROLE],
  ["DROP ROUTINE", "remove a routine", "sql-droproutine", sql_help_DROP_ROUTINE],
  ["DROP RULE", "remove a rewrite rule", "sql-droprule", sql_help_DROP_RULE],
  ["DROP SCHEMA", "remove a schema", "sql-dropschema", sql_help_DROP_SCHEMA],
  ["DROP SEQUENCE", "remove a sequence", "sql-dropsequence", sql_help_DROP_SEQUENCE],
  ["DROP SERVER", "remove a foreign server descriptor", "sql-dropserver", sql_help_DROP_SERVER],
  ["DROP STATISTICS", "remove extended statistics", "sql-dropstatistics", sql_help_DROP_STATISTICS],
  ["DROP SUBSCRIPTION", "remove a subscription", "sql-dropsubscription", sql_help_DROP_SUBSCRIPTION],
  ["DROP TABLE", "remove a table", "sql-droptable", sql_help_DROP_TABLE],
  ["DROP TABLESPACE", "remove a tablespace", "sql-droptablespace", sql_help_DROP_TABLESPACE],
  ["DROP TEXT SEARCH CONFIGURATION", "remove a text search configuration", "sql-droptsconfig", sql_help_DROP_TEXT_SEARCH_CONFIGURATION],
  ["DROP TEXT SEARCH DICTIONARY", "remove a text search dictionary", "sql-droptsdictionary", sql_help_DROP_TEXT_SEARCH_DICTIONARY],
  ["DROP TEXT SEARCH PARSER", "remove a text search parser", "sql-droptsparser", sql_help_DROP_TEXT_SEARCH_PARSER],
  ["DROP TEXT SEARCH TEMPLATE", "remove a text search template", "sql-droptstemplate", sql_help_DROP_TEXT_SEARCH_TEMPLATE],
  ["DROP TRANSFORM", "remove a transform", "sql-droptransform", sql_help_DROP_TRANSFORM],
  ["DROP TRIGGER", "remove a trigger", "sql-droptrigger", sql_help_DROP_TRIGGER],
  ["DROP TYPE", "remove a data type", "sql-droptype", sql_help_DROP_TYPE],
  ["DROP USER", "remove a database role", "sql-dropuser", sql_help_DROP_USER],
  ["DROP USER MAPPING", "remove a user mapping for a foreign server", "sql-dropusermapping", sql_help_DROP_USER_MAPPING],
  ["DROP VIEW", "remove a view", "sql-dropview", sql_help_DROP_VIEW],
  ["END", "commit the current transaction", "sql-end", sql_help_END],
  ["EXECUTE", "execute a prepared statement", "sql-execute", sql_help_EXECUTE],
  ["EXPLAIN", "show the execution plan of a statement", "sql-explain", sql_help_EXPLAIN],
  ["FETCH", "retrieve rows from a query using a cursor", "sql-fetch", sql_help_FETCH],
  ["GRANT", "define access privileges", "sql-grant", sql_help_GRANT],
  ["IMPORT FOREIGN SCHEMA", "import table definitions from a foreign server", "sql-importforeignschema", sql_help_IMPORT_FOREIGN_SCHEMA],
  ["INSERT", "create new rows in a table", "sql-insert", sql_help_INSERT],
  ["LISTEN", "listen for a notification", "sql-listen", sql_help_LISTEN],
  ["LOAD", "load a shared library file", "sql-load", sql_help_LOAD],
  ["LOCK", "lock a table", "sql-lock", sql_help_LOCK],
  ["MERGE", "conditionally insert, update, or delete rows of a table", "sql-merge", sql_help_MERGE],
  ["MOVE", "position a cursor", "sql-move", sql_help_MOVE],
  ["NOTIFY", "generate a notification", "sql-notify", sql_help_NOTIFY],
  ["PREPARE", "prepare a statement for execution", "sql-prepare", sql_help_PREPARE],
  ["PREPARE TRANSACTION", "prepare the current transaction for two-phase commit", "sql-prepare-transaction", sql_help_PREPARE_TRANSACTION],
  ["REASSIGN OWNED", "change the ownership of database objects owned by a database role", "sql-reassign-owned", sql_help_REASSIGN_OWNED],
  ["REFRESH MATERIALIZED VIEW", "replace the contents of a materialized view", "sql-refreshmaterializedview", sql_help_REFRESH_MATERIALIZED_VIEW],
  ["REINDEX", "rebuild indexes", "sql-reindex", sql_help_REINDEX],
  ["RELEASE SAVEPOINT", "release a previously defined savepoint", "sql-release-savepoint", sql_help_RELEASE_SAVEPOINT],
  ["RESET", "restore the value of a run-time parameter to the default value", "sql-reset", sql_help_RESET],
  ["REVOKE", "remove access privileges", "sql-revoke", sql_help_REVOKE],
  ["ROLLBACK", "abort the current transaction", "sql-rollback", sql_help_ROLLBACK],
  ["ROLLBACK PREPARED", "cancel a transaction that was earlier prepared for two-phase commit", "sql-rollback-prepared", sql_help_ROLLBACK_PREPARED],
  ["ROLLBACK TO SAVEPOINT", "roll back to a savepoint", "sql-rollback-to", sql_help_ROLLBACK_TO_SAVEPOINT],
  ["SAVEPOINT", "define a new savepoint within the current transaction", "sql-savepoint", sql_help_SAVEPOINT],
  ["SECURITY LABEL", "define or change a security label applied to an object", "sql-security-label", sql_help_SECURITY_LABEL],
  ["SELECT", "retrieve rows from a table or view", "sql-select", sql_help_SELECT],
  ["SELECT INTO", "define a new table from the results of a query", "sql-selectinto", sql_help_SELECT_INTO],
  ["SET", "change a run-time parameter", "sql-set", sql_help_SET],
  ["SET CONSTRAINTS", "set constraint check timing for the current transaction", "sql-set-constraints", sql_help_SET_CONSTRAINTS],
  ["SET ROLE", "set the current user identifier of the current session", "sql-set-role", sql_help_SET_ROLE],
  ["SET SESSION AUTHORIZATION", "set the session user identifier and the current user identifier of the current session", "sql-set-session-authorization", sql_help_SET_SESSION_AUTHORIZATION],
  ["SET TRANSACTION", "set the characteristics of the current transaction", "sql-set-transaction", sql_help_SET_TRANSACTION],
  ["SHOW", "show the value of a run-time parameter", "sql-show", sql_help_SHOW],
  ["START TRANSACTION", "start a transaction block", "sql-start-transaction", sql_help_START_TRANSACTION],
  ["TABLE", "retrieve rows from a table or view", "sql-select", sql_help_TABLE],
  ["TRUNCATE", "empty a table or set of tables", "sql-truncate", sql_help_TRUNCATE],
  ["UNLISTEN", "stop listening for a notification", "sql-unlisten", sql_help_UNLISTEN],
  ["UPDATE", "update rows of a table", "sql-update", sql_help_UPDATE],
  ["VACUUM", "garbage-collect and optionally analyze a database", "sql-vacuum", sql_help_VACUUM],
  ["VALUES", "compute a set of rows", "sql-values", sql_help_VALUES],
  ["WITH", "retrieve rows from a table or view", "sql-select", sql_help_WITH],
];


function sql_help_ABORT(buf) {
  appendPQExpBuffer(buf,
    "ABORT [ WORK | TRANSACTION ] [ AND [ NO ] CHAIN ]");
}

function sql_help_ALTER_AGGREGATE(buf) {
  appendPQExpBuffer(buf,
    "ALTER AGGREGATE %s ( %s ) RENAME TO %s\n" +
    "ALTER AGGREGATE %s ( %s )\n" +
    "                OWNER TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER }\n" +
    "ALTER AGGREGATE %s ( %s ) SET SCHEMA %s\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "* |\n" +
    "[ %s ] [ %s ] %s [ , ... ] |\n" +
    "[ [ %s ] [ %s ] %s [ , ... ] ] ORDER BY [ %s ] [ %s ] %s [ , ... ]",
    _("name"),
    _("aggregate_signature"),
    _("new_name"),
    _("name"),
    _("aggregate_signature"),
    _("new_owner"),
    _("name"),
    _("aggregate_signature"),
    _("new_schema"),
    _("where aggregate_signature is:"),
    _("argmode"),
    _("argname"),
    _("argtype"),
    _("argmode"),
    _("argname"),
    _("argtype"),
    _("argmode"),
    _("argname"),
    _("argtype"));
}

function sql_help_ALTER_COLLATION(buf) {
  appendPQExpBuffer(buf,
    "ALTER COLLATION %s REFRESH VERSION\n" +
    "\n" +
    "ALTER COLLATION %s RENAME TO %s\n" +
    "ALTER COLLATION %s OWNER TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER }\n" +
    "ALTER COLLATION %s SET SCHEMA %s",
    _("name"),
    _("name"),
    _("new_name"),
    _("name"),
    _("new_owner"),
    _("name"),
    _("new_schema"));
}

function sql_help_ALTER_CONVERSION(buf) {
  appendPQExpBuffer(buf,
    "ALTER CONVERSION %s RENAME TO %s\n" +
    "ALTER CONVERSION %s OWNER TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER }\n" +
    "ALTER CONVERSION %s SET SCHEMA %s",
    _("name"),
    _("new_name"),
    _("name"),
    _("new_owner"),
    _("name"),
    _("new_schema"));
}

function sql_help_ALTER_DATABASE(buf) {
  appendPQExpBuffer(buf,
    "ALTER DATABASE %s [ [ WITH ] %s [ ... ] ]\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "    ALLOW_CONNECTIONS %s\n" +
    "    CONNECTION LIMIT %s\n" +
    "    IS_TEMPLATE %s\n" +
    "\n" +
    "ALTER DATABASE %s RENAME TO %s\n" +
    "\n" +
    "ALTER DATABASE %s OWNER TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER }\n" +
    "\n" +
    "ALTER DATABASE %s SET TABLESPACE %s\n" +
    "\n" +
    "ALTER DATABASE %s REFRESH COLLATION VERSION\n" +
    "\n" +
    "ALTER DATABASE %s SET %s { TO | = } { %s | DEFAULT }\n" +
    "ALTER DATABASE %s SET %s FROM CURRENT\n" +
    "ALTER DATABASE %s RESET %s\n" +
    "ALTER DATABASE %s RESET ALL",
    _("name"),
    _("option"),
    _("where option can be:"),
    _("allowconn"),
    _("connlimit"),
    _("istemplate"),
    _("name"),
    _("new_name"),
    _("name"),
    _("new_owner"),
    _("name"),
    _("new_tablespace"),
    _("name"),
    _("name"),
    _("configuration_parameter"),
    _("value"),
    _("name"),
    _("configuration_parameter"),
    _("name"),
    _("configuration_parameter"),
    _("name"));
}

function sql_help_ALTER_DEFAULT_PRIVILEGES(buf) {
  appendPQExpBuffer(buf,
    "ALTER DEFAULT PRIVILEGES\n" +
    "    [ FOR { ROLE | USER } %s [, ...] ]\n" +
    "    [ IN SCHEMA %s [, ...] ]\n" +
    "    %s\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "GRANT { { SELECT | INSERT | UPDATE | DELETE | TRUNCATE | REFERENCES | TRIGGER }\n" +
    "    [, ...] | ALL [ PRIVILEGES ] }\n" +
    "    ON TABLES\n" +
    "    TO { [ GROUP ] %s | PUBLIC } [, ...] [ WITH GRANT OPTION ]\n" +
    "\n" +
    "GRANT { { USAGE | SELECT | UPDATE }\n" +
    "    [, ...] | ALL [ PRIVILEGES ] }\n" +
    "    ON SEQUENCES\n" +
    "    TO { [ GROUP ] %s | PUBLIC } [, ...] [ WITH GRANT OPTION ]\n" +
    "\n" +
    "GRANT { EXECUTE | ALL [ PRIVILEGES ] }\n" +
    "    ON { FUNCTIONS | ROUTINES }\n" +
    "    TO { [ GROUP ] %s | PUBLIC } [, ...] [ WITH GRANT OPTION ]\n" +
    "\n" +
    "GRANT { USAGE | ALL [ PRIVILEGES ] }\n" +
    "    ON TYPES\n" +
    "    TO { [ GROUP ] %s | PUBLIC } [, ...] [ WITH GRANT OPTION ]\n" +
    "\n" +
    "GRANT { USAGE | CREATE | ALL [ PRIVILEGES ] }\n" +
    "    ON SCHEMAS\n" +
    "    TO { [ GROUP ] %s | PUBLIC } [, ...] [ WITH GRANT OPTION ]\n" +
    "\n" +
    "REVOKE [ GRANT OPTION FOR ]\n" +
    "    { { SELECT | INSERT | UPDATE | DELETE | TRUNCATE | REFERENCES | TRIGGER }\n" +
    "    [, ...] | ALL [ PRIVILEGES ] }\n" +
    "    ON TABLES\n" +
    "    FROM { [ GROUP ] %s | PUBLIC } [, ...]\n" +
    "    [ CASCADE | RESTRICT ]\n" +
    "\n" +
    "REVOKE [ GRANT OPTION FOR ]\n" +
    "    { { USAGE | SELECT | UPDATE }\n" +
    "    [, ...] | ALL [ PRIVILEGES ] }\n" +
    "    ON SEQUENCES\n" +
    "    FROM { [ GROUP ] %s | PUBLIC } [, ...]\n" +
    "    [ CASCADE | RESTRICT ]\n" +
    "\n" +
    "REVOKE [ GRANT OPTION FOR ]\n" +
    "    { EXECUTE | ALL [ PRIVILEGES ] }\n" +
    "    ON { FUNCTIONS | ROUTINES }\n" +
    "    FROM { [ GROUP ] %s | PUBLIC } [, ...]\n" +
    "    [ CASCADE | RESTRICT ]\n" +
    "\n" +
    "REVOKE [ GRANT OPTION FOR ]\n" +
    "    { USAGE | ALL [ PRIVILEGES ] }\n" +
    "    ON TYPES\n" +
    "    FROM { [ GROUP ] %s | PUBLIC } [, ...]\n" +
    "    [ CASCADE | RESTRICT ]\n" +
    "\n" +
    "REVOKE [ GRANT OPTION FOR ]\n" +
    "    { USAGE | CREATE | ALL [ PRIVILEGES ] }\n" +
    "    ON SCHEMAS\n" +
    "    FROM { [ GROUP ] %s | PUBLIC } [, ...]\n" +
    "    [ CASCADE | RESTRICT ]",
    _("target_role"),
    _("schema_name"),
    _("abbreviated_grant_or_revoke"),
    _("where abbreviated_grant_or_revoke is one of:"),
    _("role_name"),
    _("role_name"),
    _("role_name"),
    _("role_name"),
    _("role_name"),
    _("role_name"),
    _("role_name"),
    _("role_name"),
    _("role_name"),
    _("role_name"));
}

function sql_help_ALTER_DOMAIN(buf) {
  appendPQExpBuffer(buf,
    "ALTER DOMAIN %s\n" +
    "    { SET DEFAULT %s | DROP DEFAULT }\n" +
    "ALTER DOMAIN %s\n" +
    "    { SET | DROP } NOT NULL\n" +
    "ALTER DOMAIN %s\n" +
    "    ADD %s [ NOT VALID ]\n" +
    "ALTER DOMAIN %s\n" +
    "    DROP CONSTRAINT [ IF EXISTS ] %s [ RESTRICT | CASCADE ]\n" +
    "ALTER DOMAIN %s\n" +
    "     RENAME CONSTRAINT %s TO %s\n" +
    "ALTER DOMAIN %s\n" +
    "    VALIDATE CONSTRAINT %s\n" +
    "ALTER DOMAIN %s\n" +
    "    OWNER TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER }\n" +
    "ALTER DOMAIN %s\n" +
    "    RENAME TO %s\n" +
    "ALTER DOMAIN %s\n" +
    "    SET SCHEMA %s",
    _("name"),
    _("expression"),
    _("name"),
    _("name"),
    _("domain_constraint"),
    _("name"),
    _("constraint_name"),
    _("name"),
    _("constraint_name"),
    _("new_constraint_name"),
    _("name"),
    _("constraint_name"),
    _("name"),
    _("new_owner"),
    _("name"),
    _("new_name"),
    _("name"),
    _("new_schema"));
}

function sql_help_ALTER_EVENT_TRIGGER(buf) {
  appendPQExpBuffer(buf,
    "ALTER EVENT TRIGGER %s DISABLE\n" +
    "ALTER EVENT TRIGGER %s ENABLE [ REPLICA | ALWAYS ]\n" +
    "ALTER EVENT TRIGGER %s OWNER TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER }\n" +
    "ALTER EVENT TRIGGER %s RENAME TO %s",
    _("name"),
    _("name"),
    _("name"),
    _("new_owner"),
    _("name"),
    _("new_name"));
}

function sql_help_ALTER_EXTENSION(buf) {
  appendPQExpBuffer(buf,
    "ALTER EXTENSION %s UPDATE [ TO %s ]\n" +
    "ALTER EXTENSION %s SET SCHEMA %s\n" +
    "ALTER EXTENSION %s ADD %s\n" +
    "ALTER EXTENSION %s DROP %s\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "  ACCESS METHOD %s |\n" +
    "  AGGREGATE %s ( %s ) |\n" +
    "  CAST (%s AS %s) |\n" +
    "  COLLATION %s |\n" +
    "  CONVERSION %s |\n" +
    "  DOMAIN %s |\n" +
    "  EVENT TRIGGER %s |\n" +
    "  FOREIGN DATA WRAPPER %s |\n" +
    "  FOREIGN TABLE %s |\n" +
    "  FUNCTION %s [ ( [ [ %s ] [ %s ] %s [, ...] ] ) ] |\n" +
    "  MATERIALIZED VIEW %s |\n" +
    "  OPERATOR %s (%s, %s) |\n" +
    "  OPERATOR CLASS %s USING %s |\n" +
    "  OPERATOR FAMILY %s USING %s |\n" +
    "  [ PROCEDURAL ] LANGUAGE %s |\n" +
    "  PROCEDURE %s [ ( [ [ %s ] [ %s ] %s [, ...] ] ) ] |\n" +
    "  ROUTINE %s [ ( [ [ %s ] [ %s ] %s [, ...] ] ) ] |\n" +
    "  SCHEMA %s |\n" +
    "  SEQUENCE %s |\n" +
    "  SERVER %s |\n" +
    "  TABLE %s |\n" +
    "  TEXT SEARCH CONFIGURATION %s |\n" +
    "  TEXT SEARCH DICTIONARY %s |\n" +
    "  TEXT SEARCH PARSER %s |\n" +
    "  TEXT SEARCH TEMPLATE %s |\n" +
    "  TRANSFORM FOR %s LANGUAGE %s |\n" +
    "  TYPE %s |\n" +
    "  VIEW %s\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "* |\n" +
    "[ %s ] [ %s ] %s [ , ... ] |\n" +
    "[ [ %s ] [ %s ] %s [ , ... ] ] ORDER BY [ %s ] [ %s ] %s [ , ... ]",
    _("name"),
    _("new_version"),
    _("name"),
    _("new_schema"),
    _("name"),
    _("member_object"),
    _("name"),
    _("member_object"),
    _("where member_object is:"),
    _("object_name"),
    _("aggregate_name"),
    _("aggregate_signature"),
    _("source_type"),
    _("target_type"),
    _("object_name"),
    _("object_name"),
    _("object_name"),
    _("object_name"),
    _("object_name"),
    _("object_name"),
    _("function_name"),
    _("argmode"),
    _("argname"),
    _("argtype"),
    _("object_name"),
    _("operator_name"),
    _("left_type"),
    _("right_type"),
    _("object_name"),
    _("index_method"),
    _("object_name"),
    _("index_method"),
    _("object_name"),
    _("procedure_name"),
    _("argmode"),
    _("argname"),
    _("argtype"),
    _("routine_name"),
    _("argmode"),
    _("argname"),
    _("argtype"),
    _("object_name"),
    _("object_name"),
    _("object_name"),
    _("object_name"),
    _("object_name"),
    _("object_name"),
    _("object_name"),
    _("object_name"),
    _("type_name"),
    _("lang_name"),
    _("object_name"),
    _("object_name"),
    _("and aggregate_signature is:"),
    _("argmode"),
    _("argname"),
    _("argtype"),
    _("argmode"),
    _("argname"),
    _("argtype"),
    _("argmode"),
    _("argname"),
    _("argtype"));
}

function sql_help_ALTER_FOREIGN_DATA_WRAPPER(buf) {
  appendPQExpBuffer(buf,
    "ALTER FOREIGN DATA WRAPPER %s\n" +
    "    [ HANDLER %s | NO HANDLER ]\n" +
    "    [ VALIDATOR %s | NO VALIDATOR ]\n" +
    "    [ OPTIONS ( [ ADD | SET | DROP ] %s ['%s'] [, ... ]) ]\n" +
    "ALTER FOREIGN DATA WRAPPER %s OWNER TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER }\n" +
    "ALTER FOREIGN DATA WRAPPER %s RENAME TO %s",
    _("name"),
    _("handler_function"),
    _("validator_function"),
    _("option"),
    _("value"),
    _("name"),
    _("new_owner"),
    _("name"),
    _("new_name"));
}

function sql_help_ALTER_FOREIGN_TABLE(buf) {
  appendPQExpBuffer(buf,
    "ALTER FOREIGN TABLE [ IF EXISTS ] [ ONLY ] %s [ * ]\n" +
    "    %s [, ... ]\n" +
    "ALTER FOREIGN TABLE [ IF EXISTS ] [ ONLY ] %s [ * ]\n" +
    "    RENAME [ COLUMN ] %s TO %s\n" +
    "ALTER FOREIGN TABLE [ IF EXISTS ] %s\n" +
    "    RENAME TO %s\n" +
    "ALTER FOREIGN TABLE [ IF EXISTS ] %s\n" +
    "    SET SCHEMA %s\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "    ADD [ COLUMN ] %s %s [ COLLATE %s ] [ %s [ ... ] ]\n" +
    "    DROP [ COLUMN ] [ IF EXISTS ] %s [ RESTRICT | CASCADE ]\n" +
    "    ALTER [ COLUMN ] %s [ SET DATA ] TYPE %s [ COLLATE %s ]\n" +
    "    ALTER [ COLUMN ] %s SET DEFAULT %s\n" +
    "    ALTER [ COLUMN ] %s DROP DEFAULT\n" +
    "    ALTER [ COLUMN ] %s { SET | DROP } NOT NULL\n" +
    "    ALTER [ COLUMN ] %s SET STATISTICS %s\n" +
    "    ALTER [ COLUMN ] %s SET ( %s = %s [, ... ] )\n" +
    "    ALTER [ COLUMN ] %s RESET ( %s [, ... ] )\n" +
    "    ALTER [ COLUMN ] %s SET STORAGE { PLAIN | EXTERNAL | EXTENDED | MAIN | DEFAULT }\n" +
    "    ALTER [ COLUMN ] %s OPTIONS ( [ ADD | SET | DROP ] %s ['%s'] [, ... ])\n" +
    "    ADD %s [ NOT VALID ]\n" +
    "    VALIDATE CONSTRAINT %s\n" +
    "    DROP CONSTRAINT [ IF EXISTS ]  %s [ RESTRICT | CASCADE ]\n" +
    "    DISABLE TRIGGER [ %s | ALL | USER ]\n" +
    "    ENABLE TRIGGER [ %s | ALL | USER ]\n" +
    "    ENABLE REPLICA TRIGGER %s\n" +
    "    ENABLE ALWAYS TRIGGER %s\n" +
    "    SET WITHOUT OIDS\n" +
    "    INHERIT %s\n" +
    "    NO INHERIT %s\n" +
    "    OWNER TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER }\n" +
    "    OPTIONS ( [ ADD | SET | DROP ] %s ['%s'] [, ... ])",
    _("name"),
    _("action"),
    _("name"),
    _("column_name"),
    _("new_column_name"),
    _("name"),
    _("new_name"),
    _("name"),
    _("new_schema"),
    _("where action is one of:"),
    _("column_name"),
    _("data_type"),
    _("collation"),
    _("column_constraint"),
    _("column_name"),
    _("column_name"),
    _("data_type"),
    _("collation"),
    _("column_name"),
    _("expression"),
    _("column_name"),
    _("column_name"),
    _("column_name"),
    _("integer"),
    _("column_name"),
    _("attribute_option"),
    _("value"),
    _("column_name"),
    _("attribute_option"),
    _("column_name"),
    _("column_name"),
    _("option"),
    _("value"),
    _("table_constraint"),
    _("constraint_name"),
    _("constraint_name"),
    _("trigger_name"),
    _("trigger_name"),
    _("trigger_name"),
    _("trigger_name"),
    _("parent_table"),
    _("parent_table"),
    _("new_owner"),
    _("option"),
    _("value"));
}

function sql_help_ALTER_FUNCTION(buf) {
  appendPQExpBuffer(buf,
    "ALTER FUNCTION %s [ ( [ [ %s ] [ %s ] %s [, ...] ] ) ]\n" +
    "    %s [ ... ] [ RESTRICT ]\n" +
    "ALTER FUNCTION %s [ ( [ [ %s ] [ %s ] %s [, ...] ] ) ]\n" +
    "    RENAME TO %s\n" +
    "ALTER FUNCTION %s [ ( [ [ %s ] [ %s ] %s [, ...] ] ) ]\n" +
    "    OWNER TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER }\n" +
    "ALTER FUNCTION %s [ ( [ [ %s ] [ %s ] %s [, ...] ] ) ]\n" +
    "    SET SCHEMA %s\n" +
    "ALTER FUNCTION %s [ ( [ [ %s ] [ %s ] %s [, ...] ] ) ]\n" +
    "    [ NO ] DEPENDS ON EXTENSION %s\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "    CALLED ON NULL INPUT | RETURNS NULL ON NULL INPUT | STRICT\n" +
    "    IMMUTABLE | STABLE | VOLATILE\n" +
    "    [ NOT ] LEAKPROOF\n" +
    "    [ EXTERNAL ] SECURITY INVOKER | [ EXTERNAL ] SECURITY DEFINER\n" +
    "    PARALLEL { UNSAFE | RESTRICTED | SAFE }\n" +
    "    COST %s\n" +
    "    ROWS %s\n" +
    "    SUPPORT %s\n" +
    "    SET %s { TO | = } { %s | DEFAULT }\n" +
    "    SET %s FROM CURRENT\n" +
    "    RESET %s\n" +
    "    RESET ALL",
    _("name"),
    _("argmode"),
    _("argname"),
    _("argtype"),
    _("action"),
    _("name"),
    _("argmode"),
    _("argname"),
    _("argtype"),
    _("new_name"),
    _("name"),
    _("argmode"),
    _("argname"),
    _("argtype"),
    _("new_owner"),
    _("name"),
    _("argmode"),
    _("argname"),
    _("argtype"),
    _("new_schema"),
    _("name"),
    _("argmode"),
    _("argname"),
    _("argtype"),
    _("extension_name"),
    _("where action is one of:"),
    _("execution_cost"),
    _("result_rows"),
    _("support_function"),
    _("configuration_parameter"),
    _("value"),
    _("configuration_parameter"),
    _("configuration_parameter"));
}

function sql_help_ALTER_GROUP(buf) {
  appendPQExpBuffer(buf,
    "ALTER GROUP %s ADD USER %s [, ... ]\n" +
    "ALTER GROUP %s DROP USER %s [, ... ]\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "    %s\n" +
    "  | CURRENT_ROLE\n" +
    "  | CURRENT_USER\n" +
    "  | SESSION_USER\n" +
    "\n" +
    "ALTER GROUP %s RENAME TO %s",
    _("role_specification"),
    _("user_name"),
    _("role_specification"),
    _("user_name"),
    _("where role_specification can be:"),
    _("role_name"),
    _("group_name"),
    _("new_name"));
}

function sql_help_ALTER_INDEX(buf) {
  appendPQExpBuffer(buf,
    "ALTER INDEX [ IF EXISTS ] %s RENAME TO %s\n" +
    "ALTER INDEX [ IF EXISTS ] %s SET TABLESPACE %s\n" +
    "ALTER INDEX %s ATTACH PARTITION %s\n" +
    "ALTER INDEX %s [ NO ] DEPENDS ON EXTENSION %s\n" +
    "ALTER INDEX [ IF EXISTS ] %s SET ( %s [= %s] [, ... ] )\n" +
    "ALTER INDEX [ IF EXISTS ] %s RESET ( %s [, ... ] )\n" +
    "ALTER INDEX [ IF EXISTS ] %s ALTER [ COLUMN ] %s\n" +
    "    SET STATISTICS %s\n" +
    "ALTER INDEX ALL IN TABLESPACE %s [ OWNED BY %s [, ... ] ]\n" +
    "    SET TABLESPACE %s [ NOWAIT ]",
    _("name"),
    _("new_name"),
    _("name"),
    _("tablespace_name"),
    _("name"),
    _("index_name"),
    _("name"),
    _("extension_name"),
    _("name"),
    _("storage_parameter"),
    _("value"),
    _("name"),
    _("storage_parameter"),
    _("name"),
    _("column_number"),
    _("integer"),
    _("name"),
    _("role_name"),
    _("new_tablespace"));
}

function sql_help_ALTER_LANGUAGE(buf) {
  appendPQExpBuffer(buf,
    "ALTER [ PROCEDURAL ] LANGUAGE %s RENAME TO %s\n" +
    "ALTER [ PROCEDURAL ] LANGUAGE %s OWNER TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER }",
    _("name"),
    _("new_name"),
    _("name"),
    _("new_owner"));
}

function sql_help_ALTER_LARGE_OBJECT(buf) {
  appendPQExpBuffer(buf,
    "ALTER LARGE OBJECT %s OWNER TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER }",
    _("large_object_oid"),
    _("new_owner"));
}

function sql_help_ALTER_MATERIALIZED_VIEW(buf) {
  appendPQExpBuffer(buf,
    "ALTER MATERIALIZED VIEW [ IF EXISTS ] %s\n" +
    "    %s [, ... ]\n" +
    "ALTER MATERIALIZED VIEW %s\n" +
    "    [ NO ] DEPENDS ON EXTENSION %s\n" +
    "ALTER MATERIALIZED VIEW [ IF EXISTS ] %s\n" +
    "    RENAME [ COLUMN ] %s TO %s\n" +
    "ALTER MATERIALIZED VIEW [ IF EXISTS ] %s\n" +
    "    RENAME TO %s\n" +
    "ALTER MATERIALIZED VIEW [ IF EXISTS ] %s\n" +
    "    SET SCHEMA %s\n" +
    "ALTER MATERIALIZED VIEW ALL IN TABLESPACE %s [ OWNED BY %s [, ... ] ]\n" +
    "    SET TABLESPACE %s [ NOWAIT ]\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "    ALTER [ COLUMN ] %s SET STATISTICS %s\n" +
    "    ALTER [ COLUMN ] %s SET ( %s = %s [, ... ] )\n" +
    "    ALTER [ COLUMN ] %s RESET ( %s [, ... ] )\n" +
    "    ALTER [ COLUMN ] %s SET STORAGE { PLAIN | EXTERNAL | EXTENDED | MAIN | DEFAULT }\n" +
    "    ALTER [ COLUMN ] %s SET COMPRESSION %s\n" +
    "    CLUSTER ON %s\n" +
    "    SET WITHOUT CLUSTER\n" +
    "    SET ACCESS METHOD %s\n" +
    "    SET TABLESPACE %s\n" +
    "    SET ( %s [= %s] [, ... ] )\n" +
    "    RESET ( %s [, ... ] )\n" +
    "    OWNER TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER }",
    _("name"),
    _("action"),
    _("name"),
    _("extension_name"),
    _("name"),
    _("column_name"),
    _("new_column_name"),
    _("name"),
    _("new_name"),
    _("name"),
    _("new_schema"),
    _("name"),
    _("role_name"),
    _("new_tablespace"),
    _("where action is one of:"),
    _("column_name"),
    _("integer"),
    _("column_name"),
    _("attribute_option"),
    _("value"),
    _("column_name"),
    _("attribute_option"),
    _("column_name"),
    _("column_name"),
    _("compression_method"),
    _("index_name"),
    _("new_access_method"),
    _("new_tablespace"),
    _("storage_parameter"),
    _("value"),
    _("storage_parameter"),
    _("new_owner"));
}

function sql_help_ALTER_OPERATOR(buf) {
  appendPQExpBuffer(buf,
    "ALTER OPERATOR %s ( { %s | NONE } , %s )\n" +
    "    OWNER TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER }\n" +
    "\n" +
    "ALTER OPERATOR %s ( { %s | NONE } , %s )\n" +
    "    SET SCHEMA %s\n" +
    "\n" +
    "ALTER OPERATOR %s ( { %s | NONE } , %s )\n" +
    "    SET ( {  RESTRICT = { %s | NONE }\n" +
    "           | JOIN = { %s | NONE }\n" +
    "         } [, ... ] )",
    _("name"),
    _("left_type"),
    _("right_type"),
    _("new_owner"),
    _("name"),
    _("left_type"),
    _("right_type"),
    _("new_schema"),
    _("name"),
    _("left_type"),
    _("right_type"),
    _("res_proc"),
    _("join_proc"));
}

function sql_help_ALTER_OPERATOR_CLASS(buf) {
  appendPQExpBuffer(buf,
    "ALTER OPERATOR CLASS %s USING %s\n" +
    "    RENAME TO %s\n" +
    "\n" +
    "ALTER OPERATOR CLASS %s USING %s\n" +
    "    OWNER TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER }\n" +
    "\n" +
    "ALTER OPERATOR CLASS %s USING %s\n" +
    "    SET SCHEMA %s",
    _("name"),
    _("index_method"),
    _("new_name"),
    _("name"),
    _("index_method"),
    _("new_owner"),
    _("name"),
    _("index_method"),
    _("new_schema"));
}

function sql_help_ALTER_OPERATOR_FAMILY(buf) {
  appendPQExpBuffer(buf,
    "ALTER OPERATOR FAMILY %s USING %s ADD\n" +
    "  {  OPERATOR %s %s ( %s, %s )\n" +
    "              [ FOR SEARCH | FOR ORDER BY %s ]\n" +
    "   | FUNCTION %s [ ( %s [ , %s ] ) ]\n" +
    "              %s [ ( %s [, ...] ) ]\n" +
    "  } [, ... ]\n" +
    "\n" +
    "ALTER OPERATOR FAMILY %s USING %s DROP\n" +
    "  {  OPERATOR %s ( %s [ , %s ] )\n" +
    "   | FUNCTION %s ( %s [ , %s ] )\n" +
    "  } [, ... ]\n" +
    "\n" +
    "ALTER OPERATOR FAMILY %s USING %s\n" +
    "    RENAME TO %s\n" +
    "\n" +
    "ALTER OPERATOR FAMILY %s USING %s\n" +
    "    OWNER TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER }\n" +
    "\n" +
    "ALTER OPERATOR FAMILY %s USING %s\n" +
    "    SET SCHEMA %s",
    _("name"),
    _("index_method"),
    _("strategy_number"),
    _("operator_name"),
    _("op_type"),
    _("op_type"),
    _("sort_family_name"),
    _("support_number"),
    _("op_type"),
    _("op_type"),
    _("function_name"),
    _("argument_type"),
    _("name"),
    _("index_method"),
    _("strategy_number"),
    _("op_type"),
    _("op_type"),
    _("support_number"),
    _("op_type"),
    _("op_type"),
    _("name"),
    _("index_method"),
    _("new_name"),
    _("name"),
    _("index_method"),
    _("new_owner"),
    _("name"),
    _("index_method"),
    _("new_schema"));
}

function sql_help_ALTER_POLICY(buf) {
  appendPQExpBuffer(buf,
    "ALTER POLICY %s ON %s RENAME TO %s\n" +
    "\n" +
    "ALTER POLICY %s ON %s\n" +
    "    [ TO { %s | PUBLIC | CURRENT_ROLE | CURRENT_USER | SESSION_USER } [, ...] ]\n" +
    "    [ USING ( %s ) ]\n" +
    "    [ WITH CHECK ( %s ) ]",
    _("name"),
    _("table_name"),
    _("new_name"),
    _("name"),
    _("table_name"),
    _("role_name"),
    _("using_expression"),
    _("check_expression"));
}

function sql_help_ALTER_PROCEDURE(buf) {
  appendPQExpBuffer(buf,
    "ALTER PROCEDURE %s [ ( [ [ %s ] [ %s ] %s [, ...] ] ) ]\n" +
    "    %s [ ... ] [ RESTRICT ]\n" +
    "ALTER PROCEDURE %s [ ( [ [ %s ] [ %s ] %s [, ...] ] ) ]\n" +
    "    RENAME TO %s\n" +
    "ALTER PROCEDURE %s [ ( [ [ %s ] [ %s ] %s [, ...] ] ) ]\n" +
    "    OWNER TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER }\n" +
    "ALTER PROCEDURE %s [ ( [ [ %s ] [ %s ] %s [, ...] ] ) ]\n" +
    "    SET SCHEMA %s\n" +
    "ALTER PROCEDURE %s [ ( [ [ %s ] [ %s ] %s [, ...] ] ) ]\n" +
    "    [ NO ] DEPENDS ON EXTENSION %s\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "    [ EXTERNAL ] SECURITY INVOKER | [ EXTERNAL ] SECURITY DEFINER\n" +
    "    SET %s { TO | = } { %s | DEFAULT }\n" +
    "    SET %s FROM CURRENT\n" +
    "    RESET %s\n" +
    "    RESET ALL",
    _("name"),
    _("argmode"),
    _("argname"),
    _("argtype"),
    _("action"),
    _("name"),
    _("argmode"),
    _("argname"),
    _("argtype"),
    _("new_name"),
    _("name"),
    _("argmode"),
    _("argname"),
    _("argtype"),
    _("new_owner"),
    _("name"),
    _("argmode"),
    _("argname"),
    _("argtype"),
    _("new_schema"),
    _("name"),
    _("argmode"),
    _("argname"),
    _("argtype"),
    _("extension_name"),
    _("where action is one of:"),
    _("configuration_parameter"),
    _("value"),
    _("configuration_parameter"),
    _("configuration_parameter"));
}

function sql_help_ALTER_PUBLICATION(buf) {
  appendPQExpBuffer(buf,
    "ALTER PUBLICATION %s ADD %s [, ...]\n" +
    "ALTER PUBLICATION %s SET %s [, ...]\n" +
    "ALTER PUBLICATION %s DROP %s [, ...]\n" +
    "ALTER PUBLICATION %s SET ( %s [= %s] [, ... ] )\n" +
    "ALTER PUBLICATION %s OWNER TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER }\n" +
    "ALTER PUBLICATION %s RENAME TO %s\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "    TABLE [ ONLY ] %s [ * ] [ ( %s [, ... ] ) ] [ WHERE ( %s ) ] [, ... ]\n" +
    "    TABLES IN SCHEMA { %s | CURRENT_SCHEMA } [, ... ]",
    _("name"),
    _("publication_object"),
    _("name"),
    _("publication_object"),
    _("name"),
    _("publication_object"),
    _("name"),
    _("publication_parameter"),
    _("value"),
    _("name"),
    _("new_owner"),
    _("name"),
    _("new_name"),
    _("where publication_object is one of:"),
    _("table_name"),
    _("column_name"),
    _("expression"),
    _("schema_name"));
}

function sql_help_ALTER_ROLE(buf) {
  appendPQExpBuffer(buf,
    "ALTER ROLE %s [ WITH ] %s [ ... ]\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "      SUPERUSER | NOSUPERUSER\n" +
    "    | CREATEDB | NOCREATEDB\n" +
    "    | CREATEROLE | NOCREATEROLE\n" +
    "    | INHERIT | NOINHERIT\n" +
    "    | LOGIN | NOLOGIN\n" +
    "    | REPLICATION | NOREPLICATION\n" +
    "    | BYPASSRLS | NOBYPASSRLS\n" +
    "    | CONNECTION LIMIT %s\n" +
    "    | [ ENCRYPTED ] PASSWORD '%s' | PASSWORD NULL\n" +
    "    | VALID UNTIL '%s'\n" +
    "\n" +
    "ALTER ROLE %s RENAME TO %s\n" +
    "\n" +
    "ALTER ROLE { %s | ALL } [ IN DATABASE %s ] SET %s { TO | = } { %s | DEFAULT }\n" +
    "ALTER ROLE { %s | ALL } [ IN DATABASE %s ] SET %s FROM CURRENT\n" +
    "ALTER ROLE { %s | ALL } [ IN DATABASE %s ] RESET %s\n" +
    "ALTER ROLE { %s | ALL } [ IN DATABASE %s ] RESET ALL\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "    %s\n" +
    "  | CURRENT_ROLE\n" +
    "  | CURRENT_USER\n" +
    "  | SESSION_USER",
    _("role_specification"),
    _("option"),
    _("where option can be:"),
    _("connlimit"),
    _("password"),
    _("timestamp"),
    _("name"),
    _("new_name"),
    _("role_specification"),
    _("database_name"),
    _("configuration_parameter"),
    _("value"),
    _("role_specification"),
    _("database_name"),
    _("configuration_parameter"),
    _("role_specification"),
    _("database_name"),
    _("configuration_parameter"),
    _("role_specification"),
    _("database_name"),
    _("where role_specification can be:"),
    _("role_name"));
}

function sql_help_ALTER_ROUTINE(buf) {
  appendPQExpBuffer(buf,
    "ALTER ROUTINE %s [ ( [ [ %s ] [ %s ] %s [, ...] ] ) ]\n" +
    "    %s [ ... ] [ RESTRICT ]\n" +
    "ALTER ROUTINE %s [ ( [ [ %s ] [ %s ] %s [, ...] ] ) ]\n" +
    "    RENAME TO %s\n" +
    "ALTER ROUTINE %s [ ( [ [ %s ] [ %s ] %s [, ...] ] ) ]\n" +
    "    OWNER TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER }\n" +
    "ALTER ROUTINE %s [ ( [ [ %s ] [ %s ] %s [, ...] ] ) ]\n" +
    "    SET SCHEMA %s\n" +
    "ALTER ROUTINE %s [ ( [ [ %s ] [ %s ] %s [, ...] ] ) ]\n" +
    "    [ NO ] DEPENDS ON EXTENSION %s\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "    IMMUTABLE | STABLE | VOLATILE\n" +
    "    [ NOT ] LEAKPROOF\n" +
    "    [ EXTERNAL ] SECURITY INVOKER | [ EXTERNAL ] SECURITY DEFINER\n" +
    "    PARALLEL { UNSAFE | RESTRICTED | SAFE }\n" +
    "    COST %s\n" +
    "    ROWS %s\n" +
    "    SET %s { TO | = } { %s | DEFAULT }\n" +
    "    SET %s FROM CURRENT\n" +
    "    RESET %s\n" +
    "    RESET ALL",
    _("name"),
    _("argmode"),
    _("argname"),
    _("argtype"),
    _("action"),
    _("name"),
    _("argmode"),
    _("argname"),
    _("argtype"),
    _("new_name"),
    _("name"),
    _("argmode"),
    _("argname"),
    _("argtype"),
    _("new_owner"),
    _("name"),
    _("argmode"),
    _("argname"),
    _("argtype"),
    _("new_schema"),
    _("name"),
    _("argmode"),
    _("argname"),
    _("argtype"),
    _("extension_name"),
    _("where action is one of:"),
    _("execution_cost"),
    _("result_rows"),
    _("configuration_parameter"),
    _("value"),
    _("configuration_parameter"),
    _("configuration_parameter"));
}

function sql_help_ALTER_RULE(buf) {
  appendPQExpBuffer(buf,
    "ALTER RULE %s ON %s RENAME TO %s",
    _("name"),
    _("table_name"),
    _("new_name"));
}

function sql_help_ALTER_SCHEMA(buf) {
  appendPQExpBuffer(buf,
    "ALTER SCHEMA %s RENAME TO %s\n" +
    "ALTER SCHEMA %s OWNER TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER }",
    _("name"),
    _("new_name"),
    _("name"),
    _("new_owner"));
}

function sql_help_ALTER_SEQUENCE(buf) {
  appendPQExpBuffer(buf,
    "ALTER SEQUENCE [ IF EXISTS ] %s\n" +
    "    [ AS %s ]\n" +
    "    [ INCREMENT [ BY ] %s ]\n" +
    "    [ MINVALUE %s | NO MINVALUE ] [ MAXVALUE %s | NO MAXVALUE ]\n" +
    "    [ START [ WITH ] %s ]\n" +
    "    [ RESTART [ [ WITH ] %s ] ]\n" +
    "    [ CACHE %s ] [ [ NO ] CYCLE ]\n" +
    "    [ OWNED BY { %s.%s | NONE } ]\n" +
    "ALTER SEQUENCE [ IF EXISTS ] %s SET { LOGGED | UNLOGGED }\n" +
    "ALTER SEQUENCE [ IF EXISTS ] %s OWNER TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER }\n" +
    "ALTER SEQUENCE [ IF EXISTS ] %s RENAME TO %s\n" +
    "ALTER SEQUENCE [ IF EXISTS ] %s SET SCHEMA %s",
    _("name"),
    _("data_type"),
    _("increment"),
    _("minvalue"),
    _("maxvalue"),
    _("start"),
    _("restart"),
    _("cache"),
    _("table_name"),
    _("column_name"),
    _("name"),
    _("name"),
    _("new_owner"),
    _("name"),
    _("new_name"),
    _("name"),
    _("new_schema"));
}

function sql_help_ALTER_SERVER(buf) {
  appendPQExpBuffer(buf,
    "ALTER SERVER %s [ VERSION '%s' ]\n" +
    "    [ OPTIONS ( [ ADD | SET | DROP ] %s ['%s'] [, ... ] ) ]\n" +
    "ALTER SERVER %s OWNER TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER }\n" +
    "ALTER SERVER %s RENAME TO %s",
    _("name"),
    _("new_version"),
    _("option"),
    _("value"),
    _("name"),
    _("new_owner"),
    _("name"),
    _("new_name"));
}

function sql_help_ALTER_STATISTICS(buf) {
  appendPQExpBuffer(buf,
    "ALTER STATISTICS %s OWNER TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER }\n" +
    "ALTER STATISTICS %s RENAME TO %s\n" +
    "ALTER STATISTICS %s SET SCHEMA %s\n" +
    "ALTER STATISTICS %s SET STATISTICS %s",
    _("name"),
    _("new_owner"),
    _("name"),
    _("new_name"),
    _("name"),
    _("new_schema"),
    _("name"),
    _("new_target"));
}

function sql_help_ALTER_SUBSCRIPTION(buf) {
  appendPQExpBuffer(buf,
    "ALTER SUBSCRIPTION %s CONNECTION '%s'\n" +
    "ALTER SUBSCRIPTION %s SET PUBLICATION %s [, ...] [ WITH ( %s [= %s] [, ... ] ) ]\n" +
    "ALTER SUBSCRIPTION %s ADD PUBLICATION %s [, ...] [ WITH ( %s [= %s] [, ... ] ) ]\n" +
    "ALTER SUBSCRIPTION %s DROP PUBLICATION %s [, ...] [ WITH ( %s [= %s] [, ... ] ) ]\n" +
    "ALTER SUBSCRIPTION %s REFRESH PUBLICATION [ WITH ( %s [= %s] [, ... ] ) ]\n" +
    "ALTER SUBSCRIPTION %s ENABLE\n" +
    "ALTER SUBSCRIPTION %s DISABLE\n" +
    "ALTER SUBSCRIPTION %s SET ( %s [= %s] [, ... ] )\n" +
    "ALTER SUBSCRIPTION %s SKIP ( %s = %s )\n" +
    "ALTER SUBSCRIPTION %s OWNER TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER }\n" +
    "ALTER SUBSCRIPTION %s RENAME TO %s",
    _("name"),
    _("conninfo"),
    _("name"),
    _("publication_name"),
    _("publication_option"),
    _("value"),
    _("name"),
    _("publication_name"),
    _("publication_option"),
    _("value"),
    _("name"),
    _("publication_name"),
    _("publication_option"),
    _("value"),
    _("name"),
    _("refresh_option"),
    _("value"),
    _("name"),
    _("name"),
    _("name"),
    _("subscription_parameter"),
    _("value"),
    _("name"),
    _("skip_option"),
    _("value"),
    _("name"),
    _("new_owner"),
    _("name"),
    _("new_name"));
}

function sql_help_ALTER_SYSTEM(buf) {
  appendPQExpBuffer(buf,
    "ALTER SYSTEM SET %s { TO | = } { %s | '%s' | DEFAULT }\n" +
    "\n" +
    "ALTER SYSTEM RESET %s\n" +
    "ALTER SYSTEM RESET ALL",
    _("configuration_parameter"),
    _("value"),
    _("value"),
    _("configuration_parameter"));
}

function sql_help_ALTER_TABLE(buf) {
  appendPQExpBuffer(buf,
    "ALTER TABLE [ IF EXISTS ] [ ONLY ] %s [ * ]\n" +
    "    %s [, ... ]\n" +
    "ALTER TABLE [ IF EXISTS ] [ ONLY ] %s [ * ]\n" +
    "    RENAME [ COLUMN ] %s TO %s\n" +
    "ALTER TABLE [ IF EXISTS ] [ ONLY ] %s [ * ]\n" +
    "    RENAME CONSTRAINT %s TO %s\n" +
    "ALTER TABLE [ IF EXISTS ] %s\n" +
    "    RENAME TO %s\n" +
    "ALTER TABLE [ IF EXISTS ] %s\n" +
    "    SET SCHEMA %s\n" +
    "ALTER TABLE ALL IN TABLESPACE %s [ OWNED BY %s [, ... ] ]\n" +
    "    SET TABLESPACE %s [ NOWAIT ]\n" +
    "ALTER TABLE [ IF EXISTS ] %s\n" +
    "    ATTACH PARTITION %s { FOR VALUES %s | DEFAULT }\n" +
    "ALTER TABLE [ IF EXISTS ] %s\n" +
    "    DETACH PARTITION %s [ CONCURRENTLY | FINALIZE ]\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "    ADD [ COLUMN ] [ IF NOT EXISTS ] %s %s [ COLLATE %s ] [ %s [ ... ] ]\n" +
    "    DROP [ COLUMN ] [ IF EXISTS ] %s [ RESTRICT | CASCADE ]\n" +
    "    ALTER [ COLUMN ] %s [ SET DATA ] TYPE %s [ COLLATE %s ] [ USING %s ]\n" +
    "    ALTER [ COLUMN ] %s SET DEFAULT %s\n" +
    "    ALTER [ COLUMN ] %s DROP DEFAULT\n" +
    "    ALTER [ COLUMN ] %s { SET | DROP } NOT NULL\n" +
    "    ALTER [ COLUMN ] %s DROP EXPRESSION [ IF EXISTS ]\n" +
    "    ALTER [ COLUMN ] %s ADD GENERATED { ALWAYS | BY DEFAULT } AS IDENTITY [ ( %s ) ]\n" +
    "    ALTER [ COLUMN ] %s { SET GENERATED { ALWAYS | BY DEFAULT } | SET %s | RESTART [ [ WITH ] %s ] } [...]\n" +
    "    ALTER [ COLUMN ] %s DROP IDENTITY [ IF EXISTS ]\n" +
    "    ALTER [ COLUMN ] %s SET STATISTICS %s\n" +
    "    ALTER [ COLUMN ] %s SET ( %s = %s [, ... ] )\n" +
    "    ALTER [ COLUMN ] %s RESET ( %s [, ... ] )\n" +
    "    ALTER [ COLUMN ] %s SET STORAGE { PLAIN | EXTERNAL | EXTENDED | MAIN | DEFAULT }\n" +
    "    ALTER [ COLUMN ] %s SET COMPRESSION %s\n" +
    "    ADD %s [ NOT VALID ]\n" +
    "    ADD %s\n" +
    "    ALTER CONSTRAINT %s [ DEFERRABLE | NOT DEFERRABLE ] [ INITIALLY DEFERRED | INITIALLY IMMEDIATE ]\n" +
    "    VALIDATE CONSTRAINT %s\n" +
    "    DROP CONSTRAINT [ IF EXISTS ]  %s [ RESTRICT | CASCADE ]\n" +
    "    DISABLE TRIGGER [ %s | ALL | USER ]\n" +
    "    ENABLE TRIGGER [ %s | ALL | USER ]\n" +
    "    ENABLE REPLICA TRIGGER %s\n" +
    "    ENABLE ALWAYS TRIGGER %s\n" +
    "    DISABLE RULE %s\n" +
    "    ENABLE RULE %s\n" +
    "    ENABLE REPLICA RULE %s\n" +
    "    ENABLE ALWAYS RULE %s\n" +
    "    DISABLE ROW LEVEL SECURITY\n" +
    "    ENABLE ROW LEVEL SECURITY\n" +
    "    FORCE ROW LEVEL SECURITY\n" +
    "    NO FORCE ROW LEVEL SECURITY\n" +
    "    CLUSTER ON %s\n" +
    "    SET WITHOUT CLUSTER\n" +
    "    SET WITHOUT OIDS\n" +
    "    SET ACCESS METHOD %s\n" +
    "    SET TABLESPACE %s\n" +
    "    SET { LOGGED | UNLOGGED }\n" +
    "    SET ( %s [= %s] [, ... ] )\n" +
    "    RESET ( %s [, ... ] )\n" +
    "    INHERIT %s\n" +
    "    NO INHERIT %s\n" +
    "    OF %s\n" +
    "    NOT OF\n" +
    "    OWNER TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER }\n" +
    "    REPLICA IDENTITY { DEFAULT | USING INDEX %s | FULL | NOTHING }\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "IN ( %s [, ...] ) |\n" +
    "FROM ( { %s | MINVALUE | MAXVALUE } [, ...] )\n" +
    "  TO ( { %s | MINVALUE | MAXVALUE } [, ...] ) |\n" +
    "WITH ( MODULUS %s, REMAINDER %s )\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "[ CONSTRAINT %s ]\n" +
    "{ NOT NULL |\n" +
    "  NULL |\n" +
    "  CHECK ( %s ) [ NO INHERIT ] |\n" +
    "  DEFAULT %s |\n" +
    "  GENERATED ALWAYS AS ( %s ) STORED |\n" +
    "  GENERATED { ALWAYS | BY DEFAULT } AS IDENTITY [ ( %s ) ] |\n" +
    "  UNIQUE [ NULLS [ NOT ] DISTINCT ] %s |\n" +
    "  PRIMARY KEY %s |\n" +
    "  REFERENCES %s [ ( %s ) ] [ MATCH FULL | MATCH PARTIAL | MATCH SIMPLE ]\n" +
    "    [ ON DELETE %s ] [ ON UPDATE %s ] }\n" +
    "[ DEFERRABLE | NOT DEFERRABLE ] [ INITIALLY DEFERRED | INITIALLY IMMEDIATE ]\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "[ CONSTRAINT %s ]\n" +
    "{ CHECK ( %s ) [ NO INHERIT ] |\n" +
    "  NOT NULL %s [ NO INHERIT ] |\n" +
    "  UNIQUE [ NULLS [ NOT ] DISTINCT ] ( %s [, ... ] ) %s |\n" +
    "  PRIMARY KEY ( %s [, ... ] ) %s |\n" +
    "  EXCLUDE [ USING %s ] ( %s WITH %s [, ... ] ) %s [ WHERE ( %s ) ] |\n" +
    "  FOREIGN KEY ( %s [, ... ] ) REFERENCES %s [ ( %s [, ... ] ) ]\n" +
    "    [ MATCH FULL | MATCH PARTIAL | MATCH SIMPLE ] [ ON DELETE %s ] [ ON UPDATE %s ] }\n" +
    "[ DEFERRABLE | NOT DEFERRABLE ] [ INITIALLY DEFERRED | INITIALLY IMMEDIATE ]\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "    [ CONSTRAINT %s ]\n" +
    "    { UNIQUE | PRIMARY KEY } USING INDEX %s\n" +
    "    [ DEFERRABLE | NOT DEFERRABLE ] [ INITIALLY DEFERRED | INITIALLY IMMEDIATE ]\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "[ INCLUDE ( %s [, ... ] ) ]\n" +
    "[ WITH ( %s [= %s] [, ... ] ) ]\n" +
    "[ USING INDEX TABLESPACE %s ]\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "{ %s | ( %s ) } [ %s ] [ ASC | DESC ] [ NULLS { FIRST | LAST } ]\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "{ NO ACTION | RESTRICT | CASCADE | SET NULL [ ( %s [, ... ] ) ] | SET DEFAULT [ ( %s [, ... ] ) ] }",
    _("name"),
    _("action"),
    _("name"),
    _("column_name"),
    _("new_column_name"),
    _("name"),
    _("constraint_name"),
    _("new_constraint_name"),
    _("name"),
    _("new_name"),
    _("name"),
    _("new_schema"),
    _("name"),
    _("role_name"),
    _("new_tablespace"),
    _("name"),
    _("partition_name"),
    _("partition_bound_spec"),
    _("name"),
    _("partition_name"),
    _("where action is one of:"),
    _("column_name"),
    _("data_type"),
    _("collation"),
    _("column_constraint"),
    _("column_name"),
    _("column_name"),
    _("data_type"),
    _("collation"),
    _("expression"),
    _("column_name"),
    _("expression"),
    _("column_name"),
    _("column_name"),
    _("column_name"),
    _("column_name"),
    _("sequence_options"),
    _("column_name"),
    _("sequence_option"),
    _("restart"),
    _("column_name"),
    _("column_name"),
    _("integer"),
    _("column_name"),
    _("attribute_option"),
    _("value"),
    _("column_name"),
    _("attribute_option"),
    _("column_name"),
    _("column_name"),
    _("compression_method"),
    _("table_constraint"),
    _("table_constraint_using_index"),
    _("constraint_name"),
    _("constraint_name"),
    _("constraint_name"),
    _("trigger_name"),
    _("trigger_name"),
    _("trigger_name"),
    _("trigger_name"),
    _("rewrite_rule_name"),
    _("rewrite_rule_name"),
    _("rewrite_rule_name"),
    _("rewrite_rule_name"),
    _("index_name"),
    _("new_access_method"),
    _("new_tablespace"),
    _("storage_parameter"),
    _("value"),
    _("storage_parameter"),
    _("parent_table"),
    _("parent_table"),
    _("type_name"),
    _("new_owner"),
    _("index_name"),
    _("and partition_bound_spec is:"),
    _("partition_bound_expr"),
    _("partition_bound_expr"),
    _("partition_bound_expr"),
    _("numeric_literal"),
    _("numeric_literal"),
    _("and column_constraint is:"),
    _("constraint_name"),
    _("expression"),
    _("default_expr"),
    _("generation_expr"),
    _("sequence_options"),
    _("index_parameters"),
    _("index_parameters"),
    _("reftable"),
    _("refcolumn"),
    _("referential_action"),
    _("referential_action"),
    _("and table_constraint is:"),
    _("constraint_name"),
    _("expression"),
    _("column_name"),
    _("column_name"),
    _("index_parameters"),
    _("column_name"),
    _("index_parameters"),
    _("index_method"),
    _("exclude_element"),
    _("operator"),
    _("index_parameters"),
    _("predicate"),
    _("column_name"),
    _("reftable"),
    _("refcolumn"),
    _("referential_action"),
    _("referential_action"),
    _("and table_constraint_using_index is:"),
    _("constraint_name"),
    _("index_name"),
    _("index_parameters in UNIQUE, PRIMARY KEY, and EXCLUDE constraints are:"),
    _("column_name"),
    _("storage_parameter"),
    _("value"),
    _("tablespace_name"),
    _("exclude_element in an EXCLUDE constraint is:"),
    _("column_name"),
    _("expression"),
    _("opclass"),
    _("referential_action in a FOREIGN KEY/REFERENCES constraint is:"),
    _("column_name"),
    _("column_name"));
}

function sql_help_ALTER_TABLESPACE(buf) {
  appendPQExpBuffer(buf,
    "ALTER TABLESPACE %s RENAME TO %s\n" +
    "ALTER TABLESPACE %s OWNER TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER }\n" +
    "ALTER TABLESPACE %s SET ( %s = %s [, ... ] )\n" +
    "ALTER TABLESPACE %s RESET ( %s [, ... ] )",
    _("name"),
    _("new_name"),
    _("name"),
    _("new_owner"),
    _("name"),
    _("tablespace_option"),
    _("value"),
    _("name"),
    _("tablespace_option"));
}

function sql_help_ALTER_TEXT_SEARCH_CONFIGURATION(buf) {
  appendPQExpBuffer(buf,
    "ALTER TEXT SEARCH CONFIGURATION %s\n" +
    "    ADD MAPPING FOR %s [, ... ] WITH %s [, ... ]\n" +
    "ALTER TEXT SEARCH CONFIGURATION %s\n" +
    "    ALTER MAPPING FOR %s [, ... ] WITH %s [, ... ]\n" +
    "ALTER TEXT SEARCH CONFIGURATION %s\n" +
    "    ALTER MAPPING REPLACE %s WITH %s\n" +
    "ALTER TEXT SEARCH CONFIGURATION %s\n" +
    "    ALTER MAPPING FOR %s [, ... ] REPLACE %s WITH %s\n" +
    "ALTER TEXT SEARCH CONFIGURATION %s\n" +
    "    DROP MAPPING [ IF EXISTS ] FOR %s [, ... ]\n" +
    "ALTER TEXT SEARCH CONFIGURATION %s RENAME TO %s\n" +
    "ALTER TEXT SEARCH CONFIGURATION %s OWNER TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER }\n" +
    "ALTER TEXT SEARCH CONFIGURATION %s SET SCHEMA %s",
    _("name"),
    _("token_type"),
    _("dictionary_name"),
    _("name"),
    _("token_type"),
    _("dictionary_name"),
    _("name"),
    _("old_dictionary"),
    _("new_dictionary"),
    _("name"),
    _("token_type"),
    _("old_dictionary"),
    _("new_dictionary"),
    _("name"),
    _("token_type"),
    _("name"),
    _("new_name"),
    _("name"),
    _("new_owner"),
    _("name"),
    _("new_schema"));
}

function sql_help_ALTER_TEXT_SEARCH_DICTIONARY(buf) {
  appendPQExpBuffer(buf,
    "ALTER TEXT SEARCH DICTIONARY %s (\n" +
    "    %s [ = %s ] [, ... ]\n" +
    ")\n" +
    "ALTER TEXT SEARCH DICTIONARY %s RENAME TO %s\n" +
    "ALTER TEXT SEARCH DICTIONARY %s OWNER TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER }\n" +
    "ALTER TEXT SEARCH DICTIONARY %s SET SCHEMA %s",
    _("name"),
    _("option"),
    _("value"),
    _("name"),
    _("new_name"),
    _("name"),
    _("new_owner"),
    _("name"),
    _("new_schema"));
}

function sql_help_ALTER_TEXT_SEARCH_PARSER(buf) {
  appendPQExpBuffer(buf,
    "ALTER TEXT SEARCH PARSER %s RENAME TO %s\n" +
    "ALTER TEXT SEARCH PARSER %s SET SCHEMA %s",
    _("name"),
    _("new_name"),
    _("name"),
    _("new_schema"));
}

function sql_help_ALTER_TEXT_SEARCH_TEMPLATE(buf) {
  appendPQExpBuffer(buf,
    "ALTER TEXT SEARCH TEMPLATE %s RENAME TO %s\n" +
    "ALTER TEXT SEARCH TEMPLATE %s SET SCHEMA %s",
    _("name"),
    _("new_name"),
    _("name"),
    _("new_schema"));
}

function sql_help_ALTER_TRIGGER(buf) {
  appendPQExpBuffer(buf,
    "ALTER TRIGGER %s ON %s RENAME TO %s\n" +
    "ALTER TRIGGER %s ON %s [ NO ] DEPENDS ON EXTENSION %s",
    _("name"),
    _("table_name"),
    _("new_name"),
    _("name"),
    _("table_name"),
    _("extension_name"));
}

function sql_help_ALTER_TYPE(buf) {
  appendPQExpBuffer(buf,
    "ALTER TYPE %s OWNER TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER }\n" +
    "ALTER TYPE %s RENAME TO %s\n" +
    "ALTER TYPE %s SET SCHEMA %s\n" +
    "ALTER TYPE %s RENAME ATTRIBUTE %s TO %s [ CASCADE | RESTRICT ]\n" +
    "ALTER TYPE %s %s [, ... ]\n" +
    "ALTER TYPE %s ADD VALUE [ IF NOT EXISTS ] %s [ { BEFORE | AFTER } %s ]\n" +
    "ALTER TYPE %s RENAME VALUE %s TO %s\n" +
    "ALTER TYPE %s SET ( %s = %s [, ... ] )\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "    ADD ATTRIBUTE %s %s [ COLLATE %s ] [ CASCADE | RESTRICT ]\n" +
    "    DROP ATTRIBUTE [ IF EXISTS ] %s [ CASCADE | RESTRICT ]\n" +
    "    ALTER ATTRIBUTE %s [ SET DATA ] TYPE %s [ COLLATE %s ] [ CASCADE | RESTRICT ]",
    _("name"),
    _("new_owner"),
    _("name"),
    _("new_name"),
    _("name"),
    _("new_schema"),
    _("name"),
    _("attribute_name"),
    _("new_attribute_name"),
    _("name"),
    _("action"),
    _("name"),
    _("new_enum_value"),
    _("neighbor_enum_value"),
    _("name"),
    _("existing_enum_value"),
    _("new_enum_value"),
    _("name"),
    _("property"),
    _("value"),
    _("where action is one of:"),
    _("attribute_name"),
    _("data_type"),
    _("collation"),
    _("attribute_name"),
    _("attribute_name"),
    _("data_type"),
    _("collation"));
}

function sql_help_ALTER_USER(buf) {
  appendPQExpBuffer(buf,
    "ALTER USER %s [ WITH ] %s [ ... ]\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "      SUPERUSER | NOSUPERUSER\n" +
    "    | CREATEDB | NOCREATEDB\n" +
    "    | CREATEROLE | NOCREATEROLE\n" +
    "    | INHERIT | NOINHERIT\n" +
    "    | LOGIN | NOLOGIN\n" +
    "    | REPLICATION | NOREPLICATION\n" +
    "    | BYPASSRLS | NOBYPASSRLS\n" +
    "    | CONNECTION LIMIT %s\n" +
    "    | [ ENCRYPTED ] PASSWORD '%s' | PASSWORD NULL\n" +
    "    | VALID UNTIL '%s'\n" +
    "\n" +
    "ALTER USER %s RENAME TO %s\n" +
    "\n" +
    "ALTER USER { %s | ALL } [ IN DATABASE %s ] SET %s { TO | = } { %s | DEFAULT }\n" +
    "ALTER USER { %s | ALL } [ IN DATABASE %s ] SET %s FROM CURRENT\n" +
    "ALTER USER { %s | ALL } [ IN DATABASE %s ] RESET %s\n" +
    "ALTER USER { %s | ALL } [ IN DATABASE %s ] RESET ALL\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "    %s\n" +
    "  | CURRENT_ROLE\n" +
    "  | CURRENT_USER\n" +
    "  | SESSION_USER",
    _("role_specification"),
    _("option"),
    _("where option can be:"),
    _("connlimit"),
    _("password"),
    _("timestamp"),
    _("name"),
    _("new_name"),
    _("role_specification"),
    _("database_name"),
    _("configuration_parameter"),
    _("value"),
    _("role_specification"),
    _("database_name"),
    _("configuration_parameter"),
    _("role_specification"),
    _("database_name"),
    _("configuration_parameter"),
    _("role_specification"),
    _("database_name"),
    _("where role_specification can be:"),
    _("role_name"));
}

function sql_help_ALTER_USER_MAPPING(buf) {
  appendPQExpBuffer(buf,
    "ALTER USER MAPPING FOR { %s | USER | CURRENT_ROLE | CURRENT_USER | SESSION_USER | PUBLIC }\n" +
    "    SERVER %s\n" +
    "    OPTIONS ( [ ADD | SET | DROP ] %s ['%s'] [, ... ] )",
    _("user_name"),
    _("server_name"),
    _("option"),
    _("value"));
}

function sql_help_ALTER_VIEW(buf) {
  appendPQExpBuffer(buf,
    "ALTER VIEW [ IF EXISTS ] %s ALTER [ COLUMN ] %s SET DEFAULT %s\n" +
    "ALTER VIEW [ IF EXISTS ] %s ALTER [ COLUMN ] %s DROP DEFAULT\n" +
    "ALTER VIEW [ IF EXISTS ] %s OWNER TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER }\n" +
    "ALTER VIEW [ IF EXISTS ] %s RENAME [ COLUMN ] %s TO %s\n" +
    "ALTER VIEW [ IF EXISTS ] %s RENAME TO %s\n" +
    "ALTER VIEW [ IF EXISTS ] %s SET SCHEMA %s\n" +
    "ALTER VIEW [ IF EXISTS ] %s SET ( %s [= %s] [, ... ] )\n" +
    "ALTER VIEW [ IF EXISTS ] %s RESET ( %s [, ... ] )",
    _("name"),
    _("column_name"),
    _("expression"),
    _("name"),
    _("column_name"),
    _("name"),
    _("new_owner"),
    _("name"),
    _("column_name"),
    _("new_column_name"),
    _("name"),
    _("new_name"),
    _("name"),
    _("new_schema"),
    _("name"),
    _("view_option_name"),
    _("view_option_value"),
    _("name"),
    _("view_option_name"));
}

function sql_help_ANALYZE(buf) {
  appendPQExpBuffer(buf,
    "ANALYZE [ ( %s [, ...] ) ] [ %s [, ...] ]\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "    VERBOSE [ %s ]\n" +
    "    SKIP_LOCKED [ %s ]\n" +
    "    BUFFER_USAGE_LIMIT %s\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "    %s [ ( %s [, ...] ) ]",
    _("option"),
    _("table_and_columns"),
    _("where option can be one of:"),
    _("boolean"),
    _("boolean"),
    _("size"),
    _("and table_and_columns is:"),
    _("table_name"),
    _("column_name"));
}

function sql_help_BEGIN(buf) {
  appendPQExpBuffer(buf,
    "BEGIN [ WORK | TRANSACTION ] [ %s [, ...] ]\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "    ISOLATION LEVEL { SERIALIZABLE | REPEATABLE READ | READ COMMITTED | READ UNCOMMITTED }\n" +
    "    READ WRITE | READ ONLY\n" +
    "    [ NOT ] DEFERRABLE",
    _("transaction_mode"),
    _("where transaction_mode is one of:"));
}

function sql_help_CALL(buf) {
  appendPQExpBuffer(buf,
    "CALL %s ( [ %s ] [, ...] )",
    _("name"),
    _("argument"));
}

function sql_help_CHECKPOINT(buf) {
  appendPQExpBuffer(buf,
    "CHECKPOINT");
}

function sql_help_CLOSE(buf) {
  appendPQExpBuffer(buf,
    "CLOSE { %s | ALL }",
    _("name"));
}

function sql_help_CLUSTER(buf) {
  appendPQExpBuffer(buf,
    "CLUSTER [ ( %s [, ...] ) ] [ %s [ USING %s ] ]\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "    VERBOSE [ %s ]",
    _("option"),
    _("table_name"),
    _("index_name"),
    _("where option can be one of:"),
    _("boolean"));
}

function sql_help_COMMENT(buf) {
  appendPQExpBuffer(buf,
    "COMMENT ON\n" +
    "{\n" +
    "  ACCESS METHOD %s |\n" +
    "  AGGREGATE %s ( %s ) |\n" +
    "  CAST (%s AS %s) |\n" +
    "  COLLATION %s |\n" +
    "  COLUMN %s.%s |\n" +
    "  CONSTRAINT %s ON %s |\n" +
    "  CONSTRAINT %s ON DOMAIN %s |\n" +
    "  CONVERSION %s |\n" +
    "  DATABASE %s |\n" +
    "  DOMAIN %s |\n" +
    "  EXTENSION %s |\n" +
    "  EVENT TRIGGER %s |\n" +
    "  FOREIGN DATA WRAPPER %s |\n" +
    "  FOREIGN TABLE %s |\n" +
    "  FUNCTION %s [ ( [ [ %s ] [ %s ] %s [, ...] ] ) ] |\n" +
    "  INDEX %s |\n" +
    "  LARGE OBJECT %s |\n" +
    "  MATERIALIZED VIEW %s |\n" +
    "  OPERATOR %s (%s, %s) |\n" +
    "  OPERATOR CLASS %s USING %s |\n" +
    "  OPERATOR FAMILY %s USING %s |\n" +
    "  POLICY %s ON %s |\n" +
    "  [ PROCEDURAL ] LANGUAGE %s |\n" +
    "  PROCEDURE %s [ ( [ [ %s ] [ %s ] %s [, ...] ] ) ] |\n" +
    "  PUBLICATION %s |\n" +
    "  ROLE %s |\n" +
    "  ROUTINE %s [ ( [ [ %s ] [ %s ] %s [, ...] ] ) ] |\n" +
    "  RULE %s ON %s |\n" +
    "  SCHEMA %s |\n" +
    "  SEQUENCE %s |\n" +
    "  SERVER %s |\n" +
    "  STATISTICS %s |\n" +
    "  SUBSCRIPTION %s |\n" +
    "  TABLE %s |\n" +
    "  TABLESPACE %s |\n" +
    "  TEXT SEARCH CONFIGURATION %s |\n" +
    "  TEXT SEARCH DICTIONARY %s |\n" +
    "  TEXT SEARCH PARSER %s |\n" +
    "  TEXT SEARCH TEMPLATE %s |\n" +
    "  TRANSFORM FOR %s LANGUAGE %s |\n" +
    "  TRIGGER %s ON %s |\n" +
    "  TYPE %s |\n" +
    "  VIEW %s\n" +
    "} IS { %s | NULL }\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "* |\n" +
    "[ %s ] [ %s ] %s [ , ... ] |\n" +
    "[ [ %s ] [ %s ] %s [ , ... ] ] ORDER BY [ %s ] [ %s ] %s [ , ... ]",
    _("object_name"),
    _("aggregate_name"),
    _("aggregate_signature"),
    _("source_type"),
    _("target_type"),
    _("object_name"),
    _("relation_name"),
    _("column_name"),
    _("constraint_name"),
    _("table_name"),
    _("constraint_name"),
    _("domain_name"),
    _("object_name"),
    _("object_name"),
    _("object_name"),
    _("object_name"),
    _("object_name"),
    _("object_name"),
    _("object_name"),
    _("function_name"),
    _("argmode"),
    _("argname"),
    _("argtype"),
    _("object_name"),
    _("large_object_oid"),
    _("object_name"),
    _("operator_name"),
    _("left_type"),
    _("right_type"),
    _("object_name"),
    _("index_method"),
    _("object_name"),
    _("index_method"),
    _("policy_name"),
    _("table_name"),
    _("object_name"),
    _("procedure_name"),
    _("argmode"),
    _("argname"),
    _("argtype"),
    _("object_name"),
    _("object_name"),
    _("routine_name"),
    _("argmode"),
    _("argname"),
    _("argtype"),
    _("rule_name"),
    _("table_name"),
    _("object_name"),
    _("object_name"),
    _("object_name"),
    _("object_name"),
    _("object_name"),
    _("object_name"),
    _("object_name"),
    _("object_name"),
    _("object_name"),
    _("object_name"),
    _("object_name"),
    _("type_name"),
    _("lang_name"),
    _("trigger_name"),
    _("table_name"),
    _("object_name"),
    _("object_name"),
    _("string_literal"),
    _("where aggregate_signature is:"),
    _("argmode"),
    _("argname"),
    _("argtype"),
    _("argmode"),
    _("argname"),
    _("argtype"),
    _("argmode"),
    _("argname"),
    _("argtype"));
}

function sql_help_COMMIT(buf) {
  appendPQExpBuffer(buf,
    "COMMIT [ WORK | TRANSACTION ] [ AND [ NO ] CHAIN ]");
}

function sql_help_COMMIT_PREPARED(buf) {
  appendPQExpBuffer(buf,
    "COMMIT PREPARED %s",
    _("transaction_id"));
}

function sql_help_COPY(buf) {
  appendPQExpBuffer(buf,
    "COPY %s [ ( %s [, ...] ) ]\n" +
    "    FROM { '%s' | PROGRAM '%s' | STDIN }\n" +
    "    [ [ WITH ] ( %s [, ...] ) ]\n" +
    "    [ WHERE %s ]\n" +
    "\n" +
    "COPY { %s [ ( %s [, ...] ) ] | ( %s ) }\n" +
    "    TO { '%s' | PROGRAM '%s' | STDOUT }\n" +
    "    [ [ WITH ] ( %s [, ...] ) ]\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "    FORMAT %s\n" +
    "    FREEZE [ %s ]\n" +
    "    DELIMITER '%s'\n" +
    "    NULL '%s'\n" +
    "    DEFAULT '%s'\n" +
    "    HEADER [ %s | MATCH ]\n" +
    "    QUOTE '%s'\n" +
    "    ESCAPE '%s'\n" +
    "    FORCE_QUOTE { ( %s [, ...] ) | * }\n" +
    "    FORCE_NOT_NULL ( %s [, ...] )\n" +
    "    FORCE_NULL ( %s [, ...] )\n" +
    "    ENCODING '%s'",
    _("table_name"),
    _("column_name"),
    _("filename"),
    _("command"),
    _("option"),
    _("condition"),
    _("table_name"),
    _("column_name"),
    _("query"),
    _("filename"),
    _("command"),
    _("option"),
    _("where option can be one of:"),
    _("format_name"),
    _("boolean"),
    _("delimiter_character"),
    _("null_string"),
    _("default_string"),
    _("boolean"),
    _("quote_character"),
    _("escape_character"),
    _("column_name"),
    _("column_name"),
    _("column_name"),
    _("encoding_name"));
}

function sql_help_CREATE_ACCESS_METHOD(buf) {
  appendPQExpBuffer(buf,
    "CREATE ACCESS METHOD %s\n" +
    "    TYPE %s\n" +
    "    HANDLER %s",
    _("name"),
    _("access_method_type"),
    _("handler_function"));
}

function sql_help_CREATE_AGGREGATE(buf) {
  appendPQExpBuffer(buf,
    "CREATE [ OR REPLACE ] AGGREGATE %s ( [ %s ] [ %s ] %s [ , ... ] ) (\n" +
    "    SFUNC = %s,\n" +
    "    STYPE = %s\n" +
    "    [ , SSPACE = %s ]\n" +
    "    [ , FINALFUNC = %s ]\n" +
    "    [ , FINALFUNC_EXTRA ]\n" +
    "    [ , FINALFUNC_MODIFY = { READ_ONLY | SHAREABLE | READ_WRITE } ]\n" +
    "    [ , COMBINEFUNC = %s ]\n" +
    "    [ , SERIALFUNC = %s ]\n" +
    "    [ , DESERIALFUNC = %s ]\n" +
    "    [ , INITCOND = %s ]\n" +
    "    [ , MSFUNC = %s ]\n" +
    "    [ , MINVFUNC = %s ]\n" +
    "    [ , MSTYPE = %s ]\n" +
    "    [ , MSSPACE = %s ]\n" +
    "    [ , MFINALFUNC = %s ]\n" +
    "    [ , MFINALFUNC_EXTRA ]\n" +
    "    [ , MFINALFUNC_MODIFY = { READ_ONLY | SHAREABLE | READ_WRITE } ]\n" +
    "    [ , MINITCOND = %s ]\n" +
    "    [ , SORTOP = %s ]\n" +
    "    [ , PARALLEL = { SAFE | RESTRICTED | UNSAFE } ]\n" +
    ")\n" +
    "\n" +
    "CREATE [ OR REPLACE ] AGGREGATE %s ( [ [ %s ] [ %s ] %s [ , ... ] ]\n" +
    "                        ORDER BY [ %s ] [ %s ] %s [ , ... ] ) (\n" +
    "    SFUNC = %s,\n" +
    "    STYPE = %s\n" +
    "    [ , SSPACE = %s ]\n" +
    "    [ , FINALFUNC = %s ]\n" +
    "    [ , FINALFUNC_EXTRA ]\n" +
    "    [ , FINALFUNC_MODIFY = { READ_ONLY | SHAREABLE | READ_WRITE } ]\n" +
    "    [ , INITCOND = %s ]\n" +
    "    [ , PARALLEL = { SAFE | RESTRICTED | UNSAFE } ]\n" +
    "    [ , HYPOTHETICAL ]\n" +
    ")\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "CREATE [ OR REPLACE ] AGGREGATE %s (\n" +
    "    BASETYPE = %s,\n" +
    "    SFUNC = %s,\n" +
    "    STYPE = %s\n" +
    "    [ , SSPACE = %s ]\n" +
    "    [ , FINALFUNC = %s ]\n" +
    "    [ , FINALFUNC_EXTRA ]\n" +
    "    [ , FINALFUNC_MODIFY = { READ_ONLY | SHAREABLE | READ_WRITE } ]\n" +
    "    [ , COMBINEFUNC = %s ]\n" +
    "    [ , SERIALFUNC = %s ]\n" +
    "    [ , DESERIALFUNC = %s ]\n" +
    "    [ , INITCOND = %s ]\n" +
    "    [ , MSFUNC = %s ]\n" +
    "    [ , MINVFUNC = %s ]\n" +
    "    [ , MSTYPE = %s ]\n" +
    "    [ , MSSPACE = %s ]\n" +
    "    [ , MFINALFUNC = %s ]\n" +
    "    [ , MFINALFUNC_EXTRA ]\n" +
    "    [ , MFINALFUNC_MODIFY = { READ_ONLY | SHAREABLE | READ_WRITE } ]\n" +
    "    [ , MINITCOND = %s ]\n" +
    "    [ , SORTOP = %s ]\n" +
    ")",
    _("name"),
    _("argmode"),
    _("argname"),
    _("arg_data_type"),
    _("sfunc"),
    _("state_data_type"),
    _("state_data_size"),
    _("ffunc"),
    _("combinefunc"),
    _("serialfunc"),
    _("deserialfunc"),
    _("initial_condition"),
    _("msfunc"),
    _("minvfunc"),
    _("mstate_data_type"),
    _("mstate_data_size"),
    _("mffunc"),
    _("minitial_condition"),
    _("sort_operator"),
    _("name"),
    _("argmode"),
    _("argname"),
    _("arg_data_type"),
    _("argmode"),
    _("argname"),
    _("arg_data_type"),
    _("sfunc"),
    _("state_data_type"),
    _("state_data_size"),
    _("ffunc"),
    _("initial_condition"),
    _("or the old syntax"),
    _("name"),
    _("base_type"),
    _("sfunc"),
    _("state_data_type"),
    _("state_data_size"),
    _("ffunc"),
    _("combinefunc"),
    _("serialfunc"),
    _("deserialfunc"),
    _("initial_condition"),
    _("msfunc"),
    _("minvfunc"),
    _("mstate_data_type"),
    _("mstate_data_size"),
    _("mffunc"),
    _("minitial_condition"),
    _("sort_operator"));
}

function sql_help_CREATE_CAST(buf) {
  appendPQExpBuffer(buf,
    "CREATE CAST (%s AS %s)\n" +
    "    WITH FUNCTION %s [ (%s [, ...]) ]\n" +
    "    [ AS ASSIGNMENT | AS IMPLICIT ]\n" +
    "\n" +
    "CREATE CAST (%s AS %s)\n" +
    "    WITHOUT FUNCTION\n" +
    "    [ AS ASSIGNMENT | AS IMPLICIT ]\n" +
    "\n" +
    "CREATE CAST (%s AS %s)\n" +
    "    WITH INOUT\n" +
    "    [ AS ASSIGNMENT | AS IMPLICIT ]",
    _("source_type"),
    _("target_type"),
    _("function_name"),
    _("argument_type"),
    _("source_type"),
    _("target_type"),
    _("source_type"),
    _("target_type"));
}

function sql_help_CREATE_COLLATION(buf) {
  appendPQExpBuffer(buf,
    "CREATE COLLATION [ IF NOT EXISTS ] %s (\n" +
    "    [ LOCALE = %s, ]\n" +
    "    [ LC_COLLATE = %s, ]\n" +
    "    [ LC_CTYPE = %s, ]\n" +
    "    [ PROVIDER = %s, ]\n" +
    "    [ DETERMINISTIC = %s, ]\n" +
    "    [ RULES = %s, ]\n" +
    "    [ VERSION = %s ]\n" +
    ")\n" +
    "CREATE COLLATION [ IF NOT EXISTS ] %s FROM %s",
    _("name"),
    _("locale"),
    _("lc_collate"),
    _("lc_ctype"),
    _("provider"),
    _("boolean"),
    _("rules"),
    _("version"),
    _("name"),
    _("existing_collation"));
}

function sql_help_CREATE_CONVERSION(buf) {
  appendPQExpBuffer(buf,
    "CREATE [ DEFAULT ] CONVERSION %s\n" +
    "    FOR %s TO %s FROM %s",
    _("name"),
    _("source_encoding"),
    _("dest_encoding"),
    _("function_name"));
}

function sql_help_CREATE_DATABASE(buf) {
  appendPQExpBuffer(buf,
    "CREATE DATABASE %s\n" +
    "    [ WITH ] [ OWNER [=] %s ]\n" +
    "           [ TEMPLATE [=] %s ]\n" +
    "           [ ENCODING [=] %s ]\n" +
    "           [ STRATEGY [=] %s ] ]\n" +
    "           [ LOCALE [=] %s ]\n" +
    "           [ LC_COLLATE [=] %s ]\n" +
    "           [ LC_CTYPE [=] %s ]\n" +
    "           [ ICU_LOCALE [=] %s ]\n" +
    "           [ ICU_RULES [=] %s ]\n" +
    "           [ LOCALE_PROVIDER [=] %s ]\n" +
    "           [ COLLATION_VERSION = %s ]\n" +
    "           [ TABLESPACE [=] %s ]\n" +
    "           [ ALLOW_CONNECTIONS [=] %s ]\n" +
    "           [ CONNECTION LIMIT [=] %s ]\n" +
    "           [ IS_TEMPLATE [=] %s ]\n" +
    "           [ OID [=] %s ]",
    _("name"),
    _("user_name"),
    _("template"),
    _("encoding"),
    _("strategy"),
    _("locale"),
    _("lc_collate"),
    _("lc_ctype"),
    _("icu_locale"),
    _("icu_rules"),
    _("locale_provider"),
    _("collation_version"),
    _("tablespace_name"),
    _("allowconn"),
    _("connlimit"),
    _("istemplate"),
    _("oid"));
}

function sql_help_CREATE_DOMAIN(buf) {
  appendPQExpBuffer(buf,
    "CREATE DOMAIN %s [ AS ] %s\n" +
    "    [ COLLATE %s ]\n" +
    "    [ DEFAULT %s ]\n" +
    "    [ %s [ ... ] ]\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "[ CONSTRAINT %s ]\n" +
    "{ NOT NULL | NULL | CHECK (%s) }",
    _("name"),
    _("data_type"),
    _("collation"),
    _("expression"),
    _("constraint"),
    _("where constraint is:"),
    _("constraint_name"),
    _("expression"));
}

function sql_help_CREATE_EVENT_TRIGGER(buf) {
  appendPQExpBuffer(buf,
    "CREATE EVENT TRIGGER %s\n" +
    "    ON %s\n" +
    "    [ WHEN %s IN (%s [, ... ]) [ AND ... ] ]\n" +
    "    EXECUTE { FUNCTION | PROCEDURE } %s()",
    _("name"),
    _("event"),
    _("filter_variable"),
    _("filter_value"),
    _("function_name"));
}

function sql_help_CREATE_EXTENSION(buf) {
  appendPQExpBuffer(buf,
    "CREATE EXTENSION [ IF NOT EXISTS ] %s\n" +
    "    [ WITH ] [ SCHEMA %s ]\n" +
    "             [ VERSION %s ]\n" +
    "             [ CASCADE ]",
    _("extension_name"),
    _("schema_name"),
    _("version"));
}

function sql_help_CREATE_FOREIGN_DATA_WRAPPER(buf) {
  appendPQExpBuffer(buf,
    "CREATE FOREIGN DATA WRAPPER %s\n" +
    "    [ HANDLER %s | NO HANDLER ]\n" +
    "    [ VALIDATOR %s | NO VALIDATOR ]\n" +
    "    [ OPTIONS ( %s '%s' [, ... ] ) ]",
    _("name"),
    _("handler_function"),
    _("validator_function"),
    _("option"),
    _("value"));
}

function sql_help_CREATE_FOREIGN_TABLE(buf) {
  appendPQExpBuffer(buf,
    "CREATE FOREIGN TABLE [ IF NOT EXISTS ] %s ( [\n" +
    "  { %s %s [ OPTIONS ( %s '%s' [, ... ] ) ] [ COLLATE %s ] [ %s [ ... ] ]\n" +
    "    | %s }\n" +
    "    [, ... ]\n" +
    "] )\n" +
    "[ INHERITS ( %s [, ... ] ) ]\n" +
    "  SERVER %s\n" +
    "[ OPTIONS ( %s '%s' [, ... ] ) ]\n" +
    "\n" +
    "CREATE FOREIGN TABLE [ IF NOT EXISTS ] %s\n" +
    "  PARTITION OF %s [ (\n" +
    "  { %s [ WITH OPTIONS ] [ %s [ ... ] ]\n" +
    "    | %s }\n" +
    "    [, ... ]\n" +
    ") ]\n" +
    "{ FOR VALUES %s | DEFAULT }\n" +
    "  SERVER %s\n" +
    "[ OPTIONS ( %s '%s' [, ... ] ) ]\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "[ CONSTRAINT %s ]\n" +
    "{ NOT NULL |\n" +
    "  NULL |\n" +
    "  CHECK ( %s ) [ NO INHERIT ] |\n" +
    "  DEFAULT %s |\n" +
    "  GENERATED ALWAYS AS ( %s ) STORED }\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "[ CONSTRAINT %s ]\n" +
    "CHECK ( %s ) [ NO INHERIT ]\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "IN ( %s [, ...] ) |\n" +
    "FROM ( { %s | MINVALUE | MAXVALUE } [, ...] )\n" +
    "  TO ( { %s | MINVALUE | MAXVALUE } [, ...] ) |\n" +
    "WITH ( MODULUS %s, REMAINDER %s )",
    _("table_name"),
    _("column_name"),
    _("data_type"),
    _("option"),
    _("value"),
    _("collation"),
    _("column_constraint"),
    _("table_constraint"),
    _("parent_table"),
    _("server_name"),
    _("option"),
    _("value"),
    _("table_name"),
    _("parent_table"),
    _("column_name"),
    _("column_constraint"),
    _("table_constraint"),
    _("partition_bound_spec"),
    _("server_name"),
    _("option"),
    _("value"),
    _("where column_constraint is:"),
    _("constraint_name"),
    _("expression"),
    _("default_expr"),
    _("generation_expr"),
    _("and table_constraint is:"),
    _("constraint_name"),
    _("expression"),
    _("and partition_bound_spec is:"),
    _("partition_bound_expr"),
    _("partition_bound_expr"),
    _("partition_bound_expr"),
    _("numeric_literal"),
    _("numeric_literal"));
}

function sql_help_CREATE_FUNCTION(buf) {
  appendPQExpBuffer(buf,
    "CREATE [ OR REPLACE ] FUNCTION\n" +
    "    %s ( [ [ %s ] [ %s ] %s [ { DEFAULT | = } %s ] [, ...] ] )\n" +
    "    [ RETURNS %s\n" +
    "      | RETURNS TABLE ( %s %s [, ...] ) ]\n" +
    "  { LANGUAGE %s\n" +
    "    | TRANSFORM { FOR TYPE %s } [, ... ]\n" +
    "    | WINDOW\n" +
    "    | { IMMUTABLE | STABLE | VOLATILE }\n" +
    "    | [ NOT ] LEAKPROOF\n" +
    "    | { CALLED ON NULL INPUT | RETURNS NULL ON NULL INPUT | STRICT }\n" +
    "    | { [ EXTERNAL ] SECURITY INVOKER | [ EXTERNAL ] SECURITY DEFINER }\n" +
    "    | PARALLEL { UNSAFE | RESTRICTED | SAFE }\n" +
    "    | COST %s\n" +
    "    | ROWS %s\n" +
    "    | SUPPORT %s\n" +
    "    | SET %s { TO %s | = %s | FROM CURRENT }\n" +
    "    | AS '%s'\n" +
    "    | AS '%s', '%s'\n" +
    "    | %s\n" +
    "  } ...",
    _("name"),
    _("argmode"),
    _("argname"),
    _("argtype"),
    _("default_expr"),
    _("rettype"),
    _("column_name"),
    _("column_type"),
    _("lang_name"),
    _("type_name"),
    _("execution_cost"),
    _("result_rows"),
    _("support_function"),
    _("configuration_parameter"),
    _("value"),
    _("value"),
    _("definition"),
    _("obj_file"),
    _("link_symbol"),
    _("sql_body"));
}

function sql_help_CREATE_GROUP(buf) {
  appendPQExpBuffer(buf,
    "CREATE GROUP %s [ [ WITH ] %s [ ... ] ]\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "      SUPERUSER | NOSUPERUSER\n" +
    "    | CREATEDB | NOCREATEDB\n" +
    "    | CREATEROLE | NOCREATEROLE\n" +
    "    | INHERIT | NOINHERIT\n" +
    "    | LOGIN | NOLOGIN\n" +
    "    | REPLICATION | NOREPLICATION\n" +
    "    | BYPASSRLS | NOBYPASSRLS\n" +
    "    | CONNECTION LIMIT %s\n" +
    "    | [ ENCRYPTED ] PASSWORD '%s' | PASSWORD NULL\n" +
    "    | VALID UNTIL '%s'\n" +
    "    | IN ROLE %s [, ...]\n" +
    "    | IN GROUP %s [, ...]\n" +
    "    | ROLE %s [, ...]\n" +
    "    | ADMIN %s [, ...]\n" +
    "    | USER %s [, ...]\n" +
    "    | SYSID %s",
    _("name"),
    _("option"),
    _("where option can be:"),
    _("connlimit"),
    _("password"),
    _("timestamp"),
    _("role_name"),
    _("role_name"),
    _("role_name"),
    _("role_name"),
    _("role_name"),
    _("uid"));
}

function sql_help_CREATE_INDEX(buf) {
  appendPQExpBuffer(buf,
    "CREATE [ UNIQUE ] INDEX [ CONCURRENTLY ] [ [ IF NOT EXISTS ] %s ] ON [ ONLY ] %s [ USING %s ]\n" +
    "    ( { %s | ( %s ) } [ COLLATE %s ] [ %s [ ( %s = %s [, ... ] ) ] ] [ ASC | DESC ] [ NULLS { FIRST | LAST } ] [, ...] )\n" +
    "    [ INCLUDE ( %s [, ...] ) ]\n" +
    "    [ NULLS [ NOT ] DISTINCT ]\n" +
    "    [ WITH ( %s [= %s] [, ... ] ) ]\n" +
    "    [ TABLESPACE %s ]\n" +
    "    [ WHERE %s ]",
    _("name"),
    _("table_name"),
    _("method"),
    _("column_name"),
    _("expression"),
    _("collation"),
    _("opclass"),
    _("opclass_parameter"),
    _("value"),
    _("column_name"),
    _("storage_parameter"),
    _("value"),
    _("tablespace_name"),
    _("predicate"));
}

function sql_help_CREATE_LANGUAGE(buf) {
  appendPQExpBuffer(buf,
    "CREATE [ OR REPLACE ] [ TRUSTED ] [ PROCEDURAL ] LANGUAGE %s\n" +
    "    HANDLER %s [ INLINE %s ] [ VALIDATOR %s ]\n" +
    "CREATE [ OR REPLACE ] [ TRUSTED ] [ PROCEDURAL ] LANGUAGE %s",
    _("name"),
    _("call_handler"),
    _("inline_handler"),
    _("valfunction"),
    _("name"));
}

function sql_help_CREATE_MATERIALIZED_VIEW(buf) {
  appendPQExpBuffer(buf,
    "CREATE MATERIALIZED VIEW [ IF NOT EXISTS ] %s\n" +
    "    [ (%s [, ...] ) ]\n" +
    "    [ USING %s ]\n" +
    "    [ WITH ( %s [= %s] [, ... ] ) ]\n" +
    "    [ TABLESPACE %s ]\n" +
    "    AS %s\n" +
    "    [ WITH [ NO ] DATA ]",
    _("table_name"),
    _("column_name"),
    _("method"),
    _("storage_parameter"),
    _("value"),
    _("tablespace_name"),
    _("query"));
}

function sql_help_CREATE_OPERATOR(buf) {
  appendPQExpBuffer(buf,
    "CREATE OPERATOR %s (\n" +
    "    {FUNCTION|PROCEDURE} = %s\n" +
    "    [, LEFTARG = %s ] [, RIGHTARG = %s ]\n" +
    "    [, COMMUTATOR = %s ] [, NEGATOR = %s ]\n" +
    "    [, RESTRICT = %s ] [, JOIN = %s ]\n" +
    "    [, HASHES ] [, MERGES ]\n" +
    ")",
    _("name"),
    _("function_name"),
    _("left_type"),
    _("right_type"),
    _("com_op"),
    _("neg_op"),
    _("res_proc"),
    _("join_proc"));
}

function sql_help_CREATE_OPERATOR_CLASS(buf) {
  appendPQExpBuffer(buf,
    "CREATE OPERATOR CLASS %s [ DEFAULT ] FOR TYPE %s\n" +
    "  USING %s [ FAMILY %s ] AS\n" +
    "  {  OPERATOR %s %s [ ( %s, %s ) ] [ FOR SEARCH | FOR ORDER BY %s ]\n" +
    "   | FUNCTION %s [ ( %s [ , %s ] ) ] %s ( %s [, ...] )\n" +
    "   | STORAGE %s\n" +
    "  } [, ... ]",
    _("name"),
    _("data_type"),
    _("index_method"),
    _("family_name"),
    _("strategy_number"),
    _("operator_name"),
    _("op_type"),
    _("op_type"),
    _("sort_family_name"),
    _("support_number"),
    _("op_type"),
    _("op_type"),
    _("function_name"),
    _("argument_type"),
    _("storage_type"));
}

function sql_help_CREATE_OPERATOR_FAMILY(buf) {
  appendPQExpBuffer(buf,
    "CREATE OPERATOR FAMILY %s USING %s",
    _("name"),
    _("index_method"));
}

function sql_help_CREATE_POLICY(buf) {
  appendPQExpBuffer(buf,
    "CREATE POLICY %s ON %s\n" +
    "    [ AS { PERMISSIVE | RESTRICTIVE } ]\n" +
    "    [ FOR { ALL | SELECT | INSERT | UPDATE | DELETE } ]\n" +
    "    [ TO { %s | PUBLIC | CURRENT_ROLE | CURRENT_USER | SESSION_USER } [, ...] ]\n" +
    "    [ USING ( %s ) ]\n" +
    "    [ WITH CHECK ( %s ) ]",
    _("name"),
    _("table_name"),
    _("role_name"),
    _("using_expression"),
    _("check_expression"));
}

function sql_help_CREATE_PROCEDURE(buf) {
  appendPQExpBuffer(buf,
    "CREATE [ OR REPLACE ] PROCEDURE\n" +
    "    %s ( [ [ %s ] [ %s ] %s [ { DEFAULT | = } %s ] [, ...] ] )\n" +
    "  { LANGUAGE %s\n" +
    "    | TRANSFORM { FOR TYPE %s } [, ... ]\n" +
    "    | [ EXTERNAL ] SECURITY INVOKER | [ EXTERNAL ] SECURITY DEFINER\n" +
    "    | SET %s { TO %s | = %s | FROM CURRENT }\n" +
    "    | AS '%s'\n" +
    "    | AS '%s', '%s'\n" +
    "    | %s\n" +
    "  } ...",
    _("name"),
    _("argmode"),
    _("argname"),
    _("argtype"),
    _("default_expr"),
    _("lang_name"),
    _("type_name"),
    _("configuration_parameter"),
    _("value"),
    _("value"),
    _("definition"),
    _("obj_file"),
    _("link_symbol"),
    _("sql_body"));
}

function sql_help_CREATE_PUBLICATION(buf) {
  appendPQExpBuffer(buf,
    "CREATE PUBLICATION %s\n" +
    "    [ FOR ALL TABLES\n" +
    "      | FOR %s [, ... ] ]\n" +
    "    [ WITH ( %s [= %s] [, ... ] ) ]\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "    TABLE [ ONLY ] %s [ * ] [ ( %s [, ... ] ) ] [ WHERE ( %s ) ] [, ... ]\n" +
    "    TABLES IN SCHEMA { %s | CURRENT_SCHEMA } [, ... ]",
    _("name"),
    _("publication_object"),
    _("publication_parameter"),
    _("value"),
    _("where publication_object is one of:"),
    _("table_name"),
    _("column_name"),
    _("expression"),
    _("schema_name"));
}

function sql_help_CREATE_ROLE(buf) {
  appendPQExpBuffer(buf,
    "CREATE ROLE %s [ [ WITH ] %s [ ... ] ]\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "      SUPERUSER | NOSUPERUSER\n" +
    "    | CREATEDB | NOCREATEDB\n" +
    "    | CREATEROLE | NOCREATEROLE\n" +
    "    | INHERIT | NOINHERIT\n" +
    "    | LOGIN | NOLOGIN\n" +
    "    | REPLICATION | NOREPLICATION\n" +
    "    | BYPASSRLS | NOBYPASSRLS\n" +
    "    | CONNECTION LIMIT %s\n" +
    "    | [ ENCRYPTED ] PASSWORD '%s' | PASSWORD NULL\n" +
    "    | VALID UNTIL '%s'\n" +
    "    | IN ROLE %s [, ...]\n" +
    "    | IN GROUP %s [, ...]\n" +
    "    | ROLE %s [, ...]\n" +
    "    | ADMIN %s [, ...]\n" +
    "    | USER %s [, ...]\n" +
    "    | SYSID %s",
    _("name"),
    _("option"),
    _("where option can be:"),
    _("connlimit"),
    _("password"),
    _("timestamp"),
    _("role_name"),
    _("role_name"),
    _("role_name"),
    _("role_name"),
    _("role_name"),
    _("uid"));
}

function sql_help_CREATE_RULE(buf) {
  appendPQExpBuffer(buf,
    "CREATE [ OR REPLACE ] RULE %s AS ON %s\n" +
    "    TO %s [ WHERE %s ]\n" +
    "    DO [ ALSO | INSTEAD ] { NOTHING | %s | ( %s ; %s ... ) }\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "    SELECT | INSERT | UPDATE | DELETE",
    _("name"),
    _("event"),
    _("table_name"),
    _("condition"),
    _("command"),
    _("command"),
    _("command"),
    _("where event can be one of:"));
}

function sql_help_CREATE_SCHEMA(buf) {
  appendPQExpBuffer(buf,
    "CREATE SCHEMA %s [ AUTHORIZATION %s ] [ %s [ ... ] ]\n" +
    "CREATE SCHEMA AUTHORIZATION %s [ %s [ ... ] ]\n" +
    "CREATE SCHEMA IF NOT EXISTS %s [ AUTHORIZATION %s ]\n" +
    "CREATE SCHEMA IF NOT EXISTS AUTHORIZATION %s\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "    %s\n" +
    "  | CURRENT_ROLE\n" +
    "  | CURRENT_USER\n" +
    "  | SESSION_USER",
    _("schema_name"),
    _("role_specification"),
    _("schema_element"),
    _("role_specification"),
    _("schema_element"),
    _("schema_name"),
    _("role_specification"),
    _("role_specification"),
    _("where role_specification can be:"),
    _("user_name"));
}

function sql_help_CREATE_SEQUENCE(buf) {
  appendPQExpBuffer(buf,
    "CREATE [ { TEMPORARY | TEMP } | UNLOGGED ] SEQUENCE [ IF NOT EXISTS ] %s\n" +
    "    [ AS %s ]\n" +
    "    [ INCREMENT [ BY ] %s ]\n" +
    "    [ MINVALUE %s | NO MINVALUE ] [ MAXVALUE %s | NO MAXVALUE ]\n" +
    "    [ START [ WITH ] %s ] [ CACHE %s ] [ [ NO ] CYCLE ]\n" +
    "    [ OWNED BY { %s.%s | NONE } ]",
    _("name"),
    _("data_type"),
    _("increment"),
    _("minvalue"),
    _("maxvalue"),
    _("start"),
    _("cache"),
    _("table_name"),
    _("column_name"));
}

function sql_help_CREATE_SERVER(buf) {
  appendPQExpBuffer(buf,
    "CREATE SERVER [ IF NOT EXISTS ] %s [ TYPE '%s' ] [ VERSION '%s' ]\n" +
    "    FOREIGN DATA WRAPPER %s\n" +
    "    [ OPTIONS ( %s '%s' [, ... ] ) ]",
    _("server_name"),
    _("server_type"),
    _("server_version"),
    _("fdw_name"),
    _("option"),
    _("value"));
}

function sql_help_CREATE_STATISTICS(buf) {
  appendPQExpBuffer(buf,
    "CREATE STATISTICS [ [ IF NOT EXISTS ] %s ]\n" +
    "    ON ( %s )\n" +
    "    FROM %s\n" +
    "\n" +
    "CREATE STATISTICS [ [ IF NOT EXISTS ] %s ]\n" +
    "    [ ( %s [, ... ] ) ]\n" +
    "    ON { %s | ( %s ) }, { %s | ( %s ) } [, ...]\n" +
    "    FROM %s",
    _("statistics_name"),
    _("expression"),
    _("table_name"),
    _("statistics_name"),
    _("statistics_kind"),
    _("column_name"),
    _("expression"),
    _("column_name"),
    _("expression"),
    _("table_name"));
}

function sql_help_CREATE_SUBSCRIPTION(buf) {
  appendPQExpBuffer(buf,
    "CREATE SUBSCRIPTION %s\n" +
    "    CONNECTION '%s'\n" +
    "    PUBLICATION %s [, ...]\n" +
    "    [ WITH ( %s [= %s] [, ... ] ) ]",
    _("subscription_name"),
    _("conninfo"),
    _("publication_name"),
    _("subscription_parameter"),
    _("value"));
}

function sql_help_CREATE_TABLE(buf) {
  appendPQExpBuffer(buf,
    "CREATE [ [ GLOBAL | LOCAL ] { TEMPORARY | TEMP } | UNLOGGED ] TABLE [ IF NOT EXISTS ] %s ( [\n" +
    "  { %s %s [ STORAGE { PLAIN | EXTERNAL | EXTENDED | MAIN | DEFAULT } ] [ COMPRESSION %s ] [ COLLATE %s ] [ %s [ ... ] ]\n" +
    "    | %s\n" +
    "    | LIKE %s [ %s ... ] }\n" +
    "    [, ... ]\n" +
    "] )\n" +
    "[ INHERITS ( %s [, ... ] ) ]\n" +
    "[ PARTITION BY { RANGE | LIST | HASH } ( { %s | ( %s ) } [ COLLATE %s ] [ %s ] [, ... ] ) ]\n" +
    "[ USING %s ]\n" +
    "[ WITH ( %s [= %s] [, ... ] ) | WITHOUT OIDS ]\n" +
    "[ ON COMMIT { PRESERVE ROWS | DELETE ROWS | DROP } ]\n" +
    "[ TABLESPACE %s ]\n" +
    "\n" +
    "CREATE [ [ GLOBAL | LOCAL ] { TEMPORARY | TEMP } | UNLOGGED ] TABLE [ IF NOT EXISTS ] %s\n" +
    "    OF %s [ (\n" +
    "  { %s [ WITH OPTIONS ] [ %s [ ... ] ]\n" +
    "    | %s }\n" +
    "    [, ... ]\n" +
    ") ]\n" +
    "[ PARTITION BY { RANGE | LIST | HASH } ( { %s | ( %s ) } [ COLLATE %s ] [ %s ] [, ... ] ) ]\n" +
    "[ USING %s ]\n" +
    "[ WITH ( %s [= %s] [, ... ] ) | WITHOUT OIDS ]\n" +
    "[ ON COMMIT { PRESERVE ROWS | DELETE ROWS | DROP } ]\n" +
    "[ TABLESPACE %s ]\n" +
    "\n" +
    "CREATE [ [ GLOBAL | LOCAL ] { TEMPORARY | TEMP } | UNLOGGED ] TABLE [ IF NOT EXISTS ] %s\n" +
    "    PARTITION OF %s [ (\n" +
    "  { %s [ WITH OPTIONS ] [ %s [ ... ] ]\n" +
    "    | %s }\n" +
    "    [, ... ]\n" +
    ") ] { FOR VALUES %s | DEFAULT }\n" +
    "[ PARTITION BY { RANGE | LIST | HASH } ( { %s | ( %s ) } [ COLLATE %s ] [ %s ] [, ... ] ) ]\n" +
    "[ USING %s ]\n" +
    "[ WITH ( %s [= %s] [, ... ] ) | WITHOUT OIDS ]\n" +
    "[ ON COMMIT { PRESERVE ROWS | DELETE ROWS | DROP } ]\n" +
    "[ TABLESPACE %s ]\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "[ CONSTRAINT %s ]\n" +
    "{ NOT NULL |\n" +
    "  NULL |\n" +
    "  CHECK ( %s ) [ NO INHERIT ] |\n" +
    "  DEFAULT %s |\n" +
    "  GENERATED ALWAYS AS ( %s ) STORED |\n" +
    "  GENERATED { ALWAYS | BY DEFAULT } AS IDENTITY [ ( %s ) ] |\n" +
    "  UNIQUE [ NULLS [ NOT ] DISTINCT ] %s |\n" +
    "  PRIMARY KEY %s |\n" +
    "  REFERENCES %s [ ( %s ) ] [ MATCH FULL | MATCH PARTIAL | MATCH SIMPLE ]\n" +
    "    [ ON DELETE %s ] [ ON UPDATE %s ] }\n" +
    "[ DEFERRABLE | NOT DEFERRABLE ] [ INITIALLY DEFERRED | INITIALLY IMMEDIATE ]\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "[ CONSTRAINT %s ]\n" +
    "{ CHECK ( %s ) [ NO INHERIT ] |\n" +
    "  NOT NULL %s [ NO INHERIT ] |\n" +
    "  UNIQUE [ NULLS [ NOT ] DISTINCT ] ( %s [, ... ] ) %s |\n" +
    "  PRIMARY KEY ( %s [, ... ] ) %s |\n" +
    "  EXCLUDE [ USING %s ] ( %s WITH %s [, ... ] ) %s [ WHERE ( %s ) ] |\n" +
    "  FOREIGN KEY ( %s [, ... ] ) REFERENCES %s [ ( %s [, ... ] ) ]\n" +
    "    [ MATCH FULL | MATCH PARTIAL | MATCH SIMPLE ] [ ON DELETE %s ] [ ON UPDATE %s ] }\n" +
    "[ DEFERRABLE | NOT DEFERRABLE ] [ INITIALLY DEFERRED | INITIALLY IMMEDIATE ]\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "{ INCLUDING | EXCLUDING } { COMMENTS | COMPRESSION | CONSTRAINTS | DEFAULTS | GENERATED | IDENTITY | INDEXES | STATISTICS | STORAGE | ALL }\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "IN ( %s [, ...] ) |\n" +
    "FROM ( { %s | MINVALUE | MAXVALUE } [, ...] )\n" +
    "  TO ( { %s | MINVALUE | MAXVALUE } [, ...] ) |\n" +
    "WITH ( MODULUS %s, REMAINDER %s )\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "[ INCLUDE ( %s [, ... ] ) ]\n" +
    "[ WITH ( %s [= %s] [, ... ] ) ]\n" +
    "[ USING INDEX TABLESPACE %s ]\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "{ %s | ( %s ) } [ %s ] [ ASC | DESC ] [ NULLS { FIRST | LAST } ]\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "{ NO ACTION | RESTRICT | CASCADE | SET NULL [ ( %s [, ... ] ) ] | SET DEFAULT [ ( %s [, ... ] ) ] }",
    _("table_name"),
    _("column_name"),
    _("data_type"),
    _("compression_method"),
    _("collation"),
    _("column_constraint"),
    _("table_constraint"),
    _("source_table"),
    _("like_option"),
    _("parent_table"),
    _("column_name"),
    _("expression"),
    _("collation"),
    _("opclass"),
    _("method"),
    _("storage_parameter"),
    _("value"),
    _("tablespace_name"),
    _("table_name"),
    _("type_name"),
    _("column_name"),
    _("column_constraint"),
    _("table_constraint"),
    _("column_name"),
    _("expression"),
    _("collation"),
    _("opclass"),
    _("method"),
    _("storage_parameter"),
    _("value"),
    _("tablespace_name"),
    _("table_name"),
    _("parent_table"),
    _("column_name"),
    _("column_constraint"),
    _("table_constraint"),
    _("partition_bound_spec"),
    _("column_name"),
    _("expression"),
    _("collation"),
    _("opclass"),
    _("method"),
    _("storage_parameter"),
    _("value"),
    _("tablespace_name"),
    _("where column_constraint is:"),
    _("constraint_name"),
    _("expression"),
    _("default_expr"),
    _("generation_expr"),
    _("sequence_options"),
    _("index_parameters"),
    _("index_parameters"),
    _("reftable"),
    _("refcolumn"),
    _("referential_action"),
    _("referential_action"),
    _("and table_constraint is:"),
    _("constraint_name"),
    _("expression"),
    _("column_name"),
    _("column_name"),
    _("index_parameters"),
    _("column_name"),
    _("index_parameters"),
    _("index_method"),
    _("exclude_element"),
    _("operator"),
    _("index_parameters"),
    _("predicate"),
    _("column_name"),
    _("reftable"),
    _("refcolumn"),
    _("referential_action"),
    _("referential_action"),
    _("and like_option is:"),
    _("and partition_bound_spec is:"),
    _("partition_bound_expr"),
    _("partition_bound_expr"),
    _("partition_bound_expr"),
    _("numeric_literal"),
    _("numeric_literal"),
    _("index_parameters in UNIQUE, PRIMARY KEY, and EXCLUDE constraints are:"),
    _("column_name"),
    _("storage_parameter"),
    _("value"),
    _("tablespace_name"),
    _("exclude_element in an EXCLUDE constraint is:"),
    _("column_name"),
    _("expression"),
    _("opclass"),
    _("referential_action in a FOREIGN KEY/REFERENCES constraint is:"),
    _("column_name"),
    _("column_name"));
}

function sql_help_CREATE_TABLE_AS(buf) {
  appendPQExpBuffer(buf,
    "CREATE [ [ GLOBAL | LOCAL ] { TEMPORARY | TEMP } | UNLOGGED ] TABLE [ IF NOT EXISTS ] %s\n" +
    "    [ (%s [, ...] ) ]\n" +
    "    [ USING %s ]\n" +
    "    [ WITH ( %s [= %s] [, ... ] ) | WITHOUT OIDS ]\n" +
    "    [ ON COMMIT { PRESERVE ROWS | DELETE ROWS | DROP } ]\n" +
    "    [ TABLESPACE %s ]\n" +
    "    AS %s\n" +
    "    [ WITH [ NO ] DATA ]",
    _("table_name"),
    _("column_name"),
    _("method"),
    _("storage_parameter"),
    _("value"),
    _("tablespace_name"),
    _("query"));
}

function sql_help_CREATE_TABLESPACE(buf) {
  appendPQExpBuffer(buf,
    "CREATE TABLESPACE %s\n" +
    "    [ OWNER { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER } ]\n" +
    "    LOCATION '%s'\n" +
    "    [ WITH ( %s = %s [, ... ] ) ]",
    _("tablespace_name"),
    _("new_owner"),
    _("directory"),
    _("tablespace_option"),
    _("value"));
}

function sql_help_CREATE_TEXT_SEARCH_CONFIGURATION(buf) {
  appendPQExpBuffer(buf,
    "CREATE TEXT SEARCH CONFIGURATION %s (\n" +
    "    PARSER = %s |\n" +
    "    COPY = %s\n" +
    ")",
    _("name"),
    _("parser_name"),
    _("source_config"));
}

function sql_help_CREATE_TEXT_SEARCH_DICTIONARY(buf) {
  appendPQExpBuffer(buf,
    "CREATE TEXT SEARCH DICTIONARY %s (\n" +
    "    TEMPLATE = %s\n" +
    "    [, %s = %s [, ... ]]\n" +
    ")",
    _("name"),
    _("template"),
    _("option"),
    _("value"));
}

function sql_help_CREATE_TEXT_SEARCH_PARSER(buf) {
  appendPQExpBuffer(buf,
    "CREATE TEXT SEARCH PARSER %s (\n" +
    "    START = %s ,\n" +
    "    GETTOKEN = %s ,\n" +
    "    END = %s ,\n" +
    "    LEXTYPES = %s\n" +
    "    [, HEADLINE = %s ]\n" +
    ")",
    _("name"),
    _("start_function"),
    _("gettoken_function"),
    _("end_function"),
    _("lextypes_function"),
    _("headline_function"));
}

function sql_help_CREATE_TEXT_SEARCH_TEMPLATE(buf) {
  appendPQExpBuffer(buf,
    "CREATE TEXT SEARCH TEMPLATE %s (\n" +
    "    [ INIT = %s , ]\n" +
    "    LEXIZE = %s\n" +
    ")",
    _("name"),
    _("init_function"),
    _("lexize_function"));
}

function sql_help_CREATE_TRANSFORM(buf) {
  appendPQExpBuffer(buf,
    "CREATE [ OR REPLACE ] TRANSFORM FOR %s LANGUAGE %s (\n" +
    "    FROM SQL WITH FUNCTION %s [ (%s [, ...]) ],\n" +
    "    TO SQL WITH FUNCTION %s [ (%s [, ...]) ]\n" +
    ");",
    _("type_name"),
    _("lang_name"),
    _("from_sql_function_name"),
    _("argument_type"),
    _("to_sql_function_name"),
    _("argument_type"));
}

function sql_help_CREATE_TRIGGER(buf) {
  appendPQExpBuffer(buf,
    "CREATE [ OR REPLACE ] [ CONSTRAINT ] TRIGGER %s { BEFORE | AFTER | INSTEAD OF } { %s [ OR ... ] }\n" +
    "    ON %s\n" +
    "    [ FROM %s ]\n" +
    "    [ NOT DEFERRABLE | [ DEFERRABLE ] [ INITIALLY IMMEDIATE | INITIALLY DEFERRED ] ]\n" +
    "    [ REFERENCING { { OLD | NEW } TABLE [ AS ] %s } [ ... ] ]\n" +
    "    [ FOR [ EACH ] { ROW | STATEMENT } ]\n" +
    "    [ WHEN ( %s ) ]\n" +
    "    EXECUTE { FUNCTION | PROCEDURE } %s ( %s )\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "    INSERT\n" +
    "    UPDATE [ OF %s [, ... ] ]\n" +
    "    DELETE\n" +
    "    TRUNCATE",
    _("name"),
    _("event"),
    _("table_name"),
    _("referenced_table_name"),
    _("transition_relation_name"),
    _("condition"),
    _("function_name"),
    _("arguments"),
    _("where event can be one of:"),
    _("column_name"));
}

function sql_help_CREATE_TYPE(buf) {
  appendPQExpBuffer(buf,
    "CREATE TYPE %s AS\n" +
    "    ( [ %s %s [ COLLATE %s ] [, ... ] ] )\n" +
    "\n" +
    "CREATE TYPE %s AS ENUM\n" +
    "    ( [ '%s' [, ... ] ] )\n" +
    "\n" +
    "CREATE TYPE %s AS RANGE (\n" +
    "    SUBTYPE = %s\n" +
    "    [ , SUBTYPE_OPCLASS = %s ]\n" +
    "    [ , COLLATION = %s ]\n" +
    "    [ , CANONICAL = %s ]\n" +
    "    [ , SUBTYPE_DIFF = %s ]\n" +
    "    [ , MULTIRANGE_TYPE_NAME = %s ]\n" +
    ")\n" +
    "\n" +
    "CREATE TYPE %s (\n" +
    "    INPUT = %s,\n" +
    "    OUTPUT = %s\n" +
    "    [ , RECEIVE = %s ]\n" +
    "    [ , SEND = %s ]\n" +
    "    [ , TYPMOD_IN = %s ]\n" +
    "    [ , TYPMOD_OUT = %s ]\n" +
    "    [ , ANALYZE = %s ]\n" +
    "    [ , SUBSCRIPT = %s ]\n" +
    "    [ , INTERNALLENGTH = { %s | VARIABLE } ]\n" +
    "    [ , PASSEDBYVALUE ]\n" +
    "    [ , ALIGNMENT = %s ]\n" +
    "    [ , STORAGE = %s ]\n" +
    "    [ , LIKE = %s ]\n" +
    "    [ , CATEGORY = %s ]\n" +
    "    [ , PREFERRED = %s ]\n" +
    "    [ , DEFAULT = %s ]\n" +
    "    [ , ELEMENT = %s ]\n" +
    "    [ , DELIMITER = %s ]\n" +
    "    [ , COLLATABLE = %s ]\n" +
    ")\n" +
    "\n" +
    "CREATE TYPE %s",
    _("name"),
    _("attribute_name"),
    _("data_type"),
    _("collation"),
    _("name"),
    _("label"),
    _("name"),
    _("subtype"),
    _("subtype_operator_class"),
    _("collation"),
    _("canonical_function"),
    _("subtype_diff_function"),
    _("multirange_type_name"),
    _("name"),
    _("input_function"),
    _("output_function"),
    _("receive_function"),
    _("send_function"),
    _("type_modifier_input_function"),
    _("type_modifier_output_function"),
    _("analyze_function"),
    _("subscript_function"),
    _("internallength"),
    _("alignment"),
    _("storage"),
    _("like_type"),
    _("category"),
    _("preferred"),
    _("default"),
    _("element"),
    _("delimiter"),
    _("collatable"),
    _("name"));
}

function sql_help_CREATE_USER(buf) {
  appendPQExpBuffer(buf,
    "CREATE USER %s [ [ WITH ] %s [ ... ] ]\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "      SUPERUSER | NOSUPERUSER\n" +
    "    | CREATEDB | NOCREATEDB\n" +
    "    | CREATEROLE | NOCREATEROLE\n" +
    "    | INHERIT | NOINHERIT\n" +
    "    | LOGIN | NOLOGIN\n" +
    "    | REPLICATION | NOREPLICATION\n" +
    "    | BYPASSRLS | NOBYPASSRLS\n" +
    "    | CONNECTION LIMIT %s\n" +
    "    | [ ENCRYPTED ] PASSWORD '%s' | PASSWORD NULL\n" +
    "    | VALID UNTIL '%s'\n" +
    "    | IN ROLE %s [, ...]\n" +
    "    | IN GROUP %s [, ...]\n" +
    "    | ROLE %s [, ...]\n" +
    "    | ADMIN %s [, ...]\n" +
    "    | USER %s [, ...]\n" +
    "    | SYSID %s",
    _("name"),
    _("option"),
    _("where option can be:"),
    _("connlimit"),
    _("password"),
    _("timestamp"),
    _("role_name"),
    _("role_name"),
    _("role_name"),
    _("role_name"),
    _("role_name"),
    _("uid"));
}

function sql_help_CREATE_USER_MAPPING(buf) {
  appendPQExpBuffer(buf,
    "CREATE USER MAPPING [ IF NOT EXISTS ] FOR { %s | USER | CURRENT_ROLE | CURRENT_USER | PUBLIC }\n" +
    "    SERVER %s\n" +
    "    [ OPTIONS ( %s '%s' [ , ... ] ) ]",
    _("user_name"),
    _("server_name"),
    _("option"),
    _("value"));
}

function sql_help_CREATE_VIEW(buf) {
  appendPQExpBuffer(buf,
    "CREATE [ OR REPLACE ] [ TEMP | TEMPORARY ] [ RECURSIVE ] VIEW %s [ ( %s [, ...] ) ]\n" +
    "    [ WITH ( %s [= %s] [, ... ] ) ]\n" +
    "    AS %s\n" +
    "    [ WITH [ CASCADED | LOCAL ] CHECK OPTION ]",
    _("name"),
    _("column_name"),
    _("view_option_name"),
    _("view_option_value"),
    _("query"));
}

function sql_help_DEALLOCATE(buf) {
  appendPQExpBuffer(buf,
    "DEALLOCATE [ PREPARE ] { %s | ALL }",
    _("name"));
}

function sql_help_DECLARE(buf) {
  appendPQExpBuffer(buf,
    "DECLARE %s [ BINARY ] [ ASENSITIVE | INSENSITIVE ] [ [ NO ] SCROLL ]\n" +
    "    CURSOR [ { WITH | WITHOUT } HOLD ] FOR %s",
    _("name"),
    _("query"));
}

function sql_help_DELETE(buf) {
  appendPQExpBuffer(buf,
    "[ WITH [ RECURSIVE ] %s [, ...] ]\n" +
    "DELETE FROM [ ONLY ] %s [ * ] [ [ AS ] %s ]\n" +
    "    [ USING %s [, ...] ]\n" +
    "    [ WHERE %s | WHERE CURRENT OF %s ]\n" +
    "    [ RETURNING * | %s [ [ AS ] %s ] [, ...] ]",
    _("with_query"),
    _("table_name"),
    _("alias"),
    _("from_item"),
    _("condition"),
    _("cursor_name"),
    _("output_expression"),
    _("output_name"));
}

function sql_help_DISCARD(buf) {
  appendPQExpBuffer(buf,
    "DISCARD { ALL | PLANS | SEQUENCES | TEMPORARY | TEMP }");
}

function sql_help_DO(buf) {
  appendPQExpBuffer(buf,
    "DO [ LANGUAGE %s ] %s",
    _("lang_name"),
    _("code"));
}

function sql_help_DROP_ACCESS_METHOD(buf) {
  appendPQExpBuffer(buf,
    "DROP ACCESS METHOD [ IF EXISTS ] %s [ CASCADE | RESTRICT ]",
    _("name"));
}

function sql_help_DROP_AGGREGATE(buf) {
  appendPQExpBuffer(buf,
    "DROP AGGREGATE [ IF EXISTS ] %s ( %s ) [, ...] [ CASCADE | RESTRICT ]\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "* |\n" +
    "[ %s ] [ %s ] %s [ , ... ] |\n" +
    "[ [ %s ] [ %s ] %s [ , ... ] ] ORDER BY [ %s ] [ %s ] %s [ , ... ]",
    _("name"),
    _("aggregate_signature"),
    _("where aggregate_signature is:"),
    _("argmode"),
    _("argname"),
    _("argtype"),
    _("argmode"),
    _("argname"),
    _("argtype"),
    _("argmode"),
    _("argname"),
    _("argtype"));
}

function sql_help_DROP_CAST(buf) {
  appendPQExpBuffer(buf,
    "DROP CAST [ IF EXISTS ] (%s AS %s) [ CASCADE | RESTRICT ]",
    _("source_type"),
    _("target_type"));
}

function sql_help_DROP_COLLATION(buf) {
  appendPQExpBuffer(buf,
    "DROP COLLATION [ IF EXISTS ] %s [ CASCADE | RESTRICT ]",
    _("name"));
}

function sql_help_DROP_CONVERSION(buf) {
  appendPQExpBuffer(buf,
    "DROP CONVERSION [ IF EXISTS ] %s [ CASCADE | RESTRICT ]",
    _("name"));
}

function sql_help_DROP_DATABASE(buf) {
  appendPQExpBuffer(buf,
    "DROP DATABASE [ IF EXISTS ] %s [ [ WITH ] ( %s [, ...] ) ]\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "    FORCE",
    _("name"),
    _("option"),
    _("where option can be:"));
}

function sql_help_DROP_DOMAIN(buf) {
  appendPQExpBuffer(buf,
    "DROP DOMAIN [ IF EXISTS ] %s [, ...] [ CASCADE | RESTRICT ]",
    _("name"));
}

function sql_help_DROP_EVENT_TRIGGER(buf) {
  appendPQExpBuffer(buf,
    "DROP EVENT TRIGGER [ IF EXISTS ] %s [ CASCADE | RESTRICT ]",
    _("name"));
}

function sql_help_DROP_EXTENSION(buf) {
  appendPQExpBuffer(buf,
    "DROP EXTENSION [ IF EXISTS ] %s [, ...] [ CASCADE | RESTRICT ]",
    _("name"));
}

function sql_help_DROP_FOREIGN_DATA_WRAPPER(buf) {
  appendPQExpBuffer(buf,
    "DROP FOREIGN DATA WRAPPER [ IF EXISTS ] %s [, ...] [ CASCADE | RESTRICT ]",
    _("name"));
}

function sql_help_DROP_FOREIGN_TABLE(buf) {
  appendPQExpBuffer(buf,
    "DROP FOREIGN TABLE [ IF EXISTS ] %s [, ...] [ CASCADE | RESTRICT ]",
    _("name"));
}

function sql_help_DROP_FUNCTION(buf) {
  appendPQExpBuffer(buf,
    "DROP FUNCTION [ IF EXISTS ] %s [ ( [ [ %s ] [ %s ] %s [, ...] ] ) ] [, ...]\n" +
    "    [ CASCADE | RESTRICT ]",
    _("name"),
    _("argmode"),
    _("argname"),
    _("argtype"));
}

function sql_help_DROP_GROUP(buf) {
  appendPQExpBuffer(buf,
    "DROP GROUP [ IF EXISTS ] %s [, ...]",
    _("name"));
}

function sql_help_DROP_INDEX(buf) {
  appendPQExpBuffer(buf,
    "DROP INDEX [ CONCURRENTLY ] [ IF EXISTS ] %s [, ...] [ CASCADE | RESTRICT ]",
    _("name"));
}

function sql_help_DROP_LANGUAGE(buf) {
  appendPQExpBuffer(buf,
    "DROP [ PROCEDURAL ] LANGUAGE [ IF EXISTS ] %s [ CASCADE | RESTRICT ]",
    _("name"));
}

function sql_help_DROP_MATERIALIZED_VIEW(buf) {
  appendPQExpBuffer(buf,
    "DROP MATERIALIZED VIEW [ IF EXISTS ] %s [, ...] [ CASCADE | RESTRICT ]",
    _("name"));
}

function sql_help_DROP_OPERATOR(buf) {
  appendPQExpBuffer(buf,
    "DROP OPERATOR [ IF EXISTS ] %s ( { %s | NONE } , %s ) [, ...] [ CASCADE | RESTRICT ]",
    _("name"),
    _("left_type"),
    _("right_type"));
}

function sql_help_DROP_OPERATOR_CLASS(buf) {
  appendPQExpBuffer(buf,
    "DROP OPERATOR CLASS [ IF EXISTS ] %s USING %s [ CASCADE | RESTRICT ]",
    _("name"),
    _("index_method"));
}

function sql_help_DROP_OPERATOR_FAMILY(buf) {
  appendPQExpBuffer(buf,
    "DROP OPERATOR FAMILY [ IF EXISTS ] %s USING %s [ CASCADE | RESTRICT ]",
    _("name"),
    _("index_method"));
}

function sql_help_DROP_OWNED(buf) {
  appendPQExpBuffer(buf,
    "DROP OWNED BY { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER } [, ...] [ CASCADE | RESTRICT ]",
    _("name"));
}

function sql_help_DROP_POLICY(buf) {
  appendPQExpBuffer(buf,
    "DROP POLICY [ IF EXISTS ] %s ON %s [ CASCADE | RESTRICT ]",
    _("name"),
    _("table_name"));
}

function sql_help_DROP_PROCEDURE(buf) {
  appendPQExpBuffer(buf,
    "DROP PROCEDURE [ IF EXISTS ] %s [ ( [ [ %s ] [ %s ] %s [, ...] ] ) ] [, ...]\n" +
    "    [ CASCADE | RESTRICT ]",
    _("name"),
    _("argmode"),
    _("argname"),
    _("argtype"));
}

function sql_help_DROP_PUBLICATION(buf) {
  appendPQExpBuffer(buf,
    "DROP PUBLICATION [ IF EXISTS ] %s [, ...] [ CASCADE | RESTRICT ]",
    _("name"));
}

function sql_help_DROP_ROLE(buf) {
  appendPQExpBuffer(buf,
    "DROP ROLE [ IF EXISTS ] %s [, ...]",
    _("name"));
}

function sql_help_DROP_ROUTINE(buf) {
  appendPQExpBuffer(buf,
    "DROP ROUTINE [ IF EXISTS ] %s [ ( [ [ %s ] [ %s ] %s [, ...] ] ) ] [, ...]\n" +
    "    [ CASCADE | RESTRICT ]",
    _("name"),
    _("argmode"),
    _("argname"),
    _("argtype"));
}

function sql_help_DROP_RULE(buf) {
  appendPQExpBuffer(buf,
    "DROP RULE [ IF EXISTS ] %s ON %s [ CASCADE | RESTRICT ]",
    _("name"),
    _("table_name"));
}

function sql_help_DROP_SCHEMA(buf) {
  appendPQExpBuffer(buf,
    "DROP SCHEMA [ IF EXISTS ] %s [, ...] [ CASCADE | RESTRICT ]",
    _("name"));
}

function sql_help_DROP_SEQUENCE(buf) {
  appendPQExpBuffer(buf,
    "DROP SEQUENCE [ IF EXISTS ] %s [, ...] [ CASCADE | RESTRICT ]",
    _("name"));
}

function sql_help_DROP_SERVER(buf) {
  appendPQExpBuffer(buf,
    "DROP SERVER [ IF EXISTS ] %s [, ...] [ CASCADE | RESTRICT ]",
    _("name"));
}

function sql_help_DROP_STATISTICS(buf) {
  appendPQExpBuffer(buf,
    "DROP STATISTICS [ IF EXISTS ] %s [, ...] [ CASCADE | RESTRICT ]",
    _("name"));
}

function sql_help_DROP_SUBSCRIPTION(buf) {
  appendPQExpBuffer(buf,
    "DROP SUBSCRIPTION [ IF EXISTS ] %s [ CASCADE | RESTRICT ]",
    _("name"));
}

function sql_help_DROP_TABLE(buf) {
  appendPQExpBuffer(buf,
    "DROP TABLE [ IF EXISTS ] %s [, ...] [ CASCADE | RESTRICT ]",
    _("name"));
}

function sql_help_DROP_TABLESPACE(buf) {
  appendPQExpBuffer(buf,
    "DROP TABLESPACE [ IF EXISTS ] %s",
    _("name"));
}

function sql_help_DROP_TEXT_SEARCH_CONFIGURATION(buf) {
  appendPQExpBuffer(buf,
    "DROP TEXT SEARCH CONFIGURATION [ IF EXISTS ] %s [ CASCADE | RESTRICT ]",
    _("name"));
}

function sql_help_DROP_TEXT_SEARCH_DICTIONARY(buf) {
  appendPQExpBuffer(buf,
    "DROP TEXT SEARCH DICTIONARY [ IF EXISTS ] %s [ CASCADE | RESTRICT ]",
    _("name"));
}

function sql_help_DROP_TEXT_SEARCH_PARSER(buf) {
  appendPQExpBuffer(buf,
    "DROP TEXT SEARCH PARSER [ IF EXISTS ] %s [ CASCADE | RESTRICT ]",
    _("name"));
}

function sql_help_DROP_TEXT_SEARCH_TEMPLATE(buf) {
  appendPQExpBuffer(buf,
    "DROP TEXT SEARCH TEMPLATE [ IF EXISTS ] %s [ CASCADE | RESTRICT ]",
    _("name"));
}

function sql_help_DROP_TRANSFORM(buf) {
  appendPQExpBuffer(buf,
    "DROP TRANSFORM [ IF EXISTS ] FOR %s LANGUAGE %s [ CASCADE | RESTRICT ]",
    _("type_name"),
    _("lang_name"));
}

function sql_help_DROP_TRIGGER(buf) {
  appendPQExpBuffer(buf,
    "DROP TRIGGER [ IF EXISTS ] %s ON %s [ CASCADE | RESTRICT ]",
    _("name"),
    _("table_name"));
}

function sql_help_DROP_TYPE(buf) {
  appendPQExpBuffer(buf,
    "DROP TYPE [ IF EXISTS ] %s [, ...] [ CASCADE | RESTRICT ]",
    _("name"));
}

function sql_help_DROP_USER(buf) {
  appendPQExpBuffer(buf,
    "DROP USER [ IF EXISTS ] %s [, ...]",
    _("name"));
}

function sql_help_DROP_USER_MAPPING(buf) {
  appendPQExpBuffer(buf,
    "DROP USER MAPPING [ IF EXISTS ] FOR { %s | USER | CURRENT_ROLE | CURRENT_USER | PUBLIC } SERVER %s",
    _("user_name"),
    _("server_name"));
}

function sql_help_DROP_VIEW(buf) {
  appendPQExpBuffer(buf,
    "DROP VIEW [ IF EXISTS ] %s [, ...] [ CASCADE | RESTRICT ]",
    _("name"));
}

function sql_help_END(buf) {
  appendPQExpBuffer(buf,
    "END [ WORK | TRANSACTION ] [ AND [ NO ] CHAIN ]");
}

function sql_help_EXECUTE(buf) {
  appendPQExpBuffer(buf,
    "EXECUTE %s [ ( %s [, ...] ) ]",
    _("name"),
    _("parameter"));
}

function sql_help_EXPLAIN(buf) {
  appendPQExpBuffer(buf,
    "EXPLAIN [ ( %s [, ...] ) ] %s\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "    ANALYZE [ %s ]\n" +
    "    VERBOSE [ %s ]\n" +
    "    COSTS [ %s ]\n" +
    "    SETTINGS [ %s ]\n" +
    "    GENERIC_PLAN [ %s ]\n" +
    "    BUFFERS [ %s ]\n" +
    "    WAL [ %s ]\n" +
    "    TIMING [ %s ]\n" +
    "    SUMMARY [ %s ]\n" +
    "    FORMAT { TEXT | XML | JSON | YAML }",
    _("option"),
    _("statement"),
    _("where option can be one of:"),
    _("boolean"),
    _("boolean"),
    _("boolean"),
    _("boolean"),
    _("boolean"),
    _("boolean"),
    _("boolean"),
    _("boolean"),
    _("boolean"));
}

function sql_help_FETCH(buf) {
  appendPQExpBuffer(buf,
    "FETCH [ %s ] [ FROM | IN ] %s\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "    NEXT\n" +
    "    PRIOR\n" +
    "    FIRST\n" +
    "    LAST\n" +
    "    ABSOLUTE %s\n" +
    "    RELATIVE %s\n" +
    "    %s\n" +
    "    ALL\n" +
    "    FORWARD\n" +
    "    FORWARD %s\n" +
    "    FORWARD ALL\n" +
    "    BACKWARD\n" +
    "    BACKWARD %s\n" +
    "    BACKWARD ALL",
    _("direction"),
    _("cursor_name"),
    _("where direction can be one of:"),
    _("count"),
    _("count"),
    _("count"),
    _("count"),
    _("count"));
}

function sql_help_GRANT(buf) {
  appendPQExpBuffer(buf,
    "GRANT { { SELECT | INSERT | UPDATE | DELETE | TRUNCATE | REFERENCES | TRIGGER }\n" +
    "    [, ...] | ALL [ PRIVILEGES ] }\n" +
    "    ON { [ TABLE ] %s [, ...]\n" +
    "         | ALL TABLES IN SCHEMA %s [, ...] }\n" +
    "    TO %s [, ...] [ WITH GRANT OPTION ]\n" +
    "    [ GRANTED BY %s ]\n" +
    "\n" +
    "GRANT { { SELECT | INSERT | UPDATE | REFERENCES } ( %s [, ...] )\n" +
    "    [, ...] | ALL [ PRIVILEGES ] ( %s [, ...] ) }\n" +
    "    ON [ TABLE ] %s [, ...]\n" +
    "    TO %s [, ...] [ WITH GRANT OPTION ]\n" +
    "    [ GRANTED BY %s ]\n" +
    "\n" +
    "GRANT { { USAGE | SELECT | UPDATE }\n" +
    "    [, ...] | ALL [ PRIVILEGES ] }\n" +
    "    ON { SEQUENCE %s [, ...]\n" +
    "         | ALL SEQUENCES IN SCHEMA %s [, ...] }\n" +
    "    TO %s [, ...] [ WITH GRANT OPTION ]\n" +
    "    [ GRANTED BY %s ]\n" +
    "\n" +
    "GRANT { { CREATE | CONNECT | TEMPORARY | TEMP } [, ...] | ALL [ PRIVILEGES ] }\n" +
    "    ON DATABASE %s [, ...]\n" +
    "    TO %s [, ...] [ WITH GRANT OPTION ]\n" +
    "    [ GRANTED BY %s ]\n" +
    "\n" +
    "GRANT { USAGE | ALL [ PRIVILEGES ] }\n" +
    "    ON DOMAIN %s [, ...]\n" +
    "    TO %s [, ...] [ WITH GRANT OPTION ]\n" +
    "    [ GRANTED BY %s ]\n" +
    "\n" +
    "GRANT { USAGE | ALL [ PRIVILEGES ] }\n" +
    "    ON FOREIGN DATA WRAPPER %s [, ...]\n" +
    "    TO %s [, ...] [ WITH GRANT OPTION ]\n" +
    "    [ GRANTED BY %s ]\n" +
    "\n" +
    "GRANT { USAGE | ALL [ PRIVILEGES ] }\n" +
    "    ON FOREIGN SERVER %s [, ...]\n" +
    "    TO %s [, ...] [ WITH GRANT OPTION ]\n" +
    "    [ GRANTED BY %s ]\n" +
    "\n" +
    "GRANT { EXECUTE | ALL [ PRIVILEGES ] }\n" +
    "    ON { { FUNCTION | PROCEDURE | ROUTINE } %s [ ( [ [ %s ] [ %s ] %s [, ...] ] ) ] [, ...]\n" +
    "         | ALL { FUNCTIONS | PROCEDURES | ROUTINES } IN SCHEMA %s [, ...] }\n" +
    "    TO %s [, ...] [ WITH GRANT OPTION ]\n" +
    "    [ GRANTED BY %s ]\n" +
    "\n" +
    "GRANT { USAGE | ALL [ PRIVILEGES ] }\n" +
    "    ON LANGUAGE %s [, ...]\n" +
    "    TO %s [, ...] [ WITH GRANT OPTION ]\n" +
    "    [ GRANTED BY %s ]\n" +
    "\n" +
    "GRANT { { SELECT | UPDATE } [, ...] | ALL [ PRIVILEGES ] }\n" +
    "    ON LARGE OBJECT %s [, ...]\n" +
    "    TO %s [, ...] [ WITH GRANT OPTION ]\n" +
    "    [ GRANTED BY %s ]\n" +
    "\n" +
    "GRANT { { SET | ALTER SYSTEM } [, ... ] | ALL [ PRIVILEGES ] }\n" +
    "    ON PARAMETER %s [, ...]\n" +
    "    TO %s [, ...] [ WITH GRANT OPTION ]\n" +
    "    [ GRANTED BY %s ]\n" +
    "\n" +
    "GRANT { { CREATE | USAGE } [, ...] | ALL [ PRIVILEGES ] }\n" +
    "    ON SCHEMA %s [, ...]\n" +
    "    TO %s [, ...] [ WITH GRANT OPTION ]\n" +
    "    [ GRANTED BY %s ]\n" +
    "\n" +
    "GRANT { CREATE | ALL [ PRIVILEGES ] }\n" +
    "    ON TABLESPACE %s [, ...]\n" +
    "    TO %s [, ...] [ WITH GRANT OPTION ]\n" +
    "    [ GRANTED BY %s ]\n" +
    "\n" +
    "GRANT { USAGE | ALL [ PRIVILEGES ] }\n" +
    "    ON TYPE %s [, ...]\n" +
    "    TO %s [, ...] [ WITH GRANT OPTION ]\n" +
    "    [ GRANTED BY %s ]\n" +
    "\n" +
    "GRANT %s [, ...] TO %s [, ...]\n" +
    "    [ WITH { ADMIN | INHERIT | SET } { OPTION | TRUE | FALSE } ]\n" +
    "    [ GRANTED BY %s ]\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "    [ GROUP ] %s\n" +
    "  | PUBLIC\n" +
    "  | CURRENT_ROLE\n" +
    "  | CURRENT_USER\n" +
    "  | SESSION_USER",
    _("table_name"),
    _("schema_name"),
    _("role_specification"),
    _("role_specification"),
    _("column_name"),
    _("column_name"),
    _("table_name"),
    _("role_specification"),
    _("role_specification"),
    _("sequence_name"),
    _("schema_name"),
    _("role_specification"),
    _("role_specification"),
    _("database_name"),
    _("role_specification"),
    _("role_specification"),
    _("domain_name"),
    _("role_specification"),
    _("role_specification"),
    _("fdw_name"),
    _("role_specification"),
    _("role_specification"),
    _("server_name"),
    _("role_specification"),
    _("role_specification"),
    _("routine_name"),
    _("argmode"),
    _("arg_name"),
    _("arg_type"),
    _("schema_name"),
    _("role_specification"),
    _("role_specification"),
    _("lang_name"),
    _("role_specification"),
    _("role_specification"),
    _("loid"),
    _("role_specification"),
    _("role_specification"),
    _("configuration_parameter"),
    _("role_specification"),
    _("role_specification"),
    _("schema_name"),
    _("role_specification"),
    _("role_specification"),
    _("tablespace_name"),
    _("role_specification"),
    _("role_specification"),
    _("type_name"),
    _("role_specification"),
    _("role_specification"),
    _("role_name"),
    _("role_specification"),
    _("role_specification"),
    _("where role_specification can be:"),
    _("role_name"));
}

function sql_help_IMPORT_FOREIGN_SCHEMA(buf) {
  appendPQExpBuffer(buf,
    "IMPORT FOREIGN SCHEMA %s\n" +
    "    [ { LIMIT TO | EXCEPT } ( %s [, ...] ) ]\n" +
    "    FROM SERVER %s\n" +
    "    INTO %s\n" +
    "    [ OPTIONS ( %s '%s' [, ... ] ) ]",
    _("remote_schema"),
    _("table_name"),
    _("server_name"),
    _("local_schema"),
    _("option"),
    _("value"));
}

function sql_help_INSERT(buf) {
  appendPQExpBuffer(buf,
    "[ WITH [ RECURSIVE ] %s [, ...] ]\n" +
    "INSERT INTO %s [ AS %s ] [ ( %s [, ...] ) ]\n" +
    "    [ OVERRIDING { SYSTEM | USER } VALUE ]\n" +
    "    { DEFAULT VALUES | VALUES ( { %s | DEFAULT } [, ...] ) [, ...] | %s }\n" +
    "    [ ON CONFLICT [ %s ] %s ]\n" +
    "    [ RETURNING * | %s [ [ AS ] %s ] [, ...] ]\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "    ( { %s | ( %s ) } [ COLLATE %s ] [ %s ] [, ...] ) [ WHERE %s ]\n" +
    "    ON CONSTRAINT %s\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "    DO NOTHING\n" +
    "    DO UPDATE SET { %s = { %s | DEFAULT } |\n" +
    "                    ( %s [, ...] ) = [ ROW ] ( { %s | DEFAULT } [, ...] ) |\n" +
    "                    ( %s [, ...] ) = ( %s )\n" +
    "                  } [, ...]\n" +
    "              [ WHERE %s ]",
    _("with_query"),
    _("table_name"),
    _("alias"),
    _("column_name"),
    _("expression"),
    _("query"),
    _("conflict_target"),
    _("conflict_action"),
    _("output_expression"),
    _("output_name"),
    _("where conflict_target can be one of:"),
    _("index_column_name"),
    _("index_expression"),
    _("collation"),
    _("opclass"),
    _("index_predicate"),
    _("constraint_name"),
    _("and conflict_action is one of:"),
    _("column_name"),
    _("expression"),
    _("column_name"),
    _("expression"),
    _("column_name"),
    _("sub-SELECT"),
    _("condition"));
}

function sql_help_LISTEN(buf) {
  appendPQExpBuffer(buf,
    "LISTEN %s",
    _("channel"));
}

function sql_help_LOAD(buf) {
  appendPQExpBuffer(buf,
    "LOAD '%s'",
    _("filename"));
}

function sql_help_LOCK(buf) {
  appendPQExpBuffer(buf,
    "LOCK [ TABLE ] [ ONLY ] %s [ * ] [, ...] [ IN %s MODE ] [ NOWAIT ]\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "    ACCESS SHARE | ROW SHARE | ROW EXCLUSIVE | SHARE UPDATE EXCLUSIVE\n" +
    "    | SHARE | SHARE ROW EXCLUSIVE | EXCLUSIVE | ACCESS EXCLUSIVE",
    _("name"),
    _("lockmode"),
    _("where lockmode is one of:"));
}

function sql_help_MERGE(buf) {
  appendPQExpBuffer(buf,
    "[ WITH %s [, ...] ]\n" +
    "MERGE INTO [ ONLY ] %s [ * ] [ [ AS ] %s ]\n" +
    "USING %s ON %s\n" +
    "%s [...]\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "{ [ ONLY ] %s [ * ] | ( %s ) } [ [ AS ] %s ]\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "{ WHEN MATCHED [ AND %s ] THEN { %s | %s | DO NOTHING } |\n" +
    "  WHEN NOT MATCHED [ AND %s ] THEN { %s | DO NOTHING } }\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "INSERT [( %s [, ...] )]\n" +
    "[ OVERRIDING { SYSTEM | USER } VALUE ]\n" +
    "{ VALUES ( { %s | DEFAULT } [, ...] ) | DEFAULT VALUES }\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "UPDATE SET { %s = { %s | DEFAULT } |\n" +
    "             ( %s [, ...] ) = ( { %s | DEFAULT } [, ...] ) } [, ...]\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "DELETE",
    _("with_query"),
    _("target_table_name"),
    _("target_alias"),
    _("data_source"),
    _("join_condition"),
    _("when_clause"),
    _("where data_source is:"),
    _("source_table_name"),
    _("source_query"),
    _("source_alias"),
    _("and when_clause is:"),
    _("condition"),
    _("merge_update"),
    _("merge_delete"),
    _("condition"),
    _("merge_insert"),
    _("and merge_insert is:"),
    _("column_name"),
    _("expression"),
    _("and merge_update is:"),
    _("column_name"),
    _("expression"),
    _("column_name"),
    _("expression"),
    _("and merge_delete is:"));
}

function sql_help_MOVE(buf) {
  appendPQExpBuffer(buf,
    "MOVE [ %s ] [ FROM | IN ] %s\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "    NEXT\n" +
    "    PRIOR\n" +
    "    FIRST\n" +
    "    LAST\n" +
    "    ABSOLUTE %s\n" +
    "    RELATIVE %s\n" +
    "    %s\n" +
    "    ALL\n" +
    "    FORWARD\n" +
    "    FORWARD %s\n" +
    "    FORWARD ALL\n" +
    "    BACKWARD\n" +
    "    BACKWARD %s\n" +
    "    BACKWARD ALL",
    _("direction"),
    _("cursor_name"),
    _("where direction can be one of:"),
    _("count"),
    _("count"),
    _("count"),
    _("count"),
    _("count"));
}

function sql_help_NOTIFY(buf) {
  appendPQExpBuffer(buf,
    "NOTIFY %s [ , %s ]",
    _("channel"),
    _("payload"));
}

function sql_help_PREPARE(buf) {
  appendPQExpBuffer(buf,
    "PREPARE %s [ ( %s [, ...] ) ] AS %s",
    _("name"),
    _("data_type"),
    _("statement"));
}

function sql_help_PREPARE_TRANSACTION(buf) {
  appendPQExpBuffer(buf,
    "PREPARE TRANSACTION %s",
    _("transaction_id"));
}

function sql_help_REASSIGN_OWNED(buf) {
  appendPQExpBuffer(buf,
    "REASSIGN OWNED BY { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER } [, ...]\n" +
    "               TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER }",
    _("old_role"),
    _("new_role"));
}

function sql_help_REFRESH_MATERIALIZED_VIEW(buf) {
  appendPQExpBuffer(buf,
    "REFRESH MATERIALIZED VIEW [ CONCURRENTLY ] %s\n" +
    "    [ WITH [ NO ] DATA ]",
    _("name"));
}

function sql_help_REINDEX(buf) {
  appendPQExpBuffer(buf,
    "REINDEX [ ( %s [, ...] ) ] { INDEX | TABLE | SCHEMA } [ CONCURRENTLY ] %s\n" +
    "REINDEX [ ( %s [, ...] ) ] { DATABASE | SYSTEM } [ CONCURRENTLY ] [ %s ]\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "    CONCURRENTLY [ %s ]\n" +
    "    TABLESPACE %s\n" +
    "    VERBOSE [ %s ]",
    _("option"),
    _("name"),
    _("option"),
    _("name"),
    _("where option can be one of:"),
    _("boolean"),
    _("new_tablespace"),
    _("boolean"));
}

function sql_help_RELEASE_SAVEPOINT(buf) {
  appendPQExpBuffer(buf,
    "RELEASE [ SAVEPOINT ] %s",
    _("savepoint_name"));
}

function sql_help_RESET(buf) {
  appendPQExpBuffer(buf,
    "RESET %s\n" +
    "RESET ALL",
    _("configuration_parameter"));
}

function sql_help_REVOKE(buf) {
  appendPQExpBuffer(buf,
    "REVOKE [ GRANT OPTION FOR ]\n" +
    "    { { SELECT | INSERT | UPDATE | DELETE | TRUNCATE | REFERENCES | TRIGGER }\n" +
    "    [, ...] | ALL [ PRIVILEGES ] }\n" +
    "    ON { [ TABLE ] %s [, ...]\n" +
    "         | ALL TABLES IN SCHEMA %s [, ...] }\n" +
    "    FROM %s [, ...]\n" +
    "    [ GRANTED BY %s ]\n" +
    "    [ CASCADE | RESTRICT ]\n" +
    "\n" +
    "REVOKE [ GRANT OPTION FOR ]\n" +
    "    { { SELECT | INSERT | UPDATE | REFERENCES } ( %s [, ...] )\n" +
    "    [, ...] | ALL [ PRIVILEGES ] ( %s [, ...] ) }\n" +
    "    ON [ TABLE ] %s [, ...]\n" +
    "    FROM %s [, ...]\n" +
    "    [ GRANTED BY %s ]\n" +
    "    [ CASCADE | RESTRICT ]\n" +
    "\n" +
    "REVOKE [ GRANT OPTION FOR ]\n" +
    "    { { USAGE | SELECT | UPDATE }\n" +
    "    [, ...] | ALL [ PRIVILEGES ] }\n" +
    "    ON { SEQUENCE %s [, ...]\n" +
    "         | ALL SEQUENCES IN SCHEMA %s [, ...] }\n" +
    "    FROM %s [, ...]\n" +
    "    [ GRANTED BY %s ]\n" +
    "    [ CASCADE | RESTRICT ]\n" +
    "\n" +
    "REVOKE [ GRANT OPTION FOR ]\n" +
    "    { { CREATE | CONNECT | TEMPORARY | TEMP } [, ...] | ALL [ PRIVILEGES ] }\n" +
    "    ON DATABASE %s [, ...]\n" +
    "    FROM %s [, ...]\n" +
    "    [ GRANTED BY %s ]\n" +
    "    [ CASCADE | RESTRICT ]\n" +
    "\n" +
    "REVOKE [ GRANT OPTION FOR ]\n" +
    "    { USAGE | ALL [ PRIVILEGES ] }\n" +
    "    ON DOMAIN %s [, ...]\n" +
    "    FROM %s [, ...]\n" +
    "    [ GRANTED BY %s ]\n" +
    "    [ CASCADE | RESTRICT ]\n" +
    "\n" +
    "REVOKE [ GRANT OPTION FOR ]\n" +
    "    { USAGE | ALL [ PRIVILEGES ] }\n" +
    "    ON FOREIGN DATA WRAPPER %s [, ...]\n" +
    "    FROM %s [, ...]\n" +
    "    [ GRANTED BY %s ]\n" +
    "    [ CASCADE | RESTRICT ]\n" +
    "\n" +
    "REVOKE [ GRANT OPTION FOR ]\n" +
    "    { USAGE | ALL [ PRIVILEGES ] }\n" +
    "    ON FOREIGN SERVER %s [, ...]\n" +
    "    FROM %s [, ...]\n" +
    "    [ GRANTED BY %s ]\n" +
    "    [ CASCADE | RESTRICT ]\n" +
    "\n" +
    "REVOKE [ GRANT OPTION FOR ]\n" +
    "    { EXECUTE | ALL [ PRIVILEGES ] }\n" +
    "    ON { { FUNCTION | PROCEDURE | ROUTINE } %s [ ( [ [ %s ] [ %s ] %s [, ...] ] ) ] [, ...]\n" +
    "         | ALL { FUNCTIONS | PROCEDURES | ROUTINES } IN SCHEMA %s [, ...] }\n" +
    "    FROM %s [, ...]\n" +
    "    [ GRANTED BY %s ]\n" +
    "    [ CASCADE | RESTRICT ]\n" +
    "\n" +
    "REVOKE [ GRANT OPTION FOR ]\n" +
    "    { USAGE | ALL [ PRIVILEGES ] }\n" +
    "    ON LANGUAGE %s [, ...]\n" +
    "    FROM %s [, ...]\n" +
    "    [ GRANTED BY %s ]\n" +
    "    [ CASCADE | RESTRICT ]\n" +
    "\n" +
    "REVOKE [ GRANT OPTION FOR ]\n" +
    "    { { SELECT | UPDATE } [, ...] | ALL [ PRIVILEGES ] }\n" +
    "    ON LARGE OBJECT %s [, ...]\n" +
    "    FROM %s [, ...]\n" +
    "    [ GRANTED BY %s ]\n" +
    "    [ CASCADE | RESTRICT ]\n" +
    "\n" +
    "REVOKE [ GRANT OPTION FOR ]\n" +
    "    { { SET | ALTER SYSTEM } [, ...] | ALL [ PRIVILEGES ] }\n" +
    "    ON PARAMETER %s [, ...]\n" +
    "    FROM %s [, ...]\n" +
    "    [ GRANTED BY %s ]\n" +
    "    [ CASCADE | RESTRICT ]\n" +
    "\n" +
    "REVOKE [ GRANT OPTION FOR ]\n" +
    "    { { CREATE | USAGE } [, ...] | ALL [ PRIVILEGES ] }\n" +
    "    ON SCHEMA %s [, ...]\n" +
    "    FROM %s [, ...]\n" +
    "    [ GRANTED BY %s ]\n" +
    "    [ CASCADE | RESTRICT ]\n" +
    "\n" +
    "REVOKE [ GRANT OPTION FOR ]\n" +
    "    { CREATE | ALL [ PRIVILEGES ] }\n" +
    "    ON TABLESPACE %s [, ...]\n" +
    "    FROM %s [, ...]\n" +
    "    [ GRANTED BY %s ]\n" +
    "    [ CASCADE | RESTRICT ]\n" +
    "\n" +
    "REVOKE [ GRANT OPTION FOR ]\n" +
    "    { USAGE | ALL [ PRIVILEGES ] }\n" +
    "    ON TYPE %s [, ...]\n" +
    "    FROM %s [, ...]\n" +
    "    [ GRANTED BY %s ]\n" +
    "    [ CASCADE | RESTRICT ]\n" +
    "\n" +
    "REVOKE [ { ADMIN | INHERIT | SET } OPTION FOR ]\n" +
    "    %s [, ...] FROM %s [, ...]\n" +
    "    [ GRANTED BY %s ]\n" +
    "    [ CASCADE | RESTRICT ]\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "    [ GROUP ] %s\n" +
    "  | PUBLIC\n" +
    "  | CURRENT_ROLE\n" +
    "  | CURRENT_USER\n" +
    "  | SESSION_USER",
    _("table_name"),
    _("schema_name"),
    _("role_specification"),
    _("role_specification"),
    _("column_name"),
    _("column_name"),
    _("table_name"),
    _("role_specification"),
    _("role_specification"),
    _("sequence_name"),
    _("schema_name"),
    _("role_specification"),
    _("role_specification"),
    _("database_name"),
    _("role_specification"),
    _("role_specification"),
    _("domain_name"),
    _("role_specification"),
    _("role_specification"),
    _("fdw_name"),
    _("role_specification"),
    _("role_specification"),
    _("server_name"),
    _("role_specification"),
    _("role_specification"),
    _("function_name"),
    _("argmode"),
    _("arg_name"),
    _("arg_type"),
    _("schema_name"),
    _("role_specification"),
    _("role_specification"),
    _("lang_name"),
    _("role_specification"),
    _("role_specification"),
    _("loid"),
    _("role_specification"),
    _("role_specification"),
    _("configuration_parameter"),
    _("role_specification"),
    _("role_specification"),
    _("schema_name"),
    _("role_specification"),
    _("role_specification"),
    _("tablespace_name"),
    _("role_specification"),
    _("role_specification"),
    _("type_name"),
    _("role_specification"),
    _("role_specification"),
    _("role_name"),
    _("role_specification"),
    _("role_specification"),
    _("where role_specification can be:"),
    _("role_name"));
}

function sql_help_ROLLBACK(buf) {
  appendPQExpBuffer(buf,
    "ROLLBACK [ WORK | TRANSACTION ] [ AND [ NO ] CHAIN ]");
}

function sql_help_ROLLBACK_PREPARED(buf) {
  appendPQExpBuffer(buf,
    "ROLLBACK PREPARED %s",
    _("transaction_id"));
}

function sql_help_ROLLBACK_TO_SAVEPOINT(buf) {
  appendPQExpBuffer(buf,
    "ROLLBACK [ WORK | TRANSACTION ] TO [ SAVEPOINT ] %s",
    _("savepoint_name"));
}

function sql_help_SAVEPOINT(buf) {
  appendPQExpBuffer(buf,
    "SAVEPOINT %s",
    _("savepoint_name"));
}

function sql_help_SECURITY_LABEL(buf) {
  appendPQExpBuffer(buf,
    "SECURITY LABEL [ FOR %s ] ON\n" +
    "{\n" +
    "  TABLE %s |\n" +
    "  COLUMN %s.%s |\n" +
    "  AGGREGATE %s ( %s ) |\n" +
    "  DATABASE %s |\n" +
    "  DOMAIN %s |\n" +
    "  EVENT TRIGGER %s |\n" +
    "  FOREIGN TABLE %s\n" +
    "  FUNCTION %s [ ( [ [ %s ] [ %s ] %s [, ...] ] ) ] |\n" +
    "  LARGE OBJECT %s |\n" +
    "  MATERIALIZED VIEW %s |\n" +
    "  [ PROCEDURAL ] LANGUAGE %s |\n" +
    "  PROCEDURE %s [ ( [ [ %s ] [ %s ] %s [, ...] ] ) ] |\n" +
    "  PUBLICATION %s |\n" +
    "  ROLE %s |\n" +
    "  ROUTINE %s [ ( [ [ %s ] [ %s ] %s [, ...] ] ) ] |\n" +
    "  SCHEMA %s |\n" +
    "  SEQUENCE %s |\n" +
    "  SUBSCRIPTION %s |\n" +
    "  TABLESPACE %s |\n" +
    "  TYPE %s |\n" +
    "  VIEW %s\n" +
    "} IS { %s | NULL }\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "* |\n" +
    "[ %s ] [ %s ] %s [ , ... ] |\n" +
    "[ [ %s ] [ %s ] %s [ , ... ] ] ORDER BY [ %s ] [ %s ] %s [ , ... ]",
    _("provider"),
    _("object_name"),
    _("table_name"),
    _("column_name"),
    _("aggregate_name"),
    _("aggregate_signature"),
    _("object_name"),
    _("object_name"),
    _("object_name"),
    _("object_name"),
    _("function_name"),
    _("argmode"),
    _("argname"),
    _("argtype"),
    _("large_object_oid"),
    _("object_name"),
    _("object_name"),
    _("procedure_name"),
    _("argmode"),
    _("argname"),
    _("argtype"),
    _("object_name"),
    _("object_name"),
    _("routine_name"),
    _("argmode"),
    _("argname"),
    _("argtype"),
    _("object_name"),
    _("object_name"),
    _("object_name"),
    _("object_name"),
    _("object_name"),
    _("object_name"),
    _("string_literal"),
    _("where aggregate_signature is:"),
    _("argmode"),
    _("argname"),
    _("argtype"),
    _("argmode"),
    _("argname"),
    _("argtype"),
    _("argmode"),
    _("argname"),
    _("argtype"));
}

function sql_help_SELECT(buf) {
  appendPQExpBuffer(buf,
    "[ WITH [ RECURSIVE ] %s [, ...] ]\n" +
    "SELECT [ ALL | DISTINCT [ ON ( %s [, ...] ) ] ]\n" +
    "    [ * | %s [ [ AS ] %s ] [, ...] ]\n" +
    "    [ FROM %s [, ...] ]\n" +
    "    [ WHERE %s ]\n" +
    "    [ GROUP BY [ ALL | DISTINCT ] %s [, ...] ]\n" +
    "    [ HAVING %s ]\n" +
    "    [ WINDOW %s AS ( %s ) [, ...] ]\n" +
    "    [ { UNION | INTERSECT | EXCEPT } [ ALL | DISTINCT ] %s ]\n" +
    "    [ ORDER BY %s [ ASC | DESC | USING %s ] [ NULLS { FIRST | LAST } ] [, ...] ]\n" +
    "    [ LIMIT { %s | ALL } ]\n" +
    "    [ OFFSET %s [ ROW | ROWS ] ]\n" +
    "    [ FETCH { FIRST | NEXT } [ %s ] { ROW | ROWS } { ONLY | WITH TIES } ]\n" +
    "    [ FOR { UPDATE | NO KEY UPDATE | SHARE | KEY SHARE } [ OF %s [, ...] ] [ NOWAIT | SKIP LOCKED ] [...] ]\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "    [ ONLY ] %s [ * ] [ [ AS ] %s [ ( %s [, ...] ) ] ]\n" +
    "                [ TABLESAMPLE %s ( %s [, ...] ) [ REPEATABLE ( %s ) ] ]\n" +
    "    [ LATERAL ] ( %s ) [ [ AS ] %s [ ( %s [, ...] ) ] ]\n" +
    "    %s [ [ AS ] %s [ ( %s [, ...] ) ] ]\n" +
    "    [ LATERAL ] %s ( [ %s [, ...] ] )\n" +
    "                [ WITH ORDINALITY ] [ [ AS ] %s [ ( %s [, ...] ) ] ]\n" +
    "    [ LATERAL ] %s ( [ %s [, ...] ] ) [ AS ] %s ( %s [, ...] )\n" +
    "    [ LATERAL ] %s ( [ %s [, ...] ] ) AS ( %s [, ...] )\n" +
    "    [ LATERAL ] ROWS FROM( %s ( [ %s [, ...] ] ) [ AS ( %s [, ...] ) ] [, ...] )\n" +
    "                [ WITH ORDINALITY ] [ [ AS ] %s [ ( %s [, ...] ) ] ]\n" +
    "    %s %s %s { ON %s | USING ( %s [, ...] ) [ AS %s ] }\n" +
    "    %s NATURAL %s %s\n" +
    "    %s CROSS JOIN %s\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "    ( )\n" +
    "    %s\n" +
    "    ( %s [, ...] )\n" +
    "    ROLLUP ( { %s | ( %s [, ...] ) } [, ...] )\n" +
    "    CUBE ( { %s | ( %s [, ...] ) } [, ...] )\n" +
    "    GROUPING SETS ( %s [, ...] )\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "    %s [ ( %s [, ...] ) ] AS [ [ NOT ] MATERIALIZED ] ( %s | %s | %s | %s | %s )\n" +
    "        [ SEARCH { BREADTH | DEPTH } FIRST BY %s [, ...] SET %s ]\n" +
    "        [ CYCLE %s [, ...] SET %s [ TO %s DEFAULT %s ] USING %s ]\n" +
    "\n" +
    "TABLE [ ONLY ] %s [ * ]",
    _("with_query"),
    _("expression"),
    _("expression"),
    _("output_name"),
    _("from_item"),
    _("condition"),
    _("grouping_element"),
    _("condition"),
    _("window_name"),
    _("window_definition"),
    _("select"),
    _("expression"),
    _("operator"),
    _("count"),
    _("start"),
    _("count"),
    _("table_name"),
    _("where from_item can be one of:"),
    _("table_name"),
    _("alias"),
    _("column_alias"),
    _("sampling_method"),
    _("argument"),
    _("seed"),
    _("select"),
    _("alias"),
    _("column_alias"),
    _("with_query_name"),
    _("alias"),
    _("column_alias"),
    _("function_name"),
    _("argument"),
    _("alias"),
    _("column_alias"),
    _("function_name"),
    _("argument"),
    _("alias"),
    _("column_definition"),
    _("function_name"),
    _("argument"),
    _("column_definition"),
    _("function_name"),
    _("argument"),
    _("column_definition"),
    _("alias"),
    _("column_alias"),
    _("from_item"),
    _("join_type"),
    _("from_item"),
    _("join_condition"),
    _("join_column"),
    _("join_using_alias"),
    _("from_item"),
    _("join_type"),
    _("from_item"),
    _("from_item"),
    _("from_item"),
    _("and grouping_element can be one of:"),
    _("expression"),
    _("expression"),
    _("expression"),
    _("expression"),
    _("expression"),
    _("expression"),
    _("grouping_element"),
    _("and with_query is:"),
    _("with_query_name"),
    _("column_name"),
    _("select"),
    _("values"),
    _("insert"),
    _("update"),
    _("delete"),
    _("column_name"),
    _("search_seq_col_name"),
    _("column_name"),
    _("cycle_mark_col_name"),
    _("cycle_mark_value"),
    _("cycle_mark_default"),
    _("cycle_path_col_name"),
    _("table_name"));
}

function sql_help_SELECT_INTO(buf) {
  appendPQExpBuffer(buf,
    "[ WITH [ RECURSIVE ] %s [, ...] ]\n" +
    "SELECT [ ALL | DISTINCT [ ON ( %s [, ...] ) ] ]\n" +
    "    * | %s [ [ AS ] %s ] [, ...]\n" +
    "    INTO [ TEMPORARY | TEMP | UNLOGGED ] [ TABLE ] %s\n" +
    "    [ FROM %s [, ...] ]\n" +
    "    [ WHERE %s ]\n" +
    "    [ GROUP BY %s [, ...] ]\n" +
    "    [ HAVING %s ]\n" +
    "    [ WINDOW %s AS ( %s ) [, ...] ]\n" +
    "    [ { UNION | INTERSECT | EXCEPT } [ ALL | DISTINCT ] %s ]\n" +
    "    [ ORDER BY %s [ ASC | DESC | USING %s ] [ NULLS { FIRST | LAST } ] [, ...] ]\n" +
    "    [ LIMIT { %s | ALL } ]\n" +
    "    [ OFFSET %s [ ROW | ROWS ] ]\n" +
    "    [ FETCH { FIRST | NEXT } [ %s ] { ROW | ROWS } ONLY ]\n" +
    "    [ FOR { UPDATE | SHARE } [ OF %s [, ...] ] [ NOWAIT ] [...] ]",
    _("with_query"),
    _("expression"),
    _("expression"),
    _("output_name"),
    _("new_table"),
    _("from_item"),
    _("condition"),
    _("expression"),
    _("condition"),
    _("window_name"),
    _("window_definition"),
    _("select"),
    _("expression"),
    _("operator"),
    _("count"),
    _("start"),
    _("count"),
    _("table_name"));
}

function sql_help_SET(buf) {
  appendPQExpBuffer(buf,
    "SET [ SESSION | LOCAL ] %s { TO | = } { %s | '%s' | DEFAULT }\n" +
    "SET [ SESSION | LOCAL ] TIME ZONE { %s | '%s' | LOCAL | DEFAULT }",
    _("configuration_parameter"),
    _("value"),
    _("value"),
    _("value"),
    _("value"));
}

function sql_help_SET_CONSTRAINTS(buf) {
  appendPQExpBuffer(buf,
    "SET CONSTRAINTS { ALL | %s [, ...] } { DEFERRED | IMMEDIATE }",
    _("name"));
}

function sql_help_SET_ROLE(buf) {
  appendPQExpBuffer(buf,
    "SET [ SESSION | LOCAL ] ROLE %s\n" +
    "SET [ SESSION | LOCAL ] ROLE NONE\n" +
    "RESET ROLE",
    _("role_name"));
}

function sql_help_SET_SESSION_AUTHORIZATION(buf) {
  appendPQExpBuffer(buf,
    "SET [ SESSION | LOCAL ] SESSION AUTHORIZATION %s\n" +
    "SET [ SESSION | LOCAL ] SESSION AUTHORIZATION DEFAULT\n" +
    "RESET SESSION AUTHORIZATION",
    _("user_name"));
}

function sql_help_SET_TRANSACTION(buf) {
  appendPQExpBuffer(buf,
    "SET TRANSACTION %s [, ...]\n" +
    "SET TRANSACTION SNAPSHOT %s\n" +
    "SET SESSION CHARACTERISTICS AS TRANSACTION %s [, ...]\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "    ISOLATION LEVEL { SERIALIZABLE | REPEATABLE READ | READ COMMITTED | READ UNCOMMITTED }\n" +
    "    READ WRITE | READ ONLY\n" +
    "    [ NOT ] DEFERRABLE",
    _("transaction_mode"),
    _("snapshot_id"),
    _("transaction_mode"),
    _("where transaction_mode is one of:"));
}

function sql_help_SHOW(buf) {
  appendPQExpBuffer(buf,
    "SHOW %s\n" +
    "SHOW ALL",
    _("name"));
}

function sql_help_START_TRANSACTION(buf) {
  appendPQExpBuffer(buf,
    "START TRANSACTION [ %s [, ...] ]\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "    ISOLATION LEVEL { SERIALIZABLE | REPEATABLE READ | READ COMMITTED | READ UNCOMMITTED }\n" +
    "    READ WRITE | READ ONLY\n" +
    "    [ NOT ] DEFERRABLE",
    _("transaction_mode"),
    _("where transaction_mode is one of:"));
}

function sql_help_TABLE(buf) {
  appendPQExpBuffer(buf,
    "[ WITH [ RECURSIVE ] %s [, ...] ]\n" +
    "SELECT [ ALL | DISTINCT [ ON ( %s [, ...] ) ] ]\n" +
    "    [ * | %s [ [ AS ] %s ] [, ...] ]\n" +
    "    [ FROM %s [, ...] ]\n" +
    "    [ WHERE %s ]\n" +
    "    [ GROUP BY [ ALL | DISTINCT ] %s [, ...] ]\n" +
    "    [ HAVING %s ]\n" +
    "    [ WINDOW %s AS ( %s ) [, ...] ]\n" +
    "    [ { UNION | INTERSECT | EXCEPT } [ ALL | DISTINCT ] %s ]\n" +
    "    [ ORDER BY %s [ ASC | DESC | USING %s ] [ NULLS { FIRST | LAST } ] [, ...] ]\n" +
    "    [ LIMIT { %s | ALL } ]\n" +
    "    [ OFFSET %s [ ROW | ROWS ] ]\n" +
    "    [ FETCH { FIRST | NEXT } [ %s ] { ROW | ROWS } { ONLY | WITH TIES } ]\n" +
    "    [ FOR { UPDATE | NO KEY UPDATE | SHARE | KEY SHARE } [ OF %s [, ...] ] [ NOWAIT | SKIP LOCKED ] [...] ]\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "    [ ONLY ] %s [ * ] [ [ AS ] %s [ ( %s [, ...] ) ] ]\n" +
    "                [ TABLESAMPLE %s ( %s [, ...] ) [ REPEATABLE ( %s ) ] ]\n" +
    "    [ LATERAL ] ( %s ) [ [ AS ] %s [ ( %s [, ...] ) ] ]\n" +
    "    %s [ [ AS ] %s [ ( %s [, ...] ) ] ]\n" +
    "    [ LATERAL ] %s ( [ %s [, ...] ] )\n" +
    "                [ WITH ORDINALITY ] [ [ AS ] %s [ ( %s [, ...] ) ] ]\n" +
    "    [ LATERAL ] %s ( [ %s [, ...] ] ) [ AS ] %s ( %s [, ...] )\n" +
    "    [ LATERAL ] %s ( [ %s [, ...] ] ) AS ( %s [, ...] )\n" +
    "    [ LATERAL ] ROWS FROM( %s ( [ %s [, ...] ] ) [ AS ( %s [, ...] ) ] [, ...] )\n" +
    "                [ WITH ORDINALITY ] [ [ AS ] %s [ ( %s [, ...] ) ] ]\n" +
    "    %s %s %s { ON %s | USING ( %s [, ...] ) [ AS %s ] }\n" +
    "    %s NATURAL %s %s\n" +
    "    %s CROSS JOIN %s\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "    ( )\n" +
    "    %s\n" +
    "    ( %s [, ...] )\n" +
    "    ROLLUP ( { %s | ( %s [, ...] ) } [, ...] )\n" +
    "    CUBE ( { %s | ( %s [, ...] ) } [, ...] )\n" +
    "    GROUPING SETS ( %s [, ...] )\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "    %s [ ( %s [, ...] ) ] AS [ [ NOT ] MATERIALIZED ] ( %s | %s | %s | %s | %s )\n" +
    "        [ SEARCH { BREADTH | DEPTH } FIRST BY %s [, ...] SET %s ]\n" +
    "        [ CYCLE %s [, ...] SET %s [ TO %s DEFAULT %s ] USING %s ]\n" +
    "\n" +
    "TABLE [ ONLY ] %s [ * ]",
    _("with_query"),
    _("expression"),
    _("expression"),
    _("output_name"),
    _("from_item"),
    _("condition"),
    _("grouping_element"),
    _("condition"),
    _("window_name"),
    _("window_definition"),
    _("select"),
    _("expression"),
    _("operator"),
    _("count"),
    _("start"),
    _("count"),
    _("table_name"),
    _("where from_item can be one of:"),
    _("table_name"),
    _("alias"),
    _("column_alias"),
    _("sampling_method"),
    _("argument"),
    _("seed"),
    _("select"),
    _("alias"),
    _("column_alias"),
    _("with_query_name"),
    _("alias"),
    _("column_alias"),
    _("function_name"),
    _("argument"),
    _("alias"),
    _("column_alias"),
    _("function_name"),
    _("argument"),
    _("alias"),
    _("column_definition"),
    _("function_name"),
    _("argument"),
    _("column_definition"),
    _("function_name"),
    _("argument"),
    _("column_definition"),
    _("alias"),
    _("column_alias"),
    _("from_item"),
    _("join_type"),
    _("from_item"),
    _("join_condition"),
    _("join_column"),
    _("join_using_alias"),
    _("from_item"),
    _("join_type"),
    _("from_item"),
    _("from_item"),
    _("from_item"),
    _("and grouping_element can be one of:"),
    _("expression"),
    _("expression"),
    _("expression"),
    _("expression"),
    _("expression"),
    _("expression"),
    _("grouping_element"),
    _("and with_query is:"),
    _("with_query_name"),
    _("column_name"),
    _("select"),
    _("values"),
    _("insert"),
    _("update"),
    _("delete"),
    _("column_name"),
    _("search_seq_col_name"),
    _("column_name"),
    _("cycle_mark_col_name"),
    _("cycle_mark_value"),
    _("cycle_mark_default"),
    _("cycle_path_col_name"),
    _("table_name"));
}

function sql_help_TRUNCATE(buf) {
  appendPQExpBuffer(buf,
    "TRUNCATE [ TABLE ] [ ONLY ] %s [ * ] [, ... ]\n" +
    "    [ RESTART IDENTITY | CONTINUE IDENTITY ] [ CASCADE | RESTRICT ]",
    _("name"));
}

function sql_help_UNLISTEN(buf) {
  appendPQExpBuffer(buf,
    "UNLISTEN { %s | * }",
    _("channel"));
}

function sql_help_UPDATE(buf) {
  appendPQExpBuffer(buf,
    "[ WITH [ RECURSIVE ] %s [, ...] ]\n" +
    "UPDATE [ ONLY ] %s [ * ] [ [ AS ] %s ]\n" +
    "    SET { %s = { %s | DEFAULT } |\n" +
    "          ( %s [, ...] ) = [ ROW ] ( { %s | DEFAULT } [, ...] ) |\n" +
    "          ( %s [, ...] ) = ( %s )\n" +
    "        } [, ...]\n" +
    "    [ FROM %s [, ...] ]\n" +
    "    [ WHERE %s | WHERE CURRENT OF %s ]\n" +
    "    [ RETURNING * | %s [ [ AS ] %s ] [, ...] ]",
    _("with_query"),
    _("table_name"),
    _("alias"),
    _("column_name"),
    _("expression"),
    _("column_name"),
    _("expression"),
    _("column_name"),
    _("sub-SELECT"),
    _("from_item"),
    _("condition"),
    _("cursor_name"),
    _("output_expression"),
    _("output_name"));
}

function sql_help_VACUUM(buf) {
  appendPQExpBuffer(buf,
    "VACUUM [ ( %s [, ...] ) ] [ %s [, ...] ]\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "    FULL [ %s ]\n" +
    "    FREEZE [ %s ]\n" +
    "    VERBOSE [ %s ]\n" +
    "    ANALYZE [ %s ]\n" +
    "    DISABLE_PAGE_SKIPPING [ %s ]\n" +
    "    SKIP_LOCKED [ %s ]\n" +
    "    INDEX_CLEANUP { AUTO | ON | OFF }\n" +
    "    PROCESS_MAIN [ %s ]\n" +
    "    PROCESS_TOAST [ %s ]\n" +
    "    TRUNCATE [ %s ]\n" +
    "    PARALLEL %s\n" +
    "    SKIP_DATABASE_STATS [ %s ]\n" +
    "    ONLY_DATABASE_STATS [ %s ]\n" +
    "    BUFFER_USAGE_LIMIT %s\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "    %s [ ( %s [, ...] ) ]",
    _("option"),
    _("table_and_columns"),
    _("where option can be one of:"),
    _("boolean"),
    _("boolean"),
    _("boolean"),
    _("boolean"),
    _("boolean"),
    _("boolean"),
    _("boolean"),
    _("boolean"),
    _("boolean"),
    _("integer"),
    _("boolean"),
    _("boolean"),
    _("size"),
    _("and table_and_columns is:"),
    _("table_name"),
    _("column_name"));
}

function sql_help_VALUES(buf) {
  appendPQExpBuffer(buf,
    "VALUES ( %s [, ...] ) [, ...]\n" +
    "    [ ORDER BY %s [ ASC | DESC | USING %s ] [, ...] ]\n" +
    "    [ LIMIT { %s | ALL } ]\n" +
    "    [ OFFSET %s [ ROW | ROWS ] ]\n" +
    "    [ FETCH { FIRST | NEXT } [ %s ] { ROW | ROWS } ONLY ]",
    _("expression"),
    _("sort_expression"),
    _("operator"),
    _("count"),
    _("start"),
    _("count"));
}

function sql_help_WITH(buf) {
  appendPQExpBuffer(buf,
    "[ WITH [ RECURSIVE ] %s [, ...] ]\n" +
    "SELECT [ ALL | DISTINCT [ ON ( %s [, ...] ) ] ]\n" +
    "    [ * | %s [ [ AS ] %s ] [, ...] ]\n" +
    "    [ FROM %s [, ...] ]\n" +
    "    [ WHERE %s ]\n" +
    "    [ GROUP BY [ ALL | DISTINCT ] %s [, ...] ]\n" +
    "    [ HAVING %s ]\n" +
    "    [ WINDOW %s AS ( %s ) [, ...] ]\n" +
    "    [ { UNION | INTERSECT | EXCEPT } [ ALL | DISTINCT ] %s ]\n" +
    "    [ ORDER BY %s [ ASC | DESC | USING %s ] [ NULLS { FIRST | LAST } ] [, ...] ]\n" +
    "    [ LIMIT { %s | ALL } ]\n" +
    "    [ OFFSET %s [ ROW | ROWS ] ]\n" +
    "    [ FETCH { FIRST | NEXT } [ %s ] { ROW | ROWS } { ONLY | WITH TIES } ]\n" +
    "    [ FOR { UPDATE | NO KEY UPDATE | SHARE | KEY SHARE } [ OF %s [, ...] ] [ NOWAIT | SKIP LOCKED ] [...] ]\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "    [ ONLY ] %s [ * ] [ [ AS ] %s [ ( %s [, ...] ) ] ]\n" +
    "                [ TABLESAMPLE %s ( %s [, ...] ) [ REPEATABLE ( %s ) ] ]\n" +
    "    [ LATERAL ] ( %s ) [ [ AS ] %s [ ( %s [, ...] ) ] ]\n" +
    "    %s [ [ AS ] %s [ ( %s [, ...] ) ] ]\n" +
    "    [ LATERAL ] %s ( [ %s [, ...] ] )\n" +
    "                [ WITH ORDINALITY ] [ [ AS ] %s [ ( %s [, ...] ) ] ]\n" +
    "    [ LATERAL ] %s ( [ %s [, ...] ] ) [ AS ] %s ( %s [, ...] )\n" +
    "    [ LATERAL ] %s ( [ %s [, ...] ] ) AS ( %s [, ...] )\n" +
    "    [ LATERAL ] ROWS FROM( %s ( [ %s [, ...] ] ) [ AS ( %s [, ...] ) ] [, ...] )\n" +
    "                [ WITH ORDINALITY ] [ [ AS ] %s [ ( %s [, ...] ) ] ]\n" +
    "    %s %s %s { ON %s | USING ( %s [, ...] ) [ AS %s ] }\n" +
    "    %s NATURAL %s %s\n" +
    "    %s CROSS JOIN %s\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "    ( )\n" +
    "    %s\n" +
    "    ( %s [, ...] )\n" +
    "    ROLLUP ( { %s | ( %s [, ...] ) } [, ...] )\n" +
    "    CUBE ( { %s | ( %s [, ...] ) } [, ...] )\n" +
    "    GROUPING SETS ( %s [, ...] )\n" +
    "\n" +
    "%s\n" +
    "\n" +
    "    %s [ ( %s [, ...] ) ] AS [ [ NOT ] MATERIALIZED ] ( %s | %s | %s | %s | %s )\n" +
    "        [ SEARCH { BREADTH | DEPTH } FIRST BY %s [, ...] SET %s ]\n" +
    "        [ CYCLE %s [, ...] SET %s [ TO %s DEFAULT %s ] USING %s ]\n" +
    "\n" +
    "TABLE [ ONLY ] %s [ * ]",
    _("with_query"),
    _("expression"),
    _("expression"),
    _("output_name"),
    _("from_item"),
    _("condition"),
    _("grouping_element"),
    _("condition"),
    _("window_name"),
    _("window_definition"),
    _("select"),
    _("expression"),
    _("operator"),
    _("count"),
    _("start"),
    _("count"),
    _("table_name"),
    _("where from_item can be one of:"),
    _("table_name"),
    _("alias"),
    _("column_alias"),
    _("sampling_method"),
    _("argument"),
    _("seed"),
    _("select"),
    _("alias"),
    _("column_alias"),
    _("with_query_name"),
    _("alias"),
    _("column_alias"),
    _("function_name"),
    _("argument"),
    _("alias"),
    _("column_alias"),
    _("function_name"),
    _("argument"),
    _("alias"),
    _("column_definition"),
    _("function_name"),
    _("argument"),
    _("column_definition"),
    _("function_name"),
    _("argument"),
    _("column_definition"),
    _("alias"),
    _("column_alias"),
    _("from_item"),
    _("join_type"),
    _("from_item"),
    _("join_condition"),
    _("join_column"),
    _("join_using_alias"),
    _("from_item"),
    _("join_type"),
    _("from_item"),
    _("from_item"),
    _("from_item"),
    _("and grouping_element can be one of:"),
    _("expression"),
    _("expression"),
    _("expression"),
    _("expression"),
    _("expression"),
    _("expression"),
    _("grouping_element"),
    _("and with_query is:"),
    _("with_query_name"),
    _("column_name"),
    _("select"),
    _("values"),
    _("insert"),
    _("update"),
    _("delete"),
    _("column_name"),
    _("search_seq_col_name"),
    _("column_name"),
    _("cycle_mark_col_name"),
    _("cycle_mark_value"),
    _("cycle_mark_default"),
    _("cycle_path_col_name"),
    _("table_name"));
}