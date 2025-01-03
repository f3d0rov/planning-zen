import { BasicTask } from "../../source/tasks/basic_task";
import { Task, TaskSection } from "../../source/tasks/task";

test (
	"Construction",
	() => {
		const taskName: string = "Hello";
		const taskSection: TaskSection = "do";
		const basicTask: Task = new BasicTask (taskName, taskSection);
		expect (basicTask.getName()).toEqual (taskName);
		expect (basicTask.getSection()).toEqual (taskSection);
	}
);

test (
	"Name setter",
	() => {
		const basicTask: Task = new BasicTask ("Hello", "unset");
		const newName: string = "World";
		basicTask.setName (newName);
		expect (basicTask.getName()).toEqual (newName);
	}
);

test (
	"Section setter",
	() => {
		const basicTask: Task = new BasicTask ("Hello", "unset");
		const newSection: TaskSection = "schedule";
		basicTask.setSection (newSection);
		expect (basicTask.getSection()).toEqual (newSection);
	}
);

test (
	"Order index setter",
	() => {
		const basicTask: Task = new BasicTask ("Hello", "unset");
		const newIndex: number = 31173;
		basicTask.setOrderIndex (newIndex);
		expect (basicTask.getOrderIndex()).toEqual (newIndex);
	}
);

test (
	"Unicode symbols in names",
	() => {
		const taskName: string = "Привет, Мир!";
		const basicTask: Task = new BasicTask (taskName, "unset");
		expect (basicTask.getName()).toEqual (taskName);
	}
);
