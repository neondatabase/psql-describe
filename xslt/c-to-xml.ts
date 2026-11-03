// Writes the tree-sitter parse tree of a C file as XML. Each named node becomes an element, and a node in a
// field gets a field attribute. An unnamed token is text, unless it's in a field (e.g. an operator), when it
// becomes a <token> element. The XML loses nothing: its text content is exactly the C source.
//
// Usage: node xslt/c-to-xml.ts path/to/file.c > file.xml

import fs from 'node:fs';
import type { Node } from 'web-tree-sitter';
import { parserFor, parseOrThrow } from '../translate/syntax.ts';

const escape = (s: string) => s.replace(/[&<>]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;'}[c]!));

const toXML = (node: Node, src: string, field: string | null = null) => {
  const attrs = field ? ` field="${field}"` : '';
  if (!node.isNamed) return field ? `<token${attrs}>${escape(node.text)}</token>` : escape(node.text);
  let xml = `<${node.type}${attrs}>`, pos = node.startIndex;
  node.children.forEach((child, i) => {
    xml += escape(src.slice(pos, child.startIndex)) + toXML(child, src, node.fieldNameForChild(i));
    pos = child.endIndex;
  });
  return xml + escape(src.slice(pos, node.endIndex)) + `</${node.type}>`;
};

const src = fs.readFileSync(process.argv[2], 'utf8');

console.log(`<?xml version="1.0" encoding="UTF-8"?>\n${toXML(parseOrThrow(await parserFor('c'), src), src)}`);
