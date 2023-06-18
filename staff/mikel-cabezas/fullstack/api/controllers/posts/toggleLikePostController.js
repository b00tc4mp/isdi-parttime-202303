const { editPost } = require('../../logic/posts')
const { extractUserId } = require('../../helpers')


module.exports = (req, res) => {

    try {
        const userId = extractUserId(req)

        const { postId, title, text, image, visibility } = req.body

        editPost(userId, postId, title, text, image, visibility, error => {
            if (error) {
                res.status(400).json({ error: error.message })

                return
            }
            res.status(204).send()
        })
    } catch (error) {

        res.status(400).json({ error: error.message })
    }
}