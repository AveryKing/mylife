export default class DevTools {
    constructor(myLife) {
        let mainDiv = document.createElement('div');
        mainDiv.style.display = 'block';
        mainDiv.style.height = '200px';
        mainDiv.style.width = '250px';
        mainDiv.style.border = '1px solid black';
        mainDiv.style.borderRadius = '8px'
        mainDiv.style.zIndex = '1000';
        mainDiv.style.backgroundColor = '#F4F4F4';
        mainDiv.id = 'dev-tools'
        document.body.appendChild(mainDiv);
        let switchRoom = document.createElement('button');
        switchRoom.style.marginTop = '20px';
        switchRoom.style.marginLeft = '10px';
        switchRoom.innerText = 'Switch room';
        switchRoom.style.borderRadius = '8px';
        switchRoom.onclick = () => {
            myLife.divinity.changeRoom(window.prompt('Enter room ID'));
        }
        mainDiv.appendChild(switchRoom);
        let createEvent = document.createElement('button');
        createEvent.innerText = 'Create event';
        createEvent.style.borderRadius = '8px';
        switchRoom.style.marginTop = '30px';
        switchRoom.style.marginLeft = '10px';
        switchRoom.style.marginRight = '30px';
        createEvent.onclick = () => {
            myLife.divinity.createEvent(window.prompt('Enter event name'));
        }
        mainDiv.appendChild(createEvent);
        $('#dev-tools').draggable();
    }
}