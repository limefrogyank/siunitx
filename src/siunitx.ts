import { MmlNode } from 'mathjax-full/js/core/MmlTree/MmlNode';
import { Configuration } from 'mathjax-full/js/input/tex/Configuration';
import { CommandMap } from 'mathjax-full/js/input/tex/SymbolMap';
import TexError from 'mathjax-full/js/input/tex/TexError';
import TexParser from 'mathjax-full/js/input/tex/TexParser';
import { findOptions, IUnitOptions, processOptions } from './options';
import { manualUnitParse, UnitMappings, UnitMethods } from './unitMethods';
import { prefixSymbol } from './units';

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

function parseNumber(parser:TexParser, text:string) :MmlNode{
    var node = parser.create('node', 'mtext');
    var inner = parser.create('text', text + " testNum");
    node.appendChild(inner);
    return node;
}

function parseAngle(parser:TexParser, text:string):MmlNode {
    var node = parser.create('node', 'mtext');
    var inner = parser.create('text', text + " testAngle");
    node.appendChild(inner);
    return node;
}


const unitMap = new CommandMap('unitMap', 
	UnitMappings,
	UnitMethods);

const siunitxMap = new CommandMap('siunitxMap', {
    num: ['siunitxToken', 'num'],
    ang: ['siunitxToken', 'ang'],
    unit: ['siunitxToken', 'unit'],
    qty: ['siunitxToken', 'qty']
}, {
    siunitxToken: (parser, name, type) => {
        const options = processOptions(findOptions(parser));
        parser.configuration.packageData.set('siunitx', options);

        switch (name) {
            case "\\num":
                {
                    const node = parseNumber(parser, parser.GetArgument(name));
                    parser.Push(node);
                    break;
                }
            case "\\ang":
                {
                    const node = parseAngle(parser, parser.GetArgument(name));
                    parser.Push(node);
                    break;
                }
            case "\\unit":
                {
                    const text = parser.GetArgument(name);
                    if (text.startsWith('\\')){
                        const node = new TexParser(text, parser.stack.env, parser.configuration).mml();
                        parser.Push(node);
                    } else {
                        const node = manualUnitParse(parser, text);
                        parser.Push(node);
                    }
                    break;
                }
            case "\\qty":
                {
                    const node1 = parseNumber(parser, parser.GetArgument(name));
                    parser.Push(node1);
                    const text = parser.GetArgument(name);
                    if (text.startsWith('\\')){
                        const node = new TexParser(text, parser.stack.env, parser.configuration).mml();
                        parser.Push(node);
                    } else {
                        const node = manualUnitParse(parser, text);
                        parser.Push(node);
                    }
                    break;
                }
        }
       
    }
});

var siunitxConfiguration = Configuration.create('siunitx', { handler: { macro: ['siunitxMap', 'unitMap'] } });
