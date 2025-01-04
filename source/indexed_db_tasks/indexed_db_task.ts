
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

	private static newTaskData (): any {
		return {
			task_name: "New task - double-click to edit",
			task_cat: "unset",
			task_index: 0 
		};
	}

	public async getName(): Promise <string> {
		const object = await this.getMyReadonlyObject();
		return object.task_name;
	}
	
	public async getOrderIndex(): Promise <number> {
		const object = await this.getMyReadonlyObject();
		return object.task_index;
		
	}
	
	public async getSection(): Promise <TaskSection> {
		const object = await this.getMyReadonlyObject();
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

	private async getMyReadonlyObject (): Promise <any> {
		const transaction = this.db.transaction (IndexedDbData.taskObjectStoreName, "readonly");
		const store = transaction.objectStore (IndexedDbData.taskObjectStoreName);
		const readTransaction = store.get (IDBKeyRange.only (this.key));
		return new Promise ((resolve, reject) => {
			readTransaction.onsuccess = () => resolve (readTransaction.result);
			readTransaction.onerror = reject;
		});
	}

	private async modifyMyObject (modify: (object: any) => void): Promise <void> {
		const transaction = this.db.transaction (IndexedDbData.taskObjectStoreName, "readwrite");
		const store = transaction.objectStore (IndexedDbData.taskObjectStoreName);
		const validKeyGetter = store.getKey (IDBKeyRange.only (this.key));
		
		return new Promise ((resolve, reject) => {
			validKeyGetter.onsuccess = () => {
				const key = validKeyGetter.result;
				if (key === undefined) {
					reject();
					return;
				} 
				const readTransaction = store.get (key);
				readTransaction.onsuccess = () => {
					let object = readTransaction.result;
					modify (object);
					const requestUpdate = store.put (object, key);
					requestUpdate.onerror = reject;
					requestUpdate.onsuccess = () => resolve();
				}
				readTransaction.onerror = reject;
			};
		});
	}
}
