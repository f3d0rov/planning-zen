import { TaskDropoff } from "./task_dropoff";
export class DeleteTaskDropoff extends TaskDropoff {
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