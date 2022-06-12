import { Configuration } from 'mathjax-full/js/input/tex/Configuration';
import { CommandMap } from 'mathjax-full/js/input/tex/SymbolMap';
import { UnitMethods } from './unitMethods';
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
var unitMap = new CommandMap('unitMap', {
    kilo: ['parsePrefixToken']
}, UnitMethods);
var siunitxMap = new CommandMap('siunitxMap', {
    num: ['siunitxToken', 'num'],
    ang: ['siunitxToken', 'ang'],
    unit: ['siunitxToken', 'unit'],
    qty: ['siunitxToken', 'qty']
}, {
    siunitxToken: function (parser, name, type) {
        var def = parser.GetBrackets(name);
        console.log("attributes are ");
        console.log(def);
        switch (name) {
            case "\\num":
                {
                    var node = parseNumber(parser, parser.GetArgument(name));
                    parser.Push(node);
                    break;
                }
            case "\\ang":
                {
                    var node = parseAngle(parser, parser.GetArgument(name));
                    parser.Push(node);
                    break;
                }
            case "\\unit":
                {
                    var node = parser.ParseArg(name);
                    parser.Push(node);
                    break;
                }
            case "\\qty":
                {
                    var node1 = parseNumber(parser, parser.GetArgument(name));
                    parser.Push(node1);
                    var node2 = parser.ParseArg(name);
                    parser.Push(node2);
                    break;
                }
        }
    }
});
var siunitxConfiguration = Configuration.create('siunitx', { handler: { macro: ['siunitxMap', 'unitMap'] } });
//# sourceMappingURL=siunitx.js.map