import { BaseTaskZoneData } from "./base_task_zone_data";
import { TaskZoneDropHandler } from "./task_zone_drop_handler";
import { TaskZoneNewTaskHandler } from "./task_zone_new_task_handler";
import { TaskZoneTaskInserter } from "./task_zone_task_inserter";
import { TaskZoneTaskRemover } from "./task_zone_task_remover";
export class TaskZone {
    constructor(containerId, name, category) {
        this.baseData = new BaseTaskZoneData(containerId, name, category);
        this.dropHandler = new TaskZoneDropHandler(this.baseData);
        this.newTaskHandler = new TaskZoneNewTaskHandler(this.baseData);
        this.taskInserter = new TaskZoneTaskInserter(this.baseData);
        this.taskRemover = new TaskZoneTaskRemover(this.baseData);
    }
    getCatChangeProvider() {
        return this.dropHandler;
    }
    getNewTaskProvider() {
        return this.newTaskHandler;
    }
    getTaskDeleter() {
        return this.baseData;
    }
    addTask(id, task) {
        this.taskInserter.addTask(id, task);
    }
    removeTask(id) {
        this.taskRemover.removeTask(id);
    }
}
//# sourceMappingURL=task_zone.js.map