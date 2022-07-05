import { TeX } from 'mathjax-full/js/input/tex';
import { Configuration, ParserConfiguration } from 'mathjax-full/js/input/tex/Configuration';
import { CommandMap } from 'mathjax-full/js/input/tex/SymbolMap';
import TexParser from 'mathjax-full/js/input/tex/TexParser';
import { processAngle } from './angMethods';
import { processNumber } from './numMethods';
import { AngleOptionDefaults, findOptions, NumOptionDefaults, UnitOptionDefaults } from './options';
import { processQuantity } from './qtyMethods';
import { processUnit } from './unitMethods';
import { userDefinedUnitOptions, userDefinedUnits } from './units';



const methodMap = new Map<string, (parser: TexParser)=>void>([
    ['\\num', (parser: TexParser):void =>{ 
        const node = processNumber(parser);
        parser.Push(node);
    }],
    ['\\ang', (parser: TexParser):void =>{ 
        const node = processAngle(parser);
        parser.Push(node);
    }],
    ['\\unit', (parser: TexParser):void =>{ 
        const node = processUnit(parser);
        parser.Push(node);
    }],
    ['\\qty', (parser: TexParser):void =>{ 
        processQuantity(parser);
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

export let GlobalParser:TexParser;

export const UserDefinedUnitsKey = 'siunitxUnits';
export const UserDefinedUnitOptionsKey = 'siunitxUnitOptions';

new CommandMap('siunitxMap', {
    num: ['siunitxToken', 'num'],
    ang: ['siunitxToken', 'ang'],
    unit: ['siunitxToken', 'unit'],
    qty: ['siunitxToken', 'qty'],
    DeclareSIUnit: ['siunitxGlobal', 'DeclareSIUnit']
}, {
    siunitxToken: (parser, name) => {
        GlobalParser = parser;
        //const options = processOptions(parser.options as IOptions, findOptions(parser));
        //hack to get display mode (display or inline)
        // const testNode = parser.create('node', 'mtext');
        // const testdisplay = isDisplay(testNode);
        // console.log(testdisplay);
        methodMap.get(name as string)(parser);
        // console.log(parser);
        // const display = isDisplay(node);
        // console.log(display);    
        const user = parser.configuration.packageData.get(UserDefinedUnitsKey);
        const userOptions = parser.configuration.packageData.get(UserDefinedUnitOptionsKey);
        console.log(user);
        console.log(userOptions);
    },
    siunitxGlobal: (parser, name) => {
        GlobalParser = parser;
        const options = findOptions(parser);
        console.log(options);
        declareMap.get(name as string)(parser,name as string, options);
        
    }
});

// function isDisplay(node: MmlNode): boolean {
//     //const {displaystyle, scriptlevel} = node.attributes.getList('displaystyle', 'scriptlevel');
//     const {displaystyle} = node.attributes.getList('displaystyle');
//     console.log(displaystyle);
//     return displaystyle == true;
// }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const config = (_config: ParserConfiguration, jax: TeX<any, any, any>) => {
    console.log(_config.options);
    jax.parseOptions.packageData.set(UserDefinedUnitsKey, userDefinedUnits);
    jax.parseOptions.packageData.set(UserDefinedUnitOptionsKey, userDefinedUnitOptions);
};

Configuration.create('siunitx', 
{ 
    handler: { 
        macro: ['siunitxMap'] 
    }, 
    options: {...UnitOptionDefaults, ...NumOptionDefaults, ...AngleOptionDefaults},
    config: config
});
