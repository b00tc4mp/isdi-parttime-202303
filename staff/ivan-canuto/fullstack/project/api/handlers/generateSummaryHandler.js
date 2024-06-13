const { extractUserId, handleErrors } = require('./helpers')
const { generateSummary } = require('../logic')

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req)
  const { conversationId } = req.params
  
  const promise = generateSummary(userId, conversationId)

  return (async () => {
    const summary = await promise
    
    res.status(201).send(summary)
  })()
})