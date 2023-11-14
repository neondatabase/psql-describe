// src/describe.mjs
var quote_all_identifiers = 0;
var NULL = null;
var FUNC_MAX_ARGS = 100;
var ESCAPE_STRING_SYNTAX = "E";
var InvalidOid = 0;
var EditableFunction = 0;
var EditableView = 1;
var PSQL_CMD_UNKNOWN = 0;
var PSQL_CMD_SKIP_LINE = 2;
var PSQL_CMD_ERROR = 5;
var OT_NORMAL = 0;
var OT_WHOLE_LINE = 4;
var PG_UTF8 = 6;
var CONNECTION_OK = 0;
var CONNECTION_BAD = 1;
var COERCION_METHOD_BINARY = "b";
var COERCION_METHOD_INOUT = "i";
var COERCION_CODE_ASSIGNMENT = "a";
var COERCION_CODE_EXPLICIT = "e";
var DEFACLOBJ_RELATION = "r";
var DEFACLOBJ_SEQUENCE = "S";
var DEFACLOBJ_FUNCTION = "f";
var DEFACLOBJ_TYPE = "T";
var DEFACLOBJ_NAMESPACE = "n";
var ATTRIBUTE_IDENTITY_ALWAYS = "a";
var ATTRIBUTE_IDENTITY_BY_DEFAULT = "d";
var ATTRIBUTE_GENERATED_STORED = "s";
var RELKIND_RELATION = "r";
var RELKIND_INDEX = "i";
var RELKIND_SEQUENCE = "S";
var RELKIND_TOASTVALUE = "t";
var RELKIND_VIEW = "v";
var RELKIND_MATVIEW = "m";
var RELKIND_COMPOSITE_TYPE = "c";
var RELKIND_FOREIGN_TABLE = "f";
var RELKIND_PARTITIONED_TABLE = "p";
var RELKIND_PARTITIONED_INDEX = "I";
var INT8OID = 20;
var INT2OID = 21;
var INT4OID = 23;
var OIDOID = 26;
var XIDOID = 28;
var CIDOID = 29;
var XID8OID = 5069;
var FLOAT4OID = 700;
var FLOAT8OID = 701;
var MONEYOID = 790;
var NUMERICOID = 1700;
var helpText = `Help
  \\? [commands]          show help on backslash commands

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
function describeDataToString(item) {
  return typeof item === "string" ? item : tableToString(item);
}
function describeDataToHtml(item) {
  return typeof item === "string" ? `<p>${htmlEscape(item, true)}</p>` : tableToHtml(item);
}
function describe(cmd, dbName, runQuery, outputFn, echoHidden = false, sversion = null, std_strings = 1) {
  let cancel_pressed = false;
  function cancel() {
    cancel_pressed = true;
    outputFn = () => void 0;
  }
  function throwIfCancelled() {
    if (cancel_pressed)
      throw new Error("cancelled");
  }
  async function main() {
    const match = cmd.match(/^\\([?dzsl]\S*)(.*)/);
    if (!match) {
      outputFn(`unsupported command: ${cmd}`);
      return false;
    }
    let [, matchedCommand, remaining] = match;
    matchedCommand = matchedCommand.replace(/^lo_list/, "dl");
    matchedCommand = matchedCommand.replace(/^z/, "dp");
    if (matchedCommand[0] === "?") {
      outputFn(helpText);
      return false;
    }
    const PSQLexec = async (sql, suppressEcho = false) => {
      throwIfCancelled();
      if (echoHidden && !suppressEcho)
        outputFn(`/******** QUERY *********/
${sql}
/************************/`);
      const result = await runQuery(sql);
      throwIfCancelled();
      return result;
    };
    let pset;
    try {
      if (sversion == null) {
        const vres = await PSQLexec("SHOW server_version_num", true);
        sversion = parseInt(vres.rows[0][0], 10);
      }
      pset = {
        sversion,
        db: {
          // PGconn struct
          dbName,
          sversion,
          std_strings,
          status: CONNECTION_OK,
          encoding: PG_UTF8
        },
        popt: {
          // print options
          topt: {
            default_footer: true
          },
          nullPrint: ""
        }
      };
      const scan_state = [remaining, 0], result = await (matchedCommand[0] === "d" ? exec_command_d(scan_state, true, matchedCommand) : matchedCommand[0] === "s" ? matchedCommand[1] === "f" || matchedCommand[1] === "v" ? exec_command_sf_sv(scan_state, true, matchedCommand, matchedCommand[1] === "f") : PSQL_CMD_UNKNOWN : exec_command_list(scan_state, true, matchedCommand));
      if (result == PSQL_CMD_UNKNOWN)
        outputFn(`invalid command \\${matchedCommand}`);
      let arg, warnings = [];
      while (arg = psql_scan_slash_option(scan_state, OT_NORMAL, NULL, true))
        warnings.push(sprintf('\\%s: extra argument "%s" ignored', matchedCommand, arg));
      if (warnings.length > 0)
        outputFn(warnings.join("\n"));
    } catch (err) {
      outputFn("ERROR:  " + err.message);
      return cancel_pressed ? null : false;
    }
    function pg_log_error(template, ...args) {
      outputFn(sprintf(template, ...args));
    }
    function validateSQLNamePattern(buf, pattern, have_where, force_escape, schemavar, namevar, altnamevar, visibilityrule, added_clause, maxparts) {
      let dbbuf = {
        /* struct */
      };
      let dotcnt = {};
      let added;
      initPQExpBuffer(dbbuf);
      added = processSQLNamePattern(
        pset.db,
        buf,
        pattern,
        have_where,
        force_escape,
        schemavar,
        namevar,
        altnamevar,
        visibilityrule,
        dbbuf,
        dotcnt
      );
      dotcnt = dotcnt.value;
      if (added_clause)
        added_clause.value = added;
      if (dotcnt >= maxparts) {
        pg_log_error(
          "improper qualified name (too many dotted names): %s",
          pattern
        );
        return false;
      }
      if (maxparts > 1 && dotcnt == maxparts - 1) {
        if (PQdb(pset.db) == NULL) {
          pg_log_error("You are currently not connected to a database.");
          return false;
        }
        if (strcmp(PQdb(pset.db), dbbuf.data) != 0) {
          pg_log_error(
            "cross-database references are not implemented: %s",
            pattern
          );
          return false;
        }
      }
      return true;
    }
    function processSQLNamePattern(conn, buf, pattern, have_where, force_escape, schemavar, namevar, altnamevar, visibilityrule, dbnamebuf, dotcnt) {
      let schemabuf = {
        /* struct */
      };
      let namebuf = {
        /* struct */
      };
      let added_clause = false;
      if (!dotcnt)
        dotcnt = {};
      dotcnt.value = 0;
      if (pattern == NULL) {
        if (visibilityrule) {
          appendPQExpBufferStr(buf, have_where ? "  AND " : "WHERE ");
          have_where = true;
          added_clause = true;
          appendPQExpBuffer(buf, "%s\n", visibilityrule);
        }
        return added_clause;
      }
      initPQExpBuffer(schemabuf);
      initPQExpBuffer(namebuf);
      patternToSQLRegex(
        PQclientEncoding(conn),
        schemavar ? dbnamebuf : NULL,
        schemavar ? schemabuf : NULL,
        namebuf,
        pattern,
        force_escape,
        true,
        dotcnt
      );
      if (namevar && namebuf.len > 2) {
        if (strcmp(namebuf.data, "^(.*)$") != 0) {
          appendPQExpBufferStr(buf, have_where ? "  AND " : "WHERE ");
          have_where = true;
          added_clause = true;
          if (altnamevar) {
            appendPQExpBuffer(
              buf,
              "(%s OPERATOR(pg_catalog.~) ",
              namevar
            );
            appendStringLiteralConn(buf, namebuf.data, conn);
            if (PQserverVersion(conn) >= 12e4)
              appendPQExpBufferStr(buf, " COLLATE pg_catalog.default");
            appendPQExpBuffer(
              buf,
              "\n        OR %s OPERATOR(pg_catalog.~) ",
              altnamevar
            );
            appendStringLiteralConn(buf, namebuf.data, conn);
            if (PQserverVersion(conn) >= 12e4)
              appendPQExpBufferStr(buf, " COLLATE pg_catalog.default");
            appendPQExpBufferStr(buf, ")\n");
          } else {
            appendPQExpBuffer(buf, "%s OPERATOR(pg_catalog.~) ", namevar);
            appendStringLiteralConn(buf, namebuf.data, conn);
            if (PQserverVersion(conn) >= 12e4)
              appendPQExpBufferStr(buf, " COLLATE pg_catalog.default");
            appendPQExpBufferChar(buf, "\n");
          }
        }
      }
      if (schemavar && schemabuf.len > 2) {
        if (strcmp(schemabuf.data, "^(.*)$") != 0 && schemavar) {
          appendPQExpBufferStr(buf, have_where ? "  AND " : "WHERE ");
          have_where = true;
          added_clause = true;
          appendPQExpBuffer(buf, "%s OPERATOR(pg_catalog.~) ", schemavar);
          appendStringLiteralConn(buf, schemabuf.data, conn);
          if (PQserverVersion(conn) >= 12e4)
            appendPQExpBufferStr(buf, " COLLATE pg_catalog.default");
          appendPQExpBufferChar(buf, "\n");
        }
      } else {
        if (visibilityrule) {
          appendPQExpBufferStr(buf, have_where ? "  AND " : "WHERE ");
          have_where = true;
          added_clause = true;
          appendPQExpBuffer(buf, "%s\n", visibilityrule);
        }
      }
      return added_clause;
    }
    function patternToSQLRegex(encoding, dbnamebuf, schemabuf, namebuf, pattern, force_escape, want_literal_dbname, dotcnt) {
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
      } else
        left = false;
      initPQExpBuffer(curbuf);
      appendPQExpBufferStr(curbuf, "^(");
      let cpIndex = 0;
      let ch;
      while ((ch = cp[cpIndex]) != NULL) {
        if (ch == '"') {
          if (inquotes && cp[cpIndex + 1] == '"') {
            appendPQExpBufferChar(curbuf, '"');
            if (left)
              appendPQExpBufferChar(left_literal, '"');
            cpIndex++;
          } else
            inquotes = !inquotes;
          cpIndex++;
        } else if (!inquotes && isupper(ch)) {
          appendPQExpBufferChar(
            curbuf,
            pg_tolower(ch)
          );
          if (left)
            appendPQExpBufferChar(
              left_literal,
              pg_tolower(ch)
            );
          cpIndex++;
        } else if (!inquotes && ch == "*") {
          appendPQExpBufferStr(curbuf, ".*");
          if (left)
            appendPQExpBufferChar(left_literal, "*");
          cpIndex++;
        } else if (!inquotes && ch == "?") {
          appendPQExpBufferChar(curbuf, ".");
          if (left)
            appendPQExpBufferChar(left_literal, "?");
          cpIndex++;
        } else if (!inquotes && ch == ".") {
          left = false;
          dotcnt.value++;
          if (bufIndex < maxbuf) {
            appendPQExpBufferStr(curbuf, ")$");
            curbuf = buf[++bufIndex];
            initPQExpBuffer(curbuf);
            appendPQExpBufferStr(curbuf, "^(");
            cpIndex++;
          } else {
            appendPQExpBufferChar(curbuf, ch);
            cpIndex++;
          }
        } else if (ch == "$") {
          appendPQExpBufferStr(curbuf, "\\$");
          if (left)
            appendPQExpBufferChar(left_literal, "$");
          cpIndex++;
        } else {
          if ((inquotes || force_escape) && strchr("|*+?()[]{}.^$\\", ch) != NULL)
            appendPQExpBufferChar(curbuf, "\\");
          else if (ch == "[" && cp[cpIndex + 1] == "]")
            appendPQExpBufferChar(curbuf, "\\");
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
          align = "r";
          break;
        default:
          align = "l";
          break;
      }
      return align;
    }
    function printQuery(result, opt, fout, is_pager, flog) {
      let cont = {};
      let i, r, c;
      printTableInit(
        cont,
        opt.topt,
        opt.title,
        PQnfields(result),
        PQntuples(result)
      );
      Assert(opt.translate_columns == NULL || opt.translate_columns == null || opt.n_translate_columns >= cont.ncolumns);
      for (i = 0; i < cont.ncolumns; i++) {
        printTableAddHeader(
          cont,
          PQfname(result, i),
          opt.translate_header,
          column_type_alignment(PQftype(result, i))
        );
      }
      for (r = 0; r < cont.nrows; r++) {
        for (c = 0; c < cont.ncolumns; c++) {
          let cell;
          let mustfree = false;
          let translate;
          if (PQgetisnull(result, r, c))
            cell = opt.nullPrint ? opt.nullPrint : "";
          else {
            cell = PQgetvalue(result, r, c);
            if (cont.aligns[c] == "r" && opt.topt.numericLocale) {
              cell = format_numeric_locale(cell);
              mustfree = true;
            }
          }
          translate = opt.translate_columns && opt.translate_columns[c];
          printTableAddCell(cont, cell, translate, mustfree);
        }
      }
      if (opt.footers) {
        let footer;
        let footerIndex = 0;
        for (footer = opt.footers[footerIndex]; footer; footerIndex++)
          printTableAddFooter(cont, footer);
      }
      printTable(cont, fout, is_pager, flog);
    }
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
      if (translate)
        header = _(header);
      content.headers.push(header);
      content.header = header;
      content.aligns.push(align);
      content.align = align;
    }
    function printTableAddCell(content, cell, translate, mustfree) {
      if (translate)
        cell = _(cell);
      content.cells.push(cell);
      content.cell = cell;
    }
    function printTableAddFooter(content, footer) {
      if (content.footers == NULL)
        content.footers = [];
      content.footers.push(footer);
      content.footer = footer;
    }
    function printTableSetFooter(content, footer) {
      if (content.footers)
        content.footers.pop();
      printTableAddFooter(content, footer);
    }
    function printTable(cont, fout, is_pager, flog) {
      outputFn({ ...cont });
    }
    async function exec_command_sf_sv(scan_state, active_branch, cmd2, is_func) {
      let status = PSQL_CMD_SKIP_LINE;
      let show_linenumbers = strchr(cmd2, "+") != NULL;
      let buf = {
        /* struct */
      };
      let obj_desc;
      let obj_oid = { value: InvalidOid };
      let eot = is_func ? EditableFunction : EditableView;
      initPQExpBuffer(buf);
      obj_desc = psql_scan_slash_option(
        scan_state,
        OT_WHOLE_LINE,
        NULL,
        true
      );
      if (!obj_desc) {
        if (is_func)
          pg_log_error("function name is required");
        else
          pg_log_error("view name is required");
        status = PSQL_CMD_ERROR;
      } else if (!await lookup_object_oid(eot, obj_desc, obj_oid)) {
        status = PSQL_CMD_ERROR;
      } else if (!await get_create_object_cmd(eot, obj_oid.value, buf)) {
        status = PSQL_CMD_ERROR;
      } else {
        if (show_linenumbers) {
          print_with_linenumbers(buf.data, is_func);
        } else {
          outputFn(buf.data);
        }
      }
      return status;
    }
    function print_with_linenumbers(lines, is_func) {
      let in_header = is_func;
      let lineno = 0;
      let result = "";
      lines = lines.trimEnd().split("\n");
      for (let line of lines) {
        if (in_header && (strncmp(line, "AS ", 3) == 0 || strncmp(line, "BEGIN ", 6) == 0 || strncmp(line, "RETURN ", 7) == 0))
          in_header = false;
        if (!in_header)
          lineno++;
        if (in_header)
          result += sprintf("        %s\n", line);
        else
          result += sprintf("%-7d %s\n", lineno, line);
      }
      outputFn(result);
    }
    async function lookup_object_oid(obj_type, desc, obj_oid) {
      let result = true;
      let query = {
        /* struct */
      };
      initPQExpBuffer(query);
      let res;
      switch (obj_type) {
        case EditableFunction:
          appendPQExpBufferStr(query, "SELECT ");
          appendStringLiteralConn(query, desc, pset.db);
          appendPQExpBuffer(
            query,
            "::pg_catalog.%s::pg_catalog.oid",
            strchr(desc, "(") !== NULL ? "regprocedure" : "regproc"
          );
          break;
        case EditableView:
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
        pg_log_error("ERROR:  " + err.message);
        result = false;
      }
      return result;
    }
    async function get_create_object_cmd(obj_type, oid, buf) {
      let result = true;
      let query = {
        /* struct */
      };
      initPQExpBuffer(query);
      let res;
      switch (obj_type) {
        case EditableFunction:
          printfPQExpBuffer(
            query,
            "SELECT pg_catalog.pg_get_functiondef(%u)",
            oid
          );
          break;
        case EditableView:
          if (pset.sversion >= 90400) {
            printfPQExpBuffer(
              query,
              "SELECT nspname, relname, relkind, pg_catalog.pg_get_viewdef(c.oid, true), pg_catalog.array_remove(pg_catalog.array_remove(c.reloptions,'check_option=local'),'check_option=cascaded') AS reloptions, CASE WHEN 'check_option=local' = ANY (c.reloptions) THEN 'LOCAL'::text WHEN 'check_option=cascaded' = ANY (c.reloptions) THEN 'CASCADED'::text ELSE NULL END AS checkoption FROM pg_catalog.pg_class c LEFT JOIN pg_catalog.pg_namespace n ON c.relnamespace = n.oid WHERE c.oid = %u",
              oid
            );
          } else {
            printfPQExpBuffer(
              query,
              "SELECT nspname, relname, relkind, pg_catalog.pg_get_viewdef(c.oid, true), c.reloptions AS reloptions, NULL AS checkoption FROM pg_catalog.pg_class c LEFT JOIN pg_catalog.pg_namespace n ON c.relnamespace = n.oid WHERE c.oid = %u",
              oid
            );
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
            switch (relkind[0]) {
              case RELKIND_VIEW:
                appendPQExpBufferStr(buf, "CREATE OR REPLACE VIEW ");
                break;
              default:
                pg_log_error(
                  '"%s.%s" is not a view',
                  nspname,
                  relname
                );
                result = false;
                break;
            }
            appendPQExpBuffer(buf, "%s.", fmtId(nspname));
            appendPQExpBufferStr(buf, fmtId(relname));
            if (reloptions != NULL && strlen(reloptions) > 2) {
              appendPQExpBufferStr(buf, "\n WITH (");
              if (!appendReloptionsArray(
                buf,
                reloptions,
                "",
                pset.encoding,
                pset.db.standard_strings
              )) {
                pg_log_error("could not parse reloptions array");
                result = false;
              }
              appendPQExpBufferChar(buf, ")");
            }
            appendPQExpBuffer(buf, " AS\n%s", viewdef);
            if (buf.len > 0 && buf.data[buf.len - 1] == ";")
              buf.data = buf.data.slice(0, buf.len - 1);
            if (checkoption && checkoption[0] != NULL)
              appendPQExpBuffer(
                buf,
                "\n WITH %s CHECK OPTION",
                checkoption
              );
            break;
        }
        if (buf.len > 0 && buf.data[buf.len - 1] != "\n")
          appendPQExpBufferChar(buf, "\n");
      } else {
        pg_log_error("Error when querying");
        result = false;
      }
      return result;
    }
    function appendReloptionsArray(buffer, reloptions, prefix, encoding, std_strings2) {
      let options = [];
      let noptions = {};
      let i;
      if (!parsePGArray(reloptions, options, noptions)) {
        return false;
      }
      noptions = noptions.value;
      for (i = 0; i < noptions; i++) {
        let option = options[i];
        let [name, value] = option.split("=");
        value ?? (value = "");
        if (i > 0)
          appendPQExpBufferStr(buffer, ", ");
        appendPQExpBuffer(buffer, "%s%s=", prefix, fmtId(name));
        if (strcmp(fmtId(value), value) == 0)
          appendPQExpBufferStr(buffer, value);
        else
          appendStringLiteral(buffer, value, encoding, std_strings2);
      }
      return true;
    }
    function parsePGArray(atext, items, nitems) {
      let inputlen;
      let strings;
      let curitem;
      inputlen = strlen(atext);
      nitems.value = 0;
      if (inputlen < 2 || atext[0] != "{" || atext[inputlen - 1] != "}")
        return false;
      let at = 0;
      at++;
      curitem = 0;
      while (atext[at] != "}") {
        if (atext[at] == NULL)
          return false;
        strings = "";
        while (atext[at] != "}" && atext[at] != ",") {
          if (atext[at] == NULL)
            return false;
          if (atext[at] != '"')
            strings += atext[at++];
          else {
            at++;
            while (atext[at] != '"') {
              if (atext[at] == NULL)
                return false;
              if (atext[at] == "\\") {
                at++;
                if (atext[at] == NULL)
                  return false;
              }
              strings += atext[at++];
            }
            at++;
          }
        }
        items[curitem] = strings;
        if (atext[at] == ",")
          at++;
        curitem++;
      }
      if (atext[at + 1] && atext[at + 1] != NULL)
        return false;
      nitems.value = curitem;
      return true;
    }
    function fmtId(rawid) {
      let id_return = {
        /* struct */
      };
      initPQExpBuffer(id_return);
      let need_quotes = false;
      if (quote_all_identifiers)
        need_quotes = true;
      else if (!(rawid[0] >= "a" && rawid[0] <= "z" || rawid[0] == "_"))
        need_quotes = true;
      else {
        if (/[^a-z0-9_]/.test(rawid))
          need_quotes = true;
      }
      if (!need_quotes) {
        let kw = (/* @__PURE__ */ new Set(["all", "analyse", "analyze", "and", "any", "array", "as", "asc", "asymmetric", "authorization", "between", "bigint", "binary", "bit", "boolean", "both", "case", "cast", "char", "character", "check", "coalesce", "collate", "collation", "column", "concurrently", "constraint", "create", "cross", "current_catalog", "current_date", "current_role", "current_schema", "current_time", "current_timestamp", "current_user", "dec", "decimal", "default", "deferrable", "desc", "distinct", "do", "else", "end", "except", "exists", "extract", "false", "fetch", "float", "for", "foreign", "freeze", "from", "full", "grant", "greatest", "group", "grouping", "having", "ilike", "in", "initially", "inner", "inout", "int", "integer", "intersect", "interval", "into", "is", "isnull", "join", "json", "json_array", "json_arrayagg", "json_object", "json_objectagg", "json_scalar", "json_serialize", "lateral", "leading", "least", "left", "like", "limit", "localtime", "localtimestamp", "national", "natural", "nchar", "none", "normalize", "not", "notnull", "null", "nullif", "numeric", "offset", "on", "only", "or", "order", "out", "outer", "overlaps", "overlay", "placing", "position", "precision", "primary", "real", "references", "returning", "right", "row", "select", "session_user", "setof", "similar", "smallint", "some", "substring", "symmetric", "system_user", "table", "tablesample", "then", "time", "timestamp", "to", "trailing", "treat", "trim", "true", "union", "unique", "user", "using", "values", "varchar", "variadic", "verbose", "when", "where", "window", "with", "xmlattributes", "xmlconcat", "xmlelement", "xmlexists", "xmlforest", "xmlnamespaces", "xmlparse", "xmlpi", "xmlroot", "xmlserialize", "xmltable"])).has(rawid);
        if (kw)
          need_quotes = true;
      }
      if (!need_quotes) {
        appendPQExpBufferStr(id_return, rawid);
      } else {
        appendPQExpBufferChar(id_return, '"');
        appendPQExpBufferChar(id_return, rawid.replace(/"/g, '""'));
        appendPQExpBufferChar(id_return, '"');
      }
      return id_return.data;
    }
    async function exec_command_list(scan_state, active_branch, cmd2) {
      let success;
      let pattern;
      let show_verbose;
      pattern = psql_scan_slash_option(
        scan_state,
        OT_NORMAL,
        NULL,
        true
      );
      show_verbose = strchr(cmd2, "+") != NULL;
      success = await listAllDbs(pattern, show_verbose);
      return success ? PSQL_CMD_SKIP_LINE : PSQL_CMD_ERROR;
    }
    async function exec_command_d(scan_state, active_branch, cmd2) {
      let status = PSQL_CMD_SKIP_LINE;
      let success = true;
      let pattern;
      let show_verbose, show_system;
      pattern = psql_scan_slash_option(
        scan_state,
        OT_NORMAL,
        NULL,
        true
      );
      show_verbose = strchr(cmd2, "+") != NULL;
      show_system = strchr(cmd2, "S") != NULL;
      switch (cmd2[1]) {
        case void 0:
        case "+":
        case "S":
          if (pattern)
            success = await describeTableDetails(pattern, show_verbose, show_system);
          else
            success = await listTables("tvmsE", NULL, show_verbose, show_system);
          break;
        case "A":
          {
            let pattern2 = NULL;
            if (pattern && cmd2[2] != NULL && cmd2[2] != "+")
              pattern2 = psql_scan_slash_option(scan_state, OT_NORMAL, NULL, true);
            switch (cmd2[2]) {
              case void 0:
              case "+":
                success = await describeAccessMethods(pattern, show_verbose);
                break;
              case "c":
                success = await listOperatorClasses(pattern, pattern2, show_verbose);
                break;
              case "f":
                success = await listOperatorFamilies(pattern, pattern2, show_verbose);
                break;
              case "o":
                success = await listOpFamilyOperators(pattern, pattern2, show_verbose);
                break;
              case "p":
                success = await listOpFamilyFunctions(pattern, pattern2, show_verbose);
                break;
              default:
                status = PSQL_CMD_UNKNOWN;
                break;
            }
          }
          break;
        case "a":
          success = await describeAggregates(pattern, show_verbose, show_system);
          break;
        case "b":
          success = await describeTablespaces(pattern, show_verbose);
          break;
        case "c":
          if (strncmp(cmd2, "dconfig", 7) == 0)
            success = await describeConfigurationParameters(
              pattern,
              show_verbose,
              show_system
            );
          else
            success = await listConversions(
              pattern,
              show_verbose,
              show_system
            );
          break;
        case "C":
          success = await listCasts(pattern, show_verbose);
          break;
        case "d":
          if (strncmp(cmd2, "ddp", 3) == 0)
            success = await listDefaultACLs(pattern);
          else
            success = await objectDescription(pattern, show_system);
          break;
        case "D":
          success = await listDomains(pattern, show_verbose, show_system);
          break;
        case "f":
          switch (cmd2[2]) {
            case void 0:
            case "+":
            case "S":
            case "a":
            case "n":
            case "p":
            case "t":
            case "w":
              success = await exec_command_dfo(
                scan_state,
                cmd2,
                pattern,
                show_verbose,
                show_system
              );
              break;
            default:
              status = PSQL_CMD_UNKNOWN;
              break;
          }
          break;
        case "g":
          success = await describeRoles(pattern, show_verbose, show_system);
          break;
        case "l":
          success = await listLargeObjects(show_verbose);
          break;
        case "L":
          success = await listLanguages(pattern, show_verbose, show_system);
          break;
        case "n":
          success = await listSchemas(pattern, show_verbose, show_system);
          break;
        case "o":
          success = await exec_command_dfo(
            scan_state,
            cmd2,
            pattern,
            show_verbose,
            show_system
          );
          break;
        case "O":
          success = await listCollations(pattern, show_verbose, show_system);
          break;
        case "p":
          success = await permissionsList(pattern, show_system);
          break;
        case "P":
          {
            switch (cmd2[2]) {
              case void 0:
              case "+":
              case "t":
              case "i":
              case "n":
                success = await listPartitionedTables(cmd2.slice(2), pattern, show_verbose);
                break;
              default:
                status = PSQL_CMD_UNKNOWN;
                break;
            }
          }
          break;
        case "T":
          success = await describeTypes(pattern, show_verbose, show_system);
          break;
        case "t":
        case "v":
        case "m":
        case "i":
        case "s":
        case "E":
          success = await listTables(cmd2[1], pattern, show_verbose, show_system);
          break;
        case "r":
          if (cmd2[2] == "d" && cmd2[3] == "s") {
            let pattern2 = NULL;
            if (pattern)
              pattern2 = psql_scan_slash_option(
                scan_state,
                OT_NORMAL,
                NULL,
                true
              );
            success = await listDbRoleSettings(pattern, pattern2);
          } else if (cmd2[2] == "g")
            success = await describeRoleGrants(pattern, show_system);
          else
            status = PSQL_CMD_UNKNOWN;
          break;
        case "R":
          switch (cmd2[2]) {
            case "p":
              if (show_verbose)
                success = await describePublications(pattern);
              else
                success = await listPublications(pattern);
              break;
            case "s":
              success = await describeSubscriptions(pattern, show_verbose);
              break;
            default:
              status = PSQL_CMD_UNKNOWN;
          }
          break;
        case "u":
          success = await describeRoles(pattern, show_verbose, show_system);
          break;
        case "F":
          switch (cmd2[2]) {
            case void 0:
            case "+":
              success = await listTSConfigs(pattern, show_verbose);
              break;
            case "p":
              success = await listTSParsers(pattern, show_verbose);
              break;
            case "d":
              success = await listTSDictionaries(pattern, show_verbose);
              break;
            case "t":
              success = await listTSTemplates(pattern, show_verbose);
              break;
            default:
              status = PSQL_CMD_UNKNOWN;
              break;
          }
          break;
        case "e":
          switch (cmd2[2]) {
            case "s":
              success = await listForeignServers(pattern, show_verbose);
              break;
            case "u":
              success = await listUserMappings(pattern, show_verbose);
              break;
            case "w":
              success = await listForeignDataWrappers(pattern, show_verbose);
              break;
            case "t":
              success = await listForeignTables(pattern, show_verbose);
              break;
            default:
              status = PSQL_CMD_UNKNOWN;
              break;
          }
          break;
        case "x":
          if (show_verbose)
            success = await listExtensionContents(pattern);
          else
            success = await listExtensions(pattern);
          break;
        case "X":
          success = await listExtendedStats(pattern);
          break;
        case "y":
          success = await listEventTriggers(pattern, show_verbose);
          break;
        default:
          status = PSQL_CMD_UNKNOWN;
      }
      if (!success)
        status = PSQL_CMD_ERROR;
      return status;
    }
    async function exec_command_dfo(scan_state, cmd2, pattern, show_verbose, show_system) {
      let success;
      let arg_patterns = [];
      let num_arg_patterns = 0;
      if (pattern) {
        let ap;
        while ((ap = psql_scan_slash_option(
          scan_state,
          OT_NORMAL,
          NULL,
          true
        )) != NULL) {
          arg_patterns[num_arg_patterns++] = ap;
          if (num_arg_patterns >= FUNC_MAX_ARGS)
            break;
        }
      }
      if (cmd2[1] == "f")
        success = await describeFunctions(
          cmd2.slice(2),
          pattern,
          arg_patterns,
          num_arg_patterns,
          show_verbose,
          show_system
        );
      else
        success = await describeOperators(
          pattern,
          arg_patterns,
          num_arg_patterns,
          show_verbose,
          show_system
        );
      return success;
    }
    async function listAllDbs(pattern, verbose) {
      let res;
      let buf = {
        /* struct */
      };
      let myopt = pset.popt;
      initPQExpBuffer(buf);
      printfPQExpBuffer(
        buf,
        'SELECT\n  d.datname as "%s",\n  pg_catalog.pg_get_userbyid(d.datdba) as "%s",\n  pg_catalog.pg_encoding_to_char(d.encoding) as "%s",\n',
        gettext_noop("Name"),
        gettext_noop("Owner"),
        gettext_noop("Encoding")
      );
      if (pset.sversion >= 15e4)
        appendPQExpBuffer(
          buf,
          `  CASE d.datlocprovider WHEN 'c' THEN 'libc' WHEN 'i' THEN 'icu' END AS "%s",
`,
          gettext_noop("Locale Provider")
        );
      else
        appendPQExpBuffer(
          buf,
          `  'libc' AS "%s",
`,
          gettext_noop("Locale Provider")
        );
      appendPQExpBuffer(
        buf,
        '  d.datcollate as "%s",\n  d.datctype as "%s",\n',
        gettext_noop("Collate"),
        gettext_noop("Ctype")
      );
      if (pset.sversion >= 15e4)
        appendPQExpBuffer(
          buf,
          '  d.daticulocale as "%s",\n',
          gettext_noop("ICU Locale")
        );
      else
        appendPQExpBuffer(
          buf,
          '  NULL as "%s",\n',
          gettext_noop("ICU Locale")
        );
      if (pset.sversion >= 16e4)
        appendPQExpBuffer(
          buf,
          '  d.daticurules as "%s",\n',
          gettext_noop("ICU Rules")
        );
      else
        appendPQExpBuffer(
          buf,
          '  NULL as "%s",\n',
          gettext_noop("ICU Rules")
        );
      appendPQExpBufferStr(buf, "  ");
      printACLColumn(buf, "d.datacl");
      if (verbose)
        appendPQExpBuffer(
          buf,
          `,
  CASE WHEN pg_catalog.has_database_privilege(d.datname, 'CONNECT')
       THEN pg_catalog.pg_size_pretty(pg_catalog.pg_database_size(d.datname))
       ELSE 'No Access'
  END as "%s",
  t.spcname as "%s",
  pg_catalog.shobj_description(d.oid, 'pg_database') as "%s"`,
          gettext_noop("Size"),
          gettext_noop("Tablespace"),
          gettext_noop("Description")
        );
      appendPQExpBufferStr(
        buf,
        "\nFROM pg_catalog.pg_database d\n"
      );
      if (verbose)
        appendPQExpBufferStr(
          buf,
          "  JOIN pg_catalog.pg_tablespace t on d.dattablespace = t.oid\n"
        );
      if (pattern) {
        if (!validateSQLNamePattern(
          buf,
          pattern,
          false,
          false,
          NULL,
          "d.datname",
          NULL,
          NULL,
          NULL,
          1
        )) {
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
    async function describeAggregates(pattern, verbose, showSystem) {
      let buf = {
        /* struct */
      };
      let res;
      let myopt = pset.popt;
      initPQExpBuffer(buf);
      printfPQExpBuffer(
        buf,
        `SELECT n.nspname as "%s",
  p.proname AS "%s",
  pg_catalog.format_type(p.prorettype, NULL) AS "%s",
  CASE WHEN p.pronargs = 0
    THEN CAST('*' AS pg_catalog.text)
    ELSE pg_catalog.pg_get_function_arguments(p.oid)
  END AS "%s",
`,
        gettext_noop("Schema"),
        gettext_noop("Name"),
        gettext_noop("Result data type"),
        gettext_noop("Argument data types")
      );
      if (pset.sversion >= 11e4)
        appendPQExpBuffer(
          buf,
          `  pg_catalog.obj_description(p.oid, 'pg_proc') as "%s"
FROM pg_catalog.pg_proc p
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = p.pronamespace
WHERE p.prokind = 'a'
`,
          gettext_noop("Description")
        );
      else
        appendPQExpBuffer(
          buf,
          `  pg_catalog.obj_description(p.oid, 'pg_proc') as "%s"
FROM pg_catalog.pg_proc p
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = p.pronamespace
WHERE p.proisagg
`,
          gettext_noop("Description")
        );
      if (!showSystem && !pattern)
        appendPQExpBufferStr(buf, "      AND n.nspname <> 'pg_catalog'\n      AND n.nspname <> 'information_schema'\n");
      if (!validateSQLNamePattern(
        buf,
        pattern,
        true,
        false,
        "n.nspname",
        "p.proname",
        NULL,
        "pg_catalog.pg_function_is_visible(p.oid)",
        NULL,
        3
      )) {
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
    async function describeAccessMethods(pattern, verbose) {
      let buf = {
        /* struct */
      };
      let res;
      let myopt = pset.popt;
      let translate_columns = [false, true, false, false];
      if (pset.sversion < 90600) {
        let sverbuf;
        pg_log_error(
          "The server (version %s) does not support access methods.",
          formatPGVersionNumber(
            pset.sversion,
            false,
            sverbuf,
            sizeof(sverbuf)
          )
        );
        return true;
      }
      initPQExpBuffer(buf);
      printfPQExpBuffer(
        buf,
        `SELECT amname AS "%s",
  CASE amtype WHEN 'i' THEN '%s' WHEN 't' THEN '%s' END AS "%s"`,
        gettext_noop("Name"),
        gettext_noop("Index"),
        gettext_noop("Table"),
        gettext_noop("Type")
      );
      if (verbose) {
        appendPQExpBuffer(
          buf,
          `,
  amhandler AS "%s",
  pg_catalog.obj_description(oid, 'pg_am') AS "%s"`,
          gettext_noop("Handler"),
          gettext_noop("Description")
        );
      }
      appendPQExpBufferStr(
        buf,
        "\nFROM pg_catalog.pg_am\n"
      );
      if (!validateSQLNamePattern(
        buf,
        pattern,
        false,
        false,
        NULL,
        "amname",
        NULL,
        NULL,
        NULL,
        1
      )) {
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
    async function describeTablespaces(pattern, verbose) {
      let buf = {
        /* struct */
      };
      let res;
      let myopt = pset.popt;
      initPQExpBuffer(buf);
      printfPQExpBuffer(
        buf,
        'SELECT spcname AS "%s",\n  pg_catalog.pg_get_userbyid(spcowner) AS "%s",\n  pg_catalog.pg_tablespace_location(oid) AS "%s"',
        gettext_noop("Name"),
        gettext_noop("Owner"),
        gettext_noop("Location")
      );
      if (verbose) {
        appendPQExpBufferStr(buf, ",\n  ");
        printACLColumn(buf, "spcacl");
        appendPQExpBuffer(
          buf,
          `,
  spcoptions AS "%s",
  pg_catalog.pg_size_pretty(pg_catalog.pg_tablespace_size(oid)) AS "%s",
  pg_catalog.shobj_description(oid, 'pg_tablespace') AS "%s"`,
          gettext_noop("Options"),
          gettext_noop("Size"),
          gettext_noop("Description")
        );
      }
      appendPQExpBufferStr(
        buf,
        "\nFROM pg_catalog.pg_tablespace\n"
      );
      if (!validateSQLNamePattern(
        buf,
        pattern,
        false,
        false,
        NULL,
        "spcname",
        NULL,
        NULL,
        NULL,
        1
      )) {
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
    async function describeFunctions(functypes, func_pattern, arg_patterns, num_arg_patterns, verbose, showSystem) {
      let showAggregate = strchr(functypes, "a") != NULL;
      let showNormal = strchr(functypes, "n") != NULL;
      let showProcedure = strchr(functypes, "p") != NULL;
      let showTrigger = strchr(functypes, "t") != NULL;
      let showWindow = strchr(functypes, "w") != NULL;
      let have_where;
      let buf = {
        /* struct */
      };
      let res;
      let myopt = pset.popt;
      let translate_columns = [false, false, false, false, true, true, true, false, true, false, false, false, false];
      let translate_columns_pre_96 = [false, false, false, false, true, true, false, true, false, false, false, false];
      if (strlen(functypes) != strspn(functypes, "anptwS+")) {
        pg_log_error("\\df only takes [anptwS+] as options");
        return true;
      }
      if (showProcedure && pset.sversion < 11e4) {
        let sverbuf;
        pg_log_error(
          '\\df does not take a "%c" option with server version %s',
          "p",
          formatPGVersionNumber(
            pset.sversion,
            false,
            sverbuf,
            sizeof(sverbuf)
          )
        );
        return true;
      }
      if (!showAggregate && !showNormal && !showProcedure && !showTrigger && !showWindow) {
        showAggregate = showNormal = showTrigger = showWindow = true;
        if (pset.sversion >= 11e4)
          showProcedure = true;
      }
      initPQExpBuffer(buf);
      printfPQExpBuffer(
        buf,
        'SELECT n.nspname as "%s",\n  p.proname as "%s",\n',
        gettext_noop("Schema"),
        gettext_noop("Name")
      );
      if (pset.sversion >= 11e4)
        appendPQExpBuffer(
          buf,
          `  pg_catalog.pg_get_function_result(p.oid) as "%s",
  pg_catalog.pg_get_function_arguments(p.oid) as "%s",
 CASE p.prokind
  WHEN 'a' THEN '%s'
  WHEN 'w' THEN '%s'
  WHEN 'p' THEN '%s'
  ELSE '%s'
 END as "%s"`,
          gettext_noop("Result data type"),
          gettext_noop("Argument data types"),
          /* translator: "agg" is short for "aggregate" */
          gettext_noop("agg"),
          gettext_noop("window"),
          gettext_noop("proc"),
          gettext_noop("func"),
          gettext_noop("Type")
        );
      else
        appendPQExpBuffer(
          buf,
          `  pg_catalog.pg_get_function_result(p.oid) as "%s",
  pg_catalog.pg_get_function_arguments(p.oid) as "%s",
 CASE
  WHEN p.proisagg THEN '%s'
  WHEN p.proiswindow THEN '%s'
  WHEN p.prorettype = 'pg_catalog.trigger'::pg_catalog.regtype THEN '%s'
  ELSE '%s'
 END as "%s"`,
          gettext_noop("Result data type"),
          gettext_noop("Argument data types"),
          /* translator: "agg" is short for "aggregate" */
          gettext_noop("agg"),
          gettext_noop("window"),
          gettext_noop("trigger"),
          gettext_noop("func"),
          gettext_noop("Type")
        );
      if (verbose) {
        appendPQExpBuffer(
          buf,
          `,
 CASE
  WHEN p.provolatile = 'i' THEN '%s'
  WHEN p.provolatile = 's' THEN '%s'
  WHEN p.provolatile = 'v' THEN '%s'
 END as "%s"`,
          gettext_noop("immutable"),
          gettext_noop("stable"),
          gettext_noop("volatile"),
          gettext_noop("Volatility")
        );
        if (pset.sversion >= 90600)
          appendPQExpBuffer(
            buf,
            `,
 CASE
  WHEN p.proparallel = 'r' THEN '%s'
  WHEN p.proparallel = 's' THEN '%s'
  WHEN p.proparallel = 'u' THEN '%s'
 END as "%s"`,
            gettext_noop("restricted"),
            gettext_noop("safe"),
            gettext_noop("unsafe"),
            gettext_noop("Parallel")
          );
        appendPQExpBuffer(
          buf,
          `,
 pg_catalog.pg_get_userbyid(p.proowner) as "%s",
 CASE WHEN prosecdef THEN '%s' ELSE '%s' END AS "%s"`,
          gettext_noop("Owner"),
          gettext_noop("definer"),
          gettext_noop("invoker"),
          gettext_noop("Security")
        );
        appendPQExpBufferStr(buf, ",\n ");
        printACLColumn(buf, "p.proacl");
        appendPQExpBuffer(
          buf,
          ',\n l.lanname as "%s"',
          gettext_noop("Language")
        );
        appendPQExpBuffer(
          buf,
          `,
 CASE WHEN l.lanname IN ('internal', 'c') THEN p.prosrc END as "%s"`,
          gettext_noop("Internal name")
        );
        appendPQExpBuffer(
          buf,
          `,
 pg_catalog.obj_description(p.oid, 'pg_proc') as "%s"`,
          gettext_noop("Description")
        );
      }
      appendPQExpBufferStr(
        buf,
        "\nFROM pg_catalog.pg_proc p\n     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = p.pronamespace\n"
      );
      for (let i = 0; i < num_arg_patterns; i++) {
        appendPQExpBuffer(
          buf,
          "     LEFT JOIN pg_catalog.pg_type t%d ON t%d.oid = p.proargtypes[%d]\n     LEFT JOIN pg_catalog.pg_namespace nt%d ON nt%d.oid = t%d.typnamespace\n",
          i,
          i,
          i,
          i,
          i,
          i
        );
      }
      if (verbose)
        appendPQExpBufferStr(
          buf,
          "     LEFT JOIN pg_catalog.pg_language l ON l.oid = p.prolang\n"
        );
      have_where = false;
      if (showNormal && showAggregate && showProcedure && showTrigger && showWindow)
        ;
      else if (showNormal) {
        if (!showAggregate) {
          if (have_where)
            appendPQExpBufferStr(buf, "      AND ");
          else {
            appendPQExpBufferStr(buf, "WHERE ");
            have_where = true;
          }
          if (pset.sversion >= 11e4)
            appendPQExpBufferStr(buf, "p.prokind <> 'a'\n");
          else
            appendPQExpBufferStr(buf, "NOT p.proisagg\n");
        }
        if (!showProcedure && pset.sversion >= 11e4) {
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
          if (pset.sversion >= 11e4)
            appendPQExpBufferStr(buf, "p.prokind <> 'w'\n");
          else
            appendPQExpBufferStr(buf, "NOT p.proiswindow\n");
        }
      } else {
        let needs_or = false;
        appendPQExpBufferStr(buf, "WHERE (\n       ");
        have_where = true;
        if (showAggregate) {
          if (pset.sversion >= 11e4)
            appendPQExpBufferStr(buf, "p.prokind = 'a'\n");
          else
            appendPQExpBufferStr(buf, "p.proisagg\n");
          needs_or = true;
        }
        if (showTrigger) {
          if (needs_or)
            appendPQExpBufferStr(buf, "       OR ");
          appendPQExpBufferStr(
            buf,
            "p.prorettype = 'pg_catalog.trigger'::pg_catalog.regtype\n"
          );
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
          if (pset.sversion >= 11e4)
            appendPQExpBufferStr(buf, "p.prokind = 'w'\n");
          else
            appendPQExpBufferStr(buf, "p.proiswindow\n");
        }
        appendPQExpBufferStr(buf, "      )\n");
      }
      if (!validateSQLNamePattern(
        buf,
        func_pattern,
        have_where,
        false,
        "n.nspname",
        "p.proname",
        NULL,
        "pg_catalog.pg_function_is_visible(p.oid)",
        NULL,
        3
      ))
        return false;
      for (let i = 0; i < num_arg_patterns; i++) {
        if (strcmp(arg_patterns[i], "-") != 0) {
          let nspname;
          let typname;
          let ft;
          let tiv;
          nspname = sprintf("nt%d.nspname", i);
          typname = sprintf("t%d.typname", i);
          ft = sprintf("pg_catalog.format_type(t%d.oid, NULL)", i);
          tiv = sprintf("pg_catalog.pg_type_is_visible(t%d.oid)", i);
          if (!validateSQLNamePattern(
            buf,
            map_typename_pattern(arg_patterns[i]),
            true,
            false,
            nspname,
            typname,
            ft,
            tiv,
            NULL,
            3
          ))
            return false;
        } else {
          appendPQExpBuffer(buf, "  AND t%d.typname IS NULL\n", i);
        }
      }
      if (!showSystem && !func_pattern)
        appendPQExpBufferStr(buf, "      AND n.nspname <> 'pg_catalog'\n      AND n.nspname <> 'information_schema'\n");
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
      } else {
        myopt.translate_columns = translate_columns_pre_96;
        myopt.n_translate_columns = lengthof(translate_columns_pre_96);
      }
      printQuery(res, myopt, pset.queryFout, false, pset.logfile);
      return true;
    }
    async function describeTypes(pattern, verbose, showSystem) {
      let buf = {
        /* struct */
      };
      let res;
      let myopt = pset.popt;
      initPQExpBuffer(buf);
      printfPQExpBuffer(
        buf,
        'SELECT n.nspname as "%s",\n  pg_catalog.format_type(t.oid, NULL) AS "%s",\n',
        gettext_noop("Schema"),
        gettext_noop("Name")
      );
      if (verbose) {
        appendPQExpBuffer(
          buf,
          `  t.typname AS "%s",
  CASE WHEN t.typrelid != 0
      THEN CAST('tuple' AS pg_catalog.text)
    WHEN t.typlen < 0
      THEN CAST('var' AS pg_catalog.text)
    ELSE CAST(t.typlen AS pg_catalog.text)
  END AS "%s",
  pg_catalog.array_to_string(
      ARRAY(
          SELECT e.enumlabel
          FROM pg_catalog.pg_enum e
          WHERE e.enumtypid = t.oid
          ORDER BY e.enumsortorder
      ),
      E'\\n'
  ) AS "%s",
  pg_catalog.pg_get_userbyid(t.typowner) AS "%s",
`,
          gettext_noop("Internal name"),
          gettext_noop("Size"),
          gettext_noop("Elements"),
          gettext_noop("Owner")
        );
        printACLColumn(buf, "t.typacl");
        appendPQExpBufferStr(buf, ",\n  ");
      }
      appendPQExpBuffer(
        buf,
        `  pg_catalog.obj_description(t.oid, 'pg_type') as "%s"
`,
        gettext_noop("Description")
      );
      appendPQExpBufferStr(buf, "FROM pg_catalog.pg_type t\n     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = t.typnamespace\n");
      appendPQExpBufferStr(buf, "WHERE (t.typrelid = 0 ");
      appendPQExpBufferStr(buf, "OR (SELECT c.relkind = 'c' FROM pg_catalog.pg_class c WHERE c.oid = t.typrelid))\n");
      if (pattern == NULL || strstr(pattern, "[]") == NULL)
        appendPQExpBufferStr(buf, "  AND NOT EXISTS(SELECT 1 FROM pg_catalog.pg_type el WHERE el.oid = t.typelem AND el.typarray = t.oid)\n");
      if (!showSystem && !pattern)
        appendPQExpBufferStr(buf, "      AND n.nspname <> 'pg_catalog'\n      AND n.nspname <> 'information_schema'\n");
      if (!validateSQLNamePattern(
        buf,
        map_typename_pattern(pattern),
        true,
        false,
        "n.nspname",
        "t.typname",
        "pg_catalog.format_type(t.oid, NULL)",
        "pg_catalog.pg_type_is_visible(t.oid)",
        NULL,
        3
      )) {
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
    function map_typename_pattern(pattern) {
      let typename_map = [
        /*
         * These names are accepted by gram.y, although they are neither the
         * "real" name seen in pg_type nor the canonical name printed by
         * format_type().
         */
        "decimal",
        "numeric",
        "float",
        "double precision",
        "int",
        "integer",
        /*
         * We also have to map the array names for cases where the canonical
         * name is different from what pg_type says.
         */
        "bool[]",
        "boolean[]",
        "decimal[]",
        "numeric[]",
        "float[]",
        "double precision[]",
        "float4[]",
        "real[]",
        "float8[]",
        "double precision[]",
        "int[]",
        "integer[]",
        "int2[]",
        "smallint[]",
        "int4[]",
        "integer[]",
        "int8[]",
        "bigint[]",
        "time[]",
        "time without time zone[]",
        "timetz[]",
        "time with time zone[]",
        "timestamp[]",
        "timestamp without time zone[]",
        "timestamptz[]",
        "timestamp with time zone[]",
        "varbit[]",
        "bit varying[]",
        "varchar[]",
        "character varying[]",
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
    async function describeOperators(oper_pattern, arg_patterns, num_arg_patterns, verbose, showSystem) {
      let buf = {
        /* struct */
      };
      let res;
      let myopt = pset.popt;
      initPQExpBuffer(buf);
      printfPQExpBuffer(
        buf,
        `SELECT n.nspname as "%s",
  o.oprname AS "%s",
  CASE WHEN o.oprkind='l' THEN NULL ELSE pg_catalog.format_type(o.oprleft, NULL) END AS "%s",
  CASE WHEN o.oprkind='r' THEN NULL ELSE pg_catalog.format_type(o.oprright, NULL) END AS "%s",
  pg_catalog.format_type(o.oprresult, NULL) AS "%s",
`,
        gettext_noop("Schema"),
        gettext_noop("Name"),
        gettext_noop("Left arg type"),
        gettext_noop("Right arg type"),
        gettext_noop("Result type")
      );
      if (verbose)
        appendPQExpBuffer(
          buf,
          '  o.oprcode AS "%s",\n',
          gettext_noop("Function")
        );
      appendPQExpBuffer(
        buf,
        `  coalesce(pg_catalog.obj_description(o.oid, 'pg_operator'),
           pg_catalog.obj_description(o.oprcode, 'pg_proc')) AS "%s"
FROM pg_catalog.pg_operator o
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = o.oprnamespace
`,
        gettext_noop("Description")
      );
      if (num_arg_patterns >= 2) {
        num_arg_patterns = 2;
        appendPQExpBufferStr(
          buf,
          "     LEFT JOIN pg_catalog.pg_type t0 ON t0.oid = o.oprleft\n     LEFT JOIN pg_catalog.pg_namespace nt0 ON nt0.oid = t0.typnamespace\n     LEFT JOIN pg_catalog.pg_type t1 ON t1.oid = o.oprright\n     LEFT JOIN pg_catalog.pg_namespace nt1 ON nt1.oid = t1.typnamespace\n"
        );
      } else if (num_arg_patterns == 1) {
        appendPQExpBufferStr(
          buf,
          "     LEFT JOIN pg_catalog.pg_type t0 ON t0.oid = o.oprright\n     LEFT JOIN pg_catalog.pg_namespace nt0 ON nt0.oid = t0.typnamespace\n"
        );
      }
      if (!showSystem && !oper_pattern)
        appendPQExpBufferStr(buf, "WHERE n.nspname <> 'pg_catalog'\n      AND n.nspname <> 'information_schema'\n");
      if (!validateSQLNamePattern(
        buf,
        oper_pattern,
        !showSystem && !oper_pattern,
        true,
        "n.nspname",
        "o.oprname",
        NULL,
        "pg_catalog.pg_operator_is_visible(o.oid)",
        NULL,
        3
      ))
        return false;
      if (num_arg_patterns == 1)
        appendPQExpBufferStr(buf, "  AND o.oprleft = 0\n");
      for (let i = 0; i < num_arg_patterns; i++) {
        if (strcmp(arg_patterns[i], "-") != 0) {
          let nspname;
          let typname;
          let ft;
          let tiv;
          nspname = sprintf("nt%d.nspname", i);
          typname = sprintf("t%d.typname", i);
          ft = sprintf("pg_catalog.format_type(t%d.oid, NULL)", i);
          tiv = sprintf("pg_catalog.pg_type_is_visible(t%d.oid)", i);
          if (!validateSQLNamePattern(
            buf,
            map_typename_pattern(arg_patterns[i]),
            true,
            false,
            nspname,
            typname,
            ft,
            tiv,
            NULL,
            3
          ))
            return false;
        } else {
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
    async function permissionsList(pattern, showSystem) {
      let buf = {
        /* struct */
      };
      let res;
      let myopt = pset.popt;
      let translate_columns = [false, false, true, false, false, false];
      initPQExpBuffer(buf);
      printfPQExpBuffer(
        buf,
        `SELECT n.nspname as "%s",
  c.relname as "%s",
  CASE c.relkind WHEN 'r' THEN '%s' WHEN 'v' THEN '%s' WHEN 'm' THEN '%s' WHEN 'S' THEN '%s' WHEN 'f' THEN '%s' WHEN 'p' THEN '%s' END as "%s",
  `,
        gettext_noop("Schema"),
        gettext_noop("Name"),
        gettext_noop("table"),
        gettext_noop("view"),
        gettext_noop("materialized view"),
        gettext_noop("sequence"),
        gettext_noop("foreign table"),
        gettext_noop("partitioned table"),
        gettext_noop("Type")
      );
      printACLColumn(buf, "c.relacl");
      appendPQExpBuffer(
        buf,
        `,
  pg_catalog.array_to_string(ARRAY(
    SELECT attname || E':\\n  ' || pg_catalog.array_to_string(attacl, E'\\n  ')
    FROM pg_catalog.pg_attribute a
    WHERE attrelid = c.oid AND NOT attisdropped AND attacl IS NOT NULL
  ), E'\\n') AS "%s"`,
        gettext_noop("Column privileges")
      );
      if (pset.sversion >= 90500 && pset.sversion < 1e5)
        appendPQExpBuffer(
          buf,
          `,
  pg_catalog.array_to_string(ARRAY(
    SELECT polname
    || CASE WHEN polcmd != '*' THEN
           E' (' || polcmd::pg_catalog.text || E'):'
       ELSE E':'
       END
    || CASE WHEN polqual IS NOT NULL THEN
           E'\\n  (u): ' || pg_catalog.pg_get_expr(polqual, polrelid)
       ELSE E''
       END
    || CASE WHEN polwithcheck IS NOT NULL THEN
           E'\\n  (c): ' || pg_catalog.pg_get_expr(polwithcheck, polrelid)
       ELSE E''
       END    || CASE WHEN polroles <> '{0}' THEN
           E'\\n  to: ' || pg_catalog.array_to_string(
               ARRAY(
                   SELECT rolname
                   FROM pg_catalog.pg_roles
                   WHERE oid = ANY (polroles)
                   ORDER BY 1
               ), E', ')
       ELSE E''
       END
    FROM pg_catalog.pg_policy pol
    WHERE polrelid = c.oid), E'\\n')
    AS "%s"`,
          gettext_noop("Policies")
        );
      if (pset.sversion >= 1e5)
        appendPQExpBuffer(
          buf,
          `,
  pg_catalog.array_to_string(ARRAY(
    SELECT polname
    || CASE WHEN NOT polpermissive THEN
       E' (RESTRICTIVE)'
       ELSE '' END
    || CASE WHEN polcmd != '*' THEN
           E' (' || polcmd::pg_catalog.text || E'):'
       ELSE E':'
       END
    || CASE WHEN polqual IS NOT NULL THEN
           E'\\n  (u): ' || pg_catalog.pg_get_expr(polqual, polrelid)
       ELSE E''
       END
    || CASE WHEN polwithcheck IS NOT NULL THEN
           E'\\n  (c): ' || pg_catalog.pg_get_expr(polwithcheck, polrelid)
       ELSE E''
       END    || CASE WHEN polroles <> '{0}' THEN
           E'\\n  to: ' || pg_catalog.array_to_string(
               ARRAY(
                   SELECT rolname
                   FROM pg_catalog.pg_roles
                   WHERE oid = ANY (polroles)
                   ORDER BY 1
               ), E', ')
       ELSE E''
       END
    FROM pg_catalog.pg_policy pol
    WHERE polrelid = c.oid), E'\\n')
    AS "%s"`,
          gettext_noop("Policies")
        );
      appendPQExpBufferStr(buf, "\nFROM pg_catalog.pg_class c\n     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace\nWHERE c.relkind IN ('r','v','m','S','f','p')\n");
      if (!showSystem && !pattern)
        appendPQExpBufferStr(buf, "      AND n.nspname <> 'pg_catalog'\n      AND n.nspname <> 'information_schema'\n");
      if (!validateSQLNamePattern(
        buf,
        pattern,
        true,
        false,
        "n.nspname",
        "c.relname",
        NULL,
        "pg_catalog.pg_table_is_visible(c.oid)",
        NULL,
        3
      ))
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
    async function listDefaultACLs(pattern) {
      let buf = {
        /* struct */
      };
      let res;
      let myopt = pset.popt;
      let translate_columns = [false, false, true, false];
      initPQExpBuffer(buf);
      printfPQExpBuffer(
        buf,
        `SELECT pg_catalog.pg_get_userbyid(d.defaclrole) AS "%s",
  n.nspname AS "%s",
  CASE d.defaclobjtype WHEN '%c' THEN '%s' WHEN '%c' THEN '%s' WHEN '%c' THEN '%s' WHEN '%c' THEN '%s' WHEN '%c' THEN '%s' END AS "%s",
  `,
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
        gettext_noop("Type")
      );
      printACLColumn(buf, "d.defaclacl");
      appendPQExpBufferStr(buf, "\nFROM pg_catalog.pg_default_acl d\n     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = d.defaclnamespace\n");
      if (!validateSQLNamePattern(
        buf,
        pattern,
        false,
        false,
        NULL,
        "n.nspname",
        "pg_catalog.pg_get_userbyid(d.defaclrole)",
        NULL,
        NULL,
        3
      ))
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
    async function objectDescription(pattern, showSystem) {
      let buf = {
        /* struct */
      };
      let res;
      let myopt = pset.popt;
      let translate_columns = [false, false, true, false];
      initPQExpBuffer(buf);
      appendPQExpBuffer(
        buf,
        'SELECT DISTINCT tt.nspname AS "%s", tt.name AS "%s", tt.object AS "%s", d.description AS "%s"\nFROM (\n',
        gettext_noop("Schema"),
        gettext_noop("Name"),
        gettext_noop("Object"),
        gettext_noop("Description")
      );
      appendPQExpBuffer(
        buf,
        "  SELECT pgc.oid as oid, pgc.tableoid AS tableoid,\n  n.nspname as nspname,\n  CAST(pgc.conname AS pg_catalog.text) as name,  CAST('%s' AS pg_catalog.text) as object\n  FROM pg_catalog.pg_constraint pgc\n    JOIN pg_catalog.pg_class c ON c.oid = pgc.conrelid\n    LEFT JOIN pg_catalog.pg_namespace n     ON n.oid = c.relnamespace\n",
        gettext_noop("table constraint")
      );
      if (!showSystem && !pattern)
        appendPQExpBufferStr(buf, "WHERE n.nspname <> 'pg_catalog'\n      AND n.nspname <> 'information_schema'\n");
      if (!validateSQLNamePattern(
        buf,
        pattern,
        !showSystem && !pattern,
        false,
        "n.nspname",
        "pgc.conname",
        NULL,
        "pg_catalog.pg_table_is_visible(c.oid)",
        NULL,
        3
      ))
        return false;
      appendPQExpBuffer(
        buf,
        "UNION ALL\n  SELECT pgc.oid as oid, pgc.tableoid AS tableoid,\n  n.nspname as nspname,\n  CAST(pgc.conname AS pg_catalog.text) as name,  CAST('%s' AS pg_catalog.text) as object\n  FROM pg_catalog.pg_constraint pgc\n    JOIN pg_catalog.pg_type t ON t.oid = pgc.contypid\n    LEFT JOIN pg_catalog.pg_namespace n     ON n.oid = t.typnamespace\n",
        gettext_noop("domain constraint")
      );
      if (!showSystem && !pattern)
        appendPQExpBufferStr(buf, "WHERE n.nspname <> 'pg_catalog'\n      AND n.nspname <> 'information_schema'\n");
      if (!validateSQLNamePattern(
        buf,
        pattern,
        !showSystem && !pattern,
        false,
        "n.nspname",
        "pgc.conname",
        NULL,
        "pg_catalog.pg_type_is_visible(t.oid)",
        NULL,
        3
      ))
        return false;
      appendPQExpBuffer(
        buf,
        "UNION ALL\n  SELECT o.oid as oid, o.tableoid as tableoid,\n  n.nspname as nspname,\n  CAST(o.opcname AS pg_catalog.text) as name,\n  CAST('%s' AS pg_catalog.text) as object\n  FROM pg_catalog.pg_opclass o\n    JOIN pg_catalog.pg_am am ON o.opcmethod = am.oid\n    JOIN pg_catalog.pg_namespace n ON n.oid = o.opcnamespace\n",
        gettext_noop("operator class")
      );
      if (!showSystem && !pattern)
        appendPQExpBufferStr(buf, "      AND n.nspname <> 'pg_catalog'\n      AND n.nspname <> 'information_schema'\n");
      if (!validateSQLNamePattern(
        buf,
        pattern,
        true,
        false,
        "n.nspname",
        "o.opcname",
        NULL,
        "pg_catalog.pg_opclass_is_visible(o.oid)",
        NULL,
        3
      ))
        return false;
      appendPQExpBuffer(
        buf,
        "UNION ALL\n  SELECT opf.oid as oid, opf.tableoid as tableoid,\n  n.nspname as nspname,\n  CAST(opf.opfname AS pg_catalog.text) AS name,\n  CAST('%s' AS pg_catalog.text) as object\n  FROM pg_catalog.pg_opfamily opf\n    JOIN pg_catalog.pg_am am ON opf.opfmethod = am.oid\n    JOIN pg_catalog.pg_namespace n ON opf.opfnamespace = n.oid\n",
        gettext_noop("operator family")
      );
      if (!showSystem && !pattern)
        appendPQExpBufferStr(buf, "      AND n.nspname <> 'pg_catalog'\n      AND n.nspname <> 'information_schema'\n");
      if (!validateSQLNamePattern(
        buf,
        pattern,
        true,
        false,
        "n.nspname",
        "opf.opfname",
        NULL,
        "pg_catalog.pg_opfamily_is_visible(opf.oid)",
        NULL,
        3
      ))
        return false;
      appendPQExpBuffer(
        buf,
        "UNION ALL\n  SELECT r.oid as oid, r.tableoid as tableoid,\n  n.nspname as nspname,\n  CAST(r.rulename AS pg_catalog.text) as name,  CAST('%s' AS pg_catalog.text) as object\n  FROM pg_catalog.pg_rewrite r\n       JOIN pg_catalog.pg_class c ON c.oid = r.ev_class\n       LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace\n  WHERE r.rulename != '_RETURN'\n",
        gettext_noop("rule")
      );
      if (!showSystem && !pattern)
        appendPQExpBufferStr(buf, "      AND n.nspname <> 'pg_catalog'\n      AND n.nspname <> 'information_schema'\n");
      if (!validateSQLNamePattern(
        buf,
        pattern,
        true,
        false,
        "n.nspname",
        "r.rulename",
        NULL,
        "pg_catalog.pg_table_is_visible(c.oid)",
        NULL,
        3
      ))
        return false;
      appendPQExpBuffer(
        buf,
        "UNION ALL\n  SELECT t.oid as oid, t.tableoid as tableoid,\n  n.nspname as nspname,\n  CAST(t.tgname AS pg_catalog.text) as name,  CAST('%s' AS pg_catalog.text) as object\n  FROM pg_catalog.pg_trigger t\n       JOIN pg_catalog.pg_class c ON c.oid = t.tgrelid\n       LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace\n",
        gettext_noop("trigger")
      );
      if (!showSystem && !pattern)
        appendPQExpBufferStr(buf, "WHERE n.nspname <> 'pg_catalog'\n      AND n.nspname <> 'information_schema'\n");
      if (!validateSQLNamePattern(
        buf,
        pattern,
        !showSystem && !pattern,
        false,
        "n.nspname",
        "t.tgname",
        NULL,
        "pg_catalog.pg_table_is_visible(c.oid)",
        NULL,
        3
      ))
        return false;
      appendPQExpBufferStr(
        buf,
        ") AS tt\n  JOIN pg_catalog.pg_description d ON (tt.oid = d.objoid AND tt.tableoid = d.classoid AND d.objsubid = 0)\n"
      );
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
    async function describeTableDetails(pattern, verbose, showSystem) {
      let buf = {
        /* struct */
      };
      let res;
      let i;
      initPQExpBuffer(buf);
      printfPQExpBuffer(
        buf,
        "SELECT c.oid,\n  n.nspname,\n  c.relname\nFROM pg_catalog.pg_class c\n     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace\n"
      );
      if (!showSystem && !pattern)
        appendPQExpBufferStr(buf, "WHERE n.nspname <> 'pg_catalog'\n      AND n.nspname <> 'information_schema'\n");
      if (!validateSQLNamePattern(
        buf,
        pattern,
        !showSystem && !pattern,
        false,
        "n.nspname",
        "c.relname",
        NULL,
        "pg_catalog.pg_table_is_visible(c.oid)",
        NULL,
        3
      )) {
        return false;
      }
      appendPQExpBufferStr(buf, "ORDER BY 2, 3;");
      res = await PSQLexec(buf.data);
      if (!res)
        return false;
      if (PQntuples(res) == 0) {
        if (!pset.quiet) {
          if (pattern)
            pg_log_error(
              'Did not find any relation named "%s".',
              pattern
            );
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
    async function describeOneTableDetails(schemaname, relationname, oid, verbose) {
      let retval = false;
      let buf = {
        /* struct */
      };
      let res = NULL;
      let myopt = pset.popt.topt;
      let cont = {
        /* struct */
      };
      let printTableInitialized = false;
      let i;
      let view_def = NULL;
      let headers = [];
      let title = {
        /* struct */
      };
      let tmpbuf = {
        /* struct */
      };
      let cols;
      let attname_col = -1, atttype_col = -1, attrdef_col = -1, attnotnull_col = -1, attcoll_col = -1, attidentity_col = -1, attgenerated_col = -1, isindexkey_col = -1, indexdef_col = -1, fdwopts_col = -1, attstorage_col = -1, attcompression_col = -1, attstattarget_col = -1, attdescr_col = -1;
      let numrows;
      let tableinfo = {};
      let show_column_details = false;
      myopt.default_footer = false;
      myopt.expanded = false;
      initPQExpBuffer(buf);
      initPQExpBuffer(title);
      initPQExpBuffer(tmpbuf);
      if (pset.sversion >= 12e4) {
        printfPQExpBuffer(
          buf,
          "SELECT c.relchecks, c.relkind, c.relhasindex, c.relhasrules, c.relhastriggers, c.relrowsecurity, c.relforcerowsecurity, false AS relhasoids, c.relispartition, %s, c.reltablespace, CASE WHEN c.reloftype = 0 THEN '' ELSE c.reloftype::pg_catalog.regtype::pg_catalog.text END, c.relpersistence, c.relreplident, am.amname\nFROM pg_catalog.pg_class c\n LEFT JOIN pg_catalog.pg_class tc ON (c.reltoastrelid = tc.oid)\nLEFT JOIN pg_catalog.pg_am am ON (c.relam = am.oid)\nWHERE c.oid = '%s';",
          verbose ? "pg_catalog.array_to_string(c.reloptions || array(select 'toast.' || x from pg_catalog.unnest(tc.reloptions) x), ', ')\n" : "''",
          oid
        );
      } else if (pset.sversion >= 1e5) {
        printfPQExpBuffer(
          buf,
          "SELECT c.relchecks, c.relkind, c.relhasindex, c.relhasrules, c.relhastriggers, c.relrowsecurity, c.relforcerowsecurity, c.relhasoids, c.relispartition, %s, c.reltablespace, CASE WHEN c.reloftype = 0 THEN '' ELSE c.reloftype::pg_catalog.regtype::pg_catalog.text END, c.relpersistence, c.relreplident\nFROM pg_catalog.pg_class c\n LEFT JOIN pg_catalog.pg_class tc ON (c.reltoastrelid = tc.oid)\nWHERE c.oid = '%s';",
          verbose ? "pg_catalog.array_to_string(c.reloptions || array(select 'toast.' || x from pg_catalog.unnest(tc.reloptions) x), ', ')\n" : "''",
          oid
        );
      } else if (pset.sversion >= 90500) {
        printfPQExpBuffer(
          buf,
          "SELECT c.relchecks, c.relkind, c.relhasindex, c.relhasrules, c.relhastriggers, c.relrowsecurity, c.relforcerowsecurity, c.relhasoids, false as relispartition, %s, c.reltablespace, CASE WHEN c.reloftype = 0 THEN '' ELSE c.reloftype::pg_catalog.regtype::pg_catalog.text END, c.relpersistence, c.relreplident\nFROM pg_catalog.pg_class c\n LEFT JOIN pg_catalog.pg_class tc ON (c.reltoastrelid = tc.oid)\nWHERE c.oid = '%s';",
          verbose ? "pg_catalog.array_to_string(c.reloptions || array(select 'toast.' || x from pg_catalog.unnest(tc.reloptions) x), ', ')\n" : "''",
          oid
        );
      } else if (pset.sversion >= 90400) {
        printfPQExpBuffer(
          buf,
          "SELECT c.relchecks, c.relkind, c.relhasindex, c.relhasrules, c.relhastriggers, false, false, c.relhasoids, false as relispartition, %s, c.reltablespace, CASE WHEN c.reloftype = 0 THEN '' ELSE c.reloftype::pg_catalog.regtype::pg_catalog.text END, c.relpersistence, c.relreplident\nFROM pg_catalog.pg_class c\n LEFT JOIN pg_catalog.pg_class tc ON (c.reltoastrelid = tc.oid)\nWHERE c.oid = '%s';",
          verbose ? "pg_catalog.array_to_string(c.reloptions || array(select 'toast.' || x from pg_catalog.unnest(tc.reloptions) x), ', ')\n" : "''",
          oid
        );
      } else {
        printfPQExpBuffer(
          buf,
          "SELECT c.relchecks, c.relkind, c.relhasindex, c.relhasrules, c.relhastriggers, false, false, c.relhasoids, false as relispartition, %s, c.reltablespace, CASE WHEN c.reloftype = 0 THEN '' ELSE c.reloftype::pg_catalog.regtype::pg_catalog.text END, c.relpersistence\nFROM pg_catalog.pg_class c\n LEFT JOIN pg_catalog.pg_class tc ON (c.reltoastrelid = tc.oid)\nWHERE c.oid = '%s';",
          verbose ? "pg_catalog.array_to_string(c.reloptions || array(select 'toast.' || x from pg_catalog.unnest(tc.reloptions) x), ', ')\n" : "''",
          oid
        );
      }
      res = await PSQLexec(buf.data);
      if (!res)
        return retval;
      if (PQntuples(res) == 0) {
        if (!pset.quiet)
          pg_log_error("Did not find any relation with OID %s.", oid);
        return retval;
      }
      tableinfo.checks = atoi(PQgetvalue(res, 0, 0));
      tableinfo.relkind = PQgetvalue(res, 0, 1);
      tableinfo.hasindex = strcmp(PQgetvalue(res, 0, 2), "t") == 0;
      tableinfo.hasrules = strcmp(PQgetvalue(res, 0, 3), "t") == 0;
      tableinfo.hastriggers = strcmp(PQgetvalue(res, 0, 4), "t") == 0;
      tableinfo.rowsecurity = strcmp(PQgetvalue(res, 0, 5), "t") == 0;
      tableinfo.forcerowsecurity = strcmp(PQgetvalue(res, 0, 6), "t") == 0;
      tableinfo.hasoids = strcmp(PQgetvalue(res, 0, 7), "t") == 0;
      tableinfo.ispartition = strcmp(PQgetvalue(res, 0, 8), "t") == 0;
      tableinfo.reloptions = pg_strdup(PQgetvalue(res, 0, 9));
      tableinfo.tablespace = atooid(PQgetvalue(res, 0, 10));
      tableinfo.reloftype = strcmp(PQgetvalue(res, 0, 11), "") != 0 ? pg_strdup(PQgetvalue(res, 0, 11)) : NULL;
      tableinfo.relpersistence = PQgetvalue(res, 0, 12);
      tableinfo.relreplident = pset.sversion >= 90400 ? PQgetvalue(res, 0, 13) : "d";
      if (pset.sversion >= 12e4)
        tableinfo.relam = PQgetisnull(res, 0, 14) ? NULL : pg_strdup(PQgetvalue(res, 0, 14));
      else
        tableinfo.relam = NULL;
      res = NULL;
      if (tableinfo.relkind == RELKIND_SEQUENCE) {
        let result = NULL;
        let myopt2 = pset.popt;
        let footers = [NULL, NULL];
        if (pset.sversion >= 1e5) {
          printfPQExpBuffer(
            buf,
            `SELECT pg_catalog.format_type(seqtypid, NULL) AS "%s",
       seqstart AS "%s",
       seqmin AS "%s",
       seqmax AS "%s",
       seqincrement AS "%s",
       CASE WHEN seqcycle THEN '%s' ELSE '%s' END AS "%s",
       seqcache AS "%s"
`,
            gettext_noop("Type"),
            gettext_noop("Start"),
            gettext_noop("Minimum"),
            gettext_noop("Maximum"),
            gettext_noop("Increment"),
            gettext_noop("yes"),
            gettext_noop("no"),
            gettext_noop("Cycles?"),
            gettext_noop("Cache")
          );
          appendPQExpBuffer(
            buf,
            "FROM pg_catalog.pg_sequence\nWHERE seqrelid = '%s';",
            oid
          );
        } else {
          printfPQExpBuffer(
            buf,
            `SELECT 'bigint' AS "%s",
       start_value AS "%s",
       min_value AS "%s",
       max_value AS "%s",
       increment_by AS "%s",
       CASE WHEN is_cycled THEN '%s' ELSE '%s' END AS "%s",
       cache_value AS "%s"
`,
            gettext_noop("Type"),
            gettext_noop("Start"),
            gettext_noop("Minimum"),
            gettext_noop("Maximum"),
            gettext_noop("Increment"),
            gettext_noop("yes"),
            gettext_noop("no"),
            gettext_noop("Cycles?"),
            gettext_noop("Cache")
          );
          appendPQExpBuffer(buf, "FROM %s", fmtId(schemaname));
          appendPQExpBuffer(buf, ".%s;", fmtId(relationname));
        }
        res = await PSQLexec(buf.data);
        if (!res)
          return retval;
        printfPQExpBuffer(
          buf,
          "SELECT pg_catalog.quote_ident(nspname) || '.' ||\n   pg_catalog.quote_ident(relname) || '.' ||\n   pg_catalog.quote_ident(attname),\n   d.deptype\nFROM pg_catalog.pg_class c\nINNER JOIN pg_catalog.pg_depend d ON c.oid=d.refobjid\nINNER JOIN pg_catalog.pg_namespace n ON n.oid=c.relnamespace\nINNER JOIN pg_catalog.pg_attribute a ON (\n a.attrelid=c.oid AND\n a.attnum=d.refobjsubid)\nWHERE d.classid='pg_catalog.pg_class'::pg_catalog.regclass\n AND d.refclassid='pg_catalog.pg_class'::pg_catalog.regclass\n AND d.objid='%s'\n AND d.deptype IN ('a', 'i')",
          oid
        );
        result = await PSQLexec(buf.data);
        if (!result)
          return retval;
        else if (PQntuples(result) == 1) {
          switch (PQgetvalue(result, 0, 1)[0]) {
            case "a":
              footers[0] = psprintf(
                _("Owned by: %s"),
                PQgetvalue(result, 0, 0)
              );
              break;
            case "i":
              footers[0] = psprintf(
                _("Sequence for identity column: %s"),
                PQgetvalue(result, 0, 0)
              );
              break;
          }
        }
        if (tableinfo.relpersistence == "u")
          printfPQExpBuffer(
            title,
            _('Unlogged sequence "%s.%s"'),
            schemaname,
            relationname
          );
        else
          printfPQExpBuffer(
            title,
            _('Sequence "%s.%s"'),
            schemaname,
            relationname
          );
        myopt2.footers = footers;
        myopt2.topt.default_footer = false;
        myopt2.title = title.data;
        myopt2.translate_header = true;
        printQuery(res, myopt2, pset.queryFout, false, pset.logfile);
        retval = true;
        return retval;
      }
      if (tableinfo.relkind == RELKIND_RELATION || tableinfo.relkind == RELKIND_VIEW || tableinfo.relkind == RELKIND_MATVIEW || tableinfo.relkind == RELKIND_FOREIGN_TABLE || tableinfo.relkind == RELKIND_COMPOSITE_TYPE || tableinfo.relkind == RELKIND_PARTITIONED_TABLE)
        show_column_details = true;
      cols = 0;
      printfPQExpBuffer(buf, "SELECT a.attname");
      attname_col = cols++;
      appendPQExpBufferStr(buf, ",\n  pg_catalog.format_type(a.atttypid, a.atttypmod)");
      atttype_col = cols++;
      if (show_column_details) {
        appendPQExpBufferStr(
          buf,
          ",\n  (SELECT pg_catalog.pg_get_expr(d.adbin, d.adrelid, true)\n   FROM pg_catalog.pg_attrdef d\n   WHERE d.adrelid = a.attrelid AND d.adnum = a.attnum AND a.atthasdef),\n  a.attnotnull"
        );
        attrdef_col = cols++;
        attnotnull_col = cols++;
        appendPQExpBufferStr(buf, ",\n  (SELECT c.collname FROM pg_catalog.pg_collation c, pg_catalog.pg_type t\n   WHERE c.oid = a.attcollation AND t.oid = a.atttypid AND a.attcollation <> t.typcollation) AS attcollation");
        attcoll_col = cols++;
        if (pset.sversion >= 1e5)
          appendPQExpBufferStr(buf, ",\n  a.attidentity");
        else
          appendPQExpBufferStr(buf, ",\n  ''::pg_catalog.char AS attidentity");
        attidentity_col = cols++;
        if (pset.sversion >= 12e4)
          appendPQExpBufferStr(buf, ",\n  a.attgenerated");
        else
          appendPQExpBufferStr(buf, ",\n  ''::pg_catalog.char AS attgenerated");
        attgenerated_col = cols++;
      }
      if (tableinfo.relkind == RELKIND_INDEX || tableinfo.relkind == RELKIND_PARTITIONED_INDEX) {
        if (pset.sversion >= 11e4) {
          appendPQExpBuffer(
            buf,
            ",\n  CASE WHEN a.attnum <= (SELECT i.indnkeyatts FROM pg_catalog.pg_index i WHERE i.indexrelid = '%s') THEN '%s' ELSE '%s' END AS is_key",
            oid,
            gettext_noop("yes"),
            gettext_noop("no")
          );
          isindexkey_col = cols++;
        }
        appendPQExpBufferStr(buf, ",\n  pg_catalog.pg_get_indexdef(a.attrelid, a.attnum, TRUE) AS indexdef");
        indexdef_col = cols++;
      }
      if (tableinfo.relkind == RELKIND_FOREIGN_TABLE) {
        appendPQExpBufferStr(buf, ",\n  CASE WHEN attfdwoptions IS NULL THEN '' ELSE   '(' || pg_catalog.array_to_string(ARRAY(SELECT pg_catalog.quote_ident(option_name) || ' ' || pg_catalog.quote_literal(option_value)  FROM   pg_catalog.pg_options_to_table(attfdwoptions)), ', ') || ')' END AS attfdwoptions");
        fdwopts_col = cols++;
      }
      if (verbose) {
        appendPQExpBufferStr(buf, ",\n  a.attstorage");
        attstorage_col = cols++;
        if (pset.sversion >= 14e4 && !pset.hide_compression && (tableinfo.relkind == RELKIND_RELATION || tableinfo.relkind == RELKIND_PARTITIONED_TABLE || tableinfo.relkind == RELKIND_MATVIEW)) {
          appendPQExpBufferStr(buf, ",\n  a.attcompression AS attcompression");
          attcompression_col = cols++;
        }
        if (tableinfo.relkind == RELKIND_RELATION || tableinfo.relkind == RELKIND_INDEX || tableinfo.relkind == RELKIND_PARTITIONED_INDEX || tableinfo.relkind == RELKIND_MATVIEW || tableinfo.relkind == RELKIND_FOREIGN_TABLE || tableinfo.relkind == RELKIND_PARTITIONED_TABLE) {
          appendPQExpBufferStr(buf, ",\n  CASE WHEN a.attstattarget=-1 THEN NULL ELSE a.attstattarget END AS attstattarget");
          attstattarget_col = cols++;
        }
        if (tableinfo.relkind == RELKIND_RELATION || tableinfo.relkind == RELKIND_VIEW || tableinfo.relkind == RELKIND_MATVIEW || tableinfo.relkind == RELKIND_FOREIGN_TABLE || tableinfo.relkind == RELKIND_COMPOSITE_TYPE || tableinfo.relkind == RELKIND_PARTITIONED_TABLE) {
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
      switch (tableinfo.relkind) {
        case RELKIND_RELATION:
          if (tableinfo.relpersistence == "u")
            printfPQExpBuffer(
              title,
              _('Unlogged table "%s.%s"'),
              schemaname,
              relationname
            );
          else
            printfPQExpBuffer(
              title,
              _('Table "%s.%s"'),
              schemaname,
              relationname
            );
          break;
        case RELKIND_VIEW:
          printfPQExpBuffer(
            title,
            _('View "%s.%s"'),
            schemaname,
            relationname
          );
          break;
        case RELKIND_MATVIEW:
          if (tableinfo.relpersistence == "u")
            printfPQExpBuffer(
              title,
              _('Unlogged materialized view "%s.%s"'),
              schemaname,
              relationname
            );
          else
            printfPQExpBuffer(
              title,
              _('Materialized view "%s.%s"'),
              schemaname,
              relationname
            );
          break;
        case RELKIND_INDEX:
          if (tableinfo.relpersistence == "u")
            printfPQExpBuffer(
              title,
              _('Unlogged index "%s.%s"'),
              schemaname,
              relationname
            );
          else
            printfPQExpBuffer(
              title,
              _('Index "%s.%s"'),
              schemaname,
              relationname
            );
          break;
        case RELKIND_PARTITIONED_INDEX:
          if (tableinfo.relpersistence == "u")
            printfPQExpBuffer(
              title,
              _('Unlogged partitioned index "%s.%s"'),
              schemaname,
              relationname
            );
          else
            printfPQExpBuffer(
              title,
              _('Partitioned index "%s.%s"'),
              schemaname,
              relationname
            );
          break;
        case RELKIND_TOASTVALUE:
          printfPQExpBuffer(
            title,
            _('TOAST table "%s.%s"'),
            schemaname,
            relationname
          );
          break;
        case RELKIND_COMPOSITE_TYPE:
          printfPQExpBuffer(
            title,
            _('Composite type "%s.%s"'),
            schemaname,
            relationname
          );
          break;
        case RELKIND_FOREIGN_TABLE:
          printfPQExpBuffer(
            title,
            _('Foreign table "%s.%s"'),
            schemaname,
            relationname
          );
          break;
        case RELKIND_PARTITIONED_TABLE:
          if (tableinfo.relpersistence == "u")
            printfPQExpBuffer(
              title,
              _('Unlogged partitioned table "%s.%s"'),
              schemaname,
              relationname
            );
          else
            printfPQExpBuffer(
              title,
              _('Partitioned table "%s.%s"'),
              schemaname,
              relationname
            );
          break;
        default:
          printfPQExpBuffer(
            title,
            '?%c? "%s.%s"',
            tableinfo.relkind,
            schemaname,
            relationname
          );
          break;
      }
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
      printTableInitialized = true;
      for (i = 0; i < cols; i++)
        printTableAddHeader(cont, headers[i], true, "l");
      for (i = 0; i < numrows; i++) {
        printTableAddCell(cont, PQgetvalue(res, i, attname_col), false, false);
        printTableAddCell(cont, PQgetvalue(res, i, atttype_col), false, false);
        if (show_column_details) {
          let identity;
          let generated;
          let default_str;
          let mustfree = false;
          printTableAddCell(cont, PQgetvalue(res, i, attcoll_col), false, false);
          printTableAddCell(
            cont,
            strcmp(PQgetvalue(res, i, attnotnull_col), "t") == 0 ? "not null" : "",
            false,
            false
          );
          identity = PQgetvalue(res, i, attidentity_col);
          generated = PQgetvalue(res, i, attgenerated_col);
          if (identity[0] == ATTRIBUTE_IDENTITY_ALWAYS)
            default_str = "generated always as identity";
          else if (identity[0] == ATTRIBUTE_IDENTITY_BY_DEFAULT)
            default_str = "generated by default as identity";
          else if (generated[0] == ATTRIBUTE_GENERATED_STORED) {
            default_str = psprintf(
              "generated always as (%s) stored",
              PQgetvalue(res, i, attrdef_col)
            );
            mustfree = true;
          } else
            default_str = PQgetvalue(res, i, attrdef_col);
          printTableAddCell(cont, default_str, false, mustfree);
        }
        if (isindexkey_col >= 0)
          printTableAddCell(cont, PQgetvalue(res, i, isindexkey_col), true, false);
        if (indexdef_col >= 0)
          printTableAddCell(cont, PQgetvalue(res, i, indexdef_col), false, false);
        if (fdwopts_col >= 0)
          printTableAddCell(cont, PQgetvalue(res, i, fdwopts_col), false, false);
        if (attstorage_col >= 0) {
          let storage = PQgetvalue(res, i, attstorage_col);
          printTableAddCell(
            cont,
            storage[0] == "p" ? "plain" : storage[0] == "m" ? "main" : storage[0] == "x" ? "extended" : storage[0] == "e" ? "external" : "???",
            false,
            false
          );
        }
        if (attcompression_col >= 0) {
          let compression = PQgetvalue(res, i, attcompression_col);
          printTableAddCell(
            cont,
            compression[0] == "p" ? "pglz" : compression[0] == "l" ? "lz4" : compression[0] == NULL ? "" : "???",
            false,
            false
          );
        }
        if (attstattarget_col >= 0)
          printTableAddCell(
            cont,
            PQgetvalue(res, i, attstattarget_col),
            false,
            false
          );
        if (attdescr_col >= 0)
          printTableAddCell(
            cont,
            PQgetvalue(res, i, attdescr_col),
            false,
            false
          );
      }
      if (tableinfo.ispartition) {
        let result;
        printfPQExpBuffer(
          buf,
          "SELECT inhparent::pg_catalog.regclass,\n  pg_catalog.pg_get_expr(c.relpartbound, c.oid),\n  "
        );
        appendPQExpBufferStr(
          buf,
          pset.sversion >= 14e4 ? "inhdetachpending" : "false as inhdetachpending"
        );
        if (verbose)
          appendPQExpBufferStr(
            buf,
            ",\n  pg_catalog.pg_get_partition_constraintdef(c.oid)"
          );
        appendPQExpBuffer(
          buf,
          "\nFROM pg_catalog.pg_class c JOIN pg_catalog.pg_inherits i ON c.oid = inhrelid\nWHERE c.oid = '%s';",
          oid
        );
        result = await PSQLexec(buf.data);
        if (!result)
          return retval;
        if (PQntuples(result) > 0) {
          let parent_name = PQgetvalue(result, 0, 0);
          let partdef = PQgetvalue(result, 0, 1);
          let detached = PQgetvalue(result, 0, 2);
          printfPQExpBuffer(
            tmpbuf,
            _("Partition of: %s %s%s"),
            parent_name,
            partdef,
            strcmp(detached, "t") == 0 ? " DETACH PENDING" : ""
          );
          printTableAddFooter(cont, tmpbuf.data);
          if (verbose) {
            let partconstraintdef = NULL;
            if (!PQgetisnull(result, 0, 3))
              partconstraintdef = PQgetvalue(result, 0, 3);
            if (partconstraintdef == NULL || partconstraintdef[0] == NULL)
              printfPQExpBuffer(tmpbuf, _("No partition constraint"));
            else
              printfPQExpBuffer(
                tmpbuf,
                _("Partition constraint: %s"),
                partconstraintdef
              );
            printTableAddFooter(cont, tmpbuf.data);
          }
        }
      }
      if (tableinfo.relkind == RELKIND_PARTITIONED_TABLE) {
        let result;
        printfPQExpBuffer(
          buf,
          "SELECT pg_catalog.pg_get_partkeydef('%s'::pg_catalog.oid);",
          oid
        );
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
        let result;
        printfPQExpBuffer(
          buf,
          "SELECT n.nspname, c.relname\nFROM pg_catalog.pg_class c JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace\nWHERE reltoastrelid = '%s';",
          oid
        );
        result = await PSQLexec(buf.data);
        if (!result)
          return retval;
        if (PQntuples(result) == 1) {
          let schemaname2 = PQgetvalue(result, 0, 0);
          let relname = PQgetvalue(result, 0, 1);
          printfPQExpBuffer(
            tmpbuf,
            _('Owning table: "%s.%s"'),
            schemaname2,
            relname
          );
          printTableAddFooter(cont, tmpbuf.data);
        }
      }
      if (tableinfo.relkind == RELKIND_INDEX || tableinfo.relkind == RELKIND_PARTITIONED_INDEX) {
        let result;
        printfPQExpBuffer(
          buf,
          "SELECT i.indisunique, i.indisprimary, i.indisclustered, i.indisvalid,\n  (NOT i.indimmediate) AND EXISTS (SELECT 1 FROM pg_catalog.pg_constraint WHERE conrelid = i.indrelid AND conindid = i.indexrelid AND contype IN ('p','u','x') AND condeferrable) AS condeferrable,\n  (NOT i.indimmediate) AND EXISTS (SELECT 1 FROM pg_catalog.pg_constraint WHERE conrelid = i.indrelid AND conindid = i.indexrelid AND contype IN ('p','u','x') AND condeferred) AS condeferred,\n"
        );
        if (pset.sversion >= 90400)
          appendPQExpBufferStr(buf, "i.indisreplident,\n");
        else
          appendPQExpBufferStr(buf, "false AS indisreplident,\n");
        if (pset.sversion >= 15e4)
          appendPQExpBufferStr(buf, "i.indnullsnotdistinct,\n");
        else
          appendPQExpBufferStr(buf, "false AS indnullsnotdistinct,\n");
        appendPQExpBuffer(
          buf,
          "  a.amname, c2.relname, pg_catalog.pg_get_expr(i.indpred, i.indrelid, true)\nFROM pg_catalog.pg_index i, pg_catalog.pg_class c, pg_catalog.pg_class c2, pg_catalog.pg_am a\nWHERE i.indexrelid = c.oid AND c.oid = '%s' AND c.relam = a.oid\nAND i.indrelid = c2.oid;",
          oid
        );
        result = await PSQLexec(buf.data);
        if (!result)
          return retval;
        else if (PQntuples(result) != 1) {
          return retval;
        } else {
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
          } else
            resetPQExpBuffer(tmpbuf);
          appendPQExpBuffer(tmpbuf, "%s, ", indamname);
          appendPQExpBuffer(
            tmpbuf,
            _('for table "%s.%s"'),
            schemaname,
            indtable
          );
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
          if (tableinfo.relkind == RELKIND_INDEX)
            await add_tablespace_footer(
              cont,
              tableinfo.relkind,
              tableinfo.tablespace,
              true
            );
        }
      } else if (tableinfo.relkind == RELKIND_RELATION || tableinfo.relkind == RELKIND_MATVIEW || tableinfo.relkind == RELKIND_FOREIGN_TABLE || tableinfo.relkind == RELKIND_PARTITIONED_TABLE || tableinfo.relkind == RELKIND_PARTITIONED_INDEX || tableinfo.relkind == RELKIND_TOASTVALUE) {
        let result = NULL;
        let tuples = 0;
        if (tableinfo.hasindex) {
          printfPQExpBuffer(
            buf,
            "SELECT c2.relname, i.indisprimary, i.indisunique, i.indisclustered, i.indisvalid, pg_catalog.pg_get_indexdef(i.indexrelid, 0, true),\n  pg_catalog.pg_get_constraintdef(con.oid, true), contype, condeferrable, condeferred"
          );
          if (pset.sversion >= 90400)
            appendPQExpBufferStr(buf, ", i.indisreplident");
          else
            appendPQExpBufferStr(buf, ", false AS indisreplident");
          appendPQExpBufferStr(buf, ", c2.reltablespace");
          appendPQExpBuffer(
            buf,
            "\nFROM pg_catalog.pg_class c, pg_catalog.pg_class c2, pg_catalog.pg_index i\n  LEFT JOIN pg_catalog.pg_constraint con ON (conrelid = i.indrelid AND conindid = i.indexrelid AND contype IN ('p','u','x'))\nWHERE c.oid = '%s' AND c.oid = i.indrelid AND i.indexrelid = c2.oid\nORDER BY i.indisprimary DESC, c2.relname;",
            oid
          );
          result = await PSQLexec(buf.data);
          if (!result)
            return retval;
          else
            tuples = PQntuples(result);
          if (tuples > 0) {
            printTableAddFooter(cont, _("Indexes:"));
            for (i = 0; i < tuples; i++) {
              printfPQExpBuffer(
                buf,
                '    "%s"',
                PQgetvalue(result, i, 0)
              );
              if (strcmp(PQgetvalue(result, i, 7), "x") == 0) {
                appendPQExpBuffer(
                  buf,
                  " %s",
                  PQgetvalue(result, i, 6)
                );
              } else {
                let indexdef;
                let usingpos;
                if (strcmp(PQgetvalue(result, i, 1), "t") == 0)
                  appendPQExpBufferStr(buf, " PRIMARY KEY,");
                else if (strcmp(PQgetvalue(result, i, 2), "t") == 0) {
                  if (strcmp(PQgetvalue(result, i, 7), "u") == 0)
                    appendPQExpBufferStr(buf, " UNIQUE CONSTRAINT,");
                  else
                    appendPQExpBufferStr(buf, " UNIQUE,");
                }
                indexdef = PQgetvalue(result, i, 5);
                usingpos = strstr(indexdef, " USING ");
                if (usingpos != NULL)
                  indexdef = indexdef.slice(usingpos + 7);
                appendPQExpBuffer(buf, " %s", indexdef);
                if (strcmp(PQgetvalue(result, i, 8), "t") == 0)
                  appendPQExpBufferStr(buf, " DEFERRABLE");
                if (strcmp(PQgetvalue(result, i, 9), "t") == 0)
                  appendPQExpBufferStr(buf, " INITIALLY DEFERRED");
              }
              if (strcmp(PQgetvalue(result, i, 3), "t") == 0)
                appendPQExpBufferStr(buf, " CLUSTER");
              if (strcmp(PQgetvalue(result, i, 4), "t") != 0)
                appendPQExpBufferStr(buf, " INVALID");
              if (strcmp(PQgetvalue(result, i, 10), "t") == 0)
                appendPQExpBufferStr(buf, " REPLICA IDENTITY");
              printTableAddFooter(cont, buf.data);
              await add_tablespace_footer(
                cont,
                RELKIND_INDEX,
                atooid(PQgetvalue(result, i, 11)),
                false
              );
            }
          }
        }
        if (tableinfo.checks) {
          printfPQExpBuffer(
            buf,
            "SELECT r.conname, pg_catalog.pg_get_constraintdef(r.oid, true)\nFROM pg_catalog.pg_constraint r\nWHERE r.conrelid = '%s' AND r.contype = 'c'\nORDER BY 1;",
            oid
          );
          result = await PSQLexec(buf.data);
          if (!result)
            return retval;
          else
            tuples = PQntuples(result);
          if (tuples > 0) {
            printTableAddFooter(cont, _("Check constraints:"));
            for (i = 0; i < tuples; i++) {
              printfPQExpBuffer(
                buf,
                '    "%s" %s',
                PQgetvalue(result, i, 0),
                PQgetvalue(result, i, 1)
              );
              printTableAddFooter(cont, buf.data);
            }
          }
        }
        if (tableinfo.hastriggers || tableinfo.relkind == RELKIND_PARTITIONED_TABLE) {
          if (pset.sversion >= 12e4 && (tableinfo.ispartition || tableinfo.relkind == RELKIND_PARTITIONED_TABLE)) {
            printfPQExpBuffer(
              buf,
              "SELECT conrelid = '%s'::pg_catalog.regclass AS sametable,\n       conname,\n       pg_catalog.pg_get_constraintdef(oid, true) AS condef,\n       conrelid::pg_catalog.regclass AS ontable\n  FROM pg_catalog.pg_constraint,\n       pg_catalog.pg_partition_ancestors('%s')\n WHERE conrelid = relid AND contype = 'f' AND conparentid = 0\nORDER BY sametable DESC, conname;",
              oid,
              oid
            );
          } else {
            printfPQExpBuffer(
              buf,
              "SELECT true as sametable, conname,\n  pg_catalog.pg_get_constraintdef(r.oid, true) as condef,\n  conrelid::pg_catalog.regclass AS ontable\nFROM pg_catalog.pg_constraint r\nWHERE r.conrelid = '%s' AND r.contype = 'f'\n",
              oid
            );
            if (pset.sversion >= 12e4)
              appendPQExpBufferStr(buf, "     AND conparentid = 0\n");
            appendPQExpBufferStr(buf, "ORDER BY conname");
          }
          result = await PSQLexec(buf.data);
          if (!result)
            return retval;
          else
            tuples = PQntuples(result);
          if (tuples > 0) {
            let i_sametable = PQfnumber(result, "sametable"), i_conname = PQfnumber(result, "conname"), i_condef = PQfnumber(result, "condef"), i_ontable = PQfnumber(result, "ontable");
            printTableAddFooter(cont, _("Foreign-key constraints:"));
            for (i = 0; i < tuples; i++) {
              if (strcmp(PQgetvalue(result, i, i_sametable), "f") == 0)
                printfPQExpBuffer(
                  buf,
                  '    TABLE "%s" CONSTRAINT "%s" %s',
                  PQgetvalue(result, i, i_ontable),
                  PQgetvalue(result, i, i_conname),
                  PQgetvalue(result, i, i_condef)
                );
              else
                printfPQExpBuffer(
                  buf,
                  '    "%s" %s',
                  PQgetvalue(result, i, i_conname),
                  PQgetvalue(result, i, i_condef)
                );
              printTableAddFooter(cont, buf.data);
            }
          }
        }
        if (tableinfo.hastriggers || tableinfo.relkind == RELKIND_PARTITIONED_TABLE) {
          if (pset.sversion >= 12e4) {
            printfPQExpBuffer(
              buf,
              "SELECT conname, conrelid::pg_catalog.regclass AS ontable,\n       pg_catalog.pg_get_constraintdef(oid, true) AS condef\n  FROM pg_catalog.pg_constraint c\n WHERE confrelid IN (SELECT pg_catalog.pg_partition_ancestors('%s')\n                     UNION ALL VALUES ('%s'::pg_catalog.regclass))\n       AND contype = 'f' AND conparentid = 0\nORDER BY conname;",
              oid,
              oid
            );
          } else {
            printfPQExpBuffer(
              buf,
              "SELECT conname, conrelid::pg_catalog.regclass AS ontable,\n       pg_catalog.pg_get_constraintdef(oid, true) AS condef\n  FROM pg_catalog.pg_constraint\n WHERE confrelid = %s AND contype = 'f'\nORDER BY conname;",
              oid
            );
          }
          result = await PSQLexec(buf.data);
          if (!result)
            return retval;
          else
            tuples = PQntuples(result);
          if (tuples > 0) {
            let i_conname = PQfnumber(result, "conname"), i_ontable = PQfnumber(result, "ontable"), i_condef = PQfnumber(result, "condef");
            printTableAddFooter(cont, _("Referenced by:"));
            for (i = 0; i < tuples; i++) {
              printfPQExpBuffer(
                buf,
                '    TABLE "%s" CONSTRAINT "%s" %s',
                PQgetvalue(result, i, i_ontable),
                PQgetvalue(result, i, i_conname),
                PQgetvalue(result, i, i_condef)
              );
              printTableAddFooter(cont, buf.data);
            }
          }
        }
        if (pset.sversion >= 90500) {
          printfPQExpBuffer(buf, "SELECT pol.polname,");
          if (pset.sversion >= 1e5)
            appendPQExpBufferStr(
              buf,
              " pol.polpermissive,\n"
            );
          else
            appendPQExpBufferStr(
              buf,
              " 't' as polpermissive,\n"
            );
          appendPQExpBuffer(
            buf,
            "  CASE WHEN pol.polroles = '{0}' THEN NULL ELSE pg_catalog.array_to_string(array(select rolname from pg_catalog.pg_roles where oid = any (pol.polroles) order by 1),',') END,\n  pg_catalog.pg_get_expr(pol.polqual, pol.polrelid),\n  pg_catalog.pg_get_expr(pol.polwithcheck, pol.polrelid),\n  CASE pol.polcmd\n    WHEN 'r' THEN 'SELECT'\n    WHEN 'a' THEN 'INSERT'\n    WHEN 'w' THEN 'UPDATE'\n    WHEN 'd' THEN 'DELETE'\n    END AS cmd\nFROM pg_catalog.pg_policy pol\nWHERE pol.polrelid = '%s' ORDER BY 1;",
            oid
          );
          result = await PSQLexec(buf.data);
          if (!result)
            return retval;
          else
            tuples = PQntuples(result);
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
          for (i = 0; i < tuples; i++) {
            printfPQExpBuffer(
              buf,
              '    POLICY "%s"',
              PQgetvalue(result, i, 0)
            );
            if (PQgetvalue(result, i, 1) == "f")
              appendPQExpBufferStr(buf, " AS RESTRICTIVE");
            if (!PQgetisnull(result, i, 5))
              appendPQExpBuffer(
                buf,
                " FOR %s",
                PQgetvalue(result, i, 5)
              );
            if (!PQgetisnull(result, i, 2)) {
              appendPQExpBuffer(
                buf,
                "\n      TO %s",
                PQgetvalue(result, i, 2)
              );
            }
            if (!PQgetisnull(result, i, 3))
              appendPQExpBuffer(
                buf,
                "\n      USING (%s)",
                PQgetvalue(result, i, 3)
              );
            if (!PQgetisnull(result, i, 4))
              appendPQExpBuffer(
                buf,
                "\n      WITH CHECK (%s)",
                PQgetvalue(result, i, 4)
              );
            printTableAddFooter(cont, buf.data);
          }
        }
        if (pset.sversion >= 14e4) {
          printfPQExpBuffer(
            buf,
            "SELECT oid, stxrelid::pg_catalog.regclass, stxnamespace::pg_catalog.regnamespace::pg_catalog.text AS nsp, stxname,\npg_catalog.pg_get_statisticsobjdef_columns(oid) AS columns,\n  'd' = any(stxkind) AS ndist_enabled,\n  'f' = any(stxkind) AS deps_enabled,\n  'm' = any(stxkind) AS mcv_enabled,\nstxstattarget\nFROM pg_catalog.pg_statistic_ext\nWHERE stxrelid = '%s'\nORDER BY nsp, stxname;",
            oid
          );
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
              has_ndistinct = strcmp(PQgetvalue(result, i, 5), "t") == 0;
              has_dependencies = strcmp(PQgetvalue(result, i, 6), "t") == 0;
              has_mcv = strcmp(PQgetvalue(result, i, 7), "t") == 0;
              printfPQExpBuffer(buf, "    ");
              appendPQExpBuffer(
                buf,
                '"%s.%s"',
                PQgetvalue(result, i, 2),
                PQgetvalue(result, i, 3)
              );
              has_all = has_ndistinct && has_dependencies && has_mcv;
              has_some = has_ndistinct || has_dependencies || has_mcv;
              if (has_some && !has_all) {
                appendPQExpBufferStr(buf, " (");
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
                appendPQExpBufferChar(buf, ")");
              }
              appendPQExpBuffer(
                buf,
                " ON %s FROM %s",
                PQgetvalue(result, i, 4),
                PQgetvalue(result, i, 1)
              );
              if (strcmp(PQgetvalue(result, i, 8), "-1") != 0)
                appendPQExpBuffer(
                  buf,
                  "; STATISTICS %s",
                  PQgetvalue(result, i, 8)
                );
              printTableAddFooter(cont, buf.data);
            }
          }
        } else if (pset.sversion >= 1e5) {
          printfPQExpBuffer(
            buf,
            "SELECT oid, stxrelid::pg_catalog.regclass, stxnamespace::pg_catalog.regnamespace AS nsp, stxname,\n  (SELECT pg_catalog.string_agg(pg_catalog.quote_ident(attname),', ')\n   FROM pg_catalog.unnest(stxkeys) s(attnum)\n   JOIN pg_catalog.pg_attribute a ON (stxrelid = a.attrelid AND\n        a.attnum = s.attnum AND NOT attisdropped)) AS columns,\n  'd' = any(stxkind) AS ndist_enabled,\n  'f' = any(stxkind) AS deps_enabled,\n  'm' = any(stxkind) AS mcv_enabled,\n"
          );
          if (pset.sversion >= 13e4)
            appendPQExpBufferStr(buf, "  stxstattarget\n");
          else
            appendPQExpBufferStr(buf, "  -1 AS stxstattarget\n");
          appendPQExpBuffer(
            buf,
            "FROM pg_catalog.pg_statistic_ext\nWHERE stxrelid = '%s'\nORDER BY 1;",
            oid
          );
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
              appendPQExpBuffer(
                buf,
                '"%s.%s" (',
                PQgetvalue(result, i, 2),
                PQgetvalue(result, i, 3)
              );
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
              appendPQExpBuffer(
                buf,
                ") ON %s FROM %s",
                PQgetvalue(result, i, 4),
                PQgetvalue(result, i, 1)
              );
              if (strcmp(PQgetvalue(result, i, 8), "-1") != 0)
                appendPQExpBuffer(
                  buf,
                  "; STATISTICS %s",
                  PQgetvalue(result, i, 8)
                );
              printTableAddFooter(cont, buf.data);
            }
          }
        }
        if (tableinfo.hasrules && tableinfo.relkind != RELKIND_MATVIEW) {
          printfPQExpBuffer(
            buf,
            "SELECT r.rulename, trim(trailing ';' from pg_catalog.pg_get_ruledef(r.oid, true)), ev_enabled\nFROM pg_catalog.pg_rewrite r\nWHERE r.ev_class = '%s' ORDER BY 1;",
            oid
          );
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
                    if (PQgetvalue(result, i, 2) == "O")
                      list_rule = true;
                    break;
                  case 1:
                    if (PQgetvalue(result, i, 2) == "D")
                      list_rule = true;
                    break;
                  case 2:
                    if (PQgetvalue(result, i, 2) == "A")
                      list_rule = true;
                    break;
                  case 3:
                    if (PQgetvalue(result, i, 2) == "R")
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
                ruledef = PQgetvalue(result, i, 1);
                ruledef = ruledef.slice(12);
                printfPQExpBuffer(buf, "    %s", ruledef);
                printTableAddFooter(cont, buf.data);
              }
            }
          }
        }
        if (pset.sversion >= 1e5) {
          if (pset.sversion >= 15e4) {
            printfPQExpBuffer(
              buf,
              "SELECT pubname\n     , NULL\n     , NULL\nFROM pg_catalog.pg_publication p\n     JOIN pg_catalog.pg_publication_namespace pn ON p.oid = pn.pnpubid\n     JOIN pg_catalog.pg_class pc ON pc.relnamespace = pn.pnnspid\nWHERE pc.oid ='%s' and pg_catalog.pg_relation_is_publishable('%s')\nUNION\nSELECT pubname\n     , pg_get_expr(pr.prqual, c.oid)\n     , (CASE WHEN pr.prattrs IS NOT NULL THEN\n         (SELECT string_agg(attname, ', ')\n           FROM pg_catalog.generate_series(0, pg_catalog.array_upper(pr.prattrs::pg_catalog.int2[], 1)) s,\n                pg_catalog.pg_attribute\n          WHERE attrelid = pr.prrelid AND attnum = prattrs[s])\n        ELSE NULL END) FROM pg_catalog.pg_publication p\n     JOIN pg_catalog.pg_publication_rel pr ON p.oid = pr.prpubid\n     JOIN pg_catalog.pg_class c ON c.oid = pr.prrelid\nWHERE pr.prrelid = '%s'\nUNION\nSELECT pubname\n     , NULL\n     , NULL\nFROM pg_catalog.pg_publication p\nWHERE p.puballtables AND pg_catalog.pg_relation_is_publishable('%s')\nORDER BY 1;",
              oid,
              oid,
              oid,
              oid
            );
          } else {
            printfPQExpBuffer(
              buf,
              "SELECT pubname\n     , NULL\n     , NULL\nFROM pg_catalog.pg_publication p\nJOIN pg_catalog.pg_publication_rel pr ON p.oid = pr.prpubid\nWHERE pr.prrelid = '%s'\nUNION ALL\nSELECT pubname\n     , NULL\n     , NULL\nFROM pg_catalog.pg_publication p\nWHERE p.puballtables AND pg_catalog.pg_relation_is_publishable('%s')\nORDER BY 1;",
              oid,
              oid
            );
          }
          result = await PSQLexec(buf.data);
          if (!result)
            return retval;
          else
            tuples = PQntuples(result);
          if (tuples > 0)
            printTableAddFooter(cont, _("Publications:"));
          for (i = 0; i < tuples; i++) {
            printfPQExpBuffer(
              buf,
              '    "%s"',
              PQgetvalue(result, i, 0)
            );
            if (!PQgetisnull(result, i, 2))
              appendPQExpBuffer(
                buf,
                " (%s)",
                PQgetvalue(result, i, 2)
              );
            if (!PQgetisnull(result, i, 1))
              appendPQExpBuffer(
                buf,
                " WHERE %s",
                PQgetvalue(result, i, 1)
              );
            printTableAddFooter(cont, buf.data);
          }
        }
        if (verbose) {
          printfPQExpBuffer(
            buf,
            "SELECT co.conname, at.attname, co.connoinherit, co.conislocal,\nco.coninhcount <> 0\nFROM pg_catalog.pg_constraint co JOIN\npg_catalog.pg_attribute at ON\n(at.attnum = co.conkey[1])\nWHERE co.contype = 'n' AND\nco.conrelid = '%s'::pg_catalog.regclass AND\nat.attrelid = '%s'::pg_catalog.regclass\nORDER BY at.attnum",
            oid,
            oid
          );
          result = await PSQLexec(buf.data);
          if (!result)
            return retval;
          else
            tuples = PQntuples(result);
          if (tuples > 0)
            printTableAddFooter(cont, _("Not-null constraints:"));
          for (i = 0; i < tuples; i++) {
            let islocal = PQgetvalue(result, i, 3)[0] == "t";
            let inherited = PQgetvalue(result, i, 4)[0] == "t";
            printfPQExpBuffer(
              buf,
              '    "%s" NOT NULL "%s"%s',
              PQgetvalue(result, i, 0),
              PQgetvalue(result, i, 1),
              PQgetvalue(result, i, 2)[0] == "t" ? " NO INHERIT" : islocal && inherited ? _(" (local, inherited)") : inherited ? _(" (inherited)") : ""
            );
            printTableAddFooter(cont, buf.data);
          }
        }
      }
      if ((tableinfo.relkind == RELKIND_VIEW || tableinfo.relkind == RELKIND_MATVIEW) && verbose) {
        let result;
        printfPQExpBuffer(
          buf,
          "SELECT pg_catalog.pg_get_viewdef('%s'::pg_catalog.oid, true);",
          oid
        );
        result = await PSQLexec(buf.data);
        if (!result)
          return retval;
        if (PQntuples(result) > 0)
          view_def = pg_strdup(PQgetvalue(result, 0, 0));
      }
      if (view_def) {
        let result = NULL;
        printTableAddFooter(cont, _("View definition:"));
        printTableAddFooter(cont, view_def);
        if (tableinfo.hasrules) {
          printfPQExpBuffer(
            buf,
            "SELECT r.rulename, trim(trailing ';' from pg_catalog.pg_get_ruledef(r.oid, true))\nFROM pg_catalog.pg_rewrite r\nWHERE r.ev_class = '%s' AND r.rulename != '_RETURN' ORDER BY 1;",
            oid
          );
          result = await PSQLexec(buf.data);
          if (!result)
            return retval;
          if (PQntuples(result) > 0) {
            printTableAddFooter(cont, _("Rules:"));
            for (i = 0; i < PQntuples(result); i++) {
              let ruledef;
              ruledef = PQgetvalue(result, i, 1);
              ruledef = ruledef.slice(12);
              printfPQExpBuffer(buf, " %s", ruledef);
              printTableAddFooter(cont, buf.data);
            }
          }
        }
      }
      if (tableinfo.hastriggers) {
        let result;
        let tuples;
        printfPQExpBuffer(
          buf,
          "SELECT t.tgname, pg_catalog.pg_get_triggerdef(t.oid, true), t.tgenabled, t.tgisinternal,\n"
        );
        if (pset.sversion >= 13e4)
          appendPQExpBufferStr(
            buf,
            "  CASE WHEN t.tgparentid != 0 THEN\n    (SELECT u.tgrelid::pg_catalog.regclass\n     FROM pg_catalog.pg_trigger AS u,\n          pg_catalog.pg_partition_ancestors(t.tgrelid) WITH ORDINALITY AS a(relid, depth)\n     WHERE u.tgname = t.tgname AND u.tgrelid = a.relid\n           AND u.tgparentid = 0\n     ORDER BY a.depth LIMIT 1)\n  END AS parent\n"
          );
        else
          appendPQExpBufferStr(buf, "  NULL AS parent\n");
        appendPQExpBuffer(
          buf,
          "FROM pg_catalog.pg_trigger t\nWHERE t.tgrelid = '%s' AND ",
          oid
        );
        if (pset.sversion >= 11e4 && pset.sversion < 15e4)
          appendPQExpBufferStr(buf, "(NOT t.tgisinternal OR (t.tgisinternal AND t.tgenabled = 'D') \n    OR EXISTS (SELECT 1 FROM pg_catalog.pg_depend WHERE objid = t.oid \n        AND refclassid = 'pg_catalog.pg_trigger'::pg_catalog.regclass))");
        else
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
          for (category = 0; category <= 4; category++) {
            have_heading = false;
            for (i = 0; i < tuples; i++) {
              let list_trigger;
              let tgdef;
              let usingpos;
              let tgenabled;
              let tgisinternal;
              tgenabled = PQgetvalue(result, i, 2);
              tgisinternal = PQgetvalue(result, i, 3);
              list_trigger = false;
              switch (category) {
                case 0:
                  if (tgenabled == "O" || tgenabled == "t")
                    list_trigger = true;
                  break;
                case 1:
                  if ((tgenabled == "D" || tgenabled == "f") && tgisinternal == "f")
                    list_trigger = true;
                  break;
                case 2:
                  if ((tgenabled == "D" || tgenabled == "f") && tgisinternal == "t")
                    list_trigger = true;
                  break;
                case 3:
                  if (tgenabled == "A")
                    list_trigger = true;
                  break;
                case 4:
                  if (tgenabled == "R")
                    list_trigger = true;
                  break;
              }
              if (list_trigger == false)
                continue;
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
              tgdef = PQgetvalue(result, i, 1);
              usingpos = strstr(tgdef, " TRIGGER ");
              if (usingpos != NULL)
                tgdef = tgdef.slice(usingpos + 9);
              printfPQExpBuffer(buf, "    %s", tgdef);
              if (!PQgetisnull(result, i, 4))
                appendPQExpBuffer(
                  buf,
                  ", ON TABLE %s",
                  PQgetvalue(result, i, 4)
                );
              printTableAddFooter(cont, buf.data);
            }
          }
        }
      }
      if (tableinfo.relkind == RELKIND_RELATION || tableinfo.relkind == RELKIND_MATVIEW || tableinfo.relkind == RELKIND_FOREIGN_TABLE || tableinfo.relkind == RELKIND_PARTITIONED_TABLE || tableinfo.relkind == RELKIND_PARTITIONED_INDEX || tableinfo.relkind == RELKIND_TOASTVALUE) {
        let is_partitioned;
        let result;
        let tuples;
        is_partitioned = tableinfo.relkind == RELKIND_PARTITIONED_TABLE || tableinfo.relkind == RELKIND_PARTITIONED_INDEX;
        if (tableinfo.relkind == RELKIND_FOREIGN_TABLE) {
          let ftoptions;
          printfPQExpBuffer(
            buf,
            "SELECT s.srvname,\n  pg_catalog.array_to_string(ARRAY(\n    SELECT pg_catalog.quote_ident(option_name) || ' ' || pg_catalog.quote_literal(option_value)\n    FROM pg_catalog.pg_options_to_table(ftoptions)),  ', ')\nFROM pg_catalog.pg_foreign_table f,\n     pg_catalog.pg_foreign_server s\nWHERE f.ftrelid = '%s' AND s.oid = f.ftserver;",
            oid
          );
          result = await PSQLexec(buf.data);
          if (!result)
            return retval;
          else if (PQntuples(result) != 1) {
            return retval;
          }
          printfPQExpBuffer(
            buf,
            _("Server: %s"),
            PQgetvalue(result, 0, 0)
          );
          printTableAddFooter(cont, buf.data);
          ftoptions = PQgetvalue(result, 0, 1);
          if (ftoptions && ftoptions[0] != NULL) {
            printfPQExpBuffer(buf, _("FDW options: (%s)"), ftoptions);
            printTableAddFooter(cont, buf.data);
          }
        }
        printfPQExpBuffer(
          buf,
          "SELECT c.oid::pg_catalog.regclass\nFROM pg_catalog.pg_class c, pg_catalog.pg_inherits i\nWHERE c.oid = i.inhparent AND i.inhrelid = '%s'\n  AND c.relkind != 'p' AND c.relkind != 'I'\nORDER BY inhseqno;",
          oid
        );
        result = await PSQLexec(buf.data);
        if (!result)
          return retval;
        else {
          let s = _("Inherits");
          let sw = pg_wcswidth(s, strlen(s), pset.encoding);
          tuples = PQntuples(result);
          for (i = 0; i < tuples; i++) {
            if (i == 0)
              printfPQExpBuffer(
                buf,
                "%s: %s",
                s,
                PQgetvalue(result, i, 0)
              );
            else
              printfPQExpBuffer(
                buf,
                "%*s  %s",
                sw,
                "",
                PQgetvalue(result, i, 0)
              );
            if (i < tuples - 1)
              appendPQExpBufferChar(buf, ",");
            printTableAddFooter(cont, buf.data);
          }
        }
        if (pset.sversion >= 14e4)
          printfPQExpBuffer(
            buf,
            "SELECT c.oid::pg_catalog.regclass, c.relkind, inhdetachpending, pg_catalog.pg_get_expr(c.relpartbound, c.oid)\nFROM pg_catalog.pg_class c, pg_catalog.pg_inherits i\nWHERE c.oid = i.inhrelid AND i.inhparent = '%s'\nORDER BY pg_catalog.pg_get_expr(c.relpartbound, c.oid) = 'DEFAULT', c.oid::pg_catalog.regclass::pg_catalog.text;",
            oid
          );
        else if (pset.sversion >= 1e5)
          printfPQExpBuffer(
            buf,
            "SELECT c.oid::pg_catalog.regclass, c.relkind, false AS inhdetachpending, pg_catalog.pg_get_expr(c.relpartbound, c.oid)\nFROM pg_catalog.pg_class c, pg_catalog.pg_inherits i\nWHERE c.oid = i.inhrelid AND i.inhparent = '%s'\nORDER BY pg_catalog.pg_get_expr(c.relpartbound, c.oid) = 'DEFAULT', c.oid::pg_catalog.regclass::pg_catalog.text;",
            oid
          );
        else
          printfPQExpBuffer(
            buf,
            "SELECT c.oid::pg_catalog.regclass, c.relkind, false AS inhdetachpending, NULL\nFROM pg_catalog.pg_class c, pg_catalog.pg_inherits i\nWHERE c.oid = i.inhrelid AND i.inhparent = '%s'\nORDER BY c.oid::pg_catalog.regclass::pg_catalog.text;",
            oid
          );
        result = await PSQLexec(buf.data);
        if (!result)
          return retval;
        tuples = PQntuples(result);
        if (is_partitioned && tuples == 0) {
          printfPQExpBuffer(buf, _("Number of partitions: %d"), tuples);
          printTableAddFooter(cont, buf.data);
        } else if (!verbose) {
          if (tuples > 0) {
            if (is_partitioned)
              printfPQExpBuffer(buf, _("Number of partitions: %d (Use \\d+ to list them.)"), tuples);
            else
              printfPQExpBuffer(buf, _("Number of child tables: %d (Use \\d+ to list them.)"), tuples);
            printTableAddFooter(cont, buf.data);
          }
        } else {
          let ct = is_partitioned ? _("Partitions") : _("Child tables");
          let ctw = pg_wcswidth(ct, strlen(ct), pset.encoding);
          for (i = 0; i < tuples; i++) {
            let child_relkind = PQgetvalue(result, i, 1);
            if (i == 0)
              printfPQExpBuffer(
                buf,
                "%s: %s",
                ct,
                PQgetvalue(result, i, 0)
              );
            else
              printfPQExpBuffer(
                buf,
                "%*s  %s",
                ctw,
                "",
                PQgetvalue(result, i, 0)
              );
            if (!PQgetisnull(result, i, 3))
              appendPQExpBuffer(buf, " %s", PQgetvalue(result, i, 3));
            if (child_relkind == RELKIND_PARTITIONED_TABLE || child_relkind == RELKIND_PARTITIONED_INDEX)
              appendPQExpBufferStr(buf, ", PARTITIONED");
            else if (child_relkind == RELKIND_FOREIGN_TABLE)
              appendPQExpBufferStr(buf, ", FOREIGN");
            if (strcmp(PQgetvalue(result, i, 2), "t") == 0)
              appendPQExpBufferStr(buf, " (DETACH PENDING)");
            if (i < tuples - 1)
              appendPQExpBufferChar(buf, ",");
            printTableAddFooter(cont, buf.data);
          }
        }
        if (tableinfo.reloftype) {
          printfPQExpBuffer(buf, _("Typed table of type: %s"), tableinfo.reloftype);
          printTableAddFooter(cont, buf.data);
        }
        if (verbose && (tableinfo.relkind == RELKIND_RELATION || tableinfo.relkind == RELKIND_MATVIEW) && /*
         * No need to display default values; we already display a REPLICA
         * IDENTITY marker on indexes.
         */
        tableinfo.relreplident != "i" && (strcmp(schemaname, "pg_catalog") != 0 && tableinfo.relreplident != "d" || strcmp(schemaname, "pg_catalog") == 0 && tableinfo.relreplident != "n")) {
          let s = _("Replica Identity");
          printfPQExpBuffer(
            buf,
            "%s: %s",
            s,
            tableinfo.relreplident == "f" ? "FULL" : tableinfo.relreplident == "n" ? "NOTHING" : "???"
          );
          printTableAddFooter(cont, buf.data);
        }
        if (verbose && tableinfo.relkind != RELKIND_MATVIEW && tableinfo.hasoids)
          printTableAddFooter(cont, _("Has OIDs: yes"));
        await add_tablespace_footer(
          cont,
          tableinfo.relkind,
          tableinfo.tablespace,
          true
        );
        if (verbose && tableinfo.relam != NULL && !pset.hide_tableam) {
          printfPQExpBuffer(buf, _("Access method: %s"), tableinfo.relam);
          printTableAddFooter(cont, buf.data);
        }
      }
      if (verbose && tableinfo.reloptions && tableinfo.reloptions[0] != NULL) {
        let t = _("Options");
        printfPQExpBuffer(buf, "%s: %s", t, tableinfo.reloptions);
        printTableAddFooter(cont, buf.data);
      }
      printTable(cont, pset.queryFout, false, pset.logfile);
      retval = true;
      return retval;
    }
    async function add_tablespace_footer(cont, relkind, tablespace, newline) {
      if (relkind == RELKIND_RELATION || relkind == RELKIND_MATVIEW || relkind == RELKIND_INDEX || relkind == RELKIND_PARTITIONED_TABLE || relkind == RELKIND_PARTITIONED_INDEX || relkind == RELKIND_TOASTVALUE) {
        if (tablespace != 0) {
          let result = NULL;
          let buf = {
            /* struct */
          };
          initPQExpBuffer(buf);
          printfPQExpBuffer(
            buf,
            "SELECT spcname FROM pg_catalog.pg_tablespace\nWHERE oid = '%u';",
            tablespace
          );
          result = await PSQLexec(buf.data);
          if (!result) {
            return;
          }
          if (PQntuples(result) > 0) {
            if (newline) {
              printfPQExpBuffer(
                buf,
                _('Tablespace: "%s"'),
                PQgetvalue(result, 0, 0)
              );
              printTableAddFooter(cont, buf.data);
            } else {
              printfPQExpBuffer(buf, "%s", cont.footer);
              appendPQExpBuffer(
                buf,
                _(', tablespace "%s"'),
                PQgetvalue(result, 0, 0)
              );
              printTableSetFooter(cont, buf.data);
            }
          }
        }
      }
    }
    async function describeRoles(pattern, verbose, showSystem) {
      let buf = {
        /* struct */
      };
      let res;
      let cont = {
        /* struct */
      };
      let myopt = pset.popt.topt;
      let ncols = 2;
      let nrows = 0;
      let i;
      let conns;
      let align = "l";
      let attr;
      myopt.default_footer = false;
      initPQExpBuffer(buf);
      printfPQExpBuffer(
        buf,
        "SELECT r.rolname, r.rolsuper, r.rolinherit,\n  r.rolcreaterole, r.rolcreatedb, r.rolcanlogin,\n  r.rolconnlimit, r.rolvaliduntil"
      );
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
      if (!validateSQLNamePattern(
        buf,
        pattern,
        false,
        false,
        NULL,
        "r.rolname",
        NULL,
        NULL,
        NULL,
        1
      )) {
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
        if (strcmp(PQgetvalue(res, i, verbose ? 9 : 8), "t") == 0)
          add_role_attribute(buf, _("Replication"));
        if (pset.sversion >= 90500) {
          if (strcmp(PQgetvalue(res, i, verbose ? 10 : 9), "t") == 0)
            add_role_attribute(buf, _("Bypass RLS"));
        }
        conns = atoi(PQgetvalue(res, i, 6));
        if (conns >= 0) {
          if (buf.len > 0)
            appendPQExpBufferChar(buf, "\n");
          if (conns == 0)
            appendPQExpBufferStr(buf, _("No connections"));
          else
            appendPQExpBuffer(
              buf,
              ngettext(
                "%d connection",
                "%d connections",
                conns
              ),
              conns
            );
        }
        if (strcmp(PQgetvalue(res, i, 7), "") != 0) {
          if (buf.len > 0)
            appendPQExpBufferChar(buf, "\n");
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
    async function listDbRoleSettings(pattern, pattern2) {
      let buf = {
        /* struct */
      };
      let res;
      let myopt = pset.popt;
      let havewhere = {};
      initPQExpBuffer(buf);
      printfPQExpBuffer(
        buf,
        `SELECT rolname AS "%s", datname AS "%s",
pg_catalog.array_to_string(setconfig, E'\\n') AS "%s"
FROM pg_catalog.pg_db_role_setting s
LEFT JOIN pg_catalog.pg_database d ON d.oid = setdatabase
LEFT JOIN pg_catalog.pg_roles r ON r.oid = setrole
`,
        gettext_noop("Role"),
        gettext_noop("Database"),
        gettext_noop("Settings")
      );
      if (!validateSQLNamePattern(
        buf,
        pattern,
        false,
        false,
        NULL,
        "r.rolname",
        NULL,
        NULL,
        havewhere,
        1
      ))
        return false;
      if (!validateSQLNamePattern(
        buf,
        pattern2,
        havewhere.value,
        false,
        NULL,
        "d.datname",
        NULL,
        NULL,
        NULL,
        1
      ))
        return false;
      appendPQExpBufferStr(buf, "ORDER BY 1, 2;");
      res = await PSQLexec(buf.data);
      if (!res)
        return false;
      if (PQntuples(res) == 0 && !pset.quiet) {
        if (pattern && pattern2)
          pg_log_error(
            'Did not find any settings for role "%s" and database "%s".',
            pattern,
            pattern2
          );
        else if (pattern)
          pg_log_error(
            'Did not find any settings for role "%s".',
            pattern
          );
        else
          pg_log_error("Did not find any settings.");
      } else {
        myopt.nullPrint = NULL;
        myopt.title = _("List of settings");
        myopt.translate_header = true;
        printQuery(res, myopt, pset.queryFout, false, pset.logfile);
      }
      return true;
    }
    async function describeRoleGrants(pattern, showSystem) {
      let buf = {
        /* struct */
      };
      let res;
      let myopt = pset.popt;
      initPQExpBuffer(buf);
      printfPQExpBuffer(
        buf,
        `SELECT m.rolname AS "%s", r.rolname AS "%s",
  pg_catalog.concat_ws(', ',
`,
        gettext_noop("Role name"),
        gettext_noop("Member of")
      );
      if (pset.sversion >= 16e4)
        appendPQExpBufferStr(
          buf,
          "    CASE WHEN pam.admin_option THEN 'ADMIN' END,\n    CASE WHEN pam.inherit_option THEN 'INHERIT' END,\n    CASE WHEN pam.set_option THEN 'SET' END\n"
        );
      else
        appendPQExpBufferStr(
          buf,
          "    CASE WHEN pam.admin_option THEN 'ADMIN' END,\n    CASE WHEN m.rolinherit THEN 'INHERIT' END,\n    'SET'\n"
        );
      appendPQExpBuffer(
        buf,
        '  ) AS "%s",\n  g.rolname AS "%s"\n',
        gettext_noop("Options"),
        gettext_noop("Grantor")
      );
      appendPQExpBufferStr(
        buf,
        "FROM pg_catalog.pg_roles m\n     JOIN pg_catalog.pg_auth_members pam ON (pam.member = m.oid)\n     LEFT JOIN pg_catalog.pg_roles r ON (pam.roleid = r.oid)\n     LEFT JOIN pg_catalog.pg_roles g ON (pam.grantor = g.oid)\n"
      );
      if (!showSystem && !pattern)
        appendPQExpBufferStr(buf, "WHERE m.rolname !~ '^pg_'\n");
      if (!validateSQLNamePattern(
        buf,
        pattern,
        false,
        false,
        NULL,
        "m.rolname",
        NULL,
        NULL,
        NULL,
        1
      )) {
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
    async function listTables(tabtypes, pattern, verbose, showSystem) {
      let showTables = strchr(tabtypes, "t") != NULL;
      let showIndexes = strchr(tabtypes, "i") != NULL;
      let showViews = strchr(tabtypes, "v") != NULL;
      let showMatViews = strchr(tabtypes, "m") != NULL;
      let showSeq = strchr(tabtypes, "s") != NULL;
      let showForeign = strchr(tabtypes, "E") != NULL;
      let buf = {
        /* struct */
      };
      let res;
      let myopt = pset.popt;
      let cols_so_far;
      let translate_columns = [false, false, true, false, false, false, false, false, false];
      if (!(showTables || showIndexes || showViews || showMatViews || showSeq || showForeign))
        showTables = showViews = showMatViews = showSeq = showForeign = true;
      initPQExpBuffer(buf);
      printfPQExpBuffer(
        buf,
        `SELECT n.nspname as "%s",
  c.relname as "%s",
  CASE c.relkind WHEN 'r' THEN '%s' WHEN 'v' THEN '%s' WHEN 'm' THEN '%s' WHEN 'i' THEN '%s' WHEN 'S' THEN '%s' WHEN 't' THEN '%s' WHEN 'f' THEN '%s' WHEN 'p' THEN '%s' WHEN 'I' THEN '%s' END as "%s",
  pg_catalog.pg_get_userbyid(c.relowner) as "%s"`,
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
        gettext_noop("Owner")
      );
      cols_so_far = 4;
      if (showIndexes) {
        appendPQExpBuffer(
          buf,
          ',\n  c2.relname as "%s"',
          gettext_noop("Table")
        );
        cols_so_far++;
      }
      if (verbose) {
        appendPQExpBuffer(
          buf,
          `,
  CASE c.relpersistence WHEN 'p' THEN '%s' WHEN 't' THEN '%s' WHEN 'u' THEN '%s' END as "%s"`,
          gettext_noop("permanent"),
          gettext_noop("temporary"),
          gettext_noop("unlogged"),
          gettext_noop("Persistence")
        );
        translate_columns[cols_so_far] = true;
        if (pset.sversion >= 12e4 && !pset.hide_tableam && (showTables || showMatViews || showIndexes))
          appendPQExpBuffer(
            buf,
            ',\n  am.amname as "%s"',
            gettext_noop("Access method")
          );
        appendPQExpBuffer(
          buf,
          `,
  pg_catalog.pg_size_pretty(pg_catalog.pg_table_size(c.oid)) as "%s",
  pg_catalog.obj_description(c.oid, 'pg_class') as "%s"`,
          gettext_noop("Size"),
          gettext_noop("Description")
        );
      }
      appendPQExpBufferStr(
        buf,
        "\nFROM pg_catalog.pg_class c\n     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace"
      );
      if (pset.sversion >= 12e4 && !pset.hide_tableam && (showTables || showMatViews || showIndexes))
        appendPQExpBufferStr(
          buf,
          "\n     LEFT JOIN pg_catalog.pg_am am ON am.oid = c.relam"
        );
      if (showIndexes)
        appendPQExpBufferStr(
          buf,
          "\n     LEFT JOIN pg_catalog.pg_index i ON i.indexrelid = c.oid\n     LEFT JOIN pg_catalog.pg_class c2 ON i.indrelid = c2.oid"
        );
      appendPQExpBufferStr(buf, "\nWHERE c.relkind IN (");
      if (showTables) {
        appendPQExpBufferStr(
          buf,
          "'r','p',"
        );
        if (showSystem || pattern)
          appendPQExpBufferStr(
            buf,
            "'t',"
          );
      }
      if (showViews)
        appendPQExpBufferStr(
          buf,
          "'v',"
        );
      if (showMatViews)
        appendPQExpBufferStr(
          buf,
          "'m',"
        );
      if (showIndexes)
        appendPQExpBufferStr(
          buf,
          "'i','I',"
        );
      if (showSeq)
        appendPQExpBufferStr(
          buf,
          "'S',"
        );
      if (showSystem || pattern)
        appendPQExpBufferStr(buf, "'s',");
      if (showForeign)
        appendPQExpBufferStr(
          buf,
          "'f',"
        );
      appendPQExpBufferStr(buf, "''");
      appendPQExpBufferStr(buf, ")\n");
      if (!showSystem && !pattern)
        appendPQExpBufferStr(buf, "      AND n.nspname <> 'pg_catalog'\n      AND n.nspname !~ '^pg_toast'\n      AND n.nspname <> 'information_schema'\n");
      if (!validateSQLNamePattern(
        buf,
        pattern,
        true,
        false,
        "n.nspname",
        "c.relname",
        NULL,
        "pg_catalog.pg_table_is_visible(c.oid)",
        NULL,
        3
      )) {
        return false;
      }
      appendPQExpBufferStr(buf, "ORDER BY 1,2;");
      res = await PSQLexec(buf.data);
      if (!res)
        return false;
      if (PQntuples(res) == 0 && !pset.quiet) {
        if (pattern)
          pg_log_error(
            'Did not find any relation named "%s".',
            pattern
          );
        else
          pg_log_error("Did not find any relations.");
      } else {
        myopt.nullPrint = NULL;
        myopt.title = _("List of relations");
        myopt.translate_header = true;
        myopt.translate_columns = translate_columns;
        myopt.n_translate_columns = lengthof(translate_columns);
        printQuery(res, myopt, pset.queryFout, false, pset.logfile);
      }
      return true;
    }
    async function listPartitionedTables(reltypes, pattern, verbose) {
      let showTables = strchr(reltypes, "t") != NULL;
      let showIndexes = strchr(reltypes, "i") != NULL;
      let showNested = strchr(reltypes, "n") != NULL;
      let buf = {
        /* struct */
      };
      let title = {
        /* struct */
      };
      let res;
      let myopt = pset.popt;
      let translate_columns = [false, false, false, false, false, false, false, false, false];
      let tabletitle;
      let mixed_output = false;
      if (pset.sversion < 1e5) {
        let sverbuf;
        pg_log_error(
          "The server (version %s) does not support declarative table partitioning.",
          formatPGVersionNumber(
            pset.sversion,
            false,
            sverbuf,
            sizeof(sverbuf)
          )
        );
        return true;
      }
      if (!showTables && !showIndexes)
        showTables = showIndexes = true;
      if (showIndexes && !showTables)
        tabletitle = _("List of partitioned indexes");
      else if (showTables && !showIndexes)
        tabletitle = _("List of partitioned tables");
      else {
        tabletitle = _("List of partitioned relations");
        mixed_output = true;
      }
      initPQExpBuffer(buf);
      printfPQExpBuffer(
        buf,
        'SELECT n.nspname as "%s",\n  c.relname as "%s",\n  pg_catalog.pg_get_userbyid(c.relowner) as "%s"',
        gettext_noop("Schema"),
        gettext_noop("Name"),
        gettext_noop("Owner")
      );
      if (mixed_output) {
        appendPQExpBuffer(
          buf,
          `,
  CASE c.relkind WHEN 'p' THEN '%s' WHEN 'I' THEN '%s' END as "%s"`,
          gettext_noop("partitioned table"),
          gettext_noop("partitioned index"),
          gettext_noop("Type")
        );
        translate_columns[3] = true;
      }
      if (showNested || pattern)
        appendPQExpBuffer(
          buf,
          ',\n  inh.inhparent::pg_catalog.regclass as "%s"',
          gettext_noop("Parent name")
        );
      if (showIndexes)
        appendPQExpBuffer(
          buf,
          ',\n c2.oid::pg_catalog.regclass as "%s"',
          gettext_noop("Table")
        );
      if (verbose) {
        if (showNested) {
          appendPQExpBuffer(
            buf,
            ',\n  s.dps as "%s"',
            gettext_noop("Leaf partition size")
          );
          appendPQExpBuffer(
            buf,
            ',\n  s.tps as "%s"',
            gettext_noop("Total size")
          );
        } else
          appendPQExpBuffer(
            buf,
            ',\n  s.tps as "%s"',
            gettext_noop("Total size")
          );
        appendPQExpBuffer(
          buf,
          `,
  pg_catalog.obj_description(c.oid, 'pg_class') as "%s"`,
          gettext_noop("Description")
        );
      }
      appendPQExpBufferStr(
        buf,
        "\nFROM pg_catalog.pg_class c\n     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace"
      );
      if (showIndexes)
        appendPQExpBufferStr(
          buf,
          "\n     LEFT JOIN pg_catalog.pg_index i ON i.indexrelid = c.oid\n     LEFT JOIN pg_catalog.pg_class c2 ON i.indrelid = c2.oid"
        );
      if (showNested || pattern)
        appendPQExpBufferStr(
          buf,
          "\n     LEFT JOIN pg_catalog.pg_inherits inh ON c.oid = inh.inhrelid"
        );
      if (verbose) {
        if (pset.sversion < 12e4) {
          appendPQExpBufferStr(
            buf,
            ",\n     LATERAL (WITH RECURSIVE d\n                AS (SELECT inhrelid AS oid, 1 AS level\n                      FROM pg_catalog.pg_inherits\n                     WHERE inhparent = c.oid\n                    UNION ALL\n                    SELECT inhrelid, level + 1\n                      FROM pg_catalog.pg_inherits i\n                           JOIN d ON i.inhparent = d.oid)\n                SELECT pg_catalog.pg_size_pretty(sum(pg_catalog.pg_table_size(d.oid))) AS tps,\n                       pg_catalog.pg_size_pretty(sum(\n             CASE WHEN d.level = 1 THEN pg_catalog.pg_table_size(d.oid) ELSE 0 END)) AS dps\n               FROM d) s"
          );
        } else {
          appendPQExpBufferStr(
            buf,
            ",\n     LATERAL (SELECT pg_catalog.pg_size_pretty(sum(\n                 CASE WHEN ppt.isleaf AND ppt.level = 1\n                      THEN pg_catalog.pg_table_size(ppt.relid) ELSE 0 END)) AS dps,\n                     pg_catalog.pg_size_pretty(sum(pg_catalog.pg_table_size(ppt.relid))) AS tps\n              FROM pg_catalog.pg_partition_tree(c.oid) ppt) s"
          );
        }
      }
      appendPQExpBufferStr(buf, "\nWHERE c.relkind IN (");
      if (showTables)
        appendPQExpBufferStr(
          buf,
          "'p',"
        );
      if (showIndexes)
        appendPQExpBufferStr(
          buf,
          "'I',"
        );
      appendPQExpBufferStr(buf, "''");
      appendPQExpBufferStr(buf, ")\n");
      appendPQExpBufferStr(buf, !showNested && !pattern ? " AND NOT c.relispartition\n" : "");
      if (!pattern)
        appendPQExpBufferStr(buf, "      AND n.nspname <> 'pg_catalog'\n      AND n.nspname !~ '^pg_toast'\n      AND n.nspname <> 'information_schema'\n");
      if (!validateSQLNamePattern(
        buf,
        pattern,
        true,
        false,
        "n.nspname",
        "c.relname",
        NULL,
        "pg_catalog.pg_table_is_visible(c.oid)",
        NULL,
        3
      )) {
        return false;
      }
      appendPQExpBuffer(
        buf,
        'ORDER BY "Schema", %s%s"Name";',
        mixed_output ? '"Type" DESC, ' : "",
        showNested || pattern ? '"Parent name" NULLS FIRST, ' : ""
      );
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
    async function listLanguages(pattern, verbose, showSystem) {
      let buf = {
        /* struct */
      };
      let res;
      let myopt = pset.popt;
      initPQExpBuffer(buf);
      printfPQExpBuffer(
        buf,
        'SELECT l.lanname AS "%s",\n       pg_catalog.pg_get_userbyid(l.lanowner) as "%s",\n       l.lanpltrusted AS "%s"',
        gettext_noop("Name"),
        gettext_noop("Owner"),
        gettext_noop("Trusted")
      );
      if (verbose) {
        appendPQExpBuffer(
          buf,
          ',\n       NOT l.lanispl AS "%s",\n       l.lanplcallfoid::pg_catalog.regprocedure AS "%s",\n       l.lanvalidator::pg_catalog.regprocedure AS "%s",\n       l.laninline::pg_catalog.regprocedure AS "%s",\n       ',
          gettext_noop("Internal language"),
          gettext_noop("Call handler"),
          gettext_noop("Validator"),
          gettext_noop("Inline handler")
        );
        printACLColumn(buf, "l.lanacl");
      }
      appendPQExpBuffer(
        buf,
        ',\n       d.description AS "%s"\nFROM pg_catalog.pg_language l\nLEFT JOIN pg_catalog.pg_description d\n  ON d.classoid = l.tableoid AND d.objoid = l.oid\n  AND d.objsubid = 0\n',
        gettext_noop("Description")
      );
      if (pattern) {
        if (!validateSQLNamePattern(
          buf,
          pattern,
          false,
          false,
          NULL,
          "l.lanname",
          NULL,
          NULL,
          NULL,
          2
        )) {
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
    async function listDomains(pattern, verbose, showSystem) {
      let buf = {
        /* struct */
      };
      let res;
      let myopt = pset.popt;
      initPQExpBuffer(buf);
      printfPQExpBuffer(
        buf,
        `SELECT n.nspname as "%s",
       t.typname as "%s",
       pg_catalog.format_type(t.typbasetype, t.typtypmod) as "%s",
       (SELECT c.collname FROM pg_catalog.pg_collation c, pg_catalog.pg_type bt
        WHERE c.oid = t.typcollation AND bt.oid = t.typbasetype AND t.typcollation <> bt.typcollation) as "%s",
       CASE WHEN t.typnotnull THEN 'not null' END as "%s",
       t.typdefault as "%s",
       pg_catalog.array_to_string(ARRAY(
         SELECT pg_catalog.pg_get_constraintdef(r.oid, true) FROM pg_catalog.pg_constraint r WHERE t.oid = r.contypid
       ), ' ') as "%s"`,
        gettext_noop("Schema"),
        gettext_noop("Name"),
        gettext_noop("Type"),
        gettext_noop("Collation"),
        gettext_noop("Nullable"),
        gettext_noop("Default"),
        gettext_noop("Check")
      );
      if (verbose) {
        appendPQExpBufferStr(buf, ",\n  ");
        printACLColumn(buf, "t.typacl");
        appendPQExpBuffer(
          buf,
          ',\n       d.description as "%s"',
          gettext_noop("Description")
        );
      }
      appendPQExpBufferStr(
        buf,
        "\nFROM pg_catalog.pg_type t\n     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = t.typnamespace\n"
      );
      if (verbose)
        appendPQExpBufferStr(
          buf,
          "     LEFT JOIN pg_catalog.pg_description d ON d.classoid = t.tableoid AND d.objoid = t.oid AND d.objsubid = 0\n"
        );
      appendPQExpBufferStr(buf, "WHERE t.typtype = 'd'\n");
      if (!showSystem && !pattern)
        appendPQExpBufferStr(buf, "      AND n.nspname <> 'pg_catalog'\n      AND n.nspname <> 'information_schema'\n");
      if (!validateSQLNamePattern(
        buf,
        pattern,
        true,
        false,
        "n.nspname",
        "t.typname",
        NULL,
        "pg_catalog.pg_type_is_visible(t.oid)",
        NULL,
        3
      )) {
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
    async function listConversions(pattern, verbose, showSystem) {
      let buf = {
        /* struct */
      };
      let res;
      let myopt = pset.popt;
      let translate_columns = [false, false, false, false, true, false];
      initPQExpBuffer(buf);
      printfPQExpBuffer(
        buf,
        `SELECT n.nspname AS "%s",
       c.conname AS "%s",
       pg_catalog.pg_encoding_to_char(c.conforencoding) AS "%s",
       pg_catalog.pg_encoding_to_char(c.contoencoding) AS "%s",
       CASE WHEN c.condefault THEN '%s'
       ELSE '%s' END AS "%s"`,
        gettext_noop("Schema"),
        gettext_noop("Name"),
        gettext_noop("Source"),
        gettext_noop("Destination"),
        gettext_noop("yes"),
        gettext_noop("no"),
        gettext_noop("Default?")
      );
      if (verbose)
        appendPQExpBuffer(
          buf,
          ',\n       d.description AS "%s"',
          gettext_noop("Description")
        );
      appendPQExpBufferStr(
        buf,
        "\nFROM pg_catalog.pg_conversion c\n     JOIN pg_catalog.pg_namespace n ON n.oid = c.connamespace\n"
      );
      if (verbose)
        appendPQExpBufferStr(
          buf,
          "LEFT JOIN pg_catalog.pg_description d ON d.classoid = c.tableoid\n          AND d.objoid = c.oid AND d.objsubid = 0\n"
        );
      appendPQExpBufferStr(buf, "WHERE true\n");
      if (!showSystem && !pattern)
        appendPQExpBufferStr(buf, "  AND n.nspname <> 'pg_catalog'\n  AND n.nspname <> 'information_schema'\n");
      if (!validateSQLNamePattern(
        buf,
        pattern,
        true,
        false,
        "n.nspname",
        "c.conname",
        NULL,
        "pg_catalog.pg_conversion_is_visible(c.oid)",
        NULL,
        3
      )) {
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
    async function describeConfigurationParameters(pattern, verbose, showSystem) {
      let buf = {
        /* struct */
      };
      let res;
      let myopt = pset.popt;
      initPQExpBuffer(buf);
      printfPQExpBuffer(
        buf,
        'SELECT s.name AS "%s", pg_catalog.current_setting(s.name) AS "%s"',
        gettext_noop("Parameter"),
        gettext_noop("Value")
      );
      if (verbose) {
        appendPQExpBuffer(
          buf,
          ', s.vartype AS "%s", s.context AS "%s", ',
          gettext_noop("Type"),
          gettext_noop("Context")
        );
        if (pset.sversion >= 15e4)
          printACLColumn(buf, "p.paracl");
        else
          appendPQExpBuffer(
            buf,
            'NULL AS "%s"',
            gettext_noop("Access privileges")
          );
      }
      appendPQExpBufferStr(buf, "\nFROM pg_catalog.pg_settings s\n");
      if (verbose && pset.sversion >= 15e4)
        appendPQExpBufferStr(
          buf,
          "  LEFT JOIN pg_catalog.pg_parameter_acl p\n  ON pg_catalog.lower(s.name) = p.parname\n"
        );
      if (pattern)
        processSQLNamePattern(
          pset.db,
          buf,
          pattern,
          false,
          false,
          NULL,
          "pg_catalog.lower(s.name)",
          NULL,
          NULL,
          NULL,
          NULL
        );
      else
        appendPQExpBufferStr(buf, "WHERE s.source <> 'default' AND\n      s.setting IS DISTINCT FROM s.boot_val\n");
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
    async function listEventTriggers(pattern, verbose) {
      let buf = {
        /* struct */
      };
      let res;
      let myopt = pset.popt;
      let translate_columns = [false, false, false, true, false, false, false];
      if (pset.sversion < 90300) {
        let sverbuf;
        pg_log_error(
          "The server (version %s) does not support event triggers.",
          formatPGVersionNumber(
            pset.sversion,
            false,
            sverbuf,
            sizeof(sverbuf)
          )
        );
        return true;
      }
      initPQExpBuffer(buf);
      printfPQExpBuffer(
        buf,
        `SELECT evtname as "%s", evtevent as "%s", pg_catalog.pg_get_userbyid(e.evtowner) as "%s",
 case evtenabled when 'O' then '%s'  when 'R' then '%s'  when 'A' then '%s'  when 'D' then '%s' end as "%s",
 e.evtfoid::pg_catalog.regproc as "%s", pg_catalog.array_to_string(array(select x from pg_catalog.unnest(evttags) as t(x)), ', ') as "%s"`,
        gettext_noop("Name"),
        gettext_noop("Event"),
        gettext_noop("Owner"),
        gettext_noop("enabled"),
        gettext_noop("replica"),
        gettext_noop("always"),
        gettext_noop("disabled"),
        gettext_noop("Enabled"),
        gettext_noop("Function"),
        gettext_noop("Tags")
      );
      if (verbose)
        appendPQExpBuffer(
          buf,
          `,
pg_catalog.obj_description(e.oid, 'pg_event_trigger') as "%s"`,
          gettext_noop("Description")
        );
      appendPQExpBufferStr(
        buf,
        "\nFROM pg_catalog.pg_event_trigger e "
      );
      if (!validateSQLNamePattern(
        buf,
        pattern,
        false,
        false,
        NULL,
        "evtname",
        NULL,
        NULL,
        NULL,
        1
      )) {
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
    async function listExtendedStats(pattern) {
      let buf = {
        /* struct */
      };
      let res;
      let myopt = pset.popt;
      if (pset.sversion < 1e5) {
        let sverbuf;
        pg_log_error(
          "The server (version %s) does not support extended statistics.",
          formatPGVersionNumber(
            pset.sversion,
            false,
            sverbuf,
            sizeof(sverbuf)
          )
        );
        return true;
      }
      initPQExpBuffer(buf);
      printfPQExpBuffer(
        buf,
        'SELECT \nes.stxnamespace::pg_catalog.regnamespace::pg_catalog.text AS "%s", \nes.stxname AS "%s", \n',
        gettext_noop("Schema"),
        gettext_noop("Name")
      );
      if (pset.sversion >= 14e4)
        appendPQExpBuffer(
          buf,
          `pg_catalog.format('%%s FROM %%s', 
  pg_catalog.pg_get_statisticsobjdef_columns(es.oid), 
  es.stxrelid::pg_catalog.regclass) AS "%s"`,
          gettext_noop("Definition")
        );
      else
        appendPQExpBuffer(
          buf,
          `pg_catalog.format('%%s FROM %%s', 
  (SELECT pg_catalog.string_agg(pg_catalog.quote_ident(a.attname),', ') 
   FROM pg_catalog.unnest(es.stxkeys) s(attnum) 
   JOIN pg_catalog.pg_attribute a 
   ON (es.stxrelid = a.attrelid 
   AND a.attnum = s.attnum 
   AND NOT a.attisdropped)), 
es.stxrelid::pg_catalog.regclass) AS "%s"`,
          gettext_noop("Definition")
        );
      appendPQExpBuffer(
        buf,
        `,
CASE WHEN 'd' = any(es.stxkind) THEN 'defined' 
END AS "%s", 
CASE WHEN 'f' = any(es.stxkind) THEN 'defined' 
END AS "%s"`,
        gettext_noop("Ndistinct"),
        gettext_noop("Dependencies")
      );
      if (pset.sversion >= 12e4) {
        appendPQExpBuffer(
          buf,
          `,
CASE WHEN 'm' = any(es.stxkind) THEN 'defined' 
END AS "%s" `,
          gettext_noop("MCV")
        );
      }
      appendPQExpBufferStr(
        buf,
        " \nFROM pg_catalog.pg_statistic_ext es \n"
      );
      if (!validateSQLNamePattern(
        buf,
        pattern,
        false,
        false,
        "es.stxnamespace::pg_catalog.regnamespace::pg_catalog.text",
        "es.stxname",
        NULL,
        "pg_catalog.pg_statistics_obj_is_visible(es.oid)",
        NULL,
        3
      )) {
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
    async function listCasts(pattern, verbose) {
      let buf = {
        /* struct */
      };
      let res;
      let myopt = pset.popt;
      let translate_columns = [false, false, false, true, false];
      initPQExpBuffer(buf);
      printfPQExpBuffer(
        buf,
        'SELECT pg_catalog.format_type(castsource, NULL) AS "%s",\n       pg_catalog.format_type(casttarget, NULL) AS "%s",\n',
        gettext_noop("Source type"),
        gettext_noop("Target type")
      );
      appendPQExpBuffer(
        buf,
        `       CASE WHEN c.castmethod = '%c' THEN '(binary coercible)'
            WHEN c.castmethod = '%c' THEN '(with inout)'
            ELSE p.proname
       END AS "%s",
`,
        COERCION_METHOD_BINARY,
        COERCION_METHOD_INOUT,
        gettext_noop("Function")
      );
      appendPQExpBuffer(
        buf,
        `       CASE WHEN c.castcontext = '%c' THEN '%s'
            WHEN c.castcontext = '%c' THEN '%s'
            ELSE '%s'
       END AS "%s"`,
        COERCION_CODE_EXPLICIT,
        gettext_noop("no"),
        COERCION_CODE_ASSIGNMENT,
        gettext_noop("in assignment"),
        gettext_noop("yes"),
        gettext_noop("Implicit?")
      );
      if (verbose)
        appendPQExpBuffer(
          buf,
          ',\n       d.description AS "%s"',
          gettext_noop("Description")
        );
      appendPQExpBufferStr(
        buf,
        "\nFROM pg_catalog.pg_cast c LEFT JOIN pg_catalog.pg_proc p\n     ON c.castfunc = p.oid\n     LEFT JOIN pg_catalog.pg_type ts\n     ON c.castsource = ts.oid\n     LEFT JOIN pg_catalog.pg_namespace ns\n     ON ns.oid = ts.typnamespace\n     LEFT JOIN pg_catalog.pg_type tt\n     ON c.casttarget = tt.oid\n     LEFT JOIN pg_catalog.pg_namespace nt\n     ON nt.oid = tt.typnamespace\n"
      );
      if (verbose)
        appendPQExpBufferStr(
          buf,
          "     LEFT JOIN pg_catalog.pg_description d\n     ON d.classoid = c.tableoid AND d.objoid = c.oid AND d.objsubid = 0\n"
        );
      appendPQExpBufferStr(buf, "WHERE ( (true");
      if (!validateSQLNamePattern(
        buf,
        pattern,
        true,
        false,
        "ns.nspname",
        "ts.typname",
        "pg_catalog.format_type(ts.oid, NULL)",
        "pg_catalog.pg_type_is_visible(ts.oid)",
        NULL,
        3
      ))
        return false;
      appendPQExpBufferStr(buf, ") OR (true");
      if (!validateSQLNamePattern(
        buf,
        pattern,
        true,
        false,
        "nt.nspname",
        "tt.typname",
        "pg_catalog.format_type(tt.oid, NULL)",
        "pg_catalog.pg_type_is_visible(tt.oid)",
        NULL,
        3
      ))
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
    async function listCollations(pattern, verbose, showSystem) {
      let buf = {
        /* struct */
      };
      let res;
      let myopt = pset.popt;
      let translate_columns = [false, false, false, false, false, false, false, true, false];
      initPQExpBuffer(buf);
      printfPQExpBuffer(
        buf,
        'SELECT\n  n.nspname AS "%s",\n  c.collname AS "%s",\n',
        gettext_noop("Schema"),
        gettext_noop("Name")
      );
      if (pset.sversion >= 1e5)
        appendPQExpBuffer(
          buf,
          `  CASE c.collprovider WHEN 'd' THEN 'default' WHEN 'c' THEN 'libc' WHEN 'i' THEN 'icu' END AS "%s",
`,
          gettext_noop("Provider")
        );
      else
        appendPQExpBuffer(
          buf,
          `  'libc' AS "%s",
`,
          gettext_noop("Provider")
        );
      appendPQExpBuffer(
        buf,
        '  c.collcollate AS "%s",\n  c.collctype AS "%s",\n',
        gettext_noop("Collate"),
        gettext_noop("Ctype")
      );
      if (pset.sversion >= 15e4)
        appendPQExpBuffer(
          buf,
          '  c.colliculocale AS "%s",\n',
          gettext_noop("ICU Locale")
        );
      else
        appendPQExpBuffer(
          buf,
          '  c.collcollate AS "%s",\n',
          gettext_noop("ICU Locale")
        );
      if (pset.sversion >= 16e4)
        appendPQExpBuffer(
          buf,
          '  c.collicurules AS "%s",\n',
          gettext_noop("ICU Rules")
        );
      else
        appendPQExpBuffer(
          buf,
          '  NULL AS "%s",\n',
          gettext_noop("ICU Rules")
        );
      if (pset.sversion >= 12e4)
        appendPQExpBuffer(
          buf,
          `  CASE WHEN c.collisdeterministic THEN '%s' ELSE '%s' END AS "%s"`,
          gettext_noop("yes"),
          gettext_noop("no"),
          gettext_noop("Deterministic?")
        );
      else
        appendPQExpBuffer(
          buf,
          `  '%s' AS "%s"`,
          gettext_noop("yes"),
          gettext_noop("Deterministic?")
        );
      if (verbose)
        appendPQExpBuffer(
          buf,
          `,
  pg_catalog.obj_description(c.oid, 'pg_collation') AS "%s"`,
          gettext_noop("Description")
        );
      appendPQExpBufferStr(
        buf,
        "\nFROM pg_catalog.pg_collation c, pg_catalog.pg_namespace n\nWHERE n.oid = c.collnamespace\n"
      );
      if (!showSystem && !pattern)
        appendPQExpBufferStr(buf, "      AND n.nspname <> 'pg_catalog'\n      AND n.nspname <> 'information_schema'\n");
      appendPQExpBufferStr(buf, "      AND c.collencoding IN (-1, pg_catalog.pg_char_to_encoding(pg_catalog.getdatabaseencoding()))\n");
      if (!validateSQLNamePattern(
        buf,
        pattern,
        true,
        false,
        "n.nspname",
        "c.collname",
        NULL,
        "pg_catalog.pg_collation_is_visible(c.oid)",
        NULL,
        3
      )) {
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
    async function listSchemas(pattern, verbose, showSystem) {
      let buf = {
        /* struct */
      };
      let res;
      let myopt = pset.popt;
      let pub_schema_tuples = 0;
      let footers = NULL;
      initPQExpBuffer(buf);
      printfPQExpBuffer(
        buf,
        'SELECT n.nspname AS "%s",\n  pg_catalog.pg_get_userbyid(n.nspowner) AS "%s"',
        gettext_noop("Name"),
        gettext_noop("Owner")
      );
      if (verbose) {
        appendPQExpBufferStr(buf, ",\n  ");
        printACLColumn(buf, "n.nspacl");
        appendPQExpBuffer(
          buf,
          `,
  pg_catalog.obj_description(n.oid, 'pg_namespace') AS "%s"`,
          gettext_noop("Description")
        );
      }
      appendPQExpBufferStr(
        buf,
        "\nFROM pg_catalog.pg_namespace n\n"
      );
      if (!showSystem && !pattern)
        appendPQExpBufferStr(
          buf,
          "WHERE n.nspname !~ '^pg_' AND n.nspname <> 'information_schema'\n"
        );
      if (!validateSQLNamePattern(
        buf,
        pattern,
        !showSystem && !pattern,
        false,
        NULL,
        "n.nspname",
        NULL,
        NULL,
        NULL,
        2
      ))
        return false;
      appendPQExpBufferStr(buf, "ORDER BY 1;");
      res = await PSQLexec(buf.data);
      if (!res)
        return false;
      myopt.nullPrint = NULL;
      myopt.title = _("List of schemas");
      myopt.translate_header = true;
      if (pattern && pset.sversion >= 15e4) {
        let result;
        let i;
        printfPQExpBuffer(
          buf,
          "SELECT pubname \nFROM pg_catalog.pg_publication p\n     JOIN pg_catalog.pg_publication_namespace pn ON p.oid = pn.pnpubid\n     JOIN pg_catalog.pg_namespace n ON n.oid = pn.pnnspid \nWHERE n.nspname = '%s'\nORDER BY 1",
          pattern
        );
        result = await PSQLexec(buf.data);
        if (!result)
          return false;
        else
          pub_schema_tuples = PQntuples(result);
        if (pub_schema_tuples > 0) {
          footers = [];
          footers[0] = pg_strdup(_("Publications:"));
          for (i = 0; i < pub_schema_tuples; i++) {
            printfPQExpBuffer(
              buf,
              '    "%s"',
              PQgetvalue(result, i, 0)
            );
            footers[i + 1] = pg_strdup(buf.data);
          }
          footers[i + 1] = NULL;
          myopt.footers = footers;
        }
      }
      printQuery(res, myopt, pset.queryFout, false, pset.logfile);
      return true;
    }
    async function listTSParsers(pattern, verbose) {
      let buf = {
        /* struct */
      };
      let res;
      let myopt = pset.popt;
      if (verbose)
        return await listTSParsersVerbose(pattern);
      initPQExpBuffer(buf);
      printfPQExpBuffer(
        buf,
        `SELECT
  n.nspname as "%s",
  p.prsname as "%s",
  pg_catalog.obj_description(p.oid, 'pg_ts_parser') as "%s"
FROM pg_catalog.pg_ts_parser p
LEFT JOIN pg_catalog.pg_namespace n ON n.oid = p.prsnamespace
`,
        gettext_noop("Schema"),
        gettext_noop("Name"),
        gettext_noop("Description")
      );
      if (!validateSQLNamePattern(
        buf,
        pattern,
        false,
        false,
        "n.nspname",
        "p.prsname",
        NULL,
        "pg_catalog.pg_ts_parser_is_visible(p.oid)",
        NULL,
        3
      )) {
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
    async function listTSParsersVerbose(pattern) {
      let buf = {
        /* struct */
      };
      let res;
      let i;
      initPQExpBuffer(buf);
      printfPQExpBuffer(
        buf,
        "SELECT p.oid,\n  n.nspname,\n  p.prsname\nFROM pg_catalog.pg_ts_parser p\nLEFT JOIN pg_catalog.pg_namespace n ON n.oid = p.prsnamespace\n"
      );
      if (!validateSQLNamePattern(
        buf,
        pattern,
        false,
        false,
        "n.nspname",
        "p.prsname",
        NULL,
        "pg_catalog.pg_ts_parser_is_visible(p.oid)",
        NULL,
        3
      )) {
        return false;
      }
      appendPQExpBufferStr(buf, "ORDER BY 1, 2;");
      res = await PSQLexec(buf.data);
      if (!res)
        return false;
      if (PQntuples(res) == 0) {
        if (!pset.quiet) {
          if (pattern)
            pg_log_error(
              'Did not find any text search parser named "%s".',
              pattern
            );
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
      let buf = {
        /* struct */
      };
      let res;
      let title = {
        /* struct */
      };
      let myopt = pset.popt;
      let translate_columns = [true, false, false];
      initPQExpBuffer(buf);
      printfPQExpBuffer(
        buf,
        `SELECT '%s' AS "%s",
   p.prsstart::pg_catalog.regproc AS "%s",
   pg_catalog.obj_description(p.prsstart, 'pg_proc') as "%s"
 FROM pg_catalog.pg_ts_parser p
 WHERE p.oid = '%s'
UNION ALL
SELECT '%s',
   p.prstoken::pg_catalog.regproc,
   pg_catalog.obj_description(p.prstoken, 'pg_proc')
 FROM pg_catalog.pg_ts_parser p
 WHERE p.oid = '%s'
UNION ALL
SELECT '%s',
   p.prsend::pg_catalog.regproc,
   pg_catalog.obj_description(p.prsend, 'pg_proc')
 FROM pg_catalog.pg_ts_parser p
 WHERE p.oid = '%s'
UNION ALL
SELECT '%s',
   p.prsheadline::pg_catalog.regproc,
   pg_catalog.obj_description(p.prsheadline, 'pg_proc')
 FROM pg_catalog.pg_ts_parser p
 WHERE p.oid = '%s'
UNION ALL
SELECT '%s',
   p.prslextype::pg_catalog.regproc,
   pg_catalog.obj_description(p.prslextype, 'pg_proc')
 FROM pg_catalog.pg_ts_parser p
 WHERE p.oid = '%s';`,
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
        oid
      );
      res = await PSQLexec(buf.data);
      if (!res)
        return false;
      myopt.nullPrint = NULL;
      initPQExpBuffer(title);
      if (nspname)
        printfPQExpBuffer(
          title,
          _('Text search parser "%s.%s"'),
          nspname,
          prsname
        );
      else
        printfPQExpBuffer(title, _('Text search parser "%s"'), prsname);
      myopt.title = title.data;
      myopt.footers = NULL;
      myopt.topt.default_footer = false;
      myopt.translate_header = true;
      myopt.translate_columns = translate_columns;
      myopt.n_translate_columns = lengthof(translate_columns);
      printQuery(res, myopt, pset.queryFout, false, pset.logfile);
      initPQExpBuffer(buf);
      printfPQExpBuffer(
        buf,
        `SELECT t.alias as "%s",
  t.description as "%s"
FROM pg_catalog.ts_token_type( '%s'::pg_catalog.oid ) as t
ORDER BY 1;`,
        gettext_noop("Token name"),
        gettext_noop("Description"),
        oid
      );
      res = await PSQLexec(buf.data);
      if (!res) {
        return false;
      }
      myopt.nullPrint = NULL;
      if (nspname)
        printfPQExpBuffer(
          title,
          _('Token types for parser "%s.%s"'),
          nspname,
          prsname
        );
      else
        printfPQExpBuffer(title, _('Token types for parser "%s"'), prsname);
      myopt.title = title.data;
      myopt.footers = NULL;
      myopt.topt.default_footer = true;
      myopt.translate_header = true;
      myopt.translate_columns = NULL;
      myopt.n_translate_columns = 0;
      printQuery(res, myopt, pset.queryFout, false, pset.logfile);
      return true;
    }
    async function listTSDictionaries(pattern, verbose) {
      let buf = {
        /* struct */
      };
      let res;
      let myopt = pset.popt;
      initPQExpBuffer(buf);
      printfPQExpBuffer(
        buf,
        'SELECT\n  n.nspname as "%s",\n  d.dictname as "%s",\n',
        gettext_noop("Schema"),
        gettext_noop("Name")
      );
      if (verbose) {
        appendPQExpBuffer(
          buf,
          `  ( SELECT COALESCE(nt.nspname, '(null)')::pg_catalog.text || '.' || t.tmplname FROM
    pg_catalog.pg_ts_template t
    LEFT JOIN pg_catalog.pg_namespace nt ON nt.oid = t.tmplnamespace
    WHERE d.dicttemplate = t.oid ) AS  "%s",
  d.dictinitoption as "%s",
`,
          gettext_noop("Template"),
          gettext_noop("Init options")
        );
      }
      appendPQExpBuffer(
        buf,
        `  pg_catalog.obj_description(d.oid, 'pg_ts_dict') as "%s"
`,
        gettext_noop("Description")
      );
      appendPQExpBufferStr(buf, "FROM pg_catalog.pg_ts_dict d\nLEFT JOIN pg_catalog.pg_namespace n ON n.oid = d.dictnamespace\n");
      if (!validateSQLNamePattern(
        buf,
        pattern,
        false,
        false,
        "n.nspname",
        "d.dictname",
        NULL,
        "pg_catalog.pg_ts_dict_is_visible(d.oid)",
        NULL,
        3
      )) {
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
    async function listTSTemplates(pattern, verbose) {
      let buf = {
        /* struct */
      };
      let res;
      let myopt = pset.popt;
      initPQExpBuffer(buf);
      if (verbose)
        printfPQExpBuffer(
          buf,
          `SELECT
  n.nspname AS "%s",
  t.tmplname AS "%s",
  t.tmplinit::pg_catalog.regproc AS "%s",
  t.tmpllexize::pg_catalog.regproc AS "%s",
  pg_catalog.obj_description(t.oid, 'pg_ts_template') AS "%s"
`,
          gettext_noop("Schema"),
          gettext_noop("Name"),
          gettext_noop("Init"),
          gettext_noop("Lexize"),
          gettext_noop("Description")
        );
      else
        printfPQExpBuffer(
          buf,
          `SELECT
  n.nspname AS "%s",
  t.tmplname AS "%s",
  pg_catalog.obj_description(t.oid, 'pg_ts_template') AS "%s"
`,
          gettext_noop("Schema"),
          gettext_noop("Name"),
          gettext_noop("Description")
        );
      appendPQExpBufferStr(buf, "FROM pg_catalog.pg_ts_template t\nLEFT JOIN pg_catalog.pg_namespace n ON n.oid = t.tmplnamespace\n");
      if (!validateSQLNamePattern(
        buf,
        pattern,
        false,
        false,
        "n.nspname",
        "t.tmplname",
        NULL,
        "pg_catalog.pg_ts_template_is_visible(t.oid)",
        NULL,
        3
      )) {
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
    async function listTSConfigs(pattern, verbose) {
      let buf = {
        /* struct */
      };
      let res;
      let myopt = pset.popt;
      if (verbose)
        return await listTSConfigsVerbose(pattern);
      initPQExpBuffer(buf);
      printfPQExpBuffer(
        buf,
        `SELECT
   n.nspname as "%s",
   c.cfgname as "%s",
   pg_catalog.obj_description(c.oid, 'pg_ts_config') as "%s"
FROM pg_catalog.pg_ts_config c
LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.cfgnamespace
`,
        gettext_noop("Schema"),
        gettext_noop("Name"),
        gettext_noop("Description")
      );
      if (!validateSQLNamePattern(
        buf,
        pattern,
        false,
        false,
        "n.nspname",
        "c.cfgname",
        NULL,
        "pg_catalog.pg_ts_config_is_visible(c.oid)",
        NULL,
        3
      )) {
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
      let buf = {
        /* struct */
      };
      let res;
      let i;
      initPQExpBuffer(buf);
      printfPQExpBuffer(
        buf,
        "SELECT c.oid, c.cfgname,\n   n.nspname,\n   p.prsname,\n   np.nspname as pnspname\nFROM pg_catalog.pg_ts_config c\n   LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.cfgnamespace,\n pg_catalog.pg_ts_parser p\n   LEFT JOIN pg_catalog.pg_namespace np ON np.oid = p.prsnamespace\nWHERE  p.oid = c.cfgparser\n"
      );
      if (!validateSQLNamePattern(
        buf,
        pattern,
        true,
        false,
        "n.nspname",
        "c.cfgname",
        NULL,
        "pg_catalog.pg_ts_config_is_visible(c.oid)",
        NULL,
        3
      )) {
        return false;
      }
      appendPQExpBufferStr(buf, "ORDER BY 3, 2;");
      res = await PSQLexec(buf.data);
      if (!res)
        return false;
      if (PQntuples(res) == 0) {
        if (!pset.quiet) {
          if (pattern)
            pg_log_error(
              'Did not find any text search configuration named "%s".',
              pattern
            );
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
      let buf = {
        /* struct */
      }, title = {
        /* struct */
      };
      let res;
      let myopt = pset.popt;
      initPQExpBuffer(buf);
      printfPQExpBuffer(
        buf,
        `SELECT
  ( SELECT t.alias FROM
    pg_catalog.ts_token_type(c.cfgparser) AS t
    WHERE t.tokid = m.maptokentype ) AS "%s",
  pg_catalog.btrim(
    ARRAY( SELECT mm.mapdict::pg_catalog.regdictionary
           FROM pg_catalog.pg_ts_config_map AS mm
           WHERE mm.mapcfg = m.mapcfg AND mm.maptokentype = m.maptokentype
           ORDER BY mapcfg, maptokentype, mapseqno
    ) :: pg_catalog.text,
  '{}') AS "%s"
FROM pg_catalog.pg_ts_config AS c, pg_catalog.pg_ts_config_map AS m
WHERE c.oid = '%s' AND m.mapcfg = c.oid
GROUP BY m.mapcfg, m.maptokentype, c.cfgparser
ORDER BY 1;`,
        gettext_noop("Token"),
        gettext_noop("Dictionaries"),
        oid
      );
      res = await PSQLexec(buf.data);
      if (!res)
        return false;
      initPQExpBuffer(title);
      if (nspname)
        appendPQExpBuffer(
          title,
          _('Text search configuration "%s.%s"'),
          nspname,
          cfgname
        );
      else
        appendPQExpBuffer(
          title,
          _('Text search configuration "%s"'),
          cfgname
        );
      if (pnspname)
        appendPQExpBuffer(
          title,
          _('\nParser: "%s.%s"'),
          pnspname,
          prsname
        );
      else
        appendPQExpBuffer(
          title,
          _('\nParser: "%s"'),
          prsname
        );
      myopt.nullPrint = NULL;
      myopt.title = title.data;
      myopt.footers = NULL;
      myopt.topt.default_footer = false;
      myopt.translate_header = true;
      printQuery(res, myopt, pset.queryFout, false, pset.logfile);
      return true;
    }
    async function listForeignDataWrappers(pattern, verbose) {
      let buf = {
        /* struct */
      };
      let res;
      let myopt = pset.popt;
      initPQExpBuffer(buf);
      printfPQExpBuffer(
        buf,
        'SELECT fdw.fdwname AS "%s",\n  pg_catalog.pg_get_userbyid(fdw.fdwowner) AS "%s",\n  fdw.fdwhandler::pg_catalog.regproc AS "%s",\n  fdw.fdwvalidator::pg_catalog.regproc AS "%s"',
        gettext_noop("Name"),
        gettext_noop("Owner"),
        gettext_noop("Handler"),
        gettext_noop("Validator")
      );
      if (verbose) {
        appendPQExpBufferStr(buf, ",\n  ");
        printACLColumn(buf, "fdwacl");
        appendPQExpBuffer(
          buf,
          `,
 CASE WHEN fdwoptions IS NULL THEN '' ELSE   '(' || pg_catalog.array_to_string(ARRAY(SELECT   pg_catalog.quote_ident(option_name) ||  ' ' ||   pg_catalog.quote_literal(option_value)  FROM   pg_catalog.pg_options_to_table(fdwoptions)),  ', ') || ')'   END AS "%s",
  d.description AS "%s" `,
          gettext_noop("FDW options"),
          gettext_noop("Description")
        );
      }
      appendPQExpBufferStr(buf, "\nFROM pg_catalog.pg_foreign_data_wrapper fdw\n");
      if (verbose)
        appendPQExpBufferStr(
          buf,
          "LEFT JOIN pg_catalog.pg_description d\n       ON d.classoid = fdw.tableoid AND d.objoid = fdw.oid AND d.objsubid = 0\n"
        );
      if (!validateSQLNamePattern(
        buf,
        pattern,
        false,
        false,
        NULL,
        "fdwname",
        NULL,
        NULL,
        NULL,
        1
      )) {
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
    async function listForeignServers(pattern, verbose) {
      let buf = {
        /* struct */
      };
      let res;
      let myopt = pset.popt;
      initPQExpBuffer(buf);
      printfPQExpBuffer(
        buf,
        'SELECT s.srvname AS "%s",\n  pg_catalog.pg_get_userbyid(s.srvowner) AS "%s",\n  f.fdwname AS "%s"',
        gettext_noop("Name"),
        gettext_noop("Owner"),
        gettext_noop("Foreign-data wrapper")
      );
      if (verbose) {
        appendPQExpBufferStr(buf, ",\n  ");
        printACLColumn(buf, "s.srvacl");
        appendPQExpBuffer(
          buf,
          `,
  s.srvtype AS "%s",
  s.srvversion AS "%s",
  CASE WHEN srvoptions IS NULL THEN '' ELSE   '(' || pg_catalog.array_to_string(ARRAY(SELECT   pg_catalog.quote_ident(option_name) ||  ' ' ||   pg_catalog.quote_literal(option_value)  FROM   pg_catalog.pg_options_to_table(srvoptions)),  ', ') || ')'   END AS "%s",
  d.description AS "%s"`,
          gettext_noop("Type"),
          gettext_noop("Version"),
          gettext_noop("FDW options"),
          gettext_noop("Description")
        );
      }
      appendPQExpBufferStr(
        buf,
        "\nFROM pg_catalog.pg_foreign_server s\n     JOIN pg_catalog.pg_foreign_data_wrapper f ON f.oid=s.srvfdw\n"
      );
      if (verbose)
        appendPQExpBufferStr(
          buf,
          "LEFT JOIN pg_catalog.pg_description d\n       ON d.classoid = s.tableoid AND d.objoid = s.oid AND d.objsubid = 0\n"
        );
      if (!validateSQLNamePattern(
        buf,
        pattern,
        false,
        false,
        NULL,
        "s.srvname",
        NULL,
        NULL,
        NULL,
        1
      )) {
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
    async function listUserMappings(pattern, verbose) {
      let buf = {
        /* struct */
      };
      let res;
      let myopt = pset.popt;
      initPQExpBuffer(buf);
      printfPQExpBuffer(
        buf,
        'SELECT um.srvname AS "%s",\n  um.usename AS "%s"',
        gettext_noop("Server"),
        gettext_noop("User name")
      );
      if (verbose)
        appendPQExpBuffer(
          buf,
          `,
 CASE WHEN umoptions IS NULL THEN '' ELSE   '(' || pg_catalog.array_to_string(ARRAY(SELECT   pg_catalog.quote_ident(option_name) ||  ' ' ||   pg_catalog.quote_literal(option_value)  FROM   pg_catalog.pg_options_to_table(umoptions)),  ', ') || ')'   END AS "%s"`,
          gettext_noop("FDW options")
        );
      appendPQExpBufferStr(buf, "\nFROM pg_catalog.pg_user_mappings um\n");
      if (!validateSQLNamePattern(
        buf,
        pattern,
        false,
        false,
        NULL,
        "um.srvname",
        "um.usename",
        NULL,
        NULL,
        1
      )) {
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
    async function listForeignTables(pattern, verbose) {
      let buf = {
        /* struct */
      };
      let res;
      let myopt = pset.popt;
      initPQExpBuffer(buf);
      printfPQExpBuffer(
        buf,
        'SELECT n.nspname AS "%s",\n  c.relname AS "%s",\n  s.srvname AS "%s"',
        gettext_noop("Schema"),
        gettext_noop("Table"),
        gettext_noop("Server")
      );
      if (verbose)
        appendPQExpBuffer(
          buf,
          `,
 CASE WHEN ftoptions IS NULL THEN '' ELSE   '(' || pg_catalog.array_to_string(ARRAY(SELECT   pg_catalog.quote_ident(option_name) ||  ' ' ||   pg_catalog.quote_literal(option_value)  FROM   pg_catalog.pg_options_to_table(ftoptions)),  ', ') || ')'   END AS "%s",
  d.description AS "%s"`,
          gettext_noop("FDW options"),
          gettext_noop("Description")
        );
      appendPQExpBufferStr(
        buf,
        "\nFROM pg_catalog.pg_foreign_table ft\n  INNER JOIN pg_catalog.pg_class c ON c.oid = ft.ftrelid\n  INNER JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace\n  INNER JOIN pg_catalog.pg_foreign_server s ON s.oid = ft.ftserver\n"
      );
      if (verbose)
        appendPQExpBufferStr(
          buf,
          "   LEFT JOIN pg_catalog.pg_description d\n          ON d.classoid = c.tableoid AND d.objoid = c.oid AND d.objsubid = 0\n"
        );
      if (!validateSQLNamePattern(
        buf,
        pattern,
        false,
        false,
        "n.nspname",
        "c.relname",
        NULL,
        "pg_catalog.pg_table_is_visible(c.oid)",
        NULL,
        3
      )) {
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
    async function listExtensions(pattern) {
      let buf = {
        /* struct */
      };
      let res;
      let myopt = pset.popt;
      initPQExpBuffer(buf);
      printfPQExpBuffer(
        buf,
        `SELECT e.extname AS "%s", e.extversion AS "%s", n.nspname AS "%s", c.description AS "%s"
FROM pg_catalog.pg_extension e LEFT JOIN pg_catalog.pg_namespace n ON n.oid = e.extnamespace LEFT JOIN pg_catalog.pg_description c ON c.objoid = e.oid AND c.classoid = 'pg_catalog.pg_extension'::pg_catalog.regclass
`,
        gettext_noop("Name"),
        gettext_noop("Version"),
        gettext_noop("Schema"),
        gettext_noop("Description")
      );
      if (!validateSQLNamePattern(
        buf,
        pattern,
        false,
        false,
        NULL,
        "e.extname",
        NULL,
        NULL,
        NULL,
        1
      )) {
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
    async function listExtensionContents(pattern) {
      let buf = {
        /* struct */
      };
      let res;
      let i;
      initPQExpBuffer(buf);
      printfPQExpBuffer(
        buf,
        "SELECT e.extname, e.oid\nFROM pg_catalog.pg_extension e\n"
      );
      if (!validateSQLNamePattern(
        buf,
        pattern,
        false,
        false,
        NULL,
        "e.extname",
        NULL,
        NULL,
        NULL,
        1
      )) {
        return false;
      }
      appendPQExpBufferStr(buf, "ORDER BY 1;");
      res = await PSQLexec(buf.data);
      if (!res)
        return false;
      if (PQntuples(res) == 0) {
        if (!pset.quiet) {
          if (pattern)
            pg_log_error(
              'Did not find any extension named "%s".',
              pattern
            );
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
      let buf = {
        /* struct */
      };
      let res;
      let title = {
        /* struct */
      };
      let myopt = pset.popt;
      initPQExpBuffer(buf);
      printfPQExpBuffer(
        buf,
        `SELECT pg_catalog.pg_describe_object(classid, objid, 0) AS "%s"
FROM pg_catalog.pg_depend
WHERE refclassid = 'pg_catalog.pg_extension'::pg_catalog.regclass AND refobjid = '%s' AND deptype = 'e'
ORDER BY 1;`,
        gettext_noop("Object description"),
        oid
      );
      res = await PSQLexec(buf.data);
      if (!res)
        return false;
      myopt.nullPrint = NULL;
      initPQExpBuffer(title);
      printfPQExpBuffer(title, _('Objects in extension "%s"'), extname);
      myopt.title = title.data;
      myopt.translate_header = true;
      printQuery(res, myopt, pset.queryFout, false, pset.logfile);
      return true;
    }
    async function listPublications(pattern) {
      let buf = {
        /* struct */
      };
      let res;
      let myopt = pset.popt;
      let translate_columns = [false, false, false, false, false, false, false, false];
      if (pset.sversion < 1e5) {
        let sverbuf;
        pg_log_error(
          "The server (version %s) does not support publications.",
          formatPGVersionNumber(
            pset.sversion,
            false,
            sverbuf,
            sizeof(sverbuf)
          )
        );
        return true;
      }
      initPQExpBuffer(buf);
      printfPQExpBuffer(
        buf,
        'SELECT pubname AS "%s",\n  pg_catalog.pg_get_userbyid(pubowner) AS "%s",\n  puballtables AS "%s",\n  pubinsert AS "%s",\n  pubupdate AS "%s",\n  pubdelete AS "%s"',
        gettext_noop("Name"),
        gettext_noop("Owner"),
        gettext_noop("All tables"),
        gettext_noop("Inserts"),
        gettext_noop("Updates"),
        gettext_noop("Deletes")
      );
      if (pset.sversion >= 11e4)
        appendPQExpBuffer(
          buf,
          ',\n  pubtruncate AS "%s"',
          gettext_noop("Truncates")
        );
      if (pset.sversion >= 13e4)
        appendPQExpBuffer(
          buf,
          ',\n  pubviaroot AS "%s"',
          gettext_noop("Via root")
        );
      appendPQExpBufferStr(
        buf,
        "\nFROM pg_catalog.pg_publication\n"
      );
      if (!validateSQLNamePattern(
        buf,
        pattern,
        false,
        false,
        NULL,
        "pubname",
        NULL,
        NULL,
        NULL,
        1
      )) {
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
          printfPQExpBuffer(buf, '    "%s"', PQgetvalue(res, i, 0));
        else {
          printfPQExpBuffer(
            buf,
            '    "%s.%s"',
            PQgetvalue(res, i, 0),
            PQgetvalue(res, i, 1)
          );
          if (!PQgetisnull(res, i, 3))
            appendPQExpBuffer(buf, " (%s)", PQgetvalue(res, i, 3));
          if (!PQgetisnull(res, i, 2))
            appendPQExpBuffer(buf, " WHERE %s", PQgetvalue(res, i, 2));
        }
        printTableAddFooter(cont, buf.data);
      }
      return true;
    }
    async function describePublications(pattern) {
      let buf = {
        /* struct */
      };
      let i;
      let res;
      let has_pubtruncate;
      let has_pubviaroot;
      let title = {
        /* struct */
      };
      let cont = {
        /* struct */
      };
      if (pset.sversion < 1e5) {
        let sverbuf;
        pg_log_error(
          "The server (version %s) does not support publications.",
          formatPGVersionNumber(
            pset.sversion,
            false,
            sverbuf,
            sizeof(sverbuf)
          )
        );
        return true;
      }
      has_pubtruncate = pset.sversion >= 11e4;
      has_pubviaroot = pset.sversion >= 13e4;
      initPQExpBuffer(buf);
      printfPQExpBuffer(
        buf,
        "SELECT oid, pubname,\n  pg_catalog.pg_get_userbyid(pubowner) AS owner,\n  puballtables, pubinsert, pubupdate, pubdelete"
      );
      if (has_pubtruncate)
        appendPQExpBufferStr(
          buf,
          ", pubtruncate"
        );
      if (has_pubviaroot)
        appendPQExpBufferStr(
          buf,
          ", pubviaroot"
        );
      appendPQExpBufferStr(
        buf,
        "\nFROM pg_catalog.pg_publication\n"
      );
      if (!validateSQLNamePattern(
        buf,
        pattern,
        false,
        false,
        NULL,
        "pubname",
        NULL,
        NULL,
        NULL,
        1
      )) {
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
            pg_log_error(
              'Did not find any publication named "%s".',
              pattern
            );
          else
            pg_log_error("Did not find any publications.");
        }
        return false;
      }
      for (i = 0; i < PQntuples(res); i++) {
        let align = "l";
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
          printfPQExpBuffer(
            buf,
            "SELECT n.nspname, c.relname"
          );
          if (pset.sversion >= 15e4) {
            appendPQExpBufferStr(
              buf,
              ", pg_get_expr(pr.prqual, c.oid)"
            );
            appendPQExpBufferStr(
              buf,
              ", (CASE WHEN pr.prattrs IS NOT NULL THEN\n     pg_catalog.array_to_string(      ARRAY(SELECT attname\n              FROM\n                pg_catalog.generate_series(0, pg_catalog.array_upper(pr.prattrs::pg_catalog.int2[], 1)) s,\n                pg_catalog.pg_attribute\n        WHERE attrelid = c.oid AND attnum = prattrs[s]), ', ')\n       ELSE NULL END)"
            );
          } else
            appendPQExpBufferStr(
              buf,
              ", NULL, NULL"
            );
          appendPQExpBuffer(
            buf,
            "\nFROM pg_catalog.pg_class c,\n     pg_catalog.pg_namespace n,\n     pg_catalog.pg_publication_rel pr\nWHERE c.relnamespace = n.oid\n  AND c.oid = pr.prrelid\n  AND pr.prpubid = '%s'\nORDER BY 1,2",
            pubid
          );
          if (!await addFooterToPublicationDesc(buf, _("Tables:"), false, cont))
            return false;
          if (pset.sversion >= 15e4) {
            printfPQExpBuffer(
              buf,
              "SELECT n.nspname\nFROM pg_catalog.pg_namespace n\n     JOIN pg_catalog.pg_publication_namespace pn ON n.oid = pn.pnnspid\nWHERE pn.pnpubid = '%s'\nORDER BY 1",
              pubid
            );
            if (!await addFooterToPublicationDesc(
              buf,
              _("Tables from schemas:"),
              true,
              cont
            ))
              return false;
          }
        }
        printTable(cont, pset.queryFout, false, pset.logfile);
      }
      return true;
    }
    async function describeSubscriptions(pattern, verbose) {
      let buf = {
        /* struct */
      };
      let res;
      let myopt = pset.popt;
      let translate_columns = [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ];
      if (pset.sversion < 1e5) {
        let sverbuf;
        pg_log_error(
          "The server (version %s) does not support subscriptions.",
          formatPGVersionNumber(
            pset.sversion,
            false,
            sverbuf,
            sizeof(sverbuf)
          )
        );
        return true;
      }
      initPQExpBuffer(buf);
      printfPQExpBuffer(
        buf,
        'SELECT subname AS "%s"\n,  pg_catalog.pg_get_userbyid(subowner) AS "%s"\n,  subenabled AS "%s"\n,  subpublications AS "%s"\n',
        gettext_noop("Name"),
        gettext_noop("Owner"),
        gettext_noop("Enabled"),
        gettext_noop("Publication")
      );
      if (verbose) {
        if (pset.sversion >= 14e4) {
          appendPQExpBuffer(
            buf,
            ', subbinary AS "%s"\n',
            gettext_noop("Binary")
          );
          if (pset.sversion >= 16e4)
            appendPQExpBuffer(
              buf,
              `, (CASE substream
    WHEN 'f' THEN 'off'
    WHEN 't' THEN 'on'
    WHEN 'p' THEN 'parallel'
   END) AS "%s"
`,
              gettext_noop("Streaming")
            );
          else
            appendPQExpBuffer(
              buf,
              ', substream AS "%s"\n',
              gettext_noop("Streaming")
            );
        }
        if (pset.sversion >= 15e4)
          appendPQExpBuffer(
            buf,
            ', subtwophasestate AS "%s"\n, subdisableonerr AS "%s"\n',
            gettext_noop("Two-phase commit"),
            gettext_noop("Disable on error")
          );
        if (pset.sversion >= 16e4)
          appendPQExpBuffer(
            buf,
            ', suborigin AS "%s"\n, subpasswordrequired AS "%s"\n, subrunasowner AS "%s"\n',
            gettext_noop("Origin"),
            gettext_noop("Password required"),
            gettext_noop("Run as owner?")
          );
        appendPQExpBuffer(
          buf,
          ',  subsynccommit AS "%s"\n,  subconninfo AS "%s"\n',
          gettext_noop("Synchronous commit"),
          gettext_noop("Conninfo")
        );
        if (pset.sversion >= 15e4)
          appendPQExpBuffer(
            buf,
            ', subskiplsn AS "%s"\n',
            gettext_noop("Skip LSN")
          );
      }
      appendPQExpBufferStr(
        buf,
        "FROM pg_catalog.pg_subscription\nWHERE subdbid = (SELECT oid\n                 FROM pg_catalog.pg_database\n                 WHERE datname = pg_catalog.current_database())"
      );
      if (!validateSQLNamePattern(
        buf,
        pattern,
        true,
        false,
        NULL,
        "subname",
        NULL,
        NULL,
        NULL,
        1
      )) {
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
    function printACLColumn(buf, colname) {
      appendPQExpBuffer(
        buf,
        `pg_catalog.array_to_string(%s, E'\\n') AS "%s"`,
        colname,
        gettext_noop("Access privileges")
      );
    }
    async function listOperatorClasses(access_method_pattern, type_pattern, verbose) {
      let buf = {
        /* struct */
      };
      let res;
      let myopt = pset.popt;
      let have_where = false;
      let translate_columns = [false, false, false, false, false, false, false];
      initPQExpBuffer(buf);
      printfPQExpBuffer(
        buf,
        `SELECT
  am.amname AS "%s",
  pg_catalog.format_type(c.opcintype, NULL) AS "%s",
  CASE
    WHEN c.opckeytype <> 0 AND c.opckeytype <> c.opcintype
    THEN pg_catalog.format_type(c.opckeytype, NULL)
    ELSE NULL
  END AS "%s",
  CASE
    WHEN pg_catalog.pg_opclass_is_visible(c.oid)
    THEN pg_catalog.format('%%I', c.opcname)
    ELSE pg_catalog.format('%%I.%%I', n.nspname, c.opcname)
  END AS "%s",
  (CASE WHEN c.opcdefault
    THEN '%s'
    ELSE '%s'
  END) AS "%s"`,
        gettext_noop("AM"),
        gettext_noop("Input type"),
        gettext_noop("Storage type"),
        gettext_noop("Operator class"),
        gettext_noop("yes"),
        gettext_noop("no"),
        gettext_noop("Default?")
      );
      if (verbose)
        appendPQExpBuffer(
          buf,
          `,
  CASE
    WHEN pg_catalog.pg_opfamily_is_visible(of.oid)
    THEN pg_catalog.format('%%I', of.opfname)
    ELSE pg_catalog.format('%%I.%%I', ofn.nspname, of.opfname)
  END AS "%s",
 pg_catalog.pg_get_userbyid(c.opcowner) AS "%s"
`,
          gettext_noop("Operator family"),
          gettext_noop("Owner")
        );
      appendPQExpBufferStr(
        buf,
        "\nFROM pg_catalog.pg_opclass c\n  LEFT JOIN pg_catalog.pg_am am on am.oid = c.opcmethod\n  LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.opcnamespace\n  LEFT JOIN pg_catalog.pg_type t ON t.oid = c.opcintype\n  LEFT JOIN pg_catalog.pg_namespace tn ON tn.oid = t.typnamespace\n"
      );
      if (verbose)
        appendPQExpBufferStr(
          buf,
          "  LEFT JOIN pg_catalog.pg_opfamily of ON of.oid = c.opcfamily\n  LEFT JOIN pg_catalog.pg_namespace ofn ON ofn.oid = of.opfnamespace\n"
        );
      if (access_method_pattern) {
        have_where = { value: have_where };
        if (!validateSQLNamePattern(
          buf,
          access_method_pattern,
          false,
          false,
          NULL,
          "am.amname",
          NULL,
          NULL,
          have_where,
          1
        ))
          return false;
        have_where = have_where.value;
      }
      if (type_pattern) {
        if (!validateSQLNamePattern(
          buf,
          type_pattern,
          have_where,
          false,
          "tn.nspname",
          "t.typname",
          "pg_catalog.format_type(t.oid, NULL)",
          "pg_catalog.pg_type_is_visible(t.oid)",
          NULL,
          3
        ))
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
    async function listOperatorFamilies(access_method_pattern, type_pattern, verbose) {
      let buf = {
        /* struct */
      };
      let res;
      let myopt = pset.popt;
      let have_where = false;
      let translate_columns = [false, false, false, false];
      initPQExpBuffer(buf);
      printfPQExpBuffer(
        buf,
        `SELECT
  am.amname AS "%s",
  CASE
    WHEN pg_catalog.pg_opfamily_is_visible(f.oid)
    THEN pg_catalog.format('%%I', f.opfname)
    ELSE pg_catalog.format('%%I.%%I', n.nspname, f.opfname)
  END AS "%s",
  (SELECT
     pg_catalog.string_agg(pg_catalog.format_type(oc.opcintype, NULL), ', ')
   FROM pg_catalog.pg_opclass oc
   WHERE oc.opcfamily = f.oid) "%s"`,
        gettext_noop("AM"),
        gettext_noop("Operator family"),
        gettext_noop("Applicable types")
      );
      if (verbose)
        appendPQExpBuffer(
          buf,
          ',\n  pg_catalog.pg_get_userbyid(f.opfowner) AS "%s"\n',
          gettext_noop("Owner")
        );
      appendPQExpBufferStr(
        buf,
        "\nFROM pg_catalog.pg_opfamily f\n  LEFT JOIN pg_catalog.pg_am am on am.oid = f.opfmethod\n  LEFT JOIN pg_catalog.pg_namespace n ON n.oid = f.opfnamespace\n"
      );
      if (access_method_pattern) {
        have_where = { value: have_where };
        if (!validateSQLNamePattern(
          buf,
          access_method_pattern,
          false,
          false,
          NULL,
          "am.amname",
          NULL,
          NULL,
          have_where,
          1
        ))
          return false;
        have_where = have_where.value;
      }
      if (type_pattern) {
        appendPQExpBuffer(
          buf,
          "  %s EXISTS (\n    SELECT 1\n    FROM pg_catalog.pg_type t\n    JOIN pg_catalog.pg_opclass oc ON oc.opcintype = t.oid\n    LEFT JOIN pg_catalog.pg_namespace tn ON tn.oid = t.typnamespace\n    WHERE oc.opcfamily = f.oid\n",
          have_where ? "AND" : "WHERE"
        );
        if (!validateSQLNamePattern(
          buf,
          type_pattern,
          true,
          false,
          "tn.nspname",
          "t.typname",
          "pg_catalog.format_type(t.oid, NULL)",
          "pg_catalog.pg_type_is_visible(t.oid)",
          NULL,
          3
        ))
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
    async function listOpFamilyOperators(access_method_pattern, family_pattern, verbose) {
      let buf = {
        /* struct */
      };
      let res;
      let myopt = pset.popt;
      let have_where = false;
      let translate_columns = [false, false, false, false, false, false];
      initPQExpBuffer(buf);
      printfPQExpBuffer(
        buf,
        `SELECT
  am.amname AS "%s",
  CASE
    WHEN pg_catalog.pg_opfamily_is_visible(of.oid)
    THEN pg_catalog.format('%%I', of.opfname)
    ELSE pg_catalog.format('%%I.%%I', nsf.nspname, of.opfname)
  END AS "%s",
  o.amopopr::pg_catalog.regoperator AS "%s"
,  o.amopstrategy AS "%s",
  CASE o.amoppurpose
    WHEN 'o' THEN '%s'
    WHEN 's' THEN '%s'
  END AS "%s"
`,
        gettext_noop("AM"),
        gettext_noop("Operator family"),
        gettext_noop("Operator"),
        gettext_noop("Strategy"),
        gettext_noop("ordering"),
        gettext_noop("search"),
        gettext_noop("Purpose")
      );
      if (verbose)
        appendPQExpBuffer(
          buf,
          ', ofs.opfname AS "%s"\n',
          gettext_noop("Sort opfamily")
        );
      appendPQExpBufferStr(
        buf,
        "FROM pg_catalog.pg_amop o\n  LEFT JOIN pg_catalog.pg_opfamily of ON of.oid = o.amopfamily\n  LEFT JOIN pg_catalog.pg_am am ON am.oid = of.opfmethod AND am.oid = o.amopmethod\n  LEFT JOIN pg_catalog.pg_namespace nsf ON of.opfnamespace = nsf.oid\n"
      );
      if (verbose)
        appendPQExpBufferStr(
          buf,
          "  LEFT JOIN pg_catalog.pg_opfamily ofs ON ofs.oid = o.amopsortfamily\n"
        );
      if (access_method_pattern) {
        have_where = { value: have_where };
        if (!validateSQLNamePattern(
          buf,
          access_method_pattern,
          false,
          false,
          NULL,
          "am.amname",
          NULL,
          NULL,
          have_where,
          1
        ))
          return false;
        have_where = have_where.value;
      }
      if (family_pattern) {
        if (!validateSQLNamePattern(
          buf,
          family_pattern,
          have_where,
          false,
          "nsf.nspname",
          "of.opfname",
          NULL,
          NULL,
          NULL,
          3
        ))
          return false;
      }
      appendPQExpBufferStr(buf, "ORDER BY 1, 2,\n  o.amoplefttype = o.amoprighttype DESC,\n  pg_catalog.format_type(o.amoplefttype, NULL),\n  pg_catalog.format_type(o.amoprighttype, NULL),\n  o.amopstrategy;");
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
    async function listOpFamilyFunctions(access_method_pattern, family_pattern, verbose) {
      let buf = {
        /* struct */
      };
      let res;
      let myopt = pset.popt;
      let have_where = false;
      let translate_columns = [false, false, false, false, false, false];
      initPQExpBuffer(buf);
      printfPQExpBuffer(
        buf,
        `SELECT
  am.amname AS "%s",
  CASE
    WHEN pg_catalog.pg_opfamily_is_visible(of.oid)
    THEN pg_catalog.format('%%I', of.opfname)
    ELSE pg_catalog.format('%%I.%%I', ns.nspname, of.opfname)
  END AS "%s",
  pg_catalog.format_type(ap.amproclefttype, NULL) AS "%s",
  pg_catalog.format_type(ap.amprocrighttype, NULL) AS "%s",
  ap.amprocnum AS "%s"
`,
        gettext_noop("AM"),
        gettext_noop("Operator family"),
        gettext_noop("Registered left type"),
        gettext_noop("Registered right type"),
        gettext_noop("Number")
      );
      if (!verbose)
        appendPQExpBuffer(
          buf,
          ', p.proname AS "%s"\n',
          gettext_noop("Function")
        );
      else
        appendPQExpBuffer(
          buf,
          ', ap.amproc::pg_catalog.regprocedure AS "%s"\n',
          gettext_noop("Function")
        );
      appendPQExpBufferStr(
        buf,
        "FROM pg_catalog.pg_amproc ap\n  LEFT JOIN pg_catalog.pg_opfamily of ON of.oid = ap.amprocfamily\n  LEFT JOIN pg_catalog.pg_am am ON am.oid = of.opfmethod\n  LEFT JOIN pg_catalog.pg_namespace ns ON of.opfnamespace = ns.oid\n  LEFT JOIN pg_catalog.pg_proc p ON ap.amproc = p.oid\n"
      );
      if (access_method_pattern) {
        have_where = { value: have_where };
        if (!validateSQLNamePattern(
          buf,
          access_method_pattern,
          false,
          false,
          NULL,
          "am.amname",
          NULL,
          NULL,
          have_where,
          1
        ))
          return false;
        have_where = have_where.value;
      }
      if (family_pattern) {
        if (!validateSQLNamePattern(
          buf,
          family_pattern,
          have_where,
          false,
          "ns.nspname",
          "of.opfname",
          NULL,
          NULL,
          NULL,
          3
        ))
          return false;
      }
      appendPQExpBufferStr(buf, "ORDER BY 1, 2,\n  ap.amproclefttype = ap.amprocrighttype DESC,\n  3, 4, 5;");
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
    async function listLargeObjects(verbose) {
      let buf = {
        /* struct */
      };
      let res;
      let myopt = pset.popt;
      initPQExpBuffer(buf);
      printfPQExpBuffer(
        buf,
        'SELECT oid as "%s",\n  pg_catalog.pg_get_userbyid(lomowner) as "%s",\n  ',
        gettext_noop("ID"),
        gettext_noop("Owner")
      );
      if (verbose) {
        printACLColumn(buf, "lomacl");
        appendPQExpBufferStr(buf, ",\n  ");
      }
      appendPQExpBuffer(
        buf,
        `pg_catalog.obj_description(oid, 'pg_largeobject') as "%s"
FROM pg_catalog.pg_largeobject_metadata
ORDER BY oid`,
        gettext_noop("Description")
      );
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
function pad(str, len, align, pre = "", post = "") {
  const spaces = Math.max(0, len - strlen(str));
  if (align === "r")
    return pre + " ".repeat(spaces) + str + post;
  if (align === "c")
    return pre + " ".repeat(Math.floor(spaces / 2)) + str + " ".repeat(Math.ceil(spaces / 2)) + post;
  return pre + str + " ".repeat(spaces) + post;
}
function byN(arr, n) {
  let i = 0;
  const len = arr.length;
  const result = [];
  while (i < len)
    result.push(arr.slice(i, i += n));
  return result;
}
function linesInfo(str) {
  let pos = -1, prevPos = 0, count = 1, longest = 0;
  while ((pos = str.indexOf("\n", pos + 1)) !== -1) {
    if (pos - prevPos > longest)
      longest = pos - prevPos;
    prevPos = pos + 1;
    count++;
  }
  if (str.length - prevPos > longest)
    longest = str.length - prevPos;
  return { count, longest };
}
function htmlEscape(str, convertWhitespace) {
  str = str.replace(/[<>&'"]/g, (m) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[m]);
  if (convertWhitespace)
    str = str.replace(/ /g, "&nbsp;").replace(/\n/g, "<br />");
  return str;
}
function tableToString(td, escape) {
  const { ncolumns, nrows, aligns } = td, allCellsLinesInfo = [...td.headers, ...td.cells].map(linesInfo), { colWidths, rowHeights } = allCellsLinesInfo.reduce((memo, cellInfo, i) => {
    const row = Math.floor(i / td.ncolumns);
    const col = i % td.ncolumns;
    if (cellInfo.longest > memo.colWidths[col])
      memo.colWidths[col] = cellInfo.longest;
    if (cellInfo.count > memo.rowHeights[row])
      memo.rowHeights[row] = cellInfo.count;
    return memo;
  }, {
    colWidths: new Array(ncolumns).fill(0),
    rowHeights: new Array(
      nrows + 1
      /* -> header row */
    ).fill(1)
  }), totalWidth = colWidths.reduce((memo, width) => memo + width, 0) + ncolumns * 2 + (ncolumns - 1), title = pad(td.title, totalWidth, "c"), rows = [td.headers, null, ...byN(td.cells, ncolumns)], table = rows.map((row, rowIndex) => {
    if (rowIndex === 1) {
      return td.headers.map((header, i) => "-".repeat(colWidths[i % ncolumns] + 2)).join("+");
    }
    if (rowIndex > 1)
      rowIndex--;
    const rowLines = row.map((cell) => cell.split("\n"));
    return new Array(rowHeights[rowIndex]).fill("").map((empty, rowLineIndex) => rowLines.map((cellLine, colIndex) => pad(
      cellLine[rowLineIndex] ?? "",
      colWidths[colIndex],
      rowIndex === 0 ? "c" : aligns[colIndex],
      " ",
      cellLine[rowLineIndex + 1] === void 0 ? " " : "+"
    )).join("|")).join("\n");
  }).join("\n"), footers = td.footers ? "\n" + td.footers.join("\n") : td.opt.default_footer ? `
(${nrows} row${nrows === 1 ? "" : "s"})` : "";
  let result = `${title}
${table}${footers}`;
  if (escape)
    result = htmlEscape(result);
  return result;
}
function tableToHtml(td) {
  let result = `<table><tr><th valign="top" style="text-align: center;" colspan="${td.ncolumns}">${htmlEscape(td.title)}</th></tr><tr>`;
  for (let h of td.headers)
    result += `<th valign="top" style="text-align: center;">${htmlEscape(h)}</th>`;
  result += "</tr>";
  for (let row of byN(td.cells, td.ncolumns)) {
    result += `<tr>` + row.map((cell, i) => `<td valign="top" style="text-align: ${td.aligns[i] === "c" ? "center" : td.aligns[i] === "r" ? "right" : "left"}">${htmlEscape(cell).replace(/\n/g, "<br>")}</td>`).join("\n") + "</tr>";
  }
  result += "</table>";
  if (td.footers) {
    if (td.footers.length > 1 && td.footers.some((footer) => /^\s/.test(footer))) {
      result += `<dl>` + td.footers.map((footer) => /^\s/.test(footer) ? `<dd>${htmlEscape(footer.trim(), true)}</dd>` : `<dt>${htmlEscape(footer, true)}</dt>`).join("") + "</dl>";
    } else {
      result += td.footers.map((footer) => `<p>${htmlEscape(footer, true)}</p>`).join("");
    }
  } else if (td.opt.default_footer) {
    result += `<p>(${td.nrows} row${td.nrows === 1 ? "" : "s"})</p>`;
  }
  return result;
}
function Assert(cond) {
  if (!cond)
    throw new Error(`Assertion failed (value: ${cond})`);
}
var gettext_noop = noop;
var pg_strdup = noop;
var _ = noop;
function strstr(str1, str2) {
  const index = str1.indexOf(str2);
  return index === -1 ? NULL : index;
}
var strchr = strstr;
function strlen(str) {
  return str.length;
}
function strncmp(s1, s2, n) {
  if (typeof s1 !== "string" || typeof s2 !== "string")
    throw new Error("Not a string");
  if (s1.length > n)
    s1 = s1.slice(0, n);
  if (s2.length > n)
    s2 = s2.slice(0, n);
  return s1 < s2 ? -1 : s1 > s2 ? 1 : 0;
}
function strcmp(s1, s2) {
  return strncmp(s1, s2, Infinity);
}
function strspn(str, chrs) {
  const len = strlen(str);
  for (let i = 0; i < len; i++)
    if (chrs.indexOf(str[i]) === -1)
      return i;
  return len;
}
function atoi(str) {
  return parseInt(str, 10);
}
function atooid(str) {
  return parseInt(str, 10);
}
function isWhitespace(chr) {
  return chr === " " || chr === "	" || chr === "\n" || chr === "\r";
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
  buf.data = "";
  buf.len = 0;
}
var resetPQExpBuffer = initPQExpBuffer;
function appendPQExpBufferStr(buf, str) {
  buf.data += str;
  buf.len = buf.data.length;
}
var appendPQExpBufferChar = appendPQExpBufferStr;
function appendPQExpBuffer(buf, template, ...values) {
  const str = sprintf(template, ...values);
  appendPQExpBufferStr(buf, str);
}
function printfPQExpBuffer(buf, template, ...values) {
  initPQExpBuffer(buf);
  appendPQExpBuffer(buf, template, ...values);
}
function appendStringLiteral(buf, str, encoding, std_strings) {
  const escaped = str.replace(std_strings ? /[']/g : /['\\]/g, "\\$&");
  const quoted = "'" + escaped + "'";
  appendPQExpBufferStr(buf, quoted);
}
function appendStringLiteralConn(buf, str, conn) {
  if (strchr(str, "\\") != NULL && PQserverVersion(conn) >= 80100) {
    if (buf.len > 0 && buf.data[buf.len - 1] != " ")
      appendPQExpBufferChar(buf, " ");
    appendPQExpBufferChar(buf, ESCAPE_STRING_SYNTAX);
    appendStringLiteral(buf, str, PQclientEncoding(conn), false);
    return;
  }
  appendStringLiteral(buf, str, conn.encoding, conn.std_strings);
}
function sprintf(template, ...values) {
  let result = "";
  let valuesIndex = 0;
  let chrIndex = 0;
  let nextChrIndex;
  while ((nextChrIndex = template.indexOf("%", chrIndex)) !== -1) {
    let padTo = 0;
    let padLeft = false;
    result += template.slice(chrIndex, nextChrIndex);
    chrIndex = nextChrIndex + 1;
    let pcChr = template[chrIndex++];
    if (pcChr === "%")
      result += "%";
    if (pcChr === "*") {
      padTo = parseInt(values[valuesIndex++], 10);
      pcChr = template[chrIndex++];
    }
    if (pcChr === "-") {
      padLeft = true;
      pcChr = template[chrIndex++];
    }
    if (pcChr >= "0" && pcChr <= "9") {
      padTo = parseInt(pcChr, 10);
      pcChr = template[chrIndex++];
    }
    if (pcChr === "s" || pcChr === "c" || pcChr === "d" || pcChr === "u") {
      const ins = String(values[valuesIndex++]);
      const padBy = padTo - ins.length;
      if (padLeft === false && padBy > 0)
        result += " ".repeat(padBy);
      result += ins;
      if (padLeft === true && padBy > 0)
        result += " ".repeat(padBy);
    }
  }
  result += template.slice(chrIndex);
  return result;
}
function PQdb(conn) {
  if (!conn)
    return NULL;
  return conn.dbName;
}
function PQserverVersion(conn) {
  if (!conn)
    return 0;
  if (conn.status === CONNECTION_BAD)
    return 0;
  return conn.sversion;
}
function PQclientEncoding(conn) {
  if (!conn || conn.status != CONNECTION_OK)
    return -1;
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
  return String(val === null ? "" : val);
}
function PQfnumber(res, field_name) {
  let in_quotes;
  let iptr;
  let optr;
  let i;
  let len;
  if (!res)
    return -1;
  if (field_name == NULL || field_name[0] == NULL)
    return -1;
  in_quotes = false;
  optr = "";
  for (iptr = 0, len = strlen(field_name); iptr < len; iptr++) {
    let c = field_name[iptr];
    if (in_quotes) {
      if (c == '"') {
        if (field_name[iptr + 1] == '"') {
          optr += '"';
          iptr++;
        } else
          in_quotes = false;
      } else
        optr += c;
    } else if (c == '"')
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
  if (version_number >= 1e5) {
    if (include_minor)
      buf = sprintf(
        "%d.%d",
        Math.floor(version_number / 1e4),
        version_number % 1e4
      );
    else
      buf = sprintf("%d", version_number / 1e4);
  } else {
    if (include_minor)
      buf = sprintf(
        "%d.%d.%d",
        Math.floor(version_number / 1e4),
        Math.floor(version_number / 100) % 100,
        version_number % 100
      );
    else
      buf = sprintf(
        "%d.%d",
        Math.floor(version_number / 1e4),
        Math.floor(version_number / 100) % 100
      );
  }
  return buf;
}
function psql_scan_slash_option(scan_state, type, quote, semicolon) {
  if (type !== OT_NORMAL && type !== OT_WHOLE_LINE)
    throw new Error(`scan type ${type} not implemented`);
  if (quote !== NULL)
    throw new Error("cannot return quote type");
  const quoteStack = [];
  const resultRe = semicolon ? /^(.*);*$/ : /^(.*)$/;
  let chr;
  for (; ; ) {
    chr = scan_state[0][scan_state[1]];
    if (chr == NULL)
      return NULL;
    if (!isWhitespace(chr))
      break;
    scan_state[1]++;
  }
  if (type === OT_WHOLE_LINE) {
    return scan_state[0].slice(scan_state[1], scan_state[1] = scan_state[0].length);
  }
  let result = "";
  for (; ; ) {
    chr = scan_state[0][scan_state[1]++];
    if (chr == NULL) {
      if (quoteStack.length > 0)
        return NULL;
      return result.match(resultRe)[1];
    }
    if (isQuote(chr)) {
      if (chr === quoteStack[quoteStack.length - 1])
        quoteStack.pop();
      else
        quoteStack.push(chr);
      if (chr === '"')
        result += chr;
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

// demo-src/demo.js
function parse(url, parseQueryString) {
  const { protocol } = new URL(url);
  const httpUrl = "http:" + url.substring(protocol.length);
  let { username, password, host, hostname, port, pathname, search, searchParams, hash } = new URL(httpUrl);
  password = decodeURIComponent(password);
  const auth = username + ":" + password;
  const query = parseQueryString ? Object.fromEntries(searchParams.entries()) : search;
  return { href: url, protocol, auth, username, password, host, hostname, port, pathname, search, query, hash };
}
var cancelFn;
async function go() {
  if (cancelFn === void 0) {
    goBtn.value = "Cancel";
    spinner.style.display = "block";
    const connectionString = document.querySelector("#dburl").value;
    let dbName, dbHost;
    try {
      const parsedConnnectionString = parse(connectionString);
      dbName = parsedConnnectionString.pathname.slice(1);
      dbHost = parsedConnnectionString.hostname;
    } catch (err) {
      alert("Invalid database URL");
      return;
    }
    const cmd = document.querySelector("#sql").value, echoHidden = document.querySelector("#echohidden").checked, htmlOutput = document.querySelector("#html").checked;
    sessionStorage.setItem("form", JSON.stringify({ connectionString, cmd, echoHidden, htmlOutput }));
    const headers = {
      "Neon-Connection-String": connectionString,
      "Neon-Raw-Text-Output": "true",
      // because we want raw Postgres text format
      "Neon-Array-Mode": "true",
      // this saves data and post-processing even if we return objects, not arrays
      "Neon-Pool-Opt-In": "true"
    };
    queryFn = async (sql) => {
      const response = await fetch(`https://${dbHost}/sql`, {
        method: "POST",
        body: JSON.stringify({ query: sql, params: [] }),
        headers
      });
      const json = await response.json();
      if (response.status === 200)
        return json;
      const jsonMsg = json.message, msgMatch = jsonMsg.match(/ERROR: (.*?)\n/), errMsg = msgMatch ? msgMatch[1] : jsonMsg;
      throw new Error(errMsg);
    };
    let outputEl = document.querySelector("#output");
    outputEl.innerHTML = "";
    if (!htmlOutput)
      outputEl = outputEl.appendChild(document.createElement("pre"));
    let firstOutput = true;
    const outputFn = htmlOutput ? (x) => outputEl.innerHTML += describeDataToHtml(x) : (x) => {
      outputEl.innerHTML += (firstOutput ? "" : "\n\n") + describeDataToString(x, true);
      firstOutput = false;
    };
    const { promise, cancel } = describe(cmd, dbName, queryFn, outputFn, echoHidden);
    cancelFn = cancel;
    const status = await promise;
    if (status !== null) {
      goBtn.value = goBtnUsualTitle;
      spinner.style.display = "none";
      cancelFn = void 0;
    }
  } else {
    cancelFn();
    goBtn.value = goBtnUsualTitle;
    spinner.style.display = "none";
    cancelFn = void 0;
  }
}
window.addEventListener("load", () => {
  const saveData = sessionStorage.getItem("form");
  if (!saveData)
    return;
  const { connectionString, cmd, echoHidden, htmlOutput } = JSON.parse(saveData);
  document.querySelector("#dburl").value = connectionString;
  document.querySelector("#sql").value = cmd;
  document.querySelector("#echohidden").checked = echoHidden;
  document.querySelector("#html").checked = htmlOutput;
});
var goBtn = document.querySelector("#gobtn");
var goBtnUsualTitle = goBtn.value;
goBtn.addEventListener("click", go);
var spinner = document.querySelector("#spinner");
document.querySelector("#sql").addEventListener("keyup", (e) => {
  if (e.key === "Enter")
    go();
  e.preventDefault();
});
document.querySelector("#examples").addEventListener("click", (e) => {
  if (e.target.nodeName === "A") {
    document.querySelector("#sql").value = e.target.textContent;
  }
  e.preventDefault();
});
