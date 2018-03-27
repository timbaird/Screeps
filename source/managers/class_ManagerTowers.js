
function ManagerTowers(){
        console.log('### ManagerTowers Class contains only static methods, no need to instantiate');
}

ManagerTowers.manage = function() {
	try {

		let vTowers = _.select(Game.structures, (x)=> {return x.objectType() === 'StructureTower'});

		for (let i in vTowers) {
			vTowers[i].operate();
		}
	}
	catch (ex) {
		console.log('### EXCEPTION - ManagerTowers.manageTowers(): ' + ex.message);
	}
};