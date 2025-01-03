
import { BasicPoint } from "../common/basic_point";
import { TaskSection } from "../tasks/task";
import { BaseTaskZoneData } from "./base_task_zone_data";
import { CategoryChangeProvider } from "./eisenhower_matrix_task_editor";
import { TaskDropZone } from "./task_drop_zone";
import { ThresholdBox } from "./threshold_box";


export class TaskZoneDropHandler implements CategoryChangeProvider {
	private data: BaseTaskZoneData;
	private dropZone: TaskDropZone;
	private catChangeCallback: (taskId: number, newCat: TaskSection, newIndex: number) => void = () => {};

	constructor (baseData: BaseTaskZoneData) {
		this.data = baseData;
		const contents = this.data.getContents();
		this.dropZone = new TaskDropZone (contents);
		this.setupEvents();
	}

	private setupEvents () {
		this.dropZone.onTaskDrop ((taskId: number, dropPos: BasicPoint) => this.handleTaskDrop (taskId, dropPos));
		this.dropZone.onTaskEnter (() => this.data.getElement().highlightDropZone());
		this.dropZone.onTaskLeave (() => this.data.getElement().dimDropZone());
	}

	private handleTaskDrop (taskId: number, dropPosition: BasicPoint): void {
		this.data.getElement().dimDropZone();
		const droppedTaskIndex = this.getIndexForDroppedTask (dropPosition);
		this.catChangeCallback (taskId, this.data.getCategory(), droppedTaskIndex);
	}

	private getIndexForDroppedTask (position: BasicPoint): number {
		const iterator = this.data.getTasks().iterate();
		let lastIndex = 0;
		while (iterator.hasNext()) {
			const taskElement = iterator.getNext();
			const taskHTMLElement = taskElement.getElement();
			const taskThreshold = ThresholdBox.fromElement (taskHTMLElement);
			lastIndex = taskElement.getTask().getOrderIndex();

			if (taskThreshold.isAfter (position)) {
				return lastIndex;
			}
		}
		return lastIndex + 1;
	}

	public setCategoryChangeCallback (callbackfn: (taskId: number, newCategory: TaskSection, newIndex: number) => any): void {
		this.catChangeCallback = callbackfn;
	}
}
