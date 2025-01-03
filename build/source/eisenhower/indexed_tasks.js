export class IndexedTasks {
    constructor() {
        this.tasks = new Map;
        this.lastTaskIndex = 0;
    }
    addTask(task) {
        const newTaskIndex = ++this.lastTaskIndex;
        this.tasks.set(newTaskIndex, task);
        return newTaskIndex;
    }
    getTask(index) {
        return this.tryGetTask(index);
    }
    tryGetTask(index) {
        return this.tasks.get(index);
    }
    removeTask(index) {
        this.tasks.delete(index);
    }
    forEach(callbackfn) {
        this.tasks.forEach(callbackfn);
    }
}
//# sourceMappingURL=indexed_tasks.js.map