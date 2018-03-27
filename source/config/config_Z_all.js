/*jshint esversion: 6 */

function updateSettings()
{
	try {
			Memory.settings = {};

            // do it onece here to save doing it every time in the CPU manager
			if (!Memory.CPU)
			{
				ManagerCPU.memorySetUp();
			}

			updateAssistanceSettings();
			updateCreepSettings();
			updateClaimingSettings();
			updateGatheringSettings();
			updateGeneralSettings();
			updateLabSettings();
			updateMilitarySettings();
			updatePowerHarvestSettings();
			updateRoomSettings();
			updateTowerSettings();

			// because settings affecting what should be spawned may have been changed
			// reset all spawn queues when a new version saved.
			let i;
			let vRooms = Game.rooms;

			for (i in vRooms) {
				if (vRooms.hasOwnProperty(i))
				{
                    Game.rooms[i].resetSpawnQueues();
				}
			}
			console.log('config_all.updateSettings():  all spawn queues reset');

			Memory.settings.lastUpdated = update_datetime;
	}
	catch(ex)
	{
		console.log('### EXCEPTION - config_all.updateSettings(): ' +  ex.message);
	}
}
