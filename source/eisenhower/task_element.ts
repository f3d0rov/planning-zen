
import { cloneTemplateById, getElementById } from "../common/common";
import { getTextWidth } from "../common/text_width";
import { CachedTask } from "../tasks/cached_task";


export class TaskElement {
	static taskTemplateId: string = "task_template";
	static taskDragType: string = "text/plain";

	private element: HTMLElement;
	private task: CachedTask;
	private id: number;

	private state!: TaskElementState;
	private stateInfo: TaskElemStateInfo;

	constructor (id: number, task: CachedTask) {
		this.id = id;
		this.task = task;
		this.element = this.generateElement();

		this.stateInfo = this.generateTaskElementStateInfo();
		this.switchToState (new DisplayedTaskElement (this.stateInfo));
	}

	private generateElement (): HTMLElement {
		const newElement = cloneTemplateById (TaskElement.taskTemplateId);
		newElement.id = this.getElementIdForTask (this.id);
		newElement.addEventListener ('dblclick', ev => this.handleDblclick (ev));
		return newElement;
	}

	private getElementIdForTask (id: number): string {
		return `task_${id}`;
	}

	private handleDblclick (event: MouseEvent): void {
		event.preventDefault();
		event.stopPropagation();
	}

	public getId (): number {
		return this.id;
	}

	public getElement (): HTMLElement {
		return this.element;
	}

	public getTask (): CachedTask {
		return this.task;
	}

	public remove (): void {
		this.element.remove();
	}

	private generateTaskElementStateInfo (): TaskElemStateInfo {
		const info = new TaskElemStateInfo (this.id, this.task, this.element);
		return info;
	}

	private switchToState (state: TaskElementState) {
		this.state = state;
		this.state.setSwitchStateCallback (state => this.switchToState (state));
	}

	public setTaskUpdateCallback (callbackfn: (taskId: number, task: CachedTask) => void) {
		this.stateInfo.setTaskUpdateCallback (callbackfn);
	}
}


class TaskElemStateInfo {
	public id: number;
	public task: CachedTask;
	public root: HTMLElement;
	private taskUpdateCallback: (taskId: number, task: CachedTask) => void = () => {};

	constructor (id: number, task: CachedTask, root: HTMLElement) {
		this.id = id;
		this.task = task;
		this.root = root;
	}

	public setTaskUpdateCallback (callbackfn: (taskId: number, task: CachedTask) => void) {
		this.taskUpdateCallback = callbackfn;
	}
	
	public reportTaskUpdate () {
		this.taskUpdateCallback (this.id, this.task);
	}
}

class TaskElementState {
	private taskElemInfo: TaskElemStateInfo;
	protected switchToState: (state: TaskElementState) => void = () => {};

	protected constructor (taskElemInfo: TaskElemStateInfo) {
		this.taskElemInfo = taskElemInfo;
		this.getRoot().innerHTML = "";
	}

	protected getId (): number {
		return this.taskElemInfo.id;
	}

	protected getRoot (): HTMLElement {
		return this.taskElemInfo.root;
	}

	protected getTask (): CachedTask {
		return this.taskElemInfo.task;
	}

	protected getElemInfo (): TaskElemStateInfo {
		return this.taskElemInfo;
	}

	public setSwitchStateCallback (callbackfn: (state: TaskElementState) => void): void {
		this.switchToState = callbackfn;
	}
	
	protected reportTaskUpdate () {
		this.taskElemInfo.reportTaskUpdate();
	}
}


class DisplayedTaskElement extends TaskElementState {
	static displayTemplateId = "task_display_template";
	static taskDraggedClass = "task_dragged";

	private element: HTMLElement;

	constructor (taskElemInfo: TaskElemStateInfo) {
		super (taskElemInfo);
		this.element = this.constructElement();
		this.setupEvents();
	}

	private constructElement (): HTMLElement {
		const element = cloneTemplateById (DisplayedTaskElement.displayTemplateId);
		element.innerText = this.getTask().getName();
		this.getRoot().appendChild (element);
		return element;
	}

	private setupEvents (): void {
		this.element.addEventListener ('dragstart', ev => this.handleDragstart (ev));
		this.element.addEventListener ('dragend', ev => this.handleDragend (ev));
		this.element.addEventListener ('dblclick', ev => this.handleDblclick (ev));
	}

	private handleDragstart (event: DragEvent): void {
		if (event.dataTransfer) {
			event.dataTransfer.setData (TaskElement.taskDragType, `${this.getId()}`);
			event.dataTransfer.dropEffect = "move";
			getElementById ('eisenhower').classList.add (DisplayedTaskElement.taskDraggedClass);
		}
	}

	private handleDragend (event: DragEvent): void {
		getElementById ('eisenhower').classList.remove (DisplayedTaskElement.taskDraggedClass);
	}

	private handleDblclick (event: MouseEvent): void {
		event.preventDefault();
		event.stopPropagation();
		this.switchToState (new EditedTaskElement (this.getElemInfo()));
	}
}


class EditedTaskElement extends TaskElementState {
	static templateClassId: string = "task_edit_template";

	private input: HTMLTextAreaElement;
	
	constructor (taskElemInfo: TaskElemStateInfo) {
		super (taskElemInfo);
		this.input = cloneTemplateById (EditedTaskElement.templateClassId) as HTMLTextAreaElement;
		this.input.value = this.getTask().getName();
		this.getRoot().appendChild (this.input);
		this.updateInputSize();
		this.setupEvents();
		this.input.focus();
	}

	private setupEvents (): void {
		this.input.addEventListener ('keypress', ev => this.stopIfEnter (ev));
		this.input.addEventListener ('keyup', ev => this.cancelIfEscape (ev));
		this.input.addEventListener ('input', ev => this.updateInputSize());
		this.input.addEventListener ('blur', ev => this.stopEditing());
	}

	private stopIfEnter (event: KeyboardEvent): void {
		if (event.key === "Enter") {
			event.preventDefault();
			this.stopEditing();
		} 
	}

	private cancelIfEscape (event: KeyboardEvent): void {
		if (event.code === "Escape") {
			event.preventDefault();
			this.cancelEditing();
		}
	}
	
	private updateInputSize (): void {
		const currentText = this.input.value;
		const targetWidth = getTextWidth (currentText, this.input);
		this.input.style.height = `1px`; // Reset height so that it could be reduced
		this.input.style.width = `${targetWidth}px`;
		this.input.style.height = `${this.input.scrollHeight}px`;
	}

	private stopEditing (): void {
		this.getTask().setName (this.input.value);
		this.switchToState (new DisplayedTaskElement (this.getElemInfo()));
		this.reportTaskUpdate();
	}

	private cancelEditing (): void {
		this.switchToState (new DisplayedTaskElement (this.getElemInfo()));
	}
}
