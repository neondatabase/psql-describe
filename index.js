const zE=0,ZE=null,$E=100,ei="E",ni=0,ai=0,si=1,ti=0,Ei=2,ii=5,oi=0,li=4,ri=6,ci=0,_i=1,Ti="b",pi="i",Ri="a",Ai="e",Ni="\
r",Li="S",Si="f",gi="T",Oi="n",fi="L",mi="a",Ii="d",ui="s",di="v",Ci="r",Di="i",Ui="S",Pi="t",bi="v",hi="m",Fi="c",yi="f",
Hi="p",Mi="I",wi="n",Gi="s",Wi=20,Bi=21,vi=23,qi=26,Yi=28,xi=29,Vi=5069,Xi=700,ki=701,Ki=790,ji=1700;export function describeDataToString(n){
return typeof n=="string"?n:Oa(n)}export function describeDataToHtml(n){return typeof n=="string"?`<p>${ce(n,!0)}</p>`:fa(
n)}export function describe(n,I,d,U,B=!1,Y=null,x=1,$=X=>`https://www.postgresql.org/docs/18/${X}.html`){let X=!1;function Se(){
X=!0,U=()=>{}}function oe(){if(X)throw new Error("cancelled")}async function Ve(){const he=n.match(/^\\([?hdzsl]\S*)(.*)/);
if(!he)return U(`unsupported command: ${n}`),!1;let[,k,te]=he;if(k=k.replace(/^lo_list/,"dl"),k=k.replace(/^z/,"dp"),k===
"?")return U(Da),!1;if(k==="h"){const r=(te??"").trim().toUpperCase().replace(/\s+/g," ");if(r==="")return U(`Available \
help:
`+be.map(o=>o[0]).join(`
`)),!1;{let o=r==="*"?be:be.filter(t=>t[0]===r);if(o.length===0&&(o=be.filter(t=>t[0].startsWith(r))),o.length===0){const t=r.
split(" ");for(let s=t.length;s>0;s--){const i=t.slice(0,s).join(" ");if(o=be.filter(a=>a[0].startsWith(i)),o.length>0)break}}
if(o.length===0)return U(`No help available for "${te.trim()}".
Try \\h with no arguments to see available help.`),!1;for(const t of o){const s={};C(s),t[3](s),U(`Command:     ${t[0]}
Description: ${t[1]}
Syntax:
${s.data}

URL: ${$(t[2])}

`)}return!1}}const m=async(r,o=!1)=>{oe(),B&&!o&&U(`/******** QUERY *********/
${r}
/************************/`);const t=await d(r);return oe(),t};let T;try{if(!Y){const i=await m("SHOW server_version_num",
!0);Y=parseInt(i.rows[0][0],10)}T={sversion:Y,db:{dbName:I,sversion:Y,std_strings:x,status:0,encoding:6},popt:{topt:{default_footer:!0},
nullPrint:""}};const r=[te,0],o=await(k[0]==="d"?In(r,!0,k):k[0]==="s"?k[1]==="f"||k[1]==="v"?Nn(r,!0,k,k[1]==="f"):0:k[0]===
"l"?mn(r,!0,k):0);(k.startsWith("dx")?k.slice(2):k).indexOf("x")!==-1&&U("Note: expanded output using x is not supported"),
o===0&&U(`invalid command \\${k}`);let t,s=[];for(;t=Le(r,0,null,!0);)s.push(ne('\\%s: extra argument "%s" ignored',k,t));
s.length>0&&U(s.join(`
`))}catch(r){return U("ERROR:  "+r.message),X?null:!1}function y(r,...o){U(ne(r,...o))}function P(r,o,t,s,i,a,_,S,N,p){let b={},
f={},D;if(C(b),D=Ie(T.db,r,o,t,s,i,a,_,S,b,f),f=f.value,N&&(N.value=D),f>=p)return y("improper qualified name (too many \
dotted names): %s",o),!1;if(p>1&&f==p-1){if(cn(T.db)==null)return y("You are currently not connected to a database."),!1;
if(F(cn(T.db),b.data)!=0)return y("cross-database references are not implemented: %s",o),!1}return!0}function Ie(r,o,t,s,i,a,_,S,N,p,b){
let f={},D={},O=!1;return b||(b={}),b.value=0,t==null?(N&&(c(o,s?"  AND ":"WHERE "),s=!0,O=!0,l(o,`%s
`,N)),O):(C(f),C(D),Fe(_n(r),a?p:null,a?f:null,D,t,i,!0,b),_&&D.len>2&&F(D.data,"^(.*)$")!=0&&(c(o,s?"  AND ":"WHERE "),
s=!0,O=!0,S?(l(o,"(%s OPERATOR(pg_catalog.~) ",_),me(o,D.data,r),Ue(r)>=12e4&&c(o," COLLATE pg_catalog.default"),l(o,`
        OR %s OPERATOR(pg_catalog.~) `,S),me(o,D.data,r),Ue(r)>=12e4&&c(o," COLLATE pg_catalog.default"),c(o,`)
`)):(l(o,"%s OPERATOR(pg_catalog.~) ",_),me(o,D.data,r),Ue(r)>=12e4&&c(o," COLLATE pg_catalog.default"),V(o,`
`))),a&&f.len>2?F(f.data,"^(.*)$")!=0&&a&&(c(o,s?"  AND ":"WHERE "),s=!0,O=!0,l(o,"%s OPERATOR(pg_catalog.~) ",a),me(o,f.
data,r),Ue(r)>=12e4&&c(o," COLLATE pg_catalog.default"),V(o,`
`)):N&&(c(o,s?"  AND ":"WHERE "),s=!0,O=!0,l(o,`%s
`,N)),O)}function Fe(r,o,t,s,i,a,_,S){let N=[{},{},{}],p=0,b={},f={},D={},O,M,J;Oe(i),Oe(s),Oe(!o||t),Oe(S),S.value=0,O=
!1,J=i,o?D=2:t?D=1:D=0,f=N[p],_?(M=!0,C(b)):M=!1,C(f),c(f,"^(");let ee=0,Q;for(;(Q=J[ee])!=null;)Q=='"'?(O&&J[ee+1]=='"'?
(V(f,'"'),M&&V(b,'"'),ee++):O=!O,ee++):!O&&ua(Q)?(V(f,Qe(Q)),M&&V(b,Qe(Q)),ee++):!O&&Q=="*"?(c(f,".*"),M&&V(b,"*"),ee++):
!O&&Q=="?"?(V(f,"."),M&&V(b,"?"),ee++):!O&&Q=="."?(M=!1,S.value++,p<D?(c(f,")$"),f=N[++p],C(f),c(f,"^("),ee++):(V(f,Q),ee++)):
Q=="$"?(c(f,"\\$"),M&&V(b,"$"),ee++):(((O||a)&&z("|*+?()[]{}.^$\\",Q)!=null||Q=="["&&J[ee+1]=="]")&&V(f,"\\"),M&&V(b,Q),
V(f,Q),ee++);c(f,")$"),s&&(c(s,f.data),f=N[--p]),t&&p>=0&&(c(t,f.data),f=N[--p]),o&&p>=0&&(_?c(o,b.data):c(o,f.data))}function Rn(r){
let o;switch(r){case 21:case 23:case 20:case 700:case 701:case 1700:case 26:case 28:case 5069:case 29:case 790:o="r";break;default:
o="l";break}return o}function G(r,o,t,s,i){let a={},_,S,N;for(ye(a,o.topt,o.title,Tn(r),W(r)),Oe(o.translate_columns==null||
o.translate_columns==null||o.n_translate_columns>=a.ncolumns),_=0;_<a.ncolumns;_++)Ee(a,pn(r,_),o.translate_header,Rn(Ca(
r,_)));for(S=0;S<a.nrows;S++)for(N=0;N<a.ncolumns;N++){let p,b=!1,f;ae(r,S,N)?p=o.nullPrint?o.nullPrint:"":(p=A(r,S,N),a.
aligns[N]=="r"&&o.topt.numericLocale&&(p=format_numeric_locale(p),b=!0)),f=o.translate_columns&&o.translate_columns[N],K(
a,p,f,b)}if(o.footers)for(let p of o.footers)H(a,p);He(a,t,s,i)}function ye(r,o,t,s,i){r.opt=o,r.title=t,r.ncolumns=s,r.
nrows=i,r.headers=[],r.cells=[],r.footers=null,r.aligns=[]}function Ee(r,o,t,s){t&&(o=e(o)),r.headers.push(o),r.header=o,
r.aligns.push(s),r.align=s}function K(r,o,t,s){t&&(o=e(o)),r.cells.push(o),r.cell=o}function H(r,o){r.footers==null&&(r.
footers=[]),r.footers.push(o),r.footer=o}function An(r,o){r.footers&&r.footers.pop(),H(r,o)}function He(r,o,t,s){U({...r})}
async function Nn(r,o,t,s){let i=2,a=z(t,"+")!=null,_={},S,N={value:0},p=s?0:1;return C(_),S=Le(r,4,null,!0),S?await Sn(
p,S,N)&&await gn(p,N.value,_)?a?Ln(_.data,s):U(_.data):i=5:(y(s?"function name is required":"view name is required"),i=5),
i}function Ln(r,o){let t=o,s=0,i="";r=r.trimEnd().split(`
`);for(let a of r)t&&(fe(a,"AS ",3)==0||fe(a,"BEGIN ",6)==0||fe(a,"RETURN ",7)==0)&&(t=!1),t||s++,t?i+=ne(`        %s
`,a):i+=ne(`%-7d %s
`,s,a);U(i)}async function Sn(r,o,t){let s=!0,i={};C(i);let a;switch(r){case 0:c(i,"SELECT "),me(i,o,T.db),l(i,"::pg_cat\
alog.%s::pg_catalog.oid",z(o,"(")!==null?"regprocedure":"regproc");break;case 1:c(i,"SELECT "),me(i,o,T.db),c(i,"::pg_ca\
talog.regclass::pg_catalog.oid");break}try{a=await m(i.data),a&&W(a)==1?t.value=Je(A(a,0,0)):(y("Error when querying"),s=
!1)}catch(_){y("ERROR:  "+_.message),s=!1}return s}async function gn(r,o,t){let s=!0,i={};C(i);let a;switch(r){case 0:L(
i,"SELECT pg_catalog.pg_get_functiondef(%u)",o);break;case 1:T.sversion>=90400?L(i,"SELECT nspname, relname, relkind, pg\
_catalog.pg_get_viewdef(c.oid, true), pg_catalog.array_remove(pg_catalog.array_remove(c.reloptions,'check_option=local')\
,'check_option=cascaded') AS reloptions, CASE WHEN 'check_option=local' = ANY (c.reloptions) THEN 'LOCAL'::text WHEN 'ch\
eck_option=cascaded' = ANY (c.reloptions) THEN 'CASCADED'::text ELSE NULL END AS checkoption FROM pg_catalog.pg_class c \
LEFT JOIN pg_catalog.pg_namespace n ON c.relnamespace = n.oid WHERE c.oid = %u",o):L(i,"SELECT nspname, relname, relkind\
, pg_catalog.pg_get_viewdef(c.oid, true), c.reloptions AS reloptions, NULL AS checkoption FROM pg_catalog.pg_class c LEF\
T JOIN pg_catalog.pg_namespace n ON c.relnamespace = n.oid WHERE c.oid = %u",o);break}if(a=await m(i.data),a&&W(a)==1){switch(ze(
t),r){case 0:c(t,A(a,0,0));break;case 1:let _=A(a,0,0),S=A(a,0,1),N=A(a,0,2),p=A(a,0,3),b=A(a,0,4),f=A(a,0,5);switch(N[0]){case"\
v":c(t,"CREATE OR REPLACE VIEW ");break;default:y('"%s.%s" is not a view',_,S),s=!1;break}l(t,"%s.",ge(_)),c(t,ge(S)),b!=
null&&le(b)>2&&(c(t,`
 WITH (`),On(t,b,"",T.encoding,T.db.standard_strings)||(y("could not parse reloptions array"),s=!1),V(t,")")),l(t,` AS
%s`,p),t.len>0&&t.data[t.len-1]==";"&&(t.data=t.data.slice(0,t.len-1)),f&&f[0]!=null&&l(t,`
 WITH %s CHECK OPTION`,f);break}t.len>0&&t.data[t.len-1]!=`
`&&V(t,`
`)}else y("Error when querying"),s=!1;return s}function On(r,o,t,s,i){let a=[],_={},S;if(!fn(o,a,_))return!1;for(_=_.value,
S=0;S<_;S++){let N=a[S],[p,b]=N.split("=");b??(b=""),S>0&&c(r,", "),l(r,"%s%s=",t,ge(p)),F(ge(b),b)==0?c(r,b):Ze(r,b,s,i)}
return!0}function fn(r,o,t){let s,i,a;if(s=le(r),t.value=0,s<2||r[0]!="{"||r[s-1]!="}")return!1;let _=0;for(_++,a=0;r[_]!=
"}";){if(r[_]==null)return!1;for(i="";r[_]!="}"&&r[_]!=",";){if(r[_]==null)return!1;if(r[_]!='"')i+=r[_++];else{for(_++;r[_]!=
'"';){if(r[_]==null||r[_]=="\\"&&(_++,r[_]==null))return!1;i+=r[_++]}_++}}o[a]=i,r[_]==","&&_++,a++}return r[_+1]&&r[_+1]!=
null?!1:(t.value=a,!0)}function ge(r){let o={};C(o);let t=!1;return r[0]>="a"&&r[0]<="z"||r[0]=="_"?/[^a-z0-9_]/.test(r)&&
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
xmltable"]).has(r)&&(t=!0),t?(V(o,'"'),V(o,r.replace(/"/g,'""')),V(o,'"')):c(o,r),o.data}async function mn(r,o,t){let s,
i,a;return i=Le(r,0,null,!0),a=z(t,"+")!=null,s=await un(i,a),s?2:5}async function In(r,o,t){let s=2,i=!0,a,_,S;switch(a=
Le(r,0,null,!0),_=z(t,"+")!=null,S=z(t,"S")!=null,t[1]){case void 0:case"+":case"S":a?i=await Hn(a,_,S):i=await nn("tvms\
E",null,_,S);break;case"A":{let N=null;switch(a&&t[2]!=null&&t[2]!="+"&&(N=Le(r,0,null,!0)),t[2]){case void 0:case"+":i=
await Cn(a,_);break;case"c":i=await Ta(a,N,_);break;case"f":i=await pa(a,N,_);break;case"o":i=await Ra(a,N,_);break;case"\
p":i=await Aa(a,N,_);break;default:s=0;break}}break;case"a":i=await dn(a,_,S);break;case"b":i=await Dn(a,_);break;case"c":
fe(t,"dconfig",7)==0?i=await Yn(a,_,S):i=await qn(a,_,S);break;case"C":i=await Xn(a,_);break;case"d":fe(t,"ddp",3)==0?i=
await Fn(a):i=await yn(a,S);break;case"D":i=await vn(a,_,S);break;case"f":switch(t[2]){case void 0:case"+":case"S":case"\
a":case"n":case"p":case"t":case"w":i=await $e(r,t,a,_,S);break;default:s=0;break}break;case"g":i=await en(a,_,S);break;case"\
l":i=await Na(_);break;case"L":i=await Bn(a,_,S);break;case"n":i=await Kn(a,_,S);break;case"o":i=await $e(r,t,a,_,S);break;case"\
O":i=await kn(a,_,S);break;case"p":i=await hn(a,S);break;case"P":switch(t[2]){case void 0:case"+":case"t":case"i":case"n":
i=await Wn(t.slice(2),a,_);break;default:s=0;break}break;case"T":i=await Pn(a,_,S);break;case"t":case"v":case"m":case"i":case"\
s":case"E":i=await nn(t[1],a,_,S);break;case"r":if(t[2]=="d"&&t[3]=="s"){let N=null;a&&(N=Le(r,0,null,!0)),i=await wn(a,
N)}else t[2]=="g"?i=await Gn(a,S):s=0;break;case"R":switch(t[2]){case"p":_?i=await ca(a):i=await ra(a);break;case"s":i=await _a(
a,_);break;default:s=0}break;case"u":i=await en(a,_,S);break;case"F":switch(t[2]){case void 0:case"+":i=await $n(a,_);break;case"\
p":i=await jn(a,_);break;case"d":i=await zn(a,_);break;case"t":i=await Zn(a,_);break;default:s=0;break}break;case"e":switch(t[2]){case"\
s":i=await sa(a,_);break;case"u":i=await ta(a,_);break;case"w":i=await aa(a,_);break;case"t":i=await Ea(a,_);break;default:
s=0;break}break;case"x":_?i=await oa(a):i=await ia(a);break;case"X":i=await Vn(a);break;case"y":i=await xn(a,_);break;default:
s=0}return i||(s=5),s}async function $e(r,o,t,s,i){let a,_=[],S=0;if(t){let N;for(;(N=Le(r,0,null,!0))!=null&&(_[S++]=N,
!(S>=100)););}return o[1]=="f"?a=await Un(o.slice(2),t,_,S,s,i):a=await bn(t,_,S,s,i),a}async function un(r,o){let t,s={},
i=T.popt;return C(s),L(s,`SELECT
  d.datname as "%s",
  pg_catalog.pg_get_userbyid(d.datdba) as "%s",
  pg_catalog.pg_encoding_to_char(d.encoding) as "%s",
`,E("Name"),E("Owner"),E("Encoding")),T.sversion>=15e4?l(s,`  CASE d.datlocprovider WHEN 'b' THEN 'builtin' WHEN 'c' THE\
N 'libc' WHEN 'i' THEN 'icu' END AS "%s",
`,E("Locale Provider")):l(s,`  'libc' AS "%s",
`,E("Locale Provider")),l(s,`  d.datcollate as "%s",
  d.datctype as "%s",
`,E("Collate"),E("Ctype")),T.sversion>=17e4?l(s,`  d.datlocale as "%s",
`,E("Locale")):T.sversion>=15e4?l(s,`  d.daticulocale as "%s",
`,E("Locale")):l(s,`  NULL as "%s",
`,E("Locale")),T.sversion>=16e4?l(s,`  d.daticurules as "%s",
`,E("ICU Rules")):l(s,`  NULL as "%s",
`,E("ICU Rules")),c(s,"  "),ie(s,"d.datacl"),o&&l(s,`,
  CASE WHEN pg_catalog.has_database_privilege(d.datname, 'CONNECT')
       THEN pg_catalog.pg_size_pretty(pg_catalog.pg_database_size(d.datname))
       ELSE 'No Access'
  END as "%s",
  t.spcname as "%s",
  pg_catalog.shobj_description(d.oid, 'pg_database') as "%s"`,E("Size"),E("Tablespace"),E("Description")),c(s,`
FROM pg_catalog.pg_database d
`),o&&c(s,`  JOIN pg_catalog.pg_tablespace t on d.dattablespace = t.oid
`),r&&!P(s,r,!1,!1,null,"d.datname",null,null,null,1)||(c(s,"ORDER BY 1;"),t=await m(s.data),!t)?!1:(i.nullPrint=null,i.
title=e("List of databases"),i.translate_header=!0,G(t,i,T.queryFout,!1,T.logfile),!0)}async function dn(r,o,t){let s={},
i,a=T.popt;return C(s),L(s,`SELECT n.nspname as "%s",
  p.proname AS "%s",
  pg_catalog.format_type(p.prorettype, NULL) AS "%s",
  CASE WHEN p.pronargs = 0
    THEN CAST('*' AS pg_catalog.text)
    ELSE pg_catalog.pg_get_function_arguments(p.oid)
  END AS "%s",
`,E("Schema"),E("Name"),E("Result data type"),E("Argument data types")),T.sversion>=11e4?l(s,`  pg_catalog.obj_descripti\
on(p.oid, 'pg_proc') as "%s"
FROM pg_catalog.pg_proc p
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = p.pronamespace
WHERE p.prokind = 'a'
`,E("Description")):l(s,`  pg_catalog.obj_description(p.oid, 'pg_proc') as "%s"
FROM pg_catalog.pg_proc p
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = p.pronamespace
WHERE p.proisagg
`,E("Description")),!t&&!r&&c(s,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!P(s,r,!0,!1,"n.nspname","p.proname",null,"pg_catalog.pg_function_is_visible(p.oid)",null,3)||(c(s,"ORDER BY 1, 2, 4;"),
i=await m(s.data),!i)?!1:(a.nullPrint=null,a.title=e("List of aggregate functions"),a.translate_header=!0,G(i,a,T.queryFout,
!1,T.logfile),!0)}async function Cn(r,o){let t={},s,i=T.popt,a=[!1,!0,!1,!1];if(T.sversion<90600){let _;return y("The se\
rver (version %s) does not support access methods.",Te(T.sversion,!1,_,_e(_))),!0}return C(t),L(t,`SELECT amname AS "%s"\
,
  CASE amtype WHEN 'i' THEN '%s' WHEN 't' THEN '%s' END AS "%s"`,E("Name"),E("Index"),E("Table"),E("Type")),o&&l(t,`,
  amhandler AS "%s",
  pg_catalog.obj_description(oid, 'pg_am') AS "%s"`,E("Handler"),E("Description")),c(t,`
FROM pg_catalog.pg_am
`),!P(t,r,!1,!1,null,"amname",null,null,null,1)||(c(t,"ORDER BY 1;"),s=await m(t.data),!s)?!1:(i.nullPrint=null,i.title=
e("List of access methods"),i.translate_header=!0,i.translate_columns=a,i.n_translate_columns=Z(a),G(s,i,T.queryFout,!1,
T.logfile),!0)}async function Dn(r,o){let t={},s,i=T.popt;return C(t),L(t,`SELECT spcname AS "%s",
  pg_catalog.pg_get_userbyid(spcowner) AS "%s",
  pg_catalog.pg_tablespace_location(oid) AS "%s"`,E("Name"),E("Owner"),E("Location")),o&&(c(t,`,
  `),ie(t,"spcacl"),l(t,`,
  spcoptions AS "%s",
  pg_catalog.pg_size_pretty(pg_catalog.pg_tablespace_size(oid)) AS "%s",
  pg_catalog.shobj_description(oid, 'pg_tablespace') AS "%s"`,E("Options"),E("Size"),E("Description"))),c(t,`
FROM pg_catalog.pg_tablespace
`),!P(t,r,!1,!1,null,"spcname",null,null,null,1)||(c(t,"ORDER BY 1;"),s=await m(t.data),!s)?!1:(i.nullPrint=null,i.title=
e("List of tablespaces"),i.translate_header=!0,G(s,i,T.queryFout,!1,T.logfile),!0)}async function Un(r,o,t,s,i,a){let _="\
anptwSx+",S=z(r,"a")!=null,N=z(r,"n")!=null,p=z(r,"p")!=null,b=z(r,"t")!=null,f=z(r,"w")!=null,D,O={},M,J=T.popt,ee=[!1,
!1,!1,!1,!0,!0,!0,!1,!0,!0,!1,!1,!1,!1],Q=[!1,!1,!1,!1,!0,!0,!1,!0,!0,!1,!1,!1,!1];if(le(r)!=ma(r,_))return y(`\\df only \
takes [${_}] as options`),!0;if(p&&T.sversion<11e4){let q;return y('\\df does not take a "%c" option with server version \
%s',"p",Te(T.sversion,!1,q,_e(q))),!0}!S&&!N&&!p&&!b&&!f&&(S=N=b=f=!0,T.sversion>=11e4&&(p=!0)),C(O),L(O,`SELECT n.nspna\
me as "%s",
  p.proname as "%s",
`,E("Schema"),E("Name")),T.sversion>=11e4?l(O,`  pg_catalog.pg_get_function_result(p.oid) as "%s",
  pg_catalog.pg_get_function_arguments(p.oid) as "%s",
 CASE p.prokind
  WHEN 'a' THEN '%s'
  WHEN 'w' THEN '%s'
  WHEN 'p' THEN '%s'
  ELSE '%s'
 END as "%s"`,E("Result data type"),E("Argument data types"),E("agg"),E("window"),E("proc"),E("func"),E("Type")):l(O,`  \
pg_catalog.pg_get_function_result(p.oid) as "%s",
  pg_catalog.pg_get_function_arguments(p.oid) as "%s",
 CASE
  WHEN p.proisagg THEN '%s'
  WHEN p.proiswindow THEN '%s'
  WHEN p.prorettype = 'pg_catalog.trigger'::pg_catalog.regtype THEN '%s'
  ELSE '%s'
 END as "%s"`,E("Result data type"),E("Argument data types"),E("agg"),E("window"),E("trigger"),E("func"),E("Type")),i&&(l(
O,`,
 CASE
  WHEN p.provolatile = 'i' THEN '%s'
  WHEN p.provolatile = 's' THEN '%s'
  WHEN p.provolatile = 'v' THEN '%s'
 END as "%s"`,E("immutable"),E("stable"),E("volatile"),E("Volatility")),T.sversion>=90600&&l(O,`,
 CASE
  WHEN p.proparallel = 'r' THEN '%s'
  WHEN p.proparallel = 's' THEN '%s'
  WHEN p.proparallel = 'u' THEN '%s'
 END as "%s"`,E("restricted"),E("safe"),E("unsafe"),E("Parallel")),l(O,`,
 pg_catalog.pg_get_userbyid(p.proowner) as "%s",
 CASE WHEN prosecdef THEN '%s' ELSE '%s' END AS "%s",
 CASE WHEN p.proleakproof THEN '%s' ELSE '%s' END as "%s"`,E("Owner"),E("definer"),E("invoker"),E("Security"),E("yes"),E(
"no"),E("Leakproof?")),c(O,`,
 `),ie(O,"p.proacl"),l(O,`,
 l.lanname as "%s"`,E("Language")),l(O,`,
 CASE WHEN l.lanname IN ('internal', 'c') THEN p.prosrc END as "%s"`,E("Internal name")),l(O,`,
 pg_catalog.obj_description(p.oid, 'pg_proc') as "%s"`,E("Description"))),c(O,`
FROM pg_catalog.pg_proc p
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = p.pronamespace
`);for(let q=0;q<s;q++)l(O,`     LEFT JOIN pg_catalog.pg_type t%d ON t%d.oid = p.proargtypes[%d]
     LEFT JOIN pg_catalog.pg_namespace nt%d ON nt%d.oid = t%d.typnamespace
`,q,q,q,q,q,q);if(i&&c(O,`     LEFT JOIN pg_catalog.pg_language l ON l.oid = p.prolang
`),D=!1,!(N&&S&&p&&b&&f))if(N)S||(D?c(O,"      AND "):(c(O,"WHERE "),D=!0),T.sversion>=11e4?c(O,`p.prokind <> 'a'
`):c(O,`NOT p.proisagg
`)),!p&&T.sversion>=11e4&&(D?c(O,"      AND "):(c(O,"WHERE "),D=!0),c(O,`p.prokind <> 'p'
`)),b||(D?c(O,"      AND "):(c(O,"WHERE "),D=!0),c(O,`p.prorettype <> 'pg_catalog.trigger'::pg_catalog.regtype
`)),f||(D?c(O,"      AND "):(c(O,"WHERE "),D=!0),T.sversion>=11e4?c(O,`p.prokind <> 'w'
`):c(O,`NOT p.proiswindow
`));else{let q=!1;c(O,`WHERE (
       `),D=!0,S&&(T.sversion>=11e4?c(O,`p.prokind = 'a'
`):c(O,`p.proisagg
`),q=!0),b&&(q&&c(O,"       OR "),c(O,`p.prorettype = 'pg_catalog.trigger'::pg_catalog.regtype
`),q=!0),p&&(q&&c(O,"       OR "),c(O,`p.prokind = 'p'
`),q=!0),f&&(q&&c(O,"       OR "),T.sversion>=11e4?c(O,`p.prokind = 'w'
`):c(O,`p.proiswindow
`)),c(O,`      )
`)}if(!P(O,o,D,!1,"n.nspname","p.proname",null,"pg_catalog.pg_function_is_visible(p.oid)",null,3))return!1;for(let q=0;q<
s;q++)if(F(t[q],"-")!=0){let ue,de,Ce,Re;if(ue=ne("nt%d.nspname",q),de=ne("t%d.typname",q),Ce=ne("pg_catalog.format_type\
(t%d.oid, NULL)",q),Re=ne("pg_catalog.pg_type_is_visible(t%d.oid)",q),!P(O,ke(t[q]),!0,!1,ue,de,Ce,Re,null,3))return!1}else
l(O,`  AND t%d.typname IS NULL
`,q);return!a&&!o&&c(O,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),c(O,"ORDER BY 1, 2, 4;"),M=await m(O.data),M?(J.nullPrint=null,J.title=e("List of functions"),J.translate_header=!0,T.
sversion>=90600?(J.translate_columns=ee,J.n_translate_columns=Z(ee)):(J.translate_columns=Q,J.n_translate_columns=Z(Q)),
G(M,J,T.queryFout,!1,T.logfile),!0):!1}async function Pn(r,o,t){let s={},i,a=T.popt;return C(s),L(s,`SELECT n.nspname as\
 "%s",
  pg_catalog.format_type(t.oid, NULL) AS "%s",
`,E("Schema"),E("Name")),o&&(l(s,`  t.typname AS "%s",
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
`,E("Internal name"),E("Size"),E("Elements"),E("Owner")),ie(s,"t.typacl"),c(s,`,
  `)),l(s,`  pg_catalog.obj_description(t.oid, 'pg_type') as "%s"
`,E("Description")),c(s,`FROM pg_catalog.pg_type t
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = t.typnamespace
`),c(s,"WHERE (t.typrelid = 0 "),c(s,`OR (SELECT c.relkind = 'c' FROM pg_catalog.pg_class c WHERE c.oid = t.typrelid))
`),(r==null||Ye(r,"[]")==null)&&c(s,`  AND NOT EXISTS(SELECT 1 FROM pg_catalog.pg_type el WHERE el.oid = t.typelem AND e\
l.typarray = t.oid)
`),!t&&!r&&c(s,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!P(s,ke(r),!0,!1,"n.nspname","t.typname","pg_catalog.format_type(t.oid, NULL)","pg_catalog.pg_type_is_visible(t.oid)",
null,3)||(c(s,"ORDER BY 1, 2;"),i=await m(s.data),!i)?!1:(a.nullPrint=null,a.title=e("List of data types"),a.translate_header=
!0,G(i,a,T.queryFout,!1,T.logfile),!0)}function ke(r){let o=["decimal","numeric","float","double precision","int","integ\
er","bool[]","boolean[]","decimal[]","numeric[]","float[]","double precision[]","float4[]","real[]","float8[]","double p\
recision[]","int[]","integer[]","int2[]","smallint[]","int4[]","integer[]","int8[]","bigint[]","time[]","time without ti\
me zone[]","timetz[]","time with time zone[]","timestamp[]","timestamp without time zone[]","timestamptz[]","timestamp w\
ith time zone[]","varbit[]","bit varying[]","varchar[]","character varying[]",null];if(r==null)return null;for(let t=0;o[t]!=
null;t+=2)if(da(r,o[t])==0)return o[t+1];return r}async function bn(r,o,t,s,i){let a={},_,S=T.popt,N=[!1,!1,!1,!1,!1,!1,
!0,!1];if(C(a),L(a,`SELECT n.nspname as "%s",
  o.oprname AS "%s",
  CASE WHEN o.oprkind='l' THEN NULL ELSE pg_catalog.format_type(o.oprleft, NULL) END AS "%s",
  CASE WHEN o.oprkind='r' THEN NULL ELSE pg_catalog.format_type(o.oprright, NULL) END AS "%s",
  pg_catalog.format_type(o.oprresult, NULL) AS "%s",
`,E("Schema"),E("Name"),E("Left arg type"),E("Right arg type"),E("Result type")),s&&l(a,`  o.oprcode AS "%s",
  CASE WHEN p.proleakproof THEN '%s' ELSE '%s' END AS "%s",
`,E("Function"),E("yes"),E("no"),E("Leakproof?")),l(a,`  coalesce(pg_catalog.obj_description(o.oid, 'pg_operator'),
           pg_catalog.obj_description(o.oprcode, 'pg_proc')) AS "%s"
FROM pg_catalog.pg_operator o
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = o.oprnamespace
`,E("Description")),t>=2?(t=2,c(a,`     LEFT JOIN pg_catalog.pg_type t0 ON t0.oid = o.oprleft
     LEFT JOIN pg_catalog.pg_namespace nt0 ON nt0.oid = t0.typnamespace
     LEFT JOIN pg_catalog.pg_type t1 ON t1.oid = o.oprright
     LEFT JOIN pg_catalog.pg_namespace nt1 ON nt1.oid = t1.typnamespace
`)):t==1&&c(a,`     LEFT JOIN pg_catalog.pg_type t0 ON t0.oid = o.oprright
     LEFT JOIN pg_catalog.pg_namespace nt0 ON nt0.oid = t0.typnamespace
`),s&&c(a,`     LEFT JOIN pg_catalog.pg_proc p ON p.oid = o.oprcode
`),!i&&!r&&c(a,`WHERE n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!P(a,r,!i&&!r,!0,"n.nspname","o.oprname",null,"pg_catalog.pg_operator_is_visible(o.oid)",null,3))return!1;t==1&&c(a,`\
  AND o.oprleft = 0
`);for(let p=0;p<t;p++)if(F(o[p],"-")!=0){let b,f,D,O;if(b=ne("nt%d.nspname",p),f=ne("t%d.typname",p),D=ne("pg_catalog.f\
ormat_type(t%d.oid, NULL)",p),O=ne("pg_catalog.pg_type_is_visible(t%d.oid)",p),!P(a,ke(o[p]),!0,!1,b,f,D,O,null,3))return!1}else
l(a,`  AND t%d.typname IS NULL
`,p);return c(a,"ORDER BY 1, 2, 3, 4;"),_=await m(a.data),_?(S.nullPrint=null,S.title=e("List of operators"),S.translate_header=
!0,S.translate_columns=N,S.n_translate_columns=Z(N),G(_,S,T.queryFout,!1,T.logfile),!0):!1}async function hn(r,o){let t={},
s,i=T.popt,a=[!1,!1,!0,!1,!1,!1];return C(t),L(t,`SELECT n.nspname as "%s",
  c.relname as "%s",
  CASE c.relkind WHEN 'r' THEN '%s' WHEN 'v' THEN '%s' WHEN 'm' THEN '%s' WHEN 'S' THEN '%s' WHEN 'f' THEN '%s' WHEN 'p'\
 THEN '%s' END as "%s",
  `,E("Schema"),E("Name"),E("table"),E("view"),E("materialized view"),E("sequence"),E("foreign table"),E("partitioned ta\
ble"),E("Type")),ie(t,"c.relacl"),l(t,`,
  pg_catalog.array_to_string(ARRAY(
    SELECT attname || E':\\n  ' || pg_catalog.array_to_string(attacl, E'\\n  ')
    FROM pg_catalog.pg_attribute a
    WHERE attrelid = c.oid AND NOT attisdropped AND attacl IS NOT NULL
  ), E'\\n') AS "%s"`,E("Column privileges")),T.sversion>=90500&&T.sversion<1e5&&l(t,`,
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
    AS "%s"`,E("Policies")),T.sversion>=1e5&&l(t,`,
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
    AS "%s"`,E("Policies")),c(t,`
FROM pg_catalog.pg_class c
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
WHERE c.relkind IN ('r','v','m','S','f','p')
`),!o&&!r&&c(t,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!P(t,r,!0,!1,"n.nspname","c.relname",null,"pg_catalog.pg_table_is_visible(c.oid)",null,3)||(c(t,"ORDER BY 1, 2;"),s=await m(
t.data),!s)?!1:(i.nullPrint=null,L(t,e("Access privileges")),i.title=t.data,i.translate_header=!0,i.translate_columns=a,
i.n_translate_columns=Z(a),G(s,i,T.queryFout,!1,T.logfile),!0)}async function Fn(r){let o={},t,s=T.popt,i=[!1,!1,!0,!1];
return C(o),L(o,`SELECT pg_catalog.pg_get_userbyid(d.defaclrole) AS "%s",
  n.nspname AS "%s",
  CASE d.defaclobjtype     WHEN '%c' THEN '%s' WHEN '%c' THEN '%s' WHEN '%c' THEN '%s'    WHEN '%c' THEN '%s' WHEN '%c' \
THEN '%s' WHEN '%c' THEN '%s' END AS "%s",
  `,E("Owner"),E("Schema"),"r",E("table"),"S",E("sequence"),"f",E("function"),"T",E("type"),"n",E("schema"),"L",E("large\
 object"),E("Type")),ie(o,"d.defaclacl"),c(o,`
FROM pg_catalog.pg_default_acl d
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = d.defaclnamespace
`),!P(o,r,!1,!1,null,"n.nspname","pg_catalog.pg_get_userbyid(d.defaclrole)",null,null,3)||(c(o,"ORDER BY 1, 2, 3;"),t=await m(
o.data),!t)?!1:(s.nullPrint=null,L(o,e("Default access privileges")),s.title=o.data,s.translate_header=!0,s.translate_columns=
i,s.n_translate_columns=Z(i),G(t,s,T.queryFout,!1,T.logfile),!0)}async function yn(r,o){let t={},s,i=T.popt,a=[!1,!1,!0,
!1];return C(t),l(t,`SELECT DISTINCT tt.nspname AS "%s", tt.name AS "%s", tt.object AS "%s", d.description AS "%s"
FROM (
`,E("Schema"),E("Name"),E("Object"),E("Description")),l(t,`  SELECT pgc.oid as oid, pgc.tableoid AS tableoid,
  n.nspname as nspname,
  CAST(pgc.conname AS pg_catalog.text) as name,  CAST('%s' AS pg_catalog.text) as object
  FROM pg_catalog.pg_constraint pgc
    JOIN pg_catalog.pg_class c ON c.oid = pgc.conrelid
    LEFT JOIN pg_catalog.pg_namespace n     ON n.oid = c.relnamespace
`,E("table constraint")),!o&&!r&&c(t,`WHERE n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!P(t,r,!o&&!r,!1,"n.nspname","pgc.conname",null,"pg_catalog.pg_table_is_visible(c.oid)",null,3)||(l(t,`UNION ALL
  SELECT pgc.oid as oid, pgc.tableoid AS tableoid,
  n.nspname as nspname,
  CAST(pgc.conname AS pg_catalog.text) as name,  CAST('%s' AS pg_catalog.text) as object
  FROM pg_catalog.pg_constraint pgc
    JOIN pg_catalog.pg_type t ON t.oid = pgc.contypid
    LEFT JOIN pg_catalog.pg_namespace n     ON n.oid = t.typnamespace
`,E("domain constraint")),!o&&!r&&c(t,`WHERE n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!P(t,r,!o&&!r,!1,"n.nspname","pgc.conname",null,"pg_catalog.pg_type_is_visible(t.oid)",null,3))||(l(t,`UNION ALL
  SELECT o.oid as oid, o.tableoid as tableoid,
  n.nspname as nspname,
  CAST(o.opcname AS pg_catalog.text) as name,
  CAST('%s' AS pg_catalog.text) as object
  FROM pg_catalog.pg_opclass o
    JOIN pg_catalog.pg_am am ON o.opcmethod = am.oid
    JOIN pg_catalog.pg_namespace n ON n.oid = o.opcnamespace
`,E("operator class")),!o&&!r&&c(t,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!P(t,r,!0,!1,"n.nspname","o.opcname",null,"pg_catalog.pg_opclass_is_visible(o.oid)",null,3))||(l(t,`UNION ALL
  SELECT opf.oid as oid, opf.tableoid as tableoid,
  n.nspname as nspname,
  CAST(opf.opfname AS pg_catalog.text) AS name,
  CAST('%s' AS pg_catalog.text) as object
  FROM pg_catalog.pg_opfamily opf
    JOIN pg_catalog.pg_am am ON opf.opfmethod = am.oid
    JOIN pg_catalog.pg_namespace n ON opf.opfnamespace = n.oid
`,E("operator family")),!o&&!r&&c(t,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!P(t,r,!0,!1,"n.nspname","opf.opfname",null,"pg_catalog.pg_opfamily_is_visible(opf.oid)",null,3))||(l(t,`UNION ALL
  SELECT r.oid as oid, r.tableoid as tableoid,
  n.nspname as nspname,
  CAST(r.rulename AS pg_catalog.text) as name,  CAST('%s' AS pg_catalog.text) as object
  FROM pg_catalog.pg_rewrite r
       JOIN pg_catalog.pg_class c ON c.oid = r.ev_class
       LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
  WHERE r.rulename != '_RETURN'
`,E("rule")),!o&&!r&&c(t,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!P(t,r,!0,!1,"n.nspname","r.rulename",null,"pg_catalog.pg_table_is_visible(c.oid)",null,3))||(l(t,`UNION ALL
  SELECT t.oid as oid, t.tableoid as tableoid,
  n.nspname as nspname,
  CAST(t.tgname AS pg_catalog.text) as name,  CAST('%s' AS pg_catalog.text) as object
  FROM pg_catalog.pg_trigger t
       JOIN pg_catalog.pg_class c ON c.oid = t.tgrelid
       LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
`,E("trigger")),!o&&!r&&c(t,`WHERE n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!P(t,r,!o&&!r,!1,"n.nspname","t.tgname",null,"pg_catalog.pg_table_is_visible(c.oid)",null,3))||(c(t,`) AS tt
  JOIN pg_catalog.pg_description d ON (tt.oid = d.objoid AND tt.tableoid = d.classoid AND d.objsubid = 0)
`),c(t,"ORDER BY 1, 2, 3;"),s=await m(t.data),!s)?!1:(i.nullPrint=null,i.title=e("Object descriptions"),i.translate_header=
!0,i.translate_columns=a,i.n_translate_columns=Z(a),G(s,i,T.queryFout,!1,T.logfile),!0)}async function Hn(r,o,t){let s={},
i,a;if(C(s),L(s,`SELECT c.oid,
  n.nspname,
  c.relname
FROM pg_catalog.pg_class c
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
`),!t&&!r&&c(s,`WHERE n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!P(s,r,!t&&!r,!1,"n.nspname","c.relname",null,"pg_catalog.pg_table_is_visible(c.oid)",null,3)||(c(s,"ORDER BY 2, 3;"),
i=await m(s.data),!i))return!1;if(W(i)==0)return T.quiet||(r?y('Did not find any relation named "%s".',r):y("Did not fin\
d any relations.")),!1;for(a=0;a<W(i);a++){let _,S,N;if(_=A(i,a,0),S=A(i,a,1),N=A(i,a,2),!await Mn(S,N,_,o)||X)return!1}
return!0}async function Mn(r,o,t,s){let i=!1,a={},_=null,S=T.popt.topt,N={},p,b=null,f=[],D={},O={},M,J=-1,ee=-1,Q=-1,q=-1,
ue=-1,de=-1,Ce=-1,Re=-1,Me=-1,we=-1,Ge=-1,We=-1,Be=-1,ve=-1,je,g={},qe=!1;if(S.default_footer=!1,S.expanded=!1,C(a),C(D),
C(O),T.sversion>=12e4?L(a,`SELECT c.relchecks, c.relkind, c.relhasindex, c.relhasrules, c.relhastriggers, c.relrowsecuri\
ty, c.relforcerowsecurity, false AS relhasoids, c.relispartition, %s, c.reltablespace, CASE WHEN c.reloftype = 0 THEN ''\
 ELSE c.reloftype::pg_catalog.regtype::pg_catalog.text END, c.relpersistence, c.relreplident, am.amname
FROM pg_catalog.pg_class c
 LEFT JOIN pg_catalog.pg_class tc ON (c.reltoastrelid = tc.oid)
LEFT JOIN pg_catalog.pg_am am ON (c.relam = am.oid)
WHERE c.oid = '%s';`,s?`pg_catalog.array_to_string(c.reloptions || array(select 'toast.' || x from pg_catalog.unnest(tc.\
reloptions) x), ', ')
`:"''",t):T.sversion>=1e5?L(a,`SELECT c.relchecks, c.relkind, c.relhasindex, c.relhasrules, c.relhastriggers, c.relrowse\
curity, c.relforcerowsecurity, c.relhasoids, c.relispartition, %s, c.reltablespace, CASE WHEN c.reloftype = 0 THEN '' EL\
SE c.reloftype::pg_catalog.regtype::pg_catalog.text END, c.relpersistence, c.relreplident
FROM pg_catalog.pg_class c
 LEFT JOIN pg_catalog.pg_class tc ON (c.reltoastrelid = tc.oid)
WHERE c.oid = '%s';`,s?`pg_catalog.array_to_string(c.reloptions || array(select 'toast.' || x from pg_catalog.unnest(tc.\
reloptions) x), ', ')
`:"''",t):T.sversion>=90500?L(a,`SELECT c.relchecks, c.relkind, c.relhasindex, c.relhasrules, c.relhastriggers, c.relrow\
security, c.relforcerowsecurity, c.relhasoids, false as relispartition, %s, c.reltablespace, CASE WHEN c.reloftype = 0 T\
HEN '' ELSE c.reloftype::pg_catalog.regtype::pg_catalog.text END, c.relpersistence, c.relreplident
FROM pg_catalog.pg_class c
 LEFT JOIN pg_catalog.pg_class tc ON (c.reltoastrelid = tc.oid)
WHERE c.oid = '%s';`,s?`pg_catalog.array_to_string(c.reloptions || array(select 'toast.' || x from pg_catalog.unnest(tc.\
reloptions) x), ', ')
`:"''",t):T.sversion>=90400?L(a,`SELECT c.relchecks, c.relkind, c.relhasindex, c.relhasrules, c.relhastriggers, false, f\
alse, c.relhasoids, false as relispartition, %s, c.reltablespace, CASE WHEN c.reloftype = 0 THEN '' ELSE c.reloftype::pg\
_catalog.regtype::pg_catalog.text END, c.relpersistence, c.relreplident
FROM pg_catalog.pg_class c
 LEFT JOIN pg_catalog.pg_class tc ON (c.reltoastrelid = tc.oid)
WHERE c.oid = '%s';`,s?`pg_catalog.array_to_string(c.reloptions || array(select 'toast.' || x from pg_catalog.unnest(tc.\
reloptions) x), ', ')
`:"''",t):L(a,`SELECT c.relchecks, c.relkind, c.relhasindex, c.relhasrules, c.relhastriggers, false, false, c.relhasoids\
, false as relispartition, %s, c.reltablespace, CASE WHEN c.reloftype = 0 THEN '' ELSE c.reloftype::pg_catalog.regtype::\
pg_catalog.text END, c.relpersistence
FROM pg_catalog.pg_class c
 LEFT JOIN pg_catalog.pg_class tc ON (c.reltoastrelid = tc.oid)
WHERE c.oid = '%s';`,s?`pg_catalog.array_to_string(c.reloptions || array(select 'toast.' || x from pg_catalog.unnest(tc.\
reloptions) x), ', ')
`:"''",t),_=await m(a.data),!_)return i;if(W(_)==0)return T.quiet||y("Did not find any relation with OID %s.",t),i;if(g.
checks=on(A(_,0,0)),g.relkind=A(_,0,1),g.hasindex=F(A(_,0,2),"t")==0,g.hasrules=F(A(_,0,3),"t")==0,g.hastriggers=F(A(_,0,
4),"t")==0,g.rowsecurity=F(A(_,0,5),"t")==0,g.forcerowsecurity=F(A(_,0,6),"t")==0,g.hasoids=F(A(_,0,7),"t")==0,g.ispartition=
F(A(_,0,8),"t")==0,g.reloptions=Ae(A(_,0,9)),g.tablespace=Je(A(_,0,10)),g.reloftype=F(A(_,0,11),"")!=0?Ae(A(_,0,11)):null,
g.relpersistence=A(_,0,12),g.relreplident=T.sversion>=90400?A(_,0,13):"d",T.sversion>=12e4?g.relam=ae(_,0,14)?null:Ae(A(
_,0,14)):g.relam=null,_=null,g.relkind=="S"){let R=null,u=T.popt,h=[null,null];if(T.sversion>=1e5?(L(a,`SELECT pg_catalo\
g.format_type(seqtypid, NULL) AS "%s",
       seqstart AS "%s",
       seqmin AS "%s",
       seqmax AS "%s",
       seqincrement AS "%s",
       CASE WHEN seqcycle THEN '%s' ELSE '%s' END AS "%s",
       seqcache AS "%s"
`,E("Type"),E("Start"),E("Minimum"),E("Maximum"),E("Increment"),E("yes"),E("no"),E("Cycles?"),E("Cache")),l(a,`FROM pg_c\
atalog.pg_sequence
WHERE seqrelid = '%s';`,t)):(L(a,`SELECT 'bigint' AS "%s",
       start_value AS "%s",
       min_value AS "%s",
       max_value AS "%s",
       increment_by AS "%s",
       CASE WHEN is_cycled THEN '%s' ELSE '%s' END AS "%s",
       cache_value AS "%s"
`,E("Type"),E("Start"),E("Minimum"),E("Maximum"),E("Increment"),E("yes"),E("no"),E("Cycles?"),E("Cache")),l(a,"FROM %s",
ge(r)),l(a,".%s;",ge(o))),_=await m(a.data),!_)return i;if(L(a,`SELECT pg_catalog.quote_ident(nspname) || '.' ||
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
 AND d.deptype IN ('a', 'i')`,t),R=await m(a.data),R){if(W(R)==1)switch(A(R,0,1)[0]){case"a":h[0]=xe(e("Owned by: %s"),A(
R,0,0));break;case"i":h[0]=xe(e("Sequence for identity column: %s"),A(R,0,0));break}}else return i;return g.relpersistence==
"u"?L(D,e('Unlogged sequence "%s.%s"'),r,o):L(D,e('Sequence "%s.%s"'),r,o),u.footers=h,u.topt.default_footer=!1,u.title=
D.data,u.translate_header=!0,G(_,u,T.queryFout,!1,T.logfile),i=!0,i}if((g.relkind=="r"||g.relkind=="v"||g.relkind=="m"||
g.relkind=="f"||g.relkind=="c"||g.relkind=="p")&&(qe=!0),M=0,L(a,"SELECT a.attname"),J=M++,c(a,`,
  pg_catalog.format_type(a.atttypid, a.atttypmod)`),ee=M++,qe&&(c(a,`,
  (SELECT pg_catalog.pg_get_expr(d.adbin, d.adrelid, true)
   FROM pg_catalog.pg_attrdef d
   WHERE d.adrelid = a.attrelid AND d.adnum = a.attnum AND a.atthasdef),
  a.attnotnull`),Q=M++,q=M++,c(a,`,
  (SELECT c.collname FROM pg_catalog.pg_collation c, pg_catalog.pg_type t
   WHERE c.oid = a.attcollation AND t.oid = a.atttypid AND a.attcollation <> t.typcollation) AS attcollation`),ue=M++,T.
sversion>=1e5?c(a,`,
  a.attidentity`):c(a,`,
  ''::pg_catalog.char AS attidentity`),de=M++,T.sversion>=12e4?c(a,`,
  a.attgenerated`):c(a,`,
  ''::pg_catalog.char AS attgenerated`),Ce=M++),(g.relkind=="i"||g.relkind=="I")&&(T.sversion>=11e4&&(l(a,`,
  CASE WHEN a.attnum <= (SELECT i.indnkeyatts FROM pg_catalog.pg_index i WHERE i.indexrelid = '%s') THEN '%s' ELSE '%s' \
END AS is_key`,t,E("yes"),E("no")),Re=M++),c(a,`,
  pg_catalog.pg_get_indexdef(a.attrelid, a.attnum, TRUE) AS indexdef`),Me=M++),g.relkind=="f"&&(c(a,`,
  CASE WHEN attfdwoptions IS NULL THEN '' ELSE   '(' || pg_catalog.array_to_string(ARRAY(SELECT pg_catalog.quote_ident(o\
ption_name) || ' ' || pg_catalog.quote_literal(option_value)  FROM   pg_catalog.pg_options_to_table(attfdwoptions)), ', \
') || ')' END AS attfdwoptions`),we=M++),s&&(c(a,`,
  a.attstorage`),Ge=M++,T.sversion>=14e4&&!T.hide_compression&&(g.relkind=="r"||g.relkind=="p"||g.relkind=="m")&&(c(a,`,\

  a.attcompression AS attcompression`),We=M++),(g.relkind=="r"||g.relkind=="i"||g.relkind=="I"||g.relkind=="m"||g.relkind==
"f"||g.relkind=="p")&&(c(a,`,
  CASE WHEN a.attstattarget=-1 THEN NULL ELSE a.attstattarget END AS attstattarget`),Be=M++),(g.relkind=="r"||g.relkind==
"v"||g.relkind=="m"||g.relkind=="f"||g.relkind=="c"||g.relkind=="p")&&(c(a,`,
  pg_catalog.col_description(a.attrelid, a.attnum)`),ve=M++)),c(a,`
FROM pg_catalog.pg_attribute a`),l(a,`
WHERE a.attrelid = '%s' AND a.attnum > 0 AND NOT a.attisdropped`,t),c(a,`
ORDER BY a.attnum;`),_=await m(a.data),!_)return i;switch(je=W(_),g.relkind){case"r":g.relpersistence=="u"?L(D,e('Unlogg\
ed table "%s.%s"'),r,o):L(D,e('Table "%s.%s"'),r,o);break;case"v":L(D,e('View "%s.%s"'),r,o);break;case"m":L(D,e('Materi\
alized view "%s.%s"'),r,o);break;case"i":g.relpersistence=="u"?L(D,e('Unlogged index "%s.%s"'),r,o):L(D,e('Index "%s.%s"'),
r,o);break;case"I":g.relpersistence=="u"?L(D,e('Unlogged partitioned index "%s.%s"'),r,o):L(D,e('Partitioned index "%s.%\
s"'),r,o);break;case"t":L(D,e('TOAST table "%s.%s"'),r,o);break;case"c":L(D,e('Composite type "%s.%s"'),r,o);break;case"\
f":L(D,e('Foreign table "%s.%s"'),r,o);break;case"p":g.relpersistence=="u"?L(D,e('Unlogged partitioned table "%s.%s"'),r,
o):L(D,e('Partitioned table "%s.%s"'),r,o);break;default:L(D,'?%c? "%s.%s"',g.relkind,r,o);break}for(M=0,f[M++]=E("Colum\
n"),f[M++]=E("Type"),qe&&(f[M++]=E("Collation"),f[M++]=E("Nullable"),f[M++]=E("Default")),Re>=0&&(f[M++]=E("Key?")),Me>=
0&&(f[M++]=E("Definition")),we>=0&&(f[M++]=E("FDW options")),Ge>=0&&(f[M++]=E("Storage")),We>=0&&(f[M++]=E("Compression")),
Be>=0&&(f[M++]=E("Stats target")),ve>=0&&(f[M++]=E("Description")),Oe(M<=Z(f)),ye(N,S,D.data,M,je),p=0;p<M;p++)Ee(N,f[p],
!0,"l");for(p=0;p<je;p++){if(K(N,A(_,p,J),!1,!1),K(N,A(_,p,ee),!1,!1),qe){let R,u,h,w=!1;K(N,A(_,p,ue),!1,!1),K(N,F(A(_,
p,q),"t")==0?"not null":"",!1,!1),R=A(_,p,de),u=A(_,p,Ce),R[0]=="a"?h="generated always as identity":R[0]=="d"?h="genera\
ted by default as identity":u[0]=="s"?(h=xe("generated always as (%s) stored",A(_,p,Q)),w=!0):u[0]=="v"?(h=xe("generated\
 always as (%s)",A(_,p,Q)),w=!0):h=A(_,p,Q),K(N,h,!1,w)}if(Re>=0&&K(N,A(_,p,Re),!0,!1),Me>=0&&K(N,A(_,p,Me),!1,!1),we>=0&&
K(N,A(_,p,we),!1,!1),Ge>=0){let R=A(_,p,Ge);K(N,R[0]=="p"?"plain":R[0]=="m"?"main":R[0]=="x"?"extended":R[0]=="e"?"exter\
nal":"???",!1,!1)}if(We>=0){let R=A(_,p,We);K(N,R[0]=="p"?"pglz":R[0]=="l"?"lz4":R[0]==null?"":"???",!1,!1)}Be>=0&&K(N,A(
_,p,Be),!1,!1),ve>=0&&K(N,A(_,p,ve),!1,!1)}if(g.ispartition){let R;if(L(a,`SELECT inhparent::pg_catalog.regclass,
  pg_catalog.pg_get_expr(c.relpartbound, c.oid),
  `),c(a,T.sversion>=14e4?"inhdetachpending":"false as inhdetachpending"),s&&c(a,`,
  pg_catalog.pg_get_partition_constraintdef(c.oid)`),l(a,`
FROM pg_catalog.pg_class c JOIN pg_catalog.pg_inherits i ON c.oid = inhrelid
WHERE c.oid = '%s';`,t),R=await m(a.data),!R)return i;if(W(R)>0){let u=A(R,0,0),h=A(R,0,1),w=A(R,0,2);if(L(O,e("Partitio\
n of: %s %s%s"),u,h,F(w,"t")==0?" DETACH PENDING":""),H(N,O.data),s){let v=null;ae(R,0,3)||(v=A(R,0,3)),v==null||v[0]==null?
L(O,e("No partition constraint")):L(O,e("Partition constraint: %s"),v),H(N,O.data)}}}if(g.relkind=="p"){let R;if(L(a,"SE\
LECT pg_catalog.pg_get_partkeydef('%s'::pg_catalog.oid);",t),R=await m(a.data),!R)return i;if(W(R)==1){let u=A(R,0,0);L(
O,e("Partition key: %s"),u),H(N,O.data)}}if(g.relkind=="t"){let R;if(L(a,`SELECT n.nspname, c.relname
FROM pg_catalog.pg_class c JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
WHERE reltoastrelid = '%s';`,t),R=await m(a.data),!R)return i;if(W(R)==1){let u=A(R,0,0),h=A(R,0,1);L(O,e('Owning table:\
 "%s.%s"'),u,h),H(N,O.data)}}if(g.relkind=="i"||g.relkind=="I"){let R;if(L(a,`SELECT i.indisunique, i.indisprimary, i.in\
disclustered, i.indisvalid,
  (NOT i.indimmediate) AND EXISTS (SELECT 1 FROM pg_catalog.pg_constraint WHERE conrelid = i.indrelid AND conindid = i.i\
ndexrelid AND contype IN ('p','u','x') AND condeferrable) AS condeferrable,
  (NOT i.indimmediate) AND EXISTS (SELECT 1 FROM pg_catalog.pg_constraint WHERE conrelid = i.indrelid AND conindid = i.i\
ndexrelid AND contype IN ('p','u','x') AND condeferred) AS condeferred,
`),T.sversion>=90400?c(a,`i.indisreplident,
`):c(a,`false AS indisreplident,
`),T.sversion>=15e4?c(a,`i.indnullsnotdistinct,
`):c(a,`false AS indnullsnotdistinct,
`),l(a,`  a.amname, c2.relname, pg_catalog.pg_get_expr(i.indpred, i.indrelid, true)
FROM pg_catalog.pg_index i, pg_catalog.pg_class c, pg_catalog.pg_class c2, pg_catalog.pg_am a
WHERE i.indexrelid = c.oid AND c.oid = '%s' AND c.relam = a.oid
AND i.indrelid = c2.oid;`,t),R=await m(a.data),R){if(W(R)!=1)return i;{let u=A(R,0,0),h=A(R,0,1),w=A(R,0,2),v=A(R,0,3),j=A(
R,0,4),re=A(R,0,5),se=A(R,0,6),De=A(R,0,7),La=A(R,0,8),Sa=A(R,0,9),sn=A(R,0,10);F(h,"t")==0?L(O,e("primary key, ")):F(u,
"t")==0?(L(O,e("unique")),F(De,"t")==0&&c(O,e(" nulls not distinct")),c(O,e(", "))):ze(O),l(O,"%s, ",La),l(O,e('for tabl\
e "%s.%s"'),r,Sa),le(sn)&&l(O,e(", predicate (%s)"),sn),F(w,"t")==0&&c(O,e(", clustered")),F(v,"t")!=0&&c(O,e(", invalid")),
F(j,"t")==0&&c(O,e(", deferrable")),F(re,"t")==0&&c(O,e(", initially deferred")),F(se,"t")==0&&c(O,e(", replica identity")),
H(N,O.data),g.relkind=="i"&&await Ke(N,g.relkind,g.tablespace,!0)}}else return i}else if(g.relkind=="r"||g.relkind=="m"||
g.relkind=="f"||g.relkind=="p"||g.relkind=="I"||g.relkind=="t"){let R=null,u=0;if(g.hasindex){if(L(a,`SELECT c2.relname,\
 i.indisprimary, i.indisunique, i.indisclustered, i.indisvalid, pg_catalog.pg_get_indexdef(i.indexrelid, 0, true),
  pg_catalog.pg_get_constraintdef(con.oid, true), contype, condeferrable, condeferred`),T.sversion>=90400?c(a,", i.indis\
replident"):c(a,", false AS indisreplident"),c(a,", c2.reltablespace"),T.sversion>=18e4?c(a,", con.conperiod"):c(a,", fa\
lse AS conperiod"),l(a,`
FROM pg_catalog.pg_class c, pg_catalog.pg_class c2, pg_catalog.pg_index i
  LEFT JOIN pg_catalog.pg_constraint con ON (conrelid = i.indrelid AND conindid = i.indexrelid AND contype IN ('p','u','\
x'))
WHERE c.oid = '%s' AND c.oid = i.indrelid AND i.indexrelid = c2.oid
ORDER BY i.indisprimary DESC, c2.relname;`,t),R=await m(a.data),R)u=W(R);else return i;if(u>0)for(H(N,e("Indexes:")),p=0;p<
u;p++){if(L(a,'    "%s"',A(R,p,0)),F(A(R,p,7),"x")==0||F(A(R,p,12),"t")==0)l(a," %s",A(R,p,6));else{let h,w;F(A(R,p,1),"\
t")==0?c(a," PRIMARY KEY,"):F(A(R,p,2),"t")==0&&(F(A(R,p,7),"u")==0?c(a," UNIQUE CONSTRAINT,"):c(a," UNIQUE,")),h=A(R,p,
5),w=Ye(h," USING "),w!=null&&(h=h.slice(w+7)),l(a," %s",h),F(A(R,p,8),"t")==0&&c(a," DEFERRABLE"),F(A(R,p,9),"t")==0&&c(
a," INITIALLY DEFERRED")}F(A(R,p,3),"t")==0&&c(a," CLUSTER"),F(A(R,p,4),"t")!=0&&c(a," INVALID"),F(A(R,p,10),"t")==0&&c(
a," REPLICA IDENTITY"),H(N,a.data),await Ke(N,"i",Je(A(R,p,11)),!1)}}if(g.checks){if(L(a,`SELECT r.conname, pg_catalog.p\
g_get_constraintdef(r.oid, true)
FROM pg_catalog.pg_constraint r
WHERE r.conrelid = '%s' AND r.contype = 'c'
ORDER BY 1;`,t),R=await m(a.data),R)u=W(R);else return i;if(u>0)for(H(N,e("Check constraints:")),p=0;p<u;p++)L(a,'    "%\
s" %s',A(R,p,0),A(R,p,1)),H(N,a.data)}if(T.sversion>=12e4&&(g.ispartition||g.relkind=="p")?L(a,`SELECT conrelid = '%s'::\
pg_catalog.regclass AS sametable,
       conname,
       pg_catalog.pg_get_constraintdef(oid, true) AS condef,
       conrelid::pg_catalog.regclass AS ontable
  FROM pg_catalog.pg_constraint,
       pg_catalog.pg_partition_ancestors('%s')
 WHERE conrelid = relid AND contype = 'f' AND conparentid = 0
ORDER BY sametable DESC, conname;`,t,t):(L(a,`SELECT true as sametable, conname,
  pg_catalog.pg_get_constraintdef(r.oid, true) as condef,
  conrelid::pg_catalog.regclass AS ontable
FROM pg_catalog.pg_constraint r
WHERE r.conrelid = '%s' AND r.contype = 'f'
`,t),T.sversion>=12e4&&c(a,`     AND conparentid = 0
`),c(a,"ORDER BY conname")),R=await m(a.data),R)u=W(R);else return i;if(u>0){let h=Ne(R,"sametable"),w=Ne(R,"conname"),v=Ne(
R,"condef"),j=Ne(R,"ontable");for(H(N,e("Foreign-key constraints:")),p=0;p<u;p++)F(A(R,p,h),"f")==0?L(a,'    TABLE "%s" \
CONSTRAINT "%s" %s',A(R,p,j),A(R,p,w),A(R,p,v)):L(a,'    "%s" %s',A(R,p,w),A(R,p,v)),H(N,a.data)}if(T.sversion>=12e4?L(a,
`SELECT conname, conrelid::pg_catalog.regclass AS ontable,
       pg_catalog.pg_get_constraintdef(oid, true) AS condef
  FROM pg_catalog.pg_constraint c
 WHERE confrelid IN (SELECT pg_catalog.pg_partition_ancestors('%s')
                     UNION ALL VALUES ('%s'::pg_catalog.regclass))
       AND contype = 'f' AND conparentid = 0
ORDER BY conname;`,t,t):L(a,`SELECT conname, conrelid::pg_catalog.regclass AS ontable,
       pg_catalog.pg_get_constraintdef(oid, true) AS condef
  FROM pg_catalog.pg_constraint
 WHERE confrelid = %s AND contype = 'f'
ORDER BY conname;`,t),R=await m(a.data),R)u=W(R);else return i;if(u>0){let h=Ne(R,"conname"),w=Ne(R,"ontable"),v=Ne(R,"c\
ondef");for(H(N,e("Referenced by:")),p=0;p<u;p++)L(a,'    TABLE "%s" CONSTRAINT "%s" %s',A(R,p,w),A(R,p,h),A(R,p,v)),H(N,
a.data)}if(T.sversion>=90500){if(L(a,"SELECT pol.polname,"),T.sversion>=1e5?c(a,` pol.polpermissive,
`):c(a,` 't' as polpermissive,
`),l(a,`  CASE WHEN pol.polroles = '{0}' THEN NULL ELSE pg_catalog.array_to_string(array(select rolname from pg_catalog.\
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
WHERE pol.polrelid = '%s' ORDER BY 1;`,t),R=await m(a.data),R)u=W(R);else return i;for(g.rowsecurity&&!g.forcerowsecurity&&
u>0&&H(N,e("Policies:")),g.rowsecurity&&g.forcerowsecurity&&u>0&&H(N,e("Policies (forced row security enabled):")),g.rowsecurity&&
!g.forcerowsecurity&&u==0&&H(N,e("Policies (row security enabled): (none)")),g.rowsecurity&&g.forcerowsecurity&&u==0&&H(
N,e("Policies (forced row security enabled): (none)")),!g.rowsecurity&&u>0&&H(N,e("Policies (row security disabled):")),
p=0;p<u;p++)L(a,'    POLICY "%s"',A(R,p,0)),A(R,p,1)=="f"&&c(a," AS RESTRICTIVE"),ae(R,p,5)||l(a," FOR %s",A(R,p,5)),ae(
R,p,2)||l(a,`
      TO %s`,A(R,p,2)),ae(R,p,3)||l(a,`
      USING (%s)`,A(R,p,3)),ae(R,p,4)||l(a,`
      WITH CHECK (%s)`,A(R,p,4)),H(N,a.data)}if(T.sversion>=14e4){if(L(a,`SELECT oid, stxrelid::pg_catalog.regclass, stx\
namespace::pg_catalog.regnamespace::pg_catalog.text AS nsp, stxname,
pg_catalog.pg_get_statisticsobjdef_columns(oid) AS columns,
  'd' = any(stxkind) AS ndist_enabled,
  'f' = any(stxkind) AS deps_enabled,
  'm' = any(stxkind) AS mcv_enabled,
stxstattarget
FROM pg_catalog.pg_statistic_ext
WHERE stxrelid = '%s'
ORDER BY nsp, stxname;`,t),R=await m(a.data),R)u=W(R);else return i;if(u>0)for(H(N,e("Statistics objects:")),p=0;p<u;p++){
let h=!1,w,v,j,re,se;w=F(A(R,p,5),"t")==0,v=F(A(R,p,6),"t")==0,j=F(A(R,p,7),"t")==0,L(a,"    "),l(a,'"%s.%s"',A(R,p,2),A(
R,p,3)),re=w&&v&&j,se=w||v||j,se&&!re&&(c(a," ("),w&&(c(a,"ndistinct"),h=!0),v&&(l(a,"%sdependencies",h?", ":""),h=!0),j&&
l(a,"%smcv",h?", ":""),V(a,")")),l(a," ON %s FROM %s",A(R,p,4),A(R,p,1)),!ae(R,p,8)&&F(A(R,p,8),"-1")!=0&&l(a,"; STATIST\
ICS %s",A(R,p,8)),H(N,a.data)}}else if(T.sversion>=1e5){if(L(a,`SELECT oid, stxrelid::pg_catalog.regclass, stxnamespace:\
:pg_catalog.regnamespace AS nsp, stxname,
  (SELECT pg_catalog.string_agg(pg_catalog.quote_ident(attname),', ')
   FROM pg_catalog.unnest(stxkeys) s(attnum)
   JOIN pg_catalog.pg_attribute a ON (stxrelid = a.attrelid AND
        a.attnum = s.attnum AND NOT attisdropped)) AS columns,
  'd' = any(stxkind) AS ndist_enabled,
  'f' = any(stxkind) AS deps_enabled,
  'm' = any(stxkind) AS mcv_enabled,
`),T.sversion>=13e4?c(a,`  stxstattarget
`):c(a,`  -1 AS stxstattarget
`),l(a,`FROM pg_catalog.pg_statistic_ext
WHERE stxrelid = '%s'
ORDER BY 1;`,t),R=await m(a.data),R)u=W(R);else return i;if(u>0)for(H(N,e("Statistics objects:")),p=0;p<u;p++){let h=!1;
L(a,"    "),l(a,'"%s.%s" (',A(R,p,2),A(R,p,3)),F(A(R,p,5),"t")==0&&(c(a,"ndistinct"),h=!0),F(A(R,p,6),"t")==0&&(l(a,"%sd\
ependencies",h?", ":""),h=!0),F(A(R,p,7),"t")==0&&l(a,"%smcv",h?", ":""),l(a,") ON %s FROM %s",A(R,p,4),A(R,p,1)),F(A(R,
p,8),"-1")!=0&&l(a,"; STATISTICS %s",A(R,p,8)),H(N,a.data)}}if(g.hasrules&&g.relkind!="m"){if(L(a,`SELECT r.rulename, tr\
im(trailing ';' from pg_catalog.pg_get_ruledef(r.oid, true)), ev_enabled
FROM pg_catalog.pg_rewrite r
WHERE r.ev_class = '%s' ORDER BY 1;`,t),R=await m(a.data),R)u=W(R);else return i;if(u>0){let h,w;for(w=0;w<4;w++)for(h=!1,
p=0;p<u;p++){let v,j=!1;switch(w){case 0:A(R,p,2)=="O"&&(j=!0);break;case 1:A(R,p,2)=="D"&&(j=!0);break;case 2:A(R,p,2)==
"A"&&(j=!0);break;case 3:A(R,p,2)=="R"&&(j=!0);break}if(j){if(!h){switch(w){case 0:L(a,e("Rules:"));break;case 1:L(a,e("\
Disabled rules:"));break;case 2:L(a,e("Rules firing always:"));break;case 3:L(a,e("Rules firing on replica only:"));break}
H(N,a.data),h=!0}v=A(R,p,1),v=v.slice(12),L(a,"    %s",v),H(N,a.data)}}}}if(T.sversion>=1e5){if(T.sversion>=15e4?L(a,`SE\
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
ORDER BY 1;`,t,t,t,t):L(a,`SELECT pubname
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
ORDER BY 1;`,t,t),R=await m(a.data),R)u=W(R);else return i;for(u>0&&H(N,e("Publications:")),p=0;p<u;p++)L(a,'    "%s"',A(
R,p,0)),ae(R,p,2)||l(a," (%s)",A(R,p,2)),ae(R,p,1)||l(a," WHERE %s",A(R,p,1)),H(N,a.data)}if(s){if(L(a,`SELECT c.conname\
, a.attname, c.connoinherit,
  c.conislocal, c.coninhcount <> 0,
  c.convalidated
FROM pg_catalog.pg_constraint c JOIN
  pg_catalog.pg_attribute a ON
    (a.attrelid = c.conrelid AND a.attnum = c.conkey[1])
WHERE c.contype = 'n' AND
  c.conrelid = '%s'::pg_catalog.regclass
ORDER BY a.attnum`,t),R=await m(a.data),R)u=W(R);else return i;for(u>0&&H(N,e("Not-null constraints:")),p=0;p<u;p++){let h=A(
R,p,3)[0]=="t",w=A(R,p,4)[0]=="t",v=A(R,p,5)[0]=="t";L(a,'    "%s" NOT NULL "%s"%s%s',A(R,p,0),A(R,p,1),A(R,p,2)[0]=="t"?
" NO INHERIT":h&&w?e(" (local, inherited)"):w?e(" (inherited)"):"",v?"":" NOT VALID"),H(N,a.data)}}}if((g.relkind=="v"||
g.relkind=="m")&&s){let R;if(L(a,"SELECT pg_catalog.pg_get_viewdef('%s'::pg_catalog.oid, true);",t),R=await m(a.data),!R)
return i;W(R)>0&&(b=Ae(A(R,0,0)))}if(b){let R=null;if(H(N,e("View definition:")),H(N,b),g.hasrules){if(L(a,`SELECT r.rul\
ename, trim(trailing ';' from pg_catalog.pg_get_ruledef(r.oid, true))
FROM pg_catalog.pg_rewrite r
WHERE r.ev_class = '%s' AND r.rulename != '_RETURN' ORDER BY 1;`,t),R=await m(a.data),!R)return i;if(W(R)>0)for(H(N,e("R\
ules:")),p=0;p<W(R);p++){let u;u=A(R,p,1),u=u.slice(12),L(a," %s",u),H(N,a.data)}}}if(g.hastriggers){let R,u;if(L(a,`SEL\
ECT t.tgname, pg_catalog.pg_get_triggerdef(t.oid, true), t.tgenabled, t.tgisinternal,
`),T.sversion>=13e4?c(a,`  CASE WHEN t.tgparentid != 0 THEN
    (SELECT u.tgrelid::pg_catalog.regclass
     FROM pg_catalog.pg_trigger AS u,
          pg_catalog.pg_partition_ancestors(t.tgrelid) WITH ORDINALITY AS a(relid, depth)
     WHERE u.tgname = t.tgname AND u.tgrelid = a.relid
           AND u.tgparentid = 0
     ORDER BY a.depth LIMIT 1)
  END AS parent
`):c(a,`  NULL AS parent
`),l(a,`FROM pg_catalog.pg_trigger t
WHERE t.tgrelid = '%s' AND `,t),T.sversion>=11e4&&T.sversion<15e4?c(a,`(NOT t.tgisinternal OR (t.tgisinternal AND t.tgen\
abled = 'D') 
    OR EXISTS (SELECT 1 FROM pg_catalog.pg_depend WHERE objid = t.oid 
        AND refclassid = 'pg_catalog.pg_trigger'::pg_catalog.regclass))`):c(a,"(NOT t.tgisinternal OR (t.tgisinternal AN\
D t.tgenabled = 'D'))"),c(a,`
ORDER BY 1;`),R=await m(a.data),R)u=W(R);else return i;if(u>0){let h,w;for(w=0;w<=4;w++)for(h=!1,p=0;p<u;p++){let v,j,re,
se,De;switch(se=A(R,p,2),De=A(R,p,3),v=!1,w){case 0:(se=="O"||se=="t")&&(v=!0);break;case 1:(se=="D"||se=="f")&&De=="f"&&
(v=!0);break;case 2:(se=="D"||se=="f")&&De=="t"&&(v=!0);break;case 3:se=="A"&&(v=!0);break;case 4:se=="R"&&(v=!0);break}
if(v!=!1){if(h==!1){switch(w){case 0:L(a,e("Triggers:"));break;case 1:L(a,e("Disabled user triggers:"));break;case 2:L(a,
e("Disabled internal triggers:"));break;case 3:L(a,e("Triggers firing always:"));break;case 4:L(a,e("Triggers firing on \
replica only:"));break}H(N,a.data),h=!0}j=A(R,p,1),re=Ye(j," TRIGGER "),re!=null&&(j=j.slice(re+9)),L(a,"    %s",j),ae(R,
p,4)||l(a,", ON TABLE %s",A(R,p,4)),H(N,a.data)}}}}if(g.relkind=="r"||g.relkind=="m"||g.relkind=="f"||g.relkind=="p"||g.
relkind=="I"||g.relkind=="t"){let R,u,h;if(R=g.relkind=="p"||g.relkind=="I",g.relkind=="f"){let w;if(L(a,`SELECT s.srvna\
me,
  pg_catalog.array_to_string(ARRAY(
    SELECT pg_catalog.quote_ident(option_name) || ' ' || pg_catalog.quote_literal(option_value)
    FROM pg_catalog.pg_options_to_table(ftoptions)),  ', ')
FROM pg_catalog.pg_foreign_table f,
     pg_catalog.pg_foreign_server s
WHERE f.ftrelid = '%s' AND s.oid = f.ftserver;`,t),u=await m(a.data),u){if(W(u)!=1)return i}else return i;L(a,e("Server:\
 %s"),A(u,0,0)),H(N,a.data),w=A(u,0,1),w&&w[0]!=null&&(L(a,e("FDW options: (%s)"),w),H(N,a.data))}if(L(a,`SELECT c.oid::\
pg_catalog.regclass
FROM pg_catalog.pg_class c, pg_catalog.pg_inherits i
WHERE c.oid = i.inhparent AND i.inhrelid = '%s'
  AND c.relkind != 'p' AND c.relkind != 'I'
ORDER BY inhseqno;`,t),u=await m(a.data),u){let w=e("Inherits"),v=rn(w,le(w),T.encoding);for(h=W(u),p=0;p<h;p++)p==0?L(a,
"%s: %s",w,A(u,p,0)):L(a,"%*s  %s",v,"",A(u,p,0)),p<h-1&&V(a,","),H(N,a.data)}else return i;if(T.sversion>=14e4?L(a,`SEL\
ECT c.oid::pg_catalog.regclass, c.relkind, inhdetachpending, pg_catalog.pg_get_expr(c.relpartbound, c.oid)
FROM pg_catalog.pg_class c, pg_catalog.pg_inherits i
WHERE c.oid = i.inhrelid AND i.inhparent = '%s'
ORDER BY pg_catalog.pg_get_expr(c.relpartbound, c.oid) = 'DEFAULT', c.oid::pg_catalog.regclass::pg_catalog.text;`,t):T.sversion>=
1e5?L(a,`SELECT c.oid::pg_catalog.regclass, c.relkind, false AS inhdetachpending, pg_catalog.pg_get_expr(c.relpartbound,\
 c.oid)
FROM pg_catalog.pg_class c, pg_catalog.pg_inherits i
WHERE c.oid = i.inhrelid AND i.inhparent = '%s'
ORDER BY pg_catalog.pg_get_expr(c.relpartbound, c.oid) = 'DEFAULT', c.oid::pg_catalog.regclass::pg_catalog.text;`,t):L(a,
`SELECT c.oid::pg_catalog.regclass, c.relkind, false AS inhdetachpending, NULL
FROM pg_catalog.pg_class c, pg_catalog.pg_inherits i
WHERE c.oid = i.inhrelid AND i.inhparent = '%s'
ORDER BY c.oid::pg_catalog.regclass::pg_catalog.text;`,t),u=await m(a.data),!u)return i;if(h=W(u),R&&h==0)L(a,e("Number \
of partitions: %d"),h),H(N,a.data);else if(!s)h>0&&(R?L(a,e("Number of partitions: %d (Use \\d+ to list them.)"),h):L(a,
e("Number of child tables: %d (Use \\d+ to list them.)"),h),H(N,a.data));else{let w=e(R?"Partitions":"Child tables"),v=rn(
w,le(w),T.encoding);for(p=0;p<h;p++){let j=A(u,p,1);p==0?L(a,"%s: %s",w,A(u,p,0)):L(a,"%*s  %s",v,"",A(u,p,0)),ae(u,p,3)||
l(a," %s",A(u,p,3)),j=="p"||j=="I"?c(a,", PARTITIONED"):j=="f"&&c(a,", FOREIGN"),F(A(u,p,2),"t")==0&&c(a," (DETACH PENDI\
NG)"),p<h-1&&V(a,","),H(N,a.data)}}if(g.reloftype&&(L(a,e("Typed table of type: %s"),g.reloftype),H(N,a.data)),s&&(g.relkind==
"r"||g.relkind=="m")&&g.relreplident!="i"&&(F(r,"pg_catalog")!=0&&g.relreplident!="d"||F(r,"pg_catalog")==0&&g.relreplident!=
"n")){let w=e("Replica Identity");L(a,"%s: %s",w,g.relreplident=="f"?"FULL":g.relreplident=="n"?"NOTHING":"???"),H(N,a.data)}
s&&g.relkind!="m"&&g.hasoids&&H(N,e("Has OIDs: yes")),await Ke(N,g.relkind,g.tablespace,!0),s&&g.relam!=null&&!T.hide_tableam&&
(L(a,e("Access method: %s"),g.relam),H(N,a.data))}if(s&&g.reloptions&&g.reloptions[0]!=null){let R=e("Options");L(a,"%s:\
 %s",R,g.reloptions),H(N,a.data)}return He(N,T.queryFout,!1,T.logfile),i=!0,i}async function Ke(r,o,t,s){if((o=="r"||o==
"m"||o=="i"||o=="p"||o=="I"||o=="t")&&t!=0){let i=null,a={};if(C(a),L(a,`SELECT spcname FROM pg_catalog.pg_tablespace
WHERE oid = '%u';`,t),i=await m(a.data),!i)return;W(i)>0&&(s?(L(a,e('Tablespace: "%s"'),A(i,0,0)),H(r,a.data)):(L(a,"%s",
r.footer),l(a,e(', tablespace "%s"'),A(i,0,0)),An(r,a.data)))}}async function en(r,o,t){let s={},i,a={},_=T.popt.topt,S=2,
N=0,p,b,f="l",D;if(_.default_footer=!1,C(s),L(s,`SELECT r.rolname, r.rolsuper, r.rolinherit,
  r.rolcreaterole, r.rolcreatedb, r.rolcanlogin,
  r.rolconnlimit, r.rolvaliduntil`),o&&(c(s,`
, pg_catalog.shobj_description(r.oid, 'pg_authid') AS description`),S++),c(s,`
, r.rolreplication`),T.sversion>=90500&&c(s,`
, r.rolbypassrls`),c(s,`
FROM pg_catalog.pg_roles r
`),!t&&!r&&c(s,`WHERE r.rolname !~ '^pg_'
`),!P(s,r,!1,!1,null,"r.rolname",null,null,null,1)||(c(s,"ORDER BY 1;"),i=await m(s.data),!i))return!1;for(N=W(i),D=[],ye(
a,_,e("List of roles"),S,N),Ee(a,E("Role name"),!0,f),Ee(a,E("Attributes"),!0,f),o&&Ee(a,E("Description"),!0,f),p=0;p<N;p++)
K(a,A(i,p,0),!1,!1),ze(s),F(A(i,p,1),"t")==0&&pe(s,e("Superuser")),F(A(i,p,2),"t")!=0&&pe(s,e("No inheritance")),F(A(i,p,
3),"t")==0&&pe(s,e("Create role")),F(A(i,p,4),"t")==0&&pe(s,e("Create DB")),F(A(i,p,5),"t")!=0&&pe(s,e("Cannot login")),
F(A(i,p,o?9:8),"t")==0&&pe(s,e("Replication")),T.sversion>=90500&&F(A(i,p,o?10:9),"t")==0&&pe(s,e("Bypass RLS")),b=on(A(
i,p,6)),b>=0&&(s.len>0&&V(s,`
`),b==0?c(s,e("No connections")):l(s,ngettext("%d connection","%d connections",b),b)),F(A(i,p,7),"")!=0&&(s.len>0&&V(s,`\

`),c(s,e("Password valid until ")),c(s,A(i,p,7))),D[p]=Ae(s.data),K(a,D[p],!1,!1),o&&K(a,A(i,p,8),!1,!1);return He(a,T.queryFout,
!1,T.logfile),!0}function pe(r,o){r.len>0&&c(r,", "),c(r,o)}async function wn(r,o){let t={},s,i=T.popt,a={};return C(t),
L(t,`SELECT rolname AS "%s", datname AS "%s",
pg_catalog.array_to_string(setconfig, E'\\n') AS "%s"
FROM pg_catalog.pg_db_role_setting s
LEFT JOIN pg_catalog.pg_database d ON d.oid = setdatabase
LEFT JOIN pg_catalog.pg_roles r ON r.oid = setrole
`,E("Role"),E("Database"),E("Settings")),!P(t,r,!1,!1,null,"r.rolname",null,null,a,1)||!P(t,o,a.value,!1,null,"d.datname",
null,null,null,1)||(c(t,"ORDER BY 1, 2;"),s=await m(t.data),!s)?!1:(W(s)==0&&!T.quiet?r&&o?y('Did not find any settings \
for role "%s" and database "%s".',r,o):r?y('Did not find any settings for role "%s".',r):y("Did not find any settings."):
(i.nullPrint=null,i.title=e("List of settings"),i.translate_header=!0,G(s,i,T.queryFout,!1,T.logfile)),!0)}async function Gn(r,o){
let t={},s,i=T.popt;return C(t),L(t,`SELECT m.rolname AS "%s", r.rolname AS "%s",
  pg_catalog.concat_ws(', ',
`,E("Role name"),E("Member of")),T.sversion>=16e4?c(t,`    CASE WHEN pam.admin_option THEN 'ADMIN' END,
    CASE WHEN pam.inherit_option THEN 'INHERIT' END,
    CASE WHEN pam.set_option THEN 'SET' END
`):c(t,`    CASE WHEN pam.admin_option THEN 'ADMIN' END,
    CASE WHEN m.rolinherit THEN 'INHERIT' END,
    'SET'
`),l(t,`  ) AS "%s",
  g.rolname AS "%s"
`,E("Options"),E("Grantor")),c(t,`FROM pg_catalog.pg_roles m
     JOIN pg_catalog.pg_auth_members pam ON (pam.member = m.oid)
     LEFT JOIN pg_catalog.pg_roles r ON (pam.roleid = r.oid)
     LEFT JOIN pg_catalog.pg_roles g ON (pam.grantor = g.oid)
`),!o&&!r&&c(t,`WHERE m.rolname !~ '^pg_'
`),!P(t,r,!1,!1,null,"m.rolname",null,null,null,1)||(c(t,`ORDER BY 1, 2, 4;
`),s=await m(t.data),!s)?!1:(i.nullPrint=null,i.title=e("List of role grants"),i.translate_header=!0,G(s,i,T.queryFout,!1,
T.logfile),!0)}async function nn(r,o,t,s){let i=z(r,"t")!=null,a=z(r,"i")!=null,_=z(r,"v")!=null,S=z(r,"m")!=null,N=z(r,
"s")!=null,p=z(r,"E")!=null,b,f={},D,O=T.popt,M,J=[!1,!1,!0,!1,!1,!1,!1,!1,!1];return b=i+a+_+S+N+p,b==0&&(i=_=S=N=p=!0),
C(f),L(f,`SELECT n.nspname as "%s",
  c.relname as "%s",
  CASE c.relkind WHEN 'r' THEN '%s' WHEN 'v' THEN '%s' WHEN 'm' THEN '%s' WHEN 'i' THEN '%s' WHEN 'S' THEN '%s' WHEN 't'\
 THEN '%s' WHEN 'f' THEN '%s' WHEN 'p' THEN '%s' WHEN 'I' THEN '%s' END as "%s",
  pg_catalog.pg_get_userbyid(c.relowner) as "%s"`,E("Schema"),E("Name"),E("table"),E("view"),E("materialized view"),E("i\
ndex"),E("sequence"),E("TOAST table"),E("foreign table"),E("partitioned table"),E("partitioned index"),E("Type"),E("Owne\
r")),M=4,a&&(l(f,`,
  c2.relname as "%s"`,E("Table")),M++),t&&(l(f,`,
  CASE c.relpersistence WHEN 'p' THEN '%s' WHEN 't' THEN '%s' WHEN 'u' THEN '%s' END as "%s"`,E("permanent"),E("temporar\
y"),E("unlogged"),E("Persistence")),J[M]=!0,T.sversion>=12e4&&!T.hide_tableam&&(i||S||a)&&l(f,`,
  am.amname as "%s"`,E("Access method")),l(f,`,
  pg_catalog.pg_size_pretty(pg_catalog.pg_table_size(c.oid)) as "%s",
  pg_catalog.obj_description(c.oid, 'pg_class') as "%s"`,E("Size"),E("Description"))),c(f,`
FROM pg_catalog.pg_class c
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace`),T.sversion>=12e4&&!T.hide_tableam&&(i||S||a)&&c(f,`\

     LEFT JOIN pg_catalog.pg_am am ON am.oid = c.relam`),a&&c(f,`
     LEFT JOIN pg_catalog.pg_index i ON i.indexrelid = c.oid
     LEFT JOIN pg_catalog.pg_class c2 ON i.indrelid = c2.oid`),c(f,`
WHERE c.relkind IN (`),i&&(c(f,"'r','p',"),(s||o)&&c(f,"'t',")),_&&c(f,"'v',"),S&&c(f,"'m',"),a&&c(f,"'i','I',"),N&&c(f,
"'S',"),(s||o)&&c(f,"'s',"),p&&c(f,"'f',"),c(f,"''"),c(f,`)
`),!s&&!o&&c(f,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname !~ '^pg_toast'
      AND n.nspname <> 'information_schema'
`),!P(f,o,!0,!1,"n.nspname","c.relname",null,"pg_catalog.pg_table_is_visible(c.oid)",null,3)||(c(f,"ORDER BY 1,2;"),D=await m(
f.data),!D)?!1:(W(D)==0&&!T.quiet?o?b!=1?y('Did not find any relations named "%s".',o):i?y('Did not find any tables name\
d "%s".',o):a?y('Did not find any indexes named "%s".',o):_?y('Did not find any views named "%s".',o):S?y('Did not find \
any materialized views named "%s".',o):N?y('Did not find any sequences named "%s".',o):p?y('Did not find any foreign tab\
les named "%s".',o):pg_log_error_internal('Did not find any ??? named "%s".',o):b!=1?y("Did not find any relations."):i?
y("Did not find any tables."):a?y("Did not find any indexes."):_?y("Did not find any views."):S?y("Did not find any mate\
rialized views."):N?y("Did not find any sequences."):p?y("Did not find any foreign tables."):pg_log_error_internal("Did \
not find any ??? relations."):(O.nullPrint=null,O.title=b!=1?e("List of relations"):i?e("List of tables"):a?e("List of i\
ndexes"):_?e("List of views"):S?e("List of materialized views"):N?e("List of sequences"):p?e("List of foreign tables"):"\
List of ???",O.translate_header=!0,O.translate_columns=J,O.n_translate_columns=Z(J),G(D,O,T.queryFout,!1,T.logfile)),!0)}
async function Wn(r,o,t){let s=z(r,"t")!=null,i=z(r,"i")!=null,a=z(r,"n")!=null,_={},S={},N,p=T.popt,b=[!1,!1,!1,!1,!1,!1,
!1,!1,!1,!1],f,D=!1;if(T.sversion<1e5){let O;return y("The server (version %s) does not support declarative table partit\
ioning.",Te(T.sversion,!1,O,_e(O))),!0}return!s&&!i&&(s=i=!0),i&&!s?f=e("List of partitioned indexes"):s&&!i?f=e("List o\
f partitioned tables"):(f=e("List of partitioned relations"),D=!0),C(_),L(_,`SELECT n.nspname as "%s",
  c.relname as "%s",
  pg_catalog.pg_get_userbyid(c.relowner) as "%s"`,E("Schema"),E("Name"),E("Owner")),D&&(l(_,`,
  CASE c.relkind WHEN 'p' THEN '%s' WHEN 'I' THEN '%s' END as "%s"`,E("partitioned table"),E("partitioned index"),E("Typ\
e")),b[3]=!0),(a||o)&&l(_,`,
  inh.inhparent::pg_catalog.regclass as "%s"`,E("Parent name")),i&&l(_,`,
 c2.oid::pg_catalog.regclass as "%s"`,E("Table")),t&&(l(_,`,
  am.amname as "%s"`,E("Access method")),a&&l(_,`,
  s.dps as "%s"`,E("Leaf partition size")),l(_,`,
  s.tps as "%s"`,E("Total size")),l(_,`,
  pg_catalog.obj_description(c.oid, 'pg_class') as "%s"`,E("Description"))),c(_,`
FROM pg_catalog.pg_class c
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace`),i&&c(_,`
     LEFT JOIN pg_catalog.pg_index i ON i.indexrelid = c.oid
     LEFT JOIN pg_catalog.pg_class c2 ON i.indrelid = c2.oid`),(a||o)&&c(_,`
     LEFT JOIN pg_catalog.pg_inherits inh ON c.oid = inh.inhrelid`),t&&(c(_,`
     LEFT JOIN pg_catalog.pg_am am ON c.relam = am.oid`),T.sversion<12e4?c(_,`,
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
               FROM d) s`):c(_,`,
     LATERAL (SELECT pg_catalog.pg_size_pretty(sum(
                 CASE WHEN ppt.isleaf AND ppt.level = 1
                      THEN pg_catalog.pg_table_size(ppt.relid) ELSE 0 END)) AS dps,
                     pg_catalog.pg_size_pretty(sum(pg_catalog.pg_table_size(ppt.relid))) AS tps
              FROM pg_catalog.pg_partition_tree(c.oid) ppt) s`)),c(_,`
WHERE c.relkind IN (`),s&&c(_,"'p',"),i&&c(_,"'I',"),c(_,"''"),c(_,`)
`),c(_,!a&&!o?` AND NOT c.relispartition
`:""),o||c(_,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname !~ '^pg_toast'
      AND n.nspname <> 'information_schema'
`),!P(_,o,!0,!1,"n.nspname","c.relname",null,"pg_catalog.pg_table_is_visible(c.oid)",null,3)||(l(_,'ORDER BY "Schema", %\
s%s"Name";',D?'"Type" DESC, ':"",a||o?'"Parent name" NULLS FIRST, ':""),N=await m(_.data),!N)?!1:(C(S),c(S,f),p.nullPrint=
null,p.title=S.data,p.translate_header=!0,p.translate_columns=b,p.n_translate_columns=Z(b),G(N,p,T.queryFout,!1,T.logfile),
!0)}async function Bn(r,o,t){let s={},i,a=T.popt;return C(s),L(s,`SELECT l.lanname AS "%s",
       pg_catalog.pg_get_userbyid(l.lanowner) as "%s",
       l.lanpltrusted AS "%s"`,E("Name"),E("Owner"),E("Trusted")),o&&(l(s,`,
       NOT l.lanispl AS "%s",
       l.lanplcallfoid::pg_catalog.regprocedure AS "%s",
       l.lanvalidator::pg_catalog.regprocedure AS "%s",
       l.laninline::pg_catalog.regprocedure AS "%s",
       `,E("Internal language"),E("Call handler"),E("Validator"),E("Inline handler")),ie(s,"l.lanacl")),l(s,`,
       d.description AS "%s"
FROM pg_catalog.pg_language l
LEFT JOIN pg_catalog.pg_description d
  ON d.classoid = l.tableoid AND d.objoid = l.oid
  AND d.objsubid = 0
`,E("Description")),r&&!P(s,r,!1,!1,null,"l.lanname",null,null,null,2)||(!t&&!r&&c(s,`WHERE l.lanplcallfoid != 0
`),c(s,"ORDER BY 1;"),i=await m(s.data),!i)?!1:(a.nullPrint=null,a.title=e("List of languages"),a.translate_header=!0,G(
i,a,T.queryFout,!1,T.logfile),!0)}async function vn(r,o,t){let s={},i,a=T.popt;return C(s),L(s,`SELECT n.nspname as "%s"\
,
       t.typname as "%s",
       pg_catalog.format_type(t.typbasetype, t.typtypmod) as "%s",
       (SELECT c.collname FROM pg_catalog.pg_collation c, pg_catalog.pg_type bt
        WHERE c.oid = t.typcollation AND bt.oid = t.typbasetype AND t.typcollation <> bt.typcollation) as "%s",
       CASE WHEN t.typnotnull THEN 'not null' END as "%s",
       t.typdefault as "%s",
       pg_catalog.array_to_string(ARRAY(
         SELECT pg_catalog.pg_get_constraintdef(r.oid, true) FROM pg_catalog.pg_constraint r WHERE t.oid = r.contypid AN\
D r.contype = 'c' ORDER BY r.conname
       ), ' ') as "%s"`,E("Schema"),E("Name"),E("Type"),E("Collation"),E("Nullable"),E("Default"),E("Check")),o&&(c(s,`,\

  `),ie(s,"t.typacl"),l(s,`,
       d.description as "%s"`,E("Description"))),c(s,`
FROM pg_catalog.pg_type t
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = t.typnamespace
`),o&&c(s,`     LEFT JOIN pg_catalog.pg_description d ON d.classoid = t.tableoid AND d.objoid = t.oid AND d.objsubid = 0\

`),c(s,`WHERE t.typtype = 'd'
`),!t&&!r&&c(s,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!P(s,r,!0,!1,"n.nspname","t.typname",null,"pg_catalog.pg_type_is_visible(t.oid)",null,3)||(c(s,"ORDER BY 1, 2;"),i=await m(
s.data),!i)?!1:(a.nullPrint=null,a.title=e("List of domains"),a.translate_header=!0,G(i,a,T.queryFout,!1,T.logfile),!0)}
async function qn(r,o,t){let s={},i,a=T.popt,_=[!1,!1,!1,!1,!0,!1];return C(s),L(s,`SELECT n.nspname AS "%s",
       c.conname AS "%s",
       pg_catalog.pg_encoding_to_char(c.conforencoding) AS "%s",
       pg_catalog.pg_encoding_to_char(c.contoencoding) AS "%s",
       CASE WHEN c.condefault THEN '%s'
       ELSE '%s' END AS "%s"`,E("Schema"),E("Name"),E("Source"),E("Destination"),E("yes"),E("no"),E("Default?")),o&&l(s,
`,
       d.description AS "%s"`,E("Description")),c(s,`
FROM pg_catalog.pg_conversion c
     JOIN pg_catalog.pg_namespace n ON n.oid = c.connamespace
`),o&&c(s,`LEFT JOIN pg_catalog.pg_description d ON d.classoid = c.tableoid
          AND d.objoid = c.oid AND d.objsubid = 0
`),c(s,`WHERE true
`),!t&&!r&&c(s,`  AND n.nspname <> 'pg_catalog'
  AND n.nspname <> 'information_schema'
`),!P(s,r,!0,!1,"n.nspname","c.conname",null,"pg_catalog.pg_conversion_is_visible(c.oid)",null,3)||(c(s,"ORDER BY 1, 2;"),
i=await m(s.data),!i)?!1:(a.nullPrint=null,a.title=e("List of conversions"),a.translate_header=!0,a.translate_columns=_,
a.n_translate_columns=Z(_),G(i,a,T.queryFout,!1,T.logfile),!0)}async function Yn(r,o,t){let s={},i,a=T.popt;return C(s),
L(s,'SELECT s.name AS "%s", pg_catalog.current_setting(s.name) AS "%s"',E("Parameter"),E("Value")),o&&(l(s,', s.vartype \
AS "%s", s.context AS "%s", ',E("Type"),E("Context")),T.sversion>=15e4?ie(s,"p.paracl"):l(s,'NULL AS "%s"',E("Access pri\
vileges"))),c(s,`
FROM pg_catalog.pg_settings s
`),o&&T.sversion>=15e4&&c(s,`  LEFT JOIN pg_catalog.pg_parameter_acl p
  ON pg_catalog.lower(s.name) = p.parname
`),r?Ie(T.db,s,r,!1,!1,null,"pg_catalog.lower(s.name)",null,null,null,null):c(s,`WHERE s.source <> 'default' AND
      s.setting IS DISTINCT FROM s.boot_val
`),c(s,"ORDER BY 1;"),i=await m(s.data),i?(a.nullPrint=null,r?a.title=e("List of configuration parameters"):a.title=e("L\
ist of non-default configuration parameters"),a.translate_header=!0,G(i,a,T.queryFout,!1,T.logfile),!0):!1}async function xn(r,o){
let t={},s,i=T.popt,a=[!1,!1,!1,!0,!1,!1,!1];if(T.sversion<90300){let _;return y("The server (version %s) does not suppo\
rt event triggers.",Te(T.sversion,!1,_,_e(_))),!0}return C(t),L(t,`SELECT evtname as "%s", evtevent as "%s", pg_catalog.\
pg_get_userbyid(e.evtowner) as "%s",
 case evtenabled when 'O' then '%s'  when 'R' then '%s'  when 'A' then '%s'  when 'D' then '%s' end as "%s",
 e.evtfoid::pg_catalog.regproc as "%s", pg_catalog.array_to_string(array(select x from pg_catalog.unnest(evttags) as t(x\
)), ', ') as "%s"`,E("Name"),E("Event"),E("Owner"),E("enabled"),E("replica"),E("always"),E("disabled"),E("Enabled"),E("F\
unction"),E("Tags")),o&&l(t,`,
pg_catalog.obj_description(e.oid, 'pg_event_trigger') as "%s"`,E("Description")),c(t,`
FROM pg_catalog.pg_event_trigger e `),!P(t,r,!1,!1,null,"evtname",null,null,null,1)||(c(t,"ORDER BY 1"),s=await m(t.data),
!s)?!1:(i.nullPrint=null,i.title=e("List of event triggers"),i.translate_header=!0,i.translate_columns=a,i.n_translate_columns=
Z(a),G(s,i,T.queryFout,!1,T.logfile),!0)}async function Vn(r){let o={},t,s=T.popt;if(T.sversion<1e5){let i;return y("The\
 server (version %s) does not support extended statistics.",Te(T.sversion,!1,i,_e(i))),!0}return C(o),L(o,`SELECT 
es.stxnamespace::pg_catalog.regnamespace::pg_catalog.text AS "%s", 
es.stxname AS "%s", 
`,E("Schema"),E("Name")),T.sversion>=14e4?l(o,`pg_catalog.format('%%s FROM %%s', 
  pg_catalog.pg_get_statisticsobjdef_columns(es.oid), 
  es.stxrelid::pg_catalog.regclass) AS "%s"`,E("Definition")):l(o,`pg_catalog.format('%%s FROM %%s', 
  (SELECT pg_catalog.string_agg(pg_catalog.quote_ident(a.attname),', ') 
   FROM pg_catalog.unnest(es.stxkeys) s(attnum) 
   JOIN pg_catalog.pg_attribute a 
   ON (es.stxrelid = a.attrelid 
   AND a.attnum = s.attnum 
   AND NOT a.attisdropped)), 
es.stxrelid::pg_catalog.regclass) AS "%s"`,E("Definition")),l(o,`,
CASE WHEN 'd' = any(es.stxkind) THEN 'defined' 
END AS "%s", 
CASE WHEN 'f' = any(es.stxkind) THEN 'defined' 
END AS "%s"`,E("Ndistinct"),E("Dependencies")),T.sversion>=12e4&&l(o,`,
CASE WHEN 'm' = any(es.stxkind) THEN 'defined' 
END AS "%s" `,E("MCV")),c(o,` 
FROM pg_catalog.pg_statistic_ext es 
`),!P(o,r,!1,!1,"es.stxnamespace::pg_catalog.regnamespace::pg_catalog.text","es.stxname",null,"pg_catalog.pg_statistics_\
obj_is_visible(es.oid)",null,3)||(c(o,"ORDER BY 1, 2;"),t=await m(o.data),!t)?!1:(s.nullPrint=null,s.title=e("List of ex\
tended statistics"),s.translate_header=!0,G(t,s,T.queryFout,!1,T.logfile),!0)}async function Xn(r,o){let t={},s,i=T.popt,
a=[!1,!1,!1,!0,!0,!1];return C(t),L(t,`SELECT pg_catalog.format_type(castsource, NULL) AS "%s",
       pg_catalog.format_type(casttarget, NULL) AS "%s",
`,E("Source type"),E("Target type")),l(t,`       CASE WHEN c.castmethod = '%c' THEN '(binary coercible)'
            WHEN c.castmethod = '%c' THEN '(with inout)'
            ELSE p.proname
       END AS "%s",
`,"b","i",E("Function")),l(t,`       CASE WHEN c.castcontext = '%c' THEN '%s'
            WHEN c.castcontext = '%c' THEN '%s'
            ELSE '%s'
       END AS "%s"`,"e",E("no"),"a",E("in assignment"),E("yes"),E("Implicit?")),o&&l(t,`,
       CASE WHEN p.proleakproof THEN '%s'
            ELSE '%s'
       END AS "%s",
       d.description AS "%s"`,E("yes"),E("no"),E("Leakproof?"),E("Description")),c(t,`
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
`),o&&c(t,`     LEFT JOIN pg_catalog.pg_description d
     ON d.classoid = c.tableoid AND d.objoid = c.oid AND d.objsubid = 0
`),c(t,"WHERE ( (true"),!P(t,r,!0,!1,"ns.nspname","ts.typname","pg_catalog.format_type(ts.oid, NULL)","pg_catalog.pg_typ\
e_is_visible(ts.oid)",null,3)||(c(t,") OR (true"),!P(t,r,!0,!1,"nt.nspname","tt.typname","pg_catalog.format_type(tt.oid,\
 NULL)","pg_catalog.pg_type_is_visible(tt.oid)",null,3))||(c(t,`) )
ORDER BY 1, 2;`),s=await m(t.data),!s)?!1:(i.nullPrint=null,i.title=e("List of casts"),i.translate_header=!0,i.translate_columns=
a,i.n_translate_columns=Z(a),G(s,i,T.queryFout,!1,T.logfile),!0)}async function kn(r,o,t){let s={},i,a=T.popt,_=[!1,!1,!1,
!1,!1,!1,!1,!0,!1];return C(s),L(s,`SELECT
  n.nspname AS "%s",
  c.collname AS "%s",
`,E("Schema"),E("Name")),T.sversion>=1e5?l(s,`  CASE c.collprovider WHEN 'd' THEN 'default' WHEN 'b' THEN 'builtin' WHEN\
 'c' THEN 'libc' WHEN 'i' THEN 'icu' END AS "%s",
`,E("Provider")):l(s,`  'libc' AS "%s",
`,E("Provider")),l(s,`  c.collcollate AS "%s",
  c.collctype AS "%s",
`,E("Collate"),E("Ctype")),T.sversion>=17e4?l(s,`  c.colllocale AS "%s",
`,E("Locale")):T.sversion>=15e4?l(s,`  c.colliculocale AS "%s",
`,E("Locale")):l(s,`  c.collcollate AS "%s",
`,E("Locale")),T.sversion>=16e4?l(s,`  c.collicurules AS "%s",
`,E("ICU Rules")):l(s,`  NULL AS "%s",
`,E("ICU Rules")),T.sversion>=12e4?l(s,`  CASE WHEN c.collisdeterministic THEN '%s' ELSE '%s' END AS "%s"`,E("yes"),E("n\
o"),E("Deterministic?")):l(s,`  '%s' AS "%s"`,E("yes"),E("Deterministic?")),o&&l(s,`,
  pg_catalog.obj_description(c.oid, 'pg_collation') AS "%s"`,E("Description")),c(s,`
FROM pg_catalog.pg_collation c, pg_catalog.pg_namespace n
WHERE n.oid = c.collnamespace
`),!t&&!r&&c(s,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),c(s,`      AND c.collencoding IN (-1, pg_catalog.pg_char_to_encoding(pg_catalog.getdatabaseencoding()))
`),!P(s,r,!0,!1,"n.nspname","c.collname",null,"pg_catalog.pg_collation_is_visible(c.oid)",null,3)||(c(s,"ORDER BY 1, 2;"),
i=await m(s.data),!i)?!1:(a.nullPrint=null,a.title=e("List of collations"),a.translate_header=!0,a.translate_columns=_,a.
n_translate_columns=Z(_),G(i,a,T.queryFout,!1,T.logfile),!0)}async function Kn(r,o,t){let s={},i,a=T.popt,_=0,S=null;if(C(
s),L(s,`SELECT n.nspname AS "%s",
  pg_catalog.pg_get_userbyid(n.nspowner) AS "%s"`,E("Name"),E("Owner")),o&&(c(s,`,
  `),ie(s,"n.nspacl"),l(s,`,
  pg_catalog.obj_description(n.oid, 'pg_namespace') AS "%s"`,E("Description"))),c(s,`
FROM pg_catalog.pg_namespace n
`),!t&&!r&&c(s,`WHERE n.nspname !~ '^pg_' AND n.nspname <> 'information_schema'
`),!P(s,r,!t&&!r,!1,null,"n.nspname",null,null,null,2)||(c(s,"ORDER BY 1;"),i=await m(s.data),!i))return!1;if(a.nullPrint=
null,a.title=e("List of schemas"),a.translate_header=!0,r&&T.sversion>=15e4){let N,p;if(L(s,`SELECT pubname 
FROM pg_catalog.pg_publication p
     JOIN pg_catalog.pg_publication_namespace pn ON p.oid = pn.pnpubid
     JOIN pg_catalog.pg_namespace n ON n.oid = pn.pnnspid 
WHERE n.nspname = '%s'
ORDER BY 1`,r),N=await m(s.data),N)_=W(N);else return!1;if(_>0){for(S=[],S[0]=Ae(e("Publications:")),p=0;p<_;p++)L(s,'  \
  "%s"',A(N,p,0)),S[p+1]=Ae(s.data);S[p+1]=null,a.footers=S}}return G(i,a,T.queryFout,!1,T.logfile),!0}async function jn(r,o){
let t={},s,i=T.popt;return o?await Jn(r):(C(t),L(t,`SELECT
  n.nspname as "%s",
  p.prsname as "%s",
  pg_catalog.obj_description(p.oid, 'pg_ts_parser') as "%s"
FROM pg_catalog.pg_ts_parser p
LEFT JOIN pg_catalog.pg_namespace n ON n.oid = p.prsnamespace
`,E("Schema"),E("Name"),E("Description")),!P(t,r,!1,!1,"n.nspname","p.prsname",null,"pg_catalog.pg_ts_parser_is_visible(\
p.oid)",null,3)||(c(t,"ORDER BY 1, 2;"),s=await m(t.data),!s)?!1:(i.nullPrint=null,i.title=e("List of text search parser\
s"),i.translate_header=!0,G(s,i,T.queryFout,!1,T.logfile),!0))}async function Jn(r){let o={},t,s;if(C(o),L(o,`SELECT p.o\
id,
  n.nspname,
  p.prsname
FROM pg_catalog.pg_ts_parser p
LEFT JOIN pg_catalog.pg_namespace n ON n.oid = p.prsnamespace
`),!P(o,r,!1,!1,"n.nspname","p.prsname",null,"pg_catalog.pg_ts_parser_is_visible(p.oid)",null,3)||(c(o,"ORDER BY 1, 2;"),
t=await m(o.data),!t))return!1;if(W(t)==0)return T.quiet||(r?y('Did not find any text search parser named "%s".',r):y("D\
id not find any text search parsers.")),!1;for(s=0;s<W(t);s++){let i,a=null,_;if(i=A(t,s,0),ae(t,s,1)||(a=A(t,s,1)),_=A(
t,s,2),!await Qn(i,a,_)||X)return!1}return!0}async function Qn(r,o,t){let s={},i,a={},_=T.popt,S=[!0,!1,!1];return C(s),
L(s,`SELECT '%s' AS "%s",
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
 WHERE p.oid = '%s';`,E("Start parse"),E("Method"),E("Function"),E("Description"),r,E("Get next token"),r,E("End parse"),
r,E("Get headline"),r,E("Get token types"),r),i=await m(s.data),!i||(_.nullPrint=null,C(a),o?L(a,e('Text search parser "\
%s.%s"'),o,t):L(a,e('Text search parser "%s"'),t),_.title=a.data,_.footers=null,_.topt.default_footer=!1,_.translate_header=
!0,_.translate_columns=S,_.n_translate_columns=Z(S),G(i,_,T.queryFout,!1,T.logfile),C(s),L(s,`SELECT t.alias as "%s",
  t.description as "%s"
FROM pg_catalog.ts_token_type( '%s'::pg_catalog.oid ) as t
ORDER BY 1;`,E("Token name"),E("Description"),r),i=await m(s.data),!i)?!1:(_.nullPrint=null,o?L(a,e('Token types for par\
ser "%s.%s"'),o,t):L(a,e('Token types for parser "%s"'),t),_.title=a.data,_.footers=null,_.topt.default_footer=!0,_.translate_header=
!0,_.translate_columns=null,_.n_translate_columns=0,G(i,_,T.queryFout,!1,T.logfile),!0)}async function zn(r,o){let t={},
s,i=T.popt;return C(t),L(t,`SELECT
  n.nspname as "%s",
  d.dictname as "%s",
`,E("Schema"),E("Name")),o&&l(t,`  ( SELECT COALESCE(nt.nspname, '(null)')::pg_catalog.text || '.' || t.tmplname FROM
    pg_catalog.pg_ts_template t
    LEFT JOIN pg_catalog.pg_namespace nt ON nt.oid = t.tmplnamespace
    WHERE d.dicttemplate = t.oid ) AS  "%s",
  d.dictinitoption as "%s",
`,E("Template"),E("Init options")),l(t,`  pg_catalog.obj_description(d.oid, 'pg_ts_dict') as "%s"
`,E("Description")),c(t,`FROM pg_catalog.pg_ts_dict d
LEFT JOIN pg_catalog.pg_namespace n ON n.oid = d.dictnamespace
`),!P(t,r,!1,!1,"n.nspname","d.dictname",null,"pg_catalog.pg_ts_dict_is_visible(d.oid)",null,3)||(c(t,"ORDER BY 1, 2;"),
s=await m(t.data),!s)?!1:(i.nullPrint=null,i.title=e("List of text search dictionaries"),i.translate_header=!0,G(s,i,T.queryFout,
!1,T.logfile),!0)}async function Zn(r,o){let t={},s,i=T.popt;return C(t),o?L(t,`SELECT
  n.nspname AS "%s",
  t.tmplname AS "%s",
  t.tmplinit::pg_catalog.regproc AS "%s",
  t.tmpllexize::pg_catalog.regproc AS "%s",
  pg_catalog.obj_description(t.oid, 'pg_ts_template') AS "%s"
`,E("Schema"),E("Name"),E("Init"),E("Lexize"),E("Description")):L(t,`SELECT
  n.nspname AS "%s",
  t.tmplname AS "%s",
  pg_catalog.obj_description(t.oid, 'pg_ts_template') AS "%s"
`,E("Schema"),E("Name"),E("Description")),c(t,`FROM pg_catalog.pg_ts_template t
LEFT JOIN pg_catalog.pg_namespace n ON n.oid = t.tmplnamespace
`),!P(t,r,!1,!1,"n.nspname","t.tmplname",null,"pg_catalog.pg_ts_template_is_visible(t.oid)",null,3)||(c(t,"ORDER BY 1, 2\
;"),s=await m(t.data),!s)?!1:(i.nullPrint=null,i.title=e("List of text search templates"),i.translate_header=!0,G(s,i,T.
queryFout,!1,T.logfile),!0)}async function $n(r,o){let t={},s,i=T.popt;return o?await ea(r):(C(t),L(t,`SELECT
   n.nspname as "%s",
   c.cfgname as "%s",
   pg_catalog.obj_description(c.oid, 'pg_ts_config') as "%s"
FROM pg_catalog.pg_ts_config c
LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.cfgnamespace
`,E("Schema"),E("Name"),E("Description")),!P(t,r,!1,!1,"n.nspname","c.cfgname",null,"pg_catalog.pg_ts_config_is_visible(\
c.oid)",null,3)||(c(t,"ORDER BY 1, 2;"),s=await m(t.data),!s)?!1:(i.nullPrint=null,i.title=e("List of text search config\
urations"),i.translate_header=!0,G(s,i,T.queryFout,!1,T.logfile),!0))}async function ea(r){let o={},t,s;if(C(o),L(o,`SEL\
ECT c.oid, c.cfgname,
   n.nspname,
   p.prsname,
   np.nspname as pnspname
FROM pg_catalog.pg_ts_config c
   LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.cfgnamespace,
 pg_catalog.pg_ts_parser p
   LEFT JOIN pg_catalog.pg_namespace np ON np.oid = p.prsnamespace
WHERE  p.oid = c.cfgparser
`),!P(o,r,!0,!1,"n.nspname","c.cfgname",null,"pg_catalog.pg_ts_config_is_visible(c.oid)",null,3)||(c(o,"ORDER BY 3, 2;"),
t=await m(o.data),!t))return!1;if(W(t)==0)return T.quiet||(r?y('Did not find any text search configuration named "%s".',
r):y("Did not find any text search configurations.")),!1;for(s=0;s<W(t);s++){let i,a,_=null,S,N=null;if(i=A(t,s,0),a=A(t,
s,1),ae(t,s,2)||(_=A(t,s,2)),S=A(t,s,3),ae(t,s,4)||(N=A(t,s,4)),!await na(i,_,a,N,S)||X)return!1}return!0}async function na(r,o,t,s,i){
let a={},_={},S,N=T.popt;return C(a),L(a,`SELECT
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
ORDER BY 1;`,E("Token"),E("Dictionaries"),r),S=await m(a.data),S?(C(_),o?l(_,e('Text search configuration "%s.%s"'),o,t):
l(_,e('Text search configuration "%s"'),t),s?l(_,e(`
Parser: "%s.%s"`),s,i):l(_,e(`
Parser: "%s"`),i),N.nullPrint=null,N.title=_.data,N.footers=null,N.topt.default_footer=!1,N.translate_header=!0,G(S,N,T.
queryFout,!1,T.logfile),!0):!1}async function aa(r,o){let t={},s,i=T.popt;return C(t),L(t,`SELECT fdw.fdwname AS "%s",
  pg_catalog.pg_get_userbyid(fdw.fdwowner) AS "%s",
  fdw.fdwhandler::pg_catalog.regproc AS "%s",
  fdw.fdwvalidator::pg_catalog.regproc AS "%s"`,E("Name"),E("Owner"),E("Handler"),E("Validator")),o&&(c(t,`,
  `),ie(t,"fdwacl"),l(t,`,
 CASE WHEN fdwoptions IS NULL THEN '' ELSE   '(' || pg_catalog.array_to_string(ARRAY(SELECT   pg_catalog.quote_ident(opt\
ion_name) ||  ' ' ||   pg_catalog.quote_literal(option_value)  FROM   pg_catalog.pg_options_to_table(fdwoptions)),  ', '\
) || ')'   END AS "%s",
  d.description AS "%s" `,E("FDW options"),E("Description"))),c(t,`
FROM pg_catalog.pg_foreign_data_wrapper fdw
`),o&&c(t,`LEFT JOIN pg_catalog.pg_description d
       ON d.classoid = fdw.tableoid AND d.objoid = fdw.oid AND d.objsubid = 0
`),!P(t,r,!1,!1,null,"fdwname",null,null,null,1)||(c(t,"ORDER BY 1;"),s=await m(t.data),!s)?!1:(i.nullPrint=null,i.title=
e("List of foreign-data wrappers"),i.translate_header=!0,G(s,i,T.queryFout,!1,T.logfile),!0)}async function sa(r,o){let t={},
s,i=T.popt;return C(t),L(t,`SELECT s.srvname AS "%s",
  pg_catalog.pg_get_userbyid(s.srvowner) AS "%s",
  f.fdwname AS "%s"`,E("Name"),E("Owner"),E("Foreign-data wrapper")),o&&(c(t,`,
  `),ie(t,"s.srvacl"),l(t,`,
  s.srvtype AS "%s",
  s.srvversion AS "%s",
  CASE WHEN srvoptions IS NULL THEN '' ELSE   '(' || pg_catalog.array_to_string(ARRAY(SELECT   pg_catalog.quote_ident(op\
tion_name) ||  ' ' ||   pg_catalog.quote_literal(option_value)  FROM   pg_catalog.pg_options_to_table(srvoptions)),  ', \
') || ')'   END AS "%s",
  d.description AS "%s"`,E("Type"),E("Version"),E("FDW options"),E("Description"))),c(t,`
FROM pg_catalog.pg_foreign_server s
     JOIN pg_catalog.pg_foreign_data_wrapper f ON f.oid=s.srvfdw
`),o&&c(t,`LEFT JOIN pg_catalog.pg_description d
       ON d.classoid = s.tableoid AND d.objoid = s.oid AND d.objsubid = 0
`),!P(t,r,!1,!1,null,"s.srvname",null,null,null,1)||(c(t,"ORDER BY 1;"),s=await m(t.data),!s)?!1:(i.nullPrint=null,i.title=
e("List of foreign servers"),i.translate_header=!0,G(s,i,T.queryFout,!1,T.logfile),!0)}async function ta(r,o){let t={},s,
i=T.popt;return C(t),L(t,`SELECT um.srvname AS "%s",
  um.usename AS "%s"`,E("Server"),E("User name")),o&&l(t,`,
 CASE WHEN umoptions IS NULL THEN '' ELSE   '(' || pg_catalog.array_to_string(ARRAY(SELECT   pg_catalog.quote_ident(opti\
on_name) ||  ' ' ||   pg_catalog.quote_literal(option_value)  FROM   pg_catalog.pg_options_to_table(umoptions)),  ', ') \
|| ')'   END AS "%s"`,E("FDW options")),c(t,`
FROM pg_catalog.pg_user_mappings um
`),!P(t,r,!1,!1,null,"um.srvname","um.usename",null,null,1)||(c(t,"ORDER BY 1, 2;"),s=await m(t.data),!s)?!1:(i.nullPrint=
null,i.title=e("List of user mappings"),i.translate_header=!0,G(s,i,T.queryFout,!1,T.logfile),!0)}async function Ea(r,o){
let t={},s,i=T.popt;return C(t),L(t,`SELECT n.nspname AS "%s",
  c.relname AS "%s",
  s.srvname AS "%s"`,E("Schema"),E("Table"),E("Server")),o&&l(t,`,
 CASE WHEN ftoptions IS NULL THEN '' ELSE   '(' || pg_catalog.array_to_string(ARRAY(SELECT   pg_catalog.quote_ident(opti\
on_name) ||  ' ' ||   pg_catalog.quote_literal(option_value)  FROM   pg_catalog.pg_options_to_table(ftoptions)),  ', ') \
|| ')'   END AS "%s",
  d.description AS "%s"`,E("FDW options"),E("Description")),c(t,`
FROM pg_catalog.pg_foreign_table ft
  INNER JOIN pg_catalog.pg_class c ON c.oid = ft.ftrelid
  INNER JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
  INNER JOIN pg_catalog.pg_foreign_server s ON s.oid = ft.ftserver
`),o&&c(t,`   LEFT JOIN pg_catalog.pg_description d
          ON d.classoid = c.tableoid AND d.objoid = c.oid AND d.objsubid = 0
`),!P(t,r,!1,!1,"n.nspname","c.relname",null,"pg_catalog.pg_table_is_visible(c.oid)",null,3)||(c(t,"ORDER BY 1, 2;"),s=await m(
t.data),!s)?!1:(i.nullPrint=null,i.title=e("List of foreign tables"),i.translate_header=!0,G(s,i,T.queryFout,!1,T.logfile),
!0)}async function ia(r){let o={},t,s=T.popt;return C(o),L(o,`SELECT e.extname AS "%s", e.extversion AS "%s", ae.default\
_version AS "%s",n.nspname AS "%s", d.description AS "%s"
FROM pg_catalog.pg_extension e LEFT JOIN pg_catalog.pg_namespace n ON n.oid = e.extnamespace LEFT JOIN pg_catalog.pg_des\
cription d ON d.objoid = e.oid AND d.classoid = 'pg_catalog.pg_extension'::pg_catalog.regclass LEFT JOIN pg_catalog.pg_a\
vailable_extensions() ae(name, default_version, comment) ON ae.name = e.extname
`,E("Name"),E("Version"),E("Default version"),E("Schema"),E("Description")),!P(o,r,!1,!1,null,"e.extname",null,null,null,
1)||(c(o,"ORDER BY 1;"),t=await m(o.data),!t)?!1:(s.nullPrint=null,s.title=e("List of installed extensions"),s.translate_header=
!0,G(t,s,T.queryFout,!1,T.logfile),!0)}async function oa(r){let o={},t,s;if(C(o),L(o,`SELECT e.extname, e.oid
FROM pg_catalog.pg_extension e
`),!P(o,r,!1,!1,null,"e.extname",null,null,null,1)||(c(o,"ORDER BY 1;"),t=await m(o.data),!t))return!1;if(W(t)==0)return T.
quiet||(r?y('Did not find any extension named "%s".',r):y("Did not find any extensions.")),!1;for(s=0;s<W(t);s++){let i,
a;if(i=A(t,s,0),a=A(t,s,1),!await la(i,a)||X)return!1}return!0}async function la(r,o){let t={},s,i={},a=T.popt;return C(
t),L(t,`SELECT pg_catalog.pg_describe_object(classid, objid, 0) AS "%s"
FROM pg_catalog.pg_depend
WHERE refclassid = 'pg_catalog.pg_extension'::pg_catalog.regclass AND refobjid = '%s' AND deptype = 'e'
ORDER BY 1;`,E("Object description"),o),s=await m(t.data),s?(a.nullPrint=null,C(i),L(i,e('Objects in extension "%s"'),r),
a.title=i.data,a.translate_header=!0,G(s,a,T.queryFout,!1,T.logfile),!0):!1}async function ra(r){let o={},t,s=T.popt,i=[
!1,!1,!1,!1,!1,!1,!1,!1,!1];if(T.sversion<1e5){let a;return y("The server (version %s) does not support publications.",Te(
T.sversion,!1,a,_e(a))),!0}return C(o),L(o,`SELECT pubname AS "%s",
  pg_catalog.pg_get_userbyid(pubowner) AS "%s",
  puballtables AS "%s",
  pubinsert AS "%s",
  pubupdate AS "%s",
  pubdelete AS "%s"`,E("Name"),E("Owner"),E("All tables"),E("Inserts"),E("Updates"),E("Deletes")),T.sversion>=11e4&&l(o,
`,
  pubtruncate AS "%s"`,E("Truncates")),T.sversion>=18e4&&l(o,`,
 (CASE pubgencols
    WHEN '%c' THEN 'none'
    WHEN '%c' THEN 'stored'
   END) AS "%s"`,"n","s",E("Generated columns")),T.sversion>=13e4&&l(o,`,
  pubviaroot AS "%s"`,E("Via root")),c(o,`
FROM pg_catalog.pg_publication
`),!P(o,r,!1,!1,null,"pubname",null,null,null,1)||(c(o,"ORDER BY 1;"),t=await m(o.data),!t)?!1:(s.title=e("List of publi\
cations"),s.translate_header=!0,s.translate_columns=i,s.n_translate_columns=Z(i),G(t,s,T.queryFout,!1,T.logfile),!0)}async function an(r,o,t,s){
let i,a=0,_=0;if(i=await m(r.data),i)a=W(i);else return!1;for(a>0&&H(s,o),_=0;_<a;_++)t?L(r,'    "%s"',A(i,_,0)):(L(r,' \
   "%s.%s"',A(i,_,0),A(i,_,1)),ae(i,_,3)||l(r," (%s)",A(i,_,3)),ae(i,_,2)||l(r," WHERE %s",A(i,_,2))),H(s,r.data);return!0}
async function ca(r){let o={},t,s,i,a,_,S={},N={};if(T.sversion<1e5){let p;return y("The server (version %s) does not su\
pport publications.",Te(T.sversion,!1,p,_e(p))),!0}if(i=T.sversion>=11e4,a=T.sversion>=18e4,_=T.sversion>=13e4,C(o),L(o,
`SELECT oid, pubname,
  pg_catalog.pg_get_userbyid(pubowner) AS owner,
  puballtables, pubinsert, pubupdate, pubdelete`),i?c(o,", pubtruncate"):c(o,", false AS pubtruncate"),a?l(o,`, (CASE pu\
bgencols
    WHEN '%c' THEN 'none'
    WHEN '%c' THEN 'stored'
   END) AS "%s"
`,"n","s",E("Generated columns")):c(o,", 'none' AS pubgencols"),_?c(o,", pubviaroot"):c(o,", false AS pubviaroot"),c(o,`\

FROM pg_catalog.pg_publication
`),!P(o,r,!1,!1,null,"pubname",null,null,null,1)||(c(o,"ORDER BY 2;"),s=await m(o.data),!s))return!1;if(W(s)==0)return T.
quiet||(r?y('Did not find any publication named "%s".',r):y("Did not find any publications.")),!1;for(t=0;t<W(s);t++){let p="\
l",b=5,f=1,D=A(s,t,0),O=A(s,t,1),M=F(A(s,t,3),"t")==0,J=T.popt.topt;if(i&&b++,a&&b++,_&&b++,C(S),L(S,e("Publication %s"),
O),ye(N,J,S.data,b,f),Ee(N,E("Owner"),!0,p),Ee(N,E("All tables"),!0,p),Ee(N,E("Inserts"),!0,p),Ee(N,E("Updates"),!0,p),Ee(
N,E("Deletes"),!0,p),i&&Ee(N,E("Truncates"),!0,p),a&&Ee(N,E("Generated columns"),!0,p),_&&Ee(N,E("Via root"),!0,p),K(N,A(
s,t,2),!1,!1),K(N,A(s,t,3),!1,!1),K(N,A(s,t,4),!1,!1),K(N,A(s,t,5),!1,!1),K(N,A(s,t,6),!1,!1),i&&K(N,A(s,t,7),!1,!1),a&&
K(N,A(s,t,8),!1,!1),_&&K(N,A(s,t,9),!1,!1),!M&&(L(o,"SELECT n.nspname, c.relname"),T.sversion>=15e4?(c(o,", pg_get_expr(\
pr.prqual, c.oid)"),c(o,`, (CASE WHEN pr.prattrs IS NOT NULL THEN
     pg_catalog.array_to_string(      ARRAY(SELECT attname
              FROM
                pg_catalog.generate_series(0, pg_catalog.array_upper(pr.prattrs::pg_catalog.int2[], 1)) s,
                pg_catalog.pg_attribute
        WHERE attrelid = c.oid AND attnum = prattrs[s]), ', ')
       ELSE NULL END)`)):c(o,", NULL, NULL"),l(o,`
FROM pg_catalog.pg_class c,
     pg_catalog.pg_namespace n,
     pg_catalog.pg_publication_rel pr
WHERE c.relnamespace = n.oid
  AND c.oid = pr.prrelid
  AND pr.prpubid = '%s'
ORDER BY 1,2`,D),!await an(o,e("Tables:"),!1,N)||T.sversion>=15e4&&(L(o,`SELECT n.nspname
FROM pg_catalog.pg_namespace n
     JOIN pg_catalog.pg_publication_namespace pn ON n.oid = pn.pnnspid
WHERE pn.pnpubid = '%s'
ORDER BY 1`,D),!await an(o,e("Tables from schemas:"),!0,N))))return!1;He(N,T.queryFout,!1,T.logfile)}return!0}async function _a(r,o){
let t={},s,i=T.popt,a=[!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1];if(T.sversion<1e5){let _;return y("The server (vers\
ion %s) does not support subscriptions.",Te(T.sversion,!1,_,_e(_))),!0}return C(t),L(t,`SELECT subname AS "%s"
,  pg_catalog.pg_get_userbyid(subowner) AS "%s"
,  subenabled AS "%s"
,  subpublications AS "%s"
`,E("Name"),E("Owner"),E("Enabled"),E("Publication")),o&&(T.sversion>=14e4&&(l(t,`, subbinary AS "%s"
`,E("Binary")),T.sversion>=16e4?l(t,`, (CASE substream
    WHEN 'f' THEN 'off'
    WHEN 't' THEN 'on'
    WHEN 'p' THEN 'parallel'
   END) AS "%s"
`,E("Streaming")):l(t,`, substream AS "%s"
`,E("Streaming"))),T.sversion>=15e4&&l(t,`, subtwophasestate AS "%s"
, subdisableonerr AS "%s"
`,E("Two-phase commit"),E("Disable on error")),T.sversion>=16e4&&l(t,`, suborigin AS "%s"
, subpasswordrequired AS "%s"
, subrunasowner AS "%s"
`,E("Origin"),E("Password required"),E("Run as owner?")),T.sversion>=17e4&&l(t,`, subfailover AS "%s"
`,E("Failover")),l(t,`,  subsynccommit AS "%s"
,  subconninfo AS "%s"
`,E("Synchronous commit"),E("Conninfo")),T.sversion>=15e4&&l(t,`, subskiplsn AS "%s"
`,E("Skip LSN"))),c(t,`FROM pg_catalog.pg_subscription
WHERE subdbid = (SELECT oid
                 FROM pg_catalog.pg_database
                 WHERE datname = pg_catalog.current_database())`),!P(t,r,!0,!1,null,"subname",null,null,null,1)||(c(t,"O\
RDER BY 1;"),s=await m(t.data),!s)?!1:(i.nullPrint=null,i.title=e("List of subscriptions"),i.translate_header=!0,i.translate_columns=
a,i.n_translate_columns=Z(a),G(s,i,T.queryFout,!1,T.logfile),!0)}function ie(r,o){l(r,`CASE WHEN pg_catalog.array_length\
(%s, 1) = 0 THEN '%s' ELSE pg_catalog.array_to_string(%s, E'\\n') END AS "%s"`,o,E("(none)"),o,E("Access privileges"))}async function Ta(r,o,t){
let s={},i,a=T.popt,_=!1,S=[!1,!1,!1,!1,!1,!1,!1];if(C(s),L(s,`SELECT
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
  END) AS "%s"`,E("AM"),E("Input type"),E("Storage type"),E("Operator class"),E("yes"),E("no"),E("Default?")),t&&l(s,`,
  CASE
    WHEN pg_catalog.pg_opfamily_is_visible(of.oid)
    THEN pg_catalog.format('%%I', of.opfname)
    ELSE pg_catalog.format('%%I.%%I', ofn.nspname, of.opfname)
  END AS "%s",
 pg_catalog.pg_get_userbyid(c.opcowner) AS "%s"
`,E("Operator family"),E("Owner")),c(s,`
FROM pg_catalog.pg_opclass c
  LEFT JOIN pg_catalog.pg_am am on am.oid = c.opcmethod
  LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.opcnamespace
  LEFT JOIN pg_catalog.pg_type t ON t.oid = c.opcintype
  LEFT JOIN pg_catalog.pg_namespace tn ON tn.oid = t.typnamespace
`),t&&c(s,`  LEFT JOIN pg_catalog.pg_opfamily of ON of.oid = c.opcfamily
  LEFT JOIN pg_catalog.pg_namespace ofn ON ofn.oid = of.opfnamespace
`),r){if(_={value:_},!P(s,r,!1,!1,null,"am.amname",null,null,_,1))return!1;_=_.value}return o&&!P(s,o,_,!1,"tn.nspname",
"t.typname","pg_catalog.format_type(t.oid, NULL)","pg_catalog.pg_type_is_visible(t.oid)",null,3)||(c(s,"ORDER BY 1, 2, 4\
;"),i=await m(s.data),!i)?!1:(a.nullPrint=null,a.title=e("List of operator classes"),a.translate_header=!0,a.translate_columns=
S,a.n_translate_columns=Z(S),G(i,a,T.queryFout,!1,T.logfile),!0)}async function pa(r,o,t){let s={},i,a=T.popt,_=!1,S=[!1,
!1,!1,!1];if(C(s),L(s,`SELECT
  am.amname AS "%s",
  CASE
    WHEN pg_catalog.pg_opfamily_is_visible(f.oid)
    THEN pg_catalog.format('%%I', f.opfname)
    ELSE pg_catalog.format('%%I.%%I', n.nspname, f.opfname)
  END AS "%s",
  (SELECT
     pg_catalog.string_agg(pg_catalog.format_type(oc.opcintype, NULL), ', ')
   FROM pg_catalog.pg_opclass oc
   WHERE oc.opcfamily = f.oid) "%s"`,E("AM"),E("Operator family"),E("Applicable types")),t&&l(s,`,
  pg_catalog.pg_get_userbyid(f.opfowner) AS "%s"
`,E("Owner")),c(s,`
FROM pg_catalog.pg_opfamily f
  LEFT JOIN pg_catalog.pg_am am on am.oid = f.opfmethod
  LEFT JOIN pg_catalog.pg_namespace n ON n.oid = f.opfnamespace
`),r){if(_={value:_},!P(s,r,!1,!1,null,"am.amname",null,null,_,1))return!1;_=_.value}if(o){if(l(s,`  %s EXISTS (
    SELECT 1
    FROM pg_catalog.pg_type t
    JOIN pg_catalog.pg_opclass oc ON oc.opcintype = t.oid
    LEFT JOIN pg_catalog.pg_namespace tn ON tn.oid = t.typnamespace
    WHERE oc.opcfamily = f.oid
`,_?"AND":"WHERE"),!P(s,o,!0,!1,"tn.nspname","t.typname","pg_catalog.format_type(t.oid, NULL)","pg_catalog.pg_type_is_vi\
sible(t.oid)",null,3))return!1;c(s,`  )
`)}return c(s,"ORDER BY 1, 2;"),i=await m(s.data),i?(a.nullPrint=null,a.title=e("List of operator families"),a.translate_header=
!0,a.translate_columns=S,a.n_translate_columns=Z(S),G(i,a,T.queryFout,!1,T.logfile),!0):!1}async function Ra(r,o,t){let s={},
i,a=T.popt,_=!1,S=[!1,!1,!1,!1,!1,!1,!0];if(C(s),L(s,`SELECT
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
`,E("AM"),E("Operator family"),E("Operator"),E("Strategy"),E("ordering"),E("search"),E("Purpose")),t&&l(s,`, ofs.opfname\
 AS "%s",
  CASE
    WHEN p.proleakproof THEN '%s'
    ELSE '%s'
  END AS "%s"
`,E("Sort opfamily"),E("yes"),E("no"),E("Leakproof?")),c(s,`FROM pg_catalog.pg_amop o
  LEFT JOIN pg_catalog.pg_opfamily of ON of.oid = o.amopfamily
  LEFT JOIN pg_catalog.pg_am am ON am.oid = of.opfmethod AND am.oid = o.amopmethod
  LEFT JOIN pg_catalog.pg_namespace nsf ON of.opfnamespace = nsf.oid
`),t&&c(s,`  LEFT JOIN pg_catalog.pg_opfamily ofs ON ofs.oid = o.amopsortfamily
  LEFT JOIN pg_catalog.pg_operator op ON op.oid = o.amopopr
  LEFT JOIN pg_catalog.pg_proc p ON p.oid = op.oprcode
`),r){if(_={value:_},!P(s,r,!1,!1,null,"am.amname",null,null,_,1))return!1;_=_.value}return o&&!P(s,o,_,!1,"nsf.nspname",
"of.opfname",null,null,null,3)||(c(s,`ORDER BY 1, 2,
  o.amoplefttype = o.amoprighttype DESC,
  pg_catalog.format_type(o.amoplefttype, NULL),
  pg_catalog.format_type(o.amoprighttype, NULL),
  o.amopstrategy;`),i=await m(s.data),!i)?!1:(a.nullPrint=null,a.title=e("List of operators of operator families"),a.translate_header=
!0,a.translate_columns=S,a.n_translate_columns=Z(S),G(i,a,T.queryFout,!1,T.logfile),!0)}async function Aa(r,o,t){let s={},
i,a=T.popt,_=!1,S=[!1,!1,!1,!1,!1,!1];if(C(s),L(s,`SELECT
  am.amname AS "%s",
  CASE
    WHEN pg_catalog.pg_opfamily_is_visible(of.oid)
    THEN pg_catalog.format('%%I', of.opfname)
    ELSE pg_catalog.format('%%I.%%I', ns.nspname, of.opfname)
  END AS "%s",
  pg_catalog.format_type(ap.amproclefttype, NULL) AS "%s",
  pg_catalog.format_type(ap.amprocrighttype, NULL) AS "%s",
  ap.amprocnum AS "%s"
`,E("AM"),E("Operator family"),E("Registered left type"),E("Registered right type"),E("Number")),t?l(s,`, ap.amproc::pg_\
catalog.regprocedure AS "%s"
`,E("Function")):l(s,`, p.proname AS "%s"
`,E("Function")),c(s,`FROM pg_catalog.pg_amproc ap
  LEFT JOIN pg_catalog.pg_opfamily of ON of.oid = ap.amprocfamily
  LEFT JOIN pg_catalog.pg_am am ON am.oid = of.opfmethod
  LEFT JOIN pg_catalog.pg_namespace ns ON of.opfnamespace = ns.oid
  LEFT JOIN pg_catalog.pg_proc p ON ap.amproc = p.oid
`),r){if(_={value:_},!P(s,r,!1,!1,null,"am.amname",null,null,_,1))return!1;_=_.value}return o&&!P(s,o,_,!1,"ns.nspname",
"of.opfname",null,null,null,3)||(c(s,`ORDER BY 1, 2,
  ap.amproclefttype = ap.amprocrighttype DESC,
  3, 4, 5;`),i=await m(s.data),!i)?!1:(a.nullPrint=null,a.title=e("List of support functions of operator families"),a.translate_header=
!0,a.translate_columns=S,a.n_translate_columns=Z(S),G(i,a,T.queryFout,!1,T.logfile),!0)}async function Na(r){let o={},t,
s=T.popt;if(C(o),L(o,`SELECT oid as "%s",
  pg_catalog.pg_get_userbyid(lomowner) as "%s",
  `,E("ID"),E("Owner")),r&&(ie(o,"lomacl"),c(o,`,
  `)),l(o,`pg_catalog.obj_description(oid, 'pg_largeobject') as "%s"
FROM pg_catalog.pg_largeobject_metadata
ORDER BY oid`,E("Description")),t=await m(o.data),!t)return!1;s.nullPrint=null,s.title=e("Large objects"),s.translate_header=
!0,G(t,s,T.queryFout,!1,T.logfile)}return!0}return{promise:Ve(),cancel:Se}}function tn(n,I,d,U="",B=""){const Y=Math.max(
0,I-le(n));return d==="r"?U+" ".repeat(Y)+n+B:d==="c"?U+" ".repeat(Math.floor(Y/2))+n+" ".repeat(Math.ceil(Y/2))+B:U+n+"\
 ".repeat(Y)+B}function En(n,I){let d=0;const U=n.length,B=[];for(;d<U;)B.push(n.slice(d,d+=I));return B}function ga(n){
let I=-1,d=0,U=1,B=0;for(;(I=n.indexOf(`
`,I+1))!==-1;)I-d>B&&(B=I-d),d=I+1,U++;return n.length-d>B&&(B=n.length-d),{count:U,longest:B}}function ce(n,I){return n=
n.replace(/[<>&'"]/g,d=>({"<":"&lt;",">":"&gt;","&":"&amp;","'":"&apos;",'"':"&quot;"})[d]),I&&(n=n.replace(/ /g,"&nbsp;").
replace(/\n/g,"<br />")),n}function Oa(n,I){const{ncolumns:d,nrows:U,aligns:B}=n,Y=[...n.headers,...n.cells].map(ga),{colWidths:x,
rowHeights:$}=Y.reduce((te,m,T)=>{const y=Math.floor(T/n.ncolumns),P=T%n.ncolumns;return m.longest>te.colWidths[P]&&(te.
colWidths[P]=m.longest),m.count>te.rowHeights[y]&&(te.rowHeights[y]=m.count),te},{colWidths:new Array(d).fill(0),rowHeights:new Array(
U+1).fill(1)}),X=x.reduce((te,m)=>te+m,0)+d*2+(d-1),Se=tn(n.title,X,"c"),oe=[n.headers,null,...En(n.cells,d)],Ve=oe.map(
(te,m)=>{if(m===1)return n.headers.map((y,P)=>"-".repeat(x[P%d]+2)).join("+");m>1&&m--;const T=te.map(y=>y.split(`
`));return new Array($[m]).fill("").map((y,P)=>T.map((Ie,Fe)=>tn(Ie[P]??"",x[Fe],m===0?"c":B[Fe]," ",Ie[P+1]===void 0?" ":
"+")).join("|")).join(`
`)}).join(`
`),Xe=n.footers?n.footers.filter(Pe):[],he=Xe.length>0?`
`+Xe.join(`
`):n.opt.default_footer?`
(${U} row${U===1?"":"s"})`:"";let k=`${Se}
${Ve}${he}`;return I&&(k=ce(k)),k}function fa(n){let I=`<table><tr><th valign="top" style="text-align: center;" colspan=\
"${n.ncolumns}">${ce(n.title)}</th></tr><tr>`;for(let U of n.headers)I+=`<th valign="top" style="text-align: center;">${ce(
U)}</th>`;I+="</tr>";for(let U of En(n.cells,n.ncolumns))I+="<tr>"+U.map((B,Y)=>`<td valign="top" style="text-align: ${n.
aligns[Y]==="c"?"center":n.aligns[Y]==="r"?"right":"left"}">${ce(B).replace(/\n/g,"<br>")}</td>`).join(`
`)+"</tr>";I+="</table>";const d=n.footers?n.footers.filter(Pe):[];return d.length>0?d.length>1&&d.some(U=>/^\s/.test(U))?
I+="<dl>"+d.map(U=>/^\s/.test(U)?`<dd>${ce(U.trim(),!0)}</dd>`:`<dt>${ce(U,!0)}</dt>`).join("")+"</dl>":I+=d.map(U=>`<p>${ce(
U,!0)}</p>`).join(""):n.opt.default_footer&&(I+=`<p>(${n.nrows} row${n.nrows===1?"":"s"})</p>`),I}function Oe(n){if(!n)throw new Error(
`Assertion failed (value: ${n})`)}const E=Pe,Ae=Pe,e=Pe;function Ye(n,I){const d=n.indexOf(I);return d===-1?null:d}const z=Ye;
function le(n){return n.length}function fe(n,I,d){if(typeof n!="string"||typeof I!="string")throw new Error("Not a strin\
g");return n.length>d&&(n=n.slice(0,d)),I.length>d&&(I=I.slice(0,d)),n<I?-1:n>I?1:0}function F(n,I){return fe(n,I,1/0)}function ma(n,I){
const d=le(n);for(let U=0;U<d;U++)if(I.indexOf(n[U])===-1)return U;return d}function on(n){return parseInt(n,10)}function Je(n){
return parseInt(n,10)}function ln(n){return n===" "||n==="	"||n===`
`||n==="\r"}function Ia(n){return n==='"'||n==="'"}function ua(n){const I=n.charCodeAt(0);return I>=65&&I<=90}function Z(n){
return n.length}function Qe(n){return n.toLowerCase()}function da(n,I){return F(n.toLowerCase(),I.toLowerCase())}function rn(n,I,d){
return I}function _e(n){return 0}function C(n){n.data="",n.len=0}const ze=C;function c(n,I){n.data+=I,n.len=n.data.length}
const V=c;function l(n,I,...d){const U=ne(I,...d);c(n,U)}function L(n,I,...d){C(n),l(n,I,...d)}function Ze(n,I,d,U){const Y="\
'"+I.replace(U?/[']/g:/['\\]/g,"\\$&")+"'";c(n,Y)}function me(n,I,d){if(z(I,"\\")!=null&&Ue(d)>=80100){n.len>0&&n.data[n.
len-1]!=" "&&V(n," "),V(n,"E"),Ze(n,I,_n(d),!1);return}Ze(n,I,d.encoding,d.std_strings)}function ne(n,...I){let d="",U=0,
B=0,Y;for(;(Y=n.indexOf("%",B))!==-1;){let x=0,$=!1;d+=n.slice(B,Y),B=Y+1;let X=n[B++];if(X==="%"&&(d+="%"),X==="*"&&(x=
parseInt(I[U++],10),X=n[B++]),X==="-"&&($=!0,X=n[B++]),X>="0"&&X<="9"&&(x=parseInt(X,10),X=n[B++]),X==="s"||X==="c"||X===
"d"||X==="u"){const Se=String(I[U++]),oe=x-Se.length;$===!1&&oe>0&&(d+=" ".repeat(oe)),d+=Se,$===!0&&oe>0&&(d+=" ".repeat(
oe))}}return d+=n.slice(B),d}const xe=ne;function cn(n){return n?n.dbName:null}function Ue(n){return!n||n.status===1?0:n.
sversion}function _n(n){return!n||n.status!=0?-1:n.client_encoding}function W(n){return n.rowCount}function Tn(n){return n.
fields.length}function pn(n,I){return n.fields[I].name}function Ca(n,I){return n.fields[I].dataTypeID}function ae(n,I,d){
return n.rows[I][d]===null?1:0}function A(n,I,d){const U=n.rows[I][d];return String(U===null?"":U)}function Ne(n,I){let d,
U,B,Y,x;if(!n||I==null||I[0]==null)return-1;for(d=!1,B="",U=0,x=le(I);U<x;U++){let $=I[U];d?$=='"'?I[U+1]=='"'?(B+='"',U++):
d=!1:B+=$:$=='"'?d=!0:($=Qe($),B+=$)}for(Y=0,x=Tn(n);Y<x;Y++)if(F(B,pn(n,Y))==0)return Y;return-1}function Te(n,I,d,U){return n>=
1e5?I?d=ne("%d.%d",Math.floor(n/1e4),n%1e4):d=ne("%d",n/1e4):I?d=ne("%d.%d.%d",Math.floor(n/1e4),Math.floor(n/100)%100,n%
100):d=ne("%d.%d",Math.floor(n/1e4),Math.floor(n/100)%100),d}function Le(n,I,d,U){if(I!==0&&I!==4)throw new Error(`scan \
type ${I} not implemented`);if(d!==null)throw new Error("cannot return quote type");const B=[],Y=U?/^(.*);*$/:/^(.*)$/;let x;
for(;;){if(x=n[0][n[1]],x==null)return null;if(!ln(x))break;n[1]++}if(I===4)return n[0].slice(n[1],n[1]=n[0].length);let $="";
for(;;){if(x=n[0][n[1]++],x==null)return B.length>0?null:$.match(Y)[1];if(Ia(x))x===B[B.length-1]?B.pop():B.push(x),x===
'"'&&($+=x);else{if(B.length===0&&ln(x))return $.match(Y)[1];$+=x}}}function Pe(n){return n}const Da=`Help
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
`,be=[["ABORT","abort the current transaction","sql-abort",Ua],["ALTER AGGREGATE","change the definition of an aggregate\
 function","sql-alteraggregate",Pa],["ALTER COLLATION","change the definition of a collation","sql-altercollation",ba],[
"ALTER CONVERSION","change the definition of a conversion","sql-alterconversion",ha],["ALTER DATABASE","change a databas\
e","sql-alterdatabase",Fa],["ALTER DEFAULT PRIVILEGES","define default access privileges","sql-alterdefaultprivileges",ya],
["ALTER DOMAIN","change the definition of a domain","sql-alterdomain",Ha],["ALTER EVENT TRIGGER","change the definition \
of an event trigger","sql-altereventtrigger",Ma],["ALTER EXTENSION","change the definition of an extension","sql-alterex\
tension",wa],["ALTER FOREIGN DATA WRAPPER","change the definition of a foreign-data wrapper","sql-alterforeigndatawrappe\
r",Ga],["ALTER FOREIGN TABLE","change the definition of a foreign table","sql-alterforeigntable",Wa],["ALTER FUNCTION","\
change the definition of a function","sql-alterfunction",Ba],["ALTER GROUP","change role name or membership","sql-alterg\
roup",va],["ALTER INDEX","change the definition of an index","sql-alterindex",qa],["ALTER LANGUAGE","change the definiti\
on of a procedural language","sql-alterlanguage",Ya],["ALTER LARGE OBJECT","change the definition of a large object","sq\
l-alterlargeobject",xa],["ALTER MATERIALIZED VIEW","change the definition of a materialized view","sql-altermaterialized\
view",Va],["ALTER OPERATOR","change the definition of an operator","sql-alteroperator",Xa],["ALTER OPERATOR CLASS","chan\
ge the definition of an operator class","sql-alteropclass",ka],["ALTER OPERATOR FAMILY","change the definition of an ope\
rator family","sql-alteropfamily",Ka],["ALTER POLICY","change the definition of a row-level security policy","sql-alterp\
olicy",ja],["ALTER PROCEDURE","change the definition of a procedure","sql-alterprocedure",Ja],["ALTER PUBLICATION","chan\
ge the definition of a publication","sql-alterpublication",Qa],["ALTER ROLE","change a database role","sql-alterrole",za],
["ALTER ROUTINE","change the definition of a routine","sql-alterroutine",Za],["ALTER RULE","change the definition of a r\
ule","sql-alterrule",$a],["ALTER SCHEMA","change the definition of a schema","sql-alterschema",es],["ALTER SEQUENCE","ch\
ange the definition of a sequence generator","sql-altersequence",ns],["ALTER SERVER","change the definition of a foreign\
 server","sql-alterserver",as],["ALTER STATISTICS","change the definition of an extended statistics object","sql-alterst\
atistics",ss],["ALTER SUBSCRIPTION","change the definition of a subscription","sql-altersubscription",ts],["ALTER SYSTEM",
"change a server configuration parameter","sql-altersystem",Es],["ALTER TABLE","change the definition of a table","sql-a\
ltertable",is],["ALTER TABLESPACE","change the definition of a tablespace","sql-altertablespace",os],["ALTER TEXT SEARCH\
 CONFIGURATION","change the definition of a text search configuration","sql-altertsconfig",ls],["ALTER TEXT SEARCH DICTI\
ONARY","change the definition of a text search dictionary","sql-altertsdictionary",rs],["ALTER TEXT SEARCH PARSER","chan\
ge the definition of a text search parser","sql-altertsparser",cs],["ALTER TEXT SEARCH TEMPLATE","change the definition \
of a text search template","sql-altertstemplate",_s],["ALTER TRIGGER","change the definition of a trigger","sql-altertri\
gger",Ts],["ALTER TYPE","change the definition of a type","sql-altertype",ps],["ALTER USER","change a database role","sq\
l-alteruser",Rs],["ALTER USER MAPPING","change the definition of a user mapping","sql-alterusermapping",As],["ALTER VIEW",
"change the definition of a view","sql-alterview",Ns],["ANALYZE","collect statistics about a database","sql-analyze",Ls],
["BEGIN","start a transaction block","sql-begin",Ss],["CALL","invoke a procedure","sql-call",gs],["CHECKPOINT","force a \
write-ahead log checkpoint","sql-checkpoint",Os],["CLOSE","close a cursor","sql-close",fs],["CLUSTER","cluster a table a\
ccording to an index","sql-cluster",ms],["COMMENT","define or change the comment of an object","sql-comment",Is],["COMMI\
T","commit the current transaction","sql-commit",us],["COMMIT PREPARED","commit a transaction that was earlier prepared \
for two-phase commit","sql-commit-prepared",ds],["COPY","copy data between a file and a table","sql-copy",Cs],["CREATE A\
CCESS METHOD","define a new access method","sql-create-access-method",Ds],["CREATE AGGREGATE","define a new aggregate fu\
nction","sql-createaggregate",Us],["CREATE CAST","define a new cast","sql-createcast",Ps],["CREATE COLLATION","define a \
new collation","sql-createcollation",bs],["CREATE CONVERSION","define a new encoding conversion","sql-createconversion",
hs],["CREATE DATABASE","create a new database","sql-createdatabase",Fs],["CREATE DOMAIN","define a new domain","sql-crea\
tedomain",ys],["CREATE EVENT TRIGGER","define a new event trigger","sql-createeventtrigger",Hs],["CREATE EXTENSION","ins\
tall an extension","sql-createextension",Ms],["CREATE FOREIGN DATA WRAPPER","define a new foreign-data wrapper","sql-cre\
ateforeigndatawrapper",ws],["CREATE FOREIGN TABLE","define a new foreign table","sql-createforeigntable",Gs],["CREATE FU\
NCTION","define a new function","sql-createfunction",Ws],["CREATE GROUP","define a new database role","sql-creategroup",
Bs],["CREATE INDEX","define a new index","sql-createindex",vs],["CREATE LANGUAGE","define a new procedural language","sq\
l-createlanguage",qs],["CREATE MATERIALIZED VIEW","define a new materialized view","sql-creatematerializedview",Ys],["CR\
EATE OPERATOR","define a new operator","sql-createoperator",xs],["CREATE OPERATOR CLASS","define a new operator class","\
sql-createopclass",Vs],["CREATE OPERATOR FAMILY","define a new operator family","sql-createopfamily",Xs],["CREATE POLICY",
"define a new row-level security policy for a table","sql-createpolicy",ks],["CREATE PROCEDURE","define a new procedure",
"sql-createprocedure",Ks],["CREATE PUBLICATION","define a new publication","sql-createpublication",js],["CREATE ROLE","d\
efine a new database role","sql-createrole",Js],["CREATE RULE","define a new rewrite rule","sql-createrule",Qs],["CREATE\
 SCHEMA","define a new schema","sql-createschema",zs],["CREATE SEQUENCE","define a new sequence generator","sql-createse\
quence",Zs],["CREATE SERVER","define a new foreign server","sql-createserver",$s],["CREATE STATISTICS","define extended \
statistics","sql-createstatistics",et],["CREATE SUBSCRIPTION","define a new subscription","sql-createsubscription",nt],[
"CREATE TABLE","define a new table","sql-createtable",at],["CREATE TABLE AS","define a new table from the results of a q\
uery","sql-createtableas",st],["CREATE TABLESPACE","define a new tablespace","sql-createtablespace",tt],["CREATE TEXT SE\
ARCH CONFIGURATION","define a new text search configuration","sql-createtsconfig",Et],["CREATE TEXT SEARCH DICTIONARY","\
define a new text search dictionary","sql-createtsdictionary",it],["CREATE TEXT SEARCH PARSER","define a new text search\
 parser","sql-createtsparser",ot],["CREATE TEXT SEARCH TEMPLATE","define a new text search template","sql-createtstempla\
te",lt],["CREATE TRANSFORM","define a new transform","sql-createtransform",rt],["CREATE TRIGGER","define a new trigger",
"sql-createtrigger",ct],["CREATE TYPE","define a new data type","sql-createtype",_t],["CREATE USER","define a new databa\
se role","sql-createuser",Tt],["CREATE USER MAPPING","define a new mapping of a user to a foreign server","sql-createuse\
rmapping",pt],["CREATE VIEW","define a new view","sql-createview",Rt],["DEALLOCATE","deallocate a prepared statement","s\
ql-deallocate",At],["DECLARE","define a cursor","sql-declare",Nt],["DELETE","delete rows of a table","sql-delete",Lt],["\
DISCARD","discard session state","sql-discard",St],["DO","execute an anonymous code block","sql-do",gt],["DROP ACCESS ME\
THOD","remove an access method","sql-drop-access-method",Ot],["DROP AGGREGATE","remove an aggregate function","sql-dropa\
ggregate",ft],["DROP CAST","remove a cast","sql-dropcast",mt],["DROP COLLATION","remove a collation","sql-dropcollation",
It],["DROP CONVERSION","remove a conversion","sql-dropconversion",ut],["DROP DATABASE","remove a database","sql-dropdata\
base",dt],["DROP DOMAIN","remove a domain","sql-dropdomain",Ct],["DROP EVENT TRIGGER","remove an event trigger","sql-dro\
peventtrigger",Dt],["DROP EXTENSION","remove an extension","sql-dropextension",Ut],["DROP FOREIGN DATA WRAPPER","remove \
a foreign-data wrapper","sql-dropforeigndatawrapper",Pt],["DROP FOREIGN TABLE","remove a foreign table","sql-dropforeign\
table",bt],["DROP FUNCTION","remove a function","sql-dropfunction",ht],["DROP GROUP","remove a database role","sql-dropg\
roup",Ft],["DROP INDEX","remove an index","sql-dropindex",yt],["DROP LANGUAGE","remove a procedural language","sql-dropl\
anguage",Ht],["DROP MATERIALIZED VIEW","remove a materialized view","sql-dropmaterializedview",Mt],["DROP OPERATOR","rem\
ove an operator","sql-dropoperator",wt],["DROP OPERATOR CLASS","remove an operator class","sql-dropopclass",Gt],["DROP O\
PERATOR FAMILY","remove an operator family","sql-dropopfamily",Wt],["DROP OWNED","remove database objects owned by a dat\
abase role","sql-drop-owned",Bt],["DROP POLICY","remove a row-level security policy from a table","sql-droppolicy",vt],[
"DROP PROCEDURE","remove a procedure","sql-dropprocedure",qt],["DROP PUBLICATION","remove a publication","sql-droppublic\
ation",Yt],["DROP ROLE","remove a database role","sql-droprole",xt],["DROP ROUTINE","remove a routine","sql-droproutine",
Vt],["DROP RULE","remove a rewrite rule","sql-droprule",Xt],["DROP SCHEMA","remove a schema","sql-dropschema",kt],["DROP\
 SEQUENCE","remove a sequence","sql-dropsequence",Kt],["DROP SERVER","remove a foreign server descriptor","sql-dropserve\
r",jt],["DROP STATISTICS","remove extended statistics","sql-dropstatistics",Jt],["DROP SUBSCRIPTION","remove a subscript\
ion","sql-dropsubscription",Qt],["DROP TABLE","remove a table","sql-droptable",zt],["DROP TABLESPACE","remove a tablespa\
ce","sql-droptablespace",Zt],["DROP TEXT SEARCH CONFIGURATION","remove a text search configuration","sql-droptsconfig",$t],
["DROP TEXT SEARCH DICTIONARY","remove a text search dictionary","sql-droptsdictionary",eE],["DROP TEXT SEARCH PARSER","\
remove a text search parser","sql-droptsparser",nE],["DROP TEXT SEARCH TEMPLATE","remove a text search template","sql-dr\
optstemplate",aE],["DROP TRANSFORM","remove a transform","sql-droptransform",sE],["DROP TRIGGER","remove a trigger","sql\
-droptrigger",tE],["DROP TYPE","remove a data type","sql-droptype",EE],["DROP USER","remove a database role","sql-dropus\
er",iE],["DROP USER MAPPING","remove a user mapping for a foreign server","sql-dropusermapping",oE],["DROP VIEW","remove\
 a view","sql-dropview",lE],["END","commit the current transaction","sql-end",rE],["EXECUTE","execute a prepared stateme\
nt","sql-execute",cE],["EXPLAIN","show the execution plan of a statement","sql-explain",_E],["FETCH","retrieve rows from\
 a query using a cursor","sql-fetch",TE],["GRANT","define access privileges","sql-grant",pE],["IMPORT FOREIGN SCHEMA","i\
mport table definitions from a foreign server","sql-importforeignschema",RE],["INSERT","create new rows in a table","sql\
-insert",AE],["LISTEN","listen for a notification","sql-listen",NE],["LOAD","load a shared library file","sql-load",LE],
["LOCK","lock a table","sql-lock",SE],["MERGE","conditionally insert, update, or delete rows of a table","sql-merge",gE],
["MOVE","position a cursor","sql-move",OE],["NOTIFY","generate a notification","sql-notify",fE],["PREPARE","prepare a st\
atement for execution","sql-prepare",mE],["PREPARE TRANSACTION","prepare the current transaction for two-phase commit","\
sql-prepare-transaction",IE],["REASSIGN OWNED","change the ownership of database objects owned by a database role","sql-\
reassign-owned",uE],["REFRESH MATERIALIZED VIEW","replace the contents of a materialized view","sql-refreshmaterializedv\
iew",dE],["REINDEX","rebuild indexes","sql-reindex",CE],["RELEASE SAVEPOINT","release a previously defined savepoint","s\
ql-release-savepoint",DE],["RESET","restore the value of a run-time parameter to the default value","sql-reset",UE],["RE\
VOKE","remove access privileges","sql-revoke",PE],["ROLLBACK","abort the current transaction","sql-rollback",bE],["ROLLB\
ACK PREPARED","cancel a transaction that was earlier prepared for two-phase commit","sql-rollback-prepared",hE],["ROLLBA\
CK TO SAVEPOINT","roll back to a savepoint","sql-rollback-to",FE],["SAVEPOINT","define a new savepoint within the curren\
t transaction","sql-savepoint",yE],["SECURITY LABEL","define or change a security label applied to an object","sql-secur\
ity-label",HE],["SELECT","retrieve rows from a table or view","sql-select",ME],["SELECT INTO","define a new table from t\
he results of a query","sql-selectinto",wE],["SET","change a run-time parameter","sql-set",GE],["SET CONSTRAINTS","set c\
onstraint check timing for the current transaction","sql-set-constraints",WE],["SET ROLE","set the current user identifi\
er of the current session","sql-set-role",BE],["SET SESSION AUTHORIZATION","set the session user identifier and the curr\
ent user identifier of the current session","sql-set-session-authorization",vE],["SET TRANSACTION","set the characterist\
ics of the current transaction","sql-set-transaction",qE],["SHOW","show the value of a run-time parameter","sql-show",YE],
["START TRANSACTION","start a transaction block","sql-start-transaction",xE],["TABLE","retrieve rows from a table or vie\
w","sql-select",VE],["TRUNCATE","empty a table or set of tables","sql-truncate",XE],["UNLISTEN","stop listening for a no\
tification","sql-unlisten",kE],["UPDATE","update rows of a table","sql-update",KE],["VACUUM","garbage-collect and option\
ally analyze a database","sql-vacuum",jE],["VALUES","compute a set of rows","sql-values",JE],["WITH","retrieve rows from\
 a table or view","sql-select",QE]];function Ua(n){l(n,"ABORT [ WORK | TRANSACTION ] [ AND [ NO ] CHAIN ]")}function Pa(n){
l(n,`ALTER AGGREGATE %s ( %s ) RENAME TO %s
ALTER AGGREGATE %s ( %s )
                OWNER TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER }
ALTER AGGREGATE %s ( %s ) SET SCHEMA %s

%s

* |
[ %s ] [ %s ] %s [ , ... ] |
[ [ %s ] [ %s ] %s [ , ... ] ] ORDER BY [ %s ] [ %s ] %s [ , ... ]`,e("name"),e("aggregate_signature"),e("new_name"),e("\
name"),e("aggregate_signature"),e("new_owner"),e("name"),e("aggregate_signature"),e("new_schema"),e("where aggregate_sig\
nature is:"),e("argmode"),e("argname"),e("argtype"),e("argmode"),e("argname"),e("argtype"),e("argmode"),e("argname"),e("\
argtype"))}function ba(n){l(n,`ALTER COLLATION %s REFRESH VERSION

ALTER COLLATION %s RENAME TO %s
ALTER COLLATION %s OWNER TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER }
ALTER COLLATION %s SET SCHEMA %s`,e("name"),e("name"),e("new_name"),e("name"),e("new_owner"),e("name"),e("new_schema"))}
function ha(n){l(n,`ALTER CONVERSION %s RENAME TO %s
ALTER CONVERSION %s OWNER TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER }
ALTER CONVERSION %s SET SCHEMA %s`,e("name"),e("new_name"),e("name"),e("new_owner"),e("name"),e("new_schema"))}function Fa(n){
l(n,`ALTER DATABASE %s [ [ WITH ] %s [ ... ] ]

%s

    ALLOW_CONNECTIONS %s
    CONNECTION LIMIT %s
    IS_TEMPLATE %s

ALTER DATABASE %s RENAME TO %s

ALTER DATABASE %s OWNER TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER }

ALTER DATABASE %s SET TABLESPACE %s

ALTER DATABASE %s REFRESH COLLATION VERSION

ALTER DATABASE %s SET %s { TO | = } { %s | DEFAULT }
ALTER DATABASE %s SET %s FROM CURRENT
ALTER DATABASE %s RESET %s
ALTER DATABASE %s RESET ALL`,e("name"),e("option"),e("where option can be:"),e("allowconn"),e("connlimit"),e("istemplate"),
e("name"),e("new_name"),e("name"),e("new_owner"),e("name"),e("new_tablespace"),e("name"),e("name"),e("configuration_para\
meter"),e("value"),e("name"),e("configuration_parameter"),e("name"),e("configuration_parameter"),e("name"))}function ya(n){
l(n,`ALTER DEFAULT PRIVILEGES
    [ FOR { ROLE | USER } %s [, ...] ]
    [ IN SCHEMA %s [, ...] ]
    %s

%s

GRANT { { SELECT | INSERT | UPDATE | DELETE | TRUNCATE | REFERENCES | TRIGGER | MAINTAIN }
    [, ...] | ALL [ PRIVILEGES ] }
    ON TABLES
    TO { [ GROUP ] %s | PUBLIC } [, ...] [ WITH GRANT OPTION ]

GRANT { { USAGE | SELECT | UPDATE }
    [, ...] | ALL [ PRIVILEGES ] }
    ON SEQUENCES
    TO { [ GROUP ] %s | PUBLIC } [, ...] [ WITH GRANT OPTION ]

GRANT { EXECUTE | ALL [ PRIVILEGES ] }
    ON { FUNCTIONS | ROUTINES }
    TO { [ GROUP ] %s | PUBLIC } [, ...] [ WITH GRANT OPTION ]

GRANT { USAGE | ALL [ PRIVILEGES ] }
    ON TYPES
    TO { [ GROUP ] %s | PUBLIC } [, ...] [ WITH GRANT OPTION ]

GRANT { { USAGE | CREATE }
    [, ...] | ALL [ PRIVILEGES ] }
    ON SCHEMAS
    TO { [ GROUP ] %s | PUBLIC } [, ...] [ WITH GRANT OPTION ]

GRANT { { SELECT | UPDATE }
    [, ...] | ALL [ PRIVILEGES ] }
    ON LARGE OBJECTS
    TO { [ GROUP ] %s | PUBLIC } [, ...] [ WITH GRANT OPTION ]

REVOKE [ GRANT OPTION FOR ]
    { { SELECT | INSERT | UPDATE | DELETE | TRUNCATE | REFERENCES | TRIGGER | MAINTAIN }
    [, ...] | ALL [ PRIVILEGES ] }
    ON TABLES
    FROM { [ GROUP ] %s | PUBLIC } [, ...]
    [ CASCADE | RESTRICT ]

REVOKE [ GRANT OPTION FOR ]
    { { USAGE | SELECT | UPDATE }
    [, ...] | ALL [ PRIVILEGES ] }
    ON SEQUENCES
    FROM { [ GROUP ] %s | PUBLIC } [, ...]
    [ CASCADE | RESTRICT ]

REVOKE [ GRANT OPTION FOR ]
    { EXECUTE | ALL [ PRIVILEGES ] }
    ON { FUNCTIONS | ROUTINES }
    FROM { [ GROUP ] %s | PUBLIC } [, ...]
    [ CASCADE | RESTRICT ]

REVOKE [ GRANT OPTION FOR ]
    { USAGE | ALL [ PRIVILEGES ] }
    ON TYPES
    FROM { [ GROUP ] %s | PUBLIC } [, ...]
    [ CASCADE | RESTRICT ]

REVOKE [ GRANT OPTION FOR ]
    { { USAGE | CREATE }
    [, ...] | ALL [ PRIVILEGES ] }
    ON SCHEMAS
    FROM { [ GROUP ] %s | PUBLIC } [, ...]
    [ CASCADE | RESTRICT ]

REVOKE [ GRANT OPTION FOR ]
    { { SELECT | UPDATE }
    [, ...] | ALL [ PRIVILEGES ] }
    ON LARGE OBJECTS
    FROM { [ GROUP ] %s | PUBLIC } [, ...]
    [ CASCADE | RESTRICT ]`,e("target_role"),e("schema_name"),e("abbreviated_grant_or_revoke"),e("where abbreviated_gran\
t_or_revoke is one of:"),e("role_name"),e("role_name"),e("role_name"),e("role_name"),e("role_name"),e("role_name"),e("ro\
le_name"),e("role_name"),e("role_name"),e("role_name"),e("role_name"),e("role_name"))}function Ha(n){l(n,`ALTER DOMAIN %\
s
    { SET DEFAULT %s | DROP DEFAULT }
ALTER DOMAIN %s
    { SET | DROP } NOT NULL
ALTER DOMAIN %s
    ADD %s [ NOT VALID ]
ALTER DOMAIN %s
    DROP CONSTRAINT [ IF EXISTS ] %s [ RESTRICT | CASCADE ]
ALTER DOMAIN %s
     RENAME CONSTRAINT %s TO %s
ALTER DOMAIN %s
    VALIDATE CONSTRAINT %s
ALTER DOMAIN %s
    OWNER TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER }
ALTER DOMAIN %s
    RENAME TO %s
ALTER DOMAIN %s
    SET SCHEMA %s

%s

[ CONSTRAINT %s ]
{ NOT NULL | CHECK (%s) }`,e("name"),e("expression"),e("name"),e("name"),e("domain_constraint"),e("name"),e("constraint_\
name"),e("name"),e("constraint_name"),e("new_constraint_name"),e("name"),e("constraint_name"),e("name"),e("new_owner"),e(
"name"),e("new_name"),e("name"),e("new_schema"),e("where domain_constraint is:"),e("constraint_name"),e("expression"))}function Ma(n){
l(n,`ALTER EVENT TRIGGER %s DISABLE
ALTER EVENT TRIGGER %s ENABLE [ REPLICA | ALWAYS ]
ALTER EVENT TRIGGER %s OWNER TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER }
ALTER EVENT TRIGGER %s RENAME TO %s`,e("name"),e("name"),e("name"),e("new_owner"),e("name"),e("new_name"))}function wa(n){
l(n,`ALTER EXTENSION %s UPDATE [ TO %s ]
ALTER EXTENSION %s SET SCHEMA %s
ALTER EXTENSION %s ADD %s
ALTER EXTENSION %s DROP %s

%s

  ACCESS METHOD %s |
  AGGREGATE %s ( %s ) |
  CAST (%s AS %s) |
  COLLATION %s |
  CONVERSION %s |
  DOMAIN %s |
  EVENT TRIGGER %s |
  FOREIGN DATA WRAPPER %s |
  FOREIGN TABLE %s |
  FUNCTION %s [ ( [ [ %s ] [ %s ] %s [, ...] ] ) ] |
  MATERIALIZED VIEW %s |
  OPERATOR %s (%s, %s) |
  OPERATOR CLASS %s USING %s |
  OPERATOR FAMILY %s USING %s |
  [ PROCEDURAL ] LANGUAGE %s |
  PROCEDURE %s [ ( [ [ %s ] [ %s ] %s [, ...] ] ) ] |
  ROUTINE %s [ ( [ [ %s ] [ %s ] %s [, ...] ] ) ] |
  SCHEMA %s |
  SEQUENCE %s |
  SERVER %s |
  TABLE %s |
  TEXT SEARCH CONFIGURATION %s |
  TEXT SEARCH DICTIONARY %s |
  TEXT SEARCH PARSER %s |
  TEXT SEARCH TEMPLATE %s |
  TRANSFORM FOR %s LANGUAGE %s |
  TYPE %s |
  VIEW %s

%s

* |
[ %s ] [ %s ] %s [ , ... ] |
[ [ %s ] [ %s ] %s [ , ... ] ] ORDER BY [ %s ] [ %s ] %s [ , ... ]`,e("name"),e("new_version"),e("name"),e("new_schema"),
e("name"),e("member_object"),e("name"),e("member_object"),e("where member_object is:"),e("object_name"),e("aggregate_nam\
e"),e("aggregate_signature"),e("source_type"),e("target_type"),e("object_name"),e("object_name"),e("object_name"),e("obj\
ect_name"),e("object_name"),e("object_name"),e("function_name"),e("argmode"),e("argname"),e("argtype"),e("object_name"),
e("operator_name"),e("left_type"),e("right_type"),e("object_name"),e("index_method"),e("object_name"),e("index_method"),
e("object_name"),e("procedure_name"),e("argmode"),e("argname"),e("argtype"),e("routine_name"),e("argmode"),e("argname"),
e("argtype"),e("object_name"),e("object_name"),e("object_name"),e("object_name"),e("object_name"),e("object_name"),e("ob\
ject_name"),e("object_name"),e("type_name"),e("lang_name"),e("object_name"),e("object_name"),e("and aggregate_signature \
is:"),e("argmode"),e("argname"),e("argtype"),e("argmode"),e("argname"),e("argtype"),e("argmode"),e("argname"),e("argtype"))}
function Ga(n){l(n,`ALTER FOREIGN DATA WRAPPER %s
    [ HANDLER %s | NO HANDLER ]
    [ VALIDATOR %s | NO VALIDATOR ]
    [ OPTIONS ( [ ADD | SET | DROP ] %s ['%s'] [, ... ]) ]
ALTER FOREIGN DATA WRAPPER %s OWNER TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER }
ALTER FOREIGN DATA WRAPPER %s RENAME TO %s`,e("name"),e("handler_function"),e("validator_function"),e("option"),e("value"),
e("name"),e("new_owner"),e("name"),e("new_name"))}function Wa(n){l(n,`ALTER FOREIGN TABLE [ IF EXISTS ] [ ONLY ] %s [ * \
]
    %s [, ... ]
ALTER FOREIGN TABLE [ IF EXISTS ] [ ONLY ] %s [ * ]
    RENAME [ COLUMN ] %s TO %s
ALTER FOREIGN TABLE [ IF EXISTS ] %s
    RENAME TO %s
ALTER FOREIGN TABLE [ IF EXISTS ] %s
    SET SCHEMA %s

%s

    ADD [ COLUMN ] %s %s [ COLLATE %s ] [ %s [ ... ] ]
    DROP [ COLUMN ] [ IF EXISTS ] %s [ RESTRICT | CASCADE ]
    ALTER [ COLUMN ] %s [ SET DATA ] TYPE %s [ COLLATE %s ]
    ALTER [ COLUMN ] %s SET DEFAULT %s
    ALTER [ COLUMN ] %s DROP DEFAULT
    ALTER [ COLUMN ] %s { SET | DROP } NOT NULL
    ALTER [ COLUMN ] %s SET STATISTICS %s
    ALTER [ COLUMN ] %s SET ( %s = %s [, ... ] )
    ALTER [ COLUMN ] %s RESET ( %s [, ... ] )
    ALTER [ COLUMN ] %s SET STORAGE { PLAIN | EXTERNAL | EXTENDED | MAIN | DEFAULT }
    ALTER [ COLUMN ] %s OPTIONS ( [ ADD | SET | DROP ] %s ['%s'] [, ... ])
    ADD %s [ NOT VALID ]
    VALIDATE CONSTRAINT %s
    DROP CONSTRAINT [ IF EXISTS ]  %s [ RESTRICT | CASCADE ]
    DISABLE TRIGGER [ %s | ALL | USER ]
    ENABLE TRIGGER [ %s | ALL | USER ]
    ENABLE REPLICA TRIGGER %s
    ENABLE ALWAYS TRIGGER %s
    SET WITHOUT OIDS
    INHERIT %s
    NO INHERIT %s
    OWNER TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER }
    OPTIONS ( [ ADD | SET | DROP ] %s ['%s'] [, ... ])`,e("name"),e("action"),e("name"),e("column_name"),e("new_column_n\
ame"),e("name"),e("new_name"),e("name"),e("new_schema"),e("where action is one of:"),e("column_name"),e("data_type"),e("\
collation"),e("column_constraint"),e("column_name"),e("column_name"),e("data_type"),e("collation"),e("column_name"),e("e\
xpression"),e("column_name"),e("column_name"),e("column_name"),e("integer"),e("column_name"),e("attribute_option"),e("va\
lue"),e("column_name"),e("attribute_option"),e("column_name"),e("column_name"),e("option"),e("value"),e("table_constrain\
t"),e("constraint_name"),e("constraint_name"),e("trigger_name"),e("trigger_name"),e("trigger_name"),e("trigger_name"),e(
"parent_table"),e("parent_table"),e("new_owner"),e("option"),e("value"))}function Ba(n){l(n,`ALTER FUNCTION %s [ ( [ [ %\
s ] [ %s ] %s [, ...] ] ) ]
    %s [ ... ] [ RESTRICT ]
ALTER FUNCTION %s [ ( [ [ %s ] [ %s ] %s [, ...] ] ) ]
    RENAME TO %s
ALTER FUNCTION %s [ ( [ [ %s ] [ %s ] %s [, ...] ] ) ]
    OWNER TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER }
ALTER FUNCTION %s [ ( [ [ %s ] [ %s ] %s [, ...] ] ) ]
    SET SCHEMA %s
ALTER FUNCTION %s [ ( [ [ %s ] [ %s ] %s [, ...] ] ) ]
    [ NO ] DEPENDS ON EXTENSION %s

%s

    CALLED ON NULL INPUT | RETURNS NULL ON NULL INPUT | STRICT
    IMMUTABLE | STABLE | VOLATILE
    [ NOT ] LEAKPROOF
    [ EXTERNAL ] SECURITY INVOKER | [ EXTERNAL ] SECURITY DEFINER
    PARALLEL { UNSAFE | RESTRICTED | SAFE }
    COST %s
    ROWS %s
    SUPPORT %s
    SET %s { TO | = } { %s | DEFAULT }
    SET %s FROM CURRENT
    RESET %s
    RESET ALL`,e("name"),e("argmode"),e("argname"),e("argtype"),e("action"),e("name"),e("argmode"),e("argname"),e("argty\
pe"),e("new_name"),e("name"),e("argmode"),e("argname"),e("argtype"),e("new_owner"),e("name"),e("argmode"),e("argname"),e(
"argtype"),e("new_schema"),e("name"),e("argmode"),e("argname"),e("argtype"),e("extension_name"),e("where action is one o\
f:"),e("execution_cost"),e("result_rows"),e("support_function"),e("configuration_parameter"),e("value"),e("configuration\
_parameter"),e("configuration_parameter"))}function va(n){l(n,`ALTER GROUP %s ADD USER %s [, ... ]
ALTER GROUP %s DROP USER %s [, ... ]

%s

    %s
  | CURRENT_ROLE
  | CURRENT_USER
  | SESSION_USER

ALTER GROUP %s RENAME TO %s`,e("role_specification"),e("user_name"),e("role_specification"),e("user_name"),e("where role\
_specification can be:"),e("role_name"),e("group_name"),e("new_name"))}function qa(n){l(n,`ALTER INDEX [ IF EXISTS ] %s \
RENAME TO %s
ALTER INDEX [ IF EXISTS ] %s SET TABLESPACE %s
ALTER INDEX %s ATTACH PARTITION %s
ALTER INDEX %s [ NO ] DEPENDS ON EXTENSION %s
ALTER INDEX [ IF EXISTS ] %s SET ( %s [= %s] [, ... ] )
ALTER INDEX [ IF EXISTS ] %s RESET ( %s [, ... ] )
ALTER INDEX [ IF EXISTS ] %s ALTER [ COLUMN ] %s
    SET STATISTICS %s
ALTER INDEX ALL IN TABLESPACE %s [ OWNED BY %s [, ... ] ]
    SET TABLESPACE %s [ NOWAIT ]`,e("name"),e("new_name"),e("name"),e("tablespace_name"),e("name"),e("index_name"),e("na\
me"),e("extension_name"),e("name"),e("storage_parameter"),e("value"),e("name"),e("storage_parameter"),e("name"),e("colum\
n_number"),e("integer"),e("name"),e("role_name"),e("new_tablespace"))}function Ya(n){l(n,`ALTER [ PROCEDURAL ] LANGUAGE \
%s RENAME TO %s
ALTER [ PROCEDURAL ] LANGUAGE %s OWNER TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER }`,e("name"),e("new_name"),e(
"name"),e("new_owner"))}function xa(n){l(n,"ALTER LARGE OBJECT %s OWNER TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_\
USER }",e("large_object_oid"),e("new_owner"))}function Va(n){l(n,`ALTER MATERIALIZED VIEW [ IF EXISTS ] %s
    %s [, ... ]
ALTER MATERIALIZED VIEW %s
    [ NO ] DEPENDS ON EXTENSION %s
ALTER MATERIALIZED VIEW [ IF EXISTS ] %s
    RENAME [ COLUMN ] %s TO %s
ALTER MATERIALIZED VIEW [ IF EXISTS ] %s
    RENAME TO %s
ALTER MATERIALIZED VIEW [ IF EXISTS ] %s
    SET SCHEMA %s
ALTER MATERIALIZED VIEW ALL IN TABLESPACE %s [ OWNED BY %s [, ... ] ]
    SET TABLESPACE %s [ NOWAIT ]

%s

    ALTER [ COLUMN ] %s SET STATISTICS %s
    ALTER [ COLUMN ] %s SET ( %s = %s [, ... ] )
    ALTER [ COLUMN ] %s RESET ( %s [, ... ] )
    ALTER [ COLUMN ] %s SET STORAGE { PLAIN | EXTERNAL | EXTENDED | MAIN | DEFAULT }
    ALTER [ COLUMN ] %s SET COMPRESSION %s
    CLUSTER ON %s
    SET WITHOUT CLUSTER
    SET ACCESS METHOD %s
    SET TABLESPACE %s
    SET ( %s [= %s] [, ... ] )
    RESET ( %s [, ... ] )
    OWNER TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER }`,e("name"),e("action"),e("name"),e("extension_name"),e(
"name"),e("column_name"),e("new_column_name"),e("name"),e("new_name"),e("name"),e("new_schema"),e("name"),e("role_name"),
e("new_tablespace"),e("where action is one of:"),e("column_name"),e("integer"),e("column_name"),e("attribute_option"),e(
"value"),e("column_name"),e("attribute_option"),e("column_name"),e("column_name"),e("compression_method"),e("index_name"),
e("new_access_method"),e("new_tablespace"),e("storage_parameter"),e("value"),e("storage_parameter"),e("new_owner"))}function Xa(n){
l(n,`ALTER OPERATOR %s ( { %s | NONE } , %s )
    OWNER TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER }

ALTER OPERATOR %s ( { %s | NONE } , %s )
    SET SCHEMA %s

ALTER OPERATOR %s ( { %s | NONE } , %s )
    SET ( {  RESTRICT = { %s | NONE }
           | JOIN = { %s | NONE }
           | COMMUTATOR = %s
           | NEGATOR = %s
           | HASHES
           | MERGES
          } [, ... ] )`,e("name"),e("left_type"),e("right_type"),e("new_owner"),e("name"),e("left_type"),e("right_type"),
e("new_schema"),e("name"),e("left_type"),e("right_type"),e("res_proc"),e("join_proc"),e("com_op"),e("neg_op"))}function ka(n){
l(n,`ALTER OPERATOR CLASS %s USING %s
    RENAME TO %s

ALTER OPERATOR CLASS %s USING %s
    OWNER TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER }

ALTER OPERATOR CLASS %s USING %s
    SET SCHEMA %s`,e("name"),e("index_method"),e("new_name"),e("name"),e("index_method"),e("new_owner"),e("name"),e("ind\
ex_method"),e("new_schema"))}function Ka(n){l(n,`ALTER OPERATOR FAMILY %s USING %s ADD
  {  OPERATOR %s %s ( %s, %s )
              [ FOR SEARCH | FOR ORDER BY %s ]
   | FUNCTION %s [ ( %s [ , %s ] ) ]
              %s [ ( %s [, ...] ) ]
  } [, ... ]

ALTER OPERATOR FAMILY %s USING %s DROP
  {  OPERATOR %s ( %s [ , %s ] )
   | FUNCTION %s ( %s [ , %s ] )
  } [, ... ]

ALTER OPERATOR FAMILY %s USING %s
    RENAME TO %s

ALTER OPERATOR FAMILY %s USING %s
    OWNER TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER }

ALTER OPERATOR FAMILY %s USING %s
    SET SCHEMA %s`,e("name"),e("index_method"),e("strategy_number"),e("operator_name"),e("op_type"),e("op_type"),e("sort\
_family_name"),e("support_number"),e("op_type"),e("op_type"),e("function_name"),e("argument_type"),e("name"),e("index_me\
thod"),e("strategy_number"),e("op_type"),e("op_type"),e("support_number"),e("op_type"),e("op_type"),e("name"),e("index_m\
ethod"),e("new_name"),e("name"),e("index_method"),e("new_owner"),e("name"),e("index_method"),e("new_schema"))}function ja(n){
l(n,`ALTER POLICY %s ON %s RENAME TO %s

ALTER POLICY %s ON %s
    [ TO { %s | PUBLIC | CURRENT_ROLE | CURRENT_USER | SESSION_USER } [, ...] ]
    [ USING ( %s ) ]
    [ WITH CHECK ( %s ) ]`,e("name"),e("table_name"),e("new_name"),e("name"),e("table_name"),e("role_name"),e("using_exp\
ression"),e("check_expression"))}function Ja(n){l(n,`ALTER PROCEDURE %s [ ( [ [ %s ] [ %s ] %s [, ...] ] ) ]
    %s [ ... ] [ RESTRICT ]
ALTER PROCEDURE %s [ ( [ [ %s ] [ %s ] %s [, ...] ] ) ]
    RENAME TO %s
ALTER PROCEDURE %s [ ( [ [ %s ] [ %s ] %s [, ...] ] ) ]
    OWNER TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER }
ALTER PROCEDURE %s [ ( [ [ %s ] [ %s ] %s [, ...] ] ) ]
    SET SCHEMA %s
ALTER PROCEDURE %s [ ( [ [ %s ] [ %s ] %s [, ...] ] ) ]
    [ NO ] DEPENDS ON EXTENSION %s

%s

    [ EXTERNAL ] SECURITY INVOKER | [ EXTERNAL ] SECURITY DEFINER
    SET %s { TO | = } { %s | DEFAULT }
    SET %s FROM CURRENT
    RESET %s
    RESET ALL`,e("name"),e("argmode"),e("argname"),e("argtype"),e("action"),e("name"),e("argmode"),e("argname"),e("argty\
pe"),e("new_name"),e("name"),e("argmode"),e("argname"),e("argtype"),e("new_owner"),e("name"),e("argmode"),e("argname"),e(
"argtype"),e("new_schema"),e("name"),e("argmode"),e("argname"),e("argtype"),e("extension_name"),e("where action is one o\
f:"),e("configuration_parameter"),e("value"),e("configuration_parameter"),e("configuration_parameter"))}function Qa(n){l(
n,`ALTER PUBLICATION %s ADD %s [, ...]
ALTER PUBLICATION %s SET %s [, ...]
ALTER PUBLICATION %s DROP %s [, ...]
ALTER PUBLICATION %s SET ( %s [= %s] [, ... ] )
ALTER PUBLICATION %s OWNER TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER }
ALTER PUBLICATION %s RENAME TO %s

%s

    TABLE [ ONLY ] %s [ * ] [ ( %s [, ... ] ) ] [ WHERE ( %s ) ] [, ... ]
    TABLES IN SCHEMA { %s | CURRENT_SCHEMA } [, ... ]`,e("name"),e("publication_object"),e("name"),e("publication_object"),
e("name"),e("publication_object"),e("name"),e("publication_parameter"),e("value"),e("name"),e("new_owner"),e("name"),e("\
new_name"),e("where publication_object is one of:"),e("table_name"),e("column_name"),e("expression"),e("schema_name"))}function za(n){
l(n,`ALTER ROLE %s [ WITH ] %s [ ... ]

%s

      SUPERUSER | NOSUPERUSER
    | CREATEDB | NOCREATEDB
    | CREATEROLE | NOCREATEROLE
    | INHERIT | NOINHERIT
    | LOGIN | NOLOGIN
    | REPLICATION | NOREPLICATION
    | BYPASSRLS | NOBYPASSRLS
    | CONNECTION LIMIT %s
    | [ ENCRYPTED ] PASSWORD '%s' | PASSWORD NULL
    | VALID UNTIL '%s'

ALTER ROLE %s RENAME TO %s

ALTER ROLE { %s | ALL } [ IN DATABASE %s ] SET %s { TO | = } { %s | DEFAULT }
ALTER ROLE { %s | ALL } [ IN DATABASE %s ] SET %s FROM CURRENT
ALTER ROLE { %s | ALL } [ IN DATABASE %s ] RESET %s
ALTER ROLE { %s | ALL } [ IN DATABASE %s ] RESET ALL

%s

    %s
  | CURRENT_ROLE
  | CURRENT_USER
  | SESSION_USER`,e("role_specification"),e("option"),e("where option can be:"),e("connlimit"),e("password"),e("timestam\
p"),e("name"),e("new_name"),e("role_specification"),e("database_name"),e("configuration_parameter"),e("value"),e("role_s\
pecification"),e("database_name"),e("configuration_parameter"),e("role_specification"),e("database_name"),e("configurati\
on_parameter"),e("role_specification"),e("database_name"),e("where role_specification can be:"),e("role_name"))}function Za(n){
l(n,`ALTER ROUTINE %s [ ( [ [ %s ] [ %s ] %s [, ...] ] ) ]
    %s [ ... ] [ RESTRICT ]
ALTER ROUTINE %s [ ( [ [ %s ] [ %s ] %s [, ...] ] ) ]
    RENAME TO %s
ALTER ROUTINE %s [ ( [ [ %s ] [ %s ] %s [, ...] ] ) ]
    OWNER TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER }
ALTER ROUTINE %s [ ( [ [ %s ] [ %s ] %s [, ...] ] ) ]
    SET SCHEMA %s
ALTER ROUTINE %s [ ( [ [ %s ] [ %s ] %s [, ...] ] ) ]
    [ NO ] DEPENDS ON EXTENSION %s

%s

    IMMUTABLE | STABLE | VOLATILE
    [ NOT ] LEAKPROOF
    [ EXTERNAL ] SECURITY INVOKER | [ EXTERNAL ] SECURITY DEFINER
    PARALLEL { UNSAFE | RESTRICTED | SAFE }
    COST %s
    ROWS %s
    SET %s { TO | = } { %s | DEFAULT }
    SET %s FROM CURRENT
    RESET %s
    RESET ALL`,e("name"),e("argmode"),e("argname"),e("argtype"),e("action"),e("name"),e("argmode"),e("argname"),e("argty\
pe"),e("new_name"),e("name"),e("argmode"),e("argname"),e("argtype"),e("new_owner"),e("name"),e("argmode"),e("argname"),e(
"argtype"),e("new_schema"),e("name"),e("argmode"),e("argname"),e("argtype"),e("extension_name"),e("where action is one o\
f:"),e("execution_cost"),e("result_rows"),e("configuration_parameter"),e("value"),e("configuration_parameter"),e("config\
uration_parameter"))}function $a(n){l(n,"ALTER RULE %s ON %s RENAME TO %s",e("name"),e("table_name"),e("new_name"))}function es(n){
l(n,`ALTER SCHEMA %s RENAME TO %s
ALTER SCHEMA %s OWNER TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER }`,e("name"),e("new_name"),e("name"),e("new_o\
wner"))}function ns(n){l(n,`ALTER SEQUENCE [ IF EXISTS ] %s
    [ AS %s ]
    [ INCREMENT [ BY ] %s ]
    [ MINVALUE %s | NO MINVALUE ] [ MAXVALUE %s | NO MAXVALUE ]
    [ [ NO ] CYCLE ]
    [ START [ WITH ] %s ]
    [ RESTART [ [ WITH ] %s ] ]
    [ CACHE %s ]
    [ OWNED BY { %s.%s | NONE } ]
ALTER SEQUENCE [ IF EXISTS ] %s SET { LOGGED | UNLOGGED }
ALTER SEQUENCE [ IF EXISTS ] %s OWNER TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER }
ALTER SEQUENCE [ IF EXISTS ] %s RENAME TO %s
ALTER SEQUENCE [ IF EXISTS ] %s SET SCHEMA %s`,e("name"),e("data_type"),e("increment"),e("minvalue"),e("maxvalue"),e("st\
art"),e("restart"),e("cache"),e("table_name"),e("column_name"),e("name"),e("name"),e("new_owner"),e("name"),e("new_name"),
e("name"),e("new_schema"))}function as(n){l(n,`ALTER SERVER %s [ VERSION '%s' ]
    [ OPTIONS ( [ ADD | SET | DROP ] %s ['%s'] [, ... ] ) ]
ALTER SERVER %s OWNER TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER }
ALTER SERVER %s RENAME TO %s`,e("name"),e("new_version"),e("option"),e("value"),e("name"),e("new_owner"),e("name"),e("ne\
w_name"))}function ss(n){l(n,`ALTER STATISTICS %s OWNER TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER }
ALTER STATISTICS %s RENAME TO %s
ALTER STATISTICS %s SET SCHEMA %s
ALTER STATISTICS %s SET STATISTICS { %s | DEFAULT }`,e("name"),e("new_owner"),e("name"),e("new_name"),e("name"),e("new_s\
chema"),e("name"),e("new_target"))}function ts(n){l(n,`ALTER SUBSCRIPTION %s CONNECTION '%s'
ALTER SUBSCRIPTION %s SET PUBLICATION %s [, ...] [ WITH ( %s [= %s] [, ... ] ) ]
ALTER SUBSCRIPTION %s ADD PUBLICATION %s [, ...] [ WITH ( %s [= %s] [, ... ] ) ]
ALTER SUBSCRIPTION %s DROP PUBLICATION %s [, ...] [ WITH ( %s [= %s] [, ... ] ) ]
ALTER SUBSCRIPTION %s REFRESH PUBLICATION [ WITH ( %s [= %s] [, ... ] ) ]
ALTER SUBSCRIPTION %s ENABLE
ALTER SUBSCRIPTION %s DISABLE
ALTER SUBSCRIPTION %s SET ( %s [= %s] [, ... ] )
ALTER SUBSCRIPTION %s SKIP ( %s = %s )
ALTER SUBSCRIPTION %s OWNER TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER }
ALTER SUBSCRIPTION %s RENAME TO %s`,e("name"),e("conninfo"),e("name"),e("publication_name"),e("publication_option"),e("v\
alue"),e("name"),e("publication_name"),e("publication_option"),e("value"),e("name"),e("publication_name"),e("publication\
_option"),e("value"),e("name"),e("refresh_option"),e("value"),e("name"),e("name"),e("name"),e("subscription_parameter"),
e("value"),e("name"),e("skip_option"),e("value"),e("name"),e("new_owner"),e("name"),e("new_name"))}function Es(n){l(n,`A\
LTER SYSTEM SET %s { TO | = } { %s [, ...] | DEFAULT }

ALTER SYSTEM RESET %s
ALTER SYSTEM RESET ALL`,e("configuration_parameter"),e("value"),e("configuration_parameter"))}function is(n){l(n,`ALTER \
TABLE [ IF EXISTS ] [ ONLY ] %s [ * ]
    %s [, ... ]
ALTER TABLE [ IF EXISTS ] [ ONLY ] %s [ * ]
    RENAME [ COLUMN ] %s TO %s
ALTER TABLE [ IF EXISTS ] [ ONLY ] %s [ * ]
    RENAME CONSTRAINT %s TO %s
ALTER TABLE [ IF EXISTS ] %s
    RENAME TO %s
ALTER TABLE [ IF EXISTS ] %s
    SET SCHEMA %s
ALTER TABLE ALL IN TABLESPACE %s [ OWNED BY %s [, ... ] ]
    SET TABLESPACE %s [ NOWAIT ]
ALTER TABLE [ IF EXISTS ] %s
    ATTACH PARTITION %s { FOR VALUES %s | DEFAULT }
ALTER TABLE [ IF EXISTS ] %s
    DETACH PARTITION %s [ CONCURRENTLY | FINALIZE ]

%s

    ADD [ COLUMN ] [ IF NOT EXISTS ] %s %s [ COLLATE %s ] [ %s [ ... ] ]
    DROP [ COLUMN ] [ IF EXISTS ] %s [ RESTRICT | CASCADE ]
    ALTER [ COLUMN ] %s [ SET DATA ] TYPE %s [ COLLATE %s ] [ USING %s ]
    ALTER [ COLUMN ] %s SET DEFAULT %s
    ALTER [ COLUMN ] %s DROP DEFAULT
    ALTER [ COLUMN ] %s { SET | DROP } NOT NULL
    ALTER [ COLUMN ] %s SET EXPRESSION AS ( %s )
    ALTER [ COLUMN ] %s DROP EXPRESSION [ IF EXISTS ]
    ALTER [ COLUMN ] %s ADD GENERATED { ALWAYS | BY DEFAULT } AS IDENTITY [ ( %s ) ]
    ALTER [ COLUMN ] %s { SET GENERATED { ALWAYS | BY DEFAULT } | SET %s | RESTART [ [ WITH ] %s ] } [...]
    ALTER [ COLUMN ] %s DROP IDENTITY [ IF EXISTS ]
    ALTER [ COLUMN ] %s SET STATISTICS { %s | DEFAULT }
    ALTER [ COLUMN ] %s SET ( %s = %s [, ... ] )
    ALTER [ COLUMN ] %s RESET ( %s [, ... ] )
    ALTER [ COLUMN ] %s SET STORAGE { PLAIN | EXTERNAL | EXTENDED | MAIN | DEFAULT }
    ALTER [ COLUMN ] %s SET COMPRESSION %s
    ADD %s [ NOT VALID ]
    ADD %s
    ALTER CONSTRAINT %s [ DEFERRABLE | NOT DEFERRABLE ] [ INITIALLY DEFERRED | INITIALLY IMMEDIATE ] [ ENFORCED | NOT EN\
FORCED ]
    ALTER CONSTRAINT %s [ INHERIT | NO INHERIT ]
    VALIDATE CONSTRAINT %s
    DROP CONSTRAINT [ IF EXISTS ]  %s [ RESTRICT | CASCADE ]
    DISABLE TRIGGER [ %s | ALL | USER ]
    ENABLE TRIGGER [ %s | ALL | USER ]
    ENABLE REPLICA TRIGGER %s
    ENABLE ALWAYS TRIGGER %s
    DISABLE RULE %s
    ENABLE RULE %s
    ENABLE REPLICA RULE %s
    ENABLE ALWAYS RULE %s
    DISABLE ROW LEVEL SECURITY
    ENABLE ROW LEVEL SECURITY
    FORCE ROW LEVEL SECURITY
    NO FORCE ROW LEVEL SECURITY
    CLUSTER ON %s
    SET WITHOUT CLUSTER
    SET WITHOUT OIDS
    SET ACCESS METHOD { %s | DEFAULT }
    SET TABLESPACE %s
    SET { LOGGED | UNLOGGED }
    SET ( %s [= %s] [, ... ] )
    RESET ( %s [, ... ] )
    INHERIT %s
    NO INHERIT %s
    OF %s
    NOT OF
    OWNER TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER }
    REPLICA IDENTITY { DEFAULT | USING INDEX %s | FULL | NOTHING }

%s

IN ( %s [, ...] ) |
FROM ( { %s | MINVALUE | MAXVALUE } [, ...] )
  TO ( { %s | MINVALUE | MAXVALUE } [, ...] ) |
WITH ( MODULUS %s, REMAINDER %s )

%s

[ CONSTRAINT %s ]
{ NOT NULL [ NO INHERIT ] |
  NULL |
  CHECK ( %s ) [ NO INHERIT ] |
  DEFAULT %s |
  GENERATED ALWAYS AS ( %s ) [ STORED | VIRTUAL ] |
  GENERATED { ALWAYS | BY DEFAULT } AS IDENTITY [ ( %s ) ] |
  UNIQUE [ NULLS [ NOT ] DISTINCT ] %s |
  PRIMARY KEY %s |
  REFERENCES %s [ ( %s ) ] [ MATCH FULL | MATCH PARTIAL | MATCH SIMPLE ]
    [ ON DELETE %s ] [ ON UPDATE %s ] }
[ DEFERRABLE | NOT DEFERRABLE ] [ INITIALLY DEFERRED | INITIALLY IMMEDIATE ] [ ENFORCED | NOT ENFORCED ]

%s

[ CONSTRAINT %s ]
{ CHECK ( %s ) [ NO INHERIT ] |
  NOT NULL %s [ NO INHERIT ] |
  UNIQUE [ NULLS [ NOT ] DISTINCT ] ( %s [, ... ] [, %s WITHOUT OVERLAPS ] ) %s |
  PRIMARY KEY ( %s [, ... ] [, %s WITHOUT OVERLAPS ] ) %s |
  EXCLUDE [ USING %s ] ( %s WITH %s [, ... ] ) %s [ WHERE ( %s ) ] |
  FOREIGN KEY ( %s [, ... ] [, PERIOD %s ] ) REFERENCES %s [ ( %s [, ... ]  [, PERIOD %s ] ) ]
    [ MATCH FULL | MATCH PARTIAL | MATCH SIMPLE ] [ ON DELETE %s ] [ ON UPDATE %s ] }
[ DEFERRABLE | NOT DEFERRABLE ] [ INITIALLY DEFERRED | INITIALLY IMMEDIATE ] [ ENFORCED | NOT ENFORCED ]

%s

    [ CONSTRAINT %s ]
    { UNIQUE | PRIMARY KEY } USING INDEX %s
    [ DEFERRABLE | NOT DEFERRABLE ] [ INITIALLY DEFERRED | INITIALLY IMMEDIATE ]

%s

[ INCLUDE ( %s [, ... ] ) ]
[ WITH ( %s [= %s] [, ... ] ) ]
[ USING INDEX TABLESPACE %s ]

%s

{ %s | ( %s ) } [ COLLATE %s ] [ %s [ ( %s = %s [, ... ] ) ] ] [ ASC | DESC ] [ NULLS { FIRST | LAST } ]

%s

{ NO ACTION | RESTRICT | CASCADE | SET NULL [ ( %s [, ... ] ) ] | SET DEFAULT [ ( %s [, ... ] ) ] }`,e("name"),e("action"),
e("name"),e("column_name"),e("new_column_name"),e("name"),e("constraint_name"),e("new_constraint_name"),e("name"),e("new\
_name"),e("name"),e("new_schema"),e("name"),e("role_name"),e("new_tablespace"),e("name"),e("partition_name"),e("partitio\
n_bound_spec"),e("name"),e("partition_name"),e("where action is one of:"),e("column_name"),e("data_type"),e("collation"),
e("column_constraint"),e("column_name"),e("column_name"),e("data_type"),e("collation"),e("expression"),e("column_name"),
e("expression"),e("column_name"),e("column_name"),e("column_name"),e("expression"),e("column_name"),e("column_name"),e("\
sequence_options"),e("column_name"),e("sequence_option"),e("restart"),e("column_name"),e("column_name"),e("integer"),e("\
column_name"),e("attribute_option"),e("value"),e("column_name"),e("attribute_option"),e("column_name"),e("column_name"),
e("compression_method"),e("table_constraint"),e("table_constraint_using_index"),e("constraint_name"),e("constraint_name"),
e("constraint_name"),e("constraint_name"),e("trigger_name"),e("trigger_name"),e("trigger_name"),e("trigger_name"),e("rew\
rite_rule_name"),e("rewrite_rule_name"),e("rewrite_rule_name"),e("rewrite_rule_name"),e("index_name"),e("new_access_meth\
od"),e("new_tablespace"),e("storage_parameter"),e("value"),e("storage_parameter"),e("parent_table"),e("parent_table"),e(
"type_name"),e("new_owner"),e("index_name"),e("and partition_bound_spec is:"),e("partition_bound_expr"),e("partition_bou\
nd_expr"),e("partition_bound_expr"),e("numeric_literal"),e("numeric_literal"),e("and column_constraint is:"),e("constrai\
nt_name"),e("expression"),e("default_expr"),e("generation_expr"),e("sequence_options"),e("index_parameters"),e("index_pa\
rameters"),e("reftable"),e("refcolumn"),e("referential_action"),e("referential_action"),e("and table_constraint is:"),e(
"constraint_name"),e("expression"),e("column_name"),e("column_name"),e("column_name"),e("index_parameters"),e("column_na\
me"),e("column_name"),e("index_parameters"),e("index_method"),e("exclude_element"),e("operator"),e("index_parameters"),e(
"predicate"),e("column_name"),e("column_name"),e("reftable"),e("refcolumn"),e("refcolumn"),e("referential_action"),e("re\
ferential_action"),e("and table_constraint_using_index is:"),e("constraint_name"),e("index_name"),e("index_parameters in\
 UNIQUE, PRIMARY KEY, and EXCLUDE constraints are:"),e("column_name"),e("storage_parameter"),e("value"),e("tablespace_na\
me"),e("exclude_element in an EXCLUDE constraint is:"),e("column_name"),e("expression"),e("collation"),e("opclass"),e("o\
pclass_parameter"),e("value"),e("referential_action in a FOREIGN KEY/REFERENCES constraint is:"),e("column_name"),e("col\
umn_name"))}function os(n){l(n,`ALTER TABLESPACE %s RENAME TO %s
ALTER TABLESPACE %s OWNER TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER }
ALTER TABLESPACE %s SET ( %s = %s [, ... ] )
ALTER TABLESPACE %s RESET ( %s [, ... ] )`,e("name"),e("new_name"),e("name"),e("new_owner"),e("name"),e("tablespace_opti\
on"),e("value"),e("name"),e("tablespace_option"))}function ls(n){l(n,`ALTER TEXT SEARCH CONFIGURATION %s
    ADD MAPPING FOR %s [, ... ] WITH %s [, ... ]
ALTER TEXT SEARCH CONFIGURATION %s
    ALTER MAPPING FOR %s [, ... ] WITH %s [, ... ]
ALTER TEXT SEARCH CONFIGURATION %s
    ALTER MAPPING REPLACE %s WITH %s
ALTER TEXT SEARCH CONFIGURATION %s
    ALTER MAPPING FOR %s [, ... ] REPLACE %s WITH %s
ALTER TEXT SEARCH CONFIGURATION %s
    DROP MAPPING [ IF EXISTS ] FOR %s [, ... ]
ALTER TEXT SEARCH CONFIGURATION %s RENAME TO %s
ALTER TEXT SEARCH CONFIGURATION %s OWNER TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER }
ALTER TEXT SEARCH CONFIGURATION %s SET SCHEMA %s`,e("name"),e("token_type"),e("dictionary_name"),e("name"),e("token_type"),
e("dictionary_name"),e("name"),e("old_dictionary"),e("new_dictionary"),e("name"),e("token_type"),e("old_dictionary"),e("\
new_dictionary"),e("name"),e("token_type"),e("name"),e("new_name"),e("name"),e("new_owner"),e("name"),e("new_schema"))}function rs(n){
l(n,`ALTER TEXT SEARCH DICTIONARY %s (
    %s [ = %s ] [, ... ]
)
ALTER TEXT SEARCH DICTIONARY %s RENAME TO %s
ALTER TEXT SEARCH DICTIONARY %s OWNER TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER }
ALTER TEXT SEARCH DICTIONARY %s SET SCHEMA %s`,e("name"),e("option"),e("value"),e("name"),e("new_name"),e("name"),e("new\
_owner"),e("name"),e("new_schema"))}function cs(n){l(n,`ALTER TEXT SEARCH PARSER %s RENAME TO %s
ALTER TEXT SEARCH PARSER %s SET SCHEMA %s`,e("name"),e("new_name"),e("name"),e("new_schema"))}function _s(n){l(n,`ALTER \
TEXT SEARCH TEMPLATE %s RENAME TO %s
ALTER TEXT SEARCH TEMPLATE %s SET SCHEMA %s`,e("name"),e("new_name"),e("name"),e("new_schema"))}function Ts(n){l(n,`ALTE\
R TRIGGER %s ON %s RENAME TO %s
ALTER TRIGGER %s ON %s [ NO ] DEPENDS ON EXTENSION %s`,e("name"),e("table_name"),e("new_name"),e("name"),e("table_name"),
e("extension_name"))}function ps(n){l(n,`ALTER TYPE %s OWNER TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER }
ALTER TYPE %s RENAME TO %s
ALTER TYPE %s SET SCHEMA %s
ALTER TYPE %s RENAME ATTRIBUTE %s TO %s [ CASCADE | RESTRICT ]
ALTER TYPE %s %s [, ... ]
ALTER TYPE %s ADD VALUE [ IF NOT EXISTS ] %s [ { BEFORE | AFTER } %s ]
ALTER TYPE %s RENAME VALUE %s TO %s
ALTER TYPE %s SET ( %s = %s [, ... ] )

%s

    ADD ATTRIBUTE %s %s [ COLLATE %s ] [ CASCADE | RESTRICT ]
    DROP ATTRIBUTE [ IF EXISTS ] %s [ CASCADE | RESTRICT ]
    ALTER ATTRIBUTE %s [ SET DATA ] TYPE %s [ COLLATE %s ] [ CASCADE | RESTRICT ]`,e("name"),e("new_owner"),e("name"),e(
"new_name"),e("name"),e("new_schema"),e("name"),e("attribute_name"),e("new_attribute_name"),e("name"),e("action"),e("nam\
e"),e("new_enum_value"),e("neighbor_enum_value"),e("name"),e("existing_enum_value"),e("new_enum_value"),e("name"),e("pro\
perty"),e("value"),e("where action is one of:"),e("attribute_name"),e("data_type"),e("collation"),e("attribute_name"),e(
"attribute_name"),e("data_type"),e("collation"))}function Rs(n){l(n,`ALTER USER %s [ WITH ] %s [ ... ]

%s

      SUPERUSER | NOSUPERUSER
    | CREATEDB | NOCREATEDB
    | CREATEROLE | NOCREATEROLE
    | INHERIT | NOINHERIT
    | LOGIN | NOLOGIN
    | REPLICATION | NOREPLICATION
    | BYPASSRLS | NOBYPASSRLS
    | CONNECTION LIMIT %s
    | [ ENCRYPTED ] PASSWORD '%s' | PASSWORD NULL
    | VALID UNTIL '%s'

ALTER USER %s RENAME TO %s

ALTER USER { %s | ALL } [ IN DATABASE %s ] SET %s { TO | = } { %s | DEFAULT }
ALTER USER { %s | ALL } [ IN DATABASE %s ] SET %s FROM CURRENT
ALTER USER { %s | ALL } [ IN DATABASE %s ] RESET %s
ALTER USER { %s | ALL } [ IN DATABASE %s ] RESET ALL

%s

    %s
  | CURRENT_ROLE
  | CURRENT_USER
  | SESSION_USER`,e("role_specification"),e("option"),e("where option can be:"),e("connlimit"),e("password"),e("timestam\
p"),e("name"),e("new_name"),e("role_specification"),e("database_name"),e("configuration_parameter"),e("value"),e("role_s\
pecification"),e("database_name"),e("configuration_parameter"),e("role_specification"),e("database_name"),e("configurati\
on_parameter"),e("role_specification"),e("database_name"),e("where role_specification can be:"),e("role_name"))}function As(n){
l(n,`ALTER USER MAPPING FOR { %s | USER | CURRENT_ROLE | CURRENT_USER | SESSION_USER | PUBLIC }
    SERVER %s
    OPTIONS ( [ ADD | SET | DROP ] %s ['%s'] [, ... ] )`,e("user_name"),e("server_name"),e("option"),e("value"))}function Ns(n){
l(n,`ALTER VIEW [ IF EXISTS ] %s ALTER [ COLUMN ] %s SET DEFAULT %s
ALTER VIEW [ IF EXISTS ] %s ALTER [ COLUMN ] %s DROP DEFAULT
ALTER VIEW [ IF EXISTS ] %s OWNER TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER }
ALTER VIEW [ IF EXISTS ] %s RENAME [ COLUMN ] %s TO %s
ALTER VIEW [ IF EXISTS ] %s RENAME TO %s
ALTER VIEW [ IF EXISTS ] %s SET SCHEMA %s
ALTER VIEW [ IF EXISTS ] %s SET ( %s [= %s] [, ... ] )
ALTER VIEW [ IF EXISTS ] %s RESET ( %s [, ... ] )`,e("name"),e("column_name"),e("expression"),e("name"),e("column_name"),
e("name"),e("new_owner"),e("name"),e("column_name"),e("new_column_name"),e("name"),e("new_name"),e("name"),e("new_schema"),
e("name"),e("view_option_name"),e("view_option_value"),e("name"),e("view_option_name"))}function Ls(n){l(n,`ANALYZE [ ( \
%s [, ...] ) ] [ %s [, ...] ]

%s

    VERBOSE [ %s ]
    SKIP_LOCKED [ %s ]
    BUFFER_USAGE_LIMIT %s

%s

    [ ONLY ] %s [ * ] [ ( %s [, ...] ) ]`,e("option"),e("table_and_columns"),e("where option can be one of:"),e("boolean"),
e("boolean"),e("size"),e("and table_and_columns is:"),e("table_name"),e("column_name"))}function Ss(n){l(n,`BEGIN [ WORK\
 | TRANSACTION ] [ %s [, ...] ]

%s

    ISOLATION LEVEL { SERIALIZABLE | REPEATABLE READ | READ COMMITTED | READ UNCOMMITTED }
    READ WRITE | READ ONLY
    [ NOT ] DEFERRABLE`,e("transaction_mode"),e("where transaction_mode is one of:"))}function gs(n){l(n,"CALL %s ( [ %s\
 ] [, ...] )",e("name"),e("argument"))}function Os(n){l(n,"CHECKPOINT")}function fs(n){l(n,"CLOSE { %s | ALL }",e("name"))}
function ms(n){l(n,`CLUSTER [ ( %s [, ...] ) ] [ %s [ USING %s ] ]

%s

    VERBOSE [ %s ]`,e("option"),e("table_name"),e("index_name"),e("where option can be one of:"),e("boolean"))}function Is(n){
l(n,`COMMENT ON
{
  ACCESS METHOD %s |
  AGGREGATE %s ( %s ) |
  CAST (%s AS %s) |
  COLLATION %s |
  COLUMN %s.%s |
  CONSTRAINT %s ON %s |
  CONSTRAINT %s ON DOMAIN %s |
  CONVERSION %s |
  DATABASE %s |
  DOMAIN %s |
  EXTENSION %s |
  EVENT TRIGGER %s |
  FOREIGN DATA WRAPPER %s |
  FOREIGN TABLE %s |
  FUNCTION %s [ ( [ [ %s ] [ %s ] %s [, ...] ] ) ] |
  INDEX %s |
  LARGE OBJECT %s |
  MATERIALIZED VIEW %s |
  OPERATOR %s (%s, %s) |
  OPERATOR CLASS %s USING %s |
  OPERATOR FAMILY %s USING %s |
  POLICY %s ON %s |
  [ PROCEDURAL ] LANGUAGE %s |
  PROCEDURE %s [ ( [ [ %s ] [ %s ] %s [, ...] ] ) ] |
  PUBLICATION %s |
  ROLE %s |
  ROUTINE %s [ ( [ [ %s ] [ %s ] %s [, ...] ] ) ] |
  RULE %s ON %s |
  SCHEMA %s |
  SEQUENCE %s |
  SERVER %s |
  STATISTICS %s |
  SUBSCRIPTION %s |
  TABLE %s |
  TABLESPACE %s |
  TEXT SEARCH CONFIGURATION %s |
  TEXT SEARCH DICTIONARY %s |
  TEXT SEARCH PARSER %s |
  TEXT SEARCH TEMPLATE %s |
  TRANSFORM FOR %s LANGUAGE %s |
  TRIGGER %s ON %s |
  TYPE %s |
  VIEW %s
} IS { %s | NULL }

%s

* |
[ %s ] [ %s ] %s [ , ... ] |
[ [ %s ] [ %s ] %s [ , ... ] ] ORDER BY [ %s ] [ %s ] %s [ , ... ]`,e("object_name"),e("aggregate_name"),e("aggregate_si\
gnature"),e("source_type"),e("target_type"),e("object_name"),e("relation_name"),e("column_name"),e("constraint_name"),e(
"table_name"),e("constraint_name"),e("domain_name"),e("object_name"),e("object_name"),e("object_name"),e("object_name"),
e("object_name"),e("object_name"),e("object_name"),e("function_name"),e("argmode"),e("argname"),e("argtype"),e("object_n\
ame"),e("large_object_oid"),e("object_name"),e("operator_name"),e("left_type"),e("right_type"),e("object_name"),e("index\
_method"),e("object_name"),e("index_method"),e("policy_name"),e("table_name"),e("object_name"),e("procedure_name"),e("ar\
gmode"),e("argname"),e("argtype"),e("object_name"),e("object_name"),e("routine_name"),e("argmode"),e("argname"),e("argty\
pe"),e("rule_name"),e("table_name"),e("object_name"),e("object_name"),e("object_name"),e("object_name"),e("object_name"),
e("object_name"),e("object_name"),e("object_name"),e("object_name"),e("object_name"),e("object_name"),e("type_name"),e("\
lang_name"),e("trigger_name"),e("table_name"),e("object_name"),e("object_name"),e("string_literal"),e("where aggregate_s\
ignature is:"),e("argmode"),e("argname"),e("argtype"),e("argmode"),e("argname"),e("argtype"),e("argmode"),e("argname"),e(
"argtype"))}function us(n){l(n,"COMMIT [ WORK | TRANSACTION ] [ AND [ NO ] CHAIN ]")}function ds(n){l(n,"COMMIT PREPARED\
 %s",e("transaction_id"))}function Cs(n){l(n,`COPY %s [ ( %s [, ...] ) ]
    FROM { '%s' | PROGRAM '%s' | STDIN }
    [ [ WITH ] ( %s [, ...] ) ]
    [ WHERE %s ]

COPY { %s [ ( %s [, ...] ) ] | ( %s ) }
    TO { '%s' | PROGRAM '%s' | STDOUT }
    [ [ WITH ] ( %s [, ...] ) ]

%s

    FORMAT %s
    FREEZE [ %s ]
    DELIMITER '%s'
    NULL '%s'
    DEFAULT '%s'
    HEADER [ %s | MATCH ]
    QUOTE '%s'
    ESCAPE '%s'
    FORCE_QUOTE { ( %s [, ...] ) | * }
    FORCE_NOT_NULL { ( %s [, ...] ) | * }
    FORCE_NULL { ( %s [, ...] ) | * }
    ON_ERROR %s
    REJECT_LIMIT %s
    ENCODING '%s'
    LOG_VERBOSITY %s`,e("table_name"),e("column_name"),e("filename"),e("command"),e("option"),e("condition"),e("table_na\
me"),e("column_name"),e("query"),e("filename"),e("command"),e("option"),e("where option can be one of:"),e("format_name"),
e("boolean"),e("delimiter_character"),e("null_string"),e("default_string"),e("boolean"),e("quote_character"),e("escape_c\
haracter"),e("column_name"),e("column_name"),e("column_name"),e("error_action"),e("maxerror"),e("encoding_name"),e("verb\
osity"))}function Ds(n){l(n,`CREATE ACCESS METHOD %s
    TYPE %s
    HANDLER %s`,e("name"),e("access_method_type"),e("handler_function"))}function Us(n){l(n,`CREATE [ OR REPLACE ] AGGRE\
GATE %s ( [ %s ] [ %s ] %s [ , ... ] ) (
    SFUNC = %s,
    STYPE = %s
    [ , SSPACE = %s ]
    [ , FINALFUNC = %s ]
    [ , FINALFUNC_EXTRA ]
    [ , FINALFUNC_MODIFY = { READ_ONLY | SHAREABLE | READ_WRITE } ]
    [ , COMBINEFUNC = %s ]
    [ , SERIALFUNC = %s ]
    [ , DESERIALFUNC = %s ]
    [ , INITCOND = %s ]
    [ , MSFUNC = %s ]
    [ , MINVFUNC = %s ]
    [ , MSTYPE = %s ]
    [ , MSSPACE = %s ]
    [ , MFINALFUNC = %s ]
    [ , MFINALFUNC_EXTRA ]
    [ , MFINALFUNC_MODIFY = { READ_ONLY | SHAREABLE | READ_WRITE } ]
    [ , MINITCOND = %s ]
    [ , SORTOP = %s ]
    [ , PARALLEL = { SAFE | RESTRICTED | UNSAFE } ]
)

CREATE [ OR REPLACE ] AGGREGATE %s ( [ [ %s ] [ %s ] %s [ , ... ] ]
                        ORDER BY [ %s ] [ %s ] %s [ , ... ] ) (
    SFUNC = %s,
    STYPE = %s
    [ , SSPACE = %s ]
    [ , FINALFUNC = %s ]
    [ , FINALFUNC_EXTRA ]
    [ , FINALFUNC_MODIFY = { READ_ONLY | SHAREABLE | READ_WRITE } ]
    [ , INITCOND = %s ]
    [ , PARALLEL = { SAFE | RESTRICTED | UNSAFE } ]
    [ , HYPOTHETICAL ]
)

%s

CREATE [ OR REPLACE ] AGGREGATE %s (
    BASETYPE = %s,
    SFUNC = %s,
    STYPE = %s
    [ , SSPACE = %s ]
    [ , FINALFUNC = %s ]
    [ , FINALFUNC_EXTRA ]
    [ , FINALFUNC_MODIFY = { READ_ONLY | SHAREABLE | READ_WRITE } ]
    [ , COMBINEFUNC = %s ]
    [ , SERIALFUNC = %s ]
    [ , DESERIALFUNC = %s ]
    [ , INITCOND = %s ]
    [ , MSFUNC = %s ]
    [ , MINVFUNC = %s ]
    [ , MSTYPE = %s ]
    [ , MSSPACE = %s ]
    [ , MFINALFUNC = %s ]
    [ , MFINALFUNC_EXTRA ]
    [ , MFINALFUNC_MODIFY = { READ_ONLY | SHAREABLE | READ_WRITE } ]
    [ , MINITCOND = %s ]
    [ , SORTOP = %s ]
)`,e("name"),e("argmode"),e("argname"),e("arg_data_type"),e("sfunc"),e("state_data_type"),e("state_data_size"),e("ffunc"),
e("combinefunc"),e("serialfunc"),e("deserialfunc"),e("initial_condition"),e("msfunc"),e("minvfunc"),e("mstate_data_type"),
e("mstate_data_size"),e("mffunc"),e("minitial_condition"),e("sort_operator"),e("name"),e("argmode"),e("argname"),e("arg_\
data_type"),e("argmode"),e("argname"),e("arg_data_type"),e("sfunc"),e("state_data_type"),e("state_data_size"),e("ffunc"),
e("initial_condition"),e("or the old syntax"),e("name"),e("base_type"),e("sfunc"),e("state_data_type"),e("state_data_siz\
e"),e("ffunc"),e("combinefunc"),e("serialfunc"),e("deserialfunc"),e("initial_condition"),e("msfunc"),e("minvfunc"),e("ms\
tate_data_type"),e("mstate_data_size"),e("mffunc"),e("minitial_condition"),e("sort_operator"))}function Ps(n){l(n,`CREAT\
E CAST (%s AS %s)
    WITH FUNCTION %s [ (%s [, ...]) ]
    [ AS ASSIGNMENT | AS IMPLICIT ]

CREATE CAST (%s AS %s)
    WITHOUT FUNCTION
    [ AS ASSIGNMENT | AS IMPLICIT ]

CREATE CAST (%s AS %s)
    WITH INOUT
    [ AS ASSIGNMENT | AS IMPLICIT ]`,e("source_type"),e("target_type"),e("function_name"),e("argument_type"),e("source_t\
ype"),e("target_type"),e("source_type"),e("target_type"))}function bs(n){l(n,`CREATE COLLATION [ IF NOT EXISTS ] %s (
    [ LOCALE = %s, ]
    [ LC_COLLATE = %s, ]
    [ LC_CTYPE = %s, ]
    [ PROVIDER = %s, ]
    [ DETERMINISTIC = %s, ]
    [ RULES = %s, ]
    [ VERSION = %s ]
)
CREATE COLLATION [ IF NOT EXISTS ] %s FROM %s`,e("name"),e("locale"),e("lc_collate"),e("lc_ctype"),e("provider"),e("bool\
ean"),e("rules"),e("version"),e("name"),e("existing_collation"))}function hs(n){l(n,`CREATE [ DEFAULT ] CONVERSION %s
    FOR %s TO %s FROM %s`,e("name"),e("source_encoding"),e("dest_encoding"),e("function_name"))}function Fs(n){l(n,`CREA\
TE DATABASE %s
    [ WITH ] [ OWNER [=] %s ]
           [ TEMPLATE [=] %s ]
           [ ENCODING [=] %s ]
           [ STRATEGY [=] %s ]
           [ LOCALE [=] %s ]
           [ LC_COLLATE [=] %s ]
           [ LC_CTYPE [=] %s ]
           [ BUILTIN_LOCALE [=] %s ]
           [ ICU_LOCALE [=] %s ]
           [ ICU_RULES [=] %s ]
           [ LOCALE_PROVIDER [=] %s ]
           [ COLLATION_VERSION = %s ]
           [ TABLESPACE [=] %s ]
           [ ALLOW_CONNECTIONS [=] %s ]
           [ CONNECTION LIMIT [=] %s ]
           [ IS_TEMPLATE [=] %s ]
           [ OID [=] %s ]`,e("name"),e("user_name"),e("template"),e("encoding"),e("strategy"),e("locale"),e("lc_collate"),
e("lc_ctype"),e("builtin_locale"),e("icu_locale"),e("icu_rules"),e("locale_provider"),e("collation_version"),e("tablespa\
ce_name"),e("allowconn"),e("connlimit"),e("istemplate"),e("oid"))}function ys(n){l(n,`CREATE DOMAIN %s [ AS ] %s
    [ COLLATE %s ]
    [ DEFAULT %s ]
    [ %s [ ... ] ]

%s

[ CONSTRAINT %s ]
{ NOT NULL | NULL | CHECK (%s) }`,e("name"),e("data_type"),e("collation"),e("expression"),e("domain_constraint"),e("wher\
e domain_constraint is:"),e("constraint_name"),e("expression"))}function Hs(n){l(n,`CREATE EVENT TRIGGER %s
    ON %s
    [ WHEN %s IN (%s [, ... ]) [ AND ... ] ]
    EXECUTE { FUNCTION | PROCEDURE } %s()`,e("name"),e("event"),e("filter_variable"),e("filter_value"),e("function_name"))}
function Ms(n){l(n,`CREATE EXTENSION [ IF NOT EXISTS ] %s
    [ WITH ] [ SCHEMA %s ]
             [ VERSION %s ]
             [ CASCADE ]`,e("extension_name"),e("schema_name"),e("version"))}function ws(n){l(n,`CREATE FOREIGN DATA WRA\
PPER %s
    [ HANDLER %s | NO HANDLER ]
    [ VALIDATOR %s | NO VALIDATOR ]
    [ OPTIONS ( %s '%s' [, ... ] ) ]`,e("name"),e("handler_function"),e("validator_function"),e("option"),e("value"))}function Gs(n){
l(n,`CREATE FOREIGN TABLE [ IF NOT EXISTS ] %s ( [
  { %s %s [ OPTIONS ( %s '%s' [, ... ] ) ] [ COLLATE %s ] [ %s [ ... ] ]
    | %s
    | LIKE %s [ %s ... ] }
    [, ... ]
] )
[ INHERITS ( %s [, ... ] ) ]
  SERVER %s
[ OPTIONS ( %s '%s' [, ... ] ) ]

CREATE FOREIGN TABLE [ IF NOT EXISTS ] %s
  PARTITION OF %s [ (
  { %s [ WITH OPTIONS ] [ %s [ ... ] ]
    | %s }
    [, ... ]
) ]
{ FOR VALUES %s | DEFAULT }
  SERVER %s
[ OPTIONS ( %s '%s' [, ... ] ) ]

%s

[ CONSTRAINT %s ]
{ NOT NULL [ NO INHERIT ] |
  NULL |
  CHECK ( %s ) [ NO INHERIT ] |
  DEFAULT %s |
  GENERATED ALWAYS AS ( %s ) [ STORED | VIRTUAL ] }
[ ENFORCED | NOT ENFORCED ]

%s

[ CONSTRAINT %s ]
{  NOT NULL %s [ NO INHERIT ] |
   CHECK ( %s ) [ NO INHERIT ] }
[ ENFORCED | NOT ENFORCED ]

%s

{ INCLUDING | EXCLUDING } { COMMENTS | CONSTRAINTS | DEFAULTS | GENERATED | STATISTICS | ALL }

%s

IN ( %s [, ...] ) |
FROM ( { %s | MINVALUE | MAXVALUE } [, ...] )
  TO ( { %s | MINVALUE | MAXVALUE } [, ...] ) |
WITH ( MODULUS %s, REMAINDER %s )`,e("table_name"),e("column_name"),e("data_type"),e("option"),e("value"),e("collation"),
e("column_constraint"),e("table_constraint"),e("source_table"),e("like_option"),e("parent_table"),e("server_name"),e("op\
tion"),e("value"),e("table_name"),e("parent_table"),e("column_name"),e("column_constraint"),e("table_constraint"),e("par\
tition_bound_spec"),e("server_name"),e("option"),e("value"),e("where column_constraint is:"),e("constraint_name"),e("exp\
ression"),e("default_expr"),e("generation_expr"),e("and table_constraint is:"),e("constraint_name"),e("column_name"),e("\
expression"),e("and like_option is:"),e("and partition_bound_spec is:"),e("partition_bound_expr"),e("partition_bound_exp\
r"),e("partition_bound_expr"),e("numeric_literal"),e("numeric_literal"))}function Ws(n){l(n,`CREATE [ OR REPLACE ] FUNCT\
ION
    %s ( [ [ %s ] [ %s ] %s [ { DEFAULT | = } %s ] [, ...] ] )
    [ RETURNS %s
      | RETURNS TABLE ( %s %s [, ...] ) ]
  { LANGUAGE %s
    | TRANSFORM { FOR TYPE %s } [, ... ]
    | WINDOW
    | { IMMUTABLE | STABLE | VOLATILE }
    | [ NOT ] LEAKPROOF
    | { CALLED ON NULL INPUT | RETURNS NULL ON NULL INPUT | STRICT }
    | { [ EXTERNAL ] SECURITY INVOKER | [ EXTERNAL ] SECURITY DEFINER }
    | PARALLEL { UNSAFE | RESTRICTED | SAFE }
    | COST %s
    | ROWS %s
    | SUPPORT %s
    | SET %s { TO %s | = %s | FROM CURRENT }
    | AS '%s'
    | AS '%s', '%s'
    | %s
  } ...`,e("name"),e("argmode"),e("argname"),e("argtype"),e("default_expr"),e("rettype"),e("column_name"),e("column_type"),
e("lang_name"),e("type_name"),e("execution_cost"),e("result_rows"),e("support_function"),e("configuration_parameter"),e(
"value"),e("value"),e("definition"),e("obj_file"),e("link_symbol"),e("sql_body"))}function Bs(n){l(n,`CREATE GROUP %s [ \
[ WITH ] %s [ ... ] ]

%s

      SUPERUSER | NOSUPERUSER
    | CREATEDB | NOCREATEDB
    | CREATEROLE | NOCREATEROLE
    | INHERIT | NOINHERIT
    | LOGIN | NOLOGIN
    | REPLICATION | NOREPLICATION
    | BYPASSRLS | NOBYPASSRLS
    | CONNECTION LIMIT %s
    | [ ENCRYPTED ] PASSWORD '%s' | PASSWORD NULL
    | VALID UNTIL '%s'
    | IN ROLE %s [, ...]
    | IN GROUP %s [, ...]
    | ROLE %s [, ...]
    | ADMIN %s [, ...]
    | USER %s [, ...]
    | SYSID %s`,e("name"),e("option"),e("where option can be:"),e("connlimit"),e("password"),e("timestamp"),e("role_name"),
e("role_name"),e("role_name"),e("role_name"),e("role_name"),e("uid"))}function vs(n){l(n,`CREATE [ UNIQUE ] INDEX [ CONC\
URRENTLY ] [ [ IF NOT EXISTS ] %s ] ON [ ONLY ] %s [ USING %s ]
    ( { %s | ( %s ) } [ COLLATE %s ] [ %s [ ( %s = %s [, ... ] ) ] ] [ ASC | DESC ] [ NULLS { FIRST | LAST } ] [, ...] )\

    [ INCLUDE ( %s [, ...] ) ]
    [ NULLS [ NOT ] DISTINCT ]
    [ WITH ( %s [= %s] [, ... ] ) ]
    [ TABLESPACE %s ]
    [ WHERE %s ]`,e("name"),e("table_name"),e("method"),e("column_name"),e("expression"),e("collation"),e("opclass"),e("\
opclass_parameter"),e("value"),e("column_name"),e("storage_parameter"),e("value"),e("tablespace_name"),e("predicate"))}function qs(n){
l(n,`CREATE [ OR REPLACE ] [ TRUSTED ] [ PROCEDURAL ] LANGUAGE %s
    HANDLER %s [ INLINE %s ] [ VALIDATOR %s ]
CREATE [ OR REPLACE ] [ TRUSTED ] [ PROCEDURAL ] LANGUAGE %s`,e("name"),e("call_handler"),e("inline_handler"),e("valfunc\
tion"),e("name"))}function Ys(n){l(n,`CREATE MATERIALIZED VIEW [ IF NOT EXISTS ] %s
    [ (%s [, ...] ) ]
    [ USING %s ]
    [ WITH ( %s [= %s] [, ... ] ) ]
    [ TABLESPACE %s ]
    AS %s
    [ WITH [ NO ] DATA ]`,e("table_name"),e("column_name"),e("method"),e("storage_parameter"),e("value"),e("tablespace_n\
ame"),e("query"))}function xs(n){l(n,`CREATE OPERATOR %s (
    {FUNCTION|PROCEDURE} = %s
    [, LEFTARG = %s ] [, RIGHTARG = %s ]
    [, COMMUTATOR = %s ] [, NEGATOR = %s ]
    [, RESTRICT = %s ] [, JOIN = %s ]
    [, HASHES ] [, MERGES ]
)`,e("name"),e("function_name"),e("left_type"),e("right_type"),e("com_op"),e("neg_op"),e("res_proc"),e("join_proc"))}function Vs(n){
l(n,`CREATE OPERATOR CLASS %s [ DEFAULT ] FOR TYPE %s
  USING %s [ FAMILY %s ] AS
  {  OPERATOR %s %s [ ( %s, %s ) ] [ FOR SEARCH | FOR ORDER BY %s ]
   | FUNCTION %s [ ( %s [ , %s ] ) ] %s ( %s [, ...] )
   | STORAGE %s
  } [, ... ]`,e("name"),e("data_type"),e("index_method"),e("family_name"),e("strategy_number"),e("operator_name"),e("op_\
type"),e("op_type"),e("sort_family_name"),e("support_number"),e("op_type"),e("op_type"),e("function_name"),e("argument_t\
ype"),e("storage_type"))}function Xs(n){l(n,"CREATE OPERATOR FAMILY %s USING %s",e("name"),e("index_method"))}function ks(n){
l(n,`CREATE POLICY %s ON %s
    [ AS { PERMISSIVE | RESTRICTIVE } ]
    [ FOR { ALL | SELECT | INSERT | UPDATE | DELETE } ]
    [ TO { %s | PUBLIC | CURRENT_ROLE | CURRENT_USER | SESSION_USER } [, ...] ]
    [ USING ( %s ) ]
    [ WITH CHECK ( %s ) ]`,e("name"),e("table_name"),e("role_name"),e("using_expression"),e("check_expression"))}function Ks(n){
l(n,`CREATE [ OR REPLACE ] PROCEDURE
    %s ( [ [ %s ] [ %s ] %s [ { DEFAULT | = } %s ] [, ...] ] )
  { LANGUAGE %s
    | TRANSFORM { FOR TYPE %s } [, ... ]
    | [ EXTERNAL ] SECURITY INVOKER | [ EXTERNAL ] SECURITY DEFINER
    | SET %s { TO %s | = %s | FROM CURRENT }
    | AS '%s'
    | AS '%s', '%s'
    | %s
  } ...`,e("name"),e("argmode"),e("argname"),e("argtype"),e("default_expr"),e("lang_name"),e("type_name"),e("configurati\
on_parameter"),e("value"),e("value"),e("definition"),e("obj_file"),e("link_symbol"),e("sql_body"))}function js(n){l(n,`C\
REATE PUBLICATION %s
    [ FOR ALL TABLES
      | FOR %s [, ... ] ]
    [ WITH ( %s [= %s] [, ... ] ) ]

%s

    TABLE [ ONLY ] %s [ * ] [ ( %s [, ... ] ) ] [ WHERE ( %s ) ] [, ... ]
    TABLES IN SCHEMA { %s | CURRENT_SCHEMA } [, ... ]`,e("name"),e("publication_object"),e("publication_parameter"),e("v\
alue"),e("where publication_object is one of:"),e("table_name"),e("column_name"),e("expression"),e("schema_name"))}function Js(n){
l(n,`CREATE ROLE %s [ [ WITH ] %s [ ... ] ]

%s

      SUPERUSER | NOSUPERUSER
    | CREATEDB | NOCREATEDB
    | CREATEROLE | NOCREATEROLE
    | INHERIT | NOINHERIT
    | LOGIN | NOLOGIN
    | REPLICATION | NOREPLICATION
    | BYPASSRLS | NOBYPASSRLS
    | CONNECTION LIMIT %s
    | [ ENCRYPTED ] PASSWORD '%s' | PASSWORD NULL
    | VALID UNTIL '%s'
    | IN ROLE %s [, ...]
    | ROLE %s [, ...]
    | ADMIN %s [, ...]
    | SYSID %s`,e("name"),e("option"),e("where option can be:"),e("connlimit"),e("password"),e("timestamp"),e("role_name"),
e("role_name"),e("role_name"),e("uid"))}function Qs(n){l(n,`CREATE [ OR REPLACE ] RULE %s AS ON %s
    TO %s [ WHERE %s ]
    DO [ ALSO | INSTEAD ] { NOTHING | %s | ( %s ; %s ... ) }

%s

    SELECT | INSERT | UPDATE | DELETE`,e("name"),e("event"),e("table_name"),e("condition"),e("command"),e("command"),e("\
command"),e("where event can be one of:"))}function zs(n){l(n,`CREATE SCHEMA %s [ AUTHORIZATION %s ] [ %s [ ... ] ]
CREATE SCHEMA AUTHORIZATION %s [ %s [ ... ] ]
CREATE SCHEMA IF NOT EXISTS %s [ AUTHORIZATION %s ]
CREATE SCHEMA IF NOT EXISTS AUTHORIZATION %s

%s

    %s
  | CURRENT_ROLE
  | CURRENT_USER
  | SESSION_USER`,e("schema_name"),e("role_specification"),e("schema_element"),e("role_specification"),e("schema_element"),
e("schema_name"),e("role_specification"),e("role_specification"),e("where role_specification can be:"),e("user_name"))}function Zs(n){
l(n,`CREATE [ { TEMPORARY | TEMP } | UNLOGGED ] SEQUENCE [ IF NOT EXISTS ] %s
    [ AS %s ]
    [ INCREMENT [ BY ] %s ]
    [ MINVALUE %s | NO MINVALUE ] [ MAXVALUE %s | NO MAXVALUE ]
    [ [ NO ] CYCLE ]
    [ START [ WITH ] %s ]
    [ CACHE %s ]
    [ OWNED BY { %s.%s | NONE } ]`,e("name"),e("data_type"),e("increment"),e("minvalue"),e("maxvalue"),e("start"),e("cac\
he"),e("table_name"),e("column_name"))}function $s(n){l(n,`CREATE SERVER [ IF NOT EXISTS ] %s [ TYPE '%s' ] [ VERSION '%\
s' ]
    FOREIGN DATA WRAPPER %s
    [ OPTIONS ( %s '%s' [, ... ] ) ]`,e("server_name"),e("server_type"),e("server_version"),e("fdw_name"),e("option"),e(
"value"))}function et(n){l(n,`CREATE STATISTICS [ [ IF NOT EXISTS ] %s ]
    ON ( %s )
    FROM %s

CREATE STATISTICS [ [ IF NOT EXISTS ] %s ]
    [ ( %s [, ... ] ) ]
    ON { %s | ( %s ) }, { %s | ( %s ) } [, ...]
    FROM %s`,e("statistics_name"),e("expression"),e("table_name"),e("statistics_name"),e("statistics_kind"),e("column_na\
me"),e("expression"),e("column_name"),e("expression"),e("table_name"))}function nt(n){l(n,`CREATE SUBSCRIPTION %s
    CONNECTION '%s'
    PUBLICATION %s [, ...]
    [ WITH ( %s [= %s] [, ... ] ) ]`,e("subscription_name"),e("conninfo"),e("publication_name"),e("subscription_paramete\
r"),e("value"))}function at(n){l(n,`CREATE [ [ GLOBAL | LOCAL ] { TEMPORARY | TEMP } | UNLOGGED ] TABLE [ IF NOT EXISTS \
] %s ( [
  { %s %s [ STORAGE { PLAIN | EXTERNAL | EXTENDED | MAIN | DEFAULT } ] [ COMPRESSION %s ] [ COLLATE %s ] [ %s [ ... ] ]
    | %s
    | LIKE %s [ %s ... ] }
    [, ... ]
] )
[ INHERITS ( %s [, ... ] ) ]
[ PARTITION BY { RANGE | LIST | HASH } ( { %s | ( %s ) } [ COLLATE %s ] [ %s ] [, ... ] ) ]
[ USING %s ]
[ WITH ( %s [= %s] [, ... ] ) | WITHOUT OIDS ]
[ ON COMMIT { PRESERVE ROWS | DELETE ROWS | DROP } ]
[ TABLESPACE %s ]

CREATE [ [ GLOBAL | LOCAL ] { TEMPORARY | TEMP } | UNLOGGED ] TABLE [ IF NOT EXISTS ] %s
    OF %s [ (
  { %s [ WITH OPTIONS ] [ %s [ ... ] ]
    | %s }
    [, ... ]
) ]
[ PARTITION BY { RANGE | LIST | HASH } ( { %s | ( %s ) } [ COLLATE %s ] [ %s ] [, ... ] ) ]
[ USING %s ]
[ WITH ( %s [= %s] [, ... ] ) | WITHOUT OIDS ]
[ ON COMMIT { PRESERVE ROWS | DELETE ROWS | DROP } ]
[ TABLESPACE %s ]

CREATE [ [ GLOBAL | LOCAL ] { TEMPORARY | TEMP } | UNLOGGED ] TABLE [ IF NOT EXISTS ] %s
    PARTITION OF %s [ (
  { %s [ WITH OPTIONS ] [ %s [ ... ] ]
    | %s }
    [, ... ]
) ] { FOR VALUES %s | DEFAULT }
[ PARTITION BY { RANGE | LIST | HASH } ( { %s | ( %s ) } [ COLLATE %s ] [ %s ] [, ... ] ) ]
[ USING %s ]
[ WITH ( %s [= %s] [, ... ] ) | WITHOUT OIDS ]
[ ON COMMIT { PRESERVE ROWS | DELETE ROWS | DROP } ]
[ TABLESPACE %s ]

%s

[ CONSTRAINT %s ]
{ NOT NULL [ NO INHERIT ]  |
  NULL |
  CHECK ( %s ) [ NO INHERIT ] |
  DEFAULT %s |
  GENERATED ALWAYS AS ( %s ) [ STORED | VIRTUAL ] |
  GENERATED { ALWAYS | BY DEFAULT } AS IDENTITY [ ( %s ) ] |
  UNIQUE [ NULLS [ NOT ] DISTINCT ] %s |
  PRIMARY KEY %s |
  REFERENCES %s [ ( %s ) ] [ MATCH FULL | MATCH PARTIAL | MATCH SIMPLE ]
    [ ON DELETE %s ] [ ON UPDATE %s ] }
[ DEFERRABLE | NOT DEFERRABLE ] [ INITIALLY DEFERRED | INITIALLY IMMEDIATE ] [ ENFORCED | NOT ENFORCED ]

%s

[ CONSTRAINT %s ]
{ CHECK ( %s ) [ NO INHERIT ] |
  NOT NULL %s [ NO INHERIT ] |
  UNIQUE [ NULLS [ NOT ] DISTINCT ] ( %s [, ... ] [, %s WITHOUT OVERLAPS ] ) %s |
  PRIMARY KEY ( %s [, ... ] [, %s WITHOUT OVERLAPS ] ) %s |
  EXCLUDE [ USING %s ] ( %s WITH %s [, ... ] ) %s [ WHERE ( %s ) ] |
  FOREIGN KEY ( %s [, ... ] [, PERIOD %s ] ) REFERENCES %s [ ( %s [, ... ] [, PERIOD %s ] ) ]
    [ MATCH FULL | MATCH PARTIAL | MATCH SIMPLE ] [ ON DELETE %s ] [ ON UPDATE %s ] }
[ DEFERRABLE | NOT DEFERRABLE ] [ INITIALLY DEFERRED | INITIALLY IMMEDIATE ] [ ENFORCED | NOT ENFORCED ]

%s

{ INCLUDING | EXCLUDING } { COMMENTS | COMPRESSION | CONSTRAINTS | DEFAULTS | GENERATED | IDENTITY | INDEXES | STATISTIC\
S | STORAGE | ALL }

%s

IN ( %s [, ...] ) |
FROM ( { %s | MINVALUE | MAXVALUE } [, ...] )
  TO ( { %s | MINVALUE | MAXVALUE } [, ...] ) |
WITH ( MODULUS %s, REMAINDER %s )

%s

[ INCLUDE ( %s [, ... ] ) ]
[ WITH ( %s [= %s] [, ... ] ) ]
[ USING INDEX TABLESPACE %s ]

%s

{ %s | ( %s ) } [ COLLATE %s ] [ %s [ ( %s = %s [, ... ] ) ] ] [ ASC | DESC ] [ NULLS { FIRST | LAST } ]

%s

{ NO ACTION | RESTRICT | CASCADE | SET NULL [ ( %s [, ... ] ) ] | SET DEFAULT [ ( %s [, ... ] ) ] }`,e("table_name"),e("\
column_name"),e("data_type"),e("compression_method"),e("collation"),e("column_constraint"),e("table_constraint"),e("sour\
ce_table"),e("like_option"),e("parent_table"),e("column_name"),e("expression"),e("collation"),e("opclass"),e("method"),e(
"storage_parameter"),e("value"),e("tablespace_name"),e("table_name"),e("type_name"),e("column_name"),e("column_constrain\
t"),e("table_constraint"),e("column_name"),e("expression"),e("collation"),e("opclass"),e("method"),e("storage_parameter"),
e("value"),e("tablespace_name"),e("table_name"),e("parent_table"),e("column_name"),e("column_constraint"),e("table_const\
raint"),e("partition_bound_spec"),e("column_name"),e("expression"),e("collation"),e("opclass"),e("method"),e("storage_pa\
rameter"),e("value"),e("tablespace_name"),e("where column_constraint is:"),e("constraint_name"),e("expression"),e("defau\
lt_expr"),e("generation_expr"),e("sequence_options"),e("index_parameters"),e("index_parameters"),e("reftable"),e("refcol\
umn"),e("referential_action"),e("referential_action"),e("and table_constraint is:"),e("constraint_name"),e("expression"),
e("column_name"),e("column_name"),e("column_name"),e("index_parameters"),e("column_name"),e("column_name"),e("index_para\
meters"),e("index_method"),e("exclude_element"),e("operator"),e("index_parameters"),e("predicate"),e("column_name"),e("c\
olumn_name"),e("reftable"),e("refcolumn"),e("refcolumn"),e("referential_action"),e("referential_action"),e("and like_opt\
ion is:"),e("and partition_bound_spec is:"),e("partition_bound_expr"),e("partition_bound_expr"),e("partition_bound_expr"),
e("numeric_literal"),e("numeric_literal"),e("index_parameters in UNIQUE, PRIMARY KEY, and EXCLUDE constraints are:"),e("\
column_name"),e("storage_parameter"),e("value"),e("tablespace_name"),e("exclude_element in an EXCLUDE constraint is:"),e(
"column_name"),e("expression"),e("collation"),e("opclass"),e("opclass_parameter"),e("value"),e("referential_action in a \
FOREIGN KEY/REFERENCES constraint is:"),e("column_name"),e("column_name"))}function st(n){l(n,`CREATE [ [ GLOBAL | LOCAL\
 ] { TEMPORARY | TEMP } | UNLOGGED ] TABLE [ IF NOT EXISTS ] %s
    [ (%s [, ...] ) ]
    [ USING %s ]
    [ WITH ( %s [= %s] [, ... ] ) | WITHOUT OIDS ]
    [ ON COMMIT { PRESERVE ROWS | DELETE ROWS | DROP } ]
    [ TABLESPACE %s ]
    AS %s
    [ WITH [ NO ] DATA ]`,e("table_name"),e("column_name"),e("method"),e("storage_parameter"),e("value"),e("tablespace_n\
ame"),e("query"))}function tt(n){l(n,`CREATE TABLESPACE %s
    [ OWNER { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER } ]
    LOCATION '%s'
    [ WITH ( %s = %s [, ... ] ) ]`,e("tablespace_name"),e("new_owner"),e("directory"),e("tablespace_option"),e("value"))}
function Et(n){l(n,`CREATE TEXT SEARCH CONFIGURATION %s (
    PARSER = %s |
    COPY = %s
)`,e("name"),e("parser_name"),e("source_config"))}function it(n){l(n,`CREATE TEXT SEARCH DICTIONARY %s (
    TEMPLATE = %s
    [, %s = %s [, ... ]]
)`,e("name"),e("template"),e("option"),e("value"))}function ot(n){l(n,`CREATE TEXT SEARCH PARSER %s (
    START = %s ,
    GETTOKEN = %s ,
    END = %s ,
    LEXTYPES = %s
    [, HEADLINE = %s ]
)`,e("name"),e("start_function"),e("gettoken_function"),e("end_function"),e("lextypes_function"),e("headline_function"))}
function lt(n){l(n,`CREATE TEXT SEARCH TEMPLATE %s (
    [ INIT = %s , ]
    LEXIZE = %s
)`,e("name"),e("init_function"),e("lexize_function"))}function rt(n){l(n,`CREATE [ OR REPLACE ] TRANSFORM FOR %s LANGUAG\
E %s (
    FROM SQL WITH FUNCTION %s [ (%s [, ...]) ],
    TO SQL WITH FUNCTION %s [ (%s [, ...]) ]
);`,e("type_name"),e("lang_name"),e("from_sql_function_name"),e("argument_type"),e("to_sql_function_name"),e("argument_t\
ype"))}function ct(n){l(n,`CREATE [ OR REPLACE ] [ CONSTRAINT ] TRIGGER %s { BEFORE | AFTER | INSTEAD OF } { %s [ OR ...\
 ] }
    ON %s
    [ FROM %s ]
    [ NOT DEFERRABLE | [ DEFERRABLE ] [ INITIALLY IMMEDIATE | INITIALLY DEFERRED ] ]
    [ REFERENCING { { OLD | NEW } TABLE [ AS ] %s } [ ... ] ]
    [ FOR [ EACH ] { ROW | STATEMENT } ]
    [ WHEN ( %s ) ]
    EXECUTE { FUNCTION | PROCEDURE } %s ( %s )

%s

    INSERT
    UPDATE [ OF %s [, ... ] ]
    DELETE
    TRUNCATE`,e("name"),e("event"),e("table_name"),e("referenced_table_name"),e("transition_relation_name"),e("condition"),
e("function_name"),e("arguments"),e("where event can be one of:"),e("column_name"))}function _t(n){l(n,`CREATE TYPE %s A\
S
    ( [ %s %s [ COLLATE %s ] [, ... ] ] )

CREATE TYPE %s AS ENUM
    ( [ '%s' [, ... ] ] )

CREATE TYPE %s AS RANGE (
    SUBTYPE = %s
    [ , SUBTYPE_OPCLASS = %s ]
    [ , COLLATION = %s ]
    [ , CANONICAL = %s ]
    [ , SUBTYPE_DIFF = %s ]
    [ , MULTIRANGE_TYPE_NAME = %s ]
)

CREATE TYPE %s (
    INPUT = %s,
    OUTPUT = %s
    [ , RECEIVE = %s ]
    [ , SEND = %s ]
    [ , TYPMOD_IN = %s ]
    [ , TYPMOD_OUT = %s ]
    [ , ANALYZE = %s ]
    [ , SUBSCRIPT = %s ]
    [ , INTERNALLENGTH = { %s | VARIABLE } ]
    [ , PASSEDBYVALUE ]
    [ , ALIGNMENT = %s ]
    [ , STORAGE = %s ]
    [ , LIKE = %s ]
    [ , CATEGORY = %s ]
    [ , PREFERRED = %s ]
    [ , DEFAULT = %s ]
    [ , ELEMENT = %s ]
    [ , DELIMITER = %s ]
    [ , COLLATABLE = %s ]
)

CREATE TYPE %s`,e("name"),e("attribute_name"),e("data_type"),e("collation"),e("name"),e("label"),e("name"),e("subtype"),
e("subtype_operator_class"),e("collation"),e("canonical_function"),e("subtype_diff_function"),e("multirange_type_name"),
e("name"),e("input_function"),e("output_function"),e("receive_function"),e("send_function"),e("type_modifier_input_funct\
ion"),e("type_modifier_output_function"),e("analyze_function"),e("subscript_function"),e("internallength"),e("alignment"),
e("storage"),e("like_type"),e("category"),e("preferred"),e("default"),e("element"),e("delimiter"),e("collatable"),e("nam\
e"))}function Tt(n){l(n,`CREATE USER %s [ [ WITH ] %s [ ... ] ]

%s

      SUPERUSER | NOSUPERUSER
    | CREATEDB | NOCREATEDB
    | CREATEROLE | NOCREATEROLE
    | INHERIT | NOINHERIT
    | LOGIN | NOLOGIN
    | REPLICATION | NOREPLICATION
    | BYPASSRLS | NOBYPASSRLS
    | CONNECTION LIMIT %s
    | [ ENCRYPTED ] PASSWORD '%s' | PASSWORD NULL
    | VALID UNTIL '%s'
    | IN ROLE %s [, ...]
    | IN GROUP %s [, ...]
    | ROLE %s [, ...]
    | ADMIN %s [, ...]
    | USER %s [, ...]
    | SYSID %s`,e("name"),e("option"),e("where option can be:"),e("connlimit"),e("password"),e("timestamp"),e("role_name"),
e("role_name"),e("role_name"),e("role_name"),e("role_name"),e("uid"))}function pt(n){l(n,`CREATE USER MAPPING [ IF NOT E\
XISTS ] FOR { %s | USER | CURRENT_ROLE | CURRENT_USER | PUBLIC }
    SERVER %s
    [ OPTIONS ( %s '%s' [ , ... ] ) ]`,e("user_name"),e("server_name"),e("option"),e("value"))}function Rt(n){l(n,`CREAT\
E [ OR REPLACE ] [ TEMP | TEMPORARY ] [ RECURSIVE ] VIEW %s [ ( %s [, ...] ) ]
    [ WITH ( %s [= %s] [, ... ] ) ]
    AS %s
    [ WITH [ CASCADED | LOCAL ] CHECK OPTION ]`,e("name"),e("column_name"),e("view_option_name"),e("view_option_value"),
e("query"))}function At(n){l(n,"DEALLOCATE [ PREPARE ] { %s | ALL }",e("name"))}function Nt(n){l(n,`DECLARE %s [ BINARY \
] [ ASENSITIVE | INSENSITIVE ] [ [ NO ] SCROLL ]
    CURSOR [ { WITH | WITHOUT } HOLD ] FOR %s`,e("name"),e("query"))}function Lt(n){l(n,`[ WITH [ RECURSIVE ] %s [, ...]\
 ]
DELETE FROM [ ONLY ] %s [ * ] [ [ AS ] %s ]
    [ USING %s [, ...] ]
    [ WHERE %s | WHERE CURRENT OF %s ]
    [ RETURNING [ WITH ( { OLD | NEW } AS %s [, ...] ) ]
                { * | %s [ [ AS ] %s ] } [, ...] ]`,e("with_query"),e("table_name"),e("alias"),e("from_item"),e("conditi\
on"),e("cursor_name"),e("output_alias"),e("output_expression"),e("output_name"))}function St(n){l(n,"DISCARD { ALL | PLA\
NS | SEQUENCES | TEMPORARY | TEMP }")}function gt(n){l(n,"DO [ LANGUAGE %s ] %s",e("lang_name"),e("code"))}function Ot(n){
l(n,"DROP ACCESS METHOD [ IF EXISTS ] %s [ CASCADE | RESTRICT ]",e("name"))}function ft(n){l(n,`DROP AGGREGATE [ IF EXIS\
TS ] %s ( %s ) [, ...] [ CASCADE | RESTRICT ]

%s

* |
[ %s ] [ %s ] %s [ , ... ] |
[ [ %s ] [ %s ] %s [ , ... ] ] ORDER BY [ %s ] [ %s ] %s [ , ... ]`,e("name"),e("aggregate_signature"),e("where aggregat\
e_signature is:"),e("argmode"),e("argname"),e("argtype"),e("argmode"),e("argname"),e("argtype"),e("argmode"),e("argname"),
e("argtype"))}function mt(n){l(n,"DROP CAST [ IF EXISTS ] (%s AS %s) [ CASCADE | RESTRICT ]",e("source_type"),e("target_\
type"))}function It(n){l(n,"DROP COLLATION [ IF EXISTS ] %s [ CASCADE | RESTRICT ]",e("name"))}function ut(n){l(n,"DROP \
CONVERSION [ IF EXISTS ] %s [ CASCADE | RESTRICT ]",e("name"))}function dt(n){l(n,`DROP DATABASE [ IF EXISTS ] %s [ [ WI\
TH ] ( %s [, ...] ) ]

%s

    FORCE`,e("name"),e("option"),e("where option can be:"))}function Ct(n){l(n,"DROP DOMAIN [ IF EXISTS ] %s [, ...] [ C\
ASCADE | RESTRICT ]",e("name"))}function Dt(n){l(n,"DROP EVENT TRIGGER [ IF EXISTS ] %s [ CASCADE | RESTRICT ]",e("name"))}
function Ut(n){l(n,"DROP EXTENSION [ IF EXISTS ] %s [, ...] [ CASCADE | RESTRICT ]",e("name"))}function Pt(n){l(n,"DROP \
FOREIGN DATA WRAPPER [ IF EXISTS ] %s [, ...] [ CASCADE | RESTRICT ]",e("name"))}function bt(n){l(n,"DROP FOREIGN TABLE \
[ IF EXISTS ] %s [, ...] [ CASCADE | RESTRICT ]",e("name"))}function ht(n){l(n,`DROP FUNCTION [ IF EXISTS ] %s [ ( [ [ %\
s ] [ %s ] %s [, ...] ] ) ] [, ...]
    [ CASCADE | RESTRICT ]`,e("name"),e("argmode"),e("argname"),e("argtype"))}function Ft(n){l(n,"DROP GROUP [ IF EXISTS\
 ] %s [, ...]",e("name"))}function yt(n){l(n,"DROP INDEX [ CONCURRENTLY ] [ IF EXISTS ] %s [, ...] [ CASCADE | RESTRICT \
]",e("name"))}function Ht(n){l(n,"DROP [ PROCEDURAL ] LANGUAGE [ IF EXISTS ] %s [ CASCADE | RESTRICT ]",e("name"))}function Mt(n){
l(n,"DROP MATERIALIZED VIEW [ IF EXISTS ] %s [, ...] [ CASCADE | RESTRICT ]",e("name"))}function wt(n){l(n,"DROP OPERATO\
R [ IF EXISTS ] %s ( { %s | NONE } , %s ) [, ...] [ CASCADE | RESTRICT ]",e("name"),e("left_type"),e("right_type"))}function Gt(n){
l(n,"DROP OPERATOR CLASS [ IF EXISTS ] %s USING %s [ CASCADE | RESTRICT ]",e("name"),e("index_method"))}function Wt(n){l(
n,"DROP OPERATOR FAMILY [ IF EXISTS ] %s USING %s [ CASCADE | RESTRICT ]",e("name"),e("index_method"))}function Bt(n){l(
n,"DROP OWNED BY { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER } [, ...] [ CASCADE | RESTRICT ]",e("name"))}function vt(n){
l(n,"DROP POLICY [ IF EXISTS ] %s ON %s [ CASCADE | RESTRICT ]",e("name"),e("table_name"))}function qt(n){l(n,`DROP PROC\
EDURE [ IF EXISTS ] %s [ ( [ [ %s ] [ %s ] %s [, ...] ] ) ] [, ...]
    [ CASCADE | RESTRICT ]`,e("name"),e("argmode"),e("argname"),e("argtype"))}function Yt(n){l(n,"DROP PUBLICATION [ IF \
EXISTS ] %s [, ...] [ CASCADE | RESTRICT ]",e("name"))}function xt(n){l(n,"DROP ROLE [ IF EXISTS ] %s [, ...]",e("name"))}
function Vt(n){l(n,`DROP ROUTINE [ IF EXISTS ] %s [ ( [ [ %s ] [ %s ] %s [, ...] ] ) ] [, ...]
    [ CASCADE | RESTRICT ]`,e("name"),e("argmode"),e("argname"),e("argtype"))}function Xt(n){l(n,"DROP RULE [ IF EXISTS \
] %s ON %s [ CASCADE | RESTRICT ]",e("name"),e("table_name"))}function kt(n){l(n,"DROP SCHEMA [ IF EXISTS ] %s [, ...] [\
 CASCADE | RESTRICT ]",e("name"))}function Kt(n){l(n,"DROP SEQUENCE [ IF EXISTS ] %s [, ...] [ CASCADE | RESTRICT ]",e("\
name"))}function jt(n){l(n,"DROP SERVER [ IF EXISTS ] %s [, ...] [ CASCADE | RESTRICT ]",e("name"))}function Jt(n){l(n,"\
DROP STATISTICS [ IF EXISTS ] %s [, ...] [ CASCADE | RESTRICT ]",e("name"))}function Qt(n){l(n,"DROP SUBSCRIPTION [ IF E\
XISTS ] %s [ CASCADE | RESTRICT ]",e("name"))}function zt(n){l(n,"DROP TABLE [ IF EXISTS ] %s [, ...] [ CASCADE | RESTRI\
CT ]",e("name"))}function Zt(n){l(n,"DROP TABLESPACE [ IF EXISTS ] %s",e("name"))}function $t(n){l(n,"DROP TEXT SEARCH C\
ONFIGURATION [ IF EXISTS ] %s [ CASCADE | RESTRICT ]",e("name"))}function eE(n){l(n,"DROP TEXT SEARCH DICTIONARY [ IF EX\
ISTS ] %s [ CASCADE | RESTRICT ]",e("name"))}function nE(n){l(n,"DROP TEXT SEARCH PARSER [ IF EXISTS ] %s [ CASCADE | RE\
STRICT ]",e("name"))}function aE(n){l(n,"DROP TEXT SEARCH TEMPLATE [ IF EXISTS ] %s [ CASCADE | RESTRICT ]",e("name"))}function sE(n){
l(n,"DROP TRANSFORM [ IF EXISTS ] FOR %s LANGUAGE %s [ CASCADE | RESTRICT ]",e("type_name"),e("lang_name"))}function tE(n){
l(n,"DROP TRIGGER [ IF EXISTS ] %s ON %s [ CASCADE | RESTRICT ]",e("name"),e("table_name"))}function EE(n){l(n,"DROP TYP\
E [ IF EXISTS ] %s [, ...] [ CASCADE | RESTRICT ]",e("name"))}function iE(n){l(n,"DROP USER [ IF EXISTS ] %s [, ...]",e(
"name"))}function oE(n){l(n,"DROP USER MAPPING [ IF EXISTS ] FOR { %s | USER | CURRENT_ROLE | CURRENT_USER | PUBLIC } SE\
RVER %s",e("user_name"),e("server_name"))}function lE(n){l(n,"DROP VIEW [ IF EXISTS ] %s [, ...] [ CASCADE | RESTRICT ]",
e("name"))}function rE(n){l(n,"END [ WORK | TRANSACTION ] [ AND [ NO ] CHAIN ]")}function cE(n){l(n,"EXECUTE %s [ ( %s [\
, ...] ) ]",e("name"),e("parameter"))}function _E(n){l(n,`EXPLAIN [ ( %s [, ...] ) ] %s

%s

    ANALYZE [ %s ]
    VERBOSE [ %s ]
    COSTS [ %s ]
    SETTINGS [ %s ]
    GENERIC_PLAN [ %s ]
    BUFFERS [ %s ]
    SERIALIZE [ { NONE | TEXT | BINARY } ]
    WAL [ %s ]
    TIMING [ %s ]
    SUMMARY [ %s ]
    MEMORY [ %s ]
    FORMAT { TEXT | XML | JSON | YAML }`,e("option"),e("statement"),e("where option can be one of:"),e("boolean"),e("boo\
lean"),e("boolean"),e("boolean"),e("boolean"),e("boolean"),e("boolean"),e("boolean"),e("boolean"),e("boolean"))}function TE(n){
l(n,`FETCH [ %s ] [ FROM | IN ] %s

%s

    NEXT
    PRIOR
    FIRST
    LAST
    ABSOLUTE %s
    RELATIVE %s
    %s
    ALL
    FORWARD
    FORWARD %s
    FORWARD ALL
    BACKWARD
    BACKWARD %s
    BACKWARD ALL`,e("direction"),e("cursor_name"),e("where direction can be one of:"),e("count"),e("count"),e("count"),e(
"count"),e("count"))}function pE(n){l(n,`GRANT { { SELECT | INSERT | UPDATE | DELETE | TRUNCATE | REFERENCES | TRIGGER |\
 MAINTAIN }
    [, ...] | ALL [ PRIVILEGES ] }
    ON { [ TABLE ] %s [, ...]
         | ALL TABLES IN SCHEMA %s [, ...] }
    TO %s [, ...] [ WITH GRANT OPTION ]
    [ GRANTED BY %s ]

GRANT { { SELECT | INSERT | UPDATE | REFERENCES } ( %s [, ...] )
    [, ...] | ALL [ PRIVILEGES ] ( %s [, ...] ) }
    ON [ TABLE ] %s [, ...]
    TO %s [, ...] [ WITH GRANT OPTION ]
    [ GRANTED BY %s ]

GRANT { { USAGE | SELECT | UPDATE }
    [, ...] | ALL [ PRIVILEGES ] }
    ON { SEQUENCE %s [, ...]
         | ALL SEQUENCES IN SCHEMA %s [, ...] }
    TO %s [, ...] [ WITH GRANT OPTION ]
    [ GRANTED BY %s ]

GRANT { { CREATE | CONNECT | TEMPORARY | TEMP } [, ...] | ALL [ PRIVILEGES ] }
    ON DATABASE %s [, ...]
    TO %s [, ...] [ WITH GRANT OPTION ]
    [ GRANTED BY %s ]

GRANT { USAGE | ALL [ PRIVILEGES ] }
    ON DOMAIN %s [, ...]
    TO %s [, ...] [ WITH GRANT OPTION ]
    [ GRANTED BY %s ]

GRANT { USAGE | ALL [ PRIVILEGES ] }
    ON FOREIGN DATA WRAPPER %s [, ...]
    TO %s [, ...] [ WITH GRANT OPTION ]
    [ GRANTED BY %s ]

GRANT { USAGE | ALL [ PRIVILEGES ] }
    ON FOREIGN SERVER %s [, ...]
    TO %s [, ...] [ WITH GRANT OPTION ]
    [ GRANTED BY %s ]

GRANT { EXECUTE | ALL [ PRIVILEGES ] }
    ON { { FUNCTION | PROCEDURE | ROUTINE } %s [ ( [ [ %s ] [ %s ] %s [, ...] ] ) ] [, ...]
         | ALL { FUNCTIONS | PROCEDURES | ROUTINES } IN SCHEMA %s [, ...] }
    TO %s [, ...] [ WITH GRANT OPTION ]
    [ GRANTED BY %s ]

GRANT { USAGE | ALL [ PRIVILEGES ] }
    ON LANGUAGE %s [, ...]
    TO %s [, ...] [ WITH GRANT OPTION ]
    [ GRANTED BY %s ]

GRANT { { SELECT | UPDATE } [, ...] | ALL [ PRIVILEGES ] }
    ON LARGE OBJECT %s [, ...]
    TO %s [, ...] [ WITH GRANT OPTION ]
    [ GRANTED BY %s ]

GRANT { { SET | ALTER SYSTEM } [, ... ] | ALL [ PRIVILEGES ] }
    ON PARAMETER %s [, ...]
    TO %s [, ...] [ WITH GRANT OPTION ]
    [ GRANTED BY %s ]

GRANT { { CREATE | USAGE } [, ...] | ALL [ PRIVILEGES ] }
    ON SCHEMA %s [, ...]
    TO %s [, ...] [ WITH GRANT OPTION ]
    [ GRANTED BY %s ]

GRANT { CREATE | ALL [ PRIVILEGES ] }
    ON TABLESPACE %s [, ...]
    TO %s [, ...] [ WITH GRANT OPTION ]
    [ GRANTED BY %s ]

GRANT { USAGE | ALL [ PRIVILEGES ] }
    ON TYPE %s [, ...]
    TO %s [, ...] [ WITH GRANT OPTION ]
    [ GRANTED BY %s ]

GRANT %s [, ...] TO %s [, ...]
    [ WITH { ADMIN | INHERIT | SET } { OPTION | TRUE | FALSE } ]
    [ GRANTED BY %s ]

%s

    [ GROUP ] %s
  | PUBLIC
  | CURRENT_ROLE
  | CURRENT_USER
  | SESSION_USER`,e("table_name"),e("schema_name"),e("role_specification"),e("role_specification"),e("column_name"),e("c\
olumn_name"),e("table_name"),e("role_specification"),e("role_specification"),e("sequence_name"),e("schema_name"),e("role\
_specification"),e("role_specification"),e("database_name"),e("role_specification"),e("role_specification"),e("domain_na\
me"),e("role_specification"),e("role_specification"),e("fdw_name"),e("role_specification"),e("role_specification"),e("se\
rver_name"),e("role_specification"),e("role_specification"),e("routine_name"),e("argmode"),e("arg_name"),e("arg_type"),e(
"schema_name"),e("role_specification"),e("role_specification"),e("lang_name"),e("role_specification"),e("role_specificat\
ion"),e("loid"),e("role_specification"),e("role_specification"),e("configuration_parameter"),e("role_specification"),e("\
role_specification"),e("schema_name"),e("role_specification"),e("role_specification"),e("tablespace_name"),e("role_speci\
fication"),e("role_specification"),e("type_name"),e("role_specification"),e("role_specification"),e("role_name"),e("role\
_specification"),e("role_specification"),e("where role_specification can be:"),e("role_name"))}function RE(n){l(n,`IMPOR\
T FOREIGN SCHEMA %s
    [ { LIMIT TO | EXCEPT } ( %s [, ...] ) ]
    FROM SERVER %s
    INTO %s
    [ OPTIONS ( %s '%s' [, ... ] ) ]`,e("remote_schema"),e("table_name"),e("server_name"),e("local_schema"),e("option"),
e("value"))}function AE(n){l(n,`[ WITH [ RECURSIVE ] %s [, ...] ]
INSERT INTO %s [ AS %s ] [ ( %s [, ...] ) ]
    [ OVERRIDING { SYSTEM | USER } VALUE ]
    { DEFAULT VALUES | VALUES ( { %s | DEFAULT } [, ...] ) [, ...] | %s }
    [ ON CONFLICT [ %s ] %s ]
    [ RETURNING [ WITH ( { OLD | NEW } AS %s [, ...] ) ]
                { * | %s [ [ AS ] %s ] } [, ...] ]

%s

    ( { %s | ( %s ) } [ COLLATE %s ] [ %s ] [, ...] ) [ WHERE %s ]
    ON CONSTRAINT %s

%s

    DO NOTHING
    DO UPDATE SET { %s = { %s | DEFAULT } |
                    ( %s [, ...] ) = [ ROW ] ( { %s | DEFAULT } [, ...] ) |
                    ( %s [, ...] ) = ( %s )
                  } [, ...]
              [ WHERE %s ]`,e("with_query"),e("table_name"),e("alias"),e("column_name"),e("expression"),e("query"),e("co\
nflict_target"),e("conflict_action"),e("output_alias"),e("output_expression"),e("output_name"),e("where conflict_target \
can be one of:"),e("index_column_name"),e("index_expression"),e("collation"),e("opclass"),e("index_predicate"),e("constr\
aint_name"),e("and conflict_action is one of:"),e("column_name"),e("expression"),e("column_name"),e("expression"),e("col\
umn_name"),e("sub-SELECT"),e("condition"))}function NE(n){l(n,"LISTEN %s",e("channel"))}function LE(n){l(n,"LOAD '%s'",e(
"filename"))}function SE(n){l(n,`LOCK [ TABLE ] [ ONLY ] %s [ * ] [, ...] [ IN %s MODE ] [ NOWAIT ]

%s

    ACCESS SHARE | ROW SHARE | ROW EXCLUSIVE | SHARE UPDATE EXCLUSIVE
    | SHARE | SHARE ROW EXCLUSIVE | EXCLUSIVE | ACCESS EXCLUSIVE`,e("name"),e("lockmode"),e("where lockmode is one of:"))}
function gE(n){l(n,`[ WITH %s [, ...] ]
MERGE INTO [ ONLY ] %s [ * ] [ [ AS ] %s ]
    USING %s ON %s
    %s [...]
    [ RETURNING [ WITH ( { OLD | NEW } AS %s [, ...] ) ]
                { * | %s [ [ AS ] %s ] } [, ...] ]

%s

    { [ ONLY ] %s [ * ] | ( %s ) } [ [ AS ] %s ]

%s

    { WHEN MATCHED [ AND %s ] THEN { %s | %s | DO NOTHING } |
      WHEN NOT MATCHED BY SOURCE [ AND %s ] THEN { %s | %s | DO NOTHING } |
      WHEN NOT MATCHED [ BY TARGET ] [ AND %s ] THEN { %s | DO NOTHING } }

%s

    INSERT [( %s [, ...] )]
        [ OVERRIDING { SYSTEM | USER } VALUE ]
        { VALUES ( { %s | DEFAULT } [, ...] ) | DEFAULT VALUES }

%s

    UPDATE SET { %s = { %s | DEFAULT } |
                 ( %s [, ...] ) = [ ROW ] ( { %s | DEFAULT } [, ...] ) |
                 ( %s [, ...] ) = ( %s )
               } [, ...]

%s

    DELETE`,e("with_query"),e("target_table_name"),e("target_alias"),e("data_source"),e("join_condition"),e("when_clause"),
e("output_alias"),e("output_expression"),e("output_name"),e("where data_source is:"),e("source_table_name"),e("source_qu\
ery"),e("source_alias"),e("and when_clause is:"),e("condition"),e("merge_update"),e("merge_delete"),e("condition"),e("me\
rge_update"),e("merge_delete"),e("condition"),e("merge_insert"),e("and merge_insert is:"),e("column_name"),e("expression"),
e("and merge_update is:"),e("column_name"),e("expression"),e("column_name"),e("expression"),e("column_name"),e("sub-SELE\
CT"),e("and merge_delete is:"))}function OE(n){l(n,`MOVE [ %s ] [ FROM | IN ] %s

%s

    NEXT
    PRIOR
    FIRST
    LAST
    ABSOLUTE %s
    RELATIVE %s
    %s
    ALL
    FORWARD
    FORWARD %s
    FORWARD ALL
    BACKWARD
    BACKWARD %s
    BACKWARD ALL`,e("direction"),e("cursor_name"),e("where direction can be one of:"),e("count"),e("count"),e("count"),e(
"count"),e("count"))}function fE(n){l(n,"NOTIFY %s [ , %s ]",e("channel"),e("payload"))}function mE(n){l(n,"PREPARE %s [\
 ( %s [, ...] ) ] AS %s",e("name"),e("data_type"),e("statement"))}function IE(n){l(n,"PREPARE TRANSACTION %s",e("transac\
tion_id"))}function uE(n){l(n,`REASSIGN OWNED BY { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER } [, ...]
               TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER }`,e("old_role"),e("new_role"))}function dE(n){l(n,`\
REFRESH MATERIALIZED VIEW [ CONCURRENTLY ] %s
    [ WITH [ NO ] DATA ]`,e("name"))}function CE(n){l(n,`REINDEX [ ( %s [, ...] ) ] { INDEX | TABLE | SCHEMA } [ CONCURR\
ENTLY ] %s
REINDEX [ ( %s [, ...] ) ] { DATABASE | SYSTEM } [ CONCURRENTLY ] [ %s ]

%s

    CONCURRENTLY [ %s ]
    TABLESPACE %s
    VERBOSE [ %s ]`,e("option"),e("name"),e("option"),e("name"),e("where option can be one of:"),e("boolean"),e("new_tab\
lespace"),e("boolean"))}function DE(n){l(n,"RELEASE [ SAVEPOINT ] %s",e("savepoint_name"))}function UE(n){l(n,`RESET %s
RESET ALL`,e("configuration_parameter"))}function PE(n){l(n,`REVOKE [ GRANT OPTION FOR ]
    { { SELECT | INSERT | UPDATE | DELETE | TRUNCATE | REFERENCES | TRIGGER | MAINTAIN }
    [, ...] | ALL [ PRIVILEGES ] }
    ON { [ TABLE ] %s [, ...]
         | ALL TABLES IN SCHEMA %s [, ...] }
    FROM %s [, ...]
    [ GRANTED BY %s ]
    [ CASCADE | RESTRICT ]

REVOKE [ GRANT OPTION FOR ]
    { { SELECT | INSERT | UPDATE | REFERENCES } ( %s [, ...] )
    [, ...] | ALL [ PRIVILEGES ] ( %s [, ...] ) }
    ON [ TABLE ] %s [, ...]
    FROM %s [, ...]
    [ GRANTED BY %s ]
    [ CASCADE | RESTRICT ]

REVOKE [ GRANT OPTION FOR ]
    { { USAGE | SELECT | UPDATE }
    [, ...] | ALL [ PRIVILEGES ] }
    ON { SEQUENCE %s [, ...]
         | ALL SEQUENCES IN SCHEMA %s [, ...] }
    FROM %s [, ...]
    [ GRANTED BY %s ]
    [ CASCADE | RESTRICT ]

REVOKE [ GRANT OPTION FOR ]
    { { CREATE | CONNECT | TEMPORARY | TEMP } [, ...] | ALL [ PRIVILEGES ] }
    ON DATABASE %s [, ...]
    FROM %s [, ...]
    [ GRANTED BY %s ]
    [ CASCADE | RESTRICT ]

REVOKE [ GRANT OPTION FOR ]
    { USAGE | ALL [ PRIVILEGES ] }
    ON DOMAIN %s [, ...]
    FROM %s [, ...]
    [ GRANTED BY %s ]
    [ CASCADE | RESTRICT ]

REVOKE [ GRANT OPTION FOR ]
    { USAGE | ALL [ PRIVILEGES ] }
    ON FOREIGN DATA WRAPPER %s [, ...]
    FROM %s [, ...]
    [ GRANTED BY %s ]
    [ CASCADE | RESTRICT ]

REVOKE [ GRANT OPTION FOR ]
    { USAGE | ALL [ PRIVILEGES ] }
    ON FOREIGN SERVER %s [, ...]
    FROM %s [, ...]
    [ GRANTED BY %s ]
    [ CASCADE | RESTRICT ]

REVOKE [ GRANT OPTION FOR ]
    { EXECUTE | ALL [ PRIVILEGES ] }
    ON { { FUNCTION | PROCEDURE | ROUTINE } %s [ ( [ [ %s ] [ %s ] %s [, ...] ] ) ] [, ...]
         | ALL { FUNCTIONS | PROCEDURES | ROUTINES } IN SCHEMA %s [, ...] }
    FROM %s [, ...]
    [ GRANTED BY %s ]
    [ CASCADE | RESTRICT ]

REVOKE [ GRANT OPTION FOR ]
    { USAGE | ALL [ PRIVILEGES ] }
    ON LANGUAGE %s [, ...]
    FROM %s [, ...]
    [ GRANTED BY %s ]
    [ CASCADE | RESTRICT ]

REVOKE [ GRANT OPTION FOR ]
    { { SELECT | UPDATE } [, ...] | ALL [ PRIVILEGES ] }
    ON LARGE OBJECT %s [, ...]
    FROM %s [, ...]
    [ GRANTED BY %s ]
    [ CASCADE | RESTRICT ]

REVOKE [ GRANT OPTION FOR ]
    { { SET | ALTER SYSTEM } [, ...] | ALL [ PRIVILEGES ] }
    ON PARAMETER %s [, ...]
    FROM %s [, ...]
    [ GRANTED BY %s ]
    [ CASCADE | RESTRICT ]

REVOKE [ GRANT OPTION FOR ]
    { { CREATE | USAGE } [, ...] | ALL [ PRIVILEGES ] }
    ON SCHEMA %s [, ...]
    FROM %s [, ...]
    [ GRANTED BY %s ]
    [ CASCADE | RESTRICT ]

REVOKE [ GRANT OPTION FOR ]
    { CREATE | ALL [ PRIVILEGES ] }
    ON TABLESPACE %s [, ...]
    FROM %s [, ...]
    [ GRANTED BY %s ]
    [ CASCADE | RESTRICT ]

REVOKE [ GRANT OPTION FOR ]
    { USAGE | ALL [ PRIVILEGES ] }
    ON TYPE %s [, ...]
    FROM %s [, ...]
    [ GRANTED BY %s ]
    [ CASCADE | RESTRICT ]

REVOKE [ { ADMIN | INHERIT | SET } OPTION FOR ]
    %s [, ...] FROM %s [, ...]
    [ GRANTED BY %s ]
    [ CASCADE | RESTRICT ]

%s

    [ GROUP ] %s
  | PUBLIC
  | CURRENT_ROLE
  | CURRENT_USER
  | SESSION_USER`,e("table_name"),e("schema_name"),e("role_specification"),e("role_specification"),e("column_name"),e("c\
olumn_name"),e("table_name"),e("role_specification"),e("role_specification"),e("sequence_name"),e("schema_name"),e("role\
_specification"),e("role_specification"),e("database_name"),e("role_specification"),e("role_specification"),e("domain_na\
me"),e("role_specification"),e("role_specification"),e("fdw_name"),e("role_specification"),e("role_specification"),e("se\
rver_name"),e("role_specification"),e("role_specification"),e("function_name"),e("argmode"),e("arg_name"),e("arg_type"),
e("schema_name"),e("role_specification"),e("role_specification"),e("lang_name"),e("role_specification"),e("role_specific\
ation"),e("loid"),e("role_specification"),e("role_specification"),e("configuration_parameter"),e("role_specification"),e(
"role_specification"),e("schema_name"),e("role_specification"),e("role_specification"),e("tablespace_name"),e("role_spec\
ification"),e("role_specification"),e("type_name"),e("role_specification"),e("role_specification"),e("role_name"),e("rol\
e_specification"),e("role_specification"),e("where role_specification can be:"),e("role_name"))}function bE(n){l(n,"ROLL\
BACK [ WORK | TRANSACTION ] [ AND [ NO ] CHAIN ]")}function hE(n){l(n,"ROLLBACK PREPARED %s",e("transaction_id"))}function FE(n){
l(n,"ROLLBACK [ WORK | TRANSACTION ] TO [ SAVEPOINT ] %s",e("savepoint_name"))}function yE(n){l(n,"SAVEPOINT %s",e("save\
point_name"))}function HE(n){l(n,`SECURITY LABEL [ FOR %s ] ON
{
  TABLE %s |
  COLUMN %s.%s |
  AGGREGATE %s ( %s ) |
  DATABASE %s |
  DOMAIN %s |
  EVENT TRIGGER %s |
  FOREIGN TABLE %s |
  FUNCTION %s [ ( [ [ %s ] [ %s ] %s [, ...] ] ) ] |
  LARGE OBJECT %s |
  MATERIALIZED VIEW %s |
  [ PROCEDURAL ] LANGUAGE %s |
  PROCEDURE %s [ ( [ [ %s ] [ %s ] %s [, ...] ] ) ] |
  PUBLICATION %s |
  ROLE %s |
  ROUTINE %s [ ( [ [ %s ] [ %s ] %s [, ...] ] ) ] |
  SCHEMA %s |
  SEQUENCE %s |
  SUBSCRIPTION %s |
  TABLESPACE %s |
  TYPE %s |
  VIEW %s
} IS { %s | NULL }

%s

* |
[ %s ] [ %s ] %s [ , ... ] |
[ [ %s ] [ %s ] %s [ , ... ] ] ORDER BY [ %s ] [ %s ] %s [ , ... ]`,e("provider"),e("object_name"),e("table_name"),e("co\
lumn_name"),e("aggregate_name"),e("aggregate_signature"),e("object_name"),e("object_name"),e("object_name"),e("object_na\
me"),e("function_name"),e("argmode"),e("argname"),e("argtype"),e("large_object_oid"),e("object_name"),e("object_name"),e(
"procedure_name"),e("argmode"),e("argname"),e("argtype"),e("object_name"),e("object_name"),e("routine_name"),e("argmode"),
e("argname"),e("argtype"),e("object_name"),e("object_name"),e("object_name"),e("object_name"),e("object_name"),e("object\
_name"),e("string_literal"),e("where aggregate_signature is:"),e("argmode"),e("argname"),e("argtype"),e("argmode"),e("ar\
gname"),e("argtype"),e("argmode"),e("argname"),e("argtype"))}function ME(n){l(n,`[ WITH [ RECURSIVE ] %s [, ...] ]
SELECT [ ALL | DISTINCT [ ON ( %s [, ...] ) ] ]
    [ { * | %s [ [ AS ] %s ] } [, ...] ]
    [ FROM %s [, ...] ]
    [ WHERE %s ]
    [ GROUP BY [ ALL | DISTINCT ] %s [, ...] ]
    [ HAVING %s ]
    [ WINDOW %s AS ( %s ) [, ...] ]
    [ { UNION | INTERSECT | EXCEPT } [ ALL | DISTINCT ] %s ]
    [ ORDER BY %s [ ASC | DESC | USING %s ] [ NULLS { FIRST | LAST } ] [, ...] ]
    [ LIMIT { %s | ALL } ]
    [ OFFSET %s [ ROW | ROWS ] ]
    [ FETCH { FIRST | NEXT } [ %s ] { ROW | ROWS } { ONLY | WITH TIES } ]
    [ FOR { UPDATE | NO KEY UPDATE | SHARE | KEY SHARE } [ OF %s [, ...] ] [ NOWAIT | SKIP LOCKED ] [...] ]

%s

    [ ONLY ] %s [ * ] [ [ AS ] %s [ ( %s [, ...] ) ] ]
                [ TABLESAMPLE %s ( %s [, ...] ) [ REPEATABLE ( %s ) ] ]
    [ LATERAL ] ( %s ) [ [ AS ] %s [ ( %s [, ...] ) ] ]
    %s [ [ AS ] %s [ ( %s [, ...] ) ] ]
    [ LATERAL ] %s ( [ %s [, ...] ] )
                [ WITH ORDINALITY ] [ [ AS ] %s [ ( %s [, ...] ) ] ]
    [ LATERAL ] %s ( [ %s [, ...] ] ) [ AS ] %s ( %s [, ...] )
    [ LATERAL ] %s ( [ %s [, ...] ] ) AS ( %s [, ...] )
    [ LATERAL ] ROWS FROM( %s ( [ %s [, ...] ] ) [ AS ( %s [, ...] ) ] [, ...] )
                [ WITH ORDINALITY ] [ [ AS ] %s [ ( %s [, ...] ) ] ]
    %s %s %s { ON %s | USING ( %s [, ...] ) [ AS %s ] }
    %s NATURAL %s %s
    %s CROSS JOIN %s

%s

    ( )
    %s
    ( %s [, ...] )
    ROLLUP ( { %s | ( %s [, ...] ) } [, ...] )
    CUBE ( { %s | ( %s [, ...] ) } [, ...] )
    GROUPING SETS ( %s [, ...] )

%s

    %s [ ( %s [, ...] ) ] AS [ [ NOT ] MATERIALIZED ] ( %s | %s | %s | %s | %s | %s )
        [ SEARCH { BREADTH | DEPTH } FIRST BY %s [, ...] SET %s ]
        [ CYCLE %s [, ...] SET %s [ TO %s DEFAULT %s ] USING %s ]

TABLE [ ONLY ] %s [ * ]`,e("with_query"),e("expression"),e("expression"),e("output_name"),e("from_item"),e("condition"),
e("grouping_element"),e("condition"),e("window_name"),e("window_definition"),e("select"),e("expression"),e("operator"),e(
"count"),e("start"),e("count"),e("from_reference"),e("where from_item can be one of:"),e("table_name"),e("alias"),e("col\
umn_alias"),e("sampling_method"),e("argument"),e("seed"),e("select"),e("alias"),e("column_alias"),e("with_query_name"),e(
"alias"),e("column_alias"),e("function_name"),e("argument"),e("alias"),e("column_alias"),e("function_name"),e("argument"),
e("alias"),e("column_definition"),e("function_name"),e("argument"),e("column_definition"),e("function_name"),e("argument"),
e("column_definition"),e("alias"),e("column_alias"),e("from_item"),e("join_type"),e("from_item"),e("join_condition"),e("\
join_column"),e("join_using_alias"),e("from_item"),e("join_type"),e("from_item"),e("from_item"),e("from_item"),e("and gr\
ouping_element can be one of:"),e("expression"),e("expression"),e("expression"),e("expression"),e("expression"),e("expre\
ssion"),e("grouping_element"),e("and with_query is:"),e("with_query_name"),e("column_name"),e("select"),e("values"),e("i\
nsert"),e("update"),e("delete"),e("merge"),e("column_name"),e("search_seq_col_name"),e("column_name"),e("cycle_mark_col_\
name"),e("cycle_mark_value"),e("cycle_mark_default"),e("cycle_path_col_name"),e("table_name"))}function wE(n){l(n,`[ WIT\
H [ RECURSIVE ] %s [, ...] ]
SELECT [ ALL | DISTINCT [ ON ( %s [, ...] ) ] ]
    [ { * | %s [ [ AS ] %s ] } [, ...] ]
    INTO [ TEMPORARY | TEMP | UNLOGGED ] [ TABLE ] %s
    [ FROM %s [, ...] ]
    [ WHERE %s ]
    [ GROUP BY %s [, ...] ]
    [ HAVING %s ]
    [ WINDOW %s AS ( %s ) [, ...] ]
    [ { UNION | INTERSECT | EXCEPT } [ ALL | DISTINCT ] %s ]
    [ ORDER BY %s [ ASC | DESC | USING %s ] [ NULLS { FIRST | LAST } ] [, ...] ]
    [ LIMIT { %s | ALL } ]
    [ OFFSET %s [ ROW | ROWS ] ]
    [ FETCH { FIRST | NEXT } [ %s ] { ROW | ROWS } ONLY ]
    [ FOR { UPDATE | SHARE } [ OF %s [, ...] ] [ NOWAIT ] [...] ]`,e("with_query"),e("expression"),e("expression"),e("ou\
tput_name"),e("new_table"),e("from_item"),e("condition"),e("expression"),e("condition"),e("window_name"),e("window_defin\
ition"),e("select"),e("expression"),e("operator"),e("count"),e("start"),e("count"),e("table_name"))}function GE(n){l(n,`\
SET [ SESSION | LOCAL ] %s { TO | = } { %s | '%s' | DEFAULT }
SET [ SESSION | LOCAL ] TIME ZONE { %s | '%s' | LOCAL | DEFAULT }`,e("configuration_parameter"),e("value"),e("value"),e(
"value"),e("value"))}function WE(n){l(n,"SET CONSTRAINTS { ALL | %s [, ...] } { DEFERRED | IMMEDIATE }",e("name"))}function BE(n){
l(n,`SET [ SESSION | LOCAL ] ROLE %s
SET [ SESSION | LOCAL ] ROLE NONE
RESET ROLE`,e("role_name"))}function vE(n){l(n,`SET [ SESSION | LOCAL ] SESSION AUTHORIZATION %s
SET [ SESSION | LOCAL ] SESSION AUTHORIZATION DEFAULT
RESET SESSION AUTHORIZATION`,e("user_name"))}function qE(n){l(n,`SET TRANSACTION %s [, ...]
SET TRANSACTION SNAPSHOT %s
SET SESSION CHARACTERISTICS AS TRANSACTION %s [, ...]

%s

    ISOLATION LEVEL { SERIALIZABLE | REPEATABLE READ | READ COMMITTED | READ UNCOMMITTED }
    READ WRITE | READ ONLY
    [ NOT ] DEFERRABLE`,e("transaction_mode"),e("snapshot_id"),e("transaction_mode"),e("where transaction_mode is one of\
:"))}function YE(n){l(n,`SHOW %s
SHOW ALL`,e("name"))}function xE(n){l(n,`START TRANSACTION [ %s [, ...] ]

%s

    ISOLATION LEVEL { SERIALIZABLE | REPEATABLE READ | READ COMMITTED | READ UNCOMMITTED }
    READ WRITE | READ ONLY
    [ NOT ] DEFERRABLE`,e("transaction_mode"),e("where transaction_mode is one of:"))}function VE(n){l(n,`[ WITH [ RECUR\
SIVE ] %s [, ...] ]
SELECT [ ALL | DISTINCT [ ON ( %s [, ...] ) ] ]
    [ { * | %s [ [ AS ] %s ] } [, ...] ]
    [ FROM %s [, ...] ]
    [ WHERE %s ]
    [ GROUP BY [ ALL | DISTINCT ] %s [, ...] ]
    [ HAVING %s ]
    [ WINDOW %s AS ( %s ) [, ...] ]
    [ { UNION | INTERSECT | EXCEPT } [ ALL | DISTINCT ] %s ]
    [ ORDER BY %s [ ASC | DESC | USING %s ] [ NULLS { FIRST | LAST } ] [, ...] ]
    [ LIMIT { %s | ALL } ]
    [ OFFSET %s [ ROW | ROWS ] ]
    [ FETCH { FIRST | NEXT } [ %s ] { ROW | ROWS } { ONLY | WITH TIES } ]
    [ FOR { UPDATE | NO KEY UPDATE | SHARE | KEY SHARE } [ OF %s [, ...] ] [ NOWAIT | SKIP LOCKED ] [...] ]

%s

    [ ONLY ] %s [ * ] [ [ AS ] %s [ ( %s [, ...] ) ] ]
                [ TABLESAMPLE %s ( %s [, ...] ) [ REPEATABLE ( %s ) ] ]
    [ LATERAL ] ( %s ) [ [ AS ] %s [ ( %s [, ...] ) ] ]
    %s [ [ AS ] %s [ ( %s [, ...] ) ] ]
    [ LATERAL ] %s ( [ %s [, ...] ] )
                [ WITH ORDINALITY ] [ [ AS ] %s [ ( %s [, ...] ) ] ]
    [ LATERAL ] %s ( [ %s [, ...] ] ) [ AS ] %s ( %s [, ...] )
    [ LATERAL ] %s ( [ %s [, ...] ] ) AS ( %s [, ...] )
    [ LATERAL ] ROWS FROM( %s ( [ %s [, ...] ] ) [ AS ( %s [, ...] ) ] [, ...] )
                [ WITH ORDINALITY ] [ [ AS ] %s [ ( %s [, ...] ) ] ]
    %s %s %s { ON %s | USING ( %s [, ...] ) [ AS %s ] }
    %s NATURAL %s %s
    %s CROSS JOIN %s

%s

    ( )
    %s
    ( %s [, ...] )
    ROLLUP ( { %s | ( %s [, ...] ) } [, ...] )
    CUBE ( { %s | ( %s [, ...] ) } [, ...] )
    GROUPING SETS ( %s [, ...] )

%s

    %s [ ( %s [, ...] ) ] AS [ [ NOT ] MATERIALIZED ] ( %s | %s | %s | %s | %s | %s )
        [ SEARCH { BREADTH | DEPTH } FIRST BY %s [, ...] SET %s ]
        [ CYCLE %s [, ...] SET %s [ TO %s DEFAULT %s ] USING %s ]

TABLE [ ONLY ] %s [ * ]`,e("with_query"),e("expression"),e("expression"),e("output_name"),e("from_item"),e("condition"),
e("grouping_element"),e("condition"),e("window_name"),e("window_definition"),e("select"),e("expression"),e("operator"),e(
"count"),e("start"),e("count"),e("from_reference"),e("where from_item can be one of:"),e("table_name"),e("alias"),e("col\
umn_alias"),e("sampling_method"),e("argument"),e("seed"),e("select"),e("alias"),e("column_alias"),e("with_query_name"),e(
"alias"),e("column_alias"),e("function_name"),e("argument"),e("alias"),e("column_alias"),e("function_name"),e("argument"),
e("alias"),e("column_definition"),e("function_name"),e("argument"),e("column_definition"),e("function_name"),e("argument"),
e("column_definition"),e("alias"),e("column_alias"),e("from_item"),e("join_type"),e("from_item"),e("join_condition"),e("\
join_column"),e("join_using_alias"),e("from_item"),e("join_type"),e("from_item"),e("from_item"),e("from_item"),e("and gr\
ouping_element can be one of:"),e("expression"),e("expression"),e("expression"),e("expression"),e("expression"),e("expre\
ssion"),e("grouping_element"),e("and with_query is:"),e("with_query_name"),e("column_name"),e("select"),e("values"),e("i\
nsert"),e("update"),e("delete"),e("merge"),e("column_name"),e("search_seq_col_name"),e("column_name"),e("cycle_mark_col_\
name"),e("cycle_mark_value"),e("cycle_mark_default"),e("cycle_path_col_name"),e("table_name"))}function XE(n){l(n,`TRUNC\
ATE [ TABLE ] [ ONLY ] %s [ * ] [, ... ]
    [ RESTART IDENTITY | CONTINUE IDENTITY ] [ CASCADE | RESTRICT ]`,e("name"))}function kE(n){l(n,"UNLISTEN { %s | * }",
e("channel"))}function KE(n){l(n,`[ WITH [ RECURSIVE ] %s [, ...] ]
UPDATE [ ONLY ] %s [ * ] [ [ AS ] %s ]
    SET { %s = { %s | DEFAULT } |
          ( %s [, ...] ) = [ ROW ] ( { %s | DEFAULT } [, ...] ) |
          ( %s [, ...] ) = ( %s )
        } [, ...]
    [ FROM %s [, ...] ]
    [ WHERE %s | WHERE CURRENT OF %s ]
    [ RETURNING [ WITH ( { OLD | NEW } AS %s [, ...] ) ]
                { * | %s [ [ AS ] %s ] } [, ...] ]`,e("with_query"),e("table_name"),e("alias"),e("column_name"),e("expre\
ssion"),e("column_name"),e("expression"),e("column_name"),e("sub-SELECT"),e("from_item"),e("condition"),e("cursor_name"),
e("output_alias"),e("output_expression"),e("output_name"))}function jE(n){l(n,`VACUUM [ ( %s [, ...] ) ] [ %s [, ...] ]

%s

    FULL [ %s ]
    FREEZE [ %s ]
    VERBOSE [ %s ]
    ANALYZE [ %s ]
    DISABLE_PAGE_SKIPPING [ %s ]
    SKIP_LOCKED [ %s ]
    INDEX_CLEANUP { AUTO | ON | OFF }
    PROCESS_MAIN [ %s ]
    PROCESS_TOAST [ %s ]
    TRUNCATE [ %s ]
    PARALLEL %s
    SKIP_DATABASE_STATS [ %s ]
    ONLY_DATABASE_STATS [ %s ]
    BUFFER_USAGE_LIMIT %s

%s

    [ ONLY ] %s [ * ] [ ( %s [, ...] ) ]`,e("option"),e("table_and_columns"),e("where option can be one of:"),e("boolean"),
e("boolean"),e("boolean"),e("boolean"),e("boolean"),e("boolean"),e("boolean"),e("boolean"),e("boolean"),e("integer"),e("\
boolean"),e("boolean"),e("size"),e("and table_and_columns is:"),e("table_name"),e("column_name"))}function JE(n){l(n,`VA\
LUES ( %s [, ...] ) [, ...]
    [ ORDER BY %s [ ASC | DESC | USING %s ] [, ...] ]
    [ LIMIT { %s | ALL } ]
    [ OFFSET %s [ ROW | ROWS ] ]
    [ FETCH { FIRST | NEXT } [ %s ] { ROW | ROWS } ONLY ]`,e("expression"),e("sort_expression"),e("operator"),e("count"),
e("start"),e("count"))}function QE(n){l(n,`[ WITH [ RECURSIVE ] %s [, ...] ]
SELECT [ ALL | DISTINCT [ ON ( %s [, ...] ) ] ]
    [ { * | %s [ [ AS ] %s ] } [, ...] ]
    [ FROM %s [, ...] ]
    [ WHERE %s ]
    [ GROUP BY [ ALL | DISTINCT ] %s [, ...] ]
    [ HAVING %s ]
    [ WINDOW %s AS ( %s ) [, ...] ]
    [ { UNION | INTERSECT | EXCEPT } [ ALL | DISTINCT ] %s ]
    [ ORDER BY %s [ ASC | DESC | USING %s ] [ NULLS { FIRST | LAST } ] [, ...] ]
    [ LIMIT { %s | ALL } ]
    [ OFFSET %s [ ROW | ROWS ] ]
    [ FETCH { FIRST | NEXT } [ %s ] { ROW | ROWS } { ONLY | WITH TIES } ]
    [ FOR { UPDATE | NO KEY UPDATE | SHARE | KEY SHARE } [ OF %s [, ...] ] [ NOWAIT | SKIP LOCKED ] [...] ]

%s

    [ ONLY ] %s [ * ] [ [ AS ] %s [ ( %s [, ...] ) ] ]
                [ TABLESAMPLE %s ( %s [, ...] ) [ REPEATABLE ( %s ) ] ]
    [ LATERAL ] ( %s ) [ [ AS ] %s [ ( %s [, ...] ) ] ]
    %s [ [ AS ] %s [ ( %s [, ...] ) ] ]
    [ LATERAL ] %s ( [ %s [, ...] ] )
                [ WITH ORDINALITY ] [ [ AS ] %s [ ( %s [, ...] ) ] ]
    [ LATERAL ] %s ( [ %s [, ...] ] ) [ AS ] %s ( %s [, ...] )
    [ LATERAL ] %s ( [ %s [, ...] ] ) AS ( %s [, ...] )
    [ LATERAL ] ROWS FROM( %s ( [ %s [, ...] ] ) [ AS ( %s [, ...] ) ] [, ...] )
                [ WITH ORDINALITY ] [ [ AS ] %s [ ( %s [, ...] ) ] ]
    %s %s %s { ON %s | USING ( %s [, ...] ) [ AS %s ] }
    %s NATURAL %s %s
    %s CROSS JOIN %s

%s

    ( )
    %s
    ( %s [, ...] )
    ROLLUP ( { %s | ( %s [, ...] ) } [, ...] )
    CUBE ( { %s | ( %s [, ...] ) } [, ...] )
    GROUPING SETS ( %s [, ...] )

%s

    %s [ ( %s [, ...] ) ] AS [ [ NOT ] MATERIALIZED ] ( %s | %s | %s | %s | %s | %s )
        [ SEARCH { BREADTH | DEPTH } FIRST BY %s [, ...] SET %s ]
        [ CYCLE %s [, ...] SET %s [ TO %s DEFAULT %s ] USING %s ]

TABLE [ ONLY ] %s [ * ]`,e("with_query"),e("expression"),e("expression"),e("output_name"),e("from_item"),e("condition"),
e("grouping_element"),e("condition"),e("window_name"),e("window_definition"),e("select"),e("expression"),e("operator"),e(
"count"),e("start"),e("count"),e("from_reference"),e("where from_item can be one of:"),e("table_name"),e("alias"),e("col\
umn_alias"),e("sampling_method"),e("argument"),e("seed"),e("select"),e("alias"),e("column_alias"),e("with_query_name"),e(
"alias"),e("column_alias"),e("function_name"),e("argument"),e("alias"),e("column_alias"),e("function_name"),e("argument"),
e("alias"),e("column_definition"),e("function_name"),e("argument"),e("column_definition"),e("function_name"),e("argument"),
e("column_definition"),e("alias"),e("column_alias"),e("from_item"),e("join_type"),e("from_item"),e("join_condition"),e("\
join_column"),e("join_using_alias"),e("from_item"),e("join_type"),e("from_item"),e("from_item"),e("from_item"),e("and gr\
ouping_element can be one of:"),e("expression"),e("expression"),e("expression"),e("expression"),e("expression"),e("expre\
ssion"),e("grouping_element"),e("and with_query is:"),e("with_query_name"),e("column_name"),e("select"),e("values"),e("i\
nsert"),e("update"),e("delete"),e("merge"),e("column_name"),e("search_seq_col_name"),e("column_name"),e("cycle_mark_col_\
name"),e("cycle_mark_value"),e("cycle_mark_default"),e("cycle_path_col_name"),e("table_name"))}
