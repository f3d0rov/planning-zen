
import { CompletedTask } from '../../source/completed_tasks/comleted_task';
import { BasicCompletedTask } from '../../source/completed_tasks/basic_comleted_task';
import { assert } from "chai";


describe (
	"BasicCompletedTask",

	() => {
		const taskName = "Do stuff";
		const taskDate = new Date ('1968-05-17T01:20:30');
		let aCompletedTask: CompletedTask | undefined;

		it ("Construction", function () {
			aCompletedTask = new BasicCompletedTask (taskName, taskDate);
			assert.exists (aCompletedTask);
		});

		it ("Get name of the completed task", function () {
			assert.equal (aCompletedTask!.getName(), taskName);
		});

		it ("Get comletion date of a task", function () {
			assert.equal (aCompletedTask!.getCompletionDate(), taskDate);
		})
	}
);
