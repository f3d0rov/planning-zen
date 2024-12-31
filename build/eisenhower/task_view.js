import { cloneTemplateById } from "../common/common";
export class TaskViewData {
    constructor(info, element) {
        this.stateChangedCallback = undefined;
        this.info = info;
        this.element = element;
    }
    setStateChangedCallback(callbackfn) {
        if (this.stateChangedCallback === undefined) {
            this.stateChangedCallback = callbackfn;
        }
    }
    setNewState(newState) {
        this.stateChangedCallback(newState);
    }
}
export class BaseTaskViewState {
    apply(data) {
        this.clearElement(data.element);
        this.buildElement(data);
    }
    clearElement(element) {
        element.innerHTML = "";
    }
    buildElement(data) {
        // To be implemented in child classes
    }
}
export class TaskView {
    constructor(taskInfo, initialState) {
        this.data = this.createTaskViewData(taskInfo);
        this.state = initialState;
        this.state.apply(this.data);
    }
    createTaskViewData(taskInfo) {
        const element = this.createElement();
        const data = new TaskViewData(taskInfo, element);
        data.setStateChangedCallback(newState => this.updateState(newState));
        return data;
    }
    createElement() {
        const element = cloneTemplateById(TaskView.elementTemplateId);
        element.innerHTML = this.data.info.getName();
        return element;
    }
    updateState(newState) {
        this.state = newState;
        this.state.apply(this.data);
    }
}
TaskView.elementTemplateId = "task_template";
//# sourceMappingURL=task_view.js.map