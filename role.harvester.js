var roleUpgrader = require('role.upgrader');
var util = require('util');

var last_source_target_id = null;
var last_source_target_count = 0;
var roleHarvester = {
    get_random_resource_target : function(creep) {
        		var sources = creep.room.find(FIND_SOURCES);
				var target_index = Math.floor( Math.random()*sources.length);
				//console.log("random index:" + target_index);
				return sources[target_index];
    },
    /** @param {Creep} creep **/
    run: function(creep) {
        
       
        if(creep.memory.need_harvest /*&& creep.store.getFreeCapacity() == creep.store.getCapacity()*/ ) {
			/*
            var sources = creep.room.find(FIND_SOURCES);
            var nearest = sources[0];
            var nearest_dist = 99999999;
            for(var src_index in sources){
                var src = sources[src_index];
                var calc_dist = Math.pow(src.pos.x - creep.pos.x,2) + Math.pow(src.pos.y - creep.pos.y,2);
                //console.log("dist*dist:" + calc_dist);
                if(calc_dist < nearest_dist && src.energy >=nearest_dist.energy ){
                    nearest_dist = calc_dist;
                    nearest = src;
                }
            }
            
            if(creep.harvest(nearest) == ERR_NOT_IN_RANGE) {
                creep.moveTo(nearest, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
			*/
			//console.log("about to mining:" + creep.memory.source_target + "  freecap:"+creep.store.getFreeCapacity() );
			if(creep.memory.source_target != null){
			    var target = Game.getObjectById(creep.memory.source_target);
			    var har_result = creep.harvest(target);
			    //console.log("har_result:" + har_result + "=" + ERR_NOT_IN_RANGE );
				if( har_result == ERR_NOT_IN_RANGE){
					creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
				}else if(har_result == ERR_BUSY){	
				    //creep.memory.source_target = roleHarvester.get_random_resource_target_id(creep);
				}else if(har_result != OK){
				    console.log("bad har_result:" + har_result + "=" + ERR_NOT_IN_RANGE );
				    creep.memory.source_target = null;
				}
			}else{
				var target = roleHarvester.get_random_resource_target(creep)
			    creep.memory.source_target = target.id;
			    /*
				creep.memory.source_target_path = PathFinder.search(creep.pos, 
																	{pos:target.pos,range:1});
				var mbpr = creep.moveByPath(creep.memory.source_target_path.path);
				console.log("follow path:"+mbpr);
																
				*/
				//console.log("source target :" + creep.memory.source_target);
			}
			if(creep.store.getFreeCapacity() == 0)creep.memory.need_harvest = false;
        } else {
			creep.memory.source_target != null;
			creep.memory.source_target_path = null;
			if(creep.store.getFreeCapacity() == creep.store.getCapacity())creep.memory.need_harvest = true;
			/*
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_CONTAINER ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            */
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
                        
            if(targets.length < 1){
                targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_CONTAINER
                        &&structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0}
                    
                });
            }            
            
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }else{
                //nowhere to store. need more store
                //console.log("No energy storage found!");
                
                //send energe to cl
                roleUpgrader.run(creep);
                
            }
        }
    }
};

module.exports = roleHarvester;