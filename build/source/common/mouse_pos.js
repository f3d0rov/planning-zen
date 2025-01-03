var mouse = { x: 0, y: 0 };
function updateMousePosition(event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
}
export function getMousePosition() {
    return mouse;
}
document.addEventListener('mousemove', updateMousePosition);
//# sourceMappingURL=mouse_pos.js.map