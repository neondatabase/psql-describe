#!/bin/bash
# Builds the JS library from Postgres sources: the translated C (in xslt/runtime.mjs), and the SQL help.
#
# Usage: xslt/build.sh [path/to/postgres] [out-dir]   (defaults: ../postgres, generated)
# Writes out-dir/describe.mjs and out-dir/sql-help.generated.mjs, with intermediate files in build.
# Needs pcpp: python3 -m venv .venv && .venv/bin/pip install -r xslt/requirements.txt && source .venv/bin/activate

set -eo pipefail
PG=${1:-../postgres}/src
OUT=${2:-generated}
BUILD=build
mkdir -p "$OUT" "$BUILD"

echo "Preprocessing C and parsing to XML ..."
rm -rf "$BUILD/pp"
python3 xslt/preprocess.py "$BUILD/pp" "$PG/include" \
  "$PG/bin/psql/command.c" "$PG/bin/psql/describe.c" "$PG/bin/psql/help.c" "$PG/fe_utils/string_utils.c" "$PG/bin/psql/common.c" \
  "$PG/fe_utils/print.c" xslt/libc.h xslt/keywords.c "$PG/common/keywords.c" "$PG/include/c.h" "$PG/include/postgres_ext.h" \
  "$PG"/include/catalog/*.h "$PG"/include/common/*.h "$PG"/include/fe_utils/*.h "$PG"/interfaces/libpq/*.h \
  "$PG"/bin/psql/*.h |
  xargs node xslt/code-to-xml.ts c > "$BUILD/sources.xml"

echo "Typing C XML representation ..."
npx xslt3 -xsl:xslt/add-types.xsl -s:"$BUILD/sources.xml" -o:"$BUILD/typed.xml"

echo "Parsing JS runtime to XML ..."
node xslt/code-to-xml.ts javascript xslt/runtime.mjs > "$BUILD/runtime.xml"

echo "Transforming C to JS ..."
VERSION=$(sed -n 's/^AC_INIT(\[PostgreSQL\], \[\([^]]*\)\].*/\1/p' "$PG/../configure.ac")
npx xslt3 -xsl:xslt/c-to-js.xsl -s:"$BUILD/typed.xml" -o:"$OUT/describe.mjs" runtime="$PWD/$BUILD/runtime.xml" version="$VERSION"

echo "Checking JS syntax ..."
node --check "$OUT/describe.mjs"

echo "Generating SQL help for \\h ..."
node xslt/create-help.mjs --docdir "${1:-../postgres}/doc/src/sgml/ref" --output "$OUT/sql-help.generated.mjs"

echo "Done."
