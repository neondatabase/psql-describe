var fn="19.0";var dn=`Help
  \\? [commands]          show help on backslash commands
  \\h [NAME]              help on syntax of SQL commands, * for all commands

Informational
  (options: S = show system objects, x = expanded mode, + = additional detail)
  \\d[Sx+]                list tables, views, and sequences
  \\d[Sx+]  NAME          describe table, view, sequence, or index
                         (x applies only to sequences)
  \\da[Sx]  [PATTERN]     list aggregates
  \\dA[x+]  [PATTERN]     list access methods
  \\dAc[x+] [AMPTRN [TYPEPTRN]]  list operator classes
  \\dAf[x+] [AMPTRN [TYPEPTRN]]  list operator families
  \\dAo[x+] [AMPTRN [OPFPTRN]]   list operators of operator families
  \\dAp[x+] [AMPTRN [OPFPTRN]]   list support functions of operator families
  \\db[x+]  [PATTERN]     list tablespaces
  \\dc[Sx+] [PATTERN]     list conversions
  \\dconfig[x+] [PATTERN] list configuration parameters
  \\dC[x+]  [PATTERN]     list casts
  \\dd[Sx]  [PATTERN]     show object descriptions not displayed elsewhere
  \\dD[Sx+] [PATTERN]     list domains
  \\ddp[x]  [PATTERN]     list default privileges
  \\dE[Sx+] [PATTERN]     list foreign tables
  \\des[x+] [PATTERN]     list foreign servers
  \\det[x+] [PATTERN]     list foreign tables
  \\deu[x+] [PATTERN]     list user mappings
  \\dew[x+] [PATTERN]     list foreign-data wrappers
  \\df[anptw][Sx+] [FUNCPTRN [TYPEPTRN ...]]
                         list [only agg/normal/procedure/trigger/window] functions
  \\dF[x+]  [PATTERN]     list text search configurations
  \\dFd[x+] [PATTERN]     list text search dictionaries
  \\dFp[x+] [PATTERN]     list text search parsers
  \\dFt[x+] [PATTERN]     list text search templates
  \\dg[Sx+] [PATTERN]     list roles
  \\di[Sx+] [PATTERN]     list indexes
  \\dl[x+]                list large objects, same as \\lo_list
  \\dL[Sx+] [PATTERN]     list procedural languages
  \\dm[Sx+] [PATTERN]     list materialized views
  \\dn[Sx+] [PATTERN]     list schemas
  \\do[Sx+] [OPPTRN [TYPEPTRN [TYPEPTRN]]]
                         list operators
  \\dO[Sx+] [PATTERN]     list collations
  \\dp[Sx]  [PATTERN]     list table, view, and sequence access privileges
  \\dP[itnx+] [PATTERN]   list [only index/table] partitioned relations [n=nested]
  \\drds[x] [ROLEPTRN [DBPTRN]]
                         list per-database role settings
  \\drg[Sx] [PATTERN]     list role grants
  \\dRp[x+] [PATTERN]     list replication publications
  \\dRs[x+] [PATTERN]     list replication subscriptions
  \\ds[Sx+] [PATTERN]     list sequences
  \\dt[Sx+] [PATTERN]     list tables
  \\dT[Sx+] [PATTERN]     list data types
  \\du[Sx+] [PATTERN]     list roles
  \\dv[Sx+] [PATTERN]     list views
  \\dx[x+]  [PATTERN]     list extensions
  \\dX[x+]  [PATTERN]     list extended statistics
  \\dy[x+]  [PATTERN]     list event triggers
  \\l[x+]   [PATTERN]     list databases
  \\sf[+]   FUNCNAME      show a function's definition
  \\sv[+]   VIEWNAME      show a view's definition
  \\z[Sx]   [PATTERN]     same as \\dp

Large Objects
  \\lo_list[x+]           list large objects

`;function hn(f){return typeof f=="string"?f:Nn(f)}function Yn(f){return typeof f=="string"?`<p>${Ne(f,!0)}</p>`:Ln(f)}function Kn(f,O,T,V,{
echoHidden:F=!1,serverVersion:G=null,standardConformingStrings:M=!0,docsURLTemplate:q=j=>`https://www.postgresql.org/doc\
s/${Me(fn,"devel")?"devel":"19"}/${j}.html`,multipleCommands:re=!1}={}){let j=!1,Z,de=new Promise(Ee=>Z=()=>{j=!0,V=()=>{},
Ee(null)});function B(){if(j)throw new Error("cancelled")}let _e=null;function Q(){_e!==null&&V(_e.replace(/\n+$/,"")),_e=
null}function z(Ee){Q(),V(Ee)}function Le(Ee){_e=(_e??"")+Ee}async function te(){let Ee=f.trimStart();if(Ee[0]!=="\\")return{
success:!0,remainder:Ee,commands:0};let ge=[Ee.slice(1),0];async function Rt(n,s){let t;try{({helpIndex:t}=await import("./sql-help.js"))}catch(e){
throw new Error("could not load the SQL help, perhaps because of a network problem: please try again",{cause:e})}let a=(n??
"").trim().toUpperCase().replace(/\s+/g," ");if(a===""){z(`Available help:
`+t.map(e=>e[0]).join(`
`));return}let i=a==="*"?t:t.filter(e=>e[0]===a);if(i.length===0&&(i=t.filter(e=>e[0].startsWith(a))),i.length===0){let e=a.
split(" ");for(let r=e.length;r>0;r--){let d=e.slice(0,r).join(" ");if(i=t.filter(g=>g[0].startsWith(d)),i.length>0)break}}
if(i.length===0){z(`No help available for "${n.trim()}".
Try \\h with no arguments to see available help.`);return}for(let e of i)z(`Command:     ${e[0]}
Description: ${e[1]}
Syntax:
${e[3]}

URL: ${q(e[2])}`)}let Ce=n=>Ot(dn,ye),De=n=>()=>(K("\\%s is not supported",n),!1),Nt=De("? options"),Pe=De("? variables"),
qe=De("lo_export"),lt=De("lo_import"),ne=De("lo_unlink"),Wn=ue,W=async(n,s=!1)=>{B(),F&&!s&&z(`/**** INTERNAL QUERY ****\
/
${n}
/************************/`);let t=await T(n);return B(),t};async function ut(n,s){B();try{return{...await T(s),status:2}}catch(t){
return{status:7,errorFields:{S:"ERROR",M:t.message}}}finally{B()}}let Lt=n=>n.status,Dt=(n,s)=>n.errorFields?.[s]??null,
Jt=()=>M,ye={write:Le},Ot=(n,s)=>s.write(n),Ge=(n,s,...t)=>n.write(oe(s,...t)),jt=(n,...s)=>Ge(ye,n,...s),bn=ue,Tn=ue,Bt=(n,s)=>ye,
K=(n,...s)=>Le(oe(n,...s)+`
`),mt=K,Qt=K,St=K,Ut=n=>!0,zt=ue,yn=ue;function pe(n,s,t,a){if(s!==0&&s!==4)throw new Error(`scan type ${s} not implemen\
ted`);let[i]=n,e=/[ \t\n\r\f\v]/,r=n[1],d="",g=0,N=0,E,u=()=>(K("unterminated quoted string"),n[1]=i.length,null);for(;e.
test(i[r]??"");)r++;if(s===4)d=i.slice(r),r=i.length,a&&(d=d.replace(/[; \t\n\r\f\v]+$/,""));else{for(;;){let A=i.slice(
r);if(A===""||e.test(A[0])||A[0]==="\\")break;if(A[0]==="'"){g="'",N=0,r++;let R=[],w=S=>{R.length>0&&(d+=new TextDecoder().
decode(new Uint8Array(R)),R=[]),d+=S};for(;;){let S=i.slice(r);if(S==="")return u();if(S.startsWith("''"))w("'"),r+=2;else if(S[0]===
"'"){w(""),r++;break}else(E=S.match(/^\\[ntbrf]/))?(w({n:`
`,t:"	",b:"\b",r:"\r",f:"\f"}[E[0][1]]),r+=2):(E=S.match(/^\\([0-7]{1,3})/))?(R.push(parseInt(E[1],8)&255),r+=E[0].length):
(E=S.match(/^\\x([0-9A-Fa-f]{1,2})/))?(R.push(parseInt(E[1],16)),r+=E[0].length):(E=S.match(/^\\(.)/))?(w(E[1]),r+=2):(w(
S[0]),r++)}}else if(A[0]==='"'){let R=i.indexOf('"',r+1);if(R===-1)return u();g='"',N=0,d+=i.slice(r,R+1),r=R+1}else(E=A.
match(/^:(?:[A-Za-z\u0080-\uFFFF_0-9]+|'[A-Za-z\u0080-\uFFFF_0-9]+'|"[A-Za-z\u0080-\uFFFF_0-9]+")/))?(d+=E[0],r+=E[0].length,
N=0):(E=A.match(/^:\{\?[A-Za-z\u0080-\uFFFF_0-9]+\}/))?(d+="FALSE",r+=E[0].length):(d+=A[0],r++,N++)}if(a)for(;N-- >0&&d.
endsWith(";");)d=d.slice(0,-1)}return d=d.split("\0")[0],n[1]=r,t!=null&&(t.value=g),d===""&&g===0?null:d}let $t=!1;async function Xt(n,s,t,a){
let i,e,r;if(Se(n!=null),Se(s!=null),e=Mt(n),e==null?i=5:$t&&D(e,"unrestrict")!=0?(K("backslash commands are restricted;\
 only \\unrestrict is allowed"),i=5):i=await Zt(e,n,s,t,a),i==0&&(K("invalid command \\%s",e),o.cur_cmd_interactive&&Qt(
"Try \\? for help."),i=5),i!=5){let d=Ut(s);for(zt(s,3);(r=pe(n,0,null,!1))!=null;)d&&St('\\%s: extra argument "%s" ignor\
ed',e,r)}else for(;(r=pe(n,4,null,!1))!=null;);return An(n),o.queryFout,i}async function Zt(n,s,t,a,i){let e,r=Ut(t);return o.
cur_cmd_interactive&&!r&&!la(n)&&St("\\%s command ignored; use \\endif or Ctrl-C to exit current \\if block",n),n[0]=="d"?
e=await ea(s,r,n):D(n,"h")==0||D(n,"help")==0?e=await ta(s,r):D(n,"l")==0||D(n,"list")==0||D(n,"lx")==0||D(n,"listx")==0||
D(n,"l+")==0||D(n,"list+")==0||D(n,"lx+")==0||D(n,"listx+")==0||D(n,"l+x")==0||D(n,"list+x")==0?e=await aa(s,r,n):Ae(n,"\
lo_",3)==0?e=await na(s,r,n):D(n,"sf")==0||D(n,"sf+")==0?e=await Wt(s,r,n,!0):D(n,"sv")==0||D(n,"sv+")==0?e=await Wt(s,r,
n,!1):D(n,"z")==0||D(n,"zS")==0||D(n,"zx")==0||D(n,"zSx")==0||D(n,"zxS")==0?e=await sa(s,r,n):D(n,"?")==0?e=ia(s,r):e=0,
e==1&&oa(a,i),e}async function ea(n,s,t){let a=2,i=!0;if(s){let e,r,d,g;switch(e=pe(n,0,null,!0),r=J(t,"+")!=null,d=J(t,
"S")!=null,g=o.popt.topt.expanded,t[1]!=null&&J(t.slice(2),"x")!=null&&(o.popt.topt.expanded=1),t[1]){case void 0:case"+":case"\
S":e!=null?i=await Oa(e,r,d):i=await Kt("tvmsE",null,r,d);break;case"A":{let N=null;switch(e!=null&&t[2]!=null&&t[2]!="+"&&
t[2]!="x"&&(N=pe(n,0,null,!0)),t[2]){case void 0:case"+":case"x":i=await ga(e,r);break;case"c":i=await Za(e,N,r);break;case"\
f":i=await en(e,N,r);break;case"o":i=await tn(e,N,r);break;case"p":i=await an(e,N,r);break;default:a=0;break}}break;case"\
a":i=await _a(e,r,d);break;case"b":i=await fa(e,r);break;case"c":Ae(t,"dconfig",7)==0?i=await ya(e,r,d):i=await Ta(e,r,d);
break;case"C":i=await Ka(e,r);break;case"d":Ae(t,"ddp",3)==0?i=await La(e):i=await Da(e,d);break;case"D":i=await ba(e,r,
d);break;case"f":switch(t[2]){case void 0:case"+":case"S":case"a":case"n":case"p":case"t":case"w":case"x":i=await At(n,t,
e,r,d);break;default:a=0;break}break;case"g":i=await Yt(e,r,d);break;case"l":i=await Ct(r);break;case"L":i=await Wa(e,r,
d);break;case"n":i=await wa(e,r,d);break;case"o":i=await At(n,t,e,r,d);break;case"O":i=await Ca(e,r,d);break;case"p":i=await ht(
e,d);break;case"P":switch(t[2]){case void 0:case"+":case"t":case"i":case"n":case"x":i=await Aa(t.slice(2),e,r);break;default:
a=0;break}break;case"T":i=await Ra(e,r,d);break;case"t":case"v":case"m":case"i":case"s":case"E":i=await Kt(t.slice(1),e,
r,d);break;case"r":if(t[2]=="d"&&t[3]=="s"){let N=null;e!=null&&(N=pe(n,0,null,!0)),i=await Sa(e,N)}else t[2]=="g"?i=await Ua(
e,d):a=0;break;case"R":switch(t[2]){case"p":r?i=await $a(e):i=await za(e);break;case"s":i=await Xa(e,r);break;default:a=
0}break;case"u":i=await Yt(e,r,d);break;case"F":switch(t[2]){case void 0:case"+":case"x":i=await Ia(e,r);break;case"p":i=
await Va(e,r);break;case"d":i=await Fa(e,r);break;case"t":i=await xa(e,r);break;default:a=0;break}break;case"e":switch(t[2]){case"\
s":i=await qa(e,r);break;case"u":i=await Ga(e,r);break;case"w":i=await Pa(e,r);break;case"t":i=await Ja(e,r);break;default:
a=0;break}break;case"x":r?i=await Ba(e):i=await ja(e);break;case"X":i=await Ya(e,r);break;case"y":i=await ha(e,r);break;default:
a=0}o.popt.topt.expanded=g}else we(n);return i||(a=5),a}async function At(n,s,t,a,i){let e,r=[],d=0;if(t!=null){let g;for(;(g=
pe(n,0,null,!0))!=null&&(r[d++]=g,!(d>=100)););}return s[1]=="f"?e=await da(s.slice(2),t,r,d,a,i):e=await Na(t,r,d,a,i),
e}async function ta(n,s){if(s){let t=pe(n,4,null,!0);await Rt(t,o.popt.topt.pager)}else bt(n);return 2}async function aa(n,s,t){
let a=!0;if(s){let i,e,r;i=pe(n,0,null,!0),e=J(t,"+")!=null,r=o.popt.topt.expanded,J(t,"x")!=null&&(o.popt.topt.expanded=
1),a=await ua(i,e),o.popt.topt.expanded=r}else we(n);return a?2:5}async function na(n,s,t){let a=2,i=!0;if(s){let e={},r={};
if(e.value=pe(n,0,null,!0),r.value=pe(n,0,null,!0),D(t.slice(3),"export")==0)e.value==null||r.value==null?(K("\\%s: missi\
ng required argument",t),i=!1):i=qe(e.value,r.value);else if(D(t.slice(3),"import")==0)e.value==null?(K("\\%s: missing re\
quired argument",t),i=!1):i=lt(e.value,r.value);else if(Ae(t.slice(3),"list",4)==0){let d,g;d=J(t,"+")!=null,g=o.popt.topt.
expanded,J(t,"x")!=null&&(o.popt.topt.expanded=1),i=await Ct(d),o.popt.topt.expanded=g}else D(t.slice(3),"unlink")==0?e.
value==null?(K("\\%s: missing required argument",t),i=!1):i=ne(e.value):a=0}else we(n);return i||(a=5),a}async function Wt(n,s,t,a){
let i=2;if(s){let e=J(t,"+")!=null,r,d,g={value:0},N=a?0:1;if(r=Ye(),d=pe(n,4,null,!0),d==null)K(a?"function name is req\
uired":"view name is required"),i=5;else if(!await ra(N,d,g))i=5;else if(!await Ea(N,g.value,r))i=5;else{let E,u;if(o.queryFout==
ye){let A=pa(r);E=Bt(A,o.popt.topt),u=!0}else E=o.queryFout,u=!1;e?ca(E,r.data,a):Ot(r.data,E)}}else bt(n);return i}async function sa(n,s,t){
let a=!0;if(s){let i,e,r;i=pe(n,0,null,!0),e=J(t,"S")!=null,r=o.popt.topt.expanded,J(t,"x")!=null&&(o.popt.topt.expanded=
1),a=await ht(i,e),o.popt.topt.expanded=r}else we(n);return a?2:5}function ia(n,s){if(s){let t=pe(n,0,null,!1);t==null||
D(t,"commands")==0?Ce(o.popt.topt.pager):D(t,"options")==0?Nt(o.popt.topt.pager):D(t,"variables")==0?Pe(o.popt.topt.pager):
Ce(o.popt.topt.pager)}else we(n);return 2}function we(n){let s;for(;(s=pe(n,0,null,!1))!=null;);}function bt(n){let s=pe(
n,4,null,!1)}function la(n){return D(n,"if")==0||D(n,"elif")==0||D(n,"else")==0||D(n,"endif")==0}function oa(n,s){return n&&
n.len==0?(l(n,s.data),!0):!1}function Tt(n){return!(o.echo_hidden!=0&&(jt(`/**** INTERNAL QUERY ****/
%s
/************************/

`,n),o.logfile&&(Ge(o.logfile,`/**** INTERNAL QUERY ****/
%s
/************************/

`,n),o.logfile),o.echo_hidden==2))}async function ra(n,s,t){let a=!0,i=Ye(),e;switch(n){case 0:m(i,"Get function's OID"),
l(i,"SELECT "),Ke(i,s,o.db),p(i,"::pg_catalog.%s::pg_catalog.oid",J(s,"(")!=null?"regprocedure":"regproc");break;case 1:
m(i,"Get view's OID"),l(i,"SELECT "),Ke(i,s,o.db),l(i,"::pg_catalog.regclass::pg_catalog.oid");break}return Tt(i.data)?(e=
await ut(o.db,i.data),Lt(e)==2&&v(e)==1?t.value=_t(_(e,0,0)):(yt(e),a=!1),a):!1}async function Ea(n,s,t){let a=!0,i=Ye(),
e;switch(n){case 0:m(i,"Get function's definition"),p(i,"SELECT pg_catalog.pg_get_functiondef(%u)",s);break;case 1:m(i,"\
Get view's definition and details"),o.sversion>=90400?p(i,"SELECT nspname, relname, relkind, pg_catalog.pg_get_viewdef(c\
.oid, true), pg_catalog.array_remove(pg_catalog.array_remove(c.reloptions,'check_option=local'),'check_option=cascaded')\
 AS reloptions, CASE WHEN 'check_option=local' = ANY (c.reloptions) THEN 'LOCAL'::text WHEN 'check_option=cascaded' = AN\
Y (c.reloptions) THEN 'CASCADED'::text ELSE NULL END AS checkoption FROM pg_catalog.pg_class c LEFT JOIN pg_catalog.pg_n\
amespace n ON c.relnamespace = n.oid WHERE c.oid = %u",s):p(i,"SELECT nspname, relname, relkind, pg_catalog.pg_get_viewd\
ef(c.oid, true), c.reloptions AS reloptions, NULL AS checkoption FROM pg_catalog.pg_class c LEFT JOIN pg_catalog.pg_name\
space n ON c.relnamespace = n.oid WHERE c.oid = %u",s);break}if(!Tt(i.data))return!1;if(e=await ut(o.db,i.data),Lt(e)==2&&
v(e)==1){switch(nt(t),n){case 0:l(t,_(e,0,0));break;case 1:{let r=_(e,0,0),d=_(e,0,1),g=_(e,0,2),N=_(e,0,3),E=_(e,0,4),u=_(
e,0,5);g[0]==="v"?l(t,"CREATE OR REPLACE VIEW "):(K('"%s.%s" is not a view',r,d),a=!1),p(t,"%s.",he(r)),l(t,he(d)),E!=null&&
Te(E)>2&&(l(t,`
 WITH (`),sn(t,E,"",o.encoding,Jt())||(K("could not parse reloptions array"),a=!1),X(t,")")),p(t,` AS
%s`,N),t.len>0&&t.data[t.len-1]==";"&&(t.data=t.data.slice(0,--t.len)),u!=null&&u[0]!=null&&p(t,`
 WITH %s CHECK OPTION`,u)}break}t.len>0&&t.data[t.len-1]!=`
`&&X(t,`
`)}else yt(e),a=!1;return a}function pa(n){let s=0,t=n.data;for(;t[0]!=null&&(s++,t=J(t,`
`),t!=null);)t=t.slice(1);return s}function ca(n,s,t){let a=t,i=0;for(;s[0]!=null;){let e;if(a&&(Ae(s,"AS ",3)==0||Ae(s,
"BEGIN ",6)==0||Ae(s,"RETURN ",7)==0)&&(a=!1),a||i++,e=J(s,`
`),e!=null&&(s=s.slice(0,s.length-e.length)),a?Ge(n,`        %s
`,s):Ge(n,`%-7d %s
`,i,s),e==null)break;s=e=e.slice(1)}}function yt(n){let s,t;s=Ye(),t=Dt(n,"S"),t!=null?b(s,"%s:  ",t):b(s,"ERROR:  "),t=
Dt(n,"M"),t!=null?l(s,t):l(s,"(not available)"),X(s,`
`),K("%s",s.data)}async function _a(n,s,t){let a={},i,e=I(o.popt);return y(a),m(a,"Get matching aggregates"),p(a,`SELECT\
 n.nspname as "%s",
  p.proname AS "%s",
  pg_catalog.format_type(p.prorettype, NULL) AS "%s",
  CASE WHEN p.pronargs = 0
    THEN CAST('*' AS pg_catalog.text)
    ELSE pg_catalog.pg_get_function_arguments(p.oid)
  END AS "%s",
`,"Schema","Name","Result data type","Argument data types"),o.sversion>=11e4?p(a,`  pg_catalog.obj_description(p.oid, 'p\
g_proc') as "%s"
FROM pg_catalog.pg_proc p
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = p.pronamespace
WHERE p.prokind = 'a'
`,"Description"):p(a,`  pg_catalog.obj_description(p.oid, 'pg_proc') as "%s"
FROM pg_catalog.pg_proc p
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = p.pronamespace
WHERE p.proisagg
`,"Description"),!t&&n==null&&l(a,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!Y(a,n,!0,!1,"n.nspname","p.proname",null,"pg_catalog.pg_function_is_visible(p.oid)",null,3)||(l(a,"ORDER BY 1, 2, 4;"),
i=await W(a.data),!i)?!1:(e.title="List of aggregate functions",e.translate_header=!0,x(i,e,o.queryFout,!1,o.logfile),!0)}
async function ga(n,s){let t={},a,i=I(o.popt),e=[!1,!0,!1,!1];if(o.sversion<90600){let r="";return K("The server (versio\
n %s) does not support access methods.",Oe(o.sversion,!1,r,Ue(r))),!0}return y(t),m(t,"Get matching access methods"),p(t,
`SELECT amname AS "%s",
  CASE amtype WHEN 'i' THEN '%s' WHEN 't' THEN '%s' END AS "%s"`,"Name","Index","Table","Type"),s&&p(t,`,
  amhandler AS "%s",
  pg_catalog.obj_description(oid, 'pg_am') AS "%s"`,"Handler","Description"),l(t,`
FROM pg_catalog.pg_am
`),!Y(t,n,!1,!1,null,"amname",null,null,null,1)||(l(t,"ORDER BY 1;"),a=await W(t.data),!a)?!1:(i.title="List of access m\
ethods",i.translate_header=!0,i.translate_columns=e,i.n_translate_columns=ee(e),x(a,i,o.queryFout,!1,o.logfile),!0)}async function fa(n,s){
let t={},a,i=I(o.popt);return y(t),m(t,"Get matching tablespaces"),p(t,`SELECT spcname AS "%s",
  pg_catalog.pg_get_userbyid(spcowner) AS "%s",
  pg_catalog.pg_tablespace_location(oid) AS "%s"`,"Name","Owner","Location"),s&&(l(t,`,
  `),Re(t,"spcacl"),p(t,`,
  spcoptions AS "%s",
  pg_catalog.pg_size_pretty(pg_catalog.pg_tablespace_size(oid)) AS "%s",
  pg_catalog.shobj_description(oid, 'pg_tablespace') AS "%s"`,"Options","Size","Description")),l(t,`
FROM pg_catalog.pg_tablespace
`),!Y(t,n,!1,!1,null,"spcname",null,null,null,1)||(l(t,"ORDER BY 1;"),a=await W(t.data),!a)?!1:(i.title="List of tablesp\
aces",i.translate_header=!0,x(a,i,o.queryFout,!1,o.logfile),!0)}async function da(n,s,t,a,i,e){let r="anptwSx+",d=J(n,"a")!=
null,g=J(n,"n")!=null,N=J(n,"p")!=null,E=J(n,"t")!=null,u=J(n,"w")!=null,A,R={},w,S=I(o.popt),se=[!1,!1,!1,!1,!0,!0,!0,!1,
!0,!0,!1,!1,!1,!1],Ve=[!1,!1,!1,!1,!0,!0,!1,!0,!0,!1,!1,!1,!1];if(Te(n)!=On(n,r))return K("\\df only takes [%s] as option\
s",r),!0;if(N&&o.sversion<11e4){let P="";return K('\\df does not take a "%c" option with server version %s',"p",Oe(o.sversion,
!1,P,Ue(P))),!0}!d&&!g&&!N&&!E&&!u&&(d=g=E=u=!0,o.sversion>=11e4&&(N=!0)),y(R),m(R,"Get matching functions"),p(R,`SELECT\
 n.nspname as "%s",
  p.proname as "%s",
`,"Schema","Name"),o.sversion>=11e4?p(R,`  pg_catalog.pg_get_function_result(p.oid) as "%s",
  pg_catalog.pg_get_function_arguments(p.oid) as "%s",
 CASE p.prokind
  WHEN 'a' THEN '%s'
  WHEN 'w' THEN '%s'
  WHEN 'p' THEN '%s'
  ELSE '%s'
 END as "%s"`,"Result data type","Argument data types","agg","window","proc","func","Type"):p(R,`  pg_catalog.pg_get_fun\
ction_result(p.oid) as "%s",
  pg_catalog.pg_get_function_arguments(p.oid) as "%s",
 CASE
  WHEN p.proisagg THEN '%s'
  WHEN p.proiswindow THEN '%s'
  WHEN p.prorettype = 'pg_catalog.trigger'::pg_catalog.regtype THEN '%s'
  ELSE '%s'
 END as "%s"`,"Result data type","Argument data types","agg","window","trigger","func","Type"),i&&(p(R,`,
 CASE
  WHEN p.provolatile = 'i' THEN '%s'
  WHEN p.provolatile = 's' THEN '%s'
  WHEN p.provolatile = 'v' THEN '%s'
 END as "%s"`,"immutable","stable","volatile","Volatility"),o.sversion>=90600&&p(R,`,
 CASE
  WHEN p.proparallel = 'r' THEN '%s'
  WHEN p.proparallel = 's' THEN '%s'
  WHEN p.proparallel = 'u' THEN '%s'
 END as "%s"`,"restricted","safe","unsafe","Parallel"),p(R,`,
 pg_catalog.pg_get_userbyid(p.proowner) as "%s",
 CASE WHEN prosecdef THEN '%s' ELSE '%s' END AS "%s",
 CASE WHEN p.proleakproof THEN '%s' ELSE '%s' END as "%s"`,"Owner","definer","invoker","Security","yes","no","Leakproof?"),
l(R,`,
 `),Re(R,"p.proacl"),p(R,`,
 l.lanname as "%s"`,"Language"),p(R,`,
 CASE WHEN l.lanname IN ('internal', 'c') THEN p.prosrc END as "%s"`,"Internal name"),p(R,`,
 pg_catalog.obj_description(p.oid, 'pg_proc') as "%s"`,"Description")),l(R,`
FROM pg_catalog.pg_proc p
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = p.pronamespace
`);for(let P=0;P<a;P++)p(R,`     LEFT JOIN pg_catalog.pg_type t%d ON t%d.oid = p.proargtypes[%d]
     LEFT JOIN pg_catalog.pg_namespace nt%d ON nt%d.oid = t%d.typnamespace
`,P,P,P,P,P,P);if(i&&l(R,`     LEFT JOIN pg_catalog.pg_language l ON l.oid = p.prolang
`),A=!1,!(g&&d&&N&&E&&u))if(g)d||(A?l(R,"      AND "):(l(R,"WHERE "),A=!0),o.sversion>=11e4?l(R,`p.prokind <> 'a'
`):l(R,`NOT p.proisagg
`)),!N&&o.sversion>=11e4&&(A?l(R,"      AND "):(l(R,"WHERE "),A=!0),l(R,`p.prokind <> 'p'
`)),E||(A?l(R,"      AND "):(l(R,"WHERE "),A=!0),l(R,`p.prorettype <> 'pg_catalog.trigger'::pg_catalog.regtype
`)),u||(A?l(R,"      AND "):(l(R,"WHERE "),A=!0),o.sversion>=11e4?l(R,`p.prokind <> 'w'
`):l(R,`NOT p.proiswindow
`));else{let P=!1;l(R,`WHERE (
       `),A=!0,d&&(o.sversion>=11e4?l(R,`p.prokind = 'a'
`):l(R,`p.proisagg
`),P=!0),E&&(P&&l(R,"       OR "),l(R,`p.prorettype = 'pg_catalog.trigger'::pg_catalog.regtype
`),P=!0),N&&(P&&l(R,"       OR "),l(R,`p.prokind = 'p'
`),P=!0),u&&(P&&l(R,"       OR "),o.sversion>=11e4?l(R,`p.prokind = 'w'
`):l(R,`p.proiswindow
`)),l(R,`      )
`)}if(!Y(R,s,A,!1,"n.nspname","p.proname",null,"pg_catalog.pg_function_is_visible(p.oid)",null,3))return!1;for(let P=0;P<
a;P++)if(D(t[P],"-")!=0){let He="",ve="",Fe="",xe="";if(He=oe("nt%d.nspname",P),ve=oe("t%d.typname",P),Fe=oe("pg_catalog\
.format_type(t%d.oid, NULL)",P),xe=oe("pg_catalog.pg_type_is_visible(t%d.oid)",P),!Y(R,ot(t[P]),!0,!1,He,ve,Fe,xe,null,3))
return!1}else p(R,`  AND t%d.typname IS NULL
`,P);return!e&&s==null&&l(R,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),l(R,"ORDER BY 1, 2, 4;"),w=await W(R.data),w?(S.title="List of functions",S.translate_header=!0,o.sversion>=90600?(S.
translate_columns=se,S.n_translate_columns=ee(se)):(S.translate_columns=Ve,S.n_translate_columns=ee(Ve)),x(w,S,o.queryFout,
!1,o.logfile),!0):!1}async function Ra(n,s,t){let a={},i,e=I(o.popt);return y(a),m(a,"Get matching types"),p(a,`SELECT n\
.nspname as "%s",
  pg_catalog.format_type(t.oid, NULL) AS "%s",
`,"Schema","Name"),s&&(p(a,`  t.typname AS "%s",
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
`,"Internal name","Size","Elements","Owner"),Re(a,"t.typacl"),l(a,`,
  `)),p(a,`  pg_catalog.obj_description(t.oid, 'pg_type') as "%s"
`,"Description"),l(a,`FROM pg_catalog.pg_type t
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = t.typnamespace
`),l(a,"WHERE (t.typrelid = 0 "),l(a,`OR (SELECT c.relkind = 'c' FROM pg_catalog.pg_class c WHERE c.oid = t.typrelid))
`),(n==null||Me(n,"[]")==null)&&l(a,`  AND NOT EXISTS(SELECT 1 FROM pg_catalog.pg_type el WHERE el.oid = t.typelem AND e\
l.typarray = t.oid)
`),!t&&n==null&&l(a,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!Y(a,ot(n),!0,!1,"n.nspname","t.typname","pg_catalog.format_type(t.oid, NULL)","pg_catalog.pg_type_is_visible(t.oid)",
null,3)||(l(a,"ORDER BY 1, 2;"),i=await W(a.data),!i)?!1:(e.title="List of data types",e.translate_header=!0,x(i,e,o.queryFout,
!1,o.logfile),!0)}function ot(n){let s=["decimal","numeric","float","double precision","int","integer","bool[]","boolean\
[]","decimal[]","numeric[]","float[]","double precision[]","float4[]","real[]","float8[]","double precision[]","int[]","\
integer[]","int2[]","smallint[]","int4[]","integer[]","int8[]","bigint[]","time[]","time without time zone[]","timetz[]",
"time with time zone[]","timestamp[]","timestamp without time zone[]","timestamptz[]","timestamp with time zone[]","varb\
it[]","bit varying[]","varchar[]","character varying[]",null];if(n==null)return null;for(let t=0;s[t]!=null;t+=2)if(Sn(n,
s[t])==0)return s[t+1];return n}async function Na(n,s,t,a,i){let e={},r,d=I(o.popt),g=[!1,!1,!1,!1,!1,!1,!0,!1];if(y(e),
m(e,"Get matching operators"),p(e,`SELECT n.nspname as "%s",
  o.oprname AS "%s",
  CASE WHEN o.oprkind='l' THEN NULL ELSE pg_catalog.format_type(o.oprleft, NULL) END AS "%s",
  CASE WHEN o.oprkind='r' THEN NULL ELSE pg_catalog.format_type(o.oprright, NULL) END AS "%s",
  pg_catalog.format_type(o.oprresult, NULL) AS "%s",
`,"Schema","Name","Left arg type","Right arg type","Result type"),a&&p(e,`  o.oprcode AS "%s",
  CASE WHEN p.proleakproof THEN '%s' ELSE '%s' END AS "%s",
`,"Function","yes","no","Leakproof?"),p(e,`  coalesce(pg_catalog.obj_description(o.oid, 'pg_operator'),
           pg_catalog.obj_description(o.oprcode, 'pg_proc')) AS "%s"
FROM pg_catalog.pg_operator o
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = o.oprnamespace
`,"Description"),t>=2?(t=2,l(e,`     LEFT JOIN pg_catalog.pg_type t0 ON t0.oid = o.oprleft
     LEFT JOIN pg_catalog.pg_namespace nt0 ON nt0.oid = t0.typnamespace
     LEFT JOIN pg_catalog.pg_type t1 ON t1.oid = o.oprright
     LEFT JOIN pg_catalog.pg_namespace nt1 ON nt1.oid = t1.typnamespace
`)):t==1&&l(e,`     LEFT JOIN pg_catalog.pg_type t0 ON t0.oid = o.oprright
     LEFT JOIN pg_catalog.pg_namespace nt0 ON nt0.oid = t0.typnamespace
`),a&&l(e,`     LEFT JOIN pg_catalog.pg_proc p ON p.oid = o.oprcode
`),!i&&n==null&&l(e,`WHERE n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!Y(e,n,!i&&n==null,!0,"n.nspname","o.oprname",null,"pg_catalog.pg_operator_is_visible(o.oid)",null,3))return!1;t==1&&
l(e,`  AND o.oprleft = 0
`);for(let N=0;N<t;N++)if(D(s[N],"-")!=0){let E="",u="",A="",R="";if(E=oe("nt%d.nspname",N),u=oe("t%d.typname",N),A=oe("\
pg_catalog.format_type(t%d.oid, NULL)",N),R=oe("pg_catalog.pg_type_is_visible(t%d.oid)",N),!Y(e,ot(s[N]),!0,!1,E,u,A,R,null,
3))return!1}else p(e,`  AND t%d.typname IS NULL
`,N);return l(e,"ORDER BY 1, 2, 3, 4;"),r=await W(e.data),r?(d.title="List of operators",d.translate_header=!0,d.translate_columns=
g,d.n_translate_columns=ee(g),x(r,d,o.queryFout,!1,o.logfile),!0):!1}async function ua(n,s){let t,a={},i=I(o.popt);return y(
a),m(a,"Get matching databases"),p(a,`SELECT
  d.datname as "%s",
  pg_catalog.pg_get_userbyid(d.datdba) as "%s",
  pg_catalog.pg_encoding_to_char(d.encoding) as "%s",
`,"Name","Owner","Encoding"),o.sversion>=15e4?p(a,`  CASE d.datlocprovider WHEN 'b' THEN 'builtin' WHEN 'c' THEN 'libc' \
WHEN 'i' THEN 'icu' END AS "%s",
`,"Locale Provider"):p(a,`  'libc' AS "%s",
`,"Locale Provider"),p(a,`  d.datcollate as "%s",
  d.datctype as "%s",
`,"Collate","Ctype"),o.sversion>=17e4?p(a,`  d.datlocale as "%s",
`,"Locale"):o.sversion>=15e4?p(a,`  d.daticulocale as "%s",
`,"Locale"):p(a,`  NULL as "%s",
`,"Locale"),o.sversion>=16e4?p(a,`  d.daticurules as "%s",
`,"ICU Rules"):p(a,`  NULL as "%s",
`,"ICU Rules"),l(a,"  "),Re(a,"d.datacl"),s&&p(a,`,
  CASE WHEN pg_catalog.has_database_privilege(d.datname, 'CONNECT')
       %s       THEN pg_catalog.pg_size_pretty(pg_catalog.pg_database_size(d.datname))
       ELSE 'No Access'
  END as "%s",
  t.spcname as "%s",
  pg_catalog.shobj_description(d.oid, 'pg_database') as "%s"`,o.sversion>=1e5?`OR pg_catalog.pg_has_role('pg_read_all_st\
ats', 'USAGE')
`:"","Size","Tablespace","Description"),l(a,`
FROM pg_catalog.pg_database d
`),s&&l(a,`  JOIN pg_catalog.pg_tablespace t on d.dattablespace = t.oid
`),n!=null&&!Y(a,n,!1,!1,null,"d.datname",null,null,null,1)||(l(a,"ORDER BY 1;"),t=await W(a.data),!t)?!1:(i.title="List\
 of databases",i.translate_header=!0,x(t,i,o.queryFout,!1,o.logfile),!0)}async function ht(n,s){let t={},a,i=I(o.popt),e=[
!1,!1,!0,!1,!1,!1];return y(t),m(t,"Get access privileges of matching relations"),p(t,`SELECT n.nspname as "%s",
  c.relname as "%s",
  CASE c.relkind WHEN 'r' THEN '%s' WHEN 'v' THEN '%s' WHEN 'm' THEN '%s' WHEN 'S' THEN '%s' WHEN 'f' THEN '%s' WHEN 'p'\
 THEN '%s' END as "%s",
  `,"Schema","Name","table","view","materialized view","sequence","foreign table","partitioned table","Type"),Re(t,"c.re\
lacl"),p(t,`,
  pg_catalog.array_to_string(ARRAY(
    SELECT attname || E':\\n  ' || pg_catalog.array_to_string(attacl, E'\\n  ')
    FROM pg_catalog.pg_attribute a
    WHERE attrelid = c.oid AND NOT attisdropped AND attacl IS NOT NULL
  ), E'\\n') AS "%s"`,"Column privileges"),o.sversion>=90500&&o.sversion<1e5&&p(t,`,
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
    AS "%s"`,"Policies"),o.sversion>=1e5&&p(t,`,
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
    AS "%s"`,"Policies"),l(t,`
FROM pg_catalog.pg_class c
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
WHERE c.relkind IN ('r','v','m','S','f','p')
`),!s&&n==null&&l(t,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!Y(t,n,!0,!1,"n.nspname","c.relname",null,"pg_catalog.pg_table_is_visible(c.oid)",null,3)||(l(t,"ORDER BY 1, 2;"),a=await W(
t.data),!a)?!1:(b(t,"Access privileges"),i.title=t.data,i.translate_header=!0,i.translate_columns=e,i.n_translate_columns=
ee(e),x(a,i,o.queryFout,!1,o.logfile),!0)}async function La(n){let s={},t,a=I(o.popt),i=[!1,!1,!0,!1];return y(s),m(s,"G\
et matching default ACLs"),p(s,`SELECT pg_catalog.pg_get_userbyid(d.defaclrole) AS "%s",
  n.nspname AS "%s",
  CASE d.defaclobjtype     WHEN '%c' THEN '%s' WHEN '%c' THEN '%s' WHEN '%c' THEN '%s'    WHEN '%c' THEN '%s' WHEN '%c' \
THEN '%s' WHEN '%c' THEN '%s' END AS "%s",
  `,"Owner","Schema","r","table","S","sequence","f","function","T","type","n","schema","L","large object","Type"),Re(s,"\
d.defaclacl"),l(s,`
FROM pg_catalog.pg_default_acl d
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = d.defaclnamespace
`),!Y(s,n,!1,!1,null,"n.nspname","pg_catalog.pg_get_userbyid(d.defaclrole)",null,null,3)||(l(s,"ORDER BY 1, 2, 3;"),t=await W(
s.data),!t)?!1:(b(s,"Default access privileges"),a.title=s.data,a.translate_header=!0,a.translate_columns=i,a.n_translate_columns=
ee(i),x(t,a,o.queryFout,!1,o.logfile),!0)}async function Da(n,s){let t={},a,i=I(o.popt),e=[!1,!1,!0,!1];return y(t),m(t,
"Get matching object comments"),p(t,`SELECT DISTINCT tt.nspname AS "%s", tt.name AS "%s", tt.object AS "%s", d.descripti\
on AS "%s"
FROM (
`,"Schema","Name","Object","Description"),p(t,`  SELECT pgc.oid as oid, pgc.tableoid AS tableoid,
  n.nspname as nspname,
  CAST(pgc.conname AS pg_catalog.text) as name,  CAST('%s' AS pg_catalog.text) as object
  FROM pg_catalog.pg_constraint pgc
    JOIN pg_catalog.pg_class c ON c.oid = pgc.conrelid
    LEFT JOIN pg_catalog.pg_namespace n     ON n.oid = c.relnamespace
`,"table constraint"),!s&&n==null&&l(t,`WHERE n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!Y(t,n,!s&&n==null,!1,"n.nspname","pgc.conname",null,"pg_catalog.pg_table_is_visible(c.oid)",null,3)||(p(t,`UNION ALL\

  SELECT pgc.oid as oid, pgc.tableoid AS tableoid,
  n.nspname as nspname,
  CAST(pgc.conname AS pg_catalog.text) as name,  CAST('%s' AS pg_catalog.text) as object
  FROM pg_catalog.pg_constraint pgc
    JOIN pg_catalog.pg_type t ON t.oid = pgc.contypid
    LEFT JOIN pg_catalog.pg_namespace n     ON n.oid = t.typnamespace
`,"domain constraint"),!s&&n==null&&l(t,`WHERE n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!Y(t,n,!s&&n==null,!1,"n.nspname","pgc.conname",null,"pg_catalog.pg_type_is_visible(t.oid)",null,3))||(p(t,`UNION ALL\

  SELECT o.oid as oid, o.tableoid as tableoid,
  n.nspname as nspname,
  CAST(o.opcname AS pg_catalog.text) as name,
  CAST('%s' AS pg_catalog.text) as object
  FROM pg_catalog.pg_opclass o
    JOIN pg_catalog.pg_am am ON o.opcmethod = am.oid
    JOIN pg_catalog.pg_namespace n ON n.oid = o.opcnamespace
`,"operator class"),!s&&n==null&&l(t,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!Y(t,n,!0,!1,"n.nspname","o.opcname",null,"pg_catalog.pg_opclass_is_visible(o.oid)",null,3))||(p(t,`UNION ALL
  SELECT opf.oid as oid, opf.tableoid as tableoid,
  n.nspname as nspname,
  CAST(opf.opfname AS pg_catalog.text) AS name,
  CAST('%s' AS pg_catalog.text) as object
  FROM pg_catalog.pg_opfamily opf
    JOIN pg_catalog.pg_am am ON opf.opfmethod = am.oid
    JOIN pg_catalog.pg_namespace n ON opf.opfnamespace = n.oid
`,"operator family"),!s&&n==null&&l(t,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!Y(t,n,!0,!1,"n.nspname","opf.opfname",null,"pg_catalog.pg_opfamily_is_visible(opf.oid)",null,3))||(p(t,`UNION ALL
  SELECT r.oid as oid, r.tableoid as tableoid,
  n.nspname as nspname,
  CAST(r.rulename AS pg_catalog.text) as name,  CAST('%s' AS pg_catalog.text) as object
  FROM pg_catalog.pg_rewrite r
       JOIN pg_catalog.pg_class c ON c.oid = r.ev_class
       LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
  WHERE r.rulename != '_RETURN'
`,"rule"),!s&&n==null&&l(t,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!Y(t,n,!0,!1,"n.nspname","r.rulename",null,"pg_catalog.pg_table_is_visible(c.oid)",null,3))||(p(t,`UNION ALL
  SELECT t.oid as oid, t.tableoid as tableoid,
  n.nspname as nspname,
  CAST(t.tgname AS pg_catalog.text) as name,  CAST('%s' AS pg_catalog.text) as object
  FROM pg_catalog.pg_trigger t
       JOIN pg_catalog.pg_class c ON c.oid = t.tgrelid
       LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
`,"trigger"),!s&&n==null&&l(t,`WHERE n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!Y(t,n,!s&&n==null,!1,"n.nspname","t.tgname",null,"pg_catalog.pg_table_is_visible(c.oid)",null,3))||(l(t,`) AS tt
  JOIN pg_catalog.pg_description d ON (tt.oid = d.objoid AND tt.tableoid = d.classoid AND d.objsubid = 0)
`),l(t,"ORDER BY 1, 2, 3;"),a=await W(t.data),!a)?!1:(i.title="Object descriptions",i.translate_header=!0,i.translate_columns=
e,i.n_translate_columns=ee(e),x(a,i,o.queryFout,!1,o.logfile),!0)}async function Oa(n,s,t){let a={},i,e;if(y(a),m(a,"Get\
 matching relations to describe"),l(a,`SELECT c.oid,
  n.nspname,
  c.relname
FROM pg_catalog.pg_class c
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
`),!t&&n==null&&l(a,`WHERE n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!Y(a,n,!t&&n==null,!1,"n.nspname","c.relname",null,"pg_catalog.pg_table_is_visible(c.oid)",null,3)||(l(a,"ORDER BY 2,\
 3;"),i=await W(a.data),!i))return!1;if(v(i)==0)return o.quiet||(n!=null?K('Did not find any relation named "%s".',n):K(
"Did not find any relations.")),!1;for(e=0;e<v(i);e++){let r,d,g;if(r=_(i,e,0),d=_(i,e,1),g=_(i,e,2),!await ma(d,g,r,s)||
j)return!1}return!0}async function ma(n,s,t,a){let i=!1,e={},r=null,d=Je(o.popt.topt),g={},N=!1,E,u=null,A=[],R={},w={},
S,se=-1,Ve=-1,P=-1,He=-1,ve=-1,Fe=-1,xe=-1,Qe=-1,ze=-1,$e=-1,Xe=-1,Ze=-1,et=-1,tt=-1,ct,L={},at=!1;if(d.default_footer=!1,
d.expanded=!1,y(e),y(R),y(w),m(e,"Get general information about one relation"),o.sversion>=12e4?p(e,`SELECT c.relchecks,\
 c.relkind, c.relhasindex, c.relhasrules, c.relhastriggers, c.relrowsecurity, c.relforcerowsecurity, false AS relhasoids\
, c.relispartition, %s, c.reltablespace, CASE WHEN c.reloftype = 0 THEN '' ELSE c.reloftype::pg_catalog.regtype::pg_cata\
log.text END, c.relpersistence, c.relreplident, am.amname
FROM pg_catalog.pg_class c
 LEFT JOIN pg_catalog.pg_class tc ON (c.reltoastrelid = tc.oid)
LEFT JOIN pg_catalog.pg_am am ON (c.relam = am.oid)
WHERE c.oid = '%s';`,a?`pg_catalog.array_to_string(c.reloptions || array(select 'toast.' || x from pg_catalog.unnest(tc.\
reloptions) x), ', ')
`:"''",t):o.sversion>=1e5?p(e,`SELECT c.relchecks, c.relkind, c.relhasindex, c.relhasrules, c.relhastriggers, c.relrowse\
curity, c.relforcerowsecurity, c.relhasoids, c.relispartition, %s, c.reltablespace, CASE WHEN c.reloftype = 0 THEN '' EL\
SE c.reloftype::pg_catalog.regtype::pg_catalog.text END, c.relpersistence, c.relreplident
FROM pg_catalog.pg_class c
 LEFT JOIN pg_catalog.pg_class tc ON (c.reltoastrelid = tc.oid)
WHERE c.oid = '%s';`,a?`pg_catalog.array_to_string(c.reloptions || array(select 'toast.' || x from pg_catalog.unnest(tc.\
reloptions) x), ', ')
`:"''",t):o.sversion>=90500?p(e,`SELECT c.relchecks, c.relkind, c.relhasindex, c.relhasrules, c.relhastriggers, c.relrow\
security, c.relforcerowsecurity, c.relhasoids, false as relispartition, %s, c.reltablespace, CASE WHEN c.reloftype = 0 T\
HEN '' ELSE c.reloftype::pg_catalog.regtype::pg_catalog.text END, c.relpersistence, c.relreplident
FROM pg_catalog.pg_class c
 LEFT JOIN pg_catalog.pg_class tc ON (c.reltoastrelid = tc.oid)
WHERE c.oid = '%s';`,a?`pg_catalog.array_to_string(c.reloptions || array(select 'toast.' || x from pg_catalog.unnest(tc.\
reloptions) x), ', ')
`:"''",t):o.sversion>=90400?p(e,`SELECT c.relchecks, c.relkind, c.relhasindex, c.relhasrules, c.relhastriggers, false, f\
alse, c.relhasoids, false as relispartition, %s, c.reltablespace, CASE WHEN c.reloftype = 0 THEN '' ELSE c.reloftype::pg\
_catalog.regtype::pg_catalog.text END, c.relpersistence, c.relreplident
FROM pg_catalog.pg_class c
 LEFT JOIN pg_catalog.pg_class tc ON (c.reltoastrelid = tc.oid)
WHERE c.oid = '%s';`,a?`pg_catalog.array_to_string(c.reloptions || array(select 'toast.' || x from pg_catalog.unnest(tc.\
reloptions) x), ', ')
`:"''",t):p(e,`SELECT c.relchecks, c.relkind, c.relhasindex, c.relhasrules, c.relhastriggers, false, false, c.relhasoids\
, false as relispartition, %s, c.reltablespace, CASE WHEN c.reloftype = 0 THEN '' ELSE c.reloftype::pg_catalog.regtype::\
pg_catalog.text END, c.relpersistence
FROM pg_catalog.pg_class c
 LEFT JOIN pg_catalog.pg_class tc ON (c.reltoastrelid = tc.oid)
WHERE c.oid = '%s';`,a?`pg_catalog.array_to_string(c.reloptions || array(select 'toast.' || x from pg_catalog.unnest(tc.\
reloptions) x), ', ')
`:"''",t),r=await W(e.data),!r)return i;if(v(r)==0)return o.quiet||K("Did not find any relation with OID %s.",t),i;if(L.
checks=Ft(_(r,0,0)),L.relkind=_(r,0,1)[0],L.hasindex=D(_(r,0,2),"t")==0,L.hasrules=D(_(r,0,3),"t")==0,L.hastriggers=D(_(
r,0,4),"t")==0,L.rowsecurity=D(_(r,0,5),"t")==0,L.forcerowsecurity=D(_(r,0,6),"t")==0,L.hasoids=D(_(r,0,7),"t")==0,L.ispartition=
D(_(r,0,8),"t")==0,L.reloptions=_(r,0,9),L.tablespace=_t(_(r,0,10)),L.reloftype=D(_(r,0,11),"")!=0?_(r,0,11):null,L.relpersistence=
_(r,0,12)[0],L.relreplident=o.sversion>=90400?_(r,0,13)[0]:"d",o.sversion>=12e4?L.relam=ie(r,0,14)?null:_(r,0,14):L.relam=
null,r=null,L.relkind=="S"){let c=null,U=I(o.popt),h=[null,null,null];if(m(e,"Get sequence information"),o.sversion>=1e5?
(p(e,`SELECT pg_catalog.format_type(seqtypid, NULL) AS "%s",
       seqstart AS "%s",
       seqmin AS "%s",
       seqmax AS "%s",
       seqincrement AS "%s",
       CASE WHEN seqcycle THEN '%s' ELSE '%s' END AS "%s",
       seqcache AS "%s"
`,"Type","Start","Minimum","Maximum","Increment","yes","no","Cycles?","Cache"),p(e,`FROM pg_catalog.pg_sequence
WHERE seqrelid = '%s';`,t)):(p(e,`SELECT 'bigint' AS "%s",
       start_value AS "%s",
       min_value AS "%s",
       max_value AS "%s",
       increment_by AS "%s",
       CASE WHEN is_cycled THEN '%s' ELSE '%s' END AS "%s",
       cache_value AS "%s"
`,"Type","Start","Minimum","Maximum","Increment","yes","no","Cycles?","Cache"),p(e,"FROM %s",he(n)),p(e,".%s;",he(s))),r=
await W(e.data),!r)return i;if(m(e,"Get the column that owns this sequence"),p(e,`SELECT pg_catalog.quote_ident(nspname)\
 || '.' ||
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
 AND d.deptype IN ('a', 'i')`,t),c=await W(e.data),c){if(v(c)==1)switch(_(c,0,1)[0]){case"a":h[0]=st("Owned by: %s",_(c,
0,0));break;case"i":h[0]=st("Sequence for identity column: %s",_(c,0,0));break}}else return i;if(o.sversion>=19e4&&(m(e,
"Get publications containing this sequence"),p(e,`SELECT pubname FROM pg_catalog.pg_publication p
WHERE p.puballsequences
 AND pg_catalog.pg_relation_is_publishable('%s')
ORDER BY 1`,t),c=await W(e.data),c)){let H=v(c);if(H>0){for(b(w,"Included in publications:"),E=0;E<H;E++)p(w,`
    "%s"`,_(c,E,0));h[0]==null?h[0]=w.data:h[1]=w.data,nt(w)}}return L.relpersistence=="u"?b(R,'Unlogged sequence "%s.%s\
"',n,s):b(R,'Sequence "%s.%s"',n,s),U.footers=h,U.topt.default_footer=!1,U.title=R.data,U.translate_header=!0,x(r,U,o.queryFout,
!1,o.logfile),i=!0,i}if((L.relkind=="r"||L.relkind=="v"||L.relkind=="m"||L.relkind=="f"||L.relkind=="c"||L.relkind=="p")&&
(at=!0),S=0,m(e,"Get per-column information for one relation"),l(e,"SELECT a.attname"),se=S++,l(e,`,
  pg_catalog.format_type(a.atttypid, a.atttypmod)`),Ve=S++,at&&(l(e,`,
  (SELECT pg_catalog.pg_get_expr(d.adbin, d.adrelid, true)
   FROM pg_catalog.pg_attrdef d
   WHERE d.adrelid = a.attrelid AND d.adnum = a.attnum AND a.atthasdef),
  a.attnotnull`),P=S++,He=S++,l(e,`,
  (SELECT c.collname FROM pg_catalog.pg_collation c, pg_catalog.pg_type t
   WHERE c.oid = a.attcollation AND t.oid = a.atttypid AND a.attcollation <> t.typcollation) AS attcollation`),ve=S++,o.
sversion>=1e5?l(e,`,
  a.attidentity`):l(e,`,
  ''::pg_catalog.char AS attidentity`),Fe=S++,o.sversion>=12e4?l(e,`,
  a.attgenerated`):l(e,`,
  ''::pg_catalog.char AS attgenerated`),xe=S++),(L.relkind=="i"||L.relkind=="I")&&(o.sversion>=11e4&&(p(e,`,
  CASE WHEN a.attnum <= (SELECT i.indnkeyatts FROM pg_catalog.pg_index i WHERE i.indexrelid = '%s') THEN '%s' ELSE '%s' \
END AS is_key`,t,"yes","no"),Qe=S++),l(e,`,
  pg_catalog.pg_get_indexdef(a.attrelid, a.attnum, TRUE) AS indexdef`),ze=S++),L.relkind=="f"&&(l(e,`,
  CASE WHEN attfdwoptions IS NULL THEN '' ELSE   '(' || pg_catalog.array_to_string(ARRAY(SELECT pg_catalog.quote_ident(o\
ption_name) || ' ' || pg_catalog.quote_literal(option_value)  FROM   pg_catalog.pg_options_to_table(attfdwoptions)), ', \
') || ')' END AS attfdwoptions`),$e=S++),a&&(l(e,`,
  a.attstorage`),Xe=S++,o.sversion>=14e4&&!o.hide_compression&&(L.relkind=="r"||L.relkind=="p"||L.relkind=="m")&&(l(e,`,\

  a.attcompression AS attcompression`),Ze=S++),(L.relkind=="r"||L.relkind=="i"||L.relkind=="I"||L.relkind=="m"||L.relkind==
"f"||L.relkind=="p")&&(l(e,`,
  CASE WHEN a.attstattarget=-1 THEN NULL ELSE a.attstattarget END AS attstattarget`),et=S++),(L.relkind=="r"||L.relkind==
"v"||L.relkind=="m"||L.relkind=="f"||L.relkind=="c"||L.relkind=="p")&&(l(e,`,
  pg_catalog.col_description(a.attrelid, a.attnum)`),tt=S++)),l(e,`
FROM pg_catalog.pg_attribute a`),p(e,`
WHERE a.attrelid = '%s' AND a.attnum > 0 AND NOT a.attisdropped`,t),l(e,`
ORDER BY a.attnum;`),r=await W(e.data),!r)return i;switch(ct=v(r),L.relkind){case"r":L.relpersistence=="u"?b(R,'Unlogged\
 table "%s.%s"',n,s):b(R,'Table "%s.%s"',n,s);break;case"v":b(R,'View "%s.%s"',n,s);break;case"m":b(R,'Materialized view\
 "%s.%s"',n,s);break;case"i":L.relpersistence=="u"?b(R,'Unlogged index "%s.%s"',n,s):b(R,'Index "%s.%s"',n,s);break;case"\
I":L.relpersistence=="u"?b(R,'Unlogged partitioned index "%s.%s"',n,s):b(R,'Partitioned index "%s.%s"',n,s);break;case"t":
b(R,'TOAST table "%s.%s"',n,s);break;case"c":b(R,'Composite type "%s.%s"',n,s);break;case"f":b(R,'Foreign table "%s.%s"',
n,s);break;case"p":L.relpersistence=="u"?b(R,'Unlogged partitioned table "%s.%s"',n,s):b(R,'Partitioned table "%s.%s"',n,
s);break;default:b(R,'?%c? "%s.%s"',L.relkind,n,s);break}for(S=0,A[S++]="Column",A[S++]="Type",at&&(A[S++]="Collation",A[S++]=
"Nullable",A[S++]="Default"),Qe>=0&&(A[S++]="Key?"),ze>=0&&(A[S++]="Definition"),$e>=0&&(A[S++]="FDW options"),Xe>=0&&(A[S++]=
"Storage"),Ze>=0&&(A[S++]="Compression"),et>=0&&(A[S++]="Stats target"),tt>=0&&(A[S++]="Description"),Se(S<=ee(A)),je(g,
d,R.data,S,ct),N=!0,E=0;E<S;E++)ce(g,A[E],!0,"l");for(E=0;E<ct;E++){if($(g,_(r,E,se),!1,!1),$(g,_(r,E,Ve),!1,!1),at){let c,
U,h,H=!1;$(g,_(r,E,ve),!1,!1),$(g,D(_(r,E,He),"t")==0?"not null":"",!1,!1),c=_(r,E,Fe),U=_(r,E,xe),c[0]=="a"?h="generate\
d always as identity":c[0]=="d"?h="generated by default as identity":U[0]=="s"?(h=st("generated always as (%s) stored",_(
r,E,P)),H=!0):U[0]=="v"?(h=st("generated always as (%s)",_(r,E,P)),H=!0):h=_(r,E,P),$(g,h,!1,H)}if(Qe>=0&&$(g,_(r,E,Qe),
!0,!1),ze>=0&&$(g,_(r,E,ze),!1,!1),$e>=0&&$(g,_(r,E,$e),!1,!1),Xe>=0){let c=_(r,E,Xe);$(g,c[0]=="p"?"plain":c[0]=="m"?"m\
ain":c[0]=="x"?"extended":c[0]=="e"?"external":"???",!1,!1)}if(Ze>=0){let c=_(r,E,Ze);$(g,c[0]=="p"?"pglz":c[0]=="l"?"lz\
4":c[0]==null?"":"???",!1,!1)}et>=0&&$(g,_(r,E,et),!1,!1),tt>=0&&$(g,_(r,E,tt),!1,!1)}if(L.ispartition){let c;if(m(e,"Ge\
t partitioning information for this partition"),l(e,`SELECT inhparent::pg_catalog.regclass,
  pg_catalog.pg_get_expr(c.relpartbound, c.oid),
  `),l(e,o.sversion>=14e4?"inhdetachpending":"false as inhdetachpending"),a&&l(e,`,
  pg_catalog.pg_get_partition_constraintdef(c.oid)`),p(e,`
FROM pg_catalog.pg_class c JOIN pg_catalog.pg_inherits i ON c.oid = inhrelid
WHERE c.oid = '%s';`,t),c=await W(e.data),!c)return i;if(v(c)>0){let U=_(c,0,0),h=_(c,0,1),H=_(c,0,2);if(b(w,"Partition \
of: %s %s%s",U,h,D(H,"t")==0?" DETACH PENDING":""),C(g,w.data),a){let k=null;ie(c,0,3)||(k=_(c,0,3)),k==null||k[0]==null?
b(w,"No partition constraint"):b(w,"Partition constraint: %s",k),C(g,w.data)}}}if(L.relkind=="p"){let c;if(m(e,"Get part\
itioning information for this table"),p(e,"SELECT pg_catalog.pg_get_partkeydef('%s'::pg_catalog.oid);",t),c=await W(e.data),
!c)return i;if(v(c)==1){let U=_(c,0,0);b(w,"Partition key: %s",U),C(g,w.data)}}if(L.relkind=="t"){let c;if(m(e,"Get the \
table that owns this TOAST table"),p(e,`SELECT n.nspname, c.relname
FROM pg_catalog.pg_class c JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
WHERE reltoastrelid = '%s';`,t),c=await W(e.data),!c)return i;if(v(c)==1){let U=_(c,0,0),h=_(c,0,1);b(w,'Owning table: "\
%s.%s"',U,h),C(g,w.data)}}if(L.relkind=="i"||L.relkind=="I"){let c;if(m(e,"Get index details"),l(e,`SELECT i.indisunique\
, i.indisprimary, i.indisclustered, i.indisvalid,
  (NOT i.indimmediate) AND EXISTS (SELECT 1 FROM pg_catalog.pg_constraint WHERE conrelid = i.indrelid AND conindid = i.i\
ndexrelid AND contype IN ('p','u','x') AND condeferrable) AS condeferrable,
  (NOT i.indimmediate) AND EXISTS (SELECT 1 FROM pg_catalog.pg_constraint WHERE conrelid = i.indrelid AND conindid = i.i\
ndexrelid AND contype IN ('p','u','x') AND condeferred) AS condeferred,
`),o.sversion>=90400?l(e,`i.indisreplident,
`):l(e,`false AS indisreplident,
`),o.sversion>=15e4?l(e,`i.indnullsnotdistinct,
`):l(e,`false AS indnullsnotdistinct,
`),p(e,`  a.amname, c2.relname, pg_catalog.pg_get_expr(i.indpred, i.indrelid, true)
FROM pg_catalog.pg_index i, pg_catalog.pg_class c, pg_catalog.pg_class c2, pg_catalog.pg_am a
WHERE i.indexrelid = c.oid AND c.oid = '%s' AND c.relam = a.oid
AND i.indrelid = c2.oid;`,t),c=await W(e.data),c){if(v(c)!=1)return i;{let U=_(c,0,0),h=_(c,0,1),H=_(c,0,2),k=_(c,0,3),ae=_(
c,0,4),me=_(c,0,5),fe=_(c,0,6),Ie=_(c,0,7),_n=_(c,0,8),gn=_(c,0,9),Ht=_(c,0,10);D(h,"t")==0?b(w,"primary key, "):D(U,"t")==
0?D(Ie,"t")==0?b(w,"unique nulls not distinct, "):b(w,"unique, "):nt(w),p(w,'%s, for table "%s.%s"',_n,n,gn),Te(Ht)&&p(w,
", predicate (%s)",Ht),D(H,"t")==0&&l(w,", clustered"),D(k,"t")!=0&&l(w,", invalid"),D(ae,"t")==0&&l(w,", deferrable"),D(
me,"t")==0&&l(w,", initially deferred"),D(fe,"t")==0&&l(w,", replica identity"),C(g,w.data),L.relkind=="i"&&await rt(g,L.
relkind,L.tablespace,!0)}}else return i}else if(L.relkind=="r"||L.relkind=="m"||L.relkind=="f"||L.relkind=="p"||L.relkind==
"I"||L.relkind=="t"){let c=null,U=0;if(L.hasindex){if(m(e,"Get indexes for this table"),l(e,`SELECT c2.relname, i.indisp\
rimary, i.indisunique, i.indisclustered, i.indisvalid, pg_catalog.pg_get_indexdef(i.indexrelid, 0, true),
  pg_catalog.pg_get_constraintdef(con.oid, true), contype, condeferrable, condeferred`),o.sversion>=90400?l(e,", i.indis\
replident"):l(e,", false AS indisreplident"),l(e,", c2.reltablespace"),o.sversion>=18e4?l(e,", con.conperiod"):l(e,", fa\
lse AS conperiod"),p(e,`
FROM pg_catalog.pg_class c, pg_catalog.pg_class c2, pg_catalog.pg_index i
  LEFT JOIN pg_catalog.pg_constraint con ON (conrelid = i.indrelid AND conindid = i.indexrelid AND contype IN ('p','u','\
x'))
WHERE c.oid = '%s' AND c.oid = i.indrelid AND i.indexrelid = c2.oid
ORDER BY i.indisprimary DESC, c2.relname;`,t),c=await W(e.data),c)U=v(c);else return i;if(U>0)for(C(g,"Indexes:"),E=0;E<
U;E++){if(b(e,'    "%s"',_(c,E,0)),D(_(c,E,7),"x")==0||D(_(c,E,12),"t")==0)p(e," %s",_(c,E,6));else{let h,H;D(_(c,E,1),"\
t")==0?l(e," PRIMARY KEY,"):D(_(c,E,2),"t")==0&&(D(_(c,E,7),"u")==0?l(e," UNIQUE CONSTRAINT,"):l(e," UNIQUE,")),h=_(c,E,
5),H=Me(h," USING "),H!=null&&(h=H.slice(7)),p(e," %s",h),D(_(c,E,8),"t")==0&&l(e," DEFERRABLE"),D(_(c,E,9),"t")==0&&l(e,
" INITIALLY DEFERRED")}D(_(c,E,3),"t")==0&&l(e," CLUSTER"),D(_(c,E,4),"t")!=0&&l(e," INVALID"),D(_(c,E,10),"t")==0&&l(e,
" REPLICA IDENTITY"),C(g,e.data),await rt(g,"i",_t(_(c,E,11)),!1)}}if(L.checks){if(m(e,"Get check constraints for this t\
able"),p(e,`SELECT r.conname, pg_catalog.pg_get_constraintdef(r.oid, true)
FROM pg_catalog.pg_constraint r
WHERE r.conrelid = '%s' AND r.contype = 'c'
ORDER BY 1;`,t),c=await W(e.data),c)U=v(c);else return i;if(U>0)for(C(g,"Check constraints:"),E=0;E<U;E++)b(e,'    "%s" \
%s',_(c,E,0),_(c,E,1)),C(g,e.data)}if(m(e,"Get foreign key constraints for this table"),o.sversion>=12e4&&(L.ispartition||
L.relkind=="p")?p(e,`SELECT conrelid = '%s'::pg_catalog.regclass AS sametable,
       conname,
       pg_catalog.pg_get_constraintdef(oid, true) AS condef,
       conrelid::pg_catalog.regclass AS ontable
  FROM pg_catalog.pg_constraint,
       pg_catalog.pg_partition_ancestors('%s')
 WHERE conrelid = relid AND contype = 'f' AND conparentid = 0
ORDER BY sametable DESC, conname;`,t,t):(p(e,`SELECT true as sametable, conname,
  pg_catalog.pg_get_constraintdef(r.oid, true) as condef,
  conrelid::pg_catalog.regclass AS ontable
FROM pg_catalog.pg_constraint r
WHERE r.conrelid = '%s' AND r.contype = 'f'
`,t),o.sversion>=12e4&&l(e,`     AND conparentid = 0
`),l(e,"ORDER BY conname")),c=await W(e.data),c)U=v(c);else return i;if(U>0){let h=be(c,"sametable"),H=be(c,"conname"),k=be(
c,"condef"),ae=be(c,"ontable");for(C(g,"Foreign-key constraints:"),E=0;E<U;E++)D(_(c,E,h),"f")==0?b(e,'    TABLE "%s" CO\
NSTRAINT "%s" %s',_(c,E,ae),_(c,E,H),_(c,E,k)):b(e,'    "%s" %s',_(c,E,H),_(c,E,k)),C(g,e.data)}if(m(e,"Get foreign keys\
 referencing this table"),o.sversion>=12e4?p(e,`SELECT conname, conrelid::pg_catalog.regclass AS ontable,
       pg_catalog.pg_get_constraintdef(oid, true) AS condef
  FROM pg_catalog.pg_constraint c
 WHERE confrelid IN (SELECT pg_catalog.pg_partition_ancestors('%s')
                     UNION ALL VALUES ('%s'::pg_catalog.regclass))
       AND contype = 'f' AND conparentid = 0
ORDER BY conname;`,t,t):p(e,`SELECT conname, conrelid::pg_catalog.regclass AS ontable,
       pg_catalog.pg_get_constraintdef(oid, true) AS condef
  FROM pg_catalog.pg_constraint
 WHERE confrelid = %s AND contype = 'f'
ORDER BY conname;`,t),c=await W(e.data),c)U=v(c);else return i;if(U>0){let h=be(c,"conname"),H=be(c,"ontable"),k=be(c,"c\
ondef");for(C(g,"Referenced by:"),E=0;E<U;E++)b(e,'    TABLE "%s" CONSTRAINT "%s" %s',_(c,E,H),_(c,E,h),_(c,E,k)),C(g,e.
data)}if(o.sversion>=90500){if(m(e,"Get row-level policies for this table"),l(e,"SELECT pol.polname,"),o.sversion>=1e5?l(
e,` pol.polpermissive,
`):l(e,` 't' as polpermissive,
`),p(e,`  CASE WHEN pol.polroles = '{0}' THEN NULL ELSE pg_catalog.array_to_string(array(select rolname from pg_catalog.\
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
WHERE pol.polrelid = '%s' ORDER BY 1;`,t),c=await W(e.data),c)U=v(c);else return i;for(L.rowsecurity&&!L.forcerowsecurity&&
U>0&&C(g,"Policies:"),L.rowsecurity&&L.forcerowsecurity&&U>0&&C(g,"Policies (forced row security enabled):"),L.rowsecurity&&
!L.forcerowsecurity&&U==0&&C(g,"Policies (row security enabled): (none)"),L.rowsecurity&&L.forcerowsecurity&&U==0&&C(g,"\
Policies (forced row security enabled): (none)"),!L.rowsecurity&&U>0&&C(g,"Policies (row security disabled):"),E=0;E<U;E++)
b(e,'    POLICY "%s"',_(c,E,0)),_(c,E,1)[0]=="f"&&l(e," AS RESTRICTIVE"),ie(c,E,5)||p(e," FOR %s",_(c,E,5)),ie(c,E,2)||p(
e,`
      TO %s`,_(c,E,2)),ie(c,E,3)||p(e,`
      USING (%s)`,_(c,E,3)),ie(c,E,4)||p(e,`
      WITH CHECK (%s)`,_(c,E,4)),C(g,e.data)}if(o.sversion>=14e4){if(m(e,"Get extended statistics for this table"),p(e,`\
SELECT oid, stxrelid::pg_catalog.regclass, stxnamespace::pg_catalog.regnamespace::pg_catalog.text AS nsp, stxname,
pg_catalog.pg_get_statisticsobjdef_columns(oid) AS columns,
  'd' = any(stxkind) AS ndist_enabled,
  'f' = any(stxkind) AS deps_enabled,
  'm' = any(stxkind) AS mcv_enabled,
stxstattarget
FROM pg_catalog.pg_statistic_ext
WHERE stxrelid = '%s'
ORDER BY nsp, stxname;`,t),c=await W(e.data),c)U=v(c);else return i;if(U>0)for(C(g,"Statistics objects:"),E=0;E<U;E++){let h=!1,
H,k,ae,me,fe;H=D(_(c,E,5),"t")==0,k=D(_(c,E,6),"t")==0,ae=D(_(c,E,7),"t")==0,b(e,"    "),p(e,'"%s.%s"',_(c,E,2),_(c,E,3)),
me=H&&k&&ae,fe=H||k||ae,fe&&!me&&(l(e," ("),H&&(l(e,"ndistinct"),h=!0),k&&(p(e,"%sdependencies",h?", ":""),h=!0),ae&&p(e,
"%smcv",h?", ":""),X(e,")")),p(e," ON %s FROM %s",_(c,E,4),_(c,E,1)),!ie(c,E,8)&&D(_(c,E,8),"-1")!=0&&p(e,"; STATISTICS \
%s",_(c,E,8)),C(g,e.data)}}else if(o.sversion>=1e5){if(m(e,"Get extended statistics for this table"),l(e,`SELECT oid, st\
xrelid::pg_catalog.regclass, stxnamespace::pg_catalog.regnamespace AS nsp, stxname,
  (SELECT pg_catalog.string_agg(pg_catalog.quote_ident(attname),', ')
   FROM pg_catalog.unnest(stxkeys) s(attnum)
   JOIN pg_catalog.pg_attribute a ON (stxrelid = a.attrelid AND
        a.attnum = s.attnum AND NOT attisdropped)) AS columns,
  'd' = any(stxkind) AS ndist_enabled,
  'f' = any(stxkind) AS deps_enabled,
  'm' = any(stxkind) AS mcv_enabled,
`),o.sversion>=13e4?l(e,`  stxstattarget
`):l(e,`  -1 AS stxstattarget
`),p(e,`FROM pg_catalog.pg_statistic_ext
WHERE stxrelid = '%s'
ORDER BY 1;`,t),c=await W(e.data),c)U=v(c);else return i;if(U>0)for(C(g,"Statistics objects:"),E=0;E<U;E++){let h=!1;b(e,
"    "),p(e,'"%s.%s" (',_(c,E,2),_(c,E,3)),D(_(c,E,5),"t")==0&&(l(e,"ndistinct"),h=!0),D(_(c,E,6),"t")==0&&(p(e,"%sdepen\
dencies",h?", ":""),h=!0),D(_(c,E,7),"t")==0&&p(e,"%smcv",h?", ":""),p(e,") ON %s FROM %s",_(c,E,4),_(c,E,1)),D(_(c,E,8),
"-1")!=0&&p(e,"; STATISTICS %s",_(c,E,8)),C(g,e.data)}}if(L.hasrules&&L.relkind!="m"){if(m(e,"Get rules for this relatio\
n"),p(e,`SELECT r.rulename, trim(trailing ';' from pg_catalog.pg_get_ruledef(r.oid, true)), ev_enabled
FROM pg_catalog.pg_rewrite r
WHERE r.ev_class = '%s' ORDER BY 1;`,t),c=await W(e.data),c)U=v(c);else return i;if(U>0){let h,H;for(H=0;H<4;H++)for(h=!1,
E=0;E<U;E++){let k,ae=!1;switch(H){case 0:_(c,E,2)[0]=="O"&&(ae=!0);break;case 1:_(c,E,2)[0]=="D"&&(ae=!0);break;case 2:
_(c,E,2)[0]=="A"&&(ae=!0);break;case 3:_(c,E,2)[0]=="R"&&(ae=!0);break}if(ae){if(!h){switch(H){case 0:b(e,"Rules:");break;case 1:
b(e,"Disabled rules:");break;case 2:b(e,"Rules firing always:");break;case 3:b(e,"Rules firing on replica only:");break}
C(g,e.data),h=!0}k=_(c,E,1),k=k.slice(12),b(e,"    %s",k),C(g,e.data)}}}}if(o.sversion>=1e5){if(m(e,"Get publications th\
at publish this table"),o.sversion>=15e4?(p(e,`SELECT pubname
     , NULL
     , NULL
FROM pg_catalog.pg_publication p
     JOIN pg_catalog.pg_publication_namespace pn ON p.oid = pn.pnpubid
     JOIN pg_catalog.pg_class pc ON pc.relnamespace = pn.pnnspid
WHERE pc.oid ='%s' and pg_catalog.pg_relation_is_publishable('%s')
UNION
SELECT pubname
     , pg_catalog.pg_get_expr(pr.prqual, c.oid)
     , (CASE WHEN pr.prattrs IS NOT NULL THEN
         (SELECT pg_catalog.string_agg(attname, ', ')
           FROM pg_catalog.generate_series(0, pg_catalog.array_upper(pr.prattrs::pg_catalog.int2[], 1)) s,
                pg_catalog.pg_attribute
          WHERE attrelid = pr.prrelid AND attnum = prattrs[s])
        ELSE NULL END) FROM pg_catalog.pg_publication p
     JOIN pg_catalog.pg_publication_rel pr ON p.oid = pr.prpubid
     JOIN pg_catalog.pg_class c ON c.oid = pr.prrelid
WHERE pr.prrelid = '%s'
`,t,t,t),o.sversion>=19e4?p(e,` AND NOT pr.prexcept
UNION
SELECT pubname
     , NULL
     , NULL
FROM pg_catalog.pg_publication p
WHERE p.puballtables AND pg_catalog.pg_relation_is_publishable('%s')
     AND NOT EXISTS (
     SELECT 1
     FROM pg_catalog.pg_publication_rel pr
     WHERE pr.prpubid = p.oid AND
     (pr.prrelid = '%s' OR pr.prrelid = pg_catalog.pg_partition_root('%s')))
ORDER BY 1;`,t,t,t):p(e,`UNION
SELECT pubname
		, NULL
		, NULL
FROM pg_catalog.pg_publication p
WHERE p.puballtables AND pg_catalog.pg_relation_is_publishable('%s')
ORDER BY 1;`,t)):p(e,`SELECT pubname
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
ORDER BY 1;`,t,t),c=await W(e.data),c)U=v(c);else return i;for(U>0&&C(g,"Included in publications:"),E=0;E<U;E++)b(e,'  \
  "%s"',_(c,E,0)),ie(c,E,2)||p(e," (%s)",_(c,E,2)),ie(c,E,1)||p(e," WHERE %s",_(c,E,1)),C(g,e.data)}if(o.sversion>=19e4){
if(m(e,"Get publications that exclude this table"),p(e,`SELECT pubname
FROM pg_catalog.pg_publication p
JOIN pg_catalog.pg_publication_rel pr ON p.oid = pr.prpubid
WHERE (pr.prrelid = '%s' OR pr.prrelid = pg_catalog.pg_partition_root('%s'))
AND pr.prexcept
ORDER BY 1;`,t,t),c=await W(e.data),c)U=v(c);else return i;for(U>0&&C(g,"Excluded from publications:"),E=0;E<U;E++)b(e,'\
    "%s"',_(c,E,0)),C(g,e.data)}if(a){if(m(e,"Get not-null constraints for this table"),p(e,`SELECT c.conname, a.attname\
, c.connoinherit,
  c.conislocal, c.coninhcount <> 0,
  c.convalidated
FROM pg_catalog.pg_constraint c JOIN
  pg_catalog.pg_attribute a ON
    (a.attrelid = c.conrelid AND a.attnum = c.conkey[1])
WHERE c.contype = 'n' AND
  c.conrelid = '%s'::pg_catalog.regclass
ORDER BY a.attnum`,t),c=await W(e.data),c)U=v(c);else return i;for(U>0&&C(g,"Not-null constraints:"),E=0;E<U;E++){let h=_(
c,E,3)[0]=="t",H=_(c,E,4)[0]=="t",k=_(c,E,5)[0]=="t";b(e,'    "%s" NOT NULL "%s"%s%s',_(c,E,0),_(c,E,1),_(c,E,2)[0]=="t"?
" NO INHERIT":h&&H?" (local, inherited)":H?" (inherited)":"",k?"":" NOT VALID"),C(g,e.data)}}}if((L.relkind=="v"||L.relkind==
"m")&&a){let c;if(m(e,"Get view's definition"),p(e,"SELECT pg_catalog.pg_get_viewdef('%s'::pg_catalog.oid, true);",t),c=
await W(e.data),!c)return i;v(c)>0&&(u=_(c,0,0))}if(u!=null){let c=null;if(C(g,"View definition:"),C(g,u),L.hasrules){if(m(
e,"Get rules for this view"),p(e,`SELECT r.rulename, trim(trailing ';' from pg_catalog.pg_get_ruledef(r.oid, true))
FROM pg_catalog.pg_rewrite r
WHERE r.ev_class = '%s' AND r.rulename != '_RETURN' ORDER BY 1;`,t),c=await W(e.data),!c)return i;if(v(c)>0)for(C(g,"Rul\
es:"),E=0;E<v(c);E++){let U;U=_(c,E,1),U=U.slice(12),b(e," %s",U),C(g,e.data)}}}if(L.hastriggers){let c,U;if(m(e,"Get tr\
iggers for this relation"),l(e,`SELECT t.tgname, pg_catalog.pg_get_triggerdef(t.oid, true), t.tgenabled, t.tgisinternal,\

`),o.sversion>=13e4?l(e,`  CASE WHEN t.tgparentid != 0 THEN
    (SELECT u.tgrelid::pg_catalog.regclass
     FROM pg_catalog.pg_trigger AS u,
          pg_catalog.pg_partition_ancestors(t.tgrelid) WITH ORDINALITY AS a(relid, depth)
     WHERE u.tgname = t.tgname AND u.tgrelid = a.relid
           AND u.tgparentid = 0
     ORDER BY a.depth LIMIT 1)
  END AS parent
`):l(e,`  NULL AS parent
`),p(e,`FROM pg_catalog.pg_trigger t
WHERE t.tgrelid = '%s' AND `,t),o.sversion>=11e4&&o.sversion<15e4?l(e,`(NOT t.tgisinternal OR (t.tgisinternal AND t.tgen\
abled = 'D') 
    OR EXISTS (SELECT 1 FROM pg_catalog.pg_depend WHERE objid = t.oid 
        AND refclassid = 'pg_catalog.pg_trigger'::pg_catalog.regclass))`):l(e,"(NOT t.tgisinternal OR (t.tgisinternal AN\
D t.tgenabled = 'D'))"),l(e,`
ORDER BY 1;`),c=await W(e.data),c)U=v(c);else return i;if(U>0){let h,H;for(H=0;H<=4;H++)for(h=!1,E=0;E<U;E++){let k,ae,me,
fe,Ie;switch(fe=_(c,E,2),Ie=_(c,E,3),k=!1,H){case 0:(fe[0]=="O"||fe[0]=="t")&&(k=!0);break;case 1:(fe[0]=="D"||fe[0]=="f")&&
Ie[0]=="f"&&(k=!0);break;case 2:(fe[0]=="D"||fe[0]=="f")&&Ie[0]=="t"&&(k=!0);break;case 3:fe[0]=="A"&&(k=!0);break;case 4:
fe[0]=="R"&&(k=!0);break}if(k!=!1){if(h==!1){switch(H){case 0:b(e,"Triggers:");break;case 1:b(e,"Disabled user triggers:");
break;case 2:b(e,"Disabled internal triggers:");break;case 3:b(e,"Triggers firing always:");break;case 4:b(e,"Triggers f\
iring on replica only:");break}C(g,e.data),h=!0}ae=_(c,E,1),me=Me(ae," TRIGGER "),me!=null&&(ae=me.slice(9)),b(e,"    %s",
ae),ie(c,E,4)||p(e,", ON TABLE %s",_(c,E,4)),C(g,e.data)}}}}if(L.relkind=="r"||L.relkind=="m"||L.relkind=="f"||L.relkind==
"p"||L.relkind=="I"||L.relkind=="t"){let c,U,h;if(c=L.relkind=="p"||L.relkind=="I",L.relkind=="f"){let H;if(m(e,"Get for\
eign server for this table"),p(e,`SELECT s.srvname,
  pg_catalog.array_to_string(ARRAY(
    SELECT pg_catalog.quote_ident(option_name) || ' ' || pg_catalog.quote_literal(option_value)
    FROM pg_catalog.pg_options_to_table(ftoptions)),  ', ')
FROM pg_catalog.pg_foreign_table f,
     pg_catalog.pg_foreign_server s
WHERE f.ftrelid = '%s' AND s.oid = f.ftserver;`,t),U=await W(e.data),U){if(v(U)!=1)return i}else return i;b(e,"Server: %\
s",_(U,0,0)),C(g,e.data),H=_(U,0,1),H!=null&&H[0]!=null&&(b(e,"FDW options: (%s)",H),C(g,e.data))}if(m(e,"Get inheritanc\
e parent tables"),p(e,`SELECT c.oid::pg_catalog.regclass
FROM pg_catalog.pg_class c, pg_catalog.pg_inherits i
WHERE c.oid = i.inhparent AND i.inhrelid = '%s'
  AND c.relkind != 'p' AND c.relkind != 'I'
ORDER BY inhseqno;`,t),U=await W(e.data),U){let H="Inherits";for(h=v(U),h>0&&(b(e,"%s:",H),C(g,e.data)),E=0;E<h;E++)b(e,
"    %s",_(U,E,0)),C(g,e.data)}else return i;if(m(e,"Get child tables"),o.sversion>=14e4?p(e,`SELECT c.oid::pg_catalog.r\
egclass, c.relkind, inhdetachpending, pg_catalog.pg_get_expr(c.relpartbound, c.oid)
FROM pg_catalog.pg_class c, pg_catalog.pg_inherits i
WHERE c.oid = i.inhrelid AND i.inhparent = '%s'
ORDER BY pg_catalog.pg_get_expr(c.relpartbound, c.oid) = 'DEFAULT', c.oid::pg_catalog.regclass::pg_catalog.text;`,t):o.sversion>=
1e5?p(e,`SELECT c.oid::pg_catalog.regclass, c.relkind, false AS inhdetachpending, pg_catalog.pg_get_expr(c.relpartbound,\
 c.oid)
FROM pg_catalog.pg_class c, pg_catalog.pg_inherits i
WHERE c.oid = i.inhrelid AND i.inhparent = '%s'
ORDER BY pg_catalog.pg_get_expr(c.relpartbound, c.oid) = 'DEFAULT', c.oid::pg_catalog.regclass::pg_catalog.text;`,t):p(e,
`SELECT c.oid::pg_catalog.regclass, c.relkind, false AS inhdetachpending, NULL
FROM pg_catalog.pg_class c, pg_catalog.pg_inherits i
WHERE c.oid = i.inhrelid AND i.inhparent = '%s'
ORDER BY c.oid::pg_catalog.regclass::pg_catalog.text;`,t),U=await W(e.data),!U)return i;if(h=v(U),c&&h==0)b(e,"Number of\
 partitions: %d",h),C(g,e.data);else if(!a)h>0&&(c?b(e,"Number of partitions: %d (Use \\d+ to list them.)",h):b(e,"Numbe\
r of child tables: %d (Use \\d+ to list them.)",h),C(g,e.data));else{let H=c?"Partitions":"Child tables";for(h>0&&(b(e,"\
%s:",H),C(g,e.data)),E=0;E<h;E++){let k=_(U,E,1)[0];b(e,"    %s",_(U,E,0)),ie(U,E,3)||p(e," %s",_(U,E,3)),k=="p"||k=="I"?
l(e,", PARTITIONED"):k=="f"&&l(e,", FOREIGN"),D(_(U,E,2),"t")==0&&l(e," (DETACH PENDING)"),C(g,e.data)}}L.reloftype!=null&&
(b(e,"Typed table of type: %s",L.reloftype),C(g,e.data)),a&&(L.relkind=="r"||L.relkind=="m")&&L.relreplident!="i"&&(D(n,
"pg_catalog")!=0&&L.relreplident!="d"||D(n,"pg_catalog")==0&&L.relreplident!="n")&&(b(e,"%s: %s","Replica Identity",L.relreplident==
"f"?"FULL":L.relreplident=="n"?"NOTHING":"???"),C(g,e.data)),a&&L.relkind!="m"&&L.hasoids&&C(g,"Has OIDs: yes"),await rt(
g,L.relkind,L.tablespace,!0),a&&L.relam!=null&&!o.hide_tableam&&(b(e,"Access method: %s",L.relam),C(g,e.data))}return a&&
L.reloptions!=null&&L.reloptions[0]!=null&&(b(e,"%s: %s","Options",L.reloptions),C(g,e.data)),Be(g,o.queryFout,!1,o.logfile),
i=!0,i}async function rt(n,s,t,a){if((s=="r"||s=="m"||s=="i"||s=="p"||s=="I"||s=="t")&&t!=0){let i=null,e={};if(y(e),m(e,
"Get tablespace information for this relation"),p(e,`SELECT spcname FROM pg_catalog.pg_tablespace
WHERE oid = '%u';`,t),i=await W(e.data),!i)return;v(i)>0&&(a?(b(e,'Tablespace: "%s"',_(i,0,0)),C(n,e.data)):(b(e,"%s",n.
footer.data),p(e,', tablespace "%s"',_(i,0,0)),pn(n,e.data)))}}async function Yt(n,s,t){let a={},i,e={},r=Je(o.popt.topt),
d=2,g=0,N,E,u="l",A;if(r.default_footer=!1,y(a),m(a,"Get matching roles"),l(a,`SELECT r.rolname, r.rolsuper, r.rolinheri\
t,
  r.rolcreaterole, r.rolcreatedb, r.rolcanlogin,
  r.rolconnlimit, r.rolvaliduntil`),s&&(l(a,`
, pg_catalog.shobj_description(r.oid, 'pg_authid') AS description`),d++),l(a,`
, r.rolreplication`),o.sversion>=90500&&l(a,`
, r.rolbypassrls`),l(a,`
FROM pg_catalog.pg_roles r
`),!t&&n==null&&l(a,`WHERE r.rolname !~ '^pg_'
`),!Y(a,n,!1,!1,null,"r.rolname",null,null,null,1)||(l(a,"ORDER BY 1;"),i=await W(a.data),!i))return!1;for(g=v(i),A=[],je(
e,r,"List of roles",d,g),ce(e,"Role name",!0,u),ce(e,"Attributes",!0,u),s&&ce(e,"Description",!0,u),N=0;N<g;N++)$(e,_(i,
N,0),!1,!1),nt(a),D(_(i,N,1),"t")==0&&We(a,"Superuser"),D(_(i,N,2),"t")!=0&&We(a,"No inheritance"),D(_(i,N,3),"t")==0&&We(
a,"Create role"),D(_(i,N,4),"t")==0&&We(a,"Create DB"),D(_(i,N,5),"t")!=0&&We(a,"Cannot login"),D(_(i,N,s?9:8),"t")==0&&
We(a,"Replication"),o.sversion>=90500&&D(_(i,N,s?10:9),"t")==0&&We(a,"Bypass RLS"),E=Ft(_(i,N,6)),E>=0&&(a.len>0&&X(a,`
`),E==0?l(a,"No connections"):p(a,Dn("%d connection","%d connections",E),E)),D(_(i,N,7),"")!=0&&(a.len>0&&X(a,`
`),l(a,"Password valid until "),l(a,_(i,N,7))),A[N]=a.data,$(e,A[N],!1,!1),s&&$(e,_(i,N,8),!1,!1);return Be(e,o.queryFout,
!1,o.logfile),!0}function We(n,s){n.len>0&&l(n,", "),l(n,s)}async function Sa(n,s){let t={},a,i=I(o.popt),e={};return y(
t),m(t,"Get per-database and per-role settings"),p(t,`SELECT rolname AS "%s", datname AS "%s",
pg_catalog.array_to_string(setconfig, E'\\n') AS "%s"
FROM pg_catalog.pg_db_role_setting s
LEFT JOIN pg_catalog.pg_database d ON d.oid = setdatabase
LEFT JOIN pg_catalog.pg_roles r ON r.oid = setrole
`,"Role","Database","Settings"),!Y(t,n,!1,!1,null,"r.rolname",null,null,e,1)||!Y(t,s,e.value,!1,null,"d.datname",null,null,
null,1)||(l(t,"ORDER BY 1, 2;"),a=await W(t.data),!a)?!1:(v(a)==0&&!o.quiet?n!=null&&s!=null?K('Did not find any setting\
s for role "%s" and database "%s".',n,s):n!=null?K('Did not find any settings for role "%s".',n):K("Did not find any set\
tings."):(i.title="List of settings",i.translate_header=!0,x(a,i,o.queryFout,!1,o.logfile)),!0)}async function Ua(n,s){let t={},
a,i=I(o.popt);return y(t),m(t,"Get matching role grants"),p(t,`SELECT m.rolname AS "%s", r.rolname AS "%s",
  pg_catalog.concat_ws(', ',
`,"Role name","Member of"),o.sversion>=16e4?l(t,`    CASE WHEN pam.admin_option THEN 'ADMIN' END,
    CASE WHEN pam.inherit_option THEN 'INHERIT' END,
    CASE WHEN pam.set_option THEN 'SET' END
`):l(t,`    CASE WHEN pam.admin_option THEN 'ADMIN' END,
    CASE WHEN m.rolinherit THEN 'INHERIT' END,
    'SET'
`),p(t,`  ) AS "%s",
  g.rolname AS "%s"
`,"Options","Grantor"),l(t,`FROM pg_catalog.pg_roles m
     JOIN pg_catalog.pg_auth_members pam ON (pam.member = m.oid)
     LEFT JOIN pg_catalog.pg_roles r ON (pam.roleid = r.oid)
     LEFT JOIN pg_catalog.pg_roles g ON (pam.grantor = g.oid)
`),!s&&n==null&&l(t,`WHERE m.rolname !~ '^pg_'
`),!Y(t,n,!1,!1,null,"m.rolname",null,null,null,1)||(l(t,`ORDER BY 1, 2, 4;
`),a=await W(t.data),!a)?!1:(i.title="List of role grants",i.translate_header=!0,x(a,i,o.queryFout,!1,o.logfile),!0)}async function Kt(n,s,t,a){
let i=J(n,"t")!=null,e=J(n,"i")!=null,r=J(n,"v")!=null,d=J(n,"m")!=null,g=J(n,"s")!=null,N=J(n,"E")!=null,E,u={},A,R=I(o.
popt),w,S=[!1,!1,!0,!1,!1,!1,!1,!1,!1];return E=i+e+r+d+g+N,E==0&&(i=r=d=g=N=!0),y(u),m(u,"Get matching relations"),p(u,
`SELECT n.nspname as "%s",
  c.relname as "%s",
  CASE c.relkind WHEN 'r' THEN '%s' WHEN 'v' THEN '%s' WHEN 'm' THEN '%s' WHEN 'i' THEN '%s' WHEN 'S' THEN '%s' WHEN 't'\
 THEN '%s' WHEN 'f' THEN '%s' WHEN 'p' THEN '%s' WHEN 'I' THEN '%s' END as "%s",
  pg_catalog.pg_get_userbyid(c.relowner) as "%s"`,"Schema","Name","table","view","materialized view","index","sequence",
"TOAST table","foreign table","partitioned table","partitioned index","Type","Owner"),w=4,e&&(p(u,`,
  c2.relname as "%s"`,"Table"),w++),t&&(p(u,`,
  CASE c.relpersistence WHEN 'p' THEN '%s' WHEN 't' THEN '%s' WHEN 'u' THEN '%s' END as "%s"`,"permanent","temporary","u\
nlogged","Persistence"),S[w]=!0,o.sversion>=12e4&&!o.hide_tableam&&(i||d||e)&&p(u,`,
  am.amname as "%s"`,"Access method"),p(u,`,
  pg_catalog.pg_size_pretty(pg_catalog.pg_table_size(c.oid)) as "%s",
  pg_catalog.obj_description(c.oid, 'pg_class') as "%s"`,"Size","Description")),l(u,`
FROM pg_catalog.pg_class c
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace`),o.sversion>=12e4&&!o.hide_tableam&&(i||d||e)&&l(u,`\

     LEFT JOIN pg_catalog.pg_am am ON am.oid = c.relam`),e&&l(u,`
     LEFT JOIN pg_catalog.pg_index i ON i.indexrelid = c.oid
     LEFT JOIN pg_catalog.pg_class c2 ON i.indrelid = c2.oid`),l(u,`
WHERE c.relkind IN (`),i&&(l(u,"'r','p',"),(a||s!=null)&&l(u,"'t',")),r&&l(u,"'v',"),d&&l(u,"'m',"),e&&l(u,"'i','I',"),g&&
l(u,"'S',"),(a||s!=null)&&l(u,"'s',"),N&&l(u,"'f',"),l(u,"''"),l(u,`)
`),!a&&s==null&&l(u,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname !~ '^pg_toast'
      AND n.nspname <> 'information_schema'
`),!Y(u,s,!0,!1,"n.nspname","c.relname",null,"pg_catalog.pg_table_is_visible(c.oid)",null,3)||(l(u,"ORDER BY 1,2;"),A=await W(
u.data),!A)?!1:(v(A)==0&&!o.quiet?s!=null?E!=1?K('Did not find any relations named "%s".',s):i?K('Did not find any table\
s named "%s".',s):e?K('Did not find any indexes named "%s".',s):r?K('Did not find any views named "%s".',s):d?K('Did not\
 find any materialized views named "%s".',s):g?K('Did not find any sequences named "%s".',s):N?K('Did not find any forei\
gn tables named "%s".',s):mt('Did not find any ??? named "%s".',s):E!=1?K("Did not find any relations."):i?K("Did not fi\
nd any tables."):e?K("Did not find any indexes."):r?K("Did not find any views."):d?K("Did not find any materialized view\
s."):g?K("Did not find any sequences."):N?K("Did not find any foreign tables."):mt("Did not find any ??? relations."):(R.
title=E!=1?"List of relations":i?"List of tables":e?"List of indexes":r?"List of views":d?"List of materialized views":g?
"List of sequences":N?"List of foreign tables":"List of ???",R.translate_header=!0,R.translate_columns=S,R.n_translate_columns=
ee(S),x(A,R,o.queryFout,!1,o.logfile)),!0)}async function Aa(n,s,t){let a=J(n,"t")!=null,i=J(n,"i")!=null,e=J(n,"n")!=null,
r={},d={},g,N=I(o.popt),E=[!1,!1,!1,!1,!1,!1,!1,!1,!1,!1],u,A=!1;if(o.sversion<1e5){let R="";return K("The server (versi\
on %s) does not support declarative table partitioning.",Oe(o.sversion,!1,R,Ue(R))),!0}return!a&&!i&&(a=i=!0),i&&!a?u="L\
ist of partitioned indexes":a&&!i?u="List of partitioned tables":(u="List of partitioned relations",A=!0),y(r),m(r,"Get \
matching partitioned relations"),p(r,`SELECT n.nspname as "%s",
  c.relname as "%s",
  pg_catalog.pg_get_userbyid(c.relowner) as "%s"`,"Schema","Name","Owner"),A&&(p(r,`,
  CASE c.relkind WHEN 'p' THEN '%s' WHEN 'I' THEN '%s' END as "%s"`,"partitioned table","partitioned index","Type"),E[3]=
!0),(e||s!=null)&&p(r,`,
  inh.inhparent::pg_catalog.regclass as "%s"`,"Parent name"),i&&p(r,`,
 c2.oid::pg_catalog.regclass as "%s"`,"Table"),t&&(p(r,`,
  am.amname as "%s"`,"Access method"),e&&p(r,`,
  s.dps as "%s"`,"Leaf partition size"),p(r,`,
  s.tps as "%s"`,"Total size"),p(r,`,
  pg_catalog.obj_description(c.oid, 'pg_class') as "%s"`,"Description")),l(r,`
FROM pg_catalog.pg_class c
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace`),i&&l(r,`
     LEFT JOIN pg_catalog.pg_index i ON i.indexrelid = c.oid
     LEFT JOIN pg_catalog.pg_class c2 ON i.indrelid = c2.oid`),(e||s!=null)&&l(r,`
     LEFT JOIN pg_catalog.pg_inherits inh ON c.oid = inh.inhrelid`),t&&(l(r,`
     LEFT JOIN pg_catalog.pg_am am ON c.relam = am.oid`),o.sversion<12e4?l(r,`,
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
               FROM d) s`):l(r,`,
     LATERAL (SELECT pg_catalog.pg_size_pretty(sum(
                 CASE WHEN ppt.isleaf AND ppt.level = 1
                      THEN pg_catalog.pg_table_size(ppt.relid) ELSE 0 END)) AS dps,
                     pg_catalog.pg_size_pretty(sum(pg_catalog.pg_table_size(ppt.relid))) AS tps
              FROM pg_catalog.pg_partition_tree(c.oid) ppt) s`)),l(r,`
WHERE c.relkind IN (`),a&&l(r,"'p',"),i&&l(r,"'I',"),l(r,"''"),l(r,`)
`),l(r,!e&&s==null?` AND NOT c.relispartition
`:""),s==null&&l(r,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname !~ '^pg_toast'
      AND n.nspname <> 'information_schema'
`),!Y(r,s,!0,!1,"n.nspname","c.relname",null,"pg_catalog.pg_table_is_visible(c.oid)",null,3)||(p(r,'ORDER BY "Schema", %\
s%s"Name";',A?'"Type" DESC, ':"",e||s!=null?'"Parent name" NULLS FIRST, ':""),g=await W(r.data),!g)?!1:(y(d),l(d,u),N.title=
d.data,N.translate_header=!0,N.translate_columns=E,N.n_translate_columns=ee(E),x(g,N,o.queryFout,!1,o.logfile),!0)}async function Wa(n,s,t){
let a={},i,e=I(o.popt);return y(a),m(a,"Get matching procedural languages"),p(a,`SELECT l.lanname AS "%s",
       pg_catalog.pg_get_userbyid(l.lanowner) as "%s",
       l.lanpltrusted AS "%s"`,"Name","Owner","Trusted"),s&&(p(a,`,
       NOT l.lanispl AS "%s",
       l.lanplcallfoid::pg_catalog.regprocedure AS "%s",
       l.lanvalidator::pg_catalog.regprocedure AS "%s",
       l.laninline::pg_catalog.regprocedure AS "%s",
       `,"Internal language","Call handler","Validator","Inline handler"),Re(a,"l.lanacl")),p(a,`,
       d.description AS "%s"
FROM pg_catalog.pg_language l
LEFT JOIN pg_catalog.pg_description d
  ON d.classoid = l.tableoid AND d.objoid = l.oid
  AND d.objsubid = 0
`,"Description"),n!=null&&!Y(a,n,!1,!1,null,"l.lanname",null,null,null,2)||(!t&&n==null&&l(a,`WHERE l.lanplcallfoid != 0\

`),l(a,"ORDER BY 1;"),i=await W(a.data),!i)?!1:(e.title="List of languages",e.translate_header=!0,x(i,e,o.queryFout,!1,o.
logfile),!0)}async function ba(n,s,t){let a={},i,e=I(o.popt);return y(a),m(a,"Get matching domains"),p(a,`SELECT n.nspna\
me as "%s",
       t.typname as "%s",
       pg_catalog.format_type(t.typbasetype, t.typtypmod) as "%s",
       (SELECT c.collname FROM pg_catalog.pg_collation c, pg_catalog.pg_type bt
        WHERE c.oid = t.typcollation AND bt.oid = t.typbasetype AND t.typcollation <> bt.typcollation) as "%s",
       CASE WHEN t.typnotnull THEN 'not null' END as "%s",
       t.typdefault as "%s",
       pg_catalog.array_to_string(ARRAY(
         SELECT pg_catalog.pg_get_constraintdef(r.oid, true) FROM pg_catalog.pg_constraint r WHERE t.oid = r.contypid AN\
D r.contype = 'c' ORDER BY r.conname
       ), ' ') as "%s"`,"Schema","Name","Type","Collation","Nullable","Default","Check"),s&&(l(a,`,
  `),Re(a,"t.typacl"),p(a,`,
       d.description as "%s"`,"Description")),l(a,`
FROM pg_catalog.pg_type t
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = t.typnamespace
`),s&&l(a,`     LEFT JOIN pg_catalog.pg_description d ON d.classoid = t.tableoid AND d.objoid = t.oid AND d.objsubid = 0\

`),l(a,`WHERE t.typtype = 'd'
`),!t&&n==null&&l(a,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!Y(a,n,!0,!1,"n.nspname","t.typname",null,"pg_catalog.pg_type_is_visible(t.oid)",null,3)||(l(a,"ORDER BY 1, 2;"),i=await W(
a.data),!i)?!1:(e.title="List of domains",e.translate_header=!0,x(i,e,o.queryFout,!1,o.logfile),!0)}async function Ta(n,s,t){
let a={},i,e=I(o.popt),r=[!1,!1,!1,!1,!0,!1];return y(a),m(a,"Get matching conversions"),p(a,`SELECT n.nspname AS "%s",
       c.conname AS "%s",
       pg_catalog.pg_encoding_to_char(c.conforencoding) AS "%s",
       pg_catalog.pg_encoding_to_char(c.contoencoding) AS "%s",
       CASE WHEN c.condefault THEN '%s'
       ELSE '%s' END AS "%s"`,"Schema","Name","Source","Destination","yes","no","Default?"),s&&p(a,`,
       d.description AS "%s"`,"Description"),l(a,`
FROM pg_catalog.pg_conversion c
     JOIN pg_catalog.pg_namespace n ON n.oid = c.connamespace
`),s&&l(a,`LEFT JOIN pg_catalog.pg_description d ON d.classoid = c.tableoid
          AND d.objoid = c.oid AND d.objsubid = 0
`),l(a,`WHERE true
`),!t&&n==null&&l(a,`  AND n.nspname <> 'pg_catalog'
  AND n.nspname <> 'information_schema'
`),!Y(a,n,!0,!1,"n.nspname","c.conname",null,"pg_catalog.pg_conversion_is_visible(c.oid)",null,3)||(l(a,"ORDER BY 1, 2;"),
i=await W(a.data),!i)?!1:(e.title="List of conversions",e.translate_header=!0,e.translate_columns=r,e.n_translate_columns=
ee(r),x(i,e,o.queryFout,!1,o.logfile),!0)}async function ya(n,s,t){let a={},i,e=I(o.popt);return y(a),m(a,"Get matching \
configuration parameters"),p(a,'SELECT s.name AS "%s", pg_catalog.current_setting(s.name) AS "%s"',"Parameter","Value"),
s&&(p(a,', s.vartype AS "%s", s.context AS "%s", ',"Type","Context"),o.sversion>=15e4?Re(a,"p.paracl"):p(a,'NULL AS "%s"',
"Access privileges")),l(a,`
FROM pg_catalog.pg_settings s
`),s&&o.sversion>=15e4&&l(a,`  LEFT JOIN pg_catalog.pg_parameter_acl p
  ON pg_catalog.lower(s.name) = p.parname
`),n!=null?wt(o.db,a,n,!1,!1,null,"pg_catalog.lower(s.name)",null,null,null,null):l(a,`WHERE s.source <> 'default' AND
      s.setting IS DISTINCT FROM s.boot_val
`),l(a,"ORDER BY 1;"),i=await W(a.data),i?(n!=null?e.title="List of configuration parameters":e.title="List of non-defau\
lt configuration parameters",e.translate_header=!0,x(i,e,o.queryFout,!1,o.logfile),!0):!1}async function ha(n,s){let t={},
a,i=I(o.popt),e=[!1,!1,!1,!0,!1,!1,!1];if(o.sversion<90300){let r="";return K("The server (version %s) does not support \
event triggers.",Oe(o.sversion,!1,r,Ue(r))),!0}return y(t),m(t,"Get matching event triggers"),p(t,`SELECT evtname as "%s\
", evtevent as "%s", pg_catalog.pg_get_userbyid(e.evtowner) as "%s",
 case evtenabled when 'O' then '%s'  when 'R' then '%s'  when 'A' then '%s'  when 'D' then '%s' end as "%s",
 e.evtfoid::pg_catalog.regproc as "%s", pg_catalog.array_to_string(array(select x from pg_catalog.unnest(evttags) as t(x\
)), ', ') as "%s"`,"Name","Event","Owner","enabled","replica","always","disabled","Enabled","Function","Tags"),s&&p(t,`,\

pg_catalog.obj_description(e.oid, 'pg_event_trigger') as "%s"`,"Description"),l(t,`
FROM pg_catalog.pg_event_trigger e `),!Y(t,n,!1,!1,null,"evtname",null,null,null,1)||(l(t,"ORDER BY 1"),a=await W(t.data),
!a)?!1:(i.title="List of event triggers",i.translate_header=!0,i.translate_columns=e,i.n_translate_columns=ee(e),x(a,i,o.
queryFout,!1,o.logfile),!0)}async function Ya(n,s){let t={},a,i=I(o.popt);if(o.sversion<1e5){let e="";return K("The serv\
er (version %s) does not support extended statistics.",Oe(o.sversion,!1,e,Ue(e))),!0}return y(t),m(t,"Get matching exten\
ded statistics"),p(t,`SELECT 
es.stxnamespace::pg_catalog.regnamespace::pg_catalog.text AS "%s", 
es.stxname AS "%s", 
`,"Schema","Name"),o.sversion>=14e4?p(t,`pg_catalog.format('%%s FROM %%s', 
  pg_catalog.pg_get_statisticsobjdef_columns(es.oid), 
  es.stxrelid::pg_catalog.regclass) AS "%s"`,"Definition"):p(t,`pg_catalog.format('%%s FROM %%s', 
  (SELECT pg_catalog.string_agg(pg_catalog.quote_ident(a.attname),', ') 
   FROM pg_catalog.unnest(es.stxkeys) s(attnum) 
   JOIN pg_catalog.pg_attribute a 
   ON (es.stxrelid = a.attrelid 
   AND a.attnum = s.attnum 
   AND NOT a.attisdropped)), 
es.stxrelid::pg_catalog.regclass) AS "%s"`,"Definition"),p(t,`,
CASE WHEN 'd' = any(es.stxkind) THEN 'defined' 
END AS "%s", 
CASE WHEN 'f' = any(es.stxkind) THEN 'defined' 
END AS "%s"`,"Ndistinct","Dependencies"),o.sversion>=12e4&&p(t,`,
CASE WHEN 'm' = any(es.stxkind) THEN 'defined' 
END AS "%s" `,"MCV"),s&&p(t,`, 
pg_catalog.obj_description(oid, 'pg_statistic_ext') AS "%s"
`,"Description"),l(t,` 
FROM pg_catalog.pg_statistic_ext es 
`),!Y(t,n,!1,!1,"es.stxnamespace::pg_catalog.regnamespace::pg_catalog.text","es.stxname",null,"pg_catalog.pg_statistics_\
obj_is_visible(es.oid)",null,3)||(l(t,"ORDER BY 1, 2;"),a=await W(t.data),!a)?!1:(i.title="List of extended statistics",
i.translate_header=!0,x(a,i,o.queryFout,!1,o.logfile),!0)}async function Ka(n,s){let t={},a,i=I(o.popt),e=[!1,!1,!1,!0,!0,
!1];return y(t),m(t,"Get matching casts"),p(t,`SELECT pg_catalog.format_type(castsource, NULL) AS "%s",
       pg_catalog.format_type(casttarget, NULL) AS "%s",
`,"Source type","Target type"),p(t,`       CASE WHEN c.castmethod = '%c' THEN '(binary coercible)'
            WHEN c.castmethod = '%c' THEN '(with inout)'
            ELSE p.proname
       END AS "%s",
`,"b","i","Function"),p(t,`       CASE WHEN c.castcontext = '%c' THEN '%s'
            WHEN c.castcontext = '%c' THEN '%s'
            ELSE '%s'
       END AS "%s"`,"e","no","a","in assignment","yes","Implicit?"),s&&p(t,`,
       CASE WHEN p.proleakproof THEN '%s'
            ELSE '%s'
       END AS "%s",
       d.description AS "%s"`,"yes","no","Leakproof?","Description"),l(t,`
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
`),s&&l(t,`     LEFT JOIN pg_catalog.pg_description d
     ON d.classoid = c.tableoid AND d.objoid = c.oid AND d.objsubid = 0
`),l(t,"WHERE ( (true"),!Y(t,n,!0,!1,"ns.nspname","ts.typname","pg_catalog.format_type(ts.oid, NULL)","pg_catalog.pg_typ\
e_is_visible(ts.oid)",null,3)||(l(t,") OR (true"),!Y(t,n,!0,!1,"nt.nspname","tt.typname","pg_catalog.format_type(tt.oid,\
 NULL)","pg_catalog.pg_type_is_visible(tt.oid)",null,3))||(l(t,`) )
ORDER BY 1, 2;`),a=await W(t.data),!a)?!1:(i.title="List of casts",i.translate_header=!0,i.translate_columns=e,i.n_translate_columns=
ee(e),x(a,i,o.queryFout,!1,o.logfile),!0)}async function Ca(n,s,t){let a={},i,e=I(o.popt),r=[!1,!1,!1,!1,!1,!1,!1,!0,!1];
return y(a),m(a,"Get matching collations"),p(a,`SELECT
  n.nspname AS "%s",
  c.collname AS "%s",
`,"Schema","Name"),o.sversion>=1e5?p(a,`  CASE c.collprovider WHEN 'd' THEN 'default' WHEN 'b' THEN 'builtin' WHEN 'c' T\
HEN 'libc' WHEN 'i' THEN 'icu' END AS "%s",
`,"Provider"):p(a,`  'libc' AS "%s",
`,"Provider"),p(a,`  c.collcollate AS "%s",
  c.collctype AS "%s",
`,"Collate","Ctype"),o.sversion>=17e4?p(a,`  c.colllocale AS "%s",
`,"Locale"):o.sversion>=15e4?p(a,`  c.colliculocale AS "%s",
`,"Locale"):p(a,`  c.collcollate AS "%s",
`,"Locale"),o.sversion>=16e4?p(a,`  c.collicurules AS "%s",
`,"ICU Rules"):p(a,`  NULL AS "%s",
`,"ICU Rules"),o.sversion>=12e4?p(a,`  CASE WHEN c.collisdeterministic THEN '%s' ELSE '%s' END AS "%s"`,"yes","no","Dete\
rministic?"):p(a,`  '%s' AS "%s"`,"yes","Deterministic?"),s&&p(a,`,
  pg_catalog.obj_description(c.oid, 'pg_collation') AS "%s"`,"Description"),l(a,`
FROM pg_catalog.pg_collation c, pg_catalog.pg_namespace n
WHERE n.oid = c.collnamespace
`),!t&&n==null&&l(a,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),l(a,`      AND c.collencoding IN (-1, pg_catalog.pg_char_to_encoding(pg_catalog.getdatabaseencoding()))
`),!Y(a,n,!0,!1,"n.nspname","c.collname",null,"pg_catalog.pg_collation_is_visible(c.oid)",null,3)||(l(a,"ORDER BY 1, 2;"),
i=await W(a.data),!i)?!1:(e.title="List of collations",e.translate_header=!0,e.translate_columns=r,e.n_translate_columns=
ee(r),x(i,e,o.queryFout,!1,o.logfile),!0)}async function wa(n,s,t){let a={},i,e=I(o.popt),r=0,d=null;if(y(a),m(a,"Get ma\
tching schemas"),p(a,`SELECT n.nspname AS "%s",
  pg_catalog.pg_get_userbyid(n.nspowner) AS "%s"`,"Name","Owner"),s&&(l(a,`,
  `),Re(a,"n.nspacl"),p(a,`,
  pg_catalog.obj_description(n.oid, 'pg_namespace') AS "%s"`,"Description")),l(a,`
FROM pg_catalog.pg_namespace n
`),!t&&n==null&&l(a,`WHERE n.nspname !~ '^pg_' AND n.nspname <> 'information_schema'
`),!Y(a,n,!t&&n==null,!1,null,"n.nspname",null,null,null,2)||(l(a,"ORDER BY 1;"),i=await W(a.data),!i))return!1;if(e.title=
"List of schemas",e.translate_header=!0,n!=null&&o.sversion>=15e4){let g,N;if(m(a,"Get publications that publish this sc\
hema"),p(a,`SELECT pubname 
FROM pg_catalog.pg_publication p
     JOIN pg_catalog.pg_publication_namespace pn ON p.oid = pn.pnpubid
     JOIN pg_catalog.pg_namespace n ON n.oid = pn.pnnspid 
WHERE n.nspname = '%s'
ORDER BY 1`,n),g=await W(a.data),g)r=v(g);else return!1;if(r>0){for(d=[],d[0]="Included in publications:",N=0;N<r;N++)b(
a,'    "%s"',_(g,N,0)),d[N+1]=a.data;d[N+1]=null,e.footers=d}}return x(i,e,o.queryFout,!1,o.logfile),!0}async function Va(n,s){
let t={},a,i=I(o.popt);return s?await Ha(n):(y(t),m(t,"Get matching text search parsers"),p(t,`SELECT
  n.nspname as "%s",
  p.prsname as "%s",
  pg_catalog.obj_description(p.oid, 'pg_ts_parser') as "%s"
FROM pg_catalog.pg_ts_parser p
LEFT JOIN pg_catalog.pg_namespace n ON n.oid = p.prsnamespace
`,"Schema","Name","Description"),!Y(t,n,!1,!1,"n.nspname","p.prsname",null,"pg_catalog.pg_ts_parser_is_visible(p.oid)",null,
3)||(l(t,"ORDER BY 1, 2;"),a=await W(t.data),!a)?!1:(i.title="List of text search parsers",i.translate_header=!0,x(a,i,o.
queryFout,!1,o.logfile),!0))}async function Ha(n){let s={},t,a;if(y(s),m(s,"Get matching text search parsers"),l(s,`SELE\
CT p.oid,
  n.nspname,
  p.prsname
FROM pg_catalog.pg_ts_parser p
LEFT JOIN pg_catalog.pg_namespace n ON n.oid = p.prsnamespace
`),!Y(s,n,!1,!1,"n.nspname","p.prsname",null,"pg_catalog.pg_ts_parser_is_visible(p.oid)",null,3)||(l(s,"ORDER BY 1, 2;"),
t=await W(s.data),!t))return!1;if(v(t)==0)return o.quiet||(n!=null?K('Did not find any text search parser named "%s".',n):
K("Did not find any text search parsers.")),!1;for(a=0;a<v(t);a++){let i,e=null,r;if(i=_(t,a,0),ie(t,a,1)||(e=_(t,a,1)),
r=_(t,a,2),!await va(i,e,r)||j)return!1}return!0}async function va(n,s,t){let a={},i,e={},r=I(o.popt),d=[!0,!1,!1];return y(
a),m(a,"Get text search parser details"),p(a,`SELECT '%s' AS "%s",
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
 WHERE p.oid = '%s';`,"Start parse","Method","Function","Description",n,"Get next token",n,"End parse",n,"Get headline",
n,"Get token types",n),i=await W(a.data),!i||(y(e),s!=null?b(e,'Text search parser "%s.%s"',s,t):b(e,'Text search parser\
 "%s"',t),r.title=e.data,r.footers=null,r.topt.default_footer=!1,r.translate_header=!0,r.translate_columns=d,r.n_translate_columns=
ee(d),x(i,r,o.queryFout,!1,o.logfile),y(a),m(a,"Get text search parser token types"),p(a,`SELECT t.alias as "%s",
  t.description as "%s"
FROM pg_catalog.ts_token_type( '%s'::pg_catalog.oid ) as t
ORDER BY 1;`,"Token name","Description",n),i=await W(a.data),!i)?!1:(s!=null?b(e,'Token types for parser "%s.%s"',s,t):b(
e,'Token types for parser "%s"',t),r.title=e.data,r.footers=null,r.topt.default_footer=!0,r.translate_header=!0,r.translate_columns=
null,r.n_translate_columns=0,x(i,r,o.queryFout,!1,o.logfile),!0)}async function Fa(n,s){let t={},a,i=I(o.popt);return y(
t),m(t,"Get matching text search dictionaries"),p(t,`SELECT
  n.nspname as "%s",
  d.dictname as "%s",
`,"Schema","Name"),s&&p(t,`  ( SELECT COALESCE(nt.nspname, '(null)')::pg_catalog.text || '.' || t.tmplname FROM
    pg_catalog.pg_ts_template t
    LEFT JOIN pg_catalog.pg_namespace nt ON nt.oid = t.tmplnamespace
    WHERE d.dicttemplate = t.oid ) AS  "%s",
  d.dictinitoption as "%s",
`,"Template","Init options"),p(t,`  pg_catalog.obj_description(d.oid, 'pg_ts_dict') as "%s"
`,"Description"),l(t,`FROM pg_catalog.pg_ts_dict d
LEFT JOIN pg_catalog.pg_namespace n ON n.oid = d.dictnamespace
`),!Y(t,n,!1,!1,"n.nspname","d.dictname",null,"pg_catalog.pg_ts_dict_is_visible(d.oid)",null,3)||(l(t,"ORDER BY 1, 2;"),
a=await W(t.data),!a)?!1:(i.title="List of text search dictionaries",i.translate_header=!0,x(a,i,o.queryFout,!1,o.logfile),
!0)}async function xa(n,s){let t={},a,i=I(o.popt);return y(t),m(t,"Get matching text search templates"),s?p(t,`SELECT
  n.nspname AS "%s",
  t.tmplname AS "%s",
  t.tmplinit::pg_catalog.regproc AS "%s",
  t.tmpllexize::pg_catalog.regproc AS "%s",
  pg_catalog.obj_description(t.oid, 'pg_ts_template') AS "%s"
`,"Schema","Name","Init","Lexize","Description"):p(t,`SELECT
  n.nspname AS "%s",
  t.tmplname AS "%s",
  pg_catalog.obj_description(t.oid, 'pg_ts_template') AS "%s"
`,"Schema","Name","Description"),l(t,`FROM pg_catalog.pg_ts_template t
LEFT JOIN pg_catalog.pg_namespace n ON n.oid = t.tmplnamespace
`),!Y(t,n,!1,!1,"n.nspname","t.tmplname",null,"pg_catalog.pg_ts_template_is_visible(t.oid)",null,3)||(l(t,"ORDER BY 1, 2\
;"),a=await W(t.data),!a)?!1:(i.title="List of text search templates",i.translate_header=!0,x(a,i,o.queryFout,!1,o.logfile),
!0)}async function Ia(n,s){let t={},a,i=I(o.popt);return s?await Ma(n):(y(t),m(t,"Get matching text search configuration\
s"),p(t,`SELECT
   n.nspname as "%s",
   c.cfgname as "%s",
   pg_catalog.obj_description(c.oid, 'pg_ts_config') as "%s"
FROM pg_catalog.pg_ts_config c
LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.cfgnamespace
`,"Schema","Name","Description"),!Y(t,n,!1,!1,"n.nspname","c.cfgname",null,"pg_catalog.pg_ts_config_is_visible(c.oid)",null,
3)||(l(t,"ORDER BY 1, 2;"),a=await W(t.data),!a)?!1:(i.title="List of text search configurations",i.translate_header=!0,
x(a,i,o.queryFout,!1,o.logfile),!0))}async function Ma(n){let s={},t,a;if(y(s),m(s,"Get matching text search configurati\
ons"),l(s,`SELECT c.oid, c.cfgname,
   n.nspname,
   p.prsname,
   np.nspname as pnspname
FROM pg_catalog.pg_ts_config c
   LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.cfgnamespace,
 pg_catalog.pg_ts_parser p
   LEFT JOIN pg_catalog.pg_namespace np ON np.oid = p.prsnamespace
WHERE  p.oid = c.cfgparser
`),!Y(s,n,!0,!1,"n.nspname","c.cfgname",null,"pg_catalog.pg_ts_config_is_visible(c.oid)",null,3)||(l(s,"ORDER BY 3, 2;"),
t=await W(s.data),!t))return!1;if(v(t)==0)return o.quiet||(n!=null?K('Did not find any text search configuration named "\
%s".',n):K("Did not find any text search configurations.")),!1;for(a=0;a<v(t);a++){let i,e,r=null,d,g=null;if(i=_(t,a,0),
e=_(t,a,1),ie(t,a,2)||(r=_(t,a,2)),d=_(t,a,3),ie(t,a,4)||(g=_(t,a,4)),!await ka(i,r,e,g,d)||j)return!1}return!0}async function ka(n,s,t,a,i){
let e={},r={},d,g=I(o.popt);return y(e),m(e,"Get text search configuration details"),p(e,`SELECT
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
ORDER BY 1;`,"Token","Dictionaries",n),d=await W(e.data),d?(y(r),s!=null?p(r,'Text search configuration "%s.%s"',s,t):p(
r,'Text search configuration "%s"',t),a!=null?p(r,`
Parser: "%s.%s"`,a,i):p(r,`
Parser: "%s"`,i),g.title=r.data,g.footers=null,g.topt.default_footer=!1,g.translate_header=!0,x(d,g,o.queryFout,!1,o.logfile),
!0):!1}async function Pa(n,s){let t={},a,i=I(o.popt);return y(t),m(t,"Get matching foreign-data wrappers"),p(t,`SELECT f\
dw.fdwname AS "%s",
  pg_catalog.pg_get_userbyid(fdw.fdwowner) AS "%s",
  fdw.fdwhandler::pg_catalog.regproc AS "%s",
  fdw.fdwvalidator::pg_catalog.regproc AS "%s"`,"Name","Owner","Handler","Validator"),s&&(l(t,`,
  `),Re(t,"fdwacl"),p(t,`,
 CASE WHEN fdwoptions IS NULL THEN '' ELSE   '(' || pg_catalog.array_to_string(ARRAY(SELECT   pg_catalog.quote_ident(opt\
ion_name) ||  ' ' ||   pg_catalog.quote_literal(option_value)  FROM   pg_catalog.pg_options_to_table(fdwoptions)),  ', '\
) || ')'   END AS "%s",
  d.description AS "%s" `,"FDW options","Description")),l(t,`
FROM pg_catalog.pg_foreign_data_wrapper fdw
`),s&&l(t,`LEFT JOIN pg_catalog.pg_description d
       ON d.classoid = fdw.tableoid AND d.objoid = fdw.oid AND d.objsubid = 0
`),!Y(t,n,!1,!1,null,"fdwname",null,null,null,1)||(l(t,"ORDER BY 1;"),a=await W(t.data),!a)?!1:(i.title="List of foreign\
-data wrappers",i.translate_header=!0,x(a,i,o.queryFout,!1,o.logfile),!0)}async function qa(n,s){let t={},a,i=I(o.popt);
return y(t),m(t,"Get matching foreign servers"),p(t,`SELECT s.srvname AS "%s",
  pg_catalog.pg_get_userbyid(s.srvowner) AS "%s",
  f.fdwname AS "%s"`,"Name","Owner","Foreign-data wrapper"),s&&(l(t,`,
  `),Re(t,"s.srvacl"),p(t,`,
  s.srvtype AS "%s",
  s.srvversion AS "%s",
  CASE WHEN srvoptions IS NULL THEN '' ELSE   '(' || pg_catalog.array_to_string(ARRAY(SELECT   pg_catalog.quote_ident(op\
tion_name) ||  ' ' ||   pg_catalog.quote_literal(option_value)  FROM   pg_catalog.pg_options_to_table(srvoptions)),  ', \
') || ')'   END AS "%s",
  d.description AS "%s"`,"Type","Version","FDW options","Description")),l(t,`
FROM pg_catalog.pg_foreign_server s
     JOIN pg_catalog.pg_foreign_data_wrapper f ON f.oid=s.srvfdw
`),s&&l(t,`LEFT JOIN pg_catalog.pg_description d
       ON d.classoid = s.tableoid AND d.objoid = s.oid AND d.objsubid = 0
`),!Y(t,n,!1,!1,null,"s.srvname",null,null,null,1)||(l(t,"ORDER BY 1;"),a=await W(t.data),!a)?!1:(i.title="List of forei\
gn servers",i.translate_header=!0,x(a,i,o.queryFout,!1,o.logfile),!0)}async function Ga(n,s){let t={},a,i=I(o.popt);return y(
t),m(t,"Get matching user mappings"),p(t,`SELECT um.srvname AS "%s",
  um.usename AS "%s"`,"Server","User name"),s&&p(t,`,
 CASE WHEN umoptions IS NULL THEN '' ELSE   '(' || pg_catalog.array_to_string(ARRAY(SELECT   pg_catalog.quote_ident(opti\
on_name) ||  ' ' ||   pg_catalog.quote_literal(option_value)  FROM   pg_catalog.pg_options_to_table(umoptions)),  ', ') \
|| ')'   END AS "%s"`,"FDW options"),l(t,`
FROM pg_catalog.pg_user_mappings um
`),!Y(t,n,!1,!1,null,"um.srvname","um.usename",null,null,1)||(l(t,"ORDER BY 1, 2;"),a=await W(t.data),!a)?!1:(i.title="L\
ist of user mappings",i.translate_header=!0,x(a,i,o.queryFout,!1,o.logfile),!0)}async function Ja(n,s){let t={},a,i=I(o.
popt);return y(t),m(t,"Get matching foreign tables"),p(t,`SELECT n.nspname AS "%s",
  c.relname AS "%s",
  s.srvname AS "%s"`,"Schema","Table","Server"),s&&p(t,`,
 CASE WHEN ftoptions IS NULL THEN '' ELSE   '(' || pg_catalog.array_to_string(ARRAY(SELECT   pg_catalog.quote_ident(opti\
on_name) ||  ' ' ||   pg_catalog.quote_literal(option_value)  FROM   pg_catalog.pg_options_to_table(ftoptions)),  ', ') \
|| ')'   END AS "%s",
  d.description AS "%s"`,"FDW options","Description"),l(t,`
FROM pg_catalog.pg_foreign_table ft
  INNER JOIN pg_catalog.pg_class c ON c.oid = ft.ftrelid
  INNER JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
  INNER JOIN pg_catalog.pg_foreign_server s ON s.oid = ft.ftserver
`),s&&l(t,`   LEFT JOIN pg_catalog.pg_description d
          ON d.classoid = c.tableoid AND d.objoid = c.oid AND d.objsubid = 0
`),!Y(t,n,!1,!1,"n.nspname","c.relname",null,"pg_catalog.pg_table_is_visible(c.oid)",null,3)||(l(t,"ORDER BY 1, 2;"),a=await W(
t.data),!a)?!1:(i.title="List of foreign tables",i.translate_header=!0,x(a,i,o.queryFout,!1,o.logfile),!0)}async function ja(n){
let s={},t,a=I(o.popt);return y(s),m(s,"Get matching installed extensions"),p(s,`SELECT e.extname AS "%s", e.extversion \
AS "%s", ae.default_version AS "%s",n.nspname AS "%s", d.description AS "%s"
FROM pg_catalog.pg_extension e LEFT JOIN pg_catalog.pg_namespace n ON n.oid = e.extnamespace LEFT JOIN pg_catalog.pg_des\
cription d ON d.objoid = e.oid AND d.classoid = 'pg_catalog.pg_extension'::pg_catalog.regclass LEFT JOIN pg_catalog.pg_a\
vailable_extensions() ae(name, default_version, comment) ON ae.name = e.extname
`,"Name","Version","Default version","Schema","Description"),!Y(s,n,!1,!1,null,"e.extname",null,null,null,1)||(l(s,"ORDE\
R BY 1;"),t=await W(s.data),!t)?!1:(a.title="List of installed extensions",a.translate_header=!0,x(t,a,o.queryFout,!1,o.
logfile),!0)}async function Ba(n){let s={},t,a;if(y(s),m(s,"Get matching installed extensions"),l(s,`SELECT e.extname, e\
.oid
FROM pg_catalog.pg_extension e
`),!Y(s,n,!1,!1,null,"e.extname",null,null,null,1)||(l(s,"ORDER BY 1;"),t=await W(s.data),!t))return!1;if(v(t)==0)return o.
quiet||(n!=null?K('Did not find any extension named "%s".',n):K("Did not find any extensions.")),!1;for(a=0;a<v(t);a++){
let i,e;if(i=_(t,a,0),e=_(t,a,1),!await Qa(i,e)||j)return!1}return!0}async function Qa(n,s){let t={},a,i={},e=I(o.popt);
return y(t),m(t,"Get installed extension's contents"),p(t,`SELECT pg_catalog.pg_describe_object(classid, objid, 0) AS "%\
s"
FROM pg_catalog.pg_depend
WHERE refclassid = 'pg_catalog.pg_extension'::pg_catalog.regclass AND refobjid = '%s' AND deptype = 'e'
ORDER BY 1;`,"Object description",s),a=await W(t.data),a?(y(i),b(i,'Objects in extension "%s"',n),e.title=i.data,e.translate_header=
!0,x(a,e,o.queryFout,!1,o.logfile),!0):!1}function Y(n,s,t,a,i,e,r,d,g,N){let E={},u={},A;if(y(E),A=wt(o.db,n,s,t,a,i,e,
r,d,E,u),g!=null&&(g.value=A),u.value>=N)return K("improper qualified name (too many dotted names): %s",s),!1;if(N>1&&u.
value==N-1){if(xt(o.db)==null)return K("You are currently not connected to a database."),!1;if(D(xt(o.db),E.data)!=0)return K(
"cross-database references are not implemented: %s",s),!1}return!0}async function za(n){let s={},t,a=I(o.popt),i=[!1,!1,
!1,!1,!1,!1,!1,!1,!1,!1];if(o.sversion<1e5){let e="";return K("The server (version %s) does not support publications.",Oe(
o.sversion,!1,e,Ue(e))),!0}return y(s),m(s,"Get matching publications"),p(s,`SELECT pubname AS "%s",
  pg_catalog.pg_get_userbyid(pubowner) AS "%s",
  puballtables AS "%s"`,"Name","Owner","All tables"),o.sversion>=19e4&&p(s,`,
  puballsequences AS "%s"`,"All sequences"),p(s,`,
  pubinsert AS "%s",
  pubupdate AS "%s",
  pubdelete AS "%s"`,"Inserts","Updates","Deletes"),o.sversion>=11e4&&p(s,`,
  pubtruncate AS "%s"`,"Truncates"),o.sversion>=18e4&&p(s,`,
 (CASE pubgencols
    WHEN '%c' THEN 'none'
    WHEN '%c' THEN 'stored'
   END) AS "%s"`,"n","s","Generated columns"),o.sversion>=13e4&&p(s,`,
  pubviaroot AS "%s"`,"Via root"),l(s,`
FROM pg_catalog.pg_publication
`),!Y(s,n,!1,!1,null,"pubname",null,null,null,1)||(l(s,"ORDER BY 1;"),t=await W(s.data),!t)?!1:(a.title="List of publica\
tions",a.translate_header=!0,a.translate_columns=i,a.n_translate_columns=ee(i),x(t,a,o.queryFout,!1,o.logfile),!0)}async function Et(n,s,t,a){
let i,e=0,r=0;if(i=await W(n.data),i)e=v(i);else return!1;for(e>0&&C(a,s),r=0;r<e;r++)t?b(n,'    "%s"',_(i,r,0)):(b(n,' \
   "%s.%s"',_(i,r,0),_(i,r,1)),ie(i,r,3)||p(n," (%s)",_(i,r,3)),ie(i,r,2)||p(n," WHERE %s",_(i,r,2))),C(a,n.data);return!0}
async function $a(n){let s={},t,a,i,e,r,d,g=6,N=1,E={},u={};if(o.sversion<1e5){let A="";return K("The server (version %s\
) does not support publications.",Oe(o.sversion,!1,A,Ue(A))),!0}if(d=o.sversion>=19e4,i=o.sversion>=11e4,e=o.sversion>=18e4,
r=o.sversion>=13e4,y(s),m(s,"Get details about matching publications"),l(s,`SELECT oid, pubname,
  pg_catalog.pg_get_userbyid(pubowner) AS owner,
  puballtables`),d?l(s,", puballsequences"):l(s,", false AS puballsequences"),l(s,", pubinsert, pubupdate, pubdelete"),i?
l(s,", pubtruncate"):l(s,", false AS pubtruncate"),e?p(s,`, (CASE pubgencols
    WHEN '%c' THEN 'none'
    WHEN '%c' THEN 'stored'
   END) AS "%s"
`,"n","s","Generated columns"):l(s,", 'none' AS pubgencols"),r?l(s,", pubviaroot"):l(s,", false AS pubviaroot"),l(s,", p\
g_catalog.obj_description(oid, 'pg_publication')"),l(s,`
FROM pg_catalog.pg_publication
`),!Y(s,n,!1,!1,null,"pubname",null,null,null,1)||(l(s,"ORDER BY 2;"),a=await W(s.data),!a))return!1;if(v(a)==0)return o.
quiet||(n!=null?K('Did not find any publication named "%s".',n):K("Did not find any publications.")),!1;for(d&&g++,i&&g++,
e&&g++,r&&g++,t=0;t<v(a);t++){let A="l",R=_(a,t,0),w=_(a,t,1),S=D(_(a,t,3),"t")==0,se=Je(o.popt.topt);if(y(E),b(E,"Publi\
cation %s",w),je(u,se,E.data,g,N),ce(u,"Owner",!0,A),ce(u,"All tables",!0,A),d&&ce(u,"All sequences",!0,A),ce(u,"Inserts",
!0,A),ce(u,"Updates",!0,A),ce(u,"Deletes",!0,A),i&&ce(u,"Truncates",!0,A),e&&ce(u,"Generated columns",!0,A),r&&ce(u,"Via\
 root",!0,A),ce(u,"Description",!0,A),$(u,_(a,t,2),!1,!1),$(u,_(a,t,3),!1,!1),d&&$(u,_(a,t,4),!1,!1),$(u,_(a,t,5),!1,!1),
$(u,_(a,t,6),!1,!1),$(u,_(a,t,7),!1,!1),i&&$(u,_(a,t,8),!1,!1),e&&$(u,_(a,t,9),!1,!1),r&&$(u,_(a,t,10),!1,!1),$(u,_(a,t,
11),!1,!1),S){if(o.sversion>=19e4&&(m(s,"Get tables excluded by this publication"),p(s,`SELECT n.nspname || '.' || c.rel\
name
FROM pg_catalog.pg_class c
     JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
     JOIN pg_catalog.pg_publication_rel pr ON c.oid = pr.prrelid
WHERE pr.prpubid = '%s' AND pr.prexcept
ORDER BY 1`,R),!await Et(s,"Except tables:",!0,u)))return!1}else if(m(s,"Get tables published by this publication"),l(s,
"SELECT n.nspname, c.relname"),o.sversion>=15e4?(l(s,", pg_catalog.pg_get_expr(pr.prqual, c.oid)"),l(s,`, (CASE WHEN pr.\
prattrs IS NOT NULL THEN
     pg_catalog.array_to_string(      ARRAY(SELECT attname
              FROM
                pg_catalog.generate_series(0, pg_catalog.array_upper(pr.prattrs::pg_catalog.int2[], 1)) s,
                pg_catalog.pg_attribute
        WHERE attrelid = c.oid AND attnum = prattrs[s]), ', ')
       ELSE NULL END)`)):l(s,", NULL, NULL"),p(s,`
FROM pg_catalog.pg_class c,
     pg_catalog.pg_namespace n,
     pg_catalog.pg_publication_rel pr
WHERE c.relnamespace = n.oid
  AND c.oid = pr.prrelid
  AND pr.prpubid = '%s'
`,R),o.sversion>=19e4&&l(s,`  AND NOT pr.prexcept
`),l(s,"ORDER BY 1,2"),!await Et(s,"Tables:",!1,u)||o.sversion>=15e4&&(m(s,"Get schemas published by this publication"),
p(s,`SELECT n.nspname
FROM pg_catalog.pg_namespace n
     JOIN pg_catalog.pg_publication_namespace pn ON n.oid = pn.pnnspid
WHERE pn.pnpubid = '%s'
ORDER BY 1`,R),!await Et(s,"Tables from schemas:",!0,u)))return!1;Be(u,o.queryFout,!1,o.logfile)}return!0}async function Xa(n,s){
let t={},a,i=I(o.popt),e=[!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1];if(o.sversion<1e5){let r="";return K(
"The server (version %s) does not support subscriptions.",Oe(o.sversion,!1,r,Ue(r))),!0}return y(t),m(t,"Get matching su\
bscriptions"),p(t,`SELECT subname AS "%s"
,  pg_catalog.pg_get_userbyid(subowner) AS "%s"
,  subenabled AS "%s"
,  subpublications AS "%s"
`,"Name","Owner","Enabled","Publication"),s&&(o.sversion>=14e4&&(p(t,`, subbinary AS "%s"
`,"Binary"),o.sversion>=16e4?p(t,`, (CASE substream
    WHEN 'f' THEN 'off'
    WHEN 't' THEN 'on'
    WHEN 'p' THEN 'parallel'
   END) AS "%s"
`,"Streaming"):p(t,`, substream AS "%s"
`,"Streaming")),o.sversion>=15e4&&p(t,`, subtwophasestate AS "%s"
, subdisableonerr AS "%s"
`,"Two-phase commit","Disable on error"),o.sversion>=16e4&&p(t,`, suborigin AS "%s"
, subpasswordrequired AS "%s"
, subrunasowner AS "%s"
`,"Origin","Password required","Run as owner?"),o.sversion>=17e4&&p(t,`, subfailover AS "%s"
`,"Failover"),o.sversion>=19e4&&(p(t,`, (select srvname from pg_catalog.pg_foreign_server where oid=subserver) AS "%s"
`,"Server"),p(t,`, subretaindeadtuples AS "%s"
`,"Retain dead tuples"),p(t,`, submaxretention AS "%s"
`,"Max retention duration"),p(t,`, subretentionactive AS "%s"
`,"Retention active")),p(t,`,  subsynccommit AS "%s"
,  subconninfo AS "%s"
`,"Synchronous commit","Conninfo"),o.sversion>=19e4&&p(t,`, subwalrcvtimeout AS "%s"
`,"Receiver timeout"),o.sversion>=15e4&&p(t,`, subskiplsn AS "%s"
`,"Skip LSN"),p(t,`,  pg_catalog.obj_description(oid, 'pg_subscription') AS "%s"
`,"Description")),l(t,`FROM pg_catalog.pg_subscription
WHERE subdbid = (SELECT oid
                 FROM pg_catalog.pg_database
                 WHERE datname = pg_catalog.current_database())`),!Y(t,n,!0,!1,null,"subname",null,null,null,1)||(l(t,"O\
RDER BY 1;"),a=await W(t.data),!a)?!1:(i.title="List of subscriptions",i.translate_header=!0,i.translate_columns=e,i.n_translate_columns=
ee(e),x(a,i,o.queryFout,!1,o.logfile),!0)}function Re(n,s){p(n,`CASE WHEN pg_catalog.array_length(%s, 1) = 0 THEN '%s' E\
LSE pg_catalog.array_to_string(%s, E'\\n') END AS "%s"`,s,"(none)",s,"Access privileges")}async function Za(n,s,t){let a={},
i,e=I(o.popt),r={value:!1},d=[!1,!1,!1,!1,!1,!1,!1];return y(a),m(a,"Get matching operator classes"),p(a,`SELECT
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
  END) AS "%s"`,"AM","Input type","Storage type","Operator class","yes","no","Default?"),t&&p(a,`,
  CASE
    WHEN pg_catalog.pg_opfamily_is_visible(of.oid)
    THEN pg_catalog.format('%%I', of.opfname)
    ELSE pg_catalog.format('%%I.%%I', ofn.nspname, of.opfname)
  END AS "%s",
 pg_catalog.pg_get_userbyid(c.opcowner) AS "%s"
`,"Operator family","Owner"),l(a,`
FROM pg_catalog.pg_opclass c
  LEFT JOIN pg_catalog.pg_am am on am.oid = c.opcmethod
  LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.opcnamespace
  LEFT JOIN pg_catalog.pg_type t ON t.oid = c.opcintype
  LEFT JOIN pg_catalog.pg_namespace tn ON tn.oid = t.typnamespace
`),t&&l(a,`  LEFT JOIN pg_catalog.pg_opfamily of ON of.oid = c.opcfamily
  LEFT JOIN pg_catalog.pg_namespace ofn ON ofn.oid = of.opfnamespace
`),n!=null&&!Y(a,n,!1,!1,null,"am.amname",null,null,r,1)||s!=null&&!Y(a,s,r.value,!1,"tn.nspname","t.typname","pg_catalo\
g.format_type(t.oid, NULL)","pg_catalog.pg_type_is_visible(t.oid)",null,3)||(l(a,"ORDER BY 1, 2, 4;"),i=await W(a.data),
!i)?!1:(e.title="List of operator classes",e.translate_header=!0,e.translate_columns=d,e.n_translate_columns=ee(d),x(i,e,
o.queryFout,!1,o.logfile),!0)}async function en(n,s,t){let a={},i,e=I(o.popt),r={value:!1},d=[!1,!1,!1,!1];if(y(a),m(a,"\
Get matching operator families"),p(a,`SELECT
  am.amname AS "%s",
  CASE
    WHEN pg_catalog.pg_opfamily_is_visible(f.oid)
    THEN pg_catalog.format('%%I', f.opfname)
    ELSE pg_catalog.format('%%I.%%I', n.nspname, f.opfname)
  END AS "%s",
  (SELECT
     pg_catalog.string_agg(pg_catalog.format_type(oc.opcintype, NULL), ', ')
   FROM pg_catalog.pg_opclass oc
   WHERE oc.opcfamily = f.oid) "%s"`,"AM","Operator family","Applicable types"),t&&p(a,`,
  pg_catalog.pg_get_userbyid(f.opfowner) AS "%s"
`,"Owner"),l(a,`
FROM pg_catalog.pg_opfamily f
  LEFT JOIN pg_catalog.pg_am am on am.oid = f.opfmethod
  LEFT JOIN pg_catalog.pg_namespace n ON n.oid = f.opfnamespace
`),n!=null&&!Y(a,n,!1,!1,null,"am.amname",null,null,r,1))return!1;if(s!=null){if(p(a,`  %s EXISTS (
    SELECT 1
    FROM pg_catalog.pg_type t
    JOIN pg_catalog.pg_opclass oc ON oc.opcintype = t.oid
    LEFT JOIN pg_catalog.pg_namespace tn ON tn.oid = t.typnamespace
    WHERE oc.opcfamily = f.oid
`,r.value?"AND":"WHERE"),!Y(a,s,!0,!1,"tn.nspname","t.typname","pg_catalog.format_type(t.oid, NULL)","pg_catalog.pg_type\
_is_visible(t.oid)",null,3))return!1;l(a,`  )
`)}return l(a,"ORDER BY 1, 2;"),i=await W(a.data),i?(e.title="List of operator families",e.translate_header=!0,e.translate_columns=
d,e.n_translate_columns=ee(d),x(i,e,o.queryFout,!1,o.logfile),!0):!1}async function tn(n,s,t){let a={},i,e=I(o.popt),r={
value:!1},d=[!1,!1,!1,!1,!1,!1,!0];return y(a),m(a,"Get operators of matching operator families"),p(a,`SELECT
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
`,"AM","Operator family","Operator","Strategy","ordering","search","Purpose"),t&&p(a,`, ofs.opfname AS "%s",
  CASE
    WHEN p.proleakproof THEN '%s'
    ELSE '%s'
  END AS "%s"
`,"Sort opfamily","yes","no","Leakproof?"),l(a,`FROM pg_catalog.pg_amop o
  LEFT JOIN pg_catalog.pg_opfamily of ON of.oid = o.amopfamily
  LEFT JOIN pg_catalog.pg_am am ON am.oid = of.opfmethod AND am.oid = o.amopmethod
  LEFT JOIN pg_catalog.pg_namespace nsf ON of.opfnamespace = nsf.oid
`),t&&l(a,`  LEFT JOIN pg_catalog.pg_opfamily ofs ON ofs.oid = o.amopsortfamily
  LEFT JOIN pg_catalog.pg_operator op ON op.oid = o.amopopr
  LEFT JOIN pg_catalog.pg_proc p ON p.oid = op.oprcode
`),n!=null&&!Y(a,n,!1,!1,null,"am.amname",null,null,r,1)||s!=null&&!Y(a,s,r.value,!1,"nsf.nspname","of.opfname",null,null,
null,3)||(l(a,`ORDER BY 1, 2,
  o.amoplefttype = o.amoprighttype DESC,
  pg_catalog.format_type(o.amoplefttype, NULL),
  pg_catalog.format_type(o.amoprighttype, NULL),
  o.amopstrategy;`),i=await W(a.data),!i)?!1:(e.title="List of operators of operator families",e.translate_header=!0,e.translate_columns=
d,e.n_translate_columns=ee(d),x(i,e,o.queryFout,!1,o.logfile),!0)}async function an(n,s,t){let a={},i,e=I(o.popt),r={value:!1},
d=[!1,!1,!1,!1,!1,!1];return y(a),m(a,"Get support functions of matching operator families"),p(a,`SELECT
  am.amname AS "%s",
  CASE
    WHEN pg_catalog.pg_opfamily_is_visible(of.oid)
    THEN pg_catalog.format('%%I', of.opfname)
    ELSE pg_catalog.format('%%I.%%I', ns.nspname, of.opfname)
  END AS "%s",
  pg_catalog.format_type(ap.amproclefttype, NULL) AS "%s",
  pg_catalog.format_type(ap.amprocrighttype, NULL) AS "%s",
  ap.amprocnum AS "%s"
`,"AM","Operator family","Registered left type","Registered right type","Number"),t?p(a,`, ap.amproc::pg_catalog.regproc\
edure AS "%s"
`,"Function"):p(a,`, p.proname AS "%s"
`,"Function"),l(a,`FROM pg_catalog.pg_amproc ap
  LEFT JOIN pg_catalog.pg_opfamily of ON of.oid = ap.amprocfamily
  LEFT JOIN pg_catalog.pg_am am ON am.oid = of.opfmethod
  LEFT JOIN pg_catalog.pg_namespace ns ON of.opfnamespace = ns.oid
  LEFT JOIN pg_catalog.pg_proc p ON ap.amproc = p.oid
`),n!=null&&!Y(a,n,!1,!1,null,"am.amname",null,null,r,1)||s!=null&&!Y(a,s,r.value,!1,"ns.nspname","of.opfname",null,null,
null,3)||(l(a,`ORDER BY 1, 2,
  ap.amproclefttype = ap.amprocrighttype DESC,
  3, 4, 5;`),i=await W(a.data),!i)?!1:(e.title="List of support functions of operator families",e.translate_header=!0,e.
translate_columns=d,e.n_translate_columns=ee(d),x(i,e,o.queryFout,!1,o.logfile),!0)}async function Ct(n){let s={},t,a=I(
o.popt);return y(s),m(s,"Get large objects"),p(s,`SELECT oid as "%s",
  pg_catalog.pg_get_userbyid(lomowner) as "%s",
  `,"ID","Owner"),n&&(Re(s,"lomacl"),l(s,`,
  `)),p(s,`pg_catalog.obj_description(oid, 'pg_largeobject') as "%s"
FROM pg_catalog.pg_largeobject_metadata
ORDER BY oid`,"Description"),t=await W(s.data),t?(a.title="Large objects",a.translate_header=!0,x(t,a,o.queryFout,!1,o.logfile),
!0):!1}let nn=0;function Oe(n,s,t,a){return n>=1e5?s?t=oe("%d.%d",Math.trunc(n/1e4),n%1e4):t=oe("%d",Math.trunc(n/1e4)):
s?t=oe("%d.%d.%d",Math.trunc(n/1e4),Math.trunc(n/100)%100,n%100):t=oe("%d.%d",Math.trunc(n/1e4),Math.trunc(n/100)%100),t}
function sn(n,s,t,a,i){let e={},r={},d;if(!cn(s,e,r))return!1;for(d=0;d<r.value;d++){let g=e.value[d],N,E,u;N=g,E=J(g,"="),
E!=null?(g=g.slice(0,g.length-E.length),N=g,u=E.slice(1)):u="",d>0&&l(n,", "),p(n,"%s%s=",t,he(N)),D(he(u),u)==0?l(n,u):
dt(n,u,a,i)}return!0}function wt(n,s,t,a,i,e,r,d,g,N,E){let u={},A={},R=!1,w={};return E==null&&(E=w),E.value=0,t==null?
(g!=null&&(l(s,a?"  AND ":"WHERE "),a=!0,R=!0,p(s,`%s
`,g)),R):(y(u),y(A),ln(Pt(n),e!=null?N:null,e!=null?u:null,A,t,i,!0,E),r!=null&&A.len>2&&D(A.data,"^(.*)$")!=0&&(l(s,a?"\
  AND ":"WHERE "),a=!0,R=!0,d!=null?(p(s,"(%s OPERATOR(pg_catalog.~) ",r),Ke(s,A.data,n),ke(n)>=12e4&&l(s," COLLATE pg_c\
atalog.default"),p(s,`
        OR %s OPERATOR(pg_catalog.~) `,d),Ke(s,A.data,n),ke(n)>=12e4&&l(s," COLLATE pg_catalog.default"),l(s,`)
`)):(p(s,"%s OPERATOR(pg_catalog.~) ",r),Ke(s,A.data,n),ke(n)>=12e4&&l(s," COLLATE pg_catalog.default"),X(s,`
`))),e!=null&&u.len>2?D(u.data,"^(.*)$")!=0&&e!=null&&(l(s,a?"  AND ":"WHERE "),a=!0,R=!0,p(s,"%s OPERATOR(pg_catalog.~)\
 ",e),Ke(s,u.data,n),ke(n)>=12e4&&l(s," COLLATE pg_catalog.default"),X(s,`
`)):g!=null&&(l(s,a?"  AND ":"WHERE "),a=!0,R=!0,p(s,`%s
`,g)),R)}function ln(n,s,t,a,i,e,r,d){let g=[{},{},{}],N={},E,u,A,R,w,S;for(Se(i!=null),Se(a!=null),Se(s==null||t!=null),
Se(d!=null),d.value=0,R=!1,S=i,s!=null?u=2:t!=null?u=1:u=0,E=0,r?(w=!0,y(N)):w=!1,y(g[E]),l(g[E],"^(");S[0];){let se=S[0];
if(se=='"')R&&S[1]=='"'?(X(g[E],'"'),w&&X(N,'"'),S=S.slice(1)):R=!R,S=S.slice(1);else if(!R&&mn(se))X(g[E],ft(se)),w&&X(
N,ft(se)),S=S.slice(1);else if(!R&&se=="*")l(g[E],".*"),w&&X(N,"*"),S=S.slice(1);else if(!R&&se=="?")X(g[E],"."),w&&X(N,
"?"),S=S.slice(1);else if(!R&&se==".")w=!1,d&&d.value++,E<u?(l(g[E],")$"),E++,y(g[E]),l(g[E],"^("),S=S.slice(1)):(X(g[E],
S[0]),S=S.slice(1));else if(se=="$")l(g[E],"\\$"),w&&X(N,"$"),S=S.slice(1);else for(((R||e)&&J("|*+?()[]{}.^$\\",se)!=null||
se=="["&&S[1]=="]")&&X(g[E],"\\"),A=Un(S,n);A--;)w&&X(N,S[0]),X(g[E],S[0]),S=S.slice(1)}l(g[E],")$"),a&&(l(a,g[E].data),
E--),t&&E>=0&&(l(t,g[E].data),E--),s&&E>=0&&(r?l(s,N.data):l(s,g[E].data))}function m(n,s){b(n,`/* %s */
`,s)}function x(n,s,t,a,i){let e={},r,d,g;if(!j){for(je(e,s.topt,s.title,qt(n),v(n)),Se(s.translate_columns==null||s.n_translate_columns>=
e.ncolumns),r=0;r<e.ncolumns;r++)ce(e,Gt(n,r),s.translate_header,on(It(n,r)));for(d=0;d<e.nrows;d++)for(g=0;g<e.ncolumns;g++){
let N,E=!1,u;ie(n,d,g)?N=s.nullPrint!=null?s.nullPrint:"":It(n,g)==16?N=_(n,d,g)[0]=="t"?s.truePrint!=null?s.truePrint:"\
t":s.falsePrint!=null?s.falsePrint:"f":(N=_(n,d,g),e.aligns[g]=="r"&&s.topt.numericLocale&&(N=N,E=!0)),u=s.translate_columns&&
s.translate_columns[g],$(e,N,u,E)}if(s.footers){let N;for(N=0;s.footers[N]!=null;N++)C(e,s.footers[N])}Be(e,t,a,i)}}function on(n){
let s;switch(n){case 21:case 23:case 20:case 700:case 701:case 1700:case 26:case 6437:case 28:case 5069:case 29:case 790:
s="r";break;default:s="l";break}return s}let rn=["abort","absent","absolute","access","action","add","admin","after","ag\
gregate","all","also","alter","always","analyse","analyze","and","any","array","as","asc","asensitive","assertion","assi\
gnment","asymmetric","at","atomic","attach","attribute","authorization","backward","before","begin","between","bigint","\
binary","bit","boolean","both","breadth","by","cache","call","called","cascade","cascaded","case","cast","catalog","chai\
n","char","character","characteristics","check","checkpoint","class","close","cluster","coalesce","collate","collation",
"column","columns","comment","comments","commit","committed","compression","concurrently","conditional","configuration",
"conflict","connection","constraint","constraints","content","continue","conversion","copy","cost","create","cross","csv",
"cube","current","current_catalog","current_date","current_role","current_schema","current_time","current_timestamp","cu\
rrent_user","cursor","cycle","data","database","day","deallocate","dec","decimal","declare","default","defaults","deferr\
able","deferred","definer","delete","delimiter","delimiters","depends","depth","desc","detach","dictionary","disable","d\
iscard","distinct","do","document","domain","double","drop","each","else","empty","enable","encoding","encrypted","end",
"enforced","enum","error","escape","event","except","exclude","excluding","exclusive","execute","exists","explain","expr\
ession","extension","external","extract","false","family","fetch","filter","finalize","first","float","following","for",
"force","foreign","format","forward","freeze","from","full","function","functions","generated","global","grant","granted",
"greatest","group","grouping","groups","handler","having","header","hold","hour","identity","if","ignore","ilike","immed\
iate","immutable","implicit","import","in","include","including","increment","indent","index","indexes","inherit","inher\
its","initially","inline","inner","inout","input","insensitive","insert","instead","int","integer","intersect","interval",
"into","invoker","is","isnull","isolation","join","json","json_array","json_arrayagg","json_exists","json_object","json_\
objectagg","json_query","json_scalar","json_serialize","json_table","json_value","keep","key","keys","label","language",
"large","last","lateral","leading","leakproof","least","left","level","like","limit","listen","load","local","localtime",
"localtimestamp","location","lock","locked","logged","lsn","mapping","match","matched","materialized","maxvalue","merge",
"merge_action","method","minute","minvalue","mode","month","move","name","names","national","natural","nchar","nested","\
new","next","nfc","nfd","nfkc","nfkd","no","none","normalize","normalized","not","nothing","notify","notnull","nowait","\
null","nullif","nulls","numeric","object","objects","of","off","offset","oids","old","omit","on","only","operator","opti\
on","options","or","order","ordinality","others","out","outer","over","overlaps","overlay","overriding","owned","owner",
"parallel","parameter","parser","partial","partition","passing","password","path","period","placing","plan","plans","pol\
icy","position","preceding","precision","prepare","prepared","preserve","primary","prior","privileges","procedural","pro\
cedure","procedures","program","publication","quote","quotes","range","read","real","reassign","recursive","ref","refere\
nces","referencing","refresh","reindex","relative","release","rename","repack","repeatable","replace","replica","reset",
"respect","restart","restrict","return","returning","returns","revoke","right","role","rollback","rollup","routine","rou\
tines","row","rows","rule","savepoint","scalar","schema","schemas","scroll","search","second","security","select","seque\
nce","sequences","serializable","server","session","session_user","set","setof","sets","share","show","similar","simple",
"skip","smallint","snapshot","some","source","sql","stable","standalone","start","statement","statistics","stdin","stdou\
t","storage","stored","strict","string","strip","subscription","substring","support","symmetric","sysid","system","syste\
m_user","table","tables","tablesample","tablespace","target","temp","template","temporary","text","then","ties","time","\
timestamp","to","trailing","transaction","transform","treat","trigger","trim","true","truncate","trusted","type","types",
"uescape","unbounded","uncommitted","unconditional","unencrypted","union","unique","unknown","unlisten","unlogged","unti\
l","update","user","using","vacuum","valid","validate","validator","value","values","varchar","variadic","varying","verb\
ose","version","view","views","virtual","volatile","wait","when","where","whitespace","window","with","within","without",
"work","wrapper","write","xml","xmlattributes","xmlconcat","xmlelement","xmlexists","xmlforest","xmlnamespaces","xmlpars\
e","xmlpi","xmlroot","xmlserialize","xmltable","year","yes","zone"],En=[0,0,0,0,0,0,0,0,0,3,0,0,0,3,3,3,3,3,3,3,0,0,0,3,
0,0,0,0,2,0,0,0,1,1,2,1,1,3,0,0,0,0,0,0,0,3,3,0,0,1,1,0,3,0,0,0,0,1,3,2,3,0,0,0,0,0,0,2,0,0,0,0,3,0,0,0,0,0,0,3,2,0,0,0,
3,3,3,2,3,3,3,0,0,0,0,0,0,1,1,0,3,0,3,0,0,0,0,0,0,0,3,0,0,0,0,3,3,0,0,0,0,0,3,0,0,0,0,3,0,0,0,0,0,3,0,0,0,0,1,0,0,0,0,1,
3,0,3,0,0,0,1,0,3,0,3,0,0,2,3,2,0,0,0,0,3,0,1,3,1,0,0,3,0,0,0,0,0,0,2,0,0,0,0,3,0,0,0,0,0,0,0,0,3,0,2,1,0,0,0,0,1,1,3,1,
3,0,2,2,0,2,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,3,3,0,1,2,0,2,3,0,0,0,3,3,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,2,1,
0,0,0,0,0,0,0,0,1,1,0,3,0,0,2,0,3,1,0,1,0,0,0,0,3,0,0,0,3,3,0,0,0,3,3,0,0,1,2,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,1,0,
1,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,2,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,3,0,0,0,
0,0,3,0,1,0,0,0,2,0,0,1,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,3,0,0,3,3,0,2,0,0,0,0,0,0,3,0,1,1,3,3,0,0,1,0,1,3,0,0,0,0,
0,0,0,0,0,3,3,0,0,0,0,0,3,3,0,0,0,0,0,1,1,3,0,2,0,0,0,0,0,0,3,3,0,3,3,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0];function I(n){
return{...n,topt:Je(n.topt)}}function Je(n){return{...n,fieldSep:{...n.fieldSep},recordSep:{...n.recordSep}}}function je(n,s,t,a,i){
n.opt=s,n.title=t,n.ncolumns=a,n.nrows=i,n.headers=[],n.cells=[],n.footers=null,n.aligns=[]}function ce(n,s,t,a){t&&(s=vt(
s)),n.headers.push(s),n.header=s,n.aligns.push(a),n.align=a}function $(n,s,t,a){t&&(s=vt(s)),n.cells.push(s),n.cell=s}function C(n,s){
n.footers==null&&(n.footers=[]),n.footers.push(s),n.footer={data:s}}function pn(n,s){n.footers&&n.footers.pop(),C(n,s)}function Be(n,s,t,a){
z({...n})}function cn(n,s,t){let a,i,e;if(a=Te(n),s.value=null,t.value=0,a<2||n[0]!="{"||n[a-1]!="}")return!1;let r=s.value=
[],d=0;for(d++,e=0;n[d]!="}";){if(n[d]==null)return!1;for(i="";n[d]!="}"&&n[d]!=",";){if(n[d]==null)return!1;if(n[d]!='"')
i+=n[d++];else{for(d++;n[d]!='"';){if(n[d]==null||n[d]=="\\"&&(d++,n[d]==null))return!1;i+=n[d++]}d++}}r[e]=i,n[d]==","&&
d++,e++}return n[d+1]&&n[d+1]!=null?!1:(t.value=e,!0)}function he(n){let s={};y(s);let t=!1;if(nn?t=!0:n[0]>="a"&&n[0]<=
"z"||n[0]=="_"?/[^a-z0-9_]/.test(n)&&(t=!0):t=!0,!t){let a=rn.indexOf(n);a>=0&&En[a]!=0&&(t=!0)}return t?(X(s,'"'),X(s,n.
replace(/"/g,'""')),X(s,'"')):l(s,n),s.data}let o,Vt=!0,pt=0;try{o={sversion:G,cur_cmd_interactive:!1,queryFout:ye,logfile:null,
echo_hidden:F?1:0,db:{dbName:O,sversion:G,std_strings:M,status:0,encoding:6},popt:{topt:{default_footer:!0,expanded:0},nullPrint:""}};
let[n]=ge;for(;;){let s=["?","h","help"].includes(Mt([...ge]));if(!o.sversion&&!s){let t=await W("SHOW server_version_nu\
m",!0);o.sversion=o.db.sversion=parseInt(t.rows[0][0],10)}for(pt++,await Xt(ge,{},Ye(),Ye())===5&&(Vt=!1);/\s/.test(n[ge[1]]??
"");)ge[1]++;if(!re||n[ge[1]]!=="\\")break;ge[1]++}return{success:Vt,remainder:n.slice(ge[1]),commands:pt}}catch(n){return z(
"ERROR:  "+n instanceof Error?n.message:String(n)),{success:!1,remainder:"",commands:pt}}}return{promise:Promise.race([te().
finally(Q),de]),cancel:Z}}function it(f,O,T,V="",F=""){let G=Math.max(0,O-Te(f));return T==="r"?V+" ".repeat(G)+f+F:T===
"c"?V+" ".repeat(Math.floor(G/2))+f+" ".repeat(Math.ceil(G/2))+F:V+f+" ".repeat(G)+F}function kt(f,O){let T=0,V=f.length,
F=[];for(;T<V;)F.push(f.slice(T,T+=O));return F}function gt(f){let O=-1,T=0,V=1,F=0;for(;(O=f.indexOf(`
`,O+1))!==-1;)O-T>F&&(F=O-T),T=O+1,V++;return f.length-T>F&&(F=f.length-T),{count:V,longest:F}}function Ne(f,O){return f=
f.replace(/[<>&'"]/g,T=>({"<":"&lt;",">":"&gt;","&":"&amp;","'":"&apos;",'"':"&quot;"})[T]),O&&(f=f.replace(/ /g,"&nbsp;").
replace(/\n/g,"<br />")),f}function Rn(f){let{ncolumns:O,nrows:T,headers:V,cells:F}=f;if(F.length===0)return`(${T} row${T===
1?"":"s"})`;let G=V.map(gt),M=G.reduce((te,le)=>te>le.longest?te:le.longest,0),q=F.map(gt),re=q.reduce((te,le)=>te>le.longest?
te:le.longest,0),j=3,Z=T===0?0:13+(Math.log10(f.nrows)|0),de=Math.max(M+j+re,Z),B=de-M-j,_e="";for(let te=0,le=F.length,
Ee=0;te<le;te++){let ge=te%O;if(ge===0){Ee++;let ne=`-[ RECORD ${Ee} ]`;ne.length<M+1&&(ne+="-".repeat(M-ne.length+1)),ne.
length<M+2&&(ne+="+"),ne.length<de&&(ne+="-".repeat(de-ne.length)),_e+=`
${ne}`}let Ce=V[ge].split(`
`),De=Ce.length,Pe=F[te].split(`
`),qe=Pe.length,lt=Math.max(De,qe);for(let ne=0;ne<lt;ne++)_e+=`
`+it(Ce[ne]??"",M)+(De>ne+1?"+":" ")+"| "+it(Pe[ne]??"",B)+(qe>ne+1?"+":"")}let Q=f.footers?f.footers.filter(ue):[],z=Q.
length>0?`

`+Q.join(`
`):"";return`${f.title}${_e}${z}`}function Nn(f){if(f.opt.expanded)return Rn(f);let{ncolumns:O,nrows:T,aligns:V}=f,F=[...f.
headers,...f.cells].map(gt),{colWidths:G,rowHeights:M}=F.reduce((Q,z,Le)=>{let te=Math.floor(Le/f.ncolumns),le=Le%f.ncolumns;
return z.longest>Q.colWidths[le]&&(Q.colWidths[le]=z.longest),z.count>Q.rowHeights[te]&&(Q.rowHeights[te]=z.count),Q},{colWidths:new Array(
O).fill(0),rowHeights:new Array(T+1).fill(1)}),q=G.reduce((Q,z)=>Q+z,0)+O*2+(O-1),re=it(f.title,q,"c"),j=[f.headers,null,
...kt(f.cells,O)],Z=j.map((Q,z)=>{if(z===1)return f.headers.map((te,le)=>"-".repeat(G[le%O]+2)).join("+");z>1&&z--;let Le=Q.
map(te=>te.split(`
`));return new Array(M[z]).fill("").map((te,le)=>Le.map((Ee,ge)=>it(Ee[le]??"",G[ge],z===0?"c":V[ge]," ",Ee[le+1]===void 0?
" ":"+")).join("|")).join(`
`)}).join(`
`),de=f.footers?f.footers.filter(ue):[],B=de.length>0?`
`+de.join(`
`):f.opt.default_footer?`
(${T} row${T===1?"":"s"})`:"";return`${re}
${Z}${B}`}function un(f){let{ncolumns:O,cells:T,headers:V}=f,F=`<table><tr><th align="left" colspan="2">${Ne(f.title)}</\
th></tr>`,G=V.map(q=>Ne(q,!0));for(let q=0,re=T.length,j=0;q<re;q++){let Z=q%O;Z===0&&(j++,F+=`<tr><th align="left" cols\
pan="2">RECORD ${j}</th></tr>`);let de=G[Z],B=Ne(T[q],!0);F+=`<tr><td valign="top">${de}</td><td valign="top">${B}</td><\
/tr>`}F+="</table>";let M=f.footers?f.footers.filter(ue):[];return M.length>0&&(M.length>1&&M.some(q=>/^\s/.test(q))?F+=
"<dl>"+M.map(q=>/^\s/.test(q)?`<dd>${Ne(q.trim(),!0)}</dd>`:`<dt>${Ne(q,!0)}</dt>`).join("")+"</dl>":F+=M.map(q=>`<p>${Ne(
q,!0)}</p>`).join("")),F}function Ln(f){if(f.opt.expanded)return un(f);let O=`<table><tr><th valign="top" style="text-al\
ign: center;" colspan="${f.ncolumns}">${Ne(f.title)}</th></tr><tr>`;for(let V of f.headers)O+=`<th valign="top" style="t\
ext-align: center;">${Ne(V)}</th>`;O+="</tr>";for(let V of kt(f.cells,f.ncolumns))O+="<tr>"+V.map((F,G)=>`<td valign="to\
p" style="text-align: ${f.aligns[G]==="c"?"center":f.aligns[G]==="r"?"right":"left"}">${Ne(F).replace(/\n/g,"<br>")}</td\
>`).join(`
`)+"</tr>";O+="</table>";let T=f.footers?f.footers.filter(ue):[];return T.length>0?T.length>1&&T.some(V=>/^\s/.test(V))?
O+="<dl>"+T.map(V=>/^\s/.test(V)?`<dd>${Ne(V.trim(),!0)}</dd>`:`<dt>${Ne(V,!0)}</dt>`).join("")+"</dl>":O+=T.map(V=>`<p>${Ne(
V,!0)}</p>`).join(""):f.opt.default_footer&&(O+=`<p>(${f.nrows} row${f.nrows===1?"":"s"})</p>`),O}function Se(f){if(!f)throw new Error(
`Assertion failed (value: ${f})`)}var Dn=(f,O,T)=>T===1?f:O;var vt=ue;function Me(f,O){let T=f.indexOf(O);return T===-1?null:f.slice(T)}var J=Me;function Te(f){return f.length}function Ae(f,O,T){
if(typeof f!="string"||typeof O!="string")throw new Error("Not a string");return f.length>T&&(f=f.slice(0,T)),O.length>T&&
(O=O.slice(0,T)),f<O?-1:f>O?1:0}function D(f,O){return Ae(f,O,1/0)}function On(f,O){let T=Te(f);for(let V=0;V<T;V++)if(O.
indexOf(f[V])===-1)return V;return T}function Ft(f){return parseInt(f,10)}function _t(f){return parseInt(f,10)}function mn(f){
let O=f.charCodeAt(0);return O>=65&&O<=90}function ee(f){return f.length}function ft(f){return f.toLowerCase()}function Sn(f,O){
return D(f.toLowerCase(),O.toLowerCase())}function Un(f,O){return 1}function Ue(f){return 0}function y(f){f.data="",f.len=0}function Ye(){let f={};return y(f),f}var nt=y;function l(f,O){f.
data+=O,f.len=f.data.length}var X=l;function p(f,O,...T){let V=oe(O,...T);l(f,V)}function b(f,O,...T){y(f),p(f,O,...T)}function dt(f,O,T,V){
l(f,"'"+O.replace(V?/'/g:/['\\]/g,"$&$&")+"'")}function Ke(f,O,T){if(J(O,"\\")!=null&&ke(T)<19e4){f.len>0&&f.data[f.len-
1]!=" "&&X(f," "),X(f,"E"),dt(f,O,Pt(T),!1);return}dt(f,O,T.encoding,T.std_strings)}function oe(f,...O){let T=0;return f.
replace(/%([-+ #0']*)(\*|\d+)?(?:\.(\*|\d*))?(?:hh?|ll?|[zjtLq])?([%csdiuoxXfFeEgGaAp])/g,(V,F,G,M,q)=>{if(q==="%")return"\
%";G=Number(G==="*"?O[T++]:G??0),M=M==="*"?O[T++]:M,M=M===void 0||M<0?void 0:Number(M);let re=O[T++],j=Number(re),Z=q.toLowerCase(),
de=Q=>Q.replace(/e([+-])(\d)$/,"e$10$2"),B;if(Z==="s")B=M===void 0?String(re):String(re).slice(0,M);else if(Z==="c")B=typeof re==
"number"?String.fromCharCode(re):String(re);else if("fge".includes(Z)&&!isFinite(j))B=isNaN(j)?"nan":j<0?"-inf":"inf";else if(Z===
"f")B=j.toFixed(M??6);else if(Z==="e")B=de(j.toExponential(M??6));else if(Z==="g"){let Q=M===0?1:M??6,z=Number(j.toExponential(
Q-1).split("e")[1]);B=Q>z&&z>=-4?j.toFixed(Q-1-z):de(j.toExponential(Q-1)),F.includes("#")||(B=B.replace(/(\.\d*?)0+(?=e|$)/,
"$1").replace(/\.(?=e|$)/,""))}else if("diuox".includes(Z)){let Q=Math.abs(Math.trunc(j)).toString({o:8,x:16}[Z]??10).padStart(
M??0,"0");B=(j<0?"-":"")+(F.includes("#")&&j!==0?{o:"0",x:"0x"}[Z]??"":"")+Q}else B=String(re);q!==Z&&(B=B.toUpperCase()),
"difeg".includes(Z)&&B[0]!=="-"&&(B=(F.includes("+")?"+":F.includes(" ")?" ":"")+B);let _e=Math.abs(G);if(F.includes("-")||
G<0)return B.padEnd(_e);if(F.includes("0")&&"diuoxfeg".includes(Z)&&!("diuox".includes(Z)&&M!==void 0)){let[,Q,z]=B.match(
/^([-+ ]?(?:0[xX])?)(.*)$/);return Q+z.padStart(_e-Q.length,"0")}return B.padStart(_e)})}var st=oe;function xt(f){return f?
f.dbName:null}function ke(f){return!f||f.status===1?0:f.sversion}function Pt(f){return!f||f.status!=0?-1:f.client_encoding}
function v(f){return f.rowCount}function qt(f){return f.fields.length}function Gt(f,O){return f.fields[O].name}function It(f,O){
return f.fields[O].dataTypeID}function ie(f,O,T){return f.rows[O][T]===null?1:0}function _(f,O,T){let V=f.rows[O][T];return String(
V===null?"":V)}function be(f,O){let T,V,F,G,M;if(!f||O==null||O[0]==null)return-1;for(T=!1,F="",V=0,M=Te(O);V<M;V++){let q=O[V];
T?q=='"'?O[V+1]=='"'?(F+='"',V++):T=!1:F+=q:q=='"'?T=!0:(q=ft(q),F+=q)}for(G=0,M=qt(f);G<M;G++)if(D(F,Gt(f,G))==0)return G;
return-1}function Mt(f){let[O]=f[0].slice(f[1]).match(/^[^\s\\]*/);return f[1]+=O.length,O}function An(f){f[0].startsWith(
"\\\\",f[1])&&(f[1]+=2)}function ue(f){return f}export{Kn as describe,Yn as describeDataToHtml,hn as describeDataToString,Ne as htmlEscape};
