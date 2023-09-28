const {
  validators: { validateId, validateText, validateFeedback },
  errors: { ExistenceError },
} = require('com');
const { Mission } = require('../data/models');

/**
 * Update the confirmation and feedback of a participant in a mission.
 * @param {string} participantId - The ID of the participant to be updated.
 * @param {string} missionId - The ID of the mission to which the participant belongs.
 * @param {string} confirmation - The participant's confirmation ('accept' or 'decline').
 * @param {string} feedback - The participant's feedback.
 *
 * @throws {TypeError} If any of the parameters is not of the expected type.
 * @throws {ExistenceError} If the mission with the specified ID is not found or the participant does not exist in the mission.
 */

const participantFeedback = (
  participantId,
  missionId,
  confirmation,
  feedback
) => {
  validateId(participantId, 'participant id');
  validateId(missionId, 'mission id');
  validateText(confirmation, 'confirmation');
  validateFeedback(feedback, 'feedback');

  return (async () => {
    const foundMission = await Mission.findById(missionId);

    if (!foundMission)
      throw new ExistenceError(`mission with id ${missionId} not exist`);

    const participantIndex = foundMission.participants.findIndex(
      (participant) => {
        return participant._id.toString() === participantId;
      }
    );

    if (participantIndex !== -1) {
      if (confirmation === 'accept')
        foundMission.participants[participantIndex].confirmation = 'accept';

      if (confirmation === 'decline')
        foundMission.participants[participantIndex].confirmation = 'decline';

      if (feedback)
        foundMission.participants[participantIndex].feedback = feedback;

      await foundMission.save();
    } else {
      throw new ExistenceError(
        `participant with id ${participantId} not exist`
      );
    }
  })();
};

module.exports = participantFeedback;
