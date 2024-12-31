
import { cloneTemplateById } from "../common/common";
import { Task } from "../tasks/task";


export class TaskElement {
	static taskTemplateId: string = "task_template";
	static taskDragType: string = "taskid";

	private element: HTMLElement;
	private task: Task;
	private id: number;

	constructor (id: number, task: Task) {
		this.id = id;
		this.task = task;
		this.element = this.generateElement();
		this.setupEvents();
	}

	private generateElement (): HTMLElement {
		const newElement = cloneTemplateById (TaskElement.taskTemplateId);
		newElement.id = this.getElementIdForTask (this.id);
		newElement.innerHTML = this.task.getName();
		return newElement;
	}

	private getElementIdForTask (id: number): string {
		return `task_${id}`;
	}

	public getElement (): HTMLElement {
		return this.element;
	}

	public getTask (): Task {
		return this.task;
	}

	public remove (): void {
		this.element.remove();
	}

	private setupEvents (): void {
		this.element.addEventListener ('dragstart', ev => this.dragstart (ev));
	}

	private dragstart (event: DragEvent): void {
		if (event.dataTransfer) {
			event.dataTransfer.setData (TaskElement.taskDragType, `${this.id}`);
			event.dataTransfer.dropEffect = "move";
		}
	}
}
