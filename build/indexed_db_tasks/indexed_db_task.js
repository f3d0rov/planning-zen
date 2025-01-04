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
export class IndexedDBTask {
    constructor(db, key) {
        this.db = db;
        this.key = key;
    }
    static createNew(db) {
        return __awaiter(this, void 0, void 0, function* () {
            const key = yield IndexedDBTask.createTaskObjectInDb(db);
            return new IndexedDBTask(db, key);
        });
    }
    static restoreByKey(db, key) {
        return new IndexedDBTask(db, key);
    }
    static createTaskObjectInDb(db) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = db.transaction(IndexedDbData.taskObjectStoreName, "readwrite");
            const store = transaction.objectStore(IndexedDbData.taskObjectStoreName);
            const addTransaction = store.add(IndexedDBTask.newTaskData());
            return new Promise((resolve, reject) => {
                addTransaction.onsuccess = () => resolve(addTransaction.result.valueOf());
                addTransaction.onerror = reject;
            });
        });
    }
    static newTaskData() {
        return {
            task_name: "New task - double-click to edit",
            task_cat: "unset",
            task_index: 0
        };
    }
    getName() {
        return __awaiter(this, void 0, void 0, function* () {
            const object = yield this.getMyReadonlyObject();
            return object.task_name;
        });
    }
    getOrderIndex() {
        return __awaiter(this, void 0, void 0, function* () {
            const object = yield this.getMyReadonlyObject();
            return object.task_index;
        });
    }
    getSection() {
        return __awaiter(this, void 0, void 0, function* () {
            const object = yield this.getMyReadonlyObject();
            return object.task_cat;
        });
    }
    setName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const modifier = (object) => {
                object.task_name = name;
                console.log(`Setting task name to "${name}"`);
            };
            return this.modifyMyObject(modifier);
        });
    }
    setOrderIndex(index) {
        return __awaiter(this, void 0, void 0, function* () {
            const modifier = (object) => {
                object.task_index = index;
                console.log(`Setting task index to ${index}`);
            };
            return this.modifyMyObject(modifier);
        });
    }
    setSection(section) {
        return __awaiter(this, void 0, void 0, function* () {
            const modifier = (object) => {
                object.task_cat = section;
                console.log(`Setting task category to "${section}"`);
            };
            return this.modifyMyObject(modifier);
        });
    }
    getMyReadonlyObject() {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = this.db.transaction(IndexedDbData.taskObjectStoreName, "readonly");
            const store = transaction.objectStore(IndexedDbData.taskObjectStoreName);
            const readTransaction = store.get(IDBKeyRange.only(this.key));
            return new Promise((resolve, reject) => {
                readTransaction.onsuccess = () => resolve(readTransaction.result);
                readTransaction.onerror = reject;
            });
        });
    }
    modifyMyObject(modify) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = this.db.transaction(IndexedDbData.taskObjectStoreName, "readwrite");
            const store = transaction.objectStore(IndexedDbData.taskObjectStoreName);
            const validKeyGetter = store.getKey(IDBKeyRange.only(this.key));
            return new Promise((resolve, reject) => {
                validKeyGetter.onsuccess = () => {
                    const key = validKeyGetter.result;
                    if (key === undefined) {
                        reject();
                        return;
                    }
                    const readTransaction = store.get(key);
                    readTransaction.onsuccess = () => {
                        let object = readTransaction.result;
                        modify(object);
                        const requestUpdate = store.put(object, key);
                        requestUpdate.onerror = reject;
                        requestUpdate.onsuccess = () => resolve();
                    };
                    readTransaction.onerror = reject;
                };
            });
        });
    }
}
//# sourceMappingURL=indexed_db_task.js.map