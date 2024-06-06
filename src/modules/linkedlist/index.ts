import Node from '../node';
import { LinkedListInterface } from '../../interfaces/LinkedListInterface';

class LinkedList implements LinkedListInterface {
    readonly ListNode: typeof Node;
    public size: number;
    public first: Node | null;
    public last: Node | null;

    constructor(iterable = [], ListNode = Node) {
        this.first = null;
        this.last = null;
        this.size = 0;
        this.ListNode = ListNode;
        Array.from(iterable, (i) => this.addLast(i));
    }

    addFirst(value: any) {
        const newNode = new this.ListNode(value);

        newNode.next = this.first;

        if (this.first) {
            this.first.previous = newNode;
        } else {
            this.last = newNode;
        }

        this.first = newNode;
        this.size += 1;

        return newNode;
    }

    addLast(value: any): Node {
        const newNode = new Node(value);

        if (this.first) {
            newNode.previous = this.last;
            if (this.last) this.last.next = newNode;
            this.last = newNode;
        } else {
            this.first = newNode;
            this.last = newNode;
        }

        this.size += 1;

        return newNode;
    }

    addAt(value: any, position: number = 0): Node | undefined {
        if (position === 0) return this.addFirst(value);
        if (position === this.size) return this.addLast(value);

        // Adding element in the middle
        const current = this.findBy({index: position}).node;
        if (!current) return undefined;

        const newNode = new Node(value);
        newNode.previous = current.previous;
        newNode.next = current;
        if (current.previous) current.previous.next = newNode;
        current.previous = newNode;
        this.size += 1;

        return newNode;
    }

    getIndexByValue(value: any): number | undefined {
        return this.findBy({value}).index;
    }

    public get(index: number = 0): Node | undefined {
        return this.findBy({index}).node;
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
    private findBy({value = undefined, index = Infinity}: { value?: any, index?: number }) {
        for (let current = this.first, position = 0;
             current && position <= index;
             position += 1, current = current.next) {
            if (position === index || value === current.value) {
                return {node: current, index: position};
            }
        }
        return {};
    }

    find(callback: Function) {
        for (let current: Node | null = this.first, position = 0;
             current;
             position += 1, current = current.next)
        {
            const result = callback(current, position)

            if (result !== undefined) {
                return result;
            }
        }
        return undefined;
    }

    removeFirst(): Node | null {
        if (!this.first) return null; // Check if list is already empty.
        const head = this.first;

        this.first = head.next; // move first pointer to the next element.
        if (this.first) {
            this.first.previous = null;
        } else { // if list has size zero, then we need to null out last.
            this.last = null;
        }
        this.size -= 1;
        return head.value;
    }

    removeLast(): Node | null {
        if (!this.last) return null; // Check if list is already empty.
        const tail = this.last;

        this.last = tail.previous;
        if (this.last) {
            this.last.next = null;
        } else { // if list has size zero, then we need to null out first.
            this.first = null;
        }
        this.size -= 1;
        return tail.value;
    }

    removeByPosition(position = 0) {
        if (position === 0) return this.removeFirst();
        if (position === this.size - 1) return this.removeLast();
        const current = this.findBy({index: position}).node;
        if (!current) return null;
        if (current.previous) current.previous.next = current.next;
        if (current.next) current.next.previous = current.previous;
        this.size -= 1;
        return current && current.value;
    }

    /**
     * Remove element by Node
     * O(1)
     */
    removeByNode(node: Node) {
        if (!node) {
            return null;
        }
        if (node === this.first) {
            return this.removeFirst();
        }
        if (node === this.last) {
            return this.removeLast();
        }
        if (node.previous) node.previous.next = node.next;
        if (node?.next) node.next.previous = node.previous;
        this.size -= 1;

        return node.value;
    }

    // Aliases
    get length() {
        return this.size;
    }

    push(value: any): Node {
        return this.addLast(value);
    }

    pop(): Node | null {
        return this.removeLast();
    }

    unshift(value: any): Node | null {
        return this.addFirst(value);
    }

    shift(): Node | null {
        return this.removeFirst();
    }
}

LinkedList.prototype.push = LinkedList.prototype.addLast;
LinkedList.prototype.pop = LinkedList.prototype.removeLast;
LinkedList.prototype.unshift = LinkedList.prototype.addFirst;
LinkedList.prototype.shift = LinkedList.prototype.removeFirst;

export default LinkedList;
