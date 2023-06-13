const { retrieveUser } = require('../logic');
const { extractUserId } = require('../helpers');

const retrieveUserMid = (req, res) => {
  try {
    const userId = extractUserId(req);

    retrieveUser(userId, (error, user) => {
      if (error) {
        res.status(400).json({ error: error.message });

        return;
      }

      res.json(user);
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = retrieveUserMid;
