/*jshint esversion: 6 */

function updatePowerHarvestSettings()
{
	const vMem = {};

	vMem.W70S52 = {

        isActiveOp: false,

        providerRoom: 'W69S51',
        respawnTimeBuffer: 300,

        exportTargetId: '589fc8a0f996b11842b9e0bd',

        waypointPrefixIngress: 'W70S52_in',
        waypointPrefixEgress: 'W70S52_out',

        creepSpawnGoals: {
            powerKiller: {num: 1, buildLevel: 7, boosts: [], priority: 'normal'},
            powerHealer: {num: 3, buildLevel: 7, boosts: [], priority: 'normal'},
            powerTank: {num: 0, buildLevel: 8, boosts: [], priority: 'normal'},
            powerMover: {num: 0, buildLevel: 8, boosts: [], priority: 'normal'}
        }
	};

	Memory.settings.powerharvest = vMem;


}

