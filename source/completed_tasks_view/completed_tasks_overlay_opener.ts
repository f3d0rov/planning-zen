
import { getElementById } from "../common/common";
import { CompletedTasksOverlay } from "./completed_tasks_overlay";


export class CompletedTasksOverlayOpener {
	static buttonId = "open_completed_tasks";

	private overlay: CompletedTasksOverlay;
	private button: HTMLElement;

	constructor (overlay: CompletedTasksOverlay) {
		this.overlay = overlay;
		this.button = getElementById (CompletedTasksOverlayOpener.buttonId);
		this.setupEvents();
	}

	private setupEvents () {
		this.button.addEventListener ('click', ev => this.overlay.show());
	}
}
