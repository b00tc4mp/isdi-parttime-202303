const { retrieveParticipant } = require('../logic');
const { handleErrors } = require('./helpers');

module.exports = handleErrors((req, res) => {
  const { missionId, participantId } = req.params;

  return retrieveParticipant(missionId, participantId).then((participant) =>
    res.json(participant)
  );
});
