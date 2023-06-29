const { extractUserId } = require('./helpers')
const { retrieveUserPosts } = require('../logic')

module.exports = (req, res) => {
  try {
    const userId = extractUserId(req)
  
    retrieveUserPosts(userId)
      .then(userPosts => res.json({ userPosts }))
      .catch(error => res.status(400).json({ error: error.message }))
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}