
import { Task, TaskSection } from "../tasks/task";
import { IdbData } from "../idb/idb_data";
import { requestAsPromise } from "../idb/idb_tools";


export class IdbTask implements Task {
	private db: IDBDatabase;
	private key: string | number | Object;

	private constructor (db: IDBDatabase, key: string | number | Object) {
		this.db = db;
		this.key = key;
	}

	public static async createNew (db: IDBDatabase): Promise <IdbTask> {
		const key = await IdbTask.createTaskObjectInDb (db);
		return new IdbTask (db, key);
	}

	public static restoreByKey (db: IDBDatabase, key: string | number | Object) {
		return new IdbTask (db, key);
	}

	private static async createTaskObjectInDb (db: IDBDatabase): Promise <string | number | Object> {
		const transaction = db.transaction (IdbData.tasksStore, "readwrite");
		const store = transaction.objectStore (IdbData.tasksStore);
		const addRequest = store.add (IdbTask.newTaskData());
		return requestAsPromise (addRequest);
	}

	public getKey (): any {
		return this.key;
	}

	private static newTaskData (): any {
		return {
			task_name: "New task - double-click to edit",
			task_cat: "unset",
			task_index: 0
		};
	}

	public async getName(): Promise <string> {
		const object = (await this.openTransactionAndGetMyObject ()).object;
		return object.task_name;
	}
	
	public async getOrderIndex(): Promise <number> {
		const object = (await this.openTransactionAndGetMyObject ()).object;
		return object.task_index;
	}
	
	public async getSection(): Promise <TaskSection> {
		const object = (await this.openTransactionAndGetMyObject ()).object;
		return object.task_cat;
	}
	
	public async setName (name: string): Promise <void> {
		const modifier = (object: any) => {
			object.task_name = name;
			console.log (`Setting task name to "${name}"`);
		};
		return this.modifyMyObject (modifier);
	}
	
	public async setOrderIndex(index: number): Promise <void> {
		const modifier = (object: any) => {
			object.task_index = index;
			console.log (`Setting task index to ${index}`);
		};
		return this.modifyMyObject (modifier);
	}

	public async setSection(section: TaskSection): Promise <void> {
		const modifier = (object: any) => {
			object.task_cat = section;
			console.log (`Setting task category to "${section}"`);
		};
		return this.modifyMyObject (modifier);
	}

	public async delete (): Promise <void> {
		const store = this.openStore ("readwrite");
		const request = store.delete (IDBKeyRange.only (this.key));
		return requestAsPromise (request);
	}

	private async modifyMyObject (modify: (object: any) => void): Promise <void> {
		const data = await this.openTransactionAndGetMyObject ("readwrite");

		modify (data.object);
		
		const updateRequest = data.store.put (data.object, data.key);
		await requestAsPromise (updateRequest);
	}


	private async openTransactionAndGetMyObject (mode: IDBTransactionMode = "readonly"): Promise <OpenTransactionData> {
		const store = this.openStore (mode);
		const key = await this.getValidKey (store);
		const object = await this.getMyObject (store, key);
		return new OpenTransactionData (object, store, key);
	}

	private openStore (mode: IDBTransactionMode = "readonly"): IDBObjectStore {
		const transaction = this.db.transaction (IdbData.tasksStore, mode);
		const store = transaction.objectStore (IdbData.tasksStore);
		return store;
	}

	private async getValidKey (store: IDBObjectStore): Promise <any> {
		const validKeyRequest = store.getKey (IDBKeyRange.only (this.key));
		return requestAsPromise (validKeyRequest);
	}

	private getMyObject (store: IDBObjectStore, key: any): Promise <any> {
		const readTransaction = store.get (key);
		return requestAsPromise (readTransaction);
	}
}


class OpenTransactionData {
	public store: IDBObjectStore;
	public object: any;
	public key: any;

	constructor (object: any, store: IDBObjectStore, key: any) {
		this.store = store;
		this.object = object;
		this.key = key;
	}
}
