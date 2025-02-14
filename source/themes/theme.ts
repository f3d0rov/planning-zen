
export interface Theme {
	load (): Promise <void>;
	getClass (): string;
	getIconSVG (): string;
}
