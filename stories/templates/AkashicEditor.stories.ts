/////
import VueCompositionApi, { inject, provide } from "@vue/composition-api";
import Vue from "vue";

Vue.use(VueCompositionApi);

/////

/////

import AkashicEditor from "~/components/templates/AkashicEditor.vue";
import { useGameContext, useGameContextKey } from "~/composables/useGameContext";
import { useGameJSONResolver, useGameJSONResolverKey, UseGameJSONResolverStore } from "~/composables/useGameJSONResolver";

/////

export default {
	title: "templates / AkashicEditor"
};

export const Default = () => ({
	components: { AkashicEditor },
	setup: () => {
		provide(useGameJSONResolverKey, useGameJSONResolver());
		provide(useGameContextKey, useGameContext());
		const gameConfs = inject(useGameJSONResolverKey) as UseGameJSONResolverStore;
		gameConfs.fetchPseudoFilesFromGameJSON(
			{
				width: 320,
				height: 320,
				fps: 60,
				main: "./script/main.js",
				assets: {
					main: {
						type: "script",
						path: "script/main.js"
					}
				}
			},
			"default"
		);
	},
	template: `
	<div style="height: 100vh;">
		<AkashicEditor />
	</div>
	`
});
