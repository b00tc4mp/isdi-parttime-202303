const { extractUserId, handleErrors } = require('./helpers')
const { retrieveSearchedPosts } = require('../logic')

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req)
  const { subject, textToSearch } = req.body

  const promise = retrieveSearchedPosts(userId, subject, textToSearch)

  return (async () => {
    const searchedPosts = await promise

    res.send(searchedPosts)
  })()
})