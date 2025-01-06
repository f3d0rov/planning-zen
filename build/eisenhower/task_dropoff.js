import { cloneTemplateById, getElementById } from "../common/common";
import { TaskDropZone } from "./task_drop_zone";
export class TaskDropoff {
    constructor(parentId, name) {
        this.element = this.getElement(parentId, name);
        this.dropZone = new TaskDropZone(this.element);
        this.setupEvents();
    }
    getElement(parentId, name) {
        const element = cloneTemplateById(TaskDropoff.templateId);
        const nameElem = element.querySelector(`.${TaskDropoff.nameClass}`);
        nameElem.innerText = name;
        const parent = getElementById(parentId);
        parent.appendChild(element);
        return element;
    }
    setupEvents() {
        this.dropZone.onTaskDrop(taskId => this.handleTaskDrop(taskId));
        this.dropZone.onTaskEnter(() => this.highlightArea());
        this.dropZone.onTaskLeave(() => this.dimArea());
    }
    highlightArea() {
        this.element.classList.add(TaskDropoff.highlightClass);
    }
    dimArea() {
        this.element.classList.remove(TaskDropoff.highlightClass);
    }
    handleTaskDrop(taskId) {
        this.dimArea();
        this.handleDroppedTask(taskId);
    }
    handleDroppedTask(taskId) {
        // Not implemented
    }
}
TaskDropoff.templateId = "util_box_template";
TaskDropoff.highlightClass = "highlight";
TaskDropoff.nameClass = "name";
//# sourceMappingURL=task_dropoff.js.map