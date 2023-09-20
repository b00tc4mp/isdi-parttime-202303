const {
  validators: { validateId },
  errors: { ExistenceError },
} = require('com');
const { Mission, NasaEvent } = require('../data/models');
const { updateExplorerHealth } = require('./helpers');

/**
 * Update the mission's status and explorer's health based on mission progress and NASA events.
 * @param {string} userId - The unique identifier of the user associated with the mission.
 * @param {string} missionId - The unique identifier of the mission to be updated.
 * @throws {ExistenceError} - If the user or mission with the provided IDs do not exist.
 * @throws {TypeError} - If the input parameters are not of the expected types.
 * @throws {ContentError} - If the input parameters are not of the expected content.
 */

const updateMission = (missionId) => {
  validateId(missionId, 'mission id');

  const currentDate = new Date();

  return (async () => {
    const foundMission = await Mission.findById(missionId);

    if (!foundMission) {
      throw new ExistenceError(`mission with id ${missionId} not exist`);
    }

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

      updatedMission.lastUpdate = currentDate;
      await updatedMission.save();
    }
  })();
};

module.exports = updateMission;