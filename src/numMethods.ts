import { MmlNode } from "mathjax-full/js/core/MmlTree/MmlNode";
import TexError from "mathjax-full/js/input/tex/TexError";
import TexParser from "mathjax-full/js/input/tex/TexParser";
import { displayOutput } from "./numDisplayMethods";
import { INumOptions, INumOutputOptions, INumParseOptions, INumPostOptions } from "./options";



export interface INumberPiece {
	prefix: string;
	sign: string;
	whole: string;
	decimal: string;
	fractional: string;
	exponentMarker: string;
	exponentSign: string;
	exponent: string;
	//type: 'number'|'uncertainty'|'comparator';
	uncertainty: Array<INumberPiece>;
	completed: boolean; // mostly for uncertainty
}

const NumberPieceDefault : INumberPiece = {
	prefix: '',
	sign: '',
	whole: '',
	decimal: '',
	fractional: '',
	exponentMarker: '',
	exponentSign: '',
	exponent: '',
	//type: 'number',
	uncertainty: null,
	completed:false
}

function generateNumberPiece():INumberPiece{
	const piece = {...NumberPieceDefault};
	piece.uncertainty = new Array<INumberPiece>();
	return piece;
}

// function parseMacro(text:string, numArray: Array<INumber>){
	
// }

function parseDigits(text:string, numPiece: INumberPiece){
	let num: INumberPiece;
	if (numPiece.uncertainty.length > 0){
		num = numPiece.uncertainty[numPiece.uncertainty.length-1];
	} else {
		num = numPiece;
	}
	if (num.exponentMarker != '') {
		num.exponent += text;
	} else if (num.decimal != '') {
		num.fractional += text;
	} else {
		num.whole += text;
	}
}

function parseDecimals(text: string, numPiece: INumberPiece){
	let num: INumberPiece;
	if (numPiece.uncertainty.length > 0){
		num = numPiece.uncertainty[numPiece.uncertainty.length-1];
	} else {
		num = numPiece;
	}
	num.decimal += text;
}

function parseComparators(text:string, numPiece: INumberPiece){
	let num: INumberPiece;
	if (numPiece.uncertainty.length > 0){
		num = numPiece.uncertainty[numPiece.uncertainty.length-1];
	} else {
		num = numPiece;
	}

	num.prefix += text;

}

function parseExponentMarkers(text:string, numPiece: INumberPiece){
	let num: INumberPiece;
	if (numPiece.uncertainty.length > 0){
		num = numPiece.uncertainty[numPiece.uncertainty.length-1];
	} else {
		num = numPiece;
	}
	num.exponentMarker += text;
}

function parseSigns(text:string, numPiece: INumberPiece){
	let num: INumberPiece;
	if (numPiece.uncertainty.length > 0){
		num = numPiece.uncertainty[numPiece.uncertainty.length-1];
	} else {
		num = numPiece;
	}
	if (num.exponentMarker != '') {
		num.exponentSign += text;
	} else {
		num.sign += text;
	}
}

function parseOpenUncertainty(text:string, numPiece: INumberPiece){
	let uncertainty = {...NumberPieceDefault};
	numPiece.uncertainty.push(uncertainty);
}

function parseCloseUncertainty(text:string, numPiece: INumberPiece){
	if (numPiece.uncertainty.length == 0){
		throw new TexError('50', 'No uncertainty parsed to close.');
	}
	let uncertainty = numPiece.uncertainty[numPiece.uncertainty.length -1];
	if (uncertainty.completed){
		throw new TexError('51', 'Uncertainty was already closed.');
	}
	uncertainty.completed = true;
}

function parseIgnore(text:string, numPiece: INumberPiece){
	// do nothing
}

function generateMapping(options: INumParseOptions): Map<string,(text:string, numPiece: INumberPiece)=>void>{
	const parseMap = new Map<string,(text:string, numPiece: INumberPiece)=>void>();
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
	while ((tempArray = matchMacrosOrChar.exec(options.inputOpenUncertainty)) !== null) {
		parseMap.set(tempArray[0], parseOpenUncertainty);
	}
	while ((tempArray = matchMacrosOrChar.exec(options.inputCloseUncertainty)) !== null) {
		parseMap.set(tempArray[0], parseCloseUncertainty);
	}

	return parseMap;
}



const exponentModeMap = new Map<string, (num:INumberPiece, options: INumPostOptions)=>void>([
	['input', (num:INumberPiece, options: INumPostOptions):void => { }],
	['fixed', (num:INumberPiece, options: INumPostOptions):void => {
		const fixed = options.fixedExponent;
		//const piece = pieces.find((v)=> v.type == 'number');
		if (num == null) return;
		const diff = fixed - +(num.exponentSign + num.exponent);
		const dir = Math.sign(diff);  // +: move numbers from frac to whole, -: move the other way
		for (let i=0; i< Math.abs(diff); i++){
			if (dir > 0){
				if (num.fractional.length > 0){
					num.whole = num.whole + num.fractional.slice(0,1);
					num.fractional = num.fractional.slice(0, num.fractional.length - 1);
				} else {
					num.whole = num.whole + '0';
				}
			} else {
				if (num.whole.length > 0){
					num.fractional = num.whole.slice(num.whole.length-1,num.whole.length) + num.fractional;
					num.whole = num.whole.slice(0, num.whole.length - 1);
				} else {
					num.fractional = '0' + num.fractional ;
				}
			}
		}
		num.exponent = Math.abs(fixed).toString();
		num.exponentSign = Math.sign(fixed) < 0 ? '-' : '';
	}],
	['engineering', (num:INumberPiece, options: INumPostOptions):void => { }],
	['scientific', (num:INumberPiece, options: INumPostOptions):void => { }]
]);

function postProcessNumber(num:INumberPiece, options: INumPostOptions){
	exponentModeMap.get(options.exponentMode)(num, options);
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

		const num : INumberPiece = generateNumberPiece();

		const subParser = new TexParser(text, parser.stack.env, parser.configuration);
		subParser.i=0;
		// process character
		// if '\', then read until next '\' or whitespace char
		while (subParser.i < subParser.string.length) {
			let char = subParser.string.charAt(subParser.i);
			subParser.i++;
			if (char != '\\'){
				if (mapping.has(char)){
					mapping.get(char)(char, num);
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
					mapping.get(macro)(char, num);
				}
			}
			
		}
		console.log(num);

		postProcessNumber(num,options);

		const displayResult = displayOutput(num, options);

		const mml = (new TexParser(displayResult, parser.stack.env, parser.configuration)).mml();
    	return mml;

	} else {
		const mml = (new TexParser(text, parser.stack.env, parser.configuration)).mml();
		return mml;
	}

}
