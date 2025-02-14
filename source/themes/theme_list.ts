
import { Theme } from "./theme";

export class ThemeList {
	private themes: Array <Theme> = new Array <Theme>;

	public addTheme (theme: Theme) {
		this.themes.push (theme);
	}

	public length (): number {
		return this.themes.length;
	}

	public at (index: number): Theme {
		return this.themes.at (index) as Theme;
	}
}
