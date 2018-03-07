import Entity from "./Entity";
import Asset from "../classes/Asset";
import config from "../config";

export default class Enemy extends Entity {
    constructor(props) {
        super(props);

        this.x = props.x || 0;
        this.y = props.y || 0;
        this.width = config.enemy.width;
        this.height = config.enemy.height;
        this.velocity = 5;
        this.hp = 5;
    }

    update() {
        this.y += this.velocity;

        if (
            this.x < 0 ||
            this.x > this.game.height + this.height ||
            this.y < -config.enemy.height ||
            this.y > this.game.width + this.width
        ) {
            this.game.remove(this.id);
        }
    }

    draw() {
        const asset = Asset.get('enemy');

        if (asset === null) {
            return;
        }

        this.game.ctx.drawImage(asset, this.x, this.y, this.width, this.height);
    }
}
