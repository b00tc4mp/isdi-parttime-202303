const {
  validators: { validateId },
  errors: { ExistenceError },
} = require('com');
const { Mission, User, NasaEvent } = require('../data/models');
const { updateExplorerHealth } = require('./helpers');

/**
 * Update the mission's status and explorer's health based on mission progress and NASA events.
 * @param {string} userId - The unique identifier of the user associated with the mission.
 * @param {string} missionId - The unique identifier of the mission to be updated.
 * @throws {ExistenceError} - If the user or mission with the provided IDs do not exist.
 * @throws {TypeError} - If the input parameters are not of the expected types.
 * @throws {ContentError} - If the input parameters are not of the expected content.
 *
 * @returns {Promise<Object|undefined>} - Resolves to the updated mission object with explorer's health and status,
 * or undefined if the mission status is 'failure' or 'success'.
 */

const updateMission = (userId, missionId) => {
  validateId(userId, 'user id');
  validateId(missionId, 'mission id');

  const currentDate = new Date();

  return (async () => {
    const [foundUser, foundMission] = await Promise.all([
      User.findById(userId),
      Mission.findById(missionId),
    ]);

    if (!foundUser) {
      throw new ExistenceError(`user with id ${userId} not exist`);
    }
    if (!foundMission) {
      throw new ExistenceError(`mission with id ${missionId} not exist`);
    }

    if (foundMission.status === 'failure' || foundMission.status === 'success')
      return;

    if (foundMission.endDate <= currentDate) {
      foundMission.status = 'success';
      await foundMission.save();

      return;
    }

    const retrievedNasaEvents = await NasaEvent.find({
      date: {
        $gte: foundMission.lastUpdate,
        $lte: foundMission.endDate,
      },
    });

    if (retrievedNasaEvents.length > 0) {
      const updatedMission = updateExplorerHealth(
        foundMission,
        retrievedNasaEvents
      );

      await updatedMission.save();
    }
  })();
};

module.exports = updateMission;
