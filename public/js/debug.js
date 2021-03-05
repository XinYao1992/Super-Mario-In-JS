export function setupMouseControl(canvas, entity, camera) {
    let lastEvent;

    // Debugging: using your mouse to drag and drop mairo
    ['mousedown', 'mousemove'].forEach(eventName => {
        canvas.addEventListener(eventName, event => {
            if (event.buttons === 1) {// left click
                entity.vel.set(0, 0);
                entity.pos.set(
                    event.offsetX + camera.pos.x,
                    event.offsetY + camera.pos.y
                );
            } else if (event.buttons === 2
                && lastEvent && lastEvent.buttons === 2
                && lastEvent.type === 'mousemove') {// right click
                camera.pos.x -= event.offsetX - lastEvent.offsetX;
            }
            lastEvent = event;
        });
    });

    canvas.addEventListener('contextmenu', event => {
        event.preventDefault();
    });
}