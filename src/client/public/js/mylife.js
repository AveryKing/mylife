import Login from './login.js';
import Events from './events.js';
import Utils from './utils.js';
import PlayerContextMenu from "./player-context-menu.js";
import BuddyList from './buddy-list.js';
import UserInterface from "./user-interface.js";

export default class MyLife {
    constructor(divinity) {
        this.myLifeEvents = new Events(this, new Login());
        this.divinity = divinity;
        this.myAvatar = undefined;
        this.avatarSprite = undefined;
        this.app = undefined;
        this.myUserId = undefined;
        this.avatar = undefined;
        this.stage = undefined;
        this.usersInRoom = {};
        this.userPositions = [];
        this.chatMessages = [];
        this.mouseOverAvatar = false;
        this.playerContextMenuOpen = false;
        this.inventory = undefined;
    }

    setup() {
        return PIXI.Loader.shared.resources["assets/spritesheet.json"]

    }
    buildGameCanvas(playerData) {
        // Draws HTML5 Canvas
        const app = new PIXI.Application({
            width: 800,
            height: 600,

            backgroundColor: 0xFFFFFF,
        });

        // Loads avatar assets
        let loader = PIXI.Loader.shared;
        loader.onComplete.add(() => {
            let sheet = PIXI.Loader.shared.resources["assets/spritesheet.json"].spritesheet
            console.log(sheet)
            let avatar = new PIXI.AnimatedSprite(sheet.animations["walk"]);
            avatar.scale.set(0.225)
            avatar.animationSpeed = 0.4;
            this.avatarSprite = avatar;

        })
        loader
            .add("assets/spritesheet.json")
            .load(this.setup);


        /// UI setup
        app.view.style.border = "2px solid black";
        app.view.style.position = 'absolute';
        app.view.style.zIndex = -1;
        app.view.style.borderRadius = "10px";
        const div = document.createElement('div');
        div.id = 'mainDiv';
        document.body.appendChild(div)
        Utils.get('mainDiv').appendChild(app.view);
        const {coins} = playerData.playerData;
        const coinBalance = new PIXI.Text(`Coins: ${coins}`);
        this.stage = app.stage;
        app.stage.addChild(coinBalance);
        app.stage.interactive = true;
        new UserInterface(this.myLifeEvents);

        /**
         * Event listeners (walking & changing directions
         */
        app.view.addEventListener('click', (e) => {
            if (!this.mouseOverAvatar && !this.playerContextMenuOpen) {
                this.moveMyPlayer(this.getMousePosition(app.view, e), true);
            }
        })
        app.view.addEventListener('mousemove', (e) => {
            if(this.getMousePosition(app.view, e).x > this.myAvatar.x) {
                this.myAvatar.faceRight();
            } else {
                this.myAvatar.faceLeft();
            }
        })

        return app;
    }

    toggleStageInteractive() {
        this.app.stage.interactive = !this.app.stage.interactive;
    }

    loadInventory(items) {
        this.inventory = items;
        console.log(this.inventory);
    }

    addAvatarToStage(player, isMe, coordinates) {
        const newAvatar = isMe ? this.myAvatar = this.drawAvatar(player, coordinates) : this.avatar = this.drawAvatar(player, coordinates);
        this.app.stage.addChild(newAvatar);
        newAvatar.stopWalking = function test(newAvatar){
           alert(1)
        }
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

    drawAvatarNameplate(username, circle) {
        const namePlate = new PIXI.Graphics();
        const style = new PIXI.TextStyle({fontSize: 23});
        const avatarName = new PIXI.Text(username, style);
        namePlate.beginFill(0xC7C7C7);
        namePlate.drawRoundedRect(0, 0, 80, 20, 10,20,20);
        namePlate.endFill();
        namePlate.x = circle.x - 10;
        namePlate.y = circle.y + 140;
        avatarName.y -= 5;
        avatarName.x += 5;
        avatarName.fontSize = 5;
        namePlate.addChild(avatarName);
        return namePlate;
    }

    drawAvatar(player, coordinates) {
        let sheet = PIXI.Loader.shared.resources["assets/spritesheet.json"].spritesheet;
        let animatedSprite = new PIXI.AnimatedSprite(sheet.animations["walk"]);
        animatedSprite.interactive = true;
        animatedSprite.mousedown = () => {
            const avatar = this.userPositions.find(x => x.hasOwnProperty(player.userId))[player.userId]
            const x = avatar.x;
            const y = avatar.y;
            new PlayerContextMenu(this, player, x, y);
        }
        animatedSprite.scale.set(0.225)
        animatedSprite.anchor.set(0.5, 0.5);
        animatedSprite.animationSpeed = 0.4;
        const avatar = new PIXI.Container();
        avatar.addChild(animatedSprite);
        avatar.addChild(this.drawAvatarNameplate(player.username, animatedSprite));
        avatar.x = coordinates.X;
        avatar.y = coordinates.Y
        avatar.onmouseover = (e) => {
            alert(1);
            this.mouseOverAvatar = true;
            avatar.cursor = "url('point-cursor.cur'),auto";
            /*
            circle.clear();
            circle.beginFill(0x57B1FF);
            circle.lineStyle(5, 0xC1D500, 0.6);
            circle.drawCircle(30, 30, 30);
            circle.endFill()

             */
        }

        avatar.mouseout = (mouseData) => {
            this.mouseOverAvatar = false;
            /*
            circle.clear();
            circle.beginFill(0x57B1FF);
            circle.drawCircle(30, 30, 30);
            circle.endFill()
            */

        }

        avatar.faceRight = () => {
            if(!this.currentlyWalking) {
                avatar.children[0].scale.x = .225;
            }

        }
        avatar.faceLeft = () => {
            if(!this.currentlyWalking) {

                avatar.children[0].scale.x = -.225;
            }

        }

        avatar.doWalk = () => {
            avatar.children[0].play();
        }

        avatar.stopWalk = () => {

                avatar.children[0].gotoAndStop(0);


        }
        //avatar.children[0].play();
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
        const movedAvatar = isMe ? this.myAvatar : this.getAvatarById(userId);
        movedAvatar.doWalk();
        gsap.to(movedAvatar, {duration: 3, x: x, y: y,
            onComplete:movedAvatar.stopWalk})
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