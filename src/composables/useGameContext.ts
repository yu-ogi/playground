import * as AE from "@akashic/akashic-engine-standalone";
import { InjectionKey, reactive } from "@vue/composition-api";
import Vue from "vue";
import { GameConfiguration } from "~/types/AkashicEngineStandalone";
import { ConsoleValue } from "~/types/ConsoleValue";
import { PseudoFile } from "~/types/PseudoFile";
import { AkashicEngineVersion } from "~/types/versions";

const versions: AkashicEngineVersion = require("~/constants/versions.json");

export const useGameContextKey: InjectionKey<UseGameContextStore> = Symbol("useGameContext");

interface State {
	running: boolean;
	consoleValues: ConsoleValue[];
	canvas: HTMLCanvasElement | null;
	currentVersion: string;
	versions: AkashicEngineVersion;
	handleErrors: (global: any) => void;
	requireEngineJS(version: string): Promise<void>;
	setCanvas: (canvas: HTMLCanvasElement | null) => void;
	clearConsole: () => void;
	addConsole: (consoleValue: ConsoleValue) => void;
	run: (gameJSON: GameConfiguration, pseudoFiles: PseudoFile[], assetBase: string | null) => void;
	stop: () => void;
}

export function useGameContext() {
	const addConsole = ({ type, name, message }: ConsoleValue) => {
		state.consoleValues.unshift({
			type,
			name,
			message
		});
	};

	function handleError(err: ErrorEvent) {
		addConsole({
			type: "error",
			name: err.toString(),
			message: err.message
		});
	}
	function handleUnhandledrejection(err: PromiseRejectionEvent) {
		addConsole({
			type: "error",
			name: err.toString(),
			message: err.reason
		});
	}

	const handleErrors = (global: any) => {
		Vue.config.errorHandler = err => {
			addConsole({
				type: "error",
				name: err.toString(),
				message: err.message
			});
		};
		const window = global as Window;
		window.removeEventListener("error", handleError);
		window.addEventListener("error", handleError);
		window.removeEventListener("unhandledrejection", handleUnhandledrejection);
		window.addEventListener("unhandledrejection", handleUnhandledrejection);
	};

	const clearConsole = () => {
		state.consoleValues.splice(0, state.consoleValues.length);
		state.consoleValues.push({
			type: "info",
			name: "TODO",
			message: "This console only showing error log"
		});
	};

	const setCanvas = (canvas: HTMLCanvasElement | null) => {
		state.canvas = canvas;
	};

	let finalize: Function | null = null;

	const run = async (gameJSON: GameConfiguration, pseudoFiles: PseudoFile[], assetBase: string | null) => {
		console.log("game.json", gameJSON);

		if (!gameJSON) {
			throw new Error("Game Configuration not given");
		}
		if (!state.canvas) {
			throw new Error(`canvas not found`);
		}
		if (!state.currentVersion) {
			throw new Error(`no currentVersion`);
		}

		if (finalize) {
			finalize();
			finalize = null;
		}

		// TODO: コンテンツ内での console の捕捉
		clearConsole();

		// script の読み込みまで待機
		await requireEngineJS(state.currentVersion);

		finalize = AE.initialize({
			canvas: state.canvas,
			configuration: gameJSON,
			assetBaseDir: assetBase ?? undefined,
			assetLoaderFuncs: {
				loadScriptAsset: (id, path, callback) => {
					// アセットの生成頻度はそこまで高くないため都度検索
					const asset = pseudoFiles.find(a => a.assetType === "script" && a.id === id);
					if (asset && asset.assetType === "script") {
						callback(null, asset.value);
					} else {
						callback(new Error(`script asset (id: "${path}") was not found`), undefined);
					}
				}
			}
		});

		state.running = true;
	};

	const stop = () => {
		if (finalize) {
			finalize();
			finalize = null;
		}
		state.running = false;
	};

	// TODO: 暫定
	const requireEngineJS = (version: string): Promise<void> => {
		return new Promise((resolve, reject) => {
			const head = document.getElementsByTagName("head")[0];
			const script = document.createElement("script");
			const id = "aks-engine-elem";
			const src = state.versions.akashicEngineVersions.find(v => v.version === version);
			if (!src) {
				reject(new Error(`version ${version} not found`));
				return;
			}
			const uri = `engine/${src.name}`;
			script.setAttribute("src", uri);
			script.setAttribute("id", id);
			head.appendChild(script);
			script.onerror = e => {
				head.removeChild(script);
				reject(e);
			};
			script.onload = function () {
				head.removeChild(script);
				resolve();
			};
		});
	};

	const state = reactive<State>({
		running: false,
		consoleValues: [],
		canvas: null,
		currentVersion: versions.akashicEngineVersions[0].version,
		versions,
		handleErrors,
		requireEngineJS,
		setCanvas,
		clearConsole,
		addConsole,
		run,
		stop
	});

	// initialize
	clearConsole();

	return state;
}

export type UseGameContextStore = ReturnType<typeof useGameContext>;
