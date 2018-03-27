
/*
StructureTower.prototype.getSettings = function()
{
    try {


        if (!this.settings)
        {
            this.settings = Memory.settings.tower[this.id] || Memory.settings.tower['default'];
        }

        return this.settings;
    }
    catch (ex){

    }
};
*/

StructureTower.prototype.operate = function()
{
    try
    {
        if (!(!this.room.getTowerTarget()))
        {
            this.attack(this.room.getTowerTarget());
        }
        else if (!(!this.room.getExistingCreepsWounded()[0]))
        {
            this.heal(this.room.getExistingCreepsWounded()[0]);
        }
        else if (this.energy > this.energyCapacity * 0.8)
        {
            const vSite = _.min(this.room.getDefenceRepairSites(), (x)=>{return x.hits});

            if(this.room.energyAvailable === this.room.energyCapacityAvailable || vSite.hits < 2000)
            {
                this.repair(vSite);
            }

        }
    }
    catch (ex){
        console.log('### EXCEPTION - StructureTower.prototype.operate: ' +  ex.message);
    }
};



