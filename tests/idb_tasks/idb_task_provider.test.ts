
import { assert } from "chai";
import { IdbTaskProvider } from "../../source/idb_tasks/idb_task_provider";
import { IdbTask } from "../../source/idb_tasks/idb_task";
import { IdbOpener } from "../../source/idb/idb_opener";
import { clearDatabase } from "../indexeddb";


describe ('IdbTaskProvider', function () {
	let taskProvider: IdbTaskProvider | undefined;

	it ("Clearing the database before testing", async function () {
		await clearDatabase();
	});

	it ("Opening DB", async function () {
		const dbOpener = new IdbOpener;
		taskProvider = new IdbTaskProvider (dbOpener);
		await taskProvider.openDB();
	});

	it ("Restoring tasks in a newly created DB", async function () {
		const tasks = await taskProvider!.restoreTasks();
		assert.isEmpty (tasks);
	});

	let createdTask: IdbTask | undefined;

	it ("Creating a task", async function () {
		createdTask = await taskProvider!.createNewTask();
		assert.exists (createdTask);
	});

	it ("Restoring a task after it was created", async function () {
		const tasks = await taskProvider!.restoreTasks();
		assert.lengthOf (tasks, 1);
	});

	it ("Restoring a task in another instance of IdbTaskProvider (emulation of a new page)", async function () {
		const dbOpener = new IdbOpener;
		const newTaskProvider = new IdbTaskProvider (dbOpener);
	
		await newTaskProvider.openDB();
		const tasks = await newTaskProvider.restoreTasks();
		newTaskProvider!.closeDb();
		
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
