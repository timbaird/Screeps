
StructureExtension.prototype.needsEnergy = function()
{
    try {

        if (!this.needs_energy)
        {
            this.needs_energy = this.energyCapacity > this.energy;
        }
        return this.needs_energy;

    }
    catch (ex){
        console.log('### EXCEPTION - StructureExtension.prototype.needsEnergy(): ' +  ex.message);
    }
};

