import { BasicTask } from "./basic_task";
export class BasicTaskProvider {
    createNewTask() {
        return new BasicTask("", "unset");
    }
    restoreTasks() {
        return this.getInitialTasks();
    }
    getInitialTasks() {
        const tasks = new Array;
        tasks.push(new BasicTask("Move tasks by dragging them with your mouse", "do", 1));
        tasks.push(new BasicTask("Create new tasks by moving the \"+\" button onto the board", "do", 2));
        tasks.push(new BasicTask("Complete tasks by moving them to the \"Done\" box", "schedule", 1));
        tasks.push(new BasicTask("Remove tasks by moving them to the \"Remove\" box", "delegate", 1));
        tasks.push(new BasicTask("Double-click a task to edit it", "delegate", 2));
        tasks.push(new BasicTask("Visit the project's repository by clicking the button at the top of the page", "delete", 1));
        return tasks;
    }
}
//# sourceMappingURL=basic_task_provider.js.map