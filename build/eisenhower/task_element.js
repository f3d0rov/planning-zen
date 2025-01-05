import { cloneTemplateById } from "../common/common";
import { getTextWidth } from "../common/text_width";
export class TaskElement {
    constructor(id, task) {
        this.id = id;
        this.task = task;
        this.element = this.generateElement();
        this.stateInfo = this.generateTaskElementStateInfo();
        this.switchToState(new DisplayedTaskElement(this.stateInfo));
    }
    generateElement() {
        const newElement = cloneTemplateById(TaskElement.taskTemplateId);
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
        const element = cloneTemplateById(DisplayedTaskElement.displayTemplateId);
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
        this.input = cloneTemplateById(EditedTaskElement.templateClassId);
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
        const targetWidth = getTextWidth(currentText, this.input);
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