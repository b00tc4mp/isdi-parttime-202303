const { extractUserId } = require('../helpers')
const retrieveUser = require('../logic/retrieveUser')

module.exports = (req, res) => {
  try {
    const userId = extractUserId(req)

    retrieveUser(userId, (error, user) => {
      if(error) {
        res.status(400).json({ error: error.message })
        
        return
      }
      
      res.status(201).json(user)
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}