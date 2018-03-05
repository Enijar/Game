import Control from "./classes/Control";

export default class Game {
    constructor(props) {
        this.canvas = document.querySelector('#canvas');
        this.ctx = this.canvas.getContext('2d');
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.objects = [];
        this.keyCodes = [];
        this.mouse = {
            x: 0,
            y: 0
        };

        document.addEventListener('keydown', event => this.addKey(event));
        document.addEventListener('keyup', event => this.removeKey(event));
        document.addEventListener('mousemove', event => this.updateMouse(event));

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

    updateMouse(event) {
        this.mouse.x = event.pageX;
        this.mouse.y = event.pageY;
    }

    keyPressed(key) {
        return Control.pressed(key, this.keyCodes);
    }

    add(object, props = {}) {
        props = Object.assign(props, {
            game: this
        });
        this.objects.push(new object(props));
    }

    remove(object) {
        for (let i = this.objects.length - 1; i >= 0; i--) {
            if (object.id === this.objects[i].id) {
                this.objects.splice(i, 1);
            }
        }
    }

    draw() {
        requestAnimationFrame(() => this.draw());

        this.ctx.clearRect(0, 0, this.width, this.height);
        this.objects.map(object => object.update());
        this.objects.map(object => object.draw());
    }
}
