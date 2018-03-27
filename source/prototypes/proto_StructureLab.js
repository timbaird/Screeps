


StructureLab.prototype.labMineralType = function()
{
    try {

        if (!(!Memory.settings.labs[this.room.name]) && !(!Memory.settings.labs[this.room.name][this.id]))
        {
            return Memory.settings.labs[this.room.name][this.id].mineral;
        }
        else
        {

            return 'bollocks';
        }

    }
    catch (ex){
        console.log('### EXCEPTION - StructureLab.prototype.resourceType(): ' +  ex.message + ' ' + this);
    }
};

StructureLab.prototype.role = function()
{
    try {

        if (!(!Memory.settings.labs[this.room.name]) && !(!Memory.settings.labs[this.room.name][this.id]) )
        {
            return Memory.settings.labs[this.room.name][this.id].role;
        }
        else
        {
            return undefined;
        }
    }
    catch (ex){
        console.log('### EXCEPTION - StructureLab.prototype.role(): ' +  ex.message);
    }
};

StructureLab.prototype.hasResource = function(pResource)
{
    try {

        if (!this.has_resource)
        {
            this.has_resource = {};
        }

        if (!this.has_resource[pResource])
        {
            this.has_resource[pResource] = (this.mineralType === pResource);
        }

        return this.has_resource[pResource];
    }
    catch (ex){
        console.log('### EXCEPTION - StructureLab.prototype.hasResource(): ' +  ex.message);
    }
};