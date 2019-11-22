const squadFactory = require('./squad-factory');

module.exports = {
    createArmies: (numOfArmies) => {
        let armies = [];
        for (let i = 0; i < numOfArmies; i++) {
            armies = [...armies, squadFactory.createSquads(process.env.NUM_OF_SQUADS, (i + 1), JSON.parse(process.env.ATTACK_STRATEGIES)[i])];
        }
        armies = armies.reduce((a, b) => [...a, ...b], []);
        return armies;
    }
}
