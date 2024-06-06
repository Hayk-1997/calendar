
import HashMap from './modules/hashmap';
import LinkedList from './modules/linkedlist';

import { StorageInterface } from './interfaces/StorageInterface';
import { CalendarInterface, TRecurringEventPayload } from './interfaces/CalendatInterface';

class Calendar implements CalendarInterface {

    public readonly storage: StorageInterface;

    constructor(storage: StorageInterface) {
        this.storage = storage;
    }

    addEvent(key: string, value: string): void {
        this.storage.set(key, value);
    }

    getEvent(key: string): StorageInterface {
        return this.storage.get(key);
    }

    createRecurringEvent(key: string, payload: TRecurringEventPayload): void {
        const { entry: exists, bucket } = this.storage.getEntry(key);

        if (!exists) {
            const newList = new LinkedList();
            newList.push(payload);
            bucket.push({ key: payload.key, value: newList });
        } else {
            exists.value.push(payload);
        }
    }

    getRecurringEvent(key: string) {
        return this.storage.getEntry(key);
    }
}


const map = new HashMap(10);
const calendar = new Calendar(map);

// calendar.addEvent('Monday', 'Birthday')
// console.log(calendar.getEvent('Monday'));

calendar.createRecurringEvent('recurring', {
    key: 'Monday',
    frequency: 'Daily'
})
calendar.createRecurringEvent('recurring', {
    key: 'Friday',
    frequency: 'Daily'
})


console.log(calendar.getRecurringEvent('recurring').bucket.length);
/*calendar.getRecurringEvent('recurring').bucket.find((node: any) => {
    console.log('node', node.value);
})*/

