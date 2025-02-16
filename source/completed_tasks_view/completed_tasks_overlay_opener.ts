
import { BasicButton, Button } from "../common/button";
import { CompletedTasksOverlay } from "./completed_tasks_overlay";


export class CompletedTasksOverlayOpener {
	static buttonId = "open_completed_tasks";

	private overlay: CompletedTasksOverlay;
	private button: Button

	constructor (overlay: CompletedTasksOverlay) {
		this.overlay = overlay;
		this.button = new BasicButton (CompletedTasksOverlayOpener.buttonId);
		this.button.setClickCallback (() => this.overlay.show());
	}
}
