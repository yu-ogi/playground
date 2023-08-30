<template>
	<div ref="audioContainerRef" class="audio-container"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";

interface State {
	src: string;
	title: number;
}

export default defineComponent({
	props: {
		title: {
			type: String,
			required: true
		},
		src: {
			type: String,
			required: true
		}
	},
	setup(props) {
		const audioContainerRef = ref<HTMLAudioElement>();
		const createPlayer = () => {
			if (!audioContainerRef.value) return;
			audioContainerRef.value.innerHTML = "";
			const player = document.createElement("audio");
			player.setAttribute("controls", "");
			const src1 = document.createElement("source");
			src1.setAttribute("src", props.src + ".ogg");
			src1.setAttribute("type", "audio/ogg");
			player.appendChild(src1);
			const src2 = document.createElement("source");
			src2.setAttribute("src", props.src + ".aac");
			src2.setAttribute("type", "audio/aac");
			player.appendChild(src2);
			audioContainerRef.value.appendChild(player);
		};
		onMounted(() => {
			createPlayer();
		});
		watch(
			() => props.src,
			() => {
				createPlayer();
			}
		);
		return {
			props,
			audioContainerRef
		};
	}
});
</script>

<style scoped>
.audio-container {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
