export default class PlayerContextMenu {
    constructor(app,x, y) {
        let buttonArray = [
            {
                id: 1,
                text: "Private Message"
            },
            {
                id: 2,
                text: "Trade Player"
            },
            {
                id: 3,
                text: "Add as Buddy"
            },
            {
                id: 4,
                text: "Visit Home"
            },
            {
                id: 5,
                text: "Report Player"
            }
        ];

        let menuContainer = new PIXI.Container();
        menuContainer.interactive = true;
        menuContainer.x = x;
        menuContainer.y = y;
        const menu = new PIXI.Graphics();
        menu.beginFill(0xFFFFFF);
        menu.lineStyle(2, 0x000000, 1);
        menu.drawRoundedRect(5, 5, 150, 150, 10)
        menu.endFill();
        const style = new PIXI.TextStyle({fontSize: 16});
        const name = new PIXI.Text('Avery', style);
        name.x = menu.width / 2.5;
        name.y = menu.height / 20
        menu.addChild(name);
        menuContainer.addChild(menu);
        app.stage.addChild(menuContainer);
        for (let i = 0; i < buttonArray.length; i++) {
            let buttonContainer = new PIXI.Container();
            let line = new PIXI.Graphics();
            line.position.set(-3, 29);
            line.lineStyle(1, 0x000000).moveTo(156, 0).lineTo(10, 0);
            let line2 = new PIXI.Graphics();
            line2.position.set(-3, 55);
            line2.lineStyle(1, 0x000000).moveTo(156, 0).lineTo(10, 0);
            let buttonText = new PIXI.Text(buttonArray[i].text, {fontSize: 15});
            let buttonBackground = new PIXI.Graphics;
            buttonBackground.beginFill(0xFFFFFF, 0.3);
            buttonBackground.drawRect(6, 30, line.width + 2, line2.y - line.y);
            buttonBackground.endFill();
            buttonContainer.addChild(buttonBackground);
            buttonText.style.width = line.width;
            buttonText.y = line.y + 4;
            buttonText.x = line.width / 5;
            buttonContainer.interactive = true;
            buttonContainer.addChild(buttonText);
            buttonContainer.addChild(line);
            buttonContainer.addChild(line2);
            buttonContainer.mouseover = (e) => {
                buttonContainer.cursor = "url('point-cursor.cur'),auto";
                buttonBackground.clear();
                buttonBackground.beginFill(0x0088FF, 0.3);
                buttonBackground.drawRect(6, 30, line.width + 2, line2.y - line.y);
                buttonBackground.endFill();
            }
            buttonContainer.mouseout = (e) => {
                buttonBackground.clear();
                buttonBackground.beginFill(0xFFFFFF, 0.3);
                buttonBackground.drawRect(6, 30, line.width + 2, line2.y - line.y);
                buttonBackground.endFill();
            }
            buttonContainer.y += i * 25;
            menu.addChild(buttonContainer);
            menuContainer.mouseout = (e) => {
                app.stage.removeChild(menuContainer);
            }
        }

    }
}