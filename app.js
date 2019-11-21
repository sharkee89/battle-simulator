const armyFactory = require('./factories/army-factory');
const battleManager = require('./managers/battle-manager');

let squads = armyFactory.createArmies(process.env.NUM_OF_ARMIES);
squads = squads.reduce((a, b) => [...a, ...b], []);

battleManager.startBattle(squads);
