var roleHarvester = require('role.harvester');
var policy = require("policy");

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        
        
        var auto_road_result = ERR_INVALID_TARGET;//creep.room.createConstructionSite(creep.pos,STRUCTURE_ROAD);
        
        if(policy.is_auto_road_build){
            auto_road_result = creep.room.createConstructionSite(creep.pos,STRUCTURE_ROAD);
            //console.log("auto road:"+auto_road_result);
        }
        //no building target ,temp as harvester
        if(targets.length < 1) {
            if(auto_road_result == ERR_INVALID_TARGET && creep.store[RESOURCE_ENERGY] > 0 && policy.is_auto_builder_repair_road == true){
                var nearests = creep.room.find(FIND_STRUCTURES);
                if(nearests.length >0){
                    creep.repair(nearests[0]);
                    //console.log(creep.name + " is reqairing " + nearests[0].structureType);
                }
                
            }
            roleHarvester.run(creep);
            return;
        }

        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        if(creep.memory.building) {
            //var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
        else {
            /*
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
            */
            roleHarvester.run(creep);
        }
        
    }
};

module.exports = roleBuilder;