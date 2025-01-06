
import { TaskDropoff } from "./task_dropoff";


export class DeleteTaskDropoff extends TaskDropoff {
	private reportTaskDeletion: (taskId: number) => void = () => {};

	constructor (parentId: string) {
		super (parentId, "Delete task");
	}

	protected override handleDroppedTask (taskId: number): void {
		console.log (`Task #${taskId} dropped to delete`);
		this.reportTaskDeletion (taskId);
	}

	public setTaskDeletionCallback (callbackfn: (taskId: number) => void): void {
		this.reportTaskDeletion = callbackfn
	}
}
