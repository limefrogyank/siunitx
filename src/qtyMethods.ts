import TexParser from "mathjax-full/js/input/tex/TexParser";
import { displayOutput } from "./numDisplayMethods";
import { INumberPiece, parseNumber } from "./numMethods";
import { convertToFixed, postProcessNumber } from "./numPostProcessMethods";
import { findOptions, IOptions, IQuantityOptions, PrefixMode, processOptions } from "./options";
import { displayUnits, IUnitPiece, parseUnit } from "./unitMethods";
import { prefixPower } from "./units";

function combineExponent(num: INumberPiece, units: IUnitPiece[], options: IQuantityOptions) : void {
	if (num.exponent == '' || (units == null || units.length == 0)){
		return;
	}

	const exponent = +(num.exponentSign + num.exponent);
	let targetExponent:number;
	for (const power of prefixPower.values()){
		if (power >= exponent){
			targetExponent = power;
		} else {
			break;
		}
	}

	const firstUnit = units[0];
	if (firstUnit.prefix != ''){
		const addedPower = prefixPower.get(firstUnit.prefix);
		targetExponent += addedPower;
		// just in case prefix was cm (2) and we added 3, there's no prefix for 5
		while (!prefixPower.revHas(targetExponent)) {
			targetExponent++;
		}
	}
	// set new prefix
	firstUnit.prefix = prefixPower.revGet(targetExponent);
	const newExponent = targetExponent - exponent;
	num.exponent = (Math.abs(newExponent)).toString();
	num.exponentSign = Math.sign(newExponent) > 0 ? '' : '-';
	convertToFixed(num, options);
}

function extractExponent(num: INumberPiece, units: IUnitPiece[], options: IQuantityOptions) : void {
	console.log('not implemented');
}

const prefixModeMap = new Map<PrefixMode, (num: INumberPiece, units: IUnitPiece[], options: IQuantityOptions)=>void>([
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	['input', ():void => { }],
	['combine-exponent', combineExponent],
	['extract-exponent', extractExponent]
]);

export function processQuantity(parser:TexParser): void {
	let globalOptions : IOptions = {...parser.options as IOptions};

	const localOptionString = findOptions(parser);        

	processOptions(globalOptions, localOptionString);


	const numString = parser.GetArgument('num');
	const unitString = parser.GetArgument('unit');

	let numDisplay = '';
	let unitDisplay = '';
	let unitPieces: IUnitPiece[];

	if (globalOptions.parseNumbers){

		// going to assume evaluate expression is processed first, THEN the result is parsed normally
		if (globalOptions.evaluateExpression){
			// TO-DO (BIG ONE)
		}

		const num = parseNumber(parser,numString,globalOptions);
		
		// refresh global options from default
		globalOptions = {...parser.options as IOptions};

		unitPieces = parseUnit(parser, unitString, globalOptions, localOptionString);	

		// convert number and unit if necessary
		prefixModeMap.get(globalOptions.prefixMode)?.(num, unitPieces, globalOptions);
				
		postProcessNumber(num,globalOptions);
		numDisplay = displayOutput(num, globalOptions);
		

	} else {
		// can't do any conversions with number since processing is off
		numDisplay = numString;
		
		// refresh global options from default
		globalOptions = {...parser.options as IOptions};
		unitPieces = parseUnit(parser, unitString, globalOptions, localOptionString);	
		
	}

	unitDisplay = displayUnits(parser, unitPieces, globalOptions);

	unitDisplay = globalOptions.quantityProduct + unitDisplay;

	const numNode = (new TexParser(numDisplay, parser.stack.env, parser.configuration)).mml();
	parser.Push(numNode);


	const unitNode = (new TexParser(unitDisplay, parser.stack.env, parser.configuration)).mml();
	
	parser.Push(unitNode);

}