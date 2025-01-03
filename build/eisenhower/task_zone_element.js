import { getElementById } from "../common/common";
export class TaskZoneElement {
    constructor(taskBoxElementId) {
        this.root = getElementById(taskBoxElementId);
        this.contents = this.root.querySelector(`.${TaskZoneElement.contentsClass}`);
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
TaskZoneElement.contentsClass = "decision_box_square_contents";
TaskZoneElement.dropHighlightClass = "highlight";
//# sourceMappingURL=task_zone_element.js.map