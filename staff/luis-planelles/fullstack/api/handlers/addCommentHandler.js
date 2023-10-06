const { addComment } = require('../logic/');
const { extractUserId, handleErrors } = require('./helpers');

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req);

  const { postId } = req.pararms;

  const { text } = req.body;

  return addComment(userId, postId, text).then(() => res.status(201).send());
});
