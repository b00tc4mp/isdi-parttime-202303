const { deleteSuggestion } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req)
  const { postId, suggestionId } = req.params

  const promise = deleteSuggestion(userId, postId, suggestionId)

  return (async () => {
    await promise

    res.status(204).send()
  })()
})