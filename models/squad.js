const Unit = require('./unit');

module.exports = class Squad {
    constructor(units) {
        this.units = units;
    }
    getUnits() {
        return this.units;
    }
}