<template>
	<select v-model="state.value">
		<option v-for="(value, i) in props.values" :key="i">{{ value }}</option>
	</select>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, watch } from "vue";

interface State {
	value: string;
}

export default defineComponent({
	props: {
		values: {
			type: Array as PropType<string[]>,
			required: true
		},
		onChange: {
			type: Function as PropType<(value: string) => void>,
			required: true
		}
	},
	setup(props) {
		const state = reactive<State>({
			value: props.values[0]
		});
		watch(
			() => state.value,
			value => {
				props.onChange(value);
			}
		);
		return {
			props,
			state
		};
	}
});
</script>

<style scoped></style>
