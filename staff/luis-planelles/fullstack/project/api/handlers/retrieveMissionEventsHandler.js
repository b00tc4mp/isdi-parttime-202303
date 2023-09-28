const { retrieveMissionEvents } = require('../logic');
const { handleErrors } = require('./helpers');

module.exports = handleErrors((req, res) => {
  const { missionId } = req.params;

  return retrieveMissionEvents(missionId).then((events) => res.json(events));
});
