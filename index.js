const Kt=0,Vt=null,$t=100,bt="E",Gt=0,Xt=0,Zt=1,en=0,an=2,tn=5,nn=0,sn=4,ln=6,rn=0,on=1,yt="b",Dt="i",Ut="a",ht="e",wt="\
r",Ct="S",It="f",Ht="T",Ft="n",vt="a",Wt="d",kt="s",oe="r",me="i",xt="S",Fe="t",ve="v",le="m",ea="c",pe="f",te="p",ce="I",
pn=20,cn=21,gn=23,fn=26,_n=28,dn=29,un=5069,En=700,Nn=701,Ln=790,mn=1700,Pt=`Help
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
`;export function describeDataToString(_){return typeof _=="string"?_:qt(_)}export function describeDataToHtml(_){return typeof _==
"string"?`<p>${de(_,!0)}</p>`:Jt(_)}export function describe(_,O,R,H,P=!1,B=null,J=1){let j=!1;function X(){j=!0,H=()=>{}}
function Ne(){if(j)throw new Error("cancelled")}async function fe(){const De=_.match(/^\\([?dzsl]\S*)(.*)/);if(!De)return H(
`unsupported command: ${_}`),!1;let[,Z,Ue]=De;if(Z=Z.replace(/^lo_list/,"dl"),Z=Z.replace(/^z/,"dp"),Z[0]==="?")return H(
Pt),!1;const A=async(i,l=!1)=>{Ne(),P&&!l&&H(`/******** QUERY *********/
${i}
/************************/`);const t=await R(i);return Ne(),t};let p;try{if(!B){const n=await A("SHOW server_version_num",
!0);B=parseInt(n.rows[0][0],10)}p={sversion:B,db:{dbName:O,sversion:B,std_strings:J,status:0,encoding:6},popt:{topt:{default_footer:!0},
nullPrint:""}};const i=[Ue,0];await(Z[0]==="d"?ha(i,!0,Z):Z[0]==="s"?Z[1]==="f"||Z[1]==="v"?Ta(i,!0,Z,Z[1]==="f"):0:Ua(i,
!0,Z))==0&&H(`invalid command \\${Z}`);let t,a=[];for(;t=Te(i,0,null,!0);)a.push(G('\\%s: extra argument "%s" ignored',Z,
t));a.length>0&&H(a.join(`
`))}catch(i){return H("ERROR:  "+i.message),j?null:!1}function M(i,...l){H(G(i,...l))}function U(i,l,t,a,n,e,o,L,d,c){let b={},
T={},S;if(D(b),S=ie(p.db,i,l,t,a,n,e,o,L,b,T),T=T.value,d&&(d.value=S),T>=c)return M("improper qualified name (too many \
dotted names): %s",l),!1;if(c>1&&T==c-1){if(Na(p.db)==null)return M("You are currently not connected to a database."),!1;
if(C(Na(p.db),b.data)!=0)return M("cross-database references are not implemented: %s",l),!1}return!0}function ie(i,l,t,a,n,e,o,L,d,c,b){
let T={},S={},I=!1;return b||(b={}),b.value=0,t==null?(d&&(r(l,a?"  AND ":"WHERE "),a=!0,I=!0,E(l,`%s
`,d)),I):(D(T),D(S),ke(La(i),e?c:null,e?T:null,S,t,n,!0,b),o&&S.len>2&&C(S.data,"^(.*)$")!=0&&(r(l,a?"  AND ":"WHERE "),
a=!0,I=!0,L?(E(l,"(%s OPERATOR(pg_catalog.~) ",o),ye(l,S.data,i),We(i)>=12e4&&r(l," COLLATE pg_catalog.default"),E(l,`
        OR %s OPERATOR(pg_catalog.~) `,L),ye(l,S.data,i),We(i)>=12e4&&r(l," COLLATE pg_catalog.default"),r(l,`)
`)):(E(l,"%s OPERATOR(pg_catalog.~) ",o),ye(l,S.data,i),We(i)>=12e4&&r(l," COLLATE pg_catalog.default"),Y(l,`
`))),e&&T.len>2?C(T.data,"^(.*)$")!=0&&e&&(r(l,a?"  AND ":"WHERE "),a=!0,I=!0,E(l,"%s OPERATOR(pg_catalog.~) ",e),ye(l,T.
data,i),We(i)>=12e4&&r(l," COLLATE pg_catalog.default"),Y(l,`
`)):d&&(r(l,a?"  AND ":"WHERE "),a=!0,I=!0,E(l,`%s
`,d)),I)}function ke(i,l,t,a,n,e,o,L){let d=[{},{},{}],c=0,b={},T={},S={},I,w,re;Re(n),Re(a),Re(!l||t),Re(L),L.value=0,I=
!1,re=n,l?S=2:t?S=1:S=0,T=d[c],o?(w=!0,D(b)):w=!1,D(T),r(T,"^(");let $=0,W;for(;(W=re[$])!=null;)W=='"'?(I&&re[$+1]=='"'?
(Y(T,'"'),w&&Y(b,'"'),$++):I=!I,$++):!I&&jt(W)?(Y(T,ta(W)),w&&Y(b,ta(W)),$++):!I&&W=="*"?(r(T,".*"),w&&Y(b,"*"),$++):!I&&
W=="?"?(Y(T,"."),w&&Y(b,"?"),$++):!I&&W=="."?(w=!1,L.value++,c<S?(r(T,")$"),T=d[++c],D(T),r(T,"^("),$++):(Y(T,W),$++)):W==
"$"?(r(T,"\\$"),w&&Y(b,"$"),$++):(((I||e)&&K("|*+?()[]{}.^$\\",W)!=null||W=="["&&re[$+1]=="]")&&Y(T,"\\"),w&&Y(b,W),Y(T,
W),$++);r(T,")$"),a&&(r(a,T.data),T=d[--c]),t&&c>=0&&(r(t,T.data),T=d[--c]),l&&c>=0&&(o?r(l,b.data):r(l,T.data))}function xe(i){
let l;switch(i){case 21:case 23:case 20:case 700:case 701:case 1700:case 26:case 28:case 5069:case 29:case 790:l="r";break;default:
l="l";break}return l}function k(i,l,t,a,n){let e={},o,L,d;for(Pe(e,l.topt,l.title,ma(i),x(i)),Re(l.translate_columns==null||
l.translate_columns==null||l.n_translate_columns>=e.ncolumns),o=0;o<e.ncolumns;o++)se(e,Sa(i,o),l.translate_header,xe(Qt(
i,o)));for(L=0;L<e.nrows;L++)for(d=0;d<e.ncolumns;d++){let c,b=!1,T;ee(i,L,d)?c=l.nullPrint?l.nullPrint:"":(c=f(i,L,d),e.
aligns[d]=="r"&&l.topt.numericLocale&&(c=format_numeric_locale(c),b=!0)),T=l.translate_columns&&l.translate_columns[d],Q(
e,c,T,b)}if(l.footers)for(let c of l.footers)F(e,c);Me(e,t,a,n)}function Pe(i,l,t,a,n){i.opt=l,i.title=t,i.ncolumns=a,i.
nrows=n,i.headers=[],i.cells=[],i.footers=null,i.aligns=[]}function se(i,l,t,a){t&&(l=N(l)),i.headers.push(l),i.header=l,
i.aligns.push(a),i.align=a}function Q(i,l,t,a){t&&(l=N(l)),i.cells.push(l),i.cell=l}function F(i,l){i.footers==null&&(i.
footers=[]),i.footers.push(l),i.footer=l}function Aa(i,l){i.footers&&i.footers.pop(),F(i,l)}function Me(i,l,t,a){H({...i})}
async function Ta(i,l,t,a){let n=2,e=K(t,"+")!=null,o={},L,d={value:0},c=a?0:1;return D(o),L=Te(i,4,null,!0),L?await Ra(
c,L,d)&&await ba(c,d.value,o)?e?Oa(o.data,a):H(o.data):n=5:(M(a?"function name is required":"view name is required"),n=5),
n}function Oa(i,l){let t=l,a=0,n="";i=i.trimEnd().split(`
`);for(let e of i)t&&(be(e,"AS ",3)==0||be(e,"BEGIN ",6)==0||be(e,"RETURN ",7)==0)&&(t=!1),t||a++,t?n+=G(`        %s
`,e):n+=G(`%-7d %s
`,a,e);H(n)}async function Ra(i,l,t){let a=!0,n={};D(n);let e;switch(i){case 0:r(n,"SELECT "),ye(n,l,p.db),E(n,"::pg_cat\
alog.%s::pg_catalog.oid",K(l,"(")!==null?"regprocedure":"regproc");break;case 1:r(n,"SELECT "),ye(n,l,p.db),r(n,"::pg_ca\
talog.regclass::pg_catalog.oid");break}try{e=await A(n.data),e&&x(e)==1?t.value=aa(f(e,0,0)):(M("Error when querying"),a=
!1)}catch(o){M("ERROR:  "+o.message),a=!1}return a}async function ba(i,l,t){let a=!0,n={};D(n);let e;switch(i){case 0:u(
n,"SELECT pg_catalog.pg_get_functiondef(%u)",l);break;case 1:p.sversion>=90400?u(n,"SELECT nspname, relname, relkind, pg\
_catalog.pg_get_viewdef(c.oid, true), pg_catalog.array_remove(pg_catalog.array_remove(c.reloptions,'check_option=local')\
,'check_option=cascaded') AS reloptions, CASE WHEN 'check_option=local' = ANY (c.reloptions) THEN 'LOCAL'::text WHEN 'ch\
eck_option=cascaded' = ANY (c.reloptions) THEN 'CASCADED'::text ELSE NULL END AS checkoption FROM pg_catalog.pg_class c \
LEFT JOIN pg_catalog.pg_namespace n ON c.relnamespace = n.oid WHERE c.oid = %u",l):u(n,"SELECT nspname, relname, relkind\
, pg_catalog.pg_get_viewdef(c.oid, true), c.reloptions AS reloptions, NULL AS checkoption FROM pg_catalog.pg_class c LEF\
T JOIN pg_catalog.pg_namespace n ON c.relnamespace = n.oid WHERE c.oid = %u",l);break}if(e=await A(n.data),e&&x(e)==1){switch(na(
t),i){case 0:r(t,f(e,0,0));break;case 1:let o=f(e,0,0),L=f(e,0,1),d=f(e,0,2),c=f(e,0,3),b=f(e,0,4),T=f(e,0,5);switch(d[0]){case ve:
r(t,"CREATE OR REPLACE VIEW ");break;default:M('"%s.%s" is not a view',o,L),a=!1;break}E(t,"%s.",Oe(o)),r(t,Oe(L)),b!=null&&
ge(b)>2&&(r(t,`
 WITH (`),ya(t,b,"",p.encoding,p.db.standard_strings)||(M("could not parse reloptions array"),a=!1),Y(t,")")),E(t,` AS
%s`,c),t.len>0&&t.data[t.len-1]==";"&&(t.data=t.data.slice(0,t.len-1)),T&&T[0]!=null&&E(t,`
 WITH %s CHECK OPTION`,T);break}t.len>0&&t.data[t.len-1]!=`
`&&Y(t,`
`)}else M("Error when querying"),a=!1;return a}function ya(i,l,t,a,n){let e=[],o={},L;if(!Da(l,e,o))return!1;for(o=o.value,
L=0;L<o;L++){let d=e[L],[c,b]=d.split("=");b??(b=""),L>0&&r(i,", "),E(i,"%s%s=",t,Oe(c)),C(Oe(b),b)==0?r(i,b):sa(i,b,a,n)}
return!0}function Da(i,l,t){let a,n,e;if(a=ge(i),t.value=0,a<2||i[0]!="{"||i[a-1]!="}")return!1;let o=0;for(o++,e=0;i[o]!=
"}";){if(i[o]==null)return!1;for(n="";i[o]!="}"&&i[o]!=",";){if(i[o]==null)return!1;if(i[o]!='"')n+=i[o++];else{for(o++;i[o]!=
'"';){if(i[o]==null||i[o]=="\\"&&(o++,i[o]==null))return!1;n+=i[o++]}o++}}l[e]=n,i[o]==","&&o++,e++}return i[o+1]&&i[o+1]!=
null?!1:(t.value=e,!0)}function Oe(i){let l={};D(l);let t=!1;return i[0]>="a"&&i[0]<="z"||i[0]=="_"?/[^a-z0-9_]/.test(i)&&
(t=!0):t=!0,t||new Set(["all","analyse","analyze","and","any","array","as","asc","asymmetric","authorization","between",
"bigint","binary","bit","boolean","both","case","cast","char","character","check","coalesce","collate","collation","colu\
mn","concurrently","constraint","create","cross","current_catalog","current_date","current_role","current_schema","curre\
nt_time","current_timestamp","current_user","dec","decimal","default","deferrable","desc","distinct","do","else","end","\
except","exists","extract","false","fetch","float","for","foreign","freeze","from","full","grant","greatest","group","gr\
ouping","having","ilike","in","initially","inner","inout","int","integer","intersect","interval","into","is","isnull","j\
oin","json","json_array","json_arrayagg","json_object","json_objectagg","json_scalar","json_serialize","lateral","leadin\
g","least","left","like","limit","localtime","localtimestamp","national","natural","nchar","none","normalize","not","not\
null","null","nullif","numeric","offset","on","only","or","order","out","outer","overlaps","overlay","placing","position",
"precision","primary","real","references","returning","right","row","select","session_user","setof","similar","smallint",
"some","substring","symmetric","system_user","table","tablesample","then","time","timestamp","to","trailing","treat","tr\
im","true","union","unique","user","using","values","varchar","variadic","verbose","when","where","window","with","xmlat\
tributes","xmlconcat","xmlelement","xmlexists","xmlforest","xmlnamespaces","xmlparse","xmlpi","xmlroot","xmlserialize","\
xmltable"]).has(i)&&(t=!0),t?(Y(l,'"'),Y(l,i.replace(/"/g,'""')),Y(l,'"')):r(l,i),l.data}async function Ua(i,l,t){let a,
n,e;return n=Te(i,0,null,!0),e=K(t,"+")!=null,a=await wa(n,e),a?2:5}async function ha(i,l,t){let a=2,n=!0,e,o,L;switch(e=
Te(i,0,null,!0),o=K(t,"+")!=null,L=K(t,"S")!=null,t[1]){case void 0:case"+":case"S":e?n=await Ma(e,o,L):n=await pa("tvms\
E",null,o,L);break;case"A":{let d=null;switch(e&&t[2]!=null&&t[2]!="+"&&(d=Te(i,0,null,!0)),t[2]){case void 0:case"+":n=
await Ia(e,o);break;case"c":n=await Lt(e,d,o);break;case"f":n=await mt(e,d,o);break;case"o":n=await St(e,d,o);break;case"\
p":n=await At(e,d,o);break;default:a=0;break}}break;case"a":n=await Ca(e,o,L);break;case"b":n=await Ha(e,o);break;case"c":
be(t,"dconfig",7)==0?n=await Ka(e,o,L):n=await Qa(e,o,L);break;case"C":n=await Ga(e,o);break;case"d":be(t,"ddp",3)==0?n=
await xa(e):n=await Pa(e,L);break;case"D":n=await za(e,o,L);break;case"f":switch(t[2]){case void 0:case"+":case"S":case"\
a":case"n":case"p":case"t":case"w":n=await ra(i,t,e,o,L);break;default:a=0;break}break;case"g":n=await oa(e,o,L);break;case"\
l":n=await Tt(o);break;case"L":n=await ja(e,o,L);break;case"n":n=await Za(e,o,L);break;case"o":n=await ra(i,t,e,o,L);break;case"\
O":n=await Xa(e,o,L);break;case"p":n=await ka(e,L);break;case"P":switch(t[2]){case void 0:case"+":case"t":case"i":case"n":
n=await Ba(t.slice(2),e,o);break;default:a=0;break}break;case"T":n=await va(e,o,L);break;case"t":case"v":case"m":case"i":case"\
s":case"E":n=await pa(t[1],e,o,L);break;case"r":if(t[2]=="d"&&t[3]=="s"){let d=null;e&&(d=Te(i,0,null,!0)),n=await Ja(e,
d)}else t[2]=="g"?n=await Ya(e,L):a=0;break;case"R":switch(t[2]){case"p":o?n=await Et(e):n=await ut(e);break;case"s":n=await Nt(
e,o);break;default:a=0}break;case"u":n=await oa(e,o,L);break;case"F":switch(t[2]){case void 0:case"+":n=await lt(e,o);break;case"\
p":n=await et(e,o);break;case"d":n=await nt(e,o);break;case"t":n=await st(e,o);break;default:a=0;break}break;case"e":switch(t[2]){case"\
s":n=await pt(e,o);break;case"u":n=await ct(e,o);break;case"w":n=await ot(e,o);break;case"t":n=await gt(e,o);break;default:
a=0;break}break;case"x":o?n=await _t(e):n=await ft(e);break;case"X":n=await $a(e);break;case"y":n=await Va(e,o);break;default:
a=0}return n||(a=5),a}async function ra(i,l,t,a,n){let e,o=[],L=0;if(t){let d;for(;(d=Te(i,0,null,!0))!=null&&(o[L++]=d,
!(L>=100)););}return l[1]=="f"?e=await Fa(l.slice(2),t,o,L,a,n):e=await Wa(t,o,L,a,n),e}async function wa(i,l){let t,a={},
n=p.popt;return D(a),u(a,`SELECT
  d.datname as "%s",
  pg_catalog.pg_get_userbyid(d.datdba) as "%s",
  pg_catalog.pg_encoding_to_char(d.encoding) as "%s",
`,s("Name"),s("Owner"),s("Encoding")),p.sversion>=15e4?E(a,`  CASE d.datlocprovider WHEN 'c' THEN 'libc' WHEN 'i' THEN '\
icu' END AS "%s",
`,s("Locale Provider")):E(a,`  'libc' AS "%s",
`,s("Locale Provider")),E(a,`  d.datcollate as "%s",
  d.datctype as "%s",
`,s("Collate"),s("Ctype")),p.sversion>=15e4?E(a,`  d.daticulocale as "%s",
`,s("ICU Locale")):E(a,`  NULL as "%s",
`,s("ICU Locale")),p.sversion>=16e4?E(a,`  d.daticurules as "%s",
`,s("ICU Rules")):E(a,`  NULL as "%s",
`,s("ICU Rules")),r(a,"  "),ne(a,"d.datacl"),l&&E(a,`,
  CASE WHEN pg_catalog.has_database_privilege(d.datname, 'CONNECT')
       THEN pg_catalog.pg_size_pretty(pg_catalog.pg_database_size(d.datname))
       ELSE 'No Access'
  END as "%s",
  t.spcname as "%s",
  pg_catalog.shobj_description(d.oid, 'pg_database') as "%s"`,s("Size"),s("Tablespace"),s("Description")),r(a,`
FROM pg_catalog.pg_database d
`),l&&r(a,`  JOIN pg_catalog.pg_tablespace t on d.dattablespace = t.oid
`),i&&!U(a,i,!1,!1,null,"d.datname",null,null,null,1)||(r(a,"ORDER BY 1;"),t=await A(a.data),!t)?!1:(n.nullPrint=null,n.
title=N("List of databases"),n.translate_header=!0,k(t,n,p.queryFout,!1,p.logfile),!0)}async function Ca(i,l,t){let a={},
n,e=p.popt;return D(a),u(a,`SELECT n.nspname as "%s",
  p.proname AS "%s",
  pg_catalog.format_type(p.prorettype, NULL) AS "%s",
  CASE WHEN p.pronargs = 0
    THEN CAST('*' AS pg_catalog.text)
    ELSE pg_catalog.pg_get_function_arguments(p.oid)
  END AS "%s",
`,s("Schema"),s("Name"),s("Result data type"),s("Argument data types")),p.sversion>=11e4?E(a,`  pg_catalog.obj_descripti\
on(p.oid, 'pg_proc') as "%s"
FROM pg_catalog.pg_proc p
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = p.pronamespace
WHERE p.prokind = 'a'
`,s("Description")):E(a,`  pg_catalog.obj_description(p.oid, 'pg_proc') as "%s"
FROM pg_catalog.pg_proc p
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = p.pronamespace
WHERE p.proisagg
`,s("Description")),!t&&!i&&r(a,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!U(a,i,!0,!1,"n.nspname","p.proname",null,"pg_catalog.pg_function_is_visible(p.oid)",null,3)||(r(a,"ORDER BY 1, 2, 4;"),
n=await A(a.data),!n)?!1:(e.nullPrint=null,e.title=N("List of aggregate functions"),e.translate_header=!0,k(n,e,p.queryFout,
!1,p.logfile),!0)}async function Ia(i,l){let t={},a,n=p.popt,e=[!1,!0,!1,!1];if(p.sversion<90600){let o;return M("The se\
rver (version %s) does not support access methods.",Ee(p.sversion,!1,o,ue(o))),!0}return D(t),u(t,`SELECT amname AS "%s"\
,
  CASE amtype WHEN 'i' THEN '%s' WHEN 't' THEN '%s' END AS "%s"`,s("Name"),s("Index"),s("Table"),s("Type")),l&&E(t,`,
  amhandler AS "%s",
  pg_catalog.obj_description(oid, 'pg_am') AS "%s"`,s("Handler"),s("Description")),r(t,`
FROM pg_catalog.pg_am
`),!U(t,i,!1,!1,null,"amname",null,null,null,1)||(r(t,"ORDER BY 1;"),a=await A(t.data),!a)?!1:(n.nullPrint=null,n.title=
N("List of access methods"),n.translate_header=!0,n.translate_columns=e,n.n_translate_columns=V(e),k(a,n,p.queryFout,!1,
p.logfile),!0)}async function Ha(i,l){let t={},a,n=p.popt;return D(t),u(t,`SELECT spcname AS "%s",
  pg_catalog.pg_get_userbyid(spcowner) AS "%s",
  pg_catalog.pg_tablespace_location(oid) AS "%s"`,s("Name"),s("Owner"),s("Location")),l&&(r(t,`,
  `),ne(t,"spcacl"),E(t,`,
  spcoptions AS "%s",
  pg_catalog.pg_size_pretty(pg_catalog.pg_tablespace_size(oid)) AS "%s",
  pg_catalog.shobj_description(oid, 'pg_tablespace') AS "%s"`,s("Options"),s("Size"),s("Description"))),r(t,`
FROM pg_catalog.pg_tablespace
`),!U(t,i,!1,!1,null,"spcname",null,null,null,1)||(r(t,"ORDER BY 1;"),a=await A(t.data),!a)?!1:(n.nullPrint=null,n.title=
N("List of tablespaces"),n.translate_header=!0,k(a,n,p.queryFout,!1,p.logfile),!0)}async function Fa(i,l,t,a,n,e){let o=K(
i,"a")!=null,L=K(i,"n")!=null,d=K(i,"p")!=null,c=K(i,"t")!=null,b=K(i,"w")!=null,T,S={},I,w=p.popt,re=[!1,!1,!1,!1,!0,!0,
!0,!1,!0,!1,!1,!1,!1],$=[!1,!1,!1,!1,!0,!0,!1,!0,!1,!1,!1,!1];if(ge(i)!=Yt(i,"anptwS+"))return M("\\df only takes [anptwS\
+] as options"),!0;if(d&&p.sversion<11e4){let W;return M('\\df does not take a "%c" option with server version %s',"p",Ee(
p.sversion,!1,W,ue(W))),!0}!o&&!L&&!d&&!c&&!b&&(o=L=c=b=!0,p.sversion>=11e4&&(d=!0)),D(S),u(S,`SELECT n.nspname as "%s",\

  p.proname as "%s",
`,s("Schema"),s("Name")),p.sversion>=11e4?E(S,`  pg_catalog.pg_get_function_result(p.oid) as "%s",
  pg_catalog.pg_get_function_arguments(p.oid) as "%s",
 CASE p.prokind
  WHEN 'a' THEN '%s'
  WHEN 'w' THEN '%s'
  WHEN 'p' THEN '%s'
  ELSE '%s'
 END as "%s"`,s("Result data type"),s("Argument data types"),s("agg"),s("window"),s("proc"),s("func"),s("Type")):E(S,`  \
pg_catalog.pg_get_function_result(p.oid) as "%s",
  pg_catalog.pg_get_function_arguments(p.oid) as "%s",
 CASE
  WHEN p.proisagg THEN '%s'
  WHEN p.proiswindow THEN '%s'
  WHEN p.prorettype = 'pg_catalog.trigger'::pg_catalog.regtype THEN '%s'
  ELSE '%s'
 END as "%s"`,s("Result data type"),s("Argument data types"),s("agg"),s("window"),s("trigger"),s("func"),s("Type")),n&&(E(
S,`,
 CASE
  WHEN p.provolatile = 'i' THEN '%s'
  WHEN p.provolatile = 's' THEN '%s'
  WHEN p.provolatile = 'v' THEN '%s'
 END as "%s"`,s("immutable"),s("stable"),s("volatile"),s("Volatility")),p.sversion>=90600&&E(S,`,
 CASE
  WHEN p.proparallel = 'r' THEN '%s'
  WHEN p.proparallel = 's' THEN '%s'
  WHEN p.proparallel = 'u' THEN '%s'
 END as "%s"`,s("restricted"),s("safe"),s("unsafe"),s("Parallel")),E(S,`,
 pg_catalog.pg_get_userbyid(p.proowner) as "%s",
 CASE WHEN prosecdef THEN '%s' ELSE '%s' END AS "%s"`,s("Owner"),s("definer"),s("invoker"),s("Security")),r(S,`,
 `),ne(S,"p.proacl"),E(S,`,
 l.lanname as "%s"`,s("Language")),E(S,`,
 CASE WHEN l.lanname IN ('internal', 'c') THEN p.prosrc END as "%s"`,s("Internal name")),E(S,`,
 pg_catalog.obj_description(p.oid, 'pg_proc') as "%s"`,s("Description"))),r(S,`
FROM pg_catalog.pg_proc p
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = p.pronamespace
`);for(let W=0;W<a;W++)E(S,`     LEFT JOIN pg_catalog.pg_type t%d ON t%d.oid = p.proargtypes[%d]
     LEFT JOIN pg_catalog.pg_namespace nt%d ON nt%d.oid = t%d.typnamespace
`,W,W,W,W,W,W);if(n&&r(S,`     LEFT JOIN pg_catalog.pg_language l ON l.oid = p.prolang
`),T=!1,!(L&&o&&d&&c&&b))if(L)o||(T?r(S,"      AND "):(r(S,"WHERE "),T=!0),p.sversion>=11e4?r(S,`p.prokind <> 'a'
`):r(S,`NOT p.proisagg
`)),!d&&p.sversion>=11e4&&(T?r(S,"      AND "):(r(S,"WHERE "),T=!0),r(S,`p.prokind <> 'p'
`)),c||(T?r(S,"      AND "):(r(S,"WHERE "),T=!0),r(S,`p.prorettype <> 'pg_catalog.trigger'::pg_catalog.regtype
`)),b||(T?r(S,"      AND "):(r(S,"WHERE "),T=!0),p.sversion>=11e4?r(S,`p.prokind <> 'w'
`):r(S,`NOT p.proiswindow
`));else{let W=!1;r(S,`WHERE (
       `),T=!0,o&&(p.sversion>=11e4?r(S,`p.prokind = 'a'
`):r(S,`p.proisagg
`),W=!0),c&&(W&&r(S,"       OR "),r(S,`p.prorettype = 'pg_catalog.trigger'::pg_catalog.regtype
`),W=!0),d&&(W&&r(S,"       OR "),r(S,`p.prokind = 'p'
`),W=!0),b&&(W&&r(S,"       OR "),p.sversion>=11e4?r(S,`p.prokind = 'w'
`):r(S,`p.proiswindow
`)),r(S,`      )
`)}if(!U(S,l,T,!1,"n.nspname","p.proname",null,"pg_catalog.pg_function_is_visible(p.oid)",null,3))return!1;for(let W=0;W<
a;W++)if(C(t[W],"-")!=0){let he,we,Ce,Ie;if(he=G("nt%d.nspname",W),we=G("t%d.typname",W),Ce=G("pg_catalog.format_type(t%\
d.oid, NULL)",W),Ie=G("pg_catalog.pg_type_is_visible(t%d.oid)",W),!U(S,Ge(t[W]),!0,!1,he,we,Ce,Ie,null,3))return!1}else E(
S,`  AND t%d.typname IS NULL
`,W);return!e&&!l&&r(S,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),r(S,"ORDER BY 1, 2, 4;"),I=await A(S.data),I?(w.nullPrint=null,w.title=N("List of functions"),w.translate_header=!0,p.
sversion>=90600?(w.translate_columns=re,w.n_translate_columns=V(re)):(w.translate_columns=$,w.n_translate_columns=V($)),
k(I,w,p.queryFout,!1,p.logfile),!0):!1}async function va(i,l,t){let a={},n,e=p.popt;return D(a),u(a,`SELECT n.nspname as\
 "%s",
  pg_catalog.format_type(t.oid, NULL) AS "%s",
`,s("Schema"),s("Name")),l&&(E(a,`  t.typname AS "%s",
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
`,s("Internal name"),s("Size"),s("Elements"),s("Owner")),ne(a,"t.typacl"),r(a,`,
  `)),E(a,`  pg_catalog.obj_description(t.oid, 'pg_type') as "%s"
`,s("Description")),r(a,`FROM pg_catalog.pg_type t
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = t.typnamespace
`),r(a,"WHERE (t.typrelid = 0 "),r(a,`OR (SELECT c.relkind = 'c' FROM pg_catalog.pg_class c WHERE c.oid = t.typrelid))
`),(i==null||Ve(i,"[]")==null)&&r(a,`  AND NOT EXISTS(SELECT 1 FROM pg_catalog.pg_type el WHERE el.oid = t.typelem AND e\
l.typarray = t.oid)
`),!t&&!i&&r(a,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!U(a,Ge(i),!0,!1,"n.nspname","t.typname","pg_catalog.format_type(t.oid, NULL)","pg_catalog.pg_type_is_visible(t.oid)",
null,3)||(r(a,"ORDER BY 1, 2;"),n=await A(a.data),!n)?!1:(e.nullPrint=null,e.title=N("List of data types"),e.translate_header=
!0,k(n,e,p.queryFout,!1,p.logfile),!0)}function Ge(i){let l=["decimal","numeric","float","double precision","int","integ\
er","bool[]","boolean[]","decimal[]","numeric[]","float[]","double precision[]","float4[]","real[]","float8[]","double p\
recision[]","int[]","integer[]","int2[]","smallint[]","int4[]","integer[]","int8[]","bigint[]","time[]","time without ti\
me zone[]","timetz[]","time with time zone[]","timestamp[]","timestamp without time zone[]","timestamptz[]","timestamp w\
ith time zone[]","varbit[]","bit varying[]","varchar[]","character varying[]",null];if(i==null)return null;for(let t=0;l[t]!=
null;t+=2)if(zt(i,l[t])==0)return l[t+1];return i}async function Wa(i,l,t,a,n){let e={},o,L=p.popt;if(D(e),u(e,`SELECT n\
.nspname as "%s",
  o.oprname AS "%s",
  CASE WHEN o.oprkind='l' THEN NULL ELSE pg_catalog.format_type(o.oprleft, NULL) END AS "%s",
  CASE WHEN o.oprkind='r' THEN NULL ELSE pg_catalog.format_type(o.oprright, NULL) END AS "%s",
  pg_catalog.format_type(o.oprresult, NULL) AS "%s",
`,s("Schema"),s("Name"),s("Left arg type"),s("Right arg type"),s("Result type")),a&&E(e,`  o.oprcode AS "%s",
`,s("Function")),E(e,`  coalesce(pg_catalog.obj_description(o.oid, 'pg_operator'),
           pg_catalog.obj_description(o.oprcode, 'pg_proc')) AS "%s"
FROM pg_catalog.pg_operator o
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = o.oprnamespace
`,s("Description")),t>=2?(t=2,r(e,`     LEFT JOIN pg_catalog.pg_type t0 ON t0.oid = o.oprleft
     LEFT JOIN pg_catalog.pg_namespace nt0 ON nt0.oid = t0.typnamespace
     LEFT JOIN pg_catalog.pg_type t1 ON t1.oid = o.oprright
     LEFT JOIN pg_catalog.pg_namespace nt1 ON nt1.oid = t1.typnamespace
`)):t==1&&r(e,`     LEFT JOIN pg_catalog.pg_type t0 ON t0.oid = o.oprright
     LEFT JOIN pg_catalog.pg_namespace nt0 ON nt0.oid = t0.typnamespace
`),!n&&!i&&r(e,`WHERE n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!U(e,i,!n&&!i,!0,"n.nspname","o.oprname",null,"pg_catalog.pg_operator_is_visible(o.oid)",null,3))return!1;t==1&&r(e,`\
  AND o.oprleft = 0
`);for(let d=0;d<t;d++)if(C(l[d],"-")!=0){let c,b,T,S;if(c=G("nt%d.nspname",d),b=G("t%d.typname",d),T=G("pg_catalog.form\
at_type(t%d.oid, NULL)",d),S=G("pg_catalog.pg_type_is_visible(t%d.oid)",d),!U(e,Ge(l[d]),!0,!1,c,b,T,S,null,3))return!1}else
E(e,`  AND t%d.typname IS NULL
`,d);return r(e,"ORDER BY 1, 2, 3, 4;"),o=await A(e.data),o?(L.nullPrint=null,L.title=N("List of operators"),L.translate_header=
!0,k(o,L,p.queryFout,!1,p.logfile),!0):!1}async function ka(i,l){let t={},a,n=p.popt,e=[!1,!1,!0,!1,!1,!1];return D(t),u(
t,`SELECT n.nspname as "%s",
  c.relname as "%s",
  CASE c.relkind WHEN 'r' THEN '%s' WHEN 'v' THEN '%s' WHEN 'm' THEN '%s' WHEN 'S' THEN '%s' WHEN 'f' THEN '%s' WHEN 'p'\
 THEN '%s' END as "%s",
  `,s("Schema"),s("Name"),s("table"),s("view"),s("materialized view"),s("sequence"),s("foreign table"),s("partitioned ta\
ble"),s("Type")),ne(t,"c.relacl"),E(t,`,
  pg_catalog.array_to_string(ARRAY(
    SELECT attname || E':\\n  ' || pg_catalog.array_to_string(attacl, E'\\n  ')
    FROM pg_catalog.pg_attribute a
    WHERE attrelid = c.oid AND NOT attisdropped AND attacl IS NOT NULL
  ), E'\\n') AS "%s"`,s("Column privileges")),p.sversion>=90500&&p.sversion<1e5&&E(t,`,
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
    AS "%s"`,s("Policies")),p.sversion>=1e5&&E(t,`,
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
    AS "%s"`,s("Policies")),r(t,`
FROM pg_catalog.pg_class c
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
WHERE c.relkind IN ('r','v','m','S','f','p')
`),!l&&!i&&r(t,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!U(t,i,!0,!1,"n.nspname","c.relname",null,"pg_catalog.pg_table_is_visible(c.oid)",null,3)||(r(t,"ORDER BY 1, 2;"),a=await A(
t.data),!a)?!1:(n.nullPrint=null,u(t,N("Access privileges")),n.title=t.data,n.translate_header=!0,n.translate_columns=e,
n.n_translate_columns=V(e),k(a,n,p.queryFout,!1,p.logfile),!0)}async function xa(i){let l={},t,a=p.popt,n=[!1,!1,!0,!1];
return D(l),u(l,`SELECT pg_catalog.pg_get_userbyid(d.defaclrole) AS "%s",
  n.nspname AS "%s",
  CASE d.defaclobjtype WHEN '%c' THEN '%s' WHEN '%c' THEN '%s' WHEN '%c' THEN '%s' WHEN '%c' THEN '%s' WHEN '%c' THEN '%\
s' END AS "%s",
  `,s("Owner"),s("Schema"),wt,s("table"),Ct,s("sequence"),It,s("function"),Ht,s("type"),Ft,s("schema"),s("Type")),ne(l,"\
d.defaclacl"),r(l,`
FROM pg_catalog.pg_default_acl d
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = d.defaclnamespace
`),!U(l,i,!1,!1,null,"n.nspname","pg_catalog.pg_get_userbyid(d.defaclrole)",null,null,3)||(r(l,"ORDER BY 1, 2, 3;"),t=await A(
l.data),!t)?!1:(a.nullPrint=null,u(l,N("Default access privileges")),a.title=l.data,a.translate_header=!0,a.translate_columns=
n,a.n_translate_columns=V(n),k(t,a,p.queryFout,!1,p.logfile),!0)}async function Pa(i,l){let t={},a,n=p.popt,e=[!1,!1,!0,
!1];return D(t),E(t,`SELECT DISTINCT tt.nspname AS "%s", tt.name AS "%s", tt.object AS "%s", d.description AS "%s"
FROM (
`,s("Schema"),s("Name"),s("Object"),s("Description")),E(t,`  SELECT pgc.oid as oid, pgc.tableoid AS tableoid,
  n.nspname as nspname,
  CAST(pgc.conname AS pg_catalog.text) as name,  CAST('%s' AS pg_catalog.text) as object
  FROM pg_catalog.pg_constraint pgc
    JOIN pg_catalog.pg_class c ON c.oid = pgc.conrelid
    LEFT JOIN pg_catalog.pg_namespace n     ON n.oid = c.relnamespace
`,s("table constraint")),!l&&!i&&r(t,`WHERE n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!U(t,i,!l&&!i,!1,"n.nspname","pgc.conname",null,"pg_catalog.pg_table_is_visible(c.oid)",null,3)||(E(t,`UNION ALL
  SELECT pgc.oid as oid, pgc.tableoid AS tableoid,
  n.nspname as nspname,
  CAST(pgc.conname AS pg_catalog.text) as name,  CAST('%s' AS pg_catalog.text) as object
  FROM pg_catalog.pg_constraint pgc
    JOIN pg_catalog.pg_type t ON t.oid = pgc.contypid
    LEFT JOIN pg_catalog.pg_namespace n     ON n.oid = t.typnamespace
`,s("domain constraint")),!l&&!i&&r(t,`WHERE n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!U(t,i,!l&&!i,!1,"n.nspname","pgc.conname",null,"pg_catalog.pg_type_is_visible(t.oid)",null,3))||(E(t,`UNION ALL
  SELECT o.oid as oid, o.tableoid as tableoid,
  n.nspname as nspname,
  CAST(o.opcname AS pg_catalog.text) as name,
  CAST('%s' AS pg_catalog.text) as object
  FROM pg_catalog.pg_opclass o
    JOIN pg_catalog.pg_am am ON o.opcmethod = am.oid
    JOIN pg_catalog.pg_namespace n ON n.oid = o.opcnamespace
`,s("operator class")),!l&&!i&&r(t,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!U(t,i,!0,!1,"n.nspname","o.opcname",null,"pg_catalog.pg_opclass_is_visible(o.oid)",null,3))||(E(t,`UNION ALL
  SELECT opf.oid as oid, opf.tableoid as tableoid,
  n.nspname as nspname,
  CAST(opf.opfname AS pg_catalog.text) AS name,
  CAST('%s' AS pg_catalog.text) as object
  FROM pg_catalog.pg_opfamily opf
    JOIN pg_catalog.pg_am am ON opf.opfmethod = am.oid
    JOIN pg_catalog.pg_namespace n ON opf.opfnamespace = n.oid
`,s("operator family")),!l&&!i&&r(t,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!U(t,i,!0,!1,"n.nspname","opf.opfname",null,"pg_catalog.pg_opfamily_is_visible(opf.oid)",null,3))||(E(t,`UNION ALL
  SELECT r.oid as oid, r.tableoid as tableoid,
  n.nspname as nspname,
  CAST(r.rulename AS pg_catalog.text) as name,  CAST('%s' AS pg_catalog.text) as object
  FROM pg_catalog.pg_rewrite r
       JOIN pg_catalog.pg_class c ON c.oid = r.ev_class
       LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
  WHERE r.rulename != '_RETURN'
`,s("rule")),!l&&!i&&r(t,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!U(t,i,!0,!1,"n.nspname","r.rulename",null,"pg_catalog.pg_table_is_visible(c.oid)",null,3))||(E(t,`UNION ALL
  SELECT t.oid as oid, t.tableoid as tableoid,
  n.nspname as nspname,
  CAST(t.tgname AS pg_catalog.text) as name,  CAST('%s' AS pg_catalog.text) as object
  FROM pg_catalog.pg_trigger t
       JOIN pg_catalog.pg_class c ON c.oid = t.tgrelid
       LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
`,s("trigger")),!l&&!i&&r(t,`WHERE n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!U(t,i,!l&&!i,!1,"n.nspname","t.tgname",null,"pg_catalog.pg_table_is_visible(c.oid)",null,3))||(r(t,`) AS tt
  JOIN pg_catalog.pg_description d ON (tt.oid = d.objoid AND tt.tableoid = d.classoid AND d.objsubid = 0)
`),r(t,"ORDER BY 1, 2, 3;"),a=await A(t.data),!a)?!1:(n.nullPrint=null,n.title=N("Object descriptions"),n.translate_header=
!0,n.translate_columns=e,n.n_translate_columns=V(e),k(a,n,p.queryFout,!1,p.logfile),!0)}async function Ma(i,l,t){let a={},
n,e;if(D(a),u(a,`SELECT c.oid,
  n.nspname,
  c.relname
FROM pg_catalog.pg_class c
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
`),!t&&!i&&r(a,`WHERE n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!U(a,i,!t&&!i,!1,"n.nspname","c.relname",null,"pg_catalog.pg_table_is_visible(c.oid)",null,3)||(r(a,"ORDER BY 2, 3;"),
n=await A(a.data),!n))return!1;if(x(n)==0)return p.quiet||(i?M('Did not find any relation named "%s".',i):M("Did not fin\
d any relations.")),!1;for(e=0;e<x(n);e++){let o,L,d;if(o=f(n,e,0),L=f(n,e,1),d=f(n,e,2),!await qa(L,d,o,l)||j)return!1}
return!0}async function qa(i,l,t,a){let n=!1,e={},o=null,L=p.popt.topt,d={},c,b=null,T=[],S={},I={},w,re=-1,$=-1,W=-1,he=-1,
we=-1,Ce=-1,Ie=-1,qe=-1,Je=-1,Ye=-1,Be=-1,je=-1,ze=-1,Qe=-1,Ze,m={},Ke=!1;if(L.default_footer=!1,L.expanded=!1,D(e),D(S),
D(I),p.sversion>=12e4?u(e,`SELECT c.relchecks, c.relkind, c.relhasindex, c.relhasrules, c.relhastriggers, c.relrowsecuri\
ty, c.relforcerowsecurity, false AS relhasoids, c.relispartition, %s, c.reltablespace, CASE WHEN c.reloftype = 0 THEN ''\
 ELSE c.reloftype::pg_catalog.regtype::pg_catalog.text END, c.relpersistence, c.relreplident, am.amname
FROM pg_catalog.pg_class c
 LEFT JOIN pg_catalog.pg_class tc ON (c.reltoastrelid = tc.oid)
LEFT JOIN pg_catalog.pg_am am ON (c.relam = am.oid)
WHERE c.oid = '%s';`,a?`pg_catalog.array_to_string(c.reloptions || array(select 'toast.' || x from pg_catalog.unnest(tc.\
reloptions) x), ', ')
`:"''",t):p.sversion>=1e5?u(e,`SELECT c.relchecks, c.relkind, c.relhasindex, c.relhasrules, c.relhastriggers, c.relrowse\
curity, c.relforcerowsecurity, c.relhasoids, c.relispartition, %s, c.reltablespace, CASE WHEN c.reloftype = 0 THEN '' EL\
SE c.reloftype::pg_catalog.regtype::pg_catalog.text END, c.relpersistence, c.relreplident
FROM pg_catalog.pg_class c
 LEFT JOIN pg_catalog.pg_class tc ON (c.reltoastrelid = tc.oid)
WHERE c.oid = '%s';`,a?`pg_catalog.array_to_string(c.reloptions || array(select 'toast.' || x from pg_catalog.unnest(tc.\
reloptions) x), ', ')
`:"''",t):p.sversion>=90500?u(e,`SELECT c.relchecks, c.relkind, c.relhasindex, c.relhasrules, c.relhastriggers, c.relrow\
security, c.relforcerowsecurity, c.relhasoids, false as relispartition, %s, c.reltablespace, CASE WHEN c.reloftype = 0 T\
HEN '' ELSE c.reloftype::pg_catalog.regtype::pg_catalog.text END, c.relpersistence, c.relreplident
FROM pg_catalog.pg_class c
 LEFT JOIN pg_catalog.pg_class tc ON (c.reltoastrelid = tc.oid)
WHERE c.oid = '%s';`,a?`pg_catalog.array_to_string(c.reloptions || array(select 'toast.' || x from pg_catalog.unnest(tc.\
reloptions) x), ', ')
`:"''",t):p.sversion>=90400?u(e,`SELECT c.relchecks, c.relkind, c.relhasindex, c.relhasrules, c.relhastriggers, false, f\
alse, c.relhasoids, false as relispartition, %s, c.reltablespace, CASE WHEN c.reloftype = 0 THEN '' ELSE c.reloftype::pg\
_catalog.regtype::pg_catalog.text END, c.relpersistence, c.relreplident
FROM pg_catalog.pg_class c
 LEFT JOIN pg_catalog.pg_class tc ON (c.reltoastrelid = tc.oid)
WHERE c.oid = '%s';`,a?`pg_catalog.array_to_string(c.reloptions || array(select 'toast.' || x from pg_catalog.unnest(tc.\
reloptions) x), ', ')
`:"''",t):u(e,`SELECT c.relchecks, c.relkind, c.relhasindex, c.relhasrules, c.relhastriggers, false, false, c.relhasoids\
, false as relispartition, %s, c.reltablespace, CASE WHEN c.reloftype = 0 THEN '' ELSE c.reloftype::pg_catalog.regtype::\
pg_catalog.text END, c.relpersistence
FROM pg_catalog.pg_class c
 LEFT JOIN pg_catalog.pg_class tc ON (c.reltoastrelid = tc.oid)
WHERE c.oid = '%s';`,a?`pg_catalog.array_to_string(c.reloptions || array(select 'toast.' || x from pg_catalog.unnest(tc.\
reloptions) x), ', ')
`:"''",t),o=await A(e.data),!o)return n;if(x(o)==0)return p.quiet||M("Did not find any relation with OID %s.",t),n;if(m.
checks=da(f(o,0,0)),m.relkind=f(o,0,1),m.hasindex=C(f(o,0,2),"t")==0,m.hasrules=C(f(o,0,3),"t")==0,m.hastriggers=C(f(o,0,
4),"t")==0,m.rowsecurity=C(f(o,0,5),"t")==0,m.forcerowsecurity=C(f(o,0,6),"t")==0,m.hasoids=C(f(o,0,7),"t")==0,m.ispartition=
C(f(o,0,8),"t")==0,m.reloptions=Se(f(o,0,9)),m.tablespace=aa(f(o,0,10)),m.reloftype=C(f(o,0,11),"")!=0?Se(f(o,0,11)):null,
m.relpersistence=f(o,0,12),m.relreplident=p.sversion>=90400?f(o,0,13):"d",p.sversion>=12e4?m.relam=ee(o,0,14)?null:Se(f(
o,0,14)):m.relam=null,o=null,m.relkind==xt){let g=null,y=p.popt,h=[null,null];if(p.sversion>=1e5?(u(e,`SELECT pg_catalog\
.format_type(seqtypid, NULL) AS "%s",
       seqstart AS "%s",
       seqmin AS "%s",
       seqmax AS "%s",
       seqincrement AS "%s",
       CASE WHEN seqcycle THEN '%s' ELSE '%s' END AS "%s",
       seqcache AS "%s"
`,s("Type"),s("Start"),s("Minimum"),s("Maximum"),s("Increment"),s("yes"),s("no"),s("Cycles?"),s("Cache")),E(e,`FROM pg_c\
atalog.pg_sequence
WHERE seqrelid = '%s';`,t)):(u(e,`SELECT 'bigint' AS "%s",
       start_value AS "%s",
       min_value AS "%s",
       max_value AS "%s",
       increment_by AS "%s",
       CASE WHEN is_cycled THEN '%s' ELSE '%s' END AS "%s",
       cache_value AS "%s"
`,s("Type"),s("Start"),s("Minimum"),s("Maximum"),s("Increment"),s("yes"),s("no"),s("Cycles?"),s("Cache")),E(e,"FROM %s",
Oe(i)),E(e,".%s;",Oe(l))),o=await A(e.data),!o)return n;if(u(e,`SELECT pg_catalog.quote_ident(nspname) || '.' ||
   pg_catalog.quote_ident(relname) || '.' ||
   pg_catalog.quote_ident(attname),
   d.deptype
FROM pg_catalog.pg_class c
INNER JOIN pg_catalog.pg_depend d ON c.oid=d.refobjid
INNER JOIN pg_catalog.pg_namespace n ON n.oid=c.relnamespace
INNER JOIN pg_catalog.pg_attribute a ON (
 a.attrelid=c.oid AND
 a.attnum=d.refobjsubid)
WHERE d.classid='pg_catalog.pg_class'::pg_catalog.regclass
 AND d.refclassid='pg_catalog.pg_class'::pg_catalog.regclass
 AND d.objid='%s'
 AND d.deptype IN ('a', 'i')`,t),g=await A(e.data),g){if(x(g)==1)switch(f(g,0,1)[0]){case"a":h[0]=la(N("Owned by: %s"),f(
g,0,0));break;case"i":h[0]=la(N("Sequence for identity column: %s"),f(g,0,0));break}}else return n;return m.relpersistence==
"u"?u(S,N('Unlogged sequence "%s.%s"'),i,l):u(S,N('Sequence "%s.%s"'),i,l),y.footers=h,y.topt.default_footer=!1,y.title=
S.data,y.translate_header=!0,k(o,y,p.queryFout,!1,p.logfile),n=!0,n}if((m.relkind==oe||m.relkind==ve||m.relkind==le||m.relkind==
pe||m.relkind==ea||m.relkind==te)&&(Ke=!0),w=0,u(e,"SELECT a.attname"),re=w++,r(e,`,
  pg_catalog.format_type(a.atttypid, a.atttypmod)`),$=w++,Ke&&(r(e,`,
  (SELECT pg_catalog.pg_get_expr(d.adbin, d.adrelid, true)
   FROM pg_catalog.pg_attrdef d
   WHERE d.adrelid = a.attrelid AND d.adnum = a.attnum AND a.atthasdef),
  a.attnotnull`),W=w++,he=w++,r(e,`,
  (SELECT c.collname FROM pg_catalog.pg_collation c, pg_catalog.pg_type t
   WHERE c.oid = a.attcollation AND t.oid = a.atttypid AND a.attcollation <> t.typcollation) AS attcollation`),we=w++,p.
sversion>=1e5?r(e,`,
  a.attidentity`):r(e,`,
  ''::pg_catalog.char AS attidentity`),Ce=w++,p.sversion>=12e4?r(e,`,
  a.attgenerated`):r(e,`,
  ''::pg_catalog.char AS attgenerated`),Ie=w++),(m.relkind==me||m.relkind==ce)&&(p.sversion>=11e4&&(E(e,`,
  CASE WHEN a.attnum <= (SELECT i.indnkeyatts FROM pg_catalog.pg_index i WHERE i.indexrelid = '%s') THEN '%s' ELSE '%s' \
END AS is_key`,t,s("yes"),s("no")),qe=w++),r(e,`,
  pg_catalog.pg_get_indexdef(a.attrelid, a.attnum, TRUE) AS indexdef`),Je=w++),m.relkind==pe&&(r(e,`,
  CASE WHEN attfdwoptions IS NULL THEN '' ELSE   '(' || pg_catalog.array_to_string(ARRAY(SELECT pg_catalog.quote_ident(o\
ption_name) || ' ' || pg_catalog.quote_literal(option_value)  FROM   pg_catalog.pg_options_to_table(attfdwoptions)), ', \
') || ')' END AS attfdwoptions`),Ye=w++),a&&(r(e,`,
  a.attstorage`),Be=w++,p.sversion>=14e4&&!p.hide_compression&&(m.relkind==oe||m.relkind==te||m.relkind==le)&&(r(e,`,
  a.attcompression AS attcompression`),je=w++),(m.relkind==oe||m.relkind==me||m.relkind==ce||m.relkind==le||m.relkind==pe||
m.relkind==te)&&(r(e,`,
  CASE WHEN a.attstattarget=-1 THEN NULL ELSE a.attstattarget END AS attstattarget`),ze=w++),(m.relkind==oe||m.relkind==
ve||m.relkind==le||m.relkind==pe||m.relkind==ea||m.relkind==te)&&(r(e,`,
  pg_catalog.col_description(a.attrelid, a.attnum)`),Qe=w++)),r(e,`
FROM pg_catalog.pg_attribute a`),E(e,`
WHERE a.attrelid = '%s' AND a.attnum > 0 AND NOT a.attisdropped`,t),r(e,`
ORDER BY a.attnum;`),o=await A(e.data),!o)return n;switch(Ze=x(o),m.relkind){case oe:m.relpersistence=="u"?u(S,N('Unlogg\
ed table "%s.%s"'),i,l):u(S,N('Table "%s.%s"'),i,l);break;case ve:u(S,N('View "%s.%s"'),i,l);break;case le:m.relpersistence==
"u"?u(S,N('Unlogged materialized view "%s.%s"'),i,l):u(S,N('Materialized view "%s.%s"'),i,l);break;case me:m.relpersistence==
"u"?u(S,N('Unlogged index "%s.%s"'),i,l):u(S,N('Index "%s.%s"'),i,l);break;case ce:m.relpersistence=="u"?u(S,N('Unlogged\
 partitioned index "%s.%s"'),i,l):u(S,N('Partitioned index "%s.%s"'),i,l);break;case Fe:u(S,N('TOAST table "%s.%s"'),i,l);
break;case ea:u(S,N('Composite type "%s.%s"'),i,l);break;case pe:u(S,N('Foreign table "%s.%s"'),i,l);break;case te:m.relpersistence==
"u"?u(S,N('Unlogged partitioned table "%s.%s"'),i,l):u(S,N('Partitioned table "%s.%s"'),i,l);break;default:u(S,'?%c? "%s\
.%s"',m.relkind,i,l);break}for(w=0,T[w++]=s("Column"),T[w++]=s("Type"),Ke&&(T[w++]=s("Collation"),T[w++]=s("Nullable"),T[w++]=
s("Default")),qe>=0&&(T[w++]=s("Key?")),Je>=0&&(T[w++]=s("Definition")),Ye>=0&&(T[w++]=s("FDW options")),Be>=0&&(T[w++]=
s("Storage")),je>=0&&(T[w++]=s("Compression")),ze>=0&&(T[w++]=s("Stats target")),Qe>=0&&(T[w++]=s("Description")),Re(w<=
V(T)),Pe(d,L,S.data,w,Ze),c=0;c<w;c++)se(d,T[c],!0,"l");for(c=0;c<Ze;c++){if(Q(d,f(o,c,re),!1,!1),Q(d,f(o,c,$),!1,!1),Ke){
let g,y,h,v=!1;Q(d,f(o,c,we),!1,!1),Q(d,C(f(o,c,he),"t")==0?"not null":"",!1,!1),g=f(o,c,Ce),y=f(o,c,Ie),g[0]==vt?h="gen\
erated always as identity":g[0]==Wt?h="generated by default as identity":y[0]==kt?(h=la("generated always as (%s) stored",
f(o,c,W)),v=!0):h=f(o,c,W),Q(d,h,!1,v)}if(qe>=0&&Q(d,f(o,c,qe),!0,!1),Je>=0&&Q(d,f(o,c,Je),!1,!1),Ye>=0&&Q(d,f(o,c,Ye),!1,
!1),Be>=0){let g=f(o,c,Be);Q(d,g[0]=="p"?"plain":g[0]=="m"?"main":g[0]=="x"?"extended":g[0]=="e"?"external":"???",!1,!1)}
if(je>=0){let g=f(o,c,je);Q(d,g[0]=="p"?"pglz":g[0]=="l"?"lz4":g[0]==null?"":"???",!1,!1)}ze>=0&&Q(d,f(o,c,ze),!1,!1),Qe>=
0&&Q(d,f(o,c,Qe),!1,!1)}if(m.ispartition){let g;if(u(e,`SELECT inhparent::pg_catalog.regclass,
  pg_catalog.pg_get_expr(c.relpartbound, c.oid),
  `),r(e,p.sversion>=14e4?"inhdetachpending":"false as inhdetachpending"),a&&r(e,`,
  pg_catalog.pg_get_partition_constraintdef(c.oid)`),E(e,`
FROM pg_catalog.pg_class c JOIN pg_catalog.pg_inherits i ON c.oid = inhrelid
WHERE c.oid = '%s';`,t),g=await A(e.data),!g)return n;if(x(g)>0){let y=f(g,0,0),h=f(g,0,1),v=f(g,0,2);if(u(I,N("Partitio\
n of: %s %s%s"),y,h,C(v,"t")==0?" DETACH PENDING":""),F(d,I.data),a){let q=null;ee(g,0,3)||(q=f(g,0,3)),q==null||q[0]==null?
u(I,N("No partition constraint")):u(I,N("Partition constraint: %s"),q),F(d,I.data)}}}if(m.relkind==te){let g;if(u(e,"SEL\
ECT pg_catalog.pg_get_partkeydef('%s'::pg_catalog.oid);",t),g=await A(e.data),!g)return n;if(x(g)==1){let y=f(g,0,0);u(I,
N("Partition key: %s"),y),F(d,I.data)}}if(m.relkind==Fe){let g;if(u(e,`SELECT n.nspname, c.relname
FROM pg_catalog.pg_class c JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
WHERE reltoastrelid = '%s';`,t),g=await A(e.data),!g)return n;if(x(g)==1){let y=f(g,0,0),h=f(g,0,1);u(I,N('Owning table:\
 "%s.%s"'),y,h),F(d,I.data)}}if(m.relkind==me||m.relkind==ce){let g;if(u(e,`SELECT i.indisunique, i.indisprimary, i.indi\
sclustered, i.indisvalid,
  (NOT i.indimmediate) AND EXISTS (SELECT 1 FROM pg_catalog.pg_constraint WHERE conrelid = i.indrelid AND conindid = i.i\
ndexrelid AND contype IN ('p','u','x') AND condeferrable) AS condeferrable,
  (NOT i.indimmediate) AND EXISTS (SELECT 1 FROM pg_catalog.pg_constraint WHERE conrelid = i.indrelid AND conindid = i.i\
ndexrelid AND contype IN ('p','u','x') AND condeferred) AS condeferred,
`),p.sversion>=90400?r(e,`i.indisreplident,
`):r(e,`false AS indisreplident,
`),p.sversion>=15e4?r(e,`i.indnullsnotdistinct,
`):r(e,`false AS indnullsnotdistinct,
`),E(e,`  a.amname, c2.relname, pg_catalog.pg_get_expr(i.indpred, i.indrelid, true)
FROM pg_catalog.pg_index i, pg_catalog.pg_class c, pg_catalog.pg_class c2, pg_catalog.pg_am a
WHERE i.indexrelid = c.oid AND c.oid = '%s' AND c.relam = a.oid
AND i.indrelid = c2.oid;`,t),g=await A(e.data),g){if(x(g)!=1)return n;{let y=f(g,0,0),h=f(g,0,1),v=f(g,0,2),q=f(g,0,3),z=f(
g,0,4),_e=f(g,0,5),ae=f(g,0,6),He=f(g,0,7),Ot=f(g,0,8),Rt=f(g,0,9),ga=f(g,0,10);C(h,"t")==0?u(I,N("primary key, ")):C(y,
"t")==0?(u(I,N("unique")),C(He,"t")==0&&r(I,N(" nulls not distinct")),r(I,N(", "))):na(I),E(I,"%s, ",Ot),E(I,N('for tabl\
e "%s.%s"'),i,Rt),ge(ga)&&E(I,N(", predicate (%s)"),ga),C(v,"t")==0&&r(I,N(", clustered")),C(q,"t")!=0&&r(I,N(", invalid")),
C(z,"t")==0&&r(I,N(", deferrable")),C(_e,"t")==0&&r(I,N(", initially deferred")),C(ae,"t")==0&&r(I,N(", replica identity")),
F(d,I.data),m.relkind==me&&await Xe(d,m.relkind,m.tablespace,!0)}}else return n}else if(m.relkind==oe||m.relkind==le||m.
relkind==pe||m.relkind==te||m.relkind==ce||m.relkind==Fe){let g=null,y=0;if(m.hasindex){if(u(e,`SELECT c2.relname, i.ind\
isprimary, i.indisunique, i.indisclustered, i.indisvalid, pg_catalog.pg_get_indexdef(i.indexrelid, 0, true),
  pg_catalog.pg_get_constraintdef(con.oid, true), contype, condeferrable, condeferred`),p.sversion>=90400?r(e,", i.indis\
replident"):r(e,", false AS indisreplident"),r(e,", c2.reltablespace"),E(e,`
FROM pg_catalog.pg_class c, pg_catalog.pg_class c2, pg_catalog.pg_index i
  LEFT JOIN pg_catalog.pg_constraint con ON (conrelid = i.indrelid AND conindid = i.indexrelid AND contype IN ('p','u','\
x'))
WHERE c.oid = '%s' AND c.oid = i.indrelid AND i.indexrelid = c2.oid
ORDER BY i.indisprimary DESC, c2.relname;`,t),g=await A(e.data),g)y=x(g);else return n;if(y>0)for(F(d,N("Indexes:")),c=0;c<
y;c++){if(u(e,'    "%s"',f(g,c,0)),C(f(g,c,7),"x")==0)E(e," %s",f(g,c,6));else{let h,v;C(f(g,c,1),"t")==0?r(e," PRIMARY \
KEY,"):C(f(g,c,2),"t")==0&&(C(f(g,c,7),"u")==0?r(e," UNIQUE CONSTRAINT,"):r(e," UNIQUE,")),h=f(g,c,5),v=Ve(h," USING "),
v!=null&&(h=h.slice(v+7)),E(e," %s",h),C(f(g,c,8),"t")==0&&r(e," DEFERRABLE"),C(f(g,c,9),"t")==0&&r(e," INITIALLY DEFERR\
ED")}C(f(g,c,3),"t")==0&&r(e," CLUSTER"),C(f(g,c,4),"t")!=0&&r(e," INVALID"),C(f(g,c,10),"t")==0&&r(e," REPLICA IDENTITY"),
F(d,e.data),await Xe(d,me,aa(f(g,c,11)),!1)}}if(m.checks){if(u(e,`SELECT r.conname, pg_catalog.pg_get_constraintdef(r.oi\
d, true)
FROM pg_catalog.pg_constraint r
WHERE r.conrelid = '%s' AND r.contype = 'c'
ORDER BY 1;`,t),g=await A(e.data),g)y=x(g);else return n;if(y>0)for(F(d,N("Check constraints:")),c=0;c<y;c++)u(e,'    "%\
s" %s',f(g,c,0),f(g,c,1)),F(d,e.data)}if(m.hastriggers||m.relkind==te){if(p.sversion>=12e4&&(m.ispartition||m.relkind==te)?
u(e,`SELECT conrelid = '%s'::pg_catalog.regclass AS sametable,
       conname,
       pg_catalog.pg_get_constraintdef(oid, true) AS condef,
       conrelid::pg_catalog.regclass AS ontable
  FROM pg_catalog.pg_constraint,
       pg_catalog.pg_partition_ancestors('%s')
 WHERE conrelid = relid AND contype = 'f' AND conparentid = 0
ORDER BY sametable DESC, conname;`,t,t):(u(e,`SELECT true as sametable, conname,
  pg_catalog.pg_get_constraintdef(r.oid, true) as condef,
  conrelid::pg_catalog.regclass AS ontable
FROM pg_catalog.pg_constraint r
WHERE r.conrelid = '%s' AND r.contype = 'f'
`,t),p.sversion>=12e4&&r(e,`     AND conparentid = 0
`),r(e,"ORDER BY conname")),g=await A(e.data),g)y=x(g);else return n;if(y>0){let h=Ae(g,"sametable"),v=Ae(g,"conname"),q=Ae(
g,"condef"),z=Ae(g,"ontable");for(F(d,N("Foreign-key constraints:")),c=0;c<y;c++)C(f(g,c,h),"f")==0?u(e,'    TABLE "%s" \
CONSTRAINT "%s" %s',f(g,c,z),f(g,c,v),f(g,c,q)):u(e,'    "%s" %s',f(g,c,v),f(g,c,q)),F(d,e.data)}}if(m.hastriggers||m.relkind==
te){if(p.sversion>=12e4?u(e,`SELECT conname, conrelid::pg_catalog.regclass AS ontable,
       pg_catalog.pg_get_constraintdef(oid, true) AS condef
  FROM pg_catalog.pg_constraint c
 WHERE confrelid IN (SELECT pg_catalog.pg_partition_ancestors('%s')
                     UNION ALL VALUES ('%s'::pg_catalog.regclass))
       AND contype = 'f' AND conparentid = 0
ORDER BY conname;`,t,t):u(e,`SELECT conname, conrelid::pg_catalog.regclass AS ontable,
       pg_catalog.pg_get_constraintdef(oid, true) AS condef
  FROM pg_catalog.pg_constraint
 WHERE confrelid = %s AND contype = 'f'
ORDER BY conname;`,t),g=await A(e.data),g)y=x(g);else return n;if(y>0){let h=Ae(g,"conname"),v=Ae(g,"ontable"),q=Ae(g,"c\
ondef");for(F(d,N("Referenced by:")),c=0;c<y;c++)u(e,'    TABLE "%s" CONSTRAINT "%s" %s',f(g,c,v),f(g,c,h),f(g,c,q)),F(d,
e.data)}}if(p.sversion>=90500){if(u(e,"SELECT pol.polname,"),p.sversion>=1e5?r(e,` pol.polpermissive,
`):r(e,` 't' as polpermissive,
`),E(e,`  CASE WHEN pol.polroles = '{0}' THEN NULL ELSE pg_catalog.array_to_string(array(select rolname from pg_catalog.\
pg_roles where oid = any (pol.polroles) order by 1),',') END,
  pg_catalog.pg_get_expr(pol.polqual, pol.polrelid),
  pg_catalog.pg_get_expr(pol.polwithcheck, pol.polrelid),
  CASE pol.polcmd
    WHEN 'r' THEN 'SELECT'
    WHEN 'a' THEN 'INSERT'
    WHEN 'w' THEN 'UPDATE'
    WHEN 'd' THEN 'DELETE'
    END AS cmd
FROM pg_catalog.pg_policy pol
WHERE pol.polrelid = '%s' ORDER BY 1;`,t),g=await A(e.data),g)y=x(g);else return n;for(m.rowsecurity&&!m.forcerowsecurity&&
y>0&&F(d,N("Policies:")),m.rowsecurity&&m.forcerowsecurity&&y>0&&F(d,N("Policies (forced row security enabled):")),m.rowsecurity&&
!m.forcerowsecurity&&y==0&&F(d,N("Policies (row security enabled): (none)")),m.rowsecurity&&m.forcerowsecurity&&y==0&&F(
d,N("Policies (forced row security enabled): (none)")),!m.rowsecurity&&y>0&&F(d,N("Policies (row security disabled):")),
c=0;c<y;c++)u(e,'    POLICY "%s"',f(g,c,0)),f(g,c,1)=="f"&&r(e," AS RESTRICTIVE"),ee(g,c,5)||E(e," FOR %s",f(g,c,5)),ee(
g,c,2)||E(e,`
      TO %s`,f(g,c,2)),ee(g,c,3)||E(e,`
      USING (%s)`,f(g,c,3)),ee(g,c,4)||E(e,`
      WITH CHECK (%s)`,f(g,c,4)),F(d,e.data)}if(p.sversion>=14e4){if(u(e,`SELECT oid, stxrelid::pg_catalog.regclass, stx\
namespace::pg_catalog.regnamespace::pg_catalog.text AS nsp, stxname,
pg_catalog.pg_get_statisticsobjdef_columns(oid) AS columns,
  'd' = any(stxkind) AS ndist_enabled,
  'f' = any(stxkind) AS deps_enabled,
  'm' = any(stxkind) AS mcv_enabled,
stxstattarget
FROM pg_catalog.pg_statistic_ext
WHERE stxrelid = '%s'
ORDER BY nsp, stxname;`,t),g=await A(e.data),g)y=x(g);else return n;if(y>0)for(F(d,N("Statistics objects:")),c=0;c<y;c++){
let h=!1,v,q,z,_e,ae;v=C(f(g,c,5),"t")==0,q=C(f(g,c,6),"t")==0,z=C(f(g,c,7),"t")==0,u(e,"    "),E(e,'"%s.%s"',f(g,c,2),f(
g,c,3)),_e=v&&q&&z,ae=v||q||z,ae&&!_e&&(r(e," ("),v&&(r(e,"ndistinct"),h=!0),q&&(E(e,"%sdependencies",h?", ":""),h=!0),z&&
E(e,"%smcv",h?", ":""),Y(e,")")),E(e," ON %s FROM %s",f(g,c,4),f(g,c,1)),C(f(g,c,8),"-1")!=0&&E(e,"; STATISTICS %s",f(g,
c,8)),F(d,e.data)}}else if(p.sversion>=1e5){if(u(e,`SELECT oid, stxrelid::pg_catalog.regclass, stxnamespace::pg_catalog.\
regnamespace AS nsp, stxname,
  (SELECT pg_catalog.string_agg(pg_catalog.quote_ident(attname),', ')
   FROM pg_catalog.unnest(stxkeys) s(attnum)
   JOIN pg_catalog.pg_attribute a ON (stxrelid = a.attrelid AND
        a.attnum = s.attnum AND NOT attisdropped)) AS columns,
  'd' = any(stxkind) AS ndist_enabled,
  'f' = any(stxkind) AS deps_enabled,
  'm' = any(stxkind) AS mcv_enabled,
`),p.sversion>=13e4?r(e,`  stxstattarget
`):r(e,`  -1 AS stxstattarget
`),E(e,`FROM pg_catalog.pg_statistic_ext
WHERE stxrelid = '%s'
ORDER BY 1;`,t),g=await A(e.data),g)y=x(g);else return n;if(y>0)for(F(d,N("Statistics objects:")),c=0;c<y;c++){let h=!1;
u(e,"    "),E(e,'"%s.%s" (',f(g,c,2),f(g,c,3)),C(f(g,c,5),"t")==0&&(r(e,"ndistinct"),h=!0),C(f(g,c,6),"t")==0&&(E(e,"%sd\
ependencies",h?", ":""),h=!0),C(f(g,c,7),"t")==0&&E(e,"%smcv",h?", ":""),E(e,") ON %s FROM %s",f(g,c,4),f(g,c,1)),C(f(g,
c,8),"-1")!=0&&E(e,"; STATISTICS %s",f(g,c,8)),F(d,e.data)}}if(m.hasrules&&m.relkind!=le){if(u(e,`SELECT r.rulename, tri\
m(trailing ';' from pg_catalog.pg_get_ruledef(r.oid, true)), ev_enabled
FROM pg_catalog.pg_rewrite r
WHERE r.ev_class = '%s' ORDER BY 1;`,t),g=await A(e.data),g)y=x(g);else return n;if(y>0){let h,v;for(v=0;v<4;v++)for(h=!1,
c=0;c<y;c++){let q,z=!1;switch(v){case 0:f(g,c,2)=="O"&&(z=!0);break;case 1:f(g,c,2)=="D"&&(z=!0);break;case 2:f(g,c,2)==
"A"&&(z=!0);break;case 3:f(g,c,2)=="R"&&(z=!0);break}if(z){if(!h){switch(v){case 0:u(e,N("Rules:"));break;case 1:u(e,N("\
Disabled rules:"));break;case 2:u(e,N("Rules firing always:"));break;case 3:u(e,N("Rules firing on replica only:"));break}
F(d,e.data),h=!0}q=f(g,c,1),q=q.slice(12),u(e,"    %s",q),F(d,e.data)}}}}if(p.sversion>=1e5){if(p.sversion>=15e4?u(e,`SE\
LECT pubname
     , NULL
     , NULL
FROM pg_catalog.pg_publication p
     JOIN pg_catalog.pg_publication_namespace pn ON p.oid = pn.pnpubid
     JOIN pg_catalog.pg_class pc ON pc.relnamespace = pn.pnnspid
WHERE pc.oid ='%s' and pg_catalog.pg_relation_is_publishable('%s')
UNION
SELECT pubname
     , pg_get_expr(pr.prqual, c.oid)
     , (CASE WHEN pr.prattrs IS NOT NULL THEN
         (SELECT string_agg(attname, ', ')
           FROM pg_catalog.generate_series(0, pg_catalog.array_upper(pr.prattrs::pg_catalog.int2[], 1)) s,
                pg_catalog.pg_attribute
          WHERE attrelid = pr.prrelid AND attnum = prattrs[s])
        ELSE NULL END) FROM pg_catalog.pg_publication p
     JOIN pg_catalog.pg_publication_rel pr ON p.oid = pr.prpubid
     JOIN pg_catalog.pg_class c ON c.oid = pr.prrelid
WHERE pr.prrelid = '%s'
UNION
SELECT pubname
     , NULL
     , NULL
FROM pg_catalog.pg_publication p
WHERE p.puballtables AND pg_catalog.pg_relation_is_publishable('%s')
ORDER BY 1;`,t,t,t,t):u(e,`SELECT pubname
     , NULL
     , NULL
FROM pg_catalog.pg_publication p
JOIN pg_catalog.pg_publication_rel pr ON p.oid = pr.prpubid
WHERE pr.prrelid = '%s'
UNION ALL
SELECT pubname
     , NULL
     , NULL
FROM pg_catalog.pg_publication p
WHERE p.puballtables AND pg_catalog.pg_relation_is_publishable('%s')
ORDER BY 1;`,t,t),g=await A(e.data),g)y=x(g);else return n;for(y>0&&F(d,N("Publications:")),c=0;c<y;c++)u(e,'    "%s"',f(
g,c,0)),ee(g,c,2)||E(e," (%s)",f(g,c,2)),ee(g,c,1)||E(e," WHERE %s",f(g,c,1)),F(d,e.data)}if(a){if(u(e,`SELECT co.connam\
e, at.attname, co.connoinherit, co.conislocal,
co.coninhcount <> 0
FROM pg_catalog.pg_constraint co JOIN
pg_catalog.pg_attribute at ON
(at.attnum = co.conkey[1])
WHERE co.contype = 'n' AND
co.conrelid = '%s'::pg_catalog.regclass AND
at.attrelid = '%s'::pg_catalog.regclass
ORDER BY at.attnum`,t,t),g=await A(e.data),g)y=x(g);else return n;for(y>0&&F(d,N("Not-null constraints:")),c=0;c<y;c++){
let h=f(g,c,3)[0]=="t",v=f(g,c,4)[0]=="t";u(e,'    "%s" NOT NULL "%s"%s',f(g,c,0),f(g,c,1),f(g,c,2)[0]=="t"?" NO INHERIT":
h&&v?N(" (local, inherited)"):v?N(" (inherited)"):""),F(d,e.data)}}}if((m.relkind==ve||m.relkind==le)&&a){let g;if(u(e,"\
SELECT pg_catalog.pg_get_viewdef('%s'::pg_catalog.oid, true);",t),g=await A(e.data),!g)return n;x(g)>0&&(b=Se(f(g,0,0)))}
if(b){let g=null;if(F(d,N("View definition:")),F(d,b),m.hasrules){if(u(e,`SELECT r.rulename, trim(trailing ';' from pg_c\
atalog.pg_get_ruledef(r.oid, true))
FROM pg_catalog.pg_rewrite r
WHERE r.ev_class = '%s' AND r.rulename != '_RETURN' ORDER BY 1;`,t),g=await A(e.data),!g)return n;if(x(g)>0)for(F(d,N("R\
ules:")),c=0;c<x(g);c++){let y;y=f(g,c,1),y=y.slice(12),u(e," %s",y),F(d,e.data)}}}if(m.hastriggers){let g,y;if(u(e,`SEL\
ECT t.tgname, pg_catalog.pg_get_triggerdef(t.oid, true), t.tgenabled, t.tgisinternal,
`),p.sversion>=13e4?r(e,`  CASE WHEN t.tgparentid != 0 THEN
    (SELECT u.tgrelid::pg_catalog.regclass
     FROM pg_catalog.pg_trigger AS u,
          pg_catalog.pg_partition_ancestors(t.tgrelid) WITH ORDINALITY AS a(relid, depth)
     WHERE u.tgname = t.tgname AND u.tgrelid = a.relid
           AND u.tgparentid = 0
     ORDER BY a.depth LIMIT 1)
  END AS parent
`):r(e,`  NULL AS parent
`),E(e,`FROM pg_catalog.pg_trigger t
WHERE t.tgrelid = '%s' AND `,t),p.sversion>=11e4&&p.sversion<15e4?r(e,`(NOT t.tgisinternal OR (t.tgisinternal AND t.tgen\
abled = 'D') 
    OR EXISTS (SELECT 1 FROM pg_catalog.pg_depend WHERE objid = t.oid 
        AND refclassid = 'pg_catalog.pg_trigger'::pg_catalog.regclass))`):r(e,"(NOT t.tgisinternal OR (t.tgisinternal AN\
D t.tgenabled = 'D'))"),r(e,`
ORDER BY 1;`),g=await A(e.data),g)y=x(g);else return n;if(y>0){let h,v;for(v=0;v<=4;v++)for(h=!1,c=0;c<y;c++){let q,z,_e,
ae,He;switch(ae=f(g,c,2),He=f(g,c,3),q=!1,v){case 0:(ae=="O"||ae=="t")&&(q=!0);break;case 1:(ae=="D"||ae=="f")&&He=="f"&&
(q=!0);break;case 2:(ae=="D"||ae=="f")&&He=="t"&&(q=!0);break;case 3:ae=="A"&&(q=!0);break;case 4:ae=="R"&&(q=!0);break}
if(q!=!1){if(h==!1){switch(v){case 0:u(e,N("Triggers:"));break;case 1:u(e,N("Disabled user triggers:"));break;case 2:u(e,
N("Disabled internal triggers:"));break;case 3:u(e,N("Triggers firing always:"));break;case 4:u(e,N("Triggers firing on \
replica only:"));break}F(d,e.data),h=!0}z=f(g,c,1),_e=Ve(z," TRIGGER "),_e!=null&&(z=z.slice(_e+9)),u(e,"    %s",z),ee(g,
c,4)||E(e,", ON TABLE %s",f(g,c,4)),F(d,e.data)}}}}if(m.relkind==oe||m.relkind==le||m.relkind==pe||m.relkind==te||m.relkind==
ce||m.relkind==Fe){let g,y,h;if(g=m.relkind==te||m.relkind==ce,m.relkind==pe){let v;if(u(e,`SELECT s.srvname,
  pg_catalog.array_to_string(ARRAY(
    SELECT pg_catalog.quote_ident(option_name) || ' ' || pg_catalog.quote_literal(option_value)
    FROM pg_catalog.pg_options_to_table(ftoptions)),  ', ')
FROM pg_catalog.pg_foreign_table f,
     pg_catalog.pg_foreign_server s
WHERE f.ftrelid = '%s' AND s.oid = f.ftserver;`,t),y=await A(e.data),y){if(x(y)!=1)return n}else return n;u(e,N("Server:\
 %s"),f(y,0,0)),F(d,e.data),v=f(y,0,1),v&&v[0]!=null&&(u(e,N("FDW options: (%s)"),v),F(d,e.data))}if(u(e,`SELECT c.oid::\
pg_catalog.regclass
FROM pg_catalog.pg_class c, pg_catalog.pg_inherits i
WHERE c.oid = i.inhparent AND i.inhrelid = '%s'
  AND c.relkind != 'p' AND c.relkind != 'I'
ORDER BY inhseqno;`,t),y=await A(e.data),y){let v=N("Inherits"),q=Ea(v,ge(v),p.encoding);for(h=x(y),c=0;c<h;c++)c==0?u(e,
"%s: %s",v,f(y,c,0)):u(e,"%*s  %s",q,"",f(y,c,0)),c<h-1&&Y(e,","),F(d,e.data)}else return n;if(p.sversion>=14e4?u(e,`SEL\
ECT c.oid::pg_catalog.regclass, c.relkind, inhdetachpending, pg_catalog.pg_get_expr(c.relpartbound, c.oid)
FROM pg_catalog.pg_class c, pg_catalog.pg_inherits i
WHERE c.oid = i.inhrelid AND i.inhparent = '%s'
ORDER BY pg_catalog.pg_get_expr(c.relpartbound, c.oid) = 'DEFAULT', c.oid::pg_catalog.regclass::pg_catalog.text;`,t):p.sversion>=
1e5?u(e,`SELECT c.oid::pg_catalog.regclass, c.relkind, false AS inhdetachpending, pg_catalog.pg_get_expr(c.relpartbound,\
 c.oid)
FROM pg_catalog.pg_class c, pg_catalog.pg_inherits i
WHERE c.oid = i.inhrelid AND i.inhparent = '%s'
ORDER BY pg_catalog.pg_get_expr(c.relpartbound, c.oid) = 'DEFAULT', c.oid::pg_catalog.regclass::pg_catalog.text;`,t):u(e,
`SELECT c.oid::pg_catalog.regclass, c.relkind, false AS inhdetachpending, NULL
FROM pg_catalog.pg_class c, pg_catalog.pg_inherits i
WHERE c.oid = i.inhrelid AND i.inhparent = '%s'
ORDER BY c.oid::pg_catalog.regclass::pg_catalog.text;`,t),y=await A(e.data),!y)return n;if(h=x(y),g&&h==0)u(e,N("Number \
of partitions: %d"),h),F(d,e.data);else if(!a)h>0&&(g?u(e,N("Number of partitions: %d (Use \\d+ to list them.)"),h):u(e,
N("Number of child tables: %d (Use \\d+ to list them.)"),h),F(d,e.data));else{let v=N(g?"Partitions":"Child tables"),q=Ea(
v,ge(v),p.encoding);for(c=0;c<h;c++){let z=f(y,c,1);c==0?u(e,"%s: %s",v,f(y,c,0)):u(e,"%*s  %s",q,"",f(y,c,0)),ee(y,c,3)||
E(e," %s",f(y,c,3)),z==te||z==ce?r(e,", PARTITIONED"):z==pe&&r(e,", FOREIGN"),C(f(y,c,2),"t")==0&&r(e," (DETACH PENDING)"),
c<h-1&&Y(e,","),F(d,e.data)}}if(m.reloftype&&(u(e,N("Typed table of type: %s"),m.reloftype),F(d,e.data)),a&&(m.relkind==
oe||m.relkind==le)&&m.relreplident!="i"&&(C(i,"pg_catalog")!=0&&m.relreplident!="d"||C(i,"pg_catalog")==0&&m.relreplident!=
"n")){let v=N("Replica Identity");u(e,"%s: %s",v,m.relreplident=="f"?"FULL":m.relreplident=="n"?"NOTHING":"???"),F(d,e.data)}
a&&m.relkind!=le&&m.hasoids&&F(d,N("Has OIDs: yes")),await Xe(d,m.relkind,m.tablespace,!0),a&&m.relam!=null&&!p.hide_tableam&&
(u(e,N("Access method: %s"),m.relam),F(d,e.data))}if(a&&m.reloptions&&m.reloptions[0]!=null){let g=N("Options");u(e,"%s:\
 %s",g,m.reloptions),F(d,e.data)}return Me(d,p.queryFout,!1,p.logfile),n=!0,n}async function Xe(i,l,t,a){if((l==oe||l==le||
l==me||l==te||l==ce||l==Fe)&&t!=0){let n=null,e={};if(D(e),u(e,`SELECT spcname FROM pg_catalog.pg_tablespace
WHERE oid = '%u';`,t),n=await A(e.data),!n)return;x(n)>0&&(a?(u(e,N('Tablespace: "%s"'),f(n,0,0)),F(i,e.data)):(u(e,"%s",
i.footer),E(e,N(', tablespace "%s"'),f(n,0,0)),Aa(i,e.data)))}}async function oa(i,l,t){let a={},n,e={},o=p.popt.topt,L=2,
d=0,c,b,T="l",S;if(o.default_footer=!1,D(a),u(a,`SELECT r.rolname, r.rolsuper, r.rolinherit,
  r.rolcreaterole, r.rolcreatedb, r.rolcanlogin,
  r.rolconnlimit, r.rolvaliduntil`),l&&(r(a,`
, pg_catalog.shobj_description(r.oid, 'pg_authid') AS description`),L++),r(a,`
, r.rolreplication`),p.sversion>=90500&&r(a,`
, r.rolbypassrls`),r(a,`
FROM pg_catalog.pg_roles r
`),!t&&!i&&r(a,`WHERE r.rolname !~ '^pg_'
`),!U(a,i,!1,!1,null,"r.rolname",null,null,null,1)||(r(a,"ORDER BY 1;"),n=await A(a.data),!n))return!1;for(d=x(n),S=[],Pe(
e,o,N("List of roles"),L,d),se(e,s("Role name"),!0,T),se(e,s("Attributes"),!0,T),l&&se(e,s("Description"),!0,T),c=0;c<d;c++)
Q(e,f(n,c,0),!1,!1),na(a),C(f(n,c,1),"t")==0&&Le(a,N("Superuser")),C(f(n,c,2),"t")!=0&&Le(a,N("No inheritance")),C(f(n,c,
3),"t")==0&&Le(a,N("Create role")),C(f(n,c,4),"t")==0&&Le(a,N("Create DB")),C(f(n,c,5),"t")!=0&&Le(a,N("Cannot login")),
C(f(n,c,l?9:8),"t")==0&&Le(a,N("Replication")),p.sversion>=90500&&C(f(n,c,l?10:9),"t")==0&&Le(a,N("Bypass RLS")),b=da(f(
n,c,6)),b>=0&&(a.len>0&&Y(a,`
`),b==0?r(a,N("No connections")):E(a,ngettext("%d connection","%d connections",b),b)),C(f(n,c,7),"")!=0&&(a.len>0&&Y(a,`\

`),r(a,N("Password valid until ")),r(a,f(n,c,7))),S[c]=Se(a.data),Q(e,S[c],!1,!1),l&&Q(e,f(n,c,8),!1,!1);return Me(e,p.queryFout,
!1,p.logfile),!0}function Le(i,l){i.len>0&&r(i,", "),r(i,l)}async function Ja(i,l){let t={},a,n=p.popt,e={};return D(t),
u(t,`SELECT rolname AS "%s", datname AS "%s",
pg_catalog.array_to_string(setconfig, E'\\n') AS "%s"
FROM pg_catalog.pg_db_role_setting s
LEFT JOIN pg_catalog.pg_database d ON d.oid = setdatabase
LEFT JOIN pg_catalog.pg_roles r ON r.oid = setrole
`,s("Role"),s("Database"),s("Settings")),!U(t,i,!1,!1,null,"r.rolname",null,null,e,1)||!U(t,l,e.value,!1,null,"d.datname",
null,null,null,1)||(r(t,"ORDER BY 1, 2;"),a=await A(t.data),!a)?!1:(x(a)==0&&!p.quiet?i&&l?M('Did not find any settings \
for role "%s" and database "%s".',i,l):i?M('Did not find any settings for role "%s".',i):M("Did not find any settings."):
(n.nullPrint=null,n.title=N("List of settings"),n.translate_header=!0,k(a,n,p.queryFout,!1,p.logfile)),!0)}async function Ya(i,l){
let t={},a,n=p.popt;return D(t),u(t,`SELECT m.rolname AS "%s", r.rolname AS "%s",
  pg_catalog.concat_ws(', ',
`,s("Role name"),s("Member of")),p.sversion>=16e4?r(t,`    CASE WHEN pam.admin_option THEN 'ADMIN' END,
    CASE WHEN pam.inherit_option THEN 'INHERIT' END,
    CASE WHEN pam.set_option THEN 'SET' END
`):r(t,`    CASE WHEN pam.admin_option THEN 'ADMIN' END,
    CASE WHEN m.rolinherit THEN 'INHERIT' END,
    'SET'
`),E(t,`  ) AS "%s",
  g.rolname AS "%s"
`,s("Options"),s("Grantor")),r(t,`FROM pg_catalog.pg_roles m
     JOIN pg_catalog.pg_auth_members pam ON (pam.member = m.oid)
     LEFT JOIN pg_catalog.pg_roles r ON (pam.roleid = r.oid)
     LEFT JOIN pg_catalog.pg_roles g ON (pam.grantor = g.oid)
`),!l&&!i&&r(t,`WHERE m.rolname !~ '^pg_'
`),!U(t,i,!1,!1,null,"m.rolname",null,null,null,1)||(r(t,`ORDER BY 1, 2, 4;
`),a=await A(t.data),!a)?!1:(n.nullPrint=null,n.title=N("List of role grants"),n.translate_header=!0,k(a,n,p.queryFout,!1,
p.logfile),!0)}async function pa(i,l,t,a){let n=K(i,"t")!=null,e=K(i,"i")!=null,o=K(i,"v")!=null,L=K(i,"m")!=null,d=K(i,
"s")!=null,c=K(i,"E")!=null,b={},T,S=p.popt,I,w=[!1,!1,!0,!1,!1,!1,!1,!1,!1];return n||e||o||L||d||c||(n=o=L=d=c=!0),D(b),
u(b,`SELECT n.nspname as "%s",
  c.relname as "%s",
  CASE c.relkind WHEN 'r' THEN '%s' WHEN 'v' THEN '%s' WHEN 'm' THEN '%s' WHEN 'i' THEN '%s' WHEN 'S' THEN '%s' WHEN 't'\
 THEN '%s' WHEN 'f' THEN '%s' WHEN 'p' THEN '%s' WHEN 'I' THEN '%s' END as "%s",
  pg_catalog.pg_get_userbyid(c.relowner) as "%s"`,s("Schema"),s("Name"),s("table"),s("view"),s("materialized view"),s("i\
ndex"),s("sequence"),s("TOAST table"),s("foreign table"),s("partitioned table"),s("partitioned index"),s("Type"),s("Owne\
r")),I=4,e&&(E(b,`,
  c2.relname as "%s"`,s("Table")),I++),t&&(E(b,`,
  CASE c.relpersistence WHEN 'p' THEN '%s' WHEN 't' THEN '%s' WHEN 'u' THEN '%s' END as "%s"`,s("permanent"),s("temporar\
y"),s("unlogged"),s("Persistence")),w[I]=!0,p.sversion>=12e4&&!p.hide_tableam&&(n||L||e)&&E(b,`,
  am.amname as "%s"`,s("Access method")),E(b,`,
  pg_catalog.pg_size_pretty(pg_catalog.pg_table_size(c.oid)) as "%s",
  pg_catalog.obj_description(c.oid, 'pg_class') as "%s"`,s("Size"),s("Description"))),r(b,`
FROM pg_catalog.pg_class c
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace`),p.sversion>=12e4&&!p.hide_tableam&&(n||L||e)&&r(b,`\

     LEFT JOIN pg_catalog.pg_am am ON am.oid = c.relam`),e&&r(b,`
     LEFT JOIN pg_catalog.pg_index i ON i.indexrelid = c.oid
     LEFT JOIN pg_catalog.pg_class c2 ON i.indrelid = c2.oid`),r(b,`
WHERE c.relkind IN (`),n&&(r(b,"'r','p',"),(a||l)&&r(b,"'t',")),o&&r(b,"'v',"),L&&r(b,"'m',"),e&&r(b,"'i','I',"),d&&r(b,
"'S',"),(a||l)&&r(b,"'s',"),c&&r(b,"'f',"),r(b,"''"),r(b,`)
`),!a&&!l&&r(b,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname !~ '^pg_toast'
      AND n.nspname <> 'information_schema'
`),!U(b,l,!0,!1,"n.nspname","c.relname",null,"pg_catalog.pg_table_is_visible(c.oid)",null,3)||(r(b,"ORDER BY 1,2;"),T=await A(
b.data),!T)?!1:(x(T)==0&&!p.quiet?l?M('Did not find any relation named "%s".',l):M("Did not find any relations."):(S.nullPrint=
null,S.title=N("List of relations"),S.translate_header=!0,S.translate_columns=w,S.n_translate_columns=V(w),k(T,S,p.queryFout,
!1,p.logfile)),!0)}async function Ba(i,l,t){let a=K(i,"t")!=null,n=K(i,"i")!=null,e=K(i,"n")!=null,o={},L={},d,c=p.popt,
b=[!1,!1,!1,!1,!1,!1,!1,!1,!1],T,S=!1;if(p.sversion<1e5){let I;return M("The server (version %s) does not support declar\
ative table partitioning.",Ee(p.sversion,!1,I,ue(I))),!0}return!a&&!n&&(a=n=!0),n&&!a?T=N("List of partitioned indexes"):
a&&!n?T=N("List of partitioned tables"):(T=N("List of partitioned relations"),S=!0),D(o),u(o,`SELECT n.nspname as "%s",
  c.relname as "%s",
  pg_catalog.pg_get_userbyid(c.relowner) as "%s"`,s("Schema"),s("Name"),s("Owner")),S&&(E(o,`,
  CASE c.relkind WHEN 'p' THEN '%s' WHEN 'I' THEN '%s' END as "%s"`,s("partitioned table"),s("partitioned index"),s("Typ\
e")),b[3]=!0),(e||l)&&E(o,`,
  inh.inhparent::pg_catalog.regclass as "%s"`,s("Parent name")),n&&E(o,`,
 c2.oid::pg_catalog.regclass as "%s"`,s("Table")),t&&(e&&E(o,`,
  s.dps as "%s"`,s("Leaf partition size")),E(o,`,
  s.tps as "%s"`,s("Total size")),E(o,`,
  pg_catalog.obj_description(c.oid, 'pg_class') as "%s"`,s("Description"))),r(o,`
FROM pg_catalog.pg_class c
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace`),n&&r(o,`
     LEFT JOIN pg_catalog.pg_index i ON i.indexrelid = c.oid
     LEFT JOIN pg_catalog.pg_class c2 ON i.indrelid = c2.oid`),(e||l)&&r(o,`
     LEFT JOIN pg_catalog.pg_inherits inh ON c.oid = inh.inhrelid`),t&&(p.sversion<12e4?r(o,`,
     LATERAL (WITH RECURSIVE d
                AS (SELECT inhrelid AS oid, 1 AS level
                      FROM pg_catalog.pg_inherits
                     WHERE inhparent = c.oid
                    UNION ALL
                    SELECT inhrelid, level + 1
                      FROM pg_catalog.pg_inherits i
                           JOIN d ON i.inhparent = d.oid)
                SELECT pg_catalog.pg_size_pretty(sum(pg_catalog.pg_table_size(d.oid))) AS tps,
                       pg_catalog.pg_size_pretty(sum(
             CASE WHEN d.level = 1 THEN pg_catalog.pg_table_size(d.oid) ELSE 0 END)) AS dps
               FROM d) s`):r(o,`,
     LATERAL (SELECT pg_catalog.pg_size_pretty(sum(
                 CASE WHEN ppt.isleaf AND ppt.level = 1
                      THEN pg_catalog.pg_table_size(ppt.relid) ELSE 0 END)) AS dps,
                     pg_catalog.pg_size_pretty(sum(pg_catalog.pg_table_size(ppt.relid))) AS tps
              FROM pg_catalog.pg_partition_tree(c.oid) ppt) s`)),r(o,`
WHERE c.relkind IN (`),a&&r(o,"'p',"),n&&r(o,"'I',"),r(o,"''"),r(o,`)
`),r(o,!e&&!l?` AND NOT c.relispartition
`:""),l||r(o,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname !~ '^pg_toast'
      AND n.nspname <> 'information_schema'
`),!U(o,l,!0,!1,"n.nspname","c.relname",null,"pg_catalog.pg_table_is_visible(c.oid)",null,3)||(E(o,'ORDER BY "Schema", %\
s%s"Name";',S?'"Type" DESC, ':"",e||l?'"Parent name" NULLS FIRST, ':""),d=await A(o.data),!d)?!1:(D(L),r(L,T),c.nullPrint=
null,c.title=L.data,c.translate_header=!0,c.translate_columns=b,c.n_translate_columns=V(b),k(d,c,p.queryFout,!1,p.logfile),
!0)}async function ja(i,l,t){let a={},n,e=p.popt;return D(a),u(a,`SELECT l.lanname AS "%s",
       pg_catalog.pg_get_userbyid(l.lanowner) as "%s",
       l.lanpltrusted AS "%s"`,s("Name"),s("Owner"),s("Trusted")),l&&(E(a,`,
       NOT l.lanispl AS "%s",
       l.lanplcallfoid::pg_catalog.regprocedure AS "%s",
       l.lanvalidator::pg_catalog.regprocedure AS "%s",
       l.laninline::pg_catalog.regprocedure AS "%s",
       `,s("Internal language"),s("Call handler"),s("Validator"),s("Inline handler")),ne(a,"l.lanacl")),E(a,`,
       d.description AS "%s"
FROM pg_catalog.pg_language l
LEFT JOIN pg_catalog.pg_description d
  ON d.classoid = l.tableoid AND d.objoid = l.oid
  AND d.objsubid = 0
`,s("Description")),i&&!U(a,i,!1,!1,null,"l.lanname",null,null,null,2)||(!t&&!i&&r(a,`WHERE l.lanplcallfoid != 0
`),r(a,"ORDER BY 1;"),n=await A(a.data),!n)?!1:(e.nullPrint=null,e.title=N("List of languages"),e.translate_header=!0,k(
n,e,p.queryFout,!1,p.logfile),!0)}async function za(i,l,t){let a={},n,e=p.popt;return D(a),u(a,`SELECT n.nspname as "%s"\
,
       t.typname as "%s",
       pg_catalog.format_type(t.typbasetype, t.typtypmod) as "%s",
       (SELECT c.collname FROM pg_catalog.pg_collation c, pg_catalog.pg_type bt
        WHERE c.oid = t.typcollation AND bt.oid = t.typbasetype AND t.typcollation <> bt.typcollation) as "%s",
       CASE WHEN t.typnotnull THEN 'not null' END as "%s",
       t.typdefault as "%s",
       pg_catalog.array_to_string(ARRAY(
         SELECT pg_catalog.pg_get_constraintdef(r.oid, true) FROM pg_catalog.pg_constraint r WHERE t.oid = r.contypid
       ), ' ') as "%s"`,s("Schema"),s("Name"),s("Type"),s("Collation"),s("Nullable"),s("Default"),s("Check")),l&&(r(a,`,\

  `),ne(a,"t.typacl"),E(a,`,
       d.description as "%s"`,s("Description"))),r(a,`
FROM pg_catalog.pg_type t
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = t.typnamespace
`),l&&r(a,`     LEFT JOIN pg_catalog.pg_description d ON d.classoid = t.tableoid AND d.objoid = t.oid AND d.objsubid = 0\

`),r(a,`WHERE t.typtype = 'd'
`),!t&&!i&&r(a,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!U(a,i,!0,!1,"n.nspname","t.typname",null,"pg_catalog.pg_type_is_visible(t.oid)",null,3)||(r(a,"ORDER BY 1, 2;"),n=await A(
a.data),!n)?!1:(e.nullPrint=null,e.title=N("List of domains"),e.translate_header=!0,k(n,e,p.queryFout,!1,p.logfile),!0)}
async function Qa(i,l,t){let a={},n,e=p.popt,o=[!1,!1,!1,!1,!0,!1];return D(a),u(a,`SELECT n.nspname AS "%s",
       c.conname AS "%s",
       pg_catalog.pg_encoding_to_char(c.conforencoding) AS "%s",
       pg_catalog.pg_encoding_to_char(c.contoencoding) AS "%s",
       CASE WHEN c.condefault THEN '%s'
       ELSE '%s' END AS "%s"`,s("Schema"),s("Name"),s("Source"),s("Destination"),s("yes"),s("no"),s("Default?")),l&&E(a,
`,
       d.description AS "%s"`,s("Description")),r(a,`
FROM pg_catalog.pg_conversion c
     JOIN pg_catalog.pg_namespace n ON n.oid = c.connamespace
`),l&&r(a,`LEFT JOIN pg_catalog.pg_description d ON d.classoid = c.tableoid
          AND d.objoid = c.oid AND d.objsubid = 0
`),r(a,`WHERE true
`),!t&&!i&&r(a,`  AND n.nspname <> 'pg_catalog'
  AND n.nspname <> 'information_schema'
`),!U(a,i,!0,!1,"n.nspname","c.conname",null,"pg_catalog.pg_conversion_is_visible(c.oid)",null,3)||(r(a,"ORDER BY 1, 2;"),
n=await A(a.data),!n)?!1:(e.nullPrint=null,e.title=N("List of conversions"),e.translate_header=!0,e.translate_columns=o,
e.n_translate_columns=V(o),k(n,e,p.queryFout,!1,p.logfile),!0)}async function Ka(i,l,t){let a={},n,e=p.popt;return D(a),
u(a,'SELECT s.name AS "%s", pg_catalog.current_setting(s.name) AS "%s"',s("Parameter"),s("Value")),l&&(E(a,', s.vartype \
AS "%s", s.context AS "%s", ',s("Type"),s("Context")),p.sversion>=15e4?ne(a,"p.paracl"):E(a,'NULL AS "%s"',s("Access pri\
vileges"))),r(a,`
FROM pg_catalog.pg_settings s
`),l&&p.sversion>=15e4&&r(a,`  LEFT JOIN pg_catalog.pg_parameter_acl p
  ON pg_catalog.lower(s.name) = p.parname
`),i?ie(p.db,a,i,!1,!1,null,"pg_catalog.lower(s.name)",null,null,null,null):r(a,`WHERE s.source <> 'default' AND
      s.setting IS DISTINCT FROM s.boot_val
`),r(a,"ORDER BY 1;"),n=await A(a.data),n?(e.nullPrint=null,i?e.title=N("List of configuration parameters"):e.title=N("L\
ist of non-default configuration parameters"),e.translate_header=!0,k(n,e,p.queryFout,!1,p.logfile),!0):!1}async function Va(i,l){
let t={},a,n=p.popt,e=[!1,!1,!1,!0,!1,!1,!1];if(p.sversion<90300){let o;return M("The server (version %s) does not suppo\
rt event triggers.",Ee(p.sversion,!1,o,ue(o))),!0}return D(t),u(t,`SELECT evtname as "%s", evtevent as "%s", pg_catalog.\
pg_get_userbyid(e.evtowner) as "%s",
 case evtenabled when 'O' then '%s'  when 'R' then '%s'  when 'A' then '%s'  when 'D' then '%s' end as "%s",
 e.evtfoid::pg_catalog.regproc as "%s", pg_catalog.array_to_string(array(select x from pg_catalog.unnest(evttags) as t(x\
)), ', ') as "%s"`,s("Name"),s("Event"),s("Owner"),s("enabled"),s("replica"),s("always"),s("disabled"),s("Enabled"),s("F\
unction"),s("Tags")),l&&E(t,`,
pg_catalog.obj_description(e.oid, 'pg_event_trigger') as "%s"`,s("Description")),r(t,`
FROM pg_catalog.pg_event_trigger e `),!U(t,i,!1,!1,null,"evtname",null,null,null,1)||(r(t,"ORDER BY 1"),a=await A(t.data),
!a)?!1:(n.nullPrint=null,n.title=N("List of event triggers"),n.translate_header=!0,n.translate_columns=e,n.n_translate_columns=
V(e),k(a,n,p.queryFout,!1,p.logfile),!0)}async function $a(i){let l={},t,a=p.popt;if(p.sversion<1e5){let n;return M("The\
 server (version %s) does not support extended statistics.",Ee(p.sversion,!1,n,ue(n))),!0}return D(l),u(l,`SELECT 
es.stxnamespace::pg_catalog.regnamespace::pg_catalog.text AS "%s", 
es.stxname AS "%s", 
`,s("Schema"),s("Name")),p.sversion>=14e4?E(l,`pg_catalog.format('%%s FROM %%s', 
  pg_catalog.pg_get_statisticsobjdef_columns(es.oid), 
  es.stxrelid::pg_catalog.regclass) AS "%s"`,s("Definition")):E(l,`pg_catalog.format('%%s FROM %%s', 
  (SELECT pg_catalog.string_agg(pg_catalog.quote_ident(a.attname),', ') 
   FROM pg_catalog.unnest(es.stxkeys) s(attnum) 
   JOIN pg_catalog.pg_attribute a 
   ON (es.stxrelid = a.attrelid 
   AND a.attnum = s.attnum 
   AND NOT a.attisdropped)), 
es.stxrelid::pg_catalog.regclass) AS "%s"`,s("Definition")),E(l,`,
CASE WHEN 'd' = any(es.stxkind) THEN 'defined' 
END AS "%s", 
CASE WHEN 'f' = any(es.stxkind) THEN 'defined' 
END AS "%s"`,s("Ndistinct"),s("Dependencies")),p.sversion>=12e4&&E(l,`,
CASE WHEN 'm' = any(es.stxkind) THEN 'defined' 
END AS "%s" `,s("MCV")),r(l,` 
FROM pg_catalog.pg_statistic_ext es 
`),!U(l,i,!1,!1,"es.stxnamespace::pg_catalog.regnamespace::pg_catalog.text","es.stxname",null,"pg_catalog.pg_statistics_\
obj_is_visible(es.oid)",null,3)||(r(l,"ORDER BY 1, 2;"),t=await A(l.data),!t)?!1:(a.nullPrint=null,a.title=N("List of ex\
tended statistics"),a.translate_header=!0,k(t,a,p.queryFout,!1,p.logfile),!0)}async function Ga(i,l){let t={},a,n=p.popt,
e=[!1,!1,!1,!0,!1];return D(t),u(t,`SELECT pg_catalog.format_type(castsource, NULL) AS "%s",
       pg_catalog.format_type(casttarget, NULL) AS "%s",
`,s("Source type"),s("Target type")),E(t,`       CASE WHEN c.castmethod = '%c' THEN '(binary coercible)'
            WHEN c.castmethod = '%c' THEN '(with inout)'
            ELSE p.proname
       END AS "%s",
`,yt,Dt,s("Function")),E(t,`       CASE WHEN c.castcontext = '%c' THEN '%s'
            WHEN c.castcontext = '%c' THEN '%s'
            ELSE '%s'
       END AS "%s"`,ht,s("no"),Ut,s("in assignment"),s("yes"),s("Implicit?")),l&&E(t,`,
       d.description AS "%s"`,s("Description")),r(t,`
FROM pg_catalog.pg_cast c LEFT JOIN pg_catalog.pg_proc p
     ON c.castfunc = p.oid
     LEFT JOIN pg_catalog.pg_type ts
     ON c.castsource = ts.oid
     LEFT JOIN pg_catalog.pg_namespace ns
     ON ns.oid = ts.typnamespace
     LEFT JOIN pg_catalog.pg_type tt
     ON c.casttarget = tt.oid
     LEFT JOIN pg_catalog.pg_namespace nt
     ON nt.oid = tt.typnamespace
`),l&&r(t,`     LEFT JOIN pg_catalog.pg_description d
     ON d.classoid = c.tableoid AND d.objoid = c.oid AND d.objsubid = 0
`),r(t,"WHERE ( (true"),!U(t,i,!0,!1,"ns.nspname","ts.typname","pg_catalog.format_type(ts.oid, NULL)","pg_catalog.pg_typ\
e_is_visible(ts.oid)",null,3)||(r(t,") OR (true"),!U(t,i,!0,!1,"nt.nspname","tt.typname","pg_catalog.format_type(tt.oid,\
 NULL)","pg_catalog.pg_type_is_visible(tt.oid)",null,3))||(r(t,`) )
ORDER BY 1, 2;`),a=await A(t.data),!a)?!1:(n.nullPrint=null,n.title=N("List of casts"),n.translate_header=!0,n.translate_columns=
e,n.n_translate_columns=V(e),k(a,n,p.queryFout,!1,p.logfile),!0)}async function Xa(i,l,t){let a={},n,e=p.popt,o=[!1,!1,!1,
!1,!1,!1,!1,!0,!1];return D(a),u(a,`SELECT
  n.nspname AS "%s",
  c.collname AS "%s",
`,s("Schema"),s("Name")),p.sversion>=1e5?E(a,`  CASE c.collprovider WHEN 'd' THEN 'default' WHEN 'c' THEN 'libc' WHEN 'i\
' THEN 'icu' END AS "%s",
`,s("Provider")):E(a,`  'libc' AS "%s",
`,s("Provider")),E(a,`  c.collcollate AS "%s",
  c.collctype AS "%s",
`,s("Collate"),s("Ctype")),p.sversion>=15e4?E(a,`  c.colliculocale AS "%s",
`,s("ICU Locale")):E(a,`  c.collcollate AS "%s",
`,s("ICU Locale")),p.sversion>=16e4?E(a,`  c.collicurules AS "%s",
`,s("ICU Rules")):E(a,`  NULL AS "%s",
`,s("ICU Rules")),p.sversion>=12e4?E(a,`  CASE WHEN c.collisdeterministic THEN '%s' ELSE '%s' END AS "%s"`,s("yes"),s("n\
o"),s("Deterministic?")):E(a,`  '%s' AS "%s"`,s("yes"),s("Deterministic?")),l&&E(a,`,
  pg_catalog.obj_description(c.oid, 'pg_collation') AS "%s"`,s("Description")),r(a,`
FROM pg_catalog.pg_collation c, pg_catalog.pg_namespace n
WHERE n.oid = c.collnamespace
`),!t&&!i&&r(a,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),r(a,`      AND c.collencoding IN (-1, pg_catalog.pg_char_to_encoding(pg_catalog.getdatabaseencoding()))
`),!U(a,i,!0,!1,"n.nspname","c.collname",null,"pg_catalog.pg_collation_is_visible(c.oid)",null,3)||(r(a,"ORDER BY 1, 2;"),
n=await A(a.data),!n)?!1:(e.nullPrint=null,e.title=N("List of collations"),e.translate_header=!0,e.translate_columns=o,e.
n_translate_columns=V(o),k(n,e,p.queryFout,!1,p.logfile),!0)}async function Za(i,l,t){let a={},n,e=p.popt,o=0,L=null;if(D(
a),u(a,`SELECT n.nspname AS "%s",
  pg_catalog.pg_get_userbyid(n.nspowner) AS "%s"`,s("Name"),s("Owner")),l&&(r(a,`,
  `),ne(a,"n.nspacl"),E(a,`,
  pg_catalog.obj_description(n.oid, 'pg_namespace') AS "%s"`,s("Description"))),r(a,`
FROM pg_catalog.pg_namespace n
`),!t&&!i&&r(a,`WHERE n.nspname !~ '^pg_' AND n.nspname <> 'information_schema'
`),!U(a,i,!t&&!i,!1,null,"n.nspname",null,null,null,2)||(r(a,"ORDER BY 1;"),n=await A(a.data),!n))return!1;if(e.nullPrint=
null,e.title=N("List of schemas"),e.translate_header=!0,i&&p.sversion>=15e4){let d,c;if(u(a,`SELECT pubname 
FROM pg_catalog.pg_publication p
     JOIN pg_catalog.pg_publication_namespace pn ON p.oid = pn.pnpubid
     JOIN pg_catalog.pg_namespace n ON n.oid = pn.pnnspid 
WHERE n.nspname = '%s'
ORDER BY 1`,i),d=await A(a.data),d)o=x(d);else return!1;if(o>0){for(L=[],L[0]=Se(N("Publications:")),c=0;c<o;c++)u(a,'  \
  "%s"',f(d,c,0)),L[c+1]=Se(a.data);L[c+1]=null,e.footers=L}}return k(n,e,p.queryFout,!1,p.logfile),!0}async function et(i,l){
let t={},a,n=p.popt;return l?await at(i):(D(t),u(t,`SELECT
  n.nspname as "%s",
  p.prsname as "%s",
  pg_catalog.obj_description(p.oid, 'pg_ts_parser') as "%s"
FROM pg_catalog.pg_ts_parser p
LEFT JOIN pg_catalog.pg_namespace n ON n.oid = p.prsnamespace
`,s("Schema"),s("Name"),s("Description")),!U(t,i,!1,!1,"n.nspname","p.prsname",null,"pg_catalog.pg_ts_parser_is_visible(\
p.oid)",null,3)||(r(t,"ORDER BY 1, 2;"),a=await A(t.data),!a)?!1:(n.nullPrint=null,n.title=N("List of text search parser\
s"),n.translate_header=!0,k(a,n,p.queryFout,!1,p.logfile),!0))}async function at(i){let l={},t,a;if(D(l),u(l,`SELECT p.o\
id,
  n.nspname,
  p.prsname
FROM pg_catalog.pg_ts_parser p
LEFT JOIN pg_catalog.pg_namespace n ON n.oid = p.prsnamespace
`),!U(l,i,!1,!1,"n.nspname","p.prsname",null,"pg_catalog.pg_ts_parser_is_visible(p.oid)",null,3)||(r(l,"ORDER BY 1, 2;"),
t=await A(l.data),!t))return!1;if(x(t)==0)return p.quiet||(i?M('Did not find any text search parser named "%s".',i):M("D\
id not find any text search parsers.")),!1;for(a=0;a<x(t);a++){let n,e=null,o;if(n=f(t,a,0),ee(t,a,1)||(e=f(t,a,1)),o=f(
t,a,2),!await tt(n,e,o)||j)return!1}return!0}async function tt(i,l,t){let a={},n,e={},o=p.popt,L=[!0,!1,!1];return D(a),
u(a,`SELECT '%s' AS "%s",
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
 WHERE p.oid = '%s';`,s("Start parse"),s("Method"),s("Function"),s("Description"),i,s("Get next token"),i,s("End parse"),
i,s("Get headline"),i,s("Get token types"),i),n=await A(a.data),!n||(o.nullPrint=null,D(e),l?u(e,N('Text search parser "\
%s.%s"'),l,t):u(e,N('Text search parser "%s"'),t),o.title=e.data,o.footers=null,o.topt.default_footer=!1,o.translate_header=
!0,o.translate_columns=L,o.n_translate_columns=V(L),k(n,o,p.queryFout,!1,p.logfile),D(a),u(a,`SELECT t.alias as "%s",
  t.description as "%s"
FROM pg_catalog.ts_token_type( '%s'::pg_catalog.oid ) as t
ORDER BY 1;`,s("Token name"),s("Description"),i),n=await A(a.data),!n)?!1:(o.nullPrint=null,l?u(e,N('Token types for par\
ser "%s.%s"'),l,t):u(e,N('Token types for parser "%s"'),t),o.title=e.data,o.footers=null,o.topt.default_footer=!0,o.translate_header=
!0,o.translate_columns=null,o.n_translate_columns=0,k(n,o,p.queryFout,!1,p.logfile),!0)}async function nt(i,l){let t={},
a,n=p.popt;return D(t),u(t,`SELECT
  n.nspname as "%s",
  d.dictname as "%s",
`,s("Schema"),s("Name")),l&&E(t,`  ( SELECT COALESCE(nt.nspname, '(null)')::pg_catalog.text || '.' || t.tmplname FROM
    pg_catalog.pg_ts_template t
    LEFT JOIN pg_catalog.pg_namespace nt ON nt.oid = t.tmplnamespace
    WHERE d.dicttemplate = t.oid ) AS  "%s",
  d.dictinitoption as "%s",
`,s("Template"),s("Init options")),E(t,`  pg_catalog.obj_description(d.oid, 'pg_ts_dict') as "%s"
`,s("Description")),r(t,`FROM pg_catalog.pg_ts_dict d
LEFT JOIN pg_catalog.pg_namespace n ON n.oid = d.dictnamespace
`),!U(t,i,!1,!1,"n.nspname","d.dictname",null,"pg_catalog.pg_ts_dict_is_visible(d.oid)",null,3)||(r(t,"ORDER BY 1, 2;"),
a=await A(t.data),!a)?!1:(n.nullPrint=null,n.title=N("List of text search dictionaries"),n.translate_header=!0,k(a,n,p.queryFout,
!1,p.logfile),!0)}async function st(i,l){let t={},a,n=p.popt;return D(t),l?u(t,`SELECT
  n.nspname AS "%s",
  t.tmplname AS "%s",
  t.tmplinit::pg_catalog.regproc AS "%s",
  t.tmpllexize::pg_catalog.regproc AS "%s",
  pg_catalog.obj_description(t.oid, 'pg_ts_template') AS "%s"
`,s("Schema"),s("Name"),s("Init"),s("Lexize"),s("Description")):u(t,`SELECT
  n.nspname AS "%s",
  t.tmplname AS "%s",
  pg_catalog.obj_description(t.oid, 'pg_ts_template') AS "%s"
`,s("Schema"),s("Name"),s("Description")),r(t,`FROM pg_catalog.pg_ts_template t
LEFT JOIN pg_catalog.pg_namespace n ON n.oid = t.tmplnamespace
`),!U(t,i,!1,!1,"n.nspname","t.tmplname",null,"pg_catalog.pg_ts_template_is_visible(t.oid)",null,3)||(r(t,"ORDER BY 1, 2\
;"),a=await A(t.data),!a)?!1:(n.nullPrint=null,n.title=N("List of text search templates"),n.translate_header=!0,k(a,n,p.
queryFout,!1,p.logfile),!0)}async function lt(i,l){let t={},a,n=p.popt;return l?await it(i):(D(t),u(t,`SELECT
   n.nspname as "%s",
   c.cfgname as "%s",
   pg_catalog.obj_description(c.oid, 'pg_ts_config') as "%s"
FROM pg_catalog.pg_ts_config c
LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.cfgnamespace
`,s("Schema"),s("Name"),s("Description")),!U(t,i,!1,!1,"n.nspname","c.cfgname",null,"pg_catalog.pg_ts_config_is_visible(\
c.oid)",null,3)||(r(t,"ORDER BY 1, 2;"),a=await A(t.data),!a)?!1:(n.nullPrint=null,n.title=N("List of text search config\
urations"),n.translate_header=!0,k(a,n,p.queryFout,!1,p.logfile),!0))}async function it(i){let l={},t,a;if(D(l),u(l,`SEL\
ECT c.oid, c.cfgname,
   n.nspname,
   p.prsname,
   np.nspname as pnspname
FROM pg_catalog.pg_ts_config c
   LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.cfgnamespace,
 pg_catalog.pg_ts_parser p
   LEFT JOIN pg_catalog.pg_namespace np ON np.oid = p.prsnamespace
WHERE  p.oid = c.cfgparser
`),!U(l,i,!0,!1,"n.nspname","c.cfgname",null,"pg_catalog.pg_ts_config_is_visible(c.oid)",null,3)||(r(l,"ORDER BY 3, 2;"),
t=await A(l.data),!t))return!1;if(x(t)==0)return p.quiet||(i?M('Did not find any text search configuration named "%s".',
i):M("Did not find any text search configurations.")),!1;for(a=0;a<x(t);a++){let n,e,o=null,L,d=null;if(n=f(t,a,0),e=f(t,
a,1),ee(t,a,2)||(o=f(t,a,2)),L=f(t,a,3),ee(t,a,4)||(d=f(t,a,4)),!await rt(n,o,e,d,L)||j)return!1}return!0}async function rt(i,l,t,a,n){
let e={},o={},L,d=p.popt;return D(e),u(e,`SELECT
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
ORDER BY 1;`,s("Token"),s("Dictionaries"),i),L=await A(e.data),L?(D(o),l?E(o,N('Text search configuration "%s.%s"'),l,t):
E(o,N('Text search configuration "%s"'),t),a?E(o,N(`
Parser: "%s.%s"`),a,n):E(o,N(`
Parser: "%s"`),n),d.nullPrint=null,d.title=o.data,d.footers=null,d.topt.default_footer=!1,d.translate_header=!0,k(L,d,p.
queryFout,!1,p.logfile),!0):!1}async function ot(i,l){let t={},a,n=p.popt;return D(t),u(t,`SELECT fdw.fdwname AS "%s",
  pg_catalog.pg_get_userbyid(fdw.fdwowner) AS "%s",
  fdw.fdwhandler::pg_catalog.regproc AS "%s",
  fdw.fdwvalidator::pg_catalog.regproc AS "%s"`,s("Name"),s("Owner"),s("Handler"),s("Validator")),l&&(r(t,`,
  `),ne(t,"fdwacl"),E(t,`,
 CASE WHEN fdwoptions IS NULL THEN '' ELSE   '(' || pg_catalog.array_to_string(ARRAY(SELECT   pg_catalog.quote_ident(opt\
ion_name) ||  ' ' ||   pg_catalog.quote_literal(option_value)  FROM   pg_catalog.pg_options_to_table(fdwoptions)),  ', '\
) || ')'   END AS "%s",
  d.description AS "%s" `,s("FDW options"),s("Description"))),r(t,`
FROM pg_catalog.pg_foreign_data_wrapper fdw
`),l&&r(t,`LEFT JOIN pg_catalog.pg_description d
       ON d.classoid = fdw.tableoid AND d.objoid = fdw.oid AND d.objsubid = 0
`),!U(t,i,!1,!1,null,"fdwname",null,null,null,1)||(r(t,"ORDER BY 1;"),a=await A(t.data),!a)?!1:(n.nullPrint=null,n.title=
N("List of foreign-data wrappers"),n.translate_header=!0,k(a,n,p.queryFout,!1,p.logfile),!0)}async function pt(i,l){let t={},
a,n=p.popt;return D(t),u(t,`SELECT s.srvname AS "%s",
  pg_catalog.pg_get_userbyid(s.srvowner) AS "%s",
  f.fdwname AS "%s"`,s("Name"),s("Owner"),s("Foreign-data wrapper")),l&&(r(t,`,
  `),ne(t,"s.srvacl"),E(t,`,
  s.srvtype AS "%s",
  s.srvversion AS "%s",
  CASE WHEN srvoptions IS NULL THEN '' ELSE   '(' || pg_catalog.array_to_string(ARRAY(SELECT   pg_catalog.quote_ident(op\
tion_name) ||  ' ' ||   pg_catalog.quote_literal(option_value)  FROM   pg_catalog.pg_options_to_table(srvoptions)),  ', \
') || ')'   END AS "%s",
  d.description AS "%s"`,s("Type"),s("Version"),s("FDW options"),s("Description"))),r(t,`
FROM pg_catalog.pg_foreign_server s
     JOIN pg_catalog.pg_foreign_data_wrapper f ON f.oid=s.srvfdw
`),l&&r(t,`LEFT JOIN pg_catalog.pg_description d
       ON d.classoid = s.tableoid AND d.objoid = s.oid AND d.objsubid = 0
`),!U(t,i,!1,!1,null,"s.srvname",null,null,null,1)||(r(t,"ORDER BY 1;"),a=await A(t.data),!a)?!1:(n.nullPrint=null,n.title=
N("List of foreign servers"),n.translate_header=!0,k(a,n,p.queryFout,!1,p.logfile),!0)}async function ct(i,l){let t={},a,
n=p.popt;return D(t),u(t,`SELECT um.srvname AS "%s",
  um.usename AS "%s"`,s("Server"),s("User name")),l&&E(t,`,
 CASE WHEN umoptions IS NULL THEN '' ELSE   '(' || pg_catalog.array_to_string(ARRAY(SELECT   pg_catalog.quote_ident(opti\
on_name) ||  ' ' ||   pg_catalog.quote_literal(option_value)  FROM   pg_catalog.pg_options_to_table(umoptions)),  ', ') \
|| ')'   END AS "%s"`,s("FDW options")),r(t,`
FROM pg_catalog.pg_user_mappings um
`),!U(t,i,!1,!1,null,"um.srvname","um.usename",null,null,1)||(r(t,"ORDER BY 1, 2;"),a=await A(t.data),!a)?!1:(n.nullPrint=
null,n.title=N("List of user mappings"),n.translate_header=!0,k(a,n,p.queryFout,!1,p.logfile),!0)}async function gt(i,l){
let t={},a,n=p.popt;return D(t),u(t,`SELECT n.nspname AS "%s",
  c.relname AS "%s",
  s.srvname AS "%s"`,s("Schema"),s("Table"),s("Server")),l&&E(t,`,
 CASE WHEN ftoptions IS NULL THEN '' ELSE   '(' || pg_catalog.array_to_string(ARRAY(SELECT   pg_catalog.quote_ident(opti\
on_name) ||  ' ' ||   pg_catalog.quote_literal(option_value)  FROM   pg_catalog.pg_options_to_table(ftoptions)),  ', ') \
|| ')'   END AS "%s",
  d.description AS "%s"`,s("FDW options"),s("Description")),r(t,`
FROM pg_catalog.pg_foreign_table ft
  INNER JOIN pg_catalog.pg_class c ON c.oid = ft.ftrelid
  INNER JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
  INNER JOIN pg_catalog.pg_foreign_server s ON s.oid = ft.ftserver
`),l&&r(t,`   LEFT JOIN pg_catalog.pg_description d
          ON d.classoid = c.tableoid AND d.objoid = c.oid AND d.objsubid = 0
`),!U(t,i,!1,!1,"n.nspname","c.relname",null,"pg_catalog.pg_table_is_visible(c.oid)",null,3)||(r(t,"ORDER BY 1, 2;"),a=await A(
t.data),!a)?!1:(n.nullPrint=null,n.title=N("List of foreign tables"),n.translate_header=!0,k(a,n,p.queryFout,!1,p.logfile),
!0)}async function ft(i){let l={},t,a=p.popt;return D(l),u(l,`SELECT e.extname AS "%s", e.extversion AS "%s", n.nspname \
AS "%s", c.description AS "%s"
FROM pg_catalog.pg_extension e LEFT JOIN pg_catalog.pg_namespace n ON n.oid = e.extnamespace LEFT JOIN pg_catalog.pg_des\
cription c ON c.objoid = e.oid AND c.classoid = 'pg_catalog.pg_extension'::pg_catalog.regclass
`,s("Name"),s("Version"),s("Schema"),s("Description")),!U(l,i,!1,!1,null,"e.extname",null,null,null,1)||(r(l,"ORDER BY 1\
;"),t=await A(l.data),!t)?!1:(a.nullPrint=null,a.title=N("List of installed extensions"),a.translate_header=!0,k(t,a,p.queryFout,
!1,p.logfile),!0)}async function _t(i){let l={},t,a;if(D(l),u(l,`SELECT e.extname, e.oid
FROM pg_catalog.pg_extension e
`),!U(l,i,!1,!1,null,"e.extname",null,null,null,1)||(r(l,"ORDER BY 1;"),t=await A(l.data),!t))return!1;if(x(t)==0)return p.
quiet||(i?M('Did not find any extension named "%s".',i):M("Did not find any extensions.")),!1;for(a=0;a<x(t);a++){let n,
e;if(n=f(t,a,0),e=f(t,a,1),!await dt(n,e)||j)return!1}return!0}async function dt(i,l){let t={},a,n={},e=p.popt;return D(
t),u(t,`SELECT pg_catalog.pg_describe_object(classid, objid, 0) AS "%s"
FROM pg_catalog.pg_depend
WHERE refclassid = 'pg_catalog.pg_extension'::pg_catalog.regclass AND refobjid = '%s' AND deptype = 'e'
ORDER BY 1;`,s("Object description"),l),a=await A(t.data),a?(e.nullPrint=null,D(n),u(n,N('Objects in extension "%s"'),i),
e.title=n.data,e.translate_header=!0,k(a,e,p.queryFout,!1,p.logfile),!0):!1}async function ut(i){let l={},t,a=p.popt,n=[
!1,!1,!1,!1,!1,!1,!1,!1];if(p.sversion<1e5){let e;return M("The server (version %s) does not support publications.",Ee(p.
sversion,!1,e,ue(e))),!0}return D(l),u(l,`SELECT pubname AS "%s",
  pg_catalog.pg_get_userbyid(pubowner) AS "%s",
  puballtables AS "%s",
  pubinsert AS "%s",
  pubupdate AS "%s",
  pubdelete AS "%s"`,s("Name"),s("Owner"),s("All tables"),s("Inserts"),s("Updates"),s("Deletes")),p.sversion>=11e4&&E(l,
`,
  pubtruncate AS "%s"`,s("Truncates")),p.sversion>=13e4&&E(l,`,
  pubviaroot AS "%s"`,s("Via root")),r(l,`
FROM pg_catalog.pg_publication
`),!U(l,i,!1,!1,null,"pubname",null,null,null,1)||(r(l,"ORDER BY 1;"),t=await A(l.data),!t)?!1:(a.nullPrint=null,a.title=
N("List of publications"),a.translate_header=!0,a.translate_columns=n,a.n_translate_columns=V(n),k(t,a,p.queryFout,!1,p.
logfile),!0)}async function ca(i,l,t,a){let n,e=0,o=0;if(n=await A(i.data),n)e=x(n);else return!1;for(e>0&&F(a,l),o=0;o<
e;o++)t?u(i,'    "%s"',f(n,o,0)):(u(i,'    "%s.%s"',f(n,o,0),f(n,o,1)),ee(n,o,3)||E(i," (%s)",f(n,o,3)),ee(n,o,2)||E(i,"\
 WHERE %s",f(n,o,2))),F(a,i.data);return!0}async function Et(i){let l={},t,a,n,e,o={},L={};if(p.sversion<1e5){let d;return M(
"The server (version %s) does not support publications.",Ee(p.sversion,!1,d,ue(d))),!0}if(n=p.sversion>=11e4,e=p.sversion>=
13e4,D(l),u(l,`SELECT oid, pubname,
  pg_catalog.pg_get_userbyid(pubowner) AS owner,
  puballtables, pubinsert, pubupdate, pubdelete`),n&&r(l,", pubtruncate"),e&&r(l,", pubviaroot"),r(l,`
FROM pg_catalog.pg_publication
`),!U(l,i,!1,!1,null,"pubname",null,null,null,1)||(r(l,"ORDER BY 2;"),a=await A(l.data),!a))return!1;if(x(a)==0)return p.
quiet||(i?M('Did not find any publication named "%s".',i):M("Did not find any publications.")),!1;for(t=0;t<x(a);t++){let d="\
l",c=5,b=1,T=f(a,t,0),S=f(a,t,1),I=C(f(a,t,3),"t")==0,w=p.popt.topt;if(n&&c++,e&&c++,D(o),u(o,N("Publication %s"),S),Pe(
L,w,o.data,c,b),se(L,s("Owner"),!0,d),se(L,s("All tables"),!0,d),se(L,s("Inserts"),!0,d),se(L,s("Updates"),!0,d),se(L,s(
"Deletes"),!0,d),n&&se(L,s("Truncates"),!0,d),e&&se(L,s("Via root"),!0,d),Q(L,f(a,t,2),!1,!1),Q(L,f(a,t,3),!1,!1),Q(L,f(
a,t,4),!1,!1),Q(L,f(a,t,5),!1,!1),Q(L,f(a,t,6),!1,!1),n&&Q(L,f(a,t,7),!1,!1),e&&Q(L,f(a,t,8),!1,!1),!I&&(u(l,"SELECT n.n\
spname, c.relname"),p.sversion>=15e4?(r(l,", pg_get_expr(pr.prqual, c.oid)"),r(l,`, (CASE WHEN pr.prattrs IS NOT NULL TH\
EN
     pg_catalog.array_to_string(      ARRAY(SELECT attname
              FROM
                pg_catalog.generate_series(0, pg_catalog.array_upper(pr.prattrs::pg_catalog.int2[], 1)) s,
                pg_catalog.pg_attribute
        WHERE attrelid = c.oid AND attnum = prattrs[s]), ', ')
       ELSE NULL END)`)):r(l,", NULL, NULL"),E(l,`
FROM pg_catalog.pg_class c,
     pg_catalog.pg_namespace n,
     pg_catalog.pg_publication_rel pr
WHERE c.relnamespace = n.oid
  AND c.oid = pr.prrelid
  AND pr.prpubid = '%s'
ORDER BY 1,2`,T),!await ca(l,N("Tables:"),!1,L)||p.sversion>=15e4&&(u(l,`SELECT n.nspname
FROM pg_catalog.pg_namespace n
     JOIN pg_catalog.pg_publication_namespace pn ON n.oid = pn.pnnspid
WHERE pn.pnpubid = '%s'
ORDER BY 1`,T),!await ca(l,N("Tables from schemas:"),!0,L))))return!1;Me(L,p.queryFout,!1,p.logfile)}return!0}async function Nt(i,l){
let t={},a,n=p.popt,e=[!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1];if(p.sversion<1e5){let o;return M("The server (version\
 %s) does not support subscriptions.",Ee(p.sversion,!1,o,ue(o))),!0}return D(t),u(t,`SELECT subname AS "%s"
,  pg_catalog.pg_get_userbyid(subowner) AS "%s"
,  subenabled AS "%s"
,  subpublications AS "%s"
`,s("Name"),s("Owner"),s("Enabled"),s("Publication")),l&&(p.sversion>=14e4&&(E(t,`, subbinary AS "%s"
`,s("Binary")),p.sversion>=16e4?E(t,`, (CASE substream
    WHEN 'f' THEN 'off'
    WHEN 't' THEN 'on'
    WHEN 'p' THEN 'parallel'
   END) AS "%s"
`,s("Streaming")):E(t,`, substream AS "%s"
`,s("Streaming"))),p.sversion>=15e4&&E(t,`, subtwophasestate AS "%s"
, subdisableonerr AS "%s"
`,s("Two-phase commit"),s("Disable on error")),p.sversion>=16e4&&E(t,`, suborigin AS "%s"
, subpasswordrequired AS "%s"
, subrunasowner AS "%s"
`,s("Origin"),s("Password required"),s("Run as owner?")),E(t,`,  subsynccommit AS "%s"
,  subconninfo AS "%s"
`,s("Synchronous commit"),s("Conninfo")),p.sversion>=15e4&&E(t,`, subskiplsn AS "%s"
`,s("Skip LSN"))),r(t,`FROM pg_catalog.pg_subscription
WHERE subdbid = (SELECT oid
                 FROM pg_catalog.pg_database
                 WHERE datname = pg_catalog.current_database())`),!U(t,i,!0,!1,null,"subname",null,null,null,1)||(r(t,"O\
RDER BY 1;"),a=await A(t.data),!a)?!1:(n.nullPrint=null,n.title=N("List of subscriptions"),n.translate_header=!0,n.translate_columns=
e,n.n_translate_columns=V(e),k(a,n,p.queryFout,!1,p.logfile),!0)}function ne(i,l){E(i,`pg_catalog.array_to_string(%s, E'\
\\n') AS "%s"`,l,s("Access privileges"))}async function Lt(i,l,t){let a={},n,e=p.popt,o=!1,L=[!1,!1,!1,!1,!1,!1,!1];if(D(
a),u(a,`SELECT
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
  END) AS "%s"`,s("AM"),s("Input type"),s("Storage type"),s("Operator class"),s("yes"),s("no"),s("Default?")),t&&E(a,`,
  CASE
    WHEN pg_catalog.pg_opfamily_is_visible(of.oid)
    THEN pg_catalog.format('%%I', of.opfname)
    ELSE pg_catalog.format('%%I.%%I', ofn.nspname, of.opfname)
  END AS "%s",
 pg_catalog.pg_get_userbyid(c.opcowner) AS "%s"
`,s("Operator family"),s("Owner")),r(a,`
FROM pg_catalog.pg_opclass c
  LEFT JOIN pg_catalog.pg_am am on am.oid = c.opcmethod
  LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.opcnamespace
  LEFT JOIN pg_catalog.pg_type t ON t.oid = c.opcintype
  LEFT JOIN pg_catalog.pg_namespace tn ON tn.oid = t.typnamespace
`),t&&r(a,`  LEFT JOIN pg_catalog.pg_opfamily of ON of.oid = c.opcfamily
  LEFT JOIN pg_catalog.pg_namespace ofn ON ofn.oid = of.opfnamespace
`),i){if(o={value:o},!U(a,i,!1,!1,null,"am.amname",null,null,o,1))return!1;o=o.value}return l&&!U(a,l,o,!1,"tn.nspname",
"t.typname","pg_catalog.format_type(t.oid, NULL)","pg_catalog.pg_type_is_visible(t.oid)",null,3)||(r(a,"ORDER BY 1, 2, 4\
;"),n=await A(a.data),!n)?!1:(e.nullPrint=null,e.title=N("List of operator classes"),e.translate_header=!0,e.translate_columns=
L,e.n_translate_columns=V(L),k(n,e,p.queryFout,!1,p.logfile),!0)}async function mt(i,l,t){let a={},n,e=p.popt,o=!1,L=[!1,
!1,!1,!1];if(D(a),u(a,`SELECT
  am.amname AS "%s",
  CASE
    WHEN pg_catalog.pg_opfamily_is_visible(f.oid)
    THEN pg_catalog.format('%%I', f.opfname)
    ELSE pg_catalog.format('%%I.%%I', n.nspname, f.opfname)
  END AS "%s",
  (SELECT
     pg_catalog.string_agg(pg_catalog.format_type(oc.opcintype, NULL), ', ')
   FROM pg_catalog.pg_opclass oc
   WHERE oc.opcfamily = f.oid) "%s"`,s("AM"),s("Operator family"),s("Applicable types")),t&&E(a,`,
  pg_catalog.pg_get_userbyid(f.opfowner) AS "%s"
`,s("Owner")),r(a,`
FROM pg_catalog.pg_opfamily f
  LEFT JOIN pg_catalog.pg_am am on am.oid = f.opfmethod
  LEFT JOIN pg_catalog.pg_namespace n ON n.oid = f.opfnamespace
`),i){if(o={value:o},!U(a,i,!1,!1,null,"am.amname",null,null,o,1))return!1;o=o.value}if(l){if(E(a,`  %s EXISTS (
    SELECT 1
    FROM pg_catalog.pg_type t
    JOIN pg_catalog.pg_opclass oc ON oc.opcintype = t.oid
    LEFT JOIN pg_catalog.pg_namespace tn ON tn.oid = t.typnamespace
    WHERE oc.opcfamily = f.oid
`,o?"AND":"WHERE"),!U(a,l,!0,!1,"tn.nspname","t.typname","pg_catalog.format_type(t.oid, NULL)","pg_catalog.pg_type_is_vi\
sible(t.oid)",null,3))return!1;r(a,`  )
`)}return r(a,"ORDER BY 1, 2;"),n=await A(a.data),n?(e.nullPrint=null,e.title=N("List of operator families"),e.translate_header=
!0,e.translate_columns=L,e.n_translate_columns=V(L),k(n,e,p.queryFout,!1,p.logfile),!0):!1}async function St(i,l,t){let a={},
n,e=p.popt,o=!1,L=[!1,!1,!1,!1,!1,!1];if(D(a),u(a,`SELECT
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
`,s("AM"),s("Operator family"),s("Operator"),s("Strategy"),s("ordering"),s("search"),s("Purpose")),t&&E(a,`, ofs.opfname\
 AS "%s"
`,s("Sort opfamily")),r(a,`FROM pg_catalog.pg_amop o
  LEFT JOIN pg_catalog.pg_opfamily of ON of.oid = o.amopfamily
  LEFT JOIN pg_catalog.pg_am am ON am.oid = of.opfmethod AND am.oid = o.amopmethod
  LEFT JOIN pg_catalog.pg_namespace nsf ON of.opfnamespace = nsf.oid
`),t&&r(a,`  LEFT JOIN pg_catalog.pg_opfamily ofs ON ofs.oid = o.amopsortfamily
`),i){if(o={value:o},!U(a,i,!1,!1,null,"am.amname",null,null,o,1))return!1;o=o.value}return l&&!U(a,l,o,!1,"nsf.nspname",
"of.opfname",null,null,null,3)||(r(a,`ORDER BY 1, 2,
  o.amoplefttype = o.amoprighttype DESC,
  pg_catalog.format_type(o.amoplefttype, NULL),
  pg_catalog.format_type(o.amoprighttype, NULL),
  o.amopstrategy;`),n=await A(a.data),!n)?!1:(e.nullPrint=null,e.title=N("List of operators of operator families"),e.translate_header=
!0,e.translate_columns=L,e.n_translate_columns=V(L),k(n,e,p.queryFout,!1,p.logfile),!0)}async function At(i,l,t){let a={},
n,e=p.popt,o=!1,L=[!1,!1,!1,!1,!1,!1];if(D(a),u(a,`SELECT
  am.amname AS "%s",
  CASE
    WHEN pg_catalog.pg_opfamily_is_visible(of.oid)
    THEN pg_catalog.format('%%I', of.opfname)
    ELSE pg_catalog.format('%%I.%%I', ns.nspname, of.opfname)
  END AS "%s",
  pg_catalog.format_type(ap.amproclefttype, NULL) AS "%s",
  pg_catalog.format_type(ap.amprocrighttype, NULL) AS "%s",
  ap.amprocnum AS "%s"
`,s("AM"),s("Operator family"),s("Registered left type"),s("Registered right type"),s("Number")),t?E(a,`, ap.amproc::pg_\
catalog.regprocedure AS "%s"
`,s("Function")):E(a,`, p.proname AS "%s"
`,s("Function")),r(a,`FROM pg_catalog.pg_amproc ap
  LEFT JOIN pg_catalog.pg_opfamily of ON of.oid = ap.amprocfamily
  LEFT JOIN pg_catalog.pg_am am ON am.oid = of.opfmethod
  LEFT JOIN pg_catalog.pg_namespace ns ON of.opfnamespace = ns.oid
  LEFT JOIN pg_catalog.pg_proc p ON ap.amproc = p.oid
`),i){if(o={value:o},!U(a,i,!1,!1,null,"am.amname",null,null,o,1))return!1;o=o.value}return l&&!U(a,l,o,!1,"ns.nspname",
"of.opfname",null,null,null,3)||(r(a,`ORDER BY 1, 2,
  ap.amproclefttype = ap.amprocrighttype DESC,
  3, 4, 5;`),n=await A(a.data),!n)?!1:(e.nullPrint=null,e.title=N("List of support functions of operator families"),e.translate_header=
!0,e.translate_columns=L,e.n_translate_columns=V(L),k(n,e,p.queryFout,!1,p.logfile),!0)}async function Tt(i){let l={},t,
a=p.popt;if(D(l),u(l,`SELECT oid as "%s",
  pg_catalog.pg_get_userbyid(lomowner) as "%s",
  `,s("ID"),s("Owner")),i&&(ne(l,"lomacl"),r(l,`,
  `)),E(l,`pg_catalog.obj_description(oid, 'pg_largeobject') as "%s"
FROM pg_catalog.pg_largeobject_metadata
ORDER BY oid`,s("Description")),t=await A(l.data),!t)return!1;a.nullPrint=null,a.title=N("Large objects"),a.translate_header=
!0,k(t,a,p.queryFout,!1,p.logfile)}return!0}return{promise:fe(),cancel:X}}function fa(_,O,R,H="",P=""){const B=Math.max(
0,O-ge(_));return R==="r"?H+" ".repeat(B)+_+P:R==="c"?H+" ".repeat(Math.floor(B/2))+_+" ".repeat(Math.ceil(B/2))+P:H+_+"\
 ".repeat(B)+P}function _a(_,O){let R=0;const H=_.length,P=[];for(;R<H;)P.push(_.slice(R,R+=O));return P}function Mt(_){
let O=-1,R=0,H=1,P=0;for(;(O=_.indexOf(`
`,O+1))!==-1;)O-R>P&&(P=O-R),R=O+1,H++;return _.length-R>P&&(P=_.length-R),{count:H,longest:P}}function de(_,O){return _=
_.replace(/[<>&'"]/g,R=>({"<":"&lt;",">":"&gt;","&":"&amp;","'":"&apos;",'"':"&quot;"})[R]),O&&(_=_.replace(/ /g,"&nbsp;").
replace(/\n/g,"<br />")),_}function qt(_,O){const{ncolumns:R,nrows:H,aligns:P}=_,B=[..._.headers,..._.cells].map(Mt),{colWidths:J,
rowHeights:j}=B.reduce((A,p,M)=>{const U=Math.floor(M/_.ncolumns),ie=M%_.ncolumns;return p.longest>A.colWidths[ie]&&(A.colWidths[ie]=
p.longest),p.count>A.rowHeights[U]&&(A.rowHeights[U]=p.count),A},{colWidths:new Array(R).fill(0),rowHeights:new Array(H+
1).fill(1)}),X=J.reduce((A,p)=>A+p,0)+R*2+(R-1),Ne=fa(_.title,X,"c"),fe=[_.headers,null,..._a(_.cells,R)],ia=fe.map((A,p)=>{
if(p===1)return _.headers.map((U,ie)=>"-".repeat(J[ie%R]+2)).join("+");p>1&&p--;const M=A.map(U=>U.split(`
`));return new Array(j[p]).fill("").map((U,ie)=>M.map((ke,xe)=>fa(ke[ie]??"",J[xe],p===0?"c":P[xe]," ",ke[ie+1]===void 0?
" ":"+")).join("|")).join(`
`)}).join(`
`),De=_.footers?_.footers.filter($e):[],Z=De.length>0?`
`+De.join(`
`):_.opt.default_footer?`
(${H} row${H===1?"":"s"})`:"";let Ue=`${Ne}
${ia}${Z}`;return O&&(Ue=de(Ue)),Ue}function Jt(_){let O=`<table><tr><th valign="top" style="text-align: center;" colspa\
n="${_.ncolumns}">${de(_.title)}</th></tr><tr>`;for(let R of _.headers)O+=`<th valign="top" style="text-align: center;">${de(
R)}</th>`;O+="</tr>";for(let R of _a(_.cells,_.ncolumns))O+="<tr>"+R.map((H,P)=>`<td valign="top" style="text-align: ${_.
aligns[P]==="c"?"center":_.aligns[P]==="r"?"right":"left"}">${de(H).replace(/\n/g,"<br>")}</td>`).join(`
`)+"</tr>";return O+="</table>",_.footers?_.footers.length>1&&_.footers.some(R=>/^\s/.test(R))?O+="<dl>"+_.footers.map(R=>/^\s/.
test(R)?`<dd>${de(R.trim(),!0)}</dd>`:`<dt>${de(R,!0)}</dt>`).join("")+"</dl>":O+=_.footers.map(R=>`<p>${de(R,!0)}</p>`).
join(""):_.opt.default_footer&&(O+=`<p>(${_.nrows} row${_.nrows===1?"":"s"})</p>`),O}function Re(_){if(!_)throw new Error(
`Assertion failed (value: ${_})`)}const s=$e,Se=$e,N=$e;function Ve(_,O){const R=_.indexOf(O);return R===-1?null:R}const K=Ve;
function ge(_){return _.length}function be(_,O,R){if(typeof _!="string"||typeof O!="string")throw new Error("Not a strin\
g");return _.length>R&&(_=_.slice(0,R)),O.length>R&&(O=O.slice(0,R)),_<O?-1:_>O?1:0}function C(_,O){return be(_,O,1/0)}function Yt(_,O){
const R=ge(_);for(let H=0;H<R;H++)if(O.indexOf(_[H])===-1)return H;return R}function da(_){return parseInt(_,10)}function aa(_){
return parseInt(_,10)}function ua(_){return _===" "||_==="	"||_===`
`||_==="\r"}function Bt(_){return _==='"'||_==="'"}function jt(_){const O=_.charCodeAt(0);return O>=65&&O<=90}function V(_){
return _.length}function ta(_){return _.toLowerCase()}function zt(_,O){return C(_.toLowerCase(),O.toLowerCase())}function Ea(_,O,R){
return O}function ue(_){return 0}function D(_){_.data="",_.len=0}const na=D;function r(_,O){_.data+=O,_.len=_.data.length}
const Y=r;function E(_,O,...R){const H=G(O,...R);r(_,H)}function u(_,O,...R){D(_),E(_,O,...R)}function sa(_,O,R,H){const B="\
'"+O.replace(H?/[']/g:/['\\]/g,"\\$&")+"'";r(_,B)}function ye(_,O,R){if(K(O,"\\")!=null&&We(R)>=80100){_.len>0&&_.data[_.
len-1]!=" "&&Y(_," "),Y(_,bt),sa(_,O,La(R),!1);return}sa(_,O,R.encoding,R.std_strings)}function G(_,...O){let R="",H=0,P=0,
B;for(;(B=_.indexOf("%",P))!==-1;){let J=0,j=!1;R+=_.slice(P,B),P=B+1;let X=_[P++];if(X==="%"&&(R+="%"),X==="*"&&(J=parseInt(
O[H++],10),X=_[P++]),X==="-"&&(j=!0,X=_[P++]),X>="0"&&X<="9"&&(J=parseInt(X,10),X=_[P++]),X==="s"||X==="c"||X==="d"||X===
"u"){const Ne=String(O[H++]),fe=J-Ne.length;j===!1&&fe>0&&(R+=" ".repeat(fe)),R+=Ne,j===!0&&fe>0&&(R+=" ".repeat(fe))}}return R+=
_.slice(P),R}const la=G;function Na(_){return _?_.dbName:null}function We(_){return!_||_.status===1?0:_.sversion}function La(_){
return!_||_.status!=0?-1:_.client_encoding}function x(_){return _.rowCount}function ma(_){return _.fields.length}function Sa(_,O){
return _.fields[O].name}function Qt(_,O){return _.fields[O].dataTypeID}function ee(_,O,R){return _.rows[O][R]===null?1:0}
function f(_,O,R){const H=_.rows[O][R];return String(H===null?"":H)}function Ae(_,O){let R,H,P,B,J;if(!_||O==null||O[0]==
null)return-1;for(R=!1,P="",H=0,J=ge(O);H<J;H++){let j=O[H];R?j=='"'?O[H+1]=='"'?(P+='"',H++):R=!1:P+=j:j=='"'?R=!0:(j=ta(
j),P+=j)}for(B=0,J=ma(_);B<J;B++)if(C(P,Sa(_,B))==0)return B;return-1}function Ee(_,O,R,H){return _>=1e5?O?R=G("%d.%d",Math.
floor(_/1e4),_%1e4):R=G("%d",_/1e4):O?R=G("%d.%d.%d",Math.floor(_/1e4),Math.floor(_/100)%100,_%100):R=G("%d.%d",Math.floor(
_/1e4),Math.floor(_/100)%100),R}function Te(_,O,R,H){if(O!==0&&O!==4)throw new Error(`scan type ${O} not implemented`);if(R!==
null)throw new Error("cannot return quote type");const P=[],B=H?/^(.*);*$/:/^(.*)$/;let J;for(;;){if(J=_[0][_[1]],J==null)
return null;if(!ua(J))break;_[1]++}if(O===4)return _[0].slice(_[1],_[1]=_[0].length);let j="";for(;;){if(J=_[0][_[1]++],
J==null)return P.length>0?null:j.match(B)[1];if(Bt(J))J===P[P.length-1]?P.pop():P.push(J),J==='"'&&(j+=J);else{if(P.length===
0&&ua(J))return j.match(B)[1];j+=J}}}function $e(_){return _}
