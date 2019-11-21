const util = require('util')

const Unit = require('./models/unit');
const Soldier = require('./models/soldier');
const Vehicle = require('./models/vehicle');
const armyFactory = require('./factories/army-factory');

let armies = armyFactory.createArmies(2, 2);
armies.forEach((army, index) => {
    console.log('-----------------------')
    console.log(`$$$ Army ${index + 1} $$$`)
    console.log(util.inspect(army, {showHidden: false, depth: null}))
    console.log('-----------------------')
})
