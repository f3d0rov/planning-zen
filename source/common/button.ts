
import { getElementById } from "./common";


export interface Button {
	setClickCallback (callbackfn: () => void): void | Promise <void>;
}


export class BasicButton implements Button {
	private callbackFn: () => void | Promise <void> = () => { console.error ("Button callback not set"); };

	constructor (elementId: string) {
		const button = getElementById (elementId);
		button.addEventListener ('click', async ev => this.callbackFn());
	}

	public setClickCallback (callbackfn: () => void): void | Promise<void> {
		this.callbackFn = callbackfn;
	}
}


export class EmulatedButton implements Button {
	private callbackFn: () => void | Promise <void> = () => { console.error ("Button callback not set"); };

	constructor () {}

	public setClickCallback (callbackfn: () => void): void | Promise<void> {
		this.callbackFn = callbackfn;
	}
	
	public click () {
		this.callbackFn();
	}
}
