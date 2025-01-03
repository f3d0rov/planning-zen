
import { BaseTaskZoneData } from "./base_task_zone_data";
import { TaskElement } from "./task_element";


export class TaskZoneTaskRemover {
	private data: BaseTaskZoneData;
	
	constructor (baseData: BaseTaskZoneData) {
		this.data = baseData;
	}

	public removeTask (id: number): void {
		const taskElement = this.findElementWithId (id);
		if (taskElement) {
			taskElement.remove();
			this.data.getTasks().pop (taskElement);
		}
	}

	private findElementWithId (id: number): TaskElement | undefined {
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
