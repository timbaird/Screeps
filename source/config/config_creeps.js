/*jshint esversion: 6 */

function updateCreepSettings() {

    Memory.settings.creeps = {

        // creep classes

        roles: {

            custom: {
                peaceTasks: ['evacuateResources'],
                warTasks: ['evacuateResources'],
                buildType: 'manager'
            },

            miner: {
                // if enough miners and carriers then repair
                peaceTasks: ['backupRestockExtensions', 'mineEnergy', 'mineMineral', 'repairContainers', 'repairRoads', 'build', 'upgrade', 'wait'],
                warTasks: ['backupRestockTowers', 'backupRestockExtensions', 'mineEnergy', 'mineMineral', 'wait'],
                buildType: 'worker'
            },

            worker: {
                // if enough miners and carriers then repair
                peaceTasks: ['backupRestockExtensions', 'build', 'repairContainers', 'repairRoads', 'mineEnergy', 'mineMineral', 'upgrade', 'wait'],
                warTasks: ['backupRestockTowers', 'backupRestockExtensions', 'repairRoads', 'repairContainers', 'mineEnergy', 'wait'],
                buildType: 'worker'
            },
            
            restocker: {

                peaceTasks: [   'backupRestockTowers', 'restockExtensions', 'restockLabMinerals',
                                'removeLabMinerals', 'restockLabEnergy', 'manageMineralsBetweenStorageAndTerminal',
                                'repairRoads', 'repairContainers', 'collectEnergy', 'restockNukerEnergy', 'wait'],


                /*
                peaceTasks: ['restockLabEnergy', 'backupRestockTowers', 'restockExtensions', 'restockLabMinerals',
                    'removeLabMinerals',  'restockPowerSpawnEnergy',
                    'restockNukerEnergy', 'repairRoads', 'repairContainers', 'collectEnergy', 'wait'],
                    */

                warTasks: ['backupRestockTowers', 'restockExtensions', 'collectEnergy', 'wait'],
                buildType: 'carrier'
            },

            manager: {
                // if no need to restock the collect
                peaceTasks: ['restockTowers', 'restockSpawn', 'restockExtensions', 'restockStorageLink',
                             'manageEnergyBalance', 'restockLabMinerals', 'removeLabMinerals', 'restockLabEnergy',
                             'restockPowerSpawnEnergy', 'restockNukerEnergy'],

                warTasks: ['restockTowers', 'restockSpawn', 'manageEnergyBalance'],
                buildType: 'manager'
            },

            exportWorker: {
                // if enough miners and carriers then build
                peaceTasks: ['mineEnergy', 'repairContainers', 'repairRoads', 'build'],
                warTasks: ['mineEnergy', 'repairContainers', 'repairRoads', 'build'],
                buildType: 'worker'
            },

            exportMaintainer: {
                // if enough miners and carriers then build
                peaceTasks: ['repairRoads', 'build', 'repairContainers', 'mineEnergy'],
                warTasks: ['build', 'repairContainers','repairRoads', 'mineEnergy'],
                buildType: 'worker'
            },

            exportCarrier: {
                // if enough miners and carriers then build
                peaceTasks: ['export'],
                warTasks: ['export'],
                buildType: 'manager'
            },

            upgrader: {
                // for now just upgrade, but possibly
                peaceTasks: ['upgrade', 'repairRoads', 'build', 'mineEnergy', 'mineMineral'],
                warTasks: ['backupRestockTowers', 'backupRestockExtensions', 'mineEnergy', 'upgrade'],
                buildType: 'worker'
            },

            keeperKiller: {
                peaceTasks: ['killKeepers'],
                warTasks: ['killKeepers'],
                buildType: 'keeperKiller'
            },

            invaderStopperKiller: {
                peaceTasks: ['wait'],
                warTasks: ['stopInvaders'],
                buildType: 'invaderStopperKiller'
            },

            invaderStopperHealer: {
                peaceTasks: ['healWounded', 'wait'],
                warTasks: ['supportInvaderStopper', 'healWounded', 'wait'],
                buildType: 'invaderStopperHealer'
            },

            invaderStopperMulti: {
                peaceTasks: ['stopInvaders', 'healWounded', 'wait'],
                warTasks: ['stopInvaders'],
                buildType: 'invaderStopperMulti'
            },

            claimer: {
                peaceTasks: ['claim'],
                warTasks: ['claim'],
                buildType: 'claimer'
            },

            reserver: {
                peaceTasks: ['reserve'],
                warTasks: ['reserve'],
                buildType: 'reserver'
            },

            powerKiller: {
                peaceTasks: ['killPowerBank'],
                warTasks: ['killPowerBank'],
                buildType: 'powerKiller'
            },

            powerHealer: {
                peaceTasks: ['healPowerKiller'],
                warTasks: ['healPowerKiller'],
                buildType: 'powerHealer'
            },

            powerTank: {
                peaceTasks: ['storePower'],
                warTasks: ['storePower'],
                buildType: 'portableContainer'
            },

            powerMover: {
                peaceTasks: ['exportPower'],
                warTasks: ['exportPower'],
                buildType: 'manager'
            },

            // military
            militaryAttacker:{
                peaceTasks: ['breach', 'destroy', 'fight', 'raze'],
                //warTasks: ['breach','destroy', 'fight', 'raze'],
                warTasks: ['raze'],
                buildType: 'pureAttacker'
            },

            militaryHealer: {
                peaceTasks: ['battleHeal'],
                warTasks: ['battleHeal'],
                buildType: 'powerHealer'
            },

            militaryDemolisher:{
                peaceTasks: ['breach', 'destroy', 'raze'],
                warTasks: ['breach', 'destroy', 'raze'],
                buildType: 'pureWorker'
            },

            militarySentry:{
                peaceTasks: ['destroy', 'fight', 'wait'],
                warTasks: ['destroy', 'fight', 'wait'],
                buildType: 'sentry'
            },

            evacuator: {
                peaceTasks: ['evacuateResources'],
                warTasks: ['evacuateResources'],
                buildType: 'manager'
            }


        },

        buildTypes: {

            // maximums
            // 1 - 300
            // 2 - 550
            // 3 - 800
            // 4 - 1300
            // 5 - 1800
            // 6 - 2300
            // 7 - 5300
            // 8 - 12300

            worker: {
                1: {parts: [WORK, WORK, CARRY, MOVE], cost: 300},

                2: {parts: [WORK, WORK, WORK,
                            CARRY,
                            MOVE, MOVE, MOVE], cost: 500},

                3: {parts: [WORK, WORK,
                            WORK, WORK,
                            CARRY, CARRY,
                            MOVE, MOVE,
                            MOVE, MOVE], cost: 700},

                4: {
                    parts: [WORK, WORK, WORK,
                            WORK, WORK, WORK,
                            CARRY, CARRY, CARRY,
                            MOVE, MOVE, MOVE,
                            MOVE, MOVE, MOVE], cost: 1050
                },

                5: {
                    parts: [ WORK, WORK, WORK, WORK, WORK,
                             WORK, WORK, WORK, WORK, WORK,
                             CARRY, CARRY, CARRY, CARRY, CARRY,
                             MOVE, MOVE, MOVE, MOVE, MOVE,
                             MOVE, MOVE, MOVE, MOVE, MOVE], cost: 1750
                },

                6: {
                    parts: [ WORK, WORK, WORK, WORK, WORK,
                             WORK, WORK, WORK, WORK, WORK,
                             WORK, WORK,
                             CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                             MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                             MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], cost: 2100
                },

                7: {
                    parts: [WORK, WORK, WORK, WORK, WORK,   WORK, WORK, WORK, WORK, WORK,
                            WORK, WORK, WORK, WORK, WORK,   WORK, WORK, WORK, WORK, WORK,
                            CARRY, CARRY, CARRY, CARRY, CARRY,  CARRY, CARRY, CARRY, CARRY, CARRY,
                            MOVE, MOVE, MOVE, MOVE, MOVE,   MOVE, MOVE, MOVE, MOVE, MOVE,
                            MOVE, MOVE, MOVE, MOVE, MOVE,   MOVE, MOVE, MOVE, MOVE, MOVE],
                    cost: 3500
                },

                8: {
                    parts: [WORK, WORK, WORK, WORK, WORK,   WORK, WORK, WORK, WORK, WORK,
                            WORK, WORK, WORK, WORK, WORK,   WORK, WORK, WORK, WORK, WORK,
                            CARRY, CARRY, CARRY, CARRY, CARRY,  CARRY, CARRY, CARRY, CARRY, CARRY,
                            MOVE, MOVE, MOVE, MOVE, MOVE,   MOVE, MOVE, MOVE, MOVE, MOVE,
                            MOVE, MOVE, MOVE, MOVE, MOVE,   MOVE, MOVE, MOVE, MOVE, MOVE],
                    cost: 3500
                },
            },

            carrier: {

                1: {parts: [CARRY, CARRY, CARRY,
                            MOVE, MOVE, MOVE], cost: 300},

                2: {parts: [WORK,
                            CARRY, CARRY, CARRY,
                            MOVE, MOVE, MOVE, MOVE], cost: 450},

                3: {
                    parts: [WORK,
                            CARRY, CARRY, CARRY, CARRY, CARRY,
                            CARRY,
                            MOVE, MOVE, MOVE, MOVE, MOVE,
                            MOVE, MOVE], cost: 750
                },

                4: {
                    parts: [WORK,
                            CARRY, CARRY, CARRY, CARRY, CARRY,
                            CARRY, CARRY, CARRY, CARRY, CARRY,
                            MOVE, MOVE, MOVE, MOVE, MOVE,
                            MOVE, MOVE, MOVE, MOVE, MOVE,
                            MOVE], cost: 1150
                },

                5: {
                    parts: [WORK,
                            CARRY, CARRY, CARRY, CARRY, CARRY,
                            CARRY, CARRY, CARRY, CARRY, CARRY,
                            CARRY, CARRY, CARRY, CARRY, CARRY,
                            MOVE, MOVE, MOVE, MOVE, MOVE,
                            MOVE, MOVE, MOVE, MOVE, MOVE,
                            MOVE, MOVE, MOVE, MOVE, MOVE,
                            MOVE], cost: 1650
                },

                6: {
                    parts: [
                            WORK,
                            CARRY, CARRY, CARRY, CARRY, CARRY,
                            CARRY, CARRY, CARRY, CARRY, CARRY,
                            CARRY, CARRY, CARRY, CARRY, CARRY,
                            CARRY, CARRY, CARRY, CARRY,
                            MOVE, MOVE, MOVE, MOVE, MOVE,
                            MOVE, MOVE, MOVE, MOVE, MOVE,
                            MOVE, MOVE, MOVE, MOVE, MOVE,
                            MOVE, MOVE, MOVE, MOVE, MOVE], cost: 2050
                },

                7: {
                    parts: [WORK, WORK,
                            CARRY, CARRY, CARRY,
                            CARRY, CARRY, CARRY, CARRY, CARRY,
                            CARRY, CARRY, CARRY, CARRY, CARRY,
                            CARRY, CARRY, CARRY, CARRY, CARRY,
                            CARRY, CARRY, CARRY, CARRY, CARRY,
                            MOVE, MOVE, MOVE, MOVE, MOVE,
                            MOVE, MOVE, MOVE, MOVE, MOVE,
                            MOVE, MOVE, MOVE, MOVE, MOVE,
                            MOVE, MOVE, MOVE, MOVE, MOVE,
                            MOVE, MOVE, MOVE, MOVE, MOVE], cost: 2600
                },

                8: {
                    parts: [WORK, WORK,
                            CARRY, CARRY, CARRY,
                            CARRY, CARRY, CARRY, CARRY, CARRY,
                            CARRY, CARRY, CARRY, CARRY, CARRY,
                            CARRY, CARRY, CARRY, CARRY, CARRY,
                            CARRY, CARRY, CARRY, CARRY, CARRY,
                            MOVE, MOVE, MOVE, MOVE, MOVE,
                            MOVE, MOVE, MOVE, MOVE, MOVE,
                            MOVE, MOVE, MOVE, MOVE, MOVE,
                            MOVE, MOVE, MOVE, MOVE, MOVE,
                            MOVE, MOVE, MOVE, MOVE, MOVE], cost: 2600
                }
            },

            manager: {
                1: {parts: [CARRY, CARRY, CARRY,
                            MOVE, MOVE, MOVE], cost: 300},

                2: {parts: [CARRY, CARRY, CARRY, CARRY, CARRY,
                            MOVE, MOVE, MOVE, MOVE, MOVE], cost: 500},

                3: {
                    parts: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                            MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], cost: 800
                },

                4: {
                    parts: [CARRY, CARRY, CARRY, CARRY, CARRY,
                            CARRY, CARRY, CARRY, CARRY, CARRY,
                            CARRY, CARRY, CARRY,
                            MOVE, MOVE, MOVE, MOVE, MOVE,
                            MOVE, MOVE, MOVE, MOVE, MOVE,
                            MOVE, MOVE, MOVE], cost: 1300
                },

                5: {
                    parts: [CARRY, CARRY, CARRY, CARRY, CARRY,
                            CARRY, CARRY, CARRY, CARRY, CARRY,
                            CARRY, CARRY, CARRY, CARRY, CARRY,
                            CARRY, CARRY, CARRY,
                            MOVE, MOVE, MOVE, MOVE, MOVE,
                            MOVE, MOVE, MOVE, MOVE, MOVE,
                            MOVE, MOVE, MOVE, MOVE, MOVE,
                            MOVE, MOVE, MOVE], cost: 1800
                },

                6: {
                    parts: [CARRY, CARRY, CARRY, CARRY, CARRY,
                            CARRY, CARRY, CARRY, CARRY, CARRY,
                            CARRY, CARRY, CARRY, CARRY, CARRY,
                            CARRY, CARRY, CARRY, CARRY, CARRY,
                            CARRY, CARRY, CARRY,
                            MOVE, MOVE, MOVE, MOVE, MOVE,
                            MOVE, MOVE, MOVE, MOVE, MOVE,
                            MOVE, MOVE, MOVE, MOVE, MOVE,
                            MOVE, MOVE, MOVE, MOVE, MOVE,
                            MOVE, MOVE, MOVE], cost: 2300
                },

                7: {
                    parts: [CARRY, CARRY, CARRY, CARRY, CARRY,
                            CARRY, CARRY, CARRY, CARRY, CARRY,
                            CARRY, CARRY, CARRY, CARRY, CARRY,
                            CARRY, CARRY, CARRY, CARRY, CARRY,
                            CARRY, CARRY, CARRY, CARRY, CARRY,
                            MOVE, MOVE, MOVE, MOVE, MOVE,
                            MOVE, MOVE, MOVE, MOVE, MOVE,
                            MOVE, MOVE, MOVE, MOVE, MOVE,
                            MOVE, MOVE, MOVE, MOVE, MOVE,
                            MOVE, MOVE, MOVE, MOVE, MOVE], cost: 2500
                },

                8: {
                    parts: [CARRY, CARRY, CARRY, CARRY, CARRY,
                            CARRY, CARRY, CARRY, CARRY, CARRY,
                            CARRY, CARRY, CARRY, CARRY, CARRY,
                            CARRY, CARRY, CARRY, CARRY, CARRY,
                            CARRY, CARRY, CARRY, CARRY, CARRY,
                            MOVE, MOVE, MOVE, MOVE, MOVE,
                            MOVE, MOVE, MOVE, MOVE, MOVE,
                            MOVE, MOVE, MOVE, MOVE, MOVE,
                            MOVE, MOVE, MOVE, MOVE, MOVE,
                            MOVE, MOVE, MOVE, MOVE, MOVE], cost: 2500
                }
            },

            portableContainer: {
                1: {parts: [CARRY, CARRY, CARRY, CARRY, CARRY,
                            MOVE], cost: 300},

                2: {parts: [CARRY, CARRY, CARRY, CARRY, CARRY,
                            CARRY, CARRY, CARRY, CARRY,
                            MOVE], cost: 500},

                3: {
                    parts: [CARRY, CARRY, CARRY, CARRY, CARRY,
                            CARRY, CARRY, CARRY, CARRY, CARRY,
                            CARRY, CARRY, CARRY, CARRY, CARRY,
                            MOVE], cost: 800
                },

                4: {
                    parts: [CARRY, CARRY, CARRY, CARRY, CARRY,
                            CARRY, CARRY, CARRY, CARRY, CARRY,
                            CARRY, CARRY, CARRY, CARRY, CARRY,
                            CARRY, CARRY, CARRY, CARRY, CARRY,
                            CARRY, CARRY, CARRY, CARRY, CARRY,
                            MOVE], cost: 1300
                },

                5: {
                    parts: [CARRY, CARRY, CARRY, CARRY, CARRY,
                            CARRY, CARRY, CARRY, CARRY, CARRY,
                            CARRY, CARRY, CARRY, CARRY, CARRY,
                            CARRY, CARRY, CARRY, CARRY, CARRY,
                            CARRY, CARRY, CARRY, CARRY, CARRY,
                            CARRY, CARRY, CARRY, CARRY, CARRY,
                            CARRY, CARRY, CARRY, CARRY, CARRY,
                            MOVE], cost: 1800
                },

                6: {
                    parts: [CARRY, CARRY, CARRY, CARRY, CARRY,
                            CARRY, CARRY, CARRY, CARRY, CARRY,
                            CARRY, CARRY, CARRY, CARRY, CARRY,
                            CARRY, CARRY, CARRY, CARRY, CARRY,
                            CARRY, CARRY, CARRY, CARRY, CARRY,
                            CARRY, CARRY, CARRY, CARRY, CARRY,
                            CARRY, CARRY, CARRY, CARRY, CARRY,
                            CARRY, CARRY, CARRY, CARRY, CARRY,
                            CARRY, CARRY, CARRY, CARRY, CARRY,
                            MOVE], cost: 2300
                },

                7: {
                    parts: [CARRY, CARRY, CARRY, CARRY, CARRY,
                            CARRY, CARRY, CARRY, CARRY, CARRY,
                            CARRY, CARRY, CARRY, CARRY, CARRY,
                            CARRY, CARRY, CARRY, CARRY, CARRY,
                            CARRY, CARRY, CARRY, CARRY, CARRY,
                            CARRY, CARRY, CARRY, CARRY, CARRY,
                            CARRY, CARRY, CARRY, CARRY, CARRY,
                            CARRY, CARRY, CARRY, CARRY, CARRY,
                            CARRY, CARRY, CARRY, CARRY, CARRY,
                            CARRY, CARRY, CARRY, CARRY,
                            MOVE], cost: 2500
                },

                8: {
                    parts: [CARRY, CARRY, CARRY, CARRY, CARRY,
                            CARRY, CARRY, CARRY, CARRY, CARRY,
                            CARRY, CARRY, CARRY, CARRY, CARRY,
                            CARRY, CARRY, CARRY, CARRY, CARRY,
                            CARRY, CARRY, CARRY, CARRY, CARRY,
                            CARRY, CARRY, CARRY, CARRY, CARRY,
                            CARRY, CARRY, CARRY, CARRY, CARRY,
                            CARRY, CARRY, CARRY, CARRY, CARRY,
                            CARRY, CARRY, CARRY, CARRY, CARRY,
                            CARRY, CARRY, CARRY, CARRY,
                            MOVE], cost: 2500
                }
            },

            sentry: {
                1: {parts: [MOVE], cost: 50},
                2: {parts: [MOVE, MOVE, ATTACK, HEAL], cost: 430},
                3: {parts: [MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, HEAL], cost: 690},

                4: {parts: [MOVE, MOVE, MOVE, MOVE, MOVE,
                    MOVE, MOVE,
                    ATTACK, ATTACK, ATTACK, ATTACK, ATTACK,
                    RANGED_ATTACK,
                    HEAL], cost: 1150},

                5: {parts: [MOVE, MOVE, MOVE, MOVE, MOVE,
                            MOVE, MOVE,  // 350
                            RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, // 750
                            HEAL, HEAL], cost: 1600},

                6: {parts: [MOVE, MOVE, MOVE, MOVE, MOVE, // 250
                                    MOVE, MOVE, MOVE, MOVE, MOVE, // 250
                                    RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, // 750
                                    RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK // 750
                                    ], cost: 2000},   // 500

                7: {parts: [MOVE, MOVE, MOVE, MOVE, MOVE, // 250
                                    MOVE, MOVE, MOVE, MOVE, MOVE, // 250
                                    RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, // 750
                                    RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK // 750
                                    ], cost: 2000},   // 500


                8: {parts: [MOVE, MOVE, MOVE, MOVE, MOVE, // 250
                            MOVE, MOVE, MOVE, MOVE, MOVE, // 250
                            RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, // 750
                            RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK // 750
                             ], cost: 2000}   // 500
            },

            keeperKiller: {
                1: {parts: [MOVE], cost: 50},
                2: {parts: [MOVE], cost: 50},
                3: {parts: [MOVE], cost: 50},
                4: {parts: [MOVE], cost: 50},
                5: {parts: [MOVE], cost: 50},
                6: {parts: [MOVE], cost: 50},

                7: {
                    parts: [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, // 50
                            MOVE, MOVE, MOVE, MOVE, MOVE, // 250
                            MOVE, MOVE, MOVE, MOVE, MOVE, // 250
                            MOVE, MOVE, MOVE, MOVE, MOVE, // 250
                            MOVE, MOVE, MOVE, MOVE, MOVE, // 250
                            MOVE, MOVE, MOVE, MOVE, MOVE, // 250
                            ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, // 400
                            ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, // 400
                            ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, // 400
                            HEAL, HEAL, HEAL, HEAL, HEAL   // 1250
                    ], cost: 3750},

                8: {
                    parts: [MOVE, MOVE, MOVE, MOVE, MOVE, // 250
                            MOVE, MOVE, MOVE, MOVE, MOVE, // 250
                            MOVE, MOVE, MOVE, MOVE, MOVE, // 250
                            MOVE, MOVE, MOVE, MOVE, MOVE, // 250
                            MOVE, MOVE, MOVE, MOVE, MOVE, // 250
                            ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, // 400
                            ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, // 400
                            ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, // 400
                            ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, // 400
                            HEAL, HEAL, HEAL, HEAL, HEAL   // 1250
                    ], cost: 4100},
            },

            invaderStopperKiller: {
                1: {parts: [MOVE], cost: 50},
                2: {parts: [MOVE], cost: 50},
                3: {parts: [MOVE], cost: 50},
                4: {parts: [MOVE], cost: 50},
                5: {parts: [MOVE], cost: 50},
                6: {parts: [MOVE], cost: 50},
                7: {parts: [MOVE, MOVE, MOVE, MOVE, MOVE, // 250
                    MOVE, MOVE, MOVE, MOVE, MOVE, // 250
                    MOVE, MOVE, MOVE, MOVE, MOVE, // 250
                    MOVE, MOVE, MOVE, MOVE, MOVE, // 250
                    MOVE, MOVE, MOVE, MOVE, MOVE, // 250
                    ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, // 400
                    ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, // 400
                    ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, // 400
                    ATTACK, ATTACK, ATTACK, // 240
                    RANGED_ATTACK, RANGED_ATTACK,                               // 300
                    RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK // 750
                ], cost: 3740},
                8: {parts: [MOVE, MOVE, MOVE, MOVE, MOVE, // 250
                    MOVE, MOVE, MOVE, MOVE, MOVE, // 250
                    MOVE, MOVE, MOVE, MOVE, MOVE, // 250
                    MOVE, MOVE, MOVE, MOVE, MOVE, // 250
                    MOVE, MOVE, MOVE, MOVE, MOVE, // 250
                    ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, // 400
                    ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, // 400
                    ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, // 400
                    ATTACK, ATTACK, ATTACK, // 240
                    RANGED_ATTACK, RANGED_ATTACK,                               // 300
                    RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK // 750
                ], cost: 3740}
            },

            invaderStopperHealer: {
                1: {parts: [MOVE], cost: 50},
                2: {parts: [MOVE], cost: 50},
                3: {parts: [MOVE], cost: 50},
                4: {parts: [MOVE], cost: 50},
                5: {parts: [MOVE], cost: 50},
                6: {parts: [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, // 50
                            TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, // 50
                            MOVE, MOVE, MOVE, MOVE, MOVE, // 250
                            MOVE, MOVE, MOVE, MOVE, MOVE, // 250
                            MOVE, MOVE, MOVE, MOVE, MOVE, // 250
                            HEAL, HEAL, HEAL, HEAL, HEAL // 1250
                ], cost: 2100},

                7: {parts: [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, // 50
                    TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, // 50
                    MOVE, MOVE, MOVE, MOVE, MOVE, // 250
                    MOVE, MOVE, MOVE, MOVE, MOVE, // 250
                    MOVE, MOVE, MOVE, MOVE, MOVE, // 250
                    MOVE, MOVE, MOVE, MOVE, MOVE, // 250
                    HEAL, HEAL, HEAL, HEAL, HEAL, // 1250
                    HEAL, HEAL, HEAL, HEAL, HEAL // 1250
                ], cost: 3600},

                8: {parts: [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, // 50
                            TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, // 50
                            MOVE, MOVE, MOVE, MOVE, MOVE, // 250
                            MOVE, MOVE, MOVE, MOVE, MOVE, // 250
                            MOVE, MOVE, MOVE, MOVE, MOVE, // 250
                            MOVE, MOVE, MOVE, MOVE, MOVE, // 250
                            MOVE, MOVE, MOVE, MOVE, MOVE, // 250
                            HEAL, HEAL, HEAL, HEAL, HEAL, // 1250
                            HEAL, HEAL, HEAL, HEAL, HEAL, // 1250
                            HEAL, HEAL, HEAL, HEAL, HEAL // 1250
                            ], cost: 5100}
            },

            invaderStopperMulti: {
                1: {parts: [MOVE], cost: 50},
                2: {parts: [MOVE, MOVE, ATTACK, HEAL], cost: 430},
                3: {parts: [MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, HEAL], cost: 690},

                4: {parts: [MOVE, MOVE, MOVE, MOVE, MOVE,
                            MOVE, MOVE,
                            ATTACK, ATTACK, ATTACK, ATTACK, ATTACK,
                            RANGED_ATTACK,
                            HEAL], cost: 1150},

                5: {parts: [MOVE, MOVE, MOVE, MOVE, MOVE,
                            MOVE, MOVE, MOVE, MOVE,
                            ATTACK, ATTACK, ATTACK, ATTACK, ATTACK,
                            ATTACK,
                            RANGED_ATTACK,
                            HEAL, HEAL], cost: 1580},

                6: {parts: [MOVE, MOVE, MOVE, MOVE, MOVE,
                            MOVE, MOVE, MOVE, MOVE, MOVE,
                            MOVE, MOVE,
                            ATTACK, ATTACK, ATTACK, ATTACK, ATTACK,
                            ATTACK, ATTACK, ATTACK,
                            RANGED_ATTACK, RANGED_ATTACK,
                            HEAL, HEAL], cost: 2040},

                7: {parts: [MOVE, MOVE, MOVE, MOVE, MOVE,
                                    MOVE, MOVE, MOVE, MOVE, MOVE,
                                    MOVE, MOVE, MOVE, MOVE, MOVE,
                                    MOVE,
                                    ATTACK, ATTACK, ATTACK, ATTACK, ATTACK,
                                    ATTACK, ATTACK, ATTACK, ATTACK, ATTACK,
                                    RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK,
                                    HEAL, HEAL, HEAL], cost: 2800},


                8: {parts: [MOVE, MOVE, MOVE, MOVE, MOVE,
                            MOVE, MOVE, MOVE, MOVE, MOVE,
                            MOVE, MOVE, MOVE, MOVE, MOVE,
                            MOVE, MOVE, MOVE, MOVE, MOVE,
                            ATTACK, ATTACK, ATTACK, ATTACK, ATTACK,
                            ATTACK, ATTACK, ATTACK, ATTACK, ATTACK,
                            ATTACK, ATTACK, ATTACK,
                            RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK,
                            HEAL, HEAL, HEAL, HEAL], cost: 3490}
            },

            powerKiller: {
                1: {parts: [MOVE], cost: 50},
                2: {parts: [MOVE], cost: 50},
                3: {parts: [MOVE], cost: 50},
                4: {parts: [MOVE], cost: 50},
                5: {parts: [MOVE], cost: 50},
                6: {parts: [MOVE], cost: 50},
                7: {parts: [MOVE, MOVE, MOVE, MOVE, MOVE, // 250
                            MOVE, MOVE, MOVE, MOVE, MOVE, // 250
                            MOVE, MOVE, MOVE, MOVE, MOVE,  // 250
                            ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, // 400
                            ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, // 400
                            ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, // 400
                            ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, // 400
                            ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, // 400
                            ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, // 400
                ], cost: 3150},
                8: {parts: [MOVE, MOVE, MOVE, MOVE, MOVE, // 250
                            MOVE, MOVE, MOVE, MOVE, MOVE, // 250
                            MOVE, MOVE, MOVE, MOVE, MOVE,  // 250
                            ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, // 400
                            ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, // 400
                            ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, // 400
                            ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, // 400
                            ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, // 400
                            ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, // 400
                ], cost: 3150},
            },

            powerHealer: {
                1: {parts: [MOVE], cost: 50},
                2: {parts: [MOVE], cost: 50},
                3: {parts: [MOVE], cost: 50},
                4: {parts: [MOVE], cost: 50},
                5: {parts: [MOVE], cost: 50},
                6: {parts: [MOVE], cost: 50},

                7: {parts: [MOVE, MOVE, MOVE, MOVE, MOVE, // 250
                            MOVE, MOVE, MOVE, MOVE, MOVE, // 250
                            MOVE, MOVE, MOVE, MOVE, MOVE, // 250
                            HEAL, HEAL, HEAL, HEAL, HEAL, // 1250
                            HEAL, HEAL, HEAL, HEAL, HEAL, // 1250
                            HEAL, HEAL, HEAL, HEAL, HEAL // 1250
                ], cost: 4500},


                8: {parts: [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH,  TOUGH, TOUGH, TOUGH, TOUGH, TOUGH,  //100
                            MOVE, MOVE, MOVE, MOVE, MOVE,   MOVE, MOVE, MOVE, MOVE, MOVE,           // 500
                            MOVE, MOVE, MOVE, MOVE, MOVE,   MOVE, MOVE, MOVE, MOVE, MOVE,           // 500
                            MOVE, MOVE, MOVE, MOVE, MOVE,                                           // 250
                            HEAL, HEAL, HEAL, HEAL, HEAL,   HEAL, HEAL, HEAL, HEAL, HEAL,           // 2500
                            HEAL, HEAL, HEAL, HEAL, HEAL                                            // 1250

                ], cost: 5100}

                /*
                8: {parts: [MOVE, MOVE, MOVE, MOVE, MOVE, // 250
                    MOVE, MOVE, MOVE, MOVE, MOVE, // 250
                    MOVE, MOVE, MOVE, MOVE, MOVE, // 250
                    MOVE, MOVE, MOVE, MOVE, MOVE, // 250
                    HEAL, HEAL, HEAL, HEAL, HEAL, // 1250
                    HEAL, HEAL, HEAL, HEAL, HEAL, // 1250
                    HEAL, HEAL, HEAL, HEAL, HEAL, // 1250
                    HEAL, HEAL, HEAL, HEAL, HEAL // 1250
                ], cost: 6000}
                */
            },

            claimer: {
                1: {parts: [MOVE], cost: 50},
                2: {parts: [MOVE], cost: 50},
                3: {parts: [CLAIM, MOVE], cost: 650},
                4: {parts: [CLAIM, MOVE], cost: 650},
                5: {parts: [CLAIM, MOVE, MOVE, HEAL], cost: 1050},
                6: {parts: [TOUGH, CLAIM, MOVE, MOVE, MOVE, MOVE, HEAL, HEAL], cost: 1310},
                7: {parts: [TOUGH, CLAIM, MOVE, MOVE, MOVE, MOVE, HEAL, HEAL], cost: 1310},
                8: {parts: [TOUGH, CLAIM, MOVE, MOVE, MOVE, MOVE, HEAL, HEAL], cost: 1310}
            },

            reserver: {
                1: {parts: [MOVE], cost: 50},
                2: {parts: [MOVE], cost: 50},
                3: {parts: [MOVE], cost: 50},
                4: {parts: [CLAIM, CLAIM, MOVE, MOVE], cost: 1300},
                5: {parts: [CLAIM, CLAIM, MOVE, MOVE], cost: 1300},
                6: {parts: [CLAIM, CLAIM, CLAIM,
                            MOVE, MOVE, MOVE], cost: 1950},
                7: {parts: [CLAIM, CLAIM, CLAIM, CLAIM, CLAIM, CLAIM,
                            MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], cost: 3900},
                8: {parts: [CLAIM, CLAIM, CLAIM, CLAIM, CLAIM,
                            CLAIM,
                            MOVE, MOVE, MOVE, MOVE, MOVE,
                            MOVE], cost: 3900},
            },

            pureWorker: {
                1: {parts: [WORK, WORK, MOVE, MOVE], cost: 300},

                2: {parts: [WORK, WORK, WORK,
                    MOVE, MOVE, MOVE], cost: 450},

                3: {parts: [WORK, WORK, WORK, WORK,
                    MOVE, MOVE, MOVE, MOVE], cost: 600},

                4: {
                    parts: [WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                            MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], cost: 1050
                },

                5: {
                    parts: [ WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                        MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], cost: 1650
                },

                6: {
                    parts: [ WORK, WORK, WORK, WORK, WORK,  WORK, WORK, WORK, WORK, WORK,
                             WORK, WORK, WORK, WORK,
                             MOVE, MOVE, MOVE, MOVE, MOVE,  MOVE, MOVE, MOVE, MOVE, MOVE,
                             MOVE, MOVE, MOVE, MOVE], cost: 2100
                },
                /*
                7: {
                    parts: [WORK, WORK, WORK, WORK, WORK,   WORK, WORK, WORK, WORK, WORK,
                            WORK, WORK, WORK, WORK, WORK,   WORK, WORK, WORK, WORK, WORK,
                            MOVE, MOVE, MOVE, MOVE, MOVE,   MOVE, MOVE, MOVE, MOVE, MOVE,
                            MOVE, MOVE, MOVE, MOVE, MOVE,   MOVE, MOVE, MOVE, MOVE, MOVE],
                    cost: 3000
                },
                */

                7: {
                    parts: [WORK, WORK, WORK, WORK, WORK,   WORK, WORK, WORK, WORK, WORK,
                        WORK, WORK, WORK, WORK, WORK,   WORK, WORK, WORK, WORK, WORK,
                        WORK, WORK, WORK, WORK, WORK,   WORK, WORK, WORK, WORK, WORK,
                        MOVE, MOVE, MOVE, MOVE, MOVE,   MOVE, MOVE, MOVE, MOVE, MOVE,
                        MOVE, MOVE, MOVE, MOVE, MOVE,   MOVE, MOVE, MOVE, MOVE, MOVE],
                    cost: 4000
                },




            /*
                8: {
                    parts: [WORK, WORK, WORK, WORK, WORK,   WORK, WORK, WORK, WORK, WORK,
                            WORK, WORK, WORK, WORK, WORK,   WORK, WORK, WORK, WORK, WORK,
                            WORK, WORK, WORK, WORK, WORK,   MOVE, MOVE, MOVE, MOVE, MOVE,
                            MOVE, MOVE, MOVE, MOVE, MOVE,   MOVE, MOVE, MOVE, MOVE, MOVE,
                            MOVE, MOVE, MOVE, MOVE, MOVE,   MOVE, MOVE, MOVE, MOVE, MOVE],
                    cost: 3750
                },
                */


                8: {
                    parts: [
                        WORK, WORK, WORK, WORK, WORK,   WORK, WORK, WORK, WORK, WORK,
                        WORK, WORK, WORK, WORK, WORK,   WORK, WORK, WORK, WORK, WORK,
                        WORK, WORK, WORK, WORK, WORK,   WORK, WORK, WORK, WORK, WORK,
                        WORK, WORK, WORK, WORK, WORK,   WORK, WORK, WORK, WORK, WORK,
                        MOVE, MOVE, MOVE, MOVE, MOVE,   MOVE, MOVE, MOVE, MOVE, MOVE],
                    cost: 4600
                },

            },

            pureAttacker: {
                1: {parts: [MOVE], cost: 50},
                2: {parts: [MOVE], cost: 50},
                3: {parts: [MOVE], cost: 50},
                4: {parts: [MOVE], cost: 50},
                5: {parts: [MOVE], cost: 50},
                6: {parts: [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH,
                            TOUGH, TOUGH, TOUGH, TOUGH, TOUGH,
                            TOUGH, TOUGH, TOUGH, TOUGH, TOUGH,
                            TOUGH, TOUGH, TOUGH, TOUGH,
                            MOVE, MOVE, MOVE, MOVE, MOVE, // 250
                            MOVE, MOVE, MOVE, MOVE, MOVE, // 250
                            MOVE, MOVE, MOVE, MOVE, MOVE,  // 250
                            MOVE, MOVE, MOVE, MOVE, MOVE,  // 250
                            ATTACK // 400

                ], cost: 1270},

                7: {parts: [MOVE, MOVE, MOVE, MOVE, MOVE, // 250
                    MOVE, MOVE, MOVE, MOVE, MOVE, // 250
                    MOVE, MOVE, MOVE, MOVE, MOVE,  // 250
                    MOVE, MOVE, MOVE, MOVE, MOVE,  // 250
                    MOVE, MOVE, MOVE, MOVE, MOVE,  // 250
                    ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, // 400
                    ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, // 400
                    ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, // 400
                    ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, // 400
                    ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, // 400
                ], cost: 3250},

                8: {parts: [MOVE, MOVE, MOVE, MOVE, MOVE, // 250
                    MOVE, MOVE, MOVE, MOVE, MOVE, // 250
                    MOVE, MOVE, MOVE, MOVE, MOVE,  // 250
                    MOVE, MOVE, MOVE, MOVE, MOVE,  // 250
                    MOVE, MOVE, MOVE, MOVE, MOVE,  // 250
                    ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, // 400
                    ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, // 400
                    ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, // 400
                    ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, // 400
                    ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, // 400
                ], cost: 3250},
            }
        }
    };
}

