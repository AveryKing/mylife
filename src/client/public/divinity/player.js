export default class Player {

    constructor(playerData) {
       this.userId = playerData.userId;
       this.username = playerData.username;
       this.money = playerData.money;
       this.modLevel = playerData.modLevel;
        const loadingEvent = new CustomEvent('loadingComplete', {
            detail: {
                playerData
            }
        });
        document.dispatchEvent(loadingEvent);
    }

}