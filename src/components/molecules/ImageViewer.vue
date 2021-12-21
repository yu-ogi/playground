<template>
	<div class="image-viewer-container">
		<img :src="props.src" :title="props.id" :width="props.width" :height="props.height" class="canvas-transparent" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

interface State {
	id: string;
	path: string;
	width: number;
	height: number;
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
		},
		width: {
			type: Number,
			required: true
		},
		height: {
			type: Number,
			required: true
		}
	},
	setup(props) {
		return {
			props
		};
	}
});
</script>

<style scoped>
.image-viewer-container {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}

.image-viewer-container > img {
	box-shadow: 0px 0px 10px gray;
	max-width: 80%;
	max-height: 80%;
	width: auto;
	height: auto;
}
</style>
