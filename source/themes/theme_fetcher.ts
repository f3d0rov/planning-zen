
export interface ThemeFetcher {
	loadCSS (themeClass: string): Promise <string>;
}
