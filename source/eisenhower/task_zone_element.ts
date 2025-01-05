
import { cloneTemplateById, getElementById } from "../common/common";


export class TaskZoneElement {
	static templateId: string = "task_box_template";

	static contentsClass = "contents";
	static nameClass = "name";
	static dropHighlightClass = "highlight";

	private root: HTMLElement;
	private contents: HTMLElement;
	private name: HTMLElement;

	constructor (containerId: string, name: string = "Unset") {
		const parent = getElementById (containerId);
		this.root = cloneTemplateById (TaskZoneElement.templateId);
		this.root.id = containerId + "_element";
		parent.appendChild (this.root);
		this.contents = this.root.querySelector (`.${TaskZoneElement.contentsClass}`) as HTMLElement;
		this.name = this.root.querySelector (`.${TaskZoneElement.nameClass}`) as HTMLElement;
		this.name.innerText = name;
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
