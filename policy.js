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
            creep_limit:4,
            creep_parts:[RANGED_ATTACK,WORK,WORK,CARRY,MOVE]
        },
        
        builder:{
            creep_limit:5,
            creep_parts:[WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
        },
        
        upgrader:{
            creep_limit:2,
            creep_parts:[RANGED_ATTACK,WORK,WORK,CARRY,MOVE]
        },
        mainteiner:{
            creep_limit:2,
            creep_parts:[WORK,WORK,CARRY,MOVE]
        },
        
    },
    wait_for_energy : 60,
    is_auto_road_build : true,
    is_auto_builder_repair_road : false,
    tower_repair_function : false

};