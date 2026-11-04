# Does the little preprocessing that tree-sitter needs, using pcpp, a C preprocessor written in Python
# (https://github.com/ned14/pcpp), but expanding only a few macros, and leaving everything else as it is. Writes each
# file under out-dir, and prints the files written, for c-to-xml.ts.
#
# Usage: python xslt/preprocess.py out-dir path/to/postgres/src/include file.c ... | xargs node xslt/c-to-xml.ts
#
# Tree-sitter parses C without preprocessing it, which mostly works, but not always. For example, in
# `"... != " CppAsString2(RELKIND_RELATION) " AND ..."`, it reads CppAsString2 as a macro that expands to a string
# (like PRId64 in `"%" PRId64`), which makes the concatenated string the function in a call, and the parse goes wrong
# from there. So we expand that macro as the C preprocessor does, giving "'r'".
#
# pcpp expands the macros below, and those #defined in the files themselves and in the catalog headers they include
# (for constants such as RELKIND_RELATION). It reads no other #includes, and leaves all #includes, comments and
# #if logic it can't evaluate as they are.

import os
import sys
from pcpp.pcmd import CmdPreprocessor

MACROS = [
    # Annotations on declarations, which expand to nothing on our platforms (as c.h defines them when the compiler
    # doesn't support them), and otherwise confuse the parse of declarations
    'PGDLLIMPORT=', 'pg_nodiscard=', 'pg_attribute_printf(f,a)=', 'pg_attribute_format_arg(a)=',
    'pg_attribute_no_sanitize_address()=',
    # C's # (stringizing) operator, and the same after expanding the argument (as in c.h)
    'CppAsString(identifier)=#identifier', 'CppAsString2(x)=CppAsString(x)',
]
UNDEFINED = ['NOT_USED']  # never #defined, by Postgres convention

class Preprocessor(CmdPreprocessor):
    # Read only the catalog headers: for any other #include, say the file isn't there (so it's passed through)
    def on_file_open(self, is_system_include, includepath):
        if os.path.join(include_dir, 'catalog', '') not in includepath:
            raise FileNotFoundError(includepath)
        return super().on_file_open(is_system_include, includepath)

    # In C, a comment is replaced by a space before macros are defined, so a comment in a #define's value isn't part
    # of it (pcpp keeps it, if passing comments through)
    def define(self, tokens):
        if not isinstance(tokens, str):
            tokens = [tok for tok in tokens if tok.type not in self.t_COMMENT]
        return super().define(tokens)

out_dir, include_dir, *files = sys.argv[1:]
include_dir = os.path.abspath(include_dir)
for file in files:
    # e.g. tmp/pp/postgres/src/bin/psql/describe.c for ../postgres/src/bin/psql/describe.c
    out = os.path.join(out_dir, os.path.normpath(file).lstrip('/').replace('../', ''))
    os.makedirs(os.path.dirname(out), exist_ok=True)
    pp = Preprocessor(['pcpp', '-o', out, '-I', include_dir, *(arg for m in MACROS for arg in ('-D', m)),
        *(arg for m in UNDEFINED for arg in ('-U', m)), '--passthru-includes', '.*', '--passthru-unfound-includes',
        '--passthru-comments', '--passthru-unknown-exprs', '--line-directive', '', file])
    if pp.return_code:
        sys.exit(pp.return_code)
    print(out)
