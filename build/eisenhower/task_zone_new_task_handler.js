export class TaskZoneNewTaskHandler {
    constructor(baseData) {
        this.data = baseData;
        this.setupEvents();
    }
    setupEvents() {
        this.data.getElement().addContentsEvent('dblclick', ev => this.spawnNewTask(ev));
    }
    setInitializeTaskCallback(callbackfn) {
        this.initNewTask = callbackfn;
    }
    setFinalizeTaskCallback(callbackfn) {
        this.finalizeNewTask = callbackfn;
    }
    spawnNewTask(event) {
        const task = this.initNewTask();
        task.setName("Double-click to edit!");
        task.setOrderIndex(this.getNextLastIndex());
        task.setSection(this.data.getCategory());
        this.finalizeNewTask(task);
    }
    getNextLastIndex() {
        const lastTaskElement = this.data.getTasks().back();
        if (lastTaskElement === undefined)
            return 1;
        else
            return lastTaskElement.getTask().getOrderIndex() + 1;
    }
}
//# sourceMappingURL=task_zone_new_task_handler.js.map