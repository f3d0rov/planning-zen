

export interface LinkedList <T> {
	pushBack (value: T): void;
	pushFront (value: T): void;
	pop (value: T): void;
	clear (): void;

	front (): T | undefined;
	back (): T | undefined;
	
	insertAfter (value: T, after: T): void;
	insertBefore (value: T, before: T): void;
	
	contains (value: T): boolean;
	forEach (callbackfn: (value: T) => boolean): void
	iterate (): LinkedListIterator <T>;
}


export interface LinkedListIterator <T> {
	hasNext (): boolean;
	getNext (): T;
}


class LinkedListItem <T> {
	private value: T;
	private next: LinkedListItem <T> | undefined;

	constructor (value: T) {
		this.value = value;
	}

	public getNext (): LinkedListItem <T> | undefined {
		return this.next;
	}
	
	public setNext (next: LinkedListItem <T> | undefined) {
		this.next = next;
	}

	public insertAfterSelf (next: LinkedListItem <T>) {
		next.setNext (this.next);
		this.next = next;
	}

	public getValue () {
		return this.value;
	}

	public contains (value: T) {
		return this.value == value;
	}
}


export class BasicLinkedList <T> implements LinkedList <T> {
	private head: LinkedListItem <T> | undefined = undefined;

	public pushBack (value: T): void {
		const newItem = new LinkedListItem <T> (value);
		if (this.head === undefined) {
			this.head = newItem;
		} else {
			this.getBackItem()?.setNext (newItem);
		}
	}
	
	public pushFront (value: T): void {
		const newItem = new LinkedListItem <T> (value);
		this.insertAsFirst (newItem);
	}

	public pop (value: T): void {
		if (this.head?.contains (value)) {
			this.popFront();
		} else {
			this.popFromNotFirst (value);
		}
	}

	private popFront (): void {
		this.head = this.head?.getNext();
	}

	private popFromNotFirst (value: T): void {
		const prev = this.findItemWithNextValue (value);
		const removed = prev?.getNext();
		prev?.setNext (removed?.getNext());
	}

	public clear (): void {
		this.head = undefined;
	}


	public front (): T | undefined {
		return this.head?.getValue();
	}

	public back (): T | undefined {
		return this.getBackItem()?.getValue();
	}

	private getBackItem (): LinkedListItem <T> | undefined {
		let last = undefined;
		this.forEachItem (item => { last = item; return true; });
		return last;
	}

	public contains (value: T): boolean {
		return this.findItemWithValue (value) !== undefined;
	}

	public insertAfter (value: T, after: T): void {
		const newItem = new LinkedListItem <T> (value);
		const item = this.findItemWithValue (after);
		item?.insertAfterSelf (newItem);
	}

	public insertBefore (value: T, before: T): void {
		const newItem = new LinkedListItem <T> (value);
		if (this.head === undefined || this.head.contains (before)) {
			this.insertAsFirst (newItem);
		} else {
			this.insertBeforeNotFirst (newItem, before);
		}
	}

	private insertAsFirst (newItem: LinkedListItem <T>): void {
		newItem.setNext (this.head);
		this.head = newItem;
	}

	private insertBeforeNotFirst (newItem: LinkedListItem <T>, before: T): void {
		let prev = this.findItemWithNextValue (before);
		prev?.insertAfterSelf (newItem);
	}

	private findItemWithValue (value: T): LinkedListItem <T> | undefined {
		return this.findItem (item => item.contains (value));
	}

	private findItemWithNextValue (value: T): LinkedListItem <T> | undefined {
		return this.findItem (item => item.getNext()?.contains (value));
	}

	private findItem (condition: (item: LinkedListItem <T>) => boolean | undefined): LinkedListItem <T> | undefined {
		let foundItem: LinkedListItem <T> | undefined = undefined;

		this.forEachItem ((item: LinkedListItem <T>) => {
			if (condition (item)) {
				foundItem = item;
				return false;
			}
			return true;
		});

		return foundItem;
	}

	public forEach (callbackfn: (value: T) => boolean): void {
		this.forEachItem (item => callbackfn (item.getValue()));
	}

	private forEachItem (callbackfn: (item: LinkedListItem <T>) => boolean): void {
		if (this.head === undefined) return;
		this.doForEachItem (callbackfn);
	}

	private doForEachItem (callbackfn: (item: LinkedListItem <T>) => boolean): void {
		let item = this.head!;
		do {
			const cont = callbackfn (item!);
			if (cont === false) break;
			item = item.getNext() as LinkedListItem <T>;
		} while (item);
	}
	
	public iterate(): LinkedListIterator<T> {
		return new BasicLinkedListIterator <T> (this.head);
	}
}


class BasicLinkedListIterator <T> implements LinkedListIterator <T> {
	private current: LinkedListItem <T> | undefined;

	constructor (head: LinkedListItem <T> | undefined) {
		this.current = head;
	}

	public hasNext (): boolean {
		return this.current !== undefined;
	}

	public getNext(): T {
		const value = this.current!.getValue();
		this.current = this.current!.getNext();
		return value;
	}
}
