import Inventory from './inventory.js';
import DevTools from "./dev-tools.js";
import Utils from "./utils.js";
export default class UserInterface {
    constructor(myLifeEvents) {
        this.inventoryOpen = false;
        let chatForm = document.createElement('form');
        chatForm.id = 'chat-form';
        let chatBox = document.createElement('input');
        chatBox.autocomplete = 'off';
        chatBox.id = 'chat-text-box';
        chatBox.type = 'text';
        chatBox.style.position = 'absolute';
        chatBox.style.top = "575px";
        chatBox.style.left = '180px';
        chatBox.placeholder = 'Enter chat message here...';
        chatBox.style.height = '30px';
        chatBox.style.borderRadius = '10px';
        chatBox.style.width = '400px';
        chatBox.style.zIndex = '3';
        chatForm.appendChild(chatBox);
        let chatSend = document.createElement('button');
        chatSend.type = 'submit';
        chatSend.style.position = 'absolute';
        chatSend.style.top = '576px';
        chatSend.style.left = '590px';
        chatSend.style.borderRadius = '8px';
        chatSend.style.height = '33px';
        chatSend.innerText = 'Send';
        chatForm.appendChild(chatSend);
        Utils.get('mainDiv').appendChild(chatForm);

        let menu = document.createElement('div');
        let inventoryOpen = false;
        let buddiesOpen = false;
        let devOpen = false;
        let buddiesButton = document.createElement('button');
        let inventoryButton = document.createElement('button');
        buddiesButton.classList.add('button-4');

        inventoryButton.classList.add('button-4');
        let devTools = document.createElement('button');
        devTools.classList.add('button-4');
        devTools.innerText = 'Dev Tools';
        devTools.onclick = () => {
            if(!devOpen) {
                new DevTools(myLifeEvents.myLife);
                devOpen = true;
            }

        }
        menu.appendChild(devTools);

        buddiesButton.innerText = 'View Buddies';
        inventoryButton.innerText = 'View Inventory';
        inventoryButton.onclick = () => {
            if(!this.inventoryOpen) {
                new Inventory(myLifeEvents.myLife,this);
                this.inventoryOpen = true;
            }
        }
       menu.appendChild(buddiesButton);
        menu.appendChild(inventoryButton);
        menu.style.display = 'flex';
        menu.style.justifyContent = 'center';
        document.body.appendChild(menu);
        myLifeEvents.setupGameUIEvents();
    }
}