
import { Task, TaskSection } from "../tasks/task";
import { IndexedDbData } from "./indexed_db_data";


export class IndexedDBTask implements Task {
	private db: IDBDatabase;
	private key: string | number | Object;

	private constructor (db: IDBDatabase, key: string | number | Object) {
		this.db = db;
		this.key = key;
	}

	public static async createNew (db: IDBDatabase): Promise <IndexedDBTask> {
		const key = await IndexedDBTask.createTaskObjectInDb (db);
		return new IndexedDBTask (db, key);
	}

	public static restoreByKey (db: IDBDatabase, key: string | number | Object) {
		return new IndexedDBTask (db, key);
	}

	private static async createTaskObjectInDb (db: IDBDatabase): Promise <string | number | Object> {
		const transaction = db.transaction (IndexedDbData.taskObjectStoreName, "readwrite");
		const store = transaction.objectStore (IndexedDbData.taskObjectStoreName);
		const addTransaction = store.add (IndexedDBTask.newTaskData());
		return new Promise ((resolve, reject) => {
			addTransaction.onsuccess = () => resolve (addTransaction.result.valueOf());
			addTransaction.onerror = reject;
		});
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
		const store = this.openTransaction ("readwrite");
		const request = store.delete (IDBKeyRange.only (this.key));
		return new Promise ((resolve, reject) => {
			request.onsuccess = () => resolve();
			request.onerror = reject;
		});
	}

	private async modifyMyObject (modify: (object: any) => void): Promise <void> {
		const data = await this.openTransactionAndGetMyObject ("readwrite");

		modify (data.object);
		
		const updateRequest = data.store.put (data.object, data.key);
		return new Promise ((resolve, reject) => {
			updateRequest.onerror = reject;
			updateRequest.onsuccess = () => resolve();
		});
	}


	private async openTransactionAndGetMyObject (mode: IDBTransactionMode = "readonly"): Promise <OpenTransactionData> {
		const store = this.openTransaction (mode);
		const key = await this.getValidKey (store);
		const object = await this.getMyObject (store, key);
		return new OpenTransactionData (object, store, key);
	}

	private openTransaction (mode: IDBTransactionMode = "readonly"): IDBObjectStore {
		const transaction = this.db.transaction (IndexedDbData.taskObjectStoreName, mode);
		const store = transaction.objectStore (IndexedDbData.taskObjectStoreName);
		return store;
	}

	private async getValidKey (store: IDBObjectStore): Promise <any> {
		const validKeyRequest = store.getKey (IDBKeyRange.only (this.key));

		return new Promise ((resolve, reject) => {
			validKeyRequest.onsuccess = () => resolve (validKeyRequest.result);
			validKeyRequest.onerror = reject;
		});
	}

	private getMyObject (store: IDBObjectStore, key: any): Promise <any> {
		const readTransaction = store.get (key);

		return new Promise ((resolve, reject) => {
			readTransaction.onsuccess = () => resolve (readTransaction.result);
			readTransaction.onerror = reject;
		});
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
