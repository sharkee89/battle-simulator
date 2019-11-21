const Vehicle = require('../models/vehicle');

module.exports = {
    removeSquad: (squads) => {
        return squads.filter(squad => squad.units.length);
    },
    getWeakestDefender: (defenders) => {
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
    },
    getStrongestDefender: (defenders) => {
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
}