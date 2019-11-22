const assert = require('assert');
const squadFactory = require('../factories/squad-factory');

it('should create squads', () => {
    const squads = squadFactory.createSquads(1, 1, 'random');
    assert.equal(squads.length, 1);
    assert.equal(squads[0].army, 'army-1');
    assert.equal(squads[0].charged, false);
    assert.equal(squads[0].attackStrategy, 'random');
});