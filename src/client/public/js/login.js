const get = (id) => {
    return document.querySelector(`#${id}`);
}
export default class Login {
    constructor() {
        this.loginFailed = false;
    }
     loginSuccess (myLife, userId)  {
        get('login-div').style.display = 'none';
    }
     loginFail() {
        if (!this.loginFailed) {
            this.loginFailed = true;
            let p = document.createElement('p');
            p.style.color = '#FF0000';
            p.style.fontWeight = 'bold';
            p.id = 'login-error';
            p.innerText = 'The credentials you entered are invalid.';
            get('login-form').prepend(p);
        }
    }

}