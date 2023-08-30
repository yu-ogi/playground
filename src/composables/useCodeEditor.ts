import { InjectionKey, reactive } from "vue";

export const useCodeEditorKey: InjectionKey<UseCodeEditorStore> = Symbol("useCodeEditor");

interface State {
	uri: string;
	value: string;
	language: string;
	extraLibs: { content: string; filePath?: string }[];
	setValue: (uri: string, value: string, language: string) => void;
	setExtraLibs: (extraLibs: { content: string; filePath?: string }[]) => void;
}

export function useCodeEditor() {
	const setValue = (uri: string, value: string, language: string) => {
		state.uri = uri;
		state.value = value;
		state.language = language;
	};

	const setExtraLibs = (extraLibs: { content: string; filePath?: string }[]) => {
		state.extraLibs = extraLibs;
	};

	const state = reactive<State>({
		uri: "",
		value: "",
		language: "text",
		extraLibs: [],
		setValue,
		setExtraLibs
	});

	return state;
}

export type UseCodeEditorStore = ReturnType<typeof useCodeEditor>;
