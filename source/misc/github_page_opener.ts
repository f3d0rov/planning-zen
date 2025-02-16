
import { BasicButton, Button } from "../common/button";


export class GithubPageOpener {
	static buttonId: string = "get_code_button";
	static sourceUrl: string = "https://github.com/f3d0rov/planner";

	private button: Button;

	constructor () {
		this.button = new BasicButton (GithubPageOpener.buttonId);
		this.button.setClickCallback (() => this.onClick());
	}

	private onClick () {
		window.open (GithubPageOpener.sourceUrl, '_blank')?.focus();
	}
}
