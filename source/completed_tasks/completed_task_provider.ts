
import { Task } from "../tasks/task";
import { CompletedTask } from "./comleted_task";


export interface CompletedTaskProvider {
	completeTask (task: Task): Promise <CompletedTask> | CompletedTask;
	restoreCompletedTasks (): Promise <Array <CompletedTask>> | Array <CompletedTask>;
	deleteCompletedTask (task: CompletedTask): Promise <void> | void;
}
