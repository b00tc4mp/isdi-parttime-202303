const { extractUserId, handleErrors } = require('./helpers')
const { toggleLikePost } = require('../logic')

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req)
  const { postId } = req.params
  
  return toggleLikePost(userId, postId)
    .then(() => res.send())
})