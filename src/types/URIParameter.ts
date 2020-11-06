export type URIParameter = URIGameJSONParameter;

export interface URIGameJSONParameter {
	type: "gameJsonUri";
	name: string;
	uri: string;
}
