import { cloneTemplateById } from "./common";
export class TaskViewData {
    constructor(info, element) {
        this.info = info;
        this.element = element;
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
        // To be reimplemented
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
        return new TaskViewData(taskInfo, element);
    }
    createElement() {
        const element = cloneTemplateById(TaskView.elementTemplateId);
        element.innerHTML = this.data.info.getName();
        return element;
    }
}
TaskView.elementTemplateId = "task_template";
//# sourceMappingURL=task_view.js.map