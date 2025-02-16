
import { Button } from "../common/button";
import { Theme } from "./theme";
import { ThemeApplicator } from "./theme_applicator";
import { ThemeIndicator } from "./theme_indicator";
import { ThemeList } from "./theme_list";
import { ThemeSaver } from "./theme_saver";


export class ThemeManager {
	private themes: ThemeList;
	private themeIds: Map <string, number> = new Map <string, number>;

	private switchStyleButton: Button | undefined = undefined;
	private themeIndicator: ThemeIndicator | undefined;
	private applicator: ThemeApplicator;

	private currentThemeIndex: number = 0;
	private themeSaver: ThemeSaver;

	constructor (
		applicator: ThemeApplicator,
		themeList: ThemeList,
		themeSaver: ThemeSaver
	) {
		this.applicator = applicator;
		this.themes = themeList;
		this.themeSaver = themeSaver;

		this.collectStyleNames();
	}

	private collectStyleNames (): void {
		for (let i = 0; i < this.themes.length(); i++) {
			const theme = this.themes.at (i);
			const themeId = theme.getClass();
			this.themeIds.set (themeId, i);
		}
	}
	

	public setSwitchThemeButton (button: Button): void {
		this.switchStyleButton = button;
		this.switchStyleButton.setClickCallback (async () => this.setNextStyle());
	}

	public setThemeIndicator (indicator: ThemeIndicator): void {
		this.themeIndicator = indicator;
		this.updateThemeIndicator();
	}

	public async initializeTheme (): Promise <void> {
		const initialThemeId = this.getInitialThemeId();
		await this.loadTheme (initialThemeId);
		this.applyTheme (initialThemeId);
	}

	private getInitialThemeId (): number {
		const userTheme = this.themeSaver.restoreStyle();
		if (userTheme && this.themeIds.has (userTheme)) {
			const userThemeId = this.themeIds.get (userTheme) as number;
			return userThemeId;
		} else {
			return 0;
		}
	}


	public async setNextStyle (): Promise <void> {
		await this.loadNextTheme();
		this.applyTheme (this.getNextThemeIndex());
	}

	private async loadNextTheme (): Promise <void> {
		const nextThemeId = this.getNextThemeIndex();
		return this.loadTheme (nextThemeId);
	}

	private async loadTheme (themeId: number): Promise <void> {
		const theme = this.themes.at (themeId);
		return theme.load();
	}

	private applyTheme (index: number) {
		this.currentThemeIndex = index;

		const theme = this.getCurrentTheme();
		this.applicator.applyTheme (theme);
		this.themeSaver.rememberStyle (theme.getClass());
		this.updateThemeIndicator();
	}

	private updateThemeIndicator (): void {
		const currentTheme = this.getCurrentTheme();
		const nextTheme = this.getNextTheme();

		this.themeIndicator?.setCurrentTheme (currentTheme);
		this.themeIndicator?.setNextTheme (nextTheme);
	}

	private getCurrentTheme (): Theme {
		return this.themes.at (this.currentThemeIndex);
	}

	private getNextTheme (): Theme {
		const nextThemeIndex = this.getNextThemeIndex();
		return this.themes.at (nextThemeIndex);
	}
	
	private getNextThemeIndex (): number {
		return (this.currentThemeIndex + 1) % this.themes.length();
	}
}
