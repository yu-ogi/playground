import type { Meta, StoryObj } from "@storybook/vue3";
import SnippetPage from "~/components/pages/SnippetPage.vue";

const meta: Meta<typeof SnippetPage> = {
	title: "pages / SnippetPage",
	component: SnippetPage,
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		components: {
			SnippetPage,
		},
		template: `
		<div style="height: 100vh;">
			<SnippetPage gameJsonUri="/default/game.json" name="dummy" />
		</div>
		`
	})
};

export const Autorun: Story = {
	render: () => ({
		components: {
			SnippetPage,
		},
		template: `
		<div style="height: 100vh;">
			<SnippetPage gameJsonUri="/default/game.json" name="dummy" :autoplay="true" />
		</div>
		`
	})
};
