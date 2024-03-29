const { participantFeedback } = require('../logic');
const { handleErrors } = require('./helpers');

module.exports = handleErrors((req, res) => {
  const { participantId } = req.params;
  const { missionId, confirmation, feedback } = req.body;

  return participantFeedback(
    participantId,
    missionId,
    confirmation,
    feedback
  ).then(() => res.status(201).send());
});
