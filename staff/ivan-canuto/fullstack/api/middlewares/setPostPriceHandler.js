const setPostPrice = require('../logic/setPostPrice')

module.exports = (req, res) => {
  try {
    const { postPrice } = req.body
    const { postId } = req.params

    setPostPrice(postId, postPrice, error => {
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