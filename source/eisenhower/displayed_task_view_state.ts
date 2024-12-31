
import { BaseTaskViewState, TaskViewData } from "./task_view";

export class DisplayedTaskViewState extends BaseTaskViewState {
	public override buildElement (data: TaskViewData): void {
		data.element.innerHTML = data.info.getName();
	}
}
