const { extractUserId, handleErrors } = require('./helpers')
const { updatePost } = require('../logic')

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req)
  const { title, content, subject } = req.body
  const { postId } = req.params

  const promise = updatePost(userId, postId, title, content, subject)

  return (async () => {
    await promise

    res.status(204).send()
  })()
})