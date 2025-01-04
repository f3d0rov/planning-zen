
import { CachedTask } from "../tasks/cached_task";
import { BaseTaskZoneData } from "./base_task_zone_data";
import { NewTaskProvider } from "./eisenhower_matrix_task_editor";


export class TaskZoneNewTaskHandler implements NewTaskProvider {
	private data: BaseTaskZoneData;

	private initNewTask: (() => Promise <CachedTask>) | undefined;
	private finalizeNewTask: ((task: CachedTask) => void) | undefined;

	constructor (baseData: BaseTaskZoneData) {
		this.data = baseData;
		this.setupEvents();
	}
	
	private setupEvents (): void {
		this.data.getElement().addContentsEvent ('dblclick', ev => this.spawnNewTask (ev));
	}
	
	public setInitializeTaskCallback (callbackfn: () => Promise <CachedTask>): void {
		this.initNewTask = callbackfn;
	}

	public setFinalizeTaskCallback (callbackfn: (task: CachedTask) => void): void {
		this.finalizeNewTask = callbackfn;
	}

	private async spawnNewTask (event: MouseEvent): Promise <void> {
		const task = await this.initNewTask! ();
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
