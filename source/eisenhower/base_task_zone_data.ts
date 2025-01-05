
import { BasicLinkedList, LinkedList } from "../common/linked_list";
import { CachedTask } from "../tasks/cached_task";
import { TaskSection } from "../tasks/task";
import { TaskDeleter } from "./eisenhower_matrix_task_editor";
import { TaskElement } from "./task_element";
import { TaskZoneElement } from "./task_zone_element";


export class BaseTaskZoneData implements TaskDeleter {
	private category: TaskSection;
	private element: TaskZoneElement;
	private orderedTasks: LinkedList <TaskElement> = new BasicLinkedList <TaskElement>;
	private deleteTaskCallback: ((taskId: number) => Promise <void>) | undefined;

	constructor (containerId: string, name: string, category: TaskSection) {
		this.element = new TaskZoneElement (containerId, name);
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

	public deleteTask (taskId: number) {
		if (this.deleteTaskCallback) {
			this.deleteTaskCallback (taskId);
		}
	}

	public setDeleteTaskCallback (callbackfn: (taskId: number) => Promise <void>): void {
		this.deleteTaskCallback = callbackfn;
	}
}
