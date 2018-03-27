module.exports.loop = function () {

	try {

        //updateSettings();


		console.log('  ');
        const vMod = Game.time % 10;
        console.log('######   TICK ' + Game.time + ' ' + vMod + ' ######');

        ManagerTowers.manage();
        ManagerCreeps.manage();

        switch (vMod)
        {
            case 1:
                ManagerMemory.manageCreepMemory();
                // to add ManagerMemory.manageObjectMemory();
                break;

            case 2:

                if (!Memory.settings || Memory.settings.lastUpdated !== update_datetime)
                {
                    updateSettings(); // should only happen if new gulp build run
                }
                break;

            case 3:
                ManagerSpawn.manageSpawnQueues();
                break;

            case 4:
                ManagerLinks.manage();
                break;

            case 5:
                ManagerLabs.manage();
                break;

            case 6:
                ManagerSpawn.manageSpawnOperation();
                break;

            case 7:
                break;

            case 8:
                break;

            case 9:
                break;

            case 0:

                const vBigMod = Game.time%100;

                switch (vBigMod)
                {
                    case 0:
                        console.log('!! ENERGY SUMMARY');
                        const vStores = _.select(Game.structures, (x)=>{return (x.objectType() === 'StructureStorage' || x.objectType() === 'StructureTerminal')
                            && x.isMine() && !(!x.store.energy)});
                        const vNewTotal = _.sum(vStores, (x)=>{return x.store.energy});
                        console.log('total energy - old total: ' + Memory.old_energy_total + ' new total: ' + vNewTotal + ' difference: ' + (vNewTotal - Memory.old_energy_total).toString());
                        Memory.old_energy_total = vNewTotal;
                        break;

                    case 50:
                        console.log('!! BRINGING MEMORY BACK INTO CONTROL');
                        updateSettings();
                        break;
                    default:

                }
                break;

            default:
        }

        ManagerTerminals.manage(); // checks one mineral per tick
        ManagerCPU.manage();

        // so I can call this from the console
        Game.resetCPUStats = function()
        {
            try {
                ManagerCPU.memorySetUp();
                return '*** CPU STATS RESET *****';
            }
            catch (ex) {
                console.log('### EXCEPTION -  resetCPUStats(): ' + ex.message);
            }
        };

        Game.toggleCPUStats = function() {
            try {
                let vDisplay = Memory.displayCPUStats || {value: false};
                Memory.displayCPUStats = {value: !vDisplay.value};
                return ('CPU Stat display toggled');
            }
            catch (ex) {
                console.log('### EXCEPTION -  toggleCPUStats(): ' + ex.message);
            }
        };
	}
	catch (ex){
		console.log('### EXCEPTION - Main: ' +  ex.message);
	}
};


