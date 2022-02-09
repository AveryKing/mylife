export default class DevTools {
    constructor(divinity) {
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
            divinity.changeRoom(window.prompt('Enter room ID'));
        }
        mainDiv.appendChild(switchRoom);
        $('#dev-tools').draggable();
    }
}