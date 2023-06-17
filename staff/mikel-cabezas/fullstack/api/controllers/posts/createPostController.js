const { createPost } = require('../../logic/posts')
const { extractUserId } = require('../../helpers')


module.exports = (req, res) => {

    try {
        const userId = extractUserId(req)

        const { id, author, image, title, text, date, comments, likes, visibility, location } = req.body

        createPost(userId, image, title, text, location, error => {
            if (error) {
                res.status(400).json({ error: error.message })

                return
            }
            res.status(201).send()
        })
    } catch (error) {

        res.status(400).json({ error: error.message })
    }
}