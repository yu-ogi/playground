export type URIParameter = URIGameJSONParameter;

export interface URIGameJSONParameter {
	type: "gameJSONUri";
	name: string;
	uri: string;
}
