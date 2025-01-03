import { BasicPoint } from "../common/basic_point";
import { TaskElement } from "./task_element";
export class TaskDropZone {
    constructor(element) {
        this.reportTaskDrop = () => { };
        this.reportTaskEnter = () => { };
        this.reportTaskLeave = () => { };
        this.element = element;
        this.setupEvents();
    }
    onTaskDrop(callbackfn) {
        this.reportTaskDrop = callbackfn;
    }
    onTaskEnter(callbackfn) {
        this.reportTaskEnter = callbackfn;
    }
    onTaskLeave(callbackfn) {
        this.reportTaskLeave = callbackfn;
    }
    getElement() {
        return this.element;
    }
    setupEvents() {
        this.element.addEventListener('dragover', ev => this.handleDragover(ev));
        this.element.addEventListener('dragend', ev => this.handleDragend(ev));
        this.element.addEventListener('dragleave', ev => this.handleDragend(ev));
        this.element.addEventListener('drop', ev => this.handleDrop(ev));
    }
    handleDragover(event) {
        event.preventDefault();
        const taskId = this.getTaskId(event);
        if (taskId !== undefined) {
            this.reportTaskEnter();
        }
    }
    handleDrop(event) {
        event.preventDefault();
        const taskId = this.getTaskId(event);
        if (taskId === undefined)
            return;
        const dropPos = new BasicPoint(event.pageX, event.pageY);
        this.reportTaskDrop(taskId, dropPos);
    }
    handleDragend(event) {
        event.preventDefault();
        const taskId = this.getTaskId(event);
        if (taskId !== undefined) {
            this.reportTaskLeave();
        }
    }
    getTaskId(event) {
        var _a;
        const message = (_a = event.dataTransfer) === null || _a === void 0 ? void 0 : _a.getData(TaskElement.taskDragType);
        if (message === undefined)
            return undefined;
        const droppedTaskId = parseInt(message);
        if (isNaN(droppedTaskId))
            return undefined;
        return droppedTaskId;
    }
}
//# sourceMappingURL=task_drop_zone.js.map