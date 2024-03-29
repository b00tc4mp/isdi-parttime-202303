const {
  validators: { validateId },
  errors: { ExistenceError },
} = require('com');
const { Mission } = require('../data/models');
const updateMission = require('./updateMission');
const createNasaData = require('./createNasaData');

/**
 * retrieve mission by mission id.
 * @param {string} missionId - The ID of the mission to retrieve.
 * @returns {<object>} - Resolves to return the mission object.
 * @throws {ExistenceError} - If the user or mission with the provided IDs does not exist.
 * @throws {TypeError} - On missionId wrong type.
 * @throws {ContentError} - On missionId wrong characters.
 */

const retrieveMission = (missionId) => {
  validateId(missionId, 'mission id');

  return (async () => {
    const selectedFields = [
      '-traveler._id',
      '-participants._id',
      '-participants.email',
      '-__v',
    ].join(' ');

    const foundMission = await Mission.findById(missionId);

    if (!foundMission)
      throw new ExistenceError(`mission with id ${missionId} not exist`);

    await createNasaData(foundMission.creator.toString());

    if (foundMission.status === 'in_progress') await updateMission(missionId);

    const mission = await Mission.findById(missionId, selectedFields).lean();

    return mission;
  })();
};

module.exports = retrieveMission;
