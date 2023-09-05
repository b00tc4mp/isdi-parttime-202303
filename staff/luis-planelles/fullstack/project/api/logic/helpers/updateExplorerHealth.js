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
  validateArrayOfObjects(retrievedNasaEvents, 'retrieve nasa events');

  const eventDamage = {
    massEjection: { suplies: 'water', damage: 10 },
    geoStorm: { suplies: 'food', damage: 20 },
    planetShock: { suplies: 'food', damage: 25 },
    solarFlare: { suplies: 'water', damage: 10 },
    solarParticle: { suplies: 'water', damage: 30 },
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
  const stressReductiondamage = 5;

  explorer.stress -= totalEventsCount * stressReductiondamage;

  let totalStress = explorer.stress;

  const stressReduction = (100 - totalStress) * 0.2;
  const foodReduction = (100 - totalFood) * 0.75;
  const waterReduction = (100 - totalWater) * 1.25;

  const healthReduction = stressReduction + foodReduction + waterReduction;

  explorer.health -= healthReduction;

  if (explorer.health < 0) {
    explorer.health = 0;
  }

  if (explorer.health === 0 || explorer.oxygen === 0) {
    foundMission.status = 'failure';
  }

  return foundMission;
};

module.exports = updateExplorerHealth;
