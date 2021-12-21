<template>
	<v-container class="container-game-canvas">
		<v-card>
			<v-app-bar short color="lighten-1 text-center">
				<v-spacer></v-spacer>
				<v-btn icon rounded @click="props.onRun">
					<v-icon>mdi-play-box</v-icon>
				</v-btn>
				<v-btn icon rounded @click="props.onReload">
					<v-icon>mdi-reload</v-icon>
				</v-btn>
				<v-btn icon rounded @click="props.onStop">
					<v-icon>mdi-stop</v-icon>
				</v-btn>
			</v-app-bar>
			<v-container>
				<div ref="scalableRef">
					<canvas ref="canvasRef" class="game-canvas canvas-transparent" :width="props.width" :height="props.height" />
				</div>
			</v-container>
			<v-footer class="container-game-canvas-note">
				<v-card-text class="py-2 white--text text-center">
					{{ props.note }}
				</v-card-text>
			</v-footer>
		</v-card>
	</v-container>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, PropType, ref, watch } from "@vue/composition-api";

export default defineComponent({
	props: {
		width: {
			type: Number,
			required: true
		},
		height: {
			type: Number,
			required: true
		},
		running: {
			type: Boolean,
			required: true
		},
		note: {
			type: String,
			default: ""
		},
		onRun: {
			type: Function as PropType<() => void>,
			required: true
		},
		onStop: {
			type: Function as PropType<() => void>,
			required: true
		},
		onReload: {
			type: Function as PropType<() => void>,
			required: true
		}
	},
	setup(props) {
		const canvasRef = ref<HTMLCanvasElement>();
		const scalableRef = ref<HTMLDivElement>();

		const getCanvasElement = (): HTMLCanvasElement | null => {
			const canvas = canvasRef.value ?? null;
			return canvas;
		};

		const adjust = () => {
			if (!scalableRef.value) return;
			const elem = window.document.body;
			const dom = scalableRef.value;
			const scale = Math.min(1, Math.min(elem.clientWidth / props.width, elem.clientHeight / props.height));
			dom.style.transformOrigin = `0 0`;
			dom.style.transform = `scale(${scale})`;
			dom.style.width = props.width * scale + "px";
			dom.style.height = props.height * scale + "px";
		};

		watch(
			() => [props.width, props.height],
			() => {
				adjust();
			}
		);

		onMounted(() => {
			window.addEventListener("resize", adjust);
		});

		onUnmounted(() => {
			window.removeEventListener("resize", adjust);
		});

		return {
			props,
			canvasRef,
			scalableRef,
			getCanvasElement
		};
	}
});
</script>
