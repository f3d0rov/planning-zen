
import { assert } from "chai";
import { BasicTask } from "../../source/tasks/basic_task";
import { Task, TaskSection } from "../../source/tasks/task";

describe (
	"BasicTask",

	() => {
		it (
			"Construction",
			() => {
				const taskName: string = "Hello";
				const taskSection: TaskSection = "do";
				const basicTask: Task = new BasicTask (taskName, taskSection);
				assert.equal (basicTask.getName(), taskName);
				assert.equal (basicTask.getSection(), taskSection);
			}
		);
		
		it (
			"Name setter",
			() => {
				const basicTask: Task = new BasicTask ("Hello", "unset");
				const newName: string = "World";
				basicTask.setName (newName);
				assert.equal (basicTask.getName(), newName);
			}
		);
		
		it (
			"Section setter",
			() => {
				const basicTask: Task = new BasicTask ("Hello", "unset");
				const newSection: TaskSection = "schedule";
				basicTask.setSection (newSection);
				assert.equal (basicTask.getSection(), newSection);
			}
		);
		
		it (
			"Order index setter",
			() => {
				const basicTask: Task = new BasicTask ("Hello", "unset");
				const newIndex: number = 31173;
				basicTask.setOrderIndex (newIndex);
				assert.equal (basicTask.getOrderIndex(), newIndex);
			}
		);
		
		it (
			"Unicode symbols in names",
			() => {
				const taskName: string = "Привет, Мир!";
				const basicTask: Task = new BasicTask (taskName, "unset");
				assert.equal (basicTask.getName(), taskName);
			}
		);
		
	}
)