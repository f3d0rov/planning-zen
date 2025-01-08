import { BasicPoint } from "../common/basic_point";
import { getElementById } from "../common/common";
import { BasicLinkedList } from "../common/linked_list";


class SizeControllerHTML {
	public static freespaceId = "content";
	public static containerId = "eisenhower";
	public static matrixClass = "eisenhower_matrix";
	public static taskBoxClass = "matrix_task_box";
	public static utilityBoxClass = "matrix_utility_box";
	public static landscapePadding = "landscape_padding";
	public static verticalClass = "vertical";
	public static horizontalClass = "horizontal";
	public static hiddenUtilBoxClass = "template";

	public static taskBoxSelector(): string {
		return `.${SizeControllerHTML.taskBoxClass} > *`;
	}

	public static verticalUtilBoxSelector (): string {
		return `.${SizeControllerHTML.utilityBoxClass}.${SizeControllerHTML.verticalClass}`;
	}

	public static horizontalUtilBoxSelector (): string {
		return `.${SizeControllerHTML.utilityBoxClass}.${SizeControllerHTML.horizontalClass}`;
	}
}


type Orientation = 'landscape' | 'portrait';


export class SizeController {
	private freespace!: HTMLElement;
	private container!: HTMLElement;
	private matrix!: HTMLElement;
	private landscapePadding!: HTMLElement;

	private taskBoxes: Array <HTMLElement> = new Array <HTMLElement>;
	private verticalUtilBoxes: Array <HTMLElement> = new Array <HTMLElement>;
	private horizontalUtilBoxes: Array <HTMLElement> = new Array <HTMLElement>;


	constructor () {
		this.initElements();
		window.addEventListener ('resize', ev => this.handleResize (ev));
	}

	private initElements () {
		this.initUniqueElements();
		this.initRepeatedElements();
	}

	private initUniqueElements () {
		this.freespace = getElementById (SizeControllerHTML.freespaceId);
		this.container = getElementById (SizeControllerHTML.containerId);
		this.landscapePadding = getElementById (SizeControllerHTML.landscapePadding);
		this.matrix = this.freespace.querySelector (`.${SizeControllerHTML.matrixClass}`) as HTMLElement;
	}

	private initRepeatedElements () {
		this.grabElements (SizeControllerHTML.taskBoxSelector(), this.taskBoxes);
		this.grabElements (SizeControllerHTML.verticalUtilBoxSelector(), this.verticalUtilBoxes);
		this.grabElements (SizeControllerHTML.horizontalUtilBoxSelector(), this.horizontalUtilBoxes);
	}

	private grabElements (selector: string, into: Array <HTMLElement>) {
		const elements = this.container.querySelectorAll (selector);
		elements.forEach (elem => {
			into.push (elem as HTMLElement);
		});
		console.log (`Grabbed ${into.length} elements`);
	}

	public handleResize (event: UIEvent): void {
		this.resize();
	}

	public resize (): void {
		const freeSpace = this.getFreeSpace();
		const orientation: Orientation = freeSpace.x > freeSpace.y ? 'landscape' : 'portrait';
		const taskSize = this.getTaskBoxSize (freeSpace, orientation);
		this.container.style.setProperty ('--task-box-width', `${taskSize}px`);
		this.showOrientedUtilBoxes (orientation, taskSize);
	}

	private getFreeSpace (): BasicPoint {
		const fsbbox = this.freespace.getBoundingClientRect();
		return new BasicPoint (fsbbox.width, fsbbox.height);
	}

	private getTaskBoxSize (freeSpace: BasicPoint, orientation: Orientation): number {
		let sizeForMaxWidth: number = 400;
		let sizeForMaxHeight: number = 400;

		// This is not good (changes in CSS or HTML can lead to issues) but is the simplest solution I came up with.
		if (orientation == "portrait") {
			sizeForMaxWidth = (freeSpace.x - 108) / 2;
			sizeForMaxHeight = (freeSpace.y - 61) / 2.5;
		} else {
			sizeForMaxWidth = (freeSpace.x - 108) / 3;
			sizeForMaxHeight = (freeSpace.y - 61) / 2;
		}

		return Math.min (sizeForMaxWidth, sizeForMaxHeight);
	}

	private showOrientedUtilBoxes (orientation: Orientation, size: number): void {
		if (orientation === 'landscape') {
			this.showHorizontalUtilBoxes (size);
		} else {
			this.showVerticalUtilBoxes (size);
		}
	}

	private showHorizontalUtilBoxes (size: number) {
		this.hideVerticalUtilBoxes();
		this.removeClassFromElements (this.horizontalUtilBoxes, SizeControllerHTML.hiddenUtilBoxClass);
		this.setWidthToElements (this.horizontalUtilBoxes, size / 2);
		this.setHeightToElements (this.horizontalUtilBoxes, size);
		this.landscapePadding.style.width = `${size / 2}px`;
	}

	private hideVerticalUtilBoxes () {
		this.addClassToElements (this.verticalUtilBoxes, SizeControllerHTML.hiddenUtilBoxClass);
	}

	private showVerticalUtilBoxes (size: number) {
		this.hideHorizontalUtilBoxes();
		this.removeClassFromElements (this.verticalUtilBoxes, SizeControllerHTML.hiddenUtilBoxClass);
		this.setHeightToElements (this.verticalUtilBoxes, size / 2);
		this.landscapePadding.style.width = `0px`;
	}

	private hideHorizontalUtilBoxes () {
		this.addClassToElements (this.horizontalUtilBoxes, SizeControllerHTML.hiddenUtilBoxClass);
	}



	private addClassToElements (array: Array <HTMLElement>, className: string) {
		array.forEach ((elem: HTMLElement) => {
			elem.classList.add (className);
		});
	}

	private removeClassFromElements (array: Array <HTMLElement>, className: string) {
		array.forEach ((elem: HTMLElement) => {
			elem.classList.remove (className);
		});
	}

	private setWidthToElements (array: Array <HTMLElement>, width: number) {
		array.forEach ((elem: HTMLElement) => {
			elem.style.width = `${width}px`;
		});
	}

	private setHeightToElements (array: Array <HTMLElement>, height: number) {
		array.forEach ((elem: HTMLElement) => {
			elem.style.height = `${height}px`;
		});
	}
}
