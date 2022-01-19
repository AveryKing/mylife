import Responses from "./responses.js";
import Player from "./player.js";

export default class EventHandler {
    constructor(divinity, game) {
        this.divinity = divinity;
        this.game = game;
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.divinity.game.addEventListener('open', (e) => this.startGame(e));
        this.divinity.game.addEventListener('message', (e) => this.onMessage(e));

    }

    startGame() {

    }

    onMessage(e) {
        const data = JSON.parse(e.data)
        switch (data.cmd) {
            case Responses.LoginResponse:
                console.log(e.data);
                const loginEvent = new CustomEvent('loginResponse', {
                    detail: {
                        success: data.data.success,
                        userId: data.data.userId
                    }
                });
                document.dispatchEvent(loginEvent);
                //data.data.success ? this.loginSuccess() : this.loginFail();
                break;
            case Responses.UserDataResponse:
                this.divinity.player = new Player(this.game, data.data);
                break;
            case Responses.UserMovedResponse:
                // console.log(data);
                break;
            case Responses.UserJoinedResponse:
                // console.log(data);
                break;
            case Responses.LoadRoomResponse:
                const players = Object.keys(data.data)
                    .filter(x => x.startsWith('player'))
                    .map(x => data.data[x]);
                const roomLoadedEvent = new CustomEvent('roomLoaded', {
                    detail: players
                });
                document.dispatchEvent(roomLoadedEvent)
        }
    }

    loginFail() {

    }

    loginSuccess() {
        window.alert('Login success');
    }
}
