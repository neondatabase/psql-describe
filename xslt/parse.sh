#!/bin/bash
# The first half of the translation: reads a Postgres source tree, and writes what xslt/transform.sh needs. That's the
# preprocessed C, parsed as XML and typed (build/typed.xml), and the version (build/version). It also generates the
# SQL help for \h, from the docs (generated/sql-help.generated.mjs). Rerun this when Postgres, xslt/preprocess.py,
# xslt/libc.h, xslt/keywords.c or xslt/add-types.xsl change.
#
# Usage: xslt/parse.sh [path/to/postgres]   (default: ../postgres)
# Needs pcpp: python3 -m venv .venv && .venv/bin/pip install -r xslt/requirements.txt && source .venv/bin/activate

set -eo pipefail
PG=${1:-../postgres}/src
BUILD=build
mkdir -p "$BUILD" generated

echo "Reading Postgres version ..."
sed -n 's/^AC_INIT(\[PostgreSQL\], \[\([^]]*\)\].*/\1/p' "$PG/../configure.ac" > "$BUILD/version"

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

echo "Generating SQL help for \\h ..."
node xslt/create-help.mjs --docdir "$PG/../doc/src/sgml/ref" --output generated/sql-help.generated.mjs

echo "Done."
