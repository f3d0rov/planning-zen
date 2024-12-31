

export type TaskSection = 'do' | 'schedule' | 'delegate' | 'delete' | 'unset' | 'done';


export interface NamedTaskInfo {
	getName (): string;
	setName (name: string): void;
}

export interface SectionedTaskInfo {
	getSection (): TaskSection;
	setSection (section: TaskSection): void;
}

export interface OrderedTaskInfo {
	getOrderIndex (): number;
	setOrderIndex (index: number): void;
}

export interface Task extends
	NamedTaskInfo,
	SectionedTaskInfo,
	OrderedTaskInfo
{}
