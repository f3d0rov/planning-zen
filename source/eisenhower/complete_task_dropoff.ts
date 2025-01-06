
import { TaskDropoff } from "./task_dropoff";


export class CompleteTaskDropoff extends TaskDropoff {
	private reportTaskCompletion: (taskId: number) => void = () => {};

	constructor (parentId: string) {
		super (parentId, "Complete task");
	}

	protected override handleDroppedTask (taskId: number): void {
		console.log (`Task #${taskId} dropped to mark as complete`);
		this.reportTaskCompletion (taskId);
	}

	public setTaskCompletionCallback (callbackfn: (taskId: number) => void): void {
		this.reportTaskCompletion = callbackfn;
	}
}
