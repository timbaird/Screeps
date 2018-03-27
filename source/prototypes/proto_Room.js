
Room.prototype.getSettings = function()
{
    try {
        if (!this.settings)
        {
            if (!Memory.settings.room[this.name])
            {
                this.settings = Memory.settings.room.default;
            }
            else
            {
                this.settings = Memory.settings.room[this.name]
            }
        }

        return this.settings;
    }
    catch (ex){
        console.log('### EXCEPTION - Room.prototype.getSettings(): ' +  ex.message);
    }
};

Room.prototype.getGatheringSettings = function()
{
    try {
        return Memory.settings.gathering[this.name];
    }
    catch (ex){
        console.log('### EXCEPTION - Room.prototype.getGatheringSettings(): ' +  ex.message);
    }
};

Room.prototype.isMyRoom = function()
{
    try {

        const vRefreshInterval = 100;

        if (!this.getMemory().is_my_room || Game.time > this.getMemory().is_my_room.lastUpdate + vRefreshInterval)
        {
            let vIsMine = false;

            // if it has a controller
            if (!(!this.controller))
            {
                if (this.controller.level > 0)
                {
                    if (Memory.settings.general.usernames.indexOf(this.controller.owner.username) > -1)
                    {
                        vIsMine = true;
                    }
                }
                else // it is a level 0 controller - check for reservations or signings
                {
                    if ((!(!this.controller.reservation) && Memory.settings.general.usernames.indexOf(this.controller.reservation.username) > -1 ||
                        (!(!this.controller.sign) && Memory.settings.general.usernames.indexOf(this.controller.sign.username) > -1)))
                    {
                        vIsMine = true;
                    }
                }
            }
            else // no controller - centre room or between area rooms
            {
                // if there are ACTIVE gathering settings set for this room I am mining from it / working in it - so it is mine
                if (!(!Memory.settings.gathering[this.name]) || Memory.settings.gathering[this.name].isActiveOp)
                {
                    vIsMine = true;
                }
            }

            this.getMemory().is_my_room = {lastUpdate: Game.time, value: vIsMine}
        }

        return this.getMemory().is_my_room.value;

    }
    catch (ex){
        console.log('### EXCEPTION - Room.prototype.isMyRoom: ' +  ex.message);
    }
};

Room.prototype.isMine = function()
{
    try
    {
        // this is needed to stop a circular call in roomobject.isMine();
        //console.log('Room.prototype.isMine() ' + this);
        return this.isMyRoom();
    }
    catch (ex){
        console.log('### EXCEPTION - Room.prototype.isMine: ' +  ex.message);
    }
};

// creep info functions

Room.prototype.getExistingCreepsByClassAndRole = function(pHomeRoom, pClass, pRole)
{
    try {

        if (!this.existing_creeps_by_class_and_role) {
            this.existing_creeps_by_class_and_role = {};
        }

        if (!this.existing_creeps_by_class_and_role[pHomeRoom]) {
            this.existing_creeps_by_class_and_role[pHomeRoom] = {};
        }

        if (!this.existing_creeps_by_class_and_role[pHomeRoom][pClass]) {
            this.existing_creeps_by_class_and_role[pHomeRoom][pClass] = {};
        }

        if (!this.existing_creeps_by_class_and_role[pHomeRoom][pClass][pRole]) {

            this.existing_creeps_by_class_and_role[pHomeRoom][pClass][pRole] = _.select(Game.creeps, (x)=> {
                return  x.homeRoom() === pHomeRoom &&
                        x.workClass() === pClass &&
                        x.role() === pRole &&
                        (x.role() === 'reserver' || x.spawning || x.creepRespawnTimeBuffer() < x.ticksToLive);
            });
        }
        return this.existing_creeps_by_class_and_role[pHomeRoom][pClass][pRole];
    }
    catch (ex){
        console.log('### EXCEPTION - Room.prototype.getExistingCreepsByClassAndRole(): ' +  ex.message);
    }
};

Room.prototype.getExistingCreepsWounded = function()
{
    try {

        if (!this.existing_creeps_wounded)
        {
            this.existing_creeps_wounded = _.select(Game.creeps, (x)=>{return  x.room.name === this.name && x.hits < x.hitsMax;});
        }
        return this.existing_creeps_wounded;
    }
    catch (ex){
        console.log('### EXCEPTION - Room.prototype.getExistingCreepsWounded(): ' +  ex.message);
    }
};

Room.prototype.getNumCreepsRequiredByClassAndRole = function(pHomeRoom, pClass, pRole)
{
    try {
        if (pClass === 'worker') {

            if (!this.getSettings().creepSpawnGoals[pRole])
            {
                return 0;
            }
            else
            {
                return this.getSettings().creepSpawnGoals[pRole].num;
            }
        }
        else if (pClass === 'assistant') {
            if (!Memory.settings.assistance[pHomeRoom].creepSpawnGoals[pRole])
            {
                return 0;
            }
            else
            {
                return Memory.settings.assistance[pHomeRoom].creepSpawnGoals[pRole].num;
            }
        }
        else if (pClass === 'gatherer') {

            if (!Memory.settings.gathering[pHomeRoom].creepSpawnGoals[pRole])
            {
                return 0;
            }
            else
            {
                return Memory.settings.gathering[pHomeRoom].creepSpawnGoals[pRole].num;
            }

        }
        else if (pClass === 'powerHarvester') {

            if (!Memory.settings.powerharvest[pHomeRoom].creepSpawnGoals[pRole])
            {
                return 0;
            }
            else
            {
                return Memory.settings.powerharvest[pHomeRoom].creepSpawnGoals[pRole].num;
            }
        }
        else if (pClass === 'claimer') {

        }
        else if (pClass === 'military') {
            if (!Memory.settings.military[pHomeRoom].creepSpawnGoals[pRole])
            {
                return 0;
            }
            else
            {
                return Memory.settings.military[pHomeRoom].creepSpawnGoals[pRole].num;
            }
        }

    }
    catch (ex){
        console.log('### EXCEPTION - Room.prototype.getNumCreepsRequiredByClassAndRole(): ' +  ex.message);
    }
};

Room.prototype.getNumCreepsQueuedByClassAndRole = function(pHomeRoom, pClass, pRole)
{
    try {
            // make sure the local variable exists
            if (!this.num_creeps_queued_by_class_and_role) {
                this.num_creeps_queued_by_class_and_role = {};
            }
            // make sure the homeroom exists
            if (!this.num_creeps_queued_by_class_and_role[pHomeRoom]) {
                this.num_creeps_queued_by_class_and_role[pHomeRoom] = {};
            }
            // make sure the class exists
            if (!this.num_creeps_queued_by_class_and_role[pHomeRoom][pClass]) {
                this.num_creeps_queued_by_class_and_role[pHomeRoom][pClass] = {};
            }
            // make sure the role exists and set it to 0
            if (!this.num_creeps_queued_by_class_and_role[pHomeRoom][pClass][pRole]) {
                this.num_creeps_queued_by_class_and_role[pHomeRoom][pClass][pRole] = 0;
            }

            // get all spawns
            const vSpawns = this.getMySpawns();

            let vSpawnName;
            let vQueueSummary;

            // for each of my each spawn
            for (vSpawnName in vSpawns)
            {
                // if the spawn exists (this was to get rid of a null spawn anomaly)
                if (vSpawns.hasOwnProperty(vSpawnName))
                {

                    vQueueSummary = vSpawns[vSpawnName].queueSummary();

                    if (!(!vQueueSummary[pHomeRoom]) &&
                        !(!vQueueSummary[pHomeRoom][pClass]) &&
                        !(!vQueueSummary[pHomeRoom][pClass][pRole]))
                    {
                        this.num_creeps_queued_by_class_and_role[pHomeRoom][pClass][pRole] += vQueueSummary[pHomeRoom][pClass][pRole];
                    }
                }
            }
            return this.num_creeps_queued_by_class_and_role[pHomeRoom][pClass][pRole];

    }
    catch (ex){
        console.log('### EXCEPTION - Room.prototype.getNumCreepsQueuedByClassAndRole(): ' +  ex.message);
    }
};

Room.prototype.isShortOfCarriers = function()
{
    try {
        if (!this.is_short_of_carriers)
        {
            let vWorkerRequirement = 0;

            if (!(!this.getSettings().creepSpawnGoals.restocker))
            {
                vWorkerRequirement += this.getSettings().creepSpawnGoals.restocker.num;
            }

            if (!(!this.getSettings().creepSpawnGoals.collector))
            {
                vWorkerRequirement += this.getSettings().creepSpawnGoals.collector.num;
            }


            let vAssistantRequirement = 0;

            if (!(!Memory.settings.assistance[this.name]) &&
                Memory.settings.assistance[this.name].isActiveOp) {

                if (!(!Memory.settings.assistance[this.name]))
                {
                    if (!(!Memory.settings.assistance[this.name].creepSpawnGoals.restocker))
                    {
                        vAssistantRequirement = Memory.settings.assistance[this.name].creepSpawnGoals.restocker.num;
                    }

                    if (!(!Memory.settings.assistance[this.name].creepSpawnGoals.collector))
                    {
                        vAssistantRequirement += Memory.settings.assistance[this.name].creepSpawnGoals.collector.num;
                    }
                }
            }
            const vTotalRequirement = vWorkerRequirement + vAssistantRequirement;

            let vNum = 0;

            vNum += this.getExistingCreepsByClassAndRole(this.name, 'worker', 'restocker').length;
            vNum += this.getExistingCreepsByClassAndRole(this.name, 'worker', 'collector').length;
            vNum += this.getExistingCreepsByClassAndRole(this.name, 'assistant', 'restocker').length;
            vNum += this.getExistingCreepsByClassAndRole(this.name, 'assistant', 'collector').length;

            this.is_short_of_carriers = {value: vTotalRequirement > vNum};
        }
        return this.is_short_of_carriers.value;
    }
    catch (ex){
        console.log('### EXCEPTION - Room.prototype.isShortOfCarriers(): ' +  ex.message);
    }
};

Room.prototype.isShortOfManagers = function()
{
    try {
        if (!this.is_short_of_managers)
        {
            let vWorkerRequirement =  0;

            if (!(!this.getSettings().creepSpawnGoals.manager))
            {
                vWorkerRequirement = this.getSettings().creepSpawnGoals.manager.num;
            }

            let vAssistantRequirement = 0;

            if (!(!Memory.settings.assistance[this.name]) &&
                Memory.settings.assistance[this.name].isActiveOp) {

                if (!(!Memory.settings.assistance[this.name]) &&
                        !(!Memory.settings.assistance[this.name].creepSpawnGoals.manager))
                {
                    vAssistantRequirement = Memory.settings.assistance[this.name].creepSpawnGoals.manager.num;
                }

            }
            const vTotalRequirement = vWorkerRequirement + vAssistantRequirement;

            let vNum = 0;

            vNum += this.getExistingCreepsByClassAndRole(this.name, 'worker', 'manager').length;
            vNum += this.getExistingCreepsByClassAndRole(this.name, 'assistant', 'manager').length;

            this.is_short_of_managers = {value: vTotalRequirement > vNum};
        }
        return this.is_short_of_managers.value;
    }
    catch (ex){
        console.log('### EXCEPTION - Room.prototype.isShortOfManagers(): ' +  ex.message);
    }
};

// functions used for managing spawn queues

Room.prototype.queueSpawnOrderOnBestSpawn = function(pSpawnOrder)
{
    try
    {
        if(this.getMySpawns().length === 1)
        {
            this.getMySpawns()[0].queue(pSpawnOrder);
        }
        else if(this.getMySpawns().length > 1)// more than one spawn in room
        {

            /*
            for (let i in this.getMySpawns())
            {
                console.log('Room.prototype.queueSpawnRequestOnBestSpawn() ' + this.getMySpawns()[i] + " queue length " + this.getMySpawns()[i].queue().length);
            }
            */


            let vSpawnWithShorestQueue = _.min(this.getMySpawns(), (x)=>{return x.queue().length});

            //console.log('Room.prototype.queueSpawnRequestOnBestSpawn():  room: ' + vSpawnWithShorestQueue.room.name + ' spawn: ' + vSpawnWithShorestQueue + ' role: ' + pSpawnOrder.memory.role);

            vSpawnWithShorestQueue.queue(pSpawnOrder);
        }
    }
    catch (ex){
        console.log('### EXCEPTION - Room.prototype.queueSpawnRequestOnBestSpawn(): ' +  ex.message);
    }
};

Room.prototype.resetSpawnQueues = function()
{
    try {
        let i;
        let vSpawns = this.getMySpawns();

        for (i in vSpawns) {
            if (vSpawns.hasOwnProperty(i))
            {
                vSpawns[i].resetQueue();
            }
        }
    }
    catch (ex){
        console.log('### EXCEPTION - Room.prototype.resetSpawnQueues(): ' +  ex.message);
    }
};

// END of creep info use for queuing spawns

Room.prototype.underAttack = function()
{
    try {
        // this logic can be improved later as needed
        if (!this.under_attack) {
            this.under_attack = this.hostileCreepsDangerous().length > 0;
        }
        return this.under_attack;
    }
    catch (ex){
        console.log('### EXCEPTION - Room.prototype.underAttack(): ' +  ex.message);
    }
};

Room.prototype.creepsAll = function()
{
    try {
        if (!this.creeps_all) {
            this.creeps_all = this.find(FIND_CREEPS);
        }
        return this.creeps_all;
    }
    catch (ex){
        console.log('### EXCEPTION - Room.prototype.hostileCreeps(): ' +  ex.message);
    }
};

Room.prototype.hostileCreepsAll = function()
{
    try {
        if (!this.hostile_creeps_all)
        {
            this.hostile_creeps_all = _.select(this.creepsAll(),
                (x)=> {return x.isHostile() && x.owner.username !== 'Source Keeper'});
        }
        return this.hostile_creeps_all;
    }
    catch (ex){
        console.log('### EXCEPTION - Room.prototype.hostileCreeps(): ' +  ex.message);
    }
};

Room.prototype.hostileCreepsDangerous = function()
{
    try {
        if (!this.hostile_creeps_dangerous) {
            this.hostile_creeps_dangerous = _.select(this.hostileCreepsAll(),
                (x)=> {return x.hasBodyPart(WORK) || x.hasBodyPart(ATTACK) || x.hasBodyPart(RANGED_ATTACK)});
        }
        return this.hostile_creeps_dangerous;
    }
    catch (ex){
        console.log('### EXCEPTION - Room.prototype.hostileCreepsDangerous(): ' +  ex.message);
    }
};

Room.prototype.hostileCreepsSourceKeepers = function(vIncludeMineralKeepers = false)
{
    try {
        if (!this.hostile_creeps_source_keepers)
        {
            if (vIncludeMineralKeepers)
            {
                this.hostile_creeps_source_keepers = _.select(this.creepsAll(), (x)=> {return x.owner.username === 'Source Keeper'});
            }
            else
            {
                let vMineral = this.getMinerals()[0];

                this.hostile_creeps_source_keepers = _.select(this.creepsAll(),
                                    (x)=> {return x.owner.username === 'Source Keeper' && x.pos.getRangeTo(vMineral) > 6});


            }
         }
        return this.hostile_creeps_source_keepers;
    }
    catch (ex){
        console.log('### EXCEPTION - Room.prototype.hostileCreepsSourceKeepers(): ' +  ex.message);
    }
};

// GETTING ROOM OBJECTS

Room.prototype.getMySpawns = function()
{
    try {
        if (!this.my_spawns)
        {
            this.my_spawns = this.find(FIND_MY_SPAWNS);
        }
        return this.my_spawns;
    }
    catch (ex){
        console.log('### EXCEPTION - Room.prototype.getMySpawns(): ' +  ex.message);
    }
};

Room.prototype.getSources = function()
{
    try {
        if (!this.sources)
        {
            this.sources = this.find(FIND_SOURCES);
        }
        return this.sources;
    }
    catch (ex){
        console.log('### EXCEPTION - Room.prototype.getSources(): ' +  ex.message);
    }
};

Room.prototype.getSourcesNeedingMining = function()
{
    try {
        if (!this.sources_needing_mining)
        {
            this.sources_needing_mining = _.select(this.getSources(), (x)=>{return x.needsMining();});
        }
        return this.sources_needing_mining;
    }
    catch (ex){
        console.log('### EXCEPTION - Room.prototype.getSources(): ' +  ex.message);
    }
};

Room.prototype.getConstructionSites = function()
{
    try {
        if (!this.construction_sites)
        {
            this.construction_sites = this.find(FIND_CONSTRUCTION_SITES);
        }
        return this.construction_sites;
    }
    catch (ex){
        console.log('### EXCEPTION - Room.prototype.getConstructionSites(): ' +  ex.message);
    }
};

Room.prototype.getDroppedEnergy = function()
{
    try {
        if (!this.dropped_energy)
        {
            this.dropped_energy = this.find(FIND_DROPPED_RESOURCES, {filter: (x)=>{return x.resourceType === 'energy'}});
        }
        return this.dropped_energy;
    }
    catch (ex){
        console.log('### EXCEPTION - Room.prototype.getDroppedEnergy(): ' +  ex.message);
    }
};

/*
Room.prototype.getDroppedMinerals = function()
{
    try {
        if (!this.dropped_minerals)
        {
            this.dropped_minerals = this.find(FIND_DROPPED_RESOURCES, {filter: (x)=>{return x.resourceType !== 'energy'}});
        }
        return this.dropped_minerals;
    }
    catch (ex){
        console.log('### EXCEPTION - Room.prototype.getDroppedEnergy(): ' +  ex.message);
    }
};
*/

// review logic
Room.prototype.getWithdrawlTargets = function()
{
    try {



        if (!this.withdrawl_targets)
        {
            this.withdrawl_targets = this.getContainersWithEnergy();

            // exclude containers which are controller bins
            //this.withdrawl_targets = _.select(this.withdrawl_targets, (x)=>{return x.role() != 'controller_bin'});

           // this.withdrawl_targets = this.withdrawl_targets.concat(this.getLinksWithEnergy());
        }
        return this.withdrawl_targets;
    }
    catch (ex){
        console.log('### EXCEPTION - Room.prototype.getDroppedEnergy(): ' +  ex.message);
    }
};

Room.prototype.getEnemyInfrastructureTargetsStore = function()
{
    try {
        if (!this.enemy_infrastructure_targets_store)
        {
            this.enemy_infrastructure_targets_store = this.find(FIND_HOSTILE_STRUCTURES,
                {filter: (x)=>{return !(!x.store) && _.sum(x.store) > 0}});
        }
        return this.enemy_infrastructure_targets_store;
    }
    catch (ex){
        console.log('### EXCEPTION - Room.prototype.getEnemyInfrastructureTargetsStore(): ' +  ex.message);
    }
};

Room.prototype.getEnemyInfrastructureTargetsNonStore = function()
{
    try {
        if (!this.enemy_infrastructure_targets_non_store)
        {
            this.enemy_infrastructure_targets_non_store = this.find(FIND_HOSTILE_STRUCTURES,
                {filter: (x)=>{return (!x.store || _.sum(x.store) === 0) && x.objectType()!=='StructureKeeperLair'}});
        }
        return this.enemy_infrastructure_targets_non_store;
    }
    catch (ex){
        console.log('### EXCEPTION -Room.prototype.getEnemyInfrastructureTargetsNonStore(): ' +  ex.message);
    }
};

Room.prototype.getExtensionsNeedingEnergy = function()
{
    try {
        if (!this.extensions_needing_energy) {
            this.extensions_needing_energy = _.select(Game.structures,
                (x)=>{return this.name === x.room.name &&
                        x.objectType() === 'StructureExtension' &&
                        x.needsEnergy();});
        }
        return this.extensions_needing_energy;
    }
    catch (ex){
        console.log('### EXCEPTION - Room.prototype.getExtensionsNeedingEnergy(): ' +  ex.message);
    }
};

Room.prototype.getSpawnsNeedingEnergy = function()
{
    try {
        if (!this.spawns_needing_energy) {
            this.spawns_needing_energy = _.select(Game.structures,
                (x)=>{return this.name === x.room.name &&
                    x.objectType() === 'StructureSpawn' &&
                    x.needsEnergy();});
        }
        return this.spawns_needing_energy;
    }
    catch (ex){
        console.log('### EXCEPTION - Room.prototype.getSpawnsNeedingEnergy(): ' +  ex.message);
    }
};

Room.prototype.getTowersNeedingEnergy = function()
{
    try {
        if (!this.towers_needing_energy)
        {
            this.towers_needing_energy = _.select(Game.structures,
                (x)=>{return this.name === x.room.name &&
                            x.objectType() === 'StructureTower' &&
                            x.needsEnergy();});
        }
        return this.towers_needing_energy;
    }
    catch (ex){
        console.log('### EXCEPTION - Room.prototype.getTowersNeedingEnergy(): ' +  ex.message);
    }
};

Room.prototype.getLabsNeedingEnergy = function()
{
    try {
        if(!this.labs_needing_energy){
            this.labs_needing_energy = _.select(Game.structures, (x)=>{return this.name === x.room.name &&
                                                                              x.objectType() === 'StructureLab' &&
                                                                                x.needsEnergy();});
        }
        return this.labs_needing_energy;
    }
    catch (ex){
        console.log('### EXCEPTION - Room.prototype.getLabsNeedingEnergy(): ' +  ex.message);
    }
};

Room.prototype.totalStoredResource = function(pResource)
{
    try {
        if(!this.total_stored_resource)
        {
            this.total_stored_resource = {};
        }

        if (!this.total_stored_resource[pResource])
        {
            let vStoreTotal = this.storage && this.storage.store[pResource] || 0;

            let vTermTotal = this.terminal && this.terminal.store[pResource] || 0;

            this.total_stored_resource[pResource] = vTermTotal + vStoreTotal;
        }
        return this.total_stored_resource[pResource];
    }
    catch (ex){
        console.log('### EXCEPTION - Room.prototype.totalStoredResource(): ' +  ex.message);
    }
};

Room.prototype.isEnergyCritical = function()
{
    try {
        if(!this.is_energy_critical)
        {
            this.is_energy_critical = {value: this.totalStoredResource('energy') < this.getSettings().critical_energy_threshold};
        }
        return this.is_energy_critical.value;
    }
    catch (ex){
        console.log('### EXCEPTION - Room.prototype.isEnergyCritical(): ' +  ex.message);
    }
};

Room.prototype.hasEnergySurplus = function()
{
    try {
        if(!this.has_energy_surplus)
        {
            this.has_energy_surplus = {value: this.totalStoredResource('energy') > this.getSettings().high_energy_threshold};
        }
        return this.has_energy_surplus.value;
    }
    catch (ex){
        console.log('### EXCEPTION - Room.prototype.isEnergyCritical(): ' +  ex.message);
    }
};

Room.prototype.storageWithMostEnergy = function()
{
    try {

        //if (this.name == 'W69S51'){console.log(this.name + 'x  1')}

        if(!this.storage_with_most_energy)
        {

            let vHasStorage = !(!this.storage);
            let vHasTerminal = !(!this.terminal);

            if (vHasStorage && vHasTerminal &&
                (this.storage.store.energy > 0 || this.terminal.store.energy > 0))
            {
                //if (this.name == 'W69S51'){console.log(this.name + 'x  2')}

                if (this.storage.store.energy > this.terminal.store.energy)
                {
                    this.storage_with_most_energy = this.storage;
                }
                else
                {
                    //if (this.name == 'W69S51'){console.log(this.name + 'x  3')}
                    this.storage_with_most_energy = this.terminal;
                }
            }
            else if (vHasStorage && this.storage.store.energy > 0)
            {
                //if (this.name == 'W69S51'){console.log(this.name + 'x  4')}
                this.storage_with_most_energy = this.storage;
            }
            else if (vHasTerminal && this.terminal.store.energy > 0)
            {
                //if (this.name == 'W69S51'){console.log(this.name + 'x  5')}
                this.storage_with_most_energy = this.terminal;
            }
            else
            {
                //if (this.name == 'W69S51'){console.log(this.name + 'x  6')}
                this.storage_with_most_energy = undefined;
            }

        }

        return this.storage_with_most_energy;
    }
    catch (ex){
        console.log('### EXCEPTION - Room.prototype.storageWithMostEnergy(): ' +  ex.message);
    }
};

Room.prototype.getRoadsNeedingRepair = function()
{
    try {
        if(!this.roads_needing_repair)
        {
            this.roads_needing_repair= this.find(FIND_STRUCTURES, {filter: (x)=>{return x.objectType() === 'StructureRoad' &&
                                                                                        x.needsRepair()}})
        }
        return this.roads_needing_repair;
    }
    catch (ex){
        console.log('### EXCEPTION - Room.prototype.getRoadsNeedingRepair(): ' +  ex.message);
    }
};

Room.prototype.getContainersNeedingRepair = function()
{
    try {
        if(!this.containers_needing_repair)
        {
            this.containers_needing_repair = _.select(this.getContainers(), (x)=>{return x.needsRepair()});
        }
        return this.containers_needing_repair;
    }
    catch (ex){
        console.log('### EXCEPTION - Room.prototype.getContainersNeedingRepair(): ' +  ex.message);
    }
};

Room.prototype.getNuker = function()
{
    try {

        if(!this.nuker)
        {
                // this makes the nuker compatable with labs for refil purpose
                this.nuker = _.select(Game.structures,
                    (x) => {return this.name === x.room.name && x.objectType() === 'StructureNuker';})[0];

                if (!(!this.nuker))
                {
                    this.nuker.mineralType = 'G';
                    this.nuker.mineralAmount = this.nuker.ghodium;
                }
            }

        return this.nuker;
    }
    catch (ex){
        console.log('### EXCEPTION - Room.prototype.getNuker(): ' +  ex.message);
    }
};

Room.prototype.nukerNeedsEnergy = function()
{
    try {

        if(!this.nuker_needs_energy)
        {
            if (!(!this.getNuker()) && this.getNuker().energy < this.getNuker().energyCapacity && this.hasEnergySurplus())
            {
                this.nuker_needs_energy = {value: true};
            }
            else
            {
                this.nuker_needs_energy = {value: false};
            }
        }

        return this.nuker_needs_energy.value;
    }
    catch (ex){
        console.log('### EXCEPTION - Room.prototype.nukerNeedsEnergy(): ' +  ex.message);
    }
};

Room.prototype.nukerNeedsGhodium = function()
{
    try {

        if(!this.nuker_needs_ghodium)
        {
            if (!(!this.getNuker()) && this.getNuker().ghodium < this.getNuker().ghodiumCapacity)
            {
                this.nuker_needs_ghodium = {value: true};
            }
            else
            {
                this.nuker_needs_ghodium = {value: false};
            }
        }

        return this.nuker_needs_ghodium.value;
    }
    catch (ex){
        console.log('### EXCEPTION - Room.prototype.nukerNeedsGhodium(): ' +  ex.message);
    }
};

Room.prototype.getPowerSpawn = function()
{
    try {
        if(!this.power_spawn)
        {
            let vRefreshInterval = 500;

            if (!this.getMemory().power_spawn || Game.time > this.getMemory().power_spawn.lastUpdate + vRefreshInterval)
            {
                this.power_spawn = _.select(Game.structures,
                    (x)=> {return this.name === x.room.name && x.objectType() === 'StructurePowerSpawn';})[0];

                if (!this.power_spawn)
                {
                    this.getMemory().power_spawn = {lastUpdate: Game.time, id: undefined}
                }
                else
                {
                    this.getMemory().power_spawn = {lastUpdate: Game.time, id: this.power_spawn.id}
                }
            }
            else
            {
                this.power_spawn = Game.getObjectById(this.getMemory().power_spawn.id);
            }
        }

        return this.power_spawn;
    }
    catch (ex){
        console.log('### EXCEPTION - Room.prototype.getPowerSpawn(): ' +  ex.message);
    }
};

Room.prototype.powerSpawnNeedsEnergy = function()
{
    try {
        if(!this.power_spawn_needs_energy)
        {
            if (!(!this.getPowerSpawn()) &&
                this.getPowerSpawn().energy < this.getPowerSpawn().energyCapacity &&
                this.hasEnergySurplus())
            {
                this.power_spawn_needs_energy = {value: true};
            }
            else
            {
                this.power_spawn_needs_energy = {value: false};
            }
        }

        return this.power_spawn_needs_energy.value;
    }
    catch (ex){
        console.log('### EXCEPTION - Room.prototype.powerSpawnNeedsEnergy(): ' +  ex.message);
    }
};

Room.prototype.getDefenceRepairSites = function()
{
    try {

        let vThreshold;

        if (this.hasEnergySurplus() && !(!this.controller))
        {
            switch(this.controller.level)
            {
                case 1:
                    vThreshold = 0;
                    break;
                case 2:
                    vThreshold = 30000;
                    break;
                case 3:
                    vThreshold = 100000;
                    break;
                case 4:
                    vThreshold = 300000;
                    break;
                case 5:
                    vThreshold = 1000000;
                    break;
                case 6:
                    vThreshold = 3000000;
                    break;
                case 7:
                    vThreshold = 10000000;
                    break;
                case 8:
                    vThreshold = 18000000;
                    //vThreshold = 300000000;
                    break;
                default:
                    vThreshold = this.getSettings().defence_repair_threshold;
            }
        }
        else
        {
            vThreshold = this.getSettings().defence_repair_threshold;
        }

        if (!this.defence_repair_sites) {
            this.defence_repair_sites = this.find(FIND_STRUCTURES,
                {filter: (x)=> {
                        return ( x.structureType === STRUCTURE_WALL ||
                            x.structureType === STRUCTURE_RAMPART) &&
                            x.hits < vThreshold
                    }})
        }

        return this.defence_repair_sites;
    }
    catch (ex){
        console.log('### EXCEPTION - Room.prototype.getDefenceRepairSites(): ' +  ex.message);
    }
};

Room.prototype.getMinerals = function()
{
    try {
        if (!this.minerals)
        {
            this.minerals = this.find(FIND_MINERALS)
        }

        return this.minerals;
    }
    catch (ex){
        console.log('### EXCEPTION - Room.prototype.getMinerals(): ' +  ex.message);
    }
};

// CONTAINER MANAGEMENT BASED

Room.prototype.getContainers = function()
{
    try {
        if (!this.containers)
        {
            this.containers = this.find(FIND_STRUCTURES, {filter: (x)=>{return x.objectType() === 'StructureContainer';}})
        }
        return this.containers;
    }
    catch (ex){
        console.log('### EXCEPTION - Room.prototype.getContainers(): ' +  ex.message);
    }
};

Room.prototype.getContainersWithEnergy = function()
{
    try {
        if (!this.containers_with_energy)
        {
            this.containers_with_energy = this.find(FIND_STRUCTURES,{filter:
                (x)=>{return x.objectType() === 'StructureContainer'&&
                    x.hasResource(RESOURCE_ENERGY)}});
        }
        //console.log(Room.prototype.getContainersWithEnergy + ' ' + this.name + ' qwerty ' + this.containers_with_energy.length);
        return this.containers_with_energy;

    }
    catch (ex){
        console.log('### EXCEPTION - Room.prototype.getContainersWithEnergy(): ' +  ex.message);
    }
};

// LINK MANGEMENT BASED

Room.prototype.getLinks = function()
{
    try {
        if (!this.links)
        {
            this.links = this.find(FIND_STRUCTURES , {filter: (x)=>{return x.objectType() === 'StructureLink';}})
        }
        return this.links;
    }
    catch (ex){
        console.log('### EXCEPTION - Room.prototype.getLinks(): ' +  ex.message);
    }
};

/*
Room.prototype.getLinksWithEnergy = function()
{
    try {
        if (!this.links_with_energy)
        {
            this.links_with_energy = _.select(this.getLinks(), (x)=>{return x.energy > 0;});
        }
        return this.links_with_energy;
    }
    catch (ex){
        console.log('### EXCEPTION - Room.prototype.getLinksWithEnergy(): ' +  ex.message);
    }
};
*/

// LAB MANAGEMENT BASED

Room.prototype.getLabs = function()
{
    try {
        if (!this.labs)
        {
            this.labs = this.find(FIND_MY_STRUCTURES,{filter: (x)=>{return x.objectType() === 'StructureLab'}});
        }

        return this.labs;
    }
    catch (ex){
        console.log('### EXCEPTION - Room.prototype.getLabs(): ' +  ex.message);
    }
};

Room.prototype.getBoosterLabByMineral = function(pMineral)
{
    try {
        if (!this.booster_lab_by_mineral)
        {
            this.booster_lab_by_mineral = {};
        }

        if (!this.booster_lab_by_mineral[pMineral])
        {
            //this.booster_lab_by_mineral[pMineral] = _.select(this.getLabs(), (x)=>{return x.role() == 'booster' && x.labMineralType() == pMineral})[0];
            this.booster_lab_by_mineral[pMineral] = _.select(this.getLabs(), (x)=>{return x.labMineralType() === pMineral && x.role() === 'booster'})[0];
        }

        return this.booster_lab_by_mineral[pMineral];
    }
    catch (ex){
        console.log('### EXCEPTION - Room.prototype.getBoosterLabByMineral(): ' +  ex.message);
    }
};

Room.prototype.getLabsNeedingTopUp = function()
{

    try {
        if (!this.labs_needing_topup)
        {
            // find labs that are inputers or boosters , are not full and have available stores in Terminal
            this.labs_needing_topup = _.select(this.getLabs(),
                        (x)=>{return (x.role() === 'input' || x.role() === 'booster') &&
                                      x.labMineralType() !== 'none' &&
                                     (!x.mineralType || x.mineralType === x.labMineralType()) &&
                                     x.mineralAmount < 2000});

            if (this.nukerNeedsGhodium())
            {
                let vNuker = this.getNuker();
                // add the nuker to the labs needing topup
                this.labs_needing_topup.push(vNuker);
            }
        }
        return this.labs_needing_topup;
    }
    catch (ex){
        console.log('### EXCEPTION - Room.prototype.getLabsNeedingTopUp(): ' +  ex.message);
    }
};

Room.prototype.getLabsNeedingEmptying = function()
{
    try {
        if (!this.labs_needing_emptying)
        {
            this.labs_needing_emptying = _.select(this.getLabs(),
                                    (x)=>{return !(!x.mineralType) && x.mineralType !== x.labMineralType() ||
                                                  x.role() === 'output' && x.mineralAmount > 1000});
        }
        return this.labs_needing_emptying;
    }
    catch (ex){
        console.log('### EXCEPTION - Room.prototype.getLabNeedingEmptying(): ' +  ex.message);
    }
};

// MANAGING ENERGY ACCROSS LINKS AND STORAGES

Room.prototype.buildLevel = function()
{
    try {
        if (!this.build_level)
        {
            let vReturn = 1;

            if (this.energyCapacityAvailable >= 12000)
            {
                vReturn = 8;
            }
            else if (this.energyCapacityAvailable >= 5000)
            {
                vReturn = 7;
            }
            else if (this.energyCapacityAvailable >= 2300)
            {
                vReturn = 6;
            }
            else if (this.energyCapacityAvailable >= 1800)
            {
                vReturn = 5;
            }
            else if (this.energyCapacityAvailable >= 1300)
            {
                vReturn = 4;
            }
            else if (this.energyCapacityAvailable >= 800)
            {
                vReturn = 3;
            }
            else if (this.energyCapacityAvailable >= 550)
            {
                vReturn = 2;
            }

            this.build_level = vReturn;
        }
        return this.build_level;
    }
    catch (ex){
        console.log('### EXCEPTION - Room.prototype.buildLevel(): ' +  ex.message);
    }
};

Room.prototype.usesMineral = function(pMineral)
{
    try
    {
        if (!this.getMemory().uses_mineral)
        {
            this.getMemory().uses_mineral = {};
        }

        // if it isn't declated OR if the settings might have been changed
        if (!this.getMemory().uses_mineral[pMineral] ||
            !(!update_datetime) && update_datetime > this.getMemory().uses_mineral[pMineral].lastUpdate)
        {
            let vNeeded;

            if (pMineral === 'energy')
            {
                vNeeded = true;
            }
            else
            {
                if (pMineral === 'G' && this.nukerNeedsGhodium())
                {
                    vNeeded = true;
                }
                else
                {
                    // see if there are any labs in the rom which use the specified mineral
                    vNeeded = _.sum(this.getLabs(), (x)=>{return x.labMineralType() === pMineral && (x.role() === 'input' || x.role() === 'booster')}) > 0;
                }
            }

            this.getMemory().uses_mineral[pMineral] = {lastUpdate: update_datetime, value: vNeeded}
        }

        return this.getMemory().uses_mineral[pMineral].value;
    }
    catch (ex)
    {
        console.log('### EXCEPTION - Room.prototype.usesMineral(): ' +  ex.message);
    }
};

Room.prototype.getKeepersLairs = function(vIncludeMineralLair = false)
{
    try {

        if (vIncludeMineralLair)
        {
            if (!this.keepers_lairs_with)
            {
                this.keepers_lairs_with = this.find(FIND_STRUCTURES,
                    {filter: (x)=> {return x.objectType() === 'StructureKeeperLair'}});
            }
            return this.keepers_lairs_with

        }
        else
        {
            if (!this.keepers_lairs_without) {

                let vMineral = this.getMinerals()[0];

                this.keepers_lairs_without = this.find(FIND_STRUCTURES,
                    {filter: (x)=> {return x.objectType() === 'StructureKeeperLair' && x.pos.getRangeTo(vMineral) > 6}});
            }
            return this.keepers_lairs_without;
        }
    }
    catch (ex){
        console.log('### EXCEPTION - Room.prototype.keepers_lairs(): ' +  ex.message);
    }
};

//  TOWER LOGIC

Room.prototype.targetsInArea = function(pArea)
{
    try
    {
        return _.select(this.hostileCreepsAll(),
            (x)=>{return x.inArea(this.name, pArea.topleft.x, pArea.topleft.y,
                pArea.bottomRight.x, pArea.bottomRight.y)});
    }
    catch (ex)
    {
        console.log('### EXCEPTION - StructureRoom.prototype.targetsInArea(): ' +  ex.message);
    }
};

Room.prototype.getDefensiveCentre = function()
{
    try {
        if (!this.defensive_centre)
        {
            this.defensive_centre = new RoomPosition(this.getSettings().defensive_centre.x, this.getSettings().defensive_centre.y, this.name);
        }
        return this.defensive_centre;

    }
    catch (ex)
    {
        console.log('### EXCEPTION - StructureRoom.prototype.getDefensiveCentre(): ' +  ex.message);
    }
};

Room.prototype.towerTargettingAlgorithm = function(pPossibleTargets)
{
    try {

        // if there are any possible targets
        if (pPossibleTargets.length > 0)
        {
            let vTarget;

            // look for isolated creeps and pick them off
            const vIsolatedEnemy = _.select(pPossibleTargets, (x)=> {return x.isIsolated()});
            if (vIsolatedEnemy.length > 0)
            {
                vTarget = this.getDefensiveCentre().findClosestByRange(vIsolatedEnemy);

                // check if the isolate creep was the one being attacked last turn and if so
                // make sure it was being damaged.

                if (!(!this.previousAttackTarget()) &&
                    this.previousAttackTarget().id === vTarget.id &&
                    !this.previousAttackTargetIsBeingDamaged())
                {
                    vTarget = undefined;
                }
            }

            // if there isnt an isolated target
            if (!vTarget)
            {
                // look for any enemy that is close to death
                const vBadlyHurtEnemy = _.select(pPossibleTargets, (x)=> {return x.isBadlyWounded()});

                if (!(!vBadlyHurtEnemy[0]))
                {
                        vTarget = vBadlyHurtEnemy[0];
                    }
                else // no badly hurt enemy go for one of the the nearest enemy - but mix it up
                {
                    const vHealers = _.select(pPossibleTargets, (x)=> {return x.hasBodyPart(HEAL)});

                    // add a random element to confuse enemy algorithms

                    let vRand = Math.floor(Math.random() * 2);

                    let vRange;
                    let vNearest;
                    let vTargets;

                    // attack healers 1/2 of the time
                    if (vHealers.length > 0 && vRand === 0 )
                    {
                            vNearest = this.getDefensiveCentre().findClosestByRange(vHealers);

                            vRange = this.getDefensiveCentre().getRangeTo(vNearest);

                            vTargets = this.getDefensiveCentre().findInRange(vHealers, (vRange + 3));

                            vRand = Math.floor(Math.random() * vTargets.length);

                            vTarget = vTargets[vRand];
                        }
                    else // attack any enemy the other 1/2 of the time
                    {
                            vNearest = this.getDefensiveCentre().findClosestByRange(pPossibleTargets);

                            vRange = this.getDefensiveCentre().getRangeTo(vNearest);

                            vTargets = this.getDefensiveCentre().findInRange(pPossibleTargets, (vRange + 3));

                            vRand = Math.floor(Math.random() * vTargets.length);

                            vTarget = vTargets[vRand];
                        }
                }
            }

            // set the current target as the previous target for next turn
            this.previousAttackTarget(vTarget);

            // return the target
            return vTarget;
        }
        else // no possible targets
        {
            return undefined;
        }
    }
    catch (ex){
        console.log('### EXCEPTION - StructureTower.prototype.towerTargettingAlgorithm(): ' +  ex.message);
    }
};

Room.prototype.getTowerTarget = function()
{
    try
    {
        // if a target has not yet been allocated for this turn then find one
        if (!this.tower_target)
        {
            let vTarget = undefined;

            // check if there is a previousAttackTargetINTheRoom
            // if they are still being damaged then FINISH THEM
            if (!(!this.previousAttackTarget()) &&
                this.previousAttackTargetIsBeingDamaged())
            {
                vTarget = this.previousAttackTarget();
                this.tower_target = {target: vTarget};
            }
            else
            // either thete is no previous target or the previous target is not being damaged,
            // so look for new target
            {
                let vHasTarget = false;
                let vTargets;

                // check each target area for targets in turn
                for (let i = 0; i < this.getSettings().fire_zones.length && !vHasTarget; i ++)
                {
                    vTargets = this.targetsInArea(this.getSettings().fire_zones[i]);

                    //if current area has target then find the best one
                    if (vTargets.length > 0)
                    {
                        vTarget = this.towerTargettingAlgorithm(vTargets);
                        // set to exit loop
                        vHasTarget = true;
                    }
                }
                this.tower_target = {target: vTarget};
                //console.log('Tower Targetting ' + this.name + ' ' + vTarget);
            }
        }
        return this.tower_target.target;
    }
    catch (ex){
        console.log('### EXCEPTION - StructureRoom.prototype.getTowerTarget(): ' +  ex.message);
    }
};

Room.prototype.previousAttackTarget = function(pNewTarget = false)
{
    try {

        // return the previous attack target if the method is called wihtout parameter

        const vPreviousAttackTargetId = this.getMemory().previous_attack_target_id;

        if (!pNewTarget)
        {
            // if the target doesn't already exist this tick then get it.

            if (!this.previous_attack_target)
            {
                //if an id is saved in memory
                if (!(!vPreviousAttackTargetId))
                {
                    //get the targte by id
                    this.previous_attack_target = Game.getObjectById(vPreviousAttackTargetId);

                    // if the target no longer exists or has moved to another room set id to null
                    if (!this.previous_attack_target || this.previous_attack_target.room.name !== this.name)
                    {
                        // set the memory target id to null
                        this.getMemory().previous_attack_target_id = undefined;
                    }

                }
                // else if not exist leave as undefined
            }
            return this.previous_attack_target;
        }

        // else target passed and this is same as target from last tick
        else if (pNewTarget.id === vPreviousAttackTargetId)
        {
            //update the targets hit point history
            this.getMemory().previous_attack_target_hit_point_history.push(pNewTarget.hits);
        }
        // target passed is a new target
        else
        {
            // set the memory ID
            this.getMemory().previous_attack_target_id = pNewTarget.id;
            // reset the hit point history
            this.getMemory().previous_attack_target_hit_point_history = [];
            this.getMemory().previous_attack_target_hit_point_history.push(pNewTarget.hits);
        }
    }
    catch (ex){
        console.log('### EXCEPTION - Room.prototype.previousAttackTarget() : ' +  ex.message);
    }
};

//Room.prototype.previousAttackTargetIsBeingDamaged = function(pTarget)
Room.prototype.previousAttackTargetIsBeingDamaged = function()
{
    try {

        // if the history doesnt exist then assume an programmer logic error and that it is a new target
        if (!this.getMemory().previous_attack_target_hit_point_history)
        {
            return true;
        }
        else // it is the right target and there is a history
        {
            // if the current hits is < than the hits at start of previous turn
            const vLength = this.getMemory().previous_attack_target_hit_point_history.length;

            return ( !(!this.previousAttackTarget()) &&
                this.previousAttackTarget().hits < this.getMemory().previous_attack_target_hit_point_history[vLength - 1])
        }
    }
    catch (ex){
        console.log('### EXCEPTION - Room.prototype.previousAttackTargetIsBeingDamaged(): ' +  ex.message);
    }
};

Room.prototype.evacuateResources = function()
{
    try{
        if (this.terminal.cooldown === 0)
        {
            const vExcludedTerminals = Memory.settings.general.terminalsToExclude;

            const vMyTerminals = _.select(Game.structures, (x)=> {return x.objectType() === 'StructureTerminal' &&
                                                                x.isMine() && !(!x.room.controller) &&
                                                                x.room.controller.level >= 6 &&
                                                                vExcludedTerminals.indexOf(x.id) == -1});

            const vReceiver = _.min(vMyTerminals, (x)=>{return  _.sum(x.store)});

            let capacity = 300000 - _.sum(vReceiver.store);
            let result;
            let mineral;
            for (mineral in this.terminal.store)
            {
                if (this.terminal.store[mineral] >= 100)
                {
                    if (mineral !== 'energy')
                    {
                        if (this.terminal.store[mineral] < capacity)
                        {
                            capacity = this.terminal.store[mineral];
                        }
                        result = this.terminal.send(mineral, capacity, vReceiver.room.name);
                        break;
                    }
                    else if (mineral === 'energy' && _.size(this.terminal.store) === 1)
                    {
                        if (this.terminal.store[mineral] < capacity)
                        {
                            capacity = this.terminal.store[mineral];
                        }

                        capacity = capacity * 0.8; // allows for transmission expense
                        result = this.terminal.send(mineral, capacity, vReceiver.room.name);
                        break;
                    }
                    console.log("EVACUATING " + mineral + " " + capacity + " FROM " + this.name + " TO " + vReceiver.room.name + " result: " + result);
                }
            }

        }
    }
    catch (ex)
    {
        console.log('### EXCEPTION - Room.prototype.evacuateResources(): ' +  ex.message);
    }
}

Room.prototype.incomingNukes = function()
{
    try{

        if (!this.nukesIncoming)
        {
            const vNukes = this.find(FIND_NUKES);

            if (vNukes.length > 0)
            {
                this.nukesIncoming = {value: true, nukes: vNukes};
            }
            else
            {
                this.nukesIncoming = {value: true, nukes: vNukes};
            }
        }

        return this.nukesIncoming;
    }
    catch(ex){
        console.log('### EXCEPTION - Room.prototype.incomeingNukes(): ' +  ex.message);
    }
}

Room.prototype.hasIncomingNukes = function()
{
    try {
        return this.incomingNukes().value;
    }
    catch(ex){
        console.log('### EXCEPTION - Room.prototype.hasIncomeingNukes(): ' +  ex.message);
    }
}

Room.prototype.incomingNukesWithinTicks = function(pTicks)
{
    try {
        if (this.hasIncomingNukes() && !(!this.nukes_within_period[pTicks]))
        {
            this.nukes_within_period[pTicks] = {nukes: _.select(this.incomingNukes(), (x)=>{return x.timeToLand < pTicks})};
        }

        return this.nukes_within_period[pTicks];
    }
    catch(ex){
        console.log('### EXCEPTION - Room.prototype.incomingNukesWithinTicks: ' +  ex.message);
    }
}