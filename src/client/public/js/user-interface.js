import Inventory from './inventory.js';
import DevTools from "./dev-tools.js";
import EventsList from './events-list.js';
import GenericButton2 from "./generic-button-2.js";
import Utils from "./utils.js";
export default class UserInterface {
    constructor(myLifeEvents) {
        let chatForm = document.createElement('form');
        chatForm.id = 'chat-form';
        chatForm.style.display = 'flex';
        chatForm.style.position = 'absolute';
        let chatBox = document.createElement('input');
        chatBox.autocomplete = 'off';
        chatBox.id = 'chat-text-box';
        chatBox.type = 'text';
        chatBox.style.position = 'absolute';
        chatBox.style.top = "553px";
        chatBox.style.border = "none";
        chatBox.style.left = '210px';
        chatBox.placeholder = 'Enter chat message here...';
        chatBox.style.height = '25px';
        chatBox.style.borderRadius = '10px';
        chatBox.style.width = '310px';
        chatBox.onfocus = () => {
            chatBox.style.outline = 'none';
        }
        chatBox.style.zIndex = '3';
        let chatSend = document.createElement('button');
        chatSend.type = 'submit';
        chatSend.style.position = 'absolute';
        chatSend.style.top = '555px';
        chatSend.style.left = '525px';
        chatSend.style.borderRadius = '12px';
        chatSend.style.height = '25px';
        chatSend.style.width = '70px';
        chatSend.innerText = 'Send';
        Utils.get('mainDiv').appendChild(chatForm);
        let inventoryOpen = false;
        let buddiesOpen = false;
        let devOpen = false;
        new DevTools(myLifeEvents.myLife);
        let eventsOpen = false;
        myLifeEvents.setupGameUIEvents();

        }

}