class Node {
    public next: Node | null;
    public previous: Node | null;
    public value: any;

    constructor(value = null) {
        this.value = value;
        this.next = null;
        this.previous = null;
    }
}

export default Node;
