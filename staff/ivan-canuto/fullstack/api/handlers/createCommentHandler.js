const { extractUserId, handleErrors } = require('./helpers')
const { createComment } = require('../logic')

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req)
  const { postId } = req.params
  const { commentText } = req.body

  return createComment(userId, postId, commentText)
    .then(() => res.send())  
})