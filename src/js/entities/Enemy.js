import Entity from "./Entity";
import Asset from "../classes/Asset";

export default class Enemy extends Entity {
    constructor(props) {
        super(props);

        this.x = props.x || 0;
        this.y = props.y || 0;
        this.width = 0;
        this.height = 0;
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
        const asset = Asset.get('enemy');

        if (asset === null) {
            return;
        }

        this.width = asset.width;
        this.height = asset.height;

        this.game.ctx.drawImage(asset, this.x, this.y, this.width, this.height);
    }
}
