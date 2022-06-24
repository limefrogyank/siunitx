import { INumberPiece } from "./numMethods";
import { INumOutputOptions } from "./options";

function addSpacing(text:string, digitGroupSize:number, minimum: number, spacer:string, reverse: boolean, digitGroupFirstSize?: number, digitGroupOtherSize?: number ){
	if (text.length >= minimum){
		let arr = text.split('');
		let adjusted = 0;
		let firstCount= digitGroupFirstSize != -1 ? digitGroupFirstSize : digitGroupSize;
		let fluidCount = firstCount;
		if (reverse){
			for (let i=firstCount; i < arr.length; i+=fluidCount){
				text = text.slice(0,i + adjusted) + spacer + text.slice(i + adjusted, text.length + adjusted);
				adjusted += spacer.length;
				fluidCount = digitGroupOtherSize!= -1 ? digitGroupOtherSize : digitGroupSize;
			}
		} else {
			for (let i=arr.length - firstCount; i >= 0; i-=fluidCount){
				text = text.slice(0,i) + spacer + text.slice(i, text.length + adjusted);
				adjusted += spacer.length;
				fluidCount = digitGroupOtherSize!= -1 ? digitGroupOtherSize : digitGroupSize;
			}
		}
	}
	return text;
}


const groupNumbersMap = new Map<string,(num:INumberPiece, options:INumOutputOptions)=>void>([
	['all', (num:INumberPiece, options:INumOutputOptions):void => {
		console.log(options);
		num.whole = addSpacing(num.whole, options.digitGroupSize, options.groupMinimumDigits, options.groupSeparator, false, options.digitGroupFirstSize, options.digitGroupOtherSize);
		num.fractional = addSpacing(num.fractional, options.digitGroupSize, options.groupMinimumDigits, options.groupSeparator, true, options.digitGroupFirstSize, options.digitGroupOtherSize);

	}],
	['decimal', (num:INumberPiece, options:INumOutputOptions):void => {
		console.log(options);
		num.fractional = addSpacing(num.fractional, options.digitGroupSize, options.groupMinimumDigits, options.groupSeparator, true, options.digitGroupFirstSize, options.digitGroupOtherSize);

	}],
	['integer', (num:INumberPiece, options:INumOutputOptions):void => {
		console.log(options);
		num.whole = addSpacing(num.whole, options.digitGroupSize, options.groupMinimumDigits, options.groupSeparator, false, options.digitGroupFirstSize, options.digitGroupOtherSize);
	}],
	['none', (num:INumberPiece, options:INumOutputOptions):void => {}]
]);


function displayUncertainty(piece:INumberPiece, options: INumOutputOptions) : string {
	let output = piece.sign;
	output += piece.whole;
	output += (piece.decimal != '' ? options.outputDecimalMarker : '');
	output += piece.fractional;
	if (piece.exponentMarker != ''){
		if (options.outputExponentMarker != ''){
			output += options.outputExponentMarker;
			output += piece.exponentSign + piece.exponent;
		} else {
			output += (piece.whole != '' || piece.fractional != '') ? options.exponentProduct : '';
			output += options.exponentBase;
			output += '^{' + piece.exponentSign + piece.exponent + '}';
		}
	}
	return output;
}


const uncertaintyModeMapping = new Map<string, (value: INumberPiece, uncertainty:INumberPiece, options: INumOutputOptions)=>string>([
	['separate', (value: INumberPiece, uncertainty:INumberPiece, options: INumOutputOptions):string => {
		let output = '\\pm';
		return output;
	}],
	['compact', (value: INumberPiece, uncertainty:INumberPiece, options: INumOutputOptions):string => {
		let output = options.outputOpenUncertainty;
		output += options.outputCloseUncertainty;
		return output;
	}],
	['full', (value: INumberPiece, uncertainty:INumberPiece, options: INumOutputOptions):string => {
		let output = '';
		return output;
	}],
	['compact-marker', (value: INumberPiece, uncertainty:INumberPiece, options: INumOutputOptions):string => {
		let output = options.outputOpenUncertainty;
		output += options.outputCloseUncertainty;
		return output;
	}],
])


function displayNumber(piece:INumberPiece, options: INumOutputOptions) : string {
	let output = piece.sign;
	output += piece.whole;
	output += (piece.decimal != '' ? options.outputDecimalMarker : '');
	output += piece.fractional;
	if (piece.exponentMarker != ''){
		if (options.outputExponentMarker != ''){
			output += options.outputExponentMarker;
			output += piece.exponentSign + piece.exponent;
		} else {
			output += (piece.whole != '' || piece.fractional != '') ? options.exponentProduct : '';
			output += options.exponentBase;
			output += '^{' + piece.exponentSign + piece.exponent + '}';
		}
	}

	piece.uncertainty.forEach(v=>{
		output += uncertaintyModeMapping.get(options.uncertaintyMode)(piece,v,options);
	});

	return output;
}

export function displayOutput(num:INumberPiece, options: INumOutputOptions):string{

	groupNumbersMap.get(options.groupDigits)(num, options);
	console.log(num);
	//const piece = pieces.find((v)=> v.type == 'number');
	let output = '';
	
	output += displayNumber(num, options);
		
	
	return output;
}