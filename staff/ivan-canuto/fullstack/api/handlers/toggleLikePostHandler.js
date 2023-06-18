const { extractUserId } = require('../helpers')
const toggleLikePost = require('../logic/toggleLikePost')

module.exports = (req, res) => {
  try {
    const userId = extractUserId(req)
    const { postId } = req.params
    
    toggleLikePost(userId, postId, error => {
      if(error) {
        res.status(400).json({ error: error.message })

        return
      }

      res.send()
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}