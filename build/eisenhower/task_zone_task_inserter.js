import { TaskElement } from "./task_element";
export class TaskZoneTaskInserter {
    constructor(baseData) {
        this.data = baseData;
    }
    addTask(id, task) {
        const taskElement = this.createElementForTask(id, task);
        this.displayTaskElement(taskElement);
    }
    createElementForTask(id, task) {
        return new TaskElement(id, task);
    }
    displayTaskElement(taskElement) {
        const wasInserted = this.tryInsertInMiddle(taskElement);
        if (wasInserted === false) {
            this.insertAtEnd(taskElement);
        }
    }
    tryInsertInMiddle(taskElement) {
        const orderIndex = taskElement.getTask().getOrderIndex();
        const iterator = this.data.getTasks().iterate();
        while (iterator.hasNext()) {
            const contestedTaskElement = iterator.getNext();
            if (this.shouldInsertBefore(orderIndex, contestedTaskElement)) {
                this.insertBefore(taskElement, contestedTaskElement);
                return true;
            }
        }
        return false;
    }
    shouldInsertBefore(index, contestedTaskElement) {
        const contestedTask = contestedTaskElement.getTask();
        const contestedIndex = contestedTask.getOrderIndex();
        return index < contestedIndex;
    }
    insertBefore(insert, before) {
        const insertedHTMLElement = insert.getElement();
        const beforeHTMLElement = before.getElement();
        this.data.getContents().insertBefore(insertedHTMLElement, beforeHTMLElement);
        this.data.getTasks().insertBefore(insert, before);
    }
    insertAtEnd(insert) {
        this.data.getTasks().pushBack(insert);
        const insertedElement = insert.getElement();
        this.data.getContents().appendChild(insertedElement);
    }
}
//# sourceMappingURL=task_zone_task_inserter.js.map