const { extractUserId } = require('../helpers')
const toggleSavePost = require('../logic/toggleSavePost')

module.exports = (req, res) => {
  try {
    const userId = extractUserId(req)
    const { postId } = req.params

    toggleSavePost(userId, postId, error => {
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