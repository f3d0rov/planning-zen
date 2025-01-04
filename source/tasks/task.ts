

export type TaskSection = 'do' | 'schedule' | 'delegate' | 'delete' | 'unset' | 'done';


export interface NamedTaskInfo {
	getName (): string | Promise <string>;
	setName (name: string): void | Promise <void>;
}

export interface SectionedTaskInfo {
	getSection (): TaskSection | Promise <TaskSection>;
	setSection (section: TaskSection): void | Promise <void>;
}

export interface OrderedTaskInfo {
	getOrderIndex (): number | Promise <number>;
	setOrderIndex (index: number): void | Promise <void>;
}

export interface Task extends
	NamedTaskInfo,
	SectionedTaskInfo,
	OrderedTaskInfo
{}
