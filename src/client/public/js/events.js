import Utils from "./utils.js";

export default class Events {
    constructor(myLife, login) {
        this.myLife = myLife;

        Utils.get('login-form').onsubmit = (e) => {
            e.preventDefault();
            const userId = Utils.get('user-id').value;
            const password = Utils.get('password').value;
            myLife.myUserId = userId;
            myLife.divinity.doLogin(userId, password);
        }

        document.addEventListener('loginResponse', (e) => {
            e.detail.success ? login.loginSuccess(e.detail.userId) : login.loginFail();
        });

        document.addEventListener('loadingComplete', (e) => {
            myLife.app = myLife.buildGameCanvas(e.detail, myLife.divinity, myLife.myAvatar);
        })

        document.addEventListener('roomLoaded', (e) => {
            e.detail.forEach(player => {
                const newObj = {};
                const isMe = Number(player.userId) === Number(myLife.myUserId);
                if (!Object.keys(myLife.usersInRoom).includes(player.userId)) {
                    myLife.usersInRoom[Number(player.userId)] = player;
                }
                newObj[Number(player.userId)] = myLife.addAvatarToStage(player, isMe, player.coordinates);
                myLife.userPositions.push(newObj);
            })
        })

        document.addEventListener('userJoined', (e) => {
            const isMe = Number(e.detail.userId) === Number(myLife.myUserId);
            if (!isMe) {
                let newObj = {};
                newObj[e.detail.userId] = myLife.addAvatarToStage(e.detail, isMe, e.detail.coordinates);
                myLife.userPositions.push(newObj);
            }
            if (!Object.keys(myLife.usersInRoom).includes(e.detail.userId)) {
                myLife.usersInRoom[Number(e.detail.userId)] = e.detail;
            }
        })

        document.addEventListener('userMoved', (e) => {
            const coordinates = {
                x: e.detail.x,
                y: e.detail.y
            }
            myLife.moveMyPlayer(coordinates, false, e.detail.user)
        });

        document.addEventListener('userLeft', (e) => {
            myLife.removeAvatarFromStage(e.detail.userId);

        });

        document.addEventListener('chatMessageReceived', (e) => {
            const fromUser = e.detail.fromUser;
            const messageText = e.detail.text;
            myLife.chatMessageReceived(fromUser, messageText);
        })
    }

    setupGameUIEvents() {
        Utils.get('chat-form').onsubmit = (e) => {
            e.preventDefault();
            this.myLife.divinity.sendChat(this.myLife.myUserId, Utils.get('chat-text-box').value);
            Utils.get('chat-text-box').value = ''


        }
    }
}





