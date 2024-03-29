const { retrieveMissions } = require('../logic');
const { extractUserId, handleErrors } = require('./helpers');

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req);

  return retrieveMissions(userId).then((missions) => res.json(missions));
});
