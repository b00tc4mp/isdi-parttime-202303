const { extractUserId, handleErrors } = require('./helpers')
const { toggleHideSuggestion } = require('../logic')

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req)
  const { suggestionId } = req.params

  const promise = toggleHideSuggestion(userId, suggestionId)

  return (async () => {
    await promise

    res.send()
  })()
})