const {
  validators: { validateId },
  errors: { ExistenceError },
} = require('com');

const { User, Mission } = require('../data/models');
const updateMission = require('./updateMission');
const createNasaData = require('./createNasaData');

/**
 * Retrieve missions associated with a user from the database.
 * @param {string} userId - The user's unique identifier.
 * @throws {TypeError} - If userId is of the wrong type.
 * @throws {ContentError} - If userId contains invalid characters.
 * @throws {ExistenceError} - If the user with the provided userId doesn't exist.
 * @returns {Promise<Array<Object>>} - An array of mission objects.
 */

const retrieveMissions = (userId) => {
  validateId(userId, 'user id');

  return (async () => {
    const foundUser = await User.findById(userId);

    if (!foundUser)
      throw new ExistenceError(`user with id ${userId} not exist`);

    await createNasaData(userId);

    const foundMissions = await Mission.find({ creator: foundUser._id });

    if (foundMissions.length)
      await Promise.all(
        foundMissions.map(async (mission) => {
          if (mission.status === 'in_progress') {
            await updateMission(mission._id.toString());
          }
        })
      );

    const retrievedUpdatedmissions = await Mission.find(
      { creator: foundUser._id },
      '-__v -creator'
    )
      .sort('-startDate')
      .lean();

    return retrievedUpdatedmissions;
  })();
};

module.exports = retrieveMissions;
