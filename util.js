

var util = {
    find_nearest_target : function(creep,target_type,structure_type = null){
        
        
            var sources = null;
            
            if(structure_type != null)
            {
                target_type = FIND_STRUCTURES;
                sources = creep.room.find(target_type, {filter: obj => obj.structureType == structure_type}); 
            }else{
                sources = creep.room.find(target_type);
            }
            if(sources.length < 1) return null;
            var nearest = sources[0];
            var nearest_dist = 99999999;
            for(var src_index in sources){
                var src = sources[src_index];
                var calc_dist = Math.pow(src.pos.x - creep.pos.x,2) + Math.pow(src.pos.y - creep.pos.y,2);
                //console.log("dist*dist:" + calc_dist);
                if(calc_dist < nearest_dist){
                    nearest_dist = calc_dist;
                    nearest = src;
                }
            }
            
            return nearest;
        
    },
    find_nearest_target_in_room : function(room, my_pos, find_type, opt){
        var sources = room.find(find_type,opt);
            if(sources.length < 1) return null;
            var nearest = sources[0];
            var nearest_dist = 99999999;
            for(var src_index in sources){
                var src = sources[src_index];
                var calc_dist = Math.pow(src.pos.x - my_pos.x,2) + Math.pow(src.pos.y - my_pos.y,2);
                //console.log("dist*dist:" + calc_dist);
                if(calc_dist < nearest_dist){
                    nearest_dist = calc_dist;
                    nearest = src;
                }
            }
            
            return nearest;
    },
    find_nearest_sturcture : function(creep,structure_type){
        return util.find_nearest_target(creep, FIND_STRUCTURES,structure_type);
    },
    
    find_creeps_near_target : function(target,distance){
        return target.pos.findInRange(FIND_CREEPS, distance);
    },
    
    hello : function(){
        console.log("hello."); 
        return;
    },
    
    destroy_all_road : function(room_name){
        
        return; // dangerous method ...
        var roads = Game.rooms[room_name].find(FIND_STRUCTURES, {filter: obj => obj.structureType == STRUCTURE_ROAD});
        console.log(roads.length + " found.");
        for(var i in roads){
            console.log(roads[i].destroy());
        }
        return;
    },
    
    create_all_road : function(room_name,from){
        
        //return; // dangerous method ...
        
        var targets = Game.rooms[room_name].find(FIND_STRUCTURES, {filter: obj => obj.structureType == STRUCTURE_CONTAINER
                                                                                    || obj.structureType == STRUCTURE_CONTROLLER   
                                                                                   /* || obj.structureType == STRUCTURE_EXTENSION*/
                                                                                    || obj.structureType == STRUCTURE_TOWER
            
        });
        var sources = Game.rooms[room_name].find(FIND_SOURCES);
        
        //targets = targets.concat(sources);
        //console.log("found: "+ sources.length + "/"+ targets.length );
        
        for(var i in sources){
            var tpath = PathFinder.search(from.pos, {pos:sources[i].pos,range:1});
            console.log("source:" + i + tpath.path);
            for(var j in tpath.path){
                console.log(tpath.path[j]);
                console.log(Game.rooms[room_name].createConstructionSite(tpath.path[j],STRUCTURE_ROAD));
            }
        }
        
        for(var i in targets){
            var tpath = PathFinder.search(from.pos, {pos:targets[i].pos,range:0});
            for(var j in tpath.path){
                Game.rooms[room_name].createConstructionSite(tpath.path[j],STRUCTURE_ROAD);
            }
            
        }
        
        return;
    },
    
    create_road : function(room_name,start_id,stop_id){
        var room =  Game.rooms[room_name];
        var start = Game.getObjectById(start_id);
        var stop = Game.getObjectById(stop_id);
        var tpath = PathFinder.search(start.pos, {pos:stop.pos,range:0});

        for(var j in tpath.path){
                console.log(tpath.path[j]);
                console.log(Game.rooms[room_name].createConstructionSite(tpath.path[j],STRUCTURE_ROAD));
        }
    },
    
    
    mine_energy : function(creep){
        
    }
    
};

this.hello = util.hello;
this.util = util;

module.exports = util