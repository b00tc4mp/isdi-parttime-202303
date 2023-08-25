const {
  validators: { validateId },
  errors: { ExistenceError },
} = require('com');
const { Mission, User } = require('../data/models');

/**
 * Creates a new post by a user.
 * @param {string} userId - The ID of the user creating the mission.
 * @param {string} missionId - The ID of the mission to retrieve.
 * @returns {<object>} - Resolves to return the mission object.
 * @throws {ExistenceError} - If the user or mission with the provided IDs does not exist.
 * @throws {TypeError} - On userId or missionId wrong type.
 * @throws {ContentError} - on userId or missionId wrong characters.
 */

const retrieveMission = (userId, missionId) => {
  validateId(userId, 'user id');
  validateId(missionId, 'mission id');

  return (async () => {
    const selectedFields = [
      '-traveler._id',
      '-participants._id',
      '-participants.email',
      '-__v',
    ].join(' ');

    const [foundUser, foundMission] = await Promise.all([
      User.findById(userId),
      Mission.findById(missionId, selectedFields).lean(),
    ]);

    if (!foundUser)
      throw new ExistenceError(`user with id ${userId} not exist`);
    if (!foundMission)
      throw new ExistenceError(`mission with id ${missionId} not exist`);

    return foundMission;
  })();
};

module.exports = retrieveMission;
