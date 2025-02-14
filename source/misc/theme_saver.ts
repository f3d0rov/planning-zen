
export interface ThemeSaver {
	restoreStyle (): string | undefined;
	rememberStyle (style: string): void;
}


export class LocalStorageThemeSaver implements ThemeSaver {
	static key = "last_theme";

	public restoreStyle (): string | undefined {
		const item = localStorage.getItem (LocalStorageThemeSaver.key);
		return item ? item : undefined;
	}

	public rememberStyle (style: string): void {
		localStorage.setItem (LocalStorageThemeSaver.key, style);
	}
}
