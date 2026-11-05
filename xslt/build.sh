#!/bin/sh
# Builds the JS library from Postgres sources: the translated C (in xslt/runtime.mjs), and the SQL help.
#
# Usage: xslt/build.sh [path/to/postgres] [out-dir]   (defaults: ../postgres, tmp/lib)
# Writes out-dir/describe.mjs and out-dir/sql-help.generated.mjs, with intermediate files in tmp/build.
# Needs pcpp: python3 -m venv tmp/venv && tmp/venv/bin/pip install -r xslt/requirements.txt

set -e
PG=${1:-../postgres}/src
OUT=${2:-tmp/lib}
BUILD=tmp/build
mkdir -p "$OUT" "$BUILD"

# Preprocess and parse the C, add types, and parse the runtime
rm -rf "$BUILD/pp"
tmp/venv/bin/python xslt/preprocess.py "$BUILD/pp" "$PG/include" \
  "$PG/bin/psql/command.c" "$PG/bin/psql/describe.c" "$PG/fe_utils/string_utils.c" xslt/libc.h "$PG/include/postgres_ext.h" \
  "$PG"/include/catalog/*.h "$PG"/include/common/*.h "$PG"/include/fe_utils/*.h "$PG"/interfaces/libpq/*.h \
  "$PG"/bin/psql/*.h |
  xargs node xslt/c-to-xml.ts > "$BUILD/sources.xml"
npx xslt3 -xsl:xslt/add-types.xsl -s:"$BUILD/sources.xml" -o:"$BUILD/typed.xml"
node xslt/c-to-xml.ts xslt/runtime.mjs > "$BUILD/runtime.xml"

# Translate, into the runtime
npx xslt3 -xsl:xslt/c-to-js.xsl -s:"$BUILD/typed.xml" -o:"$OUT/describe.mjs" runtime="$PWD/$BUILD/runtime.xml"
node --check "$OUT/describe.mjs"

# The SQL help (for \h)
node generate/create-help.mjs --docdir "${1:-../postgres}/doc/src/sgml/ref" --output "$OUT/sql-help.generated.mjs"
