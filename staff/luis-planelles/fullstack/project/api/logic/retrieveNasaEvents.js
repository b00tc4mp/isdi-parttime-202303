const {
  validators: { validateId },
  errors: { ExistenceError },
} = require('com');
const { NasaEvent, Mission } = require('../data/models');

/**
 * retrieve nasa events by a mission.
 * @param {string} missionId - The mission ID to know events to retrieve.
 * @returns {<object>} - Resolves to return the events object.
 * @throws {ExistenceError} - If the user or mission with the provided IDs does not exist.
 * @throws {TypeError} - On missionId wrong type.
 * @throws {ContentError} - On missionId wrong characters.
 */

const retrieveNasaEvents = (missionId) => {
  validateId(missionId, 'mission id');

  return (async () => {
    const foundMission = await Mission.findById(missionId);

    if (!foundMission)
      throw new ExistenceError(`mission with id ${missionId} not exist`);

    const retrievedNasaEvents = await NasaEvent.find(
      {
        date: {
          $gte: foundMission.startDate,
          $lte: foundMission.endDate,
        },
      },
      '-_id -__v'
    ).lean();

    return retrievedNasaEvents;
  })();
};

module.exports = retrieveNasaEvents;
