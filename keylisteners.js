import { state } from './state.js';

function getDist(x1, x2, y1, y2) {
    let a = x1 - x2;
    let b = y1 - y2;
    return Math.sqrt(a*a + b*b);
}

function dinoStepHandler() {

   let isOnLand = [false, false, false];

    for (let i = 0; i < 3; i++) {
        let x = state.dino.x;
        let y = state.dino.y;
        let con = state.continents[i];
        isOnLand[i] = (x >= con.x && x <= con.x + con.width) && (y >= con.y && y <= con.y + con.height);
    }

    if (isOnLand[0] || isOnLand[1] || isOnLand[2]) {
        state.dino.step = 10;
    } else {
        state.dino.step = 1;
    }

} 

export function handleKeyDown(event) {
	const key = event.key;
	console.log(`Key pressed: ${key}`);

    dinoStepHandler();
    
    let step = state.dino.step;

    let x1 = state.planet.x;
    let x2 = state.dino.x;

    let y1 = state.planet.y;
    let y2 = state.dino.y;
    
    let dist = state.dino.distance;
	
    if (key == 'ArrowUp') {
        
        console.log(state);    
    
	    let y2dest = y2 - step;
        let newDist = getDist(x1, x2, y1, y2dest); 
        if (newDist < state.planet.radius) {
            state.dino.y -= step;
        }
	}

	if (key == 'ArrowDown') {
	    let y2dest = y2 + step;
        let newDist = getDist(x1, x2, y1, y2dest); 
	    if (newDist < state.planet.radius) {
            state.dino.y += step;
        }
	}

	if (key == 'ArrowRight') {
	    let x2dest = x2 + step;
        let newDist = getDist(x1, x2dest, y1, y2); 
	    if (newDist < state.planet.radius) {
            state.dino.x += step;
        }
	}

	if (key == 'ArrowLeft') {
	    let x2dest = x2 - step;
        let newDist = getDist(x1, x2dest, y1, y2); 
	    if (newDist < state.planet.radius) {
            state.dino.x -= step;
        }
	}

    state.dino.distance = getDist(
        state.planet.x, state.dino.x, state.planet.y, state.dino.y
    ); 
}

