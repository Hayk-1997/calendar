"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Node {
    constructor(value = null) {
        this.value = value;
        this.next = null;
        this.previous = null;
    }
}
exports.default = Node;
