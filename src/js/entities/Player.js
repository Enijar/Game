import Entity from "./Entity";
import Missile from "./Missile";

function log() {
    console.log('log');
}

export default class Player extends Entity {
    constructor(props) {
        super(props);

        this.x = 0;
        this.y = 0;
        this.width = 100;
        this.height = 50;
        this.fireInterval = 150;
        this.lastFireTime = 0;
    }

    update() {
        this.x = Math.max(0, this.game.mouse.x - (this.width / 2));
        this.x = Math.min(this.game.width - this.width, this.x);
        this.y = Math.max(0, this.game.mouse.y - (this.height / 2));
        this.y = Math.min(this.game.height - this.height, this.y);

        if (this.game.mouse.pressed) {
            this.fire();
        }
    }

    fire() {
        if (this.lastFireTime + this.fireInterval > Date.now()) {
            return;
        }
        this.lastFireTime = Date.now();

        this.game.add(Missile, {
            x: this.x + (this.width / 2),
            y: this.y
        });
    }

    draw() {
        this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
