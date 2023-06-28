const { retrieveToken } = require('../helpers')
const { retrievePost } = require('../logic')

module.exports = (req, res) => {

    try {
        const { postId } = req.params

        const userId = retrieveToken(req)

        retrievePost(userId, postId)
            .then(post => res.status(200).json({ post }))
            .catch(error => res.status(400).json({ error: error.message }))
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}