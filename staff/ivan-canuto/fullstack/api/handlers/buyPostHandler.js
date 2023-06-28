const buyPost = require('../logic/buyPost')

module.exports = (req, res) => {
  try {
    const { postId } = req.params

    buyPost(postId)
      .then(() => res.send())
      .catch(error => res.status(400).json({error: error.message}))
  } catch (error) {
    res.status(400).json({erro: error.message})
  }
}