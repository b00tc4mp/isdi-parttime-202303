const { togglePrivatizePost } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req)

  const { postId } = req.params

  return togglePrivatizePost(userId, postId).then(() => res.status(204).send())
})
