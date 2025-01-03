
import { BasicPoint } from "../common/basic_point";


export class ThresholdBox {
	private rect: DOMRect;

	constructor (rect: DOMRect) {
		this.rect = rect;
	}

	public static fromElement (element: HTMLElement): ThresholdBox {
		const box = element.getBoundingClientRect();
		return new ThresholdBox (box);
	}

	public isAfter (point: BasicPoint): boolean {
		const pointIsBelow = point.y > this.rect.bottom;
		if (pointIsBelow) return false;

		const pointIsAbove = point.y < this.rect.top;
		if (pointIsAbove) return true;
		
		return this.isPointAboveDiagonal (point);
	}

	private isPointAboveDiagonal (point: BasicPoint) {
		const diagonalYAtThreshX = this.getDiagonalYAtX (point.x);
		const pointAboveDiagonal =  point.y < diagonalYAtThreshX;
		return pointAboveDiagonal;
	}

	private getDiagonalYAtX (x: number): number {
		return this.rect.bottom - this.rect.height / this.rect.width * (x - this.rect.left);
	}
}
