
export async function requestAsPromise <ResultType> (request: IDBRequest <ResultType>): Promise <ResultType> {
	return new Promise ((resolve, reject) => {
		request.onsuccess = ev => resolve (request.result);
		request.onerror = reject;
	});
}

export async function getIdbStoreKeys (db: IDBDatabase, storeName: string): Promise <IDBValidKey[]> {
	const transaction = db.transaction (storeName, "readonly");
	const store = transaction.objectStore (storeName);
	const readRequest = store.getAllKeys();
	return requestAsPromise (readRequest);
}
