function ManagerSpawn(){
    console.log('### ManagerSpawns Class contains only static methods, no need to instantiate');
};

/**
 * Queues the various work class of creeps needed on a relevant spawn and Operates each spawn.
 * @name ManagerSpawn.manageSpawn.STATIC
 */
ManagerSpawn.manageSpawnQueues = function() {
    try {
        // To Do???  rotate through which if the spawn functions gets run each tick
        ManagerSpawn.queueWorkers();
        ManagerSpawn.queueGatherers();
        ManagerSpawn.queueAssistants();
        ManagerSpawn.queueClaimers();
        ManagerSpawn.queueMilitary();
    }
    catch (ex) {
        console.log('### EXCEPTION - ManagerSpawns.manageSpawnQueues(): ' + ex.message);
    }
}


ManagerSpawn.manageSpawnOperation = function(){
    try{
        const vViableSpawns = _.select(Game.spawns, (x)=> {return !x.spawning && x.queue().length > 0;});

        for (let i in vViableSpawns)
        {
            vViableSpawns[i].operate();
        }
    }
    catch (ex) {
        console.log('### EXCEPTION - ManagerSpawns.manageSpawnOperation(): ' + ex.message);
    }
}

/**
 * (periodically) checks each rooms number of worker creeps vs its config.room
 * spawnGoals and if there is a need queues more workers in the rooms spawn queues
 * @name  ManagerSpawn.queueWorkers.STATIC
 */

ManagerSpawn.queueWorkers = function() {
    try {

       let vWorkClass = 'worker';

       let vMyBuiltRooms = _.select(Game.rooms, (x)=> {return !(!x.controller) && x.controller.level > 0 && x.isMine()});

        let i;

        for (i in vMyBuiltRooms)
        {
           let vRoomName = vMyBuiltRooms[i].name;

            // Loop
            for (let vRole in Memory.settings.room[vRoomName].creepSpawnGoals) {

               let vNumRequired = vMyBuiltRooms[i].getNumCreepsRequiredByClassAndRole(vRoomName, vWorkClass, vRole);
               let vNumExisting = vMyBuiltRooms[i].getExistingCreepsByClassAndRole(vRoomName, vWorkClass, vRole).length;
               let vNumQueued = vMyBuiltRooms[i].getNumCreepsQueuedByClassAndRole(vRoomName, vWorkClass, vRole);
                //if(vNumQueued > 0){console.log("Worker " + vRoomName + '-' + vRole + ' queued ' + vNumQueued);}
               let vNumToQueue = vNumRequired - (vNumExisting + vNumQueued);

                if (vNumToQueue > 0)
                {
                    //console.log(vRoomName + '-' + vRole + ' required ' + vNumRequired);
                    //console.log(vRoomName + '-' + vRole + ' existing ' + vNumExisting);
                    //console.log(vRoomName + '-' + vRole + ' queued ' + vNumQueued);
                    //console.log(vRoomName + '-' + vRole + ' to queue ' + vNumToQueue);

                   let vBuildLevel = vMyBuiltRooms[i].getSettings().creepSpawnGoals[vRole].buildLevel;

                    if (vMyBuiltRooms[i].buildLevel() < vMyBuiltRooms[i].getSettings().creepSpawnGoals[vRole].buildLevel) {
                        vBuildLevel = vMyBuiltRooms[i].buildLevel();
                    }

                   const vBoosts = vMyBuiltRooms[i].getSettings().creepSpawnGoals[vRole].boosts;

                   const vPriority = vMyBuiltRooms[i].getSettings().creepSpawnGoals[vRole].priority;

                   const vRespawnTimeBuffer = vMyBuiltRooms[i].getSettings().respawnTimeBuffer;

                   const vSpawnOrder = new SpawnOrder(vRoomName, vRoomName, vWorkClass, vRole, vBuildLevel, vBoosts, vPriority, vRespawnTimeBuffer);

                    vMyBuiltRooms[i].queueSpawnOrderOnBestSpawn(vSpawnOrder.toJson());
                }
            }
        }
    }
    catch (ex) {
        console.log('### EXCEPTION - ManagerSpawns.queueWorkers(): ' + ex.message);
    }
}

/**
 * (periodically) checks the gathering room config file for gathering room
 * spawnGoals and if there is a need queues more gatherers in the provider spawn queues
 * @name  ManagerSpawn.queueGatherers.STATIC
 */

ManagerSpawn.queueGatherers = function() {
    try {
       let vWorkClass = 'gatherer';
       let vSettings = Memory.settings.gathering;

        // for every room in the gathering ops
        for (let vRoomName in vSettings)
        {
            if (!(!vSettings[vRoomName]) && vSettings[vRoomName].isActiveOp)
            {
               let vProviderRoomName = vSettings[vRoomName].providerRoom;
               let vProviderRoom = Game.rooms[vProviderRoomName];

                if (vSettings[vRoomName].reserveController)
                {
                   let vNumReserverQueued = vProviderRoom.getNumCreepsQueuedByClassAndRole(vRoomName, vWorkClass, 'reserver');
                   let vNumReserverExisting = vProviderRoom.getExistingCreepsByClassAndRole(vRoomName, vWorkClass, 'reserver').length;

                    if (vNumReserverExisting + vNumReserverQueued === 0)
                    {
                        if (!(!Game.rooms[vRoomName]) && !(!Game.rooms[vRoomName].controller) &&
                            Game.rooms[vRoomName].controller.level === 0)
                        {
                            // if it is unreserved, or under the reservaton tick buffer
                            if (!Game.rooms[vRoomName].controller.reservation ||
                                Game.rooms[vRoomName].controller.reservation.ticksToEnd < vSettings[vRoomName].reservationTickBuffer)
                            {
                                // then need to queue a reserver
                               let vRole = 'reserver';
                               let vBuildLevel = vSettings[vRoomName].reserverBuildLevel;
                               let vBoosts = [];
                               let vPriority = 'normal';
                               let vRespawnTimeBuffer = vSettings[vRoomName].respawnTimeBuffer;

                               let vSpawnOrder = new SpawnOrder(vProviderRoomName, vRoomName, vWorkClass, vRole,
                                    vBuildLevel, vBoosts, vPriority, vRespawnTimeBuffer);

                                vProviderRoom.queueSpawnOrderOnBestSpawn(vSpawnOrder.toJson());
                            }
                        }
                    }
                }

                for (let vRole in vSettings[vRoomName].creepSpawnGoals)
                {
                   let vNumRequired = vProviderRoom.getNumCreepsRequiredByClassAndRole(vRoomName, vWorkClass, vRole);
                   let vNumExisting = vProviderRoom.getExistingCreepsByClassAndRole(vRoomName, vWorkClass, vRole).length;
                   let vNumQueued = vProviderRoom.getNumCreepsQueuedByClassAndRole(vRoomName, vWorkClass, vRole);
                    //if(vNumQueued > 0){console.log("Gatherer " + vRoomName + '-' + vRole + ' queued ' + vNumQueued);}
                   let vNumToQueue = vNumRequired - (vNumExisting + vNumQueued);

                    // limits to queuing one of a type on any given spawn queu check. should hopefully prevent
                    // excess spawning
                    if (vNumToQueue > 0)
                    //while (vNumToQueue > 0)
                    {
                       let vBuildLevel = vSettings[vRoomName].creepSpawnGoals[vRole].buildLevel;

                        if (vProviderRoom.buildLevel() < vSettings[vRoomName].creepSpawnGoals[vRole].buildLevel) {
                            vBuildLevel = vProviderRoom.buildLevel();
                        }

                       let vBoosts = vSettings[vRoomName].creepSpawnGoals[vRole].boosts;
                       let vPriority = vSettings[vRoomName].creepSpawnGoals[vRole].priority;
                       let vRespawnTimeBuffer = vSettings[vRoomName].respawnTimeBuffer;

                       let vSpawnOrder = new SpawnOrder(vProviderRoomName, vRoomName, vWorkClass, vRole,
                            vBuildLevel, vBoosts, vPriority, vRespawnTimeBuffer);

                        vProviderRoom.queueSpawnOrderOnBestSpawn(vSpawnOrder.toJson());

                        vNumToQueue--;
                    }
                }
            }
        }
    }
    catch (ex) {
        console.log('### EXCEPTION - ManagerSpawns.queueGatherers(): ' + ex.message);
    }
}

/**
 * (periodically) checks the assistant config file for assistant
 * spawnGoals and if there is a need queues more assistant in the provider spawn queues
 * @name  ManagerSpawn.queueAssistants.STATIC
 */

ManagerSpawn.queueAssistants = function() {
    try {
       let vWorkClass = 'assistant';
       let vSettings = Memory.settings.assistance;
       let counter = 2;

        for (let vRoomName in vSettings) {
            if (!(!vSettings[vRoomName]) && vSettings[vRoomName].isActiveOp) {
               let vProviderRoomName = vSettings[vRoomName].providerRoom;
               let vProviderRoom = Game.rooms[vProviderRoomName];

                for (let vRole in vSettings[vRoomName].creepSpawnGoals) {


                   let vNumRequired = vProviderRoom.getNumCreepsRequiredByClassAndRole(vRoomName, vWorkClass, vRole);
                   let vNumExisting = vProviderRoom.getExistingCreepsByClassAndRole(vRoomName, vWorkClass, vRole).length;
                   let vNumQueued = vProviderRoom.getNumCreepsQueuedByClassAndRole(vRoomName, vWorkClass, vRole);
                    //if(vNumQueued > 0){console.log("Assistant " + vRoomName + '-' + vRole + ' queued ' + vNumQueued);}
                   let vNumToQueue = vNumRequired - (vNumExisting + vNumQueued);

                    if (vNumToQueue > 0) {
                       let vBuildLevel = vSettings[vRoomName].creepSpawnGoals[vRole].buildLevel;

                        if (vProviderRoom.buildLevel() < vSettings[vRoomName].creepSpawnGoals[vRole].buildLevel) {
                            vBuildLevel = vProviderRoom.buildLevel()
                        }

                       let vBoosts = vSettings[vRoomName].creepSpawnGoals[vRole].boosts;
                       let vPriority = vSettings[vRoomName].creepSpawnGoals[vRole].priority;
                       let vRespawnTimeBuffer = vSettings[vRoomName].respawnTimeBuffer;

                       let vSpawnOrder = new SpawnOrder(vProviderRoomName, vRoomName, vWorkClass, vRole,
                            vBuildLevel, vBoosts, vPriority, vRespawnTimeBuffer);

                        vProviderRoom.queueSpawnOrderOnBestSpawn(vSpawnOrder.toJson());

                        //vNumToQueue--;
                    }
                }
            }
        }
    }
    catch (ex) {
        console.log('### EXCEPTION - ManagerSpawns.queueAssistants(): ' + ex.message);
    }
}

/**
 * (periodically) checks the claimer config file for and claimers needed
 * and if there is a need queues a claimer in the provider spawn queues
 * @name  ManagerSpawn.queueClaimers.STATIC
 */

ManagerSpawn.queueClaimers = function() {
    try {
       let vWorkClass = 'claimer';
       let vSettings = Memory.settings.claiming;
       let counter = 3;

        for (let vRoomName in vSettings) {
            if (vSettings[vRoomName].isActiveOp &&
                (!Game.rooms[vRoomName] || (!(!Game.rooms[vRoomName].controller) && Game.rooms[vRoomName].controller.level === 0))) {
               let vProviderRoomName = vSettings[vRoomName].providerRoom;
               let vProviderRoom = Game.rooms[vProviderRoomName];

               let vRole = 'claimer';

               let vNumRequired = 1;
               let vNumExisting = vProviderRoom.getExistingCreepsByClassAndRole(vRoomName, vWorkClass, vRole).length;
               let vNumQueued = vProviderRoom.getNumCreepsQueuedByClassAndRole(vRoomName, vWorkClass, vRole);
                //if(vNumQueued > 0){console.log("Claimer " + vRoomName + '-' + vRole + ' queued ' + vNumQueued);}
               let vNumToQueue = vNumRequired - (vNumExisting + vNumQueued);

                // use if not while as should only ever want one claimer
                if (vNumToQueue > 0) {
                   let vBuildLevel = vSettings[vRoomName].claimer_buildLevel;
                   let vBoosts = [];
                   let vPriority = 'high';
                   let vRespawnTimeBuffer = 0;

                   let vSpawnOrder = new SpawnOrder(vProviderRoomName, vRoomName, vWorkClass, vRole,
                        vBuildLevel, vBoosts, vPriority, vRespawnTimeBuffer);

                    vProviderRoom.queueSpawnOrderOnBestSpawn(vSpawnOrder.toJson());
                }
            }
        }
    }
    catch (ex) {
        console.log('### EXCEPTION - ManagerSpawns.queueClaimers(): ' + ex.message);
    }
}

/**
 * (periodically) checks the military config file for any soldier creeps needed
 * and if there is a need queues soldier creeps in the provider spawn queues
 * @name  ManagerSpawn.queueMilitary.STATIC
 */

ManagerSpawn.queueMilitary = function() {
    try {
        let vWorkClass = 'military';
        let vSettings = Memory.settings.military;
        let vOpName;
        let vProviderRoomName;
        let vProviderRoom;
        let vRole;
        let vCreepSpawnGoals;
        let vNumRequired;
        let vNumExisting;
        let vNumQueued;
        let vNumToQueue;
        let vBuildLevel;
        let vBoosts;
        let vPriority;
        let vRespawnTimeBuffer;
        let vSpawnOrder;

        for (vOpName in vSettings) {

            if (vSettings.hasOwnProperty(vOpName) && !(!vSettings[vOpName]) && vSettings[vOpName].isActiveOp) {
                vProviderRoomName = vSettings[vOpName].providerRoom;
                vProviderRoom = Game.rooms[vProviderRoomName];

                vCreepSpawnGoals = vSettings[vOpName].creepSpawnGoals;

                for (vRole in vCreepSpawnGoals) {
                    if (vCreepSpawnGoals.hasOwnProperty(vRole))
                    {
                        vNumRequired = vProviderRoom.getNumCreepsRequiredByClassAndRole(vOpName, vWorkClass, vRole);
                        vNumExisting = vProviderRoom.getExistingCreepsByClassAndRole(vOpName, vWorkClass, vRole).length;
                        vNumQueued = vProviderRoom.getNumCreepsQueuedByClassAndRole(vOpName, vWorkClass, vRole);
                        //if(vNumQueued > 0){console.log("Military " + vRoomName + '-' + vRole + ' queued ' + vNumQueued);}
                        vNumToQueue = vNumRequired - (vNumExisting + vNumQueued);

                        if (vNumToQueue > 0) {
                            vBuildLevel = vCreepSpawnGoals[vRole].buildLevel;

                            if (vProviderRoom.buildLevel() < vCreepSpawnGoals[vRole].buildLevel) {
                                vBuildLevel = vProviderRoom.buildLevel()
                            }

                            vBoosts = vCreepSpawnGoals[vRole].boosts;
                            vPriority = vCreepSpawnGoals[vRole].priority;
                            vRespawnTimeBuffer = vSettings[vOpName].respawnTimeBuffer;

                            vSpawnOrder = new SpawnOrder(vProviderRoomName, vOpName, vWorkClass, vRole,
                                vBuildLevel, vBoosts, vPriority, vRespawnTimeBuffer);

                            vProviderRoom.queueSpawnOrderOnBestSpawn(vSpawnOrder.toJson());

                            //vNumToQueue--;
                        }
                    }
                }
            }
        }
    }
    catch (ex) {
        console.log('### EXCEPTION - ManagerSpawns.queueMilitary(): ' + ex.message);
    }
};
