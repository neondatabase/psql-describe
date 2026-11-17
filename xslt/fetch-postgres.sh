#!/bin/bash

# Gets the Postgres source that the translation reads, at the tag below, into build/postgres: just the directories
# xslt/parse.sh reads, as a shallow, blob-less, sparse clone (about 8 MB to download, rather than 35 MB for a shallow
# clone of everything). Does nothing if build/postgres is already at the tag.
#
# Usage: xslt/fetch-postgres.sh

set -eo pipefail
TAG=REL_19_RC2
DIR=build/postgres

if [ "$(git -C "$DIR" describe --tags --exact-match HEAD 2>/dev/null)" = "$TAG" ]; then
  echo "Postgres $TAG is in $DIR already."
  exit
fi

echo "Fetching Postgres $TAG into $DIR ..."
rm -rf "$DIR"
git -c advice.detachedHead=false clone --quiet --depth 1 --branch "$TAG" --filter=blob:none --sparse \
  https://github.com/postgres/postgres.git "$DIR"
git -C "$DIR" sparse-checkout set \
  src/include src/bin/psql src/fe_utils src/common src/interfaces/libpq src/backend/catalog doc/src/sgml/ref
