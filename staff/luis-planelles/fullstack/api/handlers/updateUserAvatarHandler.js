const { updateUserAvatar } = require('../logic');
const { extractToken } = require('../helpers');

const updateUserAvatarHandler = (req, res) => {
  try {
    const token = extractToken(req);

    const payload = jwt.verify(token, process.env.SECRET, { expiresIn: '10s' });

    const { sub: userId } = payload;

    const { avatar } = req.body;

    updateUserAvatar(userId, avatar)
      .then(() => res.status(204).send())
      .catch((error) => res.status(400).json({ error: error.message }));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = updateUserAvatarHandler;
