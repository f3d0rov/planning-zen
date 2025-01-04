
import { Task, TaskSection } from "./task";


export class CachedTask {
	private underlyingTask: Task;

	private cachedName: string | undefined;
	private cachedCategory: TaskSection | undefined;
	private cachedIndex: number | undefined;

	constructor (underlyingTask: Task) {
		this.underlyingTask = underlyingTask;
	}

	public async cacheInfo () {
		this.cachedName = await this.underlyingTask.getName();
		this.cachedCategory = await this.underlyingTask.getSection();
		this.cachedIndex = await this.underlyingTask.getOrderIndex();
	}

	public getName(): string {
		return this.cachedName!;
	}

	public getSection (): TaskSection {
		return this.cachedCategory!;
	}

	public getOrderIndex (): number {
		return this.cachedIndex!;
	}

	public setName (name: string): void {
		this.underlyingTask.setName (name);
		this.cachedName = name;
	}

	public setSection (cat: TaskSection): void {
		this.underlyingTask.setSection (cat);
		this.cachedCategory = cat;
	}

	public setOrderIndex (index: number): void {
		this.underlyingTask.setOrderIndex (index);
		this.cachedIndex = index;
	}
}
