const {
  validators: { validateObject, validateArrayOfObjects },
} = require('com');

/**
 * Update explorer's health based on NASA events.
 * @param {Object} foundMission - The mission object containing explorer's data.
 * @param {Array} retrievedNasaEvents - An array of NASA events affecting the explorer.
 * @throws {TypeError} - If the input parameters are not of the expected types.
 * @throws {ContentError} - If the input parameters are not of the expected content.
 *
 * @returns {Object} - Returns the updated mission object with explorer's health and status.
 */

const updateExplorerHealth = (foundMission, retrievedNasaEvents) => {
  validateObject(foundMission, 'found mission');
  validateArrayOfObjects(retrievedNasaEvents, 'retrieved nasa events');

  const eventDamage = {
    massEjection: { suplies: 'water', damage: 15 },
    geoStorm: { suplies: 'food', damage: 35 },
    planetShock: { suplies: 'food', damage: 40 },
    solarFlare: { suplies: 'water', damage: 25 },
    solarParticle: { suplies: 'water', damage: 40 },
    magnetoPause: { suplies: 'oxygen', damage: 50 },
    radiationBelt: { suplies: 'oxygen', damage: 50 },
    speedSteam: { suplies: 'oxygen', damage: 50 },
  };

  const explorer = foundMission.traveler[0];

  let totalFood = explorer.food;
  let totalWater = explorer.water;

  retrievedNasaEvents.forEach((event) => {
    const eventData = eventDamage[event.event];

    const { suplies, damage } = eventData;

    explorer[suplies] -= damage;

    if (explorer[suplies] < 0) {
      explorer[suplies] = 0;
    }

    if (suplies === 'food') {
      totalFood -= damage;
    } else if (suplies === 'water') {
      totalWater -= damage;
    }
  });

  const totalEventsCount = retrievedNasaEvents.length;
  const stressReductiondamage = 15;

  explorer.stress -= totalEventsCount * stressReductiondamage;

  let totalStress = explorer.stress;

  if (explorer.stress < 0) {
    explorer.stress = 0;
  }

  const stressReduction = 100 - totalStress;
  const foodReduction = 100 - totalFood;
  const waterReduction = 100 - totalWater;

  let healthReduction = stressReduction + foodReduction + waterReduction;

  explorer.health -= healthReduction / 3;

  explorer.health = Math.round(explorer.health * 100) / 100;

  if (explorer.health < 0) {
    explorer.health = 0;
  }

  if (explorer.health === 0 || explorer.oxygen === 0) {
    foundMission.status = 'failure';
  }

  return foundMission;
};

module.exports = updateExplorerHealth;
