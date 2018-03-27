

function ManagerCreeps(){
        console.log('### ManagerCreeps Class contains only static methods, no need to instantiate');
}

ManagerCreeps.manage = function() {
    try {
        const vCreeps = Game.creeps;
        let vCreep;
        let vName;
        // for each creep
        for (vName in vCreeps)
        {
            if (vCreeps.hasOwnProperty(vName))
            {
                vCreep = Game.creeps[vName];

                // if they are not spawning
                if (!vCreep.spawning)
                {
                    // if they need a boost
                    if (ManagerCreeps.needsBoost(vCreep))
                    {
                        ManagerCreeps.getBoosted(vCreep);
                    }
                    else // move or work
                    {
                        // if the creep IS NOT performing a movement between rooms operation
                        if (!ManagerCreeps.moveToCorrectRoom(vCreep))
                        {
                            targetCreep(vCreep);
                            Work.doWork(vCreep);

                        } // else creep is moving
                    } // end move or work decision
                } // else creep is still spawning
            }
        }// end of creeps loop
    }
    catch (ex) {
        console.log('### EXCEPTION - ManagerCreeps.manage(): ' + ex.message);
    }
};

// manage boosting

ManagerCreeps.needsBoost = function(pCreep) {
    try {
        let vReturn = false;

        if (pCreep.hasBoostTarget())
        {
            vReturn = true;
        }
        else if (pCreep.boosts().length > 0)
        {
            let vBoosterLab;

            while (!vBoosterLab && pCreep.boosts().length > 0)
            {
                vBoosterLab = pCreep.room.getBoosterLabByMineral(pCreep.boosts()[0]);
                pCreep.boosts().splice(0, 1);
            }

            if (!(!vBoosterLab)) {
                pCreep.targetBoost(vBoosterLab);
                vReturn = true;
            }
        }
        return vReturn;
    }
    catch (ex) {
        console.log('### EXCEPTION - ManagerCreeps.needsBoost(): ' + ex.message);
    }
};

ManagerCreeps.getBoosted = function (pCreep) {
    try {


        let vResult = pCreep.targetBoost().boostCreep(pCreep);

        pCreep.say('Boost');
        if (vResult === ERR_NOT_IN_RANGE) {

            pCreep.moveToPos(pCreep.targetBoost().pos);
            vResult = pCreep.targetBoost().boostCreep(pCreep);
        }

        if (vResult === OK || vResult === ERR_NOT_ENOUGH_RESOURCES) {
            pCreep.deallocate('boost');
        }
    }
    catch (ex) {
        console.log('### EXCEPTION - ManagerCreeps.manageBoosts(): ' + ex.message);
    }
};

// movement manager

ManagerCreeps.moveToCorrectRoom = function(pCreep) {
    try {

        const evacuatingRooms = Memory.settings.general.roomsToEvacuate;

        switch (pCreep.workClass()) {
            case 'worker':
                // check the worker is in the correct room

                if (evacuatingRooms.indexOf(pCreep.homeRoom()) > -1)
                {
                    const evacPoint = Game.flags[pCreep.homeRoom() + '_evac'];

                    if (pCreep.room.name !== evacPoint.pos.roomName || pCreep.pos.getRangeTo(evacPoint) > 4)
                    {
                        pCreep.moveTo(evacPoint);
                    }
                    pCreep.say('evac');
                    return true;
                }
                else if (pCreep.homeRoom() !== pCreep.room.name)
                {
                    pCreep.moveToPos(new RoomPosition(25, 25, pCreep.homeRoom()));
                    return true; // let the manager know we moved.
                }
                break;

            case 'assistant':
                // check the creep has followed its ingress waypoint path -
                return pCreep.followWaypointPath(Memory.settings.assistance[pCreep.homeRoom()].waypointPrefixIngress);
                break;

            case 'gatherer':

                // logic for exporters that are getting out
                if ((pCreep.targetedForJob() === 'export' && pCreep.isFull()))
                {
                    // if the full creep is headed into a room under evac then make it wait
                    // spawn room is imperfect to use for this but should be ok in most cases
                    if (evacuatingRooms.indexOf(pCreep.spawnRoom()) > -1)
                    {
                        const evacPoint = Game.flags[pCreep.homeRoom() + '_wait'];

                        if (pCreep.room.name !== evacPoint.pos.roomName || pCreep.pos.getRangeTo(evacPoint) > 4)
                        {
                            pCreep.moveTo(evacPoint);
                        }
                        pCreep.say('evac');
                        pCreep.memory.waypoint.number = 1;
                        return true;
                    }
                    else
                    {

                        // logic for creeps who should be on their way out
                        return pCreep.followWaypointPath(Memory.settings.gathering[pCreep.homeRoom()].waypointPrefixEgress);
                    }
                }
                else // logic for creeps who should be in OR on their way in
                {
                    return pCreep.followWaypointPath(Memory.settings.gathering[pCreep.homeRoom()].waypointPrefixIngress);
                }

                break;

            case 'powerHarvester':

                // logic for exporters that are getting out
                if ((pCreep.targetedForJob() === 'exportPower' && pCreep.isFull()))
                {
                    return pCreep.followWaypointPath(Memory.settings.powerharvest[pCreep.homeRoom()].waypointPrefixEgress);
                }
                else // logic for creeps who should be in OR on their way in
                {
                    return pCreep.followWaypointPath(Memory.settings.powerharvest[pCreep.homeRoom()].waypointPrefixIngress);
                }

                break;

            case 'claimer':
                // check thecreep has followed its ingress waypoint path
                return pCreep.followWaypointPath(Memory.settings.claiming[pCreep.homeRoom()].waypointPrefixIngress);
                break;

            case 'military':
                return pCreep.followWaypointPath(Memory.settings.military[pCreep.homeRoom()].waypointPrefixIngress);
                break;

            default:
                console.log('ManagerCreeps.moveToCorrectRoom(): ERROR - unrecognised work class for ' + pCreep.name);
        }
    }
    catch (ex) {
        console.log('### EXCEPTION - ManagerCreeps.moveToCorrectRoom(): ' + ex.message + ' ' + pCreep);
    }
};
