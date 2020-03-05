var policy = require("policy");

module.exports = {
    run: function(tower) {
        //var tower = Game.getObjectById('TOWER_ID');


        if(tower) {
			if(tower.hits < tower.hitsMax/2){
				tower.room.controller.activateSafeMode();
			}
            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(closestHostile) {
                tower.attack(closestHostile);
            }
            
            if(policy.tower_repair_function == true){
                var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => structure.hits < structure.hitsMax
                });
                if(closestDamagedStructure) {
                    tower.repair(closestDamagedStructure);
                }
            }
    

        }

        
    }
};