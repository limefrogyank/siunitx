import TexError from "mathjax-full/js/input/tex/TexError";
import TexParser from "mathjax-full/js/input/tex/TexParser";

type PerMode = 'fraction' | 'symbol' | 'power-positive-first' | 'repeated-symbol' | 'single-symbol';
type QualifierMode = 'subscript' | 'bracket' | 'combine' | 'phrase';

export interface IUnitOptions {
	interUnitProduct?: string;

	perMode?: PerMode;
	displayPerMode?: PerMode;
	inlinePerMode?: PerMode;
	perSymbol?: string; 
	fractionCommand?: string;
	bracketUnitDenominator?: boolean;

	perSymbolScriptCorrection?: string;

	stickyPer?: boolean;

	qualifierMode?: QualifierMode;
	qualifierPhrase?: string;

	powerHalfAsSqrt?: boolean;

	parseUnits?: boolean;

	forbidLiteralUnits?: boolean;

	unitFontCommand?: string;
}

export interface INumOptions{

} 

export interface IOptions extends IUnitOptions, INumOptions { };

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

export function processOptions(optionString: string) : IOptions {
    console.log("attributes are ");
    console.log(optionString);
    const options : IOptions = {};
	if (optionString != null){
		const optionArray = optionString.split(',');
		console.log(optionArray);
		optionArray.forEach((v,i,a)=>{
			let args = v.split('=');
			let prop = camelCase(args[0].trim());
			console.log(prop);
			if (args.length > 1){
				options[prop] = args[1].trim();
			} else {
				options[prop] = true;
			}
		
		});
	}
	console.log(options);
    return options;
}