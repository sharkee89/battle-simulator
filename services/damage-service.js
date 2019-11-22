const Soldier = require('../models/soldier');
const Vehicle = require('../models/vehicle');
const { getRandomInt } = require('../helpers/utils');

module.exports = {
    dealDamage: (attacker, defender) => {
        let attackerDmg = calculateDamage(attacker) * process.env.DAMAGE_MULTIPLIER;
        dealDamageToDefender(attackerDmg, defender);
    }
}
calculateDamage = (squad) => {
    let totalDamage = 0;
    squad.units.forEach(unit => {
        if (unit instanceof Soldier) {
            totalDamage += calculateDamageOfSoldier(unit);
        }
        if (unit instanceof Vehicle) {
            totalDamage += calculateDamageOfVehicle(unit);
        }
    });
    console.log(`Total attacker damage: ${totalDamage}`);
    return totalDamage;
}
calculateDamageOfSoldier = (soldier) => {
    let soldierDMG = 0.05 + soldier.experience / 100;
    return soldierDMG;
}
calculateDamageOfVehicle = (vehicle) => {
    let experiencesSum = 0;
    vehicle.operators.forEach(operator => {
        experiencesSum += operator.experience / 100;
    });
    let vehicleDMG = 0.1 + experiencesSum;
    return vehicleDMG;
}
dealDamageToDefender = (damage, defender) => {
    let singleDmg = damage / defender.units.length;
    defender.units.forEach(unit => {
        if (unit instanceof Soldier) {
            unit.health -= singleDmg;
        }
        if (unit instanceof Vehicle) {
            dealDamageToVehicle(singleDmg, unit);
        }
    });
}
dealDamageToVehicle = (damage, vehicle) => {
    vehicle.health -= damage * 0.3;
    let luckyOperatorId = getRandomInt(0, vehicle.operators.length - 1);
    if (vehicle.operators.length) {
        vehicle.operators[luckyOperatorId].health -= damage * 0.5;
        if (vehicle.operators.length > 1) {
            vehicle.operators.forEach((operator, index) => {
                if (index !== luckyOperatorId) {
                    operator.health -= damage * (0.2 / (vehicle.operators.length -1));
                }
            });
        } else {
            vehicle.health -= damage * 0.2;
        }
    } else {
        vehicle.health -= damage * 0.7;
    }
}

module.exports.calculateDamage = this.calculateDamage;
module.exports.calculateDamageOfSoldier = calculateDamageOfSoldier;
module.exports.calculateDamageOfVehicle = calculateDamageOfVehicle;
module.exports.dealDamageToDefender = dealDamageToDefender;
module.exports.dealDamageToVehicle = dealDamageToVehicle;