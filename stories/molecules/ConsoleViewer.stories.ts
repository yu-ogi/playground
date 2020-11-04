/////

import VueCompositionApi from "@vue/composition-api";
import Vue from "vue";

Vue.use(VueCompositionApi);

/////

import ConsoleViewer from "~/components/molecules/ConsoleViewer.vue";

export default {
	title: "molecules / ConsoleViewer"
};

export const Default = () => ({
	components: { ConsoleViewer },
	setup: () => {
		return {
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
		};
	},
	template: `<ConsoleViewer :values="values" />`
});
