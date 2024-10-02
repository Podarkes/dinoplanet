import { state } from './state.js'
import { handleKeyDown } from './keylisteners.js'

const { Application, Assets, BitmapText, Container, Graphics, Sprite, Texture } = PIXI; 

const app = new Application();
globalThis.__PIXI_APP__ = app;

await app.init({ backgroundAlpha: 0, width: 1000, height: 750 })
     
    document.getElementById('canvas').appendChild(app.canvas);
    
    const ctx = new Graphics();
let mask = new Graphics()
    .circle(state.planet.x, state.planet.y, state.planet.radius) .fill(0xffffff);

let maskContainer = new Container();

maskContainer.mask = mask;


maskContainer.addChild(mask);
maskContainer.position.set(0,0);

app.stage.addChild(maskContainer);
maskContainer.addChild(ctx);
    const s1 = Sprite.from(Texture.WHITE);
    s1.width = 100;
    s1.height = 100;
    s1.tint = 0x00FF00;
    s1.x = 300;
    s1.y = 300;
   // app.stage.addChild(s1);


    let debugText = 'Loading...';
    // Load bitmap font
    await Assets.load('https://pixijs.com/assets/bitmap-font/desyrel.xml');

    const bitmapFontText = new BitmapText({
        text: debugText,
        style: {
            fontFamily: 'sans',
            fontSize: 20,
            align: 'left',
        },
    });

    bitmapFontText.x = 50;
    bitmapFontText.y = 200;
    
    app.stage.addChild(bitmapFontText);
    
    function drawRect(x, y, w, h, color) {
        ctx.rect(x, y, w, h)
            .fill(color);
    }

    function drawCircle() {
        ctx.clear();
        ctx
        .circle(state.planet.x, state.planet.y, state.planet.radius)
        .fill('blue');
    }
    
    let { x , y } = state.dino;

    drawCircle();
    drawDino(x, y);

    let elapsed = 0.0;
    app.ticker.add((delta) => {
        elapsed += delta.deltaTime / 60;
        
//    const r = Math.sin(elapsed) * 127 + 128;
//    const b = Math.cos(elapsed) * 127 + 128;
//    color = (r << 16) | (b);
//  drawCircle(color);    
      drawCircle(600 / 2, 600 / 2, 200);
    for (let i = 0; i < 3; i++) {
        let con = state.continents[i];
        if (con.x < 0) {
            con.x = 800;
        }
        
        drawRect(con.x--, con.y, con.width, con.height, con.color); 
        // ctx.fillRect(con.x, con.y, con.width, con.height);
    }
        drawDino(state.dino.x, state.dino.y);
        drawDebugInfo();
    });
    




// const canvas = document.getElementById("canvas");

window.addEventListener('keydown', handleKeyDown);

// const ctx = canvas.getContext('2d');
const radius = 100;

let minRadius = 0;

let displayX = 0;
let displayY = 0;
let displayMinRadius = 0;
let font = "18px monospace";


function drawDebugInfo() {
    
    displayX = Math.floor(state.planet.x);
    if (Math.floor(radius) % 50 == 0) {
        displayX = Math.floor(state.planet.x);
        displayY = Math.floor(state.planet.y);
    }
    if (Math.floor(minRadius) % 5 == 0) {
        displayMinRadius = Math.floor(minRadius);
    }
    debugText = `dino:   x = ${Math.floor(state.dino.x)}, y = ${Math.floor(state.dino.y)}, d = ${Math.floor(state.dino.distance)}, s = ${state.dino.step}`;
    debugText = debugText + '\n' + `planet: x = ${displayX}, y = ${displayY}, r = ${displayMinRadius}`;
    bitmapFontText.text = debugText;
}


function drawDino(x, y) {
    ctx.circle(x, y, 10).fill('green');
}

