const { extractUserId, handleErrors } = require('./helpers')
const { createPost } = require('../logic')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)
    
    const { image, location, title, text } = req.body

    const promise = createPost(userId, image, location, title, text)

    return (async () => {
        await promise

        res.status(201).send()
    })()
})