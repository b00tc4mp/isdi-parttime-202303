const { extractUserId, handleErrors } = require('./helpers')
const { deletePost } = require('../logic')

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req)
  const { postId } = req.params

  const promise = deletePost(userId, postId)

  return (async () => {
    await promise

    res.status(204).send()
  })()
})