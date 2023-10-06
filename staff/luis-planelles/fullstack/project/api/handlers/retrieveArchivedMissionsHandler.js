const { retrieveArchivedMissions } = require('../logic');
const { extractUserId, handleErrors } = require('./helpers');

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req);

  return retrieveArchivedMissions(userId).then((missions) =>
    res.json(missions)
  );
});
