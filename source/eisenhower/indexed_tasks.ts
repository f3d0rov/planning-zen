
import { Task } from "../tasks/task";


export class IndexedTasks {
	private tasks: Map <number, Task> = new Map <number, Task>;
	private lastTaskIndex = 0;


	public addTask (task: Task): number {
		const newTaskIndex = ++this.lastTaskIndex;
		this.tasks.set (newTaskIndex, task);
		return newTaskIndex;
	}

	public getTask (index: number): Task {
		return this.tryGetTask (index) as Task;
	}

	public tryGetTask (index: number): Task | undefined {
		return this.tasks.get (index);
	}

	public removeTask (index: number): void {
		this.tasks.delete (index);
	}

	public forEach (callbackfn: (task: Task, index: number) => void): void {
		this.tasks.forEach (callbackfn);
	}
}
