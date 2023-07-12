const { extractUserId, handleErrors } = require('./helpers')
const { deletePost } = require('../logic')

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req)
  const { postId } = req.params

  return deletePost(userId, postId)
    .then(() => res.send())
})