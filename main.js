import { state } from './state.js'
import { handleKeyDown } from './keylisteners.js'

const canvas = document.getElementById("canvas");

window.addEventListener('keydown', handleKeyDown);

const context = canvas.getContext('2d');
const radius = 100;

let minRadius = 0;

let displayX = 0;
let displayMinRadius = 0;
let font = "bold 20px serif";


function drawDebugInfo() {
    context.clearRect(0, 0, 1000, 200);
    context.fillStyle = "white";
    context.font = font; 
    displayX = Math.floor(state.planet.x);
    if (Math.floor(radius) % 50 == 0) {
        displayX = Math.floor(state.planet.x);
    }
    if (Math.floor(minRadius) % 5 == 0) {
        displayMinRadius = Math.floor(minRadius);
    }
    var text = `state.dino.y = ${state.dino.y}, state.planet.x = ${displayX}, minRadius = ${displayMinRadius}`;
    context.fillText(text, 100, 100);
}

function drawCircle() {
    context.clearRect(0, 0, 2000, 2000);
	context.beginPath();

	context.fillStyle = 'blue';
    if (state.planet.x < canvas.width / 2) {
        state.planet.radius -= 0.1;
	    context.arc(state.planet.x, state.planet.y, state.planet.radius, 0, 2*Math.PI);
        minRadius = state.planet.radius;
    } else if (state.planet.x > canvas.width / 2) {
        delta = minRadius - (state.planet.x - canvas.width/2) / 10; 
        state.planet.radius = state.planet.radius + delta;
	    context.arc(state.planet.x, 200, minRadius  + delta, 0, 2*Math.PI);
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

