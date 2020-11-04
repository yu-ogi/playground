export type AkashicEngineVersion = AkashicEngineVersionV1;

export interface AkashicEngineVersionV1 {
	version: "1";
	akashicEngineVersions: {
		version: string;
		name: string;
	}[];
}
