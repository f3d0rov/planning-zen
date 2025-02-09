
import { Task } from "../tasks/task";
import { BasicCompletedTask } from "./basic_comleted_task";
import { CompletedTask } from "./comleted_task";
import { CompletedTaskProvider } from "./completed_task_provider";


export class BasicCompletedTaskProvider implements CompletedTaskProvider {
	private createdTasks: Array <BasicCompletedTask> = new Array <BasicCompletedTask>

	public async completeTask (task: Task): Promise <CompletedTask> {
		const taskName = await task.getName();
		const newCompletedTask = new BasicCompletedTask(taskName, new Date());
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
