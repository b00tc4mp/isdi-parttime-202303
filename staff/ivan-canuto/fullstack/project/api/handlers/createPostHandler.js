const { createPost } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req)
  const { summary } = req.body
  const { conversationId } = req.params

  const promise = createPost(userId, conversationId, summary)

  return (async () => {
    await promise

    res.status(201).send()
  })()
})