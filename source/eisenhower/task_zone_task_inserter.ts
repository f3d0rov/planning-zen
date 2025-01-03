
import { Task } from "../tasks/task";
import { BaseTaskZoneData } from "./base_task_zone_data";
import { TaskElement } from "./task_element";


export class TaskZoneTaskInserter {
	private data: BaseTaskZoneData;
	
	constructor (baseData: BaseTaskZoneData) {
		this.data = baseData;
	}

	public addTask (id: number, task: Task): void {
		const taskElement = this.createElementForTask (id, task);
		this.displayTaskElement (taskElement);
	}

	private createElementForTask (id: number, task: Task): TaskElement {
		return new TaskElement (id, task);
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

