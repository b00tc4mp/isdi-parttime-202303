const { retrivePosts } = require('../logic')
const { extractUserId } = require('../helpers')

module.exports = (req, res) => {
    try {
        const userId = extractUserId(req)   

        retrivePosts(userId)
            .then(posts => res.json(posts))
            .catch(error => res.status(400).json({ error: error.message }))
            
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
    
}