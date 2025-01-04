
import { CachedTask } from "../tasks/cached_task";
import { Task } from "../tasks/task";


export class IndexedTasks {
	private tasks: Map <number, CachedTask> = new Map <number, CachedTask>;
	private lastTaskIndex = 0;


	public addTask (task: CachedTask): number {
		const newTaskIndex = ++this.lastTaskIndex;
		this.tasks.set (newTaskIndex, task);
		return newTaskIndex;
	}

	public getTask (index: number): CachedTask {
		return this.tryGetTask (index) as CachedTask;
	}

	public tryGetTask (index: number): CachedTask | undefined {
		return this.tasks.get (index);
	}

	public removeTask (index: number): void {
		this.tasks.delete (index);
	}

	public forEach (callbackfn: (task: CachedTask, index: number) => void): void {
		this.tasks.forEach (callbackfn);
	}
}
