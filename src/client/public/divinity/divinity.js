import Commands from './commands.js'
import EventHandler from './event-handler.js'
import Player from './player.js';

export default class Divinity {
    constructor(path) {
        this.game = new WebSocket(path);
        this.eventHandler = new EventHandler(this,this.game);
        this.player = undefined;
    }

    doRegistration() {

    }
    doLogin(userId, loginKey) {
        this.game.send(Commands.login(userId, loginKey));
    }

    sendChat(fromUser, messageText) {
        this.game.send(Commands.sendChat(fromUser, messageText));
    }

    getBuddyList() {
      this.game.send(Commands.getBuddyList());
    }



}





