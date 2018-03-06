import Util from "./Util";

const items = [];

export default class Queue {
    static add(func) {
        items.push({
            id: Util.guid(),
            func
        });
    }

    static remove(itemId) {
        for (let i = items.length - 1; i >= 0; i--) {
            if (items[i].id === itemId) {
                items.splice(i, 1);
            }
        }
    }

    static process() {
        for (let i = items.length - 1; i >= 0; i--) {
            items[i].func();
            Queue.remove(items[i].id);
        }
    }
}
