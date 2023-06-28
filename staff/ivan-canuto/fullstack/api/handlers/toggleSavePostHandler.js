const { extractToken } = require('../helpers')
const toggleSavePost = require('../logic/toggleSavePost')

module.exports = (req, res) => {
  try {
    const userId = extractToken(req)
    const { postId } = req.params

    toggleSavePost(userId, postId)
      .then(() => res.send())
      .catch(error => res.status(400).json({ error: error.message }))
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}