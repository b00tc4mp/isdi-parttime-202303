const { updateMission } = require('../logic');
const { handleErrors, extractUserId } = require('./helpers');

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req);

  const { missionId } = req.params;

  return updateMission(userId, missionId).then(() => res.status(204).send());
});
