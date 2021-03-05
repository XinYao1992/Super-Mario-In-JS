export default class Timer {
    constructor(deltaTime = 1 / 60) {
        let accumulatedTime = 0;
        let lastTime = performance.now();// Important, not 0.

        // Update position
        this.updateProxy = (time) => {
            accumulatedTime += (time - lastTime) / 1000;

            while(accumulatedTime > deltaTime) {
                this.update(deltaTime);
                accumulatedTime -= deltaTime;
            }

            lastTime = time;
            /* 
            requestAnimationFrame() method tells the browser that you 
            wish to perform an animation and requests that the browser 
            calls a specified function to update an animation before the 
            next repaint. The method takes a callback as an argument to be 
            invoked before the repaint. 
            You should call this method whenever you're ready to update your 
            animation onscreen. This will request that your animation 
            function be called before the browser performs the next repaint. 
            The number of callbacks is usually 60 times per second
            */
           this.enqueue();
            // setTimeout(this.update, 1000/500, performance.now());// debug only, mimik requestAnimationFrame
        }
    }

    enqueue() {
        requestAnimationFrame(this.updateProxy);
    }

    start() {
        this.enqueue();
    }
}