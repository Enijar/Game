import Entity from "./Entity";
import Missile from "./Missile";
import config from "../config";
import Asset from "../classes/Asset";

export default class Player extends Entity {
    constructor(props) {
        super(props);

        this.x = 0;
        this.y = 0;
        this.width = config.player.width;
        this.height = config.player.height;
        this.fireInterval = 1000 / config.missile.fireRate;
        this.lastFireTime = 0;
        this.zIndex = 1;
        this.autoFire = false;

        console.log(this.x, this.y);

        document.addEventListener('keydown', () => {
            if (this.game.keyPressed('F')) {
                this.autoFire = !this.autoFire;
            }
        });
    }

    update() {
        this.x = Math.max(0, this.game.mouse.x - (this.width / 2));
        this.x = Math.min(this.game.width - this.width, this.x);
        this.y = Math.max(0, this.game.mouse.y - (this.height / 2));
        this.y = Math.min(this.game.height - this.height, this.y);

        if (this.game.mouse.pressed || this.autoFire) {
            this.fire();
        }
    }

    fire() {
        if (this.lastFireTime + this.fireInterval > Date.now()) {
            return;
        }
        this.lastFireTime = Date.now();

        this.game.add(Missile, {
            x: (this.x + (this.width / 2)) - (config.missile.width / 2),
            y: this.y
        });
    }

    draw() {
        const asset = Asset.get('player');

        if (asset === null) {
            return;
        }

        this.game.ctx.drawImage(asset, this.x, this.y, this.width, this.height);
    }
}
