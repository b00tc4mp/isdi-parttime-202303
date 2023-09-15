const { extractUserId, handleErrors } = require('./helpers')
const { hideSuggestion } = require('../logic')

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req)
  const { suggestionId } = req.params

  const promise = hideSuggestion(userId, suggestionId)

  return (async () => {
    await promise

    res.send()
  })()
})