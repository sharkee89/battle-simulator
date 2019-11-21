const EventEmitter = require('events');
const emitter = new EventEmitter();
const { getRandomInt } = require('../helpers/utils');
const Soldier = require('../models/soldier');
const Vehicle = require('../models/vehicle');
const gmean = require('compute-gmean');
const util = require('util');

emitter.on('squad_attack', (squadAttacker, squads) => {
    let possibleDefenders = squads.filter(squad => squad.army !== squadAttacker.army);
    let squadDefender
    switch(squadAttacker.attackStrategy) {
        case 'random':
            squadDefender = possibleDefenders[getRandomInt(0, possibleDefenders.length - 1)];
            break;
        case 'weakest':
            squadDefender = getWeakestDefender(possibleDefenders);
            break;
        case 'strongest':
            squadDefender = getStrongestDefender(possibleDefenders);
            break;
    }
    if (squadDefender) {
        console.log(`${squadAttacker.name} is attacking ${squadDefender.name} with ${squadAttacker.attackStrategy} strategy.`);
        battle(squadAttacker, squadDefender, squads);
    } else {
        win(squadAttacker, squads);
    }
    squadAttacker.charged = false;
});
emitter.on('squad_charge', (squad, squads) => {
    console.log(`${squad.name} is charging it will need ${squad.recharge}ms`);
    setTimeout(() => {
        chargedSquad(squad, squads);
    }, squad.recharge);
});
module.exports = {
    startBattle: (squads) => {
        squads.forEach(squad => {
            if(squad.charged) {
                emitter.emit('squad_attack');
            } else {
                emitter.emit('squad_charge', squad, squads);
            }
        });
    }
}
chargedSquad = (squad, attackStrategy, squads) => {
    squad.charged = true;
    emitter.emit('squad_attack', squad, attackStrategy, squads);
}
battle = (attacker, defender, squads) => {
    let attackerSuccessProbability = calculateSuccessProbability(attacker);
    console.log(`Attacker success probabilities: ${attackerSuccessProbability}`);
    let defenderSuccessProbability = calculateSuccessProbability(defender);
    console.log(`Defender success probabilities: ${defenderSuccessProbability}`);
    if (attackerSuccessProbability > defenderSuccessProbability) {
        console.log('Attacker wins');
        dealDamage(attacker, defender);
        attacker.charged = false;
        checkDefenderLife(defender);
        if (!defender.units.length) {
            squads = removeSquad(squads);
        }
        emitter.emit('squad_charge', attacker, squads);
    } else {
        console.log('Defender wins, nothing is happening.');
        emitter.emit('squad_charge', attacker, squads);
    }
}
calculateSuccessProbability = (squad) => {
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
dealDamage = (attacker, defender) => {
    let attackerDmg = calculateDamage(attacker) * process.env.DAMAGE_MULTIPLIER;
    dealDamageToDefender(attackerDmg, defender);
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
            let otherOperators = vehicle.operators.forEach((operator, index) => {
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
checkDefenderLife = (defender) => {
    let units = [];
    defender.units.forEach(unit => {
        if (unit instanceof Soldier && unit.health > 0) {
            units.push(unit);
        }
        if (unit instanceof Vehicle && unit.health > 0) {
            let operators = [];
            unit.operators.forEach(operator => {
                if (operator.health > 0) {
                    operators.push(operator);
                }
            })
            unit.operators = operators;
            units.push(unit);
        }
    });
    defender.units = units;
}
removeSquad = (squads) => {
    return squads.filter(squad => squad.units.length);
}
getWeakestDefender = (defenders) => {
    let minHealth = Number.POSITIVE_INFINITY;
    let unitHealth = 0;
    let defender;
    for (let i = 0; i < defenders.length; i++) {
        defenders[i].units.forEach(unit => {
            unitHealth += unit.health;
            if (unit instanceof Vehicle) {
                unit.operators.forEach(operator => {
                    unitHealth += operator.health;
                })
            }
            if (unitHealth < minHealth) {
                minHealth = unitHealth;
                defender = defenders[i];
            }
        });
    }
    return defender;
}
getStrongestDefender = (defenders) => {
    let maxHealth = Number.NEGATIVE_INFINITY;
    let unitHealth = 0;
    let defender;
    for (let i = 0; i < defenders.length; i++) {
        defenders[i].units.forEach(unit => {
            unitHealth += unit.health;
            if (unit instanceof Vehicle) {
                unit.operators.forEach(operator => {
                    unitHealth += operator.health;
                })
            }
            if (unitHealth > maxHealth) {
                maxHealth = unitHealth;
                defender = defenders[i];
            }
        });
    }
    return defender;
}
win = (winner, squads) => {
    console.log(util.inspect(squads, {showHidden: false, depth: null}));
    console.log('++++++++++++++++++++++++++++++++++');
    console.log('**********************************');
    console.log('----------------------------------');
    console.log(`~~~~~~~~~WINNER IS ${winner.army}~~~~~~~~~`)
    console.log('----------------------------------');
    console.log('**********************************');
    console.log('++++++++++++++++++++++++++++++++++');
    emitter.removeAllListeners('squad_attack');
    emitter.removeAllListeners('squad_charge');
}