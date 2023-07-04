const { retrieveUser } = require('../logic');
const { extractToken } = require('../helpers');
const jwt = require('jsonwebtoken');

const retrieveUserHandler = (req, res) => {
  try {
    const token = extractToken(req);

    const payload = jwt.verify(token, process.env.SECRET, { expiresIn: '10s' });

    const { sub: userId } = payload;

    return retrieveUser(userId)
      .then((user) => res.json(user))
      .catch((error) => res.status(400).json({ error: error.message }));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = retrieveUserHandler;
