import TileResolver from './TileResolver.js';

export default class TileCollider {
    constructor(tileMatrix) {
        this.tilesResolver = new TileResolver(tileMatrix);// Matrix
    }

    checkY(entity) {
        let y;
        if (entity.vel.y > 0) {
            y = entity.pos.y + entity.size.y;
        } else if (entity.vel.y < 0) {
           y = entity.pos.y; 
        } else {
            return;
        }

        const matches = this.tilesResolver.searchByRange(
            entity.pos.x, 
            entity.pos.x + entity.size.x,
            y,
            y
        );
        matches.forEach(match => {
            if (match.tile.name !== 'ground') {
                return;
            }
    
            if (entity.vel.y > 0) {// falling
                if (entity.pos.y + entity.size.y > match.y1) {
                    entity.pos.y = match.y1 - entity.size.y;
                    entity.vel.y = 0; 
                }
            } else if (entity.vel.y < 0) {// Jumping
                if (entity.pos.y < match.y2) {
                    entity.pos.y = match.y2;
                    entity.vel.y = 0; 
                }
            }
        });
    }

    checkX(entity) {
        let x;
        if (entity.vel.x > 0) {
            x = entity.pos.x + entity.size.x;
        } else if (entity.vel.x < 0) {
           x = entity.pos.x; 
        } else {
            return;
        }

        const matches = this.tilesResolver.searchByRange(
            x,
            x,
            entity.pos.y,
            entity.pos.y + entity.size.y
        );
        matches.forEach(match => {
            if (match.tile.name !== 'ground') {
                return;
            }
    
            if (entity.vel.x > 0) {// moving right
                if (entity.pos.x + entity.size.x > match.x1) {
                    entity.pos.x = match.x1 - entity.size.x;
                    entity.vel.x = 0; 
                }
            } else if (entity.vel.x < 0) {// moving left
                if (entity.pos.x < match.x2) {
                    entity.pos.x = match.x2;
                    entity.vel.x = 0; 
                }
            }
        });
    }
}