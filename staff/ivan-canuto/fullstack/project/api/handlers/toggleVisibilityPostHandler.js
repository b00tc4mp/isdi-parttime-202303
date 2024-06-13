const { toggleVisibilityPost } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req)
  const { postId } = req.params

  const promise = toggleVisibilityPost(userId, postId)

  return (async () => {
    await promise

    res.send()
  })()
})