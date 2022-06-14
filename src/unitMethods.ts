import { MmlNode } from "mathjax-full/js/core/MmlTree/MmlNode";
import { StackItem } from "mathjax-full/js/input/tex/StackItem";
import TexParser from "mathjax-full/js/input/tex/TexParser";
import { ParseMethod, ParseResult } from "mathjax-full/js/input/tex/Types";
import { prefixSymbol, unitSymbol } from "./units";

export const UnitMappings = Object.assign(
	Object.fromEntries(prefixSymbol.array().map((v,i,a)=>{ v[1] = 'parsePrefixToken'; return v; })),
	Object.fromEntries(unitSymbol.array().map((v,i,a)=>{ v[1] = 'parseUnitToken'; return v; })),
);

export const UnitMethods: Record<string, ParseMethod> = {};

UnitMethods.parsePrefixToken = (parser: TexParser, name: string, type: any) : ParseResult => {
	console.log("name: " + name);
	console.log("type: " + type);
	var mml = parser.create('node', 'mtext');
	mml.attributes.set('aria-label', "I am talking now.");  // THIS IS HOW YOU ADD SPEECH.
	var text = parser.create('text', 'testing prefix');
	mml.appendChild(text);
	parser.Push(mml);
}


export function manualUnitParse(parser: TexParser, name:string): MmlNode {
	var mml = parser.create('node', 'mtext');
	mml.attributes.set('aria-label', "This is a manual unit parse result.");  // THIS IS HOW YOU ADD SPEECH.
	var text = parser.create('text', 'testing manual parsing ');
	mml.appendChild(text);
	return mml;
}