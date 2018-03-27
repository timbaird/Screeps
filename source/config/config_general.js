/*jshint esversion: 6 */

function updateGeneralSettings()
{
	const vMem = {};

	vMem.usernames = ['Mal', 'Mal_Local'];

    // players at peace wont automatically be attacked but ramparts and access control will remain closed

	//vMem.peace = ['bonzaiferroni'];
    vMem.peace = [];

    // allies are not automatically shot and and access control mechanism are kept open for freedom of movement
    // could add mechanism whereby allies could send message for help via creep somehow.

	//vMem.allies = ['Pundemonium'];
    vMem.allies = [];

    vMem.terminalsDistributeMinerals = true;
    vMem.terminalsDistributeEnergy = true;

    // Terminals in this array will be excluded from the ManagerTerminals.manage energy & mineral distibution
	vMem.terminalsToExclude = [
								//'59e2ec95e4ca1231bbcd561a'   // W65S53
								//'58bda435bf7a7a826035ded2',		// W66S59
								//'5895e6eb9f5452d870f75e7d',		// W64S58
								//'58e1645550b1511e19606510'		// W67S59
							   ];

	// resources in this terminal will be moved to other terminals
	// to be used to full effect this needs to be combined with an evacuator creep
	// in the subject room to move resources from storage to terminal.
	vMem.evacuateResources = [
								//'W65S53'
								//'W66S59',
								//'W67S59'
								];

	// creeps from these rooms will move to flag <roomname>_evac  e.g. W58S56_evac
	// intended for use prior to landing of incoming nuke
	vMem.roomsToEvacuate = [
        						//'W64S58'
								//'W63S56'
								//'W66S59'
								//'W67S59'
							];

	//vMem.storage_link_goal_tolerance = 50;

	Memory.settings.general = vMem;

}


