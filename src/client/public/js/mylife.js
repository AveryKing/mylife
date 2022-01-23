import Login from './login.js';
import Events from './events.js';
import Utils from './utils.js';
import PlayerContextMenu from "./player-context-menu.js";
export default class MyLife {
    constructor(divinity) {
        this.myLifeEvents = new Events(this, new Login());
        this.divinity = divinity;
        this.myAvatar = undefined;
        this.app = undefined;
        this.myUserId = undefined;
        this.avatar = undefined;
        this.stage = undefined;
        this.usersInRoom = {};
        this.userPositions = [];
        this.chatMessages = [];
        this.mouseOverAvatar = false;
    }

    buildGameCanvas(playerData) {
        const app = new PIXI.Application({
            width: 800,
            height: 600,
            backgroundColor: 0xFFFFFF,
        });
        app.view.style.border = "2px solid black";
        app.view.style.position = 'absolute';
        app.view.style.zIndex = -1;
        app.view.style.borderRadius = "10px";
        const div = document.createElement('div');
        div.id = 'mainDiv';
        document.body.appendChild(div)
        Utils.get('mainDiv').appendChild(app.view);
        let chatForm = document.createElement('form');
        chatForm.id = 'chat-form';
        let chatBox = document.createElement('input');
        chatBox.autocomplete = 'off';
        chatBox.id = 'chat-text-box';
        chatBox.type = 'text';
        chatBox.style.position = 'absolute';
        chatBox.style.top = "575px";
        chatBox.style.left = '180px';
        chatBox.placeholder = 'Enter chat message here...';
        chatBox.style.height = '30px';
        chatBox.style.borderRadius = '10px';
        chatBox.style.width = '400px';
        chatBox.style.zIndex = 4;
        chatForm.appendChild(chatBox);
        let chatSend = document.createElement('button');
        chatSend.type = 'submit';
        chatSend.style.position = 'absolute';
        chatSend.style.top = '576px';
        chatSend.style.left = '590px';
        chatSend.style.borderRadius = '8px';
        chatSend.style.height = '33px';
        chatSend.innerText = 'Send';
        chatForm.appendChild(chatSend);
        Utils.get('mainDiv').appendChild(chatForm);
        this.myLifeEvents.setupGameUIEvents();
        const {coins} = playerData.playerData;
        const coinBalance = new PIXI.Text(`Coins: ${coins}`);
        this.stage = app.stage;
        app.stage.addChild(coinBalance);
        app.stage.interactive = true;
        app.view.addEventListener('click', (e) => {
                if(!this.mouseOverAvatar) this.moveMyPlayer(this.getMousePosition(app.view, e), true);

        })
        return app;
    }

     toggleStageInteractive() {
        this.app.stage.interactive = !this.app.stage.interactive;
    }
    addAvatarToStage(player, isMe, coordinates) {
        const newAvatar = isMe ? this.myAvatar = this.drawAvatar(player, coordinates) : this.avatar = this.drawAvatar(player, coordinates);
        this.app.stage.addChild(newAvatar);
        return newAvatar;
    }

    removeAvatarFromStage(userId) {
        this.app.stage.removeChild(this.getAvatarById(userId));
        this.userPositions = this.userPositions.filter(user => !user.hasOwnProperty(userId));
    }

    getMousePosition(canvas, event) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        return {x: x, y: y};
    }

    drawAvatarCircle(player) {
        const circle = new PIXI.Graphics();
        circle.beginFill(0x57B1FF);
        circle.drawCircle(30, 30, 30);
        circle.endFill()
        circle.interactive = true;
        circle.hitArea = new PIXI.Circle(30, 30, 30);
        circle.mouseover = (e) => {
            this.mouseOverAvatar = true;
            circle.cursor = "url('point-cursor.cur'),auto";
            circle.clear();
            circle.beginFill(0x57B1FF);
            circle.lineStyle(5, 0xC1D500, 0.6);
            circle.drawCircle(30, 30, 30);
            circle.endFill()
        }
        circle.click = (e) => {
            const avatar = this.userPositions.find(x => x.hasOwnProperty(player.userId))[player.userId]
            const x = avatar.x;
            const y = avatar.y;
            new PlayerContextMenu(this.app,x,y);
        }
        circle.mouseout = (mouseData) => {
            this.mouseOverAvatar = false;
            circle.clear();
            circle.beginFill(0x57B1FF);
            circle.drawCircle(30, 30, 30);
            circle.endFill()
        }
        return circle;
    }

    drawAvatarNameplate(username, circle) {
        const namePlate = new PIXI.Graphics();
        const style = new PIXI.TextStyle({fontSize: 23});
        const avatarName = new PIXI.Text(username, style);
        namePlate.beginFill(0xC7C7C7);
        namePlate.drawRoundedRect(0, 0, 80, 20, 10);
        namePlate.endFill();
        namePlate.x = circle.x - 10;
        namePlate.y = circle.y + 65;
        avatarName.y -= 5;
        avatarName.x += 5;
        avatarName.fontSize = 5;
        namePlate.addChild(avatarName);
        return namePlate;
    }

    drawAvatar(player, coordinates) {
        const avatar = new PIXI.Container();
        const avatarCircle = avatar.addChild(this.drawAvatarCircle(player));
        avatar.addChild(this.drawAvatarNameplate(player.username, avatarCircle));
        avatar.x = coordinates.X;
        avatar.y = coordinates.Y;
        return avatar;
    }

    drawPlayerContextMenu(player) {
        const menu = document.createElement('div');


    }

    getAvatarById(userId) {
        const obj = this.userPositions.find(user => user.hasOwnProperty(Number(userId)));
        return obj[userId];
    }

    moveMyPlayer({x, y}, isMe, userId) {
        isMe && this.divinity.player.move({x: x, y: y});
        gsap.to(isMe ? this.myAvatar : this.getAvatarById(userId), {duration: 1, x: x, y: y});
    }

    drawChatBubble(avatar, fromUser, messageText) {

        if (messageText.length > 1) {
            const chatBubbleContainer = new PIXI.Container();
            const chatBubble = new PIXI.Graphics();
            chatBubble.beginFill(0xEDEDED);
            chatBubble.lineStyle(1, 0x000000, 0.6)
            chatBubble.y = -40;
            chatBubble.x = 10;
            const style = new PIXI.TextStyle({fontSize: 15});
            const text = new PIXI.Text(messageText, style);
            chatBubble.drawRoundedRect(0, 0, text.width + 20, text.height + 10, 10);
            text.y = chatBubble.y + 3;
            text.x = chatBubble.x + 10;
            chatBubbleContainer.addChild(chatBubble);
            chatBubbleContainer.addChild(text);
            if (!this.chatMessages.some(x => x.hasOwnProperty(fromUser))) {
                let userChatMessages = {};
                let chatMsgArray = [];
                chatMsgArray.push(chatBubbleContainer);
                userChatMessages[fromUser] = chatMsgArray;
                this.chatMessages.push(userChatMessages)
            } else {
                let userObj = this.chatMessages.find(x => x.hasOwnProperty(fromUser));
                if (userObj[fromUser].length > 0) userObj[fromUser][userObj[fromUser].length - 1].y -= 30;
                if (userObj[fromUser].length === 2) userObj[fromUser][0].y -= 30;
                userObj[fromUser].push(chatBubbleContainer);
                if (userObj[fromUser].length > 2) {
                    userObj[fromUser].splice(0, 1);
                    avatar.removeChild(userObj[fromUser][2]);
                }
                console.log(userObj[fromUser]);
            }
            avatar.addChild(chatBubbleContainer);
            setTimeout(() => {
                let userObj = this.chatMessages.find(x => x.hasOwnProperty(fromUser));
                userObj[fromUser] = userObj[fromUser].filter(x => x !== chatBubbleContainer);
                avatar.removeChild(chatBubbleContainer);
            }, 5000)
        }


    }

    chatMessageReceived(fromUser, messageText) {
        const player = this.getAvatarById(fromUser);
        this.drawChatBubble(player, fromUser, messageText);
    }

}