
export class IdbData {
	public static dbName: string = "planning_zen";
	public static dbVersion: number = 2;

	public static tasksStore = "active_tasks";
	public static completedTasksStore = "completed_tasks";

	public static task = {
		name: "task_name",
		category: "task_cat",
		index: "task_index"
	}

	public static completedTask = {
		name: "name",
		date: "date"
	}
}
