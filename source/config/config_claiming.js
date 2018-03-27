/*jshint esversion: 6 */


function updateClaimingSettings()
{
	const vMem = {};

	vMem.W62S58 = {
			isActiveOp: false,
			providerRoom: 'W64S58',
			waypointPrefixIngress: 'W62S58_in',
			claimer_buildLevel: 3
		};

	Memory.settings.claiming = vMem;
}