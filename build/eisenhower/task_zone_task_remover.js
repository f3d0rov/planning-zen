export class TaskZoneTaskRemover {
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