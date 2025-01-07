
import { assert } from "chai";

describe ('Basic test', () => {
	it ("Running in browser?", () => {
		assert.exists (window);
	})

	it ("Simple test", () => {
		assert.equal (2 + 2, 4);
	})
});
