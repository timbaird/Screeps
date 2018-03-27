function ManagerCPU()
{

	console.log('### ManagerCPU Class contains only static methods, no need to instantiate');
}

ManagerCPU.manage = function()
{
	try {

		ManagerCPU.recordCPUActivity();

		if (Memory.displayCPUStats.value) {ManagerCPU.outputCPUStats();}

	}
	catch (ex) {
		console.log('### EXCEPTION - ManagerCPU.manage(): ' + ex.message);
	}
};

ManagerCPU.recordCPUActivity = function()
{
	try {

		const cpuUsed = Game.cpu.getUsed();
		let vMem = Memory.CPU;

		if (cpuUsed > vMem.MAX) {vMem.MAX = cpuUsed;}

		vMem.TICKS += 1;

		vMem.TOTAL += cpuUsed;

		switch (Game.time % 10) {
			case 0:
				vMem.TOTAL_TICK_0 += cpuUsed;
				break;
			case 1:
				vMem.TOTAL_TICK_1 += cpuUsed;
				break;
			case 2:
				vMem.TOTAL_TICK_2 += cpuUsed;
				break;
			case 3:
				vMem.TOTAL_TICK_3 += cpuUsed;
				break;
			case 4:
				vMem.TOTAL_TICK_4 += cpuUsed;
				break;
			case 5:
				vMem.TOTAL_TICK_5 += cpuUsed;
				break;
			case 6:
				vMem.TOTAL_TICK_6 += cpuUsed;
				break;
			case 7:
				vMem.TOTAL_TICK_7 += cpuUsed;
				break;
			case 8:
				vMem.TOTAL_TICK_8 += cpuUsed;
				break;
			case 9:
				vMem.TOTAL_TICK_9 += cpuUsed;
				break;

			default:
			// ths should never occur
		}
	}
	catch (ex) {
		console.log('### EXCEPTION -  ManagerCPU.recordCPUActivity(): ' + ex.message);
	}
};

ManagerCPU.outputCPUStats = function()
{
		try{

			let vMem = Memory.CPU;
			let vGameCPU =  Game.cpu;
			const vNumTicks = Math.ceil(vMem.TICKS / 10);

			console.log('# CPU used this tick: ' + vGameCPU.getUsed());
			console.log('# CPU limit: ' + vGameCPU.limit);
			console.log('# CPU spare: ' + (vGameCPU.limit - vGameCPU.getUsed()));
			console.log('# CPU tick limit: ' + vGameCPU.tickLimit);
			console.log('# CPU bucket: ' + vGameCPU.bucket);
			console.log('# CPU MAX: ' + vMem.MAX);
			console.log('# CPU MEAN: ' + (vMem.TOTAL / vMem.TICKS));
			console.log('############################');
			console.log('# TICK 0 MEAN: ' + (vMem.TOTAL_TICK_0 / vNumTicks + ' over ' + vNumTicks + ' ticks'));
			console.log('# TICK 1 MEAN: ' + (vMem.TOTAL_TICK_1 / vNumTicks));
			console.log('# TICK 2 MEAN: ' + (vMem.TOTAL_TICK_2 / vNumTicks));
			console.log('# TICK 3 MEAN: ' + (vMem.TOTAL_TICK_3 / vNumTicks));
			console.log('# TICK 4 MEAN: ' + (vMem.TOTAL_TICK_4 / vNumTicks));
			console.log('# TICK 5 MEAN: ' + (vMem.TOTAL_TICK_5 / vNumTicks));
			console.log('# TICK 6 MEAN: ' + (vMem.TOTAL_TICK_6 / vNumTicks));
			console.log('# TICK 7 MEAN: ' + (vMem.TOTAL_TICK_7 / vNumTicks));
			console.log('# TICK 8 MEAN: ' + (vMem.TOTAL_TICK_8 / vNumTicks));
			console.log('# TICK 9 MEAN: ' + (vMem.TOTAL_TICK_9 / vNumTicks));
			console.log('############################');

		}
		catch (ex){
			console.log('### EXCEPTION -  ManagerCPU.outputCPUStats(): ' +  ex.message);
		}
};

	// called in update settings so it only gets done once every code change
	// and not every tick
ManagerCPU.memorySetUp = function()
{
	try {

		if (!Memory.displayCPUStats)
		{
            Memory.displayCPUStats = {value:true}
		}

		let vMem = {};
		vMem.MAX = 0;
		vMem.TICKS = 0;
		vMem.TOTAL = 0;
		vMem.TOTAL_TICK_0 = 0;
		vMem.TOTAL_TICK_1 = 0;
		vMem.TOTAL_TICK_2 = 0;
		vMem.TOTAL_TICK_3 = 0;
		vMem.TOTAL_TICK_4 = 0;
		vMem.TOTAL_TICK_5 = 0;
		vMem.TOTAL_TICK_6 = 0;
		vMem.TOTAL_TICK_7 = 0;
		vMem.TOTAL_TICK_8 = 0;
		vMem.TOTAL_TICK_9 = 0;
		vMem.TOTAL_TICK_0 = 0;

		Memory.CPU = vMem;
	}
	catch (ex) {
		console.log('### EXCEPTION -  ManagerCPU.resetCPUStats(): ' + ex.message);
	}
};



