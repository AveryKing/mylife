
import * as Scroll from "./scrollbox.js";

window.onload = function () {
    let app = new PIXI.Application({
        backgroundAlpha: 0,
        width: window.innerWidth,
        height: window.innerHeight,
        resolution: window.devicePixelRatio,
        antialias: true,
    });
    document.body.appendChild(app.view);
    app.view.style.position = 'fixed';
    app.view.style.width = 'calc(100vw - 50px)';
    app.view.style.height = '100vh';
    app.view.style.left = '50px';
    app.view.style.top = 0;

    const viewport = app.stage.addChild(new Viewport({
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
        interaction: app.renderer.plugins.interaction,
    }));

    viewport.drag().pinch().decelerate();
    vertical();
    window.addEventListener('resize', resize);

    Ticker.shared.add(() => {
        _fps.frame();
    });
    highlight();
};