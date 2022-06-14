import { MmlNode } from "mathjax-full/js/core/MmlTree/MmlNode";
import { StackItem } from "mathjax-full/js/input/tex/StackItem";
import TexError from "mathjax-full/js/input/tex/TexError";
import TexParser from "mathjax-full/js/input/tex/TexParser";
import { ParseMethod, ParseResult } from "mathjax-full/js/input/tex/Types";
import { IUnitOptions, processOptions } from "./options";
import { prefixSymbol, unitSymbol } from "./units";

interface IUnitPiece {
	symbol?:string;
	prefix?:string;
	position?: 'numerator' | 'denominator', // used as an override for power.  i.e. can make power negative if denominator.
	power?:number;
	qualifier?:any;
	cancel?: boolean;
	highlight?: string; // color
}

interface IUnitMacroProcessResult {
	type: 'prefix' | 'unit' | 'previous' | 'next';  // either a prefix, unit, or modifier for previous or next unit
	result: IUnitPiece;
}

const modifierMacros: Array<string> = new Array<string>(
	'square',
	'cubic',
	'squared',
	'cubed',
	'tothe',
	'raiseto',
	'per',
	'of',
	'cancel',
	'highlight'
);

function processUnitMacro(macro:string, parser:TexParser) : IUnitMacroProcessResult {
	macro = macro.substring(1);
	if (modifierMacros.includes(macro)){
		return processModifierMacro(macro,parser);
	} 

	if (prefixSymbol.has(macro)) {
		return {type: 'prefix', result: {prefix: prefixSymbol.get(macro)}};
	}

	if (unitSymbol.has(macro)){
		return {type: 'unit', result: {symbol: unitSymbol.get(macro)}};
	}

	return {type: 'unit', result: {symbol: 'X'}};

}

function processModifierMacro(macro:string, parser:TexParser) : IUnitMacroProcessResult{
	let arg;
	switch (macro){
		case "square":
			return {type: "next", result: {power: 2}};
		case "cubic":
			return {type: "next", result: {power: 3}};
		case "squared":
			return {type: "previous", result: {power: 2}};
		case "cubed":
			return {type: "previous", result: {power: 3}};
		case "tothe":
			arg = parser.GetArgument('tothe', true);
			return {type: "previous", result: {power: arg}};
		case "raiseto":
			arg = parser.GetArgument('raiseto');
			return {type: "next", result: {power: arg}};
		case "per":
			return {type: "next", result: {position: 'denominator'}}
		case "of":
			arg = parser.GetArgument('of');
			return {type: "previous", result:{qualifier: arg}};
		case "cancel":
			return {type: "next", result:{cancel: true}};
		case "highlight":
			arg = parser.GetArgument('highlight');
			return {type: "next", result:{highlight: arg}};
		default:
			console.log('DEFAULT REACHED');
	}
}

export function unitParse(parser: TexParser, text:string): MmlNode {
	const mainOptions = parser.configuration.packageData.get('siunitx') as IUnitOptions;
	const unitPieces: Array<IUnitPiece> = new Array<IUnitPiece>();

	// argument contains either macros or it's just plain text
	if (text.indexOf('\\') != -1){
		const subParser = new TexParser(text, parser.stack.env, parser.configuration)
		subParser.i = 0;
		let nextModifier:IUnitPiece = null;
		while (subParser.i < subParser.string.length){
			const macro = subParser.GetArgument(null);
			const processedMacro = processUnitMacro(macro, subParser);
			switch (processedMacro.type){
				case 'next':
				case 'prefix':
					if (nextModifier != null){
						nextModifier = Object.assign(nextModifier, processedMacro.result);
					} else {
						nextModifier = processedMacro.result;
					}
					break;
				case 'previous':
					if (unitPieces.length == 0){
						throw new TexError("MissingPreviousMacro", "There is no previous macro for %1 to modify.", macro);
					}
					let last = unitPieces[unitPieces.length - 1];
					last = Object.assign(last, processedMacro.result);
					break;
				case 'unit':
					if (nextModifier != null){
						processedMacro.result = Object.assign(processedMacro.result, nextModifier);
						nextModifier = null;
					}
					unitPieces.push(processedMacro.result);
					break;
			}
		}
		console.log(unitPieces);
	} else {
		unitPieces.push(...unitParsePlainText(parser, text));
	}
	
	var mml = parser.create('node', 'mtext');
	mml.attributes.set('aria-label', "This is a unit parse result.");  // THIS IS HOW YOU ADD SPEECH.
	var rtext = parser.create('text', 'testing unit parsing ');
	mml.appendChild(rtext);
	return mml;
}

function unitParsePlainText(parser:TexParser, text:string): Array<IUnitPiece> {
	const mainOptions = parser.configuration.packageData.get('siunitx') as IUnitOptions;
	const unitPieces: Array<IUnitPiece> = new Array<IUnitPiece>();

	console.log("TO IMPLEMENT");

	return unitPieces;
}
