const { toggleVisibilityPost } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req)
  const { postId } = req.params
  
  return toggleVisibilityPost(userId, postId)
    .then(() => res.send())
})