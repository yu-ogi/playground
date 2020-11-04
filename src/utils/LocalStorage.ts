class LocalStorage {
	getItem(key: string): string | null {
		if (typeof localStorage === "undefined") {
			return null;
		}
		return localStorage.getItem(this.generateStorageKey(key));
	}

	setItem(key: string, value: string): void {
		if (typeof localStorage === "undefined") {
			return;
		}
		localStorage.setItem(this.generateStorageKey(key), value);
	}

	generateStorageKey(key: string): string {
		return `__akashic_playground_${key}`;
	}
}

export default new LocalStorage();
