const { extractUserId, handleErrors } = require('./helpers')
const { toggleCheckSuggestion } = require('../logic')

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req)
  const { suggestionId } = req.params

  const promise = toggleCheckSuggestion(userId, suggestionId)

  return (async () => {
    await promise

    res.send()
  })()
})