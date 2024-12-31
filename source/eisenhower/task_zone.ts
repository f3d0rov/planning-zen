
import { cloneTemplateById, getElementById } from "../common/common";
import { BasicLinkedList, LinkedList } from "../common/linked_list";
import { Task, TaskSection } from "../tasks/task";
import { CategoryChangeProvider } from "./eisenhower_matrix_task_editor";
import { TaskElement } from "./task_element";


export class TaskZone implements CategoryChangeProvider {
	static contentsClass = "decision_box_square_contents";
	static dropHighlightClass = "highlight";

	private root: HTMLElement;
	private contents: HTMLElement;
	private tasks: Map <number, TaskElement> = new Map <number, TaskElement>;
	private elementOrder: LinkedList <number> = new BasicLinkedList <number>;
	private catChangeCallback: (taskId: number, newCat: TaskSection) => void = () => {};
	private category: TaskSection;

	constructor (taskBoxElementId: string, category: TaskSection) {
		this.category = category;
		this.root = getElementById (taskBoxElementId);
		this.contents = this.root.querySelector (`.${TaskZone.contentsClass}`) as HTMLElement;
		this.setupEvents();
	}

	private setupEvents (): void {
		this.contents.addEventListener ('dragover', ev => this.dragover (ev));
		this.contents.addEventListener ('dragend', ev => this.stopDragHighlight());
		this.contents.addEventListener ('dragleave', ev => this.stopDragHighlight());
		this.contents.addEventListener ('drop', ev => this.drop (ev));
	}

	public addTask (id: number, task: Task): void {
		this.generateElementForTask (id, task);
		this.displayElement (id);
	}

	private generateElementForTask (id: number, task: Task): void {
		const newElement = new TaskElement (id, task);
		this.tasks.set (id, newElement);
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
		this.contents.insertBefore (insertedElement, beforeElement);
		this.elementOrder.insertBefore (insertedTask, before);
	}

	private insertAtEnd (taskId: number): void {
		this.elementOrder.pushBack (taskId);
		const insertedElement = this.getElementForTask (taskId);
		this.contents.appendChild (insertedElement);
	}

	public removeTask (id: number): void {
		this.tryGetElementForTask (id)?.remove();
		this.tasks.delete (id);
		this.elementOrder.pop (id);
	}

	private getTask (id: number): Task {
		return this.tryGetTask (id) as Task;
	}

	private tryGetTask (id: number): Task | undefined {
		return this.tryGetTaskData (id)?.getTask();
	}

	private getElementForTask (id: number): HTMLElement {
		return this.tryGetElementForTask (id) as HTMLElement;
	}

	private tryGetElementForTask (id: number): HTMLElement | undefined {
		return this.tryGetTaskData (id)?.getElement();
	}

	private tryGetTaskData (id: number): TaskElement | undefined {
		return this.tasks.get (id);
	}

	private getTaskData (id: number): TaskElement {
		return this.tryGetTaskData (id) as TaskElement;
	}

	private dragover (event: DragEvent): void {
		event.preventDefault();
		this.root.classList.add (TaskZone.dropHighlightClass);
	}

	private drop (event: DragEvent): void {
		this.stopDragHighlight();
		const msg = event.dataTransfer?.getData (TaskElement.taskDragType);
		const taskId = this.getTaskId (msg);
		if (taskId === undefined) return;

		event.preventDefault();
		console.log (`Received task #${taskId}`);
		this.catChangeCallback (taskId, this.category);
	}

	private stopDragHighlight (): void {
		this.root.classList.remove (TaskZone.dropHighlightClass);
	}

	private getTaskId (message: string | undefined): number | undefined {
		if (message === undefined) return undefined;
		const droppedTaskId = parseInt (message);
		if (isNaN (droppedTaskId)) return undefined;
		return droppedTaskId;
	}

	public setCategoryChangeCallback (callbackfn: (taskId: number, newCategory: TaskSection) => any): void {
		this.catChangeCallback = callbackfn;
	}
}
