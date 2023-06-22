const { toggleFavouritePost } = require('../logic');
const { extractUserId } = require('../helpers');

const toggleFavouritePostHandler = (req, res) => {
  try {
    const userId = extractUserId(req),
      { postId } = req.params;

    toggleFavouritePost(userId, postId, (error) => {
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

module.exports = toggleFavouritePostHandler;
