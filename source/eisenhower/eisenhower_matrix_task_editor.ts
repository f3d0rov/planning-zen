
import { Task, TaskSection } from "../tasks/task";
import { TaskProvider } from "../tasks/task_provider";
import { IndexedTasks } from "./indexed_tasks";
import { TaskElement } from "./task_element";
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
		this.zones.set ('do', new TaskZone ("task_zone_do", 'do'));
		this.zones.set ('schedule', new TaskZone ("task_zone_schedule", 'schedule'));
		this.zones.set ('delegate', new TaskZone ("task_zone_delegate", 'delegate'));
		this.zones.set ('delete', new TaskZone ("task_zone_delete", 'delete'));

		this.zones.forEach ((zone: TaskZone) => {
			this.addCategoryChangeProvider (zone);
			this.addNewTaskProvider (zone);
		});
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
		this.managedTasks.forEach ((task: Task) => {
			if (task.getSection() === category && task.getOrderIndex() >= startIndex) {
				task.setOrderIndex (task.getOrderIndex() + 1);
			}
		});
	}

	private removeTaskFromZone (taskId: number, section: TaskSection): void {
		this.zones.get (section)?.removeTask (taskId);
	}

	private initTaskCallback (): Task {
		return this.taskProvider.createNewTask();
	}

	private finalizeTaskCallback (task: Task): void {
		const id = this.managedTasks.addTask (task);
		this.displayTask (task, id);
	}
}


export interface CategoryChangeProvider {
	setCategoryChangeCallback (callbackfn: (taskId: number, newCategory: TaskSection, newIndex: number) => void): void;
}


export interface NewTaskProvider {
	setInitializeTaskCallback (callbackfn: () => Task): void;
	setFinalizeTaskCallback (callbackfn: (task: Task) => void): void;
}
