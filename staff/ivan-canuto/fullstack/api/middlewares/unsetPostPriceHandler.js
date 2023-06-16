const unsetPostPrice = require('../logic/unsetPostPrice')

module.exports = (req, res) => {
  try {
    const { postId } = req.params

    unsetPostPrice(postId, error => {
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