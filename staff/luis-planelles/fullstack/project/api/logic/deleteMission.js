const { User, Mission } = require('../data/models');

const {
  validators: { validateId },
  errors: { ExistenceError },
} = require('com');

/**
 * Deletes a mission by a user.
 * @param {string} userId - The ID of the user deleting the mission.
 * @param {string} missionId - The ID of the mission to be deleted.
 * @returns {Promise<object>} - A promise that resolves to the result of the deletion operation.
 * @throws {ExistenceError} - If the user with the provided ID or the mission with the provided ID does not exist.
 * @throws {Error} - If the mission does not belong to the user.
 * @throws {TypeError} - on userId or missionId wrong type.
 * @throws {ContentError} - on userId or missionId wrong characters.
 */

const deleteMission = (userId, missionId) => {
  validateId(userId, 'user id');
  validateId(missionId, 'mission id');

  return (async () => {
    const [foundUser, foundMission] = await Promise.all([
      User.findById(userId),
      Mission.findById(missionId),
    ]);

    if (!foundUser)
      throw new ExistenceError(`user with id ${userId} not exists`);
    if (!foundMission)
      throw new ExistenceError(`mission with id ${missionId} not exists`);

    if (foundMission.creator.toString() !== userId)
      throw new Error(
        `mission with id ${missionId} not belong to user with id ${userId}`
      );

    await Mission.deleteOne({ _id: missionId }).then(() => {});
  })();
};

module.exports = deleteMission;
