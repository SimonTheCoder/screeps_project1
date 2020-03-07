var roleHarvester = require('role.harvester');
var policy = require("policy");


module.exports = {
    run : function(creep){
        
        //console.log("re:" + creep.memory.repairing + "  cap:" + creep.store[RESOURCE_ENERGY]);
        if(creep.memory.repairing  && creep.store[RESOURCE_ENERGY] == 0){
            creep.memory.repairing = false;
        }
		
		if(!creep.memory.repairing  && creep.store.getFreeCapacity() == 0){
			creep.memory.repairing = true;
		}
        
		if(creep.memory.repairing){
			var buildings = creep.room.find(FIND_STRUCTURES,
			                                {filter:(object) => object.hits < object.hitsMax /* && object.structureType != STRUCTURE_WALL*/
			                                && object.structureType == STRUCTURE_CONTAINER});
			                                
			if(buildings.length < 1){
				buildings = creep.room.find(FIND_STRUCTURES,
			                                {filter:(object) => object.hits < object.hitsMax 
			                                && (object.structureType != STRUCTURE_WALL/* && object.structureType != STRUCTURE_ROAD*/)});
			}
			
			if(buildings.length < 1){
				buildings = creep.room.find(FIND_STRUCTURES,
			                                {filter:(object) => object.hits < object.hitsMax});
			}
			
			
			if(buildings.length < 1){
			    creep.memory.repairing = false;
				roleHarvester.run(creep);
			}else{
    			//console.log("need repair found:" + buildings.length + " creep_res:"+creep.store[RESOURCE_ENERGY] + "rept:"+buildings[0].structureType);
    			if(creep.repair(buildings[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(buildings[0], {visualizePathStyle: {stroke: '#33aa00'}});
                }
			}
        }else{  
            roleHarvester.run(creep);
        }
        
    }
};