import Game from "./Game";
import Player from "./entities/Player";
import Asset from "./classes/Asset";

Asset.loadAll([
    {
        id: 'enemy',
        src: 'img/enemy.png'
    },
    {
        id: 'missile',
        src: 'img/missile.png'
    },
    {
        id: 'splash',
        src: 'img/splash.png'
    },
    {
        id: 'player',
        src: 'img/player.png'
    }
]);

const game = new Game();
game.add(Player);
