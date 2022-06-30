import { INumberPiece, IUncertainty } from "./numMethods";
import { INumOutputOptions } from "./options";
import { prefixSymbol } from "./units";

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


function convertUncertaintyToPlusMinus(uncertainty: IUncertainty, piece:INumberPiece, options: INumOutputOptions) : void {
	if (uncertainty.type != 'pm') {
		// if there's a decimal in the uncertainty, then it's ok to display as-is
		if (uncertainty.decimal == ''){
			// add zeros, move whole to fraction part, and potentially add decimal and whole
			const diff = piece.fractional.length - uncertainty.whole.length;
			if (diff >= 0 ){
				for (let i=0; i<diff; i++){
					uncertainty.fractional += "0";
				}
				uncertainty.fractional += uncertainty.whole;
				uncertainty.whole = '0';
				uncertainty.decimal = options.outputDecimalMarker; 
			} else {
				// uncertainty is bigger than fraction.  Need to add a decimal!
				// TO DO
			}
			
		}
	}
}

function convertUncertaintyToBracket(uncertainty: IUncertainty, piece:INumberPiece, options: INumOutputOptions) : void {
	if (uncertainty.type == 'bracket') {
		// check to make sure that uncertainty doesn't need a decimal point via 'compact marker'
		const diff = uncertainty.whole.length - piece.fractional.length;
		if (diff > 0 && options.uncertaintyMode == 'compact-marker'){
			uncertainty.fractional = uncertainty.whole.slice(diff, uncertainty.whole.length);
			uncertainty.whole = uncertainty.whole.slice(0, diff);
			uncertainty.decimal = options.outputDecimalMarker;
		}
		
	} else {
		//easiest way is to convert to a number and check if less than zero
		const strNum = uncertainty.whole + uncertainty.decimal + uncertainty.fractional;
		const num = +(strNum);
		// if less than 1 (just a fraction), then remove leading zeros.  Else leave it as is.
		if (num < 1) {
			let position=0;
			for (let i=0; i<uncertainty.fractional.length;i++){
				if (uncertainty.fractional[i] != '0'){
					break;
				}
				position++;
			}
			uncertainty.whole = uncertainty.fractional.slice(position, uncertainty.fractional.length);
			uncertainty.decimal = '';
			uncertainty.fractional = '';
		}
	}
}

function displayUncertaintyBracket(uncertainty: IUncertainty, options: INumOutputOptions):string{
	let output = options.uncertaintySeparator;
	output += options.outputOpenUncertainty;
	output += uncertainty.whole;
	output += options.uncertaintyMode == 'compact-marker' && uncertainty.decimal != '' ? options.outputDecimalMarker : '';
	output += uncertainty.fractional; 
	output += options.outputCloseUncertainty;
	return output;
}

function displayUncertaintyPlusMinus(uncertainty: IUncertainty, options: INumOutputOptions):string{
	let output = '\\pm';
	return output + displayNumber(uncertainty, options);
}

const uncertaintyModeMapping = new Map<string, ( uncertainty:IUncertainty, value: INumberPiece, options: INumOutputOptions)=>string>([
	['separate', (uncertainty: IUncertainty, value:INumberPiece, options: INumOutputOptions):string => {
		convertUncertaintyToPlusMinus(uncertainty, value, options);
		return displayUncertaintyPlusMinus(uncertainty, options);
	}],
	['compact', (uncertainty:IUncertainty,value: INumberPiece,  options: INumOutputOptions):string => {
		convertUncertaintyToBracket(uncertainty, value, options);
		return displayUncertaintyBracket(uncertainty, options);
	}],
	['full', (uncertainty:IUncertainty,value: INumberPiece, options: INumOutputOptions):string => {
		convertUncertaintyToBracket(uncertainty, value, options);
		return displayUncertaintyBracket(uncertainty, options);
	}],
	['compact-marker', (uncertainty:IUncertainty,value: INumberPiece,  options: INumOutputOptions):string => {
		convertUncertaintyToBracket(uncertainty, value, options);
		return displayUncertaintyBracket(uncertainty, options);
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
	return output;
}

export function displayOutput(num:INumberPiece, options: INumOutputOptions):string{

	groupNumbersMap.get(options.groupDigits)(num, options);
	console.log(num);
	//const piece = pieces.find((v)=> v.type == 'number');
	let output = '';
	
	// display any prefix symbol such as less than, greater than, etc.
	output += num.prefix;
	
	// display main number
	output += displayNumber(num, options);
	
	// display uncertanties
	num.uncertainty.forEach(v=>{
		output += uncertaintyModeMapping.get(options.uncertaintyMode)(v,num,options);
	});
	
	return output;
}