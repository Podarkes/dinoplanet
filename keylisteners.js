import { state } from './state.js';

export function handleKeyDown(event) {
	const key = event.key;
	console.log(`Key pressed: ${key}`);

	if (key == 'ArrowUp') {
		if (state.dino.y + 10 < state.planet.y - state.planet.radius) {
			state.dino.y = state.planet.y - state.planet.radius;
		} else {
			state.dino.y -= 10;
		}
	}

	if (key == 'ArrowDown') {
		state.dino.y += 10;
	}

	if (key == 'ArrowRight') {
		state.dino.x += 10;
	}

	if (key == 'ArrowLeft') {
		state.dino.x -=10;
	}
}

