import { AbstractInputJax } from "mathjax-full/js/core/InputJax";
import { TeX } from "mathjax-full/js/input/tex";
import { ParserConfiguration } from "mathjax-full/js/input/tex/Configuration";
import ParseOptions from "mathjax-full/js/input/tex/ParseOptions";
import { EnvironmentMap } from "mathjax-full/js/input/tex/SymbolMap";
import { TagsFactory } from "mathjax-full/js/input/tex/Tags";
import TexParser from "mathjax-full/js/input/tex/TexParser";
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

	console.log('whole: ' + num.whole);
	console.log('frac: ' + num.fractional);
	console.log('exp: '+ num.exponentSign + num.exponent);

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
	console.log('whole: ' + num.whole);
	console.log('frac: ' + num.fractional);
	console.log('exp: '+ num.exponentSign + num.exponent);
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
	const fixed = options.fixedExponent;
	if (fixed == 0) {
		// remove exponent completely
		convertToScientific(num, options);
		
		convertToXExponent(num, fixed, options);

	} else {
		// convert to scientific, then move decimal...
		convertToScientific(num, options);
		
		convertToXExponent(num, fixed, options);
	}
	
}

const exponentModeMap = new Map<string, (num:INumberPiece, options: INumPostOptions)=>void>([
	['input', (num:INumberPiece, options: INumPostOptions):void => { }],  // leave number as-is
	['fixed', convertToFixed],
	['engineering', convertToEngineering],
	['scientific', convertToScientific]
]);

export function postProcessNumber(num:INumberPiece, options: INumPostOptions){
	exponentModeMap.get(options.exponentMode)(num, options);


	// remove any explicit plus in exponent
	if (num.exponentSign == '+') num.exponentSign = '';
}
