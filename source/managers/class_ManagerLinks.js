
function ManagerLinks(){
    console.log('### ManagerTerminals Class contains only static methods, no need to instantiate');
}

ManagerLinks.manage = function() {

    try {
        let vPossibleSenders = _.select(Game.structures,
                (x)=>{return x.objectType() === 'StructureLink' && x.role() === 'storage' && x.cooldown === 0 && x.energy > 0});

        for(let i in vPossibleSenders)
        {
            let vTarget = _.select(vPossibleSenders[i].room.getLinks(), (x)=>{return x.role() === 'controller'})[0];

            if (!(!vTarget))
            {
                vPossibleSenders[i].transferEnergy(vTarget);
            }
        }
    }
    catch (ex) {
        console.log('### EXCEPTION - ManagerLinks.manage(): ' + ex.message);
    }
};
