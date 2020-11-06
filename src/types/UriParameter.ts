export type UriParameter = GameJsonUriParameter;

export interface GameJsonUriParameter {
	type: "gameJsonUri";
	name: string;
	uri: string;
}
