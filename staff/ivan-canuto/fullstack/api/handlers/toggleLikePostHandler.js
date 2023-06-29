const { extractUserId } = require('./helpers')
const { toggleLikePost } = require('../logic')

module.exports = (req, res) => {
  try {
    const userId = extractUserId(req)
    const { postId } = req.params
    
    toggleLikePost(userId, postId)
      .then(() => res.send())
      .catch(error => res.status(400).json({ error: error.message }))
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}