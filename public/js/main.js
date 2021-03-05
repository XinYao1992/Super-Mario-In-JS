import { loadLevel } from './loaders.js';
import { createMario } from './entities.js';
import Timer from './Timer.js';
import Camera from './Camera.js';
import {setupKeyboard} from './input.js';
import {createCollisionLayer} from './layers.js';
import {setupMouseControl} from './debug.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

// Load everything at the same time
Promise.all([
    createMario(),
    loadLevel('1-1'),
])
.then( ([mario, level]) => {
    const camera = new Camera();
    window.camera = camera;

    mario.pos.set(64, 64);// The place where mario starts to be rendered

    level.comp.layers.push(createCollisionLayer(level));// Stroke layout for debugger tile collision

    level.entities.add(mario);

    // Set up keyboard input for mario entity
    const input = setupKeyboard(mario);
    input.listenTo(window);

    // Debug, use your mouse to drag and drop the mario
    setupMouseControl(canvas, mario, camera);

    // Update position
    const timer = new Timer(1 / 60);
    timer.update = function update(deltaTime) {
        level.update(deltaTime);
        level.comp.draw(context, camera);
    };

    timer.start();
});
