if (!Memory.objectMemory)
{
	Memory.objectMemory = {};
}

function createMemory(pObject)
{
    try {
        if (!Memory.objectMemory[pObject.objectType()])
		{
            Memory.objectMemory[pObject.objectType()] = {};
        }

        if (!Memory.objectMemory[pObject.objectType()][pObject.id])
		{
            Memory.objectMemory[pObject.objectType()][pObject.id] = {};
        }
    }
    catch (ex){
        console.log('### EXCEPTION - createMemory(): ' +  ex.message);
    }
}

Room.prototype.getMemory = function()
{
    try {
        if (!this.memory)
        {
            createMemory(this);
            this.memory = Memory.objectMemory[this.objectType()][this.id];
        }
        return this.memory;
    }
    catch (ex){
        console.log('### EXCEPTION - Room.prototype.getMemory: ' +  ex.message);
    }
};

RoomObject.prototype.getMemory = function()
{
    try {
        if (!this.memory)
		{
            createMemory(this);
            this.memory = Memory.objectMemory[this.objectType()][this.id];
        }
        return this.memory;
    }
    catch (ex){
        console.log('### EXCEPTION - RoomObject.prototype.getMemory: ' +  ex.message);
    }
};

// this is seperated from room object because checking (!this.memory) on creeps owned by others
// generates an error about not being able to access memory on other peoples creeps
Creep.prototype.getMemory = function()
{
    try {
        if (!this.creep_memory) {

            // if it is one of my creeps then it already has memory
            // CANNOT USE isMine() here as creates infinite loop
            if (Memory.settings.general.usernames.indexOf(this.owner.username) > -1)
			{
                this.creep_memory = this.memory;
            }
            // if it is not one of my creesp then check if a memory has
            // has been already created for it
            else if (!Memory.objectMemory[this.objectType()] || !Memory.objectMemory[this.objectType()][this.id])
			{
                createMemory(this);
                this.creep_memory = Memory.objectMemory[this.objectType()][this.id];
            }
            // the memory has already been created for this creep
            else
			{
                this.creep_memory = Memory.objectMemory[this.objectType()][this.id];
            }
        }
        return this.creep_memory;
    }
    catch (ex){
        console.log('### EXCEPTION - Creep.prototype.getMemory: ' +  ex.message);
    }
};


// this is seperated from room object because checking (!this.memory) on creeps owned by others
// generates an error about not being able to access memory on other peoples creeps
StructureSpawn.prototype.getMemory = function()
{
    try {
        if (!this.spawn_memory) {

            // if it is one of my creeps then it already has memory
            // CANNOT USE isMine() here as creates infinite loop
            if (Memory.settings.general.usernames.indexOf(this.owner.username) > -1)
            {
                this.spawn_memory = this.memory;
            }
            // if it is not one of my creesp then check if a memory has
            // has been already created for it
            else if (!Memory.objectMemory[this.objectType()] || !Memory.objectMemory[this.objectType()][this.id])
            {
                createMemory(this);
                this.spawn_memory = Memory.objectMemory[this.objectType()][this.id];
            }
            // the memory has already been created for this creep
            else
            {
                this.spawn_memory = Memory.objectMemory[this.objectType()][this.id];
            }
        }
        return this.spawn_memory;
    }
    catch (ex){
        console.log('### EXCEPTION -StructureSpawn.prototype.getMemory: ' +  ex.message);
    }
};


