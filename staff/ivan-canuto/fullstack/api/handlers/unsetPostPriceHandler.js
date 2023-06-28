const unsetPostPrice = require('../logic/unsetPostPrice')

module.exports = (req, res) => {
  try {
    const { postId } = req.params

    unsetPostPrice(postId)
      .then(() => res.send())
      .catch(error => res.status(400).json({ error: error.message })) 
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}