
import { assert } from "chai";
import { BasicTask } from "../../source/tasks/basic_task";
import { CachedTask } from "../../source/tasks/cached_task";
import { Task, TaskSection } from "../../source/tasks/task";

describe (
	"CachedTask",

	function () {
		const initialName: string = "Hello";
		let underlyingTask: Task | undefined;
		let cachedTask: CachedTask | undefined;

		it ("Creating an underlying task", function () {
				underlyingTask = new BasicTask (initialName);
		});

		it ("Constructing a cached task", function () {
			cachedTask = new CachedTask (underlyingTask!);
			assert.equal (cachedTask.getUnderlyingTask(), underlyingTask);
		});

		it ("Name manipulation", function () {
			const testedName = "aisdgfuhuiasgdh";
			cachedTask!.setName (testedName);
			assert.equal (cachedTask!.getName(), testedName);
			assert.equal (underlyingTask!.getName(), testedName);
		});

		it ("Section manipulation", function () {
			const testedSection: TaskSection = 'schedule';
			cachedTask!.setSection (testedSection);
			assert.equal (cachedTask!.getSection(), testedSection);
			assert.equal (underlyingTask!.getSection(), testedSection);
		});

		it ("Order index manipulation", function () {
			const testedIndex: number = 434;
			cachedTask!.setOrderIndex (testedIndex);
			assert.equal (cachedTask!.getOrderIndex(), testedIndex);
			assert.equal (underlyingTask!.getOrderIndex(), testedIndex);
		});
	}
)