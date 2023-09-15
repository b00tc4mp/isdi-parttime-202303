const { extractUserId, handleErrors } = require('./helpers')
const { retrieveUserPosts } = require('../logic')

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req)

  const promise = retrieveUserPosts(userId)

  return (async () => {
    const userPosts = await promise

    res.send(userPosts)
  })()
})