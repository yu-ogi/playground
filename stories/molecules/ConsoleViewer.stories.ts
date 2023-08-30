import type { Meta, StoryObj } from "@storybook/vue3";
import ConsoleViewer from "~/components/molecules/ConsoleViewer.vue";

const meta: Meta<typeof ConsoleViewer> = {
	title: "molecules / ConsoleViewer",
	component: ConsoleViewer,
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		values: [
			{
				type: "error",
				name: "dummy",
				message: "dumm message"
			},
			{
				type: "warn",
				name: "dummy",
				message: "dumm message"
			},
			{
				type: "info",
				name: "dummy",
				message: "dumm message dumm message dumm message dumm message dumm message dumm message dumm message dumm message"
			}
		]
	}
};
