
import { Task, TaskSection } from "./task";


export class BasicTask implements Task {
	private name: string = "";
	private section: TaskSection = "unset";
	private index: number = 0;

	constructor (name: string, section: TaskSection = "unset") {
		this.name = name;
		this.section = section;
	}

	public getName (): string {
		return this.name;
	}

	public setName (name: string): void {
		this.name = name;
	}

	public getSection (): TaskSection {
		return this.section;
	}

	public setSection (section: TaskSection): void {
		this.section = section;
	}

	public getOrderIndex (): number {
		return this.index;
	}

	public setOrderIndex (index: number): void {
		this.index = index;
	}
}
