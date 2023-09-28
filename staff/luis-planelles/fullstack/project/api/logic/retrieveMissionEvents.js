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

const retrieveMissionEvents = (missionId) => {
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
      '-__v'
    );

    const missionEvents = retrievedNasaEvents.filter((event) =>
      foundMission.processedEvents.includes(event._id)
    );

    return missionEvents;
  })();
};

module.exports = retrieveMissionEvents;
