import { BaseTaskViewState } from "./task_view";
export class DisplayedTaskViewState extends BaseTaskViewState {
    buildElement(data) {
        data.element.innerHTML = data.info.getName();
    }
}
//# sourceMappingURL=displayed_task_view_state.js.map