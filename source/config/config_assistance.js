/*jshint esversion: 6 */
// this is the one that counts - do not use others

function updateAssistanceSettings()
{
	let vMem = {};

	vMem.W62S58 =
	{
		isActiveOp: true,

		providerRoom: 'W64S58',
		respawnTimeBuffer: 350,
		waypointPrefixIngress: 'W62S58_in',

		creepSpawnGoals: {

			worker: {num: 1, buildLevel: 8, boosts: [], priority: 'normal'},
			miner: {num: 1, buildLevel: 8, boosts: [], priority: 'normal'},
			//restocker: {num: 1, buildLevel: 5, boosts: [], priority: 'normal'},
			//manager: {num: 1, buildLevel: 2, boosts: [], priority: 'normal'},
			upgrader: {num: 1, buildLevel: 8, boosts: [], priority: 'normal'},
            //invaderStopperMulti: {num: 1, buildLevel: 6, boosts: [], priority: 'normal'}
		}
	};


    vMem.W65S53 =
        {
            isActiveOp: false,

            providerRoom: 'W63S52',
            respawnTimeBuffer: 250,
            waypointPrefixIngress: 'W65S53_in',

            creepSpawnGoals: {
                //worker: {num: 1, buildLevel: 8, boosts: [], priority: 'normal'},
                miner: {num: 1, buildLevel: 8, boosts: [], priority: 'normal'},
                //invaderStopperMulti: {num: 1, buildLevel: 6, boosts: [], priority: 'normal'},
                restocker: {num: 1, buildLevel: 8, boosts: [], priority: 'normal'},
                //manager: {num: 1, buildLevel: 8, boosts: [], priority: 'normal'},
                upgrader: {num: 1, buildLevel: 8, boosts: [], priority: 'normal'}
            }
        };

	Memory.settings.assistance = vMem;

}

