import { Configuration } from 'mathjax-full/js/input/tex/Configuration';
import { CommandMap } from 'mathjax-full/js/input/tex/SymbolMap';
import { UnitMappings, UnitMethods } from './unitMethods';
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
function parseNumber(parser, text) {
    var node = parser.create('node', 'mtext');
    var inner = parser.create('text', text + " testNum");
    node.appendChild(inner);
    return node;
}
function parseAngle(parser, text) {
    var node = parser.create('node', 'mtext');
    var inner = parser.create('text', text + " testAngle");
    node.appendChild(inner);
    return node;
}
var unitMap = new CommandMap('unitMap', UnitMappings, UnitMethods);
console.log(unitMap);
var siunitxMap = new CommandMap('siunitxMap', {
    num: ['siunitxToken', 'num'],
    ang: ['siunitxToken', 'ang'],
    unit: ['siunitxToken', 'unit'],
    qty: ['siunitxToken', 'qty']
}, {
    siunitxToken: (parser, name, type) => {
        const def = parser.GetBrackets(name);
        console.log("attributes are ");
        console.log(def);
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
                    const node = parser.ParseArg(name);
                    parser.Push(node);
                    break;
                }
            case "\\qty":
                {
                    const node1 = parseNumber(parser, parser.GetArgument(name));
                    parser.Push(node1);
                    const node2 = parser.ParseArg(name);
                    parser.Push(node2);
                    break;
                }
        }
    }
});
var siunitxConfiguration = Configuration.create('siunitx', { handler: { macro: ['siunitxMap', 'unitMap'] } });
//# sourceMappingURL=siunitx.js.map