import Responses from "./responses.js";
import Player from "./player.js";

export default class EventHandler {
    constructor(divinity) {
        this.divinity = divinity;
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
                const loginEvent = new CustomEvent('loginResponse', {
                    detail: {
                        success: data.data.success
                    }
                });
                document.dispatchEvent(loginEvent);
                //data.data.success ? this.loginSuccess() : this.loginFail();
                break;
            case Responses.UserDataResponse:
                this.divinity.player = new Player(data.data);
                break;
        }
    }

    loginFail() {

    }

    loginSuccess() {
        window.alert('Login success');
    }
}
