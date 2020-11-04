/////

import VueCompositionApi from "@vue/composition-api";
import Vue from "vue";

Vue.use(VueCompositionApi);

/////

import AudioPlayer from "~/components/molecules/AudioPlayer.vue";

export default {
	title: "molecules / AudioPlayer"
};

export const Default = () => ({
	components: { AudioPlayer },
	template: `<AudioPlayer title="se" duration="1" src="/default/audio/se" />`
});
