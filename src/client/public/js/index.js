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

const buildGameCanvas = (playerData) => {
    playerData = playerData.playerData;
    let canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    canvas.style.border = '2px solid black';
    canvas.style.borderRadius = '10px';
    document.body.appendChild(canvas);


}
