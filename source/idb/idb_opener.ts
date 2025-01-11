
import { IdbData } from "./idb_data";


export class IdbOpeningResult {
	public success: boolean = false;
	public error: string = "";
	public db: IDBDatabase | undefined;

	private constructor () {}

	public static success (db: IDBDatabase): IdbOpeningResult {
		const result = new IdbOpeningResult;
		result.db = db;
		result.success = true;
		return result;	
	}

	public static failure (reason: string): IdbOpeningResult {
		const result = new IdbOpeningResult;
		result.error = reason;
		result.success = false;
		return result;
	}
}


export class IdbOpener {
	private openResult: IdbOpeningResult | undefined;

	constructor () {}

	public async openDb (): Promise <IdbOpeningResult> {
		if (this.openResult === undefined) {
			this.openResult = await this.doOpenDb();
		}
		return this.openResult;
	}

	public closeDb (): void {
		this.openResult?.db?.close();
		this.openResult = undefined;
	}

	private async doOpenDb (): Promise <IdbOpeningResult> {
		return new Promise ((resolve, reject) => {
			this.openIDBInPromise (resolve);
		});
	}

	private openIDBInPromise (resolve: (db: IdbOpeningResult) => void) {
		const request = indexedDB.open (IdbData.dbName, IdbData.dbVersion);
		request.onupgradeneeded = ev => this.getDbAndGenerateStructure (ev, resolve);
		request.onsuccess = ev => this.getOpenedDb (ev, resolve);
		request.onerror = ev => this.reportFailure (ev, resolve);
	}

	private getDbAndGenerateStructure (event: IDBVersionChangeEvent, resolve: (db: IdbOpeningResult) => void): void {
		const db = this.getDatabase (event);
		if (db === undefined) {
			return;
		}
		this.generateDBStructure (db, event.oldVersion);
		const transaction = (event.target as any).transaction as IDBTransaction;
		transaction.oncomplete = () => resolve (IdbOpeningResult.success (db));
	}

	private getOpenedDb (event: Event, resolve: (db: IdbOpeningResult) => void): void {
		const target = event.target as IDBOpenDBRequest;
		const db = target.result;
		resolve (IdbOpeningResult.success (db));
	}

	private reportFailure (event: Event, resolve: (db: IdbOpeningResult) => void): void {
		const target = event.target as IDBOpenDBRequest;
		const error: string = "" + target?.error?.message;
		console.trace (`Failed to open IndexedDB, reason: ${error}`);
		resolve (IdbOpeningResult.failure (error));
	}

	private getDatabase (event: IDBVersionChangeEvent): IDBDatabase | undefined {
		if (event.target === undefined) return undefined;
		const target = event.target as IDBOpenDBRequest;
		return target.result;
	}

	private generateDBStructure (db: IDBDatabase, oldVersion: number): void {
		if (oldVersion < 1) this.createTasksObjectStore (db);
		if (oldVersion < 2) this.createCompletedTaskObjectStore (db);
	}

	private createTasksObjectStore (db: IDBDatabase): void {
		const taskObjectStore = db.createObjectStore (
			IdbData.tasksStore,
			{
				autoIncrement: true
			}
		);

		taskObjectStore.createIndex (IdbData.task.name, IdbData.task.name, { unique: false });
		taskObjectStore.createIndex (IdbData.task.category, IdbData.task.category, { unique: false });
		taskObjectStore.createIndex (IdbData.task.index, IdbData.task.index, { unique: false });
	}

	private createCompletedTaskObjectStore (db: IDBDatabase): void {
		const completedTaskObjectStore = db.createObjectStore (
			IdbData.completedTasksStore,
			{
				autoIncrement: true
			}
		);

		completedTaskObjectStore.createIndex (IdbData.completedTask.name, IdbData.completedTask.name, { unique: false });
		completedTaskObjectStore.createIndex (IdbData.completedTask.date, IdbData.completedTask.date, { unique: false });
	}
}
