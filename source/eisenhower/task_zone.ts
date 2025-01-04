
import { CachedTask } from "../tasks/cached_task";
import { TaskSection } from "../tasks/task";
import { BaseTaskZoneData } from "./base_task_zone_data";
import { CategoryChangeProvider, NewTaskProvider } from "./eisenhower_matrix_task_editor";
import { TaskZoneDropHandler } from "./task_zone_drop_handler";
import { TaskZoneNewTaskHandler } from "./task_zone_new_task_handler";
import { TaskZoneTaskInserter } from "./task_zone_task_inserter";
import { TaskZoneTaskRemover } from "./task_zone_task_remover";


export class TaskZone {
	private baseData: BaseTaskZoneData;

	private dropHandler: TaskZoneDropHandler;
	private newTaskHandler: TaskZoneNewTaskHandler;

	private taskInserter: TaskZoneTaskInserter;
	private taskRemover: TaskZoneTaskRemover;
	

	constructor (taskBoxElementId: string, category: TaskSection) {
		this.baseData = new BaseTaskZoneData (taskBoxElementId, category);
		this.dropHandler = new TaskZoneDropHandler (this.baseData);
		this.newTaskHandler = new TaskZoneNewTaskHandler (this.baseData);
		this.taskInserter = new TaskZoneTaskInserter (this.baseData);
		this.taskRemover = new TaskZoneTaskRemover (this.baseData);
	}

	public getCatChangeProvider (): CategoryChangeProvider {
		return this.dropHandler;
	}

	public getNewTaskProvider (): NewTaskProvider {
		return this.newTaskHandler;
	}

	public addTask (id: number, task: CachedTask): void {
		this.taskInserter.addTask (id, task);
	}

	public removeTask (id: number): void {
		this.taskRemover.removeTask (id);
	}
}
