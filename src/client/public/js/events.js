import Utils from "./utils.js";
import BuddyList from "./buddy-list.js";

export default class Events {
    constructor(myLife, login) {
        this.myLife = myLife;
        this.buddiesLoaded = false;
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
            myLife.divinity.getBuddyList();
        })

        document.addEventListener('roomLoaded', (e) => {
            myLife.divinity.getEvents();
            e.detail.forEach(player => {
                const newObj = {};
                myLife.removeOldAvatars();
                const isMe = Number(player.userId) === Number(myLife.myUserId);
                if (!Object.keys(myLife.usersInRoom).includes(player.userId)) {
                    myLife.usersInRoom[Number(player.userId)] = player;
                }
                setTimeout(() => {
                    newObj[Number(player.userId)] = myLife.addAvatarToStage(player, isMe, player.coordinates);
                    myLife.userPositions.push(newObj);
                },2500)

            })
        })

        document.addEventListener('roomData', (e) => {
            console.table(e.detail);
            myLife.currentRoomName.text = e.detail.roomName;
            myLife.currentRoomId = e.detail.roomId;
            console.log(myLife.currentRoomId)
        })

        document.addEventListener('loadBuddyList', (e) => {
            if(!this.buddiesLoaded) {
                this.buddiesLoaded = true;
                //new BuddyList(e.detail);
            }
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
            if(e.detail.userId === this.myLife.myUserId) {
                myLife.removeAvatarFromStage(0);
            } else {
                myLife.removeAvatarFromStage(e.detail.userId);
            }


        });

        document.addEventListener('eventsUpdate', (e) => {
            myLife.updateEvents(e.detail);
        })

        document.addEventListener('chatSend', (e) => {
            this.myLife.divinity.sendChat(this.myLife.myUserId, this.myLife.chatBox.text);
            this.myLife.chatBox.text = '';
        })

        document.addEventListener('chatMessageReceived', (e) => {
            const fromUser = e.detail.fromUser;
            const messageText = e.detail.text;
            myLife.chatMessageReceived(fromUser, messageText);
        })

        document.addEventListener('loadInventory', (e) => {
            myLife.loadInventory(Object.values(e.detail));
        })
    }

    chatMessageSent() {
        this.myLife.divinity.sendChat(this.myLife.myUserId,this.myLife.chatBox.text);
        this.myLife.chatBox.text = '';
    }

    setupGameUIEvents() {
        Utils.get('chat-form').onsubmit = (e) => {
            e.preventDefault();
            this.myLife.divinity.sendChat(this.myLife.myUserId, Utils.get('chat-input-text').text);
            Utils.get('chat-input-text').text = '';

        }
    }
}





