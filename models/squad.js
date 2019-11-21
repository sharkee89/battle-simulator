const Unit = require('./unit');

module.exports = class Squad {
    constructor(name, units, recharge, charged, army, attackStrategy) {
        this.name = name;
        this.units = units;
        this.recharge = recharge;
        this.charged = charged;
        this.army = army;
        this.attackStrategy = attackStrategy;
    }
    getName() {
        return this.name;
    }
    getUnits() {
        return this.units;
    }
    getRecharge() {
        return this.recharge;
    }
    set charged(charged) {
        this._charged = charged;
    }
    get charged() {
        return this._charged;
    }
}