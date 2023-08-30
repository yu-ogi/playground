import type { Meta, StoryObj } from "@storybook/vue3";
import ImageViewer from "~/components/molecules/ImageViewer.vue";

const meta: Meta<typeof ImageViewer> = {
	title: "molecules / ImageViewer",
	component: ImageViewer,
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		title: "akashic",
		src: "/default/image/player.png",
		width: 32,
		height: 32
	}
};
