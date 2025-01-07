
import { BasicPoint } from "../common/basic_point";
import { TaskElement } from "./task_element";


export class TaskDropZone {
	private element: HTMLElement;

	private reportTaskDrop: (taskId: number, position: BasicPoint) => void = () => {};
	private reportTaskEnter: () => void = () => {};
	private reportTaskLeave: () => void = () => {};

	constructor (element: HTMLElement) {
		this.element = element;
		this.setupEvents();
	}

	public onTaskDrop (callbackfn: (taskId: number, position: BasicPoint) => void) {
		this.reportTaskDrop = callbackfn;
	}

	public onTaskEnter (callbackfn: () => void) {
		this.reportTaskEnter = callbackfn;
	}

	public onTaskLeave (callbackfn: () => void) {
		this.reportTaskLeave = callbackfn;
	}

	public getElement (): HTMLElement {
		return this.element;
	}

	private setupEvents (): void {
		this.element.addEventListener ('dragover', ev => this.handleDragover (ev));
		this.element.addEventListener ('dragend', ev => this.handleDragend (ev));
		this.element.addEventListener ('dragleave', ev => this.handleDragend (ev));
		this.element.addEventListener ('drop', ev => this.handleDrop (ev));
	}
	
	private handleDragover (event: DragEvent): void {
		event.preventDefault();
		const taskId = this.getTaskId (event);
		// if (taskId !== undefined) {
			this.reportTaskEnter();
		// }
	}

	private handleDrop (event: DragEvent): void {
		event.preventDefault();
		
		const taskId = this.getTaskId (event);
		if (taskId === undefined) return;
		const dropPos = new BasicPoint (event.pageX, event.pageY);
	
		this.reportTaskDrop (taskId, dropPos);
	}

	private handleDragend (event: DragEvent): void {
		event.preventDefault();
		const taskId = this.getTaskId (event);
		// if (taskId !== undefined) {
			this.reportTaskLeave();
		// }
	}

	private getTaskId (event: DragEvent): number | undefined {
		const message = event.dataTransfer?.getData (TaskElement.taskDragType);
		if (message === undefined) return undefined;
		const droppedTaskId = parseInt (message);
		if (isNaN (droppedTaskId)) return undefined;
		return droppedTaskId;
	}
}

