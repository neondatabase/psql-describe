const NULL = null;
const FUNC_MAX_ARGS = 100;
const ESCAPE_STRING_SYNTAX = 'E';
const cancel_pressed = false;

const
	EXIT_FAILURE = 1,
	EXIT_SUCCESS = 0;

const
	PSQL_CMD_UNKNOWN = 0,		/* not done parsing yet (internal only) */
	PSQL_CMD_SEND = 1,				/* query complete; send off */
	PSQL_CMD_SKIP_LINE = 2,			/* keep building query */
	PSQL_CMD_TERMINATE = 3,			/* quit program */
	PSQL_CMD_NEWEDIT = 4,			/* query buffer was changed (e.g., via \e) */
	PSQL_CMD_ERROR = 5;				/* the execution of the backslash command */

const
	OT_NORMAL = 0,					/* normal case */
	OT_SQLID = 1,					/* treat as SQL identifier */
	OT_SQLIDHACK = 2,				/* SQL identifier, but don't downcase */
	OT_FILEPIPE = 3,				/* it's a filename or pipe */
	OT_WHOLE_LINE = 4;				/* just snarf the rest of the line */

const PG_UTF8 = 6;

const
	CONNECTION_OK = 0,
	CONNECTION_BAD = 1,
	CONNECTION_STARTED = 2,			/* Waiting for connection to be made.  */
	CONNECTION_MADE = 3,			/* Connection OK; waiting to send.     */
	CONNECTION_AWAITING_RESPONSE = 4,	/* Waiting for a response from the postmaster.        */
	CONNECTION_AUTH_OK = 5,			/* Received authentication; waiting for backend startup. */
	CONNECTION_SETENV = 6,			/* This state is no longer used. */
	CONNECTION_SSL_STARTUP = 7,		/* Negotiating SSL. */
	CONNECTION_NEEDED = 8,			/* Internal state: connect() needed */
	CONNECTION_CHECK_WRITABLE = 9,	/* Checking if session is read-write. */
	CONNECTION_CONSUME = 10,			/* Consuming any extra messages. */
	CONNECTION_GSS_STARTUP = 11,		/* Negotiating GSSAPI. */
	CONNECTION_CHECK_TARGET = 12,	/* Checking target server properties. */
	CONNECTION_CHECK_STANDBY = 13;	/* Checking if server is in standby mode. */

const
	COERCION_METHOD_FUNCTION = 'f', /* use a function */
	COERCION_METHOD_BINARY = 'b',	/* types are binary-compatible */
	COERCION_METHOD_INOUT = 'i'; /* use input/output functions */

const
	COERCION_CODE_IMPLICIT = 'i',	/* coercion in context of expression */
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
	RELKIND_PARTITIONED_INDEX = 'I',
	RELPERSISTENCE_PERMANENT = 'p',
	RELPERSISTENCE_UNLOGGED = 'u',
	RELPERSISTENCE_TEMP = 't',
	REPLICA_IDENTITY_DEFAULT = 'd',
	REPLICA_IDENTITY_NOTHING = 'n',
	REPLICA_IDENTITY_FULL = 'f',
	REPLICA_IDENTITY_INDEX = 'i';

const
	BOOLOID = 16,
	BYTEAOID = 17,
	CHAROID = 18,
	NAMEOID = 19,
	INT8OID = 20,
	INT2OID = 21,
	INT2VECTOROID = 22,
	INT4OID = 23,
	REGPROCOID = 24,
	TEXTOID = 25,
	OIDOID = 26,
	TIDOID = 27,
	XIDOID = 28,
	CIDOID = 29,
	OIDVECTOROID = 30,
	JSONOID = 114,
	XMLOID = 142,
	PG_NODE_TREEOID = 194,
	PG_NDISTINCTOID = 3361,
	PG_DEPENDENCIESOID = 3402,
	PG_MCV_LISTOID = 5017,
	PG_DDL_COMMANDOID = 32,
	XID8OID = 5069,
	POINTOID = 600,
	LSEGOID = 601,
	PATHOID = 602,
	BOXOID = 603,
	POLYGONOID = 604,
	LINEOID = 628,
	FLOAT4OID = 700,
	FLOAT8OID = 701,
	UNKNOWNOID = 705,
	CIRCLEOID = 718,
	MONEYOID = 790,
	MACADDROID = 829,
	INETOID = 869,
	CIDROID = 650,
	MACADDR8OID = 774,
	ACLITEMOID = 1033,
	BPCHAROID = 1042,
	VARCHAROID = 1043,
	DATEOID = 1082,
	TIMEOID = 1083,
	TIMESTAMPOID = 1114,
	TIMESTAMPTZOID = 1184,
	INTERVALOID = 1186,
	TIMETZOID = 1266,
	BITOID = 1560,
	VARBITOID = 1562,
	NUMERICOID = 1700,
	REFCURSOROID = 1790,
	REGPROCEDUREOID = 2202,
	REGOPEROID = 2203,
	REGOPERATOROID = 2204,
	REGCLASSOID = 2205,
	REGCOLLATIONOID = 4191,
	REGTYPEOID = 2206,
	REGROLEOID = 4096,
	REGNAMESPACEOID = 4089,
	UUIDOID = 2950,
	PG_LSNOID = 3220,
	TSVECTOROID = 3614,
	GTSVECTOROID = 3642,
	TSQUERYOID = 3615,
	REGCONFIGOID = 3734,
	REGDICTIONARYOID = 3769,
	JSONBOID = 3802,
	JSONPATHOID = 4072,
	TXID_SNAPSHOTOID = 2970,
	PG_SNAPSHOTOID = 5038,
	INT4RANGEOID = 3904,
	NUMRANGEOID = 3906,
	TSRANGEOID = 3908,
	TSTZRANGEOID = 3910,
	DATERANGEOID = 3912,
	INT8RANGEOID = 3926,
	INT4MULTIRANGEOID = 4451,
	NUMMULTIRANGEOID = 4532,
	TSMULTIRANGEOID = 4533,
	TSTZMULTIRANGEOID = 4534,
	DATEMULTIRANGEOID = 4535,
	INT8MULTIRANGEOID = 4536,
	RECORDOID = 2249,
	RECORDARRAYOID = 2287,
	CSTRINGOID = 2275,
	ANYOID = 2276,
	ANYARRAYOID = 2277,
	VOIDOID = 2278,
	TRIGGEROID = 2279,
	EVENT_TRIGGEROID = 3838,
	LANGUAGE_HANDLEROID = 2280,
	INTERNALOID = 2281,
	ANYELEMENTOID = 2283,
	ANYNONARRAYOID = 2776,
	ANYENUMOID = 3500,
	FDW_HANDLEROID = 3115,
	INDEX_AM_HANDLEROID = 325,
	TSM_HANDLEROID = 3310,
	TABLE_AM_HANDLEROID = 269,
	ANYRANGEOID = 3831,
	ANYCOMPATIBLEOID = 5077,
	ANYCOMPATIBLEARRAYOID = 5078,
	ANYCOMPATIBLENONARRAYOID = 5079,
	ANYCOMPATIBLERANGEOID = 5080,
	ANYMULTIRANGEOID = 4537,
	ANYCOMPATIBLEMULTIRANGEOID = 4538,
	PG_BRIN_BLOOM_SUMMARYOID = 4600,
	PG_BRIN_MINMAX_MULTI_SUMMARYOID = 4601,
	BOOLARRAYOID = 1000,
	BYTEAARRAYOID = 1001,
	CHARARRAYOID = 1002,
	NAMEARRAYOID = 1003,
	INT8ARRAYOID = 1016,
	INT2ARRAYOID = 1005,
	INT2VECTORARRAYOID = 1006,
	INT4ARRAYOID = 1007,
	REGPROCARRAYOID = 1008,
	TEXTARRAYOID = 1009,
	OIDARRAYOID = 1028,
	TIDARRAYOID = 1010,
	XIDARRAYOID = 1011,
	CIDARRAYOID = 1012,
	OIDVECTORARRAYOID = 1013,
	PG_TYPEARRAYOID = 210,
	PG_ATTRIBUTEARRAYOID = 270,
	PG_PROCARRAYOID = 272,
	PG_CLASSARRAYOID = 273,
	JSONARRAYOID = 199,
	XMLARRAYOID = 143,
	XID8ARRAYOID = 271,
	POINTARRAYOID = 1017,
	LSEGARRAYOID = 1018,
	PATHARRAYOID = 1019,
	BOXARRAYOID = 1020,
	POLYGONARRAYOID = 1027,
	LINEARRAYOID = 629,
	FLOAT4ARRAYOID = 1021,
	FLOAT8ARRAYOID = 1022,
	CIRCLEARRAYOID = 719,
	MONEYARRAYOID = 791,
	MACADDRARRAYOID = 1040,
	INETARRAYOID = 1041,
	CIDRARRAYOID = 651,
	MACADDR8ARRAYOID = 775,
	ACLITEMARRAYOID = 1034,
	BPCHARARRAYOID = 1014,
	VARCHARARRAYOID = 1015,
	DATEARRAYOID = 1182,
	TIMEARRAYOID = 1183,
	TIMESTAMPARRAYOID = 1115,
	TIMESTAMPTZARRAYOID = 1185,
	INTERVALARRAYOID = 1187,
	TIMETZARRAYOID = 1270,
	BITARRAYOID = 1561,
	VARBITARRAYOID = 1563,
	NUMERICARRAYOID = 1231,
	REFCURSORARRAYOID = 2201,
	REGPROCEDUREARRAYOID = 2207,
	REGOPERARRAYOID = 2208,
	REGOPERATORARRAYOID = 2209,
	REGCLASSARRAYOID = 2210,
	REGCOLLATIONARRAYOID = 4192,
	REGTYPEARRAYOID = 2211,
	REGROLEARRAYOID = 4097,
	REGNAMESPACEARRAYOID = 4090,
	UUIDARRAYOID = 2951,
	PG_LSNARRAYOID = 3221,
	TSVECTORARRAYOID = 3643,
	GTSVECTORARRAYOID = 3644,
	TSQUERYARRAYOID = 3645,
	REGCONFIGARRAYOID = 3735,
	REGDICTIONARYARRAYOID = 3770,
	JSONBARRAYOID = 3807,
	JSONPATHARRAYOID = 4073,
	TXID_SNAPSHOTARRAYOID = 2949,
	PG_SNAPSHOTARRAYOID = 5039,
	INT4RANGEARRAYOID = 3905,
	NUMRANGEARRAYOID = 3907,
	TSRANGEARRAYOID = 3909,
	TSTZRANGEARRAYOID = 3911,
	DATERANGEARRAYOID = 3913,
	INT8RANGEARRAYOID = 3927,
	INT4MULTIRANGEARRAYOID = 6150,
	NUMMULTIRANGEARRAYOID = 6151,
	TSMULTIRANGEARRAYOID = 6152,
	TSTZMULTIRANGEARRAYOID = 6153,
	DATEMULTIRANGEARRAYOID = 6155,
	INT8MULTIRANGEARRAYOID = 6157,
	CSTRINGARRAYOID = 1263;

const pset = {};
let PSQLexec;

export async function describe(cmd, dbName, runQuery, sversion = 140000, std_strings = 1) {  // cmd should be: `\dxxx xxxxx xxxxx`
	PSQLexec = sql => runQuery(trimTrailingNull(sql));
	pset.sversion = sversion;
	pset.db = {
		dbName,
		sversion,
		std_strings,
		status: CONNECTION_OK,
		encoding: PG_UTF8
	};  // PGconn struct
	pset.popt = {  // print options
		topt: {},
		nullPrint: '',
	};
	const match = cmd.match(/^\\(d\S*)(.*)/);
	if (!match) {
		console.log(`unsupported describe command: ${cmd}`);
		return null;
	}
	let [, dCmd, remaining] = match;
	dCmd += '\0';
	remaining += '\0';

	const scan_state = [remaining, 0];
	const result = await exec_command_d(scan_state, true, dCmd);
	// TODO: implement \?, \h, etc.
	if (result === PSQL_CMD_UNKNOWN) console.log(`invalid command \\${dCmd}\ntry \\? for help.`);
}

function gettext_noop(x) { return x; }

function strchr(str, chr) {
	return strstr(str, chr);
}

function strstr(str1, str2) {  // this is not a fully general implementation, but it usually works
	const index = str1.indexOf(trimTrailingNull(str2));
	return index === -1 ? NULL : index;
}

function strlen(str) {
	const nullIndex = str.indexOf('\0');
	return nullIndex === -1 ? str.length : nullIndex;
}

function strcmp(s1, s2) {
	return strncmp(s1, s2, Infinity);
}

function strncmp(s1, s2, n) {
	if (typeof s1 !== 'string' || typeof s2 !== 'string') throw new Error('Not a string');
	s1 = trimTrailingNull(s1);
	if (s1.length > n) s1 = s1.slice(0, n);
	s2 = trimTrailingNull(s2);
	if (s2.length > n) s2 = s2.slice(0, n);
	return s1 < s2 ? -1 : s1 > s2 ? 1 : 0;
}

function strspn(str, chrs) {
	const len = strlen(str);
	for (let i = 0; i < len; i++) {
		if (chrs.indexOf(str[i]) === -1) return i;
	}
	return len;
}

function atoi(str) {
	return parseInt(str, 10);
}

function atooid(str) {
	return parseInt(str, 10);
}

function pg_strdup(str) {
	return str;
}

function isWhitespace(chr) {
	return chr === ' ' || chr === '\t' || chr === '\n' || chr === '\r';
}

function isQuote(chr) {
	return chr === '"' || chr === "'";
}

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
	if (field_name == NULL || field_name[0] == '\0') return -1;

	/*
	 * Note: this code will not reject partially quoted strings, eg
	 * foo"BAR"foo will become fooBARfoo when it probably ought to be an error
	 * condition.
	 */
	
	in_quotes = false;
	optr = '';
	for (iptr = 0, len = strlen(field_name); iptr < len; iptr++) {
		let	c = field_name[iptr];

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
	optr += '\0';

	for (i = 0, len = PQnfields(res); i < len; i++) {
		if (strcmp(optr, PQfname(res, i)) == 0) {
			return i;
		}
	}
	
	return -1;
}

function pg_wcswidth(pwcs, len, encoding) {
	return len;
}

function sizeof(x) {
	return 0;
}

function _(str) {
	return str;
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
	if (type !== OT_NORMAL) throw new Error(`scan type ${type} not yet implemented`);
	if (quote !== NULL) throw new Error('cannot return quote type');

	const quoteStack = [];
	const resultRe = semicolon ? /^(.*);*$/ : /^(.*)$/;
	let chr;

	// trim leading whitespace
	for (; ;) {
		chr = scan_state[0][scan_state[1]];  // => str[index]
		if (chr === '\0') return NULL;
		if (!isWhitespace(chr)) break;
		scan_state[1]++;
	}

	// parse for \0 or next unquoted whitespace or \0
	let result = '';
	while (chr = scan_state[0][scan_state[1]++]) {  // => str[index++]
		if (chr === '\0') {
			if (quoteStack.length > 0) return NULL;
			return result.match(resultRe)[1] + '\0';
		}

		if (isQuote(chr)) {
			if (chr === quoteStack[quoteStack.length - 1]) quoteStack.pop();
			else quoteStack.push(chr);
			if (chr === '"') result += chr;  // ' is not passed through

		} else {
			if (quoteStack.length === 0 && isWhitespace(chr)) {
				return result.match(resultRe)[1] + '\0';
			}
			result += chr;
		}
	}

	return NULL;
}

function initPQExpBuffer(buf) {
	buf.data = '\0';
	buf.len = 0;
}
function enlargePQExpBuffer() { return 1; }
function termPQExpBuffer() { }
function PQclear() { }
function free() { }

function trimTrailingNull(str) {
	const nullIndex = str.indexOf('\0');
	if (nullIndex !== -1) return str.slice(0, nullIndex);
	return str;
}

function appendPQExpBufferStr(buf, str) {
	buf.data = trimTrailingNull(buf.data) + trimTrailingNull(str) + '\0';
	buf.len = buf.data.length - 1; // assume (and omit counting) trailing null
}

function sprintf(template, ...values) {
	let result = '';
	let valuesIndex = 0;
	let chrIndex = 0;
	let nextChrIndex;
	while ((nextChrIndex = template.indexOf('%', chrIndex)) !== -1) {
		result += template.slice(chrIndex, nextChrIndex);
		chrIndex = nextChrIndex + 1;
		let pcChr = template[chrIndex++];
		if (pcChr === '*') pcChr = template[chrIndex++];  // skip a *
		if (pcChr === '%') result += '%';
		else if (pcChr === 's' || pcChr === 'c' || pcChr === 'd' || pcChr === 'u') result += trimTrailingNull(String(values[valuesIndex++]));
		else throw new Error(`Unsupported sprintf placeholder: %${pcChr}`);
	}
	result += template.slice(chrIndex);
	result = trimTrailingNull(result) + '\0';
	return result;
}

function printfPQExpBuffer(buf, template, ...values) {
	initPQExpBuffer(buf);
	appendPQExpBuffer(buf, template, ...values);
}

function appendPQExpBuffer(buf, template, ...values) {
	const str = sprintf(template, ...values);
	appendPQExpBufferStr(buf, str);
}

function pg_log_error(template, ...args) {
	console.error(sprintf(template, ...args));
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
	if (have_where && have_where.value) have_where = have_where.value;

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
	termPQExpBuffer(dbbuf);
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

	termPQExpBuffer(schemabuf);
	termPQExpBuffer(namebuf);

	return added_clause;
}

function appendPQExpBufferChar(str, ch) {
	str.data = trimTrailingNull(str.data) + ch + '\0';
	str.len++;
}

/*
 * Convert a string value to an SQL string literal and append it to
 * the given buffer.  We assume the specified client_encoding and
 * standard_conforming_strings settings.
 *
 * This is essentially equivalent to libpq's PQescapeStringInternal,
 * except for the output buffer structure.  We need it in situations
 * where we do not have a PGconn available.  Where we do,
 * appendStringLiteralConn is a better choice.
 */
function appendStringLiteral(buf, str, encoding, std_strings) {
	const escaped = str.replace((std_strings ? /[']/g : /['\\]/g), '\\$&');
	buf.data = trimTrailingNull(buf.data) + "'" + trimTrailingNull(escaped) + "'\0";
	buf.len = buf.data.length - 1;
}

/*
 * Convert a string value to an SQL string literal and append it to
 * the given buffer.  Encoding and string syntax rules are as indicated
 * by current settings of the PGconn.
 */
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

function Assert(cond) {
	if (!cond) throw new Error(`Assertion failed (value: ${cond})`);
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

function exit(exitcode) {
	console.error(`Exited (code: ${exitcode})`);
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
	while ((ch = cp[cpIndex]) !== '\0') {
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
				strchr("|*+?()[]{}.^$\\", ch))
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
		termPQExpBuffer(curbuf);
		curbuf = buf[--bufIndex];
	}

	if (schemabuf && bufIndex >= 0) {
		appendPQExpBufferStr(schemabuf, curbuf.data);
		termPQExpBuffer(curbuf);
		curbuf = buf[--bufIndex];
	}

	if (dbnamebuf && bufIndex >= 0) {
		if (want_literal_dbname)
			appendPQExpBufferStr(dbnamebuf, left_literal.data);
		else
			appendPQExpBufferStr(dbnamebuf, curbuf.data);
		termPQExpBuffer(curbuf);
	}

	if (want_literal_dbname)
		termPQExpBuffer(left_literal);
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
		let footer;
		let footerIndex = 0;
		for (footer = opt.footers[footerIndex]; footer; footerIndex++)
			printTableAddFooter(cont, footer);
	}

	printTable(cont, fout, is_pager, flog);
	printTableCleanup(cont);
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

	//content.headerIndex = 0;
	content.headers = [];  // pg_malloc0((ncolumns + 1) * sizeof(content.headers));

	//content.cellsIndex = 0;
	content.cells = [];  // pg_malloc0((ncolumns * nrows + 1) * sizeof(content.cells));

	// content.cellmustfree = NULL;
	content.footers = NULL;

	// content.alignsIndex = 0;
	content.aligns = [];  // pg_malloc0((ncolumns + 1) * sizeof(content.align));

	//content.header = content.headers[content.headerIndex];

	//content.cell = content.cells[content.cellsIndex];
	//content.footer = content.footers;
	//content.align = content.aligns[content.alignsIndex];
	//content.cellsadded = 0;
}

function printTableAddHeader(content, header, translate, align) {
	// if (content.headerIndex >= content.ncolumns) {
	// 	fprintf(stderr, _("Cannot add header to table content: column count of %d exceeded.\n"), content.ncolumns);
	// 	exit(EXIT_FAILURE);
	// }

	if (translate) header = _(header);
	//content.header = content.headers[content.headerIndex] = header;
	//content.headerIndex++;
	content.headers.push(header);

	//content.align = content.aligns[content.alignsIndex] = align;
	//content.alignsIndex++;
	content.aligns.push(align);
}

function printTableAddCell(content, cell, translate, mustfree) {
	// if (content.cellsadded >= content.ncolumns * content.nrows) {
	// 	fprintf(stderr, _("Cannot add cell to table content: total cell count of %d exceeded.\n"), content.ncolumns * content.nrows);
	// 	exit(EXIT_FAILURE);
	// }

	// if (translate) cell = _(cell);
	// content.cell = content.cells[content.cellsIndex] = cell;

	// content.cellsIndex++;
	// content.cellsadded++;
	if (translate) cell = _(cell);
	content.cells.push(cell);
}

function printTableAddFooter(content, footer) {
	if (content.footers == NULL) content.footers = [];
	content.footers.push(footer);
}

function stripnulls(obj) {
	if (Array.isArray(obj)) for (let i = 0, len = obj.length; i < len; i++) obj[i] = stripnulls(obj[i]);
	else if (typeof obj === 'object' && obj !== null) for (let i in obj) obj[i] = stripnulls(obj[i]);
	else if (typeof obj === 'string') return trimTrailingNull(obj);
	return obj;
}

function printTable(cont, fout, is_pager, flog) {
	console.log(JSON.stringify(stripnulls(cont), null, 2));
}

function printTableCleanup(content) { }


import pg from 'pg';
const raw = x => x;
for (let b in pg.types.builtins) pg.types.setTypeParser(pg.types.builtins[b], raw);

const
	pool = new pg.Pool({ connectionString: 'postgres://localhost:5435/main' }),
	queryFn = async sql => {
		console.log(`********* QUERY **********\n${sql}\n**************************`);
		const result = await pool.query({ text: sql, rowMode: 'array' });
		// console.log(`********* RESULT **********\n${JSON.stringify(result, null, 2)}\n**************************`);
		return result;
	};

await describe(process.argv[2], 'main', queryFn);

await pool.end();

