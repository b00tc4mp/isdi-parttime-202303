const { extractUserId, handleErrors } = require('./helpers')
const { createComment } = require('../logic')

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req)
  const { postId } = req.params
  const { commentText } = req.body

  const promise = createComment(userId, postId, commentText)

  return (async () => {
    await promise

    res.status(201).send()
  })()
})