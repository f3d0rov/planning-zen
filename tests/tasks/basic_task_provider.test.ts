
import { BasicTaskProvider } from "../../source/tasks/basic_task_provider";

test (
	"Construction",
	() => {
		const taskProvider = new BasicTaskProvider;
	}
);

test (
	"Restore tasks - list of initial tasks",
	() => {
		const taskProvider = new BasicTaskProvider;
		const tasks = taskProvider.restoreTasks();
		expect (tasks).toHaveLength (6);
	}
);

test (
	"Create tasks",
	() => {
		const taskProvider = new BasicTaskProvider;
		const newTask = taskProvider.createNewTask();
		const newTaskName = "Hello";
		newTask.setName (newTaskName);
		expect (newTask.getName()).toEqual (newTaskName);
	}
);
