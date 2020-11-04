<!-- Playground のページ -->

<template>
	<div class="playground-page-container">
		<div class="container-header">
			<div class="logo">Akashic Playground</div>
		</div>
		<div class="container-body">
			<div class="container-editor">
				<AkashicEditor :pseudoFiles="gameConfs.pseudoFiles" />
			</div>
			<div class="container-agv hidden-scrollbar">
				<GameController />
			</div>
		</div>
		<div class="container-download">
			<DownloadButton :pseudoFiles="gameConfs.pseudoFiles" :name="props.name + '.' + Date.now()" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, inject, provide, reactive } from "@vue/composition-api";

import DownloadButton from "~/components/molecules/DownloadButton.vue";
import AkashicEditor from "~/components/templates/AkashicEditor.vue";
import GameController from "~/components/templates/GameController.vue";
import { useGameContext, useGameContextKey } from "~/composables/useGameContext";
import { useGameJSONResolver, useGameJSONResolverKey, UseGameJSONResolverStore } from "~/composables/useGameJSONResolver";

interface State {
	edited: boolean;
}

export default defineComponent({
	components: {
		DownloadButton,
		AkashicEditor,
		GameController
	},
	props: {
		gameJSONUri: {
			type: String,
			required: true
		},
		name: {
			type: String,
			required: true
		},
		base64: {
			type: String,
			required: false,
			default: undefined
		}
	},
	setup(props) {
		provide(useGameJSONResolverKey, useGameJSONResolver());
		provide(useGameContextKey, useGameContext());
		const gameConfs = inject(useGameJSONResolverKey) as UseGameJSONResolverStore;
		gameConfs.fetchPseudoFilesFromUri(props.gameJSONUri);

		const state = reactive<State>({
			edited: false
		});

		return {
			props,
			gameConfs
		};
	}
});
</script>

<style scoped>
@media screen and (min-width: 960px) {
	.playground-page-container {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.container-header {
		height: 45px;
	}

	.container-header > div.logo {
		font-size: 24px;
		font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande", "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
		font-weight: bold;
		color: #ce5e5e;
	}

	.container-body {
		width: 100%;
		height: calc(100% - 45px);
		display: flex;
		flex-direction: row;
	}

	.container-editor {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: row;
		position: relative;
	}

	.container-agv {
		width: 100%;
		margin: 0 auto;
		display: flex;
		flex-wrap: wrap;
		display: flex;
		flex-direction: column;
		overflow: scroll;
	}

	.container-download {
		position: fixed;
		bottom: 3px;
		right: 3px;
		color: whitesmoke;
	}
}

@media screen and (max-width: 959px) {
	.playground-page-container {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.container-header {
		height: 45px;
	}

	.container-header > div.logo {
		font-size: 24px;
		font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande", "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
		font-weight: bold;
		color: #ce5e5e;
	}

	.container-body {
		width: 100%;
		height: calc(100% - 45px);
		display: flex;
		flex-direction: row;
		flex-direction: column;
		flex-direction: column-reverse;
	}

	.container-editor {
		width: 100%;
		height: 100%;
		overflow: scroll;
		display: flex;
		flex-direction: row;
		position: relative;
	}

	.container-agv {
		margin: 0 auto;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
	}

	.container-download {
		position: fixed;
		bottom: 3px;
		right: 3px;
		color: whitesmoke;
	}
}
</style>
