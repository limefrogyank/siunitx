import { MmlNode } from 'mathjax-full/js/core/MmlTree/MmlNode';
import { TeX } from 'mathjax-full/js/input/tex';
import { Configuration, ParserConfiguration } from 'mathjax-full/js/input/tex/Configuration';
import { CommandMap } from 'mathjax-full/js/input/tex/SymbolMap';
import TexError from 'mathjax-full/js/input/tex/TexError';
import TexParser from 'mathjax-full/js/input/tex/TexParser';
import { processAngle } from './angMethods';
import { processNumber } from './numMethods';
import { AngleOptionDefaults, findOptions, IOptions, IUnitOptions, NumOptionDefaults, processOptions, UnitOptionDefaults } from './options';
import { parseUnit } from './unitMethods';
import { userDefinedUnitOptions, userDefinedUnits } from './units';


/**
 * Allowed attributes on any token element other than the ones with default values
 */
var ALLOWED = {
    style: true,
    href: true,
    id: true,
    class: true,
    'per-mode': true
};



const methodMap = new Map<string, (parser: TexParser,name:string, options?:string )=>MmlNode>([
    ['\\num', (parser: TexParser,name:string, options?:string ):MmlNode =>{ 
        const node = processNumber(parser, parser.GetArgument(name), options);
        return node;
    }],
    ['\\ang', (parser: TexParser,name:string, options?:string ):MmlNode =>{ 
        const node = processAngle(parser, parser.GetArgument(name), options);
        return node;
    }],
    ['\\unit', (parser: TexParser,name:string, options?:string ):MmlNode =>{ 
        const text = parser.GetArgument(name);
        const node = parseUnit(parser, text, options);
        return node;
    }],
    ['\\qty', (parser: TexParser,name:string, options?:string ):MmlNode =>{ 
        const node1 = processNumber(parser, parser.GetArgument(name), options);
        parser.Push(node1);
        const text = parser.GetArgument(name);
        const node = parseUnit(parser, text, options);
        return node;
    }],

]);

const declareMap = new Map<string, (parser: TexParser,name:string,options:string)=>void>([
    ['\\DeclareSIUnit', (parser: TexParser,name:string,options:string):void =>{ 
        const userDefinedUnits = parser.configuration.packageData.get(UserDefinedUnitsKey) as Map<string, string>;
        const userDefinedUnitOptions = parser.configuration.packageData.get(UserDefinedUnitOptionsKey) as Map<string, string>;

        const newUnitMacro = parser.GetArgument(name);
        const newSymbol = parser.GetArgument(name);

        userDefinedUnits.set(newUnitMacro, newSymbol);
        if (options !== undefined){
            userDefinedUnitOptions.set(newUnitMacro, options);
        }
    }]

]);

export var GlobalParser:TexParser;

export const UserDefinedUnitsKey = 'siunitxUnits';
export const UserDefinedUnitOptionsKey = 'siunitxUnitOptions';

const siunitxMap = new CommandMap('siunitxMap', {
    num: ['siunitxToken', 'num'],
    ang: ['siunitxToken', 'ang'],
    unit: ['siunitxToken', 'unit'],
    qty: ['siunitxToken', 'qty'],
    DeclareSIUnit: ['siunitxGlobal', 'DeclareSIUnit']
}, {
    siunitxToken: (parser, name, type) => {
        GlobalParser = parser;
        //const options = processOptions(parser.options as IOptions, findOptions(parser));
        const options = findOptions(parser);
        //hack to get display mode (display or inline)
        // const testNode = parser.create('node', 'mtext');
        // const testdisplay = isDisplay(testNode);
        // console.log(testdisplay);
        const node = methodMap.get(name as string)(parser, name as string, options);
        // console.log(parser);
        parser.Push(node);
        // const display = isDisplay(node);
        // console.log(display);    
        const user = parser.configuration.packageData.get(UserDefinedUnitsKey);
        const userOptions = parser.configuration.packageData.get(UserDefinedUnitOptionsKey);
        console.log(user);
        console.log(userOptions);
    },
    siunitxGlobal: (parser, name, type) => {
        GlobalParser = parser;
        const options = findOptions(parser);
        console.log(options);
        declareMap.get(name as string)(parser,name as string, options);
        
    }
});

function isDisplay(node: MmlNode): boolean {
    //const {displaystyle, scriptlevel} = node.attributes.getList('displaystyle', 'scriptlevel');
    const {displaystyle} = node.attributes.getList('displaystyle');
    console.log(displaystyle);
    return displaystyle == true;
}

const config = (_config: ParserConfiguration, jax: TeX<any, any, any>) => {
    jax.parseOptions.packageData.set(UserDefinedUnitsKey, userDefinedUnits);
    jax.parseOptions.packageData.set(UserDefinedUnitOptionsKey, userDefinedUnitOptions);
};

var siunitxConfiguration = Configuration.create('siunitx', 
{ 
    handler: { 
        macro: ['siunitxMap'] 
    }, 
    options: {...UnitOptionDefaults, ...NumOptionDefaults, ...AngleOptionDefaults},
    config: config
});
