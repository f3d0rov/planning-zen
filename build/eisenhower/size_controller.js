import { BasicPoint } from "../common/basic_point";
import { getElementById } from "../common/common";
class SizeControllerHTML {
    static taskBoxSelector() {
        return `.${SizeControllerHTML.taskBoxClass} > *`;
    }
    static verticalUtilBoxSelector() {
        return `.${SizeControllerHTML.utilityBoxClass}.${SizeControllerHTML.verticalClass}`;
    }
    static horizontalUtilBoxSelector() {
        return `.${SizeControllerHTML.utilityBoxClass}.${SizeControllerHTML.horizontalClass}`;
    }
}
SizeControllerHTML.freespaceId = "content";
SizeControllerHTML.containerId = "eisenhower";
SizeControllerHTML.matrixClass = "eisenhower_matrix";
SizeControllerHTML.taskBoxClass = "matrix_task_box";
SizeControllerHTML.utilityBoxClass = "matrix_utility_box";
SizeControllerHTML.verticalClass = "vertical";
SizeControllerHTML.horizontalClass = "horizontal";
SizeControllerHTML.hiddenUtilBoxClass = "template";
export class SizeController {
    constructor() {
        this.taskBoxes = new Array;
        this.verticalUtilBoxes = new Array;
        this.horizontalUtilBoxes = new Array;
        this.initElements();
        window.addEventListener('resize', ev => this.handleResize(ev));
    }
    initElements() {
        this.initUniqueElements();
        this.initRepeatedElements();
    }
    initUniqueElements() {
        this.freespace = getElementById(SizeControllerHTML.freespaceId);
        this.container = getElementById(SizeControllerHTML.containerId);
        this.matrix = this.freespace.querySelector(`.${SizeControllerHTML.matrixClass}`);
    }
    initRepeatedElements() {
        this.grabElements(SizeControllerHTML.taskBoxSelector(), this.taskBoxes);
        this.grabElements(SizeControllerHTML.verticalUtilBoxSelector(), this.verticalUtilBoxes);
        this.grabElements(SizeControllerHTML.horizontalUtilBoxSelector(), this.horizontalUtilBoxes);
    }
    grabElements(selector, into) {
        const elements = this.container.querySelectorAll(selector);
        elements.forEach(elem => {
            into.push(elem);
        });
        console.log(`Grabbed ${into.length} elements`);
    }
    handleResize(event) {
        this.resize();
    }
    resize() {
        console.log('resize!');
        const freeSpace = this.getFreeSpace();
        const orientation = freeSpace.x > freeSpace.y ? 'landscape' : 'portrait';
        console.log(`Orientation: ${orientation}`);
        const taskSize = this.taskBoxes.at(0).getBoundingClientRect().width;
        console.log(`Task size: ${taskSize}`);
        this.showOrientedUtilBoxes(orientation, taskSize);
    }
    getFreeSpace() {
        const fsbbox = this.freespace.getBoundingClientRect();
        return new BasicPoint(fsbbox.width, fsbbox.height);
    }
    showOrientedUtilBoxes(orientation, size) {
        if (orientation === 'landscape') {
            this.showHorizontalUtilBoxes(size);
        }
        else {
            this.showVerticalUtilBoxes(size);
        }
    }
    showHorizontalUtilBoxes(size) {
        this.hideVerticalUtilBoxes();
        this.removeClassFromElements(this.horizontalUtilBoxes, SizeControllerHTML.hiddenUtilBoxClass);
        this.setWidthToElements(this.horizontalUtilBoxes, size / 2);
        this.setHeightToElements(this.horizontalUtilBoxes, size);
    }
    hideVerticalUtilBoxes() {
        this.addClassToElements(this.verticalUtilBoxes, SizeControllerHTML.hiddenUtilBoxClass);
    }
    showVerticalUtilBoxes(size) {
        this.hideHorizontalUtilBoxes();
        this.removeClassFromElements(this.verticalUtilBoxes, SizeControllerHTML.hiddenUtilBoxClass);
        this.setHeightToElements(this.verticalUtilBoxes, size / 2);
    }
    hideHorizontalUtilBoxes() {
        this.addClassToElements(this.horizontalUtilBoxes, SizeControllerHTML.hiddenUtilBoxClass);
    }
    addClassToElements(array, className) {
        array.forEach((elem) => {
            elem.classList.add(className);
        });
    }
    removeClassFromElements(array, className) {
        array.forEach((elem) => {
            elem.classList.remove(className);
        });
    }
    setWidthToElements(array, width) {
        array.forEach((elem) => {
            elem.style.width = `${width}px`;
        });
    }
    setHeightToElements(array, height) {
        array.forEach((elem) => {
            elem.style.height = `${height}px`;
        });
    }
}
//# sourceMappingURL=size_controller.js.map