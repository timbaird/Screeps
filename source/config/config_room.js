/*jshint esversion: 6 */


function updateRoomSettings()
{
	const vMem = {};

    vMem.default =
    {
        defence_repair_threshold: 1,
        critical_energy_threshold: 1000,
        high_energy_threshold: 10000,
        respawnTimeBuffer: 0,

        creepSpawnGoals: {
            worker: {num: 0, buildLevel: 8, boosts: [], priority: 'normal'}
          //  miner: {num: 0, buildLevel: 8, boosts: [], priority: 'normal'},
          //  restocker: {num: 1, buildLevel: 8, boosts: [], priority: 'high'},
          //  collector: {num: 1, buildLevel: 8, boosts: [], priority: 'high'},
          //  manager: {num: 0, buildLevel: 4, boosts: [], priority: 'high'},
          //  upgrader: {num: 0, buildLevel: 1, boosts: [], priority: 'normal'}
        },
        defensive_centre: {x: 25, y: 25},
        fire_zones: [
            {topleft: {x: 0, y:0}, bottomRight: {x: 49, y:49}},
        ]
    };

    //EASTERN CORRIDOR
    vMem.W62S58 =
    {
            defence_repair_threshold: 4000000,
            critical_energy_threshold: 50000,
            high_energy_threshold: 400000,
            respawnTimeBuffer: 70,

            creepSpawnGoals: {
                manager: {num: 1, buildLevel: 8, boosts: [], priority: 'high'},     // 2500
                restocker: {num: 1, buildLevel: 8, boosts: [], priority: 'high'},   // 2750
                //worker: {num: 1, buildLevel: 5, boosts: [], priority: 'normal'},    // 700
                //custom: {num: 1, buildLevel: 6, boosts: ['XGHO2'], priority: 'high'}
                //miner: {num: 1, buildLevel: 6, boosts: [], priority: 'high'},       // 3500
                //upgrader: {num: 1, buildLevel: 1, boosts: [], priority: 'normal'}   // 300   =>  9750 for 30000
            },
            defensive_centre: {x: 28, y: 24},
            fire_zones: [
                {topleft: {x: 1, y:1}, bottomRight: {x: 48, y:48}},
                //{topleft: {x: 3, y:20}, bottomRight: {x: 33, y:44}}
            ]
        };

    //1st of Puns Rooms (Centre)
    vMem.W63S52 =
    {
            defence_repair_threshold: 18000000,
            critical_energy_threshold: 200000,
            high_energy_threshold: 400000,
            respawnTimeBuffer: 70,

            creepSpawnGoals: {
                manager: {num: 1, buildLevel: 8, boosts: [], priority: 'high'},     // 2500
                restocker: {num: 1, buildLevel: 8, boosts: [], priority: 'high'},   // 2750
                worker: {num: 1, buildLevel: 5, boosts: [], priority: 'normal'},    // 700
                //custom: {num: 1, buildLevel: 6, boosts: ['XGHO2'], priority: 'high'}
                miner: {num: 1, buildLevel: 6, boosts: [], priority: 'high'},       // 3500
                upgrader: {num: 1, buildLevel: 5, boosts: [], priority: 'normal'}   // 300   =>  9750 for 30000
            },
            defensive_centre: {x: 17, y: 32},
            fire_zones: [
                {topleft: {x: 6, y:24}, bottomRight: {x: 23, y:37}},
                //{topleft: {x: 3, y:20}, bottomRight: {x: 33, y:44}}
            ]
        };

    //main swamp room
    vMem.W63S56 =
    {
    defence_repair_threshold: 18000000,
        critical_energy_threshold: 200000,
        high_energy_threshold: 400000,
        respawnTimeBuffer: 70,

        creepSpawnGoals: {
            manager: {num: 1, buildLevel: 8, boosts: [], priority: 'high'},     // 2500 - 1
            restocker: {num: 1, buildLevel: 8, boosts: [], priority: 'high'},   // 2750  - 1
            worker: {num: 1, buildLevel: 8, boosts: [], priority: 'normal'},    // 700 - 1
            miner: {num: 1, buildLevel: 8, boosts: [], priority: 'high'},       // 3500 - 1
            //custom: {num: 0, buildLevel: 8, boosts: [], priority: 'high'},
            upgrader: {num: 1, buildLevel: 5, boosts: [], priority: 'normal'}   // 300  - 1
        },
        defensive_centre: {x: 22, y: 20},
        fire_zones: [
            {topleft: {x: 9, y:10}, bottomRight: {x: 34, y:32}},
            {topleft: {x: 4, y:6}, bottomRight: {x: 9, y:12}}
        ]
    };

    //ultra blocker room
    vMem.W64S58 =
    {
        defence_repair_threshold: 18000000,
        critical_energy_threshold: 200000,
        high_energy_threshold: 400000,
        respawnTimeBuffer: 70,

        creepSpawnGoals: {

            worker: {num: 1, buildLevel: 5, boosts: [], priority: 'normal'},    // 500
            miner: {num: 1, buildLevel: 8, boosts: [], priority: 'high'},       // 3500
            restocker: {num: 2, buildLevel: 8, boosts: [], priority: 'high'},   // 2750
            //evacuator: {num: 1, buildLevel: 8, boosts: [], priority: 'high'},
            manager: {num: 1, buildLevel: 8, boosts: [], priority: 'high'},     // 2500
            //invaderStopperMulti: {num: 1, buildLevel: 8, boosts: [], priority: 'high'},
            // DO NOT UPGRADE FOR CONTROLLER GAIN IN THIS ROOM - NOT SET UP FOR IT
            upgrader: {num: 1, buildLevel: 1, boosts: [], priority: 'normal'}   // 300    =>   9550 for 30000
        },
        defensive_centre: {x: 22, y: 27},
        fire_zones: [
            {topleft: {x: 15, y:21}, bottomRight: {x: 27, y:32}},
            {topleft: {x: 8, y:8}, bottomRight: {x: 46, y:43}},
        ]
    };

    //2nd of Puns Rooms (Centre)
    vMem.W65S53 =
    {
            defence_repair_threshold: 12000000,
            critical_energy_threshold: 25000,
            high_energy_threshold: 400000,
            respawnTimeBuffer: 70,

            creepSpawnGoals: {
                manager: {num: 1, buildLevel: 8, boosts: [], priority: 'high'},     // 2500
                restocker: {num: 1, buildLevel: 8, boosts: [], priority: 'high'},   // 2750
                worker: {num: 1, buildLevel: 6, boosts: [], priority: 'normal'},    // 700
                //invaderStopperMulti: {num: 1, buildLevel: 8, boosts: [], priority: 'high'},
                miner: {num: 1, buildLevel: 8, boosts: [], priority: 'high'},       // 3500
                //custom: {num: 0, buildLevel: 8, boosts: [], priority: 'high'},
                upgrader: {num: 1, buildLevel: 5, boosts: [], priority: 'normal'}   // 300   =>  9750 for 30000
            },
            defensive_centre: {x: 25, y: 26},
            fire_zones: [
                {topleft: {x: 12, y:14}, bottomRight: {x: 31, y:31}},
                {topleft: {x: 3, y:9}, bottomRight: {x: 47, y:46}}
            ]
        };
    
    //NEW south - area bocker
    vMem.W66S59 =
    {
        defence_repair_threshold: 18000000,
        critical_energy_threshold: 200000,
        high_energy_threshold: 400000,
        respawnTimeBuffer: 150,

        creepSpawnGoals: {
            manager: {num: 1, buildLevel: 8, boosts: [], priority: 'high'},     // 2500
            restocker: {num: 1, buildLevel: 8, boosts: [], priority: 'high'},   // 2750
            worker: {num: 1, buildLevel: 5, boosts: [], priority: 'normal'},    // 700
            miner: {num: 1, buildLevel: 8, boosts: [], priority: 'high'},       // 3500
            //evacuator: {num: 1, buildLevel: 8, boosts: [], priority: 'high'},
            upgrader: {num: 1, buildLevel: 5, boosts: [], priority: 'normal'}   // 3500     =>   9750 / 12950 TO UPGRADE FOR 15000
        },
        defensive_centre: {x: 26, y: 25},
        fire_zones: [
            {topleft: {x: 16, y:18}, bottomRight: {x: 35, y:30}},
            {topleft: {x: 3, y:16}, bottomRight: {x: 48, y:38}}
        ]
    };

    //TOP WEST Hydrogen ROOM
    vMem.W67S51 =
    {
        defence_repair_threshold: 18000000,
        critical_energy_threshold: 200000,
        high_energy_threshold: 400000,
        respawnTimeBuffer: 70,

        creepSpawnGoals: {
            manager: {num: 1, buildLevel: 8, boosts: [], priority: 'high'},         // 2500
            restocker: {num: 1, buildLevel: 8, boosts: [], priority: 'high'},       // 2750
            worker: {num: 1, buildLevel: 5, boosts: [], priority: 'normal'},        // 500
            miner: {num: 1, buildLevel: 8, boosts: [], priority: 'high'},       // 3500
            upgrader: {num: 1, buildLevel: 5, boosts: [], priority: 'normal'}
        },
        defensive_centre: {x: 25, y: 23},
        fire_zones: [
            {topleft: {x: 19, y:17}, bottomRight: {x: 33, y:30}},
            {topleft: {x: 10, y:8}, bottomRight: {x: 42, y:39}}
        ]
    };

    //NEW  CENTRE MINER ROOM
    vMem.W67S56 =
    {
            defence_repair_threshold: 18000000,
            critical_energy_threshold:200000,
            high_energy_threshold: 400000,
            respawnTimeBuffer: 70,

            creepSpawnGoals: {
                manager: {num: 1, buildLevel: 8, boosts: [], priority: 'high'},         // 2500
                restocker: {num: 1, buildLevel: 8, boosts: [], priority: 'high'},       // 2750
                worker: {num: 1, buildLevel: 6, boosts: [], priority: 'normal'},        // 500
                miner: {num: 1, buildLevel: 8, boosts: [], priority: 'high'},       // 3500
                upgrader: {num: 1, buildLevel: 5, boosts: [], priority: 'normal'}       // 3500 (300)  => 9550 / 12750 UPGRADING for 30000
            },
            defensive_centre: {x: 34, y: 22},
            fire_zones: [
                {topleft: {x: 17, y:5}, bottomRight: {x: 44, y:34}},
                {topleft: {x: 4, y:31}, bottomRight: {x: 26, y:42}}
            ]
    };

    //WEST U BEND ROOM
    vMem.W67S59 =
    {
         defence_repair_threshold: 18000000,
         critical_energy_threshold: 200000,
         high_energy_threshold: 400000,
         respawnTimeBuffer: 120,

         creepSpawnGoals: {
             manager: {num: 1, buildLevel: 8, boosts: [], priority: 'high'},         // 2500  - 1
             restocker: {num: 1, buildLevel: 8, boosts: [], priority: 'high'},       // 2750  - 1
             worker: {num: 1, buildLevel: 5, boosts: [], priority: 'normal'},        // 500   - 1
             miner: {num: 1, buildLevel: 8, boosts: [], priority: 'high'},       // 3500   - 1
             //evacuator: {num: 1, buildLevel: 8, boosts: [], priority: 'high'},
             upgrader: {num: 1, buildLevel: 5, boosts: [], priority: 'normal'}  //  - 1
         },
        defensive_centre: {x: 29, y: 25},
         fire_zones: [
             {topleft: {x: 25, y:19}, bottomRight: {x: 39, y:34}},
             {topleft: {x: 9, y:9}, bottomRight: {x: 49, y:49}}
         ]
     };

    // TOP WEST AREA OXYGEN ROOM
    vMem.W68S53 =
    {
        defence_repair_threshold: 18000000,
        critical_energy_threshold: 200000,
        high_energy_threshold: 400000,
        respawnTimeBuffer: 70,

        creepSpawnGoals: {
            manager: {num: 1, buildLevel: 8, boosts: [], priority: 'high'},     // 2500
            restocker: {num: 1, buildLevel: 8, boosts: [], priority: 'high'},   // 6150
            worker: {num: 1, buildLevel: 8, boosts: [], priority: 'normal'},    // 3500
            miner: {num: 1, buildLevel: 8, boosts: [], priority: 'high'},       // 3500
            //custom: {num: 0, buildLevel: 8, boosts: [], priority: 'high'},
            upgrader: {num: 1, buildLevel: 5, boosts: [], priority: 'normal'}   // 3500 => 19150 for 30000
        },
        defensive_centre: {x: 30, y: 25},
        fire_zones: [
            {topleft: {x: 23, y:17}, bottomRight: {x: 38, y:31}},
            {topleft: {x: 8, y:9}, bottomRight: {x: 46, y:47}}
        ]
    };

    //MAIN WEST ROOM
    vMem.W68S58 =
    {
        defence_repair_threshold: 18000000,
        critical_energy_threshold: 200000,
        high_energy_threshold: 400000,
        respawnTimeBuffer: 70,

        creepSpawnGoals: {
            manager: {num: 1, buildLevel: 8, boosts: [], priority: 'high'},     // 2500
            restocker: {num: 1, buildLevel: 8, boosts: [], priority: 'high'},   // 6150
            worker: {num: 1, buildLevel: 8, boosts: [], priority: 'normal'},    // 3500
            miner: {num: 1, buildLevel: 8, boosts: [], priority: 'high'},       // 3500
            //custom: {num: 0, buildLevel: 8, boosts: [], priority: 'high'},
            upgrader: {num: 1, buildLevel: 5, boosts: [], priority: 'normal'}   // 3500 => 19150 for 30000
        },
        defensive_centre: {x: 26, y: 12},
        fire_zones: [
            {topleft: {x: 13, y:3}, bottomRight: {x: 37, y:24}},
            {topleft: {x: 4, y:3}, bottomRight: {x: 45, y:42}}
        ]
    };

    //TOP WEST KEANIUM ROOM
    vMem.W69S51 =
    {
        defence_repair_threshold: 18000000,
        critical_energy_threshold: 200000,
        high_energy_threshold: 400000,
        respawnTimeBuffer: 70,

        creepSpawnGoals: {
            manager: {num: 1, buildLevel: 8, boosts: [], priority: 'high'},
            restocker: {num: 1, buildLevel: 8, boosts: [], priority: 'high'},       // 2750
            worker: {num: 1, buildLevel: 6, boosts: [], priority: 'normal'},        // 500
            miner: {num: 1, buildLevel: 8, boosts: [], priority: 'high'},       // 3500
            //custom: {num: 0, buildLevel: 8, boosts: [], priority: 'high'},
            upgrader: {num: 1, buildLevel: 5, boosts: [], priority: 'normal'}       // 3500 (300)  => 9550 / 12750 UPGRADING for 30000
        },
        defensive_centre: {x: 32, y: 24},
        fire_zones: [
            {topleft: {x: 29, y:19}, bottomRight: {x: 39, y:30}},
            {topleft: {x: 12, y:7}, bottomRight: {x: 46, y:37}}
        ]
    };

    // MID WEST AREA BLOCKER
    vMem.W69S57 =
    {
        defence_repair_threshold: 18000000,
        critical_energy_threshold: 200000,
        high_energy_threshold: 400000,
        respawnTimeBuffer: 100,

        creepSpawnGoals: {
            manager: {num: 1, buildLevel: 8, boosts: [], priority: 'high'},     // 2500
            restocker: {num: 1, buildLevel: 8, boosts: [], priority: 'high'},   // 3400
            worker: {num: 1, buildLevel: 8, boosts: [], priority: 'normal'},    // 2100
            miner: {num: 1, buildLevel: 8, boosts: [], priority: 'normal'},       // 3500
            //custom: {num: 0, buildLevel: 8, boosts: [], priority: 'high'},
            upgrader: {num: 1, buildLevel: 5, boosts: [], priority: 'normal'}   // (300) 3500 =>  11800 / 15000 upgrading for 30000
        },
        defensive_centre: {x: 29, y: 29},
        fire_zones: [
            {topleft: {x: 13, y:23}, bottomRight: {x: 40, y:37}},
            {topleft: {x: 2, y:5}, bottomRight: {x: 40, y:44}}
        ]
    };

    Memory.settings.room = vMem;
}

