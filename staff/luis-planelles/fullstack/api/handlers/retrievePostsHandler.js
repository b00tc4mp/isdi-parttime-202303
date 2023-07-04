const { retrievePosts } = require('../logic');
const { extractToken } = require('../helpers');

const retrievePostsHandler = (req, res) => {
  try {
    const token = extractToken(req);

    const payload = jwt.verify(token, process.env.SECRET, { expiresIn: '10s' });

    const { sub: userId } = payload;

    return retrievePosts(userId)
      .then((posts) => res.json(posts))
      .catch((error) => res.status(400).json({ error: error.message }));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = retrievePostsHandler;
