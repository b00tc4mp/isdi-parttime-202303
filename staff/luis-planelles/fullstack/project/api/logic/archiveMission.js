const {
  validators: { validateId },
  errors: { ExistenceError },
} = require('com');

const { User, Mission } = require('../data/models');

/**
 * @param {string} userId - The ID of the user toggling the like.
 * @param {string} missionId - The ID of the mission to toggle the like.
 * @returns {Promise<object>} - A promise that resolves to the result of the update operation.
 * @throws {ExistenceError} - If the user with the provided ID or the mission with the provided ID does not exist.
 * @throws {TypeError} - on userId or missionId wrong type.
 * @throws {ContentError} - on userId or missionId wrong characters.
 */

const archivedMission = (userId, missionId) => {
  validateId(userId, 'user id');
  validateId(missionId, 'mission id');

  return (async () => {
    const [foundUser, foundMission] = await Promise.all([
      User.findById(userId),
      Mission.findById(missionId),
    ]);

    if (!foundUser)
      throw new ExistenceError(`user with id ${userId} not exist`);
    if (!foundMission)
      throw new ExistenceError(`mission with id ${missionId} not exist`);

    if (foundMission.archived === false) {
      foundMission.archived = true;

      await foundMission.save();
    }
  })();
};

module.exports = archivedMission;
