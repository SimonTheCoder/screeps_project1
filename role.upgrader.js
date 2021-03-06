var util = require('util');


var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
            creep.memory.upgrading = true;
            creep.say('⚡ upgrade');
        }

        if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            var container = util.find_nearest_sturcture(creep,STRUCTURE_CONTAINER);
            //console.log(container.store[RESOURCE_ENERGY])
            if(container != null && container.store[RESOURCE_ENERGY] > 1)
            {
                
                var withdraw_result = creep.withdraw(container, RESOURCE_ENERGY)
                //console.log("contianer:"+container.id + "  res:"+withdraw_result);
                if(withdraw_result == ERR_NOT_IN_RANGE){
                    creep.moveTo(container, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
                
            }else{
            
                var sourcesite = creep.pos.findClosestByPath( creep.room.find(FIND_SOURCES));
                //console.log("==="+sourcesite);
                if(creep.harvest(sourcesite) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sourcesite, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        }
    }
};

module.exports = roleUpgrader;