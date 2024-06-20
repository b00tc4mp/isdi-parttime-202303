const { extractToken } = require('../helpers')
const { retrievePost } = require('../logic')

module.exports = (req, res) => {

    try {
        const { postId } = req.params
        const userId = extractToken(req)

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