import type { Meta, StoryObj } from "@storybook/vue3";
import { provide } from "vue";
import GameController from "~/components/templates/GameController.vue";
import { useGameContext, useGameContextKey } from "~/composables/useGameContext";
import { useGameJSONResolver, useGameJSONResolverKey } from "~/composables/useGameJSONResolver";

const meta: Meta<typeof GameController> = {
	title: "templates / GameController",
	component: GameController,
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		components: {
			GameController,
		},
		setup: () => {
			const gameConfs = useGameJSONResolver();
			provide(useGameJSONResolverKey, gameConfs);
			provide(useGameContextKey, useGameContext());
			gameConfs.fetchPseudoFilesFromUri("/large/game.json");
		},
		template: `<GameController />`
	})
};
