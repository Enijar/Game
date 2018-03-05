export default class Util {
    static rand(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
