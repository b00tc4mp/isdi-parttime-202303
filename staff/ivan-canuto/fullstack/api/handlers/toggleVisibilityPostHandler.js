const toggleVisibilityPost = require('../logic/toggleVisibilityPost')

module.exports = (req, res) => {
  try {
    const { postId } = req.params
    
    toggleVisibilityPost(postId, error => {
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