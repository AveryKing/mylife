export default class Inventory {
    constructor() {
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
            var canvas = document.createElement("canvas");
            canvas.width = 100;
            canvas.height = 100;

            var ctx = canvas.getContext('2d');
            ctx.font = "15px Arial";
            ctx.fillText("Item Name",15,20);
            var img = document.createElement("img");
            img.src=canvas.toDataURL();
            item.appendChild(img);
            var itemImage = new Image();
            itemImage.onload = function () {
                var x = canvas.width / 2, y = canvas.height / 2;
                ctx.drawImage(itemImage, x, y);
            }
            itemImage.style.width = canvas.width;
            itemImage.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/800px-Question_mark_%28black%29.svg.png';
            item.appendChild(itemImage);
            img.addEventListener('mouseover', (e) => {
                console.log(e.target.closest('div'))
                mouseOverItem(e.target.closest('div'));
            })
            img.addEventListener('mouseout', (e) => {
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