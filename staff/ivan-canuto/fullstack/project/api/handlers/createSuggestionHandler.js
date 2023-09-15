const { createSuggestion } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req)
  const { title, content } = req.body
  const { postId } = req.params

  const promise = createSuggestion(userId, postId, title, content)

  return (async () => {
    await promise

    res.status(201).send()
  })()
})