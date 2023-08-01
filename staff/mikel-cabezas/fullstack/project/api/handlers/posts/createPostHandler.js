const { createPost } = require('../../logic/posts')
const { extractUserId, handleErrors } = require('../helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)
    const { image, title, text, location } = req.body
    // const { id, author, image, title, text, date, comments, likes, visibility, location } = req.body

    return createPost(userId, image, title, text, location)
        .then(() => res.status(201).send())
})