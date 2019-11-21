const Unit = require('./unit');

module.exports = class Soldier extends Unit {
    constructor(health, recharge, experience) {
        super(health, recharge);
        this.experience = experience;
    }
    getExperience() {
        return this.experience;
    }
}