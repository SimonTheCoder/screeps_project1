
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
    find_nearest_sturcture : function(creep,structure_type){
        return util.find_nearest_target(creep, FIND_STRUCTURES,structure_type);
    },
    
    mine_energy : function(creep){
        
    }
};

module.exports = util