const { retrievePostByPostId } = require('../../logic/posts')
const { extractUserId } = require('../../helpers')


module.exports = (req, res) => {

    try {
        const userId = extractUserId(req)
        const { postId } = req.params

        retrievePostByPostId(userId, postId, (error, post) => {
            if (error) {
                res.status(400).json({ error: error.message })

                return
            }
            res.status(200).send(post)
        })
    } catch (error) {

        res.status(400).json({ error: error.message })
    }
}