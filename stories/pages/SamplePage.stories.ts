import type { Meta, StoryObj } from "@storybook/vue3";
import SamplePage from "~/components/pages/SamplePage.vue";

const meta: Meta<typeof SamplePage> = {
	title: "pages / SamplePage",
	component: SamplePage,
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		components: {
			SamplePage,
		},
		template: `
		<div style="height: 100vh;">
			<SamplePage gameJsonUri="/default/game.json" name="dummy" />
		</div>
		`
	})
};
