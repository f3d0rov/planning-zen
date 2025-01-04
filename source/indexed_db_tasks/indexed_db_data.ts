
export class IndexedDbData {
	public static dbName: string = "planning_zen";
	public static dbVersion: number = 1;

	public static taskObjectStoreName = "active_tasks";

	public static task = {
		name: "task_name",
		category: "task_cat",
		index: "task_index"
	}

}

