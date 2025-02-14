
import { getElementById } from "../common/common";
import { ThemeSaver } from "./theme_saver";


class StyleModeState {
	static hiddenSymbolClass: string = "nodisplay";
	private buttonSymbol: HTMLElement;
	private styleClassName: string;
	
	constructor (buttonSymbolId: string, styleClassName: string) {
		this.buttonSymbol = getElementById (buttonSymbolId);
		this.styleClassName = styleClassName;
	}

	public hideButtonSymbol () {
		this.buttonSymbol.classList.add (StyleModeState.hiddenSymbolClass);
	}

	public showButtonSymbol () {
		this.buttonSymbol.classList.remove (StyleModeState.hiddenSymbolClass);
	}
	
	public applyClassToBody () {
		document.body.classList.add (this.styleClassName);
		console.log (`Style class set to ${this.styleClassName}`);
	}

	public removeClassFromBody () {
		document.body.classList.remove (this.styleClassName);
	}
	
	public getClassName (): string {
		return this.styleClassName;
	}
}


export class StyleSwitcher {
	static switchStyleButtonId: string = "switch_style_button";
	static bodySwitchingStyle: string = "switching_style";
	static bodySwitchingStyleTimeSec: number = 1;

	private styles: Array <StyleModeState> = new Array <StyleModeState>;
	private styleNames: Map <string, number> = new Map <string, number>;
	private switchStyleButton: HTMLElement;
	private currentStyleIndex: number = 0;
	private lastSwitchToken: number = 0;
	private themeSaver: ThemeSaver;

	constructor (themeSaver: ThemeSaver) {
		this.themeSaver = themeSaver;
		this.switchStyleButton = this.setupStyleButton();

		this.setDefaultStyles();
		this.setInitialStyle();
	}

	private setInitialStyle (): void {
		const userTheme = this.themeSaver.restoreStyle();
		if (userTheme && this.styleNames.has (userTheme)) {
			const userThemeId = this.styleNames.get (userTheme) as number;
			this.setStyle (userThemeId);
		} else {
			this.setStyle (0);
		}
	}

	private setupStyleButton (): HTMLElement {
		const button = getElementById (StyleSwitcher.switchStyleButtonId);
		button.addEventListener ('click', ev => this.setNextStyle());
		return button;
	}

	private setDefaultStyles (): void {
		this.addStyle (new StyleModeState ('dark_mode_button', 'dark_mode'));
		this.addStyle (new StyleModeState ('light_mode_button', 'light_mode'));
	}

	private addStyle (styleModeState: StyleModeState) {
		const newLength = this.styles.push (styleModeState);
		this.styleNames.set (styleModeState.getClassName(), newLength - 1);
	}

	public setNextStyle (): void {
		this.setBodySwitchingStyleClass();
		this.removeStyle (this.currentStyleIndex);
		this.setStyle (this.getNextStyleIndex());
	}

	private getNextStyleIndex (): number {
		return (this.currentStyleIndex + 1) % this.styles.length;
	}

	private removeStyle (index: number) {
		const style = this.styles.at (index) as StyleModeState;
		style.removeClassFromBody();
	}

	private setStyle (index: number) {
		this.currentStyleIndex = index;

		const style = this.styles.at (index) as StyleModeState;
		this.themeSaver.rememberStyle (style.getClassName());
		style.applyClassToBody();
		style.hideButtonSymbol();

		const nextStyle = this.styles.at (this.getNextStyleIndex()) as StyleModeState;
		nextStyle.showButtonSymbol();
	}

	private setBodySwitchingStyleClass () {
		document.body.classList.add (StyleSwitcher.bodySwitchingStyle);
		const token = Math.random();
		this.lastSwitchToken = token;
		setTimeout (() => this.resetBodySwitchingStyleClass (token), 1000 * StyleSwitcher.bodySwitchingStyleTimeSec);
	}

	private resetBodySwitchingStyleClass (token: number) {
		if (this.lastSwitchToken === token) {
			document.body.classList.remove (StyleSwitcher.bodySwitchingStyle);
		}
	}
}
