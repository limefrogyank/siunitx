import { TwoWayMap } from "./twoWayMap";


export const unitSymbol : TwoWayMap<string, string> = new TwoWayMap<string,string>(new Map<string,string>([
	['m','meter'],
	['g','gram'],
	['s','second']
]));

export const prefixSymbol: TwoWayMap<string,string> = new TwoWayMap<string,string>(new Map<string,string>([
	['Y','yotta'],
	['Z','zetta'],
	['E','exa'],
	['P','peta'],
	['T','tera'],
	['G','giga'],
	['M','mega'],
	['k','kilo'],
	['h','hecto'],
	['da','deka'],
	['d','deci'],
	['c','centi'],
	['m','milli'],
	['u','micro'],
	['n','nano'],
	['p','pico'],
	['f','femto'],
	['a','atto'],
	['z','zepto'],
	['y','yocto']
]));