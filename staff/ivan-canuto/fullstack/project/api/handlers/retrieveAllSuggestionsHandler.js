const { extractUserId, handleErrors } = require('./helpers')
const { retrieveAllSuggestions } = require('../logic')

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req)

  const promise = retrieveAllSuggestions(userId)

  return (async () => {
    const suggestions = await promise

    res.send(suggestions)
  })()
})