import Entity from "./Entity";
import Asset from "../classes/Asset";
import config from "../config";

export default class Missile extends Entity {
    constructor(props) {
        super(props);

        this.x = props.x || 0;
        this.y = props.y || 0;
        this.width = config.missile.width;
        this.height = config.missile.height;
        this.velocity = 30;
        this.zIndex = 2;
    }

    update() {
        this.y -= this.velocity;

        if (this.y < 0) {
            this.game.remove(this.id);
        }
    }

    draw() {
        const asset = Asset.get('missile');

        if (asset === null) {
            return;
        }

        this.game.ctx.drawImage(asset, this.x, this.y, this.width, this.height);
    }
}
