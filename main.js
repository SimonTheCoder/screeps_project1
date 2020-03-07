var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleMainteiner = require('role.mainteiner');
var roleClaimer = require('role.claimer');
var roleSCV = require('role.SCV');
var factory = require('factory');
var scheduler = require('scheduler');
var policy = require("policy");
var tower = require("tower");
var util = require("util");

module.exports.loop = function () {

    //var tower = Game.getObjectById('TOWER_ID');



    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        
        var hostiles = creep.room.find(FIND_HOSTILE_CREEPS)
        if(hostiles.length > 0){
            if(creep.rangedAttack(hostiles[0])==ERR_NOT_IN_RANGE){
                creep.moveTo(hostiles[0], {visualizePathStyle: {stroke: '#ff0000'}});
            }
        }
        
        if(util.emergency_mode){
            roleHarvester.run(creep);
        }else{
            if(creep.memory.role == 'harvester') {
                roleHarvester.run(creep);
            }
            if(creep.memory.role == 'upgrader') {
                roleUpgrader.run(creep);
            }
            if(creep.memory.role == 'builder') {
                roleBuilder.run(creep);
            }
            if(creep.memory.role == 'mainteiner') {
                roleMainteiner.run(creep);
            }
            if(creep.memory.role== 'claimer'){
                roleClaimer.run(creep);
            }
        }
    }

    factory.run(Game.spawns['Spawn1']);
    scheduler.run();
    


	
	for(var name in Game.rooms) {
	    var towers = Game.rooms[name].find(FIND_STRUCTURES,{filter: obj => obj.structureType == STRUCTURE_TOWER});
	    //console.log("tower count:"+towers.length);
		if(towers.length > 0){ 
		    for(var cur_tower in towers){
		    
			    tower.run(towers[cur_tower]);
		    }
		}
		if(1){
			//console.log('Room "'+name+'" has '+Game.rooms[name].energyAvailable+' energy');
			Game.rooms[name].visual.text(
				'Energy:️' +Game.rooms[name].energyAvailable,
				0,
				0,
				{align: 'left', opacity: 0.8});
			
			var creep_limit = 0; 
			_.map(policy.creep_policy, (role) =>{
				creep_limit += role["creep_limit"];
			}) 
			Game.rooms[name].visual.text(
				'Creep:'+ Object.keys(Game.creeps).length + "/"+creep_limit,
				0,
				1,
				{align: 'left', opacity: 0.8});
		}
	}
        
}