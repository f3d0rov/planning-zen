
import { getElementById } from "../common/common";

export class GithubPageOpener {
	static buttonId: string = "get_code_button";
	static sourceUrl: string = "https://github.com/f3d0rov/planner";

	private button: HTMLElement;

	constructor () {
		this.button = this.getButton();
	}

	private getButton (): HTMLElement {
		const element = getElementById (GithubPageOpener.buttonId);
		element.addEventListener ('click', ev => this.onClick());
		return element;
	}

	private onClick () {
		window.open (GithubPageOpener.sourceUrl, '_blank')?.focus();
	}
}
