
import { getElementById } from "../common/common";


export class TaskZoneElement {
	static contentsClass = "decision_box_square_contents";
	static dropHighlightClass = "highlight";

	private root: HTMLElement;
	private contents: HTMLElement;

	constructor (taskBoxElementId: string) {
		this.root = getElementById (taskBoxElementId);
		this.contents = this.root.querySelector (`.${TaskZoneElement.contentsClass}`) as HTMLElement;
	}

	public getRoot (): HTMLElement {
		return this.root;
	}

	public getContents (): HTMLElement {
		return this.contents;
	}

	public highlightDropZone () {
		this.root.classList.add (TaskZoneElement.dropHighlightClass);
	}

	public dimDropZone () {
		this.root.classList.remove (TaskZoneElement.dropHighlightClass);
	}

	public addContentsEvent (type: string, callbackfn: (event: any) => void) {
		this.getContents().addEventListener (type, callbackfn);
	}
}
