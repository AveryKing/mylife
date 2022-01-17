import Commands from './commands.js'
import EventHandler from './event-handler.js'
import Player from './player.js';

export default class Divinity {
    constructor(path) {
        this.game = new WebSocket(path);
        this.eventHandler = new EventHandler(this);
        this.player = undefined;
    }

    doLogin(userId, loginKey) {
        this.game.send(Commands.login(userId, loginKey));
    }



}





