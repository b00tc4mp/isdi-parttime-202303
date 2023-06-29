const { deleteComment } = require('../logic')
const { extractUserId } = require('./helpers')

module.exports = (req, res) => {
  try {
    const userId = extractUserId(req)
    const { postId, commentId } = req.params

    deleteComment(userId, postId, commentId)
      .then(() => res.send())
      .catch(error => res.status(400).json({ error: error.message }))
    
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}