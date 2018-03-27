

StructureObserver.prototype.canObserve = function(pRoomName)
{
    try
    {
        if (!this.getMemory().can_observe)
        {
            this.getMemory().can_observe = {}
        }

        if (!this.getMemory().can_observe[pRoomName])
        {
            this.getMemory().can_observe[pRoomName] = {value: this.observeRoom(pRoomName) == OK}
        }

        return this.getMemory().can_observe[pRoomName].value;
    }
    catch (ex)
    {
        console.log('### EXCEPTION - StructureObserver.prototype.canObserve(): ' +  ex.message);
    }
}


