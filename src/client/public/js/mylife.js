export default class MyLife {
    constructor(divinity) {
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
        let app = new PIXI.Application({
            width: 800,
            height: 600,
            backgroundColor: 0xFFFFFF,
        });
        app.view.style.border = "2px solid black";
        app.view.style.borderRadius = "10px";
        document.body.appendChild(app.view);
        const {coins} = playerData.playerData;
        const coinBalance = new PIXI.Text(`Coins: ${coins}`)
        app.stage.addChild(coinBalance);
        app.stage.interactive = true;
        app.view.addEventListener('click', (e) => {
            this.moveMyPlayer(this.getMousePosition(app.view, e));
        })
        return app;
    }

    3
    addAvatarToStage(player, isMe, coordinates) {
        let newAvatar = isMe ? this.myAvatar = this.drawAvatar(player,coordinates) : this.avatar = this.drawAvatar(player,coordinates);
        this.app.stage.addChild(newAvatar);
        return newAvatar;
    }

    getMousePosition(canvas, event) {
        let rect = canvas.getBoundingClientRect();
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;
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
        namePlate.beginFill(0xC7C7C7);
        namePlate.drawRoundedRect(0, 0, 80, 20, 10);
        namePlate.endFill();
        namePlate.x = circle.x - 10
        namePlate.y = circle.y + 65
        const style = new PIXI.TextStyle({fontSize: 23});
        const avatarName = new PIXI.Text(username, style);
        avatarName.y -= 5
        avatarName.x += 5
        avatarName.fontSize = 5;
        namePlate.addChild(avatarName);
        return namePlate;
    }

    drawAvatar(player,coordinates) {
       // console.log(player);
        const avatar = new PIXI.Container();
        const avatarCircle = avatar.addChild(this.drawAvatarCircle());
        avatar.addChild(this.drawAvatarNameplate(player.username, avatarCircle));

        //const {x,y} = JSON.parse(JSON.stringify(player.coordinates));
        avatar.x = coordinates.X;
        avatar.y = coordinates.Y;
        return avatar;
    }

    moveMyPlayer({x, y}) {
        this.divinity.player.move({x: x, y: y});
        gsap.to(this.myAvatar, {duration: 1, x: x, y: y});
    }
}