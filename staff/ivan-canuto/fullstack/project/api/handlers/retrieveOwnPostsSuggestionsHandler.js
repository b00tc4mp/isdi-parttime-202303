const { extractUserId, handleErrors } = require('./helpers')
const { retrieveOwnPostsSuggestions } = require('../logic')

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req)

  const promise = retrieveOwnPostsSuggestions(userId)

  return (async () => {
    const suggestions = await promise

    res.send(suggestions)
  })()
})