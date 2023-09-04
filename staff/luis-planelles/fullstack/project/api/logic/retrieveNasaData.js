const {
  validators: { validateId },
  errors: { ExistenceError },
} = require('com');

const nasaEndpoints = require('../nasaConfig');
const createNasaData = require('./createNasaData');
const { User, NasaEvent, ApiCall } = require('../data/models');

const retrieveNasaData = (userId) => {
  validateId(userId, 'user id');

  const currentDate = new Date();
  const tenMinutes = 10 * 60 * 1000;

  return (async () => {
    const foundUser = await User.findById(userId);

    if (!foundUser)
      throw new ExistenceError(`user with id ${userId} not exist`);

    const foundApiCall = await ApiCall.findOne();
    const timeDifference = currentDate - foundApiCall.lastUpdate;

    if (timeDifference >= tenMinutes) {
      await createNasaData(userId, nasaEndpoints);
    }

    const retrievedNasaEvents = await NasaEvent.find();

    return retrievedNasaEvents;
  })();
};

module.exports = retrieveNasaData;
