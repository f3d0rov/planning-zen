
import { getElementById } from "../common/common";
import { CompletedTask } from "../completed_tasks/comleted_task";
import { CompletedTaskProvider } from "../completed_tasks/completed_task_provider";
import { CompletedTasksHTML } from "./completed_tasks_html";
import { DailyTasks } from "./daily_tasks";


export class CompletedTasksOverlay {
	private taskProvider: CompletedTaskProvider;

	private overlayElement: HTMLElement;
	private noItemsMessageElement: HTMLElement;
	private tasksContainer: HTMLElement;

	constructor (completedTasksProvider: CompletedTaskProvider) {
		this.taskProvider = completedTasksProvider;

		this.overlayElement = getElementById (CompletedTasksHTML.overlayId);
		this.noItemsMessageElement = getElementById (CompletedTasksHTML.noItemsMessageId);
		this.tasksContainer = getElementById (CompletedTasksHTML.completedTasksBoxId);

		this.setupEvents();
	}

	public async show (): Promise <void> {
		await this.rebuildCompletedTasks();
		this.overlayElement.classList.remove (CompletedTasksHTML.hiddenClass);
	}

	public hide (): void {
		this.overlayElement.classList.add (CompletedTasksHTML.hiddenClass);
	}

	private setupEvents (): void {
		const closeButton = getElementById (CompletedTasksHTML.closeOverlayButtonId);
		closeButton.addEventListener ("click", ev => this.hide());
		this.overlayElement.addEventListener ("click", ev => {
			if (ev.target === this.overlayElement) this.hide();
		});
	}

	private async rebuildCompletedTasks (): Promise <void> {
		this.clearCompletedTasks();
		await this.constructCompletedTasks();
	}

	private clearCompletedTasks (): void {
		this.tasksContainer.innerHTML = "";
		this.hideNoCompletedTasksMessage();
	}

	private async constructCompletedTasks (): Promise <void> {
		const sortedTasks = await this.getSortedTasks();
		const groupedTasks = this.groupTasksByDates (sortedTasks);
		this.createElementsForTasks (groupedTasks);

		if (sortedTasks.length == 0) {
			this.showNoCompletedTasksMessage();
		}
	}

	private async getSortedTasks (): Promise <Array <CompletedTask>> {
		const tasks = await this.taskProvider.restoreCompletedTasks();
		tasks.sort ((a: CompletedTask, b: CompletedTask) => {
			return a.getCompletionDate().getTime() - b.getCompletionDate().getTime();
		});
		return tasks;
	}

	private groupTasksByDates (sortedTasks: Array <CompletedTask>): Array <Array <CompletedTask>> {
		const groupedTasks = new Array <Array <CompletedTask>>;
		let lastDate = "";

		for (let task of sortedTasks) {
			const date = task.getCompletionDate().toDateString();
			if (date !== lastDate) {
				groupedTasks.push (new Array <CompletedTask>);
				lastDate = date;
			}
			groupedTasks.at (groupedTasks.length - 1)!.push (task);
		}

		return groupedTasks;
	}

	private createElementsForTasks (groupedTasks: Array <Array <CompletedTask>>): void {
		for (let dailyTaskList of groupedTasks) {
			const dailyTasks = new DailyTasks (dailyTaskList);
			this.tasksContainer.appendChild (dailyTasks.getElement());
		}
	}

	private showNoCompletedTasksMessage () {
		this.noItemsMessageElement.classList.remove (CompletedTasksHTML.hiddenClass);
	}

	private hideNoCompletedTasksMessage () {
		this.noItemsMessageElement.classList.add (CompletedTasksHTML.hiddenClass);
	}
}
