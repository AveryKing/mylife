import Divinity from "../divinity/divinity.js";
const path = 'ws://127.0.0.1:6969/Game';

const divinity = new Divinity(path);
document.addEventListener('loginResponse', (e) => {
    e.detail.success ? loginSuccess() : loginFail();
});

document.addEventListener('loadingComplete', (e) => {
    buildGameCanvas(e.detail);
})

const get = (id) => {
    return document.querySelector(`#${id}`);
}

/*document.querySelector('#login-button').onclick = () => {
    divinity.doLogin(1,'debug');
}*/


get('login-form').onsubmit = (e) => {
    e.preventDefault();
    const userId = get('user-id').value;
    const password = get('password').value;
    divinity.doLogin(userId,password);
}

const loginSuccess = () => {
    get('login-div').style.display = 'none';
    startGameLoading();
   // buildGameCanvas();
}
const loginFail = () => {
    if(!loginFailed) {
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
    let app = new PIXI.Application({
        width: 800,
        height: 600,
        backgroundColor:0xFFFFFF,
    });
    stage = app.stage;
    gameCanvas = app.view;
    gameCanvas.style.border = "2px solid black";
    gameCanvas.style.borderRadius = "10px";
    document.body.appendChild(app.view);
    playerData = playerData.playerData;
    loadMyAvatar(app);
    app.stage.interactive = true;

    gameCanvas.addEventListener('click', (e) => {
        movePlayer(getMousePosition(gameCanvas,e));

    })
}

const loadMyAvatar = (app) => {
    avatar = new PIXI.Container();
    avatar.x = app.view.width/2
    avatar.y = app.view.height/2
    const circle  = new PIXI.Graphics();
    circle.beginFill(0x57B1FF);
    circle.drawCircle(30, 30, 30)
    circle.endFill();
    const namePlate = new PIXI.Graphics();
    namePlate.beginFill(0xC7C7C7);
    namePlate.drawRoundedRect(0, 0, 80, 20, 10);
    namePlate.endFill();
    namePlate.x = circle.x -10
    namePlate.y = circle.y +65
    avatar.addChild(circle);
    avatar.addChild(namePlate);
    app.stage.addChild(avatar)
    return avatar;


}

const movePlayer = ({x,y}) => {
    gsap.to(avatar, {duration:1, x:x, y:y})
}

const getMousePosition = (canvas, event) => {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    return {x: x, y:y};
}