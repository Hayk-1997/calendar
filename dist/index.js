"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hashmap_1 = __importDefault(require("./modules/hashmap"));
const linkedlist_1 = __importDefault(require("./modules/linkedlist"));
class Calendar {
    constructor(storage) {
        this.storage = storage;
    }
    addEvent(key, value) {
        this.storage.set(key, value);
    }
    getEvent(key) {
        return this.storage.get(key);
    }
    createRecurringEvent(key, payload) {
        const { entry: exists, bucket } = this.storage.getEntry(key);
        if (!exists) {
            const newList = new linkedlist_1.default();
            newList.push(payload);
            bucket.push({ key: payload.key, value: newList });
        }
        else {
            exists.value.push(payload);
        }
    }
    getRecurringEvent(key) {
        return this.storage.getEntry(key);
    }
}
const map = new hashmap_1.default(10);
const calendar = new Calendar(map);
calendar.addEvent('Monday', 'Birthday');
console.log(calendar.getEvent('Monday'));
// calendar.createRecurringEvent('recurring', {
//     key: 'Monday',
//     frequency: 'Daily'
// })
// calendar.createRecurringEvent('recurring', {
//     key: 'Friday',
//     frequency: 'Daily'
// })
//
// calendar.getRecurringEvent('recurring').bucket.find((node: any) => {
//     console.log('node', node.value);
// })
