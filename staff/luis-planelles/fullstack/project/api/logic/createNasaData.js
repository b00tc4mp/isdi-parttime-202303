require('dotenv').config();

const {
  validators: { validateId },
  errors: { ExistenceError },
} = require('com');

const { getApiData, saveNasaData } = require('./helpers');
const { User, ApiCall } = require('../data/models');
const nasaEndpoints = require('../nasaConfig');

/**
 * Extracts NASA data for various event types and saves it in the database.
 * @param {string} userId - The ID of the user for whom to extract and save NASA data.
 * @throws {ExistenceError} If the user with the provided ID doesn't exist.
 * @throws {TypeError} If endpoints provided doesn't is an object.
 * @throws {ConnexionError} If endpoints fecth doesnt returns status 200.
 * @returns {Promise<void>} A promise that resolves when the data extraction and saving process is complete.
 */

const createNasaData = (userId) => {
  validateId(userId, 'user id');

  const currentDate = new Date();
  const tenMinutes = 10 * 60 * 1000;

  return (async () => {
    const [foundUser, foundApiCall] = await Promise.all([
      User.findById(userId),
      ApiCall.findOne(),
    ]);

    if (!foundUser) {
      throw new ExistenceError(`user with id ${userId} doesnt exist`);
    }

    let timeDifference;

    if (foundApiCall) {
      timeDifference = currentDate - foundApiCall.lastUpdate;
    }

    if (!foundApiCall || timeDifference >= tenMinutes) {
      for (const eventType of Object.keys(nasaEndpoints)) {
        const endpoint = nasaEndpoints[eventType];

        const res = await getApiData(eventType, endpoint);

        await saveNasaData(res, eventType);
      }
    }

    await ApiCall.deleteMany({});

    await ApiCall.create({
      lastUpdate: new Date(),
    });
  })();
};

module.exports = createNasaData;
