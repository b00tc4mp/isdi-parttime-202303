const { extractUserId, handleErrors } = require('./helpers')
const { storeInputInDB } = require('../logic')

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req)
  const userInput = req.body
  const { conversationId } = req.params

  const promise = storeInputInDB(userId, conversationId, userInput)

  return (async () => {
    await promise

    res.send()
  })()
})