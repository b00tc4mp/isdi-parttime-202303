const { authenticateUser } = require('../logic');

const authenticateUserMid = (req, res) => {
  try {
    const { email, password } = req.body;

    authenticateUser(email, password, (error, userId) => {
      if (error) {
        res.status(400).json({ error: error.message });

        return;
      }

      res.json({ userId });
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = authenticateUserMid;
