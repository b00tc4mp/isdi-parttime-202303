const { extractUserId, handleErrors } = require('./helpers')
const { updatePost } = require('../logic')

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req)
  const { imageUrl, postText } = req.body
  const { postId } = req.params

  return updatePost(userId, postId, imageUrl, postText)
  .then(() => res.send())
})