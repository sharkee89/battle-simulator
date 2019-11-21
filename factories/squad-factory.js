const Squad = require('../models/squad');
const unitFactory = require('./unit-factory');
const { getRandomInt } = require('../helpers/utils');

module.exports = {
    createSquads: (numOfSquads, armyIndex, attackStrategy) => {
        let squads = [];
        for (let i = 0; i < numOfSquads; i++) {
            let res = unitFactory.createUnits(process.env.NUM_OF_UNITS);
            squads.push(new Squad(`Squad-${getRandomInt(0, 15123)}`, res.units, res.maxCharge, false, `army-${armyIndex}`, attackStrategy));
        }
        return squads;
    }
}