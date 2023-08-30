import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { useExtraLibsResolver } from "~/composables/useExtraLibsResolver";

describe("useExtraLibsResolver", () => {
	let mockAxios: MockAdapter;

	beforeEach(() => {
		mockAxios = new MockAdapter(axios);
	});

	test("gets the uri of given module names", () => {
		const extraLibResolver = useExtraLibsResolver();
		expect(extraLibResolver.getExtraLibUris("3.0.0", ["g", "@akashic/trigger"])).toEqual([
			"types/3.0.0/akashic-engine.d.ts",
			"types/3.0.0/trigger.d.ts"
		]);
	});

	test("ignores unknown module names", () => {
		const extraLibResolver = useExtraLibsResolver();
		expect(extraLibResolver.getExtraLibUris("3.0.0", ["unknown", "@akashic/pdi-types"])).toEqual(["types/3.0.0/pdi-types.d.ts"]);
	});

	test("gets type definition file from module names", async () => {
		mockAxios.onGet("types/3.0.0/akashic-engine.d.ts").reply(() => {
			return [200, "dummy data (akashic-engine.d.ts)"];
		});
		mockAxios.onGet("types/3.0.0/playlog.d.ts").reply(() => {
			return [200, "dummy data (playlog.d.ts)"];
		});

		const extraLibResolver = useExtraLibsResolver();
		const uris = extraLibResolver.getExtraLibUris("3.0.0", ["g", "@akashic/playlog"]);
		await extraLibResolver.fetchExtraLibsFromUris(uris);

		expect(extraLibResolver.extraLibs).toEqual([
			{
				content: "dummy data (akashic-engine.d.ts)",
				filePath: undefined
			},
			{
				content: "dummy data (playlog.d.ts)",
				filePath: undefined
			}
		]);
	});
});
