import { state } from './state.js';

function getDist(x1, x2, y1, y2) {
    let a = x1 - x2;
    let b = y1 - y2;
    return Math.sqrt(a*a + b*b);
}

export function handleKeyDown(event) {
	const key = event.key;
	console.log(`Key pressed: ${key}`);
    
    let x1 = state.planet.x;
    let x2 = state.dino.x;

    let y1 = state.planet.y;
    let y2 = state.dino.y;
    
    let dist = state.dino.distance;
	
    if (key == 'ArrowUp') {
	    let y2dest = y2 - 1;
        let newDist = getDist(
            x1, x2, y1, y2dest
        ); 
        if (newDist < state.planet.radius) {
            state.dino.y -= 1;
        }
	}

	if (key == 'ArrowDown') {
	    let y2dest = y2 + 1;
        let newDist = getDist(
            x1, x2, y1, y2dest
        ); 
	    if (newDist < state.planet.radius) {
            state.dino.y += 1;
        }
	}

	if (key == 'ArrowRight') {

	    let x2dest = x2 + 1;
        let newDist = getDist(
            x1, x2dest, y1, y2
        ); 
	    if (newDist < state.planet.radius) {
            state.dino.x += 1;
        }
	}

	if (key == 'ArrowLeft') {
	    let x2dest = x2 - 1;
        let newDist = getDist(
            x1, x2dest, y1, y2
        ); 
	    if (newDist < state.planet.radius) {
            state.dino.x -= 1;
        }
	}

    state.dino.distance = getDist(
        state.planet.x, state.dino.x, state.planet.y, state.dino.y
    ); 
}

