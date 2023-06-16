const createPost = require('../logic/createPost')
const { extractUserId } = require('../helpers')

module.exports = (req, res) => {
  try {
  const userId = extractUserId(req)
  const { imageUrl, postText } = req.body

    createPost(userId, imageUrl, postText, error => {
      if(error) {
        res.status(400).json({ error: error.message })
      }

      res.send()
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}