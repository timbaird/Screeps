
StructureWall.prototype.needsRepair = function()
{
    try {

        if (!this.needs_repair)
        {
            this.needs_repair = {value:this.hits < Memory.settings.room[this.room.name].defence_repair_threshold};
        }
        return this.needs_repair.value;
    }
    catch (ex){
        console.log('### EXCEPTION - StructureWall.prototype.needsRepair(): ' +  ex.message);
    }
};