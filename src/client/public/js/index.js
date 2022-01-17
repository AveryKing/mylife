import Divinity from "../divinity/divinity.js";
const path = 'ws://127.0.0.1:6969/Game';
const divinity = new Divinity(path);

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