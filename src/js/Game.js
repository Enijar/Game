import _ from "lodash";
import Control from "./classes/Control";
import Enemy from "./entities/Enemy";
import Util from "./classes/Util";
import config from "./config";
import Asset from "./classes/Asset";

export default class Game {
    constructor(props) {
        this.lastEnemyTime = 0;
        this.lastEnemyInterval = 1000 / config.enemy.spawnRate;
        this.lastDrawTime = 0;
        this.debug = true;
        this.gameOver = false;
        this.canvas = document.querySelector('#canvas');
        this.ctx = this.canvas.getContext('2d');
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.entities = {};
        this.keyCodes = [];
        this.score = 0;

        this.mouse = {
            x: (this.width + config.player.width) / 2,
            y: this.height + config.player.height,
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

        if (this.gameOver) {
            const text = `Game Over`;
            this.ctx.fillStyle = 'rgba(255, 255, 255, 1)';
            this.ctx.font = '30px Arial';
            this.ctx.fillText(text, (this.width - this.ctx.measureText(text).width) / 2, (this.height - 30) / 2);
            return;
        }

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

                const collisions = Util.entityCollisions(entity, this.entities);

                if (collisions.length > 0) {
                    for (let i = 0; i < collisions.length; i++) {
                        const collision = collisions[i];

                        // Enemy vs. Player check
                        if (entity.name === 'Enemy' && collision.name === 'Player') {
                            this.gameOver = true;
                            break;
                        }

                        // Missile vs. Enemy check
                        if (entity.name === 'Missile' && collision.name === 'Enemy') {
                            this.score++;
                            this.remove(collision.id);
                        }
                    }
                }

                entity.update();
                entity.draw();
            }
        }

        // Show score
        const score = `Score: ${this.score}`;
        this.ctx.fillStyle = 'rgba(255, 255, 255, 1)';
        this.ctx.font = '30px Arial';
        this.ctx.fillText(score, this.width - this.ctx.measureText(score).width - 20, 40);

        // Show debug-specific info.
        if (config.debug) {
            this.ctx.fillStyle = 'rgba(255, 255, 255, 1)';
            this.ctx.font = '30px Arial';
            this.ctx.fillText(`Total entities: ${Object.keys(this.entities).length}`, 20, 40);
        }
    }
}
