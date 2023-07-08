const { createPost } = require('../logic');
const { extractUserId } = require('./helpers');

const createPostHandler = (req, res) => {
  try {
    const userId = extractUserId(req);

    const { image, text } = req.body;

    createPost(userId, image, text)
      .then(() => res.status(201).send())
      .catch((error) => res.status(400).json({ error: error.message }));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = createPostHandler;
