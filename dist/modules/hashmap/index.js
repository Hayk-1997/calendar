"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const linkedlist_1 = __importDefault(require("../linkedlist"));
class HashMap {
    constructor(initialCapacity = 2) {
        this.buckets = new Array(initialCapacity);
        this.collisions = 0;
        this.size = 0;
    }
    hash(key) {
        let hashValue = 0;
        const stringTypeKey = `${key}${typeof key}`;
        for (let index = 0; index < stringTypeKey.length; index++) {
            const charCode = stringTypeKey.charCodeAt(index);
            hashValue += charCode << (index * 8);
        }
        return hashValue;
    }
    getIndex(key) {
        const indexHash = this.hash(key);
        return indexHash % this.buckets.length;
    }
    set(key, value) {
        const { entry: exists, bucket } = this.getEntry(key);
        if (!exists) {
            bucket.push({ key, value });
            this.size += 1;
            if (bucket.size > 1) {
                this.collisions += 1;
            }
        }
        else {
            exists.value = value;
        }
        return this;
    }
    get(key) {
        const { entry } = this.getEntry(key);
        return entry && entry.value;
    }
    getEntry(key) {
        const index = this.getIndex(key);
        this.buckets[index] = this.buckets[index] || new linkedlist_1.default();
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
exports.default = HashMap;
