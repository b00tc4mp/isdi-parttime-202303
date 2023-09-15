const { extractUserId, handleErrors } = require('./helpers')
const { retrieveSavedPosts } = require('../logic')

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req)

  const promise = retrieveSavedPosts(userId)

  return (async () => {
    const savedPosts = await promise

    res.send(savedPosts)
  })()
})