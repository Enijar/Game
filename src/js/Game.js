import Control from "./classes/Control";
import Enemy from "./entities/Enemy";
import Util from "./classes/Util";

export default class Game {
    constructor(props) {
        this.debug = true;
        this.canvas = document.querySelector('#canvas');
        this.ctx = this.canvas.getContext('2d');
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.entities = [];
        this.keyCodes = [];
        this.mouse = {
            x: 0,
            y: 0,
            pressed: false
        };

        document.addEventListener('keydown', event => this.addKey(event));
        document.addEventListener('keyup', event => this.removeKey(event));
        document.addEventListener('mousemove', event => this.updateMouse(event));
        document.addEventListener('mousedown', () => this.mouse.pressed = true);
        document.addEventListener('mouseup', () => this.mouse.pressed = false);

        this.draw();
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
        this.entities.push(entity);

        // this.entities.sort((a, b) => a.zIndex - b.zIndex);
        // console.log(this.entities);
    }

    remove(objectId) {
        for (let i = this.entities.length - 1; i >= 0; i--) {
            if (this.entities[i].id === objectId) {
                this.entities.splice(i, 1);
            }
        }
    }

    draw() {
        requestAnimationFrame(() => this.draw());

        this.ctx.clearRect(0, 0, this.width, this.height);

        // 10% chance of adding a new enemy.
        if (Util.rand(1, 100) > 90) {
            this.add(Enemy, {
                x: Util.rand(0, this.width - 50),
                y: -50
            });
        }

        // Update and draw all entities.
        const entities = this.entities;
        for (let i = 0; i < entities.length; i++) {
            const entity = entities[i];

            if (!entity) {
                continue;
            }

            entity.draw();
            entity.update();
        }

        // Show debug-specific info.
        if (this.debug) {
            this.ctx.font = '30px Arial';
            this.ctx.fillText(`Total entities: ${this.entities.length}`, 0, 30);
        }
    }
}
