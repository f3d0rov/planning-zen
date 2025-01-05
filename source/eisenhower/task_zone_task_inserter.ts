
import { CachedTask } from "../tasks/cached_task";
import { BaseTaskZoneData } from "./base_task_zone_data";
import { TaskElement } from "./task_element";


export class TaskZoneTaskInserter {
	private data: BaseTaskZoneData;
	
	constructor (baseData: BaseTaskZoneData) {
		this.data = baseData;
	}

	public addTask (id: number, task: CachedTask): void {
		const taskElement = this.createElementForTask (id, task);
		this.displayTaskElement (taskElement);
	}

	private createElementForTask (id: number, task: CachedTask): TaskElement {
		const element = new TaskElement (id, task);
		element.setTaskUpdateCallback ((taskId: number, task: CachedTask) => this.deleteTaskIfNameIsEmpty (taskId, task));
		return element;
	}

	private deleteTaskIfNameIsEmpty (taskId: number, task: CachedTask): void {
		if (task.getName() === "") {
			this.data.deleteTask (taskId);
		}
	}

	private displayTaskElement (taskElement: TaskElement): void {
		const wasInserted = this.tryInsertInMiddle (taskElement);
		if (wasInserted === false) {
			this.insertAtEnd (taskElement);
		}
	}

	private tryInsertInMiddle (taskElement: TaskElement): boolean {
		const orderIndex = taskElement.getTask().getOrderIndex();

		const iterator = this.data.getTasks().iterate();
		while (iterator.hasNext()) {
			const contestedTaskElement = iterator.getNext();

			if (this.shouldInsertBefore (orderIndex, contestedTaskElement)) {
				this.insertBefore (taskElement, contestedTaskElement);
				return true;
			}
		}

		return false;
	}

	private shouldInsertBefore (index: number, contestedTaskElement: TaskElement): boolean {
		const contestedTask = contestedTaskElement.getTask();
		const contestedIndex = contestedTask.getOrderIndex();
		return index < contestedIndex;
	}

	private insertBefore (insert: TaskElement, before: TaskElement): void {
		const insertedHTMLElement = insert.getElement();
		const beforeHTMLElement = before.getElement();
		this.data.getContents().insertBefore (insertedHTMLElement, beforeHTMLElement);
		this.data.getTasks().insertBefore (insert, before);
	}

	private insertAtEnd (insert: TaskElement): void {
		this.data.getTasks().pushBack (insert);
		const insertedElement = insert.getElement();
		this.data.getContents().appendChild (insertedElement);
	}
}

