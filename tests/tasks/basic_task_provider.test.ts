
import { assert } from "chai";
import { BasicTaskProvider } from "../../source/tasks/basic_task_provider";

describe (
	"BasicTaskProvider",
	() => {
		it (
			"Construction",
			() => {
				const taskProvider = new BasicTaskProvider;
			}
		);
		
		it (
			"Restore tasks - list of initial tasks",
			() => {
				const taskProvider = new BasicTaskProvider;
				const tasks = taskProvider.restoreTasks();
				assert.lengthOf (tasks, 6);
			}
		);
		
		it (
			"Create tasks",
			() => {
				const taskProvider = new BasicTaskProvider;
				const newTask = taskProvider.createNewTask();
				const newTaskName = "Hello";
				newTask.setName (newTaskName);
				assert.equal (newTask.getName(), newTaskName);
			}
		);		
	}
);
