import { TaskDropZone } from "./task_drop_zone";
import { ThresholdBox } from "./threshold_box";
export class TaskZoneDropHandler {
    constructor(baseData) {
        this.catChangeCallback = () => { };
        this.data = baseData;
        const contents = this.data.getContents();
        this.dropZone = new TaskDropZone(contents);
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
            const taskThreshold = ThresholdBox.fromElement(taskHTMLElement);
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