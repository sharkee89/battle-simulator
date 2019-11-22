const assert = require('assert');
const damageSvc = require('../services/damage-service');
const Soldier = require('../models/soldier');

it('should calculateDamageOfSoldier correctly', () => {
    const soldier = { experience: 50};
    const damage = damageSvc.calculateDamageOfSoldier(soldier);
    assert.equal(damage, 0.55);
});
it('should calculateDamageOfVehicle correctly', () => {
    const vehicle = {
        operators: [
            { experience: 50},
            { experience: 25},
            { experience: 15}
        ]
    };
    const damage = damageSvc.calculateDamageOfVehicle(vehicle);
    assert.equal(damage, 1);
});
it('should dealDamageToDefender correcly', () => {
    const damage = 0.55;
    const soldier = new Soldier(100, 500, 50);
    const defender = {units: [soldier]};
    damageSvc.dealDamageToDefender(damage, defender);
    assert.equal(defender.units[0].health, 99.45);
});
it('should dealDamageToVehicle correctly', () => {
    const damage = 0.55;
    const vehicle = {health: 100, operators: [new Soldier(100, 500, 50), new Soldier(100, 500, 50)]};
    damageSvc.dealDamageToVehicle(damage, vehicle);
    assert.equal(vehicle.health, 99.835);
});