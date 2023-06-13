const { registerUser } = require('../logic');

const registerUserMid = (req, res) => {
  try {
    const { name, email, password } = req.body;

    registerUser(name, email, password, (error) => {
      if (error) {
        res.status(400).json({ error: error.message });

        return;
      }

      res.status(201).send();
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = registerUserMid;
