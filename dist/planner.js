/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../build/common/common.js":
/*!*********************************!*\
  !*** ../build/common/common.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cloneTemplateById: () => (/* binding */ cloneTemplateById),
/* harmony export */   getElementById: () => (/* binding */ getElementById)
/* harmony export */ });
function getElementById(id) {
    const element = document.getElementById(id);
    if (element === null || element === undefined) {
        throw new MediaError;
    }
    return element;
}
class TemplateCloner {
    constructor() {
        this.cachedTemplates = new Map;
    }
    cloneTemplateById(templateId) {
        const template = this.getTemplate(templateId);
        return this.cloneTemplate(template);
    }
    getTemplate(templateId) {
        if (this.cachedTemplates.has(templateId)) {
            return this.getTemplateFromCache(templateId);
        }
        else {
            return this.getAndCacheTemplateFromDocument(templateId);
        }
    }
    getTemplateFromCache(templateId) {
        return this.cachedTemplates.get(templateId);
    }
    getAndCacheTemplateFromDocument(templateId) {
        const template = getElementById(templateId);
        this.cachedTemplates.set(templateId, template);
        return template;
    }
    cloneTemplate(template) {
        const clone = template.cloneNode(true);
        clone.id = "";
        clone.classList.remove(TemplateCloner.templateClass);
        return clone;
    }
}
TemplateCloner.templateClass = "template";
var templateCloner = new TemplateCloner;
function cloneTemplateById(id) {
    return templateCloner.cloneTemplateById(id);
}
//# sourceMappingURL=common.js.map

/***/ }),

/***/ "../build/common/linked_list.js":
/*!**************************************!*\
  !*** ../build/common/linked_list.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BasicLinkedList: () => (/* binding */ BasicLinkedList)
/* harmony export */ });
class LinkedListItem {
    constructor(value) {
        this.value = value;
    }
    getNext() {
        return this.next;
    }
    setNext(next) {
        this.next = next;
    }
    insertAfterSelf(next) {
        next.setNext(this.next);
        this.next = next;
    }
    getValue() {
        return this.value;
    }
    contains(value) {
        return this.value == value;
    }
}
class BasicLinkedList {
    constructor() {
        this.head = undefined;
    }
    pushBack(value) {
        var _a;
        const newItem = new LinkedListItem(value);
        if (this.head === undefined) {
            this.head = newItem;
        }
        else {
            (_a = this.getBackItem()) === null || _a === void 0 ? void 0 : _a.setNext(newItem);
        }
    }
    pushFront(value) {
        const newItem = new LinkedListItem(value);
        this.insertAsFirst(newItem);
    }
    pop(value) {
        var _a;
        if ((_a = this.head) === null || _a === void 0 ? void 0 : _a.contains(value)) {
            this.popFront();
        }
        else {
            this.popFromNotFirst(value);
        }
    }
    popFront() {
        var _a;
        this.head = (_a = this.head) === null || _a === void 0 ? void 0 : _a.getNext();
    }
    popFromNotFirst(value) {
        const prev = this.findItemWithNextValue(value);
        const removed = prev === null || prev === void 0 ? void 0 : prev.getNext();
        prev === null || prev === void 0 ? void 0 : prev.setNext(removed === null || removed === void 0 ? void 0 : removed.getNext());
    }
    clear() {
        this.head = undefined;
    }
    front() {
        var _a;
        return (_a = this.head) === null || _a === void 0 ? void 0 : _a.getValue();
    }
    back() {
        var _a;
        return (_a = this.getBackItem()) === null || _a === void 0 ? void 0 : _a.getValue();
    }
    getBackItem() {
        let last = undefined;
        this.forEachItem(item => { last = item; return true; });
        return last;
    }
    contains(value) {
        return this.findItemWithValue(value) !== undefined;
    }
    insertAfter(value, after) {
        const newItem = new LinkedListItem(value);
        const item = this.findItemWithValue(after);
        item === null || item === void 0 ? void 0 : item.insertAfterSelf(newItem);
    }
    insertBefore(value, before) {
        const newItem = new LinkedListItem(value);
        if (this.head === undefined || this.head.contains(before)) {
            this.insertAsFirst(newItem);
        }
        else {
            this.insertBeforeNotFirst(newItem, before);
        }
    }
    insertAsFirst(newItem) {
        newItem.setNext(this.head);
        this.head = newItem;
    }
    insertBeforeNotFirst(newItem, before) {
        let prev = this.findItemWithNextValue(before);
        prev === null || prev === void 0 ? void 0 : prev.insertAfterSelf(newItem);
    }
    findItemWithValue(value) {
        return this.findItem(item => item.contains(value));
    }
    findItemWithNextValue(value) {
        return this.findItem(item => { var _a; return (_a = item.getNext()) === null || _a === void 0 ? void 0 : _a.contains(value); });
    }
    findItem(condition) {
        let foundItem = undefined;
        this.forEachItem((item) => {
            if (condition(item)) {
                foundItem = item;
                return false;
            }
            return true;
        });
        return foundItem;
    }
    forEach(callbackfn) {
        this.forEachItem(item => callbackfn(item.getValue()));
    }
    forEachItem(callbackfn) {
        if (this.head === undefined)
            return;
        this.doForEachItem(callbackfn);
    }
    doForEachItem(callbackfn) {
        let item = this.head;
        do {
            const cont = callbackfn(item);
            if (cont === false)
                break;
            item = item.getNext();
        } while (item);
    }
    iterate() {
        return new BasicLinkedListIterator(this.head);
    }
}
class BasicLinkedListIterator {
    constructor(head) {
        this.current = head;
    }
    hasNext() {
        return this.current !== undefined;
    }
    getNext() {
        const value = this.current.getValue();
        this.current = this.current.getNext();
        return value;
    }
}
//# sourceMappingURL=linked_list.js.map

/***/ }),

/***/ "../build/common/text_width.js":
/*!*************************************!*\
  !*** ../build/common/text_width.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getTextWidth: () => (/* binding */ getTextWidth)
/* harmony export */ });
// with help from https://stackoverflow.com/a/21015393/8665933
var testingCanvas = document.createElement('canvas');
function getTextWidth(text, styledElement) {
    let ctx = testingCanvas.getContext('2d');
    ctx.font = getFont(styledElement);
    return ctx.measureText(text).width;
}
function getFont(elem) {
    let css = window.getComputedStyle(elem);
    let weight = css.getPropertyValue('font-weight');
    let size = css.getPropertyValue('font-size');
    let family = css.getPropertyValue('font-family');
    let font = `${weight} ${size} ${family}`;
    return font;
}
//# sourceMappingURL=text_width.js.map

/***/ }),

/***/ "../build/eisenhower/eisenhower_matrix_task_editor.js":
/*!************************************************************!*\
  !*** ../build/eisenhower/eisenhower_matrix_task_editor.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EisenhowerMatrixTaskEditor: () => (/* binding */ EisenhowerMatrixTaskEditor)
/* harmony export */ });
/* harmony import */ var _indexed_tasks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./indexed_tasks */ "../build/eisenhower/indexed_tasks.js");
/* harmony import */ var _task_zone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./task_zone */ "../build/eisenhower/task_zone.js");


class EisenhowerMatrixTaskEditor {
    constructor(taskProvider) {
        this.managedTasks = new _indexed_tasks__WEBPACK_IMPORTED_MODULE_0__.IndexedTasks;
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
        this.zones.set('do', new _task_zone__WEBPACK_IMPORTED_MODULE_1__.TaskZone("task_zone_do", 'do'));
        this.zones.set('schedule', new _task_zone__WEBPACK_IMPORTED_MODULE_1__.TaskZone("task_zone_schedule", 'schedule'));
        this.zones.set('delegate', new _task_zone__WEBPACK_IMPORTED_MODULE_1__.TaskZone("task_zone_delegate", 'delegate'));
        this.zones.set('delete', new _task_zone__WEBPACK_IMPORTED_MODULE_1__.TaskZone("task_zone_delete", 'delete'));
        this.zones.forEach((zone) => {
            this.addCategoryChangeProvider(zone);
            this.addNewTaskProvider(zone);
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

/***/ }),

/***/ "../build/eisenhower/indexed_tasks.js":
/*!********************************************!*\
  !*** ../build/eisenhower/indexed_tasks.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IndexedTasks: () => (/* binding */ IndexedTasks)
/* harmony export */ });
class IndexedTasks {
    constructor() {
        this.tasks = new Map;
        this.lastTaskIndex = 0;
    }
    addTask(task) {
        const newTaskIndex = ++this.lastTaskIndex;
        this.tasks.set(newTaskIndex, task);
        return newTaskIndex;
    }
    getTask(index) {
        return this.tryGetTask(index);
    }
    tryGetTask(index) {
        return this.tasks.get(index);
    }
    removeTask(index) {
        this.tasks.delete(index);
    }
    forEach(callbackfn) {
        this.tasks.forEach(callbackfn);
    }
}
//# sourceMappingURL=indexed_tasks.js.map

/***/ }),

/***/ "../build/eisenhower/task_element.js":
/*!*******************************************!*\
  !*** ../build/eisenhower/task_element.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TaskElement: () => (/* binding */ TaskElement)
/* harmony export */ });
/* harmony import */ var _common_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/common */ "../build/common/common.js");
/* harmony import */ var _common_text_width__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/text_width */ "../build/common/text_width.js");


class TaskElement {
    constructor(id, task) {
        this.id = id;
        this.task = task;
        this.element = this.generateElement();
        const stateInfo = this.generateTaskElementStateInfo();
        this.switchToState(new DisplayedTaskElement(stateInfo));
    }
    generateElement() {
        const newElement = (0,_common_common__WEBPACK_IMPORTED_MODULE_0__.cloneTemplateById)(TaskElement.taskTemplateId);
        newElement.id = this.getElementIdForTask(this.id);
        newElement.addEventListener('dblclick', ev => this.handleDblclick(ev));
        return newElement;
    }
    getElementIdForTask(id) {
        return `task_${id}`;
    }
    handleDblclick(event) {
        event.preventDefault();
        event.stopPropagation();
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
    generateTaskElementStateInfo() {
        return new TaskElemStateInfo(this.id, this.task, this.element);
    }
    switchToState(state) {
        this.state = state;
        this.state.setSwitchStateCallback(state => this.switchToState(state));
    }
}
TaskElement.taskTemplateId = "task_template";
TaskElement.taskDragType = "taskid";
class TaskElemStateInfo {
    constructor(id, task, root) {
        this.id = id;
        this.task = task;
        this.root = root;
    }
}
class TaskElementState {
    constructor(taskElemInfo) {
        this.switchToState = () => { };
        this.taskElemInfo = taskElemInfo;
        this.getRoot().innerHTML = "";
    }
    getId() {
        return this.taskElemInfo.id;
    }
    getRoot() {
        return this.taskElemInfo.root;
    }
    getTask() {
        return this.taskElemInfo.task;
    }
    getElemInfo() {
        return this.taskElemInfo;
    }
    setSwitchStateCallback(callbackfn) {
        this.switchToState = callbackfn;
    }
}
class DisplayedTaskElement extends TaskElementState {
    constructor(taskElemInfo) {
        super(taskElemInfo);
        this.element = this.constructElement();
        this.setupEvents();
    }
    constructElement() {
        const element = (0,_common_common__WEBPACK_IMPORTED_MODULE_0__.cloneTemplateById)(DisplayedTaskElement.displayTemplateId);
        element.innerText = this.getTask().getName();
        this.getRoot().appendChild(element);
        return element;
    }
    setupEvents() {
        this.element.addEventListener('dragstart', ev => this.handleDragstart(ev));
        this.element.addEventListener('dblclick', ev => this.handleDblclick(ev));
    }
    handleDragstart(event) {
        if (event.dataTransfer) {
            event.dataTransfer.setData(TaskElement.taskDragType, `${this.getId()}`);
            event.dataTransfer.dropEffect = "move";
        }
    }
    handleDblclick(event) {
        event.preventDefault();
        event.stopPropagation();
        this.switchToState(new EditedTaskElement(this.getElemInfo()));
    }
}
DisplayedTaskElement.displayTemplateId = "task_display_template";
class EditedTaskElement extends TaskElementState {
    constructor(taskElemInfo) {
        super(taskElemInfo);
        this.input = (0,_common_common__WEBPACK_IMPORTED_MODULE_0__.cloneTemplateById)(EditedTaskElement.templateClassId);
        this.input.value = this.getTask().getName();
        this.getRoot().appendChild(this.input);
        this.updateInputSize();
        this.setupEvents();
        this.input.focus();
    }
    setupEvents() {
        this.input.addEventListener('keypress', ev => this.stopIfEnter(ev));
        this.input.addEventListener('keyup', ev => this.cancelIfEscape(ev));
        this.input.addEventListener('input', ev => this.updateInputSize());
        this.input.addEventListener('blur', ev => this.stopEditing());
    }
    stopIfEnter(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            this.stopEditing();
        }
    }
    cancelIfEscape(event) {
        if (event.code === "Escape") {
            event.preventDefault();
            this.cancelEditing();
        }
    }
    updateInputSize() {
        const currentText = this.input.value;
        const targetWidth = (0,_common_text_width__WEBPACK_IMPORTED_MODULE_1__.getTextWidth)(currentText, this.input);
        this.input.style.height = `1px`; // Reset height so that it could be reduced
        this.input.style.width = `${targetWidth}px`;
        this.input.style.height = `${this.input.scrollHeight}px`;
    }
    stopEditing() {
        this.getTask().setName(this.input.value);
        this.switchToState(new DisplayedTaskElement(this.getElemInfo()));
    }
    cancelEditing() {
        this.switchToState(new DisplayedTaskElement(this.getElemInfo()));
    }
}
EditedTaskElement.templateClassId = "task_edit_template";
//# sourceMappingURL=task_element.js.map

/***/ }),

/***/ "../build/eisenhower/task_zone.js":
/*!****************************************!*\
  !*** ../build/eisenhower/task_zone.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BasicPoint: () => (/* binding */ BasicPoint),
/* harmony export */   TaskZone: () => (/* binding */ TaskZone),
/* harmony export */   ThresholdBox: () => (/* binding */ ThresholdBox)
/* harmony export */ });
/* harmony import */ var _common_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/common */ "../build/common/common.js");
/* harmony import */ var _common_linked_list__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/linked_list */ "../build/common/linked_list.js");
/* harmony import */ var _task_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./task_element */ "../build/eisenhower/task_element.js");



class BasicPoint {
    constructor(x, y) {
        this.x = 0;
        this.y = 0;
        this.x = x;
        this.y = y;
    }
}
class ThresholdBox {
    constructor(rect) {
        this.rect = rect;
    }
    static fromElement(element) {
        const box = element.getBoundingClientRect();
        return new ThresholdBox(box);
    }
    isAfter(thresh) {
        const threshFarAwayBack = thresh.x < this.rect.left || thresh.y < this.rect.top;
        const diagonalYAtThreshX = this.getDiagonalYAtX(thresh.x);
        const threshAboveDiagonal = thresh.y < diagonalYAtThreshX;
        return threshFarAwayBack || threshAboveDiagonal;
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
class TaskZone {
    constructor(taskBoxElementId, category) {
        this.tasks = new Map;
        this.elementOrder = new _common_linked_list__WEBPACK_IMPORTED_MODULE_1__.BasicLinkedList;
        this.catChangeCallback = () => { };
        this.category = category;
        this.root = (0,_common_common__WEBPACK_IMPORTED_MODULE_0__.getElementById)(taskBoxElementId);
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
        const newElement = new _task_element__WEBPACK_IMPORTED_MODULE_2__.TaskElement(id, task);
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
        const msg = (_a = event.dataTransfer) === null || _a === void 0 ? void 0 : _a.getData(_task_element__WEBPACK_IMPORTED_MODULE_2__.TaskElement.taskDragType);
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

/***/ }),

/***/ "../build/misc/github_page_opener.js":
/*!*******************************************!*\
  !*** ../build/misc/github_page_opener.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GithubPageOpener: () => (/* binding */ GithubPageOpener)
/* harmony export */ });
/* harmony import */ var _common_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/common */ "../build/common/common.js");

class GithubPageOpener {
    constructor() {
        this.button = this.getButton();
    }
    getButton() {
        const element = (0,_common_common__WEBPACK_IMPORTED_MODULE_0__.getElementById)(GithubPageOpener.buttonId);
        element.addEventListener('click', ev => this.onClick());
        return element;
    }
    onClick() {
        var _a;
        (_a = window.open(GithubPageOpener.sourceUrl, '_blank')) === null || _a === void 0 ? void 0 : _a.focus();
    }
}
GithubPageOpener.buttonId = "get_code_button";
GithubPageOpener.sourceUrl = "https://github.com/f3d0rov/planner";
//# sourceMappingURL=github_page_opener.js.map

/***/ }),

/***/ "../build/misc/style_switcher.js":
/*!***************************************!*\
  !*** ../build/misc/style_switcher.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StyleSwitcher: () => (/* binding */ StyleSwitcher)
/* harmony export */ });
/* harmony import */ var _common_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/common */ "../build/common/common.js");

class StyleModeState {
    constructor(buttonSymbolId, styleClassName) {
        this.buttonSymbol = (0,_common_common__WEBPACK_IMPORTED_MODULE_0__.getElementById)(buttonSymbolId);
        this.styleClassName = styleClassName;
    }
    hideButtonSymbol() {
        this.buttonSymbol.classList.add(StyleModeState.hiddenSymbolClass);
    }
    showButtonSymbol() {
        this.buttonSymbol.classList.remove(StyleModeState.hiddenSymbolClass);
    }
    applyClassToBody() {
        document.body.classList.add(this.styleClassName);
        console.log(`Style class set to ${this.styleClassName}`);
    }
    removeClassFromBody() {
        document.body.classList.remove(this.styleClassName);
    }
}
StyleModeState.hiddenSymbolClass = "nodisplay";
class StyleSwitcher {
    constructor() {
        this.styles = new Array;
        this.currentStyleIndex = 0;
        this.lastSwitchToken = 0;
        this.switchStyleButton = this.setupStyleButton();
        this.setDefaultStyles();
        this.setStyle(0);
    }
    setupStyleButton() {
        const button = (0,_common_common__WEBPACK_IMPORTED_MODULE_0__.getElementById)(StyleSwitcher.switchStyleButtonId);
        button.addEventListener('click', ev => this.setNextStyle());
        return button;
    }
    setDefaultStyles() {
        this.styles.push(new StyleModeState('dark_mode_button', 'dark_mode'));
        this.styles.push(new StyleModeState('light_mode_button', 'light_mode'));
    }
    setNextStyle() {
        this.setBodySwitchingStyleClass();
        this.removeStyle(this.currentStyleIndex);
        this.currentStyleIndex = this.getNextStyleIndex();
        this.setStyle(this.currentStyleIndex);
    }
    getNextStyleIndex() {
        return (this.currentStyleIndex + 1) % this.styles.length;
    }
    removeStyle(index) {
        const style = this.styles.at(index);
        style.removeClassFromBody();
    }
    setStyle(index) {
        const style = this.styles.at(index);
        style.applyClassToBody();
        style.hideButtonSymbol();
        const nextStyle = this.styles.at(this.getNextStyleIndex());
        nextStyle.showButtonSymbol();
    }
    setBodySwitchingStyleClass() {
        document.body.classList.add(StyleSwitcher.bodySwitchingStyle);
        const token = Math.random();
        this.lastSwitchToken = token;
        setTimeout(() => this.resetBodySwitchingStyleClass(token), 1000 * StyleSwitcher.bodySwitchingStyleTimeSec);
    }
    resetBodySwitchingStyleClass(token) {
        if (this.lastSwitchToken === token) {
            document.body.classList.remove(StyleSwitcher.bodySwitchingStyle);
        }
    }
}
StyleSwitcher.switchStyleButtonId = "switch_style_button";
StyleSwitcher.bodySwitchingStyle = "switching_style";
StyleSwitcher.bodySwitchingStyleTimeSec = 1;
//# sourceMappingURL=style_switcher.js.map

/***/ }),

/***/ "../build/tasks/basic_task.js":
/*!************************************!*\
  !*** ../build/tasks/basic_task.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BasicTask: () => (/* binding */ BasicTask)
/* harmony export */ });
class BasicTask {
    constructor(name, section = "unset", index = 0) {
        this.name = "";
        this.section = "unset";
        this.index = 0;
        this.name = name;
        this.section = section;
        this.index = index;
    }
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
    getSection() {
        return this.section;
    }
    setSection(section) {
        this.section = section;
    }
    getOrderIndex() {
        return this.index;
    }
    setOrderIndex(index) {
        this.index = index;
    }
}
//# sourceMappingURL=basic_task.js.map

/***/ }),

/***/ "../build/tasks/basic_task_provider.js":
/*!*********************************************!*\
  !*** ../build/tasks/basic_task_provider.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BasicTaskProvider: () => (/* binding */ BasicTaskProvider)
/* harmony export */ });
/* harmony import */ var _basic_task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./basic_task */ "../build/tasks/basic_task.js");

class BasicTaskProvider {
    createNewTask() {
        return new _basic_task__WEBPACK_IMPORTED_MODULE_0__.BasicTask("", "unset");
    }
    restoreTasks() {
        return this.getInitialTasks();
    }
    getInitialTasks() {
        const tasks = new Array;
        tasks.push(new _basic_task__WEBPACK_IMPORTED_MODULE_0__.BasicTask("Move tasks by dragging them with your mouse", "do", 1));
        tasks.push(new _basic_task__WEBPACK_IMPORTED_MODULE_0__.BasicTask("Create new tasks by moving the \"+\" button onto the board", "do", 2));
        tasks.push(new _basic_task__WEBPACK_IMPORTED_MODULE_0__.BasicTask("Complete tasks by moving them to the \"Done\" box", "schedule", 1));
        tasks.push(new _basic_task__WEBPACK_IMPORTED_MODULE_0__.BasicTask("Remove tasks by moving them to the \"Remove\" box", "delegate", 1));
        tasks.push(new _basic_task__WEBPACK_IMPORTED_MODULE_0__.BasicTask("Double-click a task to edit it", "delegate", 2));
        tasks.push(new _basic_task__WEBPACK_IMPORTED_MODULE_0__.BasicTask("Visit the project's repository by clicking the button at the top of the page", "delete", 1));
        return tasks;
    }
}
//# sourceMappingURL=basic_task_provider.js.map

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!************************!*\
  !*** ../build/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tasks_basic_task_provider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tasks/basic_task_provider */ "../build/tasks/basic_task_provider.js");
/* harmony import */ var _eisenhower_eisenhower_matrix_task_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./eisenhower/eisenhower_matrix_task_editor */ "../build/eisenhower/eisenhower_matrix_task_editor.js");
/* harmony import */ var _misc_github_page_opener__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./misc/github_page_opener */ "../build/misc/github_page_opener.js");
/* harmony import */ var _misc_style_switcher__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./misc/style_switcher */ "../build/misc/style_switcher.js");




function main() {
    logWelcomeMessage();
    initMiscTools();
    initTasks();
}
function logWelcomeMessage() {
    console.log("%cPlanning Zen%c 1.0", "color:#8aee8a; font-size:32px;", "color: red;");
    console.log("Check out the source code, report issues and offer improvements at %chttps://github.com/f3d0rov/planner%c", "color:green;");
}
function initMiscTools() {
    const styleSwitcher = new _misc_style_switcher__WEBPACK_IMPORTED_MODULE_3__.StyleSwitcher;
    const githubPageOpener = new _misc_github_page_opener__WEBPACK_IMPORTED_MODULE_2__.GithubPageOpener();
}
function initTasks() {
    const taskProvider = new _tasks_basic_task_provider__WEBPACK_IMPORTED_MODULE_0__.BasicTaskProvider;
    const app = new _eisenhower_eisenhower_matrix_task_editor__WEBPACK_IMPORTED_MODULE_1__.EisenhowerMatrixTaskEditor(taskProvider);
}
window.addEventListener('load', main);
//# sourceMappingURL=main.js.map
})();

/******/ })()
;
//# sourceMappingURL=planner.js.map