

Source.prototype.assignedMiners = function()
{
    try {
        // not saved as miners may be allocated // dealocated in a single tick and wnt this to be recalculated
        // every time it is called.
        return _.select(Game.creeps, (x)=>{return   x.targetedForJob() === 'mineEnergy' &&
                                                    x.targetGetId() === this.id &&
                                                    x.ticksToLive > x.respawnTimeBuffer();});

    }
    catch (ex){
        console.log('### EXCEPTION - Source.prototype.assignedMiners(): ' +  ex.message);
    }
};

Source.prototype.needsMining = function()
{
    try {
        if (!this.needs_mining)
        {
            this.needs_mining = {value: (this.energy > 0 &&
                                         this.binsNeedingEnergy().length > 0 &&
                                         this.assignedMiners.length < this.numAccessibleSpaces())};
        }

        return this.needs_mining.value;
    }
    catch (ex){
        console.log('### EXCEPTION - Source.prototype.needsMining(): ' +  ex.message);
    }
};

Source.prototype.bins = function()
{
    try {
        if (!this.source_bins)
        {
            this.source_bins = this.room.find(FIND_STRUCTURES,
                    { filter: (x)=>{return    (x.objectType() === 'StructureContainer' ||
                                                    x.objectType() === 'StructureLink') &&
                                                    x.isMine() &&
                                                    x.pos.getRangeTo(this) < 4}});
        }

        return this.source_bins;
    }
    catch (ex){
        console.log('### EXCEPTION - Source.prototype.bins(): ' +  ex.message);
    }
};

Source.prototype.binsNeedingEnergy = function()
{
    try {
        if (!this.source_bins_needing_energy)
        {
            this.source_bins_needing_energy = _.select(this.bins(), (x)=>{return x.needsEnergy()});
        }

        return this.source_bins_needing_energy;
    }
    catch (ex){
        console.log('### EXCEPTION - Source.prototype.bins(): ' +  ex.message);
    }
};

Source.prototype.numAccessibleSpaces = function()
{
    try {
        if (!this.getMemory().num_accessible_spaces)
        {
            let vNum = 0;

            let vTerrain = Game.map.getTerrainAt(this.pos.x + 1, this.pos.y, this.room.name);

            //if (vTerrain != "terrain wall")
            if (vTerrain !== "wall")
            {
                vNum ++;
            }

            vTerrain = Game.map.getTerrainAt(this.pos.x + 1, this.pos.y + 1, this.room.name);

            //if (vTerrain != "terrain wall")
            if (vTerrain !== "wall")
            {
                vNum ++;
            }

            vTerrain = Game.map.getTerrainAt(this.pos.x, this.pos.y + 1, this.room.name);

            //if (vTerrain != "terrain wall")
            if (vTerrain !== "wall")
            {
                vNum ++;
            }

            vTerrain = Game.map.getTerrainAt(this.pos.x - 1, this.pos.y + 1, this.room.name);

            //if (vTerrain != "terrain wall")
            if (vTerrain !== "wall")
            {
                vNum ++;
            }

            vTerrain = Game.map.getTerrainAt(this.pos.x + 1, this.pos.y, this.room.name);

            //if (vTerrain != "terrain wall")
            if (vTerrain !== "wall")
            {
                vNum ++;
            }

            vTerrain = Game.map.getTerrainAt(this.pos.x - 1, this.pos.y - 1, this.room.name);

            //if (vTerrain != "terrain wall")
            if (vTerrain !== "wall")
            {
                vNum ++;
            }

            vTerrain = Game.map.getTerrainAt(this.pos.x, this.pos.y - 1, this.room.name);

            //if (vTerrain != "terrain wall")
            if (vTerrain !== "wall")
            {
                vNum ++;
            }

            vTerrain = Game.map.getTerrainAt(this.pos.x + 1, this.pos.y - 1, this.room.name);

            //if (vTerrain != "terrain wall")
            if (vTerrain !== "wall")
            {
                vNum ++;
            }

            this.getMemory().num_accessible_spaces = vNum;
        }

        return this.getMemory().num_accessible_spaces;
    }
    catch (ex){
        console.log('### EXCEPTION - Source.prototype.bins(): ' +  ex.message);
    }
};