// Writes the tree-sitter parse trees of C files as one XML document: a <sources> element containing a
// <translation_unit file="..."> for each file. Within that, each named node becomes an element, and a node in a
// field gets a field attribute. Each unnamed token (e.g. punctuation, keywords and operators) becomes a <token>
// element, so the only text outside elements is whitespace (including \ line continuations). The XML loses
// nothing: each translation_unit's text content is exactly the C source.
//
// A JavaScript file (.js or .mjs), such as runtime.mjs, is parsed as JavaScript instead, giving a <program>.
//
// Usage: node xslt/c-to-xml.ts language path/to/file.c ... > sources.xml

import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { Parser, Language, type Node } from 'web-tree-sitter';

const escape = (s: string, quot = false) =>
  s.replace(quot ? /[&<>"]/g : /[&<>]/g, c => 
    ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c]!)
  );

const toXML = (node: Node, src: string, attrs: Record<string, string | null> = {}) => {
  const attrsXML = Object.entries(attrs)
    .filter(([, value]) => value !== null)
    .map(([name, value]) => ` ${name}="${escape(value!, true)}"`).join('');

  if (!node.isNamed) return `<token${attrsXML}>${escape(node.text)}</token>`;

  let xml = `<${node.type}${attrsXML}>`;
  let pos = node.startIndex;
  node.children.forEach((child, i) => {
    xml += escape(src.slice(pos, child.startIndex)) + toXML(child, src, { field: node.fieldNameForChild(i) });
    pos = child.endIndex;
  });

  return xml + escape(src.slice(pos, node.endIndex)) + `</${node.type}>`;
};

await Parser.init();
const [,, grammar, ...files] = process.argv;

const grammarURL = import.meta.resolve(`tree-sitter-${grammar}/tree-sitter-${grammar}.wasm`);
const lang = await Language.load(fileURLToPath(grammarURL));
const parser = new Parser().setLanguage(lang);

const units = files.map(file => {
  const src = fs.readFileSync(file, 'utf8');
  const parsedRoot = parser.parse(src)!.rootNode;
  const xml = toXML(parsedRoot, src, { file });
  return xml;
});

console.log(`<?xml version="1.0" encoding="UTF-8"?>\n<sources>\n${units.join('\n')}\n</sources>`);
