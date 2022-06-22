import { MmlNode } from "mathjax-full/js/core/MmlTree/MmlNode";
import TexParser from "mathjax-full/js/input/tex/TexParser";
import { INumOptions } from "./options";


export function parseNumber(parser:TexParser, text:string, options: INumOptions): MmlNode{
    var node = parser.create('node', 'mtext');
    var inner = parser.create('text', text + " testNum");
    node.appendChild(inner);
    return node;
}
