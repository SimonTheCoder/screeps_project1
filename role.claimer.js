/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.claimer');
 * mod.thing == 'a thing'; // true
 */
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var work_room = "W2N7"; 

var roleClaimer = {
    
    run : function(creep) {

        roleClaimer.current_claimer = creep;
        
        if(creep.memory.arrival == true){
            
            
            
            
            roleUpgrader.run(creep);
            //roleBuilder.run(creep);
            return;
        }
        
        if( roleClaimer.move_to_pos(creep) == "OK"){
            creep.memory.arrival = true;
        }
        
        
        return;
        creep.memory.room_path = null;
        if(creep.memory.room_path){
                var mbpr = creep.moveByPath(creep.memory.room_path.path);
				if(mbpr==0){
				    console.log("===================follow path:"+mbpr);
				}else{
				    console.log("===================follow path:"+mbpr);
				    creep.memory.room_path = null;
				}
				//console.log("===================follow path:"+mbpr);
				//console.log(creep.pos);
				//console.log(creep.memory.room_path.path);
				/*
				if(mbpr == ERR_NOT_FOUND){
				    
				    var movToR = creep.moveTo(creep.memory.room_path.path[0].x,creep.memory.room_path.path[0].y);
				    console.log("mov to r:"+movToR);
				    creep.memory.room_path = null;
				}
				*/

        }else{
            //console.log("====");
        }
        
        
          
    },
    current_claimer : null,
    
    move_to_pos : function(creep,pos){
        // claimer.move_to_pos(null,new RoomPosition(21,41,work_room))
        if(!pos) pos = new RoomPosition(21,41,"W2N7");
        if(!creep)creep = roleClaimer.current_claimer;
        if(!creep)return "No claimer found!";
        var target_path = PathFinder.search(creep.pos, {pos:pos,range:0});
        //console.log("creep :"+ creep.pos.x + "  "+creep.pos.y);
		//console.log("follow path 1st point:"+target_path.path[0].x + "  "+target_path.path[0].y ); 
		//creep.memory.room_path = target_path;

		if(target_path.path.length < 3)return "OK";
		var mbpr = creep.moveByPath(target_path.path);
		//console.log("follow path:"+mbpr);
		return mbpr;

    }
  
}
this.claimer = roleClaimer;
module.exports = roleClaimer;