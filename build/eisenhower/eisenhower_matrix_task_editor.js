import { IndexedTasks } from "./indexed_tasks";
import { TaskZone } from "./task_zone";
export class EisenhowerMatrixTaskEditor {
    constructor(taskProvider) {
        this.managedTasks = new IndexedTasks;
        this.zones = new Map;
        this.taskProvider = taskProvider;
        this.initTasks();
        this.initZones();
        this.displayInitializedTasks();
    }
    initTasks() {
        const tasks = this.taskProvider.restoreTasks();
        this.indexRestoredTasks(tasks);
    }
    indexRestoredTasks(tasks) {
        tasks.forEach((task) => {
            this.managedTasks.addTask(task);
        });
    }
    initZones() {
        this.zones.set('do', new TaskZone("task_zone_do"));
        this.zones.set('schedule', new TaskZone("task_zone_schedule"));
        this.zones.set('delegate', new TaskZone("task_zone_delegate"));
        this.zones.set('delete', new TaskZone("task_zone_delete"));
    }
    displayInitializedTasks() {
        this.managedTasks.forEach((task, index) => {
            this.displayTask(task, index);
        });
    }
    displayTask(task, index) {
        const zone = this.zones.get(task.getSection());
        zone === null || zone === void 0 ? void 0 : zone.addTask(index, task);
    }
}
//# sourceMappingURL=eisenhower_matrix_task_editor.js.map