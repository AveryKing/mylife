
export default class Store {
    // constructor is called when a Store object is first created
    constructor() {
        const div = document.createElement('div');
        div.style.display = 'flex';
        div.style.height = '500px';
        div.style.width = '500px';
        div.style.border = '1px solid black';
        div.style.borderRadius = '8px';
        document.body.appendChild(div);
    }
}