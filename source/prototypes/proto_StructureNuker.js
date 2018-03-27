

StructureNuker.prototype.needsEnergy = function()
{
    try {

        if (!this.needs_energy)
        {
            this.needs_energy = this.energyCapacity > this.energy;
        }
        return this.needs_energy;

    }
    catch (ex){
        console.log('### EXCEPTION - StructureNuker.prototype.needsEnergy(): ' +  ex.message);
    }
};


// these are added so nukers can fit in with the same mineral refilling protocol as labs

StructureNuker.prototype.labMineralType = function()
{
    try {

        return 'G';
    }
    catch (ex){
        console.log('### EXCEPTION - StructureNuker.prototype.resourceType(): ' +  ex.message + ' ' + this);
    }
};

StructureNuker.prototype.role = function()
{
    try {

        return 'input'
    }
    catch (ex){
        console.log('### EXCEPTION - StructureNuker.prototype.role(): ' +  ex.message);
    }
};

//StructureNuker.prototype.hasResource = function(pResource)
StructureNuker.prototype.hasResource = function()
{
    try {

        return false;
    }
    catch (ex){
        console.log('### EXCEPTION - StructureNuker.prototype.hasResource(): ' +  ex.message);
    }
};