import Util from "../classes/Util";

export default class Entity {
    constructor(props) {
        this.id = Util.guid();
        this.zIndex = 0;
        this.game = props.game;
        this.name = this.constructor.name;
    }
}
