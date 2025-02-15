
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

	private requestAsText (request: Promise <Response>): Promise <string> {
		return new Promise ((resolve, reject) => {
			request.then (
				response => resolve (response.text()),
				reason => reject (reason)
			);
		});
	}
}
