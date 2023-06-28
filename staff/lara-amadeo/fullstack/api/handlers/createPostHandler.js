const { retrieveToken } = require('../helpers')
const { createPost } = require('../logic')

module.exports = (req, res) => {
    try {
        const { image, text } = req.body

        const userId = retrieveToken(req)

        createPost(userId, image, text)
            .then(() => res.status(201).send())
            .catch(error => res.status(400).json({ error: error.message }))
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}