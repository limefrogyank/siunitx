import { MmlNode } from "mathjax-full/js/core/MmlTree/MmlNode";
import { StackItem } from "mathjax-full/js/input/tex/StackItem";
import TexError from "mathjax-full/js/input/tex/TexError";
import TexParser from "mathjax-full/js/input/tex/TexParser";
import { ParseMethod, ParseResult } from "mathjax-full/js/input/tex/Types";
import { IOptions, IUnitOptions, processOptions, QualifierMode } from "./options";
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
		return {type: 'unit', result: {symbol: unitSymbol.get(macro), prefix: ''}};
	}

	return {type: 'unit', result: {symbol: 'X', prefix: ''}};

}

const modifierMacroMap = new Map<string, (macro:string, parser:TexParser)=>IUnitMacroProcessResult>([
	['square', (macro:string, parser:TexParser):IUnitMacroProcessResult => {return {type: "next", result: {power: 2}};}], 
	['cubic', (macro:string, parser:TexParser):IUnitMacroProcessResult => {return {type: "next", result: {power: 3}};}],
	['squared', (macro:string, parser:TexParser):IUnitMacroProcessResult => {return {type: "previous", result: {power: 2}};}],
	['cubed', (macro:string, parser:TexParser):IUnitMacroProcessResult => {return {type: "previous", result: {power: 3}};}],
	['tothe', (macro:string, parser:TexParser):IUnitMacroProcessResult => {
		const arg = parser.GetArgument('tothe', true);
		return {type: "previous", result: {power: +arg}};
	}],
	['raiseto', (macro:string, parser:TexParser):IUnitMacroProcessResult => {
		const arg = parser.GetArgument('raiseto');
		return {type: "next", result: {power: +arg}};
	}],
	['per', (macro:string, parser:TexParser):IUnitMacroProcessResult => {return {type: "next", result: {position: 'denominator'}};}],
	['of', (macro:string, parser:TexParser):IUnitMacroProcessResult => {
		const arg = parser.GetArgument('of');
		return {type: "previous", result:{qualifier: arg}};
	}],
	['cancel', (macro:string, parser:TexParser):IUnitMacroProcessResult => {return {type: "next", result:{cancel: true}};}],
	['highlight', (macro:string, parser:TexParser):IUnitMacroProcessResult => {
		const arg = parser.GetArgument('highlight');
		return {type: "next", result:{highlight: arg}};
	}],
]);

function processModifierMacro(macro:string, parser:TexParser) : IUnitMacroProcessResult{
	return modifierMacroMap.get(macro)(macro, parser);
}

const qualiferMethod = new Map<QualifierMode, (qualifer:string, phrase?:string)=>string>([
	['subscript', (qualifer:string, phrase?:string):string => {return '_{'+ qualifer + '}';}],
	['bracket', (qualifer:string, phrase?:string):string => {return '('+ qualifer + ')';}],
	['combine', (qualifer:string, phrase?:string):string => {return qualifer; }],
	['phrase', (qualifer:string, phrase?:string):string => {return phrase + qualifer;}],
]);

function unitLatex(unitPiece: IUnitPiece, options:IUnitOptions, absPower: boolean = false) : {latex: string, superscriptPresent:boolean }{
	let unitLatex = '';
	if (unitPiece.cancel){
		unitLatex += '\\cancel{';
	}
	if (unitPiece.highlight){
		unitLatex += '{\\color{' + unitPiece.highlight + '}';
	}
	unitLatex += options.unitFontCommand + '{';
	unitLatex += '\\class{MathML-Unit}{' + unitPiece.prefix + unitPiece.symbol + '}';
	if (unitPiece.qualifier){
		unitLatex += qualiferMethod.get(options.qualifierMode)(unitPiece.qualifier, options.qualifierPhrase);
	}
	unitLatex += '}';
	const power = unitPiece.power != null 
		? (absPower 
			? Math.abs(unitPiece.power * (unitPiece.position == 'denominator' ? -1 : 1)) 
			: unitPiece.power * (unitPiece.position == 'denominator' ? -1 : 1)) 
		: 1 * (unitPiece.position == 'denominator' ? -1 : 1);
	if (power != null && power != 1 ){
		unitLatex += '^{' + power + '}';
	}
	if (unitPiece.cancel){
		unitLatex += '}';
	}
	if (unitPiece.highlight){
		unitLatex += '}';
	}
	return {latex: unitLatex, superscriptPresent: power != 1 };
}

function displayUnits(parser:TexParser, unitPieces:Array<IUnitPiece>, options: IUnitOptions) : MmlNode {
	//const mainOptions = parser.configuration.packageData.get('siunitx') as IUnitOptions;
	let mml: MmlNode;
	let texString:string;
	let perForSingle: boolean;
	if (unitPieces.length >= 2 && unitPieces.filter((v)=>{
		const power = v.power != null 
		? (v.power * (v.position == 'denominator' ? -1 : 1)) 
		: 1;
		return Math.sign(power) == -1;
	}).length == 1 && options.perMode == 'single-symbol'){
		perForSingle = true;
	}
	if (options.perMode == 'fraction' || options.perMode == 'symbol'|| options.perMode == 'repeated-symbol' || perForSingle){
		let numerator = '';
		let denominator = '';
		let lastNumeratorHadSuperscript=false;
		unitPieces.forEach((v,i,a)=>{
			let latexResult;			
			if (v.position == 'denominator' || (v.power != null && v.power < 0)){
				latexResult = unitLatex(v, options, options.perMode == 'fraction' || options.perMode == 'symbol' || options.perMode == 'repeated-symbol' || options.perMode == "single-symbol" || perForSingle);  

				if (denominator != ''){
					if (options.perMode == 'repeated-symbol'){
						if (latexResult.superscriptPresent){
							denominator += options.perSymbolScriptCorrection;
						}
						denominator += options.perSymbol;
					} else {
						denominator += options.interUnitProduct;
					}
				}					
				denominator += latexResult.latex;
			} else {
				latexResult = unitLatex(v, options, options.perMode == 'fraction' || options.perMode == 'symbol' || options.perMode == 'repeated-symbol' || options.perMode == "single-symbol" || perForSingle);  
				lastNumeratorHadSuperscript = latexResult.superscriptPresent;
				if (numerator != ''){
					numerator += options.interUnitProduct;
				}	
				numerator += latexResult.latex;
			}
		});

		// if no numerator, use 1... but use nothing if denominator is empty, too
		if (numerator == '' && denominator != ''){
			numerator = '1';
		}
		// if no denominator, then no fraction needed.
		if (denominator != ''){
			if (options.perMode == 'fraction'){
				texString = options.fractionCommand + '{' + numerator + '}{' + denominator + '}';
			}
			else if (options.perMode == 'repeated-symbol' || options.perMode == 'symbol' || perForSingle){
				texString = numerator + (lastNumeratorHadSuperscript ? options.perSymbolScriptCorrection : '') + options.perSymbol + denominator;
			} 
			else {
				console.log("shouldn't be here");
			}
		} else {
			texString = numerator;
		}

	} else {
		if (options.perMode == 'power-positive-first'){
			unitPieces = unitPieces.sort((x,y)=>{
				let a = x.power != null ? x : 1;
				if (x.position == 'denominator'){
					a = -a;
				}
				let b = y.power != null ? y : 1;
				if (y.position == 'denominator'){
					b = -b;
				}
				if (a > b) return 1;
				else if (a < b) return -1;
				else return 0;
			});
		}
		let latex = '';
		let lastHadSuperscript=false;
		unitPieces.forEach((v,i,a)=>{
			let latexResult = unitLatex(v, options);  
			lastHadSuperscript = latexResult.superscriptPresent;
			if (latex != ''){
				latex += options.interUnitProduct;
			}	
			latex += latexResult.latex;
			
		});

		texString = latex;
	}
	mml = (new TexParser(texString, parser.stack.env, parser.configuration)).mml();	
	return mml;
}

export function unitParse(parser: TexParser, text:string, options: IOptions): MmlNode {
	//const mainOptions = parser.configuration.packageData.get('siunitx') as IUnitOptions;
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
						if (options.perMode == 'repeated-symbol'){
							let denom = nextModifier.position == 'denominator';
							nextModifier = null;
							if (denom){
								nextModifier = {position: 'denominator'};
							}
						} else {
							nextModifier = null;
						}
					}
					unitPieces.push(processedMacro.result);
					break;
			}
		}

	} else {
		unitPieces.push(...parsePlainTextUnits(parser, text));
	}

	const mml = displayUnits(parser, unitPieces, options);
	
	return mml;
}

function joinValues(values: IterableIterator<string>, joinString: string): string { 
	return Array<string>.from(values).filter((e,i,a)=> i===a.indexOf(e)).sort((a,b)=> a.length - b.length).join(joinString); 
}


function processPrefixUnitCombo(text:string, unitPiece:IUnitPiece): void{
	const prefixes = joinValues(prefixSymbol.values(), '|');
	const units = joinValues(unitSymbol.values(), '|');

	const regex = new RegExp('(' + prefixes + ')?(' + units + ')');
	const result = regex.exec(text);

	if (result[1] !== undefined){
		unitPiece.prefix = result[1];
	} else {
		unitPiece.prefix = '';
	}
	unitPiece.symbol = result[2];
}

function parsePlainTextUnits(parser:TexParser, text:string): Array<IUnitPiece> {
	//const mainOptions = parser.configuration.packageData.get('siunitx') as IUnitOptions;
	const unitPieces: Array<IUnitPiece> = new Array<IUnitPiece>();
	const subParser = new TexParser(text, parser.stack.env, parser.configuration);
	subParser.i=0;

	let j = 0;
	let unitPiece:IUnitPiece = { position: 'numerator'};
	let isDenominator: boolean=false;
	let prefixUnit:string = '';
	while (subParser.i < subParser.string.length){
		switch (subParser.string.charAt(subParser.i)) {
			case '~':
			case '.':
				//process prefix-unit string into unitPiece
				processPrefixUnitCombo(prefixUnit, unitPiece);
				unitPieces.push(unitPiece);
				prefixUnit = ''
				unitPiece = {position: isDenominator ? 'denominator' : 'numerator'};
				break;
			case '/':
				//process prefix-unit string into unitPiece
				processPrefixUnitCombo(prefixUnit, unitPiece);
				unitPieces.push(unitPiece);
				prefixUnit = ''
				isDenominator=true;
				unitPiece = {position: isDenominator ? 'denominator' : 'numerator'};
				break;
			case '^':
				//power
				let next = subParser.string.charAt(++subParser.i);
				let power = '';
				if (next == '{'){
					while ((next = subParser.string.charAt(++subParser.i)) != '}'){
						power += next;
					}
				} else {
					power = next;
				}
				unitPiece.power = +power;
				break;
			case '_':
				//of
				next = subParser.string.charAt(++subParser.i);
				let qualifier = '';
				if (next == '{'){
					while ((next = subParser.string.charAt(++subParser.i)) != '}'){
						qualifier += next;
					}
				} else {
					qualifier = next;
				}
				unitPiece.qualifier = qualifier;
				break;
			default:
				//add char to prefix-unit string
				prefixUnit += subParser.string.charAt(subParser.i);
				break;
		}
		subParser.i++;
		//return parser.string.slice(j, parser.i -1);
	}

	processPrefixUnitCombo(prefixUnit, unitPiece);
	unitPieces.push(unitPiece);
	// throw new TexError('MissingCloseBracket',
	// 'Could not find closing \']\' for argument to %1', parser.currentCS);

	return unitPieces;
}
