

function Work()
{
        console.log('### Work Class contains only static methods, no need to instantiate');
}

Work.doWork = function(pCreep)
{
    try {
            if (!pCreep.targetGet() && !pCreep.isFull() || !pCreep.targetGive() && pCreep.isFull())
            {
                Work.goToWaitSpot(pCreep);
                if(pCreep.hasBodyPart(HEAL) && pCreep.hits < pCreep.maxHits)
                {
                    pCreep.heal(pCreep);
                }
            }
            else
            {
                if (pCreep.isFull()) {
                    Work.giveEnergy(pCreep);
                }
                else {
                    Work.getEnergy(pCreep);
                }
            }
        }
    catch (ex){
            console.log('### EXCEPTION - Work.doWork(): ' +  ex.message);
        }
};

Work.goToWaitSpot = function(pCreep)
{
        // if a flag e.g W8N3_wait then go to that, otherwise go within 3 of cotroller.

};

Work.giveEnergy = function(pCreep)
{
    try {

            let vResult;

            if (pCreep.hasGiveTarget())
            {
                vResult = Work.baseGiveEnergyActions(pCreep);

                if (vResult === ERR_NOT_IN_RANGE)
                {
                    pCreep.moveToPos(pCreep.targetGive().pos);
                    vResult = Work.baseGiveEnergyActions(pCreep);

                    if (vResult === ERR_NOT_IN_RANGE)
                    {
                        pCreep.heal(pCreep);
                    }
                }

                if ([ERR_INVALID_TARGET, ERR_FULL, ERR_NOT_ENOUGH_ENERGY].indexOf(vResult) > -1)
                {
                    pCreep.deallocate('give');
                }
                else if (vResult === ERR_NO_BODYPART)
                {
                    pCreep.say('No Bodypart');
                }
            }
            else if(pCreep.hasBodyPart(HEAL))
            {
                pCreep.heal(pCreep);
            }
        }
    catch (ex){
            console.log('### EXCEPTION - Work.giveEnergy(): ' +  ex.message);
        }
};

Work.baseGiveEnergyActions = function(pCreep)
{
    try {

            let vResult;

            const vType = pCreep.targetGive().objectType();

            const vDepositTargets = ['StructureLink', 'StructureStorage', 'StructureTerminal', 'StructureContainer',
                                    'StructureLab', 'StructureSpawn', 'StructureExtension', 'StructureTower',
                                    'StructureNuker', 'StructurePowerSpawn'];

            // construction sites
            if (vType === 'ConstructionSite')
            {
                if (pCreep.targetGive().isMine())
                {
                    vResult = pCreep.build(pCreep.targetGive());

                    if (vResult === ERR_RCL_NOT_ENOUGH) {
                        pCreep.targetGive().remove();
                    }
                }
                else
                {
                    vResult = pCreep.moveTo(pCreep.targetGive());
                }

            }

            // sites needing repair
            else if (
                    // it is a structure and needs repair
                    vType.substring(0, 9) === 'Structure' &&
                    pCreep.targetGive().isMine() &&
                    pCreep.targetGive().hits < pCreep.targetGive().hitsMax &&
                    pCreep.hasBodyPart(WORK))
            {
                vResult = pCreep.repair(pCreep.targetGive());
            }

            else if (
                // it is a structure and needs repair
            vType.substring(0, 9) === 'Structure' &&
            vType !== 'StructureKeeperLair' &&
            (!pCreep.targetGive().isMine() || vType === 'StructureWall') &&
             pCreep.hasBodyPart(WORK))
            {
                vResult = pCreep.dismantle(pCreep.targetGive());
            }

            else if (
                // it is a structure and needs repair
            vType.substring(0, 9) === 'Structure' &&
            vType !== 'StructureKeeperLair' &&
            (!pCreep.targetGive().isMine() || vType === 'StructureWall')&&
            pCreep.hasBodyPart(ATTACK))
            {
                vResult = pCreep.attack(pCreep.targetGive());
            }

            // if it is a deposit target
            else if (vDepositTargets.indexOf(vType) > -1 && pCreep.targetGive().isMine())
            {
                vResult = pCreep.transfer(pCreep.targetGive(), pCreep.cargoType());

                // make sure creep doesn't keep refilling single tower
                // but keeps on re looking for the next emptiest after each refill
                if (vType === 'StructureTower' && vResult === 0)
                {
                    pCreep.deallocate('give');
                }

                // if exporters are targetted at a link but the link is full
                // re-target them at the rooms storage
                if (pCreep.targetedForJob() === 'export' &&
                    vResult === ERR_FULL &&
                    pCreep.targetGive().objectType() === 'StructureLink' &&
                    !pCreep.room.storage === false)
                {
                    vResult = pCreep.targetGive(pCreep.room.storage);
                }

            }

            else if (vType === 'StructureKeeperLair')
            {
                pCreep.moveToPos(pCreep.targetGive().pos);

                if (pCreep.hasBodyPart(HEAL) && pCreep.hits < pCreep.hitsMax)
                {
                    pCreep.heal(pCreep);
                }
            }

            else if (vType === 'StructureController')
            {
                if (pCreep.targetGive().level === 0)
                {
                    if (pCreep.targetedForJob() === 'claim')
                    {
                        vResult = pCreep.claimController(pCreep.targetGive());
                    }
                    else if (pCreep.targetedForJob() === 'reserve')
                    {
                        vResult = pCreep.reserveController(pCreep.targetGive());
                    }
                }
                else if (pCreep.targetGive().isMine() && pCreep.hasBodyPart(WORK))
                {
                    vResult = pCreep.upgradeController(pCreep.targetGive());
                }
                else if (pCreep.hasBodyPart(CLAIM))
                {
                    vResult = pCreep.attackController(pCreep.targetGive());
                }
            }
            
            else if (vType === 'Creep')
            {
                const vRangeToTarget = pCreep.pos.getRangeTo(pCreep.targetGive());

                // healing - this should also capture self healing
                if (pCreep.hasBodyPart(HEAL) && pCreep.targetGive().isMine())
                {
                    if (pCreep.targetGive().hits < pCreep.targetGive().hitsMax)
                    {
                        vResult = pCreep.heal(pCreep.targetGive());

                        if (vResult === ERR_NOT_IN_RANGE)
                        {
                            vResult = pCreep.rangedHeal(pCreep.targetGive());
                        }

                        if (vResult === ERR_NOT_IN_RANGE)
                        {
                            pCreep.heal(pCreep);
                        }
                    }

                    // stay close to my heal target even if they are healed.
                    if (vRangeToTarget > 1)
                    {
                        pCreep.moveTo(pCreep.targetGive());
                    }
                }
                // if the creep is targetted to itself and doesn't need healing - sign to drop cargo
                else if (pCreep.targetGiveId() === pCreep.id)
                {
                    vResult = pCreep.drop(pCreep.cargoType());
                    pCreep.deallocate('give');
                }

                // if the creep is targetted at a hostile creep
                else if (pCreep.targetGive().isHostile())
                {
                    if (pCreep.targetGive().owner.username === 'SourceKeeper')
                    {

                        if (vRangeToTarget > 1)
                        {
                            if (vRangeToTarget > 5 && vRangeToTarget < 8 && pCreep.hits < pCreep.hitsMax)
                            {
                                // small heal stop until full strength
                                pCreep.say('heal stop');
                                vResult = OK;
                                pCreep.heal(pCreep);
                            }
                            else // not wounded in wait zone
                            {
                                vResult = ERR_NOT_IN_RANGE;

                                if (pCreep.hits < pCreep.hitsMax)
                                {
                                    pCreep.heal(pCreep);
                                }
                            }
                        }
                        else // in range of source keeper
                        {
                            //  let the source keepers attack rebound on itself and keep healing myslef
                            if (pCreep.hits < pCreep.hitsMax && pCreep.targetGive().getActiveBodyparts(ATTACK) > 0)
                            {
                                pCreep.heal(pCreep);
                                vResult = OK;
                            }
                            else // when the source keeper runs out of active attack body parts - finish  him off
                            {
                                vResult = pCreep.attack(pCreep.targetGive());
                            }
                        }
                    }
                    else  // not a source keeper
                    {
                        let vVector = 'none';
                        let vAttackResult = 'none';

                        // try and attack first
                        if (pCreep.hasBodyPart(ATTACK))
                        {
                            vResult = pCreep.attack(pCreep.targetGive());

                            vAttackResult = vResult; // this vAttackResult will only be set if the creep has ATTACK body part

                            if (vResult === OK)
                            {
                                vVector = 'ATTACK';
                            }
                        }

                        // if the creep has ranged attack, and either doesn't have attack, or the attack failed
                        if (pCreep.hasBodyPart(RANGED_ATTACK) && (!pCreep.hasBodyPart(ATTACK) || vResult !== OK))
                        {
                            let vNumEnemyInRange =_.sum(pCreep.room.hostileCreepsAll(), (x)=>{return pCreep.pos.getRangeTo(x) < 4});

                            if (vNumEnemyInRange > 1)
                            {
                                vResult = pCreep.rangedMassAttack();
                            }
                            else
                            {
                                vResult = pCreep.rangedAttack(pCreep.targetGive());
                            }

                            if (vResult === OK)
                            {
                                vVector = 'RANGED_ATTACK';
                            }
                        }

                        // if a creep is in the fight and can heal then heal itself if needed -
                        // need to re work this for when other players ceeps don't attack me
                        if (pCreep.hasBodyPart(HEAL))
                        {
                            // this overrides attack, so need to work this out
                            vVector === 'ATTACK'?pCreep.rangedHeal(pCreep):pCreep.heal(pCreep);
                        }

                        // if a creep has ATTACK, favour that and try and close - even if also has ranged attack
                        if (vAttackResult !== 'none') // i.e. the hAS attack and so we want to focus on that result for closing with enemy etc.
                        {
                            vResult = vAttackResult;
                        }
                    }
                }

                if (vResult === ERR_NOT_IN_RANGE &&
                    pCreep.targetGive().owner.username === 'Source Keeper' &&
                    pCreep.hits < pCreep.maxHits &&
                    pCreep.pos.getRangeTo(pCreep.targetGive()) < 8)
                {
                    // change the error not in range result to ok until the creep has healed up.
                    pCreep.say('heal stop');
                    vResult = OK;
                }
            }

            else if (vType === 'StructurePowerBank')
            {
                if (pCreep.hits > pCreep.hitsMax * 0.75)
                {
                    pCreep.say('POWER TO');
                    vResult = pCreep.attack(pCreep.targetGive());
                }
                else
                {
                    pCreep.say('THE PEOPLE');
                }
            }


            return vResult;
        }
    catch (ex){
            console.log('### EXCEPTION - Work.baseGiveEnergyActions(): ' +  ex.message);
        }
};

Work.getEnergy = function(pCreep)
{
    try {
            let vResult = undefined;

            if (pCreep.hasGetTarget())
            {
                vResult = Work.baseGetEnergyActions(pCreep);

                if (vResult === ERR_NOT_IN_RANGE)
                {
                    pCreep.moveToPos(pCreep.targetGet().pos);
                    vResult = Work.baseGetEnergyActions(pCreep);
                }

                if ([ERR_INVALID_TARGET, ERR_FULL, ERR_NOT_ENOUGH_ENERGY, ERR_NO_PATH].indexOf(vResult) > -1)
                {
                    pCreep.deallocate('get');
                }
            }
            else if(pCreep.hasBodyPart(HEAL))
            {
                pCreep.heal(pCreep);
            }

        }
    catch (ex){
            console.log('### EXCEPTION - Work.getEnergy(): ' +  ex.message);
        }
};

Work.baseGetEnergyActions = function(pCreep)
{
    try {

        let vResult = false;

            if (pCreep.hasGetTarget()) {

                let vType = pCreep.targetGet().objectType();

                let vWithdrawTargets = ['StructureLink', 'StructureStorage', 'StructureTerminal', 'StructureContainer', 'StructureLab'];

                // if it is dropped resource pick it up
                if (vType === 'Resource')
                {
                    vResult = pCreep.pickup(pCreep.targetGet());
                }
                else if (vType === 'Source' || vType === 'Mineral')
                {
                    vResult = pCreep.harvest(pCreep.targetGet());
                }
                else if (vWithdrawTargets.indexOf(vType) > -1 &&
                            (pCreep.targetGet().isMine() || // this makes sure none of mine get destroyed
                            (pCreep.targetGet().isHostile() && pCreep.targetGet().storeCapacityUsed() > 0)))
                {

                    if (pCreep.targetGet().hasResource(pCreep.resourceToWithdraw()))
                    {
                        vResult = pCreep.withdraw(pCreep.targetGet(), pCreep.resourceToWithdraw());
                        // reset creeps resource to withdraw
                        pCreep.resourceToWithdraw(null);
                    }
                    else
                    {
                        // return a not enough energy result which will force a deallocation.
                        vResult = ERR_NOT_ENOUGH_ENERGY;
                    }
                }
                else if (vType.substring(0, 9) === 'Structure' && pCreep.targetGet().isHostile())
                {
                    if (pCreep.hasBodyPart(WORK))
                    {
                        vResult = pCreep.dismantle(pCreep.targetGet());
                    }
                    else  // if creep doesnt have work, it can't dismantle
                    {
                        // return an invalid target result which will force a deallocation
                        vResult = ERR_INVALID_TARGET;
                    }
                }
            }

            return vResult;
        }
    catch (ex)
    {
        console.log('### EXCEPTION - Work.baseGetEnergyActions(): ' +  ex.message + ' ' + pCreep + ' ' + pCreep.role() + ' ' )
    }
};