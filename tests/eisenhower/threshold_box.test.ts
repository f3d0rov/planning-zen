// require("fix-esm").register();

import { ThresholdBox } from '../../source/eisenhower/threshold_box';
import { BasicPoint } from '../../source/common/basic_point';
import { assert } from "chai";


// class DOMRect {
// 	x: number = 0;
// 	y: number = 0;
// 	width: number = 10;
// 	height: number = 10;

// 	top: number = 0;
// 	bottom: number = 10;
// 	left: number = 0;
// 	right: number = 10;

// 	constructor (x: number, y: number, w: number, h: number) {
// 		this.x = x;
// 		this.y = y;
// 		this.width = w;
// 		this.height = h;

// 		this.left = x;
// 		this.right = x + w;
// 		this.top = y;
// 		this.bottom = y + h;
// 	}

// 	toJSON () {
// 		return JSON.stringify (this);
// 	}
// };

function createTestBox_0_0_10_10 (): ThresholdBox {
	const rect = new DOMRect (0, 0, 10, 10);
	return new ThresholdBox (rect);
}

describe (
	'ThresholdBox',
	() => {
		it (
			"Point far back",
			() => {
				const box = createTestBox_0_0_10_10();
				const point = new BasicPoint (-5, -5);
				assert.equal (box.isAfter (point), true);
			}
		);

		it (
			"Point above",
			() => {
				const box = createTestBox_0_0_10_10();
				const point = new BasicPoint (5, -5);
				assert.equal (box.isAfter (point), true);
			}
		);

		it (
			"Point above, x infront",
			() => {
				const box = createTestBox_0_0_10_10();
				const point = new BasicPoint (15, -5);
				assert.equal (box.isAfter (point), true);
			}
		);


		it (
			"Point to left",
			() => {
				const box = createTestBox_0_0_10_10();
				const point = new BasicPoint (-5, 5);
				assert.equal (box.isAfter (point), true);
			}
		);


		it (
			"Point to left, y below",
			() => {
				const box = createTestBox_0_0_10_10();
				const point = new BasicPoint (-5, 15);
				assert.equal (box.isAfter (point), false);
			}
		);

		it (
			"Point above diagonal",
			() => {
				const box = createTestBox_0_0_10_10();
				const point = new BasicPoint (2, 2);
				assert.equal (box.isAfter (point), true);
			}
		);

		it (
			"Point below diagonal",
			() => {
				const box = createTestBox_0_0_10_10();
				const point = new BasicPoint (8, 8);
				assert.equal (box.isAfter (point), false);
			}
		);

		it (
			"Point to the right & below",
			() => {
				const box = createTestBox_0_0_10_10();
				const point = new BasicPoint (15, 15);
				assert.equal (box.isAfter (point), false);
			}
		);

		it (
			"Point to the right",
			() => {
				const box = createTestBox_0_0_10_10();
				const point = new BasicPoint (15, 5);
				assert.equal (box.isAfter (point), false);
			}
		);

		it (
			"Point below",
			() => {
				const box = createTestBox_0_0_10_10();
				const point = new BasicPoint (5, 15);
				assert.equal (box.isAfter (point), false);
			}
		);


		it (
			"ThresholdBox: left below",
			() => {
				const box = createTestBox_0_0_10_10();
				const point = new BasicPoint (-5, 12);
				assert.equal (box.isAfter (point), false);
			}
		);

		it (
			"ThresholdBox: left far below",
			() => {
				const box = createTestBox_0_0_10_10();
				const point = new BasicPoint (-5, 18);
				assert.equal (box.isAfter (point), false);
			}
		);
	}
)