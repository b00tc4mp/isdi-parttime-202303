const { retrieveMission } = require('../logic');
const { handleErrors } = require('./helpers');

module.exports = handleErrors((req, res) => {
  const { missionId } = req.params;

  return retrieveMission(missionId).then((mission) => res.json(mission));
});
