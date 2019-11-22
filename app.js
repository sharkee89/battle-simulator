const armyFactory = require('./factories/army-factory');
const battleManager = require('./managers/battle-manager');

if (process.env.NUM_OF_ARMIES < 2) {
    console.error('Number of armies must be bigger or equal than 2');
} else if (JSON.parse(process.env.ATTACK_STRATEGIES).length !== Number(process.env.NUM_OF_ARMIES)) {
    console.error('Armies attack strategies are not provided correctly');
} else if (process.env.NUM_OF_SQUADS < 2) {
    console.error('Number of squads must be bigger or equal than 2');
} else if (process.env.NUM_OF_UNITS < 5 || process.env.NUM_OF_UNITS > 10) {
    console.error('Number of unist must be between 5 and 10')
} else {
    let squads = armyFactory.createArmies(process.env.NUM_OF_ARMIES);
    battleManager.startBattle(squads);
}
