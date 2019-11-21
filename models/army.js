const Unit = require('./unit');

module.exports = class Army {
    constructor(squads) {
        this.squads = squads;
    }
    getSquads() {
        return this.squads;
    }
}