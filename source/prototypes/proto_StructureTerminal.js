

StructureTerminal.prototype.hasResource = function(pResource)
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
        console.log('### EXCEPTION - StructureTerminal.prototype.hasResource(): ' +  ex.message);
    }
};

StructureTerminal.prototype.storeCapacityUsed = function()
{
    try {
        if (!this.store_capacity_used)
        {
            this.store_capacity_used = _.sum(this.store);
        }
        return this.store_capacity_used;
    }
    catch (ex){
        console.log('### EXCEPTION - StructureTerminal.prototype.storeCapacityUsed(): ' +  ex.message);
    }
};


