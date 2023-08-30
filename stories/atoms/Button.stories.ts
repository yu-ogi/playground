import type { Meta, StoryObj } from "@storybook/vue3";
import Button from "~/components/atoms/Button.vue";

const meta: Meta<typeof Button> = {
	title: "atoms / Button",
	component: Button,
	render: (args) => ({
		components: {
			Button,
		},
		setup() {
			return { args };
		},
		template: "<Button v-bind='args'>Click Me</Button>",
	})
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	argTypes: { onClick: { action: 'clicked' } },
};
