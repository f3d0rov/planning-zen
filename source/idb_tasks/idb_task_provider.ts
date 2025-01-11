
import { Task } from "../tasks/task";
import { TaskProvider } from "../tasks/task_provider";
import { IdbData } from "../idb/idb_data";
import { IdbOpener } from "../idb/idb_opener";
import { IdbTask } from "./idb_task";
import { getIdbStoreKeys } from "../idb/idb_tools";


export class IdbTaskProvider implements TaskProvider {
	private dbOpener: IdbOpener;
	private db: IDBDatabase | undefined;

	constructor (dbOpener: IdbOpener) {
		this.dbOpener = dbOpener;
	}

	public async openDB () {
		const result = await this.dbOpener.openDb();
		this.db = result.db;
	}

	public async createNewTask (): Promise <IdbTask> {
		return IdbTask.createNew (this.db!);
	}

	public async restoreTasks (): Promise <Array <IdbTask>> {
		const keys = await getIdbStoreKeys (this.db!, IdbData.tasksStore);
		const taskArray = new Array <IdbTask>;
		for (let i of keys) {
			const restoredTask = IdbTask.restoreByKey (this.db!, i.valueOf());
			taskArray.push (restoredTask);
		}
		return taskArray;
	}
	
	public deleteTask (task: Task): void | Promise <void> {
		const idbTask = task as IdbTask;
		return this.deleteIDBTask (idbTask);
	}

	private deleteIDBTask (task: IdbTask): void | Promise <void> {
		return task.delete();
	}

	public closeDb () {
		// Used in tests
		this.dbOpener.closeDb();
	}
}
