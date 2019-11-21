const Squad = require('../models/squad');
const unitFactory = require('./unit-factory');
const { getRandomInt } = require('../helpers/utils');

module.exports = {
    createSquads: (min, max) => {
        let numOfSquads = getRandomInt(min, max);
        let squads = [];
        for (let i = 0; i < numOfSquads; i++) {
            squads.push(new Squad(unitFactory.createUnits(2, 2)));
        }
        return squads;
    }
}