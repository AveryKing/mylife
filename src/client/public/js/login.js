import Utils from './utils.js';

export default class Login {
    constructor() {
        this.loginFailed = false;
    }

    loginSuccess() {
        Utils.get('login-div').style.display = 'none';
        let loadingDiv = document.createElement('div');
        loadingDiv.id = "loading";
        let loadingCircle = document.createElement('img');
        loadingCircle.src = "assets/loading/loading-circle.gif";
        loadingDiv.appendChild(loadingCircle)
        document.body.appendChild(loadingDiv);
        setTimeout(() => {
            loadingDiv.style.display = 'none';
            Utils.get('mainDiv').style.display = 'block';
        },2500)
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