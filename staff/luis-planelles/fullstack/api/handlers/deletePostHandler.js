const { deletePost } = require('../logic');
const { extractToken } = require('../helpers');
const jwt = require('jsonwebtoken');

const deletePostHandler = (req, res) => {
  const token = extractToken(req);

  const payload = jwt.verify(token, process.env.SECRET);

  const { sub: userId } = payload;

  const { postId } = req.params;

  deletePost(userId, postId)
    .then(() => res.status(204).send())
    .catch((error) => res.status(400).json({ error: error.message }));
};

module.exports = deletePostHandler;
