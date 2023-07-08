const { deletePost } = require('../logic');
const { extractUserId } = require('../helpers');

const deletePostHandler = (req, res) => {
  const userId = extractUserId(req);

  const { postId } = req.params;

  deletePost(userId, postId)
    .then(() => res.status(204).send())
    .catch((error) => res.status(400).json({ error: error.message }));
};

module.exports = deletePostHandler;
