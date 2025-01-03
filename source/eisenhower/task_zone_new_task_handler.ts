
import { Task } from "../tasks/task";
import { BaseTaskZoneData } from "./base_task_zone_data";
import { NewTaskProvider } from "./eisenhower_matrix_task_editor";


export class TaskZoneNewTaskHandler implements NewTaskProvider {
	private data: BaseTaskZoneData;

	private initNewTask: (() => Task) | undefined;
	private finalizeNewTask: ((task: Task) => void) | undefined;

	constructor (baseData: BaseTaskZoneData) {
		this.data = baseData;
		this.setupEvents();
	}
	
	private setupEvents (): void {
		this.data.getElement().addContentsEvent ('dblclick', ev => this.spawnNewTask (ev));
	}
	
	public setInitializeTaskCallback (callbackfn: () => Task): void {
		this.initNewTask = callbackfn;
	}

	public setFinalizeTaskCallback (callbackfn: (task: Task) => void): void {
		this.finalizeNewTask = callbackfn;
	}

	private spawnNewTask (event: MouseEvent): void {
		const task = this.initNewTask! ();
		task.setName ("Double-click to edit!");
		task.setOrderIndex (this.getNextLastIndex());
		task.setSection (this.data.getCategory());
		this.finalizeNewTask! (task);
	}

	private getNextLastIndex (): number {
		const lastTaskElement = this.data.getTasks().back();
		if (lastTaskElement === undefined) return 1;
		else return lastTaskElement.getTask().getOrderIndex() + 1;
	}
}
