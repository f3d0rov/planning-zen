import { BasicPoint } from "../common/basic_point";
import { getElementById } from "../common/common";


class SizeControllerHTML {
	public static freespaceId = "content";
	public static containerId = "eisenhower";
	public static matrixClass = "eisenhower_matrix";
	public static taskBoxClass = "matrix_task_box";
	public static utilityBoxClass = "matrix_utility_box";
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
	public freespace!: HTMLElement;
	public container!: HTMLElement;
	public matrix!: HTMLElement;

	public taskBoxes: Array <HTMLElement> = new Array <HTMLElement>;
	public verticalUtilBoxes: Array <HTMLElement> = new Array <HTMLElement>;
	public horizontalUtilBoxes: Array <HTMLElement> = new Array <HTMLElement>;


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
		console.log ('resize!');
		const freeSpace = this.getFreeSpace();
		const orientation: Orientation = freeSpace.x > freeSpace.y ? 'landscape' : 'portrait';
		console.log (`Orientation: ${orientation}`);
		const taskSize = this.taskBoxes.at (0)!.getBoundingClientRect().width;
		console.log (`Task size: ${taskSize}`);
		this.showOrientedUtilBoxes (orientation, taskSize);
	}

	private getFreeSpace (): BasicPoint {
		const fsbbox = this.freespace.getBoundingClientRect();
		return new BasicPoint (fsbbox.width, fsbbox.height);
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
	}

	private hideVerticalUtilBoxes () {
		this.addClassToElements (this.verticalUtilBoxes, SizeControllerHTML.hiddenUtilBoxClass);
	}

	private showVerticalUtilBoxes (size: number) {
		this.hideHorizontalUtilBoxes();
		this.removeClassFromElements (this.verticalUtilBoxes, SizeControllerHTML.hiddenUtilBoxClass);
		this.setHeightToElements (this.verticalUtilBoxes, size / 2);
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
