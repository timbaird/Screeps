

StructureStorage.prototype.hasResource = function(pResource)
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
        console.log('### EXCEPTION - StructureStorage.prototype.hasResource(): ' +  ex.message);
    }
};

StructureStorage.prototype.storeCapacityUsed = function()
{
    try {
        if (!this.store_capacity_used)
        {
            this.store_capacity_used = _.sum(this.store);
        }
        return this.store_capacity_used;
    }
    catch (ex){
        console.log('### EXCEPTION - StructureStorage.prototype.storeCapacityUsed(): ' +  ex.message);
    }
};


StructureStorage.prototype.getLink = function()
{
    try {
        if (!this.storage_link)
        {
            this.storage_link = {link: _.select(this.room.getLinks(), (x)=>{return x.role() == 'storage'})[0]};
        }
        return this.storage_link.link;
    }
    catch (ex){
        console.log('### EXCEPTION - StructureStorage.prototype.getLink(): ' +  ex.message);
    }
};