const Army = require('../models/army');
const squadFactory = require('./squad-factory');
const { getRandomInt } = require('../helpers/utils');

module.exports = {
    createArmies: (min, max) => {
        let numOfArmies = getRandomInt(min, max);
        let armies = [];
        for (let i = 0; i < numOfArmies; i++) {
            armies.push(new Army(squadFactory.createSquads(2, 2)));
        }
        return armies;
    }
}
