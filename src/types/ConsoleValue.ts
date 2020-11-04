export type ConsoleValue = InfoConsoleValue | WarnConsoleValue | ErrorConsoleValue;

export interface InfoConsoleValue extends ConsoleValueBase {
	type: "info";
}

export interface WarnConsoleValue extends ConsoleValueBase {
	type: "warn";
}

export interface ErrorConsoleValue extends ConsoleValueBase {
	type: "error";
}

export interface ConsoleValueBase {
	name: string;
	message: string;
}
