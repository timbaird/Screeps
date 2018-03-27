/*jshint esversion: 6 */

function updateTowerSettings()
{
	const vMem = {};

    // by default a tower will lead
    vMem.default =
    {
        isLead: true,
        leaderId: null,
        target_areas: [
                {topleft: {x: 1, y:1}, bottomRight: {x: 48, y:24}},
                {topleft: {x: 1, y:25}, bottomRight: {x: 48, y:48}}
               ]
    };

    // -------
    // -------
    // -------
    // W63S56 - main swamp room
    // -------
    // -------
    // -------

    // leader
    /*
    vLeaderId = '5894906f7887af12b8768a0a';

    vMem[vLeaderId] =
    {
        isLead: true,
        leaderId: null,
        target_areas: [
            {topleft: {x: 9, y:10}, bottomRight: {x: 34, y:32}},
            {topleft: {x: 4, y:6}, bottomRight: {x: 9, y:12}}
        ]
    };

    // followers
    vMem['5895151d7c386e235cf88163'] = {
        isLead: false,
        leaderId: vLeaderId
    };

    vMem['58952254f861a13a60314f10'] = {
        isLead: false,
        leaderId: vLeaderId
    };

    vMem['589483476d03d84b07c6c5f6'] = {
        isLead: false,
        leaderId: vLeaderId
    };

    vMem['58947b9a0ef11eee73ef9d21'] = {
        isLead: false,
        leaderId: vLeaderId
    };

    vMem['5894764b4a73a89e52c68f1d'] = {
        isLead: false,
        leaderId: vLeaderId
    };

    // -------
    // -------
    // -------
    // W64S58 - ultra bocker room
    // -------
    // -------
    // -------

    // leader

    vLeaderId = '58948df2506227594c39f86c';

    vMem[vLeaderId] =
    {
        isLead: true,
        leaderId: null,
        target_areas: [
            {topleft: {x: 15, y:21}, bottomRight: {x: 27, y:32}},
            {topleft: {x: 8, y:8}, bottomRight: {x: 46, y:43}},
        ]
    };

    // followers
    vMem['58949e1240d345c423f19059'] = {
        isLead: false,
        leaderId: vLeaderId
    };

    vMem['5894904bc136badf4b7bb0d1'] = {
        isLead: false,
        leaderId: vLeaderId
    };

    vMem['5894839661500f17209d25f7'] = {
        isLead: false,
        leaderId: vLeaderId
    };

    vMem['589471ac2aa4ca8f65494ec4'] = {
        isLead: false,
        leaderId: vLeaderId
    };

    vMem['589485ad2d0e65a46320c771'] = {
        isLead: false,
        leaderId: vLeaderId
    };

    // -------
    // -------
    // -------
    // W65S59 - NEW south area access blocker
    // -------
    // -------
    // -------

    // leader

    vLeaderId = '58ac31ccb13426c220119a13';

    vMem[vLeaderId] =
    {
        isLead: true,
        leaderId: null,
        target_areas: [
            {topleft: {x: 16, y:18}, bottomRight: {x: 35, y:30}},
            {topleft: {x: 3, y:16}, bottomRight: {x: 48, y:38}}
        ]
    };

    // followers
    vMem['58a453d526e3a34d0f98ddda'] = {
        isLead: false,
        leaderId: vLeaderId
    };

    vMem['58cc7ad659acd5b1437e3153'] = {
        isLead: false,
        leaderId: vLeaderId
    };

    vMem['58feb216082d441592dc5975'] = {
        isLead: false,
        leaderId: vLeaderId
    };

    vMem['58feb1eac7efe015444d9d51'] = {
        isLead: false,
        leaderId: vLeaderId
    };

    vMem['58feb0beaf225f50184ea5c8'] = {
        isLead: false,
        leaderId: vLeaderId
    };

    // -------
    // -------
    // -------
    // W67S51 - TOP WEST HYDROGEN ROOM
    // -------
    // -------
    // -------

    // leader

    vLeaderId = '58b753a4517d7ff60fa8209a';

    vMem[vLeaderId] =
        {
            isLead: true,
            leaderId: null,
            target_areas: [
                {topleft: {x: 19, y:17}, bottomRight: {x: 33, y:30}},
                {topleft: {x: 10, y:8}, bottomRight: {x: 42, y:39}}
            ]
        };

    // followers
    vMem['58bba6cb454267f03c103866'] = {
        isLead: false,
        leaderId: vLeaderId
    };

    vMem['58d2426a743baa463e5f4c7b'] = {
        isLead: false,
        leaderId: vLeaderId
    };

    vMem['591faaa7463102002f972c44'] = {
        isLead: false,
        leaderId: vLeaderId
    };

    vMem['591fba1ae2e3837051ec8a10'] = {
        isLead: false,
        leaderId: vLeaderId
    };

    vMem['591fc6f324bdcd63a294d8a8'] = {
        isLead: false,
        leaderId: vLeaderId
    };

    // -------
    // -------
    // -------
    // W67S56 - new centre miner
    // -------
    // -------
    // -------

    // leader
    vLeaderId = '5921b480cfebecab0e832d75';

    vMem[vLeaderId] =
        {
            isLead: true,
            leaderId: null,
            target_areas: [
                {topleft: {x: 1, y:48}, bottomRight: {x: 1, y:48}},
                {topleft: {x: 1, y:48}, bottomRight: {x: 1, y:48}}
            ]
        };

    // followers
    vMem['591a55fefb3d19128fe954e2'] = {
        isLead: false,
        leaderId: vLeaderId
    };

    vMem['5954b8e352fe1d2059891a86'] = {
        isLead: false,
        leaderId: vLeaderId
    };

    vMem['1xkcd31'] = {
        isLead: false,
        leaderId: vLeaderId
    };

    vMem['1xkcd41'] = {
        isLead: false,
        leaderId: vLeaderId
    };

    vMem['1xkcd51'] = {
        isLead: false,
        leaderId: vLeaderId
    };


    // -------
    // -------
    // -------
    // W67S59 - U BEND ROOM
    // -------
    // -------
    // -------

    // leader

    vLeaderId = '58d8963d2d2fba1b0aba7004';

    vMem[vLeaderId] =
        {
            isLead: true,
            leaderId: null,
            target_areas: [
                {topleft: {x: 25, y:19}, bottomRight: {x: 39, y:34}},
                {topleft: {x: 9, y:9}, bottomRight: {x: 49, y:49}}
            ]
        };

    // followers
    vMem['58d43c29596a653a02f91f69'] = {
        isLead: false,
        leaderId: vLeaderId
    };

    vMem['58f15865bfb9be7015f7e4ef'] = {
        isLead: false,
        leaderId: vLeaderId
    };

    vMem['5949a412d6c4009b6ba1f925'] = {
        isLead: false,
        leaderId: vLeaderId
    };

    vMem['5949a3ee36a1603f73a3f4ad'] = {
        isLead: false,
        leaderId: vLeaderId
    };

    vMem['5949a4855caaa57b830fed3a'] = {
        isLead: false,
        leaderId: vLeaderId
    };


    // -------
    // -------
    // -------
    // W68S53 - TOP WEST OXYGEN ROOM
    // -------
    // -------
    // -------

    // leader

    vLeaderId = '58a5999e66b97d403ffe3a83';

    vMem[vLeaderId] =
    {
        isLead: true,
        leaderId: null,
        target_areas: [
            {topleft: {x: 23, y:17}, bottomRight: {x: 38, y:31}},
            {topleft: {x: 8, y:9}, bottomRight: {x: 46, y:47}}
        ]
    };

    // followers
    vMem['58a198c833e278d960320cd9'] = {
        isLead: false,
        leaderId: vLeaderId
    };

    vMem['58d37f1ebf8268285f722492'] = {
        isLead: false,
        leaderId: vLeaderId
    };

    vMem['593e7ed53b4afa6d15b706cb'] = {
        isLead: false,
        leaderId: vLeaderId
    };

    vMem['593e857b259e223ff930a815'] = {
        isLead: false,
        leaderId: vLeaderId
    };

    vMem['593e928e7670b1412361d0d9'] = {
        isLead: false,
        leaderId: vLeaderId
    };


    // -------
    // -------
    // -------
    // W68S58 - main west room
    // -------
    // -------
    // -------

    // leader

    vLeaderId = '589516ac04f78f628f083ac6';

    vMem[vLeaderId] =
    {
        isLead: true,
        leaderId: null,
        target_areas: [
            {topleft: {x: 13, y:3}, bottomRight: {x: 37, y:24}},
            {topleft: {x: 4, y:3}, bottomRight: {x: 45, y:42}}
        ]
    };

    // followers
    vMem['58956cf0f7a6b36167e02635'] = {
        isLead: false,
        leaderId: vLeaderId
    };

    vMem['589511272fa77ab02c659a61'] = {
        isLead: false,
        leaderId: vLeaderId
    };

    vMem['5895a5730344c278042fe69d'] = {
        isLead: false,
        leaderId: vLeaderId
    };

    vMem['58959fb5f50f57b75a789bc0'] = {
        isLead: false,
        leaderId: vLeaderId
    };

    vMem['589597eed1c7fb0c6fcc710f'] = {
        isLead: false,
        leaderId: vLeaderId
    };

    // -------
    // -------
    // -------
    // W69S51 - top west keanium room
    // -------
    // -------
    // -------

    // leader

    vLeaderId = '58a15ca7ae8d547fcc1c8dbe';

    vMem[vLeaderId] =
    {
        isLead: true,
        leaderId: null,
        target_areas: [
            {topleft: {x: 29, y:19}, bottomRight: {x: 39, y:30}},
            {topleft: {x: 12, y:7}, bottomRight: {x: 46, y:37}}
        ]
    };

    // followers
    vMem['589d70898e76abdb548c276d'] = {
        isLead: false,
        leaderId: vLeaderId
    };

    vMem['58b556c5d4a889640a13beb2'] = {
        isLead: false,
        leaderId: vLeaderId
    };

    vMem['58f6a75a978c5820294e166c'] = {
        isLead: false,
        leaderId: vLeaderId
    };

    vMem['58f6a7d39893d01963e93573'] = {
        isLead: false,
        leaderId: vLeaderId
    };

    vMem['58f6aa8fbc4ad71f07ec4a8d'] = {
        isLead: false,
        leaderId: vLeaderId
    };

    // -------
    // -------
    // -------
    // W69S57 - mid west area access blocker
    // -------
    // -------
    // -------

    // leader

    vLeaderId = '589477f95b5beb8c06675e91';

    vMem[vLeaderId] =
    {
        isLead: true,
        leaderId: null,
        target_areas: [
            {topleft: {x: 13, y:23}, bottomRight: {x: 40, y:37}},
            {topleft: {x: 2, y:5}, bottomRight: {x: 40, y:44}}
        ]
    };

    // followers
    vMem['58947f89d17495fe4e4e3533'] = {
        isLead: false,
        leaderId: vLeaderId
    };

    vMem['58a53fa37d789ea14116d0c7'] = {
        isLead: false,
        leaderId: vLeaderId
    };

    vMem['58ebfabe1ca758212278f8d6'] = {
        isLead: false,
        leaderId: vLeaderId
    };

    vMem['58ebfb958f270435022a5719'] = {
        isLead: false,
        leaderId: vLeaderId
    };

    vMem['58ebfbf3ad21a07867ec9d4f'] = {
        isLead: false,
        leaderId: vLeaderId
    };

    */

    //Memory.settings.tower = vMem;
    Memory.settings.tower = {};


}

