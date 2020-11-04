/////
import VueCompositionApi from "@vue/composition-api";
import Vue from "vue";

Vue.use(VueCompositionApi);

/////

import ImageViewer from "~/components/molecules/ImageViewer.vue";

export default {
	title: "molecules / ImageViewer"
};

export const Default = () => ({
	components: { ImageViewer },
	template: `<ImageViewer title="akashic" src="/default/image/player.png" :width="32" :height="32" />`
});
