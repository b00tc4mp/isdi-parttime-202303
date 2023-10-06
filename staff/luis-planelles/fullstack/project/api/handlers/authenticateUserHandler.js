const { authenticateUser } = require('../logic');

const { handleErrors, generateToken } = require('./helpers');

module.exports = handleErrors((req, res) => {
  const { email, password } = req.body;

  return authenticateUser(email, password).then((userId) => {
    const token = generateToken(userId);

    res.json(token);
  });
});
