import { MmlNode } from 'mathjax-full/js/core/MmlTree/MmlNode';
import { Configuration } from 'mathjax-full/js/input/tex/Configuration';
import { CommandMap } from 'mathjax-full/js/input/tex/SymbolMap';
import TexError from 'mathjax-full/js/input/tex/TexError';
import TexParser from 'mathjax-full/js/input/tex/TexParser';
import { parseNumber } from './numMethods';
import { findOptions, IOptions, IUnitOptions, NumOptionDefaults, processOptions2, UnitOptionDefaults } from './options';
import { parseUnit } from './unitMethods';


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


function parseAngle(parser:TexParser, text:string):MmlNode {
    var node = parser.create('node', 'mtext');
    var inner = parser.create('text', text + " testAngle");
    node.appendChild(inner);
    return node;
}

const methodMap = new Map<string, (parser: TexParser,name:string, options?:IOptions )=>MmlNode>([
    ['\\num', (parser: TexParser,name:string, options?:IOptions ):MmlNode =>{ 
        const node = parseNumber(parser, parser.GetArgument(name), options);
        return node;
    }],
    ['\\ang', (parser: TexParser,name:string, options?:IOptions ):MmlNode =>{ 
        const node = parseAngle(parser, parser.GetArgument(name));
        return node;
    }],
    ['\\unit', (parser: TexParser,name:string, options?:IOptions ):MmlNode =>{ 
        const text = parser.GetArgument(name);
        const node = parseUnit(parser, text, options);
        return node;
    }],
    ['\\qty', (parser: TexParser,name:string, options?:IOptions ):MmlNode =>{ 
        const node1 = parseNumber(parser, parser.GetArgument(name), options);
        parser.Push(node1);
        const text = parser.GetArgument(name);
        const node = parseUnit(parser, text, options);
        return node;
    }],

])

const siunitxMap = new CommandMap('siunitxMap', {
    num: ['siunitxToken', 'num'],
    ang: ['siunitxToken', 'ang'],
    unit: ['siunitxToken', 'unit'],
    qty: ['siunitxToken', 'qty']
}, {
    siunitxToken: (parser, name, type) => {
        const options = processOptions2(parser.options as IOptions, findOptions(parser));

        //parser.configuration.packageData.set('siunitx', options);

        //hack to get display mode (display or inline)
        // const testNode = parser.create('node', 'mtext');
        // const testdisplay = isDisplay(testNode);
        // console.log(testdisplay);
        const node = methodMap.get(name as string)(parser,name as string,options);
        // console.log(parser);
        parser.Push(node);
        // const display = isDisplay(node);
        // console.log(display);
        
    }
});

function isDisplay(node: MmlNode): boolean {
    //const {displaystyle, scriptlevel} = node.attributes.getList('displaystyle', 'scriptlevel');
    const {displaystyle} = node.attributes.getList('displaystyle');
    console.log(displaystyle);
    return displaystyle == true;
  }


var siunitxConfiguration = Configuration.create('siunitx', { handler: { macro: ['siunitxMap'] }, options: {...UnitOptionDefaults, ...NumOptionDefaults} });
