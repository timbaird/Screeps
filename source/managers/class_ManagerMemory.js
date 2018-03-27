
function ManagerMemory(){
    console.log('### MemoryManager Class contains only static methods, no need to instantiate');
}

ManagerMemory.manageCreepMemory = function() {
    try {
        const vCreepMem = Memory.creeps;
        let vName;
        for (vName in vCreepMem) {
            if (vCreepMem.hasOwnProperty(vName) && !Game.creeps[vName]) {
                delete Memory.creeps[vName];
            }
        }

        let vCreeps = Memory.objectMemory.Creep;
        let creepId;
        let vCreep;
        for (creepId in vCreeps) {
            if (vCreeps.hasOwnProperty(creepId))
            {
                vCreep = Game.getObjectById(creepId);

                if (!vCreep) {
                    delete Memory.objectMemory.Creep[creepId];
                }
            }
        }
    }
    catch (ex) {
        console.log('### EXCEPTION - MemoryManager.manageCreepMemory(): ' + ex.message);
    }
};
