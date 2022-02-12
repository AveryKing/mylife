import Utils from './Utils.js';
import EventsList from "./events-list.js";
import Inventory from "./inventory.js";
    class EventButton {
        constructor(myLife, stage) {
            const button = new PIXI.Graphics();
            button.lineStyle(1.5, 0xFFFFFF, 0.8);
            button.beginFill(0x7A7B7C);
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
                button.lineStyle(1.5, 0xFFFFFF, 0.8);
                button.beginFill(0x38A0FB);
                button.drawRoundedRect(0, 0, 86, 29, 5,20,20);
                button.endFill();
                button.x = 195;
                button.y = 555;
            }
            button.mouseout = () => {
                button.clear();
                button.lineStyle(1.5, 0xFFFFFF, 0.8);

                button.beginFill(0x7A7B7C);
                button.drawRoundedRect(0, 0, 86, 29, 5,20,20);
                button.endFill();
                button.x = 195;
                button.y = 555;

            }
            button.mousedown = () => {
                if(!myLife.UI.eventsOpen) {
                    new EventsList(myLife, myLife.UI)
                    myLife.UI.eventsOpen = true;
                }

            }
           stage.addChild(button);
        }


}

class BuddiesButton {
    constructor(myLife, stage) {
        const button = new PIXI.Graphics();
        button.lineStyle(1.5, 0xFFFFFF, 0.8);

        button.beginFill(0x7A7B7C);
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
            button.lineStyle(1.5, 0xFFFFFF, 0.8);

            button.beginFill(0x38A0FB);
            button.drawRoundedRect(0, 0, 86, 29, 5,20,20);
            button.endFill();
            button.x = 411;
            button.y = 555;
        }
        button.mouseout = () => {
            button.clear();
            button.lineStyle(1.5, 0xFFFFFF, 0.8);

            button.beginFill(0x7A7B7C);
            button.drawRoundedRect(0, 0, 86, 29, 5,20,20);
            button.endFill();
            button.x = 411;
            button.y = 555;

        }
        button.mousedown = () => {
            const chatSendEvent = new CustomEvent('chatSend');
            document.dispatchEvent(chatSendEvent);
        }
        stage.addChild(button);
    }


}

class InventoryButton {
    constructor(myLife, stage) {
        const button = new PIXI.Graphics();
        button.lineStyle(1.5, 0xFFFFFF, 0.8);

        button.beginFill(0x7A7B7C);
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
            button.lineStyle(1.5, 0xFFFFFF, 0.8);

            button.beginFill(0x38A0FB);
            button.drawRoundedRect(0, 0, 86, 29, 5,20,20);
            button.endFill();
            button.x = 519;
            button.y = 555;
        }
        button.mouseout = () => {
            button.clear();
            button.lineStyle(1.5, 0xFFFFFF, 0.8);

            button.beginFill(0x7A7B7C);
            button.drawRoundedRect(0, 0, 86, 29, 5,20,20);
            button.endFill();
            button.x = 519;
            button.y = 555;

        }
        button.mousedown = () => {
            if(!myLife.UI.inventoryOpen) {
                new Inventory(myLife,myLife.UI)
                myLife.UI.inventoryOpen = true;
            }
        }
        stage.addChild(button);
    }


}

export default class UIButtons {
    constructor(myLife,stage) {
        new EventButton(myLife,stage);
        new BuddiesButton(myLife,stage);
        new InventoryButton(myLife,stage);
    }
}
