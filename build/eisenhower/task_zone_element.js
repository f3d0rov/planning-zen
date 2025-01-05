import { cloneTemplateById, getElementById } from "../common/common";
export class TaskZoneElement {
    constructor(containerId, name = "Unset") {
        const parent = getElementById(containerId);
        this.root = cloneTemplateById(TaskZoneElement.templateId);
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