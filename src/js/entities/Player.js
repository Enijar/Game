import Entity from "./Entity";

export default class Player extends Entity {
    constructor(props) {
        super(props);

        this.x = 0;
        this.y = 0;
        this.width = 100;
        this.height = 250;
        this.velocity = 5;
    }

    update() {
        // Left
        if (this.game.keyPressed('A')) {
            this.x = Math.max(0, this.x - this.velocity);
        }

        // Right
        if (this.game.keyPressed('D')) {
            this.x = Math.min(this.game.width - this.width, this.x + this.velocity);
        }

        // Up
        if (this.game.keyPressed('W')) {
            this.y = Math.max(0, this.y - this.velocity);
        }

        // Down
        if (this.game.keyPressed('S')) {
            this.y = Math.min(this.game.height - this.height, this.y + this.velocity);
        }
    }

    draw() {
        this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
