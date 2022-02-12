import Utils from './Utils.js';
export default class GenericButton {
    constructor(app) {
        const button = new PIXI.Graphics();
        button.beginFill(0xD7DADD);
        button.drawRoundedRect(0, 0, 73, 25, 15,20,20);
        const text = new PIXI.Text('Send',new PIXI.TextStyle({fontSize: 17,fill:0xffffff}));
        text.x += 14
        text.y += 3.5;
        button.addChild(text);
        button.endFill();
        button.x = 523;
        button.y = 510.5
        button.interactive = true;
        text.interactive = false;
        button.mouseover = () => {
            button.clear();
            button.beginFill(0x38A0FB);
            button.drawRoundedRect(0, 0, 73, 25, 15,20,20);
            button.endFill();
            button.x = 523;
            button.y = 510.5;
        }
        button.mouseout = () => {
            button.clear();
            button.beginFill(0xD7DADD);
            button.drawRoundedRect(0,0,73,25,15,20,20);
            button.endFill();
            button.x = 523;
            button.y = 510.5;

        }
        button.mousedown = () => {
            const chatSendEvent = new CustomEvent('chatSend');
            document.dispatchEvent(chatSendEvent);
        }
        app.stage.addChild(button);
    }
}
