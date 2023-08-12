const { extractUserId, handleErrors } = require('./helpers')
const { createWorkspot } = require ('../logic')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)

    const { image, name, location, description, type, features, reviews, likes } = req.body

    const promise = createWorkspot(userId, image, name, location, description, type, features, reviews, likes)

    return (async () => {
        await promise

        res.status(201).send()
    })()
})