import { helpIndex } from './sql-help.generated.mjs';

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

  // Each item of output goes to outputFn, except that text (written to stdout, or logged) is collected, and goes as
  // one item before the next item, or at the end: e.g. a warning for each extra argument, or each line of \sf+
  let text = null;
  function flushText() {
    if (text !== null) outputFn(text.replace(/\n+$/, ''));
    text = null;
  }
  function output(item) {
    flushText();
    outputFn(item);
  }
  function write(str) {
    text = (text ?? '') + str;
  }

  async function main() {
    if (cmd[0] !== '\\') {
      output(`unsupported command: ${cmd}`);
      return false;
    }
    // what's after the backslash, as psql's lexer leaves it for HandleSlashCmds
    const scan_state = [cmd.slice(1), 0];

    // psql's SQL help (\h), from the docs (see sql-help.generated.mjs)
    function helpSQL(topic, pager) {
      const helpSearch = (topic ?? '').trim().toUpperCase().replace(/\s+/g, ' ');
      if (helpSearch === '') {
        output("Available help:\n" + helpIndex.map(arr => arr[0]).join('\n'));
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
        output(`No help available for "${topic.trim()}".\nTry \\h with no arguments to see available help.`);
        return;
      }
      for (const index of matches) {
        output(
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
    const
      unsupported = command => () => { pg_log_error('\\%s is not supported', command); return false; },
      usage = unsupported('? options'),
      helpVariables = unsupported('? variables'),
      do_lo_export = unsupported('lo_export'),
      do_lo_import = unsupported('lo_import'),
      do_lo_unlink = unsupported('lo_unlink'),
      expand_tilde = noop;

    const PSQLexec = async (sql, suppressEcho = false) => {
      throwIfCancelled();
      if (echoHidden && !suppressEcho) output(`/**** INTERNAL QUERY ****/\n${sql}\n/************************/`);
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

    const
      PQresultStatus = res => res.status,
      PQresultErrorField = (res, field) => res.errorFields?.[field] ?? NULL,
      standard_strings = () => std_strings;

    // Just enough of C's stdio: a stream is an object with write(), and stdout writes text (see write, above). There's
    // no pager.
    const
      stdout = { write },
      fputs = (str, stream) => stream.write(str),
      fprintf = (stream, template, ...args) => stream.write(sprintf(template, ...args)),
      printf = (template, ...args) => fprintf(stdout, template, ...args),
      fflush = noop,
      ClosePager = noop,
      PageOutput = (lines, topt) => stdout;

    // Errors
    const
      pg_log_error = (template, ...args) => write(sprintf(template, ...args) + '\n'),
      pg_log_error_internal = pg_log_error,
      pg_log_error_hint = pg_log_error,
      pg_log_warning = pg_log_error;

    // psql's \if stack (cstack): we're always in an active branch
    const
      conditional_active = cstack => true,
      conditional_stack_push = noop,
      conditional_stack_pop = noop;

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
     *
     * (This follows the lexer rules in psqlscanslash.l, for the option types the translation uses. There are no psql
     * variables here, so :name, :'name' and :"name" stay as they are, as in psql for a variable that isn't set, and
     * :{?name} is FALSE; and there are no backticks, which psql runs as shell commands, so ` is just a character.)
     */
    function psql_scan_slash_option(scan_state, type, quote, semicolon) {
      if (type !== OT_NORMAL && type !== OT_WHOLE_LINE) throw new Error(`scan type ${type} not implemented`);
      const [str] = scan_state;
      const space = /[ \t\n\r\f\v]/;
      let i = scan_state[1];
      let result = '';
      let lastQuote = 0;
      let unquotedChars = 0;  // characters at the end of the argument that weren't quoted (for stripping semicolons)
      let m;

      const unterminated = () => {
        pg_log_error('unterminated quoted string');
        scan_state[1] = str.length;
        return NULL;
      };

      // discard whitespace before the argument
      while (space.test(str[i] ?? '')) i++;

      if (type === OT_WHOLE_LINE) {
        // everything to the end of the line, without trailing semicolons and whitespace if semicolon is true
        result = str.slice(i);
        i = str.length;
        if (semicolon) result = result.replace(/[; \t\n\r\f\v]+$/, '');

      } else {
        for (; ;) {
          const rest = str.slice(i);
          // unquoted whitespace ends the argument, and so does a backslash (the start of the next command)
          if (rest === '' || space.test(rest[0]) || rest[0] === '\\') break;

          if (rest[0] === "'") {
            // single-quoted text: as it is, except for '' and backslash sequences
            lastQuote = "'";
            unquotedChars = 0;
            i++;
            for (; ;) {
              const rest = str.slice(i);
              if (rest === '') return unterminated();
              if (rest.startsWith("''")) result += "'", i += 2;
              else if (rest[0] === "'") { i++; break; }
              else if ((m = rest.match(/^\\[ntbrf]/))) result += { n: '\n', t: '\t', b: '\b', r: '\r', f: '\f' }[m[0][1]], i += 2;
              else if ((m = rest.match(/^\\([0-7]{1,3})/))) result += String.fromCharCode(parseInt(m[1], 8)), i += m[0].length;
              else if ((m = rest.match(/^\\x([0-9A-Fa-f]{1,2})/))) result += String.fromCharCode(parseInt(m[1], 16)), i += m[0].length;
              else if ((m = rest.match(/^\\(.)/))) result += m[1], i += 2;
              else result += rest[0], i++;
            }

          } else if (rest[0] === '"') {
            // double-quoted text: as it is, including the double quotes
            const end = str.indexOf('"', i + 1);
            if (end === -1) return unterminated();
            lastQuote = '"';
            unquotedChars = 0;
            result += str.slice(i, end + 1);
            i = end + 1;

          } else if ((m = rest.match(/^:(?:[A-Za-z\u0080-\uFFFF_0-9]+|'[A-Za-z\u0080-\uFFFF_0-9]+'|"[A-Za-z\u0080-\uFFFF_0-9]+")/))) {
            // a variable, which isn't set
            result += m[0];
            i += m[0].length;
            unquotedChars = 0;

          } else if ((m = rest.match(/^:\{\?[A-Za-z\u0080-\uFFFF_0-9]+\}/))) {
            // a test for a variable, which isn't set
            result += 'FALSE';
            i += m[0].length;

          } else {
            result += rest[0];
            i++;
            unquotedChars++;
          }
        }

        // strip any unquoted trailing semicolons, if requested
        if (semicolon) while (unquotedChars-- > 0 && result.endsWith(';')) result = result.slice(0, -1);
      }

      scan_state[1] = i;
      if (quote != NULL) quote.value = lastQuote;

      // an unquoted empty argument means there are no more
      return result === '' && lastQuote === 0 ? NULL : result;
    }


    /* TRANSLATED FROM C */

    /*
     * Initialise a table contents struct.
     *		Must be called before any other printTable method is used.
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
      output({ ...cont });  // must clone in case same content object is reused (and thus mutated) later
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
    function parsePGArray(atext, itemarray, nitems) {
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
      itemarray.value = NULL;
      nitems.value = 0;

      if (inputlen < 2 || atext[0] != '{' || atext[inputlen - 1] != '}')
        return false;			/* bad input */
      const items = itemarray.value = [];

      let at = 0;
      at++;					/* advance over initial '{' */

      curitem = 0;
      while (atext[at] != '}') {
        if (atext[at] == NULL)
          return false;		/* premature end of string */

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
        let kwnum = ScanKeywordNames.indexOf(rawid);  // as ScanKeywordLookup(rawid, &ScanKeywords)

        if (kwnum >= 0 && ScanKeywordCategories[kwnum] != UNRESERVED_KEYWORD)
          need_quotes = true;
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

    // Run the command (after everything is declared, including the translated globals)
    let pset;
    try {
      // get server version, if not supplied (and needed: not for help)
      const isHelp = ['?', 'h', 'help'].includes(psql_scan_slash_command([...scan_state]));
      if (!sversion && !isHelp) {  // covers null, undefined and (importantly) 0
        const vres = await PSQLexec('SHOW server_version_num', true);
        sversion = parseInt(vres.rows[0][0], 10);
      }

      pset = {
        sversion,
        cur_cmd_interactive: false,
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
            expanded: 0,
          },
          nullPrint: '',
        }
      };

      await HandleSlashCmds(scan_state, {}, createPQExpBuffer(), createPQExpBuffer());
      if (isHelp) return false;  // as before: help is informational

    } catch (err) {
      // throw err;
      output('ERROR:  ' + err.message);
      return cancel_pressed ? null : false;
    }

    return true;
  }

  const promise = main().finally(flushText);
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

// There's no numericlocale option (in printQuery, numericLocale is never set), so this is never called
function format_numeric_locale(my_str) {
  return my_str;
}

function PQmblenBounded(s, encoding) {  // a JS string is characters, not bytes, so a character's length is 1
  return 1;
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
  // as SQL_STR_DOUBLE: each quote is doubled, and so is each backslash, without standard_conforming_strings
  appendPQExpBufferStr(buf, "'" + str.replace(std_strings ? /'/g : /['\\]/g, '$&$&') + "'");
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


// The command name, after the backslash: up to whitespace or another backslash (as in psqlscanslash.l)
function psql_scan_slash_command(scan_state) {
  const [name] = scan_state[0].slice(scan_state[1]).match(/^[^\s\\]*/);
  scan_state[1] += name.length;
  return name;
}

const psql_scan_slash_command_end = noop;

function noop(x) {
  return x;
}
