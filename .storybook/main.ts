import * as path from "path";
import { loadConfigFromFile, mergeConfig } from "vite";

module.exports = {
	framework: "@storybook/vue3-vite",
	stories: [
		"../src/**/*.stories.@(js|jsx|ts|tsx)",
		"../stories/**/*.stories.@(js|jsx|ts|tsx)",
	],
	staticDirs: [
		"../public",
		"../stories/fixtures",
		"../src/assets"
	],
	addons: [
		"@storybook/addon-actions",
		"@storybook/addon-links",
		"@storybook/addon-essentials",
	],
	typescript: {
		check: false,
	},
	async viteFinal(previousConfig) {
		const { config } = (await loadConfigFromFile(
			{
				mode: "development",
				ssrBuild: false,
				command: "build",
			},
			path.resolve(__dirname, "../vite.config.ts"),
		))!;
		return mergeConfig(previousConfig, {
			...config,
			plugins: [],
			server: {
			  hmr: true,
			},
		});
	}
};
