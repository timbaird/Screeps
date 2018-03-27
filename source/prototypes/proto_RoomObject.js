
RoomObject.prototype.isMine = function()
{
    try {

        const vRefreshInterval = 100;

        const vMem = this.getMemory();

        if (!vMem.is_mine || Game.time > vMem.is_mine.lastUpdate + vRefreshInterval)
        {
            let vIsMine = false;

            // this is to catch anything with an owner, or any owned structures even if they dont surrently have an owner.
            if (!(!this.owner) || this instanceof OwnedStructure) // creeps , owned structures , constuction site etc.
            {
                if (!(!this.owner) && Memory.settings.general.usernames.indexOf(this.owner.username) > -1)
                {
                    vIsMine = true;
                }

            }
            else // is not an owned sturcture and doesn't have an owner
            {
                // is it in a room I own, reserver, have signed or am working in..... - with exclusion list
                if (this.room.isMyRoom() && this.objectType() !== 'StructurePortal')
                {
                    vIsMine = true;
                }
            }

            vMem.is_mine = {lastUpdate: Game.time, value: vIsMine}
        }

        return vMem.is_mine.value;

    }
    catch (ex){
        console.log('### EXCEPTION - RoomObject.prototype.isMine(): ' +  ex.message);
    }
};

RoomObject.prototype.isHostile = function()
{
    try {
        const vRefreshInterval = 500;

        const vMem = this.getMemory();

        if (!vMem.is_hostile || Game.time > vMem.is_hostile.lastUpdate + vRefreshInterval || true )
        {
            let vIsHostile = true;

            if (this.isMine())
            {
                // if it is mine then it is automatically not hostiles
                vIsHostile = false;
            }
            else // is not mine
            {
                const vAllies = Memory.settings.general.allies;
                const vPeace = Memory.settings.general.peace;


                // check if the object is owned by an ally or player with a peace treaty
                if (!(!this.owner))
                {
                    if (!(!this.owner) &&
                        (vAllies.indexOf(this.owner.username) > -1 ||
                        vPeace.indexOf(this.owner.username) > -1))
                    {

                        vIsHostile = false;
                    }
                }
                else // object doesn't have an owner
                {

                    if (!(!this.room.controller))
                    {
                        // check if it is in a room owned by a friend or ally
                        if (this.room.controller.level > 0)
                        {
                            if (vAllies.indexOf(this.room.controller.owner.username) > -1 ||
                                vPeace.indexOf(this.room.controller.owner.username) > -1)
                            {
                                vIsHostile = false;
                            }
                        }
                        else  // controller is level 0
                        {
                            // check if it is in a room reserved by a friend or ally
                            if (!(!this.room.controller.reservation) &&
                                (vAllies.indexOf(this.room.controller.reservation.username) > -1 ||
                                vPeace.indexOf(this.room.controller.reservation.username) > -1 ))
                            {
                                vIsHostile = false;
                            }
                            // check if it is in a room signed by a friend or ally
                            else if (!(!this.room.controller.sign) &&
                                (vAllies.indexOf(this.room.controller.sign.username) > -1 ||
                                vPeace.indexOf(this.room.controller.sign.username) > -1) )
                            {
                                vIsHostile = false;
                            }
                        }
                    }
                }
            }
            vMem.is_hostile = {lastUpdate: Game.time, value: vIsHostile}
        }
        return vMem.is_hostile.value
    }
    catch (ex){
        console.log('### EXCEPTION - Structure.prototype.isHostile(): ' +  ex.message);
    }
};