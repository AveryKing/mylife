export default class Events {
    constructor(myLife, login) {
        document.addEventListener('loginResponse', (e) => {
            e.detail.success ? login.loginSuccess(e.detail.userId) : login.loginFail();
        });

        document.addEventListener('loadingComplete', (e) => {
            myLife.app = myLife.buildGameCanvas(e.detail, myLife.divinity, myLife.myAvatar);
        })

        document.addEventListener('roomLoaded', (e) => {
            e.detail.forEach(player => {
                console.log(player);
                let newObj = {};
                let isMe = Number(player.userId) === Number(myLife.myUserId);
                if (!Object.keys(myLife.usersInRoom).includes(player.userId)) {
                    myLife.usersInRoom[Number(player.userId)] = player;
                }
                newObj[Number(player.userId)] = myLife.addAvatarToStage(player, isMe, player.coordinates);
                myLife.userPositions.push(newObj);
            })
        })

        document.addEventListener('userJoined', (e) => {
            const isMe = Number(e.detail.userId) === Number(myLife.myUserId);
            if(!isMe) {
                myLife.addAvatarToStage(e.detail, isMe, e.detail.coordinates);
            }
            if (!Object.keys(myLife.usersInRoom).includes(e.detail.userId)) {
                myLife.usersInRoom[Number(e.detail.userId)] = e.detail;
            }
        })
    }
}





