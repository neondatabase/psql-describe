#!/bin/bash
# The second half of the translation: translates the C (build/typed.xml, from xslt/parse.sh) into the JS runtime
# (xslt/runtime.mjs), writing generated/describe.mjs. Rerun this when the runtime or the c-to-js stylesheets change.
#
# Usage: xslt/transform.sh

set -eo pipefail
BUILD=build

echo "Transforming C to JS ..."
npx xslt3 -xsl:xslt/c-to-js.xsl -s:"$BUILD/typed.xml" -o:generated/describe.mjs \
  runtime="$PWD/$BUILD/runtime.xml" version="$(cat "$BUILD/version")"

echo "Checking JS syntax ..."
node --check generated/describe.mjs

echo "Done."
