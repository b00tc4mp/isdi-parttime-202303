const { extractUserId } = require('../helpers')
const retrieveUserPosts = require('../logic/retrieveUserPosts')

module.exports = (req, res) => {
  try {
    const userId = extractUserId(req)
  
    retrieveUserPosts(userId, (error, userPosts) => {
      if(error) {
        res.status(400).json({ error: error.message })
  
        return
      }
  
      res.json({ userPosts })
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}