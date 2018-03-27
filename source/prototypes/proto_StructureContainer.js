
StructureContainer.prototype.hasResource = function(pResource)
{
    try {
        if (!this.has_resource)
        {
            this.has_resource = {};
        }

        if (!this.has_resource[pResource])
        {
            this.has_resource[pResource] = this.store[pResource] > 0;
        }
        return this.has_resource[pResource];

    }
    catch (ex){
        console.log('### EXCEPTION - StructureContainer.prototype.hasResource(): ' +  ex.message);
    }
};


StructureContainer.prototype.role = function ()
{
    try {
        let vRefreshInterval = 50;

        // if bin hasn't been identified yet
        if (!this.getMemory().role || Game.time > this.getMemory().role.lastUpdate + vRefreshInterval)
        {
            // if the room has a controller, and no storage or storage is not controller_bin
            // and container is in range of controller

            if (!(!this.room.controller) && !this.room.storage &&
                this.pos.getRangeTo(this.room.controller) < 5)
            {
                this.getMemory().role = {lastUpdate: Game.time, value: 'controller_bin'};
            }
            // either room doesnt have controller or not in range
            else if (this.pos.getRangeTo(this.pos.findClosestByRange(this.room.getSources())) < 4)
            {
                this.getMemory().role = {lastUpdate: Game.time, value: 'source_bin'};
            }
            else
            {
                this.getMemory().role = {lastUpdate: Game.time, value: 'none'};
            }
        }

        return this.getMemory().role.value;
    }
    catch (ex){
        console.log('### EXCEPTION - StructureContainer.prototype.role(): ' +  ex.message);
    }
};
