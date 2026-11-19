#!/bin/bash

# The first half of the translation: reads a Postgres source tree, and writes what xslt/transform.sh needs. That's the
# preprocessed C, parsed as XML and typed (build/typed.xml), the version (build/version), and the slash-command
# lexer (build/psqlscanslash.l). It also generates the
# SQL help for \h, from the docs (generated/sql-help.generated.mjs). Rerun this when Postgres, xslt/preprocess.py,
# xslt/libc.h, xslt/keywords.c or xslt/add-types.xsl change.
#
# Usage: xslt/parse.sh [path/to/postgres]
# Without a path, this reads build/postgres, fetching it first if need be (see xslt/fetch-postgres.sh).
# Needs pcpp: python3 -m venv .venv && .venv/bin/pip install -r xslt/requirements.txt && source .venv/bin/activate

set -eo pipefail
BUILD=build
mkdir -p "$BUILD" generated
if [ -z "$1" ]; then xslt/fetch-postgres.sh; fi
PG=${1:-$BUILD/postgres}/src

echo "Reading Postgres version ..."
VERSION=$(sed -n 's/^AC_INIT(\[PostgreSQL\], \[\([^]]*\)\].*/\1/p' "$PG/../configure.ac")
if [[ ! "$VERSION" =~ ^[0-9]+ ]]; then
  echo "Can't read the version from ${PG%/src}/configure.ac: expected e.g. AC_INIT([PostgreSQL], [19rc2], ...)" >&2
  exit 1
fi
echo "$VERSION" > "$BUILD/version"

# Some catalog headers that describe.c includes, e.g. catalog/pg_class_d.h (with RELKIND_RELATION and so on), are
# generated when Postgres is built, so we generate them as the Makefile does (with the headers it lists), whichever the
# tree: a clone doesn't have them, and in a built tree, they may be out of date
echo "Generating catalog headers ..."
MAJOR_VERSION=${VERSION%%[!0-9]*}
(cd "$PG/include/catalog" && sed -n '/^CATALOG_HEADERS := /,/^$/p' Makefile | tr -d '\\' | sed 's/CATALOG_HEADERS :=//' |
  xargs perl ../../backend/catalog/genbki.pl --include-path=../ --set-version="$MAJOR_VERSION")

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

# The slash-command lexer, which the runtime ports by hand (see xslt/transform.sh)
cp "$PG/bin/psql/psqlscanslash.l" "$BUILD/"

echo "Generating SQL help for \\h ..."
node xslt/create-help.mjs --docdir "$PG/../doc/src/sgml/ref" --output generated/sql-help.generated.mjs

echo "Done."
