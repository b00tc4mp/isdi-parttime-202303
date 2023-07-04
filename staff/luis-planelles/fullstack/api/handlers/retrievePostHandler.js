const { retrievePost } = require('../logic');
const { extractUserId } = require('../helpers');

const retrievePostsHandler = (req, res) => {
  try {
    const token = extractToken(req);

    const payload = jwt.verify(token, process.env.SECRET, { expiresIn: '10s' });

    const { sub: userId } = payload;

    const { postId } = req.params;

    return retrievePost(userId, postId)
      .then(() => res.json(post))
      .catch((error) => res.status(400).json({ error: error.message }));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = retrievePostsHandler;
