
import { BasicCompletedTask } from "../completed_tasks/basic_comleted_task";
import { CompletedTask } from "../completed_tasks/comleted_task";
import { CompletedTaskProvider } from "../completed_tasks/completed_task_provider";
import { IdbData } from "../idb/idb_data";
import { IdbOpener } from "../idb/idb_opener";
import { getIdbStoreKeys, requestAsPromise } from "../idb/idb_tools";
import { CachedTask } from "../tasks/cached_task";


export class IdbCompletedTask extends BasicCompletedTask {
	private key: any;

	constructor (name: string, date: Date) {
		super (name, date);
	}

	public setKey (key: any) {
		this.key = key;
	}

	public getKey (): any {
		return this.key;
	}
}


export class IdbCompletedTaskProvider implements CompletedTaskProvider {
	private dbOpener: IdbOpener;
	private db: IDBDatabase | undefined;

	constructor (dbOpener: IdbOpener) {
		this.dbOpener = dbOpener;
	}

	public async openDb (): Promise <void> {
		const openingResult = await this.dbOpener.openDb();
		this.db = openingResult.db;
	}

	public async completeTask (task: CachedTask): Promise <CompletedTask> {
		const completedTask = new IdbCompletedTask (task.getName(), new Date());
		const serialized = this.serialize (completedTask);
		const key = await this.storeInDb (serialized);
		completedTask.setKey (key.valueOf());
		return completedTask;
	}

	public async deleteCompletedTask (task: CompletedTask): Promise <void> {
		const store = this.openStore ("readwrite");
		const taskKey = (task as IdbCompletedTask).getKey();
		const request = store.delete (IDBKeyRange.only (taskKey));
		return requestAsPromise (request);
	}

	public async restoreCompletedTasks (): Promise <Array <CompletedTask>> {
		const keys = await getIdbStoreKeys (this.db!, IdbData.completedTasksStore);
		console.log (`Key count: ${keys.length}`);
		const store = this.openStore ("readonly");
		const tasks = new Array <IdbCompletedTask>;
		
		for (let i of keys) {
			const task = await this.fetchTaskInfo (i, store);
			tasks.push (task);
		}

		return tasks;
	}
	
	private serialize (task: BasicCompletedTask): any {
		return {
			name: task.getName(),
			date: task.getCompletionDate().toUTCString()
		};
	}
	
	private async storeInDb (serializedTask: any): Promise <string | number | Object> {
		const store = this.openStore ("readwrite");
		const addRequest = store.add (serializedTask);
		const newKey = await requestAsPromise (addRequest);
		return newKey.valueOf();
	}

	private async fetchTaskInfo (key: IDBValidKey, store: IDBObjectStore): Promise <IdbCompletedTask> {
		const readRequest = store.get (key);
		const object = await requestAsPromise (readRequest);
		const task = new IdbCompletedTask (object.name, new Date (object.date));
		task.setKey (key.valueOf());
		return task;
	}

	private openStore (mode: IDBTransactionMode = "readonly"): IDBObjectStore {
		const transaction = this.db!.transaction (IdbData.completedTasksStore, mode);
		const store = transaction.objectStore (IdbData.completedTasksStore);
		return store;
	}

	public closeDb (): void {
		this.dbOpener.closeDb();
	}
}
