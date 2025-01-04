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
import { IndexedDbOpener } from "./indexed_db_opener";
import { IndexedDBTask } from "./indexed_db_task";
export class IndexedDBTaskProvider {
    constructor() { }
    openDB() {
        return __awaiter(this, void 0, void 0, function* () {
            const dbOpener = new IndexedDbOpener;
            const result = yield dbOpener.openDb();
            this.db = result.db;
        });
    }
    createNewTask() {
        return __awaiter(this, void 0, void 0, function* () {
            return IndexedDBTask.createNew(this.db);
        });
    }
    restoreTasks() {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = this.db.transaction(IndexedDbData.taskObjectStoreName, "readonly");
            const store = transaction.objectStore(IndexedDbData.taskObjectStoreName);
            const readTransaction = store.getAllKeys();
            return new Promise((resolve, reject) => {
                readTransaction.onsuccess = () => {
                    const keyArray = readTransaction.result;
                    const taskArray = new Array;
                    for (let i of keyArray) {
                        const restoredTask = IndexedDBTask.restoreByKey(this.db, i.valueOf());
                        taskArray.push(restoredTask);
                    }
                    resolve(taskArray);
                };
                readTransaction.onerror = reject;
            });
        });
    }
}
//# sourceMappingURL=indexed_db_task_provider.js.map