
import { FetchThemeFetcher } from "./fetch_theme_fetcher";
import { Theme } from "./theme";
import { ThemeFetcher } from "./theme_fetcher";


export class ThemeDescriptor {
	themeName: string = "";
	themeClass: string = "";
	themeSVGIcon: string = "";
}


export class CustomTheme implements Theme {
	private themeFetcher: ThemeFetcher = new FetchThemeFetcher;
	private descriptor: ThemeDescriptor;
	private isLoaded: boolean = false;

	constructor (descriptor: ThemeDescriptor) {
		this.descriptor = descriptor;
	}

	public async load (): Promise <void> {
		if (this.isLoaded === false) {
			const css = await this.doLoad();
			this.injectCSS (css);
			this.isLoaded = true;
		}
	}

	public getIconSVG (): string {
		return this.descriptor.themeSVGIcon;
	}

	public getClass (): string {
		return this.descriptor.themeClass;
	}

	private async doLoad (): Promise <string> {
		const css = await this.themeFetcher.loadCSS (this.descriptor.themeClass);
		return css;
	}

	private injectCSS (css: string): void {
		const style = document.createElement ('style');
		style.innerText = css;
		document.head.append (style);
	}
}