
import { cloneTemplateById } from "../common/common";
import { Task } from "../tasks/task";


export class TaskViewData {
	public info: Task;
	public element: HTMLElement;
	private stateChangedCallback: ((newState: TaskViewState) => void) | undefined = undefined;

	constructor (info: Task, element: HTMLElement) {
		this.info = info;
		this.element = element;
	}

	public setStateChangedCallback (callbackfn: (newState: TaskViewState) => void): void {
		if (this.stateChangedCallback === undefined) {
			this.stateChangedCallback = callbackfn;
		}
	}

	public setNewState (newState: TaskViewState): void {
		this.stateChangedCallback! (newState);
	}
}


export interface TaskViewState {
	apply (data: TaskViewData): void;
}


export class BaseTaskViewState {
	apply (data: TaskViewData): void {
		this.clearElement (data.element);
		this.buildElement (data);
	}

	protected clearElement (element: HTMLElement): void {
		element.innerHTML = "";
	}

	protected buildElement (data: TaskViewData): void {
		// To be implemented in child classes
	}
}


export class TaskView {
	static elementTemplateId: string = "task_template";
	
	private data: TaskViewData;
	private state: TaskViewState;

	constructor (taskInfo: Task, initialState: TaskViewState) {
		this.data = this.createTaskViewData (taskInfo);
		this.state = initialState;
		this.state.apply (this.data);
	}

	private createTaskViewData (taskInfo: Task): TaskViewData {
		const element = this.createElement();
		const data = new TaskViewData (taskInfo, element);
		data.setStateChangedCallback (newState => this.updateState (newState));
		return data;
	}

	private createElement (): HTMLElement {
		const element = cloneTemplateById (TaskView.elementTemplateId);
		element.innerHTML = this.data.info.getName();
		return element;
	}

	private updateState (newState: TaskViewState): void {
		this.state = newState;
		this.state.apply (this.data);
	}
}
