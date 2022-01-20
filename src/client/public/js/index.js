import Divinity from "../divinity/divinity.js";
import MyLife from './mylife.js';
import Login from './login.js';
import Events from './events.js';
import Utils from './utils.js';
const myLife = new MyLife(new Divinity('ws://127.0.0.1:6969/Game'));
const login = new Login();
const events = new Events(myLife,login);
Utils.get('login-form').onsubmit = (e) => {
    e.preventDefault();
    const userId = Utils.get('user-id').value;
    myLife.myUserId = userId;
    const password = Utils.get('password').value;
    myLife.divinity.doLogin(userId, password);
}

