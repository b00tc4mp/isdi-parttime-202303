const { deleteSuggestion } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req)
  const { suggestionId } = req.params

  const promise = deleteSuggestion(userId, suggestionId)

  return (async () => {
    await promise

    res.send()
  })()
})