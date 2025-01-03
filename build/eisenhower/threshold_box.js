export class ThresholdBox {
    constructor(rect) {
        this.rect = rect;
    }
    static fromElement(element) {
        const box = element.getBoundingClientRect();
        return new ThresholdBox(box);
    }
    isAfter(point) {
        const pointIsBelow = point.y > this.rect.bottom;
        if (pointIsBelow)
            return false;
        const pointIsAbove = point.y < this.rect.top;
        if (pointIsAbove)
            return true;
        return this.isPointAboveDiagonal(point);
    }
    isPointAboveDiagonal(point) {
        const diagonalYAtThreshX = this.getDiagonalYAtX(point.x);
        const pointAboveDiagonal = point.y < diagonalYAtThreshX;
        return pointAboveDiagonal;
    }
    getDiagonalYAtX(x) {
        return this.rect.bottom - this.rect.height / this.rect.width * (x - this.rect.left);
    }
}
//# sourceMappingURL=threshold_box.js.map