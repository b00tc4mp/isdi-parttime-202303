const { extractToken } = require('../helpers')
const updatePost = require('../logic/updatePost')

module.exports = (req, res) => {
  try {
    const userId = extractToken(req)
    const { imageUrl, postText } = req.body
    const { postId } = req.params

    updatePost(userId, postId, imageUrl, postText)
    .then(() => res.send())
    .catch(error => res.status(400).json({ error: error.message }))
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}