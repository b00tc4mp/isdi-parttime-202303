const { extractToken } = require('../helpers')
const toggleLikePost = require('../logic/toggleLikePost')

module.exports = (req, res) => {
  try {
    const userId = extractToken(req)
    const { postId } = req.params
    
    toggleLikePost(userId, postId)
      .then(() => res.send())
      .catch(error => res.status(400).json({ error: error.message }))
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}