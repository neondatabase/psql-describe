#!/bin/bash

# The second half of the translation: translates the C (build/typed.xml, from xslt/parse.sh) into the JS runtime
# (xslt/runtime.mjs), writing generated/describe.mjs. Rerun this when the c-to-js stylesheets or the runtime change.
#
# Usage: xslt/transform.sh

set -eo pipefail
BUILD=build

echo "Parsing JS runtime to XML ..."
node xslt/code-to-xml.ts javascript xslt/runtime.mjs > "$BUILD/runtime.xml"

echo "Transforming C to JS ..."
npx xslt3 -xsl:xslt/c-to-js.xsl -s:"$BUILD/typed.xml" -o:generated/describe.mjs \
  runtime="$PWD/$BUILD/runtime.xml" version="$(cat "$BUILD/version")" hand-ported="$PWD/$BUILD/hand-ported.c" \
  js-globals="$(node -p 'Object.getOwnPropertyNames(globalThis).join(" ")')"

echo "Checking JS syntax ..."
node --check generated/describe.mjs

# The runtime's hand ports (marked "Ported from ...") are of C that upstream may change: check that it's the C they
# were last checked against
echo "Checking hand-ported C ..."
{ echo "/* bin/psql/psqlscanslash.l: rules */"; sed -n '/^%%$/,/^%%$/p' "$BUILD/psqlscanslash.l"; } >> "$BUILD/hand-ported.c"
if ! diff -u xslt/hand-ported.c "$BUILD/hand-ported.c"; then
  echo "Upstream has changed C that xslt/runtime.mjs ports by hand (see above). Update the ports to match, then accept" \
    "the change: cp $BUILD/hand-ported.c xslt/" >&2
  exit 1
fi

echo "Done."
