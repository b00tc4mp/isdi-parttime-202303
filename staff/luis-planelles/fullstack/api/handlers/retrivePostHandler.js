const { retrievePost } = require('../logic');
const { extractUserId } = require('../helpers');

const retrievePostsHandler = (req, res) => {
  try {
    const userId = extractUserId(req);

    retrievePost(userId, (error, post) => {
      if (error) {
        res.status(400).json({ error: error.message });

        return;
      }

      res.json(post);
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = retrievePostsHandler;
