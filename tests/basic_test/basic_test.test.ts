
import { assert } from "chai";

describe ('Basic test', () => {
	it ("should return 4's index", () => {
		assert.equal ([1, 2, 4].indexOf (4), 2);
	})
});
