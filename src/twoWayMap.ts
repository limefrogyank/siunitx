// adapted from https://stackoverflow.com/a/21070876/1938624

export class TwoWayMap{
	private map: Map<string,string>;
	private reverseMap: Map<string,string>;

	constructor(map:Map<string,string>){
		this.map = map;
		this.reverseMap = new Map<string,string>();

		map.forEach((v,k,m)=>{
			this.reverseMap.set(v,k);
		});
	}

	public get(key:string) { return this.map.get(key); }

	public revGet(key:string) { return this.reverseMap.get(key); }
	
}