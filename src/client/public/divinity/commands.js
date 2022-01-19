export default class Commands {

    static login(userId, loginKey) {
        return JSON.stringify({
            cmd: "login",
            data: {
                "userId": userId,
                "loginKey":loginKey
            }
        })
    }

    static movePlayer(x, y) {
        return JSON.stringify({
            cmd: "movePlayer",
            data: {
                "x": x,
                "y":y
            }
        })
    }
}