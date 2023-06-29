const { extractUserId } = require('./helpers')
const { updatePost } = require('../logic')

module.exports = (req, res) => {
  try {
    const userId = extractUserId(req)
    const { imageUrl, postText } = req.body
    const { postId } = req.params

    updatePost(userId, postId, imageUrl, postText)
    .then(() => res.send())
    .catch(error => res.status(400).json({ error: error.message }))
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}