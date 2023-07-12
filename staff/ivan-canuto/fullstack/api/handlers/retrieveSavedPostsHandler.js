const { extractUserId, handleErrors } = require('./helpers')
const { retrieveSavedPosts } = require('../logic')

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req)

  return retrieveSavedPosts(userId)
    .then(savedPosts => res.json(savedPosts))
})