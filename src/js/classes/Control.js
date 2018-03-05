import KeyCode from "./KeyCode";

export default class Control {
    static pressed(key, keyCodes) {
        key = key.toUpperCase();
        const keys = keyCodes.map(keyCode => KeyCode.get(keyCode));
        return keys.indexOf(key) > -1;
    }
}
