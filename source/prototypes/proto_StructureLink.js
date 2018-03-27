
/*
StructureLink.prototype.energyDirection = function (pNewDirection = false)
{
    try {

        // getting the diretcion
        if (!pNewDirection)
        {
            if (!this.getMemory().energy_direction)
            {

                if (['input_bin','source_bin'].indexOf(this.role()) > -1 )
                {
                    this.getMemory().energy_direction = 'input';
                }
                else
                {
                    this.getMemory().energy_direction = 'output';
                }
            }

            return this.getMemory().energy_direction;

        }
        else // setting the direction
        {
            this.getMemory().energy_direction = pNewDirection;
            return this.getMemory().energy_direction;
        }
    }
    catch (ex){
        console.log('### EXCEPTION - StructureLink.prototype.energyDirection(): ' +  ex.message);
    }
};
*/

/*
StructureLink.prototype.energyTarget = function ()
{
    try {

        if (this.energyDirection() === 'input')
        {
           return 0;
        }
        else if (this.energyDirection() === 'output')
        {
            return 800;
        }
        else // mixed
        {
            return 400;
        }
    }
    catch (ex){
        console.log('### EXCEPTION - StructureLink.prototype.energyTarget(): ' +  ex.message);
    }
};
*/

// this allows this to be called on storages, terminals and links alike.
StructureLink.prototype.storeCapacityUsed = function()
{
    try {
        if (!this.store_capacity_used)
        {
            this.store_capacity_used = this.energy;
        }
        return this.store_capacity_used;
    }
    catch (ex){
        console.log('### EXCEPTION - StructureLink.prototype.storeCapacityUsed(): ' +  ex.message);
    }
};

StructureLink.prototype.role = function()
{
    try {
        if (!this.x_role)
        {
            if (!this.getMemory().x_role)
            {
                if (!(!this.room.storage) && this.pos.getRangeTo(this.room.storage) < 5) {
                    this.getMemory().x_role = 'storage';
                }

                else if (!(!this.room.controller) && this.pos.getRangeTo(this.room.controller) < 5) {
                    this.getMemory().x_role = 'controller';
                }
                else {
                    this.getMemory().x_role = 'none';
                }
            }

            this.x_role = this.getMemory().x_role;
        }
        return this.x_role;
    }
    catch (ex){
        console.log('### EXCEPTION - StructureLink.prototype.role(): ' +  ex.message);
    }
};


StructureLink.prototype.hasResource = function(pResource)
{
    try {

        return (pResource === RESOURCE_ENERGY && this.energy > 0);
    }
    catch (ex){
        console.log('### EXCEPTION - StructureLink.prototype.hasResource(): ' +  ex.message);
    }
};