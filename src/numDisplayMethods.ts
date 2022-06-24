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


const groupNumbersMap = new Map<string,(numPieces:Array<INumberPiece>, options:INumOutputOptions)=>void>([
	['all', (numPieces:Array<INumberPiece>, options:INumOutputOptions):void => {
		console.log(options);
		numPieces.forEach((v)=>{
			v.whole = addSpacing(v.whole, options.digitGroupSize, options.groupMinimumDigits, options.groupSeparator, false, options.digitGroupFirstSize, options.digitGroupOtherSize);
			v.fractional = addSpacing(v.fractional, options.digitGroupSize, options.groupMinimumDigits, options.groupSeparator, true, options.digitGroupFirstSize, options.digitGroupOtherSize);
		});
	}],
	['decimal', (numPieces:Array<INumberPiece>, options:INumOutputOptions):void => {
		console.log(options);
		numPieces.forEach((v)=>{
			v.fractional = addSpacing(v.fractional, options.digitGroupSize, options.groupMinimumDigits, options.groupSeparator, true, options.digitGroupFirstSize, options.digitGroupOtherSize);
		});
	}],
	['integer', (numPieces:Array<INumberPiece>, options:INumOutputOptions):void => {
		console.log(options);
		numPieces.forEach((v)=>{
			v.whole = addSpacing(v.whole, options.digitGroupSize, options.groupMinimumDigits, options.groupSeparator, false, options.digitGroupFirstSize, options.digitGroupOtherSize);
		});
	}],
	['none', (numPieces:Array<INumberPiece>, options:INumOutputOptions):void => {}]
]);


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
	return output;
}

const uncertaintyModeMapping = new Map<string, (piece:INumberPiece, options: INumOutputOptions)=>string>([
	['separate', (piece:INumberPiece, options: INumOutputOptions):string => {
		let output = '\\pm';
		return output;
	}],
	['compact', (piece:INumberPiece, options: INumOutputOptions):string => {
		let output = ''
	}],
	['full', (piece:INumberPiece, options: INumOutputOptions):string => {
		
	}],
	['compact-marker', (piece:INumberPiece, options: INumOutputOptions):string => {
		
	}],
])

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

const displayMapping = new Map<string, (piece:INumberPiece, options: INumOutputOptions)=>string>([
	['number', displayNumber],
	['uncertainty', displayUncertainty],
	['comparator', displayNumber]
])

export function displayOutput(pieces:Array<INumberPiece>, options: INumOutputOptions):string{

	groupNumbersMap.get(options.groupDigits)(pieces, options);

	//const piece = pieces.find((v)=> v.type == 'number');
	let output = '';
	pieces.forEach(v=>{
		output += displayMapping.get(v.type)(v,options);
	});	
	
	return output;
}