const { extractUserId, handleErrors } = require('./helpers')
const { retrieveUserPosts } = require('../logic')

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req)

  return retrieveUserPosts(userId)
    .then(userPosts => res.json(userPosts))
})