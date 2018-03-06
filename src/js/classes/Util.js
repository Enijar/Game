export default class Util {
    static rand(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static guid() {
        const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
    }
}
