export default class Util {
    static rand(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static guid() {
        const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
    }

    static entityCollisions(entity, entities) {
        const collisions = [];

        for (let entityId in entities) {
            if (!entities.hasOwnProperty(entityId)) {
                continue;
            }

            // Don't check collision if both entity IDs are identical.
            if (entity.id === entities[entityId].id) {
                continue;
            }

            // Check collision
            if (!Util.entityCollision(entity, entities[entityId])) {
                continue;
            }

            collisions.push(entities[entityId]);
        }

        return collisions;
    }

    static entityCollision(entity1, entity2) {
        if (entity1.x < entity2.x + entity2.width && entity2.x < entity1.x + entity1.width && entity1.y < entity2.y + entity2.height) {
            return entity2.y < entity1.y + entity1.height;
        } else {
            return false;
        }
    }
}
