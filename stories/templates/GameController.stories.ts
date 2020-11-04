/////
import VueCompositionApi, { inject, provide } from "@vue/composition-api";
import Vue from "vue";

Vue.use(VueCompositionApi);

/////

/////

import GameController from "~/components/templates/GameController.vue";
import { useGameContext, useGameContextKey } from "~/composables/useGameContext";
import { useGameJSONResolver, useGameJSONResolverKey, UseGameJSONResolverStore } from "~/composables/useGameJSONResolver";

/////

export default {
	title: "templates / GameController"
};

export const Default = () => ({
	components: { GameController },
	setup: () => {
		provide(useGameJSONResolverKey, useGameJSONResolver());
		provide(useGameContextKey, useGameContext());
		const gameConfs = inject(useGameJSONResolverKey) as UseGameJSONResolverStore;
		gameConfs.fetchPseudoFilesFromUri("/large/game.json");
	},
	template: `
	<GameController />
	`
});

export const Large = () => ({
	components: { GameController },
	setup: () => {
		provide(useGameJSONResolverKey, useGameJSONResolver());
		provide(useGameContextKey, useGameContext());
		const gameConfs = inject(useGameJSONResolverKey) as UseGameJSONResolverStore;
		gameConfs.fetchPseudoFilesFromUri("/large/game.json");
	},
	template: `
	<div style="width: 500px; height: 500px; overflow: scroll;">
		<GameController />
	</div>
	`
});
