const { deletePost } = require('../logic')
const { extractUserId } = require('../helpers')

module.exports = (req, res) => {
    try {
        const userAuth = extractUserId(req)

        const { postId } = req.params

        deletePost(userAuth, postId, (error) => {
            if (error) {
                res.status(400).json({ error: error.message })

                return
            }

            res.status(200).send()
        })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}