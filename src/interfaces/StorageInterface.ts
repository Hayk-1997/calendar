import Hashmap from "../modules/hashmap";
import LinkedList from "../modules/linkedlist";

export interface StorageInterface<T = Hashmap> {
    collisions: number;
    size: number;

    set(key: string, value: any): T;
    get(key: string): T;
    getEntry(key: string): { bucket: LinkedList, entry: { key: string, value: LinkedList }, index: number  };
}