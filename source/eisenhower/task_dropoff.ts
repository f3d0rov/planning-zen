
import { cloneTemplateById, getElementById } from "../common/common";
import { TaskDropZone } from "./task_drop_zone";


export class TaskDropoff {
	static templateId: string = "util_box_template";
	static highlightClass: string = "highlight";
	static nameClass: string = "name";

	private element: HTMLElement;
	private dropZone: TaskDropZone;

	constructor (parentId: string, name: string) {
		this.element = this.getElement (parentId, name);
		this.dropZone = new TaskDropZone (this.element);
		this.setupEvents();
	}

	private getElement (parentId: string, name: string): HTMLElement {
		const element = cloneTemplateById (TaskDropoff.templateId);

		const nameElem = element.querySelector (`.${TaskDropoff.nameClass}`) as HTMLElement;
		nameElem.innerText = name;

		const parent = getElementById (parentId);
		parent.appendChild (element);
		return element;
	}

	private setupEvents () {
		this.dropZone.onTaskDrop (taskId => this.handleTaskDrop (taskId));
		this.dropZone.onTaskEnter (() => this.highlightArea ());
		this.dropZone.onTaskLeave (() => this.dimArea ());
	}

	private highlightArea (): void {
		this.element.classList.add (TaskDropoff.highlightClass);
	}

	private dimArea (): void {
		this.element.classList.remove (TaskDropoff.highlightClass);
	}

	private handleTaskDrop (taskId: number): void {
		this.dimArea();
		this.handleDroppedTask (taskId);
	}

	protected handleDroppedTask (taskId: number): void {
		// Not implemented
	}
}
