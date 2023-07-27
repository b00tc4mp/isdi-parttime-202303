const { extractUserId, handleErrors } = require('./helpers')
const { toggleSavePost } = require('../logic')

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req)
  const { postId } = req.params

  const promise = toggleSavePost(userId, postId)

  return (async () => {
    await promise

    res.send()
  })()
})