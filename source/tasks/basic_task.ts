
import { Task, TaskSection } from "./task";


export class BasicTask implements Task {
	private name: string = "";
	private section: TaskSection = "unset";
	private index: number = 0;

	constructor (name: string, section: TaskSection = "unset", index: number = 0) {
		this.name = name;
		this.section = section;
		this.index = index;
	}

	public getName (): string {
		return this.name;
	}

	public setName (name: string): void {
		this.name = name;
		console.log (`Task name set to "${name}"`);
	}

	public getSection (): TaskSection {
		return this.section;
	}

	public setSection (section: TaskSection): void {
		this.section = section;
		console.log (`Task section set to "${section}"`);
	}

	public getOrderIndex (): number {
		return this.index;
	}

	public setOrderIndex (index: number): void {
		this.index = index;
		console.log (`Task index set to "${index}"`);
	}
}
