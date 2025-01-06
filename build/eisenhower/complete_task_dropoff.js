import { TaskDropoff } from "./task_dropoff";
export class CompleteTaskDropoff extends TaskDropoff {
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