const Unit = require('./unit');

module.exports = class Vehicle extends Unit {
    constructor(health, recharge, operators) {
        super(health, recharge);
        this.operators = operators;
    }
    getOperators() {
        return this.operators;
    }
}