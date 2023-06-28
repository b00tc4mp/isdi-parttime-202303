const toggleVisibilityPost = require('../logic/toggleVisibilityPost')

module.exports = (req, res) => {
  try {
    const { postId } = req.params
    
    toggleVisibilityPost(postId)
      .then(() => res.send())
      .catch(error => res.status(400).json({ error: error.message }))
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}