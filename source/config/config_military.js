/*jshint esversion: 6 */

function updateMilitarySettings()
{
	const vMem = {};

	vMem.secureTheEast =
	{
        isActiveOp: false,

        providerRoom: 'W63S56',
        respawnTimeBuffer: 550,
        waypointPrefixIngress: 'Davaned_2',

        creepSpawnGoals: {

            //militaryAttacker: {num: 1, buildLevel: 8, boosts: [], priority: 'high'},
            //militaryHealer: {num: 1, buildLevel: 8, boosts: ['XLHO2'], priority: 'high'},
            militaryHealer: {num: 0, buildLevel: 8, boosts: [], priority: 'high'},
            militaryDemolisher: {num: 3, buildLevel: 8, boosts: ['XZHO2'], priority: 'high'}
            //militarySentry: {num: 0, buildLevel: 6, boosts: [], priority: 'high'}
        },

        targetPlayers:[], // an empty list will cause all other non allied players to be targetted.

        orders: {
            breach: ['5981687884331157a0a5a803'],	 // break these defence structures first.

            destroy: ['582cf9a9d88824a276f7173e']	 // wipe these structures out
        }
    };

    vMem.Davaned =
        {
            isActiveOp: false,

            providerRoom: 'W66S59',
            respawnTimeBuffer: 400,
            waypointPrefixIngress: 'Davaned',

            creepSpawnGoals: {

                //militaryAttacker: {num: 1, buildLevel: 8, boosts: [], priority: 'high'},
                //militaryHealer: {num: 1, buildLevel: 8, boosts: ['XLHO2'], priority: 'high'},
                militaryHealer: {num: 0, buildLevel: 8, boosts: [], priority: 'high'},
                militaryDemolisher: {num: 3, buildLevel: 8, boosts: ['XZHO2'], priority: 'high'}
                //militarySentry: {num: 0, buildLevel: 6, boosts: [], priority: 'high'}
            },

            targetPlayers:[], // an empty list will cause all other non allied players to be targetted.

            orders: {
                breach: ['59facfdbd675cb58061be9e9'],	 // break these defence structures first.

                destroy: ['58ed4b00d25ffa5962953540']	 // wipe these structures out
            }
        };

    Memory.settings.military = vMem;
}
