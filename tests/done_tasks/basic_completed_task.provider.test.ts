
import { CompletedTask } from '../../source/completed_tasks/comleted_task';
import { BasicCompletedTaskProvider } from '../../source/completed_tasks/basic_completed_task_provider';
import { CompletedTaskProvider } from '../../source/completed_tasks/completed_task_provider';
import { BasicTask } from '../../source/tasks/basic_task';
import { CachedTask } from '../../source/tasks/cached_task';
import { assert } from "chai";


describe (
	"BasicCompletedTaskProvider",

	() => {
		const task = new BasicTask ("Do it");
		let aCompletedTaskProvider: CompletedTaskProvider | undefined;
		let aCompletedTask: CompletedTask | undefined;
		let beforeCompletingTask: Date | undefined;


		it ("Construction", function () {
			aCompletedTaskProvider = new BasicCompletedTaskProvider;
			assert.exists (aCompletedTaskProvider);
		});

		it ("No tasks are restored immediately after construction", async function () {
			const tasks: Array <CompletedTask> = await aCompletedTaskProvider!.restoreCompletedTasks();
			assert.isEmpty (tasks);
		});

		it ("Marking a task as complete", async function () {
			const aCachedTask = new CachedTask (task);
			await aCachedTask.cacheInfo();

			beforeCompletingTask = new Date();

			aCompletedTask = await aCompletedTaskProvider!.completeTask (aCachedTask);
		});

		it ("Completed task has the name of the source task", function () {
			assert.equal (aCompletedTask!.getName(), task.getName());
		});

		it ("Completed task contains the time of when it was completed", function () {
			const afterCompletingTask = new Date();
			assert.isTrue (beforeCompletingTask! <= aCompletedTask!.getCompletionDate());
			assert.isTrue (aCompletedTask!.getCompletionDate() <= afterCompletingTask);
		});

		it ("Created task can be restored", async function () {
			const tasks: Array <CompletedTask> = await aCompletedTaskProvider!.restoreCompletedTasks();
			assert.lengthOf (tasks, 1);
			const theCompletedTask = tasks.at (0)!;
			assert.deepEqual (theCompletedTask, aCompletedTask);
		});

		it ("Created task can be deleted", async function () {
			aCompletedTaskProvider!.deleteCompletedTask (aCompletedTask!);
			const tasks: Array <CompletedTask> = await aCompletedTaskProvider!.restoreCompletedTasks();
			assert.isEmpty (tasks);
		});

		it ("Multiple created tasks can be restored", async function () {
			const newTasks = [ "Greet world", "Count bottles", "Fizz some buzz" ];
			
			for (let taskName of newTasks) {
				const task = new BasicTask (taskName);
				const cached = new CachedTask (task);
				aCompletedTaskProvider!.completeTask (cached);
			}

			const tasks: Array <CompletedTask> = await aCompletedTaskProvider!.restoreCompletedTasks();
			assert.lengthOf (tasks, newTasks.length);
		});
	}
);
