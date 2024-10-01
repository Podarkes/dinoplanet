import { state } from './state.js'
import { handleKeyDown } from './keylisteners.js'

const { Application, Graphics } = PIXI; 

const app = new Application();
globalThis.__PIXI_APP__ = app;

await app.init({ backgroundAlpha: 0, width: 600, height: 600 })
     
    document.getElementById('canvas').appendChild(app.canvas);
    
    const ctx = new Graphics();
    app.stage.addChild(ctx);

    let color = 0x000000;

    function drawCircle(color) {
        ctx.clear();
        ctx
        .circle(600 / 2, 600 / 2, 200)
        .fill(color);
    }

    drawCircle(color);

    let elapsed = 0.0;
    app.ticker.add((delta) => {
        elapsed += delta.deltaTime / 60;
        
    const r = Math.sin(elapsed) * 127 + 128;
    const b = Math.cos(elapsed) * 127 + 128;
    color = (r << 16) | (b);
        drawCircle(color);
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
    ctx.fillStyle = "white";
    ctx.font = font; 
    displayX = Math.floor(state.planet.x);
    if (Math.floor(radius) % 50 == 0) {
        displayX = Math.floor(state.planet.x);
        displayY = Math.floor(state.planet.y);
    }
    if (Math.floor(minRadius) % 5 == 0) {
        displayMinRadius = Math.floor(minRadius);
    }
    var text1 = `dino:   x = ${Math.floor(state.dino.x)}, y = ${Math.floor(state.dino.y)}, d = ${Math.floor(state.dino.distance)}, s = ${state.dino.step}`;
    var text2 = `planet: x = ${displayX}, y = ${displayY}, r = ${displayMinRadius}`;
    ctx.fillText(text1, 25, 50);
    ctx.fillText(text2, 25, 75);
}

function drawCircleLegacy() {
	ctx.beginPath();

	ctx.fillStyle = 'blue';

	minRadius = state.planet.radius;
    ctx.arc(state.planet.x, state.planet.y, state.planet.radius, 0, 2*Math.PI);
    ctx.closePath();
	ctx.stroke();
    ctx.fill();
}

function drawDino(x, y) {
         
    ctx.beginPath();
	ctx.fillStyle = 'green';
	ctx.arc(x, y, 10, 0, 2*Math.PI);
    ctx.closePath();
	ctx.stroke();
    ctx.fill();
}

function draw() {

    ctx.clearRect(0, 0, 1000, 750);

    drawDebugInfo();
	drawCircle();

    for (let i = 0; i < 3; i++) {
        let con = state.continents[i];
        ctx.fillStyle = con.color;
        ctx.fillRect(con.x, con.y, con.width, con.height);
    }

    drawDino(state.dino.x, state.dino.y);
     
    requestAnimationFrame(draw);
}


