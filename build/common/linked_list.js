class LinkedListItem {
    constructor(value) {
        this.value = value;
    }
    getNext() {
        return this.next;
    }
    setNext(next) {
        this.next = next;
    }
    insertAfterSelf(next) {
        next.setNext(this.next);
        this.next = next;
    }
    getValue() {
        return this.value;
    }
    contains(value) {
        return this.value == value;
    }
}
export class BasicLinkedList {
    constructor() {
        this.head = undefined;
    }
    pushBack(value) {
        var _a;
        const newItem = new LinkedListItem(value);
        if (this.head === undefined) {
            this.head = newItem;
        }
        else {
            (_a = this.getBackItem()) === null || _a === void 0 ? void 0 : _a.setNext(newItem);
        }
    }
    pushFront(value) {
        const newItem = new LinkedListItem(value);
        this.insertAsFirst(newItem);
    }
    pop(value) {
        var _a;
        if ((_a = this.head) === null || _a === void 0 ? void 0 : _a.contains(value)) {
            this.popFront();
        }
        else {
            this.popFromNotFirst(value);
        }
    }
    popFront() {
        var _a;
        this.head = (_a = this.head) === null || _a === void 0 ? void 0 : _a.getNext();
    }
    popFromNotFirst(value) {
        const prev = this.findItemWithNextValue(value);
        const removed = prev === null || prev === void 0 ? void 0 : prev.getNext();
        prev === null || prev === void 0 ? void 0 : prev.setNext(removed === null || removed === void 0 ? void 0 : removed.getNext());
    }
    front() {
        var _a;
        return (_a = this.head) === null || _a === void 0 ? void 0 : _a.getValue();
    }
    back() {
        var _a;
        return (_a = this.getBackItem()) === null || _a === void 0 ? void 0 : _a.getValue();
    }
    getBackItem() {
        let last = undefined;
        this.forEachItem(item => { last = item; return true; });
        return last;
    }
    contains(value) {
        return this.findItemWithValue(value) !== undefined;
    }
    insertAfter(value, after) {
        const newItem = new LinkedListItem(value);
        const item = this.findItemWithValue(after);
        item === null || item === void 0 ? void 0 : item.insertAfterSelf(newItem);
    }
    insertBefore(value, before) {
        const newItem = new LinkedListItem(value);
        if (this.head === undefined || this.head.contains(before)) {
            this.insertAsFirst(newItem);
        }
        else {
            this.insertBeforeNotFirst(newItem, before);
        }
    }
    insertAsFirst(newItem) {
        newItem.setNext(this.head);
        this.head = newItem;
    }
    insertBeforeNotFirst(newItem, before) {
        let prev = this.findItemWithNextValue(before);
        prev === null || prev === void 0 ? void 0 : prev.insertAfterSelf(newItem);
    }
    findItemWithValue(value) {
        return this.findItem(item => item.contains(value));
    }
    findItemWithNextValue(value) {
        return this.findItem(item => { var _a; return (_a = item.getNext()) === null || _a === void 0 ? void 0 : _a.contains(value); });
    }
    findItem(condition) {
        let foundItem = undefined;
        this.forEachItem((item) => {
            if (condition(item)) {
                foundItem = item;
                return false;
            }
            return true;
        });
        return foundItem;
    }
    forEach(callbackfn) {
        this.forEachItem(item => callbackfn(item.getValue()));
    }
    forEachItem(callbackfn) {
        if (this.head === undefined)
            return;
        this.doForEachItem(callbackfn);
    }
    doForEachItem(callbackfn) {
        let item = this.head;
        do {
            const cont = callbackfn(item);
            if (cont === false)
                break;
            item = item.getNext();
        } while (item);
    }
    iterate() {
        return new BasicLinkedListIterator(this.head);
    }
}
class BasicLinkedListIterator {
    constructor(head) {
        this.current = head;
    }
    hasNext() {
        return this.current !== undefined;
    }
    getNext() {
        const value = this.current.getValue();
        this.current = this.current.getNext();
        return value;
    }
}
//# sourceMappingURL=linked_list.js.map