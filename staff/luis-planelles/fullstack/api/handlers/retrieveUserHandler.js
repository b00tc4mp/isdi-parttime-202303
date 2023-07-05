const { retrieveUser } = require('../logic');
const { extractToken } = require('../helpers');
const jwt = require('jsonwebtoken');

const retrieveUserHandler = (req, res) => {
  try {
    const { authorization } = req.headers;

    const token = authorization.slice(7);

    const payload = jwt.verify(token, process.env.SECRET);

    const { sub: userId } = payload;

    retrieveUser(userId)
      .then((user) => res.json(user))
      .catch((error) => res.status(400).json({ error: error.message }));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = retrieveUserHandler;
