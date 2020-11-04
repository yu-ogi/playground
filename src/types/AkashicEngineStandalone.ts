interface GameConfiguration {
	title?: string;
	description?: string;

	width: number;
	height: number;
	fps?: number;
	main: string;
	assets: any;
	globalScripts?: string[];
	moduleMainScripts?: any;
	defaultLoadingScene?: "default" | "compact" | "none";
}

export { GameConfiguration };

export interface InitializeParameters {
	canvas: HTMLCanvasElement;
	configuration: GameConfiguration;
	assetBaseDir?: string;
	assetLoaderFuncs?: AssetLoaderFunctions;
	mainFunc?: (g: any, args: any) => void;
}

export type Asset = {
	type: string;
	path: string;
	global?: boolean;
	width?: number;
	height?: number;
	duration?: number;
	systemId?: string;
	hint?: any;
	loop?: boolean;
};

export type TextAssetLoaderFunction = (id: string, path: string, callback: (err: Error | null, data: string | undefined) => void) => void;

export interface AssetLoaderFunctions {
	loadScriptAsset?: TextAssetLoaderFunction;
	loadTextAsset?: TextAssetLoaderFunction;
}
