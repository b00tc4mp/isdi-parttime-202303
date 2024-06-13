const { createNewPost } = require('../logic')
const { extractUserId } = require('../helpers')

module.exports = (req, res) => {
    try {
        const userId = extractUserId(req)

        const { image, text } = req.body

        createNewPost(userId, image, text)
            .then(() => res.status(201).send())
            .catch(error => res.status(400).json({ error: error.message }))
            
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}