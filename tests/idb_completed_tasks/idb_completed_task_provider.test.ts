
import { assert } from "chai";
import { IdbCompletedTaskProvider } from "../../source/idb_completed_tasks/idb_completed_task_provider";
import { IdbOpener } from "../../source/idb/idb_opener";
import { CompletedTaskProvider } from "../../source/completed_tasks/completed_task_provider";
import { BasicTask } from '../../source/tasks/basic_task';
import { CachedTask } from '../../source/tasks/cached_task';
import { CompletedTask } from "../../source/completed_tasks/comleted_task";
import { clearDatabase } from "../indexeddb";


describe ('IdbCompletedTaskProvider', function () {
	let idbCompletedTaskProvider: CompletedTaskProvider | undefined;

	it ("Clearing the database before testing", async function () {
		await clearDatabase();
	});

	it ("Initializing an IdbCompletedTaskProvider", async function () {
		const dbOpener = new IdbOpener;
		idbCompletedTaskProvider = new IdbCompletedTaskProvider (dbOpener);
		assert.exists (idbCompletedTaskProvider);
		await (idbCompletedTaskProvider as IdbCompletedTaskProvider).openDb();
	});

	it ("Completing a task - task name maintained", async function () {
		const task = new BasicTask ("Travel the world");
		const cachedTask = new CachedTask (task);
		await cachedTask.cacheInfo();
		const completedTask = await idbCompletedTaskProvider!.completeTask (cachedTask);

		assert.exists (completedTask);
		assert.equal (completedTask.getName(), task.getName());
	});

	it ("Completing a task - current time is set as the completion time", async function () {
		const task = new BasicTask ("Meet new people");
		const cachedTask = new CachedTask (task);
		await cachedTask.cacheInfo();

		const beforeTaskCompleted = new Date;
		const completedTask = await idbCompletedTaskProvider!.completeTask (cachedTask);
		const afterTaskCompleted = new Date;

		assert.exists (completedTask);
		assert.isTrue (beforeTaskCompleted <= completedTask.getCompletionDate());
		assert.isTrue (completedTask.getCompletionDate() <= afterTaskCompleted);
	});

	it ("Restoring completed tasks in the same instance", async function () {
		const tasks: Array <CompletedTask> = await idbCompletedTaskProvider!.restoreCompletedTasks();
		assert.lengthOf (tasks, 2);
	});

	it ("Closing the DB", function () {
		(idbCompletedTaskProvider as IdbCompletedTaskProvider)!.closeDb();
	});

	it ("Creating a new instance (imitating reopened app)", async function () {
		const dbOpener = new IdbOpener;
		idbCompletedTaskProvider = new IdbCompletedTaskProvider (dbOpener);
		assert.exists (idbCompletedTaskProvider);
		await (idbCompletedTaskProvider as IdbCompletedTaskProvider).openDb();
	});

	it ("Restoring completed tasks in a new instance", async function () {
		const tasks: Array <CompletedTask> = await idbCompletedTaskProvider!.restoreCompletedTasks();
		assert.lengthOf (tasks, 2);
	});

	it ("Deleting a task", async function () {
		const tasks: Array <CompletedTask> = await idbCompletedTaskProvider!.restoreCompletedTasks();
		for (let task of tasks) {
			await idbCompletedTaskProvider?.deleteCompletedTask (task);
		}
		const postDeletionTasks = await idbCompletedTaskProvider!.restoreCompletedTasks();
		assert.isEmpty (postDeletionTasks);
	});
	
	it ("Closing the DB", function () {
		(idbCompletedTaskProvider as IdbCompletedTaskProvider)!.closeDb();
	});
});
