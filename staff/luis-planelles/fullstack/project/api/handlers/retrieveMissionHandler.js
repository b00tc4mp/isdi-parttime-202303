const { retrieveMission } = require('../logic');
const { handleErrors, extractUserId } = require('./helpers');

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req);

  const { missionId } = req.params;
  return retrieveMission(userId, missionId).then((mission) =>
    res.json(mission)
  );
});
