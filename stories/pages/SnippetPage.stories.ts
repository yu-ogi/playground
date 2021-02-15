/////
import VueCompositionApi from "@vue/composition-api";
import Vue from "vue";

Vue.use(VueCompositionApi);

/////

/////

import SnippetPage from "~/components/pages/SnippetPage.vue";

/////

export default {
	title: "pages / SnippetPage"
};

export const Default = () => ({
	components: { SnippetPage },
	template: `
	<div style="height: 100vh;">
		<SnippetPage gameJsonUri="/default/game.json" name="dummy" />
	</div>
	`
});

export const Autorun = () => ({
	components: { SnippetPage },
	template: `
	<div style="height: 100vh;">
		<SnippetPage gameJsonUri="/default/game.json" name="dummy" :autoplay="true" />
	</div>
	`
});
