const registerUser = require('../logic/registerUser');

const registerUserHandler = (req, res) => {
  const { name, email, password } = req.body;

  try {
    registerUser(name, email, password)
      .then(() => res.status(201).send())
      .catch((error) => console.log(error.message));
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = registerUserHandler;
