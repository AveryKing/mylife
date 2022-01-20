import Utils from './utils.js';

export default class Login {
    constructor() {
        this.loginFailed = false;
    }

    loginSuccess() {
        Utils.get('login-div').style.display = 'none';
    }

    loginFail() {
        if (!this.loginFailed) {
            this.loginFailed = true;
            const p = document.createElement('p');
            p.style.color = '#FF0000';
            p.style.fontWeight = 'bold';
            p.id = 'login-error';
            p.innerText = 'The credentials you entered are invalid.';
            Utils.get('login-form').prepend(p);
        }
    }

}