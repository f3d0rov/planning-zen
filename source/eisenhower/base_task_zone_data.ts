
import { BasicLinkedList, LinkedList } from "../common/linked_list";
import { TaskSection } from "../tasks/task";
import { TaskElement } from "./task_element";
import { TaskZoneElement } from "./task_zone_element";


export class BaseTaskZoneData {
	private category: TaskSection;
	private element: TaskZoneElement;
	private orderedTasks: LinkedList <TaskElement> = new BasicLinkedList <TaskElement>;

	constructor (taskBoxElementId: string, category: TaskSection) {
		this.element = new TaskZoneElement (taskBoxElementId);
		this.category = category;
	}

	public getCategory (): TaskSection {
		return this.category;
	}

	public getElement (): TaskZoneElement {
		return this.element;
	}

	public getContents (): HTMLElement {
		return this.getElement().getContents();
	}

	public getTasks (): LinkedList <TaskElement> {
		return this.orderedTasks;
	}
}
