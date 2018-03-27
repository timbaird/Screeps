
// this gets overridden in StrcutureWall and StructureRampart

Structure.prototype.needsRepair = function()
{
    try {

        if (!this.needs_repair)
        {
            this.needs_repair = {value:this.hits < this.hitsMax};
        }
        return this.needs_repair.value;
    }
    catch (ex){
        console.log('### EXCEPTION - Structure.prototype.needsRepair(): ' +  ex.message);
    }
};

Structure.prototype.needsEnergy = function()
{
    try {
        if (!this.needs_energy)
        {
            if (!(!this.store))
            {
                this.needs_energy = {value: (_.sum(this.store) <  this.storeCapacity)};
            }
            else
            {
                try {
                    this.needs_energy = {value: (this.energy < this.energyCapacity)}
                }
                catch (ex)
                {
                    this.needs_energy = {value: false}
                }
            }
        }

        return this.needs_energy.value;
    }
    catch (ex){
        console.log('### EXCEPTION - Structure.prototype.needsEnergy(): ' +  ex.message);
    }
};