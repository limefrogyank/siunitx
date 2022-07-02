import { INumberPiece, parseNumber } from "./numMethods";
import { INumPostOptions, IOptions } from "./options";
import { GlobalParser } from "./siunitx";

function convertToScientific(num:INumberPiece, options: INumPostOptions) : void {
	//convert to actual number and use formating to print scientific
	const val = (+(num.sign + num.whole + num.decimal + num.fractional + (num.exponent != '' ? ('e' + num.exponentSign + num.exponent): '' ))).toExponential();
	// parse that back in
	const newNum = parseNumber(GlobalParser, val, options as IOptions);

	//don't forget to check for trailing zeros and put them back
	let trailingZeros = 0;
	// count trailing zeros in original fractional part
	if (num.fractional != ''){
		for (let i=num.fractional.length-1; i>=0; i--){
			if (num.fractional[i] == '0'){
				trailingZeros++;
			} else{
				break;
			}
		}
	}
	// count trailing zeros in original whole part (if all of fractional part was zeros)
	if (num.whole != '' && num.fractional.length == trailingZeros){
		for (let i=num.whole.length-1; i>=0; i--){
			if (num.whole[i] == '0'){
				trailingZeros++;
			} else{
				break;
			}
		}
	}
	// add the appropriate number of trailing zeros.
	for(let i=0; i<trailingZeros; i++){
		newNum.fractional += '0';
	}
	// add a decimal if the original didn't have one, but we need it.
	if (newNum.decimal == '' && trailingZeros > 0){
		newNum.decimal = '.';
	}
	// copy the new values to the original reference
	for (let prop in num){
		num[prop] = newNum[prop];
	}
}

function convertToXExponent(num:INumberPiece, targetExponent: number, options: INumPostOptions){
	if (num == null) return;
	// count difference between target exponent and current one.
	const diff = targetExponent - +(num.exponentSign + num.exponent);
	const dir = Math.sign(diff);  // -: move numbers from frac to whole, +: move the other way
	for (let i=0; i< Math.abs(diff); i++){
		if (dir < 0){
			if (num.fractional.length > 0){
				num.whole = num.whole + num.fractional.slice(0,1);
				num.fractional = num.fractional.slice(1, num.fractional.length);
			} else {
				num.whole = num.whole + '0';
			}
		} else {
			if (num.whole.length > 0){
				num.fractional = num.whole.slice(num.whole.length-1, num.whole.length) + num.fractional;
				num.whole = num.whole.slice(0, num.whole.length - 1);
			} else {
				num.fractional = '0' + num.fractional;
			}
		}
	}
	if (num.fractional != '' && num.decimal == ''){
		num.decimal = '.';
	}
	num.exponent = Math.abs(targetExponent).toString();
	num.exponentSign = Math.sign(targetExponent) < 0 ? '-' : '';
}

function convertToEngineering(num:INumberPiece, options: INumPostOptions):void {
	// similar to convertToFixed except we calculate the exponent to be a power of three that keeps the whole number part non-zero.
		
	// convert to scientific, then move decimal...
	convertToScientific(num, options);
	let targetExponent = +(num.exponentSign + num.exponent);
	while (targetExponent % 3 != 0) {
		targetExponent--;
	}
		
	convertToXExponent(num, targetExponent, options);
	
}

function convertToFixed(num:INumberPiece, options: INumPostOptions):void {
	// convert to scientific, then move decimal...
	convertToScientific(num, options);
	
	convertToXExponent(num, options.fixedExponent, options);
}

const exponentModeMap = new Map<string, (num:INumberPiece, options: INumPostOptions)=>void>([
	['input', (num:INumberPiece, options: INumPostOptions):void => { }],  // leave number as-is
	['fixed', convertToFixed],
	['engineering', convertToEngineering],
	['scientific', convertToScientific]
]);

function shouldRoundUp(toRound:number, firstDrop:number, roundEven:boolean):boolean{
	let result = false;
	if (firstDrop > 5){
		result = true;	
	} else if (firstDrop == 5) {
		if (roundEven){
			if (toRound % 2 == 0){
				result = false;
			} else {
				result = true;
			}
		} else {
			result = true;
		}
	}

	return result;
}

function roundUp(fullNumber:string, position:number, options:INumPostOptions):string{
	let result = '';
	let reverseNumArr = new Array<number>();
	let digit = +fullNumber[position] + 1;
	let roundedNine = digit == 0 ? true : false;
	console.log(fullNumber);
	console.log(position);
	reverseNumArr.push(digit); 
	for (let i=position-1; i >= 0; i--) {
		if (roundedNine){
			digit = +fullNumber[i] + 1;
			roundedNine = digit == 0 ? true : false;
			reverseNumArr.push(digit);
		} else {
			digit = +fullNumber[i];
			reverseNumArr.push(digit);
		}
	}
	console.log(reverseNumArr);
	reverseNumArr.reverse();
	reverseNumArr.forEach(v=> result+=v);
	return result;
}

function roundPlaces(num:INumberPiece, options: INumPostOptions):void{
	if (num.fractional.length > options.roundPrecision) {
		console.log('rounding!');
		console.log(num.whole + num.decimal + num.fractional);
		const firstDrop = +num.fractional.slice(options.roundPrecision, options.roundPrecision+1);
		const toRound = +num.fractional.slice(options.roundPrecision - 1, options.roundPrecision);
		console.log(firstDrop);
		console.log(toRound);
		if (shouldRoundUp(toRound, firstDrop, options.roundHalf == 'even')){
			const result = roundUp(num.whole + num.fractional, num.whole.length + options.roundPrecision - 1, options);
			console.log(result);
			const wholeLength = num.whole.length;
			num.whole = result.slice(0,wholeLength);
			num.fractional = result.slice(wholeLength, result.length);
		} else {
			num.fractional = num.fractional.slice(0, options.roundPrecision);
		}

	} else if (num.fractional.length < options.roundPrecision && options.roundPad) {
		for (var i = 0; i < options.roundPrecision-num.fractional.length; i++){
			num.fractional += '0';  // pad with zeros
		}
	} else {
		//no rounding needed.
	}
}

function roundFigures(num:INumberPiece, options: INumPostOptions):void{

}

function roundUncertainty(num:INumberPiece, options: INumPostOptions):void{

}

const roundModeMap = new Map<string, (num:INumberPiece, options: INumPostOptions)=>void>([
	['none', (num:INumberPiece, options: INumPostOptions):void =>{}],
	['places', roundPlaces],
	['figures', roundFigures],
	['uncertainty', roundUncertainty]
]);

export function postProcessNumber(num:INumberPiece, options: INumPostOptions){
	
	if (options.dropUncertainty){
		num.uncertainty.splice(0, num.uncertainty.length);
	}
	if (options.dropExponent){
		num.exponentMarker = '';
		num.exponentSign = '';
		num.exponent = '';
	}

	roundModeMap.get(options.roundMode)(num, options);
	
	exponentModeMap.get(options.exponentMode)(num, options);


	// remove any explicit plus in exponent
	if (num.exponentSign == '+') num.exponentSign = '';
}
