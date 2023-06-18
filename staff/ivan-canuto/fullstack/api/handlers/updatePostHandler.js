const { extractUserId } = require('../helpers')
const updatePost = require('../logic/updatePost')

module.exports = (req, res) => {
  try {
    const userId = extractUserId(req)
    const { imageUrl, postText } = req.body
    const { postId } = req.params

    updatePost(userId, postId, imageUrl, postText, error => {
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