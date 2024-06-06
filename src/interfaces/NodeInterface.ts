import Node from '../modules/node';

export interface NodeInterface<T = Node> {
    next: T | null;
    previous: T | null;
    value: any;
}