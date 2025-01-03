
var mouse: {x: number, y: number} = {x: 0, y: 0};

function updateMousePosition (event: MouseEvent) {
	mouse.x = event.clientX;
	mouse.y = event.clientY;
}

export function getMousePosition (): {x: number, y: number} {
	return mouse;
}

document.addEventListener ('mousemove', updateMousePosition);
