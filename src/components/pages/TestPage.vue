<template>
	<v-container ma-0 pa-0 fluid fill-height>
		<!-- Akashic Editor -->
		<v-row dense no-gutters justify="center" align="center">
			<v-col sm="7">
				<v-row>
					<v-col sm="3" style="width: 200px">
						<v-list dense flat style="min-height: 100vh; max-width: 300px; min-width: 120px" class="overflow-y-auto">
							<v-subheader>Assets</v-subheader>
							<v-list-item-group color="primary">
								<v-list-item v-for="(asset, i) in assetList" :key="i">
									<v-list-item-icon>
										<v-icon v-text="asset.icon"></v-icon>
									</v-list-item-icon>
									<v-list-item-content>
										<v-list-item-title v-text="asset.name"></v-list-item-title>
									</v-list-item-content>
								</v-list-item>
							</v-list-item-group>
						</v-list>
					</v-col>
					<v-col sm="9" align="start">
						<CodeEditor></CodeEditor>
					</v-col>
				</v-row>
			</v-col>
			<v-col sm="5">
				<!-- GameCanvas -->
				<v-container class="container-game-canvas">
					<v-container>
						<div ref="scalableRef">
							<canvas ref="canvasRef" class="game-canvas canvas-transparent" :width="props.width" :height="props.height" />
						</div>
					</v-container>
					<v-toolbar dense flat short color="lighten-1 text-center">
						<v-spacer></v-spacer>
						<v-tooltip top>
							<template #activator="{ on }">
								<v-btn icon v-on="on" @click="props.onRun">
									<v-icon>mdi-play-box</v-icon>
								</v-btn>
							</template>
							<span>Run</span>
						</v-tooltip>
						<v-tooltip top>
							<template #activator="{ on }">
								<v-btn icon v-on="on" @click="props.onReload">
									<v-icon>mdi-reload</v-icon>
								</v-btn>
							</template>
							<span>Reload</span>
						</v-tooltip>
						<v-tooltip top>
							<template #activator="{ on }">
								<v-btn icon v-on="on" @click="props.onStop">
									<v-icon>mdi-stop</v-icon>
								</v-btn>
							</template>
							<span>Stop</span>
						</v-tooltip>
					</v-toolbar>
				</v-container>
				<!-- ConsoleViewer -->
				<v-container>
					<v-list dense style="max-height: 100px" class="overflow-y-auto">
						<v-list-item v-for="(log, i) in logList" :key="i">
							<v-list-item-content>
								<v-list-item-title v-text="`[${log.type.toUpperCase()}] ${log.message}`"></v-list-item-title>
								<v-divider></v-divider>
							</v-list-item-content>
						</v-list-item>
					</v-list>
				</v-container>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { defineComponent, provide } from "@vue/composition-api";
import CodeEditor from "~/components/organisms/CodeEditor.vue";
import { useCodeEditor, useCodeEditorKey } from "~/composables/useCodeEditor";

export default defineComponent({
	components: {
		CodeEditor
	},
	setup() {
		provide(useCodeEditorKey, useCodeEditor());

		const assetList = [
			{
				name: "game.json",
				icon: "mdi-cog"
			},
			{
				name: "main.js",
				icon: "mdi-note-edit-outline"
			}
		];

		for (let i = 0; i < 50; i++) {
			assetList.push({
				name: `image-${i}`,
				icon: "mdi-image-area"
			});
		}

		for (let i = 0; i < 10; i++) {
			assetList.push({
				name: `audio-${i}`,
				icon: "mdi-music-note"
			});
		}

		assetList.push({
			name: `unknown`,
			icon: "mdi-help-rhombus"
		});

		const logList = [
			{
				type: "info",
				message: "hogehoge"
			}
		];

		for (let i = 0; i < 100; i++) {
			logList.push({
				type: "info",
				message: `message-${i}`
			});
		}

		const props = {
			width: 800,
			height: 450,
			onRun: () => {
				console.log("onRun");
			},
			onStop: () => {
				console.log("onStop");
			},
			onReload: () => {
				console.log("onReload");
			}
		};

		return {
			assetList,
			logList,
			props
		};
	}
});
</script>
