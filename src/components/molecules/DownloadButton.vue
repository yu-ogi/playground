<template>
	<div>
		<Button class="download-button" :onClick="handleClickDownloadAsZip" title="download as Zip">
			<template v-if="state.processing">
				<v-icon class="rotate">mdi-reload</v-icon>
			</template>
			<template v-else>
				<v-icon color="white">mdi-download</v-icon>
			</template>
		</Button>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType } from "@vue/composition-api";
import Button from "~/components/atoms/Button.vue";
import { PseudoFile } from "~/types/PseudoFile";
import { downloadAsZip } from "~/utils/downloadAsZip";

interface State {
	processing: boolean;
}

export default defineComponent({
	components: {
		Button
	},
	props: {
		name: {
			type: String,
			required: true
		},
		pseudoFiles: {
			type: Array as PropType<PseudoFile[]>,
			required: true
		}
	},
	setup(props) {
		const state = reactive<State>({
			processing: false
		});

		const handleClickDownloadAsZip = async () => {
			if (state.processing) return;
			state.processing = true;
			await downloadAsZip(`${props.name}.zip`, props.pseudoFiles);
			state.processing = false;
		};

		return {
			props,
			state,
			handleClickDownloadAsZip
		};
	}
});
</script>

<style scoped>
.rotate:before {
	content: "";
	box-sizing: border-box;
	position: absolute;
	top: 50%;
	left: 50%;
	width: 30px;
	height: 30px;
	margin: -15px 0 0 -15px;
	border-radius: 50%;
	border: 2px solid #ccc;
	border-top-color: #000;
	animation: rotate 0.6s linear infinite;
}

@keyframes rotate {
	to {
		transform: rotate(360deg);
	}
}
</style>
