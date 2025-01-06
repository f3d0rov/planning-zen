/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../build/common/basic_point.js":
/*!**************************************!*\
  !*** ../build/common/basic_point.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BasicPoint: () => (/* binding */ BasicPoint)
/* harmony export */ });
class BasicPoint {
    constructor(x, y) {
        this.x = 0;
        this.y = 0;
        this.x = x;
        this.y = y;
    }
}
//# sourceMappingURL=basic_point.js.map

/***/ }),

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

/***/ "../build/eisenhower/base_task_zone_data.js":
/*!**************************************************!*\
  !*** ../build/eisenhower/base_task_zone_data.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BaseTaskZoneData: () => (/* binding */ BaseTaskZoneData)
/* harmony export */ });
/* harmony import */ var _common_linked_list__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/linked_list */ "../build/common/linked_list.js");
/* harmony import */ var _task_zone_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./task_zone_element */ "../build/eisenhower/task_zone_element.js");


class BaseTaskZoneData {
    constructor(containerId, name, category) {
        this.orderedTasks = new _common_linked_list__WEBPACK_IMPORTED_MODULE_0__.BasicLinkedList;
        this.element = new _task_zone_element__WEBPACK_IMPORTED_MODULE_1__.TaskZoneElement(containerId, name);
        this.category = category;
    }
    getCategory() {
        return this.category;
    }
    getElement() {
        return this.element;
    }
    getContents() {
        return this.getElement().getContents();
    }
    getTasks() {
        return this.orderedTasks;
    }
    deleteTask(taskId) {
        if (this.deleteTaskCallback) {
            this.deleteTaskCallback(taskId);
        }
    }
    setDeleteTaskCallback(callbackfn) {
        this.deleteTaskCallback = callbackfn;
    }
}
//# sourceMappingURL=base_task_zone_data.js.map

/***/ }),

/***/ "../build/eisenhower/complete_task_dropoff.js":
/*!****************************************************!*\
  !*** ../build/eisenhower/complete_task_dropoff.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CompleteTaskDropoff: () => (/* binding */ CompleteTaskDropoff)
/* harmony export */ });
/* harmony import */ var _task_dropoff__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./task_dropoff */ "../build/eisenhower/task_dropoff.js");

class CompleteTaskDropoff extends _task_dropoff__WEBPACK_IMPORTED_MODULE_0__.TaskDropoff {
    constructor(parentId) {
        super(parentId, "Complete task");
        this.reportTaskCompletion = () => { };
    }
    handleDroppedTask(taskId) {
        console.log(`Task #${taskId} dropped to mark as complete`);
        this.reportTaskCompletion(taskId);
    }
    setTaskCompletionCallback(callbackfn) {
        this.reportTaskCompletion = callbackfn;
    }
}
//# sourceMappingURL=complete_task_dropoff.js.map

/***/ }),

/***/ "../build/eisenhower/delete_task_dropoff.js":
/*!**************************************************!*\
  !*** ../build/eisenhower/delete_task_dropoff.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DeleteTaskDropoff: () => (/* binding */ DeleteTaskDropoff)
/* harmony export */ });
/* harmony import */ var _task_dropoff__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./task_dropoff */ "../build/eisenhower/task_dropoff.js");

class DeleteTaskDropoff extends _task_dropoff__WEBPACK_IMPORTED_MODULE_0__.TaskDropoff {
    constructor(parentId) {
        super(parentId, "Delete task");
        this.reportTaskDeletion = () => { };
    }
    handleDroppedTask(taskId) {
        console.log(`Task #${taskId} dropped to delete`);
        this.reportTaskDeletion(taskId);
    }
    setTaskDeletionCallback(callbackfn) {
        this.reportTaskDeletion = callbackfn;
    }
}
//# sourceMappingURL=delete_task_dropoff.js.map

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
/* harmony import */ var _tasks_caching_task_provider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../tasks/caching_task_provider */ "../build/tasks/caching_task_provider.js");
/* harmony import */ var _complete_task_dropoff__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./complete_task_dropoff */ "../build/eisenhower/complete_task_dropoff.js");
/* harmony import */ var _delete_task_dropoff__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./delete_task_dropoff */ "../build/eisenhower/delete_task_dropoff.js");
/* harmony import */ var _indexed_tasks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./indexed_tasks */ "../build/eisenhower/indexed_tasks.js");
/* harmony import */ var _task_zone__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./task_zone */ "../build/eisenhower/task_zone.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};





class EisenhowerMatrixTaskEditor {
    constructor(taskProvider) {
        this.managedTasks = new _indexed_tasks__WEBPACK_IMPORTED_MODULE_3__.IndexedTasks;
        this.zones = new Map;
        this.taskProvider = new _tasks_caching_task_provider__WEBPACK_IMPORTED_MODULE_0__.CachingTaskProvider(taskProvider);
    }
    restoreTasks() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.initTasks();
            this.initZones();
            this.initDropoffs();
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
        // TODO: better
        this.zones.set('do', new _task_zone__WEBPACK_IMPORTED_MODULE_4__.TaskZone("do_task_box", 'Do', 'do'));
        this.zones.set('schedule', new _task_zone__WEBPACK_IMPORTED_MODULE_4__.TaskZone("schedule_task_box", 'Schedule', 'schedule'));
        this.zones.set('delegate', new _task_zone__WEBPACK_IMPORTED_MODULE_4__.TaskZone("delegate_task_box", 'Delegate', 'delegate'));
        this.zones.set('delete', new _task_zone__WEBPACK_IMPORTED_MODULE_4__.TaskZone("dont_task_box", "Don't do", 'delete'));
        this.zones.forEach((zone) => {
            this.addCategoryChangeProvider(zone.getCatChangeProvider());
            this.addNewTaskProvider(zone.getNewTaskProvider());
            this.addTaskDeleter(zone.getTaskDeleter());
        });
    }
    initDropoffs() {
        this.initCompleteDropoffs();
        this.initDeleteDropoffs();
    }
    initCompleteDropoffs() {
        const ids = ["done_task_box_horizontal", "done_task_box_vertical"];
        for (let i of ids) {
            const newDropoff = new _complete_task_dropoff__WEBPACK_IMPORTED_MODULE_1__.CompleteTaskDropoff(i);
            newDropoff.setTaskCompletionCallback(taskId => this.changeTaskCategory(taskId, 'done'));
        }
    }
    initDeleteDropoffs() {
        const ids = ["thrash_task_box_horizontal", "thrash_task_box_vertical"];
        for (let i of ids) {
            const newDropoff = new _delete_task_dropoff__WEBPACK_IMPORTED_MODULE_2__.DeleteTaskDropoff(i);
            newDropoff.setTaskDeletionCallback(taskId => this.deleteTask(taskId));
        }
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
    changeTaskCategory(taskId, newCategory, newIndex = 0) {
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

/***/ "../build/eisenhower/size_controller.js":
/*!**********************************************!*\
  !*** ../build/eisenhower/size_controller.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SizeController: () => (/* binding */ SizeController)
/* harmony export */ });
/* harmony import */ var _common_basic_point__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/basic_point */ "../build/common/basic_point.js");
/* harmony import */ var _common_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/common */ "../build/common/common.js");


class SizeControllerHTML {
    static taskBoxSelector() {
        return `.${SizeControllerHTML.taskBoxClass} > *`;
    }
    static verticalUtilBoxSelector() {
        return `.${SizeControllerHTML.utilityBoxClass}.${SizeControllerHTML.verticalClass}`;
    }
    static horizontalUtilBoxSelector() {
        return `.${SizeControllerHTML.utilityBoxClass}.${SizeControllerHTML.horizontalClass}`;
    }
}
SizeControllerHTML.freespaceId = "content";
SizeControllerHTML.containerId = "eisenhower";
SizeControllerHTML.matrixClass = "eisenhower_matrix";
SizeControllerHTML.taskBoxClass = "matrix_task_box";
SizeControllerHTML.utilityBoxClass = "matrix_utility_box";
SizeControllerHTML.verticalClass = "vertical";
SizeControllerHTML.horizontalClass = "horizontal";
SizeControllerHTML.hiddenUtilBoxClass = "template";
class SizeController {
    constructor() {
        this.taskBoxes = new Array;
        this.verticalUtilBoxes = new Array;
        this.horizontalUtilBoxes = new Array;
        this.initElements();
        window.addEventListener('resize', ev => this.handleResize(ev));
    }
    initElements() {
        this.initUniqueElements();
        this.initRepeatedElements();
    }
    initUniqueElements() {
        this.freespace = (0,_common_common__WEBPACK_IMPORTED_MODULE_1__.getElementById)(SizeControllerHTML.freespaceId);
        this.container = (0,_common_common__WEBPACK_IMPORTED_MODULE_1__.getElementById)(SizeControllerHTML.containerId);
        this.matrix = this.freespace.querySelector(`.${SizeControllerHTML.matrixClass}`);
    }
    initRepeatedElements() {
        this.grabElements(SizeControllerHTML.taskBoxSelector(), this.taskBoxes);
        this.grabElements(SizeControllerHTML.verticalUtilBoxSelector(), this.verticalUtilBoxes);
        this.grabElements(SizeControllerHTML.horizontalUtilBoxSelector(), this.horizontalUtilBoxes);
    }
    grabElements(selector, into) {
        const elements = this.container.querySelectorAll(selector);
        elements.forEach(elem => {
            into.push(elem);
        });
        console.log(`Grabbed ${into.length} elements`);
    }
    handleResize(event) {
        this.resize();
    }
    resize() {
        console.log('resize!');
        const freeSpace = this.getFreeSpace();
        const orientation = freeSpace.x > freeSpace.y ? 'landscape' : 'portrait';
        console.log(`Orientation: ${orientation}`);
        const taskSize = this.taskBoxes.at(0).getBoundingClientRect().width;
        console.log(`Task size: ${taskSize}`);
        this.showOrientedUtilBoxes(orientation, taskSize);
    }
    getFreeSpace() {
        const fsbbox = this.freespace.getBoundingClientRect();
        return new _common_basic_point__WEBPACK_IMPORTED_MODULE_0__.BasicPoint(fsbbox.width, fsbbox.height);
    }
    showOrientedUtilBoxes(orientation, size) {
        if (orientation === 'landscape') {
            this.showHorizontalUtilBoxes(size);
        }
        else {
            this.showVerticalUtilBoxes(size);
        }
    }
    showHorizontalUtilBoxes(size) {
        this.hideVerticalUtilBoxes();
        this.removeClassFromElements(this.horizontalUtilBoxes, SizeControllerHTML.hiddenUtilBoxClass);
        this.setWidthToElements(this.horizontalUtilBoxes, size / 2);
        this.setHeightToElements(this.horizontalUtilBoxes, size);
    }
    hideVerticalUtilBoxes() {
        this.addClassToElements(this.verticalUtilBoxes, SizeControllerHTML.hiddenUtilBoxClass);
    }
    showVerticalUtilBoxes(size) {
        this.hideHorizontalUtilBoxes();
        this.removeClassFromElements(this.verticalUtilBoxes, SizeControllerHTML.hiddenUtilBoxClass);
        this.setHeightToElements(this.verticalUtilBoxes, size / 2);
    }
    hideHorizontalUtilBoxes() {
        this.addClassToElements(this.horizontalUtilBoxes, SizeControllerHTML.hiddenUtilBoxClass);
    }
    addClassToElements(array, className) {
        array.forEach((elem) => {
            elem.classList.add(className);
        });
    }
    removeClassFromElements(array, className) {
        array.forEach((elem) => {
            elem.classList.remove(className);
        });
    }
    setWidthToElements(array, width) {
        array.forEach((elem) => {
            elem.style.width = `${width}px`;
        });
    }
    setHeightToElements(array, height) {
        array.forEach((elem) => {
            elem.style.height = `${height}px`;
        });
    }
}
//# sourceMappingURL=size_controller.js.map

/***/ }),

/***/ "../build/eisenhower/task_drop_zone.js":
/*!*********************************************!*\
  !*** ../build/eisenhower/task_drop_zone.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TaskDropZone: () => (/* binding */ TaskDropZone)
/* harmony export */ });
/* harmony import */ var _common_basic_point__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/basic_point */ "../build/common/basic_point.js");
/* harmony import */ var _task_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./task_element */ "../build/eisenhower/task_element.js");


class TaskDropZone {
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
        const dropPos = new _common_basic_point__WEBPACK_IMPORTED_MODULE_0__.BasicPoint(event.pageX, event.pageY);
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
        const message = (_a = event.dataTransfer) === null || _a === void 0 ? void 0 : _a.getData(_task_element__WEBPACK_IMPORTED_MODULE_1__.TaskElement.taskDragType);
        if (message === undefined)
            return undefined;
        const droppedTaskId = parseInt(message);
        if (isNaN(droppedTaskId))
            return undefined;
        return droppedTaskId;
    }
}
//# sourceMappingURL=task_drop_zone.js.map

/***/ }),

/***/ "../build/eisenhower/task_dropoff.js":
/*!*******************************************!*\
  !*** ../build/eisenhower/task_dropoff.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TaskDropoff: () => (/* binding */ TaskDropoff)
/* harmony export */ });
/* harmony import */ var _common_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/common */ "../build/common/common.js");
/* harmony import */ var _task_drop_zone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./task_drop_zone */ "../build/eisenhower/task_drop_zone.js");


class TaskDropoff {
    constructor(parentId, name) {
        this.element = this.getElement(parentId, name);
        this.dropZone = new _task_drop_zone__WEBPACK_IMPORTED_MODULE_1__.TaskDropZone(this.element);
        this.setupEvents();
    }
    getElement(parentId, name) {
        const element = (0,_common_common__WEBPACK_IMPORTED_MODULE_0__.cloneTemplateById)(TaskDropoff.templateId);
        const nameElem = element.querySelector(`.${TaskDropoff.nameClass}`);
        nameElem.innerText = name;
        const parent = (0,_common_common__WEBPACK_IMPORTED_MODULE_0__.getElementById)(parentId);
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
        this.stateInfo = this.generateTaskElementStateInfo();
        this.switchToState(new DisplayedTaskElement(this.stateInfo));
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
    getId() {
        return this.id;
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
        const info = new TaskElemStateInfo(this.id, this.task, this.element);
        return info;
    }
    switchToState(state) {
        this.state = state;
        this.state.setSwitchStateCallback(state => this.switchToState(state));
    }
    setTaskUpdateCallback(callbackfn) {
        this.stateInfo.setTaskUpdateCallback(callbackfn);
    }
}
TaskElement.taskTemplateId = "task_template";
TaskElement.taskDragType = "taskid";
class TaskElemStateInfo {
    constructor(id, task, root) {
        this.taskUpdateCallback = () => { };
        this.id = id;
        this.task = task;
        this.root = root;
    }
    setTaskUpdateCallback(callbackfn) {
        this.taskUpdateCallback = callbackfn;
    }
    reportTaskUpdate() {
        this.taskUpdateCallback(this.id, this.task);
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
    reportTaskUpdate() {
        this.taskElemInfo.reportTaskUpdate();
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
        this.element.addEventListener('dragend', ev => this.handleDragend(ev));
        this.element.addEventListener('dblclick', ev => this.handleDblclick(ev));
    }
    handleDragstart(event) {
        if (event.dataTransfer) {
            event.dataTransfer.setData(TaskElement.taskDragType, `${this.getId()}`);
            event.dataTransfer.dropEffect = "move";
            (0,_common_common__WEBPACK_IMPORTED_MODULE_0__.getElementById)('eisenhower').classList.add(DisplayedTaskElement.taskDraggedClass);
        }
    }
    handleDragend(event) {
        (0,_common_common__WEBPACK_IMPORTED_MODULE_0__.getElementById)('eisenhower').classList.remove(DisplayedTaskElement.taskDraggedClass);
    }
    handleDblclick(event) {
        event.preventDefault();
        event.stopPropagation();
        this.switchToState(new EditedTaskElement(this.getElemInfo()));
    }
}
DisplayedTaskElement.displayTemplateId = "task_display_template";
DisplayedTaskElement.taskDraggedClass = "task_dragged";
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
        this.reportTaskUpdate();
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
/* harmony export */   TaskZone: () => (/* binding */ TaskZone)
/* harmony export */ });
/* harmony import */ var _base_task_zone_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base_task_zone_data */ "../build/eisenhower/base_task_zone_data.js");
/* harmony import */ var _task_zone_drop_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./task_zone_drop_handler */ "../build/eisenhower/task_zone_drop_handler.js");
/* harmony import */ var _task_zone_new_task_handler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./task_zone_new_task_handler */ "../build/eisenhower/task_zone_new_task_handler.js");
/* harmony import */ var _task_zone_task_inserter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./task_zone_task_inserter */ "../build/eisenhower/task_zone_task_inserter.js");
/* harmony import */ var _task_zone_task_remover__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./task_zone_task_remover */ "../build/eisenhower/task_zone_task_remover.js");





class TaskZone {
    constructor(containerId, name, category) {
        this.baseData = new _base_task_zone_data__WEBPACK_IMPORTED_MODULE_0__.BaseTaskZoneData(containerId, name, category);
        this.dropHandler = new _task_zone_drop_handler__WEBPACK_IMPORTED_MODULE_1__.TaskZoneDropHandler(this.baseData);
        this.newTaskHandler = new _task_zone_new_task_handler__WEBPACK_IMPORTED_MODULE_2__.TaskZoneNewTaskHandler(this.baseData);
        this.taskInserter = new _task_zone_task_inserter__WEBPACK_IMPORTED_MODULE_3__.TaskZoneTaskInserter(this.baseData);
        this.taskRemover = new _task_zone_task_remover__WEBPACK_IMPORTED_MODULE_4__.TaskZoneTaskRemover(this.baseData);
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

/***/ }),

/***/ "../build/eisenhower/task_zone_drop_handler.js":
/*!*****************************************************!*\
  !*** ../build/eisenhower/task_zone_drop_handler.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TaskZoneDropHandler: () => (/* binding */ TaskZoneDropHandler)
/* harmony export */ });
/* harmony import */ var _task_drop_zone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./task_drop_zone */ "../build/eisenhower/task_drop_zone.js");
/* harmony import */ var _threshold_box__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./threshold_box */ "../build/eisenhower/threshold_box.js");


class TaskZoneDropHandler {
    constructor(baseData) {
        this.catChangeCallback = () => { };
        this.data = baseData;
        const contents = this.data.getContents();
        this.dropZone = new _task_drop_zone__WEBPACK_IMPORTED_MODULE_0__.TaskDropZone(contents);
        this.setupEvents();
    }
    setupEvents() {
        this.dropZone.onTaskDrop((taskId, dropPos) => this.handleTaskDrop(taskId, dropPos));
        this.dropZone.onTaskEnter(() => this.data.getElement().highlightDropZone());
        this.dropZone.onTaskLeave(() => this.data.getElement().dimDropZone());
    }
    handleTaskDrop(taskId, dropPosition) {
        this.data.getElement().dimDropZone();
        const droppedTaskIndex = this.getIndexForDroppedTask(dropPosition);
        this.catChangeCallback(taskId, this.data.getCategory(), droppedTaskIndex);
    }
    getIndexForDroppedTask(position) {
        const iterator = this.data.getTasks().iterate();
        let lastIndex = 0;
        while (iterator.hasNext()) {
            const taskElement = iterator.getNext();
            const taskHTMLElement = taskElement.getElement();
            const taskThreshold = _threshold_box__WEBPACK_IMPORTED_MODULE_1__.ThresholdBox.fromElement(taskHTMLElement);
            lastIndex = taskElement.getTask().getOrderIndex();
            if (taskThreshold.isAfter(position)) {
                return lastIndex;
            }
        }
        return lastIndex + 1;
    }
    setCategoryChangeCallback(callbackfn) {
        this.catChangeCallback = callbackfn;
    }
}
//# sourceMappingURL=task_zone_drop_handler.js.map

/***/ }),

/***/ "../build/eisenhower/task_zone_element.js":
/*!************************************************!*\
  !*** ../build/eisenhower/task_zone_element.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TaskZoneElement: () => (/* binding */ TaskZoneElement)
/* harmony export */ });
/* harmony import */ var _common_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/common */ "../build/common/common.js");

class TaskZoneElement {
    constructor(containerId, name = "Unset") {
        const parent = (0,_common_common__WEBPACK_IMPORTED_MODULE_0__.getElementById)(containerId);
        this.root = (0,_common_common__WEBPACK_IMPORTED_MODULE_0__.cloneTemplateById)(TaskZoneElement.templateId);
        this.root.id = containerId + "_element";
        parent.appendChild(this.root);
        this.contents = this.root.querySelector(`.${TaskZoneElement.contentsClass}`);
        this.name = this.root.querySelector(`.${TaskZoneElement.nameClass}`);
        this.name.innerText = name;
    }
    getRoot() {
        return this.root;
    }
    getContents() {
        return this.contents;
    }
    highlightDropZone() {
        this.root.classList.add(TaskZoneElement.dropHighlightClass);
    }
    dimDropZone() {
        this.root.classList.remove(TaskZoneElement.dropHighlightClass);
    }
    addContentsEvent(type, callbackfn) {
        this.getContents().addEventListener(type, callbackfn);
    }
}
TaskZoneElement.templateId = "task_box_template";
TaskZoneElement.contentsClass = "contents";
TaskZoneElement.nameClass = "name";
TaskZoneElement.dropHighlightClass = "highlight";
//# sourceMappingURL=task_zone_element.js.map

/***/ }),

/***/ "../build/eisenhower/task_zone_new_task_handler.js":
/*!*********************************************************!*\
  !*** ../build/eisenhower/task_zone_new_task_handler.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TaskZoneNewTaskHandler: () => (/* binding */ TaskZoneNewTaskHandler)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class TaskZoneNewTaskHandler {
    constructor(baseData) {
        this.data = baseData;
        this.setupEvents();
    }
    setupEvents() {
        this.data.getElement().addContentsEvent('dblclick', ev => this.spawnNewTask(ev));
    }
    setInitializeTaskCallback(callbackfn) {
        this.initNewTask = callbackfn;
    }
    setFinalizeTaskCallback(callbackfn) {
        this.finalizeNewTask = callbackfn;
    }
    spawnNewTask(event) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield this.initNewTask();
            task.setName("Double-click to edit!");
            task.setOrderIndex(this.getNextLastIndex());
            task.setSection(this.data.getCategory());
            this.finalizeNewTask(task);
        });
    }
    getNextLastIndex() {
        const lastTaskElement = this.data.getTasks().back();
        if (lastTaskElement === undefined)
            return 1;
        else
            return lastTaskElement.getTask().getOrderIndex() + 1;
    }
}
//# sourceMappingURL=task_zone_new_task_handler.js.map

/***/ }),

/***/ "../build/eisenhower/task_zone_task_inserter.js":
/*!******************************************************!*\
  !*** ../build/eisenhower/task_zone_task_inserter.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TaskZoneTaskInserter: () => (/* binding */ TaskZoneTaskInserter)
/* harmony export */ });
/* harmony import */ var _task_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./task_element */ "../build/eisenhower/task_element.js");

class TaskZoneTaskInserter {
    constructor(baseData) {
        this.data = baseData;
    }
    addTask(id, task) {
        const taskElement = this.createElementForTask(id, task);
        this.displayTaskElement(taskElement);
    }
    createElementForTask(id, task) {
        const element = new _task_element__WEBPACK_IMPORTED_MODULE_0__.TaskElement(id, task);
        element.setTaskUpdateCallback((taskId, task) => this.deleteTaskIfNameIsEmpty(taskId, task));
        return element;
    }
    deleteTaskIfNameIsEmpty(taskId, task) {
        if (task.getName() === "") {
            this.data.deleteTask(taskId);
        }
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

/***/ }),

/***/ "../build/eisenhower/task_zone_task_remover.js":
/*!*****************************************************!*\
  !*** ../build/eisenhower/task_zone_task_remover.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TaskZoneTaskRemover: () => (/* binding */ TaskZoneTaskRemover)
/* harmony export */ });
class TaskZoneTaskRemover {
    constructor(baseData) {
        this.data = baseData;
    }
    removeTask(id) {
        const taskElement = this.findElementWithId(id);
        if (taskElement) {
            taskElement.remove();
            this.data.getTasks().pop(taskElement);
        }
    }
    findElementWithId(id) {
        const iterator = this.data.getTasks().iterate();
        while (iterator.hasNext()) {
            const element = iterator.getNext();
            if (element.getId() === id) {
                return element;
            }
        }
        return undefined;
    }
}
//# sourceMappingURL=task_zone_task_remover.js.map

/***/ }),

/***/ "../build/eisenhower/threshold_box.js":
/*!********************************************!*\
  !*** ../build/eisenhower/threshold_box.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ThresholdBox: () => (/* binding */ ThresholdBox)
/* harmony export */ });
class ThresholdBox {
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
//# sourceMappingURL=threshold_box.js.map

/***/ }),

/***/ "../build/indexed_db_tasks/indexed_db_data.js":
/*!****************************************************!*\
  !*** ../build/indexed_db_tasks/indexed_db_data.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IndexedDbData: () => (/* binding */ IndexedDbData)
/* harmony export */ });
class IndexedDbData {
}
IndexedDbData.dbName = "planning_zen";
IndexedDbData.dbVersion = 1;
IndexedDbData.taskObjectStoreName = "active_tasks";
IndexedDbData.task = {
    name: "task_name",
    category: "task_cat",
    index: "task_index"
};
//# sourceMappingURL=indexed_db_data.js.map

/***/ }),

/***/ "../build/indexed_db_tasks/indexed_db_opener.js":
/*!******************************************************!*\
  !*** ../build/indexed_db_tasks/indexed_db_opener.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IndexedDbOpener: () => (/* binding */ IndexedDbOpener),
/* harmony export */   IndexedDbOpeningResult: () => (/* binding */ IndexedDbOpeningResult)
/* harmony export */ });
/* harmony import */ var _indexed_db_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./indexed_db_data */ "../build/indexed_db_tasks/indexed_db_data.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

class IndexedDbOpeningResult {
    constructor() {
        this.success = false;
        this.error = "";
    }
    static success(db) {
        const result = new IndexedDbOpeningResult;
        result.db = db;
        result.success = true;
        return result;
    }
    static failure(reason) {
        const result = new IndexedDbOpeningResult;
        result.error = reason;
        result.success = false;
        return result;
    }
}
class IndexedDbOpener {
    constructor() { }
    openDb() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.openIDBInPromise(resolve);
            });
        });
    }
    openIDBInPromise(resolve) {
        const request = indexedDB.open(_indexed_db_data__WEBPACK_IMPORTED_MODULE_0__.IndexedDbData.dbName, _indexed_db_data__WEBPACK_IMPORTED_MODULE_0__.IndexedDbData.dbVersion);
        request.onupgradeneeded = ev => this.getDbAndGenerateStructure(ev, resolve);
        request.onsuccess = ev => this.getOpenedDb(ev, resolve);
        request.onerror = ev => this.reportFailure(ev, resolve);
    }
    getDbAndGenerateStructure(event, resolve) {
        const db = this.getDatabase(event);
        if (db === undefined) {
            return;
        }
        this.generateDBStructure(db);
        const transaction = event.target.transaction;
        transaction.oncomplete = () => resolve(IndexedDbOpeningResult.success(db));
    }
    getOpenedDb(event, resolve) {
        const target = event.target;
        const db = target.result;
        resolve(IndexedDbOpeningResult.success(db));
    }
    reportFailure(event, resolve) {
        var _a;
        const target = event.target;
        const error = "" + ((_a = target === null || target === void 0 ? void 0 : target.error) === null || _a === void 0 ? void 0 : _a.message);
        console.trace(`Failed to open IndexedDB, reason: ${error}`);
        resolve(IndexedDbOpeningResult.failure(error));
    }
    getDatabase(event) {
        if (event.target === undefined)
            return undefined;
        const target = event.target;
        return target.result;
    }
    generateDBStructure(db) {
        const taskObjectStore = db.createObjectStore(_indexed_db_data__WEBPACK_IMPORTED_MODULE_0__.IndexedDbData.taskObjectStoreName, {
            autoIncrement: true
        });
        taskObjectStore.createIndex(_indexed_db_data__WEBPACK_IMPORTED_MODULE_0__.IndexedDbData.task.name, _indexed_db_data__WEBPACK_IMPORTED_MODULE_0__.IndexedDbData.task.name, { unique: false });
        taskObjectStore.createIndex(_indexed_db_data__WEBPACK_IMPORTED_MODULE_0__.IndexedDbData.task.category, _indexed_db_data__WEBPACK_IMPORTED_MODULE_0__.IndexedDbData.task.category, { unique: false });
        taskObjectStore.createIndex(_indexed_db_data__WEBPACK_IMPORTED_MODULE_0__.IndexedDbData.task.index, _indexed_db_data__WEBPACK_IMPORTED_MODULE_0__.IndexedDbData.task.index, { unique: false });
    }
}
//# sourceMappingURL=indexed_db_opener.js.map

/***/ }),

/***/ "../build/indexed_db_tasks/indexed_db_task.js":
/*!****************************************************!*\
  !*** ../build/indexed_db_tasks/indexed_db_task.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IndexedDBTask: () => (/* binding */ IndexedDBTask)
/* harmony export */ });
/* harmony import */ var _indexed_db_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./indexed_db_data */ "../build/indexed_db_tasks/indexed_db_data.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

class IndexedDBTask {
    constructor(db, key) {
        this.db = db;
        this.key = key;
    }
    static createNew(db) {
        return __awaiter(this, void 0, void 0, function* () {
            const key = yield IndexedDBTask.createTaskObjectInDb(db);
            return new IndexedDBTask(db, key);
        });
    }
    static restoreByKey(db, key) {
        return new IndexedDBTask(db, key);
    }
    static createTaskObjectInDb(db) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = db.transaction(_indexed_db_data__WEBPACK_IMPORTED_MODULE_0__.IndexedDbData.taskObjectStoreName, "readwrite");
            const store = transaction.objectStore(_indexed_db_data__WEBPACK_IMPORTED_MODULE_0__.IndexedDbData.taskObjectStoreName);
            const addTransaction = store.add(IndexedDBTask.newTaskData());
            return new Promise((resolve, reject) => {
                addTransaction.onsuccess = () => resolve(addTransaction.result.valueOf());
                addTransaction.onerror = reject;
            });
        });
    }
    static newTaskData() {
        return {
            task_name: "New task - double-click to edit",
            task_cat: "unset",
            task_index: 0
        };
    }
    getName() {
        return __awaiter(this, void 0, void 0, function* () {
            const object = (yield this.openTransactionAndGetMyObject()).object;
            return object.task_name;
        });
    }
    getOrderIndex() {
        return __awaiter(this, void 0, void 0, function* () {
            const object = (yield this.openTransactionAndGetMyObject()).object;
            return object.task_index;
        });
    }
    getSection() {
        return __awaiter(this, void 0, void 0, function* () {
            const object = (yield this.openTransactionAndGetMyObject()).object;
            return object.task_cat;
        });
    }
    setName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const modifier = (object) => {
                object.task_name = name;
                console.log(`Setting task name to "${name}"`);
            };
            return this.modifyMyObject(modifier);
        });
    }
    setOrderIndex(index) {
        return __awaiter(this, void 0, void 0, function* () {
            const modifier = (object) => {
                object.task_index = index;
                console.log(`Setting task index to ${index}`);
            };
            return this.modifyMyObject(modifier);
        });
    }
    setSection(section) {
        return __awaiter(this, void 0, void 0, function* () {
            const modifier = (object) => {
                object.task_cat = section;
                console.log(`Setting task category to "${section}"`);
            };
            return this.modifyMyObject(modifier);
        });
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            const store = this.openTransaction("readwrite");
            const request = store.delete(IDBKeyRange.only(this.key));
            return new Promise((resolve, reject) => {
                request.onsuccess = () => resolve();
                request.onerror = reject;
            });
        });
    }
    modifyMyObject(modify) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.openTransactionAndGetMyObject("readwrite");
            modify(data.object);
            const updateRequest = data.store.put(data.object, data.key);
            return new Promise((resolve, reject) => {
                updateRequest.onerror = reject;
                updateRequest.onsuccess = () => resolve();
            });
        });
    }
    openTransactionAndGetMyObject() {
        return __awaiter(this, arguments, void 0, function* (mode = "readonly") {
            const store = this.openTransaction(mode);
            const key = yield this.getValidKey(store);
            const object = yield this.getMyObject(store, key);
            return new OpenTransactionData(object, store, key);
        });
    }
    openTransaction(mode = "readonly") {
        const transaction = this.db.transaction(_indexed_db_data__WEBPACK_IMPORTED_MODULE_0__.IndexedDbData.taskObjectStoreName, mode);
        const store = transaction.objectStore(_indexed_db_data__WEBPACK_IMPORTED_MODULE_0__.IndexedDbData.taskObjectStoreName);
        return store;
    }
    getValidKey(store) {
        return __awaiter(this, void 0, void 0, function* () {
            const validKeyRequest = store.getKey(IDBKeyRange.only(this.key));
            return new Promise((resolve, reject) => {
                validKeyRequest.onsuccess = () => resolve(validKeyRequest.result);
                validKeyRequest.onerror = reject;
            });
        });
    }
    getMyObject(store, key) {
        const readTransaction = store.get(key);
        return new Promise((resolve, reject) => {
            readTransaction.onsuccess = () => resolve(readTransaction.result);
            readTransaction.onerror = reject;
        });
    }
}
class OpenTransactionData {
    constructor(object, store, key) {
        this.store = store;
        this.object = object;
        this.key = key;
    }
}
//# sourceMappingURL=indexed_db_task.js.map

/***/ }),

/***/ "../build/indexed_db_tasks/indexed_db_task_provider.js":
/*!*************************************************************!*\
  !*** ../build/indexed_db_tasks/indexed_db_task_provider.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IndexedDBTaskProvider: () => (/* binding */ IndexedDBTaskProvider)
/* harmony export */ });
/* harmony import */ var _indexed_db_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./indexed_db_data */ "../build/indexed_db_tasks/indexed_db_data.js");
/* harmony import */ var _indexed_db_opener__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./indexed_db_opener */ "../build/indexed_db_tasks/indexed_db_opener.js");
/* harmony import */ var _indexed_db_task__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./indexed_db_task */ "../build/indexed_db_tasks/indexed_db_task.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



class IndexedDBTaskProvider {
    constructor() { }
    openDB() {
        return __awaiter(this, void 0, void 0, function* () {
            const dbOpener = new _indexed_db_opener__WEBPACK_IMPORTED_MODULE_1__.IndexedDbOpener;
            const result = yield dbOpener.openDb();
            this.db = result.db;
        });
    }
    createNewTask() {
        return __awaiter(this, void 0, void 0, function* () {
            return _indexed_db_task__WEBPACK_IMPORTED_MODULE_2__.IndexedDBTask.createNew(this.db);
        });
    }
    restoreTasks() {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = this.db.transaction(_indexed_db_data__WEBPACK_IMPORTED_MODULE_0__.IndexedDbData.taskObjectStoreName, "readonly");
            const store = transaction.objectStore(_indexed_db_data__WEBPACK_IMPORTED_MODULE_0__.IndexedDbData.taskObjectStoreName);
            const readTransaction = store.getAllKeys();
            return new Promise((resolve, reject) => {
                readTransaction.onsuccess = () => {
                    const keyArray = readTransaction.result;
                    const taskArray = new Array;
                    for (let i of keyArray) {
                        const restoredTask = _indexed_db_task__WEBPACK_IMPORTED_MODULE_2__.IndexedDBTask.restoreByKey(this.db, i.valueOf());
                        taskArray.push(restoredTask);
                    }
                    resolve(taskArray);
                };
                readTransaction.onerror = reject;
            });
        });
    }
    deleteTask(task) {
        const idbTask = task;
        return this.deleteIDBTask(idbTask);
    }
    deleteIDBTask(task) {
        return task.delete();
    }
}
//# sourceMappingURL=indexed_db_task_provider.js.map

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

/***/ "../build/tasks/cached_task.js":
/*!*************************************!*\
  !*** ../build/tasks/cached_task.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CachedTask: () => (/* binding */ CachedTask)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class CachedTask {
    constructor(underlyingTask) {
        this.underlyingTask = underlyingTask;
    }
    cacheInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            this.cachedName = yield this.underlyingTask.getName();
            this.cachedCategory = yield this.underlyingTask.getSection();
            this.cachedIndex = yield this.underlyingTask.getOrderIndex();
        });
    }
    getName() {
        return this.cachedName;
    }
    getSection() {
        return this.cachedCategory;
    }
    getOrderIndex() {
        return this.cachedIndex;
    }
    setName(name) {
        this.underlyingTask.setName(name);
        this.cachedName = name;
    }
    setSection(cat) {
        this.underlyingTask.setSection(cat);
        this.cachedCategory = cat;
    }
    setOrderIndex(index) {
        this.underlyingTask.setOrderIndex(index);
        this.cachedIndex = index;
    }
    getUnderlyingTask() {
        return this.underlyingTask;
    }
}
//# sourceMappingURL=cached_task.js.map

/***/ }),

/***/ "../build/tasks/caching_task_provider.js":
/*!***********************************************!*\
  !*** ../build/tasks/caching_task_provider.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CachingTaskProvider: () => (/* binding */ CachingTaskProvider)
/* harmony export */ });
/* harmony import */ var _cached_task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cached_task */ "../build/tasks/cached_task.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

class CachingTaskProvider {
    constructor(underlyingTaskProvider) {
        this.underlyingTaskProvider = underlyingTaskProvider;
    }
    createNewTask() {
        return __awaiter(this, void 0, void 0, function* () {
            const newTask = yield this.underlyingTaskProvider.createNewTask();
            const cachedTask = new _cached_task__WEBPACK_IMPORTED_MODULE_0__.CachedTask(newTask);
            yield cachedTask.cacheInfo();
            return cachedTask;
        });
    }
    restoreTasks() {
        return __awaiter(this, void 0, void 0, function* () {
            const restoredTasks = yield this.underlyingTaskProvider.restoreTasks();
            const cachedTasks = new Array;
            for (let task of restoredTasks) {
                const cachedTask = new _cached_task__WEBPACK_IMPORTED_MODULE_0__.CachedTask(task);
                yield cachedTask.cacheInfo();
                cachedTasks.push(cachedTask);
            }
            return cachedTasks;
        });
    }
    deleteTask(task) {
        return __awaiter(this, void 0, void 0, function* () {
            const underlyingTask = task.getUnderlyingTask();
            yield this.underlyingTaskProvider.deleteTask(underlyingTask);
        });
    }
}
//# sourceMappingURL=caching_task_provider.js.map

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
/* harmony import */ var _eisenhower_eisenhower_matrix_task_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eisenhower/eisenhower_matrix_task_editor */ "../build/eisenhower/eisenhower_matrix_task_editor.js");
/* harmony import */ var _misc_github_page_opener__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./misc/github_page_opener */ "../build/misc/github_page_opener.js");
/* harmony import */ var _misc_style_switcher__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./misc/style_switcher */ "../build/misc/style_switcher.js");
/* harmony import */ var _indexed_db_tasks_indexed_db_task_provider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./indexed_db_tasks/indexed_db_task_provider */ "../build/indexed_db_tasks/indexed_db_task_provider.js");
/* harmony import */ var _eisenhower_size_controller__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./eisenhower/size_controller */ "../build/eisenhower/size_controller.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};





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
    const styleSwitcher = new _misc_style_switcher__WEBPACK_IMPORTED_MODULE_2__.StyleSwitcher;
    const githubPageOpener = new _misc_github_page_opener__WEBPACK_IMPORTED_MODULE_1__.GithubPageOpener();
}
function initTasks() {
    return __awaiter(this, void 0, void 0, function* () {
        const taskProvider = new _indexed_db_tasks_indexed_db_task_provider__WEBPACK_IMPORTED_MODULE_3__.IndexedDBTaskProvider;
        yield taskProvider.openDB();
        const app = new _eisenhower_eisenhower_matrix_task_editor__WEBPACK_IMPORTED_MODULE_0__.EisenhowerMatrixTaskEditor(taskProvider);
        yield app.restoreTasks();
        const sizeController = new _eisenhower_size_controller__WEBPACK_IMPORTED_MODULE_4__.SizeController;
        window.requestAnimationFrame(() => {
            sizeController.resize();
        });
    });
}
window.addEventListener('load', main);
//# sourceMappingURL=main.js.map
})();

/******/ })()
;
//# sourceMappingURL=planner.js.map