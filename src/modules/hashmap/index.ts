import LinkedList from '../linkedlist';
import { StorageInterface } from '../../interfaces/StorageInterface';

class HashMap implements StorageInterface {

    public collisions: number;
    public size: number;
    public buckets: any[];

    constructor(initialCapacity = 2) {
        this.buckets = new Array(initialCapacity);
        this.collisions = 0;
        this.size = 0;
    }

    hash(key: string) {
        let hashValue = 0;
        const stringTypeKey = `${key}${typeof key}`;

        for (let index = 0; index < stringTypeKey.length; index++) {
            const charCode = stringTypeKey.charCodeAt(index);
            hashValue += charCode << (index * 8);
        }

        return hashValue;
    }

    getIndex(key: string) {
        const indexHash = this.hash(key);
        return indexHash % this.buckets.length;
    }

    set(key: string, value: any): HashMap {
        const { entry: exists, bucket } = this.getEntry(key);
        if (!exists) {
            bucket.push({ key, value });
            this.size += 1;
            if (bucket.size > 1) {
                this.collisions += 1;
            }
        } else {
            exists.value = value;
        }
        return this;
    }

    get(key: string) {
        const { entry } = this.getEntry(key);
        return entry && entry.value;
    }

    getEntry(key: string) {
        const index = this.getIndex(key);
        this.buckets[index] = this.buckets[index] || new LinkedList();
        const bucket = this.buckets[index];

        //@ts-ignore
        const entry = bucket.find(({ value: node }) => {
            if (key === node.key) {
                return node;
            }
            return undefined;
        });

        return { bucket, entry, index };
    }
}

export default HashMap;

