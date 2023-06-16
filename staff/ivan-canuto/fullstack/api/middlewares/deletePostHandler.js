const { extractUserId } = require('../helpers')
const deletePost = require('../logic/deletePost')

module.exports = (req, res) => {
  try {
    const userId = extractUserId(req)
    const { postId } = req.params

    deletePost(postId, userId, error => {
      if(error) {
        res.status(400).json({ error: error.message})

        return
      }

      res.send()
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}