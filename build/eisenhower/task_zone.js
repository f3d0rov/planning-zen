import { getElementById } from "../common/common";
import { BasicLinkedList } from "../common/linked_list";
import { TaskElement } from "./task_element";
export class BasicPoint {
    constructor(x, y) {
        this.x = 0;
        this.y = 0;
        this.x = x;
        this.y = y;
    }
}
export class ThresholdBox {
    constructor(rect) {
        this.rect = rect;
    }
    static fromElement(element) {
        const box = element.getBoundingClientRect();
        return new ThresholdBox(box);
    }
    isAfter(point) {
        const pointIsBelow = point.y > this.rect.bottom;
        if (pointIsBelow)
            return false;
        const pointIsAbove = point.y < this.rect.top;
        if (pointIsAbove)
            return true;
        return this.isPointAboveDiagonal(point);
    }
    isPointAboveDiagonal(point) {
        const diagonalYAtThreshX = this.getDiagonalYAtX(point.x);
        const pointAboveDiagonal = point.y < diagonalYAtThreshX;
        return pointAboveDiagonal;
    }
    getDiagonalYAtX(x) {
        return this.rect.bottom - this.rect.height / this.rect.width * (x - this.rect.left);
    }
}
class TaskThresholdInfo {
    constructor(taskId, threshold) {
        this.taskId = taskId;
        this.threshold = threshold;
    }
    getTaskId() {
        return this.taskId;
    }
    getThreshold() {
        return this.threshold;
    }
}
export class TaskZone {
    constructor(taskBoxElementId, category) {
        this.tasks = new Map;
        this.elementOrder = new BasicLinkedList;
        this.catChangeCallback = () => { };
        this.category = category;
        this.root = getElementById(taskBoxElementId);
        this.contents = this.root.querySelector(`.${TaskZone.contentsClass}`);
        this.setupEvents();
    }
    setupEvents() {
        this.contents.addEventListener('dragover', ev => this.handleDragover(ev));
        this.contents.addEventListener('dragend', ev => this.stopDragHighlight());
        this.contents.addEventListener('dragleave', ev => this.stopDragHighlight());
        this.contents.addEventListener('drop', ev => this.handleDrop(ev));
        this.contents.addEventListener('dblclick', ev => this.spawnNewTask(ev));
    }
    addTask(id, task) {
        this.generateElementForTask(id, task);
        this.displayElement(id);
    }
    generateElementForTask(id, task) {
        const newElement = new TaskElement(id, task);
        this.tasks.set(id, newElement);
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
        this.contents.insertBefore(insertedElement, beforeElement);
        this.elementOrder.insertBefore(insertedTask, before);
    }
    insertAtEnd(taskId) {
        this.elementOrder.pushBack(taskId);
        const insertedElement = this.getElementForTask(taskId);
        this.contents.appendChild(insertedElement);
    }
    removeTask(id) {
        var _a;
        (_a = this.tryGetElementForTask(id)) === null || _a === void 0 ? void 0 : _a.remove();
        this.tasks.delete(id);
        this.elementOrder.pop(id);
    }
    getTask(id) {
        return this.tryGetTask(id);
    }
    tryGetTask(id) {
        var _a;
        return (_a = this.tryGetTaskData(id)) === null || _a === void 0 ? void 0 : _a.getTask();
    }
    getElementForTask(id) {
        return this.tryGetElementForTask(id);
    }
    tryGetElementForTask(id) {
        var _a;
        return (_a = this.tryGetTaskData(id)) === null || _a === void 0 ? void 0 : _a.getElement();
    }
    tryGetTaskData(id) {
        return this.tasks.get(id);
    }
    getTaskData(id) {
        return this.tryGetTaskData(id);
    }
    handleDragover(event) {
        event.preventDefault();
        this.root.classList.add(TaskZone.dropHighlightClass);
    }
    handleDrop(event) {
        var _a;
        this.stopDragHighlight();
        const msg = (_a = event.dataTransfer) === null || _a === void 0 ? void 0 : _a.getData(TaskElement.taskDragType);
        const taskId = this.getTaskId(msg);
        if (taskId === undefined)
            return;
        const dropPos = new BasicPoint(event.pageX, event.pageY);
        const droppedTaskIndex = this.getIndexForDroppedTask(dropPos);
        event.preventDefault();
        console.log(`Received task #${taskId}`);
        this.catChangeCallback(taskId, this.category, droppedTaskIndex);
    }
    stopDragHighlight() {
        this.root.classList.remove(TaskZone.dropHighlightClass);
    }
    getTaskId(message) {
        if (message === undefined)
            return undefined;
        const droppedTaskId = parseInt(message);
        if (isNaN(droppedTaskId))
            return undefined;
        return droppedTaskId;
    }
    setCategoryChangeCallback(callbackfn) {
        this.catChangeCallback = callbackfn;
    }
    setInitializeTaskCallback(callbackfn) {
        this.initNewTask = callbackfn;
    }
    setFinalizeTaskCallback(callbackfn) {
        this.finalizeNewTask = callbackfn;
    }
    spawnNewTask(event) {
        const task = this.initNewTask();
        task.setName("New task!");
        task.setOrderIndex(this.getNextLastIndex());
        task.setSection(this.category);
        this.finalizeNewTask(task);
    }
    getNextLastIndex() {
        const lastTaskId = this.elementOrder.back();
        if (lastTaskId === undefined)
            return 1;
        else
            return this.getTask(lastTaskId).getOrderIndex() + 1;
    }
    getIndexForDroppedTask(position) {
        const iterator = this.elementOrder.iterate();
        let lastIndex = 0;
        while (iterator.hasNext()) {
            const taskId = iterator.getNext();
            const task = this.getTask(taskId);
            const taskElement = this.getElementForTask(taskId);
            const taskThreshold = ThresholdBox.fromElement(taskElement);
            lastIndex = task.getOrderIndex();
            if (taskThreshold.isAfter(position)) {
                return lastIndex;
            }
        }
        return lastIndex + 1;
    }
}
TaskZone.contentsClass = "decision_box_square_contents";
TaskZone.dropHighlightClass = "highlight";
//# sourceMappingURL=task_zone.js.map