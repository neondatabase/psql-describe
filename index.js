const fo=0,Oo=null,mo=100,Ua="E",uo=0,Io=0,Co=1,Do=0,Uo=2,Po=5,bo=0,ho=4,Fo=6,yo=0,Mo=1,Pa="b",ba="i",ha="a",Fa="e",ya="\
r",Ma="S",Ha="f",wa="T",Ga="n",Wa="a",qa="d",va="s",re="r",ge="i",Ba="S",ye="t",Me="v",oe="m",an="c",ce="f",ae="p",_e="I",
Ho=20,wo=21,Go=23,Wo=26,qo=28,vo=29,Bo=5069,Yo=700,xo=701,Vo=790,Xo=1700;export function describeDataToString(n){return typeof n==
"string"?n:xa(n)}export function describeDataToHtml(n){return typeof n=="string"?`<p>${Re(n,!0)}</p>`:Va(n)}export function describe(n,u,C,U,v=!1,Y=null,x=1,z=X=>`\
https://www.postgresql.org/docs/current/${X}.html`){let X=!1;function me(){X=!0,U=()=>{}}function le(){if(X)throw new Error(
"cancelled")}async function ze(){const We=n.match(/^\\([?hdzsl]\S*)(.*)/);if(!We)return U(`unsupported command: ${n}`),!1;
let[,J,se]=We;if(J=J.replace(/^lo_list/,"dl"),J=J.replace(/^z/,"dp"),J==="?")return U(Qa),!1;if(J==="h"){const r=(se??"").
trim().toUpperCase().replace(/\s+/g," ");if(r==="")return U(`Available help:
`+Ge.map(E=>E[0]).join(`
`)),!1;{let E=r==="*"?Ge:Ge.filter(t=>t[0]===r);if(E.length===0&&(E=Ge.filter(t=>t[0].startsWith(r))),E.length===0){const t=r.
split(" ");for(let s=t.length;s>0;s--){const o=t.slice(0,s).join(" ");if(E=Ge.filter(a=>a[0].startsWith(o)),E.length>0)break}}
if(E.length===0)return U(`No help available for "${se.trim()}".
Try \\h with no arguments to see available help.`),!1;for(const t of E){const s={};D(s),t[3](s),U(`Command:     ${t[0]}
Description: ${t[1]}
Syntax:
${s.data}

URL: ${z(t[2])}

`)}return!1}}const O=async(r,E=!1)=>{le(),v&&!E&&U(`/******** QUERY *********/
${r}
/************************/`);const t=await C(r);return le(),t};let p;try{if(!Y){const o=await O("SHOW server_version_num",
!0);Y=parseInt(o.rows[0][0],10)}p={sversion:Y,db:{dbName:u,sversion:Y,std_strings:x,status:0,encoding:6},popt:{topt:{default_footer:!0},
nullPrint:""}};const r=[se,0];await(J[0]==="d"?Fn(r,!0,J):J[0]==="s"?J[1]==="f"||J[1]==="v"?In(r,!0,J,J[1]==="f"):0:J[0]===
"l"?hn(r,!0,J):0)===0&&U(`invalid command \\${J}`);let t,s=[];for(;t=Oe(r,0,null,!0);)s.push($('\\%s: extra argument "%s"\
 ignored',J,t));s.length>0&&U(s.join(`
`))}catch(r){return U("ERROR:  "+r.message),X?null:!1}function W(r,...E){U($(r,...E))}function P(r,E,t,s,o,a,_,g,N,T){let d={},
m={},f;if(D(d),f=De(p.db,r,E,t,s,o,a,_,g,d,m),m=m.value,N&&(N.value=f),m>=T)return W("improper qualified name (too many \
dotted names): %s",E),!1;if(T>1&&m==T-1){if(Sn(p.db)==null)return W("You are currently not connected to a database."),!1;
if(h(Sn(p.db),d.data)!=0)return W("cross-database references are not implemented: %s",E),!1}return!0}function De(r,E,t,s,o,a,_,g,N,T,d){
let m={},f={},y=!1;return d||(d={}),d.value=0,t==null?(N&&(c(E,s?"  AND ":"WHERE "),s=!0,y=!0,l(E,`%s
`,N)),y):(D(m),D(f),qe(fn(r),a?T:null,a?m:null,f,t,o,!0,d),_&&f.len>2&&h(f.data,"^(.*)$")!=0&&(c(E,s?"  AND ":"WHERE "),
s=!0,y=!0,g?(l(E,"(%s OPERATOR(pg_catalog.~) ",_),Ce(E,f.data,r),He(r)>=12e4&&c(E," COLLATE pg_catalog.default"),l(E,`
        OR %s OPERATOR(pg_catalog.~) `,g),Ce(E,f.data,r),He(r)>=12e4&&c(E," COLLATE pg_catalog.default"),c(E,`)
`)):(l(E,"%s OPERATOR(pg_catalog.~) ",_),Ce(E,f.data,r),He(r)>=12e4&&c(E," COLLATE pg_catalog.default"),V(E,`
`))),a&&m.len>2?h(m.data,"^(.*)$")!=0&&a&&(c(E,s?"  AND ":"WHERE "),s=!0,y=!0,l(E,"%s OPERATOR(pg_catalog.~) ",a),Ce(E,m.
data,r),He(r)>=12e4&&c(E," COLLATE pg_catalog.default"),V(E,`
`)):N&&(c(E,s?"  AND ":"WHERE "),s=!0,y=!0,l(E,`%s
`,N)),y)}function qe(r,E,t,s,o,a,_,g){let N=[{},{},{}],T=0,d={},m={},f={},y,b,Ee;de(o),de(s),de(!E||t),de(g),g.value=0,y=
!1,Ee=o,E?f=2:t?f=1:f=0,m=N[T],_?(b=!0,D(d)):b=!1,D(m),c(m,"^(");let Z=0,H;for(;(H=Ee[Z])!=null;)H=='"'?(y&&Ee[Z+1]=='"'?
(V(m,'"'),b&&V(d,'"'),Z++):y=!y,Z++):!y&&ja(H)?(V(m,tn(H)),b&&V(d,tn(H)),Z++):!y&&H=="*"?(c(m,".*"),b&&V(d,"*"),Z++):!y&&
H=="?"?(V(m,"."),b&&V(d,"?"),Z++):!y&&H=="."?(b=!1,g.value++,T<f?(c(m,")$"),m=N[++T],D(m),c(m,"^("),Z++):(V(m,H),Z++)):H==
"$"?(c(m,"\\$"),b&&V(d,"$"),Z++):(((y||a)&&K("|*+?()[]{}.^$\\",H)!=null||H=="["&&Ee[Z+1]=="]")&&V(m,"\\"),b&&V(d,H),V(m,
H),Z++);c(m,")$"),s&&(c(s,m.data),m=N[--T]),t&&T>=0&&(c(t,m.data),m=N[--T]),E&&T>=0&&(_?c(E,d.data):c(E,m.data))}function un(r){
let E;switch(r){case 21:case 23:case 20:case 700:case 701:case 1700:case 26:case 28:case 5069:case 29:case 790:E="r";break;default:
E="l";break}return E}function G(r,E,t,s,o){let a={},_,g,N;for(ve(a,E.topt,E.title,On(r),q(r)),de(E.translate_columns==null||
E.translate_columns==null||E.n_translate_columns>=a.ncolumns),_=0;_<a.ncolumns;_++)ie(a,mn(r,_),E.translate_header,un(Ka(
r,_)));for(g=0;g<a.nrows;g++)for(N=0;N<a.ncolumns;N++){let T,d=!1,m;ee(r,g,N)?T=E.nullPrint?E.nullPrint:"":(T=A(r,g,N),a.
aligns[N]=="r"&&E.topt.numericLocale&&(T=format_numeric_locale(T),d=!0)),m=E.translate_columns&&E.translate_columns[N],j(
a,T,m,d)}if(E.footers)for(let T of E.footers)M(a,T);Be(a,t,s,o)}function ve(r,E,t,s,o){r.opt=E,r.title=t,r.ncolumns=s,r.
nrows=o,r.headers=[],r.cells=[],r.footers=null,r.aligns=[]}function ie(r,E,t,s){t&&(E=e(E)),r.headers.push(E),r.header=E,
r.aligns.push(s),r.align=s}function j(r,E,t,s){t&&(E=e(E)),r.cells.push(E),r.cell=E}function M(r,E){r.footers==null&&(r.
footers=[]),r.footers.push(E),r.footer=E}function dn(r,E){r.footers&&r.footers.pop(),M(r,E)}function Be(r,E,t,s){U({...r})}
async function In(r,E,t,s){let o=2,a=K(t,"+")!=null,_={},g,N={value:0},T=s?0:1;return D(_),g=Oe(r,4,null,!0),g?await Dn(
T,g,N)&&await Un(T,N.value,_)?a?Cn(_.data,s):U(_.data):o=5:(W(s?"function name is required":"view name is required"),o=5),
o}function Cn(r,E){let t=E,s=0,o="";r=r.trimEnd().split(`
`);for(let a of r)t&&(Ie(a,"AS ",3)==0||Ie(a,"BEGIN ",6)==0||Ie(a,"RETURN ",7)==0)&&(t=!1),t||s++,t?o+=$(`        %s
`,a):o+=$(`%-7d %s
`,s,a);U(o)}async function Dn(r,E,t){let s=!0,o={};D(o);let a;switch(r){case 0:c(o,"SELECT "),Ce(o,E,p.db),l(o,"::pg_cat\
alog.%s::pg_catalog.oid",K(E,"(")!==null?"regprocedure":"regproc");break;case 1:c(o,"SELECT "),Ce(o,E,p.db),c(o,"::pg_ca\
talog.regclass::pg_catalog.oid");break}try{a=await O(o.data),a&&q(a)==1?t.value=sn(A(a,0,0)):(W("Error when querying"),s=
!1)}catch(_){W("ERROR:  "+_.message),s=!1}return s}async function Un(r,E,t){let s=!0,o={};D(o);let a;switch(r){case 0:L(
o,"SELECT pg_catalog.pg_get_functiondef(%u)",E);break;case 1:p.sversion>=90400?L(o,"SELECT nspname, relname, relkind, pg\
_catalog.pg_get_viewdef(c.oid, true), pg_catalog.array_remove(pg_catalog.array_remove(c.reloptions,'check_option=local')\
,'check_option=cascaded') AS reloptions, CASE WHEN 'check_option=local' = ANY (c.reloptions) THEN 'LOCAL'::text WHEN 'ch\
eck_option=cascaded' = ANY (c.reloptions) THEN 'CASCADED'::text ELSE NULL END AS checkoption FROM pg_catalog.pg_class c \
LEFT JOIN pg_catalog.pg_namespace n ON c.relnamespace = n.oid WHERE c.oid = %u",E):L(o,"SELECT nspname, relname, relkind\
, pg_catalog.pg_get_viewdef(c.oid, true), c.reloptions AS reloptions, NULL AS checkoption FROM pg_catalog.pg_class c LEF\
T JOIN pg_catalog.pg_namespace n ON c.relnamespace = n.oid WHERE c.oid = %u",E);break}if(a=await O(o.data),a&&q(a)==1){switch(on(
t),r){case 0:c(t,A(a,0,0));break;case 1:let _=A(a,0,0),g=A(a,0,1),N=A(a,0,2),T=A(a,0,3),d=A(a,0,4),m=A(a,0,5);switch(N[0]){case Me:
c(t,"CREATE OR REPLACE VIEW ");break;default:W('"%s.%s" is not a view',_,g),s=!1;break}l(t,"%s.",ue(_)),c(t,ue(g)),d!=null&&
pe(d)>2&&(c(t,`
 WITH (`),Pn(t,d,"",p.encoding,p.db.standard_strings)||(W("could not parse reloptions array"),s=!1),V(t,")")),l(t,` AS
%s`,T),t.len>0&&t.data[t.len-1]==";"&&(t.data=t.data.slice(0,t.len-1)),m&&m[0]!=null&&l(t,`
 WITH %s CHECK OPTION`,m);break}t.len>0&&t.data[t.len-1]!=`
`&&V(t,`
`)}else W("Error when querying"),s=!1;return s}function Pn(r,E,t,s,o){let a=[],_={},g;if(!bn(E,a,_))return!1;for(_=_.value,
g=0;g<_;g++){let N=a[g],[T,d]=N.split("=");d??(d=""),g>0&&c(r,", "),l(r,"%s%s=",t,ue(T)),h(ue(d),d)==0?c(r,d):En(r,d,s,o)}
return!0}function bn(r,E,t){let s,o,a;if(s=pe(r),t.value=0,s<2||r[0]!="{"||r[s-1]!="}")return!1;let _=0;for(_++,a=0;r[_]!=
"}";){if(r[_]==null)return!1;for(o="";r[_]!="}"&&r[_]!=",";){if(r[_]==null)return!1;if(r[_]!='"')o+=r[_++];else{for(_++;r[_]!=
'"';){if(r[_]==null||r[_]=="\\"&&(_++,r[_]==null))return!1;o+=r[_++]}_++}}E[a]=o,r[_]==","&&_++,a++}return r[_+1]&&r[_+1]!=
null?!1:(t.value=a,!0)}function ue(r){let E={};D(E);let t=!1;return r[0]>="a"&&r[0]<="z"||r[0]=="_"?/[^a-z0-9_]/.test(r)&&
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
xmltable"]).has(r)&&(t=!0),t?(V(E,'"'),V(E,r.replace(/"/g,'""')),V(E,'"')):c(E,r),E.data}async function hn(r,E,t){let s,
o,a;return o=Oe(r,0,null,!0),a=K(t,"+")!=null,s=await yn(o,a),s?2:5}async function Fn(r,E,t){let s=2,o=!0,a,_,g;switch(a=
Oe(r,0,null,!0),_=K(t,"+")!=null,g=K(t,"S")!=null,t[1]){case void 0:case"+":case"S":a?o=await xn(a,_,g):o=await _n("tvms\
E",null,_,g);break;case"A":{let N=null;switch(a&&t[2]!=null&&t[2]!="+"&&(N=Oe(r,0,null,!0)),t[2]){case void 0:case"+":o=
await Hn(a,_);break;case"c":o=await Oa(a,N,_);break;case"f":o=await ma(a,N,_);break;case"o":o=await ua(a,N,_);break;case"\
p":o=await da(a,N,_);break;default:s=0;break}}break;case"a":o=await Mn(a,_,g);break;case"b":o=await wn(a,_);break;case"c":
Ie(t,"dconfig",7)==0?o=await zn(a,_,g):o=await Qn(a,_,g);break;case"C":o=await ea(a,_);break;case"d":Ie(t,"ddp",3)==0?o=
await Bn(a):o=await Yn(a,g);break;case"D":o=await Kn(a,_,g);break;case"f":switch(t[2]){case void 0:case"+":case"S":case"\
a":case"n":case"p":case"t":case"w":o=await rn(r,t,a,_,g);break;default:s=0;break}break;case"g":o=await cn(a,_,g);break;case"\
l":o=await Ia(_);break;case"L":o=await Jn(a,_,g);break;case"n":o=await aa(a,_,g);break;case"o":o=await rn(r,t,a,_,g);break;case"\
O":o=await na(a,_,g);break;case"p":o=await vn(a,g);break;case"P":switch(t[2]){case void 0:case"+":case"t":case"i":case"n":
o=await jn(t.slice(2),a,_);break;default:s=0;break}break;case"T":o=await Wn(a,_,g);break;case"t":case"v":case"m":case"i":case"\
s":case"E":o=await _n(t[1],a,_,g);break;case"r":if(t[2]=="d"&&t[3]=="s"){let N=null;a&&(N=Oe(r,0,null,!0)),o=await Xn(a,
N)}else t[2]=="g"?o=await kn(a,g):s=0;break;case"R":switch(t[2]){case"p":_?o=await Sa(a):o=await ga(a);break;case"s":o=await fa(
a,_);break;default:s=0}break;case"u":o=await cn(a,_,g);break;case"F":switch(t[2]){case void 0:case"+":o=await la(a,_);break;case"\
p":o=await sa(a,_);break;case"d":o=await oa(a,_);break;case"t":o=await Ea(a,_);break;default:s=0;break}break;case"e":switch(t[2]){case"\
s":o=await pa(a,_);break;case"u":o=await Ta(a,_);break;case"w":o=await _a(a,_);break;case"t":o=await Ra(a,_);break;default:
s=0;break}break;case"x":_?o=await Na(a):o=await Aa(a);break;case"X":o=await $n(a);break;case"y":o=await Zn(a,_);break;default:
s=0}return o||(s=5),s}async function rn(r,E,t,s,o){let a,_=[],g=0;if(t){let N;for(;(N=Oe(r,0,null,!0))!=null&&(_[g++]=N,
!(g>=100)););}return E[1]=="f"?a=await Gn(E.slice(2),t,_,g,s,o):a=await qn(t,_,g,s,o),a}async function yn(r,E){let t,s={},
o=p.popt;return D(s),L(s,`SELECT
  d.datname as "%s",
  pg_catalog.pg_get_userbyid(d.datdba) as "%s",
  pg_catalog.pg_encoding_to_char(d.encoding) as "%s",
`,i("Name"),i("Owner"),i("Encoding")),p.sversion>=15e4?l(s,`  CASE d.datlocprovider WHEN 'b' THEN 'builtin' WHEN 'c' THE\
N 'libc' WHEN 'i' THEN 'icu' END AS "%s",
`,i("Locale Provider")):l(s,`  'libc' AS "%s",
`,i("Locale Provider")),l(s,`  d.datcollate as "%s",
  d.datctype as "%s",
`,i("Collate"),i("Ctype")),p.sversion>=17e4?l(s,`  d.datlocale as "%s",
`,i("Locale")):p.sversion>=15e4?l(s,`  d.daticulocale as "%s",
`,i("Locale")):l(s,`  NULL as "%s",
`,i("Locale")),p.sversion>=16e4?l(s,`  d.daticurules as "%s",
`,i("ICU Rules")):l(s,`  NULL as "%s",
`,i("ICU Rules")),c(s,"  "),te(s,"d.datacl"),E&&l(s,`,
  CASE WHEN pg_catalog.has_database_privilege(d.datname, 'CONNECT')
       THEN pg_catalog.pg_size_pretty(pg_catalog.pg_database_size(d.datname))
       ELSE 'No Access'
  END as "%s",
  t.spcname as "%s",
  pg_catalog.shobj_description(d.oid, 'pg_database') as "%s"`,i("Size"),i("Tablespace"),i("Description")),c(s,`
FROM pg_catalog.pg_database d
`),E&&c(s,`  JOIN pg_catalog.pg_tablespace t on d.dattablespace = t.oid
`),r&&!P(s,r,!1,!1,null,"d.datname",null,null,null,1)||(c(s,"ORDER BY 1;"),t=await O(s.data),!t)?!1:(o.nullPrint=null,o.
title=e("List of databases"),o.translate_header=!0,G(t,o,p.queryFout,!1,p.logfile),!0)}async function Mn(r,E,t){let s={},
o,a=p.popt;return D(s),L(s,`SELECT n.nspname as "%s",
  p.proname AS "%s",
  pg_catalog.format_type(p.prorettype, NULL) AS "%s",
  CASE WHEN p.pronargs = 0
    THEN CAST('*' AS pg_catalog.text)
    ELSE pg_catalog.pg_get_function_arguments(p.oid)
  END AS "%s",
`,i("Schema"),i("Name"),i("Result data type"),i("Argument data types")),p.sversion>=11e4?l(s,`  pg_catalog.obj_descripti\
on(p.oid, 'pg_proc') as "%s"
FROM pg_catalog.pg_proc p
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = p.pronamespace
WHERE p.prokind = 'a'
`,i("Description")):l(s,`  pg_catalog.obj_description(p.oid, 'pg_proc') as "%s"
FROM pg_catalog.pg_proc p
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = p.pronamespace
WHERE p.proisagg
`,i("Description")),!t&&!r&&c(s,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!P(s,r,!0,!1,"n.nspname","p.proname",null,"pg_catalog.pg_function_is_visible(p.oid)",null,3)||(c(s,"ORDER BY 1, 2, 4;"),
o=await O(s.data),!o)?!1:(a.nullPrint=null,a.title=e("List of aggregate functions"),a.translate_header=!0,G(o,a,p.queryFout,
!1,p.logfile),!0)}async function Hn(r,E){let t={},s,o=p.popt,a=[!1,!0,!1,!1];if(p.sversion<90600){let _;return W("The se\
rver (version %s) does not support access methods.",Ne(p.sversion,!1,_,Ae(_))),!0}return D(t),L(t,`SELECT amname AS "%s"\
,
  CASE amtype WHEN 'i' THEN '%s' WHEN 't' THEN '%s' END AS "%s"`,i("Name"),i("Index"),i("Table"),i("Type")),E&&l(t,`,
  amhandler AS "%s",
  pg_catalog.obj_description(oid, 'pg_am') AS "%s"`,i("Handler"),i("Description")),c(t,`
FROM pg_catalog.pg_am
`),!P(t,r,!1,!1,null,"amname",null,null,null,1)||(c(t,"ORDER BY 1;"),s=await O(t.data),!s)?!1:(o.nullPrint=null,o.title=
e("List of access methods"),o.translate_header=!0,o.translate_columns=a,o.n_translate_columns=Q(a),G(s,o,p.queryFout,!1,
p.logfile),!0)}async function wn(r,E){let t={},s,o=p.popt;return D(t),L(t,`SELECT spcname AS "%s",
  pg_catalog.pg_get_userbyid(spcowner) AS "%s",
  pg_catalog.pg_tablespace_location(oid) AS "%s"`,i("Name"),i("Owner"),i("Location")),E&&(c(t,`,
  `),te(t,"spcacl"),l(t,`,
  spcoptions AS "%s",
  pg_catalog.pg_size_pretty(pg_catalog.pg_tablespace_size(oid)) AS "%s",
  pg_catalog.shobj_description(oid, 'pg_tablespace') AS "%s"`,i("Options"),i("Size"),i("Description"))),c(t,`
FROM pg_catalog.pg_tablespace
`),!P(t,r,!1,!1,null,"spcname",null,null,null,1)||(c(t,"ORDER BY 1;"),s=await O(t.data),!s)?!1:(o.nullPrint=null,o.title=
e("List of tablespaces"),o.translate_header=!0,G(s,o,p.queryFout,!1,p.logfile),!0)}async function Gn(r,E,t,s,o,a){let _=K(
r,"a")!=null,g=K(r,"n")!=null,N=K(r,"p")!=null,T=K(r,"t")!=null,d=K(r,"w")!=null,m,f={},y,b=p.popt,Ee=[!1,!1,!1,!1,!0,!0,
!0,!1,!0,!1,!1,!1,!1],Z=[!1,!1,!1,!1,!0,!0,!1,!0,!1,!1,!1,!1];if(pe(r)!=Xa(r,"anptwS+"))return W("\\df only takes [anptwS\
+] as options"),!0;if(N&&p.sversion<11e4){let H;return W('\\df does not take a "%c" option with server version %s',"p",Ne(
p.sversion,!1,H,Ae(H))),!0}!_&&!g&&!N&&!T&&!d&&(_=g=T=d=!0,p.sversion>=11e4&&(N=!0)),D(f),L(f,`SELECT n.nspname as "%s",\

  p.proname as "%s",
`,i("Schema"),i("Name")),p.sversion>=11e4?l(f,`  pg_catalog.pg_get_function_result(p.oid) as "%s",
  pg_catalog.pg_get_function_arguments(p.oid) as "%s",
 CASE p.prokind
  WHEN 'a' THEN '%s'
  WHEN 'w' THEN '%s'
  WHEN 'p' THEN '%s'
  ELSE '%s'
 END as "%s"`,i("Result data type"),i("Argument data types"),i("agg"),i("window"),i("proc"),i("func"),i("Type")):l(f,`  \
pg_catalog.pg_get_function_result(p.oid) as "%s",
  pg_catalog.pg_get_function_arguments(p.oid) as "%s",
 CASE
  WHEN p.proisagg THEN '%s'
  WHEN p.proiswindow THEN '%s'
  WHEN p.prorettype = 'pg_catalog.trigger'::pg_catalog.regtype THEN '%s'
  ELSE '%s'
 END as "%s"`,i("Result data type"),i("Argument data types"),i("agg"),i("window"),i("trigger"),i("func"),i("Type")),o&&(l(
f,`,
 CASE
  WHEN p.provolatile = 'i' THEN '%s'
  WHEN p.provolatile = 's' THEN '%s'
  WHEN p.provolatile = 'v' THEN '%s'
 END as "%s"`,i("immutable"),i("stable"),i("volatile"),i("Volatility")),p.sversion>=90600&&l(f,`,
 CASE
  WHEN p.proparallel = 'r' THEN '%s'
  WHEN p.proparallel = 's' THEN '%s'
  WHEN p.proparallel = 'u' THEN '%s'
 END as "%s"`,i("restricted"),i("safe"),i("unsafe"),i("Parallel")),l(f,`,
 pg_catalog.pg_get_userbyid(p.proowner) as "%s",
 CASE WHEN prosecdef THEN '%s' ELSE '%s' END AS "%s"`,i("Owner"),i("definer"),i("invoker"),i("Security")),c(f,`,
 `),te(f,"p.proacl"),l(f,`,
 l.lanname as "%s"`,i("Language")),l(f,`,
 CASE WHEN l.lanname IN ('internal', 'c') THEN p.prosrc END as "%s"`,i("Internal name")),l(f,`,
 pg_catalog.obj_description(p.oid, 'pg_proc') as "%s"`,i("Description"))),c(f,`
FROM pg_catalog.pg_proc p
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = p.pronamespace
`);for(let H=0;H<s;H++)l(f,`     LEFT JOIN pg_catalog.pg_type t%d ON t%d.oid = p.proargtypes[%d]
     LEFT JOIN pg_catalog.pg_namespace nt%d ON nt%d.oid = t%d.typnamespace
`,H,H,H,H,H,H);if(o&&c(f,`     LEFT JOIN pg_catalog.pg_language l ON l.oid = p.prolang
`),m=!1,!(g&&_&&N&&T&&d))if(g)_||(m?c(f,"      AND "):(c(f,"WHERE "),m=!0),p.sversion>=11e4?c(f,`p.prokind <> 'a'
`):c(f,`NOT p.proisagg
`)),!N&&p.sversion>=11e4&&(m?c(f,"      AND "):(c(f,"WHERE "),m=!0),c(f,`p.prokind <> 'p'
`)),T||(m?c(f,"      AND "):(c(f,"WHERE "),m=!0),c(f,`p.prorettype <> 'pg_catalog.trigger'::pg_catalog.regtype
`)),d||(m?c(f,"      AND "):(c(f,"WHERE "),m=!0),p.sversion>=11e4?c(f,`p.prokind <> 'w'
`):c(f,`NOT p.proiswindow
`));else{let H=!1;c(f,`WHERE (
       `),m=!0,_&&(p.sversion>=11e4?c(f,`p.prokind = 'a'
`):c(f,`p.proisagg
`),H=!0),T&&(H&&c(f,"       OR "),c(f,`p.prorettype = 'pg_catalog.trigger'::pg_catalog.regtype
`),H=!0),N&&(H&&c(f,"       OR "),c(f,`p.prokind = 'p'
`),H=!0),d&&(H&&c(f,"       OR "),p.sversion>=11e4?c(f,`p.prokind = 'w'
`):c(f,`p.proiswindow
`)),c(f,`      )
`)}if(!P(f,E,m,!1,"n.nspname","p.proname",null,"pg_catalog.pg_function_is_visible(p.oid)",null,3))return!1;for(let H=0;H<
s;H++)if(h(t[H],"-")!=0){let Ue,Pe,be,he;if(Ue=$("nt%d.nspname",H),Pe=$("t%d.typname",H),be=$("pg_catalog.format_type(t%\
d.oid, NULL)",H),he=$("pg_catalog.pg_type_is_visible(t%d.oid)",H),!P(f,$e(t[H]),!0,!1,Ue,Pe,be,he,null,3))return!1}else l(
f,`  AND t%d.typname IS NULL
`,H);return!a&&!E&&c(f,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),c(f,"ORDER BY 1, 2, 4;"),y=await O(f.data),y?(b.nullPrint=null,b.title=e("List of functions"),b.translate_header=!0,p.
sversion>=90600?(b.translate_columns=Ee,b.n_translate_columns=Q(Ee)):(b.translate_columns=Z,b.n_translate_columns=Q(Z)),
G(y,b,p.queryFout,!1,p.logfile),!0):!1}async function Wn(r,E,t){let s={},o,a=p.popt;return D(s),L(s,`SELECT n.nspname as\
 "%s",
  pg_catalog.format_type(t.oid, NULL) AS "%s",
`,i("Schema"),i("Name")),E&&(l(s,`  t.typname AS "%s",
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
`,i("Internal name"),i("Size"),i("Elements"),i("Owner")),te(s,"t.typacl"),c(s,`,
  `)),l(s,`  pg_catalog.obj_description(t.oid, 'pg_type') as "%s"
`,i("Description")),c(s,`FROM pg_catalog.pg_type t
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = t.typnamespace
`),c(s,"WHERE (t.typrelid = 0 "),c(s,`OR (SELECT c.relkind = 'c' FROM pg_catalog.pg_class c WHERE c.oid = t.typrelid))
`),(r==null||Qe(r,"[]")==null)&&c(s,`  AND NOT EXISTS(SELECT 1 FROM pg_catalog.pg_type el WHERE el.oid = t.typelem AND e\
l.typarray = t.oid)
`),!t&&!r&&c(s,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!P(s,$e(r),!0,!1,"n.nspname","t.typname","pg_catalog.format_type(t.oid, NULL)","pg_catalog.pg_type_is_visible(t.oid)",
null,3)||(c(s,"ORDER BY 1, 2;"),o=await O(s.data),!o)?!1:(a.nullPrint=null,a.title=e("List of data types"),a.translate_header=
!0,G(o,a,p.queryFout,!1,p.logfile),!0)}function $e(r){let E=["decimal","numeric","float","double precision","int","integ\
er","bool[]","boolean[]","decimal[]","numeric[]","float[]","double precision[]","float4[]","real[]","float8[]","double p\
recision[]","int[]","integer[]","int2[]","smallint[]","int4[]","integer[]","int8[]","bigint[]","time[]","time without ti\
me zone[]","timetz[]","time with time zone[]","timestamp[]","timestamp without time zone[]","timestamptz[]","timestamp w\
ith time zone[]","varbit[]","bit varying[]","varchar[]","character varying[]",null];if(r==null)return null;for(let t=0;E[t]!=
null;t+=2)if(Ja(r,E[t])==0)return E[t+1];return r}async function qn(r,E,t,s,o){let a={},_,g=p.popt;if(D(a),L(a,`SELECT n\
.nspname as "%s",
  o.oprname AS "%s",
  CASE WHEN o.oprkind='l' THEN NULL ELSE pg_catalog.format_type(o.oprleft, NULL) END AS "%s",
  CASE WHEN o.oprkind='r' THEN NULL ELSE pg_catalog.format_type(o.oprright, NULL) END AS "%s",
  pg_catalog.format_type(o.oprresult, NULL) AS "%s",
`,i("Schema"),i("Name"),i("Left arg type"),i("Right arg type"),i("Result type")),s&&l(a,`  o.oprcode AS "%s",
`,i("Function")),l(a,`  coalesce(pg_catalog.obj_description(o.oid, 'pg_operator'),
           pg_catalog.obj_description(o.oprcode, 'pg_proc')) AS "%s"
FROM pg_catalog.pg_operator o
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = o.oprnamespace
`,i("Description")),t>=2?(t=2,c(a,`     LEFT JOIN pg_catalog.pg_type t0 ON t0.oid = o.oprleft
     LEFT JOIN pg_catalog.pg_namespace nt0 ON nt0.oid = t0.typnamespace
     LEFT JOIN pg_catalog.pg_type t1 ON t1.oid = o.oprright
     LEFT JOIN pg_catalog.pg_namespace nt1 ON nt1.oid = t1.typnamespace
`)):t==1&&c(a,`     LEFT JOIN pg_catalog.pg_type t0 ON t0.oid = o.oprright
     LEFT JOIN pg_catalog.pg_namespace nt0 ON nt0.oid = t0.typnamespace
`),!o&&!r&&c(a,`WHERE n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!P(a,r,!o&&!r,!0,"n.nspname","o.oprname",null,"pg_catalog.pg_operator_is_visible(o.oid)",null,3))return!1;t==1&&c(a,`\
  AND o.oprleft = 0
`);for(let N=0;N<t;N++)if(h(E[N],"-")!=0){let T,d,m,f;if(T=$("nt%d.nspname",N),d=$("t%d.typname",N),m=$("pg_catalog.form\
at_type(t%d.oid, NULL)",N),f=$("pg_catalog.pg_type_is_visible(t%d.oid)",N),!P(a,$e(E[N]),!0,!1,T,d,m,f,null,3))return!1}else
l(a,`  AND t%d.typname IS NULL
`,N);return c(a,"ORDER BY 1, 2, 3, 4;"),_=await O(a.data),_?(g.nullPrint=null,g.title=e("List of operators"),g.translate_header=
!0,G(_,g,p.queryFout,!1,p.logfile),!0):!1}async function vn(r,E){let t={},s,o=p.popt,a=[!1,!1,!0,!1,!1,!1];return D(t),L(
t,`SELECT n.nspname as "%s",
  c.relname as "%s",
  CASE c.relkind WHEN 'r' THEN '%s' WHEN 'v' THEN '%s' WHEN 'm' THEN '%s' WHEN 'S' THEN '%s' WHEN 'f' THEN '%s' WHEN 'p'\
 THEN '%s' END as "%s",
  `,i("Schema"),i("Name"),i("table"),i("view"),i("materialized view"),i("sequence"),i("foreign table"),i("partitioned ta\
ble"),i("Type")),te(t,"c.relacl"),l(t,`,
  pg_catalog.array_to_string(ARRAY(
    SELECT attname || E':\\n  ' || pg_catalog.array_to_string(attacl, E'\\n  ')
    FROM pg_catalog.pg_attribute a
    WHERE attrelid = c.oid AND NOT attisdropped AND attacl IS NOT NULL
  ), E'\\n') AS "%s"`,i("Column privileges")),p.sversion>=90500&&p.sversion<1e5&&l(t,`,
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
    AS "%s"`,i("Policies")),p.sversion>=1e5&&l(t,`,
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
    AS "%s"`,i("Policies")),c(t,`
FROM pg_catalog.pg_class c
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
WHERE c.relkind IN ('r','v','m','S','f','p')
`),!E&&!r&&c(t,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!P(t,r,!0,!1,"n.nspname","c.relname",null,"pg_catalog.pg_table_is_visible(c.oid)",null,3)||(c(t,"ORDER BY 1, 2;"),s=await O(
t.data),!s)?!1:(o.nullPrint=null,L(t,e("Access privileges")),o.title=t.data,o.translate_header=!0,o.translate_columns=a,
o.n_translate_columns=Q(a),G(s,o,p.queryFout,!1,p.logfile),!0)}async function Bn(r){let E={},t,s=p.popt,o=[!1,!1,!0,!1];
return D(E),L(E,`SELECT pg_catalog.pg_get_userbyid(d.defaclrole) AS "%s",
  n.nspname AS "%s",
  CASE d.defaclobjtype WHEN '%c' THEN '%s' WHEN '%c' THEN '%s' WHEN '%c' THEN '%s' WHEN '%c' THEN '%s' WHEN '%c' THEN '%\
s' END AS "%s",
  `,i("Owner"),i("Schema"),ya,i("table"),Ma,i("sequence"),Ha,i("function"),wa,i("type"),Ga,i("schema"),i("Type")),te(E,"\
d.defaclacl"),c(E,`
FROM pg_catalog.pg_default_acl d
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = d.defaclnamespace
`),!P(E,r,!1,!1,null,"n.nspname","pg_catalog.pg_get_userbyid(d.defaclrole)",null,null,3)||(c(E,"ORDER BY 1, 2, 3;"),t=await O(
E.data),!t)?!1:(s.nullPrint=null,L(E,e("Default access privileges")),s.title=E.data,s.translate_header=!0,s.translate_columns=
o,s.n_translate_columns=Q(o),G(t,s,p.queryFout,!1,p.logfile),!0)}async function Yn(r,E){let t={},s,o=p.popt,a=[!1,!1,!0,
!1];return D(t),l(t,`SELECT DISTINCT tt.nspname AS "%s", tt.name AS "%s", tt.object AS "%s", d.description AS "%s"
FROM (
`,i("Schema"),i("Name"),i("Object"),i("Description")),l(t,`  SELECT pgc.oid as oid, pgc.tableoid AS tableoid,
  n.nspname as nspname,
  CAST(pgc.conname AS pg_catalog.text) as name,  CAST('%s' AS pg_catalog.text) as object
  FROM pg_catalog.pg_constraint pgc
    JOIN pg_catalog.pg_class c ON c.oid = pgc.conrelid
    LEFT JOIN pg_catalog.pg_namespace n     ON n.oid = c.relnamespace
`,i("table constraint")),!E&&!r&&c(t,`WHERE n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!P(t,r,!E&&!r,!1,"n.nspname","pgc.conname",null,"pg_catalog.pg_table_is_visible(c.oid)",null,3)||(l(t,`UNION ALL
  SELECT pgc.oid as oid, pgc.tableoid AS tableoid,
  n.nspname as nspname,
  CAST(pgc.conname AS pg_catalog.text) as name,  CAST('%s' AS pg_catalog.text) as object
  FROM pg_catalog.pg_constraint pgc
    JOIN pg_catalog.pg_type t ON t.oid = pgc.contypid
    LEFT JOIN pg_catalog.pg_namespace n     ON n.oid = t.typnamespace
`,i("domain constraint")),!E&&!r&&c(t,`WHERE n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!P(t,r,!E&&!r,!1,"n.nspname","pgc.conname",null,"pg_catalog.pg_type_is_visible(t.oid)",null,3))||(l(t,`UNION ALL
  SELECT o.oid as oid, o.tableoid as tableoid,
  n.nspname as nspname,
  CAST(o.opcname AS pg_catalog.text) as name,
  CAST('%s' AS pg_catalog.text) as object
  FROM pg_catalog.pg_opclass o
    JOIN pg_catalog.pg_am am ON o.opcmethod = am.oid
    JOIN pg_catalog.pg_namespace n ON n.oid = o.opcnamespace
`,i("operator class")),!E&&!r&&c(t,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!P(t,r,!0,!1,"n.nspname","o.opcname",null,"pg_catalog.pg_opclass_is_visible(o.oid)",null,3))||(l(t,`UNION ALL
  SELECT opf.oid as oid, opf.tableoid as tableoid,
  n.nspname as nspname,
  CAST(opf.opfname AS pg_catalog.text) AS name,
  CAST('%s' AS pg_catalog.text) as object
  FROM pg_catalog.pg_opfamily opf
    JOIN pg_catalog.pg_am am ON opf.opfmethod = am.oid
    JOIN pg_catalog.pg_namespace n ON opf.opfnamespace = n.oid
`,i("operator family")),!E&&!r&&c(t,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!P(t,r,!0,!1,"n.nspname","opf.opfname",null,"pg_catalog.pg_opfamily_is_visible(opf.oid)",null,3))||(l(t,`UNION ALL
  SELECT r.oid as oid, r.tableoid as tableoid,
  n.nspname as nspname,
  CAST(r.rulename AS pg_catalog.text) as name,  CAST('%s' AS pg_catalog.text) as object
  FROM pg_catalog.pg_rewrite r
       JOIN pg_catalog.pg_class c ON c.oid = r.ev_class
       LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
  WHERE r.rulename != '_RETURN'
`,i("rule")),!E&&!r&&c(t,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!P(t,r,!0,!1,"n.nspname","r.rulename",null,"pg_catalog.pg_table_is_visible(c.oid)",null,3))||(l(t,`UNION ALL
  SELECT t.oid as oid, t.tableoid as tableoid,
  n.nspname as nspname,
  CAST(t.tgname AS pg_catalog.text) as name,  CAST('%s' AS pg_catalog.text) as object
  FROM pg_catalog.pg_trigger t
       JOIN pg_catalog.pg_class c ON c.oid = t.tgrelid
       LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
`,i("trigger")),!E&&!r&&c(t,`WHERE n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!P(t,r,!E&&!r,!1,"n.nspname","t.tgname",null,"pg_catalog.pg_table_is_visible(c.oid)",null,3))||(c(t,`) AS tt
  JOIN pg_catalog.pg_description d ON (tt.oid = d.objoid AND tt.tableoid = d.classoid AND d.objsubid = 0)
`),c(t,"ORDER BY 1, 2, 3;"),s=await O(t.data),!s)?!1:(o.nullPrint=null,o.title=e("Object descriptions"),o.translate_header=
!0,o.translate_columns=a,o.n_translate_columns=Q(a),G(s,o,p.queryFout,!1,p.logfile),!0)}async function xn(r,E,t){let s={},
o,a;if(D(s),L(s,`SELECT c.oid,
  n.nspname,
  c.relname
FROM pg_catalog.pg_class c
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
`),!t&&!r&&c(s,`WHERE n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!P(s,r,!t&&!r,!1,"n.nspname","c.relname",null,"pg_catalog.pg_table_is_visible(c.oid)",null,3)||(c(s,"ORDER BY 2, 3;"),
o=await O(s.data),!o))return!1;if(q(o)==0)return p.quiet||(r?W('Did not find any relation named "%s".',r):W("Did not fin\
d any relations.")),!1;for(a=0;a<q(o);a++){let _,g,N;if(_=A(o,a,0),g=A(o,a,1),N=A(o,a,2),!await Vn(g,N,_,E)||X)return!1}
return!0}async function Vn(r,E,t,s){let o=!1,a={},_=null,g=p.popt.topt,N={},T,d=null,m=[],f={},y={},b,Ee=-1,Z=-1,H=-1,Ue=-1,
Pe=-1,be=-1,he=-1,Ye=-1,xe=-1,Ve=-1,Xe=-1,ke=-1,je=-1,Je=-1,nn,S={},Ke=!1;if(g.default_footer=!1,g.expanded=!1,D(a),D(f),
D(y),p.sversion>=12e4?L(a,`SELECT c.relchecks, c.relkind, c.relhasindex, c.relhasrules, c.relhastriggers, c.relrowsecuri\
ty, c.relforcerowsecurity, false AS relhasoids, c.relispartition, %s, c.reltablespace, CASE WHEN c.reloftype = 0 THEN ''\
 ELSE c.reloftype::pg_catalog.regtype::pg_catalog.text END, c.relpersistence, c.relreplident, am.amname
FROM pg_catalog.pg_class c
 LEFT JOIN pg_catalog.pg_class tc ON (c.reltoastrelid = tc.oid)
LEFT JOIN pg_catalog.pg_am am ON (c.relam = am.oid)
WHERE c.oid = '%s';`,s?`pg_catalog.array_to_string(c.reloptions || array(select 'toast.' || x from pg_catalog.unnest(tc.\
reloptions) x), ', ')
`:"''",t):p.sversion>=1e5?L(a,`SELECT c.relchecks, c.relkind, c.relhasindex, c.relhasrules, c.relhastriggers, c.relrowse\
curity, c.relforcerowsecurity, c.relhasoids, c.relispartition, %s, c.reltablespace, CASE WHEN c.reloftype = 0 THEN '' EL\
SE c.reloftype::pg_catalog.regtype::pg_catalog.text END, c.relpersistence, c.relreplident
FROM pg_catalog.pg_class c
 LEFT JOIN pg_catalog.pg_class tc ON (c.reltoastrelid = tc.oid)
WHERE c.oid = '%s';`,s?`pg_catalog.array_to_string(c.reloptions || array(select 'toast.' || x from pg_catalog.unnest(tc.\
reloptions) x), ', ')
`:"''",t):p.sversion>=90500?L(a,`SELECT c.relchecks, c.relkind, c.relhasindex, c.relhasrules, c.relhastriggers, c.relrow\
security, c.relforcerowsecurity, c.relhasoids, false as relispartition, %s, c.reltablespace, CASE WHEN c.reloftype = 0 T\
HEN '' ELSE c.reloftype::pg_catalog.regtype::pg_catalog.text END, c.relpersistence, c.relreplident
FROM pg_catalog.pg_class c
 LEFT JOIN pg_catalog.pg_class tc ON (c.reltoastrelid = tc.oid)
WHERE c.oid = '%s';`,s?`pg_catalog.array_to_string(c.reloptions || array(select 'toast.' || x from pg_catalog.unnest(tc.\
reloptions) x), ', ')
`:"''",t):p.sversion>=90400?L(a,`SELECT c.relchecks, c.relkind, c.relhasindex, c.relhasrules, c.relhastriggers, false, f\
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
`:"''",t),_=await O(a.data),!_)return o;if(q(_)==0)return p.quiet||W("Did not find any relation with OID %s.",t),o;if(S.
checks=Nn(A(_,0,0)),S.relkind=A(_,0,1),S.hasindex=h(A(_,0,2),"t")==0,S.hasrules=h(A(_,0,3),"t")==0,S.hastriggers=h(A(_,0,
4),"t")==0,S.rowsecurity=h(A(_,0,5),"t")==0,S.forcerowsecurity=h(A(_,0,6),"t")==0,S.hasoids=h(A(_,0,7),"t")==0,S.ispartition=
h(A(_,0,8),"t")==0,S.reloptions=Se(A(_,0,9)),S.tablespace=sn(A(_,0,10)),S.reloftype=h(A(_,0,11),"")!=0?Se(A(_,0,11)):null,
S.relpersistence=A(_,0,12),S.relreplident=p.sversion>=90400?A(_,0,13):"d",p.sversion>=12e4?S.relam=ee(_,0,14)?null:Se(A(
_,0,14)):S.relam=null,_=null,S.relkind==Ba){let R=null,I=p.popt,F=[null,null];if(p.sversion>=1e5?(L(a,`SELECT pg_catalog\
.format_type(seqtypid, NULL) AS "%s",
       seqstart AS "%s",
       seqmin AS "%s",
       seqmax AS "%s",
       seqincrement AS "%s",
       CASE WHEN seqcycle THEN '%s' ELSE '%s' END AS "%s",
       seqcache AS "%s"
`,i("Type"),i("Start"),i("Minimum"),i("Maximum"),i("Increment"),i("yes"),i("no"),i("Cycles?"),i("Cache")),l(a,`FROM pg_c\
atalog.pg_sequence
WHERE seqrelid = '%s';`,t)):(L(a,`SELECT 'bigint' AS "%s",
       start_value AS "%s",
       min_value AS "%s",
       max_value AS "%s",
       increment_by AS "%s",
       CASE WHEN is_cycled THEN '%s' ELSE '%s' END AS "%s",
       cache_value AS "%s"
`,i("Type"),i("Start"),i("Minimum"),i("Maximum"),i("Increment"),i("yes"),i("no"),i("Cycles?"),i("Cache")),l(a,"FROM %s",
ue(r)),l(a,".%s;",ue(E))),_=await O(a.data),!_)return o;if(L(a,`SELECT pg_catalog.quote_ident(nspname) || '.' ||
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
 AND d.deptype IN ('a', 'i')`,t),R=await O(a.data),R){if(q(R)==1)switch(A(R,0,1)[0]){case"a":F[0]=ln(e("Owned by: %s"),A(
R,0,0));break;case"i":F[0]=ln(e("Sequence for identity column: %s"),A(R,0,0));break}}else return o;return S.relpersistence==
"u"?L(f,e('Unlogged sequence "%s.%s"'),r,E):L(f,e('Sequence "%s.%s"'),r,E),I.footers=F,I.topt.default_footer=!1,I.title=
f.data,I.translate_header=!0,G(_,I,p.queryFout,!1,p.logfile),o=!0,o}if((S.relkind==re||S.relkind==Me||S.relkind==oe||S.relkind==
ce||S.relkind==an||S.relkind==ae)&&(Ke=!0),b=0,L(a,"SELECT a.attname"),Ee=b++,c(a,`,
  pg_catalog.format_type(a.atttypid, a.atttypmod)`),Z=b++,Ke&&(c(a,`,
  (SELECT pg_catalog.pg_get_expr(d.adbin, d.adrelid, true)
   FROM pg_catalog.pg_attrdef d
   WHERE d.adrelid = a.attrelid AND d.adnum = a.attnum AND a.atthasdef),
  a.attnotnull`),H=b++,Ue=b++,c(a,`,
  (SELECT c.collname FROM pg_catalog.pg_collation c, pg_catalog.pg_type t
   WHERE c.oid = a.attcollation AND t.oid = a.atttypid AND a.attcollation <> t.typcollation) AS attcollation`),Pe=b++,p.
sversion>=1e5?c(a,`,
  a.attidentity`):c(a,`,
  ''::pg_catalog.char AS attidentity`),be=b++,p.sversion>=12e4?c(a,`,
  a.attgenerated`):c(a,`,
  ''::pg_catalog.char AS attgenerated`),he=b++),(S.relkind==ge||S.relkind==_e)&&(p.sversion>=11e4&&(l(a,`,
  CASE WHEN a.attnum <= (SELECT i.indnkeyatts FROM pg_catalog.pg_index i WHERE i.indexrelid = '%s') THEN '%s' ELSE '%s' \
END AS is_key`,t,i("yes"),i("no")),Ye=b++),c(a,`,
  pg_catalog.pg_get_indexdef(a.attrelid, a.attnum, TRUE) AS indexdef`),xe=b++),S.relkind==ce&&(c(a,`,
  CASE WHEN attfdwoptions IS NULL THEN '' ELSE   '(' || pg_catalog.array_to_string(ARRAY(SELECT pg_catalog.quote_ident(o\
ption_name) || ' ' || pg_catalog.quote_literal(option_value)  FROM   pg_catalog.pg_options_to_table(attfdwoptions)), ', \
') || ')' END AS attfdwoptions`),Ve=b++),s&&(c(a,`,
  a.attstorage`),Xe=b++,p.sversion>=14e4&&!p.hide_compression&&(S.relkind==re||S.relkind==ae||S.relkind==oe)&&(c(a,`,
  a.attcompression AS attcompression`),ke=b++),(S.relkind==re||S.relkind==ge||S.relkind==_e||S.relkind==oe||S.relkind==ce||
S.relkind==ae)&&(c(a,`,
  CASE WHEN a.attstattarget=-1 THEN NULL ELSE a.attstattarget END AS attstattarget`),je=b++),(S.relkind==re||S.relkind==
Me||S.relkind==oe||S.relkind==ce||S.relkind==an||S.relkind==ae)&&(c(a,`,
  pg_catalog.col_description(a.attrelid, a.attnum)`),Je=b++)),c(a,`
FROM pg_catalog.pg_attribute a`),l(a,`
WHERE a.attrelid = '%s' AND a.attnum > 0 AND NOT a.attisdropped`,t),c(a,`
ORDER BY a.attnum;`),_=await O(a.data),!_)return o;switch(nn=q(_),S.relkind){case re:S.relpersistence=="u"?L(f,e('Unlogg\
ed table "%s.%s"'),r,E):L(f,e('Table "%s.%s"'),r,E);break;case Me:L(f,e('View "%s.%s"'),r,E);break;case oe:S.relpersistence==
"u"?L(f,e('Unlogged materialized view "%s.%s"'),r,E):L(f,e('Materialized view "%s.%s"'),r,E);break;case ge:S.relpersistence==
"u"?L(f,e('Unlogged index "%s.%s"'),r,E):L(f,e('Index "%s.%s"'),r,E);break;case _e:S.relpersistence=="u"?L(f,e('Unlogged\
 partitioned index "%s.%s"'),r,E):L(f,e('Partitioned index "%s.%s"'),r,E);break;case ye:L(f,e('TOAST table "%s.%s"'),r,E);
break;case an:L(f,e('Composite type "%s.%s"'),r,E);break;case ce:L(f,e('Foreign table "%s.%s"'),r,E);break;case ae:S.relpersistence==
"u"?L(f,e('Unlogged partitioned table "%s.%s"'),r,E):L(f,e('Partitioned table "%s.%s"'),r,E);break;default:L(f,'?%c? "%s\
.%s"',S.relkind,r,E);break}for(b=0,m[b++]=i("Column"),m[b++]=i("Type"),Ke&&(m[b++]=i("Collation"),m[b++]=i("Nullable"),m[b++]=
i("Default")),Ye>=0&&(m[b++]=i("Key?")),xe>=0&&(m[b++]=i("Definition")),Ve>=0&&(m[b++]=i("FDW options")),Xe>=0&&(m[b++]=
i("Storage")),ke>=0&&(m[b++]=i("Compression")),je>=0&&(m[b++]=i("Stats target")),Je>=0&&(m[b++]=i("Description")),de(b<=
Q(m)),ve(N,g,f.data,b,nn),T=0;T<b;T++)ie(N,m[T],!0,"l");for(T=0;T<nn;T++){if(j(N,A(_,T,Ee),!1,!1),j(N,A(_,T,Z),!1,!1),Ke){
let R,I,F,w=!1;j(N,A(_,T,Pe),!1,!1),j(N,h(A(_,T,Ue),"t")==0?"not null":"",!1,!1),R=A(_,T,be),I=A(_,T,he),R[0]==Wa?F="gen\
erated always as identity":R[0]==qa?F="generated by default as identity":I[0]==va?(F=ln("generated always as (%s) stored",
A(_,T,H)),w=!0):F=A(_,T,H),j(N,F,!1,w)}if(Ye>=0&&j(N,A(_,T,Ye),!0,!1),xe>=0&&j(N,A(_,T,xe),!1,!1),Ve>=0&&j(N,A(_,T,Ve),!1,
!1),Xe>=0){let R=A(_,T,Xe);j(N,R[0]=="p"?"plain":R[0]=="m"?"main":R[0]=="x"?"extended":R[0]=="e"?"external":"???",!1,!1)}
if(ke>=0){let R=A(_,T,ke);j(N,R[0]=="p"?"pglz":R[0]=="l"?"lz4":R[0]==null?"":"???",!1,!1)}je>=0&&j(N,A(_,T,je),!1,!1),Je>=
0&&j(N,A(_,T,Je),!1,!1)}if(S.ispartition){let R;if(L(a,`SELECT inhparent::pg_catalog.regclass,
  pg_catalog.pg_get_expr(c.relpartbound, c.oid),
  `),c(a,p.sversion>=14e4?"inhdetachpending":"false as inhdetachpending"),s&&c(a,`,
  pg_catalog.pg_get_partition_constraintdef(c.oid)`),l(a,`
FROM pg_catalog.pg_class c JOIN pg_catalog.pg_inherits i ON c.oid = inhrelid
WHERE c.oid = '%s';`,t),R=await O(a.data),!R)return o;if(q(R)>0){let I=A(R,0,0),F=A(R,0,1),w=A(R,0,2);if(L(y,e("Partitio\
n of: %s %s%s"),I,F,h(w,"t")==0?" DETACH PENDING":""),M(N,y.data),s){let B=null;ee(R,0,3)||(B=A(R,0,3)),B==null||B[0]==null?
L(y,e("No partition constraint")):L(y,e("Partition constraint: %s"),B),M(N,y.data)}}}if(S.relkind==ae){let R;if(L(a,"SEL\
ECT pg_catalog.pg_get_partkeydef('%s'::pg_catalog.oid);",t),R=await O(a.data),!R)return o;if(q(R)==1){let I=A(R,0,0);L(y,
e("Partition key: %s"),I),M(N,y.data)}}if(S.relkind==ye){let R;if(L(a,`SELECT n.nspname, c.relname
FROM pg_catalog.pg_class c JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
WHERE reltoastrelid = '%s';`,t),R=await O(a.data),!R)return o;if(q(R)==1){let I=A(R,0,0),F=A(R,0,1);L(y,e('Owning table:\
 "%s.%s"'),I,F),M(N,y.data)}}if(S.relkind==ge||S.relkind==_e){let R;if(L(a,`SELECT i.indisunique, i.indisprimary, i.indi\
sclustered, i.indisvalid,
  (NOT i.indimmediate) AND EXISTS (SELECT 1 FROM pg_catalog.pg_constraint WHERE conrelid = i.indrelid AND conindid = i.i\
ndexrelid AND contype IN ('p','u','x') AND condeferrable) AS condeferrable,
  (NOT i.indimmediate) AND EXISTS (SELECT 1 FROM pg_catalog.pg_constraint WHERE conrelid = i.indrelid AND conindid = i.i\
ndexrelid AND contype IN ('p','u','x') AND condeferred) AS condeferred,
`),p.sversion>=90400?c(a,`i.indisreplident,
`):c(a,`false AS indisreplident,
`),p.sversion>=15e4?c(a,`i.indnullsnotdistinct,
`):c(a,`false AS indnullsnotdistinct,
`),l(a,`  a.amname, c2.relname, pg_catalog.pg_get_expr(i.indpred, i.indrelid, true)
FROM pg_catalog.pg_index i, pg_catalog.pg_class c, pg_catalog.pg_class c2, pg_catalog.pg_am a
WHERE i.indexrelid = c.oid AND c.oid = '%s' AND c.relam = a.oid
AND i.indrelid = c2.oid;`,t),R=await O(a.data),R){if(q(R)!=1)return o;{let I=A(R,0,0),F=A(R,0,1),w=A(R,0,2),B=A(R,0,3),k=A(
R,0,4),Te=A(R,0,5),ne=A(R,0,6),Fe=A(R,0,7),Ca=A(R,0,8),Da=A(R,0,9),Tn=A(R,0,10);h(F,"t")==0?L(y,e("primary key, ")):h(I,
"t")==0?(L(y,e("unique")),h(Fe,"t")==0&&c(y,e(" nulls not distinct")),c(y,e(", "))):on(y),l(y,"%s, ",Ca),l(y,e('for tabl\
e "%s.%s"'),r,Da),pe(Tn)&&l(y,e(", predicate (%s)"),Tn),h(w,"t")==0&&c(y,e(", clustered")),h(B,"t")!=0&&c(y,e(", invalid")),
h(k,"t")==0&&c(y,e(", deferrable")),h(Te,"t")==0&&c(y,e(", initially deferred")),h(ne,"t")==0&&c(y,e(", replica identity")),
M(N,y.data),S.relkind==ge&&await en(N,S.relkind,S.tablespace,!0)}}else return o}else if(S.relkind==re||S.relkind==oe||S.
relkind==ce||S.relkind==ae||S.relkind==_e||S.relkind==ye){let R=null,I=0;if(S.hasindex){if(L(a,`SELECT c2.relname, i.ind\
isprimary, i.indisunique, i.indisclustered, i.indisvalid, pg_catalog.pg_get_indexdef(i.indexrelid, 0, true),
  pg_catalog.pg_get_constraintdef(con.oid, true), contype, condeferrable, condeferred`),p.sversion>=90400?c(a,", i.indis\
replident"):c(a,", false AS indisreplident"),c(a,", c2.reltablespace"),l(a,`
FROM pg_catalog.pg_class c, pg_catalog.pg_class c2, pg_catalog.pg_index i
  LEFT JOIN pg_catalog.pg_constraint con ON (conrelid = i.indrelid AND conindid = i.indexrelid AND contype IN ('p','u','\
x'))
WHERE c.oid = '%s' AND c.oid = i.indrelid AND i.indexrelid = c2.oid
ORDER BY i.indisprimary DESC, c2.relname;`,t),R=await O(a.data),R)I=q(R);else return o;if(I>0)for(M(N,e("Indexes:")),T=0;T<
I;T++){if(L(a,'    "%s"',A(R,T,0)),h(A(R,T,7),"x")==0)l(a," %s",A(R,T,6));else{let F,w;h(A(R,T,1),"t")==0?c(a," PRIMARY \
KEY,"):h(A(R,T,2),"t")==0&&(h(A(R,T,7),"u")==0?c(a," UNIQUE CONSTRAINT,"):c(a," UNIQUE,")),F=A(R,T,5),w=Qe(F," USING "),
w!=null&&(F=F.slice(w+7)),l(a," %s",F),h(A(R,T,8),"t")==0&&c(a," DEFERRABLE"),h(A(R,T,9),"t")==0&&c(a," INITIALLY DEFERR\
ED")}h(A(R,T,3),"t")==0&&c(a," CLUSTER"),h(A(R,T,4),"t")!=0&&c(a," INVALID"),h(A(R,T,10),"t")==0&&c(a," REPLICA IDENTITY"),
M(N,a.data),await en(N,ge,sn(A(R,T,11)),!1)}}if(S.checks){if(L(a,`SELECT r.conname, pg_catalog.pg_get_constraintdef(r.oi\
d, true)
FROM pg_catalog.pg_constraint r
WHERE r.conrelid = '%s' AND r.contype = 'c'
ORDER BY 1;`,t),R=await O(a.data),R)I=q(R);else return o;if(I>0)for(M(N,e("Check constraints:")),T=0;T<I;T++)L(a,'    "%\
s" %s',A(R,T,0),A(R,T,1)),M(N,a.data)}if(S.hastriggers||S.relkind==ae){if(p.sversion>=12e4&&(S.ispartition||S.relkind==ae)?
L(a,`SELECT conrelid = '%s'::pg_catalog.regclass AS sametable,
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
`,t),p.sversion>=12e4&&c(a,`     AND conparentid = 0
`),c(a,"ORDER BY conname")),R=await O(a.data),R)I=q(R);else return o;if(I>0){let F=fe(R,"sametable"),w=fe(R,"conname"),B=fe(
R,"condef"),k=fe(R,"ontable");for(M(N,e("Foreign-key constraints:")),T=0;T<I;T++)h(A(R,T,F),"f")==0?L(a,'    TABLE "%s" \
CONSTRAINT "%s" %s',A(R,T,k),A(R,T,w),A(R,T,B)):L(a,'    "%s" %s',A(R,T,w),A(R,T,B)),M(N,a.data)}}if(S.hastriggers||S.relkind==
ae){if(p.sversion>=12e4?L(a,`SELECT conname, conrelid::pg_catalog.regclass AS ontable,
       pg_catalog.pg_get_constraintdef(oid, true) AS condef
  FROM pg_catalog.pg_constraint c
 WHERE confrelid IN (SELECT pg_catalog.pg_partition_ancestors('%s')
                     UNION ALL VALUES ('%s'::pg_catalog.regclass))
       AND contype = 'f' AND conparentid = 0
ORDER BY conname;`,t,t):L(a,`SELECT conname, conrelid::pg_catalog.regclass AS ontable,
       pg_catalog.pg_get_constraintdef(oid, true) AS condef
  FROM pg_catalog.pg_constraint
 WHERE confrelid = %s AND contype = 'f'
ORDER BY conname;`,t),R=await O(a.data),R)I=q(R);else return o;if(I>0){let F=fe(R,"conname"),w=fe(R,"ontable"),B=fe(R,"c\
ondef");for(M(N,e("Referenced by:")),T=0;T<I;T++)L(a,'    TABLE "%s" CONSTRAINT "%s" %s',A(R,T,w),A(R,T,F),A(R,T,B)),M(N,
a.data)}}if(p.sversion>=90500){if(L(a,"SELECT pol.polname,"),p.sversion>=1e5?c(a,` pol.polpermissive,
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
WHERE pol.polrelid = '%s' ORDER BY 1;`,t),R=await O(a.data),R)I=q(R);else return o;for(S.rowsecurity&&!S.forcerowsecurity&&
I>0&&M(N,e("Policies:")),S.rowsecurity&&S.forcerowsecurity&&I>0&&M(N,e("Policies (forced row security enabled):")),S.rowsecurity&&
!S.forcerowsecurity&&I==0&&M(N,e("Policies (row security enabled): (none)")),S.rowsecurity&&S.forcerowsecurity&&I==0&&M(
N,e("Policies (forced row security enabled): (none)")),!S.rowsecurity&&I>0&&M(N,e("Policies (row security disabled):")),
T=0;T<I;T++)L(a,'    POLICY "%s"',A(R,T,0)),A(R,T,1)=="f"&&c(a," AS RESTRICTIVE"),ee(R,T,5)||l(a," FOR %s",A(R,T,5)),ee(
R,T,2)||l(a,`
      TO %s`,A(R,T,2)),ee(R,T,3)||l(a,`
      USING (%s)`,A(R,T,3)),ee(R,T,4)||l(a,`
      WITH CHECK (%s)`,A(R,T,4)),M(N,a.data)}if(p.sversion>=14e4){if(L(a,`SELECT oid, stxrelid::pg_catalog.regclass, stx\
namespace::pg_catalog.regnamespace::pg_catalog.text AS nsp, stxname,
pg_catalog.pg_get_statisticsobjdef_columns(oid) AS columns,
  'd' = any(stxkind) AS ndist_enabled,
  'f' = any(stxkind) AS deps_enabled,
  'm' = any(stxkind) AS mcv_enabled,
stxstattarget
FROM pg_catalog.pg_statistic_ext
WHERE stxrelid = '%s'
ORDER BY nsp, stxname;`,t),R=await O(a.data),R)I=q(R);else return o;if(I>0)for(M(N,e("Statistics objects:")),T=0;T<I;T++){
let F=!1,w,B,k,Te,ne;w=h(A(R,T,5),"t")==0,B=h(A(R,T,6),"t")==0,k=h(A(R,T,7),"t")==0,L(a,"    "),l(a,'"%s.%s"',A(R,T,2),A(
R,T,3)),Te=w&&B&&k,ne=w||B||k,ne&&!Te&&(c(a," ("),w&&(c(a,"ndistinct"),F=!0),B&&(l(a,"%sdependencies",F?", ":""),F=!0),k&&
l(a,"%smcv",F?", ":""),V(a,")")),l(a," ON %s FROM %s",A(R,T,4),A(R,T,1)),!ee(R,T,8)&&h(A(R,T,8),"-1")!=0&&l(a,"; STATIST\
ICS %s",A(R,T,8)),M(N,a.data)}}else if(p.sversion>=1e5){if(L(a,`SELECT oid, stxrelid::pg_catalog.regclass, stxnamespace:\
:pg_catalog.regnamespace AS nsp, stxname,
  (SELECT pg_catalog.string_agg(pg_catalog.quote_ident(attname),', ')
   FROM pg_catalog.unnest(stxkeys) s(attnum)
   JOIN pg_catalog.pg_attribute a ON (stxrelid = a.attrelid AND
        a.attnum = s.attnum AND NOT attisdropped)) AS columns,
  'd' = any(stxkind) AS ndist_enabled,
  'f' = any(stxkind) AS deps_enabled,
  'm' = any(stxkind) AS mcv_enabled,
`),p.sversion>=13e4?c(a,`  stxstattarget
`):c(a,`  -1 AS stxstattarget
`),l(a,`FROM pg_catalog.pg_statistic_ext
WHERE stxrelid = '%s'
ORDER BY 1;`,t),R=await O(a.data),R)I=q(R);else return o;if(I>0)for(M(N,e("Statistics objects:")),T=0;T<I;T++){let F=!1;
L(a,"    "),l(a,'"%s.%s" (',A(R,T,2),A(R,T,3)),h(A(R,T,5),"t")==0&&(c(a,"ndistinct"),F=!0),h(A(R,T,6),"t")==0&&(l(a,"%sd\
ependencies",F?", ":""),F=!0),h(A(R,T,7),"t")==0&&l(a,"%smcv",F?", ":""),l(a,") ON %s FROM %s",A(R,T,4),A(R,T,1)),h(A(R,
T,8),"-1")!=0&&l(a,"; STATISTICS %s",A(R,T,8)),M(N,a.data)}}if(S.hasrules&&S.relkind!=oe){if(L(a,`SELECT r.rulename, tri\
m(trailing ';' from pg_catalog.pg_get_ruledef(r.oid, true)), ev_enabled
FROM pg_catalog.pg_rewrite r
WHERE r.ev_class = '%s' ORDER BY 1;`,t),R=await O(a.data),R)I=q(R);else return o;if(I>0){let F,w;for(w=0;w<4;w++)for(F=!1,
T=0;T<I;T++){let B,k=!1;switch(w){case 0:A(R,T,2)=="O"&&(k=!0);break;case 1:A(R,T,2)=="D"&&(k=!0);break;case 2:A(R,T,2)==
"A"&&(k=!0);break;case 3:A(R,T,2)=="R"&&(k=!0);break}if(k){if(!F){switch(w){case 0:L(a,e("Rules:"));break;case 1:L(a,e("\
Disabled rules:"));break;case 2:L(a,e("Rules firing always:"));break;case 3:L(a,e("Rules firing on replica only:"));break}
M(N,a.data),F=!0}B=A(R,T,1),B=B.slice(12),L(a,"    %s",B),M(N,a.data)}}}}if(p.sversion>=1e5){if(p.sversion>=15e4?L(a,`SE\
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
ORDER BY 1;`,t,t),R=await O(a.data),R)I=q(R);else return o;for(I>0&&M(N,e("Publications:")),T=0;T<I;T++)L(a,'    "%s"',A(
R,T,0)),ee(R,T,2)||l(a," (%s)",A(R,T,2)),ee(R,T,1)||l(a," WHERE %s",A(R,T,1)),M(N,a.data)}}if((S.relkind==Me||S.relkind==
oe)&&s){let R;if(L(a,"SELECT pg_catalog.pg_get_viewdef('%s'::pg_catalog.oid, true);",t),R=await O(a.data),!R)return o;q(
R)>0&&(d=Se(A(R,0,0)))}if(d){let R=null;if(M(N,e("View definition:")),M(N,d),S.hasrules){if(L(a,`SELECT r.rulename, trim\
(trailing ';' from pg_catalog.pg_get_ruledef(r.oid, true))
FROM pg_catalog.pg_rewrite r
WHERE r.ev_class = '%s' AND r.rulename != '_RETURN' ORDER BY 1;`,t),R=await O(a.data),!R)return o;if(q(R)>0)for(M(N,e("R\
ules:")),T=0;T<q(R);T++){let I;I=A(R,T,1),I=I.slice(12),L(a," %s",I),M(N,a.data)}}}if(S.hastriggers){let R,I;if(L(a,`SEL\
ECT t.tgname, pg_catalog.pg_get_triggerdef(t.oid, true), t.tgenabled, t.tgisinternal,
`),p.sversion>=13e4?c(a,`  CASE WHEN t.tgparentid != 0 THEN
    (SELECT u.tgrelid::pg_catalog.regclass
     FROM pg_catalog.pg_trigger AS u,
          pg_catalog.pg_partition_ancestors(t.tgrelid) WITH ORDINALITY AS a(relid, depth)
     WHERE u.tgname = t.tgname AND u.tgrelid = a.relid
           AND u.tgparentid = 0
     ORDER BY a.depth LIMIT 1)
  END AS parent
`):c(a,`  NULL AS parent
`),l(a,`FROM pg_catalog.pg_trigger t
WHERE t.tgrelid = '%s' AND `,t),p.sversion>=11e4&&p.sversion<15e4?c(a,`(NOT t.tgisinternal OR (t.tgisinternal AND t.tgen\
abled = 'D') 
    OR EXISTS (SELECT 1 FROM pg_catalog.pg_depend WHERE objid = t.oid 
        AND refclassid = 'pg_catalog.pg_trigger'::pg_catalog.regclass))`):c(a,"(NOT t.tgisinternal OR (t.tgisinternal AN\
D t.tgenabled = 'D'))"),c(a,`
ORDER BY 1;`),R=await O(a.data),R)I=q(R);else return o;if(I>0){let F,w;for(w=0;w<=4;w++)for(F=!1,T=0;T<I;T++){let B,k,Te,
ne,Fe;switch(ne=A(R,T,2),Fe=A(R,T,3),B=!1,w){case 0:(ne=="O"||ne=="t")&&(B=!0);break;case 1:(ne=="D"||ne=="f")&&Fe=="f"&&
(B=!0);break;case 2:(ne=="D"||ne=="f")&&Fe=="t"&&(B=!0);break;case 3:ne=="A"&&(B=!0);break;case 4:ne=="R"&&(B=!0);break}
if(B!=!1){if(F==!1){switch(w){case 0:L(a,e("Triggers:"));break;case 1:L(a,e("Disabled user triggers:"));break;case 2:L(a,
e("Disabled internal triggers:"));break;case 3:L(a,e("Triggers firing always:"));break;case 4:L(a,e("Triggers firing on \
replica only:"));break}M(N,a.data),F=!0}k=A(R,T,1),Te=Qe(k," TRIGGER "),Te!=null&&(k=k.slice(Te+9)),L(a,"    %s",k),ee(R,
T,4)||l(a,", ON TABLE %s",A(R,T,4)),M(N,a.data)}}}}if(S.relkind==re||S.relkind==oe||S.relkind==ce||S.relkind==ae||S.relkind==
_e||S.relkind==ye){let R,I,F;if(R=S.relkind==ae||S.relkind==_e,S.relkind==ce){let w;if(L(a,`SELECT s.srvname,
  pg_catalog.array_to_string(ARRAY(
    SELECT pg_catalog.quote_ident(option_name) || ' ' || pg_catalog.quote_literal(option_value)
    FROM pg_catalog.pg_options_to_table(ftoptions)),  ', ')
FROM pg_catalog.pg_foreign_table f,
     pg_catalog.pg_foreign_server s
WHERE f.ftrelid = '%s' AND s.oid = f.ftserver;`,t),I=await O(a.data),I){if(q(I)!=1)return o}else return o;L(a,e("Server:\
 %s"),A(I,0,0)),M(N,a.data),w=A(I,0,1),w&&w[0]!=null&&(L(a,e("FDW options: (%s)"),w),M(N,a.data))}if(L(a,`SELECT c.oid::\
pg_catalog.regclass
FROM pg_catalog.pg_class c, pg_catalog.pg_inherits i
WHERE c.oid = i.inhparent AND i.inhrelid = '%s'
  AND c.relkind != 'p' AND c.relkind != 'I'
ORDER BY inhseqno;`,t),I=await O(a.data),I){let w=e("Inherits"),B=gn(w,pe(w),p.encoding);for(F=q(I),T=0;T<F;T++)T==0?L(a,
"%s: %s",w,A(I,T,0)):L(a,"%*s  %s",B,"",A(I,T,0)),T<F-1&&V(a,","),M(N,a.data)}else return o;if(p.sversion>=14e4?L(a,`SEL\
ECT c.oid::pg_catalog.regclass, c.relkind, inhdetachpending, pg_catalog.pg_get_expr(c.relpartbound, c.oid)
FROM pg_catalog.pg_class c, pg_catalog.pg_inherits i
WHERE c.oid = i.inhrelid AND i.inhparent = '%s'
ORDER BY pg_catalog.pg_get_expr(c.relpartbound, c.oid) = 'DEFAULT', c.oid::pg_catalog.regclass::pg_catalog.text;`,t):p.sversion>=
1e5?L(a,`SELECT c.oid::pg_catalog.regclass, c.relkind, false AS inhdetachpending, pg_catalog.pg_get_expr(c.relpartbound,\
 c.oid)
FROM pg_catalog.pg_class c, pg_catalog.pg_inherits i
WHERE c.oid = i.inhrelid AND i.inhparent = '%s'
ORDER BY pg_catalog.pg_get_expr(c.relpartbound, c.oid) = 'DEFAULT', c.oid::pg_catalog.regclass::pg_catalog.text;`,t):L(a,
`SELECT c.oid::pg_catalog.regclass, c.relkind, false AS inhdetachpending, NULL
FROM pg_catalog.pg_class c, pg_catalog.pg_inherits i
WHERE c.oid = i.inhrelid AND i.inhparent = '%s'
ORDER BY c.oid::pg_catalog.regclass::pg_catalog.text;`,t),I=await O(a.data),!I)return o;if(F=q(I),R&&F==0)L(a,e("Number \
of partitions: %d"),F),M(N,a.data);else if(!s)F>0&&(R?L(a,e("Number of partitions: %d (Use \\d+ to list them.)"),F):L(a,
e("Number of child tables: %d (Use \\d+ to list them.)"),F),M(N,a.data));else{let w=e(R?"Partitions":"Child tables"),B=gn(
w,pe(w),p.encoding);for(T=0;T<F;T++){let k=A(I,T,1);T==0?L(a,"%s: %s",w,A(I,T,0)):L(a,"%*s  %s",B,"",A(I,T,0)),ee(I,T,3)||
l(a," %s",A(I,T,3)),k==ae||k==_e?c(a,", PARTITIONED"):k==ce&&c(a,", FOREIGN"),h(A(I,T,2),"t")==0&&c(a," (DETACH PENDING)"),
T<F-1&&V(a,","),M(N,a.data)}}if(S.reloftype&&(L(a,e("Typed table of type: %s"),S.reloftype),M(N,a.data)),s&&(S.relkind==
re||S.relkind==oe)&&S.relreplident!="i"&&(h(r,"pg_catalog")!=0&&S.relreplident!="d"||h(r,"pg_catalog")==0&&S.relreplident!=
"n")){let w=e("Replica Identity");L(a,"%s: %s",w,S.relreplident=="f"?"FULL":S.relreplident=="n"?"NOTHING":"???"),M(N,a.data)}
s&&S.relkind!=oe&&S.hasoids&&M(N,e("Has OIDs: yes")),await en(N,S.relkind,S.tablespace,!0),s&&S.relam!=null&&!p.hide_tableam&&
(L(a,e("Access method: %s"),S.relam),M(N,a.data))}if(s&&S.reloptions&&S.reloptions[0]!=null){let R=e("Options");L(a,"%s:\
 %s",R,S.reloptions),M(N,a.data)}return Be(N,p.queryFout,!1,p.logfile),o=!0,o}async function en(r,E,t,s){if((E==re||E==oe||
E==ge||E==ae||E==_e||E==ye)&&t!=0){let o=null,a={};if(D(a),L(a,`SELECT spcname FROM pg_catalog.pg_tablespace
WHERE oid = '%u';`,t),o=await O(a.data),!o)return;q(o)>0&&(s?(L(a,e('Tablespace: "%s"'),A(o,0,0)),M(r,a.data)):(L(a,"%s",
r.footer),l(a,e(', tablespace "%s"'),A(o,0,0)),dn(r,a.data)))}}async function cn(r,E,t){let s={},o,a={},_=p.popt.topt,g=2,
N=0,T,d,m="l",f;if(_.default_footer=!1,D(s),L(s,`SELECT r.rolname, r.rolsuper, r.rolinherit,
  r.rolcreaterole, r.rolcreatedb, r.rolcanlogin,
  r.rolconnlimit, r.rolvaliduntil`),E&&(c(s,`
, pg_catalog.shobj_description(r.oid, 'pg_authid') AS description`),g++),c(s,`
, r.rolreplication`),p.sversion>=90500&&c(s,`
, r.rolbypassrls`),c(s,`
FROM pg_catalog.pg_roles r
`),!t&&!r&&c(s,`WHERE r.rolname !~ '^pg_'
`),!P(s,r,!1,!1,null,"r.rolname",null,null,null,1)||(c(s,"ORDER BY 1;"),o=await O(s.data),!o))return!1;for(N=q(o),f=[],ve(
a,_,e("List of roles"),g,N),ie(a,i("Role name"),!0,m),ie(a,i("Attributes"),!0,m),E&&ie(a,i("Description"),!0,m),T=0;T<N;T++)
j(a,A(o,T,0),!1,!1),on(s),h(A(o,T,1),"t")==0&&Le(s,e("Superuser")),h(A(o,T,2),"t")!=0&&Le(s,e("No inheritance")),h(A(o,T,
3),"t")==0&&Le(s,e("Create role")),h(A(o,T,4),"t")==0&&Le(s,e("Create DB")),h(A(o,T,5),"t")!=0&&Le(s,e("Cannot login")),
h(A(o,T,E?9:8),"t")==0&&Le(s,e("Replication")),p.sversion>=90500&&h(A(o,T,E?10:9),"t")==0&&Le(s,e("Bypass RLS")),d=Nn(A(
o,T,6)),d>=0&&(s.len>0&&V(s,`
`),d==0?c(s,e("No connections")):l(s,ngettext("%d connection","%d connections",d),d)),h(A(o,T,7),"")!=0&&(s.len>0&&V(s,`\

`),c(s,e("Password valid until ")),c(s,A(o,T,7))),f[T]=Se(s.data),j(a,f[T],!1,!1),E&&j(a,A(o,T,8),!1,!1);return Be(a,p.queryFout,
!1,p.logfile),!0}function Le(r,E){r.len>0&&c(r,", "),c(r,E)}async function Xn(r,E){let t={},s,o=p.popt,a={};return D(t),
L(t,`SELECT rolname AS "%s", datname AS "%s",
pg_catalog.array_to_string(setconfig, E'\\n') AS "%s"
FROM pg_catalog.pg_db_role_setting s
LEFT JOIN pg_catalog.pg_database d ON d.oid = setdatabase
LEFT JOIN pg_catalog.pg_roles r ON r.oid = setrole
`,i("Role"),i("Database"),i("Settings")),!P(t,r,!1,!1,null,"r.rolname",null,null,a,1)||!P(t,E,a.value,!1,null,"d.datname",
null,null,null,1)||(c(t,"ORDER BY 1, 2;"),s=await O(t.data),!s)?!1:(q(s)==0&&!p.quiet?r&&E?W('Did not find any settings \
for role "%s" and database "%s".',r,E):r?W('Did not find any settings for role "%s".',r):W("Did not find any settings."):
(o.nullPrint=null,o.title=e("List of settings"),o.translate_header=!0,G(s,o,p.queryFout,!1,p.logfile)),!0)}async function kn(r,E){
let t={},s,o=p.popt;return D(t),L(t,`SELECT m.rolname AS "%s", r.rolname AS "%s",
  pg_catalog.concat_ws(', ',
`,i("Role name"),i("Member of")),p.sversion>=16e4?c(t,`    CASE WHEN pam.admin_option THEN 'ADMIN' END,
    CASE WHEN pam.inherit_option THEN 'INHERIT' END,
    CASE WHEN pam.set_option THEN 'SET' END
`):c(t,`    CASE WHEN pam.admin_option THEN 'ADMIN' END,
    CASE WHEN m.rolinherit THEN 'INHERIT' END,
    'SET'
`),l(t,`  ) AS "%s",
  g.rolname AS "%s"
`,i("Options"),i("Grantor")),c(t,`FROM pg_catalog.pg_roles m
     JOIN pg_catalog.pg_auth_members pam ON (pam.member = m.oid)
     LEFT JOIN pg_catalog.pg_roles r ON (pam.roleid = r.oid)
     LEFT JOIN pg_catalog.pg_roles g ON (pam.grantor = g.oid)
`),!E&&!r&&c(t,`WHERE m.rolname !~ '^pg_'
`),!P(t,r,!1,!1,null,"m.rolname",null,null,null,1)||(c(t,`ORDER BY 1, 2, 4;
`),s=await O(t.data),!s)?!1:(o.nullPrint=null,o.title=e("List of role grants"),o.translate_header=!0,G(s,o,p.queryFout,!1,
p.logfile),!0)}async function _n(r,E,t,s){let o=K(r,"t")!=null,a=K(r,"i")!=null,_=K(r,"v")!=null,g=K(r,"m")!=null,N=K(r,
"s")!=null,T=K(r,"E")!=null,d={},m,f=p.popt,y,b=[!1,!1,!0,!1,!1,!1,!1,!1,!1];return o||a||_||g||N||T||(o=_=g=N=T=!0),D(d),
L(d,`SELECT n.nspname as "%s",
  c.relname as "%s",
  CASE c.relkind WHEN 'r' THEN '%s' WHEN 'v' THEN '%s' WHEN 'm' THEN '%s' WHEN 'i' THEN '%s' WHEN 'S' THEN '%s' WHEN 't'\
 THEN '%s' WHEN 'f' THEN '%s' WHEN 'p' THEN '%s' WHEN 'I' THEN '%s' END as "%s",
  pg_catalog.pg_get_userbyid(c.relowner) as "%s"`,i("Schema"),i("Name"),i("table"),i("view"),i("materialized view"),i("i\
ndex"),i("sequence"),i("TOAST table"),i("foreign table"),i("partitioned table"),i("partitioned index"),i("Type"),i("Owne\
r")),y=4,a&&(l(d,`,
  c2.relname as "%s"`,i("Table")),y++),t&&(l(d,`,
  CASE c.relpersistence WHEN 'p' THEN '%s' WHEN 't' THEN '%s' WHEN 'u' THEN '%s' END as "%s"`,i("permanent"),i("temporar\
y"),i("unlogged"),i("Persistence")),b[y]=!0,p.sversion>=12e4&&!p.hide_tableam&&(o||g||a)&&l(d,`,
  am.amname as "%s"`,i("Access method")),l(d,`,
  pg_catalog.pg_size_pretty(pg_catalog.pg_table_size(c.oid)) as "%s",
  pg_catalog.obj_description(c.oid, 'pg_class') as "%s"`,i("Size"),i("Description"))),c(d,`
FROM pg_catalog.pg_class c
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace`),p.sversion>=12e4&&!p.hide_tableam&&(o||g||a)&&c(d,`\

     LEFT JOIN pg_catalog.pg_am am ON am.oid = c.relam`),a&&c(d,`
     LEFT JOIN pg_catalog.pg_index i ON i.indexrelid = c.oid
     LEFT JOIN pg_catalog.pg_class c2 ON i.indrelid = c2.oid`),c(d,`
WHERE c.relkind IN (`),o&&(c(d,"'r','p',"),(s||E)&&c(d,"'t',")),_&&c(d,"'v',"),g&&c(d,"'m',"),a&&c(d,"'i','I',"),N&&c(d,
"'S',"),(s||E)&&c(d,"'s',"),T&&c(d,"'f',"),c(d,"''"),c(d,`)
`),!s&&!E&&c(d,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname !~ '^pg_toast'
      AND n.nspname <> 'information_schema'
`),!P(d,E,!0,!1,"n.nspname","c.relname",null,"pg_catalog.pg_table_is_visible(c.oid)",null,3)||(c(d,"ORDER BY 1,2;"),m=await O(
d.data),!m)?!1:(q(m)==0&&!p.quiet?E?W('Did not find any relation named "%s".',E):W("Did not find any relations."):(f.nullPrint=
null,f.title=e("List of relations"),f.translate_header=!0,f.translate_columns=b,f.n_translate_columns=Q(b),G(m,f,p.queryFout,
!1,p.logfile)),!0)}async function jn(r,E,t){let s=K(r,"t")!=null,o=K(r,"i")!=null,a=K(r,"n")!=null,_={},g={},N,T=p.popt,
d=[!1,!1,!1,!1,!1,!1,!1,!1,!1],m,f=!1;if(p.sversion<1e5){let y;return W("The server (version %s) does not support declar\
ative table partitioning.",Ne(p.sversion,!1,y,Ae(y))),!0}return!s&&!o&&(s=o=!0),o&&!s?m=e("List of partitioned indexes"):
s&&!o?m=e("List of partitioned tables"):(m=e("List of partitioned relations"),f=!0),D(_),L(_,`SELECT n.nspname as "%s",
  c.relname as "%s",
  pg_catalog.pg_get_userbyid(c.relowner) as "%s"`,i("Schema"),i("Name"),i("Owner")),f&&(l(_,`,
  CASE c.relkind WHEN 'p' THEN '%s' WHEN 'I' THEN '%s' END as "%s"`,i("partitioned table"),i("partitioned index"),i("Typ\
e")),d[3]=!0),(a||E)&&l(_,`,
  inh.inhparent::pg_catalog.regclass as "%s"`,i("Parent name")),o&&l(_,`,
 c2.oid::pg_catalog.regclass as "%s"`,i("Table")),t&&(a&&l(_,`,
  s.dps as "%s"`,i("Leaf partition size")),l(_,`,
  s.tps as "%s"`,i("Total size")),l(_,`,
  pg_catalog.obj_description(c.oid, 'pg_class') as "%s"`,i("Description"))),c(_,`
FROM pg_catalog.pg_class c
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace`),o&&c(_,`
     LEFT JOIN pg_catalog.pg_index i ON i.indexrelid = c.oid
     LEFT JOIN pg_catalog.pg_class c2 ON i.indrelid = c2.oid`),(a||E)&&c(_,`
     LEFT JOIN pg_catalog.pg_inherits inh ON c.oid = inh.inhrelid`),t&&(p.sversion<12e4?c(_,`,
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
WHERE c.relkind IN (`),s&&c(_,"'p',"),o&&c(_,"'I',"),c(_,"''"),c(_,`)
`),c(_,!a&&!E?` AND NOT c.relispartition
`:""),E||c(_,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname !~ '^pg_toast'
      AND n.nspname <> 'information_schema'
`),!P(_,E,!0,!1,"n.nspname","c.relname",null,"pg_catalog.pg_table_is_visible(c.oid)",null,3)||(l(_,'ORDER BY "Schema", %\
s%s"Name";',f?'"Type" DESC, ':"",a||E?'"Parent name" NULLS FIRST, ':""),N=await O(_.data),!N)?!1:(D(g),c(g,m),T.nullPrint=
null,T.title=g.data,T.translate_header=!0,T.translate_columns=d,T.n_translate_columns=Q(d),G(N,T,p.queryFout,!1,p.logfile),
!0)}async function Jn(r,E,t){let s={},o,a=p.popt;return D(s),L(s,`SELECT l.lanname AS "%s",
       pg_catalog.pg_get_userbyid(l.lanowner) as "%s",
       l.lanpltrusted AS "%s"`,i("Name"),i("Owner"),i("Trusted")),E&&(l(s,`,
       NOT l.lanispl AS "%s",
       l.lanplcallfoid::pg_catalog.regprocedure AS "%s",
       l.lanvalidator::pg_catalog.regprocedure AS "%s",
       l.laninline::pg_catalog.regprocedure AS "%s",
       `,i("Internal language"),i("Call handler"),i("Validator"),i("Inline handler")),te(s,"l.lanacl")),l(s,`,
       d.description AS "%s"
FROM pg_catalog.pg_language l
LEFT JOIN pg_catalog.pg_description d
  ON d.classoid = l.tableoid AND d.objoid = l.oid
  AND d.objsubid = 0
`,i("Description")),r&&!P(s,r,!1,!1,null,"l.lanname",null,null,null,2)||(!t&&!r&&c(s,`WHERE l.lanplcallfoid != 0
`),c(s,"ORDER BY 1;"),o=await O(s.data),!o)?!1:(a.nullPrint=null,a.title=e("List of languages"),a.translate_header=!0,G(
o,a,p.queryFout,!1,p.logfile),!0)}async function Kn(r,E,t){let s={},o,a=p.popt;return D(s),L(s,`SELECT n.nspname as "%s"\
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
       ), ' ') as "%s"`,i("Schema"),i("Name"),i("Type"),i("Collation"),i("Nullable"),i("Default"),i("Check")),E&&(c(s,`,\

  `),te(s,"t.typacl"),l(s,`,
       d.description as "%s"`,i("Description"))),c(s,`
FROM pg_catalog.pg_type t
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = t.typnamespace
`),E&&c(s,`     LEFT JOIN pg_catalog.pg_description d ON d.classoid = t.tableoid AND d.objoid = t.oid AND d.objsubid = 0\

`),c(s,`WHERE t.typtype = 'd'
`),!t&&!r&&c(s,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!P(s,r,!0,!1,"n.nspname","t.typname",null,"pg_catalog.pg_type_is_visible(t.oid)",null,3)||(c(s,"ORDER BY 1, 2;"),o=await O(
s.data),!o)?!1:(a.nullPrint=null,a.title=e("List of domains"),a.translate_header=!0,G(o,a,p.queryFout,!1,p.logfile),!0)}
async function Qn(r,E,t){let s={},o,a=p.popt,_=[!1,!1,!1,!1,!0,!1];return D(s),L(s,`SELECT n.nspname AS "%s",
       c.conname AS "%s",
       pg_catalog.pg_encoding_to_char(c.conforencoding) AS "%s",
       pg_catalog.pg_encoding_to_char(c.contoencoding) AS "%s",
       CASE WHEN c.condefault THEN '%s'
       ELSE '%s' END AS "%s"`,i("Schema"),i("Name"),i("Source"),i("Destination"),i("yes"),i("no"),i("Default?")),E&&l(s,
`,
       d.description AS "%s"`,i("Description")),c(s,`
FROM pg_catalog.pg_conversion c
     JOIN pg_catalog.pg_namespace n ON n.oid = c.connamespace
`),E&&c(s,`LEFT JOIN pg_catalog.pg_description d ON d.classoid = c.tableoid
          AND d.objoid = c.oid AND d.objsubid = 0
`),c(s,`WHERE true
`),!t&&!r&&c(s,`  AND n.nspname <> 'pg_catalog'
  AND n.nspname <> 'information_schema'
`),!P(s,r,!0,!1,"n.nspname","c.conname",null,"pg_catalog.pg_conversion_is_visible(c.oid)",null,3)||(c(s,"ORDER BY 1, 2;"),
o=await O(s.data),!o)?!1:(a.nullPrint=null,a.title=e("List of conversions"),a.translate_header=!0,a.translate_columns=_,
a.n_translate_columns=Q(_),G(o,a,p.queryFout,!1,p.logfile),!0)}async function zn(r,E,t){let s={},o,a=p.popt;return D(s),
L(s,'SELECT s.name AS "%s", pg_catalog.current_setting(s.name) AS "%s"',i("Parameter"),i("Value")),E&&(l(s,', s.vartype \
AS "%s", s.context AS "%s", ',i("Type"),i("Context")),p.sversion>=15e4?te(s,"p.paracl"):l(s,'NULL AS "%s"',i("Access pri\
vileges"))),c(s,`
FROM pg_catalog.pg_settings s
`),E&&p.sversion>=15e4&&c(s,`  LEFT JOIN pg_catalog.pg_parameter_acl p
  ON pg_catalog.lower(s.name) = p.parname
`),r?De(p.db,s,r,!1,!1,null,"pg_catalog.lower(s.name)",null,null,null,null):c(s,`WHERE s.source <> 'default' AND
      s.setting IS DISTINCT FROM s.boot_val
`),c(s,"ORDER BY 1;"),o=await O(s.data),o?(a.nullPrint=null,r?a.title=e("List of configuration parameters"):a.title=e("L\
ist of non-default configuration parameters"),a.translate_header=!0,G(o,a,p.queryFout,!1,p.logfile),!0):!1}async function Zn(r,E){
let t={},s,o=p.popt,a=[!1,!1,!1,!0,!1,!1,!1];if(p.sversion<90300){let _;return W("The server (version %s) does not suppo\
rt event triggers.",Ne(p.sversion,!1,_,Ae(_))),!0}return D(t),L(t,`SELECT evtname as "%s", evtevent as "%s", pg_catalog.\
pg_get_userbyid(e.evtowner) as "%s",
 case evtenabled when 'O' then '%s'  when 'R' then '%s'  when 'A' then '%s'  when 'D' then '%s' end as "%s",
 e.evtfoid::pg_catalog.regproc as "%s", pg_catalog.array_to_string(array(select x from pg_catalog.unnest(evttags) as t(x\
)), ', ') as "%s"`,i("Name"),i("Event"),i("Owner"),i("enabled"),i("replica"),i("always"),i("disabled"),i("Enabled"),i("F\
unction"),i("Tags")),E&&l(t,`,
pg_catalog.obj_description(e.oid, 'pg_event_trigger') as "%s"`,i("Description")),c(t,`
FROM pg_catalog.pg_event_trigger e `),!P(t,r,!1,!1,null,"evtname",null,null,null,1)||(c(t,"ORDER BY 1"),s=await O(t.data),
!s)?!1:(o.nullPrint=null,o.title=e("List of event triggers"),o.translate_header=!0,o.translate_columns=a,o.n_translate_columns=
Q(a),G(s,o,p.queryFout,!1,p.logfile),!0)}async function $n(r){let E={},t,s=p.popt;if(p.sversion<1e5){let o;return W("The\
 server (version %s) does not support extended statistics.",Ne(p.sversion,!1,o,Ae(o))),!0}return D(E),L(E,`SELECT 
es.stxnamespace::pg_catalog.regnamespace::pg_catalog.text AS "%s", 
es.stxname AS "%s", 
`,i("Schema"),i("Name")),p.sversion>=14e4?l(E,`pg_catalog.format('%%s FROM %%s', 
  pg_catalog.pg_get_statisticsobjdef_columns(es.oid), 
  es.stxrelid::pg_catalog.regclass) AS "%s"`,i("Definition")):l(E,`pg_catalog.format('%%s FROM %%s', 
  (SELECT pg_catalog.string_agg(pg_catalog.quote_ident(a.attname),', ') 
   FROM pg_catalog.unnest(es.stxkeys) s(attnum) 
   JOIN pg_catalog.pg_attribute a 
   ON (es.stxrelid = a.attrelid 
   AND a.attnum = s.attnum 
   AND NOT a.attisdropped)), 
es.stxrelid::pg_catalog.regclass) AS "%s"`,i("Definition")),l(E,`,
CASE WHEN 'd' = any(es.stxkind) THEN 'defined' 
END AS "%s", 
CASE WHEN 'f' = any(es.stxkind) THEN 'defined' 
END AS "%s"`,i("Ndistinct"),i("Dependencies")),p.sversion>=12e4&&l(E,`,
CASE WHEN 'm' = any(es.stxkind) THEN 'defined' 
END AS "%s" `,i("MCV")),c(E,` 
FROM pg_catalog.pg_statistic_ext es 
`),!P(E,r,!1,!1,"es.stxnamespace::pg_catalog.regnamespace::pg_catalog.text","es.stxname",null,"pg_catalog.pg_statistics_\
obj_is_visible(es.oid)",null,3)||(c(E,"ORDER BY 1, 2;"),t=await O(E.data),!t)?!1:(s.nullPrint=null,s.title=e("List of ex\
tended statistics"),s.translate_header=!0,G(t,s,p.queryFout,!1,p.logfile),!0)}async function ea(r,E){let t={},s,o=p.popt,
a=[!1,!1,!1,!0,!1];return D(t),L(t,`SELECT pg_catalog.format_type(castsource, NULL) AS "%s",
       pg_catalog.format_type(casttarget, NULL) AS "%s",
`,i("Source type"),i("Target type")),l(t,`       CASE WHEN c.castmethod = '%c' THEN '(binary coercible)'
            WHEN c.castmethod = '%c' THEN '(with inout)'
            ELSE p.proname
       END AS "%s",
`,Pa,ba,i("Function")),l(t,`       CASE WHEN c.castcontext = '%c' THEN '%s'
            WHEN c.castcontext = '%c' THEN '%s'
            ELSE '%s'
       END AS "%s"`,Fa,i("no"),ha,i("in assignment"),i("yes"),i("Implicit?")),E&&l(t,`,
       d.description AS "%s"`,i("Description")),c(t,`
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
`),E&&c(t,`     LEFT JOIN pg_catalog.pg_description d
     ON d.classoid = c.tableoid AND d.objoid = c.oid AND d.objsubid = 0
`),c(t,"WHERE ( (true"),!P(t,r,!0,!1,"ns.nspname","ts.typname","pg_catalog.format_type(ts.oid, NULL)","pg_catalog.pg_typ\
e_is_visible(ts.oid)",null,3)||(c(t,") OR (true"),!P(t,r,!0,!1,"nt.nspname","tt.typname","pg_catalog.format_type(tt.oid,\
 NULL)","pg_catalog.pg_type_is_visible(tt.oid)",null,3))||(c(t,`) )
ORDER BY 1, 2;`),s=await O(t.data),!s)?!1:(o.nullPrint=null,o.title=e("List of casts"),o.translate_header=!0,o.translate_columns=
a,o.n_translate_columns=Q(a),G(s,o,p.queryFout,!1,p.logfile),!0)}async function na(r,E,t){let s={},o,a=p.popt,_=[!1,!1,!1,
!1,!1,!1,!1,!0,!1];return D(s),L(s,`SELECT
  n.nspname AS "%s",
  c.collname AS "%s",
`,i("Schema"),i("Name")),p.sversion>=1e5?l(s,`  CASE c.collprovider WHEN 'd' THEN 'default' WHEN 'b' THEN 'builtin' WHEN\
 'c' THEN 'libc' WHEN 'i' THEN 'icu' END AS "%s",
`,i("Provider")):l(s,`  'libc' AS "%s",
`,i("Provider")),l(s,`  c.collcollate AS "%s",
  c.collctype AS "%s",
`,i("Collate"),i("Ctype")),p.sversion>=17e4?l(s,`  c.colllocale AS "%s",
`,i("Locale")):p.sversion>=15e4?l(s,`  c.colliculocale AS "%s",
`,i("Locale")):l(s,`  c.collcollate AS "%s",
`,i("Locale")),p.sversion>=16e4?l(s,`  c.collicurules AS "%s",
`,i("ICU Rules")):l(s,`  NULL AS "%s",
`,i("ICU Rules")),p.sversion>=12e4?l(s,`  CASE WHEN c.collisdeterministic THEN '%s' ELSE '%s' END AS "%s"`,i("yes"),i("n\
o"),i("Deterministic?")):l(s,`  '%s' AS "%s"`,i("yes"),i("Deterministic?")),E&&l(s,`,
  pg_catalog.obj_description(c.oid, 'pg_collation') AS "%s"`,i("Description")),c(s,`
FROM pg_catalog.pg_collation c, pg_catalog.pg_namespace n
WHERE n.oid = c.collnamespace
`),!t&&!r&&c(s,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),c(s,`      AND c.collencoding IN (-1, pg_catalog.pg_char_to_encoding(pg_catalog.getdatabaseencoding()))
`),!P(s,r,!0,!1,"n.nspname","c.collname",null,"pg_catalog.pg_collation_is_visible(c.oid)",null,3)||(c(s,"ORDER BY 1, 2;"),
o=await O(s.data),!o)?!1:(a.nullPrint=null,a.title=e("List of collations"),a.translate_header=!0,a.translate_columns=_,a.
n_translate_columns=Q(_),G(o,a,p.queryFout,!1,p.logfile),!0)}async function aa(r,E,t){let s={},o,a=p.popt,_=0,g=null;if(D(
s),L(s,`SELECT n.nspname AS "%s",
  pg_catalog.pg_get_userbyid(n.nspowner) AS "%s"`,i("Name"),i("Owner")),E&&(c(s,`,
  `),te(s,"n.nspacl"),l(s,`,
  pg_catalog.obj_description(n.oid, 'pg_namespace') AS "%s"`,i("Description"))),c(s,`
FROM pg_catalog.pg_namespace n
`),!t&&!r&&c(s,`WHERE n.nspname !~ '^pg_' AND n.nspname <> 'information_schema'
`),!P(s,r,!t&&!r,!1,null,"n.nspname",null,null,null,2)||(c(s,"ORDER BY 1;"),o=await O(s.data),!o))return!1;if(a.nullPrint=
null,a.title=e("List of schemas"),a.translate_header=!0,r&&p.sversion>=15e4){let N,T;if(L(s,`SELECT pubname 
FROM pg_catalog.pg_publication p
     JOIN pg_catalog.pg_publication_namespace pn ON p.oid = pn.pnpubid
     JOIN pg_catalog.pg_namespace n ON n.oid = pn.pnnspid 
WHERE n.nspname = '%s'
ORDER BY 1`,r),N=await O(s.data),N)_=q(N);else return!1;if(_>0){for(g=[],g[0]=Se(e("Publications:")),T=0;T<_;T++)L(s,'  \
  "%s"',A(N,T,0)),g[T+1]=Se(s.data);g[T+1]=null,a.footers=g}}return G(o,a,p.queryFout,!1,p.logfile),!0}async function sa(r,E){
let t={},s,o=p.popt;return E?await ta(r):(D(t),L(t,`SELECT
  n.nspname as "%s",
  p.prsname as "%s",
  pg_catalog.obj_description(p.oid, 'pg_ts_parser') as "%s"
FROM pg_catalog.pg_ts_parser p
LEFT JOIN pg_catalog.pg_namespace n ON n.oid = p.prsnamespace
`,i("Schema"),i("Name"),i("Description")),!P(t,r,!1,!1,"n.nspname","p.prsname",null,"pg_catalog.pg_ts_parser_is_visible(\
p.oid)",null,3)||(c(t,"ORDER BY 1, 2;"),s=await O(t.data),!s)?!1:(o.nullPrint=null,o.title=e("List of text search parser\
s"),o.translate_header=!0,G(s,o,p.queryFout,!1,p.logfile),!0))}async function ta(r){let E={},t,s;if(D(E),L(E,`SELECT p.o\
id,
  n.nspname,
  p.prsname
FROM pg_catalog.pg_ts_parser p
LEFT JOIN pg_catalog.pg_namespace n ON n.oid = p.prsnamespace
`),!P(E,r,!1,!1,"n.nspname","p.prsname",null,"pg_catalog.pg_ts_parser_is_visible(p.oid)",null,3)||(c(E,"ORDER BY 1, 2;"),
t=await O(E.data),!t))return!1;if(q(t)==0)return p.quiet||(r?W('Did not find any text search parser named "%s".',r):W("D\
id not find any text search parsers.")),!1;for(s=0;s<q(t);s++){let o,a=null,_;if(o=A(t,s,0),ee(t,s,1)||(a=A(t,s,1)),_=A(
t,s,2),!await ia(o,a,_)||X)return!1}return!0}async function ia(r,E,t){let s={},o,a={},_=p.popt,g=[!0,!1,!1];return D(s),
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
 WHERE p.oid = '%s';`,i("Start parse"),i("Method"),i("Function"),i("Description"),r,i("Get next token"),r,i("End parse"),
r,i("Get headline"),r,i("Get token types"),r),o=await O(s.data),!o||(_.nullPrint=null,D(a),E?L(a,e('Text search parser "\
%s.%s"'),E,t):L(a,e('Text search parser "%s"'),t),_.title=a.data,_.footers=null,_.topt.default_footer=!1,_.translate_header=
!0,_.translate_columns=g,_.n_translate_columns=Q(g),G(o,_,p.queryFout,!1,p.logfile),D(s),L(s,`SELECT t.alias as "%s",
  t.description as "%s"
FROM pg_catalog.ts_token_type( '%s'::pg_catalog.oid ) as t
ORDER BY 1;`,i("Token name"),i("Description"),r),o=await O(s.data),!o)?!1:(_.nullPrint=null,E?L(a,e('Token types for par\
ser "%s.%s"'),E,t):L(a,e('Token types for parser "%s"'),t),_.title=a.data,_.footers=null,_.topt.default_footer=!0,_.translate_header=
!0,_.translate_columns=null,_.n_translate_columns=0,G(o,_,p.queryFout,!1,p.logfile),!0)}async function oa(r,E){let t={},
s,o=p.popt;return D(t),L(t,`SELECT
  n.nspname as "%s",
  d.dictname as "%s",
`,i("Schema"),i("Name")),E&&l(t,`  ( SELECT COALESCE(nt.nspname, '(null)')::pg_catalog.text || '.' || t.tmplname FROM
    pg_catalog.pg_ts_template t
    LEFT JOIN pg_catalog.pg_namespace nt ON nt.oid = t.tmplnamespace
    WHERE d.dicttemplate = t.oid ) AS  "%s",
  d.dictinitoption as "%s",
`,i("Template"),i("Init options")),l(t,`  pg_catalog.obj_description(d.oid, 'pg_ts_dict') as "%s"
`,i("Description")),c(t,`FROM pg_catalog.pg_ts_dict d
LEFT JOIN pg_catalog.pg_namespace n ON n.oid = d.dictnamespace
`),!P(t,r,!1,!1,"n.nspname","d.dictname",null,"pg_catalog.pg_ts_dict_is_visible(d.oid)",null,3)||(c(t,"ORDER BY 1, 2;"),
s=await O(t.data),!s)?!1:(o.nullPrint=null,o.title=e("List of text search dictionaries"),o.translate_header=!0,G(s,o,p.queryFout,
!1,p.logfile),!0)}async function Ea(r,E){let t={},s,o=p.popt;return D(t),E?L(t,`SELECT
  n.nspname AS "%s",
  t.tmplname AS "%s",
  t.tmplinit::pg_catalog.regproc AS "%s",
  t.tmpllexize::pg_catalog.regproc AS "%s",
  pg_catalog.obj_description(t.oid, 'pg_ts_template') AS "%s"
`,i("Schema"),i("Name"),i("Init"),i("Lexize"),i("Description")):L(t,`SELECT
  n.nspname AS "%s",
  t.tmplname AS "%s",
  pg_catalog.obj_description(t.oid, 'pg_ts_template') AS "%s"
`,i("Schema"),i("Name"),i("Description")),c(t,`FROM pg_catalog.pg_ts_template t
LEFT JOIN pg_catalog.pg_namespace n ON n.oid = t.tmplnamespace
`),!P(t,r,!1,!1,"n.nspname","t.tmplname",null,"pg_catalog.pg_ts_template_is_visible(t.oid)",null,3)||(c(t,"ORDER BY 1, 2\
;"),s=await O(t.data),!s)?!1:(o.nullPrint=null,o.title=e("List of text search templates"),o.translate_header=!0,G(s,o,p.
queryFout,!1,p.logfile),!0)}async function la(r,E){let t={},s,o=p.popt;return E?await ra(r):(D(t),L(t,`SELECT
   n.nspname as "%s",
   c.cfgname as "%s",
   pg_catalog.obj_description(c.oid, 'pg_ts_config') as "%s"
FROM pg_catalog.pg_ts_config c
LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.cfgnamespace
`,i("Schema"),i("Name"),i("Description")),!P(t,r,!1,!1,"n.nspname","c.cfgname",null,"pg_catalog.pg_ts_config_is_visible(\
c.oid)",null,3)||(c(t,"ORDER BY 1, 2;"),s=await O(t.data),!s)?!1:(o.nullPrint=null,o.title=e("List of text search config\
urations"),o.translate_header=!0,G(s,o,p.queryFout,!1,p.logfile),!0))}async function ra(r){let E={},t,s;if(D(E),L(E,`SEL\
ECT c.oid, c.cfgname,
   n.nspname,
   p.prsname,
   np.nspname as pnspname
FROM pg_catalog.pg_ts_config c
   LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.cfgnamespace,
 pg_catalog.pg_ts_parser p
   LEFT JOIN pg_catalog.pg_namespace np ON np.oid = p.prsnamespace
WHERE  p.oid = c.cfgparser
`),!P(E,r,!0,!1,"n.nspname","c.cfgname",null,"pg_catalog.pg_ts_config_is_visible(c.oid)",null,3)||(c(E,"ORDER BY 3, 2;"),
t=await O(E.data),!t))return!1;if(q(t)==0)return p.quiet||(r?W('Did not find any text search configuration named "%s".',
r):W("Did not find any text search configurations.")),!1;for(s=0;s<q(t);s++){let o,a,_=null,g,N=null;if(o=A(t,s,0),a=A(t,
s,1),ee(t,s,2)||(_=A(t,s,2)),g=A(t,s,3),ee(t,s,4)||(N=A(t,s,4)),!await ca(o,_,a,N,g)||X)return!1}return!0}async function ca(r,E,t,s,o){
let a={},_={},g,N=p.popt;return D(a),L(a,`SELECT
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
ORDER BY 1;`,i("Token"),i("Dictionaries"),r),g=await O(a.data),g?(D(_),E?l(_,e('Text search configuration "%s.%s"'),E,t):
l(_,e('Text search configuration "%s"'),t),s?l(_,e(`
Parser: "%s.%s"`),s,o):l(_,e(`
Parser: "%s"`),o),N.nullPrint=null,N.title=_.data,N.footers=null,N.topt.default_footer=!1,N.translate_header=!0,G(g,N,p.
queryFout,!1,p.logfile),!0):!1}async function _a(r,E){let t={},s,o=p.popt;return D(t),L(t,`SELECT fdw.fdwname AS "%s",
  pg_catalog.pg_get_userbyid(fdw.fdwowner) AS "%s",
  fdw.fdwhandler::pg_catalog.regproc AS "%s",
  fdw.fdwvalidator::pg_catalog.regproc AS "%s"`,i("Name"),i("Owner"),i("Handler"),i("Validator")),E&&(c(t,`,
  `),te(t,"fdwacl"),l(t,`,
 CASE WHEN fdwoptions IS NULL THEN '' ELSE   '(' || pg_catalog.array_to_string(ARRAY(SELECT   pg_catalog.quote_ident(opt\
ion_name) ||  ' ' ||   pg_catalog.quote_literal(option_value)  FROM   pg_catalog.pg_options_to_table(fdwoptions)),  ', '\
) || ')'   END AS "%s",
  d.description AS "%s" `,i("FDW options"),i("Description"))),c(t,`
FROM pg_catalog.pg_foreign_data_wrapper fdw
`),E&&c(t,`LEFT JOIN pg_catalog.pg_description d
       ON d.classoid = fdw.tableoid AND d.objoid = fdw.oid AND d.objsubid = 0
`),!P(t,r,!1,!1,null,"fdwname",null,null,null,1)||(c(t,"ORDER BY 1;"),s=await O(t.data),!s)?!1:(o.nullPrint=null,o.title=
e("List of foreign-data wrappers"),o.translate_header=!0,G(s,o,p.queryFout,!1,p.logfile),!0)}async function pa(r,E){let t={},
s,o=p.popt;return D(t),L(t,`SELECT s.srvname AS "%s",
  pg_catalog.pg_get_userbyid(s.srvowner) AS "%s",
  f.fdwname AS "%s"`,i("Name"),i("Owner"),i("Foreign-data wrapper")),E&&(c(t,`,
  `),te(t,"s.srvacl"),l(t,`,
  s.srvtype AS "%s",
  s.srvversion AS "%s",
  CASE WHEN srvoptions IS NULL THEN '' ELSE   '(' || pg_catalog.array_to_string(ARRAY(SELECT   pg_catalog.quote_ident(op\
tion_name) ||  ' ' ||   pg_catalog.quote_literal(option_value)  FROM   pg_catalog.pg_options_to_table(srvoptions)),  ', \
') || ')'   END AS "%s",
  d.description AS "%s"`,i("Type"),i("Version"),i("FDW options"),i("Description"))),c(t,`
FROM pg_catalog.pg_foreign_server s
     JOIN pg_catalog.pg_foreign_data_wrapper f ON f.oid=s.srvfdw
`),E&&c(t,`LEFT JOIN pg_catalog.pg_description d
       ON d.classoid = s.tableoid AND d.objoid = s.oid AND d.objsubid = 0
`),!P(t,r,!1,!1,null,"s.srvname",null,null,null,1)||(c(t,"ORDER BY 1;"),s=await O(t.data),!s)?!1:(o.nullPrint=null,o.title=
e("List of foreign servers"),o.translate_header=!0,G(s,o,p.queryFout,!1,p.logfile),!0)}async function Ta(r,E){let t={},s,
o=p.popt;return D(t),L(t,`SELECT um.srvname AS "%s",
  um.usename AS "%s"`,i("Server"),i("User name")),E&&l(t,`,
 CASE WHEN umoptions IS NULL THEN '' ELSE   '(' || pg_catalog.array_to_string(ARRAY(SELECT   pg_catalog.quote_ident(opti\
on_name) ||  ' ' ||   pg_catalog.quote_literal(option_value)  FROM   pg_catalog.pg_options_to_table(umoptions)),  ', ') \
|| ')'   END AS "%s"`,i("FDW options")),c(t,`
FROM pg_catalog.pg_user_mappings um
`),!P(t,r,!1,!1,null,"um.srvname","um.usename",null,null,1)||(c(t,"ORDER BY 1, 2;"),s=await O(t.data),!s)?!1:(o.nullPrint=
null,o.title=e("List of user mappings"),o.translate_header=!0,G(s,o,p.queryFout,!1,p.logfile),!0)}async function Ra(r,E){
let t={},s,o=p.popt;return D(t),L(t,`SELECT n.nspname AS "%s",
  c.relname AS "%s",
  s.srvname AS "%s"`,i("Schema"),i("Table"),i("Server")),E&&l(t,`,
 CASE WHEN ftoptions IS NULL THEN '' ELSE   '(' || pg_catalog.array_to_string(ARRAY(SELECT   pg_catalog.quote_ident(opti\
on_name) ||  ' ' ||   pg_catalog.quote_literal(option_value)  FROM   pg_catalog.pg_options_to_table(ftoptions)),  ', ') \
|| ')'   END AS "%s",
  d.description AS "%s"`,i("FDW options"),i("Description")),c(t,`
FROM pg_catalog.pg_foreign_table ft
  INNER JOIN pg_catalog.pg_class c ON c.oid = ft.ftrelid
  INNER JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
  INNER JOIN pg_catalog.pg_foreign_server s ON s.oid = ft.ftserver
`),E&&c(t,`   LEFT JOIN pg_catalog.pg_description d
          ON d.classoid = c.tableoid AND d.objoid = c.oid AND d.objsubid = 0
`),!P(t,r,!1,!1,"n.nspname","c.relname",null,"pg_catalog.pg_table_is_visible(c.oid)",null,3)||(c(t,"ORDER BY 1, 2;"),s=await O(
t.data),!s)?!1:(o.nullPrint=null,o.title=e("List of foreign tables"),o.translate_header=!0,G(s,o,p.queryFout,!1,p.logfile),
!0)}async function Aa(r){let E={},t,s=p.popt;return D(E),L(E,`SELECT e.extname AS "%s", e.extversion AS "%s", n.nspname \
AS "%s", c.description AS "%s"
FROM pg_catalog.pg_extension e LEFT JOIN pg_catalog.pg_namespace n ON n.oid = e.extnamespace LEFT JOIN pg_catalog.pg_des\
cription c ON c.objoid = e.oid AND c.classoid = 'pg_catalog.pg_extension'::pg_catalog.regclass
`,i("Name"),i("Version"),i("Schema"),i("Description")),!P(E,r,!1,!1,null,"e.extname",null,null,null,1)||(c(E,"ORDER BY 1\
;"),t=await O(E.data),!t)?!1:(s.nullPrint=null,s.title=e("List of installed extensions"),s.translate_header=!0,G(t,s,p.queryFout,
!1,p.logfile),!0)}async function Na(r){let E={},t,s;if(D(E),L(E,`SELECT e.extname, e.oid
FROM pg_catalog.pg_extension e
`),!P(E,r,!1,!1,null,"e.extname",null,null,null,1)||(c(E,"ORDER BY 1;"),t=await O(E.data),!t))return!1;if(q(t)==0)return p.
quiet||(r?W('Did not find any extension named "%s".',r):W("Did not find any extensions.")),!1;for(s=0;s<q(t);s++){let o,
a;if(o=A(t,s,0),a=A(t,s,1),!await La(o,a)||X)return!1}return!0}async function La(r,E){let t={},s,o={},a=p.popt;return D(
t),L(t,`SELECT pg_catalog.pg_describe_object(classid, objid, 0) AS "%s"
FROM pg_catalog.pg_depend
WHERE refclassid = 'pg_catalog.pg_extension'::pg_catalog.regclass AND refobjid = '%s' AND deptype = 'e'
ORDER BY 1;`,i("Object description"),E),s=await O(t.data),s?(a.nullPrint=null,D(o),L(o,e('Objects in extension "%s"'),r),
a.title=o.data,a.translate_header=!0,G(s,a,p.queryFout,!1,p.logfile),!0):!1}async function ga(r){let E={},t,s=p.popt,o=[
!1,!1,!1,!1,!1,!1,!1,!1];if(p.sversion<1e5){let a;return W("The server (version %s) does not support publications.",Ne(p.
sversion,!1,a,Ae(a))),!0}return D(E),L(E,`SELECT pubname AS "%s",
  pg_catalog.pg_get_userbyid(pubowner) AS "%s",
  puballtables AS "%s",
  pubinsert AS "%s",
  pubupdate AS "%s",
  pubdelete AS "%s"`,i("Name"),i("Owner"),i("All tables"),i("Inserts"),i("Updates"),i("Deletes")),p.sversion>=11e4&&l(E,
`,
  pubtruncate AS "%s"`,i("Truncates")),p.sversion>=13e4&&l(E,`,
  pubviaroot AS "%s"`,i("Via root")),c(E,`
FROM pg_catalog.pg_publication
`),!P(E,r,!1,!1,null,"pubname",null,null,null,1)||(c(E,"ORDER BY 1;"),t=await O(E.data),!t)?!1:(s.nullPrint=null,s.title=
e("List of publications"),s.translate_header=!0,s.translate_columns=o,s.n_translate_columns=Q(o),G(t,s,p.queryFout,!1,p.
logfile),!0)}async function pn(r,E,t,s){let o,a=0,_=0;if(o=await O(r.data),o)a=q(o);else return!1;for(a>0&&M(s,E),_=0;_<
a;_++)t?L(r,'    "%s"',A(o,_,0)):(L(r,'    "%s.%s"',A(o,_,0),A(o,_,1)),ee(o,_,3)||l(r," (%s)",A(o,_,3)),ee(o,_,2)||l(r,"\
 WHERE %s",A(o,_,2))),M(s,r.data);return!0}async function Sa(r){let E={},t,s,o,a,_={},g={};if(p.sversion<1e5){let N;return W(
"The server (version %s) does not support publications.",Ne(p.sversion,!1,N,Ae(N))),!0}if(o=p.sversion>=11e4,a=p.sversion>=
13e4,D(E),L(E,`SELECT oid, pubname,
  pg_catalog.pg_get_userbyid(pubowner) AS owner,
  puballtables, pubinsert, pubupdate, pubdelete`),o&&c(E,", pubtruncate"),a&&c(E,", pubviaroot"),c(E,`
FROM pg_catalog.pg_publication
`),!P(E,r,!1,!1,null,"pubname",null,null,null,1)||(c(E,"ORDER BY 2;"),s=await O(E.data),!s))return!1;if(q(s)==0)return p.
quiet||(r?W('Did not find any publication named "%s".',r):W("Did not find any publications.")),!1;for(t=0;t<q(s);t++){let N="\
l",T=5,d=1,m=A(s,t,0),f=A(s,t,1),y=h(A(s,t,3),"t")==0,b=p.popt.topt;if(o&&T++,a&&T++,D(_),L(_,e("Publication %s"),f),ve(
g,b,_.data,T,d),ie(g,i("Owner"),!0,N),ie(g,i("All tables"),!0,N),ie(g,i("Inserts"),!0,N),ie(g,i("Updates"),!0,N),ie(g,i(
"Deletes"),!0,N),o&&ie(g,i("Truncates"),!0,N),a&&ie(g,i("Via root"),!0,N),j(g,A(s,t,2),!1,!1),j(g,A(s,t,3),!1,!1),j(g,A(
s,t,4),!1,!1),j(g,A(s,t,5),!1,!1),j(g,A(s,t,6),!1,!1),o&&j(g,A(s,t,7),!1,!1),a&&j(g,A(s,t,8),!1,!1),!y&&(L(E,"SELECT n.n\
spname, c.relname"),p.sversion>=15e4?(c(E,", pg_get_expr(pr.prqual, c.oid)"),c(E,`, (CASE WHEN pr.prattrs IS NOT NULL TH\
EN
     pg_catalog.array_to_string(      ARRAY(SELECT attname
              FROM
                pg_catalog.generate_series(0, pg_catalog.array_upper(pr.prattrs::pg_catalog.int2[], 1)) s,
                pg_catalog.pg_attribute
        WHERE attrelid = c.oid AND attnum = prattrs[s]), ', ')
       ELSE NULL END)`)):c(E,", NULL, NULL"),l(E,`
FROM pg_catalog.pg_class c,
     pg_catalog.pg_namespace n,
     pg_catalog.pg_publication_rel pr
WHERE c.relnamespace = n.oid
  AND c.oid = pr.prrelid
  AND pr.prpubid = '%s'
ORDER BY 1,2`,m),!await pn(E,e("Tables:"),!1,g)||p.sversion>=15e4&&(L(E,`SELECT n.nspname
FROM pg_catalog.pg_namespace n
     JOIN pg_catalog.pg_publication_namespace pn ON n.oid = pn.pnnspid
WHERE pn.pnpubid = '%s'
ORDER BY 1`,m),!await pn(E,e("Tables from schemas:"),!0,g))))return!1;Be(g,p.queryFout,!1,p.logfile)}return!0}async function fa(r,E){
let t={},s,o=p.popt,a=[!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1];if(p.sversion<1e5){let _;return W("The server (vers\
ion %s) does not support subscriptions.",Ne(p.sversion,!1,_,Ae(_))),!0}return D(t),L(t,`SELECT subname AS "%s"
,  pg_catalog.pg_get_userbyid(subowner) AS "%s"
,  subenabled AS "%s"
,  subpublications AS "%s"
`,i("Name"),i("Owner"),i("Enabled"),i("Publication")),E&&(p.sversion>=14e4&&(l(t,`, subbinary AS "%s"
`,i("Binary")),p.sversion>=16e4?l(t,`, (CASE substream
    WHEN 'f' THEN 'off'
    WHEN 't' THEN 'on'
    WHEN 'p' THEN 'parallel'
   END) AS "%s"
`,i("Streaming")):l(t,`, substream AS "%s"
`,i("Streaming"))),p.sversion>=15e4&&l(t,`, subtwophasestate AS "%s"
, subdisableonerr AS "%s"
`,i("Two-phase commit"),i("Disable on error")),p.sversion>=16e4&&l(t,`, suborigin AS "%s"
, subpasswordrequired AS "%s"
, subrunasowner AS "%s"
`,i("Origin"),i("Password required"),i("Run as owner?")),p.sversion>=17e4&&l(t,`, subfailover AS "%s"
`,i("Failover")),l(t,`,  subsynccommit AS "%s"
,  subconninfo AS "%s"
`,i("Synchronous commit"),i("Conninfo")),p.sversion>=15e4&&l(t,`, subskiplsn AS "%s"
`,i("Skip LSN"))),c(t,`FROM pg_catalog.pg_subscription
WHERE subdbid = (SELECT oid
                 FROM pg_catalog.pg_database
                 WHERE datname = pg_catalog.current_database())`),!P(t,r,!0,!1,null,"subname",null,null,null,1)||(c(t,"O\
RDER BY 1;"),s=await O(t.data),!s)?!1:(o.nullPrint=null,o.title=e("List of subscriptions"),o.translate_header=!0,o.translate_columns=
a,o.n_translate_columns=Q(a),G(s,o,p.queryFout,!1,p.logfile),!0)}function te(r,E){l(r,`CASE WHEN pg_catalog.cardinality(\
%s) = 0 THEN '%s' ELSE pg_catalog.array_to_string(%s, E'\\n') END AS "%s"`,E,i("(none)"),E,i("Access privileges"))}async function Oa(r,E,t){
let s={},o,a=p.popt,_=!1,g=[!1,!1,!1,!1,!1,!1,!1];if(D(s),L(s,`SELECT
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
  END) AS "%s"`,i("AM"),i("Input type"),i("Storage type"),i("Operator class"),i("yes"),i("no"),i("Default?")),t&&l(s,`,
  CASE
    WHEN pg_catalog.pg_opfamily_is_visible(of.oid)
    THEN pg_catalog.format('%%I', of.opfname)
    ELSE pg_catalog.format('%%I.%%I', ofn.nspname, of.opfname)
  END AS "%s",
 pg_catalog.pg_get_userbyid(c.opcowner) AS "%s"
`,i("Operator family"),i("Owner")),c(s,`
FROM pg_catalog.pg_opclass c
  LEFT JOIN pg_catalog.pg_am am on am.oid = c.opcmethod
  LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.opcnamespace
  LEFT JOIN pg_catalog.pg_type t ON t.oid = c.opcintype
  LEFT JOIN pg_catalog.pg_namespace tn ON tn.oid = t.typnamespace
`),t&&c(s,`  LEFT JOIN pg_catalog.pg_opfamily of ON of.oid = c.opcfamily
  LEFT JOIN pg_catalog.pg_namespace ofn ON ofn.oid = of.opfnamespace
`),r){if(_={value:_},!P(s,r,!1,!1,null,"am.amname",null,null,_,1))return!1;_=_.value}return E&&!P(s,E,_,!1,"tn.nspname",
"t.typname","pg_catalog.format_type(t.oid, NULL)","pg_catalog.pg_type_is_visible(t.oid)",null,3)||(c(s,"ORDER BY 1, 2, 4\
;"),o=await O(s.data),!o)?!1:(a.nullPrint=null,a.title=e("List of operator classes"),a.translate_header=!0,a.translate_columns=
g,a.n_translate_columns=Q(g),G(o,a,p.queryFout,!1,p.logfile),!0)}async function ma(r,E,t){let s={},o,a=p.popt,_=!1,g=[!1,
!1,!1,!1];if(D(s),L(s,`SELECT
  am.amname AS "%s",
  CASE
    WHEN pg_catalog.pg_opfamily_is_visible(f.oid)
    THEN pg_catalog.format('%%I', f.opfname)
    ELSE pg_catalog.format('%%I.%%I', n.nspname, f.opfname)
  END AS "%s",
  (SELECT
     pg_catalog.string_agg(pg_catalog.format_type(oc.opcintype, NULL), ', ')
   FROM pg_catalog.pg_opclass oc
   WHERE oc.opcfamily = f.oid) "%s"`,i("AM"),i("Operator family"),i("Applicable types")),t&&l(s,`,
  pg_catalog.pg_get_userbyid(f.opfowner) AS "%s"
`,i("Owner")),c(s,`
FROM pg_catalog.pg_opfamily f
  LEFT JOIN pg_catalog.pg_am am on am.oid = f.opfmethod
  LEFT JOIN pg_catalog.pg_namespace n ON n.oid = f.opfnamespace
`),r){if(_={value:_},!P(s,r,!1,!1,null,"am.amname",null,null,_,1))return!1;_=_.value}if(E){if(l(s,`  %s EXISTS (
    SELECT 1
    FROM pg_catalog.pg_type t
    JOIN pg_catalog.pg_opclass oc ON oc.opcintype = t.oid
    LEFT JOIN pg_catalog.pg_namespace tn ON tn.oid = t.typnamespace
    WHERE oc.opcfamily = f.oid
`,_?"AND":"WHERE"),!P(s,E,!0,!1,"tn.nspname","t.typname","pg_catalog.format_type(t.oid, NULL)","pg_catalog.pg_type_is_vi\
sible(t.oid)",null,3))return!1;c(s,`  )
`)}return c(s,"ORDER BY 1, 2;"),o=await O(s.data),o?(a.nullPrint=null,a.title=e("List of operator families"),a.translate_header=
!0,a.translate_columns=g,a.n_translate_columns=Q(g),G(o,a,p.queryFout,!1,p.logfile),!0):!1}async function ua(r,E,t){let s={},
o,a=p.popt,_=!1,g=[!1,!1,!1,!1,!1,!1];if(D(s),L(s,`SELECT
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
`,i("AM"),i("Operator family"),i("Operator"),i("Strategy"),i("ordering"),i("search"),i("Purpose")),t&&l(s,`, ofs.opfname\
 AS "%s"
`,i("Sort opfamily")),c(s,`FROM pg_catalog.pg_amop o
  LEFT JOIN pg_catalog.pg_opfamily of ON of.oid = o.amopfamily
  LEFT JOIN pg_catalog.pg_am am ON am.oid = of.opfmethod AND am.oid = o.amopmethod
  LEFT JOIN pg_catalog.pg_namespace nsf ON of.opfnamespace = nsf.oid
`),t&&c(s,`  LEFT JOIN pg_catalog.pg_opfamily ofs ON ofs.oid = o.amopsortfamily
`),r){if(_={value:_},!P(s,r,!1,!1,null,"am.amname",null,null,_,1))return!1;_=_.value}return E&&!P(s,E,_,!1,"nsf.nspname",
"of.opfname",null,null,null,3)||(c(s,`ORDER BY 1, 2,
  o.amoplefttype = o.amoprighttype DESC,
  pg_catalog.format_type(o.amoplefttype, NULL),
  pg_catalog.format_type(o.amoprighttype, NULL),
  o.amopstrategy;`),o=await O(s.data),!o)?!1:(a.nullPrint=null,a.title=e("List of operators of operator families"),a.translate_header=
!0,a.translate_columns=g,a.n_translate_columns=Q(g),G(o,a,p.queryFout,!1,p.logfile),!0)}async function da(r,E,t){let s={},
o,a=p.popt,_=!1,g=[!1,!1,!1,!1,!1,!1];if(D(s),L(s,`SELECT
  am.amname AS "%s",
  CASE
    WHEN pg_catalog.pg_opfamily_is_visible(of.oid)
    THEN pg_catalog.format('%%I', of.opfname)
    ELSE pg_catalog.format('%%I.%%I', ns.nspname, of.opfname)
  END AS "%s",
  pg_catalog.format_type(ap.amproclefttype, NULL) AS "%s",
  pg_catalog.format_type(ap.amprocrighttype, NULL) AS "%s",
  ap.amprocnum AS "%s"
`,i("AM"),i("Operator family"),i("Registered left type"),i("Registered right type"),i("Number")),t?l(s,`, ap.amproc::pg_\
catalog.regprocedure AS "%s"
`,i("Function")):l(s,`, p.proname AS "%s"
`,i("Function")),c(s,`FROM pg_catalog.pg_amproc ap
  LEFT JOIN pg_catalog.pg_opfamily of ON of.oid = ap.amprocfamily
  LEFT JOIN pg_catalog.pg_am am ON am.oid = of.opfmethod
  LEFT JOIN pg_catalog.pg_namespace ns ON of.opfnamespace = ns.oid
  LEFT JOIN pg_catalog.pg_proc p ON ap.amproc = p.oid
`),r){if(_={value:_},!P(s,r,!1,!1,null,"am.amname",null,null,_,1))return!1;_=_.value}return E&&!P(s,E,_,!1,"ns.nspname",
"of.opfname",null,null,null,3)||(c(s,`ORDER BY 1, 2,
  ap.amproclefttype = ap.amprocrighttype DESC,
  3, 4, 5;`),o=await O(s.data),!o)?!1:(a.nullPrint=null,a.title=e("List of support functions of operator families"),a.translate_header=
!0,a.translate_columns=g,a.n_translate_columns=Q(g),G(o,a,p.queryFout,!1,p.logfile),!0)}async function Ia(r){let E={},t,
s=p.popt;if(D(E),L(E,`SELECT oid as "%s",
  pg_catalog.pg_get_userbyid(lomowner) as "%s",
  `,i("ID"),i("Owner")),r&&(te(E,"lomacl"),c(E,`,
  `)),l(E,`pg_catalog.obj_description(oid, 'pg_largeobject') as "%s"
FROM pg_catalog.pg_largeobject_metadata
ORDER BY oid`,i("Description")),t=await O(E.data),!t)return!1;s.nullPrint=null,s.title=e("Large objects"),s.translate_header=
!0,G(t,s,p.queryFout,!1,p.logfile)}return!0}return{promise:ze(),cancel:me}}function Rn(n,u,C,U="",v=""){const Y=Math.max(
0,u-pe(n));return C==="r"?U+" ".repeat(Y)+n+v:C==="c"?U+" ".repeat(Math.floor(Y/2))+n+" ".repeat(Math.ceil(Y/2))+v:U+n+"\
 ".repeat(Y)+v}function An(n,u){let C=0;const U=n.length,v=[];for(;C<U;)v.push(n.slice(C,C+=u));return v}function Ya(n){
let u=-1,C=0,U=1,v=0;for(;(u=n.indexOf(`
`,u+1))!==-1;)u-C>v&&(v=u-C),C=u+1,U++;return n.length-C>v&&(v=n.length-C),{count:U,longest:v}}function Re(n,u){return n=
n.replace(/[<>&'"]/g,C=>({"<":"&lt;",">":"&gt;","&":"&amp;","'":"&apos;",'"':"&quot;"})[C]),u&&(n=n.replace(/ /g,"&nbsp;").
replace(/\n/g,"<br />")),n}function xa(n,u){const{ncolumns:C,nrows:U,aligns:v}=n,Y=[...n.headers,...n.cells].map(Ya),{colWidths:x,
rowHeights:z}=Y.reduce((se,O,p)=>{const W=Math.floor(p/n.ncolumns),P=p%n.ncolumns;return O.longest>se.colWidths[P]&&(se.
colWidths[P]=O.longest),O.count>se.rowHeights[W]&&(se.rowHeights[W]=O.count),se},{colWidths:new Array(C).fill(0),rowHeights:new Array(
U+1).fill(1)}),X=x.reduce((se,O)=>se+O,0)+C*2+(C-1),me=Rn(n.title,X,"c"),le=[n.headers,null,...An(n.cells,C)],ze=le.map(
(se,O)=>{if(O===1)return n.headers.map((W,P)=>"-".repeat(x[P%C]+2)).join("+");O>1&&O--;const p=se.map(W=>W.split(`
`));return new Array(z[O]).fill("").map((W,P)=>p.map((De,qe)=>Rn(De[P]??"",x[qe],O===0?"c":v[qe]," ",De[P+1]===void 0?" ":
"+")).join("|")).join(`
`)}).join(`
`),Ze=n.footers?n.footers.filter(we):[],We=Ze.length>0?`
`+Ze.join(`
`):n.opt.default_footer?`
(${U} row${U===1?"":"s"})`:"";let J=`${me}
${ze}${We}`;return u&&(J=Re(J)),J}function Va(n){let u=`<table><tr><th valign="top" style="text-align: center;" colspan=\
"${n.ncolumns}">${Re(n.title)}</th></tr><tr>`;for(let U of n.headers)u+=`<th valign="top" style="text-align: center;">${Re(
U)}</th>`;u+="</tr>";for(let U of An(n.cells,n.ncolumns))u+="<tr>"+U.map((v,Y)=>`<td valign="top" style="text-align: ${n.
aligns[Y]==="c"?"center":n.aligns[Y]==="r"?"right":"left"}">${Re(v).replace(/\n/g,"<br>")}</td>`).join(`
`)+"</tr>";u+="</table>";const C=n.footers?n.footers.filter(we):[];return C.length>0?C.length>1&&C.some(U=>/^\s/.test(U))?
u+="<dl>"+C.map(U=>/^\s/.test(U)?`<dd>${Re(U.trim(),!0)}</dd>`:`<dt>${Re(U,!0)}</dt>`).join("")+"</dl>":u+=C.map(U=>`<p>${Re(
U,!0)}</p>`).join(""):n.opt.default_footer&&(u+=`<p>(${n.nrows} row${n.nrows===1?"":"s"})</p>`),u}function de(n){if(!n)throw new Error(
`Assertion failed (value: ${n})`)}const i=we,Se=we,e=we;function Qe(n,u){const C=n.indexOf(u);return C===-1?null:C}const K=Qe;
function pe(n){return n.length}function Ie(n,u,C){if(typeof n!="string"||typeof u!="string")throw new Error("Not a strin\
g");return n.length>C&&(n=n.slice(0,C)),u.length>C&&(u=u.slice(0,C)),n<u?-1:n>u?1:0}function h(n,u){return Ie(n,u,1/0)}function Xa(n,u){
const C=pe(n);for(let U=0;U<C;U++)if(u.indexOf(n[U])===-1)return U;return C}function Nn(n){return parseInt(n,10)}function sn(n){
return parseInt(n,10)}function Ln(n){return n===" "||n==="	"||n===`
`||n==="\r"}function ka(n){return n==='"'||n==="'"}function ja(n){const u=n.charCodeAt(0);return u>=65&&u<=90}function Q(n){
return n.length}function tn(n){return n.toLowerCase()}function Ja(n,u){return h(n.toLowerCase(),u.toLowerCase())}function gn(n,u,C){
return u}function Ae(n){return 0}function D(n){n.data="",n.len=0}const on=D;function c(n,u){n.data+=u,n.len=n.data.length}
const V=c;function l(n,u,...C){const U=$(u,...C);c(n,U)}function L(n,u,...C){D(n),l(n,u,...C)}function En(n,u,C,U){const Y="\
'"+u.replace(U?/[']/g:/['\\]/g,"\\$&")+"'";c(n,Y)}function Ce(n,u,C){if(K(u,"\\")!=null&&He(C)>=80100){n.len>0&&n.data[n.
len-1]!=" "&&V(n," "),V(n,Ua),En(n,u,fn(C),!1);return}En(n,u,C.encoding,C.std_strings)}function $(n,...u){let C="",U=0,v=0,
Y;for(;(Y=n.indexOf("%",v))!==-1;){let x=0,z=!1;C+=n.slice(v,Y),v=Y+1;let X=n[v++];if(X==="%"&&(C+="%"),X==="*"&&(x=parseInt(
u[U++],10),X=n[v++]),X==="-"&&(z=!0,X=n[v++]),X>="0"&&X<="9"&&(x=parseInt(X,10),X=n[v++]),X==="s"||X==="c"||X==="d"||X===
"u"){const me=String(u[U++]),le=x-me.length;z===!1&&le>0&&(C+=" ".repeat(le)),C+=me,z===!0&&le>0&&(C+=" ".repeat(le))}}return C+=
n.slice(v),C}const ln=$;function Sn(n){return n?n.dbName:null}function He(n){return!n||n.status===1?0:n.sversion}function fn(n){
return!n||n.status!=0?-1:n.client_encoding}function q(n){return n.rowCount}function On(n){return n.fields.length}function mn(n,u){
return n.fields[u].name}function Ka(n,u){return n.fields[u].dataTypeID}function ee(n,u,C){return n.rows[u][C]===null?1:0}
function A(n,u,C){const U=n.rows[u][C];return String(U===null?"":U)}function fe(n,u){let C,U,v,Y,x;if(!n||u==null||u[0]==
null)return-1;for(C=!1,v="",U=0,x=pe(u);U<x;U++){let z=u[U];C?z=='"'?u[U+1]=='"'?(v+='"',U++):C=!1:v+=z:z=='"'?C=!0:(z=tn(
z),v+=z)}for(Y=0,x=On(n);Y<x;Y++)if(h(v,mn(n,Y))==0)return Y;return-1}function Ne(n,u,C,U){return n>=1e5?u?C=$("%d.%d",Math.
floor(n/1e4),n%1e4):C=$("%d",n/1e4):u?C=$("%d.%d.%d",Math.floor(n/1e4),Math.floor(n/100)%100,n%100):C=$("%d.%d",Math.floor(
n/1e4),Math.floor(n/100)%100),C}function Oe(n,u,C,U){if(u!==0&&u!==4)throw new Error(`scan type ${u} not implemented`);if(C!==
null)throw new Error("cannot return quote type");const v=[],Y=U?/^(.*);*$/:/^(.*)$/;let x;for(;;){if(x=n[0][n[1]],x==null)
return null;if(!Ln(x))break;n[1]++}if(u===4)return n[0].slice(n[1],n[1]=n[0].length);let z="";for(;;){if(x=n[0][n[1]++],
x==null)return v.length>0?null:z.match(Y)[1];if(ka(x))x===v[v.length-1]?v.pop():v.push(x),x==='"'&&(z+=x);else{if(v.length===
0&&Ln(x))return z.match(Y)[1];z+=x}}}function we(n){return n}const Qa=`Help
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
`,Ge=[["ABORT","abort the current transaction","sql-abort",za],["ALTER AGGREGATE","change the definition of an aggregate\
 function","sql-alteraggregate",Za],["ALTER COLLATION","change the definition of a collation","sql-altercollation",$a],[
"ALTER CONVERSION","change the definition of a conversion","sql-alterconversion",es],["ALTER DATABASE","change a databas\
e","sql-alterdatabase",ns],["ALTER DEFAULT PRIVILEGES","define default access privileges","sql-alterdefaultprivileges",as],
["ALTER DOMAIN","change the definition of a domain","sql-alterdomain",ss],["ALTER EVENT TRIGGER","change the definition \
of an event trigger","sql-altereventtrigger",ts],["ALTER EXTENSION","change the definition of an extension","sql-alterex\
tension",is],["ALTER FOREIGN DATA WRAPPER","change the definition of a foreign-data wrapper","sql-alterforeigndatawrappe\
r",os],["ALTER FOREIGN TABLE","change the definition of a foreign table","sql-alterforeigntable",Es],["ALTER FUNCTION","\
change the definition of a function","sql-alterfunction",ls],["ALTER GROUP","change role name or membership","sql-alterg\
roup",rs],["ALTER INDEX","change the definition of an index","sql-alterindex",cs],["ALTER LANGUAGE","change the definiti\
on of a procedural language","sql-alterlanguage",_s],["ALTER LARGE OBJECT","change the definition of a large object","sq\
l-alterlargeobject",ps],["ALTER MATERIALIZED VIEW","change the definition of a materialized view","sql-altermaterialized\
view",Ts],["ALTER OPERATOR","change the definition of an operator","sql-alteroperator",Rs],["ALTER OPERATOR CLASS","chan\
ge the definition of an operator class","sql-alteropclass",As],["ALTER OPERATOR FAMILY","change the definition of an ope\
rator family","sql-alteropfamily",Ns],["ALTER POLICY","change the definition of a row-level security policy","sql-alterp\
olicy",Ls],["ALTER PROCEDURE","change the definition of a procedure","sql-alterprocedure",gs],["ALTER PUBLICATION","chan\
ge the definition of a publication","sql-alterpublication",Ss],["ALTER ROLE","change a database role","sql-alterrole",fs],
["ALTER ROUTINE","change the definition of a routine","sql-alterroutine",Os],["ALTER RULE","change the definition of a r\
ule","sql-alterrule",ms],["ALTER SCHEMA","change the definition of a schema","sql-alterschema",us],["ALTER SEQUENCE","ch\
ange the definition of a sequence generator","sql-altersequence",ds],["ALTER SERVER","change the definition of a foreign\
 server","sql-alterserver",Is],["ALTER STATISTICS","change the definition of an extended statistics object","sql-alterst\
atistics",Cs],["ALTER SUBSCRIPTION","change the definition of a subscription","sql-altersubscription",Ds],["ALTER SYSTEM",
"change a server configuration parameter","sql-altersystem",Us],["ALTER TABLE","change the definition of a table","sql-a\
ltertable",Ps],["ALTER TABLESPACE","change the definition of a tablespace","sql-altertablespace",bs],["ALTER TEXT SEARCH\
 CONFIGURATION","change the definition of a text search configuration","sql-altertsconfig",hs],["ALTER TEXT SEARCH DICTI\
ONARY","change the definition of a text search dictionary","sql-altertsdictionary",Fs],["ALTER TEXT SEARCH PARSER","chan\
ge the definition of a text search parser","sql-altertsparser",ys],["ALTER TEXT SEARCH TEMPLATE","change the definition \
of a text search template","sql-altertstemplate",Ms],["ALTER TRIGGER","change the definition of a trigger","sql-altertri\
gger",Hs],["ALTER TYPE","change the definition of a type","sql-altertype",ws],["ALTER USER","change a database role","sq\
l-alteruser",Gs],["ALTER USER MAPPING","change the definition of a user mapping","sql-alterusermapping",Ws],["ALTER VIEW",
"change the definition of a view","sql-alterview",qs],["ANALYZE","collect statistics about a database","sql-analyze",vs],
["BEGIN","start a transaction block","sql-begin",Bs],["CALL","invoke a procedure","sql-call",Ys],["CHECKPOINT","force a \
write-ahead log checkpoint","sql-checkpoint",xs],["CLOSE","close a cursor","sql-close",Vs],["CLUSTER","cluster a table a\
ccording to an index","sql-cluster",Xs],["COMMENT","define or change the comment of an object","sql-comment",ks],["COMMI\
T","commit the current transaction","sql-commit",js],["COMMIT PREPARED","commit a transaction that was earlier prepared \
for two-phase commit","sql-commit-prepared",Js],["COPY","copy data between a file and a table","sql-copy",Ks],["CREATE A\
CCESS METHOD","define a new access method","sql-create-access-method",Qs],["CREATE AGGREGATE","define a new aggregate fu\
nction","sql-createaggregate",zs],["CREATE CAST","define a new cast","sql-createcast",Zs],["CREATE COLLATION","define a \
new collation","sql-createcollation",$s],["CREATE CONVERSION","define a new encoding conversion","sql-createconversion",
et],["CREATE DATABASE","create a new database","sql-createdatabase",nt],["CREATE DOMAIN","define a new domain","sql-crea\
tedomain",at],["CREATE EVENT TRIGGER","define a new event trigger","sql-createeventtrigger",st],["CREATE EXTENSION","ins\
tall an extension","sql-createextension",tt],["CREATE FOREIGN DATA WRAPPER","define a new foreign-data wrapper","sql-cre\
ateforeigndatawrapper",it],["CREATE FOREIGN TABLE","define a new foreign table","sql-createforeigntable",ot],["CREATE FU\
NCTION","define a new function","sql-createfunction",Et],["CREATE GROUP","define a new database role","sql-creategroup",
lt],["CREATE INDEX","define a new index","sql-createindex",rt],["CREATE LANGUAGE","define a new procedural language","sq\
l-createlanguage",ct],["CREATE MATERIALIZED VIEW","define a new materialized view","sql-creatematerializedview",_t],["CR\
EATE OPERATOR","define a new operator","sql-createoperator",pt],["CREATE OPERATOR CLASS","define a new operator class","\
sql-createopclass",Tt],["CREATE OPERATOR FAMILY","define a new operator family","sql-createopfamily",Rt],["CREATE POLICY",
"define a new row-level security policy for a table","sql-createpolicy",At],["CREATE PROCEDURE","define a new procedure",
"sql-createprocedure",Nt],["CREATE PUBLICATION","define a new publication","sql-createpublication",Lt],["CREATE ROLE","d\
efine a new database role","sql-createrole",gt],["CREATE RULE","define a new rewrite rule","sql-createrule",St],["CREATE\
 SCHEMA","define a new schema","sql-createschema",ft],["CREATE SEQUENCE","define a new sequence generator","sql-createse\
quence",Ot],["CREATE SERVER","define a new foreign server","sql-createserver",mt],["CREATE STATISTICS","define extended \
statistics","sql-createstatistics",ut],["CREATE SUBSCRIPTION","define a new subscription","sql-createsubscription",dt],[
"CREATE TABLE","define a new table","sql-createtable",It],["CREATE TABLE AS","define a new table from the results of a q\
uery","sql-createtableas",Ct],["CREATE TABLESPACE","define a new tablespace","sql-createtablespace",Dt],["CREATE TEXT SE\
ARCH CONFIGURATION","define a new text search configuration","sql-createtsconfig",Ut],["CREATE TEXT SEARCH DICTIONARY","\
define a new text search dictionary","sql-createtsdictionary",Pt],["CREATE TEXT SEARCH PARSER","define a new text search\
 parser","sql-createtsparser",bt],["CREATE TEXT SEARCH TEMPLATE","define a new text search template","sql-createtstempla\
te",ht],["CREATE TRANSFORM","define a new transform","sql-createtransform",Ft],["CREATE TRIGGER","define a new trigger",
"sql-createtrigger",yt],["CREATE TYPE","define a new data type","sql-createtype",Mt],["CREATE USER","define a new databa\
se role","sql-createuser",Ht],["CREATE USER MAPPING","define a new mapping of a user to a foreign server","sql-createuse\
rmapping",wt],["CREATE VIEW","define a new view","sql-createview",Gt],["DEALLOCATE","deallocate a prepared statement","s\
ql-deallocate",Wt],["DECLARE","define a cursor","sql-declare",qt],["DELETE","delete rows of a table","sql-delete",vt],["\
DISCARD","discard session state","sql-discard",Bt],["DO","execute an anonymous code block","sql-do",Yt],["DROP ACCESS ME\
THOD","remove an access method","sql-drop-access-method",xt],["DROP AGGREGATE","remove an aggregate function","sql-dropa\
ggregate",Vt],["DROP CAST","remove a cast","sql-dropcast",Xt],["DROP COLLATION","remove a collation","sql-dropcollation",
kt],["DROP CONVERSION","remove a conversion","sql-dropconversion",jt],["DROP DATABASE","remove a database","sql-dropdata\
base",Jt],["DROP DOMAIN","remove a domain","sql-dropdomain",Kt],["DROP EVENT TRIGGER","remove an event trigger","sql-dro\
peventtrigger",Qt],["DROP EXTENSION","remove an extension","sql-dropextension",zt],["DROP FOREIGN DATA WRAPPER","remove \
a foreign-data wrapper","sql-dropforeigndatawrapper",Zt],["DROP FOREIGN TABLE","remove a foreign table","sql-dropforeign\
table",$t],["DROP FUNCTION","remove a function","sql-dropfunction",ei],["DROP GROUP","remove a database role","sql-dropg\
roup",ni],["DROP INDEX","remove an index","sql-dropindex",ai],["DROP LANGUAGE","remove a procedural language","sql-dropl\
anguage",si],["DROP MATERIALIZED VIEW","remove a materialized view","sql-dropmaterializedview",ti],["DROP OPERATOR","rem\
ove an operator","sql-dropoperator",ii],["DROP OPERATOR CLASS","remove an operator class","sql-dropopclass",oi],["DROP O\
PERATOR FAMILY","remove an operator family","sql-dropopfamily",Ei],["DROP OWNED","remove database objects owned by a dat\
abase role","sql-drop-owned",li],["DROP POLICY","remove a row-level security policy from a table","sql-droppolicy",ri],[
"DROP PROCEDURE","remove a procedure","sql-dropprocedure",ci],["DROP PUBLICATION","remove a publication","sql-droppublic\
ation",_i],["DROP ROLE","remove a database role","sql-droprole",pi],["DROP ROUTINE","remove a routine","sql-droproutine",
Ti],["DROP RULE","remove a rewrite rule","sql-droprule",Ri],["DROP SCHEMA","remove a schema","sql-dropschema",Ai],["DROP\
 SEQUENCE","remove a sequence","sql-dropsequence",Ni],["DROP SERVER","remove a foreign server descriptor","sql-dropserve\
r",Li],["DROP STATISTICS","remove extended statistics","sql-dropstatistics",gi],["DROP SUBSCRIPTION","remove a subscript\
ion","sql-dropsubscription",Si],["DROP TABLE","remove a table","sql-droptable",fi],["DROP TABLESPACE","remove a tablespa\
ce","sql-droptablespace",Oi],["DROP TEXT SEARCH CONFIGURATION","remove a text search configuration","sql-droptsconfig",mi],
["DROP TEXT SEARCH DICTIONARY","remove a text search dictionary","sql-droptsdictionary",ui],["DROP TEXT SEARCH PARSER","\
remove a text search parser","sql-droptsparser",di],["DROP TEXT SEARCH TEMPLATE","remove a text search template","sql-dr\
optstemplate",Ii],["DROP TRANSFORM","remove a transform","sql-droptransform",Ci],["DROP TRIGGER","remove a trigger","sql\
-droptrigger",Di],["DROP TYPE","remove a data type","sql-droptype",Ui],["DROP USER","remove a database role","sql-dropus\
er",Pi],["DROP USER MAPPING","remove a user mapping for a foreign server","sql-dropusermapping",bi],["DROP VIEW","remove\
 a view","sql-dropview",hi],["END","commit the current transaction","sql-end",Fi],["EXECUTE","execute a prepared stateme\
nt","sql-execute",yi],["EXPLAIN","show the execution plan of a statement","sql-explain",Mi],["FETCH","retrieve rows from\
 a query using a cursor","sql-fetch",Hi],["GRANT","define access privileges","sql-grant",wi],["IMPORT FOREIGN SCHEMA","i\
mport table definitions from a foreign server","sql-importforeignschema",Gi],["INSERT","create new rows in a table","sql\
-insert",Wi],["LISTEN","listen for a notification","sql-listen",qi],["LOAD","load a shared library file","sql-load",vi],
["LOCK","lock a table","sql-lock",Bi],["MERGE","conditionally insert, update, or delete rows of a table","sql-merge",Yi],
["MOVE","position a cursor","sql-move",xi],["NOTIFY","generate a notification","sql-notify",Vi],["PREPARE","prepare a st\
atement for execution","sql-prepare",Xi],["PREPARE TRANSACTION","prepare the current transaction for two-phase commit","\
sql-prepare-transaction",ki],["REASSIGN OWNED","change the ownership of database objects owned by a database role","sql-\
reassign-owned",ji],["REFRESH MATERIALIZED VIEW","replace the contents of a materialized view","sql-refreshmaterializedv\
iew",Ji],["REINDEX","rebuild indexes","sql-reindex",Ki],["RELEASE SAVEPOINT","release a previously defined savepoint","s\
ql-release-savepoint",Qi],["RESET","restore the value of a run-time parameter to the default value","sql-reset",zi],["RE\
VOKE","remove access privileges","sql-revoke",Zi],["ROLLBACK","abort the current transaction","sql-rollback",$i],["ROLLB\
ACK PREPARED","cancel a transaction that was earlier prepared for two-phase commit","sql-rollback-prepared",eo],["ROLLBA\
CK TO SAVEPOINT","roll back to a savepoint","sql-rollback-to",no],["SAVEPOINT","define a new savepoint within the curren\
t transaction","sql-savepoint",ao],["SECURITY LABEL","define or change a security label applied to an object","sql-secur\
ity-label",so],["SELECT","retrieve rows from a table or view","sql-select",to],["SELECT INTO","define a new table from t\
he results of a query","sql-selectinto",io],["SET","change a run-time parameter","sql-set",oo],["SET CONSTRAINTS","set c\
onstraint check timing for the current transaction","sql-set-constraints",Eo],["SET ROLE","set the current user identifi\
er of the current session","sql-set-role",lo],["SET SESSION AUTHORIZATION","set the session user identifier and the curr\
ent user identifier of the current session","sql-set-session-authorization",ro],["SET TRANSACTION","set the characterist\
ics of the current transaction","sql-set-transaction",co],["SHOW","show the value of a run-time parameter","sql-show",_o],
["START TRANSACTION","start a transaction block","sql-start-transaction",po],["TABLE","retrieve rows from a table or vie\
w","sql-select",To],["TRUNCATE","empty a table or set of tables","sql-truncate",Ro],["UNLISTEN","stop listening for a no\
tification","sql-unlisten",Ao],["UPDATE","update rows of a table","sql-update",No],["VACUUM","garbage-collect and option\
ally analyze a database","sql-vacuum",Lo],["VALUES","compute a set of rows","sql-values",go],["WITH","retrieve rows from\
 a table or view","sql-select",So]];function za(n){l(n,"ABORT [ WORK | TRANSACTION ] [ AND [ NO ] CHAIN ]")}function Za(n){
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
argtype"))}function $a(n){l(n,`ALTER COLLATION %s REFRESH VERSION

ALTER COLLATION %s RENAME TO %s
ALTER COLLATION %s OWNER TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER }
ALTER COLLATION %s SET SCHEMA %s`,e("name"),e("name"),e("new_name"),e("name"),e("new_owner"),e("name"),e("new_schema"))}
function es(n){l(n,`ALTER CONVERSION %s RENAME TO %s
ALTER CONVERSION %s OWNER TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER }
ALTER CONVERSION %s SET SCHEMA %s`,e("name"),e("new_name"),e("name"),e("new_owner"),e("name"),e("new_schema"))}function ns(n){
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
meter"),e("value"),e("name"),e("configuration_parameter"),e("name"),e("configuration_parameter"),e("name"))}function as(n){
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
    [ CASCADE | RESTRICT ]`,e("target_role"),e("schema_name"),e("abbreviated_grant_or_revoke"),e("where abbreviated_gran\
t_or_revoke is one of:"),e("role_name"),e("role_name"),e("role_name"),e("role_name"),e("role_name"),e("role_name"),e("ro\
le_name"),e("role_name"),e("role_name"),e("role_name"))}function ss(n){l(n,`ALTER DOMAIN %s
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
    SET SCHEMA %s`,e("name"),e("expression"),e("name"),e("name"),e("domain_constraint"),e("name"),e("constraint_name"),e(
"name"),e("constraint_name"),e("new_constraint_name"),e("name"),e("constraint_name"),e("name"),e("new_owner"),e("name"),
e("new_name"),e("name"),e("new_schema"))}function ts(n){l(n,`ALTER EVENT TRIGGER %s DISABLE
ALTER EVENT TRIGGER %s ENABLE [ REPLICA | ALWAYS ]
ALTER EVENT TRIGGER %s OWNER TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER }
ALTER EVENT TRIGGER %s RENAME TO %s`,e("name"),e("name"),e("name"),e("new_owner"),e("name"),e("new_name"))}function is(n){
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
function os(n){l(n,`ALTER FOREIGN DATA WRAPPER %s
    [ HANDLER %s | NO HANDLER ]
    [ VALIDATOR %s | NO VALIDATOR ]
    [ OPTIONS ( [ ADD | SET | DROP ] %s ['%s'] [, ... ]) ]
ALTER FOREIGN DATA WRAPPER %s OWNER TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER }
ALTER FOREIGN DATA WRAPPER %s RENAME TO %s`,e("name"),e("handler_function"),e("validator_function"),e("option"),e("value"),
e("name"),e("new_owner"),e("name"),e("new_name"))}function Es(n){l(n,`ALTER FOREIGN TABLE [ IF EXISTS ] [ ONLY ] %s [ * \
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
"parent_table"),e("parent_table"),e("new_owner"),e("option"),e("value"))}function ls(n){l(n,`ALTER FUNCTION %s [ ( [ [ %\
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
_parameter"),e("configuration_parameter"))}function rs(n){l(n,`ALTER GROUP %s ADD USER %s [, ... ]
ALTER GROUP %s DROP USER %s [, ... ]

%s

    %s
  | CURRENT_ROLE
  | CURRENT_USER
  | SESSION_USER

ALTER GROUP %s RENAME TO %s`,e("role_specification"),e("user_name"),e("role_specification"),e("user_name"),e("where role\
_specification can be:"),e("role_name"),e("group_name"),e("new_name"))}function cs(n){l(n,`ALTER INDEX [ IF EXISTS ] %s \
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
n_number"),e("integer"),e("name"),e("role_name"),e("new_tablespace"))}function _s(n){l(n,`ALTER [ PROCEDURAL ] LANGUAGE \
%s RENAME TO %s
ALTER [ PROCEDURAL ] LANGUAGE %s OWNER TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER }`,e("name"),e("new_name"),e(
"name"),e("new_owner"))}function ps(n){l(n,"ALTER LARGE OBJECT %s OWNER TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_\
USER }",e("large_object_oid"),e("new_owner"))}function Ts(n){l(n,`ALTER MATERIALIZED VIEW [ IF EXISTS ] %s
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
e("new_access_method"),e("new_tablespace"),e("storage_parameter"),e("value"),e("storage_parameter"),e("new_owner"))}function Rs(n){
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
e("new_schema"),e("name"),e("left_type"),e("right_type"),e("res_proc"),e("join_proc"),e("com_op"),e("neg_op"))}function As(n){
l(n,`ALTER OPERATOR CLASS %s USING %s
    RENAME TO %s

ALTER OPERATOR CLASS %s USING %s
    OWNER TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER }

ALTER OPERATOR CLASS %s USING %s
    SET SCHEMA %s`,e("name"),e("index_method"),e("new_name"),e("name"),e("index_method"),e("new_owner"),e("name"),e("ind\
ex_method"),e("new_schema"))}function Ns(n){l(n,`ALTER OPERATOR FAMILY %s USING %s ADD
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
ethod"),e("new_name"),e("name"),e("index_method"),e("new_owner"),e("name"),e("index_method"),e("new_schema"))}function Ls(n){
l(n,`ALTER POLICY %s ON %s RENAME TO %s

ALTER POLICY %s ON %s
    [ TO { %s | PUBLIC | CURRENT_ROLE | CURRENT_USER | SESSION_USER } [, ...] ]
    [ USING ( %s ) ]
    [ WITH CHECK ( %s ) ]`,e("name"),e("table_name"),e("new_name"),e("name"),e("table_name"),e("role_name"),e("using_exp\
ression"),e("check_expression"))}function gs(n){l(n,`ALTER PROCEDURE %s [ ( [ [ %s ] [ %s ] %s [, ...] ] ) ]
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
f:"),e("configuration_parameter"),e("value"),e("configuration_parameter"),e("configuration_parameter"))}function Ss(n){l(
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
new_name"),e("where publication_object is one of:"),e("table_name"),e("column_name"),e("expression"),e("schema_name"))}function fs(n){
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
on_parameter"),e("role_specification"),e("database_name"),e("where role_specification can be:"),e("role_name"))}function Os(n){
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
uration_parameter"))}function ms(n){l(n,"ALTER RULE %s ON %s RENAME TO %s",e("name"),e("table_name"),e("new_name"))}function us(n){
l(n,`ALTER SCHEMA %s RENAME TO %s
ALTER SCHEMA %s OWNER TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER }`,e("name"),e("new_name"),e("name"),e("new_o\
wner"))}function ds(n){l(n,`ALTER SEQUENCE [ IF EXISTS ] %s
    [ AS %s ]
    [ INCREMENT [ BY ] %s ]
    [ MINVALUE %s | NO MINVALUE ] [ MAXVALUE %s | NO MAXVALUE ]
    [ START [ WITH ] %s ]
    [ RESTART [ [ WITH ] %s ] ]
    [ CACHE %s ] [ [ NO ] CYCLE ]
    [ OWNED BY { %s.%s | NONE } ]
ALTER SEQUENCE [ IF EXISTS ] %s SET { LOGGED | UNLOGGED }
ALTER SEQUENCE [ IF EXISTS ] %s OWNER TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER }
ALTER SEQUENCE [ IF EXISTS ] %s RENAME TO %s
ALTER SEQUENCE [ IF EXISTS ] %s SET SCHEMA %s`,e("name"),e("data_type"),e("increment"),e("minvalue"),e("maxvalue"),e("st\
art"),e("restart"),e("cache"),e("table_name"),e("column_name"),e("name"),e("name"),e("new_owner"),e("name"),e("new_name"),
e("name"),e("new_schema"))}function Is(n){l(n,`ALTER SERVER %s [ VERSION '%s' ]
    [ OPTIONS ( [ ADD | SET | DROP ] %s ['%s'] [, ... ] ) ]
ALTER SERVER %s OWNER TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER }
ALTER SERVER %s RENAME TO %s`,e("name"),e("new_version"),e("option"),e("value"),e("name"),e("new_owner"),e("name"),e("ne\
w_name"))}function Cs(n){l(n,`ALTER STATISTICS %s OWNER TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER }
ALTER STATISTICS %s RENAME TO %s
ALTER STATISTICS %s SET SCHEMA %s
ALTER STATISTICS %s SET STATISTICS { %s | DEFAULT }`,e("name"),e("new_owner"),e("name"),e("new_name"),e("name"),e("new_s\
chema"),e("name"),e("new_target"))}function Ds(n){l(n,`ALTER SUBSCRIPTION %s CONNECTION '%s'
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
e("value"),e("name"),e("skip_option"),e("value"),e("name"),e("new_owner"),e("name"),e("new_name"))}function Us(n){l(n,`A\
LTER SYSTEM SET %s { TO | = } { %s | '%s' | DEFAULT }

ALTER SYSTEM RESET %s
ALTER SYSTEM RESET ALL`,e("configuration_parameter"),e("value"),e("value"),e("configuration_parameter"))}function Ps(n){
l(n,`ALTER TABLE [ IF EXISTS ] [ ONLY ] %s [ * ]
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
    ALTER CONSTRAINT %s [ DEFERRABLE | NOT DEFERRABLE ] [ INITIALLY DEFERRED | INITIALLY IMMEDIATE ]
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
{ NOT NULL |
  NULL |
  CHECK ( %s ) [ NO INHERIT ] |
  DEFAULT %s |
  GENERATED ALWAYS AS ( %s ) STORED |
  GENERATED { ALWAYS | BY DEFAULT } AS IDENTITY [ ( %s ) ] |
  UNIQUE [ NULLS [ NOT ] DISTINCT ] %s |
  PRIMARY KEY %s |
  REFERENCES %s [ ( %s ) ] [ MATCH FULL | MATCH PARTIAL | MATCH SIMPLE ]
    [ ON DELETE %s ] [ ON UPDATE %s ] }
[ DEFERRABLE | NOT DEFERRABLE ] [ INITIALLY DEFERRED | INITIALLY IMMEDIATE ]

%s

[ CONSTRAINT %s ]
{ CHECK ( %s ) [ NO INHERIT ] |
  UNIQUE [ NULLS [ NOT ] DISTINCT ] ( %s [, ... ] ) %s |
  PRIMARY KEY ( %s [, ... ] ) %s |
  EXCLUDE [ USING %s ] ( %s WITH %s [, ... ] ) %s [ WHERE ( %s ) ] |
  FOREIGN KEY ( %s [, ... ] ) REFERENCES %s [ ( %s [, ... ] ) ]
    [ MATCH FULL | MATCH PARTIAL | MATCH SIMPLE ] [ ON DELETE %s ] [ ON UPDATE %s ] }
[ DEFERRABLE | NOT DEFERRABLE ] [ INITIALLY DEFERRED | INITIALLY IMMEDIATE ]

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
e("constraint_name"),e("trigger_name"),e("trigger_name"),e("trigger_name"),e("trigger_name"),e("rewrite_rule_name"),e("r\
ewrite_rule_name"),e("rewrite_rule_name"),e("rewrite_rule_name"),e("index_name"),e("new_access_method"),e("new_tablespac\
e"),e("storage_parameter"),e("value"),e("storage_parameter"),e("parent_table"),e("parent_table"),e("type_name"),e("new_o\
wner"),e("index_name"),e("and partition_bound_spec is:"),e("partition_bound_expr"),e("partition_bound_expr"),e("partitio\
n_bound_expr"),e("numeric_literal"),e("numeric_literal"),e("and column_constraint is:"),e("constraint_name"),e("expressi\
on"),e("default_expr"),e("generation_expr"),e("sequence_options"),e("index_parameters"),e("index_parameters"),e("reftabl\
e"),e("refcolumn"),e("referential_action"),e("referential_action"),e("and table_constraint is:"),e("constraint_name"),e(
"expression"),e("column_name"),e("index_parameters"),e("column_name"),e("index_parameters"),e("index_method"),e("exclude\
_element"),e("operator"),e("index_parameters"),e("predicate"),e("column_name"),e("reftable"),e("refcolumn"),e("referenti\
al_action"),e("referential_action"),e("and table_constraint_using_index is:"),e("constraint_name"),e("index_name"),e("in\
dex_parameters in UNIQUE, PRIMARY KEY, and EXCLUDE constraints are:"),e("column_name"),e("storage_parameter"),e("value"),
e("tablespace_name"),e("exclude_element in an EXCLUDE constraint is:"),e("column_name"),e("expression"),e("collation"),e(
"opclass"),e("opclass_parameter"),e("value"),e("referential_action in a FOREIGN KEY/REFERENCES constraint is:"),e("colum\
n_name"),e("column_name"))}function bs(n){l(n,`ALTER TABLESPACE %s RENAME TO %s
ALTER TABLESPACE %s OWNER TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER }
ALTER TABLESPACE %s SET ( %s = %s [, ... ] )
ALTER TABLESPACE %s RESET ( %s [, ... ] )`,e("name"),e("new_name"),e("name"),e("new_owner"),e("name"),e("tablespace_opti\
on"),e("value"),e("name"),e("tablespace_option"))}function hs(n){l(n,`ALTER TEXT SEARCH CONFIGURATION %s
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
new_dictionary"),e("name"),e("token_type"),e("name"),e("new_name"),e("name"),e("new_owner"),e("name"),e("new_schema"))}function Fs(n){
l(n,`ALTER TEXT SEARCH DICTIONARY %s (
    %s [ = %s ] [, ... ]
)
ALTER TEXT SEARCH DICTIONARY %s RENAME TO %s
ALTER TEXT SEARCH DICTIONARY %s OWNER TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER }
ALTER TEXT SEARCH DICTIONARY %s SET SCHEMA %s`,e("name"),e("option"),e("value"),e("name"),e("new_name"),e("name"),e("new\
_owner"),e("name"),e("new_schema"))}function ys(n){l(n,`ALTER TEXT SEARCH PARSER %s RENAME TO %s
ALTER TEXT SEARCH PARSER %s SET SCHEMA %s`,e("name"),e("new_name"),e("name"),e("new_schema"))}function Ms(n){l(n,`ALTER \
TEXT SEARCH TEMPLATE %s RENAME TO %s
ALTER TEXT SEARCH TEMPLATE %s SET SCHEMA %s`,e("name"),e("new_name"),e("name"),e("new_schema"))}function Hs(n){l(n,`ALTE\
R TRIGGER %s ON %s RENAME TO %s
ALTER TRIGGER %s ON %s [ NO ] DEPENDS ON EXTENSION %s`,e("name"),e("table_name"),e("new_name"),e("name"),e("table_name"),
e("extension_name"))}function ws(n){l(n,`ALTER TYPE %s OWNER TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER }
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
"attribute_name"),e("data_type"),e("collation"))}function Gs(n){l(n,`ALTER USER %s [ WITH ] %s [ ... ]

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
on_parameter"),e("role_specification"),e("database_name"),e("where role_specification can be:"),e("role_name"))}function Ws(n){
l(n,`ALTER USER MAPPING FOR { %s | USER | CURRENT_ROLE | CURRENT_USER | SESSION_USER | PUBLIC }
    SERVER %s
    OPTIONS ( [ ADD | SET | DROP ] %s ['%s'] [, ... ] )`,e("user_name"),e("server_name"),e("option"),e("value"))}function qs(n){
l(n,`ALTER VIEW [ IF EXISTS ] %s ALTER [ COLUMN ] %s SET DEFAULT %s
ALTER VIEW [ IF EXISTS ] %s ALTER [ COLUMN ] %s DROP DEFAULT
ALTER VIEW [ IF EXISTS ] %s OWNER TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER }
ALTER VIEW [ IF EXISTS ] %s RENAME [ COLUMN ] %s TO %s
ALTER VIEW [ IF EXISTS ] %s RENAME TO %s
ALTER VIEW [ IF EXISTS ] %s SET SCHEMA %s
ALTER VIEW [ IF EXISTS ] %s SET ( %s [= %s] [, ... ] )
ALTER VIEW [ IF EXISTS ] %s RESET ( %s [, ... ] )`,e("name"),e("column_name"),e("expression"),e("name"),e("column_name"),
e("name"),e("new_owner"),e("name"),e("column_name"),e("new_column_name"),e("name"),e("new_name"),e("name"),e("new_schema"),
e("name"),e("view_option_name"),e("view_option_value"),e("name"),e("view_option_name"))}function vs(n){l(n,`ANALYZE [ ( \
%s [, ...] ) ] [ %s [, ...] ]

%s

    VERBOSE [ %s ]
    SKIP_LOCKED [ %s ]
    BUFFER_USAGE_LIMIT %s

%s

    %s [ ( %s [, ...] ) ]`,e("option"),e("table_and_columns"),e("where option can be one of:"),e("boolean"),e("boolean"),
e("size"),e("and table_and_columns is:"),e("table_name"),e("column_name"))}function Bs(n){l(n,`BEGIN [ WORK | TRANSACTIO\
N ] [ %s [, ...] ]

%s

    ISOLATION LEVEL { SERIALIZABLE | REPEATABLE READ | READ COMMITTED | READ UNCOMMITTED }
    READ WRITE | READ ONLY
    [ NOT ] DEFERRABLE`,e("transaction_mode"),e("where transaction_mode is one of:"))}function Ys(n){l(n,"CALL %s ( [ %s\
 ] [, ...] )",e("name"),e("argument"))}function xs(n){l(n,"CHECKPOINT")}function Vs(n){l(n,"CLOSE { %s | ALL }",e("name"))}
function Xs(n){l(n,`CLUSTER [ ( %s [, ...] ) ] [ %s [ USING %s ] ]

%s

    VERBOSE [ %s ]`,e("option"),e("table_name"),e("index_name"),e("where option can be one of:"),e("boolean"))}function ks(n){
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
"argtype"))}function js(n){l(n,"COMMIT [ WORK | TRANSACTION ] [ AND [ NO ] CHAIN ]")}function Js(n){l(n,"COMMIT PREPARED\
 %s",e("transaction_id"))}function Ks(n){l(n,`COPY %s [ ( %s [, ...] ) ]
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
    ENCODING '%s'
    LOG_VERBOSITY %s`,e("table_name"),e("column_name"),e("filename"),e("command"),e("option"),e("condition"),e("table_na\
me"),e("column_name"),e("query"),e("filename"),e("command"),e("option"),e("where option can be one of:"),e("format_name"),
e("boolean"),e("delimiter_character"),e("null_string"),e("default_string"),e("boolean"),e("quote_character"),e("escape_c\
haracter"),e("column_name"),e("column_name"),e("column_name"),e("error_action"),e("encoding_name"),e("verbosity"))}function Qs(n){
l(n,`CREATE ACCESS METHOD %s
    TYPE %s
    HANDLER %s`,e("name"),e("access_method_type"),e("handler_function"))}function zs(n){l(n,`CREATE [ OR REPLACE ] AGGRE\
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
tate_data_type"),e("mstate_data_size"),e("mffunc"),e("minitial_condition"),e("sort_operator"))}function Zs(n){l(n,`CREAT\
E CAST (%s AS %s)
    WITH FUNCTION %s [ (%s [, ...]) ]
    [ AS ASSIGNMENT | AS IMPLICIT ]

CREATE CAST (%s AS %s)
    WITHOUT FUNCTION
    [ AS ASSIGNMENT | AS IMPLICIT ]

CREATE CAST (%s AS %s)
    WITH INOUT
    [ AS ASSIGNMENT | AS IMPLICIT ]`,e("source_type"),e("target_type"),e("function_name"),e("argument_type"),e("source_t\
ype"),e("target_type"),e("source_type"),e("target_type"))}function $s(n){l(n,`CREATE COLLATION [ IF NOT EXISTS ] %s (
    [ LOCALE = %s, ]
    [ LC_COLLATE = %s, ]
    [ LC_CTYPE = %s, ]
    [ PROVIDER = %s, ]
    [ DETERMINISTIC = %s, ]
    [ RULES = %s, ]
    [ VERSION = %s ]
)
CREATE COLLATION [ IF NOT EXISTS ] %s FROM %s`,e("name"),e("locale"),e("lc_collate"),e("lc_ctype"),e("provider"),e("bool\
ean"),e("rules"),e("version"),e("name"),e("existing_collation"))}function et(n){l(n,`CREATE [ DEFAULT ] CONVERSION %s
    FOR %s TO %s FROM %s`,e("name"),e("source_encoding"),e("dest_encoding"),e("function_name"))}function nt(n){l(n,`CREA\
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
ce_name"),e("allowconn"),e("connlimit"),e("istemplate"),e("oid"))}function at(n){l(n,`CREATE DOMAIN %s [ AS ] %s
    [ COLLATE %s ]
    [ DEFAULT %s ]
    [ %s [ ... ] ]

%s

[ CONSTRAINT %s ]
{ NOT NULL | NULL | CHECK (%s) }`,e("name"),e("data_type"),e("collation"),e("expression"),e("domain_constraint"),e("wher\
e domain_constraint is:"),e("constraint_name"),e("expression"))}function st(n){l(n,`CREATE EVENT TRIGGER %s
    ON %s
    [ WHEN %s IN (%s [, ... ]) [ AND ... ] ]
    EXECUTE { FUNCTION | PROCEDURE } %s()`,e("name"),e("event"),e("filter_variable"),e("filter_value"),e("function_name"))}
function tt(n){l(n,`CREATE EXTENSION [ IF NOT EXISTS ] %s
    [ WITH ] [ SCHEMA %s ]
             [ VERSION %s ]
             [ CASCADE ]`,e("extension_name"),e("schema_name"),e("version"))}function it(n){l(n,`CREATE FOREIGN DATA WRA\
PPER %s
    [ HANDLER %s | NO HANDLER ]
    [ VALIDATOR %s | NO VALIDATOR ]
    [ OPTIONS ( %s '%s' [, ... ] ) ]`,e("name"),e("handler_function"),e("validator_function"),e("option"),e("value"))}function ot(n){
l(n,`CREATE FOREIGN TABLE [ IF NOT EXISTS ] %s ( [
  { %s %s [ OPTIONS ( %s '%s' [, ... ] ) ] [ COLLATE %s ] [ %s [ ... ] ]
    | %s }
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
{ NOT NULL |
  NULL |
  CHECK ( %s ) [ NO INHERIT ] |
  DEFAULT %s |
  GENERATED ALWAYS AS ( %s ) STORED }

%s

[ CONSTRAINT %s ]
CHECK ( %s ) [ NO INHERIT ]

%s

IN ( %s [, ...] ) |
FROM ( { %s | MINVALUE | MAXVALUE } [, ...] )
  TO ( { %s | MINVALUE | MAXVALUE } [, ...] ) |
WITH ( MODULUS %s, REMAINDER %s )`,e("table_name"),e("column_name"),e("data_type"),e("option"),e("value"),e("collation"),
e("column_constraint"),e("table_constraint"),e("parent_table"),e("server_name"),e("option"),e("value"),e("table_name"),e(
"parent_table"),e("column_name"),e("column_constraint"),e("table_constraint"),e("partition_bound_spec"),e("server_name"),
e("option"),e("value"),e("where column_constraint is:"),e("constraint_name"),e("expression"),e("default_expr"),e("genera\
tion_expr"),e("and table_constraint is:"),e("constraint_name"),e("expression"),e("and partition_bound_spec is:"),e("part\
ition_bound_expr"),e("partition_bound_expr"),e("partition_bound_expr"),e("numeric_literal"),e("numeric_literal"))}function Et(n){
l(n,`CREATE [ OR REPLACE ] FUNCTION
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
"value"),e("value"),e("definition"),e("obj_file"),e("link_symbol"),e("sql_body"))}function lt(n){l(n,`CREATE GROUP %s [ \
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
e("role_name"),e("role_name"),e("role_name"),e("role_name"),e("uid"))}function rt(n){l(n,`CREATE [ UNIQUE ] INDEX [ CONC\
URRENTLY ] [ [ IF NOT EXISTS ] %s ] ON [ ONLY ] %s [ USING %s ]
    ( { %s | ( %s ) } [ COLLATE %s ] [ %s [ ( %s = %s [, ... ] ) ] ] [ ASC | DESC ] [ NULLS { FIRST | LAST } ] [, ...] )\

    [ INCLUDE ( %s [, ...] ) ]
    [ NULLS [ NOT ] DISTINCT ]
    [ WITH ( %s [= %s] [, ... ] ) ]
    [ TABLESPACE %s ]
    [ WHERE %s ]`,e("name"),e("table_name"),e("method"),e("column_name"),e("expression"),e("collation"),e("opclass"),e("\
opclass_parameter"),e("value"),e("column_name"),e("storage_parameter"),e("value"),e("tablespace_name"),e("predicate"))}function ct(n){
l(n,`CREATE [ OR REPLACE ] [ TRUSTED ] [ PROCEDURAL ] LANGUAGE %s
    HANDLER %s [ INLINE %s ] [ VALIDATOR %s ]
CREATE [ OR REPLACE ] [ TRUSTED ] [ PROCEDURAL ] LANGUAGE %s`,e("name"),e("call_handler"),e("inline_handler"),e("valfunc\
tion"),e("name"))}function _t(n){l(n,`CREATE MATERIALIZED VIEW [ IF NOT EXISTS ] %s
    [ (%s [, ...] ) ]
    [ USING %s ]
    [ WITH ( %s [= %s] [, ... ] ) ]
    [ TABLESPACE %s ]
    AS %s
    [ WITH [ NO ] DATA ]`,e("table_name"),e("column_name"),e("method"),e("storage_parameter"),e("value"),e("tablespace_n\
ame"),e("query"))}function pt(n){l(n,`CREATE OPERATOR %s (
    {FUNCTION|PROCEDURE} = %s
    [, LEFTARG = %s ] [, RIGHTARG = %s ]
    [, COMMUTATOR = %s ] [, NEGATOR = %s ]
    [, RESTRICT = %s ] [, JOIN = %s ]
    [, HASHES ] [, MERGES ]
)`,e("name"),e("function_name"),e("left_type"),e("right_type"),e("com_op"),e("neg_op"),e("res_proc"),e("join_proc"))}function Tt(n){
l(n,`CREATE OPERATOR CLASS %s [ DEFAULT ] FOR TYPE %s
  USING %s [ FAMILY %s ] AS
  {  OPERATOR %s %s [ ( %s, %s ) ] [ FOR SEARCH | FOR ORDER BY %s ]
   | FUNCTION %s [ ( %s [ , %s ] ) ] %s ( %s [, ...] )
   | STORAGE %s
  } [, ... ]`,e("name"),e("data_type"),e("index_method"),e("family_name"),e("strategy_number"),e("operator_name"),e("op_\
type"),e("op_type"),e("sort_family_name"),e("support_number"),e("op_type"),e("op_type"),e("function_name"),e("argument_t\
ype"),e("storage_type"))}function Rt(n){l(n,"CREATE OPERATOR FAMILY %s USING %s",e("name"),e("index_method"))}function At(n){
l(n,`CREATE POLICY %s ON %s
    [ AS { PERMISSIVE | RESTRICTIVE } ]
    [ FOR { ALL | SELECT | INSERT | UPDATE | DELETE } ]
    [ TO { %s | PUBLIC | CURRENT_ROLE | CURRENT_USER | SESSION_USER } [, ...] ]
    [ USING ( %s ) ]
    [ WITH CHECK ( %s ) ]`,e("name"),e("table_name"),e("role_name"),e("using_expression"),e("check_expression"))}function Nt(n){
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
on_parameter"),e("value"),e("value"),e("definition"),e("obj_file"),e("link_symbol"),e("sql_body"))}function Lt(n){l(n,`C\
REATE PUBLICATION %s
    [ FOR ALL TABLES
      | FOR %s [, ... ] ]
    [ WITH ( %s [= %s] [, ... ] ) ]

%s

    TABLE [ ONLY ] %s [ * ] [ ( %s [, ... ] ) ] [ WHERE ( %s ) ] [, ... ]
    TABLES IN SCHEMA { %s | CURRENT_SCHEMA } [, ... ]`,e("name"),e("publication_object"),e("publication_parameter"),e("v\
alue"),e("where publication_object is one of:"),e("table_name"),e("column_name"),e("expression"),e("schema_name"))}function gt(n){
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
e("role_name"),e("role_name"),e("uid"))}function St(n){l(n,`CREATE [ OR REPLACE ] RULE %s AS ON %s
    TO %s [ WHERE %s ]
    DO [ ALSO | INSTEAD ] { NOTHING | %s | ( %s ; %s ... ) }

%s

    SELECT | INSERT | UPDATE | DELETE`,e("name"),e("event"),e("table_name"),e("condition"),e("command"),e("command"),e("\
command"),e("where event can be one of:"))}function ft(n){l(n,`CREATE SCHEMA %s [ AUTHORIZATION %s ] [ %s [ ... ] ]
CREATE SCHEMA AUTHORIZATION %s [ %s [ ... ] ]
CREATE SCHEMA IF NOT EXISTS %s [ AUTHORIZATION %s ]
CREATE SCHEMA IF NOT EXISTS AUTHORIZATION %s

%s

    %s
  | CURRENT_ROLE
  | CURRENT_USER
  | SESSION_USER`,e("schema_name"),e("role_specification"),e("schema_element"),e("role_specification"),e("schema_element"),
e("schema_name"),e("role_specification"),e("role_specification"),e("where role_specification can be:"),e("user_name"))}function Ot(n){
l(n,`CREATE [ { TEMPORARY | TEMP } | UNLOGGED ] SEQUENCE [ IF NOT EXISTS ] %s
    [ AS %s ]
    [ INCREMENT [ BY ] %s ]
    [ MINVALUE %s | NO MINVALUE ] [ MAXVALUE %s | NO MAXVALUE ]
    [ START [ WITH ] %s ] [ CACHE %s ] [ [ NO ] CYCLE ]
    [ OWNED BY { %s.%s | NONE } ]`,e("name"),e("data_type"),e("increment"),e("minvalue"),e("maxvalue"),e("start"),e("cac\
he"),e("table_name"),e("column_name"))}function mt(n){l(n,`CREATE SERVER [ IF NOT EXISTS ] %s [ TYPE '%s' ] [ VERSION '%\
s' ]
    FOREIGN DATA WRAPPER %s
    [ OPTIONS ( %s '%s' [, ... ] ) ]`,e("server_name"),e("server_type"),e("server_version"),e("fdw_name"),e("option"),e(
"value"))}function ut(n){l(n,`CREATE STATISTICS [ [ IF NOT EXISTS ] %s ]
    ON ( %s )
    FROM %s

CREATE STATISTICS [ [ IF NOT EXISTS ] %s ]
    [ ( %s [, ... ] ) ]
    ON { %s | ( %s ) }, { %s | ( %s ) } [, ...]
    FROM %s`,e("statistics_name"),e("expression"),e("table_name"),e("statistics_name"),e("statistics_kind"),e("column_na\
me"),e("expression"),e("column_name"),e("expression"),e("table_name"))}function dt(n){l(n,`CREATE SUBSCRIPTION %s
    CONNECTION '%s'
    PUBLICATION %s [, ...]
    [ WITH ( %s [= %s] [, ... ] ) ]`,e("subscription_name"),e("conninfo"),e("publication_name"),e("subscription_paramete\
r"),e("value"))}function It(n){l(n,`CREATE [ [ GLOBAL | LOCAL ] { TEMPORARY | TEMP } | UNLOGGED ] TABLE [ IF NOT EXISTS \
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
{ NOT NULL |
  NULL |
  CHECK ( %s ) [ NO INHERIT ] |
  DEFAULT %s |
  GENERATED ALWAYS AS ( %s ) STORED |
  GENERATED { ALWAYS | BY DEFAULT } AS IDENTITY [ ( %s ) ] |
  UNIQUE [ NULLS [ NOT ] DISTINCT ] %s |
  PRIMARY KEY %s |
  REFERENCES %s [ ( %s ) ] [ MATCH FULL | MATCH PARTIAL | MATCH SIMPLE ]
    [ ON DELETE %s ] [ ON UPDATE %s ] }
[ DEFERRABLE | NOT DEFERRABLE ] [ INITIALLY DEFERRED | INITIALLY IMMEDIATE ]

%s

[ CONSTRAINT %s ]
{ CHECK ( %s ) [ NO INHERIT ] |
  UNIQUE [ NULLS [ NOT ] DISTINCT ] ( %s [, ... ] ) %s |
  PRIMARY KEY ( %s [, ... ] ) %s |
  EXCLUDE [ USING %s ] ( %s WITH %s [, ... ] ) %s [ WHERE ( %s ) ] |
  FOREIGN KEY ( %s [, ... ] ) REFERENCES %s [ ( %s [, ... ] ) ]
    [ MATCH FULL | MATCH PARTIAL | MATCH SIMPLE ] [ ON DELETE %s ] [ ON UPDATE %s ] }
[ DEFERRABLE | NOT DEFERRABLE ] [ INITIALLY DEFERRED | INITIALLY IMMEDIATE ]

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
e("column_name"),e("index_parameters"),e("column_name"),e("index_parameters"),e("index_method"),e("exclude_element"),e("\
operator"),e("index_parameters"),e("predicate"),e("column_name"),e("reftable"),e("refcolumn"),e("referential_action"),e(
"referential_action"),e("and like_option is:"),e("and partition_bound_spec is:"),e("partition_bound_expr"),e("partition_\
bound_expr"),e("partition_bound_expr"),e("numeric_literal"),e("numeric_literal"),e("index_parameters in UNIQUE, PRIMARY \
KEY, and EXCLUDE constraints are:"),e("column_name"),e("storage_parameter"),e("value"),e("tablespace_name"),e("exclude_e\
lement in an EXCLUDE constraint is:"),e("column_name"),e("expression"),e("collation"),e("opclass"),e("opclass_parameter"),
e("value"),e("referential_action in a FOREIGN KEY/REFERENCES constraint is:"),e("column_name"),e("column_name"))}function Ct(n){
l(n,`CREATE [ [ GLOBAL | LOCAL ] { TEMPORARY | TEMP } | UNLOGGED ] TABLE [ IF NOT EXISTS ] %s
    [ (%s [, ...] ) ]
    [ USING %s ]
    [ WITH ( %s [= %s] [, ... ] ) | WITHOUT OIDS ]
    [ ON COMMIT { PRESERVE ROWS | DELETE ROWS | DROP } ]
    [ TABLESPACE %s ]
    AS %s
    [ WITH [ NO ] DATA ]`,e("table_name"),e("column_name"),e("method"),e("storage_parameter"),e("value"),e("tablespace_n\
ame"),e("query"))}function Dt(n){l(n,`CREATE TABLESPACE %s
    [ OWNER { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER } ]
    LOCATION '%s'
    [ WITH ( %s = %s [, ... ] ) ]`,e("tablespace_name"),e("new_owner"),e("directory"),e("tablespace_option"),e("value"))}
function Ut(n){l(n,`CREATE TEXT SEARCH CONFIGURATION %s (
    PARSER = %s |
    COPY = %s
)`,e("name"),e("parser_name"),e("source_config"))}function Pt(n){l(n,`CREATE TEXT SEARCH DICTIONARY %s (
    TEMPLATE = %s
    [, %s = %s [, ... ]]
)`,e("name"),e("template"),e("option"),e("value"))}function bt(n){l(n,`CREATE TEXT SEARCH PARSER %s (
    START = %s ,
    GETTOKEN = %s ,
    END = %s ,
    LEXTYPES = %s
    [, HEADLINE = %s ]
)`,e("name"),e("start_function"),e("gettoken_function"),e("end_function"),e("lextypes_function"),e("headline_function"))}
function ht(n){l(n,`CREATE TEXT SEARCH TEMPLATE %s (
    [ INIT = %s , ]
    LEXIZE = %s
)`,e("name"),e("init_function"),e("lexize_function"))}function Ft(n){l(n,`CREATE [ OR REPLACE ] TRANSFORM FOR %s LANGUAG\
E %s (
    FROM SQL WITH FUNCTION %s [ (%s [, ...]) ],
    TO SQL WITH FUNCTION %s [ (%s [, ...]) ]
);`,e("type_name"),e("lang_name"),e("from_sql_function_name"),e("argument_type"),e("to_sql_function_name"),e("argument_t\
ype"))}function yt(n){l(n,`CREATE [ OR REPLACE ] [ CONSTRAINT ] TRIGGER %s { BEFORE | AFTER | INSTEAD OF } { %s [ OR ...\
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
e("function_name"),e("arguments"),e("where event can be one of:"),e("column_name"))}function Mt(n){l(n,`CREATE TYPE %s A\
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
e"))}function Ht(n){l(n,`CREATE USER %s [ [ WITH ] %s [ ... ] ]

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
e("role_name"),e("role_name"),e("role_name"),e("role_name"),e("uid"))}function wt(n){l(n,`CREATE USER MAPPING [ IF NOT E\
XISTS ] FOR { %s | USER | CURRENT_ROLE | CURRENT_USER | PUBLIC }
    SERVER %s
    [ OPTIONS ( %s '%s' [ , ... ] ) ]`,e("user_name"),e("server_name"),e("option"),e("value"))}function Gt(n){l(n,`CREAT\
E [ OR REPLACE ] [ TEMP | TEMPORARY ] [ RECURSIVE ] VIEW %s [ ( %s [, ...] ) ]
    [ WITH ( %s [= %s] [, ... ] ) ]
    AS %s
    [ WITH [ CASCADED | LOCAL ] CHECK OPTION ]`,e("name"),e("column_name"),e("view_option_name"),e("view_option_value"),
e("query"))}function Wt(n){l(n,"DEALLOCATE [ PREPARE ] { %s | ALL }",e("name"))}function qt(n){l(n,`DECLARE %s [ BINARY \
] [ ASENSITIVE | INSENSITIVE ] [ [ NO ] SCROLL ]
    CURSOR [ { WITH | WITHOUT } HOLD ] FOR %s`,e("name"),e("query"))}function vt(n){l(n,`[ WITH [ RECURSIVE ] %s [, ...]\
 ]
DELETE FROM [ ONLY ] %s [ * ] [ [ AS ] %s ]
    [ USING %s [, ...] ]
    [ WHERE %s | WHERE CURRENT OF %s ]
    [ RETURNING { * | %s [ [ AS ] %s ] } [, ...] ]`,e("with_query"),e("table_name"),e("alias"),e("from_item"),e("conditi\
on"),e("cursor_name"),e("output_expression"),e("output_name"))}function Bt(n){l(n,"DISCARD { ALL | PLANS | SEQUENCES | T\
EMPORARY | TEMP }")}function Yt(n){l(n,"DO [ LANGUAGE %s ] %s",e("lang_name"),e("code"))}function xt(n){l(n,"DROP ACCESS\
 METHOD [ IF EXISTS ] %s [ CASCADE | RESTRICT ]",e("name"))}function Vt(n){l(n,`DROP AGGREGATE [ IF EXISTS ] %s ( %s ) [\
, ...] [ CASCADE | RESTRICT ]

%s

* |
[ %s ] [ %s ] %s [ , ... ] |
[ [ %s ] [ %s ] %s [ , ... ] ] ORDER BY [ %s ] [ %s ] %s [ , ... ]`,e("name"),e("aggregate_signature"),e("where aggregat\
e_signature is:"),e("argmode"),e("argname"),e("argtype"),e("argmode"),e("argname"),e("argtype"),e("argmode"),e("argname"),
e("argtype"))}function Xt(n){l(n,"DROP CAST [ IF EXISTS ] (%s AS %s) [ CASCADE | RESTRICT ]",e("source_type"),e("target_\
type"))}function kt(n){l(n,"DROP COLLATION [ IF EXISTS ] %s [ CASCADE | RESTRICT ]",e("name"))}function jt(n){l(n,"DROP \
CONVERSION [ IF EXISTS ] %s [ CASCADE | RESTRICT ]",e("name"))}function Jt(n){l(n,`DROP DATABASE [ IF EXISTS ] %s [ [ WI\
TH ] ( %s [, ...] ) ]

%s

    FORCE`,e("name"),e("option"),e("where option can be:"))}function Kt(n){l(n,"DROP DOMAIN [ IF EXISTS ] %s [, ...] [ C\
ASCADE | RESTRICT ]",e("name"))}function Qt(n){l(n,"DROP EVENT TRIGGER [ IF EXISTS ] %s [ CASCADE | RESTRICT ]",e("name"))}
function zt(n){l(n,"DROP EXTENSION [ IF EXISTS ] %s [, ...] [ CASCADE | RESTRICT ]",e("name"))}function Zt(n){l(n,"DROP \
FOREIGN DATA WRAPPER [ IF EXISTS ] %s [, ...] [ CASCADE | RESTRICT ]",e("name"))}function $t(n){l(n,"DROP FOREIGN TABLE \
[ IF EXISTS ] %s [, ...] [ CASCADE | RESTRICT ]",e("name"))}function ei(n){l(n,`DROP FUNCTION [ IF EXISTS ] %s [ ( [ [ %\
s ] [ %s ] %s [, ...] ] ) ] [, ...]
    [ CASCADE | RESTRICT ]`,e("name"),e("argmode"),e("argname"),e("argtype"))}function ni(n){l(n,"DROP GROUP [ IF EXISTS\
 ] %s [, ...]",e("name"))}function ai(n){l(n,"DROP INDEX [ CONCURRENTLY ] [ IF EXISTS ] %s [, ...] [ CASCADE | RESTRICT \
]",e("name"))}function si(n){l(n,"DROP [ PROCEDURAL ] LANGUAGE [ IF EXISTS ] %s [ CASCADE | RESTRICT ]",e("name"))}function ti(n){
l(n,"DROP MATERIALIZED VIEW [ IF EXISTS ] %s [, ...] [ CASCADE | RESTRICT ]",e("name"))}function ii(n){l(n,"DROP OPERATO\
R [ IF EXISTS ] %s ( { %s | NONE } , %s ) [, ...] [ CASCADE | RESTRICT ]",e("name"),e("left_type"),e("right_type"))}function oi(n){
l(n,"DROP OPERATOR CLASS [ IF EXISTS ] %s USING %s [ CASCADE | RESTRICT ]",e("name"),e("index_method"))}function Ei(n){l(
n,"DROP OPERATOR FAMILY [ IF EXISTS ] %s USING %s [ CASCADE | RESTRICT ]",e("name"),e("index_method"))}function li(n){l(
n,"DROP OWNED BY { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER } [, ...] [ CASCADE | RESTRICT ]",e("name"))}function ri(n){
l(n,"DROP POLICY [ IF EXISTS ] %s ON %s [ CASCADE | RESTRICT ]",e("name"),e("table_name"))}function ci(n){l(n,`DROP PROC\
EDURE [ IF EXISTS ] %s [ ( [ [ %s ] [ %s ] %s [, ...] ] ) ] [, ...]
    [ CASCADE | RESTRICT ]`,e("name"),e("argmode"),e("argname"),e("argtype"))}function _i(n){l(n,"DROP PUBLICATION [ IF \
EXISTS ] %s [, ...] [ CASCADE | RESTRICT ]",e("name"))}function pi(n){l(n,"DROP ROLE [ IF EXISTS ] %s [, ...]",e("name"))}
function Ti(n){l(n,`DROP ROUTINE [ IF EXISTS ] %s [ ( [ [ %s ] [ %s ] %s [, ...] ] ) ] [, ...]
    [ CASCADE | RESTRICT ]`,e("name"),e("argmode"),e("argname"),e("argtype"))}function Ri(n){l(n,"DROP RULE [ IF EXISTS \
] %s ON %s [ CASCADE | RESTRICT ]",e("name"),e("table_name"))}function Ai(n){l(n,"DROP SCHEMA [ IF EXISTS ] %s [, ...] [\
 CASCADE | RESTRICT ]",e("name"))}function Ni(n){l(n,"DROP SEQUENCE [ IF EXISTS ] %s [, ...] [ CASCADE | RESTRICT ]",e("\
name"))}function Li(n){l(n,"DROP SERVER [ IF EXISTS ] %s [, ...] [ CASCADE | RESTRICT ]",e("name"))}function gi(n){l(n,"\
DROP STATISTICS [ IF EXISTS ] %s [, ...] [ CASCADE | RESTRICT ]",e("name"))}function Si(n){l(n,"DROP SUBSCRIPTION [ IF E\
XISTS ] %s [ CASCADE | RESTRICT ]",e("name"))}function fi(n){l(n,"DROP TABLE [ IF EXISTS ] %s [, ...] [ CASCADE | RESTRI\
CT ]",e("name"))}function Oi(n){l(n,"DROP TABLESPACE [ IF EXISTS ] %s",e("name"))}function mi(n){l(n,"DROP TEXT SEARCH C\
ONFIGURATION [ IF EXISTS ] %s [ CASCADE | RESTRICT ]",e("name"))}function ui(n){l(n,"DROP TEXT SEARCH DICTIONARY [ IF EX\
ISTS ] %s [ CASCADE | RESTRICT ]",e("name"))}function di(n){l(n,"DROP TEXT SEARCH PARSER [ IF EXISTS ] %s [ CASCADE | RE\
STRICT ]",e("name"))}function Ii(n){l(n,"DROP TEXT SEARCH TEMPLATE [ IF EXISTS ] %s [ CASCADE | RESTRICT ]",e("name"))}function Ci(n){
l(n,"DROP TRANSFORM [ IF EXISTS ] FOR %s LANGUAGE %s [ CASCADE | RESTRICT ]",e("type_name"),e("lang_name"))}function Di(n){
l(n,"DROP TRIGGER [ IF EXISTS ] %s ON %s [ CASCADE | RESTRICT ]",e("name"),e("table_name"))}function Ui(n){l(n,"DROP TYP\
E [ IF EXISTS ] %s [, ...] [ CASCADE | RESTRICT ]",e("name"))}function Pi(n){l(n,"DROP USER [ IF EXISTS ] %s [, ...]",e(
"name"))}function bi(n){l(n,"DROP USER MAPPING [ IF EXISTS ] FOR { %s | USER | CURRENT_ROLE | CURRENT_USER | PUBLIC } SE\
RVER %s",e("user_name"),e("server_name"))}function hi(n){l(n,"DROP VIEW [ IF EXISTS ] %s [, ...] [ CASCADE | RESTRICT ]",
e("name"))}function Fi(n){l(n,"END [ WORK | TRANSACTION ] [ AND [ NO ] CHAIN ]")}function yi(n){l(n,"EXECUTE %s [ ( %s [\
, ...] ) ]",e("name"),e("parameter"))}function Mi(n){l(n,`EXPLAIN [ ( %s [, ...] ) ] %s

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
lean"),e("boolean"),e("boolean"),e("boolean"),e("boolean"),e("boolean"),e("boolean"),e("boolean"),e("boolean"))}function Hi(n){
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
"count"),e("count"))}function wi(n){l(n,`GRANT { { SELECT | INSERT | UPDATE | DELETE | TRUNCATE | REFERENCES | TRIGGER |\
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
_specification"),e("role_specification"),e("where role_specification can be:"),e("role_name"))}function Gi(n){l(n,`IMPOR\
T FOREIGN SCHEMA %s
    [ { LIMIT TO | EXCEPT } ( %s [, ...] ) ]
    FROM SERVER %s
    INTO %s
    [ OPTIONS ( %s '%s' [, ... ] ) ]`,e("remote_schema"),e("table_name"),e("server_name"),e("local_schema"),e("option"),
e("value"))}function Wi(n){l(n,`[ WITH [ RECURSIVE ] %s [, ...] ]
INSERT INTO %s [ AS %s ] [ ( %s [, ...] ) ]
    [ OVERRIDING { SYSTEM | USER } VALUE ]
    { DEFAULT VALUES | VALUES ( { %s | DEFAULT } [, ...] ) [, ...] | %s }
    [ ON CONFLICT [ %s ] %s ]
    [ RETURNING { * | %s [ [ AS ] %s ] } [, ...] ]

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
nflict_target"),e("conflict_action"),e("output_expression"),e("output_name"),e("where conflict_target can be one of:"),e(
"index_column_name"),e("index_expression"),e("collation"),e("opclass"),e("index_predicate"),e("constraint_name"),e("and \
conflict_action is one of:"),e("column_name"),e("expression"),e("column_name"),e("expression"),e("column_name"),e("sub-S\
ELECT"),e("condition"))}function qi(n){l(n,"LISTEN %s",e("channel"))}function vi(n){l(n,"LOAD '%s'",e("filename"))}function Bi(n){
l(n,`LOCK [ TABLE ] [ ONLY ] %s [ * ] [, ...] [ IN %s MODE ] [ NOWAIT ]

%s

    ACCESS SHARE | ROW SHARE | ROW EXCLUSIVE | SHARE UPDATE EXCLUSIVE
    | SHARE | SHARE ROW EXCLUSIVE | EXCLUSIVE | ACCESS EXCLUSIVE`,e("name"),e("lockmode"),e("where lockmode is one of:"))}
function Yi(n){l(n,`[ WITH %s [, ...] ]
MERGE INTO [ ONLY ] %s [ * ] [ [ AS ] %s ]
USING %s ON %s
%s [...]
[ RETURNING { * | %s [ [ AS ] %s ] } [, ...] ]

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

DELETE`,e("with_query"),e("target_table_name"),e("target_alias"),e("data_source"),e("join_condition"),e("when_clause"),e(
"output_expression"),e("output_name"),e("where data_source is:"),e("source_table_name"),e("source_query"),e("source_alia\
s"),e("and when_clause is:"),e("condition"),e("merge_update"),e("merge_delete"),e("condition"),e("merge_update"),e("merg\
e_delete"),e("condition"),e("merge_insert"),e("and merge_insert is:"),e("column_name"),e("expression"),e("and merge_upda\
te is:"),e("column_name"),e("expression"),e("column_name"),e("expression"),e("column_name"),e("sub-SELECT"),e("and merge\
_delete is:"))}function xi(n){l(n,`MOVE [ %s ] [ FROM | IN ] %s

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
"count"),e("count"))}function Vi(n){l(n,"NOTIFY %s [ , %s ]",e("channel"),e("payload"))}function Xi(n){l(n,"PREPARE %s [\
 ( %s [, ...] ) ] AS %s",e("name"),e("data_type"),e("statement"))}function ki(n){l(n,"PREPARE TRANSACTION %s",e("transac\
tion_id"))}function ji(n){l(n,`REASSIGN OWNED BY { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER } [, ...]
               TO { %s | CURRENT_ROLE | CURRENT_USER | SESSION_USER }`,e("old_role"),e("new_role"))}function Ji(n){l(n,`\
REFRESH MATERIALIZED VIEW [ CONCURRENTLY ] %s
    [ WITH [ NO ] DATA ]`,e("name"))}function Ki(n){l(n,`REINDEX [ ( %s [, ...] ) ] { INDEX | TABLE | SCHEMA } [ CONCURR\
ENTLY ] %s
REINDEX [ ( %s [, ...] ) ] { DATABASE | SYSTEM } [ CONCURRENTLY ] [ %s ]

%s

    CONCURRENTLY [ %s ]
    TABLESPACE %s
    VERBOSE [ %s ]`,e("option"),e("name"),e("option"),e("name"),e("where option can be one of:"),e("boolean"),e("new_tab\
lespace"),e("boolean"))}function Qi(n){l(n,"RELEASE [ SAVEPOINT ] %s",e("savepoint_name"))}function zi(n){l(n,`RESET %s
RESET ALL`,e("configuration_parameter"))}function Zi(n){l(n,`REVOKE [ GRANT OPTION FOR ]
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
e_specification"),e("role_specification"),e("where role_specification can be:"),e("role_name"))}function $i(n){l(n,"ROLL\
BACK [ WORK | TRANSACTION ] [ AND [ NO ] CHAIN ]")}function eo(n){l(n,"ROLLBACK PREPARED %s",e("transaction_id"))}function no(n){
l(n,"ROLLBACK [ WORK | TRANSACTION ] TO [ SAVEPOINT ] %s",e("savepoint_name"))}function ao(n){l(n,"SAVEPOINT %s",e("save\
point_name"))}function so(n){l(n,`SECURITY LABEL [ FOR %s ] ON
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
gname"),e("argtype"),e("argmode"),e("argname"),e("argtype"))}function to(n){l(n,`[ WITH [ RECURSIVE ] %s [, ...] ]
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
name"),e("cycle_mark_value"),e("cycle_mark_default"),e("cycle_path_col_name"),e("table_name"))}function io(n){l(n,`[ WIT\
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
ition"),e("select"),e("expression"),e("operator"),e("count"),e("start"),e("count"),e("table_name"))}function oo(n){l(n,`\
SET [ SESSION | LOCAL ] %s { TO | = } { %s | '%s' | DEFAULT }
SET [ SESSION | LOCAL ] TIME ZONE { %s | '%s' | LOCAL | DEFAULT }`,e("configuration_parameter"),e("value"),e("value"),e(
"value"),e("value"))}function Eo(n){l(n,"SET CONSTRAINTS { ALL | %s [, ...] } { DEFERRED | IMMEDIATE }",e("name"))}function lo(n){
l(n,`SET [ SESSION | LOCAL ] ROLE %s
SET [ SESSION | LOCAL ] ROLE NONE
RESET ROLE`,e("role_name"))}function ro(n){l(n,`SET [ SESSION | LOCAL ] SESSION AUTHORIZATION %s
SET [ SESSION | LOCAL ] SESSION AUTHORIZATION DEFAULT
RESET SESSION AUTHORIZATION`,e("user_name"))}function co(n){l(n,`SET TRANSACTION %s [, ...]
SET TRANSACTION SNAPSHOT %s
SET SESSION CHARACTERISTICS AS TRANSACTION %s [, ...]

%s

    ISOLATION LEVEL { SERIALIZABLE | REPEATABLE READ | READ COMMITTED | READ UNCOMMITTED }
    READ WRITE | READ ONLY
    [ NOT ] DEFERRABLE`,e("transaction_mode"),e("snapshot_id"),e("transaction_mode"),e("where transaction_mode is one of\
:"))}function _o(n){l(n,`SHOW %s
SHOW ALL`,e("name"))}function po(n){l(n,`START TRANSACTION [ %s [, ...] ]

%s

    ISOLATION LEVEL { SERIALIZABLE | REPEATABLE READ | READ COMMITTED | READ UNCOMMITTED }
    READ WRITE | READ ONLY
    [ NOT ] DEFERRABLE`,e("transaction_mode"),e("where transaction_mode is one of:"))}function To(n){l(n,`[ WITH [ RECUR\
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
name"),e("cycle_mark_value"),e("cycle_mark_default"),e("cycle_path_col_name"),e("table_name"))}function Ro(n){l(n,`TRUNC\
ATE [ TABLE ] [ ONLY ] %s [ * ] [, ... ]
    [ RESTART IDENTITY | CONTINUE IDENTITY ] [ CASCADE | RESTRICT ]`,e("name"))}function Ao(n){l(n,"UNLISTEN { %s | * }",
e("channel"))}function No(n){l(n,`[ WITH [ RECURSIVE ] %s [, ...] ]
UPDATE [ ONLY ] %s [ * ] [ [ AS ] %s ]
    SET { %s = { %s | DEFAULT } |
          ( %s [, ...] ) = [ ROW ] ( { %s | DEFAULT } [, ...] ) |
          ( %s [, ...] ) = ( %s )
        } [, ...]
    [ FROM %s [, ...] ]
    [ WHERE %s | WHERE CURRENT OF %s ]
    [ RETURNING { * | %s [ [ AS ] %s ] } [, ...] ]`,e("with_query"),e("table_name"),e("alias"),e("column_name"),e("expre\
ssion"),e("column_name"),e("expression"),e("column_name"),e("sub-SELECT"),e("from_item"),e("condition"),e("cursor_name"),
e("output_expression"),e("output_name"))}function Lo(n){l(n,`VACUUM [ ( %s [, ...] ) ] [ %s [, ...] ]

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

    %s [ ( %s [, ...] ) ]`,e("option"),e("table_and_columns"),e("where option can be one of:"),e("boolean"),e("boolean"),
e("boolean"),e("boolean"),e("boolean"),e("boolean"),e("boolean"),e("boolean"),e("boolean"),e("integer"),e("boolean"),e("\
boolean"),e("size"),e("and table_and_columns is:"),e("table_name"),e("column_name"))}function go(n){l(n,`VALUES ( %s [, \
...] ) [, ...]
    [ ORDER BY %s [ ASC | DESC | USING %s ] [, ...] ]
    [ LIMIT { %s | ALL } ]
    [ OFFSET %s [ ROW | ROWS ] ]
    [ FETCH { FIRST | NEXT } [ %s ] { ROW | ROWS } ONLY ]`,e("expression"),e("sort_expression"),e("operator"),e("count"),
e("start"),e("count"))}function So(n){l(n,`[ WITH [ RECURSIVE ] %s [, ...] ]
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
