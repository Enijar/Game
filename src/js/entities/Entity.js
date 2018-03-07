import Util from "../classes/Util";

export default class Entity {
    constructor(props) {
        this.id = Util.guid();
        this.zIndex = 0;
        this.game = props.game;
        this.hp = 1;
        this.name = this.constructor.name;
    }
}
