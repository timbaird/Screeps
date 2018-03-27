

function MineralMapping() {

        console.log('### MineralMapping Class contains only static methods, no need to instantiate');
}

MineralMapping.resourceList = function()
{
        try
        {
            return [
                RESOURCE_ENERGY,
                'H', //RESOURCE_HYDROGEN,
                'O', //RESOURCE_OXYGEN,
                'U', //RESOURCE_UTRIUM,
                'K', //RESOURCE_KEANIUM,
                'L', //RESOURCE_LEMERGIUM,
                'Z', //RESOURCE_ZYNTHIUM,
                'X', //RESOURCE_CATALYST,

                'OH', //RESOURCE_HYDROXIDE,
                'KH', //RESOURCE_ZYNTHIUM_KEANITE,
                'UL', //RESOURCE_UTRIUM_LEMERGITE,
                'G', //RESOURCE_GHODIUM,

                'UH', //RESOURCE_UTRIUM_HYDRIDE,
                'OU', //RESOURCE_UTRIUM_OXIDE,
                'KH', //RESOURCE_KEANIUM_HYDRIDE,
                'KO', //RESOURCE_KEANIUM_OXIDE,
                'LH', //RESOURCE_LEMERGIUM_HYDRIDE,
                'LO', //RESOURCE_LEMERGIUM_OXIDE,
                'ZH', //RESOURCE_ZYNTHIUM_HYDRIDE,
                'ZO', //RESOURCE_ZYNTHIUM_OXIDE,
                'GH', //RESOURCE_GHODIUM_HYDRIDE,
                'GO', //RESOURCE_GHODIUM_OXIDE,

                'UH2O', //RESOURCE_UTRIUM_ACID,
                'UHO2', //RESOURCE_UTRIUM_ALKALIDE,
                'KH2O', //RESOURCE_KEANIUM_ACID,
                'KHO2', //RESOURCE_KEANIUM_ALKALIDE,
                'LH2O', //RESOURCE_LEMERGIUM_ACID,
                'LHO2', //RESOURCE_LEMERGIUM_ALKALIDE,
                'ZH2O', //RESOURCE_ZYNTHIUM_ACID,
                'ZHO2', //RESOURCE_ZYNTHIUM_ALKALIDE,
                'GH2O', //RESOURCE_GHODIUM_ACID,
                'GHO2', //RESOURCE_GHODIUM_ALKALIDE,

                'XUH2O', //RESOURCE_CATALYZED_UTRIUM_ACID,
                'XUHO2', //RESOURCE_CATALYZED_UTRIUM_ALKALIDE,
                'XKH2O', //RESOURCE_CATALYZED_KEANIUM_ACID,
                'XKHO2', //RESOURCE_CATALYZED_KEANIUM_ALKALIDE,
                'XLH2O', //RESOURCE_CATALYZED_LEMERGIUM_ACID,
                'XLHO2', //RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE,
                'XZH2O', //RESOURCE_CATALYZED_ZYNTHIUM_ACID,
                'XZHO2', //RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE,
                'XGH2O', //RESOURCE_CATALYZED_GHODIUM_ACID,
                'XGHO2', //RESOURCE_CATALYZED_GHODIUM_ALKALIDE
            ]
        }
        catch (ex)
        {
            console.log('### EXCEPTION - MineralMapping.resourceList():' +  ex.message);
        }
};

MineralMapping.getBases = function(pInputMineral)
{
       try
       {
           switch (pInputMineral){

               //-------------------
               // input minerals
               //-------------------

               case 'none':
                   return ['none', 'none'];
                   break;

               case 'H': //RESOURCE_HYDROGEN
                   return ['INPUT', 'INPUT'];
               break;

               case 'O': // RESOURCE_OXYGEN
                   return ['INPUT','INPUT'];
                   break;

               case 'U': //RESOURCE_UTRIUM
                   return ['INPUT','INPUT'];
                   break;

               case 'L': //RESOURCE_LEMERGIUM:
                   return ['INPUT','INPUT'];
                   break;

               case 'K': //RESOURCE_KEANIUM:
                   return ['INPUT','INPUT'];
                   break;

               case 'Z': //RESOURCE_ZYNTHIUM:
                   return ['INPUT','INPUT'];
                   break;

               case 'X': //RESOURCE_CATALYST:
                   return ['INPUT','INPUT'];
                   break;


               //-------------------
               // base compounds
               //-------------------

               case 'OH': //RESOURCE_HYDROXIDE: // OH
                   return [RESOURCE_HYDROGEN, RESOURCE_OXYGEN];
                   break;


               case 'ZK': //RESOURCE_ZYNTHIUM_KEANITE: // ZK
                   return [RESOURCE_ZYNTHIUM, RESOURCE_KEANIUM];
                   break;

               case 'UL': //RESOURCE_UTRIUM_LEMERGITE: // UL
                   return [RESOURCE_UTRIUM, RESOURCE_LEMERGIUM];
                   break;

               case 'G': //RESOURCE_GHODIUM: // G
                   return [ RESOURCE_ZYNTHIUM_KEANITE, RESOURCE_UTRIUM_LEMERGITE];
                   break;


               //-------------------
               // Tier 1 compounds
               //-------------------

               case 'UH': //RESOURCE_UTRIUM_HYDRIDE: // UH
                   return [RESOURCE_UTRIUM, RESOURCE_HYDROGEN];
                   break;

               case 'UO': //RESOURCE_UTRIUM_OXIDE: // UO
                   return [RESOURCE_UTRIUM, RESOURCE_OXYGEN];
                   break;

               case 'KH': //RESOURCE_KEANIUM_HYDRIDE: // KH
                   return [RESOURCE_KEANIUM, RESOURCE_HYDROGEN];
                   break;

               case 'KO': //RESOURCE_KEANIUM_OXIDE: // KO
                   return [RESOURCE_KEANIUM, RESOURCE_OXYGEN];
                   break;

               case 'LH': //RESOURCE_LEMERGIUM_HYDRIDE: // LH
                   return [RESOURCE_LEMERGIUM, RESOURCE_HYDROGEN];
                   break;

               case 'LO': //RESOURCE_LEMERGIUM_OXIDE: // LO
                   return [RESOURCE_LEMERGIUM, RESOURCE_OXYGEN];
                   break;

               case 'ZH': //RESOURCE_ZYNTHIUM_HYDRIDE: // ZH
                   return [RESOURCE_ZYNTHIUM, RESOURCE_HYDROGEN];
                   break;

               case 'ZO': //RESOURCE_ZYNTHIUM_OXIDE: // ZO
                   return [RESOURCE_ZYNTHIUM, RESOURCE_OXYGEN];
                   break;

               case 'GH': //RESOURCE_GHODIUM_HYDRIDE: // GH
                   return [RESOURCE_GHODIUM, RESOURCE_HYDROGEN];
                   break;

               case 'GO': //RESOURCE_GHODIUM_OXIDE: // GO
                   return [RESOURCE_GHODIUM, RESOURCE_OXYGEN];
                   break;

               //-------------------
               // Tier 2 compounds
               //-------------------

               case 'UH2O': //RESOURCE_UTRIUM_ACID: // UH2O
                   return [RESOURCE_UTRIUM_HYDRIDE, RESOURCE_HYDROXIDE];
                   break;

               case 'UHO2': //RESOURCE_UTRIUM_ALKALIDE: // UHO2
                   return [RESOURCE_UTRIUM_OXIDE, RESOURCE_HYDROXIDE];
                   break;

               case 'KH2O': //RESOURCE_KEANIUM_ACID: // KH2O
                   return [RESOURCE_KEANIUM_HYDRIDE, RESOURCE_HYDROXIDE];
                   break;

               case 'KHO2': //RESOURCE_KEANIUM_ALKALIDE: //KHO2
                   return [RESOURCE_KEANIUM_OXIDE, RESOURCE_HYDROXIDE];
                   break;

               case 'LH2O': //RESOURCE_LEMERGIUM_ACID:  // LH2O
                   return [RESOURCE_LEMERGIUM_HYDRIDE, RESOURCE_HYDROXIDE];
                   break;

               case 'LHO2': //RESOURCE_LEMERGIUM_ALKALIDE:  // LHO2
                   return [RESOURCE_LEMERGIUM_OXIDE, RESOURCE_HYDROXIDE];
                   break;

               case 'ZH2O': //RESOURCE_ZYNTHIUM_ACID:  // ZH2O
                   return [RESOURCE_ZYNTHIUM_HYDRIDE, RESOURCE_HYDROXIDE];
                   break;

               case 'ZHO2': //RESOURCE_ZYNTHIUM_ALKALIDE:  // ZHO2
                   return [RESOURCE_ZYNTHIUM_OXIDE, RESOURCE_HYDROXIDE];
                   break;

               case 'GH2O': //RESOURCE_GHODIUM_ACID:  // GH2O
                   return [RESOURCE_GHODIUM_HYDRIDE, RESOURCE_HYDROXIDE];
                   break;

               case 'GHO2': //RESOURCE_GHODIUM_ALKALIDE:  // GHO2
                   return [RESOURCE_GHODIUM_OXIDE, RESOURCE_HYDROXIDE];
                   break;

                   //-------------------
                   // Tier 3 compounds
                   //-------------------

               case 'XUH2O': //RESOURCE_CATALYZED_UTRIUM_ACID:  // XUH2O
                   return [RESOURCE_UTRIUM_ACID, RESOURCE_CATALYST];
                   break;

               case 'XUHO2': //RESOURCE_CATALYZED_UTRIUM_ALKALIDE:  // XUHO2
                   return [RESOURCE_UTRIUM_OXIDE, RESOURCE_CATALYST];
                   break;

               case 'XKH2O': //RESOURCE_CATALYZED_KEANIUM_ACID:  // XKH2O
                   return [RESOURCE_KEANIUM_ACID, RESOURCE_CATALYST];
                   break;

               case 'XKHO2': //RESOURCE_CATALYZED_KEANIUM_ALKALIDE:  // XKHO2
                   return [RESOURCE_KEANIUM_OXIDE, RESOURCE_CATALYST];
                   break;

               case 'XLH2O': //RESOURCE_CATALYZED_LEMERGIUM_ACID:  // XLH2O
                   return [RESOURCE_LEMERGIUM_ACID, RESOURCE_CATALYST];
                   break;

               case 'XLHO2': //RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE:  // XLHO2
                   return [RESOURCE_LEMERGIUM_ALKALIDE, RESOURCE_CATALYST];
                   break;

               case 'XZH2O': //RESOURCE_CATALYZED_ZYNTHIUM_ACID:  // XZH2O
                   return [RESOURCE_ZYNTHIUM_ACID, RESOURCE_CATALYST];
                   break;

               case 'XZHO2': //RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE:  // XZHO2
                   return [RESOURCE_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYST];
                   break;

               case 'XGH2O': //RESOURCE_CATALYZED_GHODIUM_ACID:  // XGH2O
                   return [RESOURCE_GHODIUM_ACID, RESOURCE_CATALYST];
                   break;

               case 'XGHO2': //RESOURCE_CATALYZED_GHODIUM_ALKALIDE:  // XGHO2
                   return [RESOURCE_GHODIUM_ALKALIDE, RESOURCE_CATALYST];
                   break;

               default:
               //console.log('MineralMapping.getBases(): Invalid Mineral Input ' + pInputMineral);
           }

       }
       catch (ex)
       {
           console.log('### EXCEPTION - MineralMapping.getBases(): xxx ' +  ex.message);
       }
    };


