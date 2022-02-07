export default class Commands {

    static register(username,gender) {
        return JSON.stringify({
            "cmd":"register",
            "data": {
                "username": username,
                "gender":gender
            }
        })
    }
    static login(userId, loginKey) {
        return JSON.stringify({
            "cmd": "login",
            "data": {
                "userId": userId,
                "loginKey": loginKey
            }
        })
    }

    static movePlayer(x, y) {
        return JSON.stringify({
            "cmd": "movePlayer",
            "data": {
                "x": x,
                "y": y
            }
        })
    }

    static sendChat(fromUser, messageText) {
        return JSON.stringify({
            "cmd": "sendChatMessage",
            "data": {
                "fromUser": fromUser,
                "text": messageText
            }
        })
    }

    static getBuddyList() {
        return JSON.stringify({
            "cmd":"getBuddyList"
        })
    }
}