import { BasicLinkedList } from "../common/linked_list";
import { TaskZoneElement } from "./task_zone_element";
export class BaseTaskZoneData {
    constructor(taskBoxElementId, category) {
        this.orderedTasks = new BasicLinkedList;
        this.element = new TaskZoneElement(taskBoxElementId);
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
}
//# sourceMappingURL=base_task_zone_data.js.map