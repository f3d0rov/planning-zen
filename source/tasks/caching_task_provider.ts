
import { CachedTask } from "./cached_task";
import { Task } from "./task";
import { TaskProvider } from "./task_provider";


export class CachingTaskProvider {
	private underlyingTaskProvider: TaskProvider;

	constructor (underlyingTaskProvider: TaskProvider) {
		this.underlyingTaskProvider = underlyingTaskProvider;
	}
	
	public async createNewTask (): Promise <CachedTask> {
		const newTask = await this.underlyingTaskProvider.createNewTask();
		const cachedTask = new CachedTask (newTask);
		await cachedTask.cacheInfo();
		return cachedTask;
	}

	public async restoreTasks (): Promise <Array <CachedTask>> {
		const restoredTasks = await this.underlyingTaskProvider.restoreTasks();
		const cachedTasks: Array <CachedTask> = new Array <CachedTask>;
		for (let task of restoredTasks) {
			const cachedTask = new CachedTask (task);
			await cachedTask.cacheInfo();
			cachedTasks.push (cachedTask);
		}
		return cachedTasks;
	}
}
