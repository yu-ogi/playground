import type { Meta, StoryObj } from "@storybook/vue3";
import { provide } from "vue";
import AkashicEditor from "~/components/templates/AkashicEditor.vue";
import { useGameContext, useGameContextKey } from "~/composables/useGameContext";
import { useGameJSONResolver, useGameJSONResolverKey } from "~/composables/useGameJSONResolver";

const meta: Meta<typeof AkashicEditor> = {
	title: "templates / AkashicEditor",
	component: AkashicEditor,
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		components: {
			AkashicEditor,
		},
		setup: () => {
			const gameConfs = useGameJSONResolver();
			provide(useGameJSONResolverKey, gameConfs);
			provide(useGameContextKey, useGameContext());
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
	})
};
