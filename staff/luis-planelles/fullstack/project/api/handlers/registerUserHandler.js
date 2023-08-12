const { registerUser } = require('../logic');
const handleErrors = require('./helpers/handleErrors');

module.exports = handleErrors((req, res) => {
  const { name, email, password } = req.body;

  return registerUser(name, email, password).then(() => res.status(201).send());
});
