export default class Compositor {
    constructor() {
        this.layers = [];
    }

    draw(context, camera) {
        this.layers.forEach(layer => { // layer is the function that draws the context
            layer(context, camera);
        });
    }
}