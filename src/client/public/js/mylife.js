import Login from './login.js';
import Events from './events.js';
import Utils from './utils.js';
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
        Utils.get('mainDiv').appendChild(app.view)

        let chatForm = document.createElement('form');
        chatForm.id = 'chat-form';
        let chatBox = document.createElement('input');
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
        const coinBalance = new PIXI.Text(`Coins: ${coins}`)
        app.stage.addChild(coinBalance);
        app.stage.interactive = true;
        app.view.addEventListener('click', (e) => {
            this.moveMyPlayer(this.getMousePosition(app.view, e), true);

        })
        return app;
    }


    addAvatarToStage(player, isMe, coordinates) {
        const newAvatar = isMe ? this.myAvatar = this.drawAvatar(player,coordinates) : this.avatar = this.drawAvatar(player,coordinates);
        this.app.stage.addChild(newAvatar);
        return newAvatar;
    }

    removeAvatarFromStage(userId) {
        this.app.stage.removeChild(this.getAvatarById(userId));
        console.log(this.userPositions);
        this.userPositions = this.userPositions.filter(user => !user.hasOwnProperty(userId));
        console.log(this.userPositions);
    }

    getMousePosition(canvas, event) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        return {x: x, y: y};
    }

    drawAvatarCircle() {
        const circle = new PIXI.Graphics();
        circle.beginFill(0x57B1FF);
        circle.drawCircle(30, 30, 30)
        circle.endFill();
        return circle;
    }

    drawAvatarNameplate(username, circle) {
        const namePlate = new PIXI.Graphics();
        const style = new PIXI.TextStyle({fontSize: 23});
        const avatarName = new PIXI.Text(username, style);
        namePlate.beginFill(0xC7C7C7);
        namePlate.drawRoundedRect(0, 0, 80, 20, 10);
        namePlate.endFill();
        namePlate.x = circle.x - 10
        namePlate.y = circle.y + 65
        avatarName.y -= 5
        avatarName.x += 5
        avatarName.fontSize = 5;
        namePlate.addChild(avatarName);
        return namePlate;
    }

    drawAvatar(player,coordinates) {
        const avatar = new PIXI.Container();
        const avatarCircle = avatar.addChild(this.drawAvatarCircle());
        avatar.addChild(this.drawAvatarNameplate(player.username, avatarCircle));
        avatar.x = coordinates.X;
        avatar.y = coordinates.Y;
        return avatar;
    }

    getAvatarById(userId) {
        const obj = this.userPositions.find(user => user.hasOwnProperty(Number(userId)));
        return obj[userId];
    }

    moveMyPlayer({x, y}, isMe, userId) {
        isMe && this.divinity.player.move({x: x, y: y});
        gsap.to(isMe ? this.myAvatar : this.getAvatarById(userId), {duration: 1, x: x, y: y});
    }

    drawChatBubble(fromUser, messageText) {
        const chatBubble = new PIXI.Graphics();
        chatBubble.beginFill(0x57B1FF);
        chatBubble.drawRoundedRect(0, 0, 80, 20, 10);
    }

    chatMessageReceived(fromUser, messageText) {
        console.log(`${fromUser} said ${messageText}`);
        const player = this.userPositions.find(user => user.hasOwnProperty(fromUser));
        this.drawChatBubble(player, messageText)
    }

}