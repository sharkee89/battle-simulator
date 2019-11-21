const EventEmitter = require('events');
const emitter = new EventEmitter();
const { getRandomInt } = require('../helpers/utils');
const { calculateSuccessProbability } = require('../services/success-probability-service');
const { getStrongestDefender, getWeakestDefender, removeSquad } = require('../services/squad-service');
const { dealDamage } = require('../services/damage-service');
const Soldier = require('../models/soldier');
const Vehicle = require('../models/vehicle');
const util = require('util');

emitter.on('squad_attack', (squadAttacker, squads) => {
    let possibleDefenders = squads.filter(squad => squad.army !== squadAttacker.army);
    let squadDefender = getDefender(squadAttacker, possibleDefenders);
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
getDefender = (squadAttacker, possibleDefenders) => {
    let defender;
    switch(squadAttacker.attackStrategy) {
        case 'random':
            defender = possibleDefenders[getRandomInt(0, possibleDefenders.length - 1)];
            break;
        case 'weakest':
            defender = getWeakestDefender(possibleDefenders);
            break;
        case 'strongest':
            defender = getStrongestDefender(possibleDefenders);
            break;
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