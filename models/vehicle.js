const Unit = require('./unit');

module.exports = class Vehicle extends Unit {
    constructor(health, recharge, operators) {
        let initHealth = 100;
        let count = 1;
        for (let i = 0; i < operators.length; i++) {
            count++;
            initHealth += operators[i].health;
        }
        initHealth = Math.round(initHealth / count);
        super(initHealth, recharge);
        this.operators = operators;
    }
    getOperators() {
        return this.operators;
    }
}