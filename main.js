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
    var text1 = `dino:   x = ${Math.floor(state.dino.x)}, y = ${Math.floor(state.dino.y)}, d = ${Math.floor(state.dino.distance)}, s = ${state.dino.step}`;
    var text2 = `planet: x = ${displayX}, y = ${displayY}, r = ${displayMinRadius}`;
    ctx.fillText(text1, 25, 50);
    ctx.fillText(text2, 25, 75);
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

function drawDino(x, y) {
//    for (let i = 0; i < 3; i++) {
  //      let con = state.continents[i];
 //
  //      if ((x >= con.x && x <= con.x + con.width) && (y >= con.y && y <= con.y + con.height)) {
    //        state.dino.step = 10;
   //     } else {
     //       state.dino.step = 1;
     //   }
  //  }
         
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
     


//    state.planet.x+= 0.5;
//    state.dino.x += 1;

   // state.rect1.x += 0.5;   
   // state.rect2.x += 0.5;   
   // state.rect3.x += 0.5;
       
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

