const { updatePost } = require('../logic');
const { extractUserId } = require('../helpers');

const updatePostHandler = (req, res) => {
  try {
    const userId = extractUserId(req),
      { postId } = req.params,
      { image, text } = req.body;

    updatePost(userId, postId, image, text, (error) => {
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

module.exports = updatePostHandler;
