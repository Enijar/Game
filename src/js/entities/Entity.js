export default class Entity {
    constructor(props) {
        this.id = Date.now() + (Math.random() * 1000);
        this.zIndex = 0;
        this.game = props.game;
    }
}
