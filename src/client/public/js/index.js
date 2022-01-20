import Divinity from "../divinity/divinity.js";

let myAvatar;
const path = 'ws://127.0.0.1:6969/Game';
let app;
let myUserId;
const divinity = new Divinity(path);

const usersInRoom = {};
const userPositions = [];

document.addEventListener('loginResponse', (e) => {
    e.detail.success ? loginSuccess(e.detail.userId) : loginFail();
});

document.addEventListener('loadingComplete', (e) => {

    buildGameCanvas(e.detail);
})


document.addEventListener('roomLoaded', (e) => {
    //  console.log(e.detail);
    e.detail.forEach(player => {
        // console.log(player.userId);
        //  console.log(`my ${myUserId}`)

        if (!Object.keys(usersInRoom).includes(player.userId)) {
            usersInRoom[Number(player.userId)] = player;
        }
        if (Number(player.userId) !== Number(myUserId)) {
            let newObj = {};
            newObj[Number(player.userId)] = loadMyAvatar(app, player, false);
            userPositions.push(newObj);
            console.log(userPositions);
        } else {
            //  console.log("my avatar being loaded");
            let newObj = {};
            newObj[Number(player.userId)] = loadMyAvatar(app, player, false);
            userPositions.push(newObj);
            console.log(userPositions);
            loadMyAvatar(app, player, true)
        }

    })


})

document.addEventListener('userJoined', (e) => {
    if (Number(e.detail.userId) !== Number(myUserId)) {
        addPlayerToStage(e.detail);
        if (!Object.keys(usersInRoom).includes(e.detail.userId)) {
            usersInRoom[Number(e.detail.userId)] = e.detail;
        }
    }
    console.table(usersInRoom)
})

const get = (id) => {
    return document.querySelector(`#${id}`);
}

get('login-form').onsubmit = (e) => {
    e.preventDefault();
    const userId = get('user-id').value;
    myUserId = userId;
    const password = get('password').value;
    divinity.doLogin(userId, password);
}

const loginSuccess = async (userId) => {
    get('login-div').style.display = 'none';
    startGameLoading();
}
const loginFail = () => {
    if (!loginFailed) {
        loginFailed = true;
        let p = document.createElement('p');
        p.style.color = '#FF0000';
        p.style.fontWeight = 'bold';
        p.id = 'login-error';
        p.innerText = 'The credentials you entered are invalid.';
        get('login-form').prepend(p);
    }

}

let loginFailed = false;


const startGameLoading = () => {

    const h3 = document.createElement('h3');
    h3.innerText = 'Loading...';
    h3.style.fontWeight = 'bold';
    h3.id = 'loading-text';
    // document.body.appendChild(h3);


}

let avatar;
let gameCanvas;
let stage;
const buildGameCanvas = (playerData) => {
    app = new PIXI.Application({
        width: 800,
        height: 600,
        backgroundColor: 0xFFFFFF,
    });
    stage = app.stage;
    gameCanvas = app.view;
    gameCanvas.style.border = "2px solid black";
    gameCanvas.style.borderRadius = "10px";
    document.body.appendChild(app.view);
    const {coins, username} = playerData.playerData;
    const coinBalance = new PIXI.Text(`Coins: ${coins}`)
    app.stage.addChild(coinBalance);
    app.stage.interactive = true;
    gameCanvas.addEventListener('click', (e) => {
        moveMyPlayer(getMousePosition(gameCanvas, e));

    })
}

const addPlayerToStage = (user) => {

    let newPlayer = new PIXI.Container();
    newPlayer.x = user.coordinates.X;
    newPlayer.y = user.coordinates.Y;
    const circle = new PIXI.Graphics();
    circle.beginFill(0x57B1FF);
    circle.drawCircle(30, 30, 30)
    circle.endFill();
    const namePlate = new PIXI.Graphics();
    namePlate.beginFill(0xC7C7C7);
    namePlate.drawRoundedRect(0, 0, 80, 20, 10);
    namePlate.endFill();
    namePlate.x = circle.x - 10
    namePlate.y = circle.y + 65
    const style = new PIXI.TextStyle({
        fontSize: 23
    });
    const avatarName = new PIXI.Text(user.username, style);
    avatarName.y -= 5
    avatarName.x += 5
    avatarName.fontSize = 5;
    namePlate.addChild(avatarName);
    newPlayer.addChild(circle);
    newPlayer.addChild(namePlate);
    app.stage.addChild(newPlayer);

}

const loadMyAvatar = (app, player, isMe) => {
    if (isMe) {
        myAvatar = new PIXI.Container();
        myAvatar.x = app.view.width / 2
        myAvatar.y = app.view.height / 2
        const circle = new PIXI.Graphics();
        circle.beginFill(0x57B1FF);
        circle.drawCircle(30, 30, 30)
        circle.endFill();
        const namePlate = new PIXI.Graphics();
        namePlate.beginFill(0xC7C7C7);
        namePlate.drawRoundedRect(0, 0, 80, 20, 10);
        namePlate.endFill();
        namePlate.x = circle.x - 10
        namePlate.y = circle.y + 65
        const style = new PIXI.TextStyle({
            fontSize: 23
        });
        const avatarName = new PIXI.Text(player.username, style);
        avatarName.y -= 5
        avatarName.x += 5
        avatarName.fontSize = 5;
        namePlate.addChild(avatarName);
        myAvatar.addChild(circle);
        myAvatar.addChild(namePlate);
        app.stage.addChild(myAvatar)
        return myAvatar;
    } else {

        avatar = new PIXI.Container();
        avatar.x = player.coordinates.X;
        avatar.y = player.coordinates.Y;
        const circle = new PIXI.Graphics();
        circle.beginFill(0x57B1FF);
        circle.drawCircle(30, 30, 30)
        circle.endFill();
        const namePlate = new PIXI.Graphics();
        namePlate.beginFill(0xC7C7C7);
        namePlate.drawRoundedRect(0, 0, 80, 20, 10);
        namePlate.endFill();
        namePlate.x = circle.x - 10
        namePlate.y = circle.y + 65
        const style = new PIXI.TextStyle({
            fontSize: 23
        });
        const avatarName = new PIXI.Text(player.username, style);
        avatarName.y -= 5
        avatarName.x += 5
        avatarName.fontSize = 5;
        namePlate.addChild(avatarName);
        avatar.addChild(circle);
        avatar.addChild(namePlate);
        app.stage.addChild(avatar)
        return avatar;
    }


}

const moveMyPlayer = ({x, y}) => {
    divinity.player.move({x: x, y: y});
    gsap.to(myAvatar, {duration: 1, x: x, y: y});
}

const getMousePosition = (canvas, event) => {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    return {x: x, y: y};
}

const getPlayersInRoom = () => {
    console.log(usersInRoom);
}
