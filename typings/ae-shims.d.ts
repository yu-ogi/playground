// FIXME: 本来は akashic-engine-standalone-builder から参照すべきだが
// 現状そのような作りとなっていないため一旦こちらで型定義を持つ。

import { InitializeParameters } from "~/types/AkashicEngineStandalone";

declare global {
	export class AE {
		static initialize(param: InitializeParameters): () => void;
	}
}
