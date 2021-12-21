<template>
	<!-- <v-container min-height="100vh">
		<v-row>
			<v-col cols="12" sm="3" class="hidden-scrollbar">
				<v-list dense>
					<v-list-item-group color="primary">
						<v-list-item
							v-for="(asset, i) in gameConfs.pseudoFiles"
							:key="i"
							class="ctrl-tab"
							:class="{
								active: state.currentPseudoFile && state.currentPseudoFile.uri === gameConfs.pseudoFiles[i].uri,
								hidden: gameConfs.pseudoFiles[i].hidden
							}"
							:title="gameConfs.pseudoFiles[i].virtualPath"
							@click="changeCurrentPseudoFile(gameConfs.pseudoFiles[i].uri)"
						>
							<v-list-item-icon v-if="gameConfs.pseudoFiles[i].assetType === 'game.json'"
								><v-icon style="color: #eb8b35">mdi-cog</v-icon></v-list-item-icon
							>
							<v-list-item-icon v-else-if="gameConfs.pseudoFiles[i].editorType === 'text'"
								><v-icon style="color: #090c10">mdi-note-edit-outline</v-icon></v-list-item-icon
							>
							<v-list-item-icon v-else-if="gameConfs.pseudoFiles[i].editorType === 'image'"
								><v-icon style="color: #e50185">mdi-image-area</v-icon></v-list-item-icon
							>
							<v-list-item-icon v-else-if="gameConfs.pseudoFiles[i].editorType === 'audio'"
								><v-icon style="color: #084f93">mdi-music-note</v-icon></v-list-item-icon
							>
							<v-list-item-icon v-else><v-icon>mdi-help-rhombus</v-icon></v-list-item-icon>
							<v-list-item-content>
								{{ asset.filename }}
							</v-list-item-content>
						</v-list-item>
					</v-list-item-group>
				</v-list>
			</v-col>

			<v-col cols="12" sm="8" class="editor">
				<div v-show="state.currentPseudoFile && state.currentPseudoFile.editorType === 'text'">
					<CodeEditor ref="CodeEditorRef" :handleValueChanged="state.handleEditorValueChanged" />
				</div>
				<template v-if="state.currentPseudoFile && state.currentPseudoFile.editorType === 'image'">
					<ImageViewer
						:width="state.currentPseudoFile.width"
						:height="state.currentPseudoFile.height"
						:src="state.currentPseudoFile.uri"
						:title="state.currentPseudoFile.name"
					/>
				</template>
				<template v-if="state.currentPseudoFile && state.currentPseudoFile.editorType === 'audio'">
					<AudioPlayer :src="state.currentPseudoFile.uri" :title="state.currentPseudoFile.name" />
				</template>
				<div class="container-bottom">
					<ConsoleViewer :values="gameContext.consoleValues" />
				</div>
			</v-col>
		</v-row>
	</v-container> -->
	<v-row fill-height>
		<v-col sm="3" style="width: 200px">
			<v-list dense flat style="min-height: 100vh; max-width: 300px; min-width: 120px" class="overflow-y-auto" fill-height>
				<v-subheader>Assets</v-subheader>
				<v-list-item-group mandatory active-class="active" color="primary" fill-height>
					<v-list-item
						v-for="(pseudoFile, i) in gameConfs.pseudoFiles"
						:key="i"
						class="ctrl-tab"
						:title="gameConfs.pseudoFiles[i].virtualPath"
						@click="changeCurrentPseudoFile(gameConfs.pseudoFiles[i].uri)"
					>
						<template v-if="!pseudoFile.hidden">
							<v-list-item-icon v-if="pseudoFile.assetType === 'game.json'"
								><v-icon style="color: #eb8b35">mdi-cog</v-icon></v-list-item-icon
							>
							<v-list-item-icon v-else-if="pseudoFile.editorType === 'text'"
								><v-icon style="color: #090c10">mdi-note-edit-outline</v-icon></v-list-item-icon
							>
							<v-list-item-icon v-else-if="pseudoFile.editorType === 'image'"
								><v-icon style="color: #e50185">mdi-image-area</v-icon></v-list-item-icon
							>
							<v-list-item-icon v-else-if="pseudoFile.editorType === 'audio'"
								><v-icon style="color: #084f93">mdi-music-note</v-icon></v-list-item-icon
							>
							<v-list-item-icon v-else><v-icon>mdi-help-rhombus</v-icon></v-list-item-icon>
							<v-list-item-content>
								<v-list-item-title v-text="pseudoFile.filename"></v-list-item-title>
							</v-list-item-content>
						</template>
					</v-list-item>
				</v-list-item-group>
			</v-list>
		</v-col>
		<v-col v-if="state.currentPseudoFile" sm="9" align="start">
			<template v-if="state.currentPseudoFile.editorType === 'text'">
				<CodeEditor ref="CodeEditorRef" :handleValueChanged="state.handleEditorValueChanged" />
			</template>
			<template v-if="state.currentPseudoFile.editorType === 'image'">
				<ImageViewer
					:width="state.currentPseudoFile.width"
					:height="state.currentPseudoFile.height"
					:src="state.currentPseudoFile.uri"
					:title="state.currentPseudoFile.name"
				/>
			</template>
			<template v-if="state.currentPseudoFile.editorType === 'audio'">
				<AudioPlayer :src="state.currentPseudoFile.uri" :title="state.currentPseudoFile.name" />
			</template>
		</v-col>
	</v-row>
</template>

<script lang="ts">
import { defineComponent, inject, reactive, ref, watch, provide } from "@vue/composition-api";
import AudioPlayer from "~/components/molecules/AudioPlayer.vue";
// import ConsoleViewer from "~/components/molecules/ConsoleViewer.vue";
import ImageViewer from "~/components/molecules/ImageViewer.vue";
import CodeEditor from "~/components/organisms/CodeEditor.vue";
import { useCodeEditor, useCodeEditorKey, UseCodeEditorStore } from "~/composables/useCodeEditor";
import { useExtraLibsResolver } from "~/composables/useExtraLibsResolver";
import { useGameContextKey, UseGameContextStore } from "~/composables/useGameContext";
import { useGameJSONResolverKey, UseGameJSONResolverStore } from "~/composables/useGameJSONResolver";
import { PseudoFile } from "~/types/PseudoFile";

interface State {
	currentPseudoFile: PseudoFile | null;
	handleEditorValueChanged: ((value: string) => void) | null;
}

export default defineComponent({
	components: {
		ImageViewer,
		AudioPlayer,
		// ConsoleViewer,
		CodeEditor
	},
	setup(props) {
		const editorRef = ref<HTMLDivElement>();
		const state = reactive<State>({
			currentPseudoFile: null,
			handleEditorValueChanged: null
		});

		provide(useCodeEditorKey, useCodeEditor());
		const gameContext = inject(useGameContextKey) as UseGameContextStore;
		const gameConfs = inject(useGameJSONResolverKey) as UseGameJSONResolverStore;
		const editorState = inject(useCodeEditorKey) as UseCodeEditorStore;
		gameContext.handleErrors(window);

		watch(
			() => gameConfs.dependencies,
			async dependencies => {
				if (!dependencies.length) return;
				const extLibsResolver = useExtraLibsResolver();
				const uris = extLibsResolver.getExtraLibUris(gameContext.currentVersion, dependencies);
				extLibsResolver.fetchExtraLibsFromUris(uris);
				watch(
					() => extLibsResolver.extraLibs,
					extraLibs => {
						editorState.setExtraLibs(extraLibs);
					}
				);
			}
		);

		watch(
			() => gameConfs.pseudoFiles,
			() => {
				changeCurrentPseudoFile(gameConfs.entryAssetUri);
			}
		);

		const changeCurrentPseudoFile = (uri: string | null) => {
			const file = gameConfs.pseudoFiles.find(f => f.uri === uri);
			if (!file) return;
			if (file.editorType === "text") {
				editorState.setValue(file.uri, file.value, file.language);
				state.handleEditorValueChanged = (value: string) => {
					file.value = value;
				};
			} else {
				state.handleEditorValueChanged = null;
			}
			state.currentPseudoFile = file;
		};

		return {
			state,
			props,
			gameConfs,
			gameContext,
			editorRef,
			changeCurrentPseudoFile
		};
	}
});
</script>

<style scoped>
@media screen and (min-width: 960px) {
	.akashic-editor-container {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.container-top {
		width: 100%;
		height: calc(100% - 50px);
		display: flex;
		flex-direction: row;
	}

	div.editor,
	div.editor > div {
		width: 100vw;
		height: 100vh;
	}

	.container-tabs {
		min-width: 180px;
		max-width: 240px;
		border-right: 2px solid #ddd;
		overflow-y: scroll;
	}

	.container-tabs > ul {
		list-style-type: none;
		margin: 5px;
		padding: 5px;
	}

	.container-tabs > ul > li.ctrl-tab:hover {
		background-color: #ddd;
		border-color: #ddd;
	}

	.container-tabs > ul > li {
		cursor: pointer;
		padding: 5px;
		border-left-width: 5px;
		border-left-style: solid;
		border-left-color: #fff;
		font-size: 14px;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	.container-tabs > ul > li.ctrl-tab.active {
		border-left-color: #666;
		background-color: #eee;
	}

	.container-tabs > ul > li.ctrl-tab.hidden {
		color: #aaa;
		display: none;
	}

	.container-bottom {
		height: 50px;
		overflow-y: scroll;
	}
}

@media screen and (max-width: 959px) {
	.akashic-editor-container {
		width: 100%;
		height: calc(100% - 50px);
	}

	.container-top > div.editor {
		width: 100%;
		height: calc(100% - 50px);
	}

	.container-top > div.editor > div {
		width: 100%;
		height: 100%;
	}

	.container-top {
		height: 100%;
		overflow: hidden;
	}

	.container-tabs {
		width: 100%;
		border-top: 2px solid #ddd;
		overflow-x: scroll;
	}

	.container-tabs > ul {
		list-style-type: none;
		margin: 5px;
		padding: 5px 5px 0 5px;
		display: flex;
		flex-direction: row;
	}

	.container-tabs > ul > li {
		cursor: pointer;
		padding: 8px;
		margin: 0px 3px;
		border-color: #666;
		border-style: solid;
		border-width: 1px 1px 0 1px;
		border-top-left-radius: 6px;
		border-top-right-radius: 6px;
		font-size: 14px;
		white-space: nowrap;
		background-color: #eee;
	}

	.container-tabs > ul > li.ctrl-tab:hover {
		background-color: #ddd;
	}

	.container-tabs > ul > li.ctrl-tab.active {
		background-color: #fff;
	}

	.container-tabs > ul > li.ctrl-tab.hidden {
		color: #aaa;
		display: none;
	}

	.container-bottom {
		height: 50px;
		overflow-y: scroll;
	}
}
</style>
