const { extractUserId, handleErrors } = require('./helpers')
const { createPostFromScratch } = require('../logic')

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req)
  const { title, content, subject } = req.body
  
  const promise = createPostFromScratch(userId, title, content, subject)

  return (async () => {
    await promise
    
    res.status(201).send()
  })()
})