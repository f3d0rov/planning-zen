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
        this.zones.set('do', new TaskZone("task_zone_do", 'do'));
        this.zones.set('schedule', new TaskZone("task_zone_schedule", 'schedule'));
        this.zones.set('delegate', new TaskZone("task_zone_delegate", 'delegate'));
        this.zones.set('delete', new TaskZone("task_zone_delete", 'delete'));
        this.zones.forEach((zone) => {
            this.addCategoryChangeProvider(zone.getCatChangeProvider());
            this.addNewTaskProvider(zone.getNewTaskProvider());
        });
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
    addCategoryChangeProvider(catChangeProvider) {
        catChangeProvider.setCategoryChangeCallback((taskId, newCat, newIndex) => this.changeTaskCategory(taskId, newCat, newIndex));
    }
    addNewTaskProvider(newTaskProvider) {
        newTaskProvider.setInitializeTaskCallback(() => this.initTaskCallback());
        newTaskProvider.setFinalizeTaskCallback(task => this.finalizeTaskCallback(task));
    }
    changeTaskCategory(taskId, newCategory, newIndex) {
        const task = this.managedTasks.getTask(taskId);
        this.removeTaskFromZone(taskId, task.getSection());
        this.incrementIndicesToFreeSpaceForInsertedTask(newCategory, newIndex);
        task.setSection(newCategory);
        task.setOrderIndex(newIndex);
        console.log(`New index: ${newIndex}`);
        this.displayTask(task, taskId);
    }
    incrementIndicesToFreeSpaceForInsertedTask(category, startIndex) {
        this.managedTasks.forEach((task) => {
            if (task.getSection() === category && task.getOrderIndex() >= startIndex) {
                task.setOrderIndex(task.getOrderIndex() + 1);
            }
        });
    }
    removeTaskFromZone(taskId, section) {
        var _a;
        (_a = this.zones.get(section)) === null || _a === void 0 ? void 0 : _a.removeTask(taskId);
    }
    initTaskCallback() {
        return this.taskProvider.createNewTask();
    }
    finalizeTaskCallback(task) {
        const id = this.managedTasks.addTask(task);
        this.displayTask(task, id);
    }
}
//# sourceMappingURL=eisenhower_matrix_task_editor.js.map