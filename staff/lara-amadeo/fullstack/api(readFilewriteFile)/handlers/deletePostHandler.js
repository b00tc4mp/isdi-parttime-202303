const { extractToken } = require('../helpers')
const { deletePost } = require('../logic')

module.exports = (req, res) => {
    try {
        const { postId } = req.params
        const userId = extractToken(req)

        deletePost(userId, postId, error => {
            if (error) {
                res.status(400).json({ error: error.message })

                return
            }

            res.status(204).send()
        })
    } catch (error) { res.status(400).json({ error: error.message }) }
}