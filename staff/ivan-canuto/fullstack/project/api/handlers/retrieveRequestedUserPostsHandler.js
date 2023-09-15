const { extractUserId, handleErrors } = require('./helpers')
const { retrieveRequestedUserPosts } = require('../logic')

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req)
  const { requestedUserId } = req.params

  const promise = retrieveRequestedUserPosts(userId, requestedUserId)

  return (async () => {
    const posts = await promise

    res.send(posts)
  })()
})