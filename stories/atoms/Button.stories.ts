import { action } from "@storybook/addon-actions";

/////
import VueCompositionApi from "@vue/composition-api";
import Vue from "vue";

Vue.use(VueCompositionApi);

/////

import Button from "~/components/atoms/Button.vue";

export default {
	title: "atoms / Button"
};

export const Basic = () => ({
	components: { Button },
	setup: () => {
		return {
			handleClick: action("button clicked")
		};
	},
	template: '<Button :onClick="handleClick">Click Me</Button>'
});
