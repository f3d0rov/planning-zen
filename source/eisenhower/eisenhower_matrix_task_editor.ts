
import { CachedTask } from "../tasks/cached_task";
import { CachingTaskProvider } from "../tasks/caching_task_provider";
import { Task, TaskSection } from "../tasks/task";
import { TaskProvider } from "../tasks/task_provider";
import { IndexedTasks } from "./indexed_tasks";
import { TaskElement } from "./task_element";
import { TaskZone } from "./task_zone";


export class EisenhowerMatrixTaskEditor {
	private taskProvider: CachingTaskProvider;
	private managedTasks: IndexedTasks = new IndexedTasks;

	private zones: Map <TaskSection, TaskZone> = new Map <TaskSection, TaskZone>;

	constructor (taskProvider: TaskProvider) {
		this.taskProvider = new CachingTaskProvider (taskProvider);
	}

	public async restoreTasks () {
		await this.initTasks();
		this.initZones();
		this.displayInitializedTasks();
	}

	private async initTasks (): Promise <void> {
		const tasks = await this.taskProvider.restoreTasks();
		this.indexRestoredTasks (tasks);
	}

	private indexRestoredTasks (tasks: Array <CachedTask>): void {
		tasks.forEach ((task: CachedTask) => {
			this.managedTasks.addTask (task);
		});
	}

	private initZones (): void {
		this.zones.set ('do', new TaskZone ("task_zone_do", 'do'));
		this.zones.set ('schedule', new TaskZone ("task_zone_schedule", 'schedule'));
		this.zones.set ('delegate', new TaskZone ("task_zone_delegate", 'delegate'));
		this.zones.set ('delete', new TaskZone ("task_zone_delete", 'delete'));

		this.zones.forEach ((zone: TaskZone) => {
			this.addCategoryChangeProvider (zone.getCatChangeProvider());
			this.addNewTaskProvider (zone.getNewTaskProvider());
		});
	}

	private displayInitializedTasks (): void {
		this.managedTasks.forEach ((task: CachedTask, index: number) => {
			this.displayTask (task, index);
		});
	}

	private displayTask (task: CachedTask, index: number) {
		const zone = this.zones.get (task.getSection());
		zone?.addTask (index, task);
	}

	public addCategoryChangeProvider (catChangeProvider: CategoryChangeProvider): void {
		catChangeProvider.setCategoryChangeCallback (
			(taskId: number, newCat: TaskSection, newIndex: number) => this.changeTaskCategory (taskId, newCat, newIndex)
		);
	}

	public addNewTaskProvider (newTaskProvider: NewTaskProvider): void {
		newTaskProvider.setInitializeTaskCallback (() => this.initTaskCallback());
		newTaskProvider.setFinalizeTaskCallback (task => this.finalizeTaskCallback (task));
	}

	private changeTaskCategory (taskId: number, newCategory: TaskSection, newIndex: number): void {
		const task = this.managedTasks.getTask (taskId);
		this.removeTaskFromZone (taskId, task.getSection());
		this.incrementIndicesToFreeSpaceForInsertedTask (newCategory, newIndex);
		task.setSection (newCategory);
		task.setOrderIndex (newIndex);
		console.log (`New index: ${newIndex}`);
		this.displayTask (task, taskId);
	}

	private incrementIndicesToFreeSpaceForInsertedTask (category: TaskSection, startIndex: number): void {
		this.managedTasks.forEach ((task: CachedTask) => {
			if (task.getSection() === category && task.getOrderIndex() >= startIndex) {
				task.setOrderIndex (task.getOrderIndex() + 1);
			}
		});
	}

	private removeTaskFromZone (taskId: number, section: TaskSection): void {
		this.zones.get (section)?.removeTask (taskId);
	}

	private async initTaskCallback (): Promise <CachedTask> {
		return this.taskProvider.createNewTask();
	}

	private finalizeTaskCallback (task: CachedTask): void {
		const id = this.managedTasks.addTask (task);
		this.displayTask (task, id);
	}
}


export interface CategoryChangeProvider {
	setCategoryChangeCallback (callbackfn: (taskId: number, newCategory: TaskSection, newIndex: number) => void): void;
}


export interface NewTaskProvider {
	setInitializeTaskCallback (callbackfn: () => Promise <CachedTask>): void;
	setFinalizeTaskCallback (callbackfn: (task: CachedTask) => void): void;
}
