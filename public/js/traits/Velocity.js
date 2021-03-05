import {Trait} from '../Entity.js'

export default class Velocity extends Trait{
    constructor() {
        super('velocity');
    }

    update(entity, deltaTime) {
        console.log("xyao yasdo");
        entity.pos.x += entity.vel.x * deltaTime;
        entity.pos.y += entity.vel.y * deltaTime;
    }
}