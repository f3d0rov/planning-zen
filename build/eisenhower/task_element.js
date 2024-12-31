import { cloneTemplateById } from "../common/common";
export class TaskElement {
    constructor(id, task) {
        this.id = id;
        this.task = task;
        this.element = this.generateElement();
        this.setupEvents();
    }
    generateElement() {
        const newElement = cloneTemplateById(TaskElement.taskTemplateId);
        newElement.id = this.getElementIdForTask(this.id);
        newElement.innerHTML = this.task.getName();
        return newElement;
    }
    getElementIdForTask(id) {
        return `task_${id}`;
    }
    getElement() {
        return this.element;
    }
    getTask() {
        return this.task;
    }
    remove() {
        this.element.remove();
    }
    setupEvents() {
        this.element.addEventListener('dragstart', ev => this.dragstart(ev));
    }
    dragstart(event) {
        if (event.dataTransfer) {
            event.dataTransfer.setData(TaskElement.taskDragType, `${this.id}`);
            event.dataTransfer.dropEffect = "move";
        }
    }
}
TaskElement.taskTemplateId = "task_template";
TaskElement.taskDragType = "taskid";
//# sourceMappingURL=task_element.js.map