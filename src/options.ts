import TexError from "mathjax-full/js/input/tex/TexError";
import TexParser from "mathjax-full/js/input/tex/TexParser";

type PerMode = 'power'| 'fraction' | 'symbol' | 'power-positive-first' | 'repeated-symbol' | 'single-symbol' | 'perMode';
export type QualifierMode = 'subscript' | 'bracket' | 'combine' | 'phrase';
type ExponentMode = 'input' | 'fixed' | 'engineering' | 'scientific';
type RoundMode = 'none' | 'figures' | 'places' | 'uncertainty';
type GroupDigits = 'all' | 'none' | 'decimal' | 'integer';
type UncertaintyMode = 'separate'|'compact'|'full'|'compact-marker';
type UncertaintyDescriptorMode = 'bracket'|'bracket-separator'|'separator'|'subscript';

export interface IUnitOptions {
	interUnitProduct: string;
	perMode: PerMode;
	displayPerMode: PerMode;	// not implemented, global setting
	inlinePerMode: PerMode;		// not implemented, global setting
	perSymbol: string; 
	fractionCommand: string;
	bracketUnitDenominator: boolean;
	perSymbolScriptCorrection: string;
	stickyPer: boolean;
	qualifierMode: QualifierMode;
	qualifierPhrase: string;
	powerHalfAsSqrt: boolean;
	parseUnits: boolean;
	forbidLiteralUnits: boolean;
	unitFontCommand: string;
}

export interface INumParseOptions{
	evaluateExpression: boolean;
	expression: string;
	inputCloseUncertainty: string;
	inputComparators: string;
	inputDecimalMarkers: string;
	inputDigits:string;
	inputExponentMarkers:string;
	inputIgnore:string;
	inputOpenUncertainty: string;
	inputSigns:string;
	inputUncertaintySigns:string;
	parseNumbers:boolean;
	retainExplicitDecimalMarker:boolean;
	retainExplicitPlus:boolean;
	retainNegativeZero:boolean;
	retainZeroUncertainty:boolean;
} 

export interface INumPostOptions{
	dropExponent:boolean;
	dropUncertainty:boolean;
	dropZeroDecimal:boolean;
	exponentMode:ExponentMode;
	fixedExponent:number;
	minimumIntegerDigits:number;
	minimumDecimalDigits:number;
	roundHalf: 'up' | 'even';
	roundMinimum: number;
	roundMode: RoundMode;
	roundPad: boolean;
	roundPrecision: number;
	roundZeroPositive: boolean;
} 

export interface INumOutputOptions {
	bracketNegativeNumbers: boolean;
	digitGroupSize: number;
	digitGroupFirstSize: number;
	digitGroupOtherSize: number;
	exponentBase: string;
	exponentProduct: string;
	groupDigits: GroupDigits;
	groupMinimumDigits: number;
	groupSeparator: string;
	negativeColor: string;
	outputCloseUncertainty: string;
	outputDecimalMarker: string;
	outputExponentMarker: string;
	outputOpenUncertainty: string;
	printImplicitPlus: boolean;
	printUnityMantissa:boolean;
	printZeroExponent:boolean;
	printZeroInteger:boolean;
	tightSpacing:boolean;
	uncertaintyDescriptorMode:UncertaintyDescriptorMode;
	uncertaintyDescriptorSeparator:string;
	uncertaintyDescriptors:string;
	uncertaintyMode: UncertaintyMode;
	uncertaintySeparator: string;
	zeroDecimalAsSymbol: boolean;
	zeroSymbol:string;
}

export interface INumOptions extends INumParseOptions, INumPostOptions, INumOutputOptions { };

export interface IOptions extends IUnitOptions, INumOptions { };

export const UnitOptionDefaults: IUnitOptions = {
    bracketUnitDenominator: true,
    forbidLiteralUnits: false,
    fractionCommand: '\\frac',
	interUnitProduct: '\\,',
	parseUnits: true,
	perMode: 'power',
	displayPerMode: 'perMode',
	inlinePerMode: 'perMode',
	perSymbolScriptCorrection: '\\!',
	perSymbol: '/',
	powerHalfAsSqrt: false,
	qualifierMode: 'subscript',
	qualifierPhrase: '',
	stickyPer: false,
	unitFontCommand: '\\mathrm'
}

export const NumParseOptionDefaults: INumParseOptions = {
    evaluateExpression: false,
	expression: '#1',
	inputCloseUncertainty: ')',
	inputComparators: '<=>\\approx\\ge\\geq\\gg\\le\\leq\\ll\\sim',
	inputDecimalMarkers: '.,',
	inputDigits: '0123456789',
	inputExponentMarkers: 'dDeE',
	inputIgnore:'',
	inputOpenUncertainty:'(',
	inputSigns:'+-', //\\pm\\mp',  // how do I disambiguate a regular sign from an uncertainty sign?
	inputUncertaintySigns: '\\pm\\mp',
	parseNumbers: true,
	retainExplicitDecimalMarker: false,
	retainExplicitPlus: false,
	retainNegativeZero: false,
	retainZeroUncertainty: false
};

export const NumPostOptionDefaults: INumPostOptions = {
	dropExponent: false,
	dropUncertainty:false,
	dropZeroDecimal:false,
	exponentMode: 'input',
	fixedExponent: 0,
	minimumIntegerDigits: 0,
	minimumDecimalDigits: 0,
	roundHalf: 'up',
	roundMinimum: 0,
	roundMode:'none',
	roundPad: true,
	roundPrecision: 2,
	roundZeroPositive: true
};

export const NumOutputOptionDefaults: INumOutputOptions = {
	bracketNegativeNumbers: false,
	digitGroupSize: 3,
	digitGroupFirstSize:-1,  	// These should be -1 so we can detect when they've been explicitly set.
	digitGroupOtherSize:-1,		// Otherwise, digitGroupSize will override them.
	exponentBase: '10',
	exponentProduct: '\\times',
	groupDigits: 'all',
	groupMinimumDigits: 5,
	groupSeparator: '\\,',
	negativeColor: '',
	outputCloseUncertainty:')',
	outputDecimalMarker: '.',
	outputExponentMarker: '',
	outputOpenUncertainty: '(',
	printImplicitPlus: false,
	printUnityMantissa: true,
	printZeroExponent: false,
	printZeroInteger: true,
	tightSpacing: false,
	uncertaintyDescriptorMode: 'bracket-separator',
	uncertaintyDescriptorSeparator: '\\',
	uncertaintyDescriptors: '',
	uncertaintyMode: 'compact',
	uncertaintySeparator: '',
	zeroDecimalAsSymbol: false,
	zeroSymbol: '\\mbox{---}'
}

export const NumOptionDefaults: INumOptions = {...NumParseOptionDefaults, ...NumPostOptionDefaults, ...NumOutputOptionDefaults};

// Needed a new version of TexParser.GetBrackets because it wanted to parse the internal macros automatically.  
// This method just gets the bracketed option string only.
export function findOptions(parser:TexParser): string {
	let options:string;
	if (parser.GetNext() !== '['){
		return options;
	}
	let j = ++parser.i;
	while (parser.i < parser.string.length){
		if (parser.string.charAt(parser.i++) == ']'){
			return parser.string.slice(j, parser.i -1);
		}
	}
	throw new TexError('MissingCloseBracket',
	'Could not find closing \']\' for argument to %1', parser.currentCS);
}

// from https://stackoverflow.com/a/10425344/1938624
function camelCase(input: string) { 
    return input.toLowerCase().replace(/-(.)/g, (match, group) => {
        return group.toUpperCase();
    });
}

export function processOptions(defaultOptions: IOptions, optionString: string) : IOptions {
    const options : IOptions = {...defaultOptions};//{...UnitOptionDefaults};
	if (optionString != null){
		console.log(optionString);
		const optionArray = optionString.split(/,(?!\}|$)/g); // needed so that 'output-decimal-marker = {,}' parses with comma as value
		console.log(optionArray);
		optionArray.forEach((v,i,a)=> {
//			console.log(v);
			let args = v.split('=');
//			console.log(args);
			let prop = camelCase(args[0].trim());
			if (args.length > 1){
				if ( typeof options[prop] === 'number' ){
					options[prop] = +(args[1].trim());
				} else {
					options[prop] = args[1].trim();
				}
			} else {
				options[prop] = true;
			}
		
		});
	}
	//console.log(options);
    return options;
}