
import { CompletedTask } from "./comleted_task";


export class BasicCompletedTask implements CompletedTask {
	private name: string;
	private completionDate: Date;

	constructor (name: string, completedOn: Date) {
		this.name = name;
		this.completionDate = completedOn;
	}

	getName (): string {
		return this.name;
	}

	getCompletionDate(): Date {
		return this.completionDate;
	}
}
