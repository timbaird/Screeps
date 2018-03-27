
function ManagerTerminals(){
    console.log('### ManagerTerminals Class contains only static methods, no need to instantiate');
}

ManagerTerminals.manage = function() {

    // deal with any rooms which are having resources evacuated
    try {
        let i;
        const settings = Memory.settings.general.evacuateResources;

        for (i = 0; i < settings.length; i++)
        {
            Game.rooms[settings[i]].evacuateResources();
        }
    }
    catch(ex)
    {
        console.log("ERROR - EVACUATING c " + ex.message);
    }

    // deal with normal terminal operation



    try {


        const vTransferMineral = Memory.settings.general.terminalsDistributeMinerals;
        const vTransferEnergy = Memory.settings.general.terminalsDistributeEnergy;

        // if not transferring anything then skip the rest
        if (vTransferEnergy || vTransferMineral)
        {
            const vExcludedTerminals = Memory.settings.general.terminalsToExclude;

            // rotate between each mineral / resource and check / balance one per tick
            // - each gets balanced once every 40 ticks

            // **  could add logic to prioritise energy distribution to rooms under attack that are low on energy
            // check one resource evergy tick

            const vMineralToCheck = MineralMapping.resourceList()[Game.time % MineralMapping.resourceList().length];

            const vMyTerminals = _.select(Game.structures, (x)=> {return x.objectType() === 'StructureTerminal' &&
                x.isMine() && !(!x.room.controller) &&
                x.room.controller.level >= 6 &&
                vExcludedTerminals.indexOf(x.id) === -1});


            if (vMineralToCheck !== 'energy')
            {
                if (vTransferMineral)
                {
                    //console.log('ManagerTerminals checking mineral ' + vMineralToCheck);

                    // get all terminals that are in rooms that dont use this mineral and have more than 100 of it
                    let vSendingTerminals = _.select(vMyTerminals, (x)=> {
                        return !(!x.store[vMineralToCheck]) && !x.room.usesMineral(vMineralToCheck) && x.store[vMineralToCheck] > 100});

                    // if there are no rooms with junk mineral - look for rooms that have > 5000 of it
                    if (vSendingTerminals.length === 0)
                    {
                        vSendingTerminals = _.select(vMyTerminals, (x)=> {
                            return (x.room.usesMineral(vMineralToCheck) && x.room.totalStoredResource(vMineralToCheck) > 5000)});
                    }

                    // if there are any sending rooms then send from it
                    if (vSendingTerminals.length > 0)
                    {
                        //console.log('ManagerTerminals checking mineral - have potential sender/s ' + vMineralToCheck);

                        let vReceivingTerminals = _.select(vMyTerminals, (x)=> {
                            return x.room.usesMineral(vMineralToCheck) && x.room.totalStoredResource(vMineralToCheck) < 5000});

                        if (vReceivingTerminals.length > 0) {

                            //console.log('ManagerTerminals checking mineral - have potential receiver/s ' + vMineralToCheck);

                            let vLowest = _.select(vReceivingTerminals, (x) => {return !x.store[vMineralToCheck]})[0];

                            // this deals with a failure in above identification of lowest
                            if (!vLowest)
                            {
                                //console.log('ManagerTerminals checking mineral 5 ' + vMineralToCheck);
                                vLowest = _.min(vReceivingTerminals, (x) => {return x.store[vMineralToCheck]});
                            }

                            //console.log('ManagerTerminals checking mineral 5 ' + vMineralToCheck);

                            let vSendingTerminal = _.max(vSendingTerminals, (x)=>{return x.store[vMineralToCheck]});

                            let sendName;

                            try {
                                sendName = vSendingTerminal.room.name;
                            }
                            catch (e){
                                vSendingTerminal = vSendingTerminals[0];
                                sendName = vSendingTerminal.room.name;
                            }

                            //console.log('ManagerTerminals checking mineral 6 ' + vMineralToCheck);

                            if (vLowest.room.name !== sendName)
                            {
                                //console.log('ManagerTerminals checking mineral 7 ' + vMineralToCheck);
                                let vAmount;
                                let vTerAmt = vSendingTerminal.store[vMineralToCheck];

                                //console.log('ManagerTerminals checking mineral 8 ' + vMineralToCheck);


                                // if sending from a room that uses this mineral work out how mcuh can spare.
                                if (vSendingTerminal.room.usesMineral(vMineralToCheck))
                                {
                                    // the total of that resource available in room
                                    let vTotal = vSendingTerminal.room.totalStoredResource(vMineralToCheck);



                                    // if room has < 10000
                                    if (vTotal < 10000)
                                    {
                                        // send the difference between amoount and 5000
                                        vAmount = vTotal - 5000;
                                    }
                                    else // if room has > 10000
                                    {
                                        //send the round 5000
                                        vAmount = 5000;
                                    }
                                    // make sure the terminal has enough to send
                                    if (vAmount > vTerAmt)
                                    {
                                        vAmount = vTerAmt;
                                    }



                                }
                                else  // this is not a room that uses that resource
                                {
                                    if (vTerAmt < 5000)
                                    {
                                        vAmount = vTerAmt;
                                    }
                                    else
                                    {
                                        vAmount = 5000;
                                    }
                                }

                                vSendingTerminal.send(vMineralToCheck, vAmount, vLowest.room.name);
                                //console.log('ManagerTerminals sending ' + vMineralToCheck + ' from ' + vSendingTerminal.room.name + ' to ' + vLowest.room.name);

                            }

                        }
                    }
                    //console.log('ManagerTerminals checking mineral 7 ' + vMineralToCheck);
                } // else not transferring minerals
            }
            else // CHECKING FOR RESOURCE ENERGY
            {
                if (vTransferEnergy)
                {
                    //console.log('ManagerTerminals checking ' + vMineralToCheck);

                    let vAverage = _.sum(vMyTerminals, (x)=> {return x.store[vMineralToCheck]}) / vMyTerminals.length;

                    let vHighest = _.max(vMyTerminals, (x)=>{return x.store[vMineralToCheck]});

                    let vEmpty = _.select(vMyTerminals, (x)=>{return !x.store[vMineralToCheck]});

                    let vLowest;

                    if (vEmpty.length > 0)
                    {
                        vLowest = vEmpty[0];
                    }
                    else
                    {
                        vLowest = _.min(vMyTerminals, (x)=>{return x.store[vMineralToCheck]});
                    }

                    let vAmount = vHighest.store[vMineralToCheck] - vAverage;

                    let vDeficiency = vAverage;

                    if (!(!vLowest.store[vMineralToCheck]))
                    {
                        vDeficiency = vAverage - vLowest.store[vMineralToCheck];
                    }

                    if (vAmount > vDeficiency)
                    {
                        vAmount = vDeficiency;
                    }

                    if (vLowest.storeCapacityUsed() + vAmount > vLowest.storeCapacity)
                    {
                        vAmount = vLowest.storeCapacity - vLowest.storeCapacityUsed();
                    }

                    if (vAmount > 5000)
                    {
                        vHighest.send(vMineralToCheck, vAmount, vLowest.room.name);
                        //console.log('ManagerTerminals sending ' + vMineralToCheck + ' from ' + vHighest.room.name + ' to ' + vLowest.room.name);
                    }
                } // else not transferring energy

            } // end else
        }

    }
    catch (ex) {
        console.log('### EXCEPTION - ManagerTerminals.manage(): ' + ex.message + ' ' + vMineralToCheck);
    }
};
