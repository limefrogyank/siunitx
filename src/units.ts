import { TwoWayMap } from "./twoWayMap";


export const unitSymbol : TwoWayMap<string, string> = new TwoWayMap<string,string>(new Map<string,string>([
	['meter','m'],
	['metre','m'],
	['gram','g'],
	['second','s']
]));

export const prefixSymbol: TwoWayMap<string,string> = new TwoWayMap<string,string>(new Map<string,string>([
	['yotta','Y'],
	['zetta','Z'],
	['exa','E'],
	['peta','P'],
	['tera','T'],
	['giga','G'],
	['mega','M'],
	['kilo','k'],
	['hecto','h'],
	['deka','da'],
	['deca','da'],
	['deci','d'],
	['centi','c'],
	['milli','m'],
	['micro','u'],
	['nano','n'],
	['pico','p'],
	['femto','f'],
	['atto','a'],
	['zepto','z'],
	['yocto','y']
]));