const { extractUserId } = require('../helpers')
const retrieveSavedPosts = require('../logic/retrieveSavedPosts')

module.exports = (req, res) => {
  try {
    const userId = extractUserId(req)
  
    retrieveSavedPosts(userId, (error, savedPosts) => {
      if(error) {
        res.status(400).json({ error: error.message })
  
        return
      }
  
      res.json({ savedPosts })
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}