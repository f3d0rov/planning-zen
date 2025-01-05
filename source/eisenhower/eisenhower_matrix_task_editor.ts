
import { CachedTask } from "../tasks/cached_task";
import { CachingTaskProvider } from "../tasks/caching_task_provider";
import { TaskSection } from "../tasks/task";
import { TaskProvider } from "../tasks/task_provider";
import { IndexedTasks } from "./indexed_tasks";
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
		// TODO: better
		this.zones.set ('do', new TaskZone ("do_task_box", 'Do', 'do'));
		this.zones.set ('schedule', new TaskZone ("schedule_task_box", 'Schedule', 'schedule'));
		this.zones.set ('delegate', new TaskZone ("delegate_task_box", 'Delegate', 'delegate'));
		this.zones.set ('delete', new TaskZone ("dont_task_box", "Don't do", 'delete'));

		this.zones.forEach ((zone: TaskZone) => {
			this.addCategoryChangeProvider (zone.getCatChangeProvider());
			this.addNewTaskProvider (zone.getNewTaskProvider());
			this.addTaskDeleter (zone.getTaskDeleter());
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

	public addTaskDeleter (taskDeleter: TaskDeleter): void {
		taskDeleter.setDeleteTaskCallback (taskId => this.deleteTask (taskId));
	}

	private changeTaskCategory (taskId: number, newCategory: TaskSection, newIndex: number): void {
		const task = this.managedTasks.getTask (taskId);
		this.removeTaskFromZone (taskId, task.getSection());
		this.incrementIndicesToFreeSpaceForInsertedTask (newCategory, newIndex);
		task.setSection (newCategory);
		task.setOrderIndex (newIndex);
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

	private deleteTask (id: number): Promise <void> {
		const task = this.managedTasks.getTask (id);
		this.removeTaskFromZone (id, task.getSection());
		this.managedTasks.removeTask (id);
		return this.taskProvider.deleteTask (task);
	}
}


export interface CategoryChangeProvider {
	setCategoryChangeCallback (callbackfn: (taskId: number, newCategory: TaskSection, newIndex: number) => void): void;
}


export interface NewTaskProvider {
	setInitializeTaskCallback (callbackfn: () => Promise <CachedTask>): void;
	setFinalizeTaskCallback (callbackfn: (task: CachedTask) => void): void;
}


export interface TaskDeleter {
	setDeleteTaskCallback (callbackfn: (taskId: number) => Promise <void>): void;
}
