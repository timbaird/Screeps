/*jshint esversion: 6 */


function targetCreep(pCreep)
{
    try {

            let vTaskList;

            // room is NOT under attack
            if (!pCreep.room.underAttack())
            {
                vTaskList = _.cloneDeep(Memory.settings.creeps.roles[pCreep.role()].peaceTasks);
            }
            else // or IS under attack
            {
                vTaskList = _.cloneDeep(Memory.settings.creeps.roles[pCreep.role()].warTasks);
            }

            let vTaskIsValid = false;

            let i;
            let len = vTaskList.length;

            for (i = 0; i < len && !vTaskIsValid; i++)
            {

                // vTaskIsValid = eval('task_' + vTaskList[i])(pCreep);


                //  check out oaction objects idea here
                // http://chimera.labs.oreilly.com/books/1234000000262/apa.html#dont_use_switch


                switch (vTaskList[i])
                {
                    case "custom":
                        vTaskIsValid = task_custom(pCreep);
                        break;

                    case "backupRestockExtensions":
                        vTaskIsValid = task_backupRestockExtensions(pCreep);
                        break;

                    case "backupRestockTowers":
                        vTaskIsValid = task_backupRestockTowers(pCreep);
                        break;

                    case "build":
                        vTaskIsValid = task_build(pCreep);
                        break;

                    case "repairRoads":
                        vTaskIsValid = task_repairRoads(pCreep);
                        break;

                    case "repairContainers":
                        vTaskIsValid = task_repairContainers(pCreep);
                        break;

                    case "upgrade":
                        vTaskIsValid = task_upgrade(pCreep);
                        break;

                    case "mineEnergy":
                        vTaskIsValid = task_mineEnergy(pCreep);
                        break;

                    case "mineMineral":
                        vTaskIsValid = task_mineMineral(pCreep);
                        break;

                    case "restockExtensions":
                        vTaskIsValid = task_restockExtensions(pCreep);
                        break;

                    case "restockTowers":
                        vTaskIsValid = task_restockTowers(pCreep);
                        break;

                    case "emptyMinerals":
                        vTaskIsValid = task_emptyMinerals(pCreep);
                        break;

                    case "restockSpawn":
                        vTaskIsValid = task_restockSpawn(pCreep);
                        break;

                    case "restockLabEnergy":
                        vTaskIsValid = task_restockLabEnergy(pCreep);
                        break;

                    case "restockLabMinerals":
                        vTaskIsValid = task_restockLabMinerals(pCreep);
                        break;

                    case "removeLabMinerals":
                        vTaskIsValid = task_removeLabMinerals(pCreep);
                        break;

                    case "wait":
                        vTaskIsValid = task_wait(pCreep);
                        break;


                    case "collectEnergy":
                        vTaskIsValid = task_collectEnergy(pCreep);
                        break;


                    case "export":
                        vTaskIsValid = task_export(pCreep);
                        break;


                    case "stopInvaders":
                        vTaskIsValid = task_stopInvaders(pCreep);
                        break;

                    case "healWounded":
                        vTaskIsValid = task_healWounded(pCreep);
                        break;

                    case "claim":
                        vTaskIsValid = task_claim(pCreep);
                        break;

                    case "reserve":
                        vTaskIsValid = task_reserve(pCreep);
                        break;

                    case "killKeepers":
                        vTaskIsValid = task_killKeepers(pCreep);
                        break;

                    case "supportInvaderStopper":
                        vTaskIsValid = task_supportInvaderStopper(pCreep);
                        break;

                    case "runaway":
                        vTaskIsValid = task_runaway(pCreep);
                        break;

                    case "manageEnergyBalance":
                        vTaskIsValid = task_manageEnergyBalance(pCreep);
                        break;

                    case "restockStorageLink":
                        vTaskIsValid = task_restockStorageLink(pCreep);
                        break;

                    case "restockPowerSpawnEnergy":
                        vTaskIsValid = task_restockPowerSpawnEnergy(pCreep);
                        break;

                    case "restockNukerEnergy":
                        vTaskIsValid = task_restockNukerEnergy(pCreep);
                        break;

                    case "killPowerBank":
                        vTaskIsValid = task_killPowerBank(pCreep);
                        break;

                    case "healPowerKiller":
                        vTaskIsValid = task_healPowerKiller(pCreep);
                        break;

                    case "storePower":
                        vTaskIsValid = task_storePower(pCreep);
                        break;

                    case "exportPower":
                        vTaskIsValid = task_exportPower(pCreep);
                        break;

                    // military tasks

                    case "drawDownTower":
                        vTaskIsValid = task_drawDownTower(pCreep);
                        break;

                    case "breach":
                        vTaskIsValid = task_breach(pCreep);
                        break;

                    case "fight":
                        vTaskIsValid = task_fight(pCreep);
                        break;

                    case "destroy":
                        vTaskIsValid = task_destroy(pCreep);
                        break;

                    case "raze":
                        vTaskIsValid = task_raze(pCreep);
                        break;

                    case "battleHeal":
                        vTaskIsValid = task_battleHeal(pCreep);
                        break;

                    case "evacuateResources":
                        vTaskIsValid = task_evacuateResources(pCreep);
                        break;

                    case "manageMineralsBetweenStorageAndTerminal":
                        vTaskIsValid = task_ManageMineralsBetweenStorageAndTerminal(pCreep);
                        break;

                    default:
                        console.log('targetCreep - error - invalid task passed through switch ' + vTaskList[i]);
                }
            }

    }
    catch (ex){
        console.log('### EXCEPTION - targetCreep(): ' +  ex.message + ' ' + pCreep);
    }
}


// methods to support targetting

function assignOldEnemyInfrastructureTarget(pCreep, pResource = RESOURCE_ENERGY)
{
    try {

        let vTargets = [];

        // if the creep can dismantle get an old enemy building to dismantle
        if (pCreep.hasBodyPart(WORK))
        {
            vTargets = pCreep.room.getEnemyInfrastructureTargetsNonStore();
        }

        // if either no (non store) enemy buildingds OR doesn't hav work
        // look for enemy storage / terminal to plunder
        if (!vTargets[0])
        {
            vTargets = _.select(pCreep.room.getEnemyInfrastructureTargetsStore(), (x)=>{return x.hasResource(pResource)});
        }

        pCreep.targetGet(pCreep.pos.findClosestByPath(vTargets));

        return pCreep.hasGetTarget();
    }
    catch (ex){
        console.log('### EXCEPTION - assignOldEnemyInfrastructureTarget(): ' +  ex.message);
    }
}

function assignSourceToMine(pCreep)
{
    try {

        let vTargets;

        if (pCreep.targetedForJob() === 'mineEnergy') // logic for miners which incudes limiting number per source
        {
            if (pCreep.room.getSourcesNeedingMiner().length > 0)
            {
                pCreep.targetGet(pCreep.pos.findClosestByPath(pCreep.room.getSourcesNeedingMiner()));
            }
            else
            {
                console.log('###  LOGIC / SETTINGS ERROR - assignSourceToMine: - no sources in the room need a miner ' + pCreep.name)
            }
        }
        else // logic for non miners which includes looking at amount of energy left
        {
            vTargets = _.select(pCreep.room.getSources(), (x)=>{return x.energy > 0;});

            pCreep.targetGet(pCreep.pos.findClosestByPath(vTargets));
        }
    }
    catch (ex){
        console.log('### EXCEPTION - assignSourceToMine(): ' +  ex.message);
    }
}

function commonEnergyAcquisitionTargetting(pCreep)
{
    try {
        // make sure not pointed at a storage with no energy
        if (pCreep.hasGetTarget() && !(!pCreep.targetGet().store) && pCreep.targetGet().store.energy === 0)
        {
            pCreep.deallocate('get');
        }

        // if no target and one is needed
        if (!pCreep.isFull() && !pCreep.hasGetTarget())
        {
            let vTargets = pCreep.room.getDroppedEnergy();
            vTargets = vTargets.concat(pCreep.room.getWithdrawlTargets());

            pCreep.targetGet(pCreep.pos.findClosestByPath(vTargets));

            if (!pCreep.hasGetTarget())
            {
                pCreep.targetGet(pCreep.room.storageWithMostEnergy());

            }

            if (!pCreep.hasGetTarget() && pCreep.hasBodyPart(WORK))
            {
                assignSourceToMine(pCreep);
            }
        }
    }
    catch (ex)
    {
        console.log('### EXCEPTION - commonEnergyAcquisitionTargetting: ' +  ex.message);
    }
}

function gathererEnergyAcquisitionTargetting(pCreep)
{
    try {
        // make sure not pointed at a storage with no energy
        if (pCreep.hasGetTarget() && !(!pCreep.targetGet().store) && !pCreep.targetGet().store.energy)
        {
            pCreep.deallocate('get');
        }

        // if no target and one is needed
        if (!pCreep.isFull() && !pCreep.hasGetTarget())
        {

            if (!pCreep.hasGetTarget() && pCreep.hasBodyPart(WORK) && pCreep.role() !== 'exportMaintainer')
            {
                assignSourceToMine(pCreep);
            }

            if (!pCreep.hasGetTarget())
            {
                assignOldEnemyInfrastructureTarget(pCreep);
            }

            if (!pCreep.hasGetTarget())
            {
                let vTargets = pCreep.room.getDroppedEnergy();
                vTargets = vTargets.concat(pCreep.room.getWithdrawlTargets());

                pCreep.targetGet(pCreep.pos.findClosestByPath(vTargets));

            }
        }
    }
    catch (ex)
    {
        console.log('### EXCEPTION - commonEnergyAcquisitionTargetting: ' +  ex.message);
    }
}

//------

// BACKUP TASKS
function task_backupRestockExtensions(pCreep)
{
    let vTaskName = "backupRestockExtensions";

    try {
        let vReturn = false;

        if (pCreep.room.isShortOfCarriers())
        {
            vReturn = task_restockExtensions(pCreep);
        }
        return vReturn;
    }
    catch (ex){
        console.log('### EXCEPTION - task_' + vTaskName + '(): ' +  ex.message);
    }
}

function task_backupRestockTowers(pCreep)
{
    let vTaskName = "backupRestockTowers";

    try {
        let vReturn = false;

        if (pCreep.role() === "worker" && pCreep.room.isShortOfManagers() && pCreep.room.isShortOfCarriers() ||
            pCreep.role() === "carrier" && pCreep.room.isShortOfManagers())
        {
            vReturn = task_restockTowers(pCreep);
        }
        return vReturn;
    }
    catch (ex){
        console.log('### EXCEPTION - task_' + vTaskName + '(): ' +  ex.message);
    }
}

// TASKS WHICH GET ENERGY AND USE COMMON ENERGY ACQUISITION TARGETTING

function task_custom (pCreep)
{
    let vTaskName = "custom";

    try {

        let vReturn = true;

        if (pCreep.targetedForJob() !== vTaskName)
        {
            pCreep.targetedForJob(vTaskName);
            pCreep.deallocate('all');
        }

        pCreep.manageCarryState(true, true);

        if (!pCreep.isFull() && ( pCreep.pos.x === 0 || pCreep.room.name !== "W67S58" ))
        {
            pCreep.moveTo(Game.flags['W67S58_in_1']);
        }

        pCreep.targetGiveId('5897fbaccce2ec2447fba7a8');

        pCreep.targetGetId('580be21a76fefcdc5fa180f8');

        pCreep.resourceToWithdraw('O');


        return vReturn;
    }
    catch (ex){
        console.log('### EXCEPTION - task_' + vTaskName + '(): ' +  ex.message);
    }
}

function task_build (pCreep)
{
    let vTaskName = "build";

    try {
        let vReturn = false;
        let vTargets = pCreep.room.getConstructionSites();

        if (vTargets.length > 0)
        {
            vReturn = true;

            if (!task_emptyMinerals(pCreep))
            {
                // reconsider this deallocate logic
                if (pCreep.targetedForJob() !== vTaskName)
                {
                    pCreep.targetedForJob(vTaskName);
                    pCreep.deallocate('all');
                }

                pCreep.manageCarryState(true, true);
                pCreep.resourceToWithdraw('energy');

                if (pCreep.isFull() && !pCreep.hasGiveTarget())
                {
                    pCreep.targetGive(pCreep.pos.findClosestByPath(vTargets));
                }

                if (pCreep.workClass() === 'gatherer')
                {
                    gathererEnergyAcquisitionTargetting(pCreep)
                }
                else
                {
                    commonEnergyAcquisitionTargetting(pCreep);
                }

            }
        }
        return vReturn;
    }
    catch (ex){
        console.log('### EXCEPTION - task_' + vTaskName + '(): ' +  ex.message);
    }
}

function task_repairRoads(pCreep)
{
    let vTaskName = "repairRoads";

    try {
        let vReturn = false;
        let vTargets = pCreep.room.getRoadsNeedingRepair();

        if (vTargets.length > 0)
        {
            vReturn = true;

            if (!task_emptyMinerals(pCreep))
            {

                if (pCreep.targetedForJob() !== vTaskName)
                {
                    pCreep.targetedForJob(vTaskName);
                    pCreep.deallocate('all');
                }

                if (pCreep.hasGiveTarget() && pCreep.targetGive().hits === pCreep.targetGive().hitsMax)
                {
                    pCreep.deallocate('give');
                }

                pCreep.manageCarryState(true, true);
                pCreep.resourceToWithdraw('energy');

                if (!pCreep.hasGiveTarget())
                {
                    let vMinTarget = _.min(pCreep.room.getRoadsNeedingRepair(), (x)=> {return x.hits});

                    if (vMinTarget.hits < (vMinTarget.hitsMax / 2))
                    {
                        pCreep.targetGive(vMinTarget);
                    }
                    else
                    {
                        pCreep.targetGive(pCreep.pos.findClosestByPath(vTargets));
                    }
                }

                if (pCreep.workClass() === 'gatherer')
                {
                    gathererEnergyAcquisitionTargetting(pCreep)
                }
                else
                {
                    commonEnergyAcquisitionTargetting(pCreep);
                }
            }
        }
        return vReturn;
    }
    catch (ex){
        console.log('### EXCEPTION - task_' + vTaskName + '(): ' +  ex.message);
    }
}

function task_repairContainers(pCreep)
{
    let vTaskName = "repairContainers";

    try {
        let vReturn = false;

        let vTargets = pCreep.room.getContainersNeedingRepair();

        if (vTargets.length > 0)
        {
            vReturn = true;

            if (!task_emptyMinerals(pCreep)) {

                // reconsider this deallocate logic
                if (pCreep.targetedForJob() !== vTaskName)
                {
                    pCreep.targetedForJob(vTaskName);
                    pCreep.deallocate('all');
                }
                // reconsider this
                pCreep.manageCarryState(true, true);
                pCreep.resourceToWithdraw('energy');
                // perhaps have checking to see if task complete

                if (pCreep.hasGiveTarget() && pCreep.targetGive().hits === pCreep.targetGive().hitsMax)
                {
                    pCreep.deallocate('give');
                }

                if (pCreep.isFull())
                {
                    if (!pCreep.hasGiveTarget())
                    {
                        pCreep.targetGive(_.min(pCreep.room.getContainersNeedingRepair(), (x)=>{return x.hits}));
                    }
                }
                else // creep is not full
                {
                    if (!pCreep.hasGetTarget())
                    {
                        if (pCreep.workClass() === 'gatherer')
                        {
                            gathererEnergyAcquisitionTargetting(pCreep)
                        }
                        else
                        {
                            commonEnergyAcquisitionTargetting(pCreep);
                        }
                    }
                }
            }
        }
        return vReturn;
    }
    catch (ex){
        console.log('### EXCEPTION - task_' + vTaskName + '(): ' +  ex.message);
    }
}

function task_restockExtensions(pCreep)
{
    let vTaskName = "task_restockExtensions";

    try {
        let vReturn = false;
        let vTargets = pCreep.room.getExtensionsNeedingEnergy();

        if (vTargets.length > 0)
        {
            vReturn = true;

            if (!task_emptyMinerals(pCreep)) {

                // reconsider this deallocate logic
                if (pCreep.targetedForJob() !== vTaskName) {
                    pCreep.targetedForJob(vTaskName);
                    pCreep.deallocate('all');
                }
                // reconsider this
                pCreep.manageCarryState(true, true);
                pCreep.resourceToWithdraw('energy');
                // perhaps have checking to see if task complete


                if (pCreep.isFull() && !pCreep.hasGiveTarget())
                {
                    pCreep.targetGive(pCreep.pos.findClosestByPath(vTargets));
                }

                commonEnergyAcquisitionTargetting(pCreep);
            }
        }
        return vReturn;
    }
    catch (ex){
        console.log('### EXCEPTION - task_' + vTaskName + '(): ' +  ex.message);
    }
}

function task_restockPowerSpawnEnergy(pCreep)
{
    let vTaskName = "restockPowerSpawnEnergy";

    try {
        let vReturn = false;


        if (pCreep.room.powerSpawnNeedsEnergy())
        {
            vReturn = true;

            if (!task_emptyMinerals(pCreep)) {

                if (pCreep.targetedForJob() !== vTaskName) {
                    pCreep.targetedForJob(vTaskName);
                    pCreep.deallocate('all');
                }

                pCreep.manageCarryState(true, true);

                pCreep.resourceToWithdraw('energy');

                if (pCreep.isFull() && !pCreep.hasGiveTarget()) {
                    pCreep.targetGive(pCreep.room.getPowerSpawn());
                }

                commonEnergyAcquisitionTargetting(pCreep);
            }
        }
        return vReturn;
    }
    catch (ex){
        console.log('### EXCEPTION - task_' + vTaskName + '(): ' +  ex.message);
    }
}

function task_restockNukerEnergy(pCreep)
{
    let vTaskName = "restockNukerEnergy";

    try {
        let vReturn = false;


        if (pCreep.room.nukerNeedsEnergy())
        {
            vReturn = true;

            if (!task_emptyMinerals(pCreep)) {

                if (pCreep.targetedForJob() !== vTaskName) {
                    pCreep.targetedForJob(vTaskName);
                    pCreep.deallocate('all');
                }

                pCreep.manageCarryState(true, true);

                pCreep.resourceToWithdraw('energy');

                if (pCreep.isFull() && !pCreep.hasGiveTarget()) {
                    pCreep.targetGive(pCreep.room.getNuker());
                }

                commonEnergyAcquisitionTargetting(pCreep);
            }
        }
        return vReturn;
    }
    catch (ex){
        console.log('### EXCEPTION - task_' + vTaskName + '(): ' +  ex.message);
    }
}

function task_restockLabEnergy(pCreep)
{
    let vTaskName = "restockLabEnergy";

    try {
        let vReturn = false;
        let vTargets = pCreep.room.getLabsNeedingEnergy();

        //if (vTargets.length > 0 && !pCreep.room.isEnergyCritical())
        if (vTargets.length > 0)
        {
            vReturn = true;

            if (!task_emptyMinerals(pCreep)) {

                if (pCreep.targetedForJob() !== vTaskName) {
                    pCreep.targetedForJob(vTaskName);
                    pCreep.deallocate('all');
                }

                pCreep.manageCarryState(true, true);

                pCreep.resourceToWithdraw('energy');

                if (pCreep.isFull())
                {
                    pCreep.targetGive(pCreep.pos.findClosestByPath(vTargets));
                }
                else {
                    commonEnergyAcquisitionTargetting(pCreep);
                }
            }
        }
        return vReturn;
    }
    catch (ex){
        console.log('### EXCEPTION - task_' + vTaskName + '(): ' +  ex.message);
    }
}

function task_export(pCreep)
{
    let vTaskName = "export";

    try {
        let vReturn = false;

        let vOp = Memory.settings.gathering[pCreep.homeRoom()];

        if (!(!vOp))
        {
            vReturn = true;

            // reconsider this deallocate logic
            if (pCreep.targetedForJob() !== vTaskName)
            {
                pCreep.targetedForJob(vTaskName);
                pCreep.deallocate('all');
            }

            pCreep.manageCarryState(true, true);

            if (!pCreep.hasGiveTarget())
            {
                pCreep.targetGiveId(vOp.exportTargetId);
            }

            if (pCreep.room.name === pCreep.homeRoom())
            {
                commonEnergyAcquisitionTargetting(pCreep);
            }
        }

        return vReturn;
    }
    catch (ex){
        console.log('### EXCEPTION - task_' + vTaskName + '(): ' +  ex.message);
    }
}

// TASKS WHICH GET ENERGY AND DONT USE COMMON ENERGY ACQUISITION TARGETTING

function task_upgrade(pCreep)
{
    let vTaskName = "upgrade";

    try {
        let vReturn = false;
        let vTarget = pCreep.room.controller;

        if (!(!vTarget) &&
            (!pCreep.room.isEnergyCritical() || vTarget.ticksToDowngrade < 1000) )
        {
            vReturn = true;

            if (!task_emptyMinerals(pCreep)) {

                // reconsider this deallocate logic
                if (pCreep.targetedForJob() !== vTaskName) {
                    pCreep.targetedForJob(vTaskName);
                    pCreep.deallocate('all');
                }

                // reconsider this
                pCreep.manageCarryState(false, true);

                pCreep.resourceToWithdraw('energy');
                // perhaps have checking to see if task complete

                if (!pCreep.hasGiveTarget())
                {
                    pCreep.targetGive(vTarget);
                }

                if (!pCreep.isFull() && !pCreep.hasGetTarget())
                {
                    if (!vTarget.getLink() || vTarget.getLink().energy === 0)
                    {
                        commonEnergyAcquisitionTargetting(pCreep);
                    }
                    else
                    {
                        pCreep.targetGet(vTarget.getLink());
                    }
                }
            }
        }
        return vReturn;
    }
    catch (ex){
        console.log('### EXCEPTION - task_' + vTaskName + '(): ' +  ex.message);
    }
}

function task_restockTowers(pCreep)
{
    let vTaskName = "restockTowers";

    try {
        let vReturn = false;
        let vTargets = pCreep.room.getTowersNeedingEnergy();

        if (vTargets.length > 0)
        {
            vReturn = true;

            if (!task_emptyMinerals(pCreep)) {

                // reconsider this deallocate logic
                if (pCreep.targetedForJob() !== vTaskName) {
                    pCreep.targetedForJob(vTaskName);
                    pCreep.deallocate('all');
                }
                // reconsider this
                pCreep.manageCarryState(true, true);

                // perhaps have checking to see if task complete
                pCreep.resourceToWithdraw('energy');

                if (pCreep.isFull() && !pCreep.hasGiveTarget()) {pCreep.targetGive(_.min(vTargets, (x)=> {return x.energy}));}

                // TAKE FROM FULLEST STORAGE FIRST - AND THEN SCAVENGE

                if (!pCreep.isFull() && !pCreep.hasGetTarget()) {


                    pCreep.targetGet(pCreep.room.storageWithMostEnergy());

                    if (!pCreep.hasGetTarget() || !pCreep.targetGet().store || !pCreep.targetGet().store.energy)
                    {
                        pCreep.targetGet(commonEnergyAcquisitionTargetting(pCreep));
                    }
                }
            }
        }
        return vReturn;
    }
    catch (ex){
        console.log('### EXCEPTION - task_' + vTaskName + '(): ' +  ex.message);
    }
}

function task_restockSpawn(pCreep)
{
    let vTaskName = "restockSpawn";

    try {
        let vReturn = false;
        let vTargets = pCreep.room.getSpawnsNeedingEnergy();

        if (vTargets.length > 0)
        {
            vReturn = true;

            if (!task_emptyMinerals(pCreep)) {

                // reconsider this deallocate logic
                if (pCreep.targetedForJob() !== vTaskName) {
                    pCreep.targetedForJob(vTaskName);
                    pCreep.deallocate('all');
                }
                // reconsider this
                pCreep.manageCarryState(true, true);

                pCreep.resourceToWithdraw('energy');

                // perhaps have checking to see if task complete

                if (pCreep.isFull() && !pCreep.hasGiveTarget()) {
                    pCreep.targetGive(pCreep.pos.findClosestByPath(vTargets));
                }



                // TAKE FROM FULLEST STORAGE FIRST - AND THEN SCAVENGE
                if (!pCreep.isFull() && !pCreep.hasGetTarget() ||
                    pCreep.hasGetTarget() && (!pCreep.targetGet().store || !pCreep.targetGet().store.energy))
                {

                    pCreep.targetGet(pCreep.room.storageWithMostEnergy());

                    if (!pCreep.hasGetTarget() || !pCreep.targetGet().store || !pCreep.targetGet().store.energy)
                    {
                        pCreep.targetGet(commonEnergyAcquisitionTargetting(pCreep));
                    }
                }
            }
        }
        return vReturn;
    }
    catch (ex){
        console.log('### EXCEPTION - task_' + vTaskName + '(): ' +  ex.message);
    }
}

function task_collectEnergy(pCreep)
{
    let vTaskName = "collectEnergy";

    try {
        let vReturn = false;
        let vTargets = pCreep.room.getContainersWithEnergy();
        vTargets = vTargets.concat(pCreep.room.getDroppedEnergy());

        if (vTargets.length > 0 && (!(!pCreep.room.storage) || !(!pCreep.room.terminal) ))
        {
            vReturn = true;

            if (!task_emptyMinerals(pCreep)) {

                if (pCreep.targetedForJob() !== vTaskName) {
                    pCreep.targetedForJob(vTaskName);
                    pCreep.deallocate('all');
                }

                pCreep.manageCarryState(true, true);

                pCreep.resourceToWithdraw('energy');

                if (!pCreep.isFull() && !pCreep.hasGetTarget())
                {
                    pCreep.targetGet(pCreep.pos.findClosestByPath(vTargets));
                }

                if (!pCreep.hasGiveTarget()) {

                    if (!(!pCreep.room.storage))
                    {
                        pCreep.targetGive(pCreep.room.storage);
                    }
                    else
                    {
                        pCreep.targetGive(pCreep.room.terminal);
                    }
                }
            }
        }
        return vReturn;
    }
    catch (ex){
        console.log('### EXCEPTION - task_' + vTaskName + '(): ' +  ex.message);
    }
}

function task_ManageMineralsBetweenStorageAndTerminal(pCreep)
{
    let vTaskName = "manageMineralsBetweenStorageAndTerminal";

    try {

            //console.log(vTaskName + " " + 1);
            let vReturn = false;

            // if it is already carrying minerals than this will manage where to put them
            if (!task_emptyMinerals(pCreep)) {

                if (pCreep.targetedForJob() !== vTaskName)
                {
                    pCreep.targetedForJob(vTaskName);
                    pCreep.deallocate('all');
                }

                pCreep.manageCarryState(true, true);

                if (!pCreep.isFull() && !pCreep.hasGetTarget())
                {
                    const vTerminalExists = !(!pCreep.room.terminal);
                    const vStorageExists = !(!pCreep.room.storage);

                    // if the neccessary conditons exist for this task to be meaningful
                    if(vTerminalExists && vStorageExists && pCreep.room.isMine())
                    {
                        let mineral;
                        for (mineral in pCreep.room.storage.store)
                        {
                            if (mineral !== 'energy')
                            {
                                // if the terminal doesn't have any of that resource
                                if (!pCreep.room.terminal.store[mineral] || pCreep.room.terminal.store[mineral] < 5000)
                                {
                                    pCreep.targetGet(pCreep.room.storage);
                                    pCreep.resourceToWithdraw(mineral);
                                    vReturn = true;
                                    //console.log(vTaskName + " " + 2 + " " + pCreep.name + " " + pCreep.room.name + " " + mineral);
                                    break;
                                }
                            }
                        }

                        // if a transfer not set up in the previous loop check in the other direction - terminal to storage
                        if (!vReturn)
                        {
                            for (mineral in pCreep.room.terminal.store){
                                // if the terminal has too much of that resource then send it to storage

                                if (mineral !== 'energy')
                                {
                                    if (pCreep.room.terminal.store[mineral] > 7000)
                                    {
                                        pCreep.targetGet(pCreep.room.terminal);
                                        pCreep.resourceToWithdraw(mineral);
                                        vReturn = true;
                                        //console.log(vTaskName + " " + 3 + " " + pCreep.name + " " + pCreep.room.name + " " + mineral);
                                        break;
                                    }
                                }
                            }
                        }
                    }// else room does not have both termianl and storage or is not my room
                }// creep is already full and already has a give target
            }// creep is already working from task_emptyMinerals(pCreep)

        return vReturn;
    }
    catch (ex){
        console.log('### EXCEPTION - task_' + vTaskName + '(): ' +  ex.message);
    }
}

function task_manageEnergyBalance(pCreep)
{
    let vTaskName = "manageEnergyBalance";

    try {
        let vReturn = false;

        if (!(!pCreep.room.storage) && !(!pCreep.room.terminal)) {

            let vHigherStore;
            let vLowerStore;
            let vResourceToMove = 'energy';

            if (pCreep.room.storage.store.energy > pCreep.room.terminal.store.energy * 1.05)
            {
                vHigherStore = pCreep.room.storage;
                vLowerStore = pCreep.room.terminal;

                vReturn = true;

            }
            else if (pCreep.room.terminal.store.energy > pCreep.room.storage.store.energy * 1.05)
            {
                vHigherStore = pCreep.room.terminal;
                vLowerStore = pCreep.room.storage;
                vReturn = true;
            }

            // energy is balanced but there is some minerals in storage - move them to terminal
            else if (_.sum(pCreep.room.storage.store) > pCreep.room.storage.store.energy)
            {
                let vContinue = true;
                let i;
                let vStore = pCreep.room.storage.store;

                for (i in vStore)
                {
                    if (vStore.hasOwnProperty(i) && (!vStore[i] || vStore[i] < 5000) &&  vContinue)
                    {
                        vResourceToMove = i;
                        vHigherStore = pCreep.room.storage;
                        vLowerStore = pCreep.room.terminal;
                        vReturn = true;
                        vContinue = false;
                    }
                }
            }

            if (vReturn)
            {
                if (!task_emptyMinerals(pCreep))
                {
                    // reconsider this deallocate logic
                    if (pCreep.targetedForJob() !== vTaskName) {
                        pCreep.targetedForJob(vTaskName);
                        pCreep.deallocate('all');
                    }
                    // reconsider this
                    pCreep.manageCarryState(true, true);

                    // perhaps have checking to see if task complete

                    pCreep.resourceToWithdraw(vResourceToMove);

                    if (!pCreep.hasGiveTarget()) {
                        pCreep.targetGive(vLowerStore);
                    }

                    if (!pCreep.hasGetTarget()) {
                        pCreep.targetGet(vHigherStore);
                    }
                }
            }
        }
        return vReturn;
    }
    catch (ex){
        console.log('### EXCEPTION - task_' + vTaskName + '(): ' +  ex.message);
    }
}

// TASKS WHICH DONT 'GET' ENERGY

function task_mineEnergy(pCreep)
{
    let vTaskName = "mineEnergy";

    try {
        let vReturn = false;
        let vTargets = pCreep.room.getSourcesNeedingMining();

        if (vTargets.length > 0)
        {
            vReturn = true;

            if (!task_emptyMinerals(pCreep))
            {

                // reconsider this deallocate logic
                if (pCreep.targetedForJob() !== vTaskName)
                {
                    pCreep.targetedForJob(vTaskName);
                    pCreep.deallocate('all');
                }
                // reconsider this
                pCreep.manageCarryState(true, true);

                if (!pCreep.hasGetTarget())
                {
                    pCreep.targetGet(pCreep.pos.findClosestByPath(vTargets));
                }

                if (pCreep.isFull() && !pCreep.hasGiveTarget() && pCreep.hasGetTarget())
                {
                    try {
                        pCreep.targetGive(pCreep.targetGet().binsNeedingEnergy()[0]);
                    }
                    catch (ex)
                    {
                        if (ex.message === 'a.targetGet(...).binsNeedingEnergy is not a function')
                        {
                            pCreep.deallocate('get');
                        }
                        else
                        {
                            throw new Exception('Passing on in task_mineEnergy');
                        }
                    }
                }
            }
        }
        return vReturn;
    }
    catch (ex){
        console.log('### EXCEPTION - task_' + vTaskName + '(): ' +  ex.message + ' ' + pCreep.name);
    }
}

function task_mineMineral(pCreep)
{
    let vReturn = false;
    let vTaskName = "mineMineral";
    const vTarget = pCreep.room.getMinerals()[0];

    try
    {

        // if there is a mineral source and it has mineral to mine
        if (    !(!vTarget) &&
                vTarget.mineralAmount > 0 &&
                vTarget.hasExtractor() &&
                pCreep.room.totalStoredResource(vTarget.mineralType) < 50000)
            {
                vReturn = true;
                pCreep.manageCarryState(false, false);

                if (pCreep.targetedForJob() !== vTaskName)
                {
                    pCreep.targetedForJob(vTaskName);
                    pCreep.deallocate('all');
                }

                if (pCreep.energy > 0)
                {
                    pCreep.isFull(true);
                }

                if (pCreep.isFull())
                {
                    const vStore = pCreep.room.storage || pCreep.room.terminal || pCreep;
                    pCreep.targetGive(vStore);
                }
                else // creep is empty
                {
                    pCreep.targetGet(vTarget);
                }
            }// either room doesn't have mineral or mineral is empty
        return vReturn;
    }
    catch (ex)
    {
        console.log('### EXCEPTION - task_' + vTaskName + '(): ' +  ex.message);
    }
}

function task_emptyMinerals(pCreep)
{
    let vTaskName = "emptyMinerals";

    try {
        let vReturn = false;

        if (pCreep.cargoType() !== 'energy' && pCreep.cargoType() !== 'empty')
        {
            if (pCreep.targetedForJob() !== 'mineMineral' || pCreep.isFull())
            {
                vReturn = true;

                if (pCreep.targetedForJob() !== vTaskName)
                {
                    pCreep.targetedForJob(vTaskName);
                    pCreep.deallocate('all');
                }

                // make the full so they look to offload instead of find more minerals which may never come

                pCreep.isFull(true);

                // find labs that need what we are carrying

                if (!pCreep.hasGiveTarget())
                {
                    let vTargets = _.select(pCreep.room.getLabsNeedingTopUp(), (x)=> {return x.labMineralType() === pCreep.cargoType();});

                    if (vTargets.length === 1)
                    {
                        pCreep.targetGive(vTargets[0]);
                    }
                    else if (vTargets.length > 1)
                    {
                        pCreep.targetGive(_.min(vTargets, (x)=> {return x.mineralAmount;}));
                    }
                    else // no labs need the energy look for terminal or storage
                    {
                        const vHasTerminal = !(!pCreep.room.terminal);
                        const vHasStorage = !(!pCreep.room.storage);

                        if (vHasStorage && vHasTerminal)
                        {
                            if (!pCreep.room.terminal.store[pCreep.cargoType()] || pCreep.room.terminal.store[pCreep.cargoType()] < 5000)
                            {
                                pCreep.targetGive(pCreep.room.terminal);
                            }
                            else
                            {
                                pCreep.targetGive(pCreep.room.storage);
                            }

                        }
                        else if (vHasTerminal)
                        {
                            pCreep.targetGive(pCreep.room.terminal);
                        }
                        else if (vHasStorage)
                        {
                            pCreep.targetGive(pCreep.room.storage);
                        }
                        else // neither storage or terminal so drop it
                        {
                            pCreep.targetGive(pCreep);
                        }
                    }
                }
            }
        }
        return vReturn;
    }
    catch (ex){
        console.log('### EXCEPTION - task_' + vTaskName + '(): ' +  ex.message);
    }
}

function task_restockLabMinerals(pCreep)
{
    let vTaskName = "restockLabMinerals";

    try {
        let vReturn = false;

        if (!(!pCreep.room.terminal))
        {
            let vTargets = _.select(pCreep.room.getLabsNeedingTopUp(), (x)=>{return !(!x.room.terminal.store[x.labMineralType()])});

            if (vTargets.length > 0 && !task_emptyMinerals(pCreep)) // there is some  input work to be done
            {
                vReturn = true;

                if (pCreep.targetedForJob() !== vTaskName)
                {
                    pCreep.targetedForJob(vTaskName);
                    pCreep.deallocate('all');
                }

                // get rid of any energy first
                // the ordeing of this is susp[ect as if there is no job here creep still emptys minerals before finding this out
                if (pCreep.carry.energy > 0)
                {
                    pCreep.isFull(true);
                    pCreep.targetGive(pCreep.room.terminal);
                }
                else // no minerals and no energy - get the needed energy form the terminal
                {
                    pCreep.isFull(false);

                    pCreep.targetGet(pCreep.room.terminal);

                    let vTarget = _.min(vTargets, (x)=> {return x.mineralAmount;});
                    pCreep.resourceToWithdraw(vTarget.labMineralType());

                }
            } // else no targets or already carrying minerals

        } // else room has no terminal

        return vReturn;
    }
    catch (ex){
        console.log('### EXCEPTION - task_' + vTaskName + '(): ' +  ex.message);
    }
}

function task_removeLabMinerals(pCreep)
{
    let vTaskName = "removeLabMinerals";

    try {
        let vReturn = false;

        if (!(!pCreep.room.terminal))
        {
            // if the creep is carrying something other than energy or nothing
            if (!task_emptyMinerals(pCreep)) {

                if (_.sum(pCreep.carry) === 0)
                {
                    let vTargets = pCreep.room.getLabsNeedingEmptying();

                    if (vTargets.length > 0) // there is some  input work to be done
                    {
                        vReturn = true;

                        if (pCreep.targetedForJob() !== vTaskName)
                        {
                            pCreep.targetedForJob(vTaskName);
                            pCreep.deallocate('all');
                        }

                        pCreep.manageCarryState(true, true);

                        let vTarget = _.max(vTargets, (x)=> {return x.mineralAmount;});

                        pCreep.targetGet(vTarget);

                        pCreep.resourceToWithdraw(vTarget.mineralType);
                    }
                } // else the creep has energy and so cant restock minerals now
            }
        } // else room has no terminal

        return vReturn;
    }
    catch (ex){
        console.log('### EXCEPTION - task_' + vTaskName + '(): ' +  ex.message);
    }
}

function task_wait(pCreep)
{
    let vTaskName = "wait";

    try {

        // reconsider this deallocate logic
        if (pCreep.targetedForJob() !== vTaskName)
        {
            pCreep.targetedForJob(vTaskName);
            pCreep.deallocate('all');
        }

        if (!task_emptyMinerals(pCreep))
        {

            let vWaitFlag = Game.flags[pCreep.room.name + '_wait'];

            if (!(!vWaitFlag))
            {
                if (pCreep.pos.getRangeTo(vWaitFlag) > 2)
                {
                    //pCreep.moveToCached(vWaitFlag);
                    pCreep.moveToPos(vWaitFlag);
                }
                // else creep already there
            }
            else // flag not found
            {
                console.log('wait(): NO WAIT FLAG in ' + pCreep.room + ' ' + pCreep);
            }
            // else flag doesnt exist or creep already there
            return true;
        }
    }

    catch (ex){
        console.log('### EXCEPTION - task_' + vTaskName + '(): ' +  ex.message);
    }
}

function task_stopInvaders(pCreep)
{
    let vTaskName = "stopInvaders";

    try {

        let vReturn = false;

        let vTargets = pCreep.room.hostileCreepsAll();

        if (vTargets.length > 0)
        {
            vReturn = true;

            // reconsider this deallocate logic
            if (pCreep.targetedForJob() !== vTaskName)
            {
                pCreep.targetedForJob(vTaskName);
                pCreep.deallocate('all');
                pCreep.isFull(true);
            }

            pCreep.targetGive(pCreep.pos.findClosestByPath(vTargets));

        }// else no hostile creeps present

        return vReturn;
    }
    catch (ex){
        console.log('### EXCEPTION - task_' + vTaskName + '(): ' +  ex.message);
    }
}

function task_healWounded(pCreep)
{
    let vTaskName = "healWounded";

    try {
        let vReturn = false;
        let vTargets = pCreep.room.getExistingCreepsWounded();

        if (vTargets.length > 0)
        {
            vReturn = true;

            // reconsider this deallocate logic
            if (pCreep.targetedForJob() !== vTaskName)
            {
                pCreep.targetedForJob(vTaskName);
                pCreep.deallocate('all');
                pCreep.isFull(true);
            }

            pCreep.targetGive(pCreep.pos.findClosestByRange(vTargets));
        }
        return vReturn;
    }
    catch (ex){
        console.log('### EXCEPTION - task_' + vTaskName + '(): ' +  ex.message);
    }
}

function task_claim(pCreep)
{
    let vTaskName = "claim";

    try {
        let vReturn = false;

        if (!(!pCreep.room.controller) && pCreep.room.controller.level === 0)
        {
            vReturn = true;

            // reconsider this deallocate logic
            if (pCreep.targetedForJob() !== vTaskName) {
                pCreep.targetedForJob(vTaskName);
                pCreep.deallocate('all');
                pCreep.isFull(true);
            }

            pCreep.targetGive(pCreep.room.controller);
        }

        return vReturn;
    }
    catch (ex){
        console.log('### EXCEPTION - task_' + vTaskName + '(): ' +  ex.message);
    }
}

function task_reserve(pCreep)
{
    let vTaskName = "reserve";

    try {
        let vReturn = false;

        if (!(!pCreep.room.controller) && pCreep.room.controller.level === 0)
        {
            vReturn = true;

            // reconsider this deallocate logic
            if (pCreep.targetedForJob() !== vTaskName) {
                pCreep.targetedForJob(vTaskName);
                pCreep.deallocate('all');
                pCreep.isFull(true);
            }

            pCreep.targetGive(pCreep.room.controller);
        }

        return vReturn;
    }
    catch (ex){
        console.log('### EXCEPTION - task_' + vTaskName + '(): ' +  ex.message);
    }
}

function task_killKeepers(pCreep)
{
    let vTaskName = "killKeepers";

    try {
        let vReturn = false;

        if (pCreep.room.getKeepersLairs().length > 0)
        {
            if (pCreep.targetedForJob() !== vTaskName) {
                pCreep.targetedForJob(vTaskName);
                pCreep.deallocate('all');
                pCreep.isFull(true);
            }

            vReturn = true;

            let vTarget;

            let vSettings = pCreep.room.getGatheringSettings();

            if (!vSettings)
            {
                vSettings = {minerMineral: false};
            }


            if (pCreep.room.hostileCreepsSourceKeepers(vSettings.mineMineral).length > 0)
            {
                vTarget = pCreep.pos.findClosestByPath(pCreep.room.hostileCreepsSourceKeepers(vSettings.mineMineral));
            }
            else
            {
                vTarget = _.min(pCreep.room.getKeepersLairs(vSettings.minerMineral), (x)=>{return x.ticksToSpawn});
            }

            pCreep.targetGive(vTarget);
        }
        return vReturn;
    }
    catch (ex){
        console.log('### EXCEPTION - task_' + vTaskName + '(): ' +  ex.message);
    }
}

function task_restockStorageLink(pCreep)
{
    let vTaskName = "restockStorageLink";

    try {

        let vReturn = false;

        let vStorageLink;

        if (!(!pCreep.room.storage))
        {
            vStorageLink = pCreep.room.storage.getLink();
        }

        if (!(!vStorageLink) && vStorageLink.energy < vStorageLink.energyCapacity)
        {
            vReturn = true;

            if (!task_emptyMinerals(pCreep)) {

                if (pCreep.targetedForJob() !== vTaskName) {
                    pCreep.targetedForJob(vTaskName);
                    pCreep.deallocate('all');
                    pCreep.isFull(true);
                }

                pCreep.manageCarryState(true, true);

                pCreep.targetGive(vStorageLink);

                pCreep.targetGet(pCreep.room.storageWithMostEnergy());
            }

        }

        return vReturn;
    }
    catch (ex){
            console.log('### EXCEPTION - task_' + vTaskName + '(): ' +  ex.message);
        }
}

function task_supportInvaderStopper(pCreep)
{
    let vTaskName = "supportInvaderStopper";

    try {

        let vReturn = false;

        let vInvaderStopper = _.select(pCreep.room.creepsAll(), (x)=>{return x.isMine() && x.role() === 'invaderStopperKiller'})[0];

        if (!(!vInvaderStopper))
        {
            if (pCreep.targetedForJob() !== vTaskName)
            {
                pCreep.targetedForJob(vTaskName);
                pCreep.deallocate('all');
                pCreep.isFull(true);
            }

            if (pCreep.pos.getRangeTo(vInvaderStopper) > 0)
            {
                // leave this as is because invader stoppers will move.
                pCreep.moveToPos(vInvaderStopper);
                vReturn = true;
            }

            if (pCreep.hits < pCreep.hitsMax)
            {
                pCreep.targetGive(pCreep);
            }
            else
            {
                pCreep.targetGive(vInvaderStopper);
            }

            return vReturn;
        }
        else // there is no invader stopper
        {
            return vReturn;
        }


    }

    catch (ex){
        console.log('### EXCEPTION - task_' + vTaskName + '(): ' +  ex.message);
    }
}

function task_killPowerBank(pCreep)
{
    let vTaskName = "killPowerBank";

    try {

        let vReturn = false;

        let vTarget = pCreep.room.find(FIND_STRUCTURES, {filter: (x)=>{return x.objectType() === 'StructurePowerBank'}})[0];

        if (!(!vTarget))
        {
            vReturn = true;

            // reconsider this deallocate logic
            if (pCreep.targetedForJob() !== vTaskName)
            {
                pCreep.targetedForJob(vTaskName);
                pCreep.deallocate('all');
                pCreep.isFull(true);
            }

            pCreep.targetGive(vTarget);

        }// else no power bank present

        return vReturn;
    }
    catch (ex){
        console.log('### EXCEPTION - task_' + vTaskName + '(): ' +  ex.message);
    }
}

function task_healPowerKiller(pCreep)
{
    let vTaskName = "healPowerKiller";

    try {

        let vReturn = false;

        let vPowerKillers = _.select(pCreep.room.creepsAll(), (x)=>{return x.isMine() && x.role() === 'powerKiller'});

        let vPowerKiller;

        if (vPowerKillers.length > 1)
        {
            vPowerKiller = _.min(vPowerKillers, (x)=>{return x.hits});
        }
        else
        {
            vPowerKiller = vPowerKillers[0];
        }

        if (!(!vPowerKiller))
        {
            if (pCreep.targetedForJob() !== vTaskName)
            {
                pCreep.targetedForJob(vTaskName);
                pCreep.deallocate('all');
                pCreep.isFull(true);
            }

            if (pCreep.pos.getRangeTo(vPowerKiller) > 0)
            {
                // leave this as is because invader stoppers will move.
                pCreep.moveToPos(vPowerKiller);
                vReturn = true;
            }

            if (pCreep.hits < pCreep.hitsMax)
            {
                pCreep.targetGive(pCreep);
            }
            else
            {
                pCreep.targetGive(vPowerKiller);
            }
        }
        return vReturn;
    }

    catch (ex){
        console.log('### EXCEPTION - task_' + vTaskName + '(): ' +  ex.message);
    }

}

function task_storePower(pCreep)
{
    let vTaskName = "storePower";

    try {

        let vReturn = true;

        pCreep.manageCarryState(true, true);

        if (pCreep.isFull())
        {
            // look for creep to hand power off too.

        }
        else // look for power to pick up
        {
            let vPower = pCreep.room.find(FIND_DROPPED_RESOURCES, {filter:(x)=>{return x.resourceType === RESOURCE_POWER}})[0];

            if (!(!vPower))
            {
                pCreep.targetGet(vPower);
            }
            else if (!vPower && pCreep.carry.power > 0)
            {
                pCreep.isFull(true);
            }
        }
        return vReturn;
    }

    catch (ex){
        console.log('### EXCEPTION - task_' + vTaskName + '(): ' +  ex.message);
    }
}

function task_exportPower(pCreep)
{

}

function task_runaway(pCreep)
{

}

// military specific tasks

// pops in and out from side drawing tower fire then healing

//function task_drawDownTower(pCreep)
function task_drawDownTower()
{
    let vTaskName = "drawDownTower";

    try {

        return false;
    }
    catch (ex){
        console.log('### EXCEPTION - task_' + vTaskName + '(): ' +  ex.message);
    }
}

// destroys targts listed in the breach array in military settings
function task_breach(pCreep)
{
    let vTaskName = "breach";

    try {

        const vTargets = Memory.settings.military[pCreep.homeRoom()].orders.breach;
        let vReturn = false;

        let i;
        const len = vTargets.length;
        let vTarget;

        for (i=0; i<len && !vReturn; i++ )
        {
            vTarget = Game.getObjectById(vTargets[i]);

            if (!(!vTarget))
            {
                pCreep.targetGive(vTarget);
                pCreep.isFull(true);
                pCreep.say('Breach');
                vReturn = true;
            }
        }

        return vReturn;
    }
    catch (ex){
        console.log('### EXCEPTION - task_' + vTaskName + '(): ' +  ex.message);
    }
}

// attacks enemy creeps - prioritizing attackers and healers, then non-combatants
function task_fight(pCreep)
{
    let vTaskName = "fight";

    try {
        let vReturn = false;

        let vEnemy = pCreep.room.hostileCreepsDangerous();

        if (vEnemy.length === 0)
        {
            vEnemy = pCreep.room.hostileCreepsAll();
        }

        if (vEnemy.length > 0)
        {
            pCreep.targetGive(pCreep.pos.findClosestByPath(vEnemy));
            pCreep.isFull(true);
            pCreep.say('Fight');
            vReturn = true;
        }
        return vReturn;
    }
    catch (ex){
        console.log('### EXCEPTION - task_' + vTaskName + '(): ' +  ex.message);
    }
}

// destroys targets listed in the destroy array in military settings
function task_destroy(pCreep)
{
    let vTaskName = "destroy";

    try {
        const vTargets = Memory.settings.military[pCreep.homeRoom()].orders.destroy;
        let vReturn = false;

        let i;
        const len = vTargets.length;
        let vTarget;

        for (i=0; i<len && !vReturn; i++ )
        {
            vTarget = Game.getObjectById(vTargets[i]);

            if (!(!vTarget))
            {
                pCreep.targetGive(vTarget);
                pCreep.isFull(true);
                pCreep.say('Destroy');
                vReturn = true;
            }
        }

        return vReturn;
    }
    catch (ex){
        console.log('### EXCEPTION - task_' + vTaskName + '(): ' +  ex.message);
    }
}

// destroys all infrustructure in room. (later incorporate ownershoip conditions)
function task_raze(pCreep)
{
    let vTaskName = "raze";

    try {
        const vTargets = _.select(pCreep.room.getEnemyInfrastructureTargetsNonStore(),(x)=>{return x.objectType() !== 'StructurePowerBank' &&
                                                                                                     x.objectType() !== 'StructureRampart' &&
                                                                                                    x.objectType() !== 'StructureWall'&&
                                                                                                    x.objectType() !== 'StructureController'&&
                                                                                                    x.objectType() !== 'StructureRoad'} );
        let vReturn = false;

        if (vTargets.length > 0)
        {
            pCreep.targetGive(pCreep.pos.findClosestByPath(vTargets));
            pCreep.isFull(true);
            pCreep.say('Raze');
            vReturn = true;
        }

        return vReturn;
    }
    catch (ex){
        console.log('### EXCEPTION - task_' + vTaskName + '(): ' +  ex.message);
    }
}

// heals itself or the nearest friendly creep
function task_battleHeal(pCreep)
{
    let vTaskName = "battleHeal";

    try {

        let vTargets = pCreep.room.getExistingCreepsWounded();
        pCreep.isFull(true);

        if (vTargets.length > 0)
        {
            let vTarget = _.min(vTargets, (x)=>{return x.hits});
            pCreep.targetGive(vTarget);
        }
        else // no wounded, follow nearest - needs re-factoring - assumes only one attack creep.
        {
            vTargets = pCreep.room.find(FIND_MY_CREEPS, {filter:(x)=>{return x.name !== pCreep.name}});
            let vTarget = pCreep.pos.findClosestByPath(vTargets);
            pCreep.targetGive(vTarget);
        }

        pCreep.say(pCreep.targetGive().name);

        return true; // always return true for this job
    }
    catch (ex){
        console.log('### EXCEPTION - task_' + vTaskName + '(): ' +  ex.message);
    }
}

// moves resources from storage to terminal to allow evac if room / stroage is threatened
function task_evacuateResources(pCreep)
{
    const vTaskName = "evacuateResources";

    try {
        let vReturn = true;

        // if not storage or terminal, no purpose, retask as manager
        if (!pCreep.room.storage || !pCreep.room.terminal)
        {
            pCreep.role('manager');
        }
        else
        {
            if (!pCreep.targetGet() || !pCreep.targetGive()) {
                pCreep.targetGet(pCreep.room.storage);
                pCreep.targetGive(pCreep.room.terminal);
            }

            pCreep.manageCarryState(false, false);

            if (!pCreep.isFull())
            {
                const maxAmount = _.max(pCreep.targetGet().store);

                let mineral;

                for (mineral in pCreep.targetGet().store)
                {
                    // move all the minerals out first, as energy is relatively cheap and easy to get
                    // do energy if nothing left
                    if (mineral != 'energy' || _.size(pCreep.targetGet().store) === 1)
                    {
                        if (pCreep.targetGet().store[mineral] === maxAmount)
                        {
                            pCreep.resourceToWithdraw(mineral);
                            break;
                        }
                    }
                }
            }
        }

        return vReturn;
    }
    catch (ex){
        console.log('### EXCEPTION - task_' + vTaskName + '(): ' +  ex.message);
    }
}