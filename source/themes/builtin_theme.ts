
import { Theme } from "./theme";


export class BuiltinTheme implements Theme {
	private className: string;
	private iconSvg: string;
	
	constructor (className: string, iconSvg: string) {
		this.className = className;
		this.iconSvg = iconSvg;
	}

	public load (): Promise <void> {
		return new Promise ((resolve, reject) => resolve());
	}

	public getClass (): string {
		return this.className;
	}

	public getIconSVG (): string {
		return this.iconSvg;
	}
}
