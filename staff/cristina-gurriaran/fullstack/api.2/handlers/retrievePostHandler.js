const { extractUserId } = require('../helpers')
const { retrievePost } = require('../logic')

module.exports = (req, res) => {
    const userId = extractUserId(req)
    const { postId } = req.params

    try {
        retrievePost(userId, postId, (error, post) => {
            if (error) {
                res.status(400).json({ error: error.message })

                return
            }

            res.status(200).json({ post })
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}