const { extractUserId } = require('./helpers')
const { retrievePost } = require('../logic')

module.exports = (req, res) => {
  try {
    const userId = extractUserId(req)
    const { postId } = req.params

    retrievePost(userId, postId)
      .then(post => res.json({ post }))
      .catch(error => res.status(400).json({ error: error.message }))
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}