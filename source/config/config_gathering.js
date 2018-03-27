/*jshint esversion: 6 */


function updateGatheringSettings()
{
	const vMem = {};

    // RESERVE ONLY - ULTRA BLOCKER - TWO EAST
    vMem.W62S58 = {

        isActiveOp: false,

        providerRoom: 'W64S58',
        respawnTimeBuffer: 100,

        mineMineral: false, // this only has an impact on centre 'source keeper rooms
        exportTargetId: '',

        waypointPrefixIngress: 'W62S58_in',
        waypointPrefixEgress: 'W62S58_out',

        reserveController: true,
        reserverBuildLevel: 5,
        reservationTickBuffer: 3000,

        creepSpawnGoals: {
            // only reserve this room to prevent raids elsewhere    // 1150
            invaderStopperMulti: {num: 1, buildLevel: 6, boosts: [], priority: 'high'}
        }
    };

    // ULTRA BLOCKER - EAST
    vMem.W63S58 = {

        isActiveOp: true,

        providerRoom: 'W64S58',
        respawnTimeBuffer: 120,

        mineMineral: false, // this only has an impact on centre 'source keeper rooms
        exportTargetId: '5895e6eb9f5452d870f75e7d',

        waypointPrefixIngress: 'W63S58_in',
        waypointPrefixEgress: 'W63S58_out',

        reserveController: true,
        reserverBuildLevel: 6,
        reservationTickBuffer: 3000,

        creepSpawnGoals: {

            // reserver
            //invaderStopperMulti: {num: 1, buildLevel: 6, boosts: [], priority: 'normal'},
            exportWorker: {num: 1, buildLevel: 8, boosts: [], priority: 'normal'},          // 2100
            exportMaintainer: {num: 1, buildLevel: 6, boosts: [], priority: 'normal'},      // 300
            exportCarrier: {num: 2, buildLevel: 8, boosts: [], priority: 'normal'}    // 1150
        }
    };

    // 1st of PUNS ROOM - WEST
    vMem.W64S52 = {

        isActiveOp: true,

        providerRoom: 'W63S52',
        respawnTimeBuffer: 200,

        mineMineral: false, // this only has an impact on centre 'source keeper rooms
        exportTargetId: '5987635fb0a9d427e15ca45d',

        waypointPrefixIngress: 'W64S52_in',
        waypointPrefixEgress: 'W64S52_out',

        reserveController: true,
        reserverBuildLevel: 5,
        reservationTickBuffer:3000,

        creepSpawnGoals: {
            // 2 1 4 1 1 1
            exportWorker: {num: 1, buildLevel: 8, boosts: [], priority: 'normal'},
            //exportMaintainer: {num: 1, buildLevel: 3, boosts: [], priority: 'normal'} ,
            exportCarrier: {num: 1, buildLevel: 8, boosts: [], priority: 'normal'}
        }
    };

    // MAIN SWAMP ROOM - NORTH WEST - ###  KEEPER ROOM
    vMem.W64S55 = {

        isActiveOp: false,

        providerRoom: 'W63S56',
        respawnTimeBuffer: 250,

        mineMineral: false, // this only has an impact on centre 'source keeper rooms
        exportTargetId: '5895ea91d956e6a11ce07fa7',

        waypointPrefixIngress: 'W64S55_in',
        waypointPrefixEgress: 'W64S55_out',

        reserveController: false,
        reserverBuildLevel: 1,
        reservationTickBuffer: 0,

        creepSpawnGoals: {
            // 2 1 4 1 1 1
            exportWorker: {num: 2, buildLevel: 8, boosts: [], priority: 'normal'},           // 7000
            exportMaintainer: {num: 1, buildLevel: 6, boosts: [], priority: 'normal'},       // 2100
            exportCarrier: {num: 3, buildLevel: 8, boosts: [], priority: 'normal'},          // 10000

            keeperKiller: {num: 1, buildLevel: 8, boosts: [], priority: 'high'},             // 4100
            invaderStopperKiller: {num: 1, buildLevel: 8, boosts: [], priority: 'normal'},   // 3600
            invaderStopperHealer: {num: 1, buildLevel: 8, boosts: [], priority: 'normal'}   // 5100   => 31900  FOR 60000
        }
    };

    // MAIN SWAMP ROOM - WEST - ###  KEEPER ROOM
    vMem.W64S56 = {

        isActiveOp: true,

        providerRoom: 'W63S56',
        respawnTimeBuffer: 250,

        mineMineral: false, // this only has an impact on centre 'source keeper rooms
        exportTargetId: '5895ea91d956e6a11ce07fa7',

        waypointPrefixIngress: 'W64S56_in',
        waypointPrefixEgress: 'W64S56_out',

        reserveController: false,
        reserverBuildLevel: 1,
        reservationTickBuffer: 0,

        creepSpawnGoals: {
            // 2 1 4 1 1 1
            exportWorker: {num: 2, buildLevel: 8, boosts: [], priority: 'normal'},           // 7000
            exportMaintainer: {num: 1, buildLevel: 8, boosts: [], priority: 'normal'},       // 2100
            exportCarrier: {num: 4, buildLevel: 8, boosts: [], priority: 'normal'},          // 10000
            keeperKiller: {num: 1, buildLevel: 8, boosts: [], priority: 'high'},             // 4100
            invaderStopperKiller: {num: 1, buildLevel: 8, boosts: [], priority: 'normal'},   // 3600
            invaderStopperHealer: {num: 1, buildLevel: 8, boosts: [], priority: 'normal'}   // 5100   => 31900  FOR 60000
        }
    };
    
    // ULTRA BLOCKER - SOUTH
    vMem.W64S59 = {

            isActiveOp: true,

            providerRoom: 'W64S58',
            respawnTimeBuffer: 150,

            mineMineral: false, // this only has an impact on centre 'source keeper rooms
            exportTargetId: '5895e6eb9f5452d870f75e7d',

            waypointPrefixIngress: 'W64S59_in',
            waypointPrefixEgress: 'W64S59_out',

            reserveController: true,
            reserverBuildLevel: 6,
            reservationTickBuffer: 3000,

            creepSpawnGoals: {

                // reserver                                                                        1950
                exportWorker: {num: 1, buildLevel: 8, boosts: [], priority: 'normal'},          // 2100
                //exportMaintainer: {num: 0, buildLevel: 3, boosts: [], priority: 'normal'},      // 300
                exportCarrier: {num: 2, buildLevel: 8, boosts: [], priority: 'normal'},         // 3600
                invaderStopperMulti: {num: 1, buildLevel: 6, boosts: [], priority: 'normal'}    // 1150 =>  9100 for 30000
            }
    };

    // 2nd of PUNS ROOM - NORTH
    vMem.W65S52 = {

        isActiveOp: true,
        //providerRoom: 'W63S52',
        providerRoom: 'W65S53',
        respawnTimeBuffer: 150,

        mineMineral: false, // this only has an impact on centre 'source keeper rooms
        exportTargetId: '59e2ec95e4ca1231bbcd561a',

        waypointPrefixIngress: 'W65S52_in',
        waypointPrefixEgress: 'W65S52_out',

        reserveController: true,
        reserverBuildLevel: 5,
        reservationTickBuffer:3000,

        creepSpawnGoals: {
            // 2 1 4 1 1 1
            exportWorker: {num: 1, buildLevel: 8, boosts: [], priority: 'normal'},
            exportMaintainer: {num: 1, buildLevel: 5, boosts: [], priority: 'normal'} ,
            exportCarrier: {num: 1, buildLevel: 8, boosts: [], priority: 'normal'},
            invaderStopperMulti: {num: 1, buildLevel: 6, boosts: [], priority: 'normal'}
        }
    };

    // ULTRA BLOCKER - NORTH WEST
    vMem.W65S57 = {

        isActiveOp: false,

        providerRoom: 'W64S58',
        respawnTimeBuffer: 150,

        mineMineral: false, // this only has an impact on centre 'source keeper rooms
        exportTargetId: '58957b3cefe97e023f966ae4',

        waypointPrefixIngress: 'W65S57_in',
        waypointPrefixEgress: 'W65S57_out',

        reserveController: true,
        reserverBuildLevel: 6,
        reservationTickBuffer: 3000,

        creepSpawnGoals: {
            // reserver                                                                        1950
            exportWorker: {num: 1, buildLevel: 8, boosts: [], priority: 'normal'},          // 3500
            exportMaintainer: {num: 1, buildLevel: 2, boosts: [], priority: 'normal'},      // 500
            exportCarrier: {num: 3, buildLevel: 8, boosts: [], priority: 'normal'},         // 7500
            invaderStopperMulti: {num: 1, buildLevel: 6, boosts: [], priority: 'high'}      // 1150    14600 FOR 30000
        }
    };

    // top west hydrogen room - EAST
    vMem.W66S51 = {

        isActiveOp: true,

        providerRoom: 'W67S51',
        respawnTimeBuffer: 200,

        mineMineral: false, // this only has an impact on centre 'source keeper rooms
        exportTargetId: '58b90a183aa9ab6a7d99b465',

        waypointPrefixIngress: 'W66S51_in',
        waypointPrefixEgress: 'W66S51_out',

        reserveController: true,
        reserverBuildLevel: 5,
        reservationTickBuffer: 3000,

        creepSpawnGoals: {

            // 1 1 2
            // reserver                                                                        1950
            exportWorker: {num: 1, buildLevel: 8, boosts: [], priority: 'normal'},          // 3500
            exportMaintainer: {num: 1, buildLevel: 8, boosts: [], priority: 'normal'},      // 300
            exportCarrier: {num: 2, buildLevel: 8, boosts: [], priority: 'normal'},         // 5000 => 10750 FOR 30000
            invaderStopperMulti: {num: 1, buildLevel: 6, boosts: [], priority: 'normal'}
        }
    };

    // MAIN WEST ROOM - NORTH EAST
    vMem.W67S57 = {

        isActiveOp: true,

        providerRoom: 'W68S58',
        respawnTimeBuffer: 250,

        mineMineral: false, // this only has an impact on centre 'source keeper rooms
        exportTargetId: '5897fbaccce2ec2447fba7a8',

        waypointPrefixIngress: 'W67S57_in',
        waypointPrefixEgress: 'W67S57_out',

        reserveController: true,
        reserverBuildLevel: 5,
        reservationTickBuffer: 3000,

        creepSpawnGoals: {

            // 1 1 2
            // reserver                                                                        1950
            exportWorker: {num: 1, buildLevel: 8, boosts: [], priority: 'normal'},          // 3500
            //exportMaintainer: {num: 1, buildLevel: 1, boosts: [], priority: 'normal'},      // 300
            exportCarrier: {num: 2, buildLevel: 8, boosts: [], priority: 'normal'}
        }
    };

    // SILENTPOOTS LAST STAND - U BEND ROOM NORTH
    vMem.W67S58 = {

        isActiveOp: true,

        providerRoom: 'W67S59',
        respawnTimeBuffer: 200,

        mineMineral: false, // this only has an impact on centre 'source keeper rooms
        exportTargetId: '58e1645550b1511e19606510',

        waypointPrefixIngress: 'W67S58_in',
        waypointPrefixEgress: 'W67S58_out',

        reserveController: true,
        reserverBuildLevel: 5,
        reservationTickBuffer: 3000,

        creepSpawnGoals: {
            // reserver                                                                        1950
            exportWorker: {num: 1, buildLevel: 8, boosts: [], priority: 'normal'},          // 2100
            //exportMaintainer: {num: 0, buildLevel: 3, boosts: [], priority: 'normal'},      // 500
            exportCarrier: {num: 1, buildLevel: 8, boosts: [], priority: 'normal'}

        }
    };

    // RESERVE ONLY -  MID WEST BLOCKER ROOM NORTH EAST - MAIN WEST ROOM 2 NORTH
    vMem.W68S56 = {

        isActiveOp: true,

        providerRoom: 'W67S56',
        respawnTimeBuffer: 100,

        mineMineral: false, // this only has an impact on centre 'source keeper rooms
        exportTargetId: '',

        waypointPrefixIngress: 'W68S56_in',
        waypointPrefixEgress: 'W68S56_out',

        reserveController: true,
        reserverBuildLevel: 5,
        reservationTickBuffer: 3000,

        creepSpawnGoals: {
            // only reserve this room to prevent raids elsewhere    // 1150
            invaderStopperMulti: {num: 1, buildLevel: 1, boosts: [], priority: 'normal'}
        }
    };

    // MID WEST BLOCKER ROOM EAST - MAIN WEST ROOM NORTH
    vMem.W68S57 = {

        isActiveOp: true,

        providerRoom: 'W67S56',
        respawnTimeBuffer: 200,

        mineMineral: false, // this only has an impact on centre 'source keeper rooms
        exportTargetId: '591c1ae3a86eb31a55f52235',

        waypointPrefixIngress: 'W68S57_in',
        waypointPrefixEgress: 'W68S57_out',

        reserveController: true,
        reserverBuildLevel: 5,
        reservationTickBuffer: 3000,

        creepSpawnGoals: {
            // reserver                                                                        1950
            exportWorker: {num: 1, buildLevel: 8, boosts: [], priority: 'normal'},          // 2100
            //exportMaintainer: {num: 0, buildLevel: 2, boosts: [], priority: 'normal'},      // 500
            exportCarrier: {num: 2, buildLevel: 8, boosts: [], priority: 'normal'}
        }
    };

    // TOP WEST KEANIUM ROOM - SOUTH
    vMem.W69S52 = {

        isActiveOp: true,

        providerRoom: 'W69S51',
        respawnTimeBuffer: 200,

        mineMineral: false, // this only has an impact on centre 'source keeper rooms
        exportTargetId: '589fc8a0f996b11842b9e0bd',

        waypointPrefixIngress: 'W69S52_in',
        waypointPrefixEgress: 'W69S52_out',

        reserveController: true,
        reserverBuildLevel: 5,
        reservationTickBuffer: 3000,

        creepSpawnGoals: {
            // reserver
            // // dont use maintainer in this room as it blocks the worker / miner from one of the sources                                                                    1950
            exportWorker: {num: 1, buildLevel: 8, boosts: [], priority: 'normal'},          // 2100
            exportMaintainer: {num: 1, buildLevel: 4, boosts: [], priority: 'normal'},      // 500
            exportCarrier: {num: 2, buildLevel: 8, boosts: [], priority: 'normal'},        // 2500
            invaderStopperMulti: {num: 1, buildLevel: 6, boosts: [], priority: 'normal'}
        }
    };

    // TOP WEST OXYGEN ROOM - WEST
    vMem.W69S53 = {

        isActiveOp: true,

        providerRoom: 'W68S53',
        respawnTimeBuffer: 200,

        mineMineral: false, // this only has an impact on centre 'source keeper rooms
        exportTargetId: '58a306462f1b21053d4755af',

        waypointPrefixIngress: 'W69S53_in',
        waypointPrefixEgress: 'W69S53_out',

        reserveController: true,
        reserverBuildLevel: 5,
        reservationTickBuffer: 3000,

        creepSpawnGoals: {
            // reserver
            exportWorker: {num: 1, buildLevel: 8, boosts: [], priority: 'normal'},          // 2100
            exportMaintainer: {num: 1, buildLevel: 4, boosts: [], priority: 'normal'},      // 500
            exportCarrier: {num: 2, buildLevel: 8, boosts: [], priority: 'normal'}
        }
    };

    // RESERVE ONLY -  MID WEST BLOCKER ROOM - TWO NORTH
    vMem.W69S55 = {

        isActiveOp: true,

        providerRoom: 'W69S57',
        respawnTimeBuffer: 100,

        mineMineral: false, // this only has an impact on centre 'source keeper rooms
        exportTargetId: '',

        waypointPrefixIngress: 'W69S55_in',
        waypointPrefixEgress: 'W69S55_out',

        reserveController: true,
        reserverBuildLevel: 5,
        reservationTickBuffer: 3000,

        creepSpawnGoals: {
            // only reserve this room to prevent raids elsewhere    // 1150
            invaderStopperMulti: {num: 1, buildLevel: 1, boosts: [], priority: 'normal'}
        }
    };

    // MID WEST BLOCKER ROOM - NORTH
    vMem.W69S56 = {

        isActiveOp: true,

        providerRoom: 'W69S57',
        respawnTimeBuffer: 170,

        mineMineral: false, // this only has an impact on centre 'source keeper rooms
        exportTargetId: '5895fb1c2139fcc82704b53c',

        waypointPrefixIngress: 'W69S56_in',
        waypointPrefixEgress: 'W69S56_out',

        reserveController: true,
        reserverBuildLevel: 5,
        reservationTickBuffer: 3000,

        creepSpawnGoals: {
            // reserver                                                                        1950
            exportWorker: {num: 1, buildLevel: 8, boosts: [], priority: 'normal'},          // 2100
            //exportMaintainer: {num: 1, buildLevel: 3, boosts: [], priority: 'normal'},      // 500
            exportCarrier: {num: 2, buildLevel: 8, boosts: [], priority: 'normal'}
        }
    };

    Memory.settings.gathering = vMem;

}