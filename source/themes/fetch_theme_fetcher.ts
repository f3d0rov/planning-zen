
import { getURLForObject } from "../common/common";
import { ThemeFetcher } from "./theme_fetcher";


export class FetchThemeFetcher implements ThemeFetcher {
	public async loadCSS (themeClass: string): Promise <string> {
		const themePath = this.getThemePath (themeClass);
		const request = this.fetchThemeBody (themePath);
		return this.requestAsText (request);
	}

	private getThemePath (themeClass: string): string {
		const path = `themes/${themeClass}.css`;
		return getURLForObject (path);
	}

	private fetchThemeBody (path: string): Promise <Response> {
		return fetch (path, {
			method: 'GET',
			mode: 'same-origin',
			cache: 'default',
			credentials: 'omit'
		});
	}

	private async requestAsText (request: Promise <Response>): Promise <string> {
		const response = await request;
		return response.text();
	}
}
