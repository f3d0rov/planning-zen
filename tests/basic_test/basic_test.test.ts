
import { assert } from "chai";

describe ('Basic test', function () {
	it ("Running in browser?", function () {
		assert.exists (window);
	})

	it ("Simple test", function () {
		assert.equal (2 + 2, 4);
	})
});
