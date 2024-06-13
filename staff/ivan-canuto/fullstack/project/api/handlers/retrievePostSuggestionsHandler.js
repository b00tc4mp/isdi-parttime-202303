const { extractUserId, handleErrors } = require('./helpers')
const { retrievePostSuggestions } = require('../logic')

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req)
  const { postId } = req.params

  const promise = retrievePostSuggestions(userId, postId)

  return (async () => {
    const suggestions = await promise

    res.send(suggestions)
  })()
})