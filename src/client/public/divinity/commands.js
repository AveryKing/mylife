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
}