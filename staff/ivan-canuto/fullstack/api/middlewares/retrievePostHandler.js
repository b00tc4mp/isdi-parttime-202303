const { extractUserId } = require('../helpers')
const retrievePost = require('../logic/retrievePost')

module.exports = (req, res) => {
  try {
    const userId = extractUserId(req)
    const { postId } = req.params

    retrievePost(userId, postId, (error, post) => {
      if(error) {
        res.status(400).json({ error: error.message })
        
        return
      }
      debugger
      res.json({ post })
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}