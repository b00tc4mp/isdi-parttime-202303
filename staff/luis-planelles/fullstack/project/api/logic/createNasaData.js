require('dotenv').config();

const {
  validators: { validateId, validateObject },
  errors: { ExistenceError },
} = require('com');

const { getApiData, saveNasaData } = require('./helpers');
const { User, ApiCall } = require('../data/models');

/**
 * Extracts NASA data for various event types and saves it in the database.
 * @param {string} userId - The ID of the user for whom to extract and save NASA data.
 * @param {object} endpoints - The object with enpoints to fetch nasa data.
 * @throws {ExistenceError} If the user with the provided ID doesn't exist.
 * @throws {TypeError} If endpoints provided doesn't is an object.
 * @throws {ConnexionError} If endpoints fecth doesnt returns status 200.
 * @returns {Promise<void>} A promise that resolves when the data extraction and saving process is complete.
 */

const createNasaData = (userId, endpoints) => {
  validateId(userId, 'user id');
  validateObject(endpoints, 'endpoints');

  return (async () => {
    const foundUser = await User.findById(userId);

    if (!foundUser) {
      throw new ExistenceError(`user with id ${userId} doesnt exist`);
    }

    for (const eventType of Object.keys(endpoints)) {
      const endpoint = endpoints[eventType];

      const res = await getApiData(eventType, endpoint);

      await saveNasaData(res, eventType);
    }

    await ApiCall.deleteMany({});

    await ApiCall.create({
      lastUpdate: new Date(),
    });
  })();
};

module.exports = createNasaData;
