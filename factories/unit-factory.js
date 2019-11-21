const Soldier = require('../models/soldier');
const Vehicle = require('../models/vehicle');
const { getRandomInt } = require('../helpers/utils');

module.exports = {
    createUnits: (numOfUnits) => {
        let army = [];
        for (let i = 0; i < numOfUnits; i++) {
            army.push(createUnit(getRandomInt(0, 1)));
        }
        return army;
    }
}
createUnit = (descision) => {
    if (descision === 0) {
        return new Soldier(100, getRandomInt(100, 2000), getRandomInt(0, 50));
    } else {
        return new Vehicle(100, getRandomInt(1001, 2000), createSoldiers(getRandomInt(1, 3)));
    }
}
createSoldiers = (num) => {
    let soldiers = [];
    for (let i = 0; i < num; i++) {
        soldiers.push(new Soldier(100, getRandomInt(100, 2000), getRandomInt(0, 50)));
    }
    return soldiers;
}