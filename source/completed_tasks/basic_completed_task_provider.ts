
import { CachedTask } from "../tasks/cached_task";
import { BasicCompletedTask } from "./basic_comleted_task";
import { CompletedTask } from "./comleted_task";
import { CompletedTaskProvider } from "./completed_task_provider";


export class BasicCompletedTaskProvider implements CompletedTaskProvider {
	private createdTasks: Array <BasicCompletedTask> = new Array <BasicCompletedTask>

	public completeTask (task: CachedTask): CompletedTask {
		const newCompletedTask = new BasicCompletedTask(task.getName(), new Date());
		this.createdTasks.push (newCompletedTask);
		return newCompletedTask;
	}

	public restoreCompletedTasks (): Array <CompletedTask> {
		return this.createdTasks;
	}

	public deleteCompletedTask (task: CompletedTask): void {
		const basicCompletedTask = task as BasicCompletedTask;
		const taskIndex = this.createdTasks.indexOf (basicCompletedTask);
		this.createdTasks.splice (taskIndex, 1);
	}
}
