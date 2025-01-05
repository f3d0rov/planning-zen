
import { Task } from "./task";

export interface TaskProvider {
	createNewTask (): Task | Promise <Task>;
	restoreTasks (): Array <Task> | Promise <Array <Task>>;
	deleteTask (task: Task): void | Promise <void>;
}
