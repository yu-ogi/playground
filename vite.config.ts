import path from "path";
import createVuePlugin from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import monacoEditorPlugin from "vite-plugin-monaco-editor";

export default defineConfig({
	plugins: [
		monacoEditorPlugin({}),
		createVuePlugin()
	],
	resolve: {
		alias: {
			vue: "vue/dist/vue.esm-bundler.js",
			path: "path-browserify",
			"~": path.resolve(__dirname, "./src"),
		},
	},
	define: {
		"process.env": {},
		__VUE_PROD_DEVTOOLS__: "false",
	},
});
