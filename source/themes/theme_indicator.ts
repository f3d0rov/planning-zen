
import { Theme } from "./theme";


export interface ThemeIndicator {
	setCurrentTheme (theme: Theme): void;
	setNextTheme (theme: Theme): void;
}


export class NextThemeIconIndicator implements ThemeIndicator {
	static svgId = "next_theme_icon";
	private svg: HTMLElement;
	
	constructor () {
		this.svg = document.getElementById (NextThemeIconIndicator.svgId) as HTMLElement;
	}

	public setCurrentTheme (theme: Theme): void {
		console.log (`Theme set: "${theme.getClass()}"`);
	}

	public setNextTheme (theme: Theme): void {
		this.svg.innerHTML = theme.getIconSVG();
	}
}
