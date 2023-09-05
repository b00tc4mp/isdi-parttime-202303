const {
  validators: { validateId },
  errors: { ExistenceError },
} = require('com');

const nasaEndpoints = require('../nasaConfig');
const createNasaData = require('./createNasaData');
const { User, NasaEvent, ApiCall } = require('../data/models');

/**
 * Retrieves NASA-related data for a user.
 * @param {string} userId - The unique identifier of the user.
 * @returns {Promise<Array>} - Resolves to an array of NASA events retrieved for the user.
 * @throws {ExistenceError} - If the user with the provided ID does not exist.
 * @throws {TypeError} - If the userId is not a string or if it doesn't have 24 characters.
 * @throws {ContentError} - If the userId is not in hexadecimal format.
 */

const retrieveNasaData = (userId) => {
  validateId(userId, 'user id');

  const currentDate = new Date();
  const tenMinutes = 10 * 60 * 1000;

  return (async () => {
    const foundUser = await User.findById(userId);

    if (!foundUser)
      throw new ExistenceError(`user with id ${userId} not exist`);

    const foundApiCall = await ApiCall.findOne();

    if (!foundApiCall) {
      await createNasaData(userId, nasaEndpoints);
    } else {
      const timeDifference = currentDate - foundApiCall.lastUpdate;
      if (timeDifference >= tenMinutes) {
        await createNasaData(userId, nasaEndpoints);
      }
    }

    const retrievedNasaData = await NasaEvent.find();

    return retrievedNasaData;
  })();
};

module.exports = retrieveNasaData;
