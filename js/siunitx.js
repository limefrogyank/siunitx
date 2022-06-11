import { Configuration } from 'mathjax-full/js/input/tex/Configuration';
import { CommandMap } from 'mathjax-full/js/input/tex/SymbolMap';
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
var unitMap = new CommandMap('unitMap', {
    kilo: ['prefixToken']
}, {
    prefixToken: function (parser, name, type) {
        console.log("name: " + name);
        console.log("type: " + type);
        var mml = parser.create('node', 'mtext');
        var text = parser.create('text', 'testing prefix');
        mml.appendChild(text);
        parser.Push(mml);
    }
});
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
var siunitxMap = new CommandMap('siunitxMap', {
    num: ['siunitxToken', 'num'],
    ang: ['siunitxToken', 'ang'],
    unit: ['siunitxToken', 'unit'],
    qty: ['siunitxToken', 'qty']
}, {
    siunitxToken: function (parser, name, type) {
        console.log('got a unit');
        console.log(name);
        console.log(type);
        //const typeClass = (<any>parser.configuration.nodeFactory).mmlFactory.getNodeClass(type);
        //console.log("typeclass is " + typeClass);
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
        //const mml = parser.create('node', 'mtext');
        // if (name == "\\qty")
        // const node = parser.ParseArg(name as string);
        // if (name == '\\qty'){
        //    const node2 = parser.ParseArg(name as string);
        //    parser.Push(node);
        // }
        // const text2 = parser.GetArgument(name as string, true);
        // console.log("text2 is " + text2);
        // if (text2 !== null){
        //    let node = parser.create('text', text2);
        //    mml.appendChild(node);
        // }
        // parser.Push(mml);
        //const mml = parser.create('node', type, [parser.create('text', text)], def);
        //console.log("mml is " + mml);
        //if (type === 'mi') mml.setTeXclass = classORD;
        //parser.string = text;  // mhchem replaces string with alternative latex and reparses that.
        //parser.i=0;  // this resets the parser back to the start and lets mathjax reparse the replacement string.
    }
});
/**
 * The configuration used to enable the MathML macros
 */
var siunitxConfiguration = Configuration.create('siunitx', { handler: { macro: ['siunitxMap', 'unitMap'] } });
//# sourceMappingURL=siunitx.js.map