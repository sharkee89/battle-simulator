const Squad = require('../models/squad');
const unitFactory = require('./unit-factory');
const { getRandomInt } = require('../helpers/utils');

module.exports = {
    createSquads: (numOfSquads) => {
        let squads = [];
        for (let i = 0; i < numOfSquads; i++) {
            squads.push(new Squad(unitFactory.createUnits(process.env.NUM_OF_UNITS)));
        }
        return squads;
    }
}