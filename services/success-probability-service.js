const Soldier = require('../models/soldier');
const Vehicle = require('../models/vehicle');
const { getRandomInt } = require('../helpers/utils');
const gmean = require('compute-gmean');

module.exports = {
    calculateSuccessProbability: (squad) => {
        let successProbabilities = [];
        squad.units.forEach(unit => {
            if (unit instanceof Soldier) {
                successProbabilities.push(calculateSuccessProbabilityOfSoldier(unit));
            }
            if (unit instanceof Vehicle) {
                successProbabilities.push(calculateSuccessProbabilityOfVehicle(unit));
            }
        });
        let SquadSP = gmean(successProbabilities)
        return SquadSP;
    }
}
calculateSuccessProbabilityOfSoldier = (soldier) => {
    let soldierSP = 0.5 * (1 + soldier.health / 100) * getRandomInt(30 + soldier.experience, 100) / 100;
    return soldierSP;
}
calculateSuccessProbabilityOfVehicle = (vehicle) => {
    let soldiersSPs = [];
    vehicle.operators.forEach(operator => {
        soldiersSPs.push(calculateSuccessProbabilityOfSoldier(operator));
    });
    let vehicleSP = 0.5 * (1 + vehicle.health / 100) * gmean(soldiersSPs);
    return vehicleSP;
}