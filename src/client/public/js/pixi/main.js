PIXI.utils.sayHello('Divinity.JS'); // the code from Step 3, you can leave it
// create a canvas for all of your game elements
const renderer = PIXI.autoDetectRenderer(512, 512, {
    transparent: true,
    resolution: 1
});
//const displayDiv = document.querySelector('#display')
//displayDiv.appendChild(renderer.view);
const stage = new PIXI.Container();