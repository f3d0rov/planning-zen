
import { BasicPoint, ThresholdBox } from '../../source/eisenhower/task_zone';


class DOMRect {
	x: number = 0;
	y: number = 0;
	width: number = 10;
	height: number = 10;

	top: number = 0;
	bottom: number = 10;
	left: number = 0;
	right: number = 10;

	constructor (x: number, y: number, w: number, h: number) {
		this.x = x;
		this.y = y;
		this.width = w;
		this.height = h;

		this.left = x;
		this.right = x + w;
		this.top = y;
		this.bottom = y + h;
	}

	toJSON () {
		return JSON.stringify (this);
	}
};

function createTestBox_0_0_10_10 (): ThresholdBox {
	const rect = new DOMRect (0, 0, 10, 10);
	return new ThresholdBox (rect);
}


test (
	"ThresholdBox: point far back",
	() => {
		const box = createTestBox_0_0_10_10();
		const point = new BasicPoint (-5, -5);
		expect (box.isAfter (point)).toEqual (true);
	}
);

test (
	"ThresholdBox: point above",
	() => {
		const box = createTestBox_0_0_10_10();
		const point = new BasicPoint (5, -5);
		expect (box.isAfter (point)).toEqual (true);
	}
);

test (
	"ThresholdBox: point above, x infront",
	() => {
		const box = createTestBox_0_0_10_10();
		const point = new BasicPoint (15, -5);
		expect (box.isAfter (point)).toEqual (true);
	}
);


test (
	"ThresholdBox: point to left",
	() => {
		const box = createTestBox_0_0_10_10();
		const point = new BasicPoint (-5, 5);
		expect (box.isAfter (point)).toEqual (true);
	}
);


test (
	"ThresholdBox: point to left, y below",
	() => {
		const box = createTestBox_0_0_10_10();
		const point = new BasicPoint (-5, 15);
		expect (box.isAfter (point)).toEqual (false);
	}
);

test (
	"ThresholdBox: point above diagonal",
	() => {
		const box = createTestBox_0_0_10_10();
		const point = new BasicPoint (2, 2);
		expect (box.isAfter (point)).toEqual (true);
	}
);

test (
	"ThresholdBox: point below diagonal",
	() => {
		const box = createTestBox_0_0_10_10();
		const point = new BasicPoint (8, 8);
		expect (box.isAfter (point)).toEqual (false);
	}
);

test (
	"ThresholdBox: point to the right & below",
	() => {
		const box = createTestBox_0_0_10_10();
		const point = new BasicPoint (15, 15);
		expect (box.isAfter (point)).toEqual (false);
	}
);

test (
	"ThresholdBox: point to the right",
	() => {
		const box = createTestBox_0_0_10_10();
		const point = new BasicPoint (15, 5);
		expect (box.isAfter (point)).toEqual (false);
	}
);

test (
	"ThresholdBox: point below",
	() => {
		const box = createTestBox_0_0_10_10();
		const point = new BasicPoint (5, 15);
		expect (box.isAfter (point)).toEqual (false);
	}
);


test (
	"ThresholdBox: left below",
	() => {
		const box = createTestBox_0_0_10_10();
		const point = new BasicPoint (-5, 12);
		expect (box.isAfter (point)).toEqual (false);
	}
);

test (
	"ThresholdBox: left far below",
	() => {
		const box = createTestBox_0_0_10_10();
		const point = new BasicPoint (-5, 18);
		expect (box.isAfter (point)).toEqual (false);
	}
);
