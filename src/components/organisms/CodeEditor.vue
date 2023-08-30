<template>
	<div ref="editorRef" class="container-code-editor"></div>
</template>

<script lang="ts">
import * as monaco from "monaco-editor";
import { defineComponent, inject, onMounted, onUnmounted, PropType, ref, watch } from "vue";
import { useCodeEditorKey, UseCodeEditorStore } from "~/composables/useCodeEditor";

export default defineComponent({
	props: {
		handleValueChanged: {
			type: Function as PropType<(value: string) => void>,
			default: undefined
		}
	},
	setup(props) {
		const editorRef = ref<HTMLDivElement>();
		const editorState = inject(useCodeEditorKey) as UseCodeEditorStore;

		let editor: monaco.editor.IStandaloneCodeEditor | null = null;

		watch(
			() => editorState.extraLibs,
			extraLibs => {
				monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
					allowNonTsExtensions: true
				});
				monaco.languages.typescript.javascriptDefaults.setExtraLibs(extraLibs);
			},
			{
				deep: true
			}
		);

		watch(
			() => [editorState.uri, editorState.value, editorState.language],
			([uri, value, language]) => {
				if (!editor) return;
				const mUri = monaco.Uri.parse(uri);
				let model = monaco.editor.getModel(mUri);
				if (!model) {
					model = monaco.editor.createModel(value, language, mUri);
					model.updateOptions({
						tabSize: 2,
						trimAutoWhitespace: true
					});
				}
				editor.setModel(model);
			},
			{
				deep: true
			}
		);

		onMounted(() => {
			const elm = editorRef.value!;
			editor = monaco.editor.create(elm, {
				automaticLayout: true,
				scrollBeyondLastLine: false,
				scrollbar: {
					alwaysConsumeMouseWheel: false
				},
				minimap: {
					enabled: false
				}
			});
			editor.onDidChangeModelContent(e => {
				if (!editor) return;
				const model = editor.getModel();
				if (!model) return;
				const value = editor.getValue();
				if (props.handleValueChanged) {
					props.handleValueChanged(value);
				}
			});
		});

		onUnmounted(() => {
			if (editor) editor.dispose();
		});

		return {
			props,
			editorRef
		};
	}
});
</script>

<style scoped>
.container-code-editor {
	width: 100%;
	height: 100%;
}
</style>
