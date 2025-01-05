var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CachingTaskProvider } from "../tasks/caching_task_provider";
import { IndexedTasks } from "./indexed_tasks";
import { TaskZone } from "./task_zone";
export class EisenhowerMatrixTaskEditor {
    constructor(taskProvider) {
        this.managedTasks = new IndexedTasks;
        this.zones = new Map;
        this.taskProvider = new CachingTaskProvider(taskProvider);
    }
    restoreTasks() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.initTasks();
            this.initZones();
            this.displayInitializedTasks();
        });
    }
    initTasks() {
        return __awaiter(this, void 0, void 0, function* () {
            const tasks = yield this.taskProvider.restoreTasks();
            this.indexRestoredTasks(tasks);
        });
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
            this.addTaskDeleter(zone.getTaskDeleter());
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
    addTaskDeleter(taskDeleter) {
        taskDeleter.setDeleteTaskCallback(taskId => this.deleteTask(taskId));
    }
    changeTaskCategory(taskId, newCategory, newIndex) {
        const task = this.managedTasks.getTask(taskId);
        this.removeTaskFromZone(taskId, task.getSection());
        this.incrementIndicesToFreeSpaceForInsertedTask(newCategory, newIndex);
        task.setSection(newCategory);
        task.setOrderIndex(newIndex);
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
        return __awaiter(this, void 0, void 0, function* () {
            return this.taskProvider.createNewTask();
        });
    }
    finalizeTaskCallback(task) {
        const id = this.managedTasks.addTask(task);
        this.displayTask(task, id);
    }
    deleteTask(id) {
        const task = this.managedTasks.getTask(id);
        this.removeTaskFromZone(id, task.getSection());
        this.managedTasks.removeTask(id);
        return this.taskProvider.deleteTask(task);
    }
}
//# sourceMappingURL=eisenhower_matrix_task_editor.js.map