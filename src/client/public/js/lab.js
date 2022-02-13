
document.body.appendChild(document.createElement('br'))
const div = document.createElement('div');
div.style.display = 'flex';
div.style.height = '350px';
div.style.width = '490px';
div.id = 'store-div';
div.style.border = '1px solid black';
div.style.borderRadius = '8px';
const header = document.createElement('div');
header.style.backgroundColor = '#1066B0';
header.style.width = '530px';
header.style.height = '50px';
header.style.borderTopLeftRadius = '7px';
header.style.borderTopRightRadius = '7px';
//header.style.paddingRight = '10px';
header.style.display = 'flex';
header.style.justifyContent = 'center';
header.style.alignItems = 'center';
const heading = document.createElement('h2');
heading.innerText = 'Store';
heading.style.fontFamily =  'Ubuntu';
heading.style.color = 'white';
header.appendChild(heading);
const exitButton = document.createElement('div');
exitButton.style.borderRadius = '100px';
exitButton.style.backgroundColor = '#FF0000';
exitButton.innerText = 'X';
exitButton.style.display = 'flex';
exitButton.style.fontFamily = 'Ubuntu';
exitButton.style.color = '#FFFFFF';
exitButton.style.position = 'relative';
exitButton.style.top = '-10px';
exitButton.style.left = '210px';
exitButton.style.justifyContent = 'center';
exitButton.style.alignItems = 'center';
exitButton.style.fontSize = '20px';
exitButton.style.height = '35px';
exitButton.style.width = '35px';
exitButton.style.cursor = 'pointer';
exitButton.style.userSelect = 'none';

exitButton.addEventListener('mouseover', (e) => {
    exitButton.style.backgroundColor = '#FF0000';
})
exitButton.addEventListener('mouseout', (e) => {
    exitButton.style.backgroundColor = 'rgb(220,0,0)';
})
exitButton.addEventListener('mousedown', (e) => {
    exitButton.style.backgroundColor = 'rgb(169,1,1)'
})
exitButton.addEventListener('mouseup', (e) => {
        exitButton.style.backgroundColor = '#FF0000';
    }
)
header.appendChild(exitButton);
div.appendChild(header);
document.body.appendChild(div);

$('#store-div').draggable();