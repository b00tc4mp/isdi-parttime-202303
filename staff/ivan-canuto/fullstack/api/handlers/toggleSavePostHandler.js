const { extractUserId, handleErrors } = require('./helpers')
const { toggleSavePost } = require('../logic')

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req)
  const { postId } = req.params

  return toggleSavePost(userId, postId)
    .then(() => res.send())
})