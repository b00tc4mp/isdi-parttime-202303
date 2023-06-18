const buyPost = require('../logic/buyPost')

module.exports = (req, res) => {
  try {
    const { postId } = req.params

    buyPost(postId, error => {
      if(error) {
        res.status(400).json({error: error.message})

        return
      }

      res.send()  
    })
  } catch (error) {
    res.status(400).json({erro: error.message})
  }
}