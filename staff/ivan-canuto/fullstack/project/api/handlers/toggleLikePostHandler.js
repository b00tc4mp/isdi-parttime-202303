const { extractUserId, handleErrors } = require('./helpers')
const { toggleLikePost } = require('../logic')

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req)
  const { postId } = req.params

  const promise = toggleLikePost(userId, postId)

  return (async () => {
    await promise

    res.send()
  })()
})