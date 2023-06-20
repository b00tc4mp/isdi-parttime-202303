const { toggleLikePost } = require('../logic');
const { extractUserId } = require('../helpers');

const toggleLikePostHandler = (req, res) => {
  try {
    const userId = extractUserId(req),
      { postId } = req.params;

    toggleLikePost(userId, postId, (error) => {
      if (error) {
        res.status(400).json({ error: error.message });

        return;
      }

      res.status(204).send();
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = toggleLikePostHandler;
