import { IndexedDbData } from "./indexed_db_data";


export class IndexedDbOpeningResult {
	public success: boolean = false;
	public error: string = "";
	public db: IDBDatabase | undefined;

	private constructor () {}

	public static success (db: IDBDatabase): IndexedDbOpeningResult {
		const result = new IndexedDbOpeningResult;
		result.db = db;
		result.success = true;
		return result;	
	}

	public static failure (reason: string): IndexedDbOpeningResult {
		const result = new IndexedDbOpeningResult;
		result.error = reason;
		result.success = false;
		return result;
	}
}


export class IndexedDbOpener {
	constructor () {}

	public async openDb (): Promise <IndexedDbOpeningResult> {
		return new Promise ((resolve, reject) => {
			this.openIDBInPromise (resolve);
		});
	}

	private openIDBInPromise (resolve: (db: IndexedDbOpeningResult) => void) {
		const request = indexedDB.open (IndexedDbData.dbName, IndexedDbData.dbVersion);
		request.onupgradeneeded = ev => this.getDbAndGenerateStructure (ev, resolve);
		request.onsuccess = ev => this.getOpenedDb (ev, resolve);
		request.onerror = ev => this.reportFailure (ev, resolve);
	}

	private getDbAndGenerateStructure (event: IDBVersionChangeEvent, resolve: (db: IndexedDbOpeningResult) => void): void {
		const db = this.getDatabase (event);
		if (db === undefined) {
			return;
		}
		this.generateDBStructure (db);
		const transaction = (event.target as any).transaction as IDBTransaction;
		transaction.oncomplete = () => resolve (IndexedDbOpeningResult.success (db));
	}

	private getOpenedDb (event: Event, resolve: (db: IndexedDbOpeningResult) => void): void {
		const target = event.target as IDBOpenDBRequest;
		const db = target.result;
		resolve (IndexedDbOpeningResult.success (db));
	}

	private reportFailure (event: Event, resolve: (db: IndexedDbOpeningResult) => void): void {
		const target = event.target as IDBOpenDBRequest;
		const error: string = "" + target?.error?.message;
		console.trace (`Failed to open IndexedDB, reason: ${error}`);
		resolve (IndexedDbOpeningResult.failure (error));
	}

	private getDatabase (event: IDBVersionChangeEvent): IDBDatabase | undefined {
		if (event.target === undefined) return undefined;
		const target = event.target as IDBOpenDBRequest;
		return target.result;
	}

	private generateDBStructure (db: IDBDatabase): void {
		const taskObjectStore = db.createObjectStore (
			IndexedDbData.taskObjectStoreName,
			{
				autoIncrement: true
			}
		);

		taskObjectStore.createIndex (IndexedDbData.task.name, IndexedDbData.task.name, { unique: false });
		taskObjectStore.createIndex (IndexedDbData.task.category, IndexedDbData.task.category, { unique: false });
		taskObjectStore.createIndex (IndexedDbData.task.index, IndexedDbData.task.index, { unique: false });
	}
}
