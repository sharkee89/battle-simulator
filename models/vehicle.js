const Unit = require('./unit');

module.exports = class Vehicle extends Unit {
    constructor(health, recharge, operators) {
        let initHealth = 100;
        for (let i = 0; i < operators.length; i++) {
            initHealth += operators[i].health;
        }
        super(initHealth, recharge);
        this.operators = operators;
    }
    getOperators() {
        return this.operators;
    }
}