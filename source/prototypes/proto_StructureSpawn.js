/*jshint esversion: 6 */

/**
 * Either adds the passed spawn object to the queue for this spawn, OR
 * if no parameter passed returns the existing queue.
 * @name StructureSpawn.prototype.queue
 * @param pSpawnOrder
 * @returns {[SpawnOrder]}
 */

StructureSpawn.prototype.queue = function(pSpawnOrder = false)
{
    try {
        // if the soawn queue doesn't exists create it
        if (!this.getMemory().spawnQueue)
        {
            this.getMemory().spawnQueue = [];
        }

        // if this is a getter not a setter then return the spaen queue
        if (!pSpawnOrder)
        {
            return this.getMemory().spawnQueue;
        }
        else // it is a setter not a getter
        {
            if (pSpawnOrder.priority === 'high')
            {
                // put high priority spawn orders at the top of the queue
                this.getMemory().spawnQueue.unshift(pSpawnOrder);
            }
            else
            {
                // put normal priority orders at the bottom of the queue
                this.getMemory().spawnQueue.push(pSpawnOrder);
            }
        }
    }
    catch (ex){
        console.log('### EXCEPTION - StructureSpawn.prototype.queue(): ' +  ex.message);
    }
};

/**
 * Resets the spawn queue of the spawn to empty
 * @name StructureSpawn.prototype.resetQueue
 */
StructureSpawn.prototype.resetQueue = function()
{
    try {
        this.memory.spawnQueue = [];
    }
    catch (ex){
        console.log('### EXCEPTION - StructureSpawn.prototype.resetQueue(): ' +  ex.message);
    }
};

/**
 * returns a summary of the spawn orders queued on the spawn
 * format is e.g summary.homeroom.worklcass.role = 1
 * @name StructureSpawn.prototype.queueSummary
 * @returns [SpawnOrder]
 */


StructureSpawn.prototype.queueSummary = function()
{
    try {

        // create the instance variable
        if (!this.queue_summary) {

            this.queue_summary = {};

            let vHomeRoom;
            let vWorkClass;
            let vRole;
            let i;

            const q = this.queue();

            // for each spawn order in the queue
            for (i in q) {

                //console.log("Bingo:  " + i);

                if (q.hasOwnProperty(i))
                {
                    vHomeRoom = q[i].memory.home_room;
                    vWorkClass = q[i].memory.work_class;
                    vRole = q[i].memory.role;

                    //console.log(i + ' ' + vHomeRoom + ' ' + vWorkClass + ' ' + vRole);

                    if (!this.queue_summary[vHomeRoom]) {
                        this.queue_summary[vHomeRoom] = {};
                    }

                    if (!this.queue_summary[vHomeRoom][vWorkClass]) {
                        this.queue_summary[vHomeRoom][vWorkClass] = {};
                    }

                    if (!this.queue_summary[vHomeRoom][vWorkClass][vRole]) {
                        this.queue_summary[vHomeRoom][vWorkClass][vRole] = 1;
                    }
                    else {
                        this.queue_summary[vHomeRoom][vWorkClass][vRole]++;
                    }
                }
            }// end for loop
        }
        return this.queue_summary;
    }
    catch (ex){
        console.log('### EXCEPTION - StructureSpawn.prototype.queueSummary(): ' +  ex.message);
    }

};


/**
 * checks if spawn is busy, and if not checks if there is any orders queued
 * and if the spawn is capable of spawnging them. if so the order is spawned and
 * the order is removed from the queue.
 * @name StructureSpawn.prototype.operate
 */

StructureSpawn.prototype.operate = function()
{
    try {
        // if it is already spawning then dont waste the processor

        // this relies on the screening being done at a higher level

        //if (!this.spawning)
        //{
            // if there is something in the spawn queue
          //  if (this.queue().length > 0)
            //{
                let vOrder = this.queue()[0];

                // if this creep is too big to ever be spawned here then get rid of the order
                while (!(!vOrder) && this.room.energyCapacityAvailable < vOrder.cost)
                {
                    this.memory.spawnQueue.splice(0, 1);
                    vOrder = this.queue()[0];
                }

                // check the priority and available energy
                if ( !(!vOrder) &&
                    (vOrder.priority === 'normal' && this.room.energyAvailable > this.room.energyCapacityAvailable * 0.9
                    || vOrder.priority === 'high' ))
                {
                    // if the creep can be created
                    if (this.canCreateCreep(vOrder.body) === OK)
                    {
                        this.createCreep(vOrder.body, vOrder.name, vOrder.memory);
                        //console.log('StructureSpawn.operate() ' + this.room.name + ' ' + this + ' ' + ' spawning from queue ' + vOrder.memory.role);
                        this.memory.spawnQueue.splice(0, 1);
                    }
                }
         //   }
       // }
    }
    catch (ex){
        console.log('### EXCEPTION - StructureSpawn.operate(): ' +  ex.message);
    }
};



StructureSpawn.prototype.needsEnergy = function()
{
    try {

        if (!this.needs_energy)
        {
            this.needs_energy = this.energyCapacity > this.energy;
        }
        return this.needs_energy;

    }
    catch (ex){
        console.log('### EXCEPTION - StructureSpawn.prototype.needsEnergy(): ' +  ex.message);
    }
};