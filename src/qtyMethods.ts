import TexParser from "mathjax-full/js/input/tex/TexParser";
import { displayOutput } from "./numDisplayMethods";
import { parseNumber } from "./numMethods";
import { postProcessNumber } from "./numPostProcessMethods";
import { findOptions, IOptions, processOptions } from "./options";
import { displayUnits, parseUnit } from "./unitMethods";


export function processQuantity(parser:TexParser): void {
	let globalOptions : IOptions = {...parser.options as IOptions};

	const localOptionString = findOptions(parser);        

	processOptions(globalOptions, localOptionString);


	const numString = parser.GetArgument('num');
	const unitString = parser.GetArgument('unit');

	

	if (globalOptions.parseNumbers){

		// going to assume evaluate expression is processed first, THEN the result is parsed normally
		if (globalOptions.evaluateExpression){
			// TO-DO (BIG ONE)
		}

		const num = parseNumber(parser,numString,globalOptions);

		postProcessNumber(num,globalOptions);

		const displayResult = displayOutput(num, globalOptions);

		const numNode = (new TexParser(displayResult, parser.stack.env, parser.configuration)).mml();
		parser.Push(numNode);

	} else {
		const numNode = (new TexParser(numString, parser.stack.env, parser.configuration)).mml();
		parser.Push(numNode);
	}

	globalOptions = {...parser.options as IOptions};

	const unitPieces = parseUnit(parser, unitString, globalOptions, localOptionString);

	let unitResult = displayUnits(parser, unitPieces, globalOptions);

	unitResult = globalOptions.quantityProduct + unitResult;
	
	const unitNode = (new TexParser(unitResult, parser.stack.env, parser.configuration)).mml();
	
	parser.Push(unitNode);

}