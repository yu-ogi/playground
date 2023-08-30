import { setup } from "@storybook/vue3";
import { createMemoryHistory, createRouter } from "vue-router";

import "~/assets/global.scss";

const router = createRouter({
	history: createMemoryHistory(),
	routes: [],
});

setup(app => {
	app.use(router);
});

export const parameters = {
	actions: { argTypesRegex: "^on.*" },
	layout: "fullscreen",
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
};
