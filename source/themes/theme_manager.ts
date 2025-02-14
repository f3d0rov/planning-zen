
import { getElementById } from "../common/common";
import { Theme } from "./theme";
import { ThemeList } from "./theme_list";
import { ThemeSaver } from "./theme_saver";


class NextThemeIcon {
	static svgId = "next_theme_icon";
	private svg: HTMLElement;
	
	constructor () {
		this.svg = document.getElementById (NextThemeIcon.svgId) as HTMLElement;
	}

	public setIcon (svg: string) {
		this.svg.innerHTML = svg;
	}
}


export class ThemeManager {
	static switchStyleButtonId: string = "switch_style_button";
	static bodySwitchingStyle: string = "switching_style";
	static bodySwitchingStyleTimeSec: number = 1;

	private themes: ThemeList;
	private themeIds: Map <string, number> = new Map <string, number>;
	private switchStyleButton: HTMLElement;
	private nextThemeIcon: NextThemeIcon = new NextThemeIcon;
	private currentStyleIndex: number = 0;
	private lastSwitchToken: number = 0;
	private themeSaver: ThemeSaver;

	constructor (themeList: ThemeList, themeSaver: ThemeSaver) {
		this.themes = themeList;
		this.themeSaver = themeSaver;
		this.collectStyleNames();

		this.switchStyleButton = this.setupStyleButton();
	}

	public async initializeTheme (): Promise <void> {
		const initialThemeId = this.getInitialThemeId();
		await this.loadTheme (initialThemeId);
		this.applyTheme (initialThemeId);
	}

	private collectStyleNames (): void {
		for (let i = 0; i < this.themes.length(); i++) {
			const theme = this.themes.at (i);
			const themeId = theme.getClass();
			this.themeIds.set (themeId, i);
		}
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

	private setupStyleButton (): HTMLElement {
		const button = getElementById (ThemeManager.switchStyleButtonId);
		button.addEventListener ('click', async ev => this.setNextStyle());
		return button;
	}

	public async setNextStyle (): Promise <void> {
		await this.loadNextTheme();
		this.setBodySwitchingStyleClass();
		this.unapplyTheme (this.currentStyleIndex);
		this.applyTheme (this.getNextStyleIndex());
	}

	private async loadNextTheme (): Promise <void> {
		const nextThemeId = this.getNextStyleIndex();
		this.loadTheme (nextThemeId);
	}

	private async loadTheme (themeId: number): Promise <void> {
		const theme = this.themes.at (themeId);
		return theme.load();
	}

	private getNextStyleIndex (): number {
		return (this.currentStyleIndex + 1) % this.themes.length();
	}

	private unapplyTheme (index: number) {
		const themeClass = this.themes.at (index).getClass();
		document.body.classList.remove (themeClass);
	}

	private applyTheme (index: number) {
		this.currentStyleIndex = index;

		const theme = this.themes.at (index);
		this.applyThemeClass (theme.getClass());

		const nextStyle = this.themes.at (this.getNextStyleIndex());
		this.nextThemeIcon.setIcon (nextStyle.getIconSVG());
	}

	private applyThemeClass (themeClass: string): void {
		document.body.classList.add (themeClass);
		this.themeSaver.rememberStyle (themeClass);
		console.log (`Theme set to '${themeClass}'`);
	}

	private setBodySwitchingStyleClass () {
		document.body.classList.add (ThemeManager.bodySwitchingStyle);
		const token = Math.random();
		this.lastSwitchToken = token;
		setTimeout (() => this.resetBodySwitchingStyleClass (token), 1000 * ThemeManager.bodySwitchingStyleTimeSec);
	}

	private resetBodySwitchingStyleClass (token: number) {
		if (this.lastSwitchToken === token) {
			document.body.classList.remove (ThemeManager.bodySwitchingStyle);
		}
	}
}
