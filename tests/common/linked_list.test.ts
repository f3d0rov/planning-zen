
import { assert } from "chai";
import { LinkedList, BasicLinkedList } from "../../source/common/linked_list";

describe ('BasicLinkedList <T>', function () {
	it ("Construction. The linked list is initially empty", function () {
		const list = new BasicLinkedList <number>;
		assert.exists (list);
		assert.lengthOf (list, 0);
	});

	it ("Adding elements to the back of a list", function () {
		const list = new BasicLinkedList <number>;
		list.pushBack (1);
		list.pushBack (2);
		assert.sameMembers (list.array, [1, 2]);
	});

	it ("Adding elements to the front of a list", function () {
		const list = new BasicLinkedList <number>;
		list.pushFront (1);
		list.pushFront (2);
		assert.sameMembers (list.array, [2, 1]);
	});

	it ("Removing an element from a list", function () {
		const list = new BasicLinkedList <number>;
		list.pushBack (1);
		list.pushBack (2);
		list.pushBack (3);

		list.pop (2);
		
		assert.sameMembers (list.array, [1, 3]);
	});

	it ("Attempting to remove a non-existent element from a list does not modify it", function () {
		const list = new BasicLinkedList <number>;
		list.pushBack (1);
		list.pushBack (2);
		list.pushBack (3);

		list.pop (100);
		
		assert.sameMembers (list.array, [1, 2, 3]);
	});

	it ("Removing all elements from a list", function () {
		const list = new BasicLinkedList <number>;
		list.pushBack (1);
		list.pushBack (2);
		list.pushBack (3);
		
		list.clear();
		
		assert.lengthOf (list, 0);
	});
	
	it ("Getting the first element of a list", function () {
		const list = new BasicLinkedList <number>;
		list.pushBack (1);
		list.pushBack (2);
		list.pushBack (3);
		
		const firstElement = list.front();
		
		assert.equal (firstElement, 1);
	});
	
	it ("Getting the first element of an empty list returns `undefined`", function () {
		const list = new BasicLinkedList <number>;
		
		const firstElement = list.front();
		assert.isUndefined (firstElement);
	});
	
	it ("Getting the last element of a list", function () {
		const list = new BasicLinkedList <number>;
		list.pushBack (1);
		list.pushBack (2);
		list.pushBack (3);
		
		const lastElement = list.back();
		
		assert.equal (lastElement, 3);
	});
	
	it ("Getting the last element of an empty list returns `undefined`", function () {
		const list = new BasicLinkedList <number>;
		
		const lastElement = list.back();
		assert.isUndefined (lastElement);
	});
	
	it ("Inserting an element after another element", function () {
		const list = new BasicLinkedList <number>;
		list.pushBack (5);
		list.pushBack (9);
		list.pushBack (13);
		
		list.insertAfter (12, 9);
		
		assert.sameMembers (list.array, [5, 9, 12, 13]);
	});
	
	it ("Inserting an element after a non-existent element does not modify the list", function () {
		const list = new BasicLinkedList <number>;
		list.pushBack (5);
		list.pushBack (9);
		list.pushBack (13);
		
		list.insertAfter (12, 1999);
		
		assert.sameMembers (list.array, [5, 9, 13]);
	});
	
	it ("Inserting an element before another element", function () {
		const list = new BasicLinkedList <number>;
		list.pushBack (5);
		list.pushBack (9);
		list.pushBack (13);
		
		list.insertBefore (7, 9);
		
		assert.sameMembers (list.array, [5, 7, 9, 13]);
	});
	
	it ("Inserting an element before a non-existent element does not modify the list", function () {
		const list = new BasicLinkedList <number>;
		list.pushBack (5);
		list.pushBack (9);
		list.pushBack (13);
		
		list.insertAfter (12, 1999);
		
		assert.sameMembers (list.array, [5, 9, 13]);
	});

	it ("Check if an element exists in the list", function () {
		const list = new BasicLinkedList <number>;
		list.pushBack (4);
		list.pushBack (5);
		list.pushBack (1);

		assert.isTrue (list.contains (4));
		assert.isTrue (list.contains (1));
		assert.isFalse (list.contains (1984));
	});

	it ("Iteration using .forEach", function () {
		const list = new BasicLinkedList <number>;
		list.pushBack (4);
		list.pushBack (5);
		list.pushBack (1);

		const iteratedValues = new Array <number>;
		list.forEach (value => {iteratedValues.push (value); return true});

		assert.sameMembers (iteratedValues, [4, 5, 1]);
	});
	
	it ("Iteration using .forEach stops after callback returns false", function () {
		const list = new BasicLinkedList <number>;
		list.pushBack (4);
		list.pushBack (5);
		list.pushBack (1);

		const iteratedValues = new Array <number>;
		list.forEach (value => {iteratedValues.push (value); return false});

		assert.sameMembers (iteratedValues, [4]);
	});

	it ("Iteration using .iterate", function () {
		const list = new BasicLinkedList <number>;
		list.pushBack (4);
		list.pushBack (5);
		list.pushBack (1);

		const iteratedValues = new Array <number>;
		const iterator = list.iterate();
		while (iterator.hasNext()) {
			const value = iterator.getNext();
			iteratedValues.push (value);
		}

		assert.sameMembers (iteratedValues, [4, 5, 1]);
	});

	it ("Checking the lenght of a list", function () {
		const list = new BasicLinkedList <number>;
		list.pushBack (4);
		list.pushBack (5);
		list.pushBack (1);

		assert.equal (list.length, 3);
	});

	it ("Getting array of the elements of a list", function () {
		const list = new BasicLinkedList <number>;

		list.pushBack (4);
		list.pushBack (5);
		list.pushBack (1);

		assert.sameMembers (list.array, [4, 5, 1]);
	});
});
