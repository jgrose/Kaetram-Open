let Utils = require('../../../../util/utils'),
    Messages = require('../../../../network/messages'),
    Packets = require('../../../../network/packets');

class MobHandler {

    constructor(mob, world) {
        let self = this;

        self.mob = mob;
        self.world = world;
        self.map = world.map;

        self.roamingInterval = null;
        self.spawnLocation = mob.spawnLocation;
        self.maxRoamingDistance = mob.maxRoamingDistance;

        self.load();
        self.loadCallbacks();
    }

    load() {
        let self = this;

        if (!self.mob.roaming)
            return;

        self.roamingInterval = setInterval(() => {

            if (!self.mob.dead) {
                let newX = self.mob.x + Utils.randomInt(-4, self.maxRoamingDistance),
                    newY = self.mob.y + Utils.randomInt(-4, self.maxRoamingDistance),
                    distance = Utils.getDistance(self.spawnLocation[0], self.spawnLocation[1], newX, newY);

                if (!self.map.isColliding(newX, newY) &&
                    distance < self.mob.maxRoamingDistance &&
                    !self.mob.combat.started) {

                    self.mob.setPosition(newX, newY);

                    self.world.push(Packets.PushOpcode.Regions, {
                        regionId: self.mob.region,
                        message: new Messages.Movement(Packets.MovementOpcode.Move, {
                            id: self.mob.instance,
                            x: newX,
                            y: newY
                        })
                    });
                }

            }

        }, 5000);
    }

    loadCallbacks() {
        let self = this;

        /*self.mob.onMovement((x, y) => {


            console.trace(`x: ${x}, y: ${y}`);
        });*/
    }

}

module.exports = MobHandler;