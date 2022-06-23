import { MmlNode } from "mathjax-full/js/core/MmlTree/MmlNode";
import TexParser from "mathjax-full/js/input/tex/TexParser";
import { displayNumber } from "./numDisplayMethods";
import { INumOptions, INumOutputOptions, INumParseOptions, INumPostOptions } from "./options";



export interface INumberPiece {
	sign: string;
	whole: string;
	decimal: string;
	fractional: string;
	exponentMarker: string;
	exponentSign: string;
	exponent: string;
	type: 'number'|'uncertainty'|'comparator';
	other: string;
}

const NumberPieceDefault : INumberPiece = {
	sign: '',
	whole: '',
	decimal: '',
	fractional: '',
	exponentMarker: '',
	exponentSign: '',
	exponent: '',
	type: 'number',
	other: ''
}


// function parseMacro(text:string, numArray: Array<INumber>){
	
// }

function parseDigits(text:string, numArray: Array<INumberPiece>){
	let num = numArray[numArray.length - 1];
	if (num.type != 'number'){
		num = {...NumberPieceDefault};
		numArray.push(num);
	}
	if (num.exponentMarker != '') {
		num.exponent += text;
	} else if (num.decimal != '') {
		num.fractional += text;
	} else {
		num.whole += text;
	}
}

function parseDecimals(text: string, numArray: Array<INumberPiece>){
	let num = numArray[numArray.length - 1];
	if (num.type != 'number'){
		num = {...NumberPieceDefault};
		numArray.push(num);
	}
	num.decimal += text;
}

function parseComparators(text:string, numArray: Array<INumberPiece>){
	let num = numArray[numArray.length - 1];
	if (num.type != 'comparator'){
		num = {...NumberPieceDefault, type: 'comparator'};
		numArray.push(num);
	}
	num.other += text;

}

function parseExponentMarkers(text:string, numArray: Array<INumberPiece>){
	let num = numArray[numArray.length - 1];
	if (num.type != 'number'){
		num = {...NumberPieceDefault};
		numArray.push(num);
	}
	num.exponentMarker += text;
}

function parseSigns(text:string, numArray: Array<INumberPiece>){
	let num = numArray[numArray.length - 1];
	if (num.type != 'number'){
		num = {...NumberPieceDefault};
		numArray.push(num);
	}
	if (num.exponentMarker != '') {
		num.exponentSign += text;
	} else {
		num.sign += text;
	}
}

function parseIgnore(text:string, numArray: Array<INumberPiece>){
	// do nothing
}

function generateMapping(options: INumParseOptions): Map<string,(text:string, numArray:Array<INumberPiece>)=>void>{
	const parseMap = new Map<string,(text:string, numArray:Array<INumberPiece>)=>void>();
	//parseMap.set('\\', parseMacro);
	let tempArray;
	var matchMacrosOrChar = /[^\\\s]|(?:\\[^\\]*(?=\s|\\|$))/g;
	while ((tempArray = matchMacrosOrChar.exec(options.inputDigits)) !== null) {
		parseMap.set(tempArray[0], parseDigits);
	}
	while ((tempArray = matchMacrosOrChar.exec(options.inputDecimalMarkers)) !== null) {
		parseMap.set(tempArray[0], parseDecimals);
	}
	while ((tempArray = matchMacrosOrChar.exec(options.inputComparators)) !== null) {
		parseMap.set(tempArray[0], parseComparators);
	}
	while ((tempArray = matchMacrosOrChar.exec(options.inputExponentMarkers)) !== null) {
		parseMap.set(tempArray[0], parseExponentMarkers);
	}
	while ((tempArray = matchMacrosOrChar.exec(options.inputSigns)) !== null) {
		parseMap.set(tempArray[0], parseSigns);
	}
	while ((tempArray = matchMacrosOrChar.exec(options.inputIgnore)) !== null) {
		parseMap.set(tempArray[0], parseIgnore);
	}

	return parseMap;
}



const exponentModeMap = new Map<string, (pieces:Array<INumberPiece>, options: INumPostOptions)=>void>([
	['input', (pieces:Array<INumberPiece>, options: INumPostOptions):void => { }],
	['fixed', (pieces:Array<INumberPiece>, options: INumPostOptions):void => {
		const fixed = options.fixedExponent;
		const piece = pieces.find((v)=> v.type == 'number');
		if (piece == null) return;
		const diff = fixed - +(piece.exponentSign + piece.exponent);
		const dir = Math.sign(diff);  // +: move numbers from frac to whole, -: move the other way
		for (let i=0; i< Math.abs(diff); i++){
			if (dir > 0){
				if (piece.fractional.length > 0){
					piece.whole = piece.whole + piece.fractional.slice(0,1);
					piece.fractional = piece.fractional.slice(0, piece.fractional.length - 1);
				} else {
					piece.whole = piece.whole + '0';
				}
			} else {
				if (piece.whole.length > 0){
					piece.fractional = piece.whole.slice(piece.whole.length-1,piece.whole.length) + piece.fractional;
					piece.whole = piece.whole.slice(0, piece.whole.length - 1);
				} else {
					piece.fractional = '0' + piece.fractional ;
				}
			}
		}
		piece.exponent = Math.abs(fixed).toString();
		piece.exponentSign = Math.sign(fixed) < 0 ? '-' : '';
	}],
	['engineering', (pieces:Array<INumberPiece>, options: INumPostOptions):void => { }],
	['scientific', (pieces:Array<INumberPiece>, options: INumPostOptions):void => { }]
]);

function postProcessNumber(pieces:Array<INumberPiece>, options: INumPostOptions){
	exponentModeMap.get(options.exponentMode)(pieces, options);
}

function getNumber(piece: INumberPiece):number{
	return +(piece.sign + piece.whole + (piece.decimal != '' ? '.' : '') + piece.fractional + (piece.exponentMarker != '' ? 'e' : '') + piece.exponentSign + piece.exponent);
}




export function parseNumber(parser:TexParser, text:string, options: INumOptions): MmlNode{
	if (options.parseNumbers){
		const mapping = generateMapping(options);
		text = text.replace('<<','\\ll');
		text = text.replace('>>','\\gg');
		text = text.replace('<=','\\le');
		text = text.replace('>=','\\ge');
		text = text.replace('+-','\\pm');

		const numPieces = new Array<INumberPiece>();
		numPieces.push({...NumberPieceDefault});

		const subParser = new TexParser(text, parser.stack.env, parser.configuration);
		subParser.i=0;
		// process character
		// if '\', then read until next '\' or whitespace char
		while (subParser.i < subParser.string.length) {
			let char = subParser.string.charAt(subParser.i);
			subParser.i++;
			if (char != '\\'){
				if (mapping.has(char)){
					mapping.get(char)(char, numPieces);
				}
			} else {
				let macro = char;
				while (subParser.i < subParser.string.length && char != '\\' && char != ' '){
					char = subParser.string.charAt(subParser.i);
					if (char != '\\' && char != ' '){
						macro += char;
					}
				}
				if (mapping.has(macro)){
					mapping.get(macro)(char, numPieces);
				}
			}
			
		}
		console.log(numPieces);

		postProcessNumber(numPieces,options);

		const displayResult = displayNumber(numPieces, options);

		const mml = (new TexParser(displayResult, parser.stack.env, parser.configuration)).mml();
    	return mml;

	} else {
		const mml = (new TexParser(text, parser.stack.env, parser.configuration)).mml();
		return mml;
	}

}
