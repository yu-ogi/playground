import * as jb from "js-base64";

export function encode(str: string): string {
	return jb.encode(str, true);
}

export function decode(str: string): string {
	return jb.decode(str);
}
