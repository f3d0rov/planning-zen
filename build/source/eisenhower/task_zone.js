import { cloneTemplateById, getElementById } from "../common/common";
import { BasicLinkedList } from "../common/linked_list";
import { getMousePosition } from "../common/mouse_pos";
import { TaskElement } from "./task_element";
class ThresholdXY {
    constructor(x, y) {
        this.x = 0;
        this.y = 0;
        this.x = x;
        this.y = y;
        console.log(`Threshold: ${x}, ${y}`);
    }
    isAfter(thresh) {
        return this.x > thresh.x || this.y > thresh.y;
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
        this.elementThreshPositions = new BasicLinkedList;
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
        this.contents.addEventListener('drag', ev => this.handleDrag(ev));
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
        this.showTaskShadowElement();
    }
    handleDrop(event) {
        var _a;
        this.stopDragHighlight();
        const msg = (_a = event.dataTransfer) === null || _a === void 0 ? void 0 : _a.getData(TaskElement.taskDragType);
        const taskId = this.getTaskId(msg);
        if (taskId === undefined)
            return;
        event.preventDefault();
        console.log(`Received task #${taskId}`);
        this.catChangeCallback(taskId, this.category);
    }
    stopDragHighlight() {
        this.root.classList.remove(TaskZone.dropHighlightClass);
        this.hideTaskShadowElement();
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
    handleDrag(event) {
        console.log("Thresh for drag:");
        const mousePos = getMousePosition();
        const dragPos = new ThresholdXY(mousePos.x, mousePos.y);
        this.showDropContentShadowAt(dragPos);
    }
    showDropContentShadowAt(position) {
        this.rebuildElementPosData();
        const beforeTask = this.findTaskAfterThreshold(position);
        this.insertShadowElementBeforeTask(beforeTask);
    }
    rebuildElementPosData() {
        this.elementThreshPositions.clear();
        this.buildElementPosData();
    }
    buildElementPosData() {
        const iterator = this.elementOrder.iterate();
        while (iterator.hasNext()) {
            const taskId = iterator.getNext();
            this.insertTaskThresholdIntoPosData(taskId);
        }
    }
    insertTaskThresholdIntoPosData(taskId) {
        console.log("Thresh for task:");
        const taskThreshold = this.calculateThresholdForTask(taskId);
        const taskThreshInfo = new TaskThresholdInfo(taskId, taskThreshold);
        this.elementThreshPositions.pushBack(taskThreshInfo);
    }
    calculateThresholdForTask(taskId) {
        const taskElement = this.getElementForTask(taskId);
        const bbox = taskElement.getBoundingClientRect();
        const threshold = new ThresholdXY(bbox.x + bbox.width / 2 + window.screenX, bbox.bottom + window.screenY);
        return threshold;
    }
    findTaskAfterThreshold(thresh) {
        const iterator = this.elementThreshPositions.iterate();
        while (iterator.hasNext()) {
            const threshInfo = iterator.getNext();
            if (threshInfo.getThreshold().isAfter(thresh)) {
                return threshInfo.getTaskId();
            }
        }
        return undefined;
    }
    insertShadowElementBeforeTask(taskId) {
        if (taskId !== undefined) {
            this.insertShadowElementBeforeActualTask(taskId);
        }
        else {
            this.insertShadowElementAfterAllTasks();
        }
    }
    insertShadowElementBeforeActualTask(taskId) {
        const shadowElement = this.getTaskShadowElement();
        const taskElem = this.getElementForTask(taskId);
        this.contents.insertBefore(shadowElement, taskElem);
    }
    insertShadowElementAfterAllTasks() {
        const shadowElement = this.getTaskShadowElement();
        this.contents.appendChild(shadowElement);
    }
    showTaskShadowElement() {
        const taskShadowElement = this.getTaskShadowElement();
        taskShadowElement.classList.remove(TaskZone.hiddenTaskShadowClass);
    }
    hideTaskShadowElement() {
        const taskShadowElement = this.getTaskShadowElement();
        taskShadowElement.classList.add(TaskZone.hiddenTaskShadowClass);
    }
    getTaskShadowElement() {
        if (this.taskShadowElement === undefined) {
            this.taskShadowElement = cloneTemplateById(TaskZone.taskShadowTemplateId);
        }
        return this.taskShadowElement;
    }
}
TaskZone.contentsClass = "decision_box_square_contents";
TaskZone.dropHighlightClass = "highlight";
TaskZone.taskShadowTemplateId = "task_shadow_template";
TaskZone.hiddenTaskShadowClass = "template";
//# sourceMappingURL=task_zone.js.map