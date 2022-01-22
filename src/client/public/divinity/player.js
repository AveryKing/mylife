import Commands from "./commands.js";

export default class Player {

    constructor(game, playerData) {
        this.game = game;
        this.x = undefined;
        this.y = undefined;
        this.userId = playerData.userId;
        this.username = playerData.username;
        this.money = playerData.money;
        this.modLevel = playerData.modLevel;
        const loadingEvent = new CustomEvent('loadingComplete', {
            detail: {
                playerData
            }
        });
        document.dispatchEvent(loadingEvent);
    }

    move({x, y}) {
        this.x = x;
        this.y = y;
        this.game.send(Commands.movePlayer(x, y));
    }
}