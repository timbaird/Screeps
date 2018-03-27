/*jshint esversion: 6 */

function updateLabSettings()
{
	const vMem = {};

    // PUNS OLD ROOM 1
    vMem.W63S52 =
	{
            // left row TOP to BOTTOM

            '59adfe4ef76ca03a8c3e9b7f': {role: 'input', mineral: 'GHO2'},  //
            '59ae8bdd4957a47fd4f9cbc4': {role: 'input', mineral: 'GH2O'},  //
            '59aed982191fe12a03a7d107': {role: 'input', mineral: 'ZHO2'},   //1

            // middle
            '59e08b0a63521058b8ce55ec': {role: 'input', mineral: 'X'}, // 7

            // right row TOP to BOTTOM
            '59ae317534e39f7eb2503e98': {role: 'output', mineral: 'XGHO2'}, // XGHO2 TOUGH
            '59ae779a2ecb1103cb51dff9': {role: 'output', mineral: 'XGH2O'}, // XGH2O UPGRADE
            '59aec5772a57c2181edeeae9': {role: 'output', mineral: 'XZHO2'}, // XZHO2 FATIGUE

            // booster row - top to bottom
            '59e1a3df2f1fa167fa361210': {role: 'booster', mineral: 'none'}, // 8   // XGHO2 TOUGH
            '59e17cd77e7fad4fa8dda607': {role: 'booster', mineral: 'none'}, // 9   // XZHO2  FATIGUE
            '58994785cb5d2445ddb50e21': {role: 'booster', mineral: 'none'}, // 10   //  XZH2O DISMANTLE

			// booster row - top to bottom
        	//'59e1a3df2f1fa167fa361210': {role: 'booster', mineral: 'none'}, // 8   // XGHO2 TOUGH
        	//'59e17cd77e7fad4fa8dda607': {role: 'booster', mineral: 'none'}, // 9   // XZHO2  FATIGUE
        	//'58994785cb5d2445ddb50e21': {role: 'booster', mineral: 'none'} // 10   //  XZH2O DISMANTLE

        };

	// MAIN SWAMP ROOM
	vMem.W63S56 =
	{
		// left row TOP to BOTTOM

		'58998430d5e6bd7b2e9b3d33': {role: 'input', mineral: 'KO'},  //KO
		'58992252748a0f047a79140a': {role: 'input', mineral: 'ZH'},  //ZH
		'5898613176e57bd91364d1c8': {role: 'input', mineral: 'GH'},   //GH

		// middle
		'589d488e1ab5134f3a3aa8a6': {role: 'input', mineral: 'OH'}, // OH

		// right row TOP to BOTTOM
		'589a07208b8fcc1e35b478cc': {role: 'output', mineral: 'none'}, // KHO2 overproduced
		'5899c1520dae50796e691c3f': {role: 'output', mineral: 'none'}, // ZH2O overproduced
		'58982270f67e40735beb26e8': {role: 'output', mineral: 'GH2O'}, // GH20

		// booster row - top to bottom
		'589a95128c1c3bbe681d65ee': {role: 'booster', mineral: 'XLHO2'}, // XLHO2 HEAL
		'5898bee0a56afe276c1b2f1d': {role: 'booster', mineral: 'XGHO2'}, // XGHO2 TOUGH
		'58994785cb5d2445ddb50e21': {role: 'booster', mineral: 'XZHO2'}, // XZHO2 FATIGUE

        // booster row - top to bottom
        //'589a95128c1c3bbe681d65ee': {role: 'booster', mineral: 'none'}, // XLHO2 HEAL
        //'5898bee0a56afe276c1b2f1d': {role: 'booster', mineral: 'none'}, // XGHO2 TOUGH
        //'58994785cb5d2445ddb50e21': {role: 'booster', mineral: 'none'} // XZHO2 FATIGUE

	};

	// ULTRA BLOCKER ROOM
	vMem.W64S58 =
	{
		// left row TOP to BOTTOM
		'5888758d1a68eb155f962bd4': {role: 'input', mineral: 'LO'},  //3
		'5887e555d21848fb182e43c6': {role: 'input', mineral: 'GO'},  // 2
		'5886dca620bdfc2e15a64cb9': {role: 'input', mineral: 'ZO'},   //1

		// MIDDLE
		'589db5a62ae31767063fc0f6': {role: 'input', mineral: 'OH'}, // 7

		// right row TOP to BOTTOM
		'5888a518c940547a503a6852': {role: 'output', mineral: 'LHO2'}, // 6
		'588852da04b882cc73bd63b2': {role: 'output', mineral: 'GHO2'}, // GHO2 over produced
		'5886b64a0851ffbc7d216941': {role: 'output', mineral: 'ZHO2'}, // ZHO2 over produced

		// booster row - LEFT TO RIGHT
		'589872fd34f4c344244866e3': {role: 'booster', mineral: 'XGHO2'}, // XGHO2 TOUGH
		'5899befbb966a25d33c9ff7a': {role: 'booster', mineral: 'XZHO2'}, // XZHO2 FATIGUE
		'5899b38831425b6e505d9cff': {role: 'booster', mineral: 'XUH2O'}, // XUH2O ATTACK

        // booster row - LEFT TO RIGHT
        //'589872fd34f4c344244866e3': {role: 'booster', mineral: 'none'}, // XGHO2 TOUGH
        //'5899befbb966a25d33c9ff7a': {role: 'booster', mineral: 'none'}, // XZHO2 FATIGUE
        //'5899b38831425b6e505d9cff': {role: 'booster', mineral: 'none'} // XUH2O ATTACK

	};

    // PUNS OLD ROOM 2
    vMem.W65S53 =
        {
            // LEFT ROW TOP TO BOTTOM
            'asdfg1': {role: 'input', mineral: 'none'},  //3
            'asdfg2': {role: 'input', mineral: 'none'},  // 2
            'asdfg3': {role: 'input', mineral: 'none'},   //1

            'asdfg4': {role: 'input', mineral: 'none'}, // 7

            // RIGHT ROW TOP TO BOTTOM
            'asdfg5': {role: 'output', mineral: 'none'}, // 6
            'asdfg6': {role: 'output', mineral: 'none'}, //
            'asdfg7': {role: 'output', mineral: 'none'}, // 7

            // booster row - top to bottom
            '5a24282f4284ed297bb14961': {role: 'booster', mineral: 'XGH2O'}, //  TOUGH
            'asdfg9': {role: 'booster', mineral: 'none'}, // FATIGUE
            'asdfg10': {role: 'booster', mineral: 'none'} // RANGED ATTACK
        };


	// NEW SOUTH AREA BLOCKER ROOM
	vMem.W66S59 =
	{
		// LEFT ROW TOP TO BOTTOM
		'58ff53c3a63dc82f36ba9598': {role: 'input', mineral: 'UH2O'},  //3
		'58ce6ea5aa0c2b6815ac731e': {role: 'input', mineral: 'LHO2'},  // 2
		'58bf33da2048c52f60b70450': {role: 'input', mineral: 'GH2O'},   //1

		'58be55aa7ee5b3ca64b9ddd6': {role: 'input', mineral: 'X'}, // 7

		// RIGHT ROW TOP TO BOTTOM
		'58ff937b0305ce4157ba5326': {role: 'output', mineral: 'XUH2O'}, // XUH2O ATTACK
		'58cebefee6cf6ce45c77fbbb': {role: 'output', mineral: 'none'}, // XLHO2 over produced
		'58bf5328a99218fb0603eff7': {role: 'output', mineral: 'XGH2O'}, // 7

		// booster row - top to bottom
		'58ff6c2ea78b2476ef903865': {role: 'booster', mineral: 'XGHO2'}, //  XGHO2 TOUGH
		'58cce46b2bdf1daf6bdb56e9': {role: 'booster', mineral: 'XZHO2'}, // XZHO2 FATIGUE
		'58fed2fa8551193443cd96d7': {role: 'booster', mineral: 'XKHO2'}, // XKHO2 RANGED ATTACK

        // booster row - top to bottom
        //'58ff6c2ea78b2476ef903865': {role: 'booster', mineral: 'none'}, //  XGHO2 TOUGH
        //'58cce46b2bdf1daf6bdb56e9': {role: 'booster', mineral: 'none'}, // XZHO2 FATIGUE
        //'58fed2fa8551193443cd96d7': {role: 'booster', mineral: 'none'} // XKHO2 RANGED ATTACK
	};

    // TOP WEST HYDROGEN ROOM
    vMem.W67S51 =
     {
            // TOP ROW LEFT TO RIGHT
            '58c1f5d2b3072a631a06e3e5': {role: 'input', mineral: 'K'},  //3
            '58d29a0ff18fad096788ef9f': {role: 'input', mineral: 'Z'},  // 2
            '592266e86540820b1edf008d': {role: 'input', mineral: 'U'},   //1

            '58c28bfd24d078f728b0cd89': {role: 'input', mineral: 'H'}, // 7

            // BOTTOM ROW LEFT TO RIGHT
            '58c23cf5ef60bf635e0985ec': {role: 'output', mineral: 'none'}, // KH oversupplied
            '58d2c12b00806f34b2a3f5a8': {role: 'output', mineral: 'none'}, //ZH oversupply
            '5922b673095606680a398fe3': {role: 'output', mineral: 'none'}, // UH oversupply

            // booster row - top to bottom
            '59221b3e6445988a34d75f14': {role: 'booster', mineral: 'XGHO2'}, // XGHO2 TOUGH
            '58d274833acba1411f3e37a7': {role: 'booster', mineral: 'XZHO2'}, // XZHO2 FATIGUE
            '592224d52a197e66e0e7bb79': {role: 'booster', mineral: 'XLHO2'}, // XLHO2 HEAL

         	// booster row - top to bottom
         	//'59221b3e6445988a34d75f14': {role: 'booster', mineral: 'none'}, // XGHO2 TOUGH
         	//'58d274833acba1411f3e37a7': {role: 'booster', mineral: 'none'}, // XZHO2 FATIGUE
         	//'592224d52a197e66e0e7bb79': {role: 'booster', mineral: 'none'} // XLHO2 HEAL
        };

    // NEW CENTRE ACCESS ROOM
    vMem.W67S56 =
     {
            // TOP ROW LEFT TO RIGHT
            '59559906b54bc138155ae7e4': {role: 'input', mineral: 'KHO2'},  // 2
            '59554829afd43f640707f599': {role: 'input', mineral: 'ZH2O'},  //3
            '59875ed47d290379845d4250': {role: 'input', mineral: 'ZHO2'},   //1

            '59556319bf6bc06785554e5b': {role: 'input', mineral: 'X'}, // 7

            // BOTTOM ROW LEFT TO RIGHT
            '59559eeebccc661864631afc': {role: 'output', mineral: 'XKHO2'}, // 5
            '594103754c36be480df00a2c': {role: 'output', mineral: 'XZH2O'}, // 6
            '59879c21b19b5711957ef3d5': {role: 'output', mineral: 'XZHO2'}, // 4

            // booster row - left to right
            '595572463761db657009b1d2': {role: 'booster', mineral: 'XGHO2'}, // XGHO2 TOUGH
            '5987f1989779351cbd84b977': {role: 'booster', mineral: 'XZHO2'}, // XZHO2 FATIGUE
            '5988f0c01178603c7f56716a': {role: 'booster', mineral: 'XKHO2'}, // XKHO2 RANGED

         	// booster row - left to right
         	//'595572463761db657009b1d2': {role: 'booster', mineral: 'none'}, // XGHO2 TOUGH
         	//'5987f1989779351cbd84b977': {role: 'booster', mineral: 'none'}, // XZHO2 FATIGUE
         	//'5988f0c01178603c7f56716a': {role: 'booster', mineral: 'none'} // XKHO2 RANGED
        };

    // U BEND
    vMem.W67S59 =
	{
            // TOP ROW LEFT TO RIGHT
            '58e1f491bbed087f3f541ec3': {role: 'input', mineral: 'KH'},  // 2
            '58f1da4e09f5da252b0146f2': {role: 'input', mineral: 'UH'},  //3
            '594b97dbbaa7f4456246f0e3': {role: 'input', mineral: 'LH'},   //1

            '58e24edeb4aed8630a3f34c3': {role: 'input', mineral: 'OH'}, // 7

            // BOTTOM ROW LEFT TO RIGHT
            '58e1639f866bbe2a7cc698db': {role: 'output', mineral: 'KH2O'}, // 5
            '58f1f690cc5d4a6307aef3e1': {role: 'output', mineral: 'UH2O'}, // 6
            '594b344f4dc87d816ed3de10': {role: 'output', mineral: 'LH2O'}, // 4

            // booster row - top to bottom
            '58f1a3502cd70b5e49b9a10b': {role: 'booster', mineral: 'XGHO2'}, // XGHO2 TOUGH
            '594a878d05430905af554c46': {role: 'booster', mineral: 'XZHO2'}, // XZHO2 FATIGUE
            '594a9fd9cd57204f7c96fd61': {role: 'booster', mineral: 'XUH2O'}, // XUH2O ATTACK

        	//'58f1a3502cd70b5e49b9a10b': {role: 'booster', mineral: 'none'}, // XGHO2 TOUGH
        	//'594a878d05430905af554c46': {role: 'booster', mineral: 'none'}, // XZHO2 FATIGUE
        	//'594a9fd9cd57204f7c96fd61': {role: 'booster', mineral: 'none'} //  XUH2O ATTACK
        };

    // TOP WEST OXYGEN ROOM
    vMem.W68S53 =
	{
		// LEFT ROW TOP TO BOTTOM
		'593fc85d5be96ad95e25003c': {role: 'input', mineral: 'Z'},  //3
		'58d4b4b66f86d23629bd58a2': {role: 'input', mineral: 'L'},  // 2
		'58b5eacd0b84992ae186bd33': {role: 'input', mineral: 'G'},

		'58b6689aa5e5777680f9ac63': {role: 'input', mineral: 'O'}, // 7

		// RIGHT ROW TOP TO BOTTOM
		'593ff54e6734fc9a6f5526e8': {role: 'output', mineral: 'none'}, // ZO overproduced
		'58d5b7c82ea225f81ae2a5a5': {role: 'output', mineral: 'LO'}, // 5
		'58b622c85c4a12441a0d340b': {role: 'output', mineral: 'GO'}, //

		// booster row - top to bottom

		'593fa631d169e53ed76871cf': {role: 'booster', mineral: 'XGHO2'}, //  TOUGH
		'593f4f978b52b4835359e69e': {role: 'booster', mineral: 'XZHO2'}, // FATIGUE
		'58d3be57b621838e6b344504': {role: 'booster', mineral: 'XUH20'}, // ATTACK

        //'593fa631d169e53ed76871cf': {role: 'booster', mineral: 'none'}, //  TOUGH
        //'593f4f978b52b4835359e69e': {role: 'booster', mineral: 'none'}, // FATIGUE
        //'58d3be57b621838e6b344504': {role: 'booster', mineral: 'none'} // ATTACK

	};

	// MAIN WEST ROOM
	vMem.W68S58 =
	{
		// left row TOP to BOTTOM
		'589c9b41659688e24adae31c': {role: 'middle', mineral: 'ZK'},  //3
		'589ac5b2accb3f5407bbb376': {role: 'input', mineral: 'K'},  // 2
		'5899db2497b2a6984784fbf3': {role: 'input', mineral: 'Z'},   //1

		// right row TOP to BOTTOM
		'589b369cdd45897125359466': {role: 'middle', mineral: 'UL'}, // 6
		'589a6dc9f773b571e3ae3d3f': {role: 'input', mineral: 'L'}, // 5
		'589a1fa3d1eee08972ae5d0f': {role: 'input', mineral: 'U'}, // 4

		'589b679618b4eeb775cb26de': {role: 'output', mineral: 'G'}, //

		// booster row - top to bottom

		'589ba53e18f2da661a8955b3': {role: 'booster', mineral: 'XGHO2'}, // XGHO2 TOUGH
		'58995d252f87e65a5effed17': {role: 'booster', mineral: 'XZHO2'}, // XZHO2 FATIGUE
		'58986b5773733e2a2ec0f35e': {role: 'booster', mineral: 'XLHO2'}, // XLHO2 HEAL

        //'589ba53e18f2da661a8955b3': {role: 'booster', mineral: 'none'}, // 8
        //'58995d252f87e65a5effed17': {role: 'booster', mineral: 'none'}, // 9
        //'58986b5773733e2a2ec0f35e': {role: 'booster', mineral: 'none'} // 10

	};

	// TOP WEST CORNER KEANIUM ROOM
	vMem.W69S51 =
	{
		// left row TOP to BOTTOM
		'58f6fffef24f287b577317a0': {role: 'input', mineral: 'K'},  //3
		'58b5e3dd9702c66116ade85b': {role: 'input', mineral: 'U'},  // 2
		'58aa2056d832094c476b3ded': {role: 'input', mineral: 'H'},   //1

		'58aa39682048c52f60b105b3': {role: 'input', mineral: 'O'}, // 7

		// right row TOP to BOTTOM
		'58f7476ede1b0916536b00b6': {role: 'output', mineral: 'none'}, // ko - oversupply
		'58b6056b768cb73d10bbe715': {role: 'output', mineral: 'none'}, // UO oversupply
		'58aa571283937ad2274e4427': {role: 'output', mineral: 'OH'}, // 4

		// booster row - top to bottom
		'58f7e369f3d0f1a7071dd2fd': {role: 'booster', mineral: 'XGHO2'}, // TOUGH
		'58b64ec283c5c6052d53d025': {role: 'booster', mineral: 'XZHO2'}, // FATIGUE
		'58f7a45212a81a8778c6b4e2': {role: 'booster', mineral: 'XZH2O'}, // DISMANTLE

        //'58f7e369f3d0f1a7071dd2fd': {role: 'booster', mineral: 'none'}, // TOUGH
        //'58b64ec283c5c6052d53d025': {role: 'booster', mineral: 'none'}, // FATIGUE
        //'58f7a45212a81a8778c6b4e2': {role: 'booster', mineral: 'none'} // DISMANTLE

	};

	// MID WEST AREA BLOCKER
	vMem.W69S57 =
	{
		// TOP ROW LEFT TO RIGHT
		'589c978ac2a7e6bd227e13be': {role: 'input', mineral: 'G'},  //3
		'58a5de7991ef31335345d22c': {role: 'input', mineral: 'O'},  // 2
		'58ed0b479eaa37561ec3cae8': {role: 'input', mineral: 'L'},   //1

		'589cc73d86119a1894cf59c6': {role: 'input', mineral: 'H'}, // 7

		// rBOTTOM ROW LWFT TO RIGHT
		'589d1a712de712f91e9569fe': {role: 'output', mineral: 'GH'}, // GH oversupply
		'58a5fda4a3b02c653ddbb912': {role: 'output', mineral: 'OH'}, // 5
		'58ed29b6d0878cd05fa28d0f': {role: 'output', mineral: 'none'}, // LH oversupply

		// booster row - top to bottom

		'58a5af77afccd0327df769dd': {role: 'booster', mineral: 'XGHO2'}, // TOUGH
		'58ed0657e20a3ecb7de12fe0': {role: 'booster', mineral: 'XZHO2'}, // FATIGUE
		'58eccbb9e13ae74a0f8f38c8': {role: 'booster', mineral: 'XZH2O'}, // DISMANTLE

        //'58a5af77afccd0327df769dd': {role: 'booster', mineral: 'none'}, // TOUGH
        //'58ed0657e20a3ecb7de12fe0': {role: 'booster', mineral: 'none'}, // FATIGUE
        //'58eccbb9e13ae74a0f8f38c8': {role: 'booster', mineral: 'none'} // DISMANTLE
	};

	Memory.settings.labs = vMem;

}


/*

EXAMPLE

Memory.settings.labs.WXXSXX =
 {
 	// LEFT row TOP to BOTTOM
 	'BALLS1': {role: 'input', mineral: 'none'},  //1
 	'BALLS2': {role: 'input', mineral: 'none'},  // 2
 	'BALLS3': {role: 'input', mineral: 'none'},   //3

 	'BALLS4': {role: 'input', mineral: 'none'}, // 4

 	// RIGHT row TOP to BOTTOM
 	'BALLS5': {role: 'output', mineral: 'none'}, // 5
 	'BALLS6': {role: 'output', mineral: 'none'}, // 6
 	'BALLS7': {role: 'output', mineral: 'none'}, // 7

 	// BOOSTER ROW - TOP TO BOTTOM
 	'NUTS8': {role: 'booster', mineral:  'none'}, // 8
 	'NUTS9': {role: 'booster', mineral: 'none'}, // 9
 	'NUTS10': {role: 'booster', mineral: 'none'} // 10
}

 */
