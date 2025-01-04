var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { IndexedDbData } from "./indexed_db_data";
export class IndexedDbOpeningResult {
    constructor() {
        this.success = false;
        this.error = "";
    }
    static success(db) {
        const result = new IndexedDbOpeningResult;
        result.db = db;
        result.success = true;
        return result;
    }
    static failure(reason) {
        const result = new IndexedDbOpeningResult;
        result.error = reason;
        result.success = false;
        return result;
    }
}
export class IndexedDbOpener {
    constructor() { }
    openDb() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.openIDBInPromise(resolve);
            });
        });
    }
    openIDBInPromise(resolve) {
        const request = indexedDB.open(IndexedDbData.dbName, IndexedDbData.dbVersion);
        request.onupgradeneeded = ev => this.getDbAndGenerateStructure(ev, resolve);
        request.onsuccess = ev => this.getOpenedDb(ev, resolve);
        request.onerror = ev => this.reportFailure(ev, resolve);
    }
    getDbAndGenerateStructure(event, resolve) {
        const db = this.getDatabase(event);
        if (db === undefined)
            return;
        this.generateDBStructure(db);
        resolve(IndexedDbOpeningResult.success(db));
    }
    getOpenedDb(event, resolve) {
        const target = event.target;
        const db = target.result;
        resolve(IndexedDbOpeningResult.success(db));
    }
    reportFailure(event, resolve) {
        var _a;
        const target = event.target;
        const error = "" + ((_a = target === null || target === void 0 ? void 0 : target.error) === null || _a === void 0 ? void 0 : _a.message);
        console.trace(`Failed to open IndexedDB, reason: ${error}`);
        resolve(IndexedDbOpeningResult.failure(error));
    }
    getDatabase(event) {
        if (event.target === undefined)
            return undefined;
        const target = event.target;
        return target.result;
    }
    generateDBStructure(db) {
        const taskObjectStore = db.createObjectStore(IndexedDbData.taskObjectStoreName, {
            autoIncrement: true
        });
        taskObjectStore.createIndex(IndexedDbData.task.name, IndexedDbData.task.name, { unique: false });
        taskObjectStore.createIndex(IndexedDbData.task.category, IndexedDbData.task.category, { unique: false });
        taskObjectStore.createIndex(IndexedDbData.task.index, IndexedDbData.task.index, { unique: false });
    }
}
//# sourceMappingURL=indexed_db_opener.js.map