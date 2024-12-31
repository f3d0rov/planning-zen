
import { cloneTemplateById, getElementById } from "../common/common";
import { BasicLinkedList, LinkedList } from "../common/linked_list";
import { Task } from "../tasks/task";


export class TaskZone {
	static taskTemplateId: string = "task_template"; 

	private taskBoxElement: HTMLElement;
	private displayedTasks: Map <number, Task> = new Map <number, Task>;
	private displayedElements: Map <number, HTMLElement> = new Map <number, HTMLElement>;
	private elementOrder: LinkedList <number> = new BasicLinkedList <number>;

	constructor (taskBoxElementId: string) {
		this.taskBoxElement = getElementById (taskBoxElementId);
	}

	public addTask (id: number, task: Task): void {
		this.displayedTasks.set (id, task);
		this.generateElementForTask (id, task);
		this.displayElement (id);
	}

	private generateElementForTask (id: number, task: Task): void {
		const newElement = cloneTemplateById (TaskZone.taskTemplateId);
		newElement.id = this.getElementIdForTask (id);
		newElement.innerHTML = task.getName();
		this.displayedElements.set (id, newElement);
	}

	private getElementIdForTask (id: number): string {
		return `task_${id}`;
	}

	private displayElement (id: number): void {
		const wasInserted = this.tryInsertInMiddle (id);
		if (wasInserted === false) {
			this.insertAtEnd (id);
		}
	}

	private tryInsertInMiddle (id: number): boolean {
		const orderIndex = this.getTask (id).getOrderIndex();

		const iterator = this.elementOrder.iterate();
		while (iterator.hasNext()) {
			const contestedTaskId = iterator.getNext();

			if (this.shouldInsertBefore (orderIndex, contestedTaskId)) {
				this.insertBefore (id, contestedTaskId);
				return true;
			}
		}

		return false;
	}

	private shouldInsertBefore (index: number, contestedTaskId: number): boolean {
		const contestedOrderIndex = this.getTask (contestedTaskId).getOrderIndex();
		return index < contestedOrderIndex;
	}

	private insertBefore (insertedTask: number, before: number): void {
		const insertedElement = this.getElementForTask (insertedTask);
		const beforeElement = this.getElementForTask (before);
		this.taskBoxElement.insertBefore (insertedElement, beforeElement);
		this.elementOrder.insertBefore (insertedTask, before);
	}

	private insertAtEnd (taskId: number): void {
		this.elementOrder.pushBack (taskId);
		const insertedElement = this.getElementForTask (taskId);
		this.taskBoxElement.appendChild (insertedElement);
	}

	public removeTask (id: number): void {
		this.tryGetElementForTask (id)?.remove();
		this.displayedTasks.delete (id);
		this.displayedElements.delete (id);
		this.elementOrder.pop (id);
	}

	private getTask (id: number): Task {
		return this.tryGetTask (id) as Task;
	}

	private tryGetTask (id: number): Task | undefined {
		return this.displayedTasks.get (id);
	}

	private getElementForTask (id: number): HTMLElement {
		return this.tryGetElementForTask (id) as HTMLElement;
	}

	private tryGetElementForTask (id: number): HTMLElement | undefined {
		return this.displayedElements.get (id);
	}
}
