// Writes the tree-sitter parse trees of C files as one XML document: a <sources> element containing a
// <translation_unit file="..."> for each file. Within that, each named node becomes an element, and a node in a
// field gets a field attribute. An unnamed token is text, unless it's in a field (e.g. an operator), when it
// becomes a <token> element. The XML loses nothing: each translation_unit's text content is exactly the C source.
//
// Usage: node xslt/c-to-xml.ts path/to/file.c ... > sources.xml

import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { Parser, Language, type Node } from 'web-tree-sitter';

await Parser.init();
const c = await Language.load(fileURLToPath(import.meta.resolve('tree-sitter-c/tree-sitter-c.wasm')));
const parser = new Parser().setLanguage(c);

const escape = (s: string, quot = false) =>
  s.replace(quot ? /[&<>"]/g : /[&<>]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c]!));

const toXML = (node: Node, src: string, attrs: Record<string, string | null> = {}) => {
  const attrsXML = Object.entries(attrs)
    .filter(([, value]) => value !== null)
    .map(([name, value]) => ` ${name}="${escape(value!, true)}"`).join('');

  if (!node.isNamed) return attrs.field ? `<token${attrsXML}>${escape(node.text)}</token>` : escape(node.text);

  let xml = `<${node.type}${attrsXML}>`;
  let pos = node.startIndex;
  node.children.forEach((child, i) => {
    xml += escape(src.slice(pos, child.startIndex)) + toXML(child, src, { field: node.fieldNameForChild(i) });
    pos = child.endIndex;
  });

  return xml + escape(src.slice(pos, node.endIndex)) + `</${node.type}>`;
};

const units = process.argv.slice(2).map(file => {
  const src = fs.readFileSync(file, 'utf8');
  return toXML(parser.parse(src)!.rootNode, src, { file });
});

console.log(`<?xml version="1.0" encoding="UTF-8"?>\n<sources>\n${units.join('\n')}\n</sources>`);
