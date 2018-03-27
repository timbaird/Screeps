/**
 * @name SpawnOrder.constructor
 * @param pSpawnRoomName string
 * @param pHomeRoomName string
 * @param pWorkClass string
 * @param pRole string
 * @param pBuildLevel number
 * @param pBoosts Array
 * @param pRespawnTimeBuffer number
 * @param pPriority string
 * @param pName [String = undefined]
 */


function SpawnOrder(pSpawnRoomName, pHomeRoomName, pWorkClass, pRole, pBuildLevel, pBoosts, pPriority, pRespawnTimeBuffer, pName = undefined) {

    try {
        this.spawn_room = pSpawnRoomName;
        this.home_room = pHomeRoomName;
        this.work_class = pWorkClass;
        this.role = pRole;
        this.build_level = pBuildLevel;
        this.priority = pPriority;
        this.boosts = pBoosts;
        this.respawn_time_buffer = pRespawnTimeBuffer;
        this.name = pName;
        this.build_type = Memory.settings.creeps.roles[this.role].buildType;

    }
    catch (ex) {
        console.log('### EXCEPTION - SpawnOrder.constructor(): ' + ex.message);
    }
}


/**
 * gets the body part array for the spawn order from the settings
 * @name SpawnOrder.getBody
 * @returns {*}
 */

SpawnOrder.prototype.getBody = function()
{
    try {
        return Memory.settings.creeps.buildTypes[this.build_type][this.build_level].parts;
    }
    catch (ex){
        console.log('### EXCEPTION - SpawnOrder.getBody(): ' +  ex.message);
    }
};

/**
 * gets the energy cost for the spawn order from the settings
 * @name SpawnOrder.getCost
 * @returns {*}
 */

SpawnOrder.prototype.getCost = function()
{
    try {
        return Memory.settings.creeps.buildTypes[this.build_type][this.build_level].cost;
    }
    catch (ex){
        console.log('### EXCEPTION - SpawnOrder.getCost(): ' +  ex.message);
    }
};

/**
 * compiles the memory object needed for spaning the order
 * @name SpawnOrder.getMemory
 * @returns {*}
 */

SpawnOrder.prototype.getMemoryObject = function()
{
    try {
        // console.log('SpawnOrder.getMemoryObject() : ' + this.role);
        return {
            spawn_room: this.spawn_room,
            home_room: this.home_room,
            work_class: this.work_class,
            build_type: this.build_type,
            build_level: this.build_level,
            respawn_buffer: this.respawn_time_buffer,
            boosts: this.boosts,
            role: this.role
        }
    }
    catch (ex){
        console.log('### EXCEPTION - SpawnOrder.getMemory(): ' +  ex.message);
    }

};

/**
 * returns a json - memory storable object to be stored in a spawns queue in memory
 * @name SpawnOrder.toJson
 * @returns {[body], name, {memory}, cost}
 */

SpawnOrder.prototype.toJson = function()
{
    try {
        return {
            memory: this.getMemoryObject(),
            body: this.getBody(),
            cost: this.getCost(),
            priority: this.priority,
            name: undefined
        }
    }
    catch (ex){
        console.log('### EXCEPTION - SpawnOrder.toJson(): ' +  ex.message);
    }
};
