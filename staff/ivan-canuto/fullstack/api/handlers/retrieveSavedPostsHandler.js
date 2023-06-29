const { extractUserId } = require('./helpers')
const { retrieveSavedPosts } = require('../logic')

module.exports = (req, res) => {
  try {
    const userId = extractUserId(req)
  
    retrieveSavedPosts(userId)
      .then(savedPosts => res.json({ savedPosts }))
      .catch(error => {
        console.debug(error)
        res.status(400).json({ error: error.message })
      })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}