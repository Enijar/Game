export default class Entity {
    constructor(props) {
        this.id = Date.now() + (Math.random() * 1000);
        this.game = props.game;
    }
}
