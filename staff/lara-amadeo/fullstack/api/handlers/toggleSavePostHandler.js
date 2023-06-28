const { retrieveToken } = require('../helpers')
const { toggleSavePost } = require('../logic')

module.exports = (req, res) => {
    try {
        const { postId } = req.params

        const userId = retrieveToken(req)

        toggleSavePost(userId, postId)
            .then(() => res.status(201).send())
            .catch(error => res.status(400).json({ error: error.stack }))
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}