
import { cloneTemplateById } from "../common/common";
import { CompletedTask } from "../completed_tasks/comleted_task";
import { CompletedTasksHTML } from "./completed_tasks_html";


export class DailyTasks {
	private element: HTMLElement;
	private dateField: HTMLElement;
	private countField: HTMLElement;
	private tasksList: HTMLElement;

	private tasks: Array <CompletedTask>;

	constructor (tasks: Array <CompletedTask>) {
		this.tasks = tasks;

		this.element = cloneTemplateById (CompletedTasksHTML.taskGroupTemplateId);
		this.dateField = this.element.querySelector (`.${CompletedTasksHTML.dateLabelClass}`) as HTMLElement;
		this.countField = this.element.querySelector (`.${CompletedTasksHTML.taskCountLabelClass}`) as HTMLElement;
		this.tasksList = this.element.querySelector (`.${CompletedTasksHTML.dayTaskContainerClass}`) as HTMLElement;

		this.setupElement();
	}

	public getElement (): HTMLElement {
		return this.element;
	}

	private setupElement (): void {
		this.dateField.innerText = this.getDateString();
		this.countField.innerText = this.getCountString();
		this.createTaskElements();
	}

	private createTaskElements () {
		for (let i of this.tasks) {
			const element = this.createElementForTask (i);
			this.tasksList.appendChild (element);
		}
	}

	private createElementForTask (task: CompletedTask): HTMLElement {
		const taskElement = cloneTemplateById (CompletedTasksHTML.dayTaskTemplateId);
		taskElement.innerText = task.getName();
		return taskElement;
	}

	private getDateString (): string {
		return this.tasks.at (0)!.getCompletionDate().toDateString();
	}

	private getCountString (): string {
		if (this.tasks.length === 1) {
			return "1 task";
		} else {
			return `${this.tasks.length} tasks`;
		}
	}
}
