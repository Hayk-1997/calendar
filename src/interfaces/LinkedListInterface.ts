import Node from '../modules/node';

export interface LinkedListInterface<T = Node> {
    size: number;
    first: T | null;
    last: T | null;
    length: number;

    readonly ListNode: typeof Node;

    addFirst: (value: any) => T;
    addLast: (value: any) => T;
    addAt: (value: any, position: number) => T | undefined;
    getIndexByValue: (value: any) => number | undefined;
    get: (index: number) => T | undefined;
    find: (callback: Function) => T | undefined;
    removeFirst: () => T | null;
    removeLast: () => T | null;
    removeByPosition: (position: number) => T | undefined;
    removeByNode: (node: T) => T | undefined;

    push: (value: any) => T;
    pop: () => T | null;
    shift: () => T | null;
    unshift: (value: any) => T | null;
}