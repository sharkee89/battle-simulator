module.exports = class Unit {
    constructor(health, recharge) {
        this.health = health;
        this.recharge = recharge;
    }
    getHealth() {
        return this.health;
    }
    getRecharge() {
        return this.recharge;
    }
}
