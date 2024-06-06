import { StorageInterface } from './StorageInterface';
import { LinkedListInterface } from './LinkedListInterface';


export type TRecurringEventPayload = {
    key: string;
    frequency: string;
    excludingDays?: string[]
};

export interface CalendarInterface<T = StorageInterface> {
    readonly storage: T;

    addEvent(key: string, value: string): void;
    getEvent(key: string): T;
    createRecurringEvent(key: string, payload: TRecurringEventPayload): void;
    getRecurringEvent(key: string): { bucket: LinkedListInterface, entry: any, index: number };
}