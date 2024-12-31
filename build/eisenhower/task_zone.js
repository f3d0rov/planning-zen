import { cloneTemplateById, getElementById } from "../common/common";
import { BasicLinkedList } from "../common/linked_list";
export class TaskZone {
    constructor(taskBoxElementId) {
        this.displayedTasks = new Map;
        this.displayedElements = new Map;
        this.elementOrder = new BasicLinkedList;
        this.taskBoxElement = getElementById(taskBoxElementId);
    }
    addTask(id, task) {
        this.displayedTasks.set(id, task);
        this.generateElementForTask(id, task);
        this.displayElement(id);
    }
    generateElementForTask(id, task) {
        const newElement = cloneTemplateById(TaskZone.taskTemplateId);
        newElement.id = this.getElementIdForTask(id);
        newElement.innerHTML = task.getName();
        this.displayedElements.set(id, newElement);
    }
    getElementIdForTask(id) {
        return `task_${id}`;
    }
    displayElement(id) {
        const wasInserted = this.tryInsertInMiddle(id);
        if (wasInserted === false) {
            this.insertAtEnd(id);
        }
    }
    tryInsertInMiddle(id) {
        const orderIndex = this.getTask(id).getOrderIndex();
        const iterator = this.elementOrder.iterate();
        while (iterator.hasNext()) {
            const contestedTaskId = iterator.getNext();
            if (this.shouldInsertBefore(orderIndex, contestedTaskId)) {
                this.insertBefore(id, contestedTaskId);
                return true;
            }
        }
        return false;
    }
    shouldInsertBefore(index, contestedTaskId) {
        const contestedOrderIndex = this.getTask(contestedTaskId).getOrderIndex();
        return index < contestedOrderIndex;
    }
    insertBefore(insertedTask, before) {
        const insertedElement = this.getElementForTask(insertedTask);
        const beforeElement = this.getElementForTask(before);
        this.taskBoxElement.insertBefore(insertedElement, beforeElement);
        this.elementOrder.insertBefore(insertedTask, before);
    }
    insertAtEnd(taskId) {
        this.elementOrder.pushBack(taskId);
        const insertedElement = this.getElementForTask(taskId);
        this.taskBoxElement.appendChild(insertedElement);
    }
    removeTask(id) {
        var _a;
        (_a = this.tryGetElementForTask(id)) === null || _a === void 0 ? void 0 : _a.remove();
        this.displayedTasks.delete(id);
        this.displayedElements.delete(id);
        this.elementOrder.pop(id);
    }
    getTask(id) {
        return this.tryGetTask(id);
    }
    tryGetTask(id) {
        return this.displayedTasks.get(id);
    }
    getElementForTask(id) {
        return this.tryGetElementForTask(id);
    }
    tryGetElementForTask(id) {
        return this.displayedElements.get(id);
    }
}
TaskZone.taskTemplateId = "task_template";
//# sourceMappingURL=task_zone.js.map