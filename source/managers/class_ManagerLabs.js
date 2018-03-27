
function ManagerLabs(){
	console.log('### ManagerLabs Class contains only static methods, no need to instantiate');
}

ManagerLabs.manage = function()
{
	try {

		//console.log('manager labs 1');

		// find viable labs - they are correct type AND not in cooldown AND are not full of mineral
		const vViableLabs = _.select(Game.structures, (x)=> {
			return x.objectType() === 'StructureLab' &&
				(x.role() === 'output' || x.role() === 'middle') &&
				x.cooldown === 0 &&
				x.mineralAmount < x.mineralCapacity
		});

		//console.log('ManagerLabs.manage() 2 - num viable labs ' + vViableLabs.length);

		//let vContinue = true;

		//let vResult;
		let vInput1;
		let vInput2;
		let vInputResources;

		for (let i in vViableLabs)
		{
			vInputResources = MineralMapping.getBases(vViableLabs[i].labMineralType());

            //console.log('ManagerLabs.manage() checking lab as ' + vViableLabs[i].pos + vViableLabs[i].labMineralType());

			//console.log('ManagerLabs.manage() checking input resources ' +  vInputResources[0] + ' ' + vInputResources[1]);

			vInput1 = _.select(vViableLabs[i].room.getLabs(), (x)=>{return x.labMineralType() === vInputResources[0]})[0];
			vInput2 = _.select(vViableLabs[i].room.getLabs(), (x)=>{return x.labMineralType() === vInputResources[1]})[0];

            //console.log('manager labs 9');

			if (!(!vInput1) && !(!vInput2) && vInput1.mineralAmount > 5 && vInput2.mineralAmount > 5 )
			{
				//console.log('ManagerLabs.manage() making mineral at lab ' + vViableLabs[i].pos );
				vViableLabs[i].runReaction(vInput1, vInput2);
			}
		}
	}
	catch (ex) {
		console.log('### EXCEPTION - ManagerLabs.manage(): ' + ex.message);
	}
};
