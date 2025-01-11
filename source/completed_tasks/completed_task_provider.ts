
import { CachedTask } from "../tasks/cached_task";
import { CompletedTask } from "./comleted_task";


export interface CompletedTaskProvider {
	completeTask (task: CachedTask): Promise <CompletedTask> | CompletedTask;
	restoreCompletedTasks (): Promise <Array <CompletedTask>> | Array <CompletedTask>;
	deleteCompletedTask (task: CompletedTask): Promise <void> | void;
}
