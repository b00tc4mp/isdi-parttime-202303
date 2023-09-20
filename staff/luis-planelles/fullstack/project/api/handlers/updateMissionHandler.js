const { updateMission } = require('../logic');
const { handleErrors } = require('./helpers');

module.exports = handleErrors((req, res) => {
  const { missionId } = req.params;

  return updateMission(missionId).then(() => res.status(204).send());
});
