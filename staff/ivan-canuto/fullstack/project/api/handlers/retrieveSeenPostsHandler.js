const { extractUserId, handleErrors } = require('./helpers')
const { retrieveSeenPosts } = require('../logic')

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req)

  const promise = retrieveSeenPosts(userId)

  return (async () => {
    const seenPosts = await promise

    res.send(seenPosts)
  })()
})