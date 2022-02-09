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
        console.log(data);
        switch (data.cmd) {

            case Responses.LoadBuddyListResponse:
                const loadBuddyList = new CustomEvent('loadBuddyList', {
                    detail: data.data
                })
                document.dispatchEvent(loadBuddyList);
                break;

            case Responses.LoginResponse:
                const loginEvent = new CustomEvent('loginResponse', {
                    detail: {
                        success: data.data.success,
                        userId: data.data.userId
                    }
                });
                document.dispatchEvent(loginEvent);
                break;
            case Responses.UserDataResponse:
                this.divinity.player = new Player(this.game, data.data);
                break;
            case Responses.UserMovedResponse:
                const userMovedEvent = new CustomEvent('userMoved', {
                    detail: data.data
                });
                document.dispatchEvent(userMovedEvent);
                break;
            case Responses.UserJoinedResponse:
                const userJoinedEvent = new CustomEvent('userJoined', {
                    detail: data.data
                });
                document.dispatchEvent(userJoinedEvent);
                break;
            case Responses.LoadRoomResponse:
                const players = Object.keys(data.data)
                    .filter(x => x.startsWith('player'))
                    .map(x => data.data[x]);
                const roomLoadedEvent = new CustomEvent('roomLoaded', {
                    detail: players
                });
                document.dispatchEvent(roomLoadedEvent);
                break;
            case Responses.UserLeftResponse:
                const userLeftEvent = new CustomEvent('userLeft', {
                    detail: data.data
                });
                document.dispatchEvent(userLeftEvent);
                break;
            case Responses.ChatMessageReceived:
                const chatMsgReceived = new CustomEvent('chatMessageReceived', {
                    detail: data.data
                })
                document.dispatchEvent(chatMsgReceived);
                break;
            case Responses.InventoryLoaded:
                const inventoryLoadedEvent = new CustomEvent('loadInventory', {
                    detail:data.data
                })
                document.dispatchEvent(inventoryLoadedEvent);
                break;
            case Responses.InventoryItemRemoved:
                const itemRemovedEvent = new CustomEvent('inventoryItemRemoved', {
                    detail: data.data
                })
                break;

        }
    }


}
