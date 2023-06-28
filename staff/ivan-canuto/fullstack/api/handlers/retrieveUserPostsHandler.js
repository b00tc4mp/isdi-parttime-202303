const { extractToken } = require('../helpers')
const retrieveUserPosts = require('../logic/retrieveUserPosts')

module.exports = (req, res) => {
  try {
    const userId = extractToken(req)
  
    retrieveUserPosts(userId)
      .then(userPosts => res.json({ userPosts }))
      .catch(error => res.status(400).json({ error: error.message }))
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}