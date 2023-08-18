const { extractUserId, handleErrors } = require('./helpers')
const { createWorkspot } = require ('../logic')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)

    const { image, name, location, description, type, features } = req.body

    const promise = createWorkspot(userId, image, name, location, description, type, features)

    return (async () => {
        await promise

        res.status(201).send()
    })()
})