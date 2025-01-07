
import { assert } from "chai";
import { IndexedDBTaskProvider } from "../../source/indexed_db_tasks/indexed_db_task_provider";
import { IndexedDBTask } from "../../source/indexed_db_tasks/indexed_db_task";
import { IndexedDbData } from "../../source/indexed_db_tasks/indexed_db_data";


async function clearDatabase (): Promise <void> {
	const deleteDb = window.indexedDB.deleteDatabase (IndexedDbData.dbName);
	return new Promise ((resolve, reject) => {
		deleteDb.onsuccess = () => resolve();
	});
}


describe ('IndexedDBTaskProvider', function () {
	let taskProvider: IndexedDBTaskProvider | undefined;

	it ("Opening DB", async function () {
		await clearDatabase();
		taskProvider = new IndexedDBTaskProvider;
		await taskProvider.openDB();
	});

	it ("Restoring tasks in a newly created DB", async function () {
		const tasks = await taskProvider!.restoreTasks();
		assert.isEmpty (tasks);
	});

	let createdTask: IndexedDBTask | undefined;

	it ("Creating a task", async function () {
		createdTask = await taskProvider!.createNewTask();
		assert.exists (createdTask);
	});

	it ("Restoring a task after it was created", async function () {
		const tasks = await taskProvider!.restoreTasks();
		assert.lengthOf (tasks, 1);
	});

	it ("Restoring a task in another instance of IndexedDBTaskProvider (emulation of a new page)", async function () {
		const newTaskProvider = new IndexedDBTaskProvider;
		await newTaskProvider.openDB();
		const tasks = await newTaskProvider.restoreTasks();
		assert.lengthOf (tasks, 1);
	});

	it ("Deleting a task", async function () {
		await taskProvider!.deleteTask (createdTask!);
		const tasks = await taskProvider!.restoreTasks();
		assert.isEmpty (tasks);
	});

	it ("Closing the DB", function () {
		taskProvider!.closeDb();
	});
});
