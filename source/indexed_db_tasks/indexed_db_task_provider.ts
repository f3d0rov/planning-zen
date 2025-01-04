
import { TaskProvider } from "../tasks/task_provider";
import { IndexedDbData } from "./indexed_db_data";
import { IndexedDbOpener } from "./indexed_db_opener";
import { IndexedDBTask } from "./indexed_db_task";


export class IndexedDBTaskProvider implements TaskProvider {
	private db: IDBDatabase | undefined;

	constructor () {}

	public async openDB () {
		const dbOpener = new IndexedDbOpener;
		const result = await dbOpener.openDb();
		this.db = result.db;
	}

	public async createNewTask (): Promise <IndexedDBTask> {
		return IndexedDBTask.createNew (this.db!);
	}

	public async restoreTasks (): Promise <Array <IndexedDBTask>> {
		const transaction = this.db!.transaction (IndexedDbData.taskObjectStoreName, "readonly");
		const store = transaction.objectStore (IndexedDbData.taskObjectStoreName);
		const readTransaction = store.getAllKeys();

		return new Promise ((resolve, reject) => {
			readTransaction.onsuccess = () => {
				const keyArray = readTransaction.result;
				const taskArray = new Array <IndexedDBTask>;
				for (let i of keyArray) {
					const restoredTask = IndexedDBTask.restoreByKey (this.db!, i.valueOf());
					taskArray.push (restoredTask);
				}
				resolve (taskArray);
			}
			readTransaction.onerror = reject;
		});
	}
}
