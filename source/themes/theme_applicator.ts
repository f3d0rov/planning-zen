
import { Theme } from "./theme";


export interface ThemeApplicator {
	applyTheme (theme: Theme): void;
}


export class BodyClassThemeApplicator implements ThemeApplicator {
	static bodySwitchingStyle: string = "switching_style";
	static bodySwitchingStyleTimeSec: number = 1;

	private lastThemeSet: string = "";
	private lastSwitchToken: number = 0;

	constructor () {}

	public applyTheme (theme: Theme): void {
		if (this.lastThemeSet !== "") {
			this.setBodySwitchingStyleClass();
			this.unapplyOldTheme();
		}
		this.applyNewTheme (theme.getClass());
	}

	private unapplyOldTheme (): void {
		document.body.classList.remove (this.lastThemeSet);
	}

	private applyNewTheme (className: string): void {
		document.body.classList.add (className);
		this.lastThemeSet = className;
	}

	private setBodySwitchingStyleClass () {
		document.body.classList.add (BodyClassThemeApplicator.bodySwitchingStyle);
		const token = Math.random();
		this.lastSwitchToken = token;
		setTimeout (
			() => this.resetBodySwitchingStyleClass (token),
			1000 * BodyClassThemeApplicator.bodySwitchingStyleTimeSec
		);
	}

	private resetBodySwitchingStyleClass (token: number) {
		if (this.lastSwitchToken === token) {
			document.body.classList.remove (BodyClassThemeApplicator.bodySwitchingStyle);
		}
	}
}
