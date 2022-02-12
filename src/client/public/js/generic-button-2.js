import Utils from './Utils.js';
    class EventButton {
        constructor(app) {
            const button = new PIXI.Graphics();
            button.beginFill(0x0088FF);
            button.drawRoundedRect(0, 0, 86, 29, 5,20,20);
            const text = new PIXI.Text('Events',new PIXI.TextStyle({fontSize: 17,fill:0xffffff}));
            text.x += 16
            text.y += 5;
            button.addChild(text);
            button.endFill();
            button.x = 195;
            button.y = 555;
            button.interactive = true;
            text.interactive = false;
            button.mouseover = () => {
                button.clear();
                button.beginFill(0x38A0FB);
                button.drawRoundedRect(0, 0, 86, 29, 5,20,20);
                button.endFill();
                button.x = 195;
                button.y = 555;
            }
            button.mouseout = () => {
                button.clear();
                button.beginFill(0x0088FF);
                button.drawRoundedRect(0, 0, 86, 29, 5,20,20);
                button.endFill();
                button.x = 195;
                button.y = 555;

            }
            button.mousedown = () => {
                const chatSendEvent = new CustomEvent('chatSend');
                document.dispatchEvent(chatSendEvent);
            }
            app.stage.addChild(button);
        }


}

class BuddiesButton {
    constructor(app) {
        const button = new PIXI.Graphics();
        button.beginFill(0x0088FF);
        button.drawRoundedRect(0, 0, 86, 29, 5,20,20);
        const text = new PIXI.Text('Buddies',new PIXI.TextStyle({fontSize: 17,fill:0xffffff}));
        text.x += 14
        text.y += 5;
        button.addChild(text);
        button.endFill();
        button.x = 411;
        button.y = 555;
        button.interactive = true;
        text.interactive = false;
        button.mouseover = () => {
            button.clear();
            button.beginFill(0x38A0FB);
            button.drawRoundedRect(0, 0, 86, 29, 5,20,20);
            button.endFill();
            button.x = 411;
            button.y = 555;
        }
        button.mouseout = () => {
            button.clear();
            button.beginFill(0x0088FF);
            button.drawRoundedRect(0, 0, 86, 29, 5,20,20);
            button.endFill();
            button.x = 411;
            button.y = 555;

        }
        button.mousedown = () => {
            const chatSendEvent = new CustomEvent('chatSend');
            document.dispatchEvent(chatSendEvent);
        }
        app.stage.addChild(button);
    }


}

class InventoryButton {
    constructor(app) {
        const button = new PIXI.Graphics();
        button.beginFill(0x0088FF);
        button.drawRoundedRect(0, 0, 86, 29, 5,20,20);
        const text = new PIXI.Text('Inventory',new PIXI.TextStyle({fontSize: 17,fill:0xffffff}));
        text.x += 10
        text.y += 5;
        button.addChild(text);
        button.endFill();
        button.x = 519;
        button.y = 555;
        button.interactive = true;
        text.interactive = false;
        button.mouseover = () => {
            button.clear();
            button.beginFill(0x38A0FB);
            button.drawRoundedRect(0, 0, 86, 29, 5,20,20);
            button.endFill();
            button.x = 519;
            button.y = 555;
        }
        button.mouseout = () => {
            button.clear();
            button.beginFill(0x0088FF);
            button.drawRoundedRect(0, 0, 86, 29, 5,20,20);
            button.endFill();
            button.x = 519;
            button.y = 555;

        }
        button.mousedown = () => {
            const chatSendEvent = new CustomEvent('chatSend');
            document.dispatchEvent(chatSendEvent);
        }
        app.stage.addChild(button);
    }


}

export default class UIButtons {
    constructor(app) {
        new EventButton(app);
        new BuddiesButton(app);
        new InventoryButton(app);
    }
}
