const { deleteComment } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req)
  const { postId, commentId } = req.params

  return deleteComment(userId, postId, commentId)
    .then(() => res.send())
})