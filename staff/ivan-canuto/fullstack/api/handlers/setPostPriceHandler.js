const setPostPrice = require('../logic/setPostPrice')

module.exports = (req, res) => {
  try {
    const { postPrice } = req.body
    const { postId } = req.params

    setPostPrice(postId, postPrice)
      .then(() => res.send())
      .catch(error => res.status(400).json({ error: error.message }))
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}