
import { Task, TaskSection } from "../tasks/task";
import { TaskProvider } from "../tasks/task_provider";
import { IndexedTasks } from "./indexed_tasks";
import { TaskZone } from "./task_zone";


export class EisenhowerMatrixTaskEditor {
	private taskProvider: TaskProvider;
	private managedTasks: IndexedTasks = new IndexedTasks;

	private zones: Map <TaskSection, TaskZone> = new Map <TaskSection, TaskZone>;

	constructor (taskProvider: TaskProvider) {
		this.taskProvider = taskProvider;
		this.initTasks();
		this.initZones();
		this.displayInitializedTasks();
	}

	private initTasks (): void {
		const tasks = this.taskProvider.restoreTasks();
		this.indexRestoredTasks (tasks);
	}

	private indexRestoredTasks (tasks: Array <Task>): void {
		tasks.forEach ((task: Task) => {
			this.managedTasks.addTask (task);
		});
	}

	private initZones (): void {
		this.zones.set ('do', new TaskZone ("task_zone_do"));
		this.zones.set ('schedule', new TaskZone ("task_zone_schedule"));
		this.zones.set ('delegate', new TaskZone ("task_zone_delegate"));
		this.zones.set ('delete', new TaskZone ("task_zone_delete"));
	}

	private displayInitializedTasks (): void {
		this.managedTasks.forEach ((task: Task, index: number) => {
			this.displayTask (task, index);
		});
	}

	private displayTask (task: Task, index: number) {
		const zone = this.zones.get (task.getSection());
		zone?.addTask (index, task);
	}
}
