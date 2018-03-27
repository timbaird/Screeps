
/*
Mineral.prototype.sourceLink = function ()
{
    return undefined;
};
*/



Mineral.prototype.hasExtractor = function ()
{
    try
    {
        if (!this.getMemory().has_extractor || Game.time > this.getMemory().has_extractor.lastUpdate + 1000)
        {
            this.getMemory().has_extractor = {value: (_.sum(Game.structures,
                                                        (x)=>{return x.objectType() === 'StructureExtractor' &&
                                                        x.room.name === this.room.name}) === 1),
                                                lastUpdate: Game.time};
        }
        return this.getMemory().has_extractor.value;
    }
    catch (ex)
    {
        console.log('### EXCEPTION - Mineral.prototype.hasExtractor(): ' +  ex.message);
    }
};

