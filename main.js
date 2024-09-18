import { state } from './state.js'
import { handleKeyDown } from './keylisteners.js'

const canvas = document.getElementById("canvas");

window.addEventListener('keydown', handleKeyDown);

const context = canvas.getContext('2d');
const radius = 100;

let minRadius = 0;

let displayX = 0;
let displayY = 0;
let displayMinRadius = 0;
let font = "18px monospace";


function drawDebugInfo() {
    context.fillStyle = "white";
    context.font = font; 
    displayX = Math.floor(state.planet.x);
    if (Math.floor(radius) % 50 == 0) {
        displayX = Math.floor(state.planet.x);
        displayY = Math.floor(state.planet.y);
    }
    if (Math.floor(minRadius) % 5 == 0) {
        displayMinRadius = Math.floor(minRadius);
    }
    var text1 = `dino:   x = ${state.dino.x}, y = ${state.dino.y}`;
    var text2 = `planet: x = ${displayX}, y = ${displayY}, r = ${displayMinRadius}`;
    context.fillText(text1, 50, 25);
    context.fillText(text2, 50, 50);
}

function drawCircle() {
	context.beginPath();

	context.fillStyle = 'blue';
    if (state.planet.x < canvas.width / 2) {
        state.planet.radius -= 0.1;
        minRadius = state.planet.radius;
	    context.arc(state.planet.x, state.planet.y, state.planet.radius, 0, 2*Math.PI);
    // find a way for the orbit movement not to so bouncy in the apex
    // may it makes sense to come up with gradual change of radius
    // beware of feature creep, we might not need it at all    
    } else if (state.planet.x > 455) {
        state.planet.radius += 0.1;
        minRadius = state.planet.radius;
	    context.arc(state.planet.x, state.planet.y, state.planet.radius, 0, 2*Math.PI);
    }

    context.closePath();
	context.stroke();
    context.fill();
}

function drawInnerCircle(x, y) {
    context.beginPath();
	context.fillStyle = 'green';
	context.arc(x, y, 10, 0, 2*Math.PI);
    context.closePath();
	context.stroke();
    context.fill();
}

function draw() {
    context.clearRect(0, 0, 1050, 450);
    drawDebugInfo();
	drawCircle();
    drawInnerCircle(state.dino.x, state.dino.y);
    state.planet.x += 1;
    state.dino.x += 1;
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

