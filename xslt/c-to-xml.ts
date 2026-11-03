// Writes the tree-sitter parse trees of C files as one XML document: a <sources> element containing a
// <translation_unit file="..."> for each file. Within that, each named node becomes an element, and a node in a
// field gets a field attribute. An unnamed token is text, unless it's in a field (e.g. an operator), when it
// becomes a <token> element. The XML loses nothing: each translation_unit's text content is exactly the C source.
//
// Usage: node xslt/c-to-xml.ts path/to/file.c ... > sources.xml

import fs from 'node:fs';
import type { Node } from 'web-tree-sitter';
import { parserFor, parseOrThrow } from '../translate/syntax.ts';

const escape = (s: string) => s.replace(/[&<>]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;'}[c]!));

const toXML = (node: Node, src: string, attrs: Record<string, string | null> = {}) => {
  const attrsXML = Object.entries(attrs).filter(([, value]) => value !== null)
    .map(([name, value]) => ` ${name}="${escape(value!).replace(/"/g, '&quot;')}"`).join('');
  if (!node.isNamed) return attrs.field ? `<token${attrsXML}>${escape(node.text)}</token>` : escape(node.text);
  let xml = `<${node.type}${attrsXML}>`, pos = node.startIndex;
  node.children.forEach((child, i) => {
    xml += escape(src.slice(pos, child.startIndex)) + toXML(child, src, { field: node.fieldNameForChild(i) });
    pos = child.endIndex;
  });
  return xml + escape(src.slice(pos, node.endIndex)) + `</${node.type}>`;
};

const parser = await parserFor('c');
const units = process.argv.slice(2).map(file => {
  const src = fs.readFileSync(file, 'utf8');
  return toXML(parseOrThrow(parser, src), src, { file });
});

console.log(`<?xml version="1.0" encoding="UTF-8"?>\n<sources>\n${units.join('\n')}\n</sources>`);
