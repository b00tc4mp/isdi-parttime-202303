const { extractUserId, handleErrors } = require('./helpers')
const { retrieveOwnSuggestions } = require('../logic')

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req)

  const promise = retrieveOwnSuggestions(userId)

  return (async () => {
    const suggestions = await promise

    res.send(suggestions)
  })()
})