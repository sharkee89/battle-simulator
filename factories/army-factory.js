const Army = require('../models/army');
const squadFactory = require('./squad-factory');
const { getRandomInt } = require('../helpers/utils');

module.exports = {
    createArmies: (numOfArmies) => {
        let armies = [];
        for (let i = 0; i < numOfArmies; i++) {
            armies.push(new Army(squadFactory.createSquads(process.env.NUM_OF_SQUADS), JSON.parse(process.env.ATTACK_STRATEGIES)[i]));
        }
        return armies;
    }
}
