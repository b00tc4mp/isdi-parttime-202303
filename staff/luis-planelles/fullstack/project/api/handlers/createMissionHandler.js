const { createMission } = require('../logic');
const { extractUserId, handleErrors } = require('./helpers');

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req);

  const { traveler, destination, participants, loserPrice } = req.body;

  return createMission(
    userId,
    traveler,
    destination,
    participants,
    loserPrice
  ).then(() => res.status(201).send());
});
