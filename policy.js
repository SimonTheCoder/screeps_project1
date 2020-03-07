/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('config');
 * mod.thing == 'a thing'; // true
 */
 
 /*
 MOVE : 50
 WORK : 100
 CARRY : 50
 ATTACK : 80
 RANGED_ATTACK : 150
 HEAL : 250
 CLAIM : 600
 TOUGH : 10
 */

module.exports = {

    creep_policy : {
        harvester:{
            creep_limit:6,
            creep_parts:[RANGED_ATTACK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]
        },
        
        builder:{
            creep_limit:20,
            creep_parts:[RANGED_ATTACK,RANGED_ATTACK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
        },
        
        upgrader:{
            creep_limit:6,
            creep_parts:[RANGED_ATTACK,WORK,WORK,CARRY,CARRY,MOVE]
        },
        mainteiner:{
            creep_limit:2,
            creep_parts:[RANGED_ATTACK,RANGED_ATTACK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE]
        },
        claimer: {
            creep_limit:1,
            //creep_parts:[ATTACK, ATTACK, ATTACK, ATTACK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE]
            creep_parts:[ATTACK, ATTACK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE]
            //creep_parts:[ATTACK,CLAIM ,MOVE]
        }
        
    },
    wait_for_energy : 60,
    is_auto_road_build : false,
    is_auto_builder_repair_road : true,
    emergency_mode : false,
    tower_repair_function : false,
    upgrade_when_idle : false

};