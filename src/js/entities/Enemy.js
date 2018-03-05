import Entity from "./Entity";

export default class Enemy extends Entity {
    constructor(props) {
        super(props);

        this.x = props.x || 0;
        this.y = props.y || 0;
        this.width = 50;
        this.height = 50;
        this.velocity = 5;
    }

    update() {
        this.y += this.velocity;

        if (
            this.x < 0 ||
            this.x > this.game.height + this.height ||
            this.y < -50 ||
            this.y > this.game.width + this.width
        ) {
            this.game.remove(this.id);
        }
    }

    draw() {
        this.game.ctx.fillStyle = 'rgba(200, 0, 0, 1)';
        this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
