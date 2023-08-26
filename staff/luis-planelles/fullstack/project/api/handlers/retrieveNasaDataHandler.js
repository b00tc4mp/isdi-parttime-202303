const { retrieveNasaData } = require('../logic');
const { handleErrors, extractUserId } = require('./helpers');

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req);

  return retrieveNasaData(userId).then((data) => res.json(data));
});
