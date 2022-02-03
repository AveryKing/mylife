import Inventory from './inventory.js';
import Utils from "./utils.js";
export default class UserInterface {
    constructor(myLifeEvents) {
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
        chatBox.style.zIndex = 4;
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
        let buddiesButton = document.createElement('button');
        let inventoryButton = document.createElement('button');
        buddiesButton.innerText = 'View Buddies';
        inventoryButton.innerText = 'View Inventory';
        inventoryButton.onclick = () => {
            new Inventory();
        }
        document.body.appendChild(buddiesButton);
        document.body.appendChild(inventoryButton);

        myLifeEvents.setupGameUIEvents();
    }
}