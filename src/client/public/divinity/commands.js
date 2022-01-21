export default class Commands {

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
}