const Unit = require('./unit');

module.exports = class Army {
    constructor(squads, attackStrategy) {
        this.squads = squads;
        this.attackStrategy = attackStrategy;
    }
    getSquads() {
        return this.squads;
    }
    getAttackStrategy() {
        return this.attackStrategy;
    }
}