/*jshint esversion: 6 */

// ----------------
// MEMORY ACCESSORS
// -----------------

/**
 * returns the creeps work class as stored in memory
 * @name Creep.prototype.workClass
 * @returns {String}
 */
Creep.prototype.workClass = function ()
{
    try {
        return this.getMemory().work_class;
    }
    catch (ex){
        console.log('### EXCEPTION - Creep.prototype.workClass(): ' +  ex.message);
    }
};

/**
 * returns the creeps build level as stored in memory
 * @name Creep.prototype.buildLevel
 * @returns {number}
 */
Creep.prototype.buildLevel = function ()
{
    try {
        return this.getMemory().build_level;
    }
    catch (ex){
        console.log('### EXCEPTION - Creep.prototype.buildLevel(): ' +  ex.message);
    }
};

/**
 * returns the name of the room in which the creep was spawned
 * @name Creep.prototype.spawnRoom
 * @returns {String}
 */
Creep.prototype.spawnRoom = function ()
{
    try {
        return this.getMemory().spawn_room;
    }
    catch (ex){
        console.log('### EXCEPTION - Creep.prototype.spawnRoom(): ' +  ex.message);
    }
};

/**
 * either returns the name of the room the creep is assigned to work in
 * OR if a new room name is passed as parameter, changes the homeRoom in memory and returns nothing.
 * @name Creep.prototype.homeRoom
 * @param {String} [pNewRoomName = false] - name of room to assign as creeps new home room
 * @returns {String | undefined}
 */

Creep.prototype.homeRoom = function (pNewRoomName = false)
{
    try {
        if (!pNewRoomName) {
            return this.getMemory().home_room;
        }
        else {
            this.getMemory().home_room = pNewRoomName;
        }
    }
    catch (ex){
        console.log('### EXCEPTION - Creep.prototype.homeRoom(): ' +  ex.message);
    }
};

/**
 * either returns the creeps role setting from its memory,
 * OR if new role is passed as parameter sets that as the creeps new role and returns null.
 * @name Creep.prototype.role
 * @param {String | undefined} [pNewRole = false]
 * @returns {String | null}
 */
Creep.prototype.role = function (pNewRole = false)
{
    try {
        if (!pNewRole) {
            return this.getMemory().role;
        }
        else {
            this.getMemory().role = pNewRole;
        }
    }
    catch (ex){
        console.log('### EXCEPTION - Creep.prototype.role(): ' +  ex.message);
    }
};

/**
 * either returns the respawn time buffer setting from creeps memory
 * OR if new buffer passed as parameter, changes creeps setting to this number.
 * (the number represents the number of ticks time to live that a creeps replacement will
 * be queued for spawn.)
 * @name Creep.prototype.respawnTimeBuffer
 * @param {number} [pNewBuffer = false]
 * @returns {number | undefined}
 */

Creep.prototype.creepRespawnTimeBuffer = function (pNewBuffer = false)
{
    try {
        if (!pNewBuffer)
        {
            return this.getMemory().respawn_buffer;
        }
        else
        {
            this.getMemory().respawn_buffer = pNewBuffer;
        }
    }
    catch (ex){
        console.log('### EXCEPTION - Creep.prototype.creepRespawnTimeBuffer(): ' +  ex.message);
    }
};

Creep.prototype.boosts = function (pNewBoost = false)
{
    try {
        if (!pNewBoost) {
            return this.getMemory().boosts;
        }
        else {
            this.getMemory().boosts.push(pNewBoost);
        }
    }
    catch (ex){


        console.log('### EXCEPTION - Creep.prototype.role(): ' +  ex.message);
    }
};

// --------------------------
// TARGET MANAGEMENT
//---------------------------

Creep.prototype.targetGetId = function (pTargetId = false)
{
    try {
        if (!pTargetId)
        {
            if (_.isUndefined(this.getMemory().targetGetId))
            {
                this.getMemory().targetGetId = null;
            }
            if (!this.getMemory().targetGetId)
            {
                return undefined;
            }
            return this.getMemory().targetGetId;
        }
        else // setting the value
        {
            this.getMemory().targetGetId = pTargetId;
        }
    }
    catch (ex){
            console.log('### EXCEPTION - Creep.prototype.targetGetId(): ' +  ex.message);
    }
};

Creep.prototype.targetGet = function (pTarget = false)
{
    try {
        if (!pTarget) {

            if (!this.target_get)
            {
                this.target_get = Game.getObjectById(this.targetGetId());
            }
            return this.target_get;
        }
        else // setting the value
        {
            this.target_get = pTarget;
            this.targetGetId(this.target_get.id);
        }
    }
    catch (ex){
        console.log('### EXCEPTION - Creep.prototype.targetGet(): ' +  ex.message);
    }
};

Creep.prototype.hasGetTarget = function ()
{
    try {
        return !(!this.targetGet());
    }
    catch (ex){
        console.log('### EXCEPTION - Creep.prototype.hasGetTarget(): ' +  ex.message);
    }
};

Creep.prototype.targetGiveId = function (pTargetId = false)
{
    try {
        if (!pTargetId) {

            if (_.isUndefined(this.getMemory().targetGiveId)) {
                this.getMemory().targetGiveId = null;
            }

            if (!this.getMemory().targetGiveId) {
                return undefined;
            }

            return this.getMemory().targetGiveId;
        }
        else // setting the value
        {
            this.getMemory().targetGiveId = pTargetId;
        }
    }
    catch (ex){
        console.log('### EXCEPTION - Creep.prototype.targetGiveId(): ' +  ex.message);
    }
};

Creep.prototype.targetGive = function (pTarget = false)
{
    try {

        if (!pTarget) {

            if (!this.target_give)
            {
                this.target_give = Game.getObjectById(this.targetGiveId());
            }
            return this.target_give;
        }
        else // setting the value
        {
            this.target_give = pTarget;
            this.targetGiveId(this.target_give.id);
        }
    }
    catch (ex){
        console.log('### EXCEPTION - Creep.prototype.targetGive(): ' +  ex.message);
    }
};

Creep.prototype.hasGiveTarget = function ()
{
    try {
        return !(!this.targetGive());
    }
    catch (ex){
        console.log('### EXCEPTION - Creep.prototype.hasGiveTarget(): ' +  ex.message);
    }
};

Creep.prototype.deallocate = function (pType)
{
    try
    {
        pType = pType.toLowerCase();

        if (pType === 'get') {
            this.getMemory().targetGetId = null;
            this.target_get = null;
        }
        else if (pType === 'give') {
            this.getMemory().targetGiveId = null;
            this.target_give = null;
        }
        else if (pType === 'boost') {
            this.getMemory().targetBoostId = null;
            this.target_boost = null;
        }
        else if (pType === 'all') {
            this.getMemory().targetGetId = null;
            this.getMemory().targetGiveId = null;
            this.getMemory().targetBoostId = null;
            this.target_get = null;
            this.target_give = null;
            this.target_boost = null;
        }
    }
    catch (ex){
        console.log('### EXCEPTION - Creep.prototype.deallocate(): ' +  ex.message);
    }
};

Creep.prototype.targetBoostId = function (pTargetId = false)
{
    try {
        if (!pTargetId) {

            if (_.isUndefined(this.getMemory().targetBoostId)) {
                this.getMemory().targetBoostId = null;
            }
            if (!this.getMemory().targetBoostId) {
                return undefined;
            }
            return this.getMemory().targetBoostId;
        }
        else // setting the value
        {
            this.getMemory().targetBoostId = pTargetId;
        }
    }
    catch (ex){
        console.log('### EXCEPTION - Creep.prototype.targetBoostId(): ' +  ex.message);
    }
};

Creep.prototype.targetBoost = function (pTarget = false)
{
    try {
        if (!pTarget) {

            if (!this.target_boost)
            {
                this.target_boost = Game.getObjectById(this.targetBoostId());
            }
            return this.target_boost;
        }
        else // setting the value
        {
            this.target_boost = pTarget;
            this.targetBoostId(this.target_boost.id);
        }
    }
    catch (ex){
        console.log('### EXCEPTION - Creep.prototype.targetBoost(): ' +  ex.message);
    }
};

Creep.prototype.hasBoostTarget = function ()
{
    try {
        return !(!this.targetBoost());
    }
    catch (ex){
        console.log('### EXCEPTION - Creep.prototype.hasBoostTarget(): ' +  ex.message);
    }
};

//---------------------------
// END TARGET MANAGEMENT
//---------------------------

/**
 * either returns the current full state of the creep from memory
 * OR if new state passed as parameter it sets creeps full state to that
 * @name Creep.prototype.isFull
 * @param {Boolean} [pState = 'none']
 * @returns {Boolean | undefined}
 */

Creep.prototype.isFull = function (pState = 'none')
{
    try {
        if (pState === 'none') {
            if (!this.getMemory().full) {
                this.getMemory().full = false;
            }
            return this.getMemory().full;
        }
        else // pState is passed in set state to that
        {
            this.getMemory().full = pState;
        }
    }
    catch (ex){
        console.log('### EXCEPTION - Creep.prototype.isFull(): ' +  ex.message);
    }
};

/**
 * this is a wrapper for the moveto function
 * for now it doesn't do much, but leaves open the possibility of
 * caching paths in future if needed for CPU use optimisation
 * @name Creep.prototype.moveToPos
 * @param {RoomPosition} pPos
 */

Creep.prototype.moveToPos = function(pPos)
{
    try
    {
        if (this.fatigue === 0)
        {
            this.moveTo(pPos, {reusePath: 20});
        }

    }
    catch (ex){
        console.log('### EXCEPTION - Creep.prototype.moveToPos(): ' +  ex.message);
    }
};

Creep.prototype.hasBodyPart = function (pPartType)
{
    try {
        if (!this.getMemory().has_body_part)
        {
            this.getMemory().has_body_part = {};
        }

        if (!this.getMemory().has_body_part[pPartType]) {
            this.getMemory().has_body_part[pPartType] = _.sum(this.body, function(x){return x.type === pPartType;}) > 0;
        }
        return this.getMemory().has_body_part[pPartType];
    }
    catch (ex){
        console.log('### EXCEPTION - Creep.prototype.hasBodyPart: | ' + pPartType + '| ' +  ex.message);
    }
};

Creep.prototype.manageCarryState = function(pResetGiveOnStateChange, pResetOnGetStateChange)
{
    try {
        if (this.isFull() && _.sum(this.carry) === 0)
        {
            this.isFull(false);

            if (pResetGiveOnStateChange)
            {
                this.deallocate('give');
            }

        }
        else if (!this.isFull() && _.sum(this.carry) === this.carryCapacity)
        {
            this.isFull(true);

            if (pResetOnGetStateChange)
            {
                this.deallocate('get');
            }
        }
    }
    catch (ex){
        console.log('### EXCEPTION - Creep.prototype.manageCarryState: ' +  ex.message);
    }
};

Creep.prototype.targetedForJob = function (pTargeting = false)
{
    try {
        if (!pTargeting) {
            if (!this.getMemory().target_job)
            {
                this.memory.target_job = 'none';
            }
            return this.getMemory().target_job;
        }
        else {
            this.getMemory().target_job = pTargeting;
        }
    }
    catch (ex){
        console.log('### EXCEPTION - Creep.prototype.targetedForJob: ' +  ex.message);
    }
};

Creep.prototype.cargoType = function()
{
    try {
        if (!this.cargo_type)
        {

            let vKeys = Object.keys(this.carry);
            let vCount = vKeys.length;

            if (vCount === 1)
            {
                if (this.carry.energy === 0)
                {
                    this.cargo_type = 'empty';
                }
                else
                {
                    this.cargo_type = 'energy';
                }
            }
            else // something other than energy on board
            {
                let vMaxAmt = _.max(this.carry);

                // find the cargo with the highest amount and deal with that first
                do {
                    if (this.carry[vKeys[vCount - 1]] === vMaxAmt) {
                        this.cargo_type = vKeys[vCount - 1];
                        break;
                    }
                    vCount--;
                } while (vCount > 0);
            }
        }
        return this.cargo_type;
    }
    catch (ex){
        console.log('### EXCEPTION - Creep.prototype.cargoType: ' +  ex.message);
    }
};

Creep.prototype.inArea = function(pRoomName, pTopLeftX, pTopLeftY, pBottomRightX, pBottomRightY)
{
    try {
        return  this.room.name === pRoomName &&
            this.pos.x >= pTopLeftX && this.pos.x <= pBottomRightX &&
            this.pos.y >= pTopLeftY && this.pos.y <= pBottomRightY;
    }
    catch (ex){
        console.log('### EXCEPTION - Creep.prototype.inArea: ' +  ex.message);
    }
};

//---------------------------
// WAYPOINT FOLLOWING LOGIC
//---------------------------

Creep.prototype.followWaypointPath = function(pWaypointPrefix, pRangeAccuracy = 1)
{
    try {
        let vReturn = false;

        if (!this.memory.waypoint || this.memory.waypoint.prefix !== pWaypointPrefix)
        {
            this.memory.waypoint = {prefix: pWaypointPrefix, number: 1};
            this.deallocate('all');
        }

        if (this.memory.waypoint.number !== 'end')
        {
            // this will only find a valid waypoint if the waypoint path does not have 'end' as the waypoint number
            let vWayPoint = Game.flags[this.memory.waypoint.prefix + '_' + this.memory.waypoint.number];

            // the waypoint exists we haven't moved past it yet
            if (!(!vWayPoint))
            {
                this.say('transit ');

                if (this.pos.getRangeTo(vWayPoint) > pRangeAccuracy)
                {
                    this.moveToPos(vWayPoint.pos);
                }
                else
                {
                    this.memory.waypoint.number++;
                }

                // if it is in transit and is wounded and has heal, then heal itself
                if (this.hasBodyPart(HEAL)) {
                    if (this.hits < this.hitsMax) {
                        this.heal(this);
                    }
                    // perhaps add logic to make it look for any friendly wounded nearby and heal them
                }
                vReturn = true; // true indicates that we followed the waypoint path this turn
            }
            else // way point doesnt exist so must be end of waypoints
            {
                this.memory.waypoint.number = 'end';
            }
        }
        return vReturn;
    }
    catch (ex){
        console.log('### EXCEPTION - Creep.prototype.followWaypointPath: ' +  ex.message);
    }
};

//---------------------------
// END WAYPOINT FOLLOWING LOGIC
//---------------------------

Creep.prototype.isIsolated = function ()
{
    try
    {
        return this.pos.findInRange(FIND_HOSTILE_CREEPS, 1).length === 1;
    }
    catch (ex){
        console.log('### EXCEPTION - Creep.prototype.isIsolated: ' +  ex.message);
    }
};

Creep.prototype.resourceToWithdraw = function(pNewResource = 'none')
{
    try
    {
        if (pNewResource === 'none')
        {
            if (!this.getMemory().resource_to_withdraw)
            {
                this.getMemory().resource_to_withdraw = RESOURCE_ENERGY;
            }

            return this.getMemory().resource_to_withdraw;
        }
        else // setting not getting
        {
            this.getMemory().resource_to_withdraw = pNewResource;
            return this.getMemory().resource_to_withdraw;
        }
    }
    catch (ex){
        console.log('### EXCEPTION - Creep.prototype.resourceToWithdraw: ' +  ex.message);
    }
};

Creep.prototype.isBadlyWounded = function()
{
    try
    {
        if (!this.is_badly_wounded)
        {
            this.is_badly_wounded = this.hits < this.hitsMax * 0.2;
        }
        return this.is_badly_wounded;
    }
    catch (ex){
        console.log('### EXCEPTION - Creep.prototype.resourceToWithdraw: ' +  ex.message);
    }
};
