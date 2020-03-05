/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('factory');
 * mod.thing == 'a thing'; // true
 */
var policy = require("policy")
var roles = {
    harvester : null,
    builder : null,
    upgrader : null
    
};

var DEBUG = false;

var last_spwan_result = 0;
var wait_for_energy = 0;

module.exports = {

    run: function(spawn) {
        
        var creep_limit = 0; 
        _.map(policy.creep_policy, (role) =>{
            creep_limit += role["creep_limit"];
        })
        if(DEBUG)console.log("current creep limit:"+creep_limit);
        
        if(creep_limit == Object.keys(Game.creeps).length ){
            //no creep lost. 
            return;
        }
        
        //remove dead creeps
        for(var name in Memory.creeps) {
            //remove dead creeps
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
        
        //spawn creaps
        //console.log(policy.creep_limit);
        if(spawn.spawning) {
            var spawningCreep = Game.creeps[spawn.spawning.name];
            spawn.room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                spawn.pos.x + 1,
                spawn.pos.y,
                {align: 'left', opacity: 0.8});
            return;
        }
        
        if(last_spwan_result == ERR_NOT_ENOUGH_ENERGY && wait_for_energy > 0){
            wait_for_energy--;
        }
        
        for(var cur_role in policy.creep_policy){
            creep_count =  _.filter(Game.creeps, (creep) => creep.memory.role == cur_role).length;
            if(DEBUG)console.log("role "+cur_role + "has :" + creep_count + "   limit:"+policy.creep_policy[cur_role].creep_limit);
            if(policy.creep_policy[cur_role].creep_limit > creep_count){
                
                if (spawn.spawnCreep(policy.creep_policy[cur_role].creep_parts, "DRY_RUN_TEST",
                                                           {dryRun: true}) == 0){
                    var new_name = cur_role+Game.time;
                    
                    var result =spawn.spawnCreep(policy.creep_policy[cur_role].creep_parts, new_name,
                                                               {memory: {role: cur_role}});
                                                               
                    console.log("spwan:"+new_name + " result:" + result);
                    last_spwan_result = result; 
                    if(result == ERR_NOT_ENOUGH_ENERGY){
                        wait_for_energy = policy.wait_for_energy;
                    }
                }
            }
        }
        
    }

};