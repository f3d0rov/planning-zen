
import { IdbData } from "../source/idb/idb_data";


export async function clearDatabase (): Promise <void> {
	const deleteDb = window.indexedDB.deleteDatabase (IdbData.dbName);
	return new Promise ((resolve, reject) => {
		deleteDb.onsuccess = () => resolve();
	});
}
