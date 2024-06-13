const { createNewPost } = require('../logic')
const { extractUserId } = require('../helpers')

module.exports = (req, res) => {
    try {
        const userId = extractUserId(req)

        const { image, text } = req.body

        createNewPost(userId, image, text, error => {
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