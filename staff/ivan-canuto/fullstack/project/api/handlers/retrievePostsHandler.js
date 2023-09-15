const { extractUserId, handleErrors } = require('./helpers')
const { retrievePosts } = require('../logic')

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req)
  const { subject } = req.body

  const promise = retrievePosts(userId, subject)

  return (async () => {
    const posts = await promise

    res.send(posts)
  })()
})