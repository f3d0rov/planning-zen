
import { assert } from "chai";
import { IndexedDBTask } from "../../source/indexed_db_tasks/indexed_db_task";
import { IndexedDbOpener } from "../../source/indexed_db_tasks/indexed_db_opener";
import { TaskSection } from "../../source/tasks/task";


describe ('IndexedDBTask', function () {
	let db: IDBDatabase | undefined;
	let task: IndexedDBTask | undefined;

	it ("Opening a database for testing", async function () {
		const dbOpener = new IndexedDbOpener;
		const result = await dbOpener.openDb();
		db = result.db;
		assert.exists (db);
	});

	it ("Creating a new task", async function () {
		task = await IndexedDBTask.createNew (db!);
		assert.exists (task);
	});

	it ("Restoring a task", function () {
		const restoredKey = task!.getKey();
		const restoredTask = IndexedDBTask.restoreByKey (db!, restoredKey);
		assert.exists (restoredTask);
		assert.deepStrictEqual (task!.getKey(), restoredTask.getKey());
	});

	it ("Name manipulation", async function () {
		const testedName: string = "Random task name";
		await task!.setName (testedName);
		const storedName: string = await task!.getName();
		assert.equal (storedName, testedName);
	});

	it ("Unicode names", async function () {
		const testedName: string = "Имя для таксы \u{1F415} 你好世界";
		await task!.setName (testedName);
		const storedName: string = await task!.getName();
		assert.equal (storedName, testedName);
	});

	it ("Section manipulation", async function () {
		const testedSection: TaskSection = 'delegate';
		await task!.setSection (testedSection);
		const storedSection: TaskSection = await task!.getSection();
		assert.equal (storedSection, testedSection);
	});

	it ("Order index manipulation", async function () {
		const testedIndex: number = 123;
		await task!.setOrderIndex (testedIndex);
		const storedIndex: number = await task!.getOrderIndex();
		assert.equal (storedIndex, testedIndex);
	});

	it ("Closing the DB", function () {
		db!.close();
	});
});
