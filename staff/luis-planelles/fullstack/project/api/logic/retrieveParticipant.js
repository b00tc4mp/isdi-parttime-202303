const {
  validators: { validateId },
  errors: { ExistenceError },
} = require('com');

const { Mission } = require('../data/models');

/**
 * Retrieve missions associated with a user from the database.
 * @param {string} participantId - The partipant's unique identifier.
 * @param {string} missionId - The missions's unique identifier.
 * @throws {TypeError} - If userId or mission id is of the wrong type.
 * @throws {ContentError} - If userId or mission id contains invalid characters.
 * @throws {ExistenceError} - If the user or mission with the provided userId doesn't exist.
 * @returns {Promise<Object>>} - An object of participant.
 */

const retrieveParticipant = (missionId, participantId) => {
  validateId(missionId, 'mission id');
  validateId(participantId, 'participant id');

  return (async () => {
    const foundMission = await Mission.findById(missionId);

    if (!foundMission)
      throw new ExistenceError(`mission with id ${missionId} not exist`);

    const participantIndex = foundMission.participants.findIndex(
      (participant) => {
        return participant._id.toString() === participantId;
      }
    );

    if (participantIndex !== -1)
      return foundMission.participants[participantIndex];
    else
      throw new ExistenceError(
        `participant with id ${participantId} not exist`
      );
  })();
};

module.exports = retrieveParticipant;
