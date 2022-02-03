export default class Inventory {
    constructor() {
        /**
        const test = document.createElement('canvas');
        test.width = 100;
        test.height = 100;
        var testContext = test.getContext('2d');
        test.style.border = '1px solid black';
        testContext.font = "15px Arial";
        document.body.appendChild(test);
        testContext.fillText("Item Name",15,23);
        const img1 = document.createElement('img');
        img1.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/800px-Question_mark_%28black%29.svg.png';
        img1.width = '50px';

        img1.onload = function () {
            const x = canvas.width / 4, y = canvas.height / 4;
            testContext.drawImage(img1, x, y+8, 50,50);
        }
        **/
        //////
        const div = document.createElement('div');
        div.style.display = 'flex';
        div.style.justifyContent = 'center';
        const background = document.createElement('div');
        background.classList.add('inventory-panel');
        background.style.width = '700px';
        background.style.marginTop = '50px';
        background.style.marginBottom = '50px';
        background.style.height = '500px';
        background.style.borderRadius = '10px';
        background.style.display = 'flex';
        background.style.justifyContent = 'center';
        background.style.alignItems = 'center';
        background.style.backgroundColor = '#004b80';
        background.style.boxShadow = '0px 0px 23px -4px #000000';
        const header = document.createElement('h1');
        header.style.position = 'absolute';
        header.style.top='-24px';
        header.style.fontFamily = 'Ubuntu';
        header.style.color = '#fff';
        header.style.textShadow = '0px 0px 10px #000000';
        header.innerText = 'Inventory';
        background.appendChild(header);

        const mainPanel = document.createElement('div');
        let mainPanel1 = document.createElement('div');
        //mainPanel1.style.display = 'flex';
        mainPanel.appendChild(mainPanel1)
        mainPanel.style.backgroundColor = 'white';
        mainPanel.style.width = '90%';
        mainPanel.style.boxShadow = 'inset 0px 0px 22px  rgba(0,0,0,0.68)';
        mainPanel.style.height = '85%';
        mainPanel.style.borderRadius = '10px';
        mainPanel1.style.margin = '20px';
        mainPanel1.style.marginBottom = '20px';
        mainPanel1.classList.add('inventory-item-panel');
        mainPanel.style.overflowY = 'scroll';
        mainPanel.style.scrollBar
        const mouseOverItem = (target) => {
            target.style.borderColor = '#B8BB00';
            target.style.borderWidth = '2px';
        }
        const mouseOffItem = (target) => {
            target.style.borderColor = 'gray';
            target.styleborderWidth = '1px';
        }
        for(let i=0; i<15; i++) {
            const item = document.createElement('div');
            item.style.margin = '5px';
            item.style.borderRadius = '5px';
            item.style.border = '1px solid black';
            const test = document.createElement('canvas');
            test.width = 100;
            test.height = 100;
            var testContext = test.getContext('2d');
            testContext.font = "15px Arial";
            testContext.fillText("Item Name",15,23);
            const img1 = document.createElement('img');
            img1.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/800px-Question_mark_%28black%29.svg.png';
            img1.width = '50px';

            img1.onload = function () {
                const x = test.width / 4, y = test.height / 4;
                 testContext.drawImage(img1, x, y+8, 50,50);
            }
            item.appendChild(test);

            test.addEventListener('mouseover', (e) => {
                console.log(e.target.closest('div'))
                mouseOverItem(e.target.closest('div'));
            })
            test.addEventListener('mouseout', (e) => {
                mouseOffItem(e.target.closest('div'));
            })
            mainPanel1.appendChild(item);
        }
        background.appendChild(mainPanel);
        div.appendChild(background);
        document.body.appendChild(div)
        $(".inventory-panel").draggable();
    }
}