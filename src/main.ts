import VueCompositionApi from "@vue/composition-api";
import urlJoin from "url-join";
import Vue from "vue";
import VueRouter from "vue-router";
import { URIParameter } from "./types/URIParameter";
import IndexPage from "~/components/pages/IndexPage.vue";
import PlaygroundPage from "~/components/pages/PlaygroundPage.vue";
import RootPage from "~/components/pages/RootPage.vue";
import SamplePage from "~/components/pages/SamplePage.vue";
import SnippetPage from "~/components/pages/SnippetPage.vue";
import { decode } from "~/utils/Base64";

// import global style
import "~/assets/global.scss";

Vue.config.productionTip = true;

Vue.use(VueCompositionApi);
Vue.use(VueRouter);

const router = new VueRouter({
	routes: [
		{
			path: "/",
			name: "index",
			component: IndexPage
		},
		{
			path: "/edit/:name/",
			name: "edit",
			component: PlaygroundPage,
			props: router => {
				const gameJsonUri = urlJoin(
					`${window.location.protocol}//${window.location.host}/${window.location.pathname}`,
					`presets/${router.params.name}/game.json`
				);
				return {
					gameJsonUri,
					name: router.params.name
				};
			}
		},
		{
			path: "/samples/:base64_uri_params",
			name: "sample",
			component: SamplePage,
			props: router => {
				const params: URIParameter = JSON.parse(decode(router.params.base64_uri_params));
				if (params.type !== "gameJsonUri") {
					throw new Error("Parse Error: unknown uri parameter");
				}
				return {
					name: params.name ?? "noname",
					gameJsonUri: params.uri,
					autoplay: router.query.autoplay === null // ?autoplay を解釈する (query の初期値は null)
				};
			}
		},
		{
			path: "/snippets/:base64_uri_params",
			name: "snippet",
			component: SnippetPage,
			props: router => {
				const params: URIParameter = JSON.parse(decode(router.params.base64_uri_params));
				if (params.type !== "gameJsonUri") {
					throw new Error("Parse Error: unknown uri parameter");
				}
				const autoplay = router.query.autoplay === null;
				return {
					name: params.name ?? "noname",
					gameJsonUri: params.uri,
					autoplay
				};
			}
		}
	]
});

new Vue({
	el: "#app",
	components: {
		IndexPage,
		RootPage,
		PlaygroundPage,
		SamplePage
	},
	template: "<RootPage />",
	router
});
