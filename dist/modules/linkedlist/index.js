"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = __importDefault(require("../node"));
class LinkedList {
    constructor(iterable = [], ListNode = node_1.default) {
        this.first = null;
        this.last = null;
        this.size = 0;
        this.ListNode = ListNode;
        Array.from(iterable, (i) => this.addLast(i));
    }
    addFirst(value) {
        const newNode = new this.ListNode(value);
        newNode.next = this.first;
        if (this.first) {
            this.first.previous = newNode;
        }
        else {
            this.last = newNode;
        }
        this.first = newNode;
        this.size += 1;
        return newNode;
    }
    /**
     * Adds element to the end of the list (tail). Similar to Array.push
     * Using the element last reference instead of navigating through the list,
     * we can reduce from linear to a constant runtime.
     * Runtime: O(1)
     * @param {any} value node's value
     * @returns {Node} newly created node
     */
    addLast(value) {
        const newNode = new node_1.default(value);
        console.log('newNode', newNode);
        if (this.first) {
            newNode.previous = this.last;
            if (this.last)
                this.last.next = newNode;
            this.last = newNode;
        }
        else {
            this.first = newNode;
            this.last = newNode;
        }
        this.size += 1;
        return newNode;
    }
    /**
     * Insert new element at the given position (index)
     *
     * Runtime: O(n)
     *
     * @param {any} value new node's value
     * @param {Number} position position to insert element
     * @returns {Node|undefined} new node or 'undefined' if the index is out of bound.
     */
    addAt(value, position = 0) {
        if (position === 0)
            return this.addFirst(value);
        if (position === this.size)
            return this.addLast(value);
        // Adding element in the middle
        const current = this.findBy({ index: position }).node;
        if (!current)
            return undefined;
        const newNode = new node_1.default(value);
        newNode.previous = current.previous;
        newNode.next = current;
        if (current.previous)
            current.previous.next = newNode;
        current.previous = newNode;
        this.size += 1;
        return newNode;
    }
    /**
     * @deprecated use findBy
     * Search by value. It finds first occurrence  of
     * the position of element matching the value.
     * Similar to Array.indexOf.
     *
     * Runtime: O(n)
     *
     * @example: assuming a linked list with: a -> b -> c
     *  linkedList.getIndexByValue('b') // ↪️ 1
     *  linkedList.getIndexByValue('z') // ↪️ undefined
     * @param {any} value
     * @returns {number} return index or undefined
     */
    getIndexByValue(value) {
        return this.findBy({ value }).index;
    }
    /**
     * @deprecated use findBy directly
     * Search by index
     * Runtime: O(n)
     * @example: assuming a linked list with: a -> b -> c
     *  linkedList.get(1) // ↪️ 'b'
     *  linkedList.get(40) // ↪️ undefined
     * @param {Number} index position of the element
     * @returns {Node|undefined} element at the specified position in
     *   this list or undefined if was not found.
     */
    get(index = 0) {
        return this.findBy({ index }).node;
    }
    /**
     * Find by index or by value, whichever happens first.
     * Runtime: O(n)
     * @example
     *  this.findBy({ index: 10 }).node; // node at index 10.
     *  this.findBy({ value: 10 }).node; // node with value 10.
     *  this.findBy({ value: 10 }).index; // node's index with value 10.
     *
     * @param {Object} params - The search params
     * @param {number} params.index - The index/position to search for.
     * @param {any} params.value - The value to search for.
     * @returns {{node: any, index: number}}
     */
    findBy({ value = undefined, index = Infinity }) {
        for (let current = this.first, position = 0; current && position <= index; position += 1, current = current.next) {
            if (position === index || value === current.value) {
                return { node: current, index: position };
            }
        }
        return {};
    }
    find(callback) {
        for (let current = this.first, position = 0; current; position += 1, current = current.next) {
            const result = callback(current, position);
            if (result !== undefined) {
                return result;
            }
        }
        return undefined;
    }
    /**
     * Removes element from the start of the list (head/root).
     * Similar to Array.shift().
     * Runtime: O(1)
     * @returns {any} the first element's value which was removed.
     */
    removeFirst() {
        if (!this.first)
            return null; // Check if list is already empty.
        const head = this.first;
        this.first = head.next; // move first pointer to the next element.
        if (this.first) {
            this.first.previous = null;
        }
        else { // if list has size zero, then we need to null out last.
            this.last = null;
        }
        this.size -= 1;
        return head.value;
    }
    /**
     * Removes element to the end of the list.
     * Similar to Array.pop().
     * Runtime: O(1)
     * @returns {any} the last element's value which was removed
     */
    removeLast() {
        if (!this.last)
            return null; // Check if list is already empty.
        const tail = this.last;
        this.last = tail.previous;
        if (this.last) {
            this.last.next = null;
        }
        else { // if list has size zero, then we need to null out first.
            this.first = null;
        }
        this.size -= 1;
        return tail.value;
    }
    /**
     * Removes the element at the given position (index) in this list.
     * Runtime: O(n)
     * @param {any} position
     * @returns {any} the element's value at the specified position that was removed.
     */
    removeByPosition(position = 0) {
        if (position === 0)
            return this.removeFirst();
        if (position === this.size - 1)
            return this.removeLast();
        const current = this.findBy({ index: position }).node;
        if (!current)
            return null;
        if (current.previous)
            current.previous.next = current.next;
        if (current.next)
            current.next.previous = current.previous;
        this.size -= 1;
        return current && current.value;
    }
    /**
     * Remove element by Node
     * O(1)
     */
    removeByNode(node) {
        if (!node) {
            return null;
        }
        if (node === this.first) {
            return this.removeFirst();
        }
        if (node === this.last) {
            return this.removeLast();
        }
        if (node.previous)
            node.previous.next = node.next;
        if (node === null || node === void 0 ? void 0 : node.next)
            node.next.previous = node.previous;
        this.size -= 1;
        return node.value;
    }
    // Aliases
    get length() {
        return this.size;
    }
    push(value) {
        return this.addLast(value);
    }
    pop() {
        return this.removeLast();
    }
    unshift(value) {
        return this.addFirst(value);
    }
    shift() {
        return this.removeFirst();
    }
}
LinkedList.prototype.push = LinkedList.prototype.addLast;
LinkedList.prototype.pop = LinkedList.prototype.removeLast;
LinkedList.prototype.unshift = LinkedList.prototype.addFirst;
LinkedList.prototype.shift = LinkedList.prototype.removeFirst;
exports.default = LinkedList;
