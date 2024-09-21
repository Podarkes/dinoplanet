import { state } from './state.js'
import { handleKeyDown } from './keylisteners.js'

const canvas = document.getElementById("canvas");

window.addEventListener('keydown', handleKeyDown);

const ctx = canvas.getContext('2d');
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
    var text1 = `dino:   x = ${Math.floor(state.dino.x)}, y = ${Math.floor(state.dino.y)}, d = ${Math.floor(state.dino.distance)}`;
    var text2 = `planet: x = ${displayX}, y = ${displayY}, r = ${displayMinRadius}`;
    ctx.fillText(text1, 50, 25);
    ctx.fillText(text2, 50, 50);
}

function drawCircle() {
	ctx.beginPath();

	ctx.fillStyle = 'blue';

    // state.planet.radius += 0.08;
    // state.planet.y -= 0.05;

	minRadius = state.planet.radius;
    ctx.arc(state.planet.x, state.planet.y, state.planet.radius, 0, 2*Math.PI);
    ctx.closePath();
	ctx.stroke();
    ctx.fill();
}

function drawInnerCircle(x, y) {
    ctx.beginPath();
	ctx.fillStyle = 'green';
	ctx.arc(x, y, 10, 0, 2*Math.PI);
    ctx.closePath();
	ctx.stroke();
    ctx.fill();
}

    state.rect1 = { x: -200, y: 200, width: 100, height: 100 }
    state.rect2 = { x: -50, y: 350, width: 100, height: 100 }
    state.rect3 = { x: -350, y: 355, width: 100, height: 100 }

function draw() {

    ctx.clearRect(0, 0, 1000, 750);

	drawCircle();

    ctx.fillStyle = 'orange'    
    ctx.fillRect(state.rect1.x, state.rect1.y, state.rect1.width, state.rect1.height) 
 
    ctx.fillStyle = 'brown'
    ctx.fillRect(state.rect2.x, state.rect2.y, state.rect2.width, state.rect2.height)     

    ctx.fillStyle = 'black'
    ctx.fillRect(state.rect3.x, state.rect3.y, state.rect3.width, state.rect3.height)     

    drawInnerCircle(state.dino.x, state.dino.y);
     
    drawDebugInfo();

    state.planet.x += 0.5;
    state.dino.x += 0.5;

    state.rect1.x += 0.5;   
    state.rect2.x += 0.5;   
    state.rect3.x += 0.5;
       
   // state.rect1.width -= -0.05;   
   // state.rect2.width -= 0.05;   
   // state.rect3.width -= 0.05;
 
   // state.rect1.height -= 0.05;   
   // state.rect2.height -= 0.05;   
   // state.rect3.height -= 0.05;

    requestAnimationFrame(draw);
}

draw();

// below is not used yet

function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

let startTime = null;
function animate(timestamp) {
    // if (!startTime) startTime = timestamp;
    // const progress = timestamp - startTime;
    // const easedProgress = easeInOutQuad(progress / 4000); 
    // x = easedProgress * (canvas.width + 500);
    // drawCircle(x);
    // if (progress < 4000) {
    //       requestAnimationFrame(animate);
    // }
}


// requestAnimationFrame(animate);

