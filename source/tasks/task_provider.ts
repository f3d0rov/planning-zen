
import { Task } from "./task";

export interface TaskProvider {
	createNewTask (): Task;
	restoreTasks (): Array <Task>;
}
