
import { cloneTemplateById, getElementById } from "../common/common";
import { BasicLinkedList, LinkedList } from "../common/linked_list";
import { getMousePosition } from "../common/mouse_pos";
import { Task, TaskSection } from "../tasks/task";
import { CategoryChangeProvider, NewTaskProvider } from "./eisenhower_matrix_task_editor";
import { TaskElement } from "./task_element";


export class BasicPoint {
	public x: number = 0;
	public y: number = 0;

	constructor (x: number, y: number) {
		this.x = x;
		this.y = y;
	}
}


export class ThresholdBox {
	private rect: DOMRect;

	constructor (rect: DOMRect) {
		this.rect = rect;
	}

	public static fromElement (element: HTMLElement): ThresholdBox {
		const box = element.getBoundingClientRect();
		return new ThresholdBox (box);
	}

	public isAfter (point: BasicPoint): boolean {
		const pointIsBelow = point.y > this.rect.bottom;
		if (pointIsBelow) return false;

		const pointIsAbove = point.y < this.rect.top;
		if (pointIsAbove) return true;
		
		return this.isPointAboveDiagonal (point);
	}

	private isPointAboveDiagonal (point: BasicPoint) {
		const diagonalYAtThreshX = this.getDiagonalYAtX (point.x);
		const pointAboveDiagonal =  point.y < diagonalYAtThreshX;
		return pointAboveDiagonal;
	}

	private getDiagonalYAtX (x: number): number {
		return this.rect.bottom - this.rect.height / this.rect.width * (x - this.rect.left);
	}
}

class TaskThresholdInfo {
	private taskId: number;
	private threshold: ThresholdBox;

	constructor (taskId: number, threshold: ThresholdBox) {
		this.taskId = taskId;
		this.threshold = threshold;
	}

	public getTaskId (): number {
		return this.taskId;
	}

	public getThreshold (): ThresholdBox {
		return this.threshold;
	}
}


export class TaskZone implements CategoryChangeProvider, NewTaskProvider {
	static contentsClass = "decision_box_square_contents";
	static dropHighlightClass = "highlight";

	private root: HTMLElement;
	private contents: HTMLElement;
	private tasks: Map <number, TaskElement> = new Map <number, TaskElement>;
	private elementOrder: LinkedList <number> = new BasicLinkedList <number>;
	private catChangeCallback: (taskId: number, newCat: TaskSection, newIndex: number) => void = () => {};
	private category: TaskSection;

	private initNewTask: (() => Task) | undefined;
	private finalizeNewTask: ((task: Task) => void) | undefined;

	constructor (taskBoxElementId: string, category: TaskSection) {
		this.category = category;
		this.root = getElementById (taskBoxElementId);
		this.contents = this.root.querySelector (`.${TaskZone.contentsClass}`) as HTMLElement;
		this.setupEvents();
	}

	private setupEvents (): void {
		this.contents.addEventListener ('dragover', ev => this.handleDragover (ev));
		this.contents.addEventListener ('dragend', ev => this.stopDragHighlight());
		this.contents.addEventListener ('dragleave', ev => this.stopDragHighlight());
		this.contents.addEventListener ('drop', ev => this.handleDrop (ev));
		this.contents.addEventListener ('dblclick', ev => this.spawnNewTask (ev));
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

	private handleDragover (event: DragEvent): void {
		event.preventDefault();
		this.root.classList.add (TaskZone.dropHighlightClass);
	}

	private handleDrop (event: DragEvent): void {
		this.stopDragHighlight();
		const msg = event.dataTransfer?.getData (TaskElement.taskDragType);
		const taskId = this.getTaskId (msg);
		if (taskId === undefined) return;
		
		const dropPos = new BasicPoint (event.pageX, event.pageY);
		const droppedTaskIndex = this.getIndexForDroppedTask (dropPos);

		event.preventDefault();
		console.log (`Received task #${taskId}`);
		this.catChangeCallback (taskId, this.category, droppedTaskIndex);
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

	public setCategoryChangeCallback (callbackfn: (taskId: number, newCategory: TaskSection, newIndex: number) => any): void {
		this.catChangeCallback = callbackfn;
	}

	public setInitializeTaskCallback (callbackfn: () => Task): void {
		this.initNewTask = callbackfn;
	}

	public setFinalizeTaskCallback (callbackfn: (task: Task) => void): void {
		this.finalizeNewTask = callbackfn;
	}

	private spawnNewTask (event: MouseEvent): void {
		const task = this.initNewTask! ();
		task.setName ("New task!");
		task.setOrderIndex (this.getNextLastIndex());
		task.setSection (this.category);
		this.finalizeNewTask! (task);
	}

	private getNextLastIndex (): number {
		const lastTaskId = this.elementOrder.back();
		if (lastTaskId === undefined) return 1;
		else return this.getTask (lastTaskId).getOrderIndex() + 1;
	}

	private getIndexForDroppedTask (position: BasicPoint): number {
		const iterator = this.elementOrder.iterate();
		let lastIndex = 0;
		while (iterator.hasNext()) {
			const taskId = iterator.getNext();
			const task = this.getTask (taskId);
			const taskElement = this.getElementForTask (taskId);
			const taskThreshold = ThresholdBox.fromElement (taskElement);
			lastIndex = task.getOrderIndex();

			if (taskThreshold.isAfter (position)) {
				return lastIndex;
			}
		}
		return lastIndex + 1;
	}	
}
