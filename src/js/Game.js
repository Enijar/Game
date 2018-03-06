import _ from "lodash";
import Control from "./classes/Control";
import Enemy from "./entities/Enemy";
import Util from "./classes/Util";
import config from "./config";
import Asset from "./classes/Asset";

export default class Game {
    constructor(props) {
        this.lastEnemyTime = 0;
        this.lastEnemyInterval = 2000;
        this.lastDrawTime = 0;
        this.loading = true;
        this.debug = true;
        this.canvas = document.querySelector('#canvas');
        this.ctx = this.canvas.getContext('2d');
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.entities = {};
        this.keyCodes = [];
        this.mouse = {
            x: 0,
            y: 0,
            pressed: false
        };

        this.draw = this.draw.bind(this);

        document.addEventListener('keydown', event => this.addKey(event));
        document.addEventListener('keyup', event => this.removeKey(event));
        document.addEventListener('mousemove', event => this.updateMouse(event));
        document.addEventListener('mousedown', () => this.mouse.pressed = true);
        document.addEventListener('mouseup', () => this.mouse.pressed = false);

        this.draw();

        setTimeout(() => this.loading = false, 3000);
    }

    addKey(event) {
        const keyCode = event.keyCode || event.which;
        if (this.keyCodes.indexOf(keyCode) === -1) {
            this.keyCodes.push(keyCode);
        }
    }

    removeKey(event) {
        const keyCode = event.keyCode || event.which;
        for (let i = this.keyCodes.length - 1; i >= 0; i--) {
            if (this.keyCodes[i] === keyCode) {
                this.keyCodes.splice(i, 1);
            }
        }
    }

    keyPressed(key) {
        return Control.pressed(key, this.keyCodes);
    }

    updateMouse(event) {
        this.mouse.x = event.pageX;
        this.mouse.y = event.pageY;
    }

    add(object, props = {}) {
        const entity = new object({game: this, ...props});
        this.entities[entity.id] = entity;

        // Sort entities by zIndex.
        // Convert object to array, then sort, then convert back to object.
        const sortedEntities = _.sortBy(_.toArray(this.entities), ['zIndex']);
        this.entities = _.chain(sortedEntities).keyBy('id').value();
    }

    remove(objectId) {
        if (this.entities.hasOwnProperty(objectId)) {
            delete this.entities[objectId];
        }
    }

    addEnemy() {
        if (this.lastEnemyTime + this.lastEnemyInterval > Date.now()) {
            return;
        }

        this.lastEnemyTime = Date.now();

        this.add(Enemy, {
            x: Util.rand(0, this.width - config.enemy.width),
            y: -config.enemy.height
        });
    }

    draw() {
        requestAnimationFrame(this.draw);

        const now = Date.now();
        const delta = now - this.lastDrawTime;

        if (delta <= 1000 / config.fps) {
            return;
        }

        this.lastDrawTime = now - (delta % (1000 / config.fps));
        this.ctx.clearRect(0, 0, this.width, this.height);

        if (this.loading) {
            const splash = Asset.get('splash');

            if (splash !== null) {
                this.ctx.drawImage(splash, 0, 0, splash.width, splash.height);
            }
            
            return;
        }

        this.addEnemy();

        for (let entityId in this.entities) {
            if (this.entities.hasOwnProperty(entityId)) {
                const entity = this.entities[entityId];
                entity.update();
                entity.draw();
            }
        }

        // Show debug-specific info.
        if (this.debug) {
            this.ctx.font = '30px Arial';
            this.ctx.fillText(`Total entities: ${Object.keys(this.entities).length}`, 0, 30);
        }
    }
}
