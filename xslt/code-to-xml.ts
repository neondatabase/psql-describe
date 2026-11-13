// Usage: node xslt/code-to-xml.ts language path/to/file ... > sources.xml
//
// Write tree-sitter parse trees of code files as one XML document with a <sources> element at the root.
// * For C, that contains a <translation_unit file="..."> element for each file.
// * For JS, it contains <program file="..."> elements.
//
// Within those, each named node becomes an element, and a node within a field gets a field attribute.
// Each unnamed token (e.g. punctuation, keywords and operators) becomes a <token> element, so the only text
// outside of elements is whitespace (including \ line continuations).
//
// The XML loses nothing: each translation_unit or program's text content is exactly the original source (except for
// any characters that XML can't contain, which are escaped: see escape, below).
//
// For example, with additional spacing and indentation for ease of reading, `f(&buf);` in C is:
//
// <expression_statement>
//   <call_expression>
//     <identifier field="function">f</identifier>
//     <argument_list field="arguments">
//       <token>(</token>
//       <pointer_expression>
//         <token field="operator">&amp;</token>
//         <identifier field="argument">buf</identifier>
//       </pointer_expression>
//       <token>)</token>
//     </argument_list>
//   </call_expression>
//   <token>;</token>
// </expression_statement>

import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { Parser, Language, type Node } from 'web-tree-sitter';

// XML can't contain some characters at all, even as character references: e.g. U+FFFF, and control characters other
// than tab and newlines. So those are written as JS escapes, e.g. \uFFFF (which means the same in a string or regex).
const escape = (s: string, quot = false) => s
  .replace(quot ? /[&<>"]/g : /[&<>]/g, c =>
    ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c]!))
  .replace(/[^\t\n\r\x20-\uD7FF\uE000-\uFFFD\u{10000}-\u{10FFFF}]/gu, c =>
    '\\u' + c.codePointAt(0)!.toString(16).toUpperCase().padStart(4, '0'));

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
